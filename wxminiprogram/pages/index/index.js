Page({
    data: {},
  
    // 跳转到课程预约页面
    goToCourses: function () {
      wx.navigateTo({ url: '/pages/courses/courses' });
    },
  
    // 跳转到教练信息页面
    goToTrainers: function () {
      wx.navigateTo({ url: '/pages/trainers/trainers' });
    },
  
    // 跳转到器械使用页面
    goToinstrument: function () {
      wx.navigateTo({ url: '/pages/equipment/equipment' });
    },
  
    // 跳转到安全信息页面
    goToSafety: function () {
      wx.navigateTo({ url: '/pages/safety/safety' });
    },
  
    // 跳转到蓝牙设备页面
    goToBluetooth: function () {
      wx.navigateTo({ url: '/pages/bluetooth/bluetooth' });
    }
  });
  