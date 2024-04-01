<template>
  <view class="pop-main" @tap.stop="closeInter" v-if="isModelwind">
    <view class="center-model" @tap.stop="stopBtn">
      <view class="content-text">
        {{text}}
      </view>
      <view class="btn-box">
        <view class="left" @tap.stop="closeInter">
          取消兑换
        </view>
        <view class="right" @tap.stop="rightBtn">
          确认兑换
        </view>
      </view>
    </view>
  </view>
  
</template>

<script>
  export default {
    props:{
      text:{  // 必传
        type:String,
        default:''
      },
      isModelwind:{
        type:Boolean,
        default:false,
      },
      exchangeIndex:{
        type:Number,
        default:0,
      }
    },
    data(){
      return {
        
      }
    },
    methods:{
      closeInter(){
        this.$emit('closeInter')
      },
      // 禁止冒泡
      stopBtn(){},
      rightBtn(){
        this.$emit('rightBtn')
      },
    }
  }
</script>

<style scoped lang="scss">
  .pop-main {
    width: 750rpx;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11111;
    .center-model {
      width: 640rpx;
      height:340rpx;
      background-color: #ffffff;
      border-radius: 26rpx;
      margin-top: -200rpx;
      .content-text {
      	width: 100%;
      	height: 240rpx; 
        padding: 30rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #1a1a1a;
        font-size: 34rpx;
      }
      .btn-box {
        width: 100%;
        height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        .left {
          width: 50%;
          height: 100rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#2568ED;
          font-size: 36rpx;
          font-weight: 700;
          border-top: 1px solid #f1f1f1;
          border-right: 1px solid #f1f1f1;
        }
        .right {
          width: 50%;
          height: 100rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2568ED;
          font-size: 36rpx;
          font-weight: 700;
          border-top: 1px solid #f1f1f1;
        }
      }
    }
  }
  
</style>