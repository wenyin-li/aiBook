<template>
  <!-- 登录卡片 -->
  <view class="login-box">
    <view class="login-box-mask" id="login-box-mask" @click="closeLogin()" v-if="isShow"></view>
    <view :class="['login-box-bottom',isShow?'showmian1':'showmian2']">
      <image @click="closeLogin()" id="login-close" class="login-close" src="https://img.quanminyanxuan.com/other/8d9b715e4e9c4711bc04a17edd1b2ccf.png" mode=""></image>
      <!-- <button v-if="isChoose" class="buttons-style" open-type="getPhoneNumber" @getphonenumber="handlePhoneQuickLogin">
        一键登录
      </button> -->
      <view class="buttons-style" @click="logintext" id="buttons-style">
        一键登录
      </view>
      <view  class="select" style="margin:40rpx auto 0; padding: 0 50rpx 60rpx;" @click="Choose" id="select">
        <image v-if="!isChoose" src="https://img.quanminyanxuan.com/other/de49c001c7464964bdbc7783f7b03a9d.png" mode=""></image>
        <image v-if="isChoose" src="https://img.quanminyanxuan.com/other/e4f93b5e189a4863a909072a9a7b24d8.png" mode=""></image>
        <view style="text-align: left;font-size: 26rpx;color:#000; flex: 1;">
          <text
            >我已阅读并同意</text
          >
          <text id="selectText1" @click.stop="toWebview('/pages/agreement/privacy.html')">《用户隐私政策》和</text>
          <text id="selectText2" @click.stop="toWebview('/pages/agreement/agreement.html')">《用户注册协议》</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // isLogin: this.isShow,
      weappLoginObj:{},
      isChoose:false
    }
  },
  computed: {
    
  },
  mounted () {
	if(!uni.getStorageSync('openid')){
		this.getSessionKey()
	}else{
		this.weappLoginObj = {
		  unionid: uni.getStorageSync('unionid'),
		  openid: uni.getStorageSync('openid'),
		  session_key: uni.getStorageSync('session_key')
		}
	}
  },

  methods: {
    toWebview(url){
      uni.navigateTo({
         url: '/packageB/pages/member/accountSet/webview?url='+this.$util.baseH5Url+url
      });
    },
    closeLogin(){
      this.$emit('changeIsShow',false)
    },
    // 获取code
    getSessionKey () {
      this.$util.getSessionKey((res)=>{
        this.weappLoginObj = res
      })
    },
    Choose(){
      this.isChoose = !this.isChoose
    },
    logintext(){
      // 重新调登入
      if(!this.isChoose){
        uni.showToast({
          title:'请勾选相关协议条款和隐私政策',
          icon:'none'
        })
      }else {
        this.getSessionKey()
      }
      
    },
    getSessionKey () {
      this.$util.getSessionKey((res)=>{
        this.$http
          .post('/users/login/wxUnionIdLogin', {
             ...res,
             openvip:uni.getStorageSync('openvip') ? 'vip' : ''
           })
           .then(res => {
              let userInfo = res.data 
              this.handleLoginSuccess(userInfo,'')  
           })
           .catch(err => {
             console.log('登录失败', err)
           })
       })
     },
		// 登录成功处理逻辑
		handleLoginSuccess (userInfo,event) {
		  // 缓存账户信息
		  this.$store
		    .dispatch('saveAccountInfo', userInfo)
		    .then(res => {
		      // 更新用户信息(更新im)
		      return this.$store.dispatch('updateUserInfo')
		    })
		    .then(res => {
					this.$emit('handleLoginSuccess')
					//说明是去编辑
		    })
		},
  }
}
</script>

<style lang="scss" scoped>
	// 初始化button的样式和伪装元素，写在最前面，方便后面有样式的覆盖
	.buttons-style {
		background-color:transparent;
		border-radius: 0;
		box-sizing: content-box;
		color: not specified;
		cursor: auto;
		display: inline;
		font-size: medium;
		line-height: normal;
		margin-left:0;
		margin-right: 0;
		overflow: visible;
		padding-left: 0;
		padding-right: 0;
		position: static;
		text-align: left;
		text-decoration: none;
    font-size: 30rpx;
    width: 640rpx;
    height: 94rpx;
    background-color: #07C160;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 120rpx auto 0;
	}
	.buttons-style::after {
		content:'';
		width:0;
		height:0;
		border: none;
	}
  .select{
    display: flex;
    image{
      width: 46rpx;
      height: 46rpx;
      margin-right: 10rpx;
    }
  }
	.login-box {
		width: 750rpx;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100000;
	}
  .login-wx-image{
    width: 44rpx;
    height: 36rpx;
    margin-right: 20rpx;
  }
  .login-box-bottom{
    width: 750rpx;
    height: 400rpx;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0 0;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100001;
  }
  .login-close{
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
  }
  .login-box-mask{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100000;
    height: 100vh;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
  }
  .showmian1{
    animation:mymove 0.5s linear;
    animation-fill-mode: forwards; /*该属性让动画停留在最后一帧*/
  }
  .showmian2{
    animation:mymove1 0.5s linear;
    animation-fill-mode: forwards;
  }
  @keyframes mymove{
    0% {
      bottom: -1100rpx;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes mymove1{
    0% {
      bottom: 0;
    }
    100% {
      bottom: -1100rpx;
    }
  }
</style>
