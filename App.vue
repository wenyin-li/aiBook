<script>
  import util from '@/common/util.js'
  // import { set } from 'lodash'
  let pageJson = require('./router/path.js')

  export default {
    onLaunch(options) {
      // 用户未登入
      if (!uni.getStorageSync('token')) {
        this.getSessionKey()
      }
      // 项目启动，参数接收
      if (options.query.channel) {
        uni.setStorageSync('wxChannel', options.query.channel)
      } else {
        uni.removeStorageSync('wxChannel')
      }
      // 获取推啊参数
      if (options.query.a_oId) {
        uni.setStorageSync('taVid', options.query.a_oId)
      } else {
        uni.removeStorageSync('taVid')
      }
      // 广点通参数
      if (options.query.gdt_vid) {
        uni.setStorageSync('gdtVid', options.query.gdt_vid)
      } else {
        uni.removeStorageSync('gdtVid')
      }
      // 快手参数
      if (options.query.callback) {
        uni.setStorageSync('kuaishou', options.query.callback)
      } else {
        uni.removeStorageSync('kuaishou')
      }
      // 微信广告
      let weixinadinfo = options.query.weixinadinfo
      // 获取广告id
      let aid = 0
      if (weixinadinfo) {
        let weixinadinfoArr = weixinadinfo.split('.')
        aid = weixinadinfoArr[0]
        uni.setStorageSync('aidChannel', aid)
      } else {
        uni.removeStorageSync('aidChannel')
      }
      
    },

    onShow: function(options) {
      uni.setStorageSync('scene', options.scene)
    
      // uni.removeStorageSync('isBackBouter')
      // 如果是视频号进来的,渠道类型为6
      let scene = options.scene
      if (scene == 1175 || scene == 1176 || scene == 1177 || scene == 1184 || scene == 1191 ||
        scene == 1193 || scene == 1195 || scene == 1201 || scene == 1216 || scene == 10001) {
        uni.setStorageSync('channelType', 6)
      } else {
        uni.removeStorageSync('channelType')
      }
      let sessionId = 'wxd4f9' + Date.parse(new Date()) / 1000
      uni.setStorageSync('sessionId', sessionId)
      let systemInfo = uni.getSystemInfoSync()
      let params = {
        "sessionId": sessionId, //会话ID
        "os": systemInfo.osName, //系统类型
        "osVersion": systemInfo.osVersion, //系统版本
        "screenHeight": systemInfo.screenHeight, //屏幕高度
        "screenWidth": systemInfo.screenWidth, //屏幕宽度
        "mpAppid": this.$util.appId, //小程序APPID
        "secPlatform": "wx", //小程序平台
        "sceneWechat": uni.getStorageSync('scene'), //启动场景
		"userId":uni.getStorageSync('userId'),
		"platform":'wxapp',
      }
      util.sessionStart(params)
    },
    
    methods: {
      // 获取code
      getSessionKey() {
        uni.login({
          success: res=> {
            if (res.code) {
              // 获取session_key
              console.log(res.code,99999)
              // return
              this.codeTransId(res.code)
              
            }
          } 
        })
      },
      codeTransId(code){
        this.$http.post('/users/appletRegisterOrLogin', {
          appid: 'wx67eb96477b88139b', //自定义版本号
          code: code //平台标识
        })
        .then(res => {
          // 登入成功
          uni.setStorageSync('userInfo',res.data)
          uni.setStorageSync('userId',res.data.id)
          uni.setStorageSync('openId',res.data.openid)
          uni.setStorageSync('token',res.data.token)
        })
        .catch(err => {
          console.log(err,'codeTransId 失败')
        })
      }
    },
    onHide: function() {
      // 22-12-27  页面埋点
      let nowTime = Date.parse(new Date())
      let oldTime = uni.getStorageSync('statusTime')
      let duration = (nowTime - oldTime) / 1000
      uni.setStorageSync('statusTime', Date.parse(new Date()))
      console.log('App Hide')
      // uni.removeStorageSync('isBackBouter')
      // uni.removeStorageSync('taVid')
      // 时长数据
      let systemInfo = uni.getSystemInfoSync()
      let params = {
        "sessionId": uni.getStorageSync('sessionId'), //会话ID
        "os": systemInfo.osName, //系统类型
        "osVersion": systemInfo.osVersion, //系统版本
        "screenHeight": systemInfo.screenHeight, //屏幕高度
        "screenWidth": systemInfo.screenWidth, //屏幕宽度
        "sessionDuration": duration, //会话时长
        "mpAppid": this.$util.appId, //小程序APPID
        "secPlatform": "wx", //小程序平台
        "sceneWechat": uni.getStorageSync('scene'), //启动场景
		"userId":uni.getStorageSync('userId'),
		"platform":'wxapp',
      }
      util.sessionEnd(params)
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  image {
    display: block;
    will-change: transform;
  }
  // 清除scroll滚动的滚动条
  scroll-view ::-webkit-scrollbar {
    display: none;
  }
  view,text,input,textarea {
    box-sizing: border-box;
  }
</style>
