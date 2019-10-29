// pages/student/homeworkDetail/homeworkDetail.js

let mymap = new Map();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hId: "",
    sId: "",
    cId: "",
    mymap: new Map(),
  },

  simpleQuestionInput(e) {
    this.setData({
      sqResult: e.detail.value
    })
  },

  radioChange: function(e) {
    var value = new Array();
    value = e.detail.value.split("+");
    mymap.set(value[1], value[0]);
    console.log(mymap)

  },

  formSubmit: function(e) {
    let obj = Object.create(null);
    for (let [k, v] of mymap) {
      obj[k] = v;
    }
    console.log("there is obj");
    console.log(JSON.stringify(obj));
	var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    if (mymap.size == 0) {
      wx.showToast({
        title: '请先选择',
        icon: 'none',
        duration: 2000
      })
    }else {
      wx.request({
		url: address + '/question/submitChoiceQuestion',
        //url: 'http://localhost:8080/question/submitChoiceQuestion',
		method: 'POST',
        data: {
          hId: that.data.hId,
          sId: that.data.sId,
          myMap: JSON.stringify(obj)
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
		  "Cookie": wx.getStorageSync("sessionId")
        },
        success: function (res) {
          console.log(res)
          if (res.data.success == true) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          } else if (res.data.message == '已经提交！'){
            wx.showToast({
              title: '重复提交！',
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

    }


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData ({
      hId: options.hId,
      cId: options.cId,
      sId: wx.getStorageSync('sId')
    })

    console.log(that.data.hId)
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
	  url: address + '/question/findQuestion',
      //url: 'http://localhost:8080/question/findChoiceQuestion',
	  method: 'POST',
      data: {
        hId: that.data.hId
      },
	  header: {
          'Content-Type': 'application/x-www-form-urlencoded',
		  "Cookie": wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log(res)
        that.setData({
          type: res.data.type,
          choiceQuestion_list: res.data.choiceQuestions,
          simpleQuestion: res.data.simpleQuestion
        })
        mymap = new Map();
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