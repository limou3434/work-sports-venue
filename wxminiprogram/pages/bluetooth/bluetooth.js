// index.js
Page({
  data: {
    devices: [],
    connected: false,
    deviceId: '',
    serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb', // 蓝牙服务 ID
    characteristicId: '0000ffe2-0000-1000-8000-00805f9b34fb', // 可写特征值 ID
    notifyCharacteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb', // 通知特征值 ID
    receivedData: '',
    inputData: '',
    gateState: false, // 闸机状态
    smokePpm: 0 // 烟雾传感器数据
  },

  onLoad() {
    this.openBluetoothAdapter();
  },

  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('Bluetooth adapter initialized', res);
        wx.showToast({ title: '蓝牙初始化成功', icon: 'success' });
        this.startDiscovery();
      },
      fail: (err) => {
        console.error('Failed to initialize Bluetooth adapter', err);
      }
    });
  },

  startDiscovery() {
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      interval: 1000,
      success: (res) => {
        console.log('Started discovering devices', res);
        this.getBluetoothDevices();
      },
      fail: (err) => {
        console.error('Failed to start discovery', err);
      }
    });
  },

  getBluetoothDevices() {
    wx.onBluetoothDeviceFound((res) => {
      let newDevices = this.data.devices.concat(res.devices);
      let uniqueDevices = [];
      let seen = new Set();
      for (let device of newDevices) {
        if (!seen.has(device.deviceId)) {
          seen.add(device.deviceId);
          uniqueDevices.push(device);
        }
      }
      this.setData({ devices: uniqueDevices });
      console.log('Found devices', uniqueDevices);
    });
  },

  connectToDevice(event) {
    const deviceId = event.currentTarget.dataset.deviceId;
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        console.log('Connected to device', res);
        wx.showToast({ title: '连接成功', icon: 'success' });
        this.setData({ connected: true, deviceId });
        this.startListening(deviceId);
      },
      fail: (err) => {
        console.error('Failed to connect', err);
      }
    });
  },

  startListening(deviceId) {
    wx.notifyBLECharacteristicValueChange({
      deviceId,
      serviceId: this.data.serviceId,
      characteristicId: this.data.notifyCharacteristicId,
      state: true,
      success: () => console.log('成功开启通知监听'),
      fail: (err) => console.error('开启通知失败', err)
    });

    wx.onBLECharacteristicValueChange((res) => {
      const data = this.ab2str(res.value);
      console.log('收到蓝牙数据:', data);
      
      // 解析烟雾传感器数据
      if (data.startsWith('PPM:')) {
        let ppmValue = parseInt(data.split(':')[1], 10);
        this.setData({ smokePpm: ppmValue });
      } else {
        this.setData({ receivedData: data });
      }
    });
  },

  bindInputData(e) {
    this.setData({ inputData: e.detail.value });
  },

  sendData(data) {
    console.log('发送数据:', data);
    let buffer = this.str2ab(data);
    console.log('转换后 buffer:', buffer);

    wx.writeBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: this.data.serviceId,
      characteristicId: this.data.characteristicId,
      value: buffer,
      success: () => wx.showToast({ title: '发送成功', icon: 'success' }),
      fail: (err) => {
        console.error('发送失败', err);
        wx.showToast({ title: '发送失败: ' + err.errMsg, icon: 'none' });
      }
    });
  },

  toggleGate(e) {
    const state = e.detail.value;
    this.setData({ gateState: state });
    let command = state ? 'door:1' : 'door:0';
    this.sendData(command);
  },

  ab2str(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  },

  str2ab(str) {
    let buffer = new ArrayBuffer(str.length);
    let dataView = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
      dataView[i] = str.charCodeAt(i);
    }
    return buffer;
  },

  disconnectDevice() {
    if (this.data.deviceId) {
      wx.closeBLEConnection({
        deviceId: this.data.deviceId,
        success: (res) => {
          console.log('Disconnected', res);
          wx.showToast({ title: '已断开连接', icon: 'none' });
          this.setData({ connected: false, deviceId: '', receivedData: '', inputData: '', smokePpm: 0, gateState: false });
        }
      });
    }
  }
});
