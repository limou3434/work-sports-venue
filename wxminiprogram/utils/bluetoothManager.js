const RECONNECT_INTERVAL = 5000; // 重连间隔时间（毫秒）

class BluetoothManager {
    constructor() {
        this.isInitialized = false;
        this.connectedDeviceId = null;
        this.isReconnecting = false;
        this.reconnectTimer = null;
        this.onDeviceFoundCallback = null;
        this.onConnectionStateChange = null;
        this.onDeviceDataReceived = null;
        this.characteristics = new Map();
        this.initEventListeners();
    }

    // 初始化事件监听
    initEventListeners() {
        // 监听蓝牙适配器状态变化
        wx.onBluetoothAdapterStateChange((res) => {
            if (!res.available && this.isInitialized) {
                this.handleBluetoothStateChange(false);
            }
        });

        // 监听蓝牙连接状态
        wx.onBLEConnectionStateChange((res) => {
            if (!res.connected && this.connectedDeviceId === res.deviceId) {
                this.handleConnectionLost();
            }
            this.onConnectionStateChange?.(res.connected, res.deviceId);
        });

        // 监听收到的数据
        wx.onBLECharacteristicValueChange((res) => {
            this.onDeviceDataReceived?.(res);
        });
    }

    // 初始化蓝牙模块
    async initialize() {
        try {
            await wx.openBluetoothAdapter();
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('蓝牙初始化失败:', error);
            return false;
        }
    }

    // 开始搜索设备
    async startDeviceDiscovery() {
        if (!this.isInitialized) {
            const initialized = await this.initialize();
            if (!initialized) return false;
        }

        try {
            await wx.startBluetoothDevicesDiscovery({
                allowDuplicatesKey: false,
                interval: 0,
            });

            wx.onBluetoothDeviceFound((result) => {
                const devices = result.devices.map(device => ({
                    name: device.name || '未知设备',
                    deviceId: device.deviceId,
                    RSSI: device.RSSI,
                    advertisData: device.advertisData,
                }));
                this.onDeviceFoundCallback?.(devices);
            });

            return true;
        } catch (error) {
            console.error('搜索设备失败:', error);
            return false;
        }
    }

    // 停止搜索设备
    async stopDeviceDiscovery() {
        try {
            await wx.stopBluetoothDevicesDiscovery();
            return true;
        } catch (error) {
            console.error('停止搜索失败:', error);
            return false;
        }
    }

    // 连接设备
    async connectToDevice(deviceId) {
        try {
            await wx.createBLEConnection({ deviceId });
            this.connectedDeviceId = deviceId;
            await this.discoverServices(deviceId);
            return true;
        } catch (error) {
            console.error('连接设备失败:', error);
            return false;
        }
    }

    // 断开设备连接
    async disconnectDevice() {
        if (!this.connectedDeviceId) return true;

        try {
            await wx.closeBLEConnection({ deviceId: this.connectedDeviceId });
            this.connectedDeviceId = null;
            this.characteristics.clear();
            this.stopReconnection();
            return true;
        } catch (error) {
            console.error('断开连接失败:', error);
            return false;
        }
    }

    // 发送数据到设备
    async sendData(data, serviceId, characteristicId) {
        if (!this.connectedDeviceId) return false;

        try {
            const buffer = typeof data === 'string' 
                ? new TextEncoder().encode(data)
                : data;

            await wx.writeBLECharacteristicValue({
                deviceId: this.connectedDeviceId,
                serviceId,
                characteristicId,
                value: buffer.buffer,
            });
            return true;
        } catch (error) {
            console.error('发送数据失败:', error);
            return false;
        }
    }

    // 处理蓝牙状态变化
    handleBluetoothStateChange(isAvailable) {
        if (!isAvailable) {
            this.isInitialized = false;
            this.connectedDeviceId = null;
            this.characteristics.clear();
        }
    }

    // 处理连接丢失
    handleConnectionLost() {
        this.connectedDeviceId = null;
        this.characteristics.clear();
        this.startReconnection();
    }

    // 开始重连
    startReconnection() {
        if (this.isReconnecting || !this.connectedDeviceId) return;

        this.isReconnecting = true;
        this.reconnectTimer = setInterval(async () => {
            const connected = await this.connectToDevice(this.connectedDeviceId);
            if (connected) {
                this.stopReconnection();
            }
        }, RECONNECT_INTERVAL);
    }

    // 停止重连
    stopReconnection() {
        if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.isReconnecting = false;
    }

    // 发现服务和特征值
    async discoverServices(deviceId) {
        try {
            const { services } = await wx.getBLEDeviceServices({ deviceId });
            
            for (const service of services) {
                const { characteristics } = await wx.getBLEDeviceCharacteristics({
                    deviceId,
                    serviceId: service.uuid,
                });
                
                for (const characteristic of characteristics) {
                    const key = `${service.uuid}-${characteristic.uuid}`;
                    this.characteristics.set(key, {
                        serviceId: service.uuid,
                        characteristicId: characteristic.uuid,
                        properties: characteristic.properties,
                    });
                }
            }
            return true;
        } catch (error) {
            console.error('发现服务失败:', error);
            return false;
        }
    }

    // 设置设备发现回调
    setOnDeviceFoundCallback(callback) {
        this.onDeviceFoundCallback = callback;
    }

    // 设置连接状态变化回调
    setOnConnectionStateChange(callback) {
        this.onConnectionStateChange = callback;
    }

    // 设置数据接收回调
    setOnDeviceDataReceived(callback) {
        this.onDeviceDataReceived = callback;
    }

    // 清理资源
    destroy() {
        this.stopReconnection();
        this.disconnectDevice();
        this.onDeviceFoundCallback = null;
        this.onConnectionStateChange = null;
        this.onDeviceDataReceived = null;
    }
}

export default new BluetoothManager();
