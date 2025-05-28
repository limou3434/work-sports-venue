Page({
  data: {
    noticeTimer: null,
    isNoticeForbidden: false
  },

  onLoad: function() {
    // 检查是否禁止了公告
    const isForbidden = wx.getStorageSync('isNoticeForbidden');
    if (!isForbidden) {
      // 设置定时器，10秒后显示公告
      this.setNoticeTimer();
    } else {
      this.setData({
        isNoticeForbidden: true
      });
    }
  },

  setNoticeTimer: function() {
    const timer = setTimeout(() => {
      this.showNotice();
    }, 10000); // 10秒

    this.setData({
      noticeTimer: timer
    });
  },

  showNotice: function() {
    wx.showModal({
      title: '公告',
      content: '健身房将于本周日进行设备维护，届时将暂停营业，请合理安排您的锻炼时间。',
      showCancel: true,
      cancelText: '关闭',
      confirmText: '禁止',
      success: (res) => {
        if (res.confirm) {
          // 用户点击禁止，停止定时器并记录状态
          this.forbidNotice();
        } else if (res.cancel) {
          // 用户点击关闭，重新设置定时器
          this.setNoticeTimer();
        }
      }
    });
  },

  closeNotice: function() {
    // 关闭公告，重新设置定时器
    this.setNoticeTimer();
    wx.hideModal();
  },

  forbidNotice: function() {
    // 禁止公告，清除定时器并记录状态
    if (this.data.noticeTimer) {
      clearTimeout(this.data.noticeTimer);
    }
    
    wx.setStorageSync('isNoticeForbidden', true);
    this.setData({
      isNoticeForbidden: true
    });
    
    wx.hideModal();
  },

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
  },

  // Canvas绘图功能
  drawOnCanvas: function() {
    const ctx = wx.createCanvasContext('testCanvas');
    
    // 绘制背景
    ctx.setFillStyle('#f0f0f0');
    ctx.fillRect(0, 0, 300, 150);
    
    // 绘制文字
    ctx.setFontSize(16);
    ctx.setFillStyle('#333');
    ctx.fillText('健身房设备使用统计', 20, 30);
    
    // 绘制柱状图
    const data = [65, 80, 90, 75, 85];
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f'];
    
    data.forEach((value, index) => {
      ctx.setFillStyle(colors[index]);
      ctx.fillRect(30 + index * 50, 140 - value, 30, value);
      
      // 绘制数值
      ctx.setFillStyle('#333');
      ctx.fillText(value, 35 + index * 50, 150);
    });
    
    ctx.draw();
  }
});  