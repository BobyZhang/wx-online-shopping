var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

// UNRESOLVED
// var user = require('./services/user.js');

App({
  onLaunch: function () {
    // request for user's login information
    /**
     *  UNRESOLVED
     */
    user.checkLogin().then(res => {
      if (res === true) {
        console.log('already login');
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        this.globalData.token = wx.getStorageSync('token');
      }
      if (res === false) {
        user.loginByWeixin().then(res => {
          console.log('login succeed');
          this.globalData.userInfo = wx.getStorageSync('userInfo');
          this.globalData.token = wx.getStorageSync('token');
        });
      }
    }).catch((err) => {
      console.log(err);
      console.log('app login failed');
    })
  },

  globalData: {
    userInfo: {
      nickname: 'Hi~',
      username: 'Login',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
  }
})