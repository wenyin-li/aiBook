const pageCurrent = 1
const pageSize = 10
let platform = uni.getSystemInfoSync().platform // 获取平台类别
var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null //日志打印
let pageJson = require('../router/path.js')
let pageHeight = 0 //页面高度
let clickFlag = true
let baseUrl = uni.getStorageSync('developUrl').baseURL2 || 'https://app.yitanjj.com/#' //正式
// let baseUrl = 'https://m.quanminyanxuan.com/#'  //测试
// let baseUrl = 'https://platform.quanminyanxuan.com' //JQ  h5
// let baseUrl = 'http://192.168.20.88:8080/#'   //开发
// let baseUrl = 'http://192.168.10.80:8080/#' //开发fjs
let baseH5Url = uni.getStorageSync('developUrl').baseURL3 || 'https://appinner.yitanjj.com' //正式
// let baseH5Url = 'http://192.168.10.118:5500'  //测试  https://appinner.quanminyanxuan.com

// 客服链接
let kefuUrl = 'https://work.weixin.qq.com/kfid/kfcbb3a5801da801ff1'
// 企业id
let qiyeId = 'wwef2ff27865d26143'

let appId = 'wxd4f9ac94c6de6baa'

import http from '@/common/http.js'


uni.getSystemInfo({
  /**
   * 全民生活馆
   *
   * @author zhangyuqi
   * @version 3.0
   * @date 2022/5/4
   */
  success: function(res) {
    // console.log(res.model);
    // console.log(res.pixelRatio);
    // console.log(res.windowWidth);
    // console.log(res.windowHeight);
    // console.log(res.language);
    // console.log(res.version);
    // console.log(res.platform);
    pageHeight = res.windowHeight
  }
})
// 活动事件统计
const activeReport = (data, callback) => {
  let params = Object.assign({
    secPlatform: 'WECHAT'
  }, data)
  http
    .post('/statistics/eventPoint/activeReport', params)
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}
const pagedirect = (url) => {
  if (url.indexOf('*') != -1) {
    url = url.replace(/\*/g, '=')
    url = url.replace(/\@/g, '&')
    url = url.replace('&', '?')
  }
  // ?\& 变 @     = 变 *
  // https://appinner.yitanjj.com/pages/integralCenter/secondClass.html?specialId=336&columnId=318&type=1
  // https://appinner.yitanjj.com/pages/integralCenter/secondClass.html@specialId*336@columnId*318@type*1
  if (url.indexOf('.html') != -1) {
    // 去 appinner h5
    openWebH5PageNew(url)
  } else if (url.indexOf('/#/') != -1) {
    openWebPage(url)
  } else {
    // 去小程序原生页面
    if (url.indexOf('/home/homeVip') != -1 || url.indexOf('/news/news') != -1 || url.indexOf('/member/index') != -1) {
      // 去商城
      uni.switchTab({
        url: url
      })
    } else {
      // 去其他页面
      uni.navigateTo({
        url: url
      })
    }
  }
}

const getEmitValue = function(e) {
  console.log(platform)
  console.log(e)
  let value = ''
  if (e.detail == undefined) {
    return e
  } else {
    return e.detail.__args__[0]
  }
  // switch (platform) {
  // 	case 'android':
  // 		value = e.detail.__args__[0];
  // 		break;
  // 	case 'ios':
  // 		value = e;
  // 		break;
  // 	case 'h5':
  // 		value = e;
  // 		break;
  // 	default:
  // 		value = e
  // 		break;
  // }
  // return value;
}
const getSystemInfoSync = function() {
  // if (process.env.NODE_ENV === 'development') {
  // 	platform = 'development'
  // }
  return platform
}
//设置页面监听
const refresh = function(that, name, success) {
  that.$eventHub.$off(name) //绑定事件前先解绑原先的事件
  that.$eventHub.$on(name, function(data) {
    success(data)
  })
}
//触发页面监听
const emitRefesh = function(that, name, data, isOff = false) {
  that.$eventHub.$emit(name, data) //触发监听
  if (isOff) {
    that.$eventHub.$off(name) //移除监听
  }
}
const toFixedInPage = function(num) {
  var curNum = parseFloat(num).toFixed(5)
  var result = curNum.substring(0, curNum.indexOf('.') + 3) //用字符串截方法"substring"取避免"toFixed"四舍五入，
  return result //最终返回的结果是字符串，有数值加减操作时要特别注意转换；
}

