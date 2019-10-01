// pages/student/locationDetail/locationDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    Height: 0,
    scale: 18,
    latitude: "",
    longitude: "",
    circles: [],
    mylatitude: "",
    mylongitude: "",
    disable: false,
  },

  getDistance: function (lat1, lng1, lat2, lng2) {

    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },

  lSignOn: function () {
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    that.setData({
      disable: true,
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          mylatitude: res.latitude,
          mylongitude: res.longitude,
        })
        console.log(that.data.mylatitude + "  " + that.data.mylongitude)
        console.log("距离是" + that.getDistance(that.data.mylatitude, that.data.mylongitude, that.data.latitude, that.data.longitude))
        if (that.getDistance(that.data.mylatitude, that.data.mylongitude, that.data.latitude, that.data.longitude) < that.data.radius) {
          wx.request({
            url: address + '/lesson/locationSignOn',
            method: 'POST',
            data: {
              sId: wx.getStorageSync('sId'),
              lId: that.data.lId
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
                  icon: 'success',
                  duration: 2000
                })
              } else if (res.data.message == '已签到') {
                wx.showToast({
                  title: '重复签到！',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '未知错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          });
        }else {
          wx.showToast({
            title: '不在范围内！',
            icon: 'none',
            duration: 2000
          })
        }
        that.setData({
          disable: false,
        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
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
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight * 0.6
          }
        })
      }
    })

    wx.request({
      url: address + '/lesson/findLocationDetail',
      method: 'POST',
      data: {
        lId: that.data.lId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          radius: res.data.radius,
          circles: [{
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: res.data.radius,
            strokeWidth: 1
          }]
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