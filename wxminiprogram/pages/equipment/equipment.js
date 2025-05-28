Page({
  data: {
    // 原始器材数据
    equipmentList: [
      {
        id: 1,
        name: "杠铃",
        icon: "/images/equipment_barbell.png",
        description: "杠铃是力量训练的基础器械，可进行卧推、深蹲、硬拉等动作。",
        type: "力量训练",
        part: "全身",
        people: "通用"
      },
      {
        id: 2,
        name: "龙门架",
        icon: "/images/equipment_smith.png",
        description: "龙门架用于多功能训练，可以进行夹胸、高位下拉等训练。",
        type: "力量训练",
        part: "上肢",
        people: "通用"
      },
      {
        id: 3,
        name: "跑步机",
        icon: "/images/equipment_treadmill.png",
        description: "跑步机用于有氧训练，帮助提升心肺功能和燃脂。",
        type: "有氧训练",
        part: "下肢",
        people: "通用"
      },
      {
        id: 4,
        name: "仰卧板",
        icon: "/images/equipment_bench.png",
        description: "仰卧板用于核心训练，进行仰卧起坐、卷腹等动作。",
        type: "力量训练",
        part: "核心",
        people: "通用"
      },
      {
        id: 5,
        name: "史密斯架",
        icon: "/images/equipment_smithmachine.png",
        description: "史密斯架用于安全稳定地进行深蹲、卧推等力量训练。",
        type: "力量训练",
        part: "下肢",
        people: "初学者"
      },
      {
        id: 6,
        name: "动感单车",
        icon: "/images/equipment_spinningbike.png",
        description: "动感单车适合高强度有氧训练，锻炼腿部力量和心肺耐力。",
        type: "有氧训练",
        part: "下肢",
        people: "中级"
      }
    ],
    
    // 筛选后的数据
    filteredList: [],
    
    // 筛选条件
    selectedType: '',
    selectedPart: '',
    selectedPeople: '',
    
    // 选择器数据
    typeList: [
      {id: '', name: '全部类型'},
      {id: '力量训练', name: '力量训练'},
      {id: '有氧训练', name: '有氧训练'},
      {id: '柔韧性训练', name: '柔韧性训练'}
    ],
    partList: [
      {id: '', name: '全部部位'},
      {id: '全身', name: '全身'},
      {id: '上肢', name: '上肢'},
      {id: '下肢', name: '下肢'},
      {id: '核心', name: '核心'}
    ],
    peopleList: [
      {id: '', name: '全部人群'},
      {id: '通用', name: '通用'},
      {id: '初学者', name: '初学者'},
      {id: '中级', name: '中级'},
      {id: '高级', name: '高级'}
    ],
    
    // 选择器当前索引
    typeIndex: 0,
    partIndex: 0,
    peopleIndex: 0
  },
  
  onLoad: function() {
    // 初始化筛选列表
    this.setData({
      filteredList: this.data.equipmentList
    });
  },
  
  // 器材类型选择变化
  bindTypeChange: function(e) {
    const index = e.detail.value;
    const selectedType = this.data.typeList[index].id;
    
    this.setData({
      typeIndex: index,
      selectedType: selectedType
    });
    
    this.filterEquipment();
  },
  
  // 训练部位选择变化
  bindPartChange: function(e) {
    const index = e.detail.value;
    const selectedPart = this.data.partList[index].id;
    
    this.setData({
      partIndex: index,
      selectedPart: selectedPart
    });
    
    this.filterEquipment();
  },
  
  // 适用人群选择变化
  bindPeopleChange: function(e) {
    const index = e.detail.value;
    const selectedPeople = this.data.peopleList[index].id;
    
    this.setData({
      peopleIndex: index,
      selectedPeople: selectedPeople
    });
    
    this.filterEquipment();
  },
  
  // 筛选器材
  filterEquipment: function() {
    const { equipmentList, selectedType, selectedPart, selectedPeople } = this.data;
    
    let filteredList = equipmentList.filter(item => {
      return (
        (!selectedType || item.type === selectedType) &&
        (!selectedPart || item.part === selectedPart) &&
        (!selectedPeople || item.people === selectedPeople)
      );
    });
    
    this.setData({
      filteredList: filteredList
    });
  },
  
  // 重置筛选
  resetFilter: function() {
    this.setData({
      selectedType: '',
      selectedPart: '',
      selectedPeople: '',
      typeIndex: 0,
      partIndex: 0,
      peopleIndex: 0,
      filteredList: this.data.equipmentList
    });
  },
  
  // 跳转到器械详情页面
  goToDetail: function(e) {
    const equipmentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/equipment/detail?id=${equipmentId}`
    });
  }
});
  