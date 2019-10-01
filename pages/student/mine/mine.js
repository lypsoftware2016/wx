// pages/student/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toClassSchedule: function (e) {
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/student/classSchedule/classSchedule',
    })
  },
  toCourseVideo: function (e) {
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/student/courseVideo/courseVideo',
    })
  },
  toAppointment: function (e) {
    let cName = e.currentTarget.dataset.item;
    let cId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '/pages/student/appointment/appointment',
    })
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
    app.editTabBar(); 
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