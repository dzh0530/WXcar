// pages/component/test/test.js
const app = getApp();
const util = require('../../../utils/util 2.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
      placeholder: '输入你想搜索的搭配元素',
      imgUrls: '',
      style: "width:100%",
      indicatordots: "true",
      autoplay: "true",
      interval: "3000",
      duration: "400",
      imageList: [],
      nameImage: [],
      manImage: [],
      womenImage: [],
      imgArray: ['http://mkzgr.top:4545/images/42534f54ffbc4a70be5ba444a626ee04.jpg',
        'http://mkzgr.top:4545/images/454a3c20d30245afb6018dace42f4681.jpg',
        'http://mkzgr.top:4545/images/328fa00149b347dfb507358abb226c22.jpg',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner19.png?sign=a319ad62b42f1710d848b0853f069d9d&t=1557834682',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner18.png?sign=561cb44ecc8480976e54c257f80e1e6d&t=1557834826',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner17.png?sign=09236c952a2448e5d8fd41ca5b9650c8&t=1557834853',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner16.png?sign=b4798c4c13664b69844bb2918d55da44&t=1557834876',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner15.png?sign=164a9c013d58fa2659917ddf55687978&t=1557834899',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner14.png?sign=665abb67a579b3ef60ad5c2a2c387b28&t=1557834915',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner13.png?sign=dcabada3aadbcde4910c7da2b5a0d452&t=1557834935',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner12.png?sign=225f917701431125bc1588bbac202d9e&t=1557834949',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner11.png?sign=d42b71e26afaf147994af1a544968e4e&t=1557834963',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner10.png?sign=f77c4e510d956578dfd727ecfc94da7e&t=1557834977',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner9.png?sign=416ee711d030c72a12a5efe811fd39d0&t=1557834992',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner8.png?sign=30d1ec44902f0e34fd50bf7afaf835e1&t=1557835005',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner7.png?sign=4d57a1e21964c407864585df70d127b5&t=1557835021',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner6.png?sign=a3e6fd3cc9b432358fd026debb7943e9&t=1557835037',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner5.png?sign=befa79d15621aff6e636358863ace6ca&t=1557835051',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner4.png?sign=c5f5c6c18346cd0d043d2ce521682fe9&t=1557835064',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner3.png?sign=71e217211f1f3ba3d2b86375980e08b4&t=1557835075',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner2.png?sign=d48cf1a372e00e2d061a150327260223&t=1557835086',
        'https://7765-we-63574e-1258830969.tcb.qcloud.la/banner/banner1.png?sign=7f21ec07c5d28b6a88630077182791d1&t=1557835097'
      ],
      w1: "http://mkzgr.top:4545/images/c859d986444349c8993b22df9846ef1e.png",
      w2: "http://mkzgr.top:4545/images/ecaa4572334f46199bf83b76cc1e614d.png",
      w3: "http://mkzgr.top:4545/images/0b7c733560f94d57a983ea55b0629481.png",
      w4: "http://mkzgr.top:4545/images/3e5069ec2c7d467c9666253a9405de40.png",
      m1: "http://mkzgr.top:4545/images/dc3631b50a174aadbd4695adc1a861d0.png",
      m2: "http://mkzgr.top:4545/images/b56a5605791842bdb4a613818f8c1d4c.png",
      m3: "http://mkzgr.top:4545/images/7c81695d3df9487aad6ecb615e323276.png",
      m4: "http://mkzgr.top:4545/images/3d95e010c71d49a08531257177203d2f.png",
    },
    
  /**
     * 添加数据
     */
  searchBox: function (e) {
    let Name = e.detail.value.Name


    var app = getApp();
    let url = app.globalData.URL + '/wetech-admin/api/name/create'
    console.log("-----------------" + url)
    console.log("------" + Name)
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        id: Name,
       
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {

        this.setData({
          aa: res.data
        })
        console.log(res.data)
      }
    })

  },

  aa: function () {
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
  a:function(){
    
    let data = {
    a:'22222222222'
    };
    app.wxRequest('GET', '/wetech-admin/api/aaa', data, (res) => {
      console.log("成功:" + res.data)
    }, (err) => {
      console.log("错误:" + err.errMsg)
    })

  },
  

  onShareAppMessage: function (res) {
    return {
      title: '我向您推荐“爱聚通”',
      path: '/pages/card/index/index',
      imageUrl: '/images/mine-path.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var n = util.randomNum(that.data.imgArray.length - 1, 3)
    var url = new Array()
    url = url.concat(that.data.imgArray[n[0]])
    url = url.concat(that.data.imgArray[n[1]])
    url = url.concat(that.data.imgArray[n[2]])
    // console.log(url)
    this.setData({
      imgUrls: url
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

  },


templateSend: function (e) {
console.log("---------------------"+e.detail.formId)
  console.log("---------------------" + app.globalData.openid)
  //   var _this = this;
  //   var openId = _this.data.openId;
  //   // 表单需设置report-submit="true"
  //   var formId = e.detail.formId;

  //   if (!formId || 'the formId is a mock one' === formId) {
  //     _this.setData({
  //       logMessage: '[fail]请使用真机调试，否则获取不到formId'
  //     });
  //     return;
  //   }
  //  wx.request({
  //   url: requestHost + "/template_send",
  //   data: {
  //     openId: openId,
  //     formId: formId
  //   },
  //   method: 'POST',
  //   success: function (res) {
  //     if (res.data.status === 0) {
  //       _this.setData({
  //         logMessage: '发送模板消息成功[' + new Date().getTime() + ']'
  //       });
  //     }
  //   },
  //   fail: function (err) {
  //     _this.setData({
  //       logMessage: '[fail]' + JSON.stringify(err)
  //     });
  //   }
  // });
}

})