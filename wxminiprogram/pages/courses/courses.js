Page({
    data: {
      courses: [
        { id: 1, name: "瑜伽基础课", date: "2024-06-17", time: "10:00" },
        { id: 2, name: "HIIT高强度训练", date: "2024-06-17", time: "14:00" },
        { id: 3, name: "力量训练", date: "2024-06-17", time: "16:00" },
        { id: 4, name: "有氧舞蹈课", date: "2024-06-17", time: "10:00" },
        { id: 5, name: "拉伸放松课", date: "2024-06-17", time: "14:00" },
        { id: 6, name: "搏击训练", date: "2024-06-17", time: "16:00" }
      ],
      minDate: "2024-01-01",
      maxDate: "2025-12-31"
    },
  
    // 修改日期
    onDateChange: function (e) {
      const courseId = e.currentTarget.dataset.id;
      const newDate = e.detail.value;
  
      const newCourses = this.data.courses.map((course) => 
        course.id === courseId ? { ...course, date: newDate } : course
      );
  
      this.setData({ courses: newCourses });
    },
  
    // 修改时间
    onTimeChange: function (e) {
      const courseId = e.currentTarget.dataset.id;
      const newTime = e.detail.value;
  
      const newCourses = this.data.courses.map((course) => 
        course.id === courseId ? { ...course, time: newTime } : course
      );
  
      this.setData({ courses: newCourses });
    },
  
    // 预约课程
    reserveCourse: function (e) {
      const courseId = e.currentTarget.dataset.id;
      const selectedCourse = this.data.courses.find((c) => c.id === courseId);
  
      if (!selectedCourse) {
        wx.showToast({ title: "课程信息未找到", icon: "none" });
        return;
      }
  
      wx.showModal({
        title: "预约确认",
        content: `您确定要预约 "${selectedCourse.name}"，时间：${selectedCourse.date} ${selectedCourse.time} 吗？`,
        success: (res) => {
          if (res.confirm) {
            wx.showToast({ title: "预约成功", icon: "success" });
          }
        }
      });
    }
  });
  