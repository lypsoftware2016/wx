// pages/student/homeworkDetail/homeworkDetail.js

let mymap = new Map();
let nmap = new Map();

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

  radioChange: function(e) {
    console.log(e.detail.value)
    var value = new Array();
    value = e.detail.value.split("+");
    mymap.set(value[1], value[0]);
    console.log(mymap)

  },

  checkboxChange: function (e) {
    nmap = new Map();
    var result = e.detail.value;
    for (let j = 0; j < result.length; ++j) {
      var value = new Array();
      value = result[j].split("+");
      if (nmap.has(value[1])) {
        var temp = nmap.get(value[1]) + value[0];
        nmap.set(value[1], temp);
      }else {
        nmap.set(value[1], value[0]);
      }
    }
    console.log(nmap);

  },

  formSubmit: function(e) {
    let obj = Object.create(null);
    for (let [k, v] of mymap) {
      obj[k] = v;
    }
    for (let [k, v] of nmap) {
      obj[k] = v;
    }
    console.log("there is obj");
    console.log(JSON.stringify(obj));
	var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    var that = this;
    if (mymap.size + nmap.size < that.data.choiceQuestion_list.length) {
      wx.showToast({
        title: '题目未完成',
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
      //url: 'http://localhost:8080/question/findQuestion',
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
        nmap = new Map();
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