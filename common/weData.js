import http from '@/common/http.js'
(function() {
  const isObject = function(obj) {
    if (obj === undefined || obj === null) {
      return false;
    } else {
      return toString.call(obj) == "[object Object]";
    }
  };
  // 劫持Component
  const _componentProto_ = Component;
  Component = function(options) {
    //options.methods内有uniapp注入的事件处理器__e及mpHook
    Object.keys(options.methods).forEach(methodName => {
      if (methodName == "__e") {
        //劫持事件处理器
        eventProxy(options.methods, methodName)
      }
    })
    _componentProto_.apply(this, arguments);
  }
	
	let pageJson = require('../router/path.js')
	
  function eventProxy(methodList, methodName) {
    const _funcProto_ = methodList[methodName];
    methodList[methodName] = function() {
      _funcProto_.apply(this, arguments);
      let prop = {};
      if (isObject(arguments[0])) {
        if (Object.keys(arguments[0]).length > 0) {
          //记录触发页面信息
          const pages = getCurrentPages();
          const currentPage = pages[pages.length - 1];
					const referrerPage = pages[pages.length - 2];
					let systemInfo = uni.getSystemInfoSync()
					let pageTitle = ''
					pageJson.data.pages.forEach(item => {
						if (item.path == currentPage.route) {
							pageTitle = item.name
						}
					})
					const current_target = arguments[0].currentTarget || {};
					// console.log(current_target,78)
					
					let clickData = {
						sessionId:uni.getStorageSync('sessionId'), //会话ID
						deviceId:uni.getStorageSync('uuid'), //设备id
						os:systemInfo.osName,//系统
						osVersion:systemInfo.osVersion,//系统版本
						screenHeight: systemInfo.screenHeight, //屏幕高度
						screenWidth: systemInfo.screenWidth, //屏幕宽度
						pageTitle:pageTitle, //页面标题
						url:currentPage.route,//页面地址
						urlQuery:JSON.stringify(currentPage.options) || '',//页面参数
						referrer:referrerPage == undefined?'':referrerPage.route,//前向地址
						referrerQuery:referrerPage == undefined?'':JSON.stringify(referrerPage.options),//前向地址参数
						isEntryPage:referrerPage == undefined ?true:false,//是否入口页
						mpAppid:'wxd4f9ac94c6de6baa',  //小程序APPID
						secPlatform:'wxapp',//小程序平台(weapp)
						elementId:current_target.id,//元素ID
						elementContent:JSON.stringify(arguments[0].detail),//元素内容
						elementName:current_target.id,//元素名称
						elementType:arguments[0]["type"],//元素类型
						
						"userId":uni.getStorageSync('userId'),
						"platform":'wxapp',
						// PLATFORM:'H5',//平台
						// SEC_PLATFORM:is_weixin()?'wxH5':'webH5',//二级平台
						// INVOKE_PLATFORM:'h5', //引用平台
					}
          const type = arguments[0]["type"]
          const dataset = current_target.dataset || {};
			
          if (!!dataset.eventOpts && type) {
            if (type == "tap" && current_target.id) { //只记录点击事件
							 postWeData(clickData); //在此处上传记录的事件数据
            }
           
          }
        }
      }
    };
  }

  const postWeData = function(data) {
    //埋点上传器
		http
		  .post('/eventPoint/userClick', data)
		  .then(res => {})
		  .catch(err => {})
		  .finally(() => {})
			
		// // 旧的
		// http
		//   .post('/eventData/eventPoint/userClick', data)
		//   .then(res => {})
		//   .catch(err => {})
		//   .finally(() => {})
  }
})()