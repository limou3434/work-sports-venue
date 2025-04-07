// app.js
App({
    onLaunch() {
        console.log('小程序启动');

        // 初始化云开发环境
        wx.cloud.init({
            env: 'bishe-9g0yzmdeb0563d07', // 替换为实际的云开发环境ID
            traceUser: true, // 是否记录用户访问
        });

        // 判断是否在支持蓝牙的设备上运行
        this.checkBluetoothSupport();
    },

    globalData: {
        userInfo: null, // 用户信息
        connectedDeviceId: null, // 已连接的蓝牙设备 ID
        isBluetoothOn: false, // 蓝牙开关状态
    },

    // 检查当前设备是否支持蓝牙功能
    checkBluetoothSupport() {
        const systemInfo = wx.getSystemInfoSync();
        console.log('系统信息:', systemInfo);

        // 判断平台，如果是Windows则不初始化蓝牙
        if (systemInfo.platform === 'windows') {
            console.log('当前平台不支持蓝牙功能');
            this.globalData.isBluetoothOn = false;
            wx.showToast({ title: '当前平台不支持蓝牙功能', icon: 'none' });
        } else {
            // 支持蓝牙的平台，初始化蓝牙
            this.initializeBluetooth();
        }
    },

    // 初始化蓝牙模块
    initializeBluetooth() {
        wx.openBluetoothAdapter({
            success: () => {
                console.log('蓝牙模块初始化成功');
                this.globalData.isBluetoothOn = true;
            },
            fail: (err) => {
                console.error('蓝牙模块初始化失败:', err);
                this.globalData.isBluetoothOn = false;
                wx.showToast({ title: '蓝牙模块初始化失败', icon: 'none' });
            },
        });
    },

    // 全局断开蓝牙设备
    disconnectBluetoothDevice() {
        if (this.globalData.connectedDeviceId) {
            wx.closeBLEConnection({
                deviceId: this.globalData.connectedDeviceId,
                success: () => {
                    console.log('蓝牙设备断开连接成功:', this.globalData.connectedDeviceId);
                    this.globalData.connectedDeviceId = null;
                },
                fail: (err) => {
                    console.error('蓝牙设备断开连接失败:', err);
                },
            });
        }
    },

    // 全局关闭蓝牙模块
    closeBluetoothAdapter() {
        wx.closeBluetoothAdapter({
            success: () => {
                console.log('蓝牙模块已关闭');
                this.globalData.isBluetoothOn = false;
            },
            fail: (err) => {
                console.error('关闭蓝牙模块失败:', err);
            },
        });
    },
});