//验证手机号
const verificationPhone = function(phone, show) {
  let flag = /^1[3456789]\d{9}$/.test(phone)
  if (phone == undefined || (phone == '' && show)) {
    showToast('手机号为空')
    return flag
  }
  if (show && !flag) {
    showToast('手机号格式错误')
  }
  return flag
}
const showToast = function(title) {
  uni.showToast({
    title: title,
    icon: 'none'
  })
}
const formatEndTime = (date) => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}`
}
const formatEndTimes = (date) => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${year}-${month}-${day}`
}
const onLiveEndTime = (date) => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

  var date0 = GetDateStr(0); //今天
  var str0 = date0.split("-");
  str0[1] = str0[1].length == 1 ? '0' + str0[1] : str0[1];
  str0[2] = str0[2].length == 1 ? '0' + str0[2] : str0[2];

  var date1 = GetDateStr(1); //明天
  var str1 = date1.split("-");
  str1[1] = str1[1].length == 1 ? '0' + str1[1] : str1[1];
  str1[2] = str1[2].length == 1 ? '0' + str1[2] : str1[2];


  var date2 = GetDateStr(2); //后天
  var str2 = date2.split("-");
  str2[1] = str2[1].length == 1 ? '0' + str2[1] : str2[1];
  str2[2] = str2[2].length == 1 ? '0' + str2[2] : str2[2];

  if (year == str0[0] && month == str0[1] && day == str0[2]) {
    return "今天" + " " + hour + ":" + minute
  } else if (year == str1[0] && month == str1[1] && day == str1[2]) {
    return "明天" + " " + hour + ":" + minute
  } else if (year == str2[0] && month == str2[1] && day == str2[2]) {
    return "后天" + " " + hour + ":" + minute
  } else {
    return `${month}-${day} ${hour}:${minute}`
  }
}
const GetDateStr = (AddDayCount) => {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
}
const listLoading = function(_this, reqest) {
  let loadMessage = 0 //加载更多
  _this.loadMessage = 2 //加载中
  reqest().then(({
    dataLength = 0,
    reqTotal = 0,
    refreshStop
  }) => {
    if (refreshStop) {
      refreshStop()
    }
    if (dataLength >= reqTotal) {
      loadMessage = 1 //没有更多数据
    }
    _this.loadMessage = loadMessage //修改加载信息
  })
}
const reachBottom = function(_this, success) {
  if (_this.loadMessage == 1) {
    return
  } else {
    _this.pageCurrent = ++_this.pageCurrent
    success()
  }
}
const showModal = function(title, content, success, noCancel = true) {
  uni.showModal({
    title,
    content,
    confirmColor: '#2c2e44',
    cancelColor: '#999999',
    showCancel: noCancel,
    success: e => {
      if (e['confirm']) {
        if (success) {
          success()
        }
      }
    }
  })
}
const getNowDate = function() {
  function judgeStr(str) {
    str = str + ''
    if (str.length > 1) {
      return str
    } else {
      return '0' + str
    }
  }
  let date = new Date()
  date = `${date.getFullYear()}-${judgeStr(
    date.getMonth() + 1 + ''
  )}-${judgeStr(date.getDate())}`
  return date
}
const getDate = function(value) {
  var now = new Date(value),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate()
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    now.toTimeString().substr(0, 8)
  )
}
const phoneModel = function() {
  const value = uni.getStorageSync('model')
  return value
}
const getSystem = function() {
  const value = uni.getStorageSync('system')
  return value
}
const genTestUserSig = function(userID) {
  /**
   * 腾讯云 SDKAppId，需要替换为您自己账号下的 SDKAppId。
   *
   * 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav ) 创建应用，即可看到 SDKAppId，
   * 它是腾讯云用于区分客户的唯一标识。
   */
  var SDKAPPID = 0
  /**
   * 签名过期时间，建议不要设置的过短
   * <p>
   * 时间单位：秒
   * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
   */
  var EXPIRETIME = 604800
  /**
   * 计算签名用的加密密钥，获取步骤如下：
   *
   * step1. 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav )，如果还没有应用就创建一个，
   * step2. 单击“应用配置”进入基础配置页面，并进一步找到“帐号体系集成”部分。
   * step3. 点击“查看密钥”按钮，就可以看到计算 UserSig 使用的加密的密钥了，请将其拷贝并复制到如下的变量中
   *
   * 注意：该方案仅适用于调试Demo，正式上线前请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。
   * 文档：https://cloud.tencent.com/document/product/647/17275#Server
   */
  var SECRETKEY = ''
  var generator = new window.LibGenerateTestUserSig(
    1400386337,
    SECRETKEY,
    EXPIRETIME
  )
  var userSig = generator.genTestUserSig(userID)
  console.log(1400386337, userSig)
  return {
    SDKAppID: 1400386337,
    userSig: userSig
  }
}

