// pages/teacher/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toCourseDetail: function (e) {
    console.log(e)
    let cName = e.currentTarget.dataset.item.cName;
    let cId = e.currentTarget.dataset.item.cId;
    //wx.setStorageSync('cId', cId);
    wx.navigateTo({
      url: '/pages/teacher/courseDetail/courseDetail?cName=' + cName + '&cId=' + cId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1();
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
    var that = this
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/teachcourse/findAllCourses',
      method: 'GET',
      data: {
        tId: wx.getStorageSync('tId'),
      },
      header: {
        "Content-Type":
          "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        that.setData({
          teachCourse_list: res.data
        })
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
