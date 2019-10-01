// pages/teacher/location/location.js
var app = getApp()
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-01-01',
    time: '8:00',
    myradius: 100,

    Height: 0,
    scale: 18,
    latitude: "",
    longitude: "",
    circles: []
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
  signCodeInput(e) {
    var that = this;
    that.setData({
      myradius: e.detail.value,
      circles: [{
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: e.detail.value,
        strokeWidth: 1
      }]
    })
  },

  signOn: function () {
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    var StrTime = that.data.date + ' ' + that.data.time;
    var now = new Date(StrTime);
    console.log(now);
    console.log(now.getTime())

    wx.request({
      url: address + '/lessonLocation/create',
      method: 'POST',
      data: {
        cId: that.data.cId,
        lTime: now.getTime(),
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        radius: that.data.myradius,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res.data);
        var resData_success = res.data.success
        var resData_message = res.data.message
        if (resData_success == true) {
          wx.showToast({
            title: resData_message,
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
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight * 0.45
          }
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {

        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: _this.data.myradius,
            strokeWidth: 1
          }]
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