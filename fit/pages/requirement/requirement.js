// pages/requirement/requirement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseTabIndex:2,
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
    let choseTabIndex = 2;
    if (data.currentTarget.id == 'loseWeight') {
      choseTabIndex = 1;
    }
    else if (data.currentTarget.id == 'moulding'){
      choseTabIndex = 2;
    }
    else if (data.currentTarget.id == 'addMuscle'){
      choseTabIndex = 3;
    }
    this.setData({
      choseTabIndex: choseTabIndex
    });
  },



  /**
   * 完成
   */
  finish:function(){
    console.info(this.data.weight);
    if (this.data.weight <= 0 || this.data.weight >= 500) {
      wx.showModal({
        title: "请输入正确的体重",
      });
      return;
    }

    if (this.data.height <= 0 || this.data.height >= 300) {
      wx.showModal({
        title: "请输入正确的身高",
      });
      return;
    }


    wx.showLoading({
      title:'正为您推荐计划',
      mask:true
    })

    wx.navigateTo({
      url: '/pages/recommendtarget/recommendtarget',
    })

    

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
})