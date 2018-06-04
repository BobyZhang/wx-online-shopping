var api = require('../config/api.js');

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day  = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') 
    + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token')
      },

      success: function (res) {
        console.log("request success");
        if (res.statusCode == 200) {
          if (res.data.errno == 401) {
            // need to login before operating
            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              // login service
              request(api.AuthLoginByWeixin, {code: code, userInfo: userInfo}, 'POST').then(res => {
                if (res.errno === 0) {
                  // store user information to local
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        reject(err);
        console.log("request failed");
      }
    });
  });
}

// check if session is expired
// UNRESOLVED
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    });
  });
}

// Wechat login
// UNRESOLVED
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('wechat login success!');
          console.log(res);
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

// get user information
// UNRESOLVED
function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log('get user information successfully');
        console.log(res);
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

// UNRESOLVED
function redirect(url) {
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

// UNRESOLVED
function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  });
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
}