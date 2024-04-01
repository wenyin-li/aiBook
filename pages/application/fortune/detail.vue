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
				<view class="title">AI本命运势</view>
			</view>
		</view>
		<view class="info-tips" :style="'padding-top:'+(statusBarHeight + capsuleHeight + 20)+'px;'">
			<view class="info-item">
				<view class="info-title">
					你的综合运势
				</view>
				<span class="info-value">
					{{fortuneData.composite}}
				</span>
			</view>
			
			<view class="box-item">
				<view class="box-title">
					<span class="shu"></span>
					财富机遇
				</view>
				<span class="box-value">
					{{fortuneData.wealth}}
				</span>
			</view>
			
			<view class="box-item">
				<view class="box-title">
					<span class="shu"></span>
					事业发展
				</view>
				<span class="box-value">
					{{fortuneData.career}}
				</span>
			</view>
			
			<view class="box-item">
				<view class="box-title">
					<span class="shu"></span>
					感情运程
				</view>
				<span class="box-value">
					{{fortuneData.feeling}}
				</span>
			</view>
			
			<view class="box-item">
				<view class="box-title">
					<span class="shu"></span>
					身体健康
				</view>
				<span class="box-value">
					{{fortuneData.health}}
				</span>
			</view>
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
				birthday:'',
				fortuneData:{
					composite:'',
					wealth:'',
					career:'',
					feeling:'',
					health:'',
				},
				settingArr: [],
				originString:'',
				timer:null,
				resultText:'',
				axiosType:"综合运势"
			}
		},
		methods: {
			changeDate(e){
				console.log(e,'eeeeeee')
				this.birthday = e.detail.value
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
			aiMeasureMoveStream() {
				const that = this
				
				let requestTask = uni.request({
					url: 'https://api.firedigit.cn/measureMove/aiMeasureMoveStream',
					method: 'POST',
					data: {
						toolId: this.appItem.id,
						content:this.content,
						name:uni.getStorageSync('name'),
						sex:uni.getStorageSync('sex'),
						birthday:uni.getStorageSync('birthday'),
						problem: this.axiosType
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
					// console.log(res,'流式数据')
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
						if(this.axiosType == '综合运势'){
							this.fortuneData.composite += this.settingArr[0];
						}else if(this.axiosType == '财富机遇'){
							this.fortuneData.wealth += this.settingArr[0];
						}else if(this.axiosType == '事业发展'){
							this.fortuneData.career += this.settingArr[0];
						}else if(this.axiosType == '感情运程'){
							this.fortuneData.feeling += this.settingArr[0];
						}else if(this.axiosType == '身体健康'){
							this.fortuneData.health += this.settingArr[0];
						}
					}
			
					this.settingArr.shift()
					if (this.settingArr.length == 0) {
						console.log(this.fortuneData.composite,'this.fortuneData.composite')
						clearInterval(this.timer)
						
						if(this.axiosType == '综合运势'){
							console.log(this.axiosType,'this.axiosType')
							debugger
							this.axiosType = '财富机遇'
						}else if(this.axiosType == '财富机遇'){
							console.log(this.axiosType,'this.axiosType')
							debugger
							this.axiosType = '事业发展'
						}else if(this.axiosType == '事业发展'){
							console.log(this.axiosType,'this.axiosType')
							debugger
							this.axiosType = '感情运程'
						}else if(this.axiosType == '感情运程'){
							console.log(this.axiosType,'this.axiosType')
							debugger
							this.axiosType = '身体健康'
						}else if(this.axiosType == '身体健康'){
							console.log(this.axiosType,'this.axiosType')
							debugger
							this.axiosType = ''
						}
						
						if(this.axiosType){
							debugger
							this.aiMeasureMoveStream()
						}
					}
				}, 100);
			},
		},
		onLoad() {
			this.capsuleHeight = this.$phoneAppInfo.capsuleHeight
			this.statusBarHeight = this.$phoneAppInfo.statusBarHeight
			// this.fortuneData = uni.getStorageSync('fortuneData')
			this.getAppItem()
			this.aiMeasureMoveStream()
		}
	}
</script>

<style scoped lang="scss">
	.application {
		min-height: 100vh;
		position: relative;
		background-color: #F5F5F5;
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
			.info-item{
				width: 100%;
				background: #FFFFFF;
				border-radius: 20rpx;
				backdrop-filter: blur(10px);
				padding: 40rpx;
				.info-title{
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 36rpx;
					color: #75CDC1;
					line-height: 50rpx;
					font-style: normal;
					margin-bottom: 20rpx;
					text-align: center;
				}
				.info-value{
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 28rpx;
					color: #232323;
					line-height: 48rpx;
					white-space: pre-wrap;
				}
			}
			.box-item{
				width: 100%;
				background: #FFFFFF;
				border-radius: 20rpx;
				backdrop-filter: blur(10px);
				padding: 40rpx;
				text-align:left;
				margin-top: 24rpx;
				.box-title{
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 36rpx;
					color: #75CDC1;
					line-height: 50rpx;
					font-style: normal;
					margin-bottom: 20rpx;
					.shu{
						width: 5rpx;
						height: 30rpx;
						background: #75CDC1;
						border-radius: 3rpx;
						display: inline-block;
						margin-right: 12rpx;
					}
				}
				.box-value{
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 28rpx;
					color: #232323;
					line-height: 48rpx;
					white-space: pre-wrap;
				}
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