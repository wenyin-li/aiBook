<template>
	<view class="wrapper">
		<image class="top-banner" src="https://saasimg.quanminyanxuan.com/other/7a9e694793dd47f19dbf9d1322381c86.png"
			mode="widthFix"></image>
		<image class="top-banner" src="https://saasimg.quanminyanxuan.com/other/40bbf541c6d14e01a02e4046dc05ce3b.png"
			mode="widthFix"></image>
		<image class="top-banner" src="https://saasimg.quanminyanxuan.com/other/69522d19c46649a9a23d7a5c9580894f.png"
			mode="widthFix"></image>
		<view class="go-btn mymovebtn" @tap="goBtn">前往生成属于自己的小说</view>
		<!-- <view class="footer-box">
      <view>企业服务信息</view>
      <view>版本号 IPC备案88888888888</view>
    </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_locked: false,
				arr:[{},{},{},{},{},{},{},{},{},{},{}]
			}
		},
		onLoad(option) {
			let wxinfo = {};
			uni.login({
				provider: "weixin",
				success(res) {
					console.log(res, 'resssssss')
					uni.setStorageSync('code', res.code)
				}
			})
		},
		onShow(e) {
			
		},
		methods: {
			goBtn() {
				uni.navigateTo({
					url: '/pages/home/bookInfo'
				})
			}
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

		.top-banner {
			width: 750rpx;
		}

		.go-btn {
			width: 694rpx;
			height: 116rpx;
			border-radius: 116rpx;
			background: linear-gradient(to right, #6BB6FF, #337BFF);
			margin-top: 28rpx;
			color: #ffffff;
			font-size: 48rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 30rpx;
			z-index: 99;
		}

		.footer-box {
			width: 750rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 26rpx;
			color: #999;
			padding: 40rpx 0 30rpx 0;
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
</style>