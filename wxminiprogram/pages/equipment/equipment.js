Page({
    data: {
      equipmentList: [
        {
          id: 1,
          name: "杠铃",
          icon: "/images/equipment_barbell.png",
          description: "杠铃是力量训练的基础器械，可进行卧推、深蹲、硬拉等动作。"
        },
        {
          id: 2,
          name: "龙门架",
          icon: "/images/equipment_smith.png",
          description: "龙门架用于多功能训练，可以进行夹胸、高位下拉等训练。"
        },
        {
          id: 3,
          name: "跑步机",
          icon: "/images/equipment_treadmill.png",
          description: "跑步机用于有氧训练，帮助提升心肺功能和燃脂。"
        },
        {
          id: 4,
          name: "仰卧板",
          icon: "/images/equipment_bench.png",
          description: "仰卧板用于核心训练，进行仰卧起坐、卷腹等动作。"
        },
        {
          id: 5,
          name: "史密斯架",
          icon: "/images/equipment_smithmachine.png",
          description: "史密斯架用于安全稳定地进行深蹲、卧推等力量训练。"
        },
        {
          id: 6,
          name: "动感单车",
          icon: "/images/equipment_spinningbike.png",
          description: "动感单车适合高强度有氧训练，锻炼腿部力量和心肺耐力。"
        }
      ]
    },
  
    // 跳转到器械详情页面
    goToDetail: function (e) {
      const equipmentId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/equipment/detail?id=${equipmentId}`
      });
    }
  });
  