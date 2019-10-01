// pages/teacher/courseGrade/CourseGrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cId: options.cId,
      cName: options.cName
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
    console.log(this.data);
    var that = this;
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/coursereviewrecord/findAllCourseReviewRecords',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      data: {
        cId: that.data.cId,
        //sId: wx.getStorageSync('sId')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          class_list: res.data
        })
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({
          title: '获取信息失败',
          duration: 1500,
          icon: 'none'
        })
      }
    })
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