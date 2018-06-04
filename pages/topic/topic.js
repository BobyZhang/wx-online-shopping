var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    topicList: [],
    page: 1,
    size: 10,  // default showing items
    count: 0,  // totall count
    scrollTop: 0,
    showPage: false  // whether show pages nav
  },
  onLoad: function (options) {
    // options as para which was sent by previous page
    this.getTopic();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },

  // Request for Topic List
  getTopic: function () {
    let that = this;
    that.setData({
      scrollTop: 0,
      showPage: false,
      topicList: []
    });

    wx.showToast({
      title: 'LOADING...',
      icon: 'loading',
      duration: 2000
    });

    util.request(api.TopicList, {page: that.data.page, size: that.data.size}).then(res => {
      if (res.errno === 0) {
        console.log('get topic list successfully');
        that.setData({
          scrollTop: 0,
          topicList: res.data.data,
          showPage: true,
          count: res.data.count
        });
      }
      wx.hideToast();
    });
  },

  // Request for next page
  nextPage: function (event) {
    var that = this;
    if (this.data.page + 1 > that.data.count / that.data.size) {
      // do nothing
      return true;
    } else {
      that.setData({
        "page": parseInt(that.data.page) + 1
      });
      this.getTopic();
    }
  },

  // Request for prev page
  prevPage: function (event) {
    var that = this;
    if (this.data.page <= 1) {
      return false;
    } else {
      that.setData({
        "page": parseInt(that.data.page) - 1
      });
      this.getTopic();
    }
  }
})