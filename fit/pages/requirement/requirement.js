var util = require("../../utils/util.js");
const app = getApp()

// pages/requirement/requirement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requirementType: 2,
    sex:1,
    weight:50,
    height:170,
    difficulty:1
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
    this.init();
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


  /**
   * 初始化
   */
  init:function(){
    let userInfo = app.globalData.userInfo;
    if(!userInfo) {
      return;
    }
    let me = this;

    // 用户信息
    wx.request({
      url: util.getServerUrlForGetUser() + '/' + userInfo.userCode,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      //服务端的回掉  
      success: function (result) {
        console.info(result);
        if (result.data.success != true) {
          wx.showModal({
            title: '抱歉失败',
            content: result.data.errorMsg,
            showCancel: false,
          });
          return;
        }
        let user = result.data.data;
        if (user.sex && user.weight && user.height ) {
          me.setData({
            sex: user.sex,
            weight: user.weight,
            height: user.height
          });
        }
        
      },
      fail: function () {
        wx.showModal({
          title: '网络错误',
          content: '网络错误',
          showCancel: false,
        });
      }
    })

    // 需求信息
    wx.request({
      url: util.getServerUrlForGetRequirement() + '/' + userInfo.userCode,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      //服务端的回掉  
      success: function (result) {
        console.info(result);
        if (result.data.success != true) {
          wx.showModal({
            title: '抱歉失败',
            content: result.data.errorMsg,
            showCancel: false,
          });
          return;
        }
        let requirement = result.data.data;
        if (!!requirement) {
          me.setData({
            requirementType: requirement.requirementType,
            difficulty: requirement.difficulty
          });
        }
        
      },
      fail: function () {
        wx.showModal({
          title: '网络错误',
          content: '网络错误',
          showCancel: false,
        });
      }
    })
  },


  /**
   * 点击了性别
   */
  tapSex:function(sex){
    console.info(sex.currentTarget.id);
    let sexIndex = 1;
    if (sex.currentTarget.id == 'girlSexButton') {
      sexIndex = 2;
    }
    this.setData({
      sex: sexIndex
    });
  },

  /**
   * 点击难度
   */
  tapDiffculity:function(data){
    console.info(data.currentTarget.id);
    let diffculityIndex = 1;
    if (data.currentTarget.id == 'oneDifficultyButton') {
      diffculityIndex = 1;
    }
    if (data.currentTarget.id == 'secondDifficultyButton') {
      diffculityIndex = 2;
    }
    if (data.currentTarget.id == 'thirdDifficultyButton') {
      diffculityIndex = 3;
    }
    this.setData({
      difficulty : diffculityIndex
    });
  },

  /**
   * 输入重量
   */
  inputWeight:function(value){
    console.info(value.detail.value);
    this.setData({
      weight: value.detail.value
    });
  },


  /**
   * 输入身高
   */
  inputHeight: function (value){
    console.info(value.detail.value);
    this.setData({
      height: value.detail.value
    });
  },



  /**
   * 点击目标类型
   */
  tapNeedType:function(data){
    console.info(data.currentTarget.id);
    let requirementType = 2;
    if (data.currentTarget.id == 'loseWeight') {
      requirementType = 1;
    }
    else if (data.currentTarget.id == 'moulding'){
      requirementType = 2;
    }
    else if (data.currentTarget.id == 'addMuscle'){
      requirementType = 3;
    }
    this.setData({
      requirementType: requirementType
    });
  },

  /**
   * 用户授权登陆结果
   */
  onGotUserInfo: function (e) {
    console.info("点击了授权按钮");
    console.info(e);
    let me = this;
    if (!e.detail.iv) {
      console.info("用户点击了拒绝");
      wx.showToast({
        title:'亲，请先授权登陆',
        icon:'none'
      });
      return;
    }
    wx.login({
      success: function (res) {
        wx.showLoading();
        me.getUserInfo(res);
      }
    })
  },


  /**
   * 用户已授权，到自己的服务器获取用户信息
   */
  getUserInfo: function (res) {

    var me = this;
    //获取用户信息  
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (userRes) {

        //发起网络请求  
        wx.request({
          url: util.getServerUrlForLogin(),
          data: {
            code: res.code,
            encryptedData: userRes.encryptedData,
            iv: userRes.iv
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (result) {
            console.info("服务端返回结果：result=");
            console.info(result);
            let serverResult = result.data;
            if (!serverResult.success) {
              me.getUserInfo(res);
              return;
            }
            var data = serverResult.data;
            wx.setStorageSync("userInfo", data);
            app.globalData.userInfo = data;
            app.globalData.hasAuth = 2;
            me.finish();
          },
          fail: function (e) {
            console.info("请求用户信息失败：");
            console.info(e);
          }
        })
      }
    })
  },


  /**
   * 完成
   */
  finish:function(){

    if (this.data.weight <= 0 || this.data.weight >= 500) {
      wx.showModal({
        title: "请输入正确的体重",
      });
      wx.hideLoading();
      return;
    }

    if (this.data.height <= 0 || this.data.height >= 300) {
      wx.showModal({
        title: "请输入正确的身高",
      });
      wx.hideLoading();
      return;
    }

    let userInfo = app.globalData.userInfo;

    console.info("确认需求");
    console.info(userInfo);
    console.info("code=" + userInfo.userCode);
    console.info("sex=" + this.data.sex);
    console.info("weight=" + this.data.weight);
    console.info("height=" + this.data.height);
    console.info("difficulty=" + this.data.difficulty);
    console.info("requirementType=" + this.data.requirementType);

    //发起网络请求  
    wx.request({
      url: util.getServerUrlForChangeRequirement(),
      data: {
        code: userInfo.userCode,
        weight: this.data.weight,
        height: this.data.height,
        sex: this.data.sex,
        requirementType: this.data.requirementType,
        difficulty: this.data.difficulty,
        userCode: userInfo.userCode
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      //服务端的回掉  
      success: function (result) {
        console.info(result);
        if(result.data.success != true) {
          wx.showModal({
            title: '抱歉失败',
            content: result.data.errorMsg,
            showCancel: false,
          });
          wx.hideLoading();
          return ;
        }
        else if (result.data.success == true){
          console.info("确认需求成功");
          wx.navigateTo({
            url: '/pages/recommendtarget/recommendtarget',
          })
        
        }
      },
      fail:function(){
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络错误',
          showCancel: false,
        });
      }
    })
  },
})