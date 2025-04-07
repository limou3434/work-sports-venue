Page({
    data: {
      equipmentDetail: {}
    },
  
    onLoad: function (options) {
      const equipmentId = options.id; // 获取从列表页传递过来的设备ID
      const equipmentData = [
        {
          id: 1,
          name: "杠铃",
          icon: "/images/equipment_barbell.png",
          description: "杠铃是力量训练的基础器械，可进行卧推、深蹲、硬拉等动作。",
          movements: [
            "卧推：平躺长凳，双手握住杠铃推起。",
            "深蹲：双肩支撑杠铃，保持背部挺直，完成下蹲。",
            "硬拉：双脚分开与肩同宽，双手握杠铃，从地面提起。"
          ]
        },
        {
          id: 2,
          name: "龙门架",
          icon: "/images/equipment_smith.png",
          description: "龙门架是多功能器械，可以进行拉伸、夹胸、下拉等训练动作。",
          movements: [
            "高位下拉：坐姿，双手握住横杆下拉至胸口。",
            "绳索夹胸：站立，双手握住绳索向前夹紧。",
            "三头下压：手握绳索，站立并下拉至大腿前侧。"
          ]
        },
        {
          id: 3,
          name: "跑步机",
          icon: "/images/equipment_treadmill.png",
          description: "跑步机是有氧运动器械，适合提升心肺功能和燃烧脂肪。",
          movements: [
            "慢跑：设置速度为 5-6km/h 进行热身慢跑。",
            "快跑：将速度提高至 10-12km/h 持续冲刺锻炼。",
            "爬坡：增加坡度，进行负重式训练，增强下肢力量。"
          ]
        },
        {
          id: 4,
          name: "仰卧板",
          icon: "/images/equipment_bench.png",
          description: "仰卧板是用于核心训练的器械，适合仰卧起坐和卷腹。",
          movements: [
            "仰卧起坐：双脚固定在板上，完成核心收缩动作。",
            "卷腹训练：双手放在耳侧，缓慢抬起上半身。",
            "腿部抬高：平躺，将双腿垂直向上抬高并缓慢放下。"
          ]
        },
        {
          id: 5,
          name: "史密斯架",
          icon: "/images/equipment_smithmachine.png",
          description: "史密斯架是用于稳定力量训练的器械，适合深蹲和卧推。",
          movements: [
            "史密斯深蹲：背部挺直，双肩支撑杠铃下蹲。",
            "史密斯卧推：平躺长凳，双手推起固定杠铃。",
            "史密斯提拉：站姿，握住杠铃进行硬拉训练。"
          ]
        },
        {
          id: 6,
          name: "动感单车",
          icon: "/images/equipment_spinningbike.png",
          description: "动感单车适合高强度有氧训练，增强心肺功能。",
          movements: [
            "坐姿骑行：正常坐姿踩踏，维持中等速度。",
            "站姿骑行：站立踩踏，模拟爬坡动作。",
            "冲刺训练：快速踩踏 30 秒，提高心率。"
          ]
        }
      ];
  
      // 根据传入的 ID 查找对应的器械数据
      const selectedEquipment = equipmentData.find(item => item.id == equipmentId);
      this.setData({ equipmentDetail: selectedEquipment });
    }
  });
  