// pages/teacher/statisticDetail/statisticDetail.js
var chart = require("../../../utils/chart.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hId: "",
    que: [],
    post: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      hId: options.hId,
    })
    console.log(that.data.hId);

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
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    wx.request({
      url: address + '/question/findChoiceQuestionStatistic',
      method: 'POST',
      data: {
        hId: that.data.hId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res.data.cquestion)
        console.log(res.data.statisticContents)
        that.setData({
          que: res.data.cquestion,
          post: res.data.statisticContents
        });

        chart.draw(that, 'canvas1', {
          title: {
            text: "学生答题情况统计",
            color: "#333333"
          },
          xAxis: {
            data: that.data.que
          },
          series: that.data.post
        });
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