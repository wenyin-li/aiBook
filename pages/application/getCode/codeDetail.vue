<template>
	<view class="appDetail">
		<view class="header">
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<view class="nav-box" :style="'height:'+capsuleHeight+'px'">
				<view class="go-back" @tap="goHome">
					<image class="back-icon"
						src="https://saasimg.quanminyanxuan.com/other/4f8e9da216ad496caf83e4dc39b365fb.png"
						mode="widthFix"></image>
				</view>
				<view class="title">{{ appItem.name }}</view>
			</view>
		</view>
		<view class="info-tips" :style="'padding-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'">生成内容<text
				style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text> </view>
		<view class="text-box">
			<view class="input-box-max">
				<view class="content-box" style="white-space: pre-wrap;">
					{{ resultText || '生成中...'}}
				</view>
			</view>
		</view>
		<view class="rade">
			<view class="go-btn mymovebtn" id='goBtn' @click="copy">点击复制</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				capsuleHeight: 0,
				pageTitle: '短视频',
				content: '',
				appItem: {},
				describe: '',
				languageIndex: '',
				settingArr: [],
				originString:'',
				timer:null,
				resultText:''
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.content,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						});
					}
				});
			},
			goHome() {
				console.log('goHome')
				uni.switchTab({
					url: '/pages/bookList/index'
				})
			},
			writeCode(event) {
				const that = this
				const requestTask = uni.request({
					url: 'https://api.firedigit.cn/code/writeCodeStream',
					method: 'POST',
					data: {
						toolId: this.appItem.id,
						describe: this.describe,
						id: this.languageIndex
					},

					responseType: 'text',
					enableChunked: true,

					header: {
						"Accept": "text/event-stream",
						"Content-Type": "application/json;",
						"Connection": "keep-alive",
						"token": uni.getStorageSync('token'),
					},
					success: res => {
						console.log(res, 'resppppp')
					},
					fail: (err) => {
						console.log(err, 'errrrr')
						console.log('请求失败:', err);
					}
				})
				
				requestTask.onHeadersReceived(function(res) {
					console.log(res, '1111111111');
				});
				// 这里监听消息
				requestTask.onChunkReceived(function(res) {
					console.log(res,'流式数据')
					// 转码返回的2进制值
					const arrayBuffer = res.data;
					const uint8Array = new Uint8Array(arrayBuffer);
					const textDecoder = new TextDecoder('utf-8');
					const text = textDecoder.decode(uint8Array);
					
					//去掉前面的data:
					let textArr = text.replaceAll('\n', '').split('data:')
					
					let filteredArr = []
					//转化为一个数组
					for (let i in textArr) {
						if (textArr[i]) {
							filteredArr.push(textArr[i])
						}
					}
					console.log(filteredArr, 'filteredArr')
			
					// 获取返回的值
					let strArr = []
					
					for (let i in filteredArr) {
						// 如果有完整一条json转对象的就直接转
						if (filteredArr[i][0] == '{' && filteredArr[i][filteredArr[i].length - 1] == '}') {
							let info = JSON.parse(filteredArr[i])
							
							console.log(info,'infoinfo',that.settingArr,'that.settingArr',info.data.content)
							that.settingArr.push(info.data.content)
							// debugger
						} else {
							// 没有完整一条的先存一般，在跟后面的加起来
							if (!that.originString) {
								that.originString = filteredArr[i]
							} else {
								that.originString += filteredArr[i]
								if (that.originString[0] == '{' && that.originString[that.originString.length - 1] == '}') {
									let info = JSON.parse(that.originString) || ''
									that.originString = ''
									that.settingArr.push(info.data.content)
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
				this.timer = setInterval(() => {
					if (this.settingArr[0]) {
						this.resultText = this.resultText + this.settingArr[0];
					}
			
					this.settingArr.shift()
					if (this.settingArr.length == 0) {
						clearInterval(this.timer)
					}
				}, 100);
			},
			getAppItem() {
				this.appItem = uni.getStorageSync('appItem')
				this.describe = uni.getStorageSync('describe')
				this.languageIndex = uni.getStorageSync('languageIndex')
				this.pageTitle = this.appItem.name
			},
		},
		onLoad() {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			this.getAppItem()
			this.writeCode()
			// this.content = uni.getStorageSync('content')
		},
		onHide(){
			if(this.timer != null){
				clearInterval(this.timer)
			}
		},
	}
</script>

<style scoped lang="scss">
	.appDetail {
		min-height: 100vh;
		position: relative;

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
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}

		.info-tips {
			// width: 100%;
			white-space: nowrap;
			display: flex;
			align-items: center;
			margin: 0rpx 20rpx 24rpx;
			font-size: 32rpx;
			color: #232323;
			font-weight: 500;
			position: relative;
		}

		.text-box {
			// width: 100%;
			position: relative;
			margin: 0 20rpx;
		}

		.input-box-max {
			height: 864rpx;
			background-color: #F3F4F6;
			border-radius: 14rpx;
			box-sizing: border-box;
			padding: 28rpx;
			font-size: 28rpx;

			.content-box {
				height: 840rpx;
				overflow-y: auto;
				white-space: pre-wrap;
			}
		}

		.rade {
			position: absolute;
			bottom: 40rpx;
			width: 100%;
		}

		.go-btn {
			height: 92rpx;
			border-radius: 92rpx;
			background: linear-gradient(to right, #6BB6FF, #337BFF);
			margin: 0rpx 50rpx;
			color: #ffffff;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;
		}
	}
</style>