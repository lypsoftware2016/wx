var app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '2019-1-1',
    startTime: '08:00',
    endDate: '2019-1-1',
    endTime: '08:00',
  },
  bindStartDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindStartTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  appoint: function(){
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    var StrStart = that.data.startDate + ' ' + that.data.startTime;
    console.log(StrStart)
    var formatStart = StrStart.replace(/-/g, '/')
    var start = new Date(formatStart);
    console.log(start);
    console.log(start.getTime())

    var StrEnd = that.data.endDate + ' ' + that.data.endTime;
    var formatEnd = StrEnd.replace(/-/g, '/')
    var end = new Date(formatEnd);
    console.log(end);
    console.log(end.getTime())

    wx.request({
      url: address + '/appointment/create',
      data: {
        tId: wx.getStorageSync('tId'),
        start: start.getTime(),
        end: end.getTime(),
        isBooked: 1
      },
      success: function (res) {
        console.log(res.data);
        var resData_success = res.data.success
        var resData_message = res.data.message
        if (resData_success == true) {
          wx.showToast({
            title: '开始发布成功',
            icon: 'success',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: '开始发布失败',
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
    app.editTabBar1();
    var date = util.formatDate(new Date());
    var time = util.formatCTime(new Date());
    this.setData({
      startDate: date,
      startTime: time,
      endDate: date,
      endTime: time
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