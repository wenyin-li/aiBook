<template>
    <view>
        <view class="header header-skeleton">
			<view style="width:710rpx;margin-left:20rpx;overflow-x:hidden">
				<uniStatusBar></uniStatusBar>
			</view>
			<view class="head-top">
				<text></text>
				<text></text>
			</view>
			<view class="search-box">
			</view>
		</view>
        <view class="category-skeleton">
            <view class="list" v-for="(item) in 10" :key="item">
                <view class="bg"></view>
                <view class="tit"></view>
            </view>
        </view>
        <view class="banner-skeleton"></view>
        <view class="header-btn-skeleton">
            <view class="header-btn-l"><text></text><text></text></view>
            <view class="header-btn-r"><text></text></view>
        </view>

        <view class="product-skeleton">
            <view class="item" v-for="(item, index) in 2" :key="index">
                <view class="img"></view>
                <view class="info">
                    <text class="tit"></text>
                    <view class="name">
                        <text class="avatar"></text>
                        <text></text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue'
export default {
	components:{
		uniStatusBar
	}
}
</script>
<style lang="scss" scoped>
:root{
	--color-skeleton: #ececec
}

.header-skeleton{
	.head-top{
		display: flex;
		width: 100%;
		height: 88rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
		position: relative;
		text{
			height: 50rpx;
			width: 80rpx;
			background: var(--color-skeleton);
			display: block;
			border-radius: 2px;
			margin: 0 20rpx;
            animation: Loading 3s both infinite;
		}
	}
	.search-box{
		margin-top: 8rpx;
		width: 690rpx;
	  margin: 8rpx auto 20rpx;
		height: 72rpx;
		border: 3rpx solid var(--color-skeleton);
		border-radius: 36rpx;
		background: var(--color-skeleton);
    animation: Loading 3s both infinite;
	}
}
.category-skeleton{
	width: 710rpx;
	box-sizing: border-box;
	padding: 0 14rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
  margin: 0 auto;
	.list{
		text-align: center;
		width: 120rpx;
		margin-bottom: 30rpx;
		.bg{
			width: 80rpx;
			height: 80rpx;
			background: var(--color-skeleton);
            animation: Loading 3s both infinite;
			display: inline-block;
			border-radius: 50%;
		}
		.tit{    
			width: 80rpx;
			height: 20rpx;
			background: var(--color-skeleton);
            animation: Loading 3s both infinite;
			border-radius: 22px;
			display: inline-block;
		}
	}
}
.banner-skeleton{
	background: var(--color-skeleton);
    animation: Loading 3s both infinite;
	width: 710rpx;
	height: 240rpx;
	margin: 0 auto;
	border-radius: 16rpx;
}
.header-btn-skeleton{
	width: 100%;
    height: 98rpx;
    padding: 0 30rpx;
	display: flex;
	align-items: center;
    justify-content: space-between;
	text{
		height: 32rpx;
		width: 130rpx;
		background: var(--color-skeleton);
        animation: Loading 3s both infinite;
		margin-right: 20rpx;
		border-radius: 2px;
	}
	.header-btn-l{
		display: flex;
	}
	.header-btn-r{
		display: flex;
		text{
			margin: 0;
		}
	}
}

.product-skeleton{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 30rpx 20rpx;
	.item{
		width: calc(50% - 5px);
		border-radius: 2px;
		overflow: hidden;
		.text{
			height: 32rpx;
			width: 130rpx;
			background: var(--color-skeleton);
            animation: Loading 3s both infinite;
			margin-right: 20rpx;
			border-radius: 2px;
		}
		.img{
			background: var(--color-skeleton);
            animation: Loading 3s both infinite;
			height: 300rpx;	
		}
		.info{
			background: #fff;
			padding: 22rpx 20rpx;
			.tit{
				background: var(--color-skeleton);
                animation: Loading 3s both infinite;
				height: 30rpx;
				width: 90%;
				display: inline-block;
				border-radius: 20px;
				margin-bottom: 12rpx;
			}
			.name{
				display: flex;
				align-items: center;
				text{
					height: 30rpx;
					width: 120rpx;
					border-radius: 20px;
					background: var(--color-skeleton);
                    animation: Loading 3s both infinite;
					display: inline-block;
				}
				.avatar{
					height: 43rpx;
					width: 43rpx;
					border-radius: 50%;
					margin-right: 14rpx;
				}
			}
		}
	}
}
@keyframes Loading {
    0%{
        background: var(--color-skeleton);
    }
    50%{
        background: rgb(216, 216, 216);;
    }
    100%{
        background: var(--color-skeleton);
    }
}
</style>