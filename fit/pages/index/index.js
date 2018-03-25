Page({
  data: {
    imgUrls: [
      { imgUrl:'http://photo.hanyu.iciba.com/upload/chinesewiki/3/9/39HY.jpg',
        redirectUrl:'../logs/logs'
        },
      {
        imgUrl: 'http://photo.hanyu.iciba.com/upload/chinesewiki/3/9/39HY.jpg',
        redirectUrl: '../logs/logs'
      },
      {
        imgUrl: 'http://photo.hanyu.iciba.com/upload/chinesewiki/3/9/39HY.jpg',
        redirectUrl: '../logs/logs'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    
  },

  onLoad: function (query) {
    // console.info("index:onLoad:query");
    // console.info(query);
  },

  onSwiperImageTap:function(event){
    let redirectUrl = event.currentTarget.dataset.redirectUrl;
    wx.navigateTo({
      url: redirectUrl
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '一起来健身吧',
      path: '/pages/index/index?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


})