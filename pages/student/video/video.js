// pages/student/Video/video.js
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
    this.setData({
      vId: options.vId
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
    var that = this;
    let doc = that.data.vId;
    //var file_address = 'http://120.55.54.247:8080'
    //var file_address = 'http://localhost:8080/TeachingAssistantSystem'
    var file_address = 'https://www.ufeng.top/TeachingAssistantSystem'
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/video/play',
      method: 'GET',
      data: {
        vId: doc
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        file_address += res.data.url
        that.setData({
          videoUrl: file_address
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