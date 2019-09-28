/* pages/login/login.js */
var app = getApp()
//获取应用实例 
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。 
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
  },
  onLoad: function(options) {},
  bindGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
      wx.navigateBack({
        delta: 1
      })
    } else {
      console.log("点击了拒绝授权");
      wx.navigateBack({
        delta: 1
      })
    }
  }
  

  
})