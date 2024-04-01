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
				<view class="title">AI测运</view>
			</view>
		</view>
		<view class="info-tips" :style="'padding-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'">
			<view class="info-box">
				<text class="text-name">姓名</text>
				<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
				<input class="input-box" v-model="name" type="text" placeholder="请输入姓名"
					placeholder-style="color:#999999;" />
			</view>

			<view class="info-box" style="margin-top:40rpx">
				<text class="text-name">性别</text>
				<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
				<view class="sex-box">
					<text class="sex-item" id="sexIndex1" :class="sexIndex == 1 ? 'in-item' : ''" style="margin-right: 60rpx;"
						@click="sexIndex=1">男</text>
					<text class="sex-item" id="sexIndex2" :class="sexIndex == 2 ? 'in-item' : ''" @click="sexIndex=2">女</text>
				</view>
			</view>

			<view class="info-box" style="margin-top:40rpx">
				<text class="text-name">生日</text>
				<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
				<view class="example-body">
					<picker mode="date" :range="birthday" @change="changeDate">
						<view>{{birthday || '请选择出生日期'}} </view>
					</picker>
				</view>
			</view>
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
				content: '',
				appItem: {},
				name: '',
				sexIndex: 1,
				birthday:''
			}
		},
		methods: {
			changeDate(e){
				console.log(e,'eeeeeee')
				this.birthday = e.detail.value
			},
			getAppValue() {
				console.log('getAppValue')
				if (!this.name || !this.birthday || !this.sexIndex) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error',
						duration: 2000
					})
					return
				}
				
				uni.setStorageSync('birthday',this.birthday)
				uni.setStorageSync('sex',this.sexIndex == 1 ? 0 : 1)
				uni.setStorageSync('name',this.name)
				
				uni.navigateTo({
					url: '/pages/application/fortune/detail',
				})
				
				// uni.request({
				// 	url: 'https://api.firedigit.cn/measureMove/aiMeasureMove',
				// 	method: 'POST',
				// 	data: {
				// 		toolId: this.appItem.id,
				// 		name:this.name,
				// 		sex:this.sexIndex == 1 ? 0 : 1,
				// 		birthday:this.birthday
				// 	},
				// 	header: {
				// 		'content-type': 'application/json',
				// 		"token": uni.getStorageSync('token'),
				// 	},
				// 	success: res => {
				// 		console.log(res, 'resppppp')
				// 		// this.content = res.data.content
				// 		if (res.data.data) {
				// 			uni.setStorageSync('fortuneData', res.data.data)
				// 			uni.navigateTo({
				// 				url: '/pages/application/fortune/detail',
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
			margin: 0rpx 30rpx 24rpx;
			font-size: 32rpx;
			color: #232323;
			font-weight: 500;
			position: relative;
		}

		.info-box {
			width: 100%;
			display: flex;
			align-items: center;
			background-color: #EEEEEE;
			padding: 28rpx 52rpx;
			border-radius: 16rpx;
			height: 100rpx;

			.input-box {
				margin-left: 54rpx;
			}

			.text-name {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #232323;
				line-height: 45rpx;
				font-style: normal;
			}

			.sex-box {
				margin-left: 54rpx;

				.sex-item {
					display: inline-block;
					width: 48rpx;
					height: 48rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #666666;
					line-height: 48rpx;
					text-align: center;
					font-style: normal;
					cursor: pointer;
					border-radius: 50%;
				}

				.in-item {
					background: #75CDC1;
					color: #FFFFFF;
				}
			}
			.example-body{
				color: #999999;
				margin-left: 54rpx;
			}
		}

		.text-box {
			// width: 100%;
			height: 294rpx;
			position: relative;
			margin: 0 30rpx;
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