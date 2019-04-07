import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import wechatAuth from './plugins/wechatAuth'//微信登录插件
import wx from 'weixin-js-sdk';
import './utils/rem'//rem适配
import Axios from 'axios'
import './assets/style/reset.css'
// import request from './utils/request'

const qs = require('qs');
// 注入jssdk配置
Axios.post(process.env.VUE_APP_API_URL + '/common/jsapi', { signurl:  window.location.href}).then( response => {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: response.data.appId, // 必填，公众号的唯一标识
        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
        signature: response.data.signature, // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'scanQRCode',
            'chooseWXPay'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready((res) => {
        console.log(res);
    });
    wx.error((res) => {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
})
    .catch(function (error) {
        console.log(error)
    });
router.beforeEach((to, from, next) => {
  if (store.state.loginStatus == 0 || store.state.loginStatus == undefined ) {
    //微信未授权登录跳转到授权登录页面
    let url = window.location.href;
    //解决重复登录url添加重复的code与state问题
    let parseUrl = qs.parse(url.split('?')[1]);
    let loginUrl;
    if (parseUrl.code && parseUrl.state) {
      delete parseUrl.code;
      delete parseUrl.state;
      loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`
    } else {
      loginUrl = url;
    }
    wechatAuth.redirect_uri = loginUrl;
    store.dispatch('setLoginStatus', 1);
      console.log('wechatAuth.authUrl:---------:' + wechatAuth.authUrl);
    window.location.href = wechatAuth.authUrl
  } else if (store.state.loginStatus == 1) {
    // alert("status: "+store.state.loginStatus)
    try {
      wechatAuth.returnFromWechat(to.fullPath)
    } catch (err) {
      store.dispatch('setLoginStatus', 0);
      next()
    }
    // 获取最终登录状态
    store.dispatch('loginWechatAuth', wechatAuth.code).then((res) => {
      if (res.code === 200) {
        store.dispatch('setLoginStatus', 2);
        // 登录成功注入jssdk
      } else {
        store.dispatch('setLoginStatus', 0);
      }
      next();
    }).catch((err) => {
      next();
    })
  } else {
    // alert(3)
    next();
  }
});

Vue.use(wechatAuth, {
  appid: process.env.VUE_APP_WECHAT_APPID
});

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
