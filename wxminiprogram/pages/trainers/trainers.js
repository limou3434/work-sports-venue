Page({
    data: {
      trainers: [], // 教练列表数据
      timer: null   // 定时器引用
    },
  
    onLoad: function () {
      this.initTrainerData();
    },
  
    // 初始化教练数据
    initTrainerData: function () {
      const trainerData = [
        { id: 1, name: '李教练', status: '空闲', countdown: 0, canReserve: true },
        { id: 2, name: '王教练', status: '空闲', countdown: 0, canReserve: true },
        { id: 3, name: '张教练', status: '空闲', countdown: 0, canReserve: true },
        { id: 4, name: '赵教练', status: '空闲', countdown: 0, canReserve: true },
        { id: 5, name: '周教练', status: '空闲', countdown: 0, canReserve: true },
        { id: 6, name: '孙教练', status: '空闲', countdown: 0, canReserve: true }
      ];
      this.setData({ trainers: trainerData });
    },
  
    // 预约教练
    onReserve: function (e) {
      const trainerId = e.currentTarget.dataset.id;
  
      const updatedTrainers = this.data.trainers.map(trainer => {
        if (trainer.id === trainerId && trainer.canReserve) {
          trainer.status = '已预约';
          trainer.countdown = 30; // 设置下课倒计时为 30 分钟
          trainer.canReserve = false; // 更新状态为不可预约
        }
        return trainer;
      });
  
      this.setData({ trainers: updatedTrainers });
      this.startCountdown(); // 启动倒计时
    },
  
    // 启动倒计时功能
    startCountdown: function () {
      if (this.data.timer) return; // 如果已有定时器，避免重复开启
  
      const timer = setInterval(() => {
        const updatedTrainers = this.data.trainers.map(trainer => {
          if (trainer.status === '已预约' && trainer.countdown > 0) {
            trainer.countdown--; // 每分钟倒计时减一
          }
          return trainer;
        });
  
        this.setData({ trainers: updatedTrainers });
  
        // 检查所有倒计时结束
        if (updatedTrainers.every(trainer => trainer.countdown === 0 || trainer.status !== '已预约')) {
          clearInterval(this.data.timer);
          this.setData({ timer: null });
        }
      }, 60000); // 每分钟更新一次
  
      this.setData({ timer });
    },
  
    // 重置教练数据
    resetData: function () {
      clearInterval(this.data.timer); // 清除定时器
      this.setData({ timer: null });
      this.initTrainerData(); // 重新初始化数据
      wx.showToast({
        title: '数据已重置',
        icon: 'success'
      });
    },
  
    onUnload: function () {
      clearInterval(this.data.timer); // 页面卸载时清除定时器
    }
  });
  