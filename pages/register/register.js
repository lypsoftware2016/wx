// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '男', value: 'male' },
      { name: '女', value: 'female' }
    ],
    s_id: '',
    s_name: '',
    s_sex: '',
    password: '',
    s_idCard: ''
  },

  sidcardInput: function (e) {
    this.setData({
      s_idCard: e.detail.value
    })
  },

  snameInput: function (e) {
    this.setData({
      s_name: e.detail.value
    })
  },

  password1Input: function (e) {
    this.setData({
      password1: e.detail.value
    })
  },

  password2Input: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },

  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  register: function (e) {
    var s_idCard = this.data.s_idCard;
    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    wx.setStorageSync('sIdCard', s_idCard)
    if (this.data.s_idCard.length == 0) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else if (this.data.s_name.length == 0) {
      wx.showToast({
        itle: '姓名不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else if (this.data.password1.length == 0 || this.data.password2.length == 0) {
      wx.showToast({
        itle: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      //获取用户openID存为s_id
      wx.request({
        url: address + '/wx/getopenid ',
        data:{
          
        }
      })
      wx.request({
        url: address + '/wx/register',
        //url: 'http://localhost:8080/wx/register',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          s_id: getApp().globalData.openid,
          s_name: this.data.s_name,
          s_sex: this.data.sex,
          s_idCard: this.data.s_idCard,
          password: this.data.password1
        },
        
        success: function (res) {
          console.log(res.data);
          var resData_success = res.data.success;
          var resData_message = res.data.message;
          console.log(resData_message);
          if (resData_success == true) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          } else {
            wx.showToast({
              title: '该账号已存在',
              content: ''
            })
          }
        }
      })
    }
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