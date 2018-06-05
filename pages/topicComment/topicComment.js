var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 0,
    valueId: 0,
    showType: 0,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20
  },

  getCommentCount: function () {
    let that = this;
    util.request(api.CommentCount, {valueId: that.data.valueId, typeId: that.data.typeId}).then(res => {
      if (res.errno === 0) {
        that.setData({
          allCount: res.data.allCount,
          hasPicCount: res.data.hasPicCount
        });
      }
    });
  },

  getCommentList: function () {
    let that = this;
    util.request(api.CommentList, {
      valueId: that.data.valueId,
      typeId: that.data.typeId,
      size: that.data.size,
      page: (that.data.showType == 0 ? that.data.allpage : that.data.picPage),
      showType: that.data.showType
    }).then(res => {
      if (res.errno === 0) {
        if (that.data.showType == 0) {
          that.setData({
            allCommentList: that.data.allCommentList.concat(res.data.data),
            allPage: res.data.currentPage,
            comments: that.data.allCommentList.concat(res.data.data)
          })
        } else {
          that.setData({
            picCommentList: that.data.picCommentList.concat(res.data.data),
            picPage: res.data.currentPage,
            comments: that.data.picCommentList.concat(res.data.data)
          });
        }
      }
    });
  },

  onLoad: function (options) {
    this.setData({
      typeId: options.typeId,
      valueId: options.valueId
    });
    this.getCommentCount();
    this.getCommentList();
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  switchTab: function () {
    this.setData({
      showType: this.data.showType == 1 ? 0 : 1
    });
    this.getCommentList();
  },
  onReachBottom: function () {
    console.log('onPullDownRefresh');
    if (this.data.showType == 0) {
      if (this.data.allCount / this.data.size < this.data.allPage) {
        return false;
      }
      this.setData({
        'allPage': this.data.allPage + 1
      });
    } else {
      if (this.data.hasPicCount / this.data.size < this.data.picPage) {
        return false;
      }
      this.setData({
        'picPage': this.data.picPage + 1
      });
    }

    this.getCommentList();
  }
})