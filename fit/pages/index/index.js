import * as echarts from '../../ec-canvas/echarts';

//index.js
//获取应用实例
const app = getApp()

let chart = null;

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: 100
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#2C353E",
    color: ["#868686", "#67E0E3", "#9FE6B8"],

    tooltip: {
      trigger: 'axis',
      showContent: true,
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
        name: '分钟',
        textStyle: {
          color: '#868686'
        }
      }]
    },
    grid: {
      top: 20,
      left: 30,
      right: 30,
      bottom: 80,
      height: 80,
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
        name: 'bar',
        type: 'bar',
        smooth: false,
        data: [50, 55, 40, 45, 47, 46, 30, 28, 33, 33, 33],
        barWidth: 5,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: '#34b073',
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

    ]
  };

  chart.setOption(option);
  return chart;
}

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
    ec: {
      onInit: initChart
    },
    trainMinTotal: 200,
    trainDayTotal: 9,
    trainCalTotal: 20000
  },

  onLoad: function (query) {
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

  movelist: function(){
    wx.navigateTo({
      url: '/pages/movelist/movelist'
    })
  }


})