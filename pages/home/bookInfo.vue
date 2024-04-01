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
		<view class="book-info" :style="'margin-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'">
			<view class="max-name">小说生成</view>
			<view class="info-tips">故事背景<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
			</view>
			<view class="book-bg">
				<view class="bg-list" v-for="(item,index) in bookBgList" :key="index"
					:class="bookBgIndex == index ? 'act-bg' : ''" @tap="setBook(index)">
					{{item.title}}
				</view>
			</view>
			<!-- <view class="info-tips" style="margin-top: 20rpx;">性别<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text> </view>
      <view class="tap-six">
        <view class="man" :class="userSex == 1 ? 'selected' :''" @tap="sexBtn(1)">男生</view>
        <view class="woman" :class="userSex == 2 ? 'selected' :''" @tap="sexBtn(2)">女生</view>
      </view> -->
			<view class="info-tips">
				作者
				<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
				<input class="input-box" v-model="author" type="text" placeholder="请输入您的真实姓名或笔名" @input="userAuthor"
					placeholder-style="color:#CCCCCC;" />
			</view>
			<view class="info-tips" style="margin-top: 20rpx;">
				主角1
				<text style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text>
				<input class="input-box" v-model="leader01" type="text" placeholder="请输入主角名" @input="userLeader01"
					placeholder-style="color:#CCCCCC;" />
				<view class="tap-six">
					<radio-group @change="changeRadioOne" v-model="userSex01" style="transform: scale(0.7)">
						<radio style="width: 60px;height:20px;font-size: 18px;" color="#337CFC" value="男">男</radio>
						<radio style="width: 60px;height:20px;font-size: 18px;" color="#337CFC" value="女">女</radio>
					</radio-group>
				</view>
			</view>
			<view class="info-tips" style="margin-top: 20rpx;">
				主角2
				<input class="input-box" v-model="leader02" type="text" placeholder="请输入主角名" @input="userLeader02"
					placeholder-style="color:#CCCCCC;" />
				<view class="tap-six">
					<radio-group @change="changeRadioTwo" v-model="userSex02" style="transform: scale(0.7)">
						<radio style="width: 60px;height:20px;font-size: 18px;" color="#337CFC" value="男">男</radio>
						<radio style="width: 60px;height:20px;font-size: 18px;" color="#337CFC" value="女">女</radio>
					</radio-group>
				</view>
			</view>
			<view class="info-tips" style="margin-top: 20rpx;">输入内容<text
					style="color: #F83434;position: relative;left: 8rpx;top: 6rpx;">*</text> </view>
			<view class="text-box">
				<textarea class="input-box-max" v-model="bookDesc" maxlength="2000" placeholder="请在此处输入或粘贴需要的内容"
					@input="descInput" placeholder-style="color:#999999;" />
				<view class="text-desc">
					<view class="left-fun" @tap.stop="clearDesc">
						<image class="icons"
							src="https://saasimg.quanminyanxuan.com/other/e8a8f23f2b7a4e04b22f5c71f261fdef.png"
							mode="widthFix"></image>
						清空
					</view>
					<view class="right-fun">
						{{textNums}}/2000
					</view>
				</view>
			</view>


			<view class="go-btn mymovebtn" @tap="goBook">立即生成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookBgIndex: 0,
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
						title: '总裁',
						id: 7,
					}
				],
				author: '',
				leader01: '',
				leader02: '',
				userSex01: '',
				userSex02: '',
				bookDesc: '',
				statusBarHeight: 0,
				capsuleHeight: 0,
				textNums: 0,
			}
		},
		onLoad(e) {
			console.log('onLoad11')
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
		},
		onShow(e) {
			console.log('onShow')
			// 故事背景的索引
			// if (uni.getStorageSync('bookBgIndex')) {
			// 	this.bookBgIndex = uni.getStorageSync('bookBgIndex')
			// }
			// // 性别的索引
			// if (uni.getStorageSync('userSex')) {
			// 	this.userSex = uni.getStorageSync('userSex')
			// }
			// // 作者姓名
			// if (uni.getStorageSync('author')) {
			// 	this.author = uni.getStorageSync('author')
			// }
			// // 主角1
			// if (uni.getStorageSync('leader01')) {
			// 	this.leader01 = uni.getStorageSync('leader01')
			// }
			// // 主角1 性别
			// if (uni.getStorageSync('userSex01')) {
			// 	this.userSex01 = uni.getStorageSync('userSex01')
			// }
			// // 主角2
			// if (uni.getStorageSync('leader02')) {
			// 	this.leader02 = uni.getStorageSync('leader02')
			// }
			// // 主角2 性别
			// if (uni.getStorageSync('userSex02')) {
			// 	this.userSex02 = uni.getStorageSync('userSex02')
			// }
			// // 书本介绍的内容
			// if (uni.getStorageSync('bookDesc')) {
			// 	this.bookDesc = uni.getStorageSync('bookDesc')
			// 	this.textNums = this.bookDesc.length
			// }
		},
		methods: {
			changeRadioOne(e) {
				console.log(e,'eeeeeeeeeeee')
				this.userSex01 = e.detail.value
				setTimeout(() => {
					uni.setStorageSync('userSex01', e.detail.value)
				}, 500)
			},
			changeRadioTwo(e) {
				console.log(e,'eeeeeeeeeeee')
				this.userSex02 = e.detail.value
				setTimeout(() => {
					uni.setStorageSync('userSex02', e.detail.value)
				}, 500)
			},
			clearDesc() {
				this.textNums = 0
				this.bookDesc = ''
				uni.removeStorageSync('bookDesc')
			},
			setBook(index) {
				if (index == this.bookBgIndex) {
					return
				}
				this.bookBgIndex = index
				uni.setStorageSync('bookBgIndex', this.bookBgIndex)
			},
			userAuthor(event) {
				setTimeout(() => {
					uni.setStorageSync('author', event.detail.value)
				}, 500)
			},
			userLeader01(event) {
				setTimeout(() => {
					uni.setStorageSync('leader01', event.detail.value)
				}, 500)
			},
			userLeader02(event) {
				setTimeout(() => {
					uni.setStorageSync('leader02', event.detail.value)
				}, 500)
			},
			descInput(event) {
				setTimeout(() => {
					uni.setStorageSync('bookDesc', event.detail.value)
					this.textNums = event.detail.cursor
				}, 500)
			},
			sexBtn(index) {
				this.userSex = index
				uni.setStorageSync('userSex', index)
			},
			goHome() {
				uni.navigateBack()
			},
			goBook() {
				if (!this.author) {
					uni.showToast({
						title: '请填写作者',
						icon: 'none'
					})
					return
				}
				if (!this.leader01) {
					uni.showToast({
						title: '请填写主角',
						icon: 'none'
					})
					return
				}
				if (!this.userSex01) {
					uni.showToast({
						title: '请选择主角性别',
						icon: 'none'
					})
					return
				}
				if (!this.leader02) {
					uni.showToast({
						title: '请填写主角',
						icon: 'none'
					})
					return
				}
				if (!this.userSex02) {
					uni.showToast({
						title: '请选择主角性别',
						icon: 'none'
					})
					return
				}
				if (!this.bookDesc) {
					uni.showToast({
						title: '请填写内容',
						icon: 'none'
					})
					return
				}

				uni.navigateTo({
					url: '/pages/home/bookResult'
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
			width: 690rpx;
			background-color: #fff;
			border-radius: 26rpx;
			box-shadow: 0rpx 10rpx 10rpx 4rpx rgba(0, 0, 0, 0.12);
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 0 26rpx 50rpx;

			.max-name {
				width: 100%;
				text-align: center;
				font-size: 32rpx;
				font-weight: 500;
				color: #404040;
				padding: 36rpx 0 0rpx;
			}

			.info-tips {
				width: 100%;
				white-space: nowrap;
				display: flex;
				align-items: center;
				margin: 40rpx 0 24rpx;
				font-size: 32rpx;
				color: #232323;
				font-weight: 500;
				position: relative;
			}

			.input-box {
				width: 420rpx;
				height: 60rpx;
				border-bottom: 1px solid #EEEEEE;
				padding-left: 24rpx;
				font-size: 28rpx;
				position: absolute;
				right: 60rpx;
				z-index: 1;
			}

			.book-bg {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.bg-list {
					width: 140rpx;
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
				width: 100%;
				height: 294rpx;
				position: relative;
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

			.tap-six {
				// width: 100%;
				position: absolute;
				top: -5px;
				right: 0px;
				text-align: right;
				z-index: 99;

				.man {
					width: 140rpx;
					height: 52rpx;
					border-radius: 52rpx;
					background-color: rgba(153, 153, 153, 0.14);
					color: #999;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					margin-right: 28rpx;
				}

				.woman {
					width: 140rpx;
					height: 52rpx;
					border-radius: 52rpx;
					background-color: rgba(153, 153, 153, 0.14);
					color: #999;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
				}

				.selected {
					color: #497CF7 !important;
					background-color: rgba(73, 124, 247, 0.2) !important;
				}
			}
		}

		.go-btn {
			width: 670rpx;
			height: 92rpx;
			border-radius: 92rpx;
			background: linear-gradient(to right, #6BB6FF, #337BFF);
			margin-top: 28rpx;
			color: #ffffff;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;
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