// pages/student/courseDoc/courseDoc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showActions: function (e) {
    var that = this;
    let doc = e.currentTarget.dataset.item.cwId;
    
    //var file_address = 'http://120.55.54.247:8080'
    var file_address = 'https://www.ufeng.top/TeachingAssistantSystem'
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    // var file_path = ''
    wx.showActionSheet({
      itemList: ['预览', '下载', '取消'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            wx.showLoading({
              title: '',
            })
            console.log('浏览')
            wx.request({
              url: address + '/courseware/view',
              method: 'GET',
              data: {
                cwId: doc
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Cookie": wx.getStorageSync("sessionId")
              },
              success: function (res) {
                console.log(res)
                file_address += res.data
                const downloadTask = wx.downloadFile({
                  url: file_address,
                  success(res) {
                    wx.openDocument({
                      filePath: res.tempFilePath,
                      success: function (e) {
                        console.log('打开文档成功')
                        wx.hideLoading();
                      },
                      fail: function (e) {
                        console.log('打开文件失败')
                        wx.hideLoading();
                        wx.showToast({
                          title: '打开文件失败',
                          duration: '1500',
                          icon: 'none'
                        })
                      }
                    })
                  },
                  fail: function (e) {
                    console.log('打开文件失败');
                    wx.hideLoading();
                    wx.showToast({
                      title: '打开文件失败',
                      duration: '1500',
                      icon: 'none'
                    })
                  }
                })
              }
            });
            break;
          case 1:
            console.log('下载')
            console.log(doc)
            wx.request({
              url: address + '/courseware/download',
              method: 'GET',
              data: {
                cwId: doc
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Cookie": wx.getStorageSync("sessionId")
              },
              success: function (res) {
                console.log(res)
                file_address += res.data
                console.log(file_address)
                const downloadTask = wx.downloadFile({
                  url: file_address,
                  success(res) {
                    console.log(res)
                    wx.saveFile({
                      tempFilePath: res.tempFilePath,
                      // savedFilePath: wx.env.USER_DATA_PATH + 'temp',
                      success: function (res) {
                        console.log('成功下载文件到' + res.savedFilePath)
                        wx.hideLoading();
                      },
                      fail: function (res) {
                        console.log('保存文件失败')
                      }
                    })
                  },
                  fail: function (e) {
                    console.log('下载文件失败')
                  }
                })
              }
            });
            break;
          default:
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cId: options.cId
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
    
    //var address = 'http://120.55.54.247:8080'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    
    wx.showLoading({
    })
    var that = this
    wx.request({
      url: address + '/courseware/findAllCoursewares',
      method: 'GET',
      data: {
        cId: that.data.cId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        that.setData({
          doc_list: res.data
        });
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading();
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