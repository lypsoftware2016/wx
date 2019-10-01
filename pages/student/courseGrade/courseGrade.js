// pages/student/courseGrade/courseGrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true
  },
  CourseReview: function (e) {
    // console.log(e)
    var that = this;
    // console.log(that)
    console.log(that.data.review)
    wx.request({
      //url: 'http://localhost:8080/TeachingAssistantSystem/coursereviewrecord/create',
      url: 'https://www.ufeng.top/TeachingAssistantSystem/coursereviewrecord/create',
      method: 'POST',
      data: {
        cId: that.data.cId,
        sId: wx.getStorageSync('sId'),
        review: that.data.review
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == true) {
          wx.showToast({
            title: '提出复议成功',
            duration: 1500,
          });
          that.onShow();
        } else {
          wx.showToast({
            title: '提出复议失败',
            duration: 1500,
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '提出复议失败',
          duration: 1500,
          icon: 'none'
        })
      }
    });
  },
  inputReview: function (data) {
    // console.log(data)
    this.setData({
      review: data.detail.value
    })
  },
  showModal: function (e) {
    this.setData({
      hiddenmodalput: false
    });
    this.setData({
      itemObj: e
    })
  },
  //取消按钮    
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认    
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    console.log(this.data.itemObj)
    this.CourseReview(this.data.itemObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cId: options.cId,
      cName: options.cName
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
    wx.showLoading({
      title: '',
    })
    console.log(this.data);
    var that = this;
    wx.request({
      //url: 'http://localhost:8080/TeachingAssistantSystem/getCourseScoreAndReview',
      url: 'https://www.ufeng.top/TeachingAssistantSystem/getCourseScoreAndReview',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      data: {
        cId: that.data.cId,
        sId: wx.getStorageSync('sId')
      },
      success: function (res) {
        console.log(res)
        if (res.data == '') {
          var grade = '暂时没有成绩信息';
          var result = '';
        } else {
          grade = res.data.grade;
          result = res.data.result;
        }
        that.setData({
          grade: grade,
          result: result
        })
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading();
        wx.showToast({
          title: '获取信息失败',
          duration: 1500,
          icon: 'none'
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