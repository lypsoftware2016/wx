// pages/students/index/index.js
// id: education-aided-a6ee4f
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput: true
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toCourseDetail: function (e) {
    let cName = e.currentTarget.dataset.item.cName;
    let cId = e.currentTarget.dataset.item.cId;
    wx.setStorageSync('cId', cId);
    wx.navigateTo({
      url: '/pages/student/courseDetail/courseDetail?cName=' + cName + '&cId=' + cId,
    })
  },

  deselectCourse: function (e) {
    let item = e.currentTarget.dataset.item;
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    console.log(that);
    wx.showModal({
      title: '退选确认',
      content: '确定要退选课程 ' + item.cName + ' 吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: address + '/selectcourserecord/updateSelected',
            //url: 'http://localhost:8080/selectcourserecord/updateSelected',
            method: 'POST',
            data: {
              cId: item.cId,
              sId: wx.getStorageSync('sId')
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": wx.getStorageSync("sessionId")
            },
            success: function (res) {
              console.log(res)
              if (res.data.success == true) {
                wx.showToast({
                  title: '退课成功',
                  duration: 1500
                });
                that.onShow();
              } else {
                wx.showToast({
                  title: '退课失败',
                  duration: 1500,
                  icon: 'none'
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '退课失败',
                duration: 1500,
                icon: 'none'
              })
            }
          });
        }
      }
    })
  },
  selectCourse: function (e) {
    // console.log(e)
    let item = e.currentTarget.dataset.item;
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    // console.log(that)
    console.log(that.data.token)
    wx.request({
      url: address + '/selectCourse',
      //url: 'http://localhost:8080/selectCourse',
      method: 'POST',
      data: {
        cId: item.cId,
        sId: wx.getStorageSync('sId'),
        token: that.data.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == true) {
          wx.showToast({
            title: '选课成功',
            duration: 1500,
          });
          that.onShow();
        } else {
          wx.showToast({
            title: '选课码错误',
            duration: 1500,
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '选课失败',
          duration: 1500,
          icon: 'none'
        })
      }
    });
  },
  inputToken: function (data) {
    // console.log(data)
    this.setData({
      token: data.detail.value
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
    this.selectCourse(this.data.itemObj);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      console.log(this.data)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**
    wx.request({
      url: 'http://localhost:8080/Education-aidedSystem/doSLogin',
      method: 'POST',
      data: {
        wxId: 'aaa111'
      },
      header: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.header['Set-Cookie'].split(';')[0])
        wx.setStorageSync("sessionId", res.header['Set-Cookie'].split(';')[0])
      }
    });
    **/
    app.editTabBar(); 
    var that = this
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address+ '/findAllSelectedCourses',
      /** 
      method: 'GET',
      header: {
        "Content-Type":
        "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      **/
      data: {
        sId: wx.getStorageSync('sId')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          class_list: res.data
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