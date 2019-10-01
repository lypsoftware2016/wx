// pages/teacher/courseDetail/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toQuestions: function (e) {
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/questions/questions?cName=' + cName + '&cId=' + cId,
    })
  },
  toCheckIn: function (e) {
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/checkIn/checkIn?cName=' + cName + '&cId=' + cId,
    })
  },
  toCourseGrade: function (e) {
    let cName = e.currentTarget.dataset.item;
    console.log(e)
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/courseGrade/courseGrade?cName=' + cName + '&cId=' + cId,
    })
  },
  toFeedBack: function (e) {
    console.log(e)
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/feedBack/feedBack?cName=' + cName + '&cId=' + cId,
    })
  },
  toStatistic: function (e) {
    console.log(e)
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/statistic/statistic?cName=' + cName + '&cId=' + cId,
    })
  },
  toLocation: function (e) {
    console.log(e)
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/teacher/location/location?cName=' + cName + '&cId=' + cId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseName: options.cName,
      courseId: options.cId
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