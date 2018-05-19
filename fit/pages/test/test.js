var util = require("../../utils/util.js");

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400", videoBaidu:'http://ic7zqndiuxbe9y3kg1k.exp.bcevod.com/mda-ic808mmd7i3udj4y/mda-ic808mmd7i3udj4y.mp4',
    videoId:'videoIdXXX',
    imgWrapAnimationData:'',
    httpRequestResult:'无'
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
  
  },

  // 打赏，个人账号无法接入
  onTapDaShang:function(){
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },

  // 当视频播放完毕
  onVideoEnd:function(event){
    console.info("---test.js:onVideoEnd:event");
    console.info(event);
  },

  // 当图片长按时
  onImageTap:function(event){
    console.info("当图片长按时:event:");
    console.info(event);
    wx.previewImage({
      current: 'https://t1.picb.cc/uploads/2018/02/23/KHqOt.png', // 当前显示图片的http链接
      urls: ['https://t1.picb.cc/uploads/2018/02/23/KHqOt.png'] // 需要预览的图片http链接列表
    })
  },

  // 当照片墙按钮被点击
  onImgWrapTap:function(){
    console.info("当照片墙按钮被点击");
    // 1、遍历照片，随机N毫秒后，遍历到照片的尺寸都在1s内变成0，
    // 2、当尺寸变成0后，当前照片的尺寸从0变回1，同时，透明度从1变成0
    // 3、当所有图片变化完以上两个动作后。遍历照片，随机N毫秒后，遍历到的照片随机变大。然后随着Y轴旋转360度，同时照片变回回来的大小。

    let animation = wx.createAnimation({
      // 动画持续1s
      duration: 1000,
    });
    // 尺寸从1变成0
    animation.scale(0).step();
    // 尺寸从从0变成1，同时透明度从1变成0
    animation.scale(1).opacity(0).step();
    // 延z轴移动200个像素，看起来变大
    animation.opacity(1).step();

    animation.rotate3d(0, 1, 0, 180).translateZ(-200).step();
    animation.rotate3d(0, 1, 0, 0).translateZ(0).step();
    
    this.setData({
      imgWrapAnimationData: animation.export()
    })
    console.info("动画创建完成");
  },

  /* http 请求 */
  onHttpRequestBtnTap:function(){
    console.info("进入http请求");
    let me = this;
    wx.request({
      url: 'https://keephealthy.duapp.com/test/mysqlHello', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        me.setData({
          httpRequestResult: JSON.stringify(res.data)
        })
        console.log(res.data)
      },
      fail:function(res){
        console.log("fail!")
        console.log(res)
      }
    })
  },
})