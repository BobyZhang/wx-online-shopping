var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    id: 0,
    topic: {},
    topicList: [],
    commentCount: 0,
    commentList: []
  },
  onLoad: function (options) {
    // get para from previous page
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });

    // request for detail
    util.request(api.TopicDetail, {id: that.data.id}).then(res => {
      if (res.errno === 0) {
        that.setData({
          topic: res.data,
        });
        WxParse.wxParse('topicDetail', 'html', res.data.content, that);
      }
    });

    // request for related topics to recommend
    util.request(api.TopicRelated, {id: that.data.id}).then(res => {
      if (res.errno === 0) {
        that.setData({
          topicList: res.data 
        });
      }
    });
  },

  onReady: function () {

  },
  onShow: function () {
    this.getCommentList();
  },
  onHide: function () {

  },
  onUnload: function () {
    
  },

  getCommentList() {
    let that = this;
    util.request(api.CommentList, {valueId: that.data.id, typeId: 1, size: 5}).then(res => {
      if (res.errno === 0) {
        that.setData({
          commentList: res.data.data,
          commentCount: res.data.count
        });
        console.log(res.data)
      }
    });
  },

  postComment () {
    wx.navigateTo({
      url: '/pages/commentPost/commentPost?valueId=' + this.data.id + '&typeId=1',
    });
  }
})