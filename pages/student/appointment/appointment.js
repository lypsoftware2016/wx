
var app = getApp()
var util = require('../../../utils/util.js') //引入微信自带的日期格式化
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ashow:true
  },

  cancelAppointment: function(e){
    let item = e.currentTarget.dataset.item;
    var that = this;
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    console.log(that);
    wx.showModal({
      title: '取消预约',
      content: '确定取消预约' + item.tName + ' 吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: address + '/apppintment/cancel',
            method: 'POST',
            data: {
              aId: item.aId,
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
                  title: '取消成功',
                  duration: 1500
                });
                that.onShow();
              } else {
                wx.showToast({
                  title: '取消失败',
                  duration: 1500,
                  icon: 'none'
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '取消失败',
                duration: 1500,
                icon: 'none'
              })
            }
          });
        }
      }
    })
  },
  
  appointment: function (e) {
    // console.log(e)
    let item = e.currentTarget.dataset.item;
    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    // console.log(that)
    //console.log(that.data.token)
    wx.request({
      url: address + '/apppintment/apoint',
      method: 'POST',
      data: {
        aId: item.aId,
        sId: wx.getStorageSync('sId'),
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == true) {
          wx.showToast({
            title: '预约成功',
            duration: 1500,
          });
          that.onShow();
        } else {
          wx.showToast({
            title: '预约失败',
            duration: 1500,
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '预约失败',
          duration: 1500,
          icon: 'none'
        })
      }
    });
  },
  showAppoint: function () {
    this.setData({
      ashow: true
    })
  },
  showAppointed: function () {
    this.setData({
      ashow: false
    })
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
    app.editTabBar();

    var that = this
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/appointment/findAppointed',
      //url: 'http://localhost:8080/appointment/findAppointed',
      method: 'GET',
      data: {
        sId: wx.getStorageSync('sId')
      },
      header: {
        "Content-Type":
          "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res);
        for (var i = 0, len = res.data.length; i < len; i++) {

          //var formatStart = res.data[i].start.replace(/\-/g, '/')
          //var start = new Date(formatStart);
          var date_start = new Date(res.data[i].start);
          //var date_value_start = util.formatTime(start)
          var date_value_start = util.formatTime(date_start)
          //res.data[i].start = date_value_start


          var date_end = new Date(res.data[i].end);
          var date_value_end = util.formatTime(date_end)
          //res.data[i].end = date_value_end
        }
        
        that.setData({

          have_appointed_list: res.data
        })
      }
    });

    var that = this

    //var address = 'http://120.55.54.247:8080'
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    wx.request({
      url: address + '/appointment/findAll',
      method: 'GET',
      data: {
        sId: wx.getStorageSync('sId')
      },
      header: {
        "Content-Type":
          "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)

        for (var i = 0, len = res.data.length; i < len; i++){
          
          //var formatStart = res.data[i].start.replace(/\-/g, '/')
          //var start = new Date(formatStart);
          var date_start = new Date(res.data[i].start);
          //var date_value_start = util.formatTime(start)
          var date_value_start = util.formatTime(date_start)
          //res.data[i].start = date_value_start

  
          var date_end = new Date(res.data[i].end);
          var date_value_end = util.formatTime(date_end)
          //res.data[i].end = date_value_end
        }
        
        that.setData({
          
          appointment_list: res.data
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
