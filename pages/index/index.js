const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

const app = getApp();

Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brand: [],
    floorGoods: [],
    banner: [],
    channel: []
  },

  onShareAppMessage: function () {
    return {
      title: 'MockShop',
      desc: 'Wechat MiniProgram for online shopping',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(res => {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.catagoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
  },

  onLoad: function (options) {
    this.getIndexData();
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