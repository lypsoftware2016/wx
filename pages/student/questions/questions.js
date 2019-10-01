// pages/student/questions/questions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cId: "",
    sId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      cId: options.cId,
      sId: wx.getStorageSync('sId')
    })
    console.log(that.data.cId)
    console.log(that.data.sId)
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
	  url: address + '/question/findHomework',
      //url: 'http://localhost:8080/question/findHomework',
	  method: 'POST',
      data: {
        cId: that.data.cId
      },
	  header: {
        'Content-Type': 'application/x-www-form-urlencoded',
		"Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        that.setData({
          homework_list: res.data
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