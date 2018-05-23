
const app = getApp()

// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("loading页面的onLoad");
    console.info(options);
  },

  /**
   * 页面跳转
   */
  jump:function(){

    var me = this;
    var id = setInterval(function () {
      console.info("定时器");
      let userInfo = app.globalData.userInfo;
      let hasAuth = app.globalData.hasAuth;
      console.info("userinfo=" + userInfo);
      console.info("hasAuth=" + hasAuth);

      // 若还没判断是否授权
      if (hasAuth == 1) {
        return;
      }

      // 若没授权，直接跳转
      if (hasAuth == 3) {
        wx.navigateTo({
          url: '/pages/requirement/requirement',
        })
        clearInterval(id);
        return;
      }

      // 若已授权且还在请求后台
      console.info("loading.js userInfo=");
      console.info(userInfo);
      let courseNum = userInfo.courseNum;

      if (courseNum && courseNum > 0) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      else {
        wx.navigateTo({
          url: '/pages/requirement/requirement',
        })
      }
      clearInterval(id);

    }
    , 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    let me = this;
    setTimeout(function(){
      me.jump();
    },1000);
    
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


})