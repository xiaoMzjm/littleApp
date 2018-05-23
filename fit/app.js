var util = require("./utils/util.js");

// App() 必须在 app.js 中注册，且不能注册多个。
// 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
// 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
// 通过 getApp() 获取实例之后，不要私自调用生命周期函数。
App({
  onLaunch: function (path) {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var me = this;

    //调用登录接口，获取 code  
    wx.login({
      success: function (res) {
        console.info("wx.login res=");
        console.info(res);

        // 获取配置信息（判断用户是否已授权）
        wx.getSetting({
          success(setRes) {
            console.info("wx.getSetting setRes=");
            console.info(setRes);

            // 没有授权
            if (!setRes.authSetting['scope.userInfo']) {
              console.info("setRes.authSetting['scope.userInfo'] == false 用户未授权获取用户信息");
              me.globalData.hasAuth = 3;
            } 
            // 已授权
            else {
              console.info("setRes.authSetting['scope.userInfo'] == true 用户已授权获取用户信息");
              me.getUserInfo(res);
            }
          }
        })
      }
    })
  },


  /**
   * 用户已授权，到自己的服务器获取用户信息
   */
  getUserInfo:function(res){

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
            me.globalData.userInfo = data;
            me.globalData.hasAuth = 2;
          },
          fail:function(e){
            console.info("请求用户信息失败：");
            console.info(e);
          }
        })
      }
    })
  },

  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function (path){
    // console.info("onShow:path:");
    // console.info(path);
    // console.info("场景值：https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/scene.html");
  },
  // 当小程序从前台进入后台，会触发 onHide
  onHide:function(){

  },
  // 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError:function(msg){
    console.info("onError=" + msg);
  },
  // 全局变量
  // 调用方法：
  // var appInstance = getApp()
  // console.log(appInstance.globalData)
  globalData: {
    userInfo: null,
    hasAuth: 1 // 1未知，2已授权，3未授权
  }
})