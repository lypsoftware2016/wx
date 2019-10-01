//index.js
//获取应用实例
const app = getApp()
var OPEN_ID = ''//存储获取openid

Page({
  data: {
    motto: 'Hello World sihaining',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //appid: 'wx24f94ee5b5fa17f4',
    //secret:'3579b095807e5d23695678b6a4aee027'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToLogin: function () {
    
    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    wx.login({
      success(res) {
        //console.log(res.code)

        if (res.code) {
          //wx.setStorageSync('code', res.code)
          // 发起网络请求
          wx.request({
            url: address + '/wx/getopenid',
            data: {
              code: res.code
            },
            success(res){
              console.log(res);
              wx.setStorageSync('openid', res.data.openid);
              OPEN_ID = res.data.openid;

              app.globalData.openid = OPEN_ID;

              //console.log("OPENID = "+ app.globalData.openid);
              //console.log("getid = " + getApp().globalData.openid);

              wx.request({
                url: address + '/wx/login',
                data:{
                  //code: wx.getStorageSync('code'),
                  openId: res.data.openid
                },
                success(res){
                  console.log(res.data);

                  var resData_success = res.data.success
                  var resData_message = res.data.message
                  var resData_username = res.data.username
                  
                  if (resData_success == true){
                    if (resData_message == 'student'){
                      wx.setStorageSync('sId', resData_username)
                      wx.navigateTo({
                        url: '/pages/student/index/index',
                      })
                    }else{
                      wx.setStorageSync('tId', resData_username)
                      wx.navigateTo({
                        url: '/pages/teacher/index/index',
                      })
                    }
                  }else{
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            } 
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
})
