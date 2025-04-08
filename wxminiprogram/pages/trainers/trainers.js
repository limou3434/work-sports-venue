Page({
  data: {
    trainers: []
  },

  // 页面加载时获取数据
  onLoad: function() {
    this.getTrainersData();
  },

  // 获取用户数据
  getTrainersData: function() {
    wx.request({
      url: 'http://127.0.0.1:8000/work_user_centre_api/user/search',
      method: 'POST',
      data: {},
      success: (res) => {
        if (res.data.code === 0) {
          // 过滤数据，检查 userTags 是否包含 "教练"
          const filteredTrainers = res.data.data.filter(item => 
            item.userTags && item.userTags.includes('教练')
          );

          // 设置过滤后的数据
          this.setData({
            trainers: filteredTrainers
          });
        } else {
          wx.showToast({ title: '获取用户失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      }
    });
  },

 // 预约按钮的点击事件
 onReserve: function(e) {
  const trainerId = e.currentTarget.dataset.id;
  const trainers = this.data.trainers;

  // 找到点击的教练并更新其预约状态
  const updatedTrainers = trainers.map(trainer => {
    if (trainer.id === trainerId) {
      trainer.isReserved = !trainer.isReserved; // 切换预约状态
    }
    return trainer;
  });

  // 更新数据
  this.setData({
    trainers: updatedTrainers
  });

  // 根据状态显示不同的提示
  const message = updatedTrainers.find(trainer => trainer.id === trainerId).isReserved ? '已预约' : '取消预约';
  wx.showToast({
    title: message,
    icon: 'success',
    duration: 2000
  });
},
});
