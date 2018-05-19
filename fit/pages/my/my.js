import * as echarts from '../../ec-canvas/echarts';

//index.js
//获取应用实例
const app = getApp()

let chart = null;

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: 250
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#2C353E",
    color: ["#868686", "#67E0E3", "#9FE6B8"],

    tooltip: {
      trigger: 'axis',
      showContent:true,
      axisPointer: {
        type: 'line',
        label: {
          show: true,
          backgroundColor: '#868686'
        },
        formatter: function (prams) {
          return "卡路里：" + prams[0].data 
        }
      }
    },
    legend: {
      data: [{
        name: '卡路里', 
        textStyle: {
          color: '#868686'
        }
      }]
    },
    grid: {
      top: 50,
      left: 10,
      right: 10,
      bottom: 80,
      containLabel: true,
      show: false,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
      axisLine: {
        lineStyle: {
          color: '#868686'
        }
      },
      axisLabel: {
        color: '#868686'
      },
      axisTick: {
        show: false
      },
      // axisLabel: {
      //   show: false
      // },
      // axisLine: {
      //   show: false
      // }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#868686'
        }
      },
      axisLabel: {
        color: '#868686'
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    series: [
    {
      name: '卡路里',
      type: 'line',
      smooth: false,
      symbol: 'emptyCircle',
      lineStyle: {
        width:1
      },
      data: [50, 55, 40, 45, 47, 46, 30, 28, 33, 33, 33],
      "itemStyle": {
        "normal": {
          "barBorderRadius": 0,
          "label": {
            "show": true,
            "position": "top",
            formatter: function (p) {
              return p.value > 0 ? (p.value) : '';
            }
          }
        }
      },
    },
    {
      name: 'bar',
      type: 'bar',
      smooth: false,
      data: [50, 55, 40, 45, 47, 46, 30, 28, 33,33,33],
      barWidth: 0.5,
      itemStyle: {
        normal: {
          barBorderRadius: 5,
          color: '#868686'
        }
      },
    },

    ]
  };

  chart.setOption(option);
  return chart;
}

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

  exchange:function(){
    wx.navigateTo({
      url: '/pages/exchange/exchange'
    })
  },



  // 页面的初始数据
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    manIcon:'https://t1.picb.cc/uploads/2018/03/25/2tXlyd.png',
    girlIcon: 'https://t1.picb.cc/uploads/2018/03/25/2tXuma.png',
    sex:1,
    myTrainDays: '10天',
    myTarget: '减肥10KG',
    myMoney: 590,
    trainMinTotal: 200,
    trainCalTotal: 20000,
    ec: {
      onInit: initChart
    },
  },

  /**
   * 更改训练计划
   */
  changeTrain:function(){
    wx.navigateTo({
      url: '/pages/requirement/requirement',
    })
  },

})

