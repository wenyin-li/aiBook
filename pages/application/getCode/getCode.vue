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
		<view :style="'padding-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'" class="info-tips">故事背景<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
		</view>
		<view class="book-bg">
			<view class="bg-list" v-for="(item,index) in languageList" :key="index"
				:class="languageIndex == item.id ? 'act-bg' : ''" @tap="setBook(item)">
				{{item.name}}
			</view>
		</view>
		
		<view class="info-tips">输入内容<text
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
				appItem: {},
				languageList: [],
				languageIndex:''
			}
		},
		methods: {
			setBook(item) {
				if (item.id == this.languageIndex) {
					return
				}
				this.languageIndex = item.id
			},
			getAppValue() {
				console.log('getAppValue')
				if (!this.content || !this.languageIndex) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error',
						duration: 2000
					})
					return
				}
				
				uni.setStorageSync('languageIndex', this.languageIndex)
				uni.setStorageSync('describe', this.content)
				
				uni.navigateTo({
					url: '/pages/application/getCode/codeDetail',
				})
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
			getLanguageList(){
				uni.request({
					url: 'https://api.firedigit.cn/code/codeLanguageList',
					method: 'POST',
					data: {},
					header: {
						'content-type': 'application/json',
						"token": uni.getStorageSync('token'),
					},
					success: res => {
						console.log(res, 'resppppp')
						if(res.data.data.records){
							this.languageList = res.data.data.records
						}
					},
					fail: (err) => {
						console.log(err, 'errrrr')
					}
				})
			},
		},
		onLoad() {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			this.getAppItem()
			this.getLanguageList()
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
		.book-bg {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 0rpx 20rpx 24rpx;
			.bg-list {
				width: 200rpx;
				height: 52rpx;
				border-radius: 52rpx;
				background-color: rgba(153, 153, 153, 0.14);
				color: #999;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				margin-bottom: 26rpx;
			}
		
			.act-bg {
				color: #497CF7 !important;
				background-color: rgba(73, 124, 247, 0.2) !important;
			}
		
		}

		.text-box {
			// width: 100%;
			height: 410rpx;
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
			height: 410rpx;
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