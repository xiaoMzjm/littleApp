//index.js
//获取应用实例
const app = getApp()

Page({
  // 小程序启动之后 触发
  onLaunch: function () {
    console.info('小程序启动之后 触发');
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },

  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 生命周期函数--监听页面隐藏
  onHide: function () { },

  // 生命周期函数--监听页面卸载
  onUnload: function () { },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    console.info("onPullDownRefresh");
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.info("onReachBottom");
  },

  // 用户点击右上角转发
  onShareAppMessage: function () { },

  // 页面滚动触发事件的处理函数
  onPageScroll: function () { },

  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap: function () { },

  // 生命周期函数--监听页面加载
  onLoad: function (query) {
    console.info("onLoad:query");
    console.info(query);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.info(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 页面的初始数据
  data: {
    motto: '未来健身独角兽',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    icon1:'http://pics.sc.chinaz.com/Files/pic/icons128/6003/b4.png',
    icon2:'https://t1.picb.cc/uploads/2018/02/22/KGvKg.png',
    icon3:''
  },

})
