import Vue from 'vue'
import util from './common/util.js'
import http from './common/http.js'
import './common/weData.js'
import './router'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
// 实例Vue
Vue.prototype.$util = util
Vue.prototype.$http = http 
// 注入手机应用的信息(手机系统信息+胶囊信息+状态栏高度+胶囊栏计算高度)
Vue.prototype.$phoneAppInfo = util.setPhoneAppInfo()


const app = new Vue({
  ...App
})

app.$mount()
