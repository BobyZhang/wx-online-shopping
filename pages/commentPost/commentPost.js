var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    typeId: 0,
    valueId: 0,
    content: ''
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      typeId: parseInt(options.typeId),
      valueId: parseInt(options.valueId)
    });
  },

  // Close the comment page
  onClose () {
    wx.navigateBack({
      delta: 1
    });
  },

  // Post a comment
  onPost () {
    let that = this;
    if (!this.data.content) {
      util.showErrorToast('No comment');
      return false;
    }

    util.request(api.CommentPost, {
      typeId: that.data.typeId,
      valueId: that.data.valueId,
      content: that.data.content
    }, 'POST').then(res => {
      if (res.errno === 0) {
        wx.showToast({
          title: 'Succeed',
          complete: function () {
            wx.navigateBack({
              delta: 1
            });
          }
        })
      }
      console.log(res)
    });
  },

  bindInputValue(event) {
    let value = event.detail.value;
    // wheter beyond the limitation of 140 chars
    if (value && value.length > 140) {
      return false;
    }

    this.setData({
      content: event.detail.value,
    })
    console.log(event.detail)
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }

})