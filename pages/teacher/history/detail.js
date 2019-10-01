Page({
  data: {
    cId: '',
    cName: '',
    date: '',
    name: [],
    //value:[],
    objects: {},
    items: [],
    hId: '',
    hTitle: '',
    selected: '',
    chosen:''
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.cId = options.cId;
    this.hTitle = options.hTitle;
    this.date = options.ddl;
    this.hId = options.hId;
    this.setData({
      cId: options.cId,
      hTitle: options.hTitle,
      date:options.ddl,
      hId:options.hId
    });
    this.cName = options.cName;

    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'

    wx.request({
      url: address + '/getChoiceQuestions',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        h_id: this.hId
      },
      success: function (res) {
        that.setData({
          chosen:res.data
        })
        console.log(that.data.chosen)
      }
    })

    wx.request({
      url: address + '/getAllCourseQuestions',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        c_id: this.cId
      },
      success: function (res) {
        console.log(res.data);
        var list = res.data;
        var init = [];
        for (let i = 0; i < list.length; i++) {
          var chosen = that.data.chosen
          if(chosen.indexOf(list[i].cqId)>=0){
            init.push(list[i].cqId);
            that.setData({
              objects: {
                name: list[i].id, value: list[i].cqContent, cqId: list[i].cqId, checked: true
              }
            })
          } else {
            that.setData({
              objects: {
                name: list[i].id, value: list[i].cqContent, cqId: list[i].cqId, checked: false
              }
            })
          }
          that.data.items.push(that.data.objects);
          that.setData({ selected: init.join("/") })
        }
        var vvv = that.data.items;
        console.log(that.data.items);
        that.setData({
          items: vvv
        })

        console.log(that.data.selected);
      }
    },
    
    )
  },

  bindDateChange(e) {
    console.log('截止时间改变为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  checkboxChange: function (e) {
    var arr = [];
    var arr2 = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.items) {
        if (current == value.name) {
          arr.push(value.name);
          arr2.push(value.cqId);
          break;
        }
      }
    });

    //console.log(arr.join(""));
    this.setData({ checkArr: arr });
    this.setData({ selected: arr2.join("/") })
    console.log(this.data.selected);

  },

  toModify: function (e) {
    //var address = 'http://120.55.54.247:8080';
    //var address = 'http://localhost:8080/TeachingAssistantSystem'
    var address = 'https://www.ufeng.top/TeachingAssistantSystem'
    if (this.data.hTitle.length == 0) {
      wx.showToast({
        title: '请输入作业描述',
        content: ''
      })
    } else if (this.data.selected.length == 0) {
      wx.showToast({
        title: '请至少选择一题',
        content: ''
      })
    } else {
      wx.request({
        url: address + '/republishHomework',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          c_id: this.data.cId,
          h_id: this.data.hId,
          h_title: this.data.hTitle,
          release_time: this.data.date,
          selected: this.data.selected
        },

        success: function (res) {
          var resData_success = res.data.success;
          var resData_message = res.data.message;
          console.log(resData_message);
          if (resData_success == true) {
            wx.showToast({
              title: '修改成功',
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