//app.js
App({

  mag: {
  alert: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
      }
    });
  },
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // wx5fc7744e15e8b119
        if (!res.code|| res.code == " ") {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }else{
          var code = res.code
          console.log( "----"+code)
          wx.request({
            url: 'http://192.168.1.108:8080/wetech-admin/openid/ID', //仅为示例，并非真实的接口地址
            data: {
              a: code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              this.globalData.openid = res.data
              console.log("获取用户的openid:" + res.data)
              this.state()
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })





  },


  //设置全局请求URL
  globalData: {
    userInfo: null,
    URL: 'http://192.168.1.108:8080',
    openid:null,
    state:null
  },


  state:function(){

    wx.request({
      url: 'http://192.168.1.108:8080/wetech-admin//api/name/list', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        id: this.globalData.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {

        if (res.data.state != "") {
          console.log("获取用户的状态:" + res.data[0].state)
          this.globalData.state = res.data[0].state
        } else { 
          console.log("未注册")
        }
      }
    })
  },
  
  //http请求
  wxRequest(method, url, data, callback, errFun) {
  wx.request({
    url: 'http://192.168.1.108:8080'+ url,
   method: method,
   data: data,
   header: {
    'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
    'Accept': 'application/json'
   },
   dataType: 'json',
   success(res) {
    callback(res);
   },
   fail(err) {
    errFun(res);
   }
  })
 }
 
})