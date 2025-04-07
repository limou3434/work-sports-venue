Page({
    data: {
      name: '',       // 用户姓名
      phone: '',      // 手机号
      code: '',       // 验证码
    },
  
    // 监听输入事件
    onNameInput(e) {
      this.setData({ name: e.detail.value });
    },
  
    onPhoneInput(e) {
      this.setData({ phone: e.detail.value });
    },
  
    onCodeInput(e) {
      this.setData({ code: e.detail.value });
    },
  
    // 发送验证码
    sendCode() {
      const { phone } = this.data;
      if (!phone || phone.length !== 11) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
        });
        return;
      }
      wx.showToast({
        title: '验证码已发送',
        icon: 'success',
      });
      // TODO: 接入后台验证码发送接口
    },
  
    // 提交注册信息
    submitRegister() {
      const { name, phone, code } = this.data;
      if (!name || !phone || !code) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
        });
        return;
      }
  
      // TODO: 提交注册信息到后台
      wx.request({
        url: 'https://example.com/api/register', // 替换为你的注册接口
        method: 'POST',
        data: { name, phone, code },
        success: (res) => {
          if (res.data.success) {
            wx.showToast({ title: '注册成功', icon: 'success' });
            // 跳转到首页
            wx.redirectTo({
              url: '/pages/index/index',
            });
          } else {
            wx.showToast({
              title: res.data.message || '注册失败，请重试',
              icon: 'none',
            });
          }
        },
        fail: (err) => {
          console.error('注册失败', err);
          wx.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none',
          });
        },
      });
    },
  });
  