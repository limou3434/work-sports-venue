Page({
  data: {
    courses: []
  },

  onLoad() {
    this.fetchCourses();
  },

  fetchCourses() {
    wx.request({
      url: 'http://127.0.0.1:8000/work_user_centre_api/course/search',
      method: 'POST',
      data: {},
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            courses: res.data.data
          });
        } else {
          wx.showToast({ title: '获取课程失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      }
    });
  },

  reserveCourse(e) {
    const userId = 1; // 暂时写死的用户 ID 为 0001，JS 中整数写作 1
    const courseId = e.currentTarget.dataset.id;

    const data = {
      userId: userId,
      courseId: courseId
    };

    wx.request({
      url: 'http://127.0.0.1:8000/work_user_centre_api/user_course/add',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data),
      success: (res) => {
        if (res.data.code === 0) {
          wx.showToast({ title: '预约成功', icon: 'success' });
        } else {
          wx.showToast({ title: '预约失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      }
    });
  }
});
