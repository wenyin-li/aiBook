import Vue from 'vue'
import uniCrazyRouter from "../common/router.js";
import util from '../common/util.js'
Vue.use(uniCrazyRouter)
let pageJson = require('./path.js')


uniCrazyRouter.beforeEach(async (to, from, next) => {
	// 逻辑代码
	next()
})

uniCrazyRouter.afterEach((to, from) => {
	var pages = getCurrentPages();
	var page = pages[pages.length - 1].route;
	var page1 = ''
	if (pages[pages.length - 2]) {
		page1 = pages[pages.length - 2].route;
	}
	console.log(to, 9999)
	console.log(from, 99990)
	uni.setStorageSync('oldPageUrl', from.url)
	// console.log(pages[pages.length - 2])
	// console.log(from,101010)
	// console.log(to,10101010222)

	let nowTime = Date.parse(new Date())
	let oldTime = uni.getStorageSync('oldTime')
	let duration = 0
	if (oldTime) {
		duration = (nowTime - oldTime) / 1000
	}

	uni.setStorageSync('oldTime', Date.parse(new Date()))

	var module1 = ""
	var module2 = ""
	var pageCode = ""
	var sourcePage = ""
	if (to.query) {
		var id = to.query.id ? to.query.id + "" : ""
		var id2 = to.query.topicId ? to.query.topicId + "" : ""
		var subjectId = to.query.subjectId ? to.query.subjectId + "" : ""
	} else {
		var id = ""
		var id2 = ""
		var subjectId = ""
	}
	if (from.query) {
		var id1 = from.query.id ? from.query.id + "" : ""
		var id3 = from.query.topicId ? from.query.topicId + "" : ""
		var subjectId = to.query.subjectId ? to.query.subjectId + "" : ""
	} else {
		var id1 = ""
		var id3 = ""
		var subjectId = ""
	}

	let entryPage = uni.getStorageSync('entryPage')
	let pageTitle = ''
	let pageTitle1 = ''
	pageJson.data.pages.forEach(item => {
		if (item.path == to.url) {
			pageTitle = item.name
		}
		if (item.path == from.url) {
			pageTitle1 = item.name
		}
	})

	pageJson.data.pages.forEach(item => {
		if (item.path == page) {
			module1 = item.module
			pageCode = item.pageCode
		}
		if (item.path == page1) {
			module2 = item.module
			sourcePage = item.pageCode
		}
	})

	// 浏览数据
	let params = {
		"module": module1,
		"pageCode": pageCode,
		"type": "VIEW",
		"item": {
			"duration": "",
			"id": id || id2 || "",
			"subjectId": subjectId,
			"eventName": "页面浏览",
			"sourcePage": sourcePage,
		}
	}
	// 时长数据
	let durationParams = {
		"module": module2,
		"pageCode": sourcePage,
		"type": "BROWSE",
		"item": {
			"duration": duration,
			"id": id1 || id3 || "",
			"subjectId": subjectId,
			"eventName": "页面浏览时长",
			"sourcePage": "",
		}
	}


	let systemInfo = uni.getSystemInfoSync()
	// 浏览数据
	let params1 = {
		"sessionId": uni.getStorageSync('sessionId'), //会话ID
		"os": systemInfo.osName, //系统类型
		"osVersion": systemInfo.osVersion, //系统版本
		"screenHeight": systemInfo.screenHeight, //屏幕高度
		"screenWidth": systemInfo.screenWidth, //屏幕宽度
		"pageTitle": pageTitle, //页面标题	
		"url": to.url, //页面地址
		"referrer": from.url, //前向地址
		"isEntryPage": to.url == entryPage ? true : false, //是否入口页
		"mpAppid": 'wxd4f9ac94c6de6baa', //小程序APPID
		"secPlatform": "wx", //小程序平台
		"userId":uni.getStorageSync('userId'),
		"platform":'wxapp',
	}
	// 离开数据
	let durationParams1 = {
		"sessionId": uni.getStorageSync('sessionId'), //会话ID
		"os": systemInfo.osName, //系统类型
		"osVersion": systemInfo.osVersion, //系统版本
		"screenHeight": systemInfo.screenHeight, //屏幕高度
		"screenWidth": systemInfo.screenWidth, //屏幕宽度
		"pageTitle": pageTitle1, //页面标题	
		"url": from.url, //页面地址
		"pageDuration": duration, //访问时长
		"isEntryPage": from.url == entryPage ? true : false, //是否入口页
		"mpAppid": 'wxd4f9ac94c6de6baa', //小程序APPID
		"secPlatform": "wx", //小程序平台
		"userId":uni.getStorageSync('userId'),
		"platform":'wxapp',
	}

	util.statisticsData(params)
	util.pageView(params1)
	if (from.url) {
		console.log(from,'from')
		util.statisticsData(durationParams)
		util.pageLeave(durationParams1)
	}
	// 上传数据
})

uniCrazyRouter.onError((to, from) => {
	// 逻辑代码
})