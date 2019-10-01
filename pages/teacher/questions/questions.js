// pages/teacher/courseDetail/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cId:'',
    cName:''
  },
  toCreate:function(e) {
    let cName = this.cName;
    let cId = this.cId;
    wx.navigateTo({
      url: '/pages/teacher/publishHomework/publishHomework?cName=' + cName + '&cId=' + cId,
    })
  },

  toHistory:function(e) {
    let cName = this.cName;
    let cId = this.cId;
    wx.navigateTo({
      url: '/pages/teacher/history/history?cName=' + cName + '&cId=' + cId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.cId=options.cId;
    this.cName = options.cName;
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