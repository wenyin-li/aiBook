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
			<view class="go-btn mymovebtn" id="mymovebtn" @click="copy">点击复制</view>
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
				settingArr: [],
				originString: '',
				timer: null,
				resultText: ''
			}
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.resultText,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					},
					fail: () => {
						// uni.showToast({
						// 	title: '复制失败',
						// 	icon: 'none'
						// });
						wx.showModal({
							title: '提示',
							content: '需要获取剪贴板权限，请前往设置页面打开',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									wx.openSetting({
										withSubscriptions: true,
										success: function(res) {
											if (res.authSetting[
													'scope.writeClipboard']) {
												// 用户打开了权限，可以再次尝试复制操作  
												console.log('成功了')
											} else {
												// 用户仍然未授权，你可以做进一步的处理  
												console.log('失败了')
											}
										}
									});
								}
							},
							fail: function(res) {
								console.log('失败原因：', res)
							},
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
			descInput(event) {

			},
			getAppItem() {
				this.appItem = uni.getStorageSync('appItem')
				this.pageTitle = this.appItem.name
			},
			arrayBufferToString(buffer) {
				const view = new Uint8Array(buffer);
				let str = '';
				let i = 0;
				let c = 1,
					c2, c3;

				while (i < view.length) {
					c = view[i++];
					if (c < 128) {
						str += String.fromCharCode(c);
					} else if ((c > 191) && (c < 224)) {
						c2 = view[i++];
						str += String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F));
					} else {
						c2 = view[i++];
						c3 = view[i++];
						str += String.fromCharCode(((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F));
					}
				}

				return str;
			},

			// 使用示例  
			commonToolAi(event) {
				const that = this
				const requestTask = uni.request({
					url: 'https://api.firedigit.cn/tool/commonToolAiStream',
					method: 'POST',
					data: {
						toolId: this.appItem.id,
						content: this.content
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

					},
					fail: (err) => {

					}
				})

				requestTask.onHeadersReceived(function(res) {
					console.log(res, '1111111111');
				});
				// 这里监听消息
				requestTask.onChunkReceived(function(res) {
					// 转码返回的2进制值
					const arrayBuffer = res.data;

					// const uint8Array = new Uint8Array(arrayBuffer);
					// const textDecoder = new TextDecoder('utf-8');
					// const text = textDecoder.decode(uint8Array);

					const text = that.arrayBufferToString(arrayBuffer);

					// 或者使用其他方式将Base64字符串转换为UTF-8字符串

					//去掉前面的data:
					let textArr = text.replaceAll('\n', '').split('data:')

					let filteredArr = []
					//转化为一个数组
					for (let i in textArr) {
						if (textArr[i]) {
							filteredArr.push(textArr[i])
						}
					}

					// 获取返回的值
					let strArr = []

					for (let i in filteredArr) {
						// 如果有完整一条json转对象的就直接转
						if (filteredArr[i][0] == '{' && filteredArr[i][filteredArr[i].length - 1] == '}') {
							let info = JSON.parse(filteredArr[i])

							that.settingArr.push(info.data.content)
							// debugger
						} else {
							// 没有完整一条的先存一般，在跟后面的加起来
							if (!that.originString) {
								that.originString = filteredArr[i]
							} else {
								that.originString += filteredArr[i]
								if (that.originString[0] == '{' && that.originString[that.originString.length -
										1] == '}') {
									that.originString = that.originString.replaceAll('data:', '')
									let info = ''
									try {
										info = JSON.parse(that.originString)
										// 使用 info 做后续操作  
									} catch (error) {
										// 处理错误，例如显示错误消息或执行回退逻辑  
										info = ''
									}
									that.originString = ''
									if (info && info.data) {
										that.settingArr.push(info.data.content)
									}
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
		},
		onLoad() {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			this.content = uni.getStorageSync('content')
			this.getAppItem()
			this.commonToolAi()
		},
		onHide() {
			if (this.timer != null) {
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
				height: 810rpx;
				overflow-y: auto;
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