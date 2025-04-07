Page({
  data: {
    smokePpm: 100, // 烟雾传感器数据
    gateState: false, // 闸机状态：false-关闭，true-开启
    connectedDeviceId: '', // 已连接蓝牙设备的 ID
    serviceId: "0000ffe0-0000-1000-8000-00805f9b34fb", // 蓝牙服务 ID
    characteristicId: "0000ffe2-0000-1000-8000-00805f9b34fb", // 可写特征值 ID
    notifyCharacteristicId: "0000ffe1-0000-1000-8000-00805f9b34fb", // 通知特征值 ID
  },

  onLoad(options) {
    const app = getApp();
    this.setData({
      smokePpm: options.smokePpm || '未获取',
      connectedDeviceId: app.globalData.connectedDeviceId || null,
    });

    if (this.data.connectedDeviceId) {
      // 获取蓝牙设备服务和特征值
      this.getDeviceServices(this.data.connectedDeviceId);
    } else {
      wx.showToast({ title: '未连接设备', icon: 'none' });
    }
  },

  // 获取设备服务
  getDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        console.log('获取蓝牙设备服务成功:', res.services);
        const primaryService = res.services.find((service) => service.isPrimary);

        if (primaryService) {
          this.setData({ serviceId: primaryService.uuid });
          this.getDeviceCharacteristics(deviceId, primaryService.uuid);
        } else {
          wx.showToast({ title: '未找到主要服务', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('获取蓝牙设备服务失败:', err);
        wx.showToast({ title: '获取服务失败', icon: 'none' });
      },
    });
  },

  // 获取设备特征值
  getDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('获取设备特征值成功:', res.characteristics);

        // 查找可写特征值
        const writeCharacteristic = res.characteristics.find((char) => char.properties.write);
        if (writeCharacteristic) {
          this.setData({ characteristicId: writeCharacteristic.uuid });
        }

        // 查找通知特征值
        const notifyCharacteristic = res.characteristics.find((char) => char.properties.notify);
        if (notifyCharacteristic) {
          this.setData({ notifyCharacteristicId: notifyCharacteristic.uuid });
          this.startNotification(deviceId, serviceId, notifyCharacteristic.uuid);
        } else {
          wx.showToast({ title: '未找到通知特征值', icon: 'none' });
          console.log('设备没有通知特征值');
        }
      },
      fail: (err) => {
        console.error('获取设备特征值失败:', err);
        wx.showToast({ title: '获取特征值失败', icon: 'none' });
      },
    });
  },

  // 开启通知
  startNotification(deviceId, serviceId, characteristicId) {
    console.log('开始开启通知，设备ID:', deviceId, '服务ID:', serviceId, '特征值ID:', characteristicId);
    wx.notifyBLECharacteristicValueChange({
      state: true, // 开启通知
      deviceId,
      serviceId,
      characteristicId,
      success: () => {
        console.log('开启通知成功');
        wx.onBLECharacteristicValueChange((res) => {
          console.log('接收到蓝牙数据:', res);
          const receivedData = this.bufferToString(res.value); // 将 ArrayBuffer 转为字符串
          console.log('解析后的数据:', receivedData);

          // 处理接收到的通知数据
          if (receivedData.startsWith('ppm:')) {
            const ppmValue = receivedData.split(':')[1];
            this.setData({ smokePpm: ppmValue });
            console.log('更新烟雾传感器数据:', ppmValue);
          }
        });
      },
      fail: (err) => {
        console.error('开启通知失败:', err);
        wx.showToast({ title: '开启通知失败', icon: 'none' });
      },
    });
  },

  bufferToString(buffer) {
    let dataView = new DataView(buffer);
    let str = '';
    for (let i = 0; i < dataView.byteLength; i++) {
      str += String.fromCharCode(dataView.getUint8(i));
    }
    return str;
  },

  // 切换闸机状态
  toggleGate(e) {
    const state = e.detail.value;
    this.setData({ gateState: state });

    const command = state ? 'door:1' : 'door:0'; // 生成蓝牙指令
    console.log('发送蓝牙指令:', command);  // 打印发送的数据

    if (!this.data.connectedDeviceId || !this.data.serviceId || !this.data.characteristicId) {
      wx.showToast({ title: '蓝牙设备未连接', icon: 'none' });
      return;
    }

    wx.writeBLECharacteristicValue({
      deviceId: this.data.connectedDeviceId,
      serviceId: this.data.serviceId,
      characteristicId: this.data.characteristicId,
      value: this.stringToBuffer(command),
      success: () => {
        wx.showToast({
          title: state ? '闸机已开启' : '闸机已关闭',
          icon: 'success',
        });
        console.log('蓝牙指令发送成功:', command);  // 打印成功发送的指令
      },
      fail: (err) => {
        console.error('发送蓝牙指令失败:', err);
        wx.showToast({ title: '蓝牙指令发送失败', icon: 'none' });
      },
    });
  },

  stringToBuffer(str) {
    const buffer = new ArrayBuffer(str.length);
    const dataView = new DataView(buffer);
    for (let i = 0; i < str.length; i++) {
      dataView.setUint8(i, str.charCodeAt(i));
    }
    return buffer;
  },
});
