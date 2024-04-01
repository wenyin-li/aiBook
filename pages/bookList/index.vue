<template>
	<view class="wrapper">
		<view class="title-box">
			<view class="left-line"></view>
			<view class="title">
				创作记录
			</view>
		</view>
		<scroll-view scroll-y="true" class="my-book">
			<view class="book-list">
				<view class="list-item" v-for="(item,index) in myBookList" :key="index" @tap="goBtn(index)">
					<image class="item-img"
						src="https://saasimg.quanminyanxuan.com/other/54b9a77a2e4f42c0b4963fa8cfe5a8a7.jpg"
						mode="aspectFill"></image>
					<view class="item-info">
						<view class="item-title">
							<view class="title">
								{{item.name}}
							</view>
							<view class="status" style="color:#FF5E50 ;" v-if="item.status == 0 || item.status == 1">
								正在生成
							</view>
							<view class="status" v-else-if="item.status == 2">
								已完成
							</view>
							<view class="status" style="color:#FF5E50 ;" v-else="item.status == 3">
								生成异常
							</view>
						</view>
						<view class="item-desc">
							{{item.blurb}}
						</view>
						<view class="item-author">
							作者：{{item.author}} · {{item.wordCount}}万字
						</view>
					</view>


				</view>
			</view>

		</scroll-view>
		<view class="title-box">
			<view class="left-line"></view>
			<view class="title">
				推荐应用
			</view>
		</view>
		<view class="app-list">
			<view class="lists" v-for="(item,index) in appList" :key="index" @click="goRouter(item)">
				<image class="lists-img" :src="item.icon" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				myBookList: [],
				appList: []

			}
		},
		onLoad(option) {
			this.getBookList()
			this.getAppList()
		},
		onShow(e) {},
		methods: {
			goRouter(item){
				console.log(item,'itemmmmmmmmm')
				uni.setStorageSync('appItem', item)
				if(item.id == 1){
					
				}else if(item.id == 2){
					
				}else if(item.id == 3){
					// uni.navigateTo({
					// 	url: '/pages/application/article/article'
					// })
				}else if(item.id == 4){
					uni.navigateTo({
						url: '/pages/application/getCode/getCode'
					})
				}else if(item.id == 5){
					uni.navigateTo({
						url: '/pages/application/fortune/fortune'
					})
				}else{
					uni.navigateTo({
						url: '/pages/application/video'
					})
				}
			},
			getAppList() {
				this.$http.get('/tool/toolList', {}).then(res => {
					this.appList = res.data
					this.appList.shift()
					this.appList.shift()
					console.log(this.appList,'this.appList')
				})
			},
			getBookList() {
				this.$http.post('/usersNovel/queryNovelList', {
					pageNum: this.pageNum,
					pageSize: 10,
				}).then(res => {
					if (this.pageNum > 1 && res.data.records.length < 1) {
						// 说明此时已经没有列表了
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
						return
					}
					if (res.data.records && res.data.records.length >= 1) {
						this.myBookList = res.data.records
					}

				})
			},
			goBtn(index) {
				uni.setStorageSync('bookDetail', this.myBookList[index])
				uni.navigateTo({
					url: '/pages/bookList/lookBook'
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
		background-color: #F5F5F5;

		.title-box {
			width: 690rpx;
			display: flex;
			align-items: center;
			color: #232323;
			font-size: 40rpx;
			font-weight: 700;
			padding: 44rpx 0 24rpx;

			.left-line {
				width: 6rpx;
				height: 30rpx;
				margin-right: 12rpx;
				background-color: #497CF7;
				border-radius: 6rpx;
			}
		}

		.my-book {
			width: 690rpx;
			height: 820rpx;

			.book-list {
				width: 100%;
				min-height: 100%;

				.list-item {
					width: 100%;
					height: 260rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					background-color: #fff;
					display: flex;
					align-items: center;
					padding: 30rpx;
					margin-bottom: 20rpx;

					.item-img {
						width: 140rpx;
						height: 200rpx;
						margin-right: 30rpx;
						border-radius: 10rpx;
					}

					.item-info {
						width: 460rpx;

						.item-title {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: #232323;
							font-size: 34rpx;
							font-weight: 700;

							.title {
								width: 300rpx;
								overflow: hidden;
								white-space: nowrap;
							}

							.status {
								color: #63C68A;
								font-size: 24rpx;
								font-weight: normal;
							}
						}

						.item-desc {
							width: 100%;
							color: #666666;
							font-size: 28rpx;
							margin-top: 16rpx;
							line-height: 40rpx;
							min-height: 80rpx;
							display: -webkit-box;
							overflow: hidden;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							text-overflow: ellipsis;
							word-break: break-all;
						}

						.item-author {
							color: #666666;
							font-size: 22rpx;
							margin-top: 26rpx;
						}
					}
				}
			}
		}

		.app-list {
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			flex-wrap: wrap;

			.lists {
				width: 335rpx;
				margin-bottom: 20rpx;

				.lists-img {
					width: 335rpx;
					height: 190rpx;
				}

			}
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