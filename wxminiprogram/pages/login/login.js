Page({
    onLoad() {
      console.log('登录页面加载完成');
    },
  
    // 使用云函数登录并验证会员状态
    onLogin() {
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('获取登录凭证成功:', res.code);
  
            // 调用云函数获取 openid
            wx.cloud.callFunction({
              name: 'getOpenid', // 云函数名称
              data: { code: res.code },
              success: (response) => {
                console.log('云函数返回:', response);
                const { result } = response;
  
                if (result.success) {
                  const openid = result.openid;
                  console.log('获取到 openid:', openid);
  
                  // 检查会员状态（假设在云函数或后端中完成检查）
                  this.checkMembership(openid);
                } else {
                  wx.showToast({
                    title: '获取 openid 失败',
                    icon: 'none',
                  });
                }
              },
              fail: (err) => {
                console.error('云函数调用失败:', err);
                wx.showToast({
                  title: '登录失败，请稍后重试',
                  icon: 'none',
                });
              },
            });
          } else {
            console.error('登录失败！', res.errMsg);
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none',
            });
          }
        },
      });
    },
  
    // 检查会员状态（调用另一个云函数或后端接口）
    checkMembership(openid) {
      wx.cloud.callFunction({
        name: 'checkMembership', // 假设已创建该云函数
        data: { openid },
        success: (res) => {
          console.log('会员状态检查返回:', res);
          if (res.result.isMember) {
            // 是会员，跳转到首页
            wx.redirectTo({
              url: '/pages/index/index',
            });
          } else {
            // 不是会员，跳转到注册页面
            wx.redirectTo({
              url: '/pages/register/register',
            });
          }
        },
        fail: (err) => {
          console.error('会员状态检查失败:', err);
          wx.showToast({
            title: '检查会员状态失败',
            icon: 'none',
          });
        },
      });
    },
  });
  