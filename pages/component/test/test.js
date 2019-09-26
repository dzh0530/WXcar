// pages/component/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
/**
   * 添加数据
   */
  searchBox: function (e) { 
    let Name = e.detail.value.Name
     

    var app = getApp();
    let url = app.globalData.URL + '/wetech-admin/api/name/create'
    console.log("-----------------"+url)
    console.log("------"+ Name)
    wx.request({
      url:url, //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        id: Name,
        name: 'sfdsdf'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {
        
        this.setData({
          aa: res.data
        })
        console.log( res.data)
      }
    })

  },

  a: function () {
    wx.request({
      url: 'http://localhost:8080/wetech-admin/api/aaa', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        
        this.setData({
          aa: res.data
        })
        console.log(res.data)
      }
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