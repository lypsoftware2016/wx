// pages/student/signOn/signOn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disable: false,
  },
  inputToken: function (data) {
    // console.log(data)
    this.setData({
      signCode: data.detail.value
    })
  },

  signOn: function (e) {
    var that = this;
    that.setData({
      disable: true,
    })
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/lesson/signOn',
      method: 'GET',
      data: {
        sId: wx.getStorageSync('sId'),
        lId: that.data.lId,
        signCode: that.data.signCode,
       
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == true) {
          wx.showToast({
            title: '签到成功',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: '签到失败：签到码错误',
            duration: 2000,
            icon: 'none'
          })
        }
        that.setData({
          disable: false
        })

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      lId: options.lId
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