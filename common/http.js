import Request from '@/js_sdk/luch-request/luch-request/index.js'
import md5 from './md5.js'
import util from './util.js'

// 创建签名
const createSign = config => {
  var timestamp = new Date().getTime()
  config.header.timestamp = timestamp
  let object = {
    contentType: 'json',
    method: config.method == 'UPLOAD' ? 'POST' : config.method,
    timestamp: timestamp + '',
    source: util.getPlatformFlag(),
    SECRET_KEY: 'serkhas&&23@@#hqw123e'
  }
  return md5.hex_md5(JSON.stringify(object).toUpperCase())
}

// 实例请求对象并全局配置
var http = new Request({
  header: {},
  baseURL: 'https://api.firedigit.cn', //正式
  // baseURL:'http://129.204.151.245:8222'  ,// 本地
  // baseURL:'http://129.204.151.245:8223'  // 本地
})

http.interceptors.request.use(
  config => {
    async function all() {
      if (!uni.getStorageSync('uuid')) {
        var uuid = util.generateRandomId()
        uni.setStorageSync('uuid', uuid)
      } else {
        var uuid = uni.getStorageSync('uuid')
      }
      // // 全埋点替换请求域名
      if (config.url == '/eventPoint/sessionStart' || config.url == '/eventPoint/sessionEnd' || config.url =='/eventPoint/pageView' || config.url == '/eventPoint/pageLeave' || config.url == '/eventPoint/userClick' ||
        config.url == '/eventPoint/viewScroll' || config.url == '/eventPoint/activeReport') {
        config.baseURL = 'https://api.firedigit.cn/statistics'
      }

      const data = {}
      // 实例请求对象并全局配置
      config.header = {
        ...config.header,
        ...data,
        uuid,
        extInfo: {
          model: uni.getSystemInfoSync().model,
          brand: uni.getSystemInfoSync().brand
        },
        sysVersion: uni.getSystemInfoSync().osVersion,
        sysModel: uni.getSystemInfoSync().model,
        'api-ver': 'v3',
        packChannel: 'qmyx_default_weapp',
        channel: uni.getStorageSync('wxChannel') || 'qmyx_default_weapp',
        channelFlag: uni.getStorageSync('channelflag') || 1,
      }
      // 注入token
      var token = uni.getStorageSync('token') || ''
      if (token) config.header.token = token

      // 注入设备id
      var device_id = uni.getSystemInfoSync().deviceId
      if (device_id) config.header.device_id = device_id

      // 注入服务商id
      config.header.appletSource = 'wx'

      // 注入设备userid
      var userid = uni.getStorageSync('userInfo').id
      if (userid) {
        config.header.userid = userid
      }
      config.header.openid = uni.getStorageSync('openid')

      // version
      // 注入版本
      var version = uni.getAccountInfoSync().miniProgram.version || '100'
      if (version) config.header.version = version
      var versionName = uni.getAccountInfoSync().miniProgram.version || '1.0.0'
      if (versionName) config.header.versionName = versionName

      // 注入是否登录
      var is_login = uni.getStorageSync('token') ? true : false
      if (is_login) config.header.is_login = is_login


      // 注入来源平台
      var source = util.getPlatformFlag() || ''
      if (source) config.header.source = source
      var platform = util.getPlatformFlag() || ''
      if (platform) config.header.platform = platform
      // 注入朋友圈广告统计
      var gdtVid = uni.getStorageSync('gdtVid') || ''
      if (gdtVid) config.header.gdtVid = gdtVid
      // 快手广告
      var kuaishou = uni.getStorageSync('kuaishou') || ''
      if (kuaishou) config.header.kuaishou = kuaishou

      // 注入场景值
      var scene = uni.getStorageSync('scene') || ''
      if (scene) config.header.scene = scene

      // 注入渠道类型 （视频号）
      var channelType = uni.getStorageSync('channelType') || ''
      if (channelType) config.header.channelType = channelType || ''

      // 注入朋友圈广告的广告id
      var aid = uni.getStorageSync('aidChannel') || ''
      if (aid) config.header.aid = aid || ''

      // 注入推啊的第三方统计
      var taVid = uni.getStorageSync('taVid') || ''
      if (taVid) config.header.taVid = taVid
      // 注入签名
      config.header.sign = createSign(config)
      // console.log('----发起请求，', config)
      var gdtPid = uni.getStorageSync('gdtPid') || ''
      if (gdtPid) config.header.gdtPid = gdtPid
      return config
    }
    return all()
  },
  config => {
    console.log(config,99999)
    return Promise.reject(config)
  }
)

// 拦截请求对象
http.interceptors.response.use(
  response => {
    //token验证失败
    if (response.data.code == 401) {
      return response.data
    }
    // 服务器异常
    if (response.data.code == 500) {
      uni.showToast({
        title: response.data.message,
        icon: 'none'
      })
      return Promise.reject(response.data)
    }
    // 请求成功
    if (response.data.code == 200) {
      // 返回完成
      return response.data
    }
    // 状态码异常
    // return Promise.reject 可使promise状态进入catch
    return Promise.reject(response.data)
  },
  response => {
    /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log('响应码错误', response)
    uni.hideLoading()
    uni.showToast({
      title: response.data.message,
      icon: 'none',
      duration: 2000
    })
    return Promise.reject('接口状态码异常')
  }
)

// 导出请求实例
export default http
