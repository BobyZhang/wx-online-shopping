const util = require('../utils/util.js');
const api = require('../config/api.js');

function loginByWeixin() {
  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo) => {
      // login service
      
      util.request(api.AuthLoginByWeixin, {code: code, userInfo: userInfo}, 'POST').then(res => {
        console.log(res);
        if (res.errno === 0) {
          // store user information to local
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch(err => {
        reject(err);
      });
    }).catch(err => {
      reject(err);
    })
  });
}

// check whether login
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      console.log('no login')
      resolve(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin
}