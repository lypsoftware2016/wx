var util = require('../../../utils/util.js');

Page({
  data: {
    cId:'',
    cName:'',
    date: '',
    name:[],
    //value:[],
    objects:{},
    items:[],
    hId:'',
    hTitle:'',
    selected:'',
    simpleQuestions:[],
    selectedS:'',
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());

    console.log(options);
    var that = this;
    this.cId = options.cId;
    this.setData({
      cId:options.cId
    });
    this.cName = options.cName;

    this.setData({
      hId: Math.random().toString(36).substr(2, 15),
      date:DATE,
    })

    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    wx.request({
      url: address + '/getAllCourseQuestions',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        c_id: this.cId
      },
      success: function (res) {
        var list = res.data;

        for (let i = 0; i < list.length; i++) {
          that.setData({
            objects: {
              id: list[i].id, value: list[i].cqContent, cqId:list[i].cqId
            }
          })
          that.data.items.push(that.data.objects);
        }
        var cques = that.data.items;
        that.setData({
          items: cques
        })
        console.log(that.data.items)
      }
    },

    wx.request({
      url: address + '/getAllSimpleQuestions',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        c_id:this.cId,
      },
      success:function(res){
        console.log(res.data)
        var list = res.data;

        for (let i = 0; i < list.length; i++) {
          that.setData({
            objects: {
              id: list[i].id, value: list[i].sqContent, sqId: list[i].sqId
            }
          })
          that.data.simpleQuestions.push(that.data.objects);
        }
        var sques = that.data.simpleQuestions;
        that.setData({
          simpleQuestions: sques
        })
        console.log(that.data.simpleQuestions)
      }
    })

    )
  },

  bindDateChange(e) {
    console.log('截止时间改变为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  checkboxChange:function(e) {
    var arr = [];
    var arr2 = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.items) {
        if (current == value.id) {
          arr.push(value.id);
          arr2.push(value.cqId);
          break;
        }
      }
    });
    this.setData({ checkArr: arr });
    this.setData({ selected: arr2.join("/")})
  },

  checkboxChange2: function (e) {
    var arr3 = [];
    var arr4 = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.simpleQuestions) {
        if (current == value.id) {
          arr3.push(value.id);
          arr4.push(value.sqId);
          break;
        }
      }
    });
    this.setData({ checkArr: arr3 });
    this.setData({ selectedS: arr4.join("/") })
  },

  toPublish:function(e) {
    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    if(this.data.hTitle.length == 0){
      wx.showToast({
        title: '请输入作业描述',
        content: ''
      })
    }else if(this.data.selected.length == 0&&this.data.selectedS.length == 0){
      wx.showToast({
        title: '请至少选择一题',
        content: ''
      })
    }else{
      wx.request({
        url: address + '/publishHomework',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          c_id: this.data.cId,
          h_id: this.data.hId,
          h_title: this.data.hTitle,
          release_time: this.data.date,
          selected:this.data.selected,
          selectedS:this.data.selectedS
        },

        success: function (res) {
          var resData_success = res.data.success;
          var resData_message = res.data.message;
          console.log(resData_message);
          if (resData_success == true) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '发生未知错误',
              content: ''
            })
          }

        }

      })
    }
  },

  descriptionInput: function (e) {
    this.setData({
      hTitle: e.detail.value
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