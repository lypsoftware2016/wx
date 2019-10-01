// pages/teacher/checkIn/checkIn.js
var app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-1-1',
    time: '8:00',
    signCode: ''
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  signCodeInput(e){
    this.setData({
      signCode: e.detail.value
    })
  },
  signOn: function(){

    var that = this;
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var StrTime = that.data.date + ' ' + that.data.time;
    console.log(StrTime)
    var format = StrTime.replace(/-/g, '/')
    var now = new Date(format); 
    console.log(now);
    console.log(now.getTime())

    wx.request({
      url: address + '/lesson/create',
      data: {
        cId: that.data.cId,
        lTime: now.getTime(),
        signCode: that.data.signCode
      },
      success: function (res) {
        console.log(res.data);
        var resData_success = res.data.success
        var resData_message = res.data.message
        if (resData_success == true) {
          wx.showToast({
            title: '开始签到成功',
            icon: 'success',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: '开始签到失败',
            icon: 'none',
            duration: 2000,
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1();
    var date = util.formatDate(new Date());
    var time = util.formatCTime(new Date());
    this.setData({
      cName: options.cName,
      cId: options.cId,
      date: date,
      time: time
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