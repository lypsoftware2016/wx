// pages/student/feedBack/feedBack.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getFeedback: function (data) {
    this.setData({
      feedback: data.detail.value
    })
  },
  submitFeedback: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.ufeng.top/TeachingAssistantSystem/coursecommentrecord/create',
      method: 'POST',
      data: {
        comment: that.data.feedback,
        sId: wx.getStorageSync('sId'),
        cId: that.data.cId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '反馈成功',
          duration: 2000
        });
        setTimeout(function () {
          that.onShow();
        }, 1500)
      },
      fail: function (res) {
        wx.showToast({
          title: '反馈失败',
          duration: 1500,
          icon: 'none'
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cName: options.name,
      cId: options.cId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '',
    })
    var that = this;
    wx.request({
      //url: 'http://localhost:8080/TeachingAssistantSystem/coursecommentrecord/findAllCourseCommentRecords',
      url: 'https://www.ufeng.top/TeachingAssistantSystem/coursecommentrecord/findAllCourseCommentRecords',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      data: {
        cId: that.data.cId
      },
      success: function (res) {
        // var class_list = res.data;
        console.log(res.data)
        that.setData({
          feedback_list: res.data
        });
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})