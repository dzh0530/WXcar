// pages/user/redact.js
const app = getApp();
//获得数据库引用
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'未提交申请',
    avatarUrl: '', //用户头像地址
    userInfo: '', //用户名
    name: '请输入姓名', //姓名
    phone: '请输入电话', //电话
    age: '0', //年龄
    jialing: '0', //驾龄
    suozaidi: '北京', //所在地
    spe_i: '未实名认证', //实名认证
    jiashi: '未驾驶认证', //驾驶认证
    region: ['新疆维吾尔族自治区', '自治区直辖县级行政区划', '石河子'],
    stateadd:"申请认证",
  },

  //打开弹出框
  showModal: function(e) {
    //获得模板显示
    var showName = e.currentTarget.dataset.modal;
    //获得模板标题
    var modalName = e.currentTarget.dataset.modalName;
    //获得修改的值
    var modalValue = e.currentTarget.dataset.modalValue;
    //获得修改的值
    var modalTitle = e.currentTarget.dataset.modalTitle;
    this.setData({
      ifShow: showName,
      modalName: modalName,
      modalValue: modalValue,
      modalTitle: modalTitle
    })
  },
  //关闭弹出框
  closeModal: function(e) {
    this.setData({
      ifShow: null
    })
  },
  //判断是否实名认证
  ifSpei: function(e) {
    if (this.data.spe_i != '未实名认证') {
      //提示
      wx.showToast({
        title: "您已经实名认证！！！不可修改",
        icon: "none",
        duration: 2000
      })
    } else {
      //打开弹窗口修改
      this.showModal(e);
    }
  },
  //判断是否驾驶认证
  ifJiashi: function(e) {
    if (this.data.jiashi != '未驾驶认证') {
      //提示
      wx.showToast({
        title: "您已经驾驶认证！！！不可修改",
        icon: "none",
        duration: 2000
      })
    } else {
      //打开弹窗口修改
      this.showModal(e);
    }
  },
  //修改姓名
  alterName: function(e) {
    //先判断是否实名，并打开修改框
    this.ifSpei(e)
  },
  //修改电话
  alterPhone: function(e) {
    //先打开弹窗口
    this.showModal(e);
  },
  //修改年龄
  alterAge: function(e) {
    //先判断是否实名
    this.ifSpei(e);
  },
  //修改驾龄
  alterJialing: function(e) {
    //先判断是否驾驶认证
    this.ifJiashi(e);
   
  },
  //修改所在地
  alterSuozaidi(e) {
    console.log("修改所在地被点击。。。。。。。。。。", e);
   
  },

  //修改实名认证
  alterSpei: function(e) {
    if (this.data.spe_i != '未实名认证') {
      //提示
      wx.showToast({
        title: "您已经实名认证！！",
        icon: "none",
        duration: 2000
      }
      )
      return;
    }else{
      //跳转编辑信息页面
      wx.navigateTo({
        url: 'alterSpei/alterSpei?openid=' + e.currentTarget.dataset.openid + '&ifSpei=' + e.currentTarget.dataset.modalValue,
      })
    }
    
  },
  //修改驾驶认证
  alterJiashi: function(e) {
    //跳转编辑信息页面
    wx.navigateTo({
      url: 'alterJiashi/alterJiashi?openid=' + e.currentTarget.dataset.openid + '&ifJiashi=' + e.currentTarget.dataset.modalValue,
    })
  },


  //更新
  updateAlter: function(e) {
    let modalTitle_ = e.detail.target.dataset.modalTitle;
    /**
     * 修改姓名
     */
    if (modalTitle_ == 'name') {
      //先判断用户是否填写完整
      if (e.detail.value.name == '') {
        //提示
        wx.showToast({
          title: "姓名不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      }
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.name != this.data.modalValue) {
       
        var app = getApp();
        let url = app.globalData.URL + '/wetech-admin/api/name/update'
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            // id: e.detail.value.name,
            id: app.globalData.openid,
            name: e.detail.value.name
          },
         
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          
          success: res => {
            //  提示 
            this.setData({
              name: e.detail.value.name
            })
            if (res.data.success==true){
            wx.showToast({
              title: "修改成功！",
              icon: "none",
              duration: 2000
            })
          }else{
              wx.showToast({
                title: "修改失败！",
                icon: "none",
                duration: 2000
              })
          }
            console.log(res.data)
          }
        })
      }else{
        wx.showToast({
          title: "未修改数据！",
          icon: "none",
          duration: 2000
        })
      }
    

    }

    /**
     * 修改电话
     */
    if (modalTitle_ == 'phone') {
      //先判断用户是否填写完整
      if (e.detail.value.phone == '') {
        //提示
        wx.showToast({
          title: "电话不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      }
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.phone != this.data.modalValue) {
        const app = getApp();
        let data = {
          id: app.globalData.openid,
          phone: e.detail.value.phone
        };
        console.log("--------------" + data.name)
        app.wxRequest('POST', '/wetech-admin/api/name/update', data, (res) => {
          //  提示 
         
          if (res.data.success == true) {
            wx.showToast({
              title: "修改成功！",
              icon: "none",
              duration: 2000
            })
            this.setData({
              phone: e.detail.value.phone
            })
          } else {
            wx.showToast({
              title: "修改失败！",
              icon: "none",
              duration: 2000
            })
          }
          console.log(res.data)
        }, (err) => {
          wx.showToast({
            title: "修改失败！",
            icon: "none",
            duration: 2000
          })
        })
      }else{
        wx.showToast({
          title: "未修改数据！",
          icon: "none",
          duration: 2000
        })
      }

    }

    /**
     * 修改年龄
     */
    if (modalTitle_ == 'age') {
      //先判断用户是否填写完整
      if (e.detail.value.age == '') {
        //提示
        wx.showToast({
          title: "身份证不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      }
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.age != this.data.modalValue) {
        const app = getApp();
        let data = {
          id: app.globalData.openid,
          card: e.detail.value.age
        };
        console.log("--------------" + data.name)
        app.wxRequest('POST', '/wetech-admin/api/name/update', data, (res) => {
         
          if (res.data.success == true) {
            wx.showToast({
              title: "修改成功！",
              icon: "none",
              duration: 2000
            })
            this.setData({
              age: e.detail.value.age
            })
          } else {
            wx.showToast({
              title: "修改失败！",
              icon: "none",
              duration: 2000
            })
          }
          console.log(res.data)
        }, (err) => {
          wx.showToast({
            title: "修改失败！",
            icon: "none",
            duration: 2000
          })
        })
      } else {
        wx.showToast({
          title: "未修改数据！",
          icon: "none",
          duration: 2000
        })
      }

    }

    /**
     * 修改驾龄
     */
    if (modalTitle_ == 'jialing') {
      //先判断用户是否填写完整
      if (e.detail.value.jialing == '') {
        //提示
        wx.showToast({
          title: "驾龄不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      }
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.jialing != this.data.modalValue) {
        const app = getApp();
        let data = {
          id: app.globalData.openid,
          data: e.detail.value.jialing
        };
        console.log("--------------" + data.name)
        app.wxRequest('POST', '/wetech-admin/api/name/update', data, (res) => {
        
          if (res.data.success == true) {
            wx.showToast({
              title: "修改成功！",
              icon: "none",
              duration: 2000
            })
            this.setData({
              jialing: e.detail.value.jialing
            })
          } else {
            wx.showToast({
              title: "修改失败！",
              icon: "none",
              duration: 2000
            })
          }
          console.log(res.data)
        }, (err) => {
          wx.showToast({
            title: "修改失败！",
            icon: "none",
            duration: 2000
          })
        })
      } else {
        wx.showToast({
          title: "未修改数据！",
          icon: "none",
          duration: 2000
        })
      }

    }






    //关闭修改框
    this.closeModal();
    //加载更新提示框
    this.setData({
      showLoading: true
    })
    //然后从新加载数据,关闭提示框
    this.setData({
      showLoading: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //判断用户是否把授权关闭了
    wx.getSetting({
      success(res) {
        
        //没有授权
        if(!res.authSetting['scope.userInfo']){
          //关闭加载...
          wx.hideLoading();
          //用户关闭授权
          wx.showModal({
            title: '是否需要打开设置页面',
            content: '你也取消获得用户信息，是否打开设置页面进行授权',
            confirmText: '确定',
            cancelText: '取消',
            success(res) {
              console.log(res)
              //表示点击了取消
              if (res.confirm == false) {
                //关闭当前页面
                wx.navigateBack();
              } else {
                wx.openSetting({
                  success(res) {
                    if(res.authSetting['scope.userInfo']){
                      that.huodeshuju(); //获得数据
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
 
  }, 
  //wx5fc7744e15e8b119
  huodeshuju: function(e) {
     //显示加载
     wx.showLoading({
      title: '加载中',
      icon: 'loading',
    })
     // 获取用户信息
     wx.getSetting({
      success: res => {
       
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
      // id :"o1LN65RhjPEavm9UVfY3kH1DZ0MY"
              })
              //关闭加载...
              wx.hideLoading()
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })

    let data = {
      id: app.globalData.openid
    }

    //查询数据
    app.wxRequest('POST', '/wetech-admin/api/name/list', data, (res) => {
      console.log("成功:" + JSON.stringify(res.data))
      this.setData({
       name:res.data[0].name,
       phone:res.data[0].phone,
       jialing:res.data[0].card,
       age:res.data[0].data
      })
      if (res.data[0].state==1){
        this.setData({
          state:"正在审核认证！请耐心等待"
        })
       
      } else if (res.data[0].state == 2){
        this.setData({
          state:"已通过认证！",
          stateadd:"重新认证"
        }) 
      }

    }, (err) => {
      console.log("错误:" + err.errMsg)
    })

 
  },

  //申请认证
  postNow: function(){
    console.log("------" + this.data.name)
    if (this.data.name == undefined) {
      //提示
      wx.showToast({
        title: "姓名不能为空",
        icon: "none",
        duration: 2000
      })
      return;
    }
    var reg = /^1[0-9]{10}$/; 
    if (!reg.test(this.data.phone)) {
      //提示
      wx.showToast({
        title: "请输入正确电话",
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (this.data.jialing == undefined) {
      //提示
      wx.showToast({
        title: "驾临不能为空",
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (this.data.age == undefined) {
      //提示
      wx.showToast({
        title: "身份证不能为空",
        icon: "none",
        duration: 2000
      })
      return;
    }

    var that = this
wx.showModal({
  title: '申请认证',
  content: '请核对信息后提交！可联系客服加快进度',
  success:function(res){
    if(res.confirm){
    let data = {
      id: app.globalData.openid,
      state: "1" 
    };
    console.log("--------------" + data.id)
    app.wxRequest('POST', '/wetech-admin/api/name/update', data, (res) => {

      if (res.data.success == true) {
        wx.showToast({
          title: "申请成功！",
          icon: "none",
          duration: 2000
        })
        console.log("-----------------------")
        getApp().globalData.state = '1'
        that.onShow()
      } else {
        wx.showToast({
          title: "申请失败！",
          icon: "none",
          duration: 2000
        })
      }
    }, (err) => {
      console.log("错误:" + err.errMsg)
    })
    }
  }
})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.huodeshuju(); //获得数据
  
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})