
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
    this.jump();
  },

  /**
   * 页面跳转
   */
  jump:function(){
    var me = this;
    var id = setInterval(function () {
      console.info("定时器");
      let userInfo = app.globalData.userInfo;

      if (userInfo) {
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
        console.info(id);
        clearInterval(id);
      }
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
  onShow: function () {
    this.jump();
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