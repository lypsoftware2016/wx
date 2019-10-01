Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '老师', value: 'teacher' },
      { name: '学生', value: 'student' }
    ],
    username: '',
    password: '',
    type: ''
  },


  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  radioChange: function (e) {
    this.setData({
      type: e.detail.value
    })
  },

  register: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  login: function(){
    var username = this.data.username;
    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    console.log(this.data);
    console.log(username);
    wx.setStorageSync('sId', username)
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.request({
        //url: 'https://www.ufeng.top/TeachingAssistantSystem/wx/login2',
        //url: 'http://120.55.54.247:8080/wx/login2',
        url: address + '/wx/login2',
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
          username: this.data.username,
          password: this.data.password,
          openId: wx.getStorageSync('openid'),
          type: this.data.type
        },
        success: function (res) {
          console.log(res.data);
          var resData_success = res.data.success
          var resData_message = res.data.message
          if (resData_success == true) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function(){
                if (resData_message == 'student'){
                  wx.setStorageSync('sId', username)
                  wx.redirectTo({
                    url: '/pages/student/index/index',
                  })
                }else{
                  wx.setStorageSync('tId', username)
                  wx.redirectTo({
                    url: '/pages/teacher/index/index',
                  })
                }     
              }
            });
          } else {
            wx.showModal({
              title: '错误',
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