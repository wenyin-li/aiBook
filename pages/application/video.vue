<template>
	<view class="application">
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
		<view class="info-tips" :style="'padding-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'">输入内容<text
				style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text> </view>
		<view class="text-box">
			<textarea class="input-box-max" v-model="content" maxlength="2000" placeholder="请在此处输入或粘贴需要的内容"
				@input="descInput" placeholder-style="color:#999999;" />
			<view class="text-desc">
				<view class="left-fun" @tap.stop="clearDesc">
					<image class="icons"
						src="https://saasimg.quanminyanxuan.com/other/e8a8f23f2b7a4e04b22f5c71f261fdef.png"
						mode="widthFix"></image>
					清空
				</view>
				<view class="right-fun">
					{{content.length}}/2000
				</view>
			</view>
		</view>
		<view class="tips">
			Tips:
		</view>
		<view class="tips-value">
			1.系统生成的数据来源人工智能，仅供用户参考，本系统不对内容
			正确性以及信任本系统而产生的一切损失负责!
		</view>
		<view class="tips-value">
			2.如果系统长时间未出现结果，<span class="blue-color">请不要重复点击</span>，稍后可到<span class="blue-color">
				【我的-生成记录】</span>中查看生成结果，否则可能重复扣除您的AI豆哦!
			如果系统生成失败不会扣除您的AI豆，请放心使用!
		</view>
		<view class="tips-value">
			3.如遇调用高峰期，生成可能失败，请稍后再来。
		</view>
		<view class="tips-value bold">
			4.支持微信电脑端打开小程序，实现快速输入。
		</view>
		<view class="rade">
			<view class="go-btn mymovebtn" @tap="getAppValue">立即生成</view>
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
				appItem: {}
			}
		},
		methods: {
			getAppValue() {
				console.log('getAppValue')
				if (!this.content) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error',
						duration: 2000
					})
					return
				}
				
				uni.setStorageSync('content',this.content)
				uni.navigateTo({
					url: '/pages/application/appDetail',
				})
				
				// uni.request({
				// 	url: 'https://api.firedigit.cn/tool/commonToolAi',
				// 	method: 'POST',
				// 	data: {
				// 		toolId: this.appItem.id,
				// 		content: this.content
				// 	},
				// 	header: {
				// 		'content-type': 'application/json',
				// 		"token": uni.getStorageSync('token'),
				// 	},
				// 	success: res => {
				// 		console.log(res, 'resppppp')
				// 		// this.content = res.data.content
				// 		if(res.data.data.content){
				// 			uni.setStorageSync('content',res.data.data.content)
				// 			uni.navigateTo({
				// 				url: '/pages/application/appDetail',
				// 			})
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log(err, 'errrrr')
				// 		console.log('请求失败:', err);
				// 	}
				// })
			},
			goHome() {
				console.log('goHome')
				uni.switchTab({
					url: '/pages/bookList/index'
				})
			},
			clearDesc() {
				this.content = ''
			},
			descInput(event) {

			},
			getAppItem() {
				this.appItem = uni.getStorageSync('appItem')
				this.pageTitle = this.appItem.name
			},
		},
		onLoad() {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			this.getAppItem()
		}
	}
</script>

<style scoped lang="scss">
	.application {
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
			height: 294rpx;
			position: relative;
			margin: 0 20rpx;
		}

		.text-desc {
			width: 100%;
			height: 60rpx;
			position: absolute;
			left: 0;
			bottom: 10rpx;
			z-index: 9;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-fun {
				display: flex;
				align-items: center;
				color: #999999;
				font-size: 22rpx;
				margin-left: 28rpx;

				.icons {
					width: 26rpx;
					height: 26rpx;
					margin-right: 8rpx;
				}
			}

			.right-fun {
				margin-right: 28rpx;
				color: #999999;
				font-size: 22rpx;
			}
		}

		.input-box-max {
			width: 100%;
			height: 294rpx;
			background-color: #F3F4F6;
			border-radius: 14rpx;
			box-sizing: border-box;
			padding-left: 28rpx;
			padding-top: 28rpx;
			font-size: 28rpx;
		}

		.tips {
			margin: 30rpx 20rpx 20rpx;
			font-size: 30rpx;
		}

		.tips-value {
			margin: 0rpx 20rpx 0;
			font-size: 26rpx;
			line-height: 40rpx;
			color: #232323;

			.blue-color {
				color: #367EFF;
			}
		}

		.bold {
			font-weight: bold;
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