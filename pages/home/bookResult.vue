<template>
	<view class="wrapper">
		<view class="header">
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<view class="nav-box" :style="'height:'+capsuleHeight+'px'">
				<view class="go-back" @tap="goHome">
					<image class="back-icon"
						src="https://saasimg.quanminyanxuan.com/other/4f8e9da216ad496caf83e4dc39b365fb.png"
						mode="widthFix"></image>
				</view>
				<view class="title">你的专属小说</view>
			</view>
		</view>

		<view class="book-info" :style="'margin-top:'+(statusBarHeight + capsuleHeight + 30)+'px;'">
			<image class="book-cover"
				:src="bookInfo.image" mode="widthFix">
			</image>
			<view class="book-name">{{bookInfo.name || '生成中...'}}</view>
			<view class="book-author">作者：<text class="user-name"
					style="margin-right: 10rpx;">{{bookInfo.author || '生成中...'}}</text><text class="word-name"> ·
					{{bookInfo.blurb ? (Number(bookInfo.blurb.length) / 6).toFixed() : 0}}万字</text></view>
			<view class="book-desc">
				<view class="desc-line">
					<image class="icons"
						src="https://saasimg.quanminyanxuan.com/other/7a5c29e13cf34f9e85652b196b98bade.png"
						mode="widthFix"></image>
					<text style="margin-right: 20rpx;">
						简介
					</text>
					<!-- <text class="desc-type">穿越</text>
          <text class="desc-type">修仙</text>
          <text class="desc-type">爽文</text> -->
				</view>
				<scroll-view scroll-y="true" class="view-scroll">
					<view class="desc-word">
						{{ resultText || '生成中...'}}
						<!-- <view v-if="!resultText">
							{{ '生成中...'}}
						</view>
						<view v-else v-html="resultText">
							
						</view> -->
					</view>
				</scroll-view>

			</view>
			<div class="go-btn mymovebtn" @tap="getMyBook" v-if="!showPercent">立即阅读</div>
			<view class="percent-button" :style="{ '--percent': percent + '%' }" v-else>
				<text class="button-text">正在生成中...{{percent}}%</text>
				<view class="percent-indicator"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		method
	} from 'lodash'
	import SteamRequest from './request.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				capsuleHeight: 0,
				bookInfo: {},
				wordNums: '',
				orderNo: '',
				timer: null,
				bookTimer:null,
				bookDetail: '',
				bookStatusTimer: '',
				bookBgList: [{
						title: '重生',
						id: 0,
					},
					{
						title: '玄幻',
						id: 1,
					},
					{
						title: '言情',
						id: 2,
					},
					{
						title: '悬疑',
						id: 3,
					},
					{
						title: '都市',
						id: 4,
					},
					{
						title: '快穿',
						id: 5,
					},
					{
						title: '穿越',
						id: 6,
					},
					{
						title: '重生',
						id: 7,
					}
				],
				userBtnFlag: false,
				resultText: '',
				originString: '',
				settingArr: [],
				percent: 0, // 初始百分比
				bookId:'',
				showPercent:false

			}
		},
		onLoad(e) {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			this.devBook()
			// if (uni.getStorageSync('bookInfo')) {
			// 	this.bookInfo = uni.getStorageSync('bookInfo')
			// 	this.wordNums = (Number(this.bookInfo.blurb.length) / 6).toFixed()
			// 	// 有缓存，直接请求小说详情
			// 	this.devBook()
			// 	this.getBookDetail()
			// } else {
			// 	this.devBook()
			// 	// this.getBook()
			// }
		},
		onShow(e) {

		},
		onHide() {
			if(this.timer != null){
				clearInterval(this.timer)
			}
			if(this.timer != null){
				clearInterval(this.bookTimer)	
			}
		},
		methods: {
			updatePercent(newPercent) {
				this.percent = newPercent;
			},
			//清除缓存
			setRemoveSS() {
				uni.removeStorageSync('bookInfo')
			},
			devBook() {
				const that = this
				let bgIndex = uni.getStorageSync('bookBgIndex') ? uni.getStorageSync('bookBgIndex') : 0
				const requestTask = uni.request({
					url: 'https://api.firedigit.cn/usersNovel/generateNovelStream', // 替换为你的流式API地址
					method: 'POST',

					responseType: 'arraybuffer',
					enableChunked: true,

					data: {
						"setting": this.bookBgList[bgIndex].title, // 故事背景
						"author": uni.getStorageSync('author'), // 作者
						"leader": uni.getStorageSync('leader01') + ',' + uni.getStorageSync('userSex01') + ',' +uni.getStorageSync('leader02') + ',' + uni.getStorageSync('userSex02'), // 主角
						"blurb": uni.getStorageSync('bookDesc'), // 简介
						"toolId": 2,
						// "setting": "重生",
						// "author": "张三",
						// "leader": "张楚生",
						// "blurb": "被冤枉，本以为要孤独终老，却出了车祸，一朝重生，俆明薇回到八零年代。这一世她要看清了身边所有对自己好的人，养父养母，弟弟，还有那个喜欢了她一辈子的男人。她会好好过这一世，好好爱那个男人，也让弟弟有出人头地的机会"
					},

					header: {
						"Accept": "text/event-stream",
						"Content-Type": "application/json;",
						"Connection": "keep-alive",
						"token": uni.getStorageSync('token'),
					},

					success: (res) => {
						// 获取数据流
						console.log(res, 'resssss')
						const stream = res.data;
					},
					fail: (err) => {
						console.log(err, 'errrrr')
						console.log('请求失败:', err);
					}
				});

				requestTask.onHeadersReceived(function(res) {
					console.log(res, '1111111111');
				});
				// 这里监听消息
				requestTask.onChunkReceived(function(res) {
					const arrayBuffer = res.data;

					const uint8Array = new Uint8Array(arrayBuffer);
					const textDecoder = new TextDecoder('utf-8');
					const text = textDecoder.decode(uint8Array);

					let textArr = text.replaceAll('\n', '').split('data:')
					// console.log(textArr, 'text')

					// let filteredArr = textArr.filter(item => { item && item.trim() });
					let filteredArr = []
					for (let i in textArr) {
						if (textArr[i]) {
							filteredArr.push(textArr[i])
						}
					}

					console.log(filteredArr, 'filteredArr')

					let strArr = []
					for (let i in filteredArr) {
						// 如果有完整一条json转对象的就直接转
						if (filteredArr[i][0] == '{' && filteredArr[i][filteredArr[i].length - 1] == '}') {
							let info = JSON.parse(filteredArr[i])
							that.settingArr.push(info.data.blurb)
							if(info.data.id){
								that.bookInfo.name = info.data.name
								that.bookInfo.author = info.data.author
								that.bookInfo.bookId = info.data.id
								that.bookInfo.image = info.data.image
								that.getBookDetail()
							}
							console.log(info,'infoinfo')
						} else {
							// 没有完整一条的先存一般，在跟后面的加起来
							if (!that.originString) {
								that.originString = filteredArr[i]
							} else {
								that.originString += filteredArr[i]
								if (that.originString[0] == '{' && that.originString[that.originString.length - 1] == '}') {
									let info = JSON.parse(that.originString)
									that.originString = ''
									that.settingArr.push(info.data.blurb)
								}
							}
						}
					}

					if (that.timer == null) {
						that.startSetTimeout()
					}
				})


			},
			startSetTimeout() {
				// console.log(this.settingArr,'this.settingArr')
				this.timer = setInterval(() => {
					if (this.settingArr[1]) {
						this.resultText = this.resultText + this.settingArr[1];
					}

					this.settingArr.shift()
					if (this.settingArr.length == 0) {
						clearInterval(this.timer)
					}
				}, 100);
			},
			buf2hex(buffer) {
				return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
			},
			hexToStr(hex) {
				let str = '';
				for (let i = 0; i < hex.length; i += 2) {
					str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
				}
				return str;
			},
			// getBook() {
			// 	uni.showLoading({
			// 		mask: true,
			// 		title: '生成中'
			// 	})
			// 	let bgIndex = uni.getStorageSync('bookBgIndex') ? uni.getStorageSync('bookBgIndex') : 0
			// 	this.$http.post('/usersNovel/generateNovel', {
			// 		toolId: 2,
			// 		setting: this.bookBgList[bgIndex].title, // 故事背景
			// 		author: uni.getStorageSync('author'), // 作者
			// 		leader: uni.getStorageSync('leader01'), // 主角
			// 		blurb: uni.getStorageSync('bookDesc') // 简介
			// 	}).then(res => {
			// 		// 返回的信息
			// 		uni.hideLoading()
			// 		// 开始轮询小说
			// 		this.getBookDetail()
			// 		this.bookInfo = res.data
			// 		uni.setStorageSync('bookId', this.bookInfo.id)
			// 		uni.setStorageSync('bookInfo', this.bookInfo)
			// 		this.wordNums = (Number(this.bookInfo.blurb.length) / 6).toFixed()
			// 	})
			// },
			getBookDetail() {
				// 2秒轮询一次
				this.bookTimer = setInterval(() => {
					this.$http.post('/usersNovel/getNovelStatus', {
						id: this.bookInfo.bookId
					}).then(res => {
						// 将生成一个TXT文件
						if (res && res.data.url) {
							clearInterval(this.bookTimer)
							this.bookDetail = res.data
							if (this.showPercent) {
								// 用户点击过查看小说，但小说还没生成，等待生成后，自动跳到查看页面
								this.setRemoveSS()
								uni.navigateTo({
									url: '/pages/bookList/lookBook?url=' + this.bookDetail.url
								})
							}
						}else{
							this.percent = res.data.rate
						}
					})
				}, 10000)
			},
			// 生成小说
			getMyBook() {
				// 生成小说，需要确定轮询已生成
				console.log(this.bookDetail,'this.bookDetail')
				if (this.bookDetail && this.bookDetail.url) {
					this.setRemoveSS()
					uni.setStorageSync('bookDetail', this.bookDetail)
					uni.navigateTo({
						url: '/pages/bookList/lookBook?url=' + this.bookDetail.url
					})
				} else{
					this.showPercent = true
				}
			},
			goHome() {
				uni.navigateBack()
			},

		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		width: 750rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #DFEDFE;
		background-image: url(https://saasimg.quanminyanxuan.com/other/60e08d3f94ef469b9bb1f5810679f6f7.png);
		background-size: 100%, 100%;
		background-repeat: no-repeat;
		overflow: hidden;

		.header {
			width: 750rpx;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
			background-image: url(https://saasimg.quanminyanxuan.com/other/60e08d3f94ef469b9bb1f5810679f6f7.png);
			background-repeat: no-repeat;
			background-size: 100%, 100%;

			.nav-box {
				width: 750rpx;
				display: flex;
				align-items: center;

				.go-back {
					width: 60rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;
					margin: 0 6rpx;

					.back-icon {
						width: 36rpx;
						height: 36rpx;
					}
				}

				.title {
					font-size: 40rpx;
					color: #121313;
					font-weight: 700;
				}
			}
		}


		.book-info {
			width: 646rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.book-cover {
				width: 192rpx;
				height: 268rpx;
				border-radius: 20rpx;
			}

			.book-name {
				margin: 46rpx 0 0;
				font-size: 40rpx;
				color: #444444;
				font-weight: 500;
			}

			.book-author {
				margin: 40rpx 0 0;
				font-size: 28rpx;
				color: #303132;
			}

			.book-desc {
				width: 690rpx;
				display: flex;
				flex-direction: column;
				background-color: #fff;
				border-radius: 26rpx;
				box-shadow: 0rpx 10rpx 10rpx 4rpx rgba(0, 0, 0, 0.12);
				box-sizing: border-box;
				padding: 40rpx 40rpx;
				margin-top: 50rpx;

				.desc-line {
					display: flex;
					align-items: center;
					font-size: 34rpx;
					font-weight: 700;
					color: #303132;

					.icons {
						width: 46rpx;
						height: 30rpx;
						margin-right: 12rpx;
					}

					.desc-type {
						width: 86rpx;
						height: 38rpx;
						border-radius: 6rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #555555;
						font-size: 20rpx;
						background-color: #d7e5ff;
						margin-right: 8rpx;
					}
				}

				.view-scroll {
					width: 100%;
					height: 460rpx;
					margin-top: 28rpx;
				}

				.desc-word {
					width: 100%;
					min-height: 100%;
					color: #555555;
					font-size: 26rpx;
					white-space: pre-wrap;
				}
			}
		}

		.go-btn {
			width: 670rpx;
			height: 116rpx;
			border-radius: 116rpx;
			background: linear-gradient(to right, #6BB6FF, #337BFF);
			margin-top: 50rpx;
			color: #ffffff;
			font-size: 32rpx;
			// font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	/* 按钮缩放连续动画 */
	.mymovebtn {
		animation: mymove 1s linear infinite;
	}

	@keyframes mymove {
		0% {
			transform: scale(1, 1);
		}

		50% {
			transform: scale(0.9, 0.9);
		}

		100% {
			transform: scale(1, 1);
		}
	}
	
	.percent-button {  
	  position: relative;  
	  display: flex;  
	  align-items: center;  
	  justify-content: center;  
	  width: 200px; /* 或者其他你需要的宽度 */  
	  height: 60px; /* 或者其他你需要的高度 */  
	  border-radius: 10px; /* 或者其他你需要的圆角大小 */  
	  overflow: hidden; /* 隐藏超出按钮范围的元素 */  
	  
	  width: 670rpx;
	  height: 116rpx;
	  border-radius: 116rpx;
	  background: #F9F9F9;
	  margin-top: 50rpx;
	}  
	  
	.button-text {  
	  z-index: 1; /* 确保文本在进度条上方 */  
	  color: #337CFC; /* 文本颜色 */  
	  font-size: 16px; /* 或者其他你需要的字体大小 */  
	}  
	  
	.percent-indicator {  
	  position: absolute;  
	  top: 0;  
	  left: 0;  
	  width: var(--percent); /* 使用 CSS 变量来动态设置宽度 */  
	  height: 100%;  
	  background-color:#DBE5FA; /* 进度条颜色 */  
	} 
</style>