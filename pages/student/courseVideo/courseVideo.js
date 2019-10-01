// pages/student/courseVideo/courseVideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toVideo: function (e) {
    let vId = e.currentTarget.dataset.item.vId;
    wx: wx.navigateTo({
      url: '/pages/student/video/video?vId='+ vId,
    })
  },
  showActions: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    })
    var that = this
    wx.request({
      url: 'https://www.ufeng.top/TeachingAssistantSystem/video/findAll',
      method: 'GET',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        that.setData({
          doc_list: res.data
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