
var util = require("../../utils/util.js");
const app = getApp()

// pages/recommendtarget/recommendtarget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requirementTypeName:'增肌',
    kgNum:3,
    image:'https://t1.picb.cc/uploads/2018/05/06/2qRPkW.png'
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

  init:function(){
    let userInfo = app.globalData.userInfo;
    let me = this;
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
        me.setData({
          requirementTypeName: requirement.requirementTypeName,
          kgNum: requirement.kgNum
        });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '邀您一起见证我的训练计划！',
      path: '/pages/index/index?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


  /**
   * 跳转到开始训练页面
   */
  startTrain:function(){
    console.info("开始训练");
    wx.switchTab({
      url: '/pages/index/index',
    })
  }


})