const formatTime = (date, type) => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  if (type == 'minute') {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  } else {
    return [year, month, day].map(formatNumber).join('-')
  }

}
const overTime = date => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const overdata = {
    year: year,
    month: month,
    day: day
  }
  return [overdata]
}
const dataTime = date => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [month, day].map(formatNumber).join('-')
}

const dayTime = date => {
  var n = date
  var date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getOrderId = function() {
  const value = uni.getStorageSync('orderId')
  return value
}

// 获取平台标识
const getPlatformFlag = () => {
  return 'weapp'
}

// 是否已登录
const isLogin = () => {
  // 取全局
  let token = uni.getStorageSync('token') || ''
  if (token) {
    return true
  } else {
    return false
  }
}

// 获取用户信息
const updateUserInfo = () => {
  return new Promise((resolve, reject) => {
    http.get('/users/users/getUsers').then(res => {
      console.log('更新用户信息', res.data)
      resolve(res.data)
    })
  })
}

// 刷新图库
// const getImgList = () => {
//   return new Promise((resolve, reject) => { 
//     http.get('/mallv2/common/getImgList').then(res => {
//       let tmp = {}
//       Object.keys(res.data.app).map(key => {
//         tmp[`${key}`] = res.data.app[`${key}`].img
//       }); 
//       resolve(tmp)
//     })
//   })
// } 

// 请求当前应用配置
const getAppConfig = version => {
  return new Promise((resolve, reject) => {
    // 获取当前APP版本号
    http
      .get('/users/login/environment', {
        params: {
          version: version, //自定义版本号
          platform: getPlatformFlag() //平台标识
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject()
      })
  })
}

// 验证函数
const formValidation = (type, value) => {
  if (type == 'phone') {
    if (value == '' || value == undefined) {
      return false
    }
    return !/^1[3456789]\d{9}$/.test(value)
  }
  if ((type = 'name')) {
    let regex = new RegExp(
      '^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,20}$'
    )
    if (!value) {
      showToast('昵称不能为空')
      return false
    }
    if (!regex.test(value) || value.length < 1 || value.length > 8) {
      showToast('昵称为1-8字数，由中英文、数字组成')
      return false
    } else {
      return true
    }
  }
}

// 生成随机id
const generateRandomId = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
//登录页面跳转中间件,loginType登录方式jv极光
const loginRedirectTo = (source, loginType) => {
  uni.redirectTo({
    url: '/packageB/pages/member/login'
  })
}
//点击防抖
// const debounce = function (fn, t) {
//   let delay = t || 500
//   let timer
//   console.log(fn)
//   console.log(typeof fn)
//   return function () {
//     let args = arguments
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       timer = null
//       fn.apply(this, args)
//     }, delay)
//   }
// }
//点击防抖
const debounce = function(fn, t) {
  let delay = t || 500
  let timer
  return new Promise((resolve, reject) => {
    clearTimeout(timer);
    if (clickFlag) {
      fn.apply(this, arguments);
      clickFlag = false
    } else {
      // uni.showToast({
      //   title:'操作频繁，请稍后',
      //   icon:'none'
      // })
    }
    timer = setTimeout(() => {
      clickFlag = true
    }, delay)
  })
}

const getClientId = () => {
  return new Promise((resolve, reject) => {
    var cid = plus.push.getClientInfo().clientid //客户端标识
    console.log(cid, 'cidcdiidiididdi')
    if (!cid) {
      setTimeout(() => {
        cid = plus.push.getClientInfo().clientid //客户端标识
        resolve(cid)
      })
    } else {
      resolve(cid)
    }
  })
}

// 获取用户网络状态
const getUserNetworkType = () => {
  return new Promise((resolve, reject) => {
    uni.getNetworkType({
      success: res => {
        resolve(res.networkType)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 缺省图无网络逻辑
const networkAnomaly = () => {
  let RouteList = getCurrentPages()
  let currentRoute = RouteList[RouteList.length - 1] // 当前路由
  console.log('网络缺省图', currentRoute)
  if (currentRoute) {
    let redirectTo = currentRoute.route // 重定向路由(要去的页面)
    // 获取传参
    let paramsList = Object.keys(currentRoute.options)
    let formatParams = '' // 携带的参数
    if (paramsList.length) {
      paramsList.forEach(key => {
        formatParams += `&${key}=${currentRoute.options[key]}`
      })
    }
    return new Promise((resolve, reject) => {
      if (redirectTo != 'pages/home/networkError') {
        getUserNetworkType()
          .then(netStatus => {
            uni.setStorageSync('networkType', netStatus)
            console.log('网络成功', netStatus)
            if (netStatus == 'none') {
              uni.redirectTo({
                url: `/pages/home/networkError?redirectTo=/${redirectTo}${formatParams}`
              })
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  } else {
    // 未生成当前路由
  }
}
// 分享统计
const shareStatistics = (dataId, type, callback) => {
  http
    .post('/mallv2/statistics/shareStatisticsData', {
      dataId,
      type
    })
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}


// 跳转web H5页面
const openWebPage = (url, type) => {
  console.log(url.indexOf('#'))
  let urltest = ''
  if (url.indexOf('#') > -1) {
    urltest = url.split('#')[1]
  } else {
    urltest = url
  }
  let url1 = urltest.replace('?', '&')
  // type  默认普通跳转  1
  if (type == 1) {
    uni.redirectTo({
      url: "/packageA/pages/webview/webview?url=" + baseUrl + url1
    })
  } else {
    uni.navigateTo({
      url: "/packageA/pages/webview/webview?url=" + baseUrl + url1
    })
  }
}
// 所有H5跳转,appinner 2个方法 都转到C包
const openWebH5Page = (url, type) => {
  console.log(url.indexOf('#'))
  let urltest = ''
  if (url.indexOf('#') > -1) {
    urltest = url.split('#')[1]
  } else {
    urltest = url
  }
  let url1 = urltest.replace('?', '&')
  // type  默认普通跳转  1
  if (type == 1) {
    uni.redirectTo({
      url: "/packageC/pages/webviewH5/webview?url=" + baseH5Url + url1
    })
  } else {
    uni.navigateTo({
      url: "/packageC/pages/webviewH5/webview?url=" + baseH5Url + url1
    })
  }
}
// 新的开远跳转
const openWebH5PageNew = (url, type) => {
  let url1 = url.replace('?', '&')
  // type  默认普通跳转  1
  if (type == 1) {
    uni.redirectTo({
      url: "/packageC/pages/webviewH5/webview?url=" + url1
    })
  } else {
    uni.navigateTo({
      url: "/packageC/pages/webviewH5/webview?url=" + url1
    })
  }
}
// 截取URL参数
// const getUrlKey = () => {
//   let pageList = getCurrentPages()
//   let currentPage = pageList[pageList.length - 1] //获取当前页面的对象
//   console.log('当前页的路径', currentPage)
//   let curParam = currentPage.options
//   if (curParam.channel) {
//     console.log('当前页的路径', curParam.channel)
//     return curParam.channel
//   } else {
//     return ''
//   }
// }

// 页面滚动事件埋点
const viewScroll = (stayDuration, callback) => {
  let systemInfo = uni.getSystemInfoSync()
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const referrerPage = pages[pages.length - 2];
  let pageTitle = ''
  pageJson.data.pages.forEach(item => {
    if (item.path == currentPage.route) {
      pageTitle = item.name
    }
  })
  let viewData = {
    sessionId: uni.getStorageSync('sessionId'), //会话ID
    os: systemInfo.osName, //系统
    osVersion: systemInfo.osVersion, //系统版本
    screenHeight: systemInfo.screenHeight, //屏幕高度
    screenWidth: systemInfo.screenWidth, //屏幕宽度
    pageTitle: pageTitle, //页面标题
    url: currentPage.route, //页面地址
    urlQuery: currentPage.options || {}, //页面参数
    referrer: referrerPage == undefined ? '' : referrerPage.route, //前向地址
    referrerQuery: referrerPage == undefined ? '' : referrerPage.options, //前向地址参数
    isEntryPage: referrerPage == undefined ? true : false, //是否入口页
    mpAppid: 'wxd4f9ac94c6de6baa', //小程序APPID
    secPlatform: 'weapp', //小程序平台(weapp)
    stayDuration: stayDuration,
  }
  http
    .post('/statistics/eventPoint/viewScroll', viewData)
    .then(res => {})
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}

// 点击事件埋点
const clickStatistics = (eventName, callback) => {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1].route;
  var module1 = ""
  var pageCode = ""
  pageJson.data.pages.forEach(item => {
    if (item.path == page) {
      module1 = item.module
      pageCode = item.pageCode
    }
  })

  let params = {
    "networkType": uni.getStorageSync('networkType') || 'wifi',
    "userId": uni.getStorageSync('openid') || '',
    "module": module1,
    "pageCode": pageCode,
    "type": "CLICK",
    "item": {
      "duration": "",
      "id": '',
      "subjectId": '',
      "eventName": eventName,
      "sourcePage": "",
    }
  }
  // http
  //   .post('/mallv2/app/data/userBehavior', params)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })
}
// 统一埋点事件
const statisticsData = (data, callback) => {
  let params = Object.assign({
    networkType: uni.getStorageSync('networkType') || 'wifi',
    userId: uni.getStorageSync('openid') || ''
  }, data)
  // http
  //   .post('/mallv2/app/data/userBehavior', params)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })
}
// 会话开始
const sessionStart = (data, callback) => {
  // http
  //   .post('/eventPoint/sessionStart', data)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })


  http
    .post('/statistics/eventPoint/sessionStart', data)
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}
// 结束会话
const sessionEnd = (data, callback) => {
  // http
  //   .post('/eventPoint/sessionEnd', data)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })

  http
    .post('/statistics/eventPoint/sessionEnd', data)
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}
// 浏览页面
const pageView = (data, callback) => {
  // http
  //   .post('/eventPoint/pageView', data)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })

  http
    .post('/statistics/eventPoint/pageView', data)
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}
// 离开页面
const pageLeave = (data, callback) => {
  // http
  //   .post('/eventPoint/pageLeave', data)
  //   .then(res => {
  //     if (res.data) {
  //       uni.showToast({
  //         title: res.data,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   })
  //   .catch(err => {})
  //   .finally(() => {
  //     if (callback) {
  //       callback()
  //     }
  //   })

  http
    .post('/statistics/eventPoint/pageLeave', data)
    .then(res => {
      if (res.data) {
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {})
    .finally(() => {
      if (callback) {
        callback()
      }
    })
}


// 小程序获取手机号登录回调
const handlePhoneQuickLogin = (event, weappLoginObj, callback) => {
  if (!Object.keys(weappLoginObj).length) {
    return
  }
  http
    .post('/users/login/wxPhoneLoginV2', {
      ...weappLoginObj,
      sessionKeyB64: weappLoginObj.session_key,
      encryptDataB64: event.detail.encryptedData,
      ivB64: event.detail.iv
    })
    .then(res => {
      callback(res.data, event.currentTarget.dataset.url)
    })
    .catch(err => {
      console.log('登录失败', err)
    })
}


const getEndTime = (overdueTime) => {
  var nowTime = new Date()
  var nMS = overdueTime - nowTime.getTime()
  var myD = Math.floor(nMS / (1000 * 60 * 60 * 24))
  var myH = Math.floor(nMS / (1000 * 60 * 60)) % 24
  if (myD > 0) {
    return myD + '天'
  } else {
    if (myH > 1) {
      return myH + '小时'
    } else {
      return '1小时'
    }
  }
}
const waitting = (cb) => {
  let timer = setInterval(() => {
    if (wx.getStorageSync("token")) {
      cb && cb();
      clearInterval(timer);
    }
  }, 500)
}
// 新客服
const chatUrlNew = (type, details) => {
  if (type == 1) {
    // type == 1 是商品详情页
    // let productInfo = {
    //   pid:details.id,
    //   title:details.longTitle,
    //   img:details.productImg,
    //   info:details.descr,
    //   price:details.shelvesPrice > 0 ? details.shelvesPrice : details.price,
    //   url:'/',
    // }
    // openWebH5Page('/pages/newsChat/index.html?product='+JSON.stringify(productInfo))
    uni.navigateTo({
      url: `/pages/news/newsCart?type=${type}&id=${details.id}&shelvesId=${details.shelvesId}`
    })
  } else if (type == 2) {
    // 订单详情页
    // let productInfo = {
    //   pid:details.orderInfoList[0].childOrderNo, //订单给的id是订单编号
    //   title:details.orderInfoList[0].productName,
    //   img:details.orderInfoList[0].productImg,
    //   info:details.orderInfoList[0].descr,
    //   price:details.realTotalMoney,
    //   url:'/',
    // }
    // openWebH5Page('/pages/newsChat/index.html?product='+JSON.stringify(productInfo))
    uni.navigateTo({
      url: `/pages/news/newsCart?type=${type}&id=${details.orderInfoList[0].childOrderNo}`
    })
  } else if (type == 3) {
    // let productInfo = {
    //   pid:details.serviceNo, //售后给的是售后编号
    //   title:details.productName,
    //   img:details.productImg,
    //   info:'无',
    //   price:details.amount,
    //   url:'/',
    // }
    // openWebH5Page('/pages/newsChat/index.html?product='+JSON.stringify(productInfo))
    uni.navigateTo({
      url: `/pages/news/newsCart?type=${type}&id=${details.serviceNo}`
    })
  } else {
    // 个人中心和消息中心
    uni.navigateTo({
      url: '/pages/news/newsCart'
    })
  }
}
// 客服
const chatUrl = (type, details, activityId, detailsInfo) => {
  // type 1商品详情 2订单详情 3售后详情  4普通
  if (type == 1) {
    let price1 = 0
    let discount = ''
    if (details.shelvesId == 0) {
      price1 = details.price
    } else {
      price1 = activityId == -1 ? details.shelvesPrice : activityId == 1 ? details.price : activityId == 2 ? details
        .shelvesPrice || details.price : activityId == 3 ? details.originalPrice || 0 : activityId == 4 ? details
        .shelvesPrice || 0 : activityId == 6 ? details.shelvesPrice || 0 : activityId == 8 ? details.shelvesPrice ||
        0 : activityId == 9 ? details.beforeShelvesPrice || 0 : details.price
    }
    let productInfo =
      `{"productInfo":{"title":"${details.productName}","sub_title":"￥${price1}","goodsId":"${details.id}","img":"${details.productImg}"}}`

    uni.navigateTo({
      url: `/pages/news/chat?productInfo=${productInfo}`
    })
  }
  if (type == 2) {
    let str = ''
    if (details.orderInfoList[0].orderinfoStatus == 0) {
      str = '待付款'
    }
    if (details.orderInfoList[0].orderinfoStatus == 1) {
      str = '待发货'
    }
    if (details.orderInfoList[0].orderinfoStatus == 2) {
      str = '待收货'
    }
    if (details.orderInfoList[0].orderinfoStatus == 3) {
      str = '已完成'
    }
    if (details.orderInfoList[0].orderinfoStatus == 4 || details.orderInfoList[0].orderinfoStatus == 5) {
      str = '交易关闭'
    }
    if (details.orderInfoList[0].orderinfoStatus == 6) {
      str = '售后中'
    }

    let productInfo =
      `{"productInfo":{"title":"${details.orderInfoList[0].productName}","orderId":"${details.orderInfoList[0].childOrderNo}","other_title_two":"${str}","img":"${details.orderInfoList[0].productImg}"}}`

    uni.navigateTo({
      url: `/pages/news/chat?productInfo=${productInfo}&orderId=${details.orderInfoList[0].orderId}`
    })

  }
  if (type == 3) {
    let str = ''
    let s = details.status
    if (s == 1) {
      str = '等待审核'
    } else if (s == 2) {
      str = '待处理退货'
    } else if (s == 3 || s == 8) {
      str = '待商品入库审核'
    } else if (s == 4) {
      str = '待财务退款'
    } else if (s == 5) {
      str = '售后关闭'
    } else if (s == 6) {
      str = '售后关闭'
    } else if (s == 7) {
      str = '售后关闭'
    } else if (s == 9) {
      str = '售后完成'
    }
    let productInfo =
      `{"productInfo":{"title":"${details.productName}","orderId":"${details.serviceNo}","other_title_two":"${str}","img":"${details.productImg}"}}`

    uni.navigateTo({
      url: `/pages/news/chat?productInfo=${productInfo}&orderId=${details.ordersInfoId}`
    })
  }
  if (type == 4) {
    uni.navigateTo({
      url: '/pages/news/chat'
    })
  }
}
// 日志模块
const loginfo = () => {
  if (!log) return
  log.info.apply(log, arguments)
}
const logwarn = () => {
  if (!log) return
  log.warn.apply(log, arguments)
}
const logerror = () => {
  if (!log) return
  log.error.apply(log, arguments)
}
const logsetFilterMsg = (msg) => { // 从基础库2.7.3开始支持
  if (!log || !log.setFilterMsg) return
  if (typeof msg !== 'string') return
  log.setFilterMsg(msg)
}
const logaddFilterMsg = (msg) => { // 从基础库2.8.1开始支持
  if (!log || !log.addFilterMsg) return
  if (typeof msg !== 'string') return
  log.addFilterMsg(msg)
}

const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
// 封装返回手机信息	
const setPhoneAppInfo = () => {
  let phoneApp = {}
  let phoneSystemDetail = uni.getSystemInfoSync()
  let menuButtonInfoApp = uni.getMenuButtonBoundingClientRect()
  // 赋值手机系统信息
  phoneApp.phoneSystemDetail = phoneSystemDetail
  // 赋值胶囊信息
  phoneApp.menuButtonInfoApp = menuButtonInfoApp
  // 赋值胶囊高度
  phoneApp.capsuleHeight = menuButtonInfoApp.height + (menuButtonInfoApp.top - phoneSystemDetail.statusBarHeight) * 2
  phoneApp.statusBarHeight = phoneSystemDetail.statusBarHeight
  phoneApp.top = menuButtonInfoApp.top
  // 赋值屏幕宽度,高度
  phoneApp.screenWidth = phoneSystemDetail.screenWidth
  phoneApp.screenHeight = phoneSystemDetail.screenHeight
  return phoneApp
}
export default {
  setPhoneAppInfo,
  formatTime,
  formatEndTime,
  formatEndTimes,
  onLiveEndTime,
  openWebPage,
  openWebH5Page,
  openWebH5PageNew,
  dayTime,
  dataTime,
  overTime,
  pageCurrent,
  pageSize,
  pageHeight,
  getEmitValue,
  getSystemInfoSync,
  refresh,
  emitRefesh,
  toFixedInPage,
  verificationPhone,
  showToast,
  listLoading,
  reachBottom,
  showModal,
  getNowDate,
  getDate,
  phoneModel,
  getOrderId,
  getSystem,
  genTestUserSig,
  getPlatformFlag,
  isLogin,
  updateUserInfo,
  formValidation,
  getAppConfig,
  generateRandomId,
  loginRedirectTo,
  debounce,
  getClientId,
  getUserNetworkType,
  networkAnomaly,
  shareStatistics,
  clickStatistics,
  viewScroll,
  statisticsData,
  sessionStart,
  sessionEnd,
  pageView,
  pageLeave,
  handlePhoneQuickLogin,
  getEndTime,
  kefuUrl,
  qiyeId,
  appId,
  waitting,
  loginfo,
  logwarn,
  logerror,
  logsetFilterMsg,
  logaddFilterMsg,
  chatUrl,
  baseUrl,
  baseH5Url,
  compareVersion,
  chatUrlNew,
  activeReport,
  pagedirect,
}
