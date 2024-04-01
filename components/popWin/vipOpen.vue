<template>
  <view class="">
  	<view class="open-vip-max" v-if="isOpenVip" @tap.stop="closeInter(0)"></view>
  	<view class="open-vip" v-if="isOpenVip" :style="timerBoxIndex == 0 ? 'background-image: url(https://imgnew.quanminyanxuan.com/other/895e54414a5249c38e305b89d6ec7518.png);' : 'background-image: url(https://imgnew.quanminyanxuan.com/other/a99292d940014faa81c1b37ca64c0fd7.png);'">
  	  <!-- 头部 -->
      <view class="tab-head">
        <view class="tab-flag">
          推荐
        </view>
        <view class="tab-list" v-for="(item,index) in timerBox" :key="index" v-if="index < 2" @tap.stop="changeBtn(index)">
          <view class="tab-box" v-if="index == 0" :class="{'act-tab':index==timerBoxIndex}">
            月卡大礼包
          </view>
          <view class="tab-box" v-if="index == 1" :class="{'act-tab':index==timerBoxIndex}">
            {{item.price}}大礼包 <text class="icons">终身会员</text>
          </view>
        </view>
      </view>
  	  <view class="nav-bar" v-if="false">
  	    <!-- <text class="title">升级会员</text> -->
  	    <image style="width: 366rpx;height: 34rpx;" src="https://imgnew.quanminyanxuan.com/other/87af5ab62dc743e1b8e5f0b6c9755492.png" mode="widthFix"></image>
  	    <view class="vip-name">
  	      会员首礼
  	    </view>
  	    <image class="go-home" src="https://imgnew.quanminyanxuan.com/other/146cc4cda57b43c6b4733b060ddee238.png" mode="widthFix" @tap.stop="closeInter(0)"></image>
  	  </view>
      <scroll-view class="scroll-box" scroll-y="true">
  	    <!-- 文案 -->
        <!-- <view class="text-title-box">
          <image class="text-title" src="https://imgnew.quanminyanxuan.com/other/ddceb266eff541ea90672ac05d359773.png" mode="widthFix"></image>
          <view class="right-flag">
            首年特惠
          </view>
          <view class="title-box">
            <text style="font-size: 32rpx;font-weight: 500;">会员年卡仅需</text>
            <text  style="font-size: 30rpx;margin-left: 14rpx;">￥</text>
            <text  style="font-size: 56rpx;line-height: 74rpx;">98</text>
            <text  style="font-size: 24rpx;text-decoration: line-through;margin-left: 4rpx;">原价￥398</text>
          </view>
        </view> -->
        <!-- 免费领取 -->
        <view class="header-title">
          <view class="one-line">
            <view class="line-box"></view>
            <text class="texts-desc">{{timerBoxIndex == 0 ?'免费激活30天会员' : '¥99任选一件商品 免费激活会员'}}</text>
            <text class="texts-desc01" v-if="timerBoxIndex == 0">(限一次)</text>
          </view>
          <!-- <view class="two-line">
            把开卡成本赚回来了!
          </view> -->
        </view>
        <view class="no-moneys" v-if="timerBoxIndex == 1">
          
         <!-- <image class="bg-no-money" src="https://imgnew.quanminyanxuan.com/other/67e2c1e5270745aeb60ec179b019031f.png" mode="widthFix"></image> -->
          <!-- 商品6款 -->
          <view class="product-hot">
            <view class="product-item" v-for="(item,index) in productList" :key="index" @tap.stop="changeProduct(index)">
              <view class="change-product" :class="index == changeIndex ? 'act-change' : ''">
                <image v-if="index == changeIndex" class="iconss" src="https://imgnew.quanminyanxuan.com/other/3d61a7f8a37f40d69a9fdadfc0eb277e.png" mode="widthFix"></image>
                <text class="texts" v-if="index == changeIndex && changeIndex==0">已选择</text>
                <text class="texts" v-if="index == changeIndex && changeIndex!=0">已选择</text>
                
                <image class="iconss" src="https://imgnew.quanminyanxuan.com/other/54b0e1c7d4f04aba903044e5f6b06381.png" mode="widthFix"  v-if="index != changeIndex"></image>
                <text class="texts" v-if="index != changeIndex">选择</text>
                
              </view>
              
              <image class="product-img" :src="item.productImg" mode="aspectFill"></image>
              
              <view class="title">
                {{item.productName}}
              </view>
              <view class="money-btn">
                
                价值{{item.originalPrice}}元
                <!-- <text style="font-size: 22rpx;font-weight: 700;"></text> -->
              </view>
            </view>
          </view>
        </view>
        
        <view class="vip-card" v-if="timerBoxIndex == 0">
          <image class="vip-bg" src="https://imgnew.quanminyanxuan.com/other/159413b6e7b8408d8c0c987366a9824c.png" mode="widthFix"></image>
          <view class="vip-center">
            <view class="vip-title">
              会员卡
            </view>
            <view class="vip-money">
              <text style="font-size: 44rpx;">￥<text style="font-size: 80rpx;">0</text> </text>
              <text style="font-size: 22rpx;color: #fff;margin-top: -8rpx;">账户余额用于购物消费，全国通用</text>
            </view>
          </view>
        </view>
        <view class="header-title" style="margin-top: 60rpx;margin-bottom: 20rpx;" v-if="timerBoxIndex == 0">
          <view class="one-line">
            <view class="line-box"></view>
            <text class="texts-desc">激活即享 六大权益</text>
          </view>
        </view>
        <view class="scroll-vip" v-if="timerBoxIndex == 0">
          <view class="tab-flag01">
            会员权益
          </view>
          <scroll-view :scroll-x="true" class="scroll-box">
            <view class="scroll-center">
              <view class="list" v-for="(item,index) in vipIcon" :key="index">
                <image class="icon" :src="item.icon" mode="widthFix"></image>
                <text class="desc01">{{item.text}}</text>
              </view>
            </view>
          </scroll-view>
          <view class="tab-flag02">
            <text class="line01 act-line"></text>
            <text class="line01"></text>
          </view>
        </view>
      </scroll-view>

 <!-- 	  <view style="width:750rpx;height:400rpx;">
  	  </view> -->
  	  <view class="bottom-box">
        <view class="btn-open" id="intentional-unpaid" @tap.stop="btnOpen">
          立即激活
          <image class="icons" src="https://imgnew.quanminyanxuan.com/other/51d71bbab34c4e74aa3e2099b2cc8da9.png" mode="widthFix"></image>
        </view>
  	    <!-- <view class="user-agreement">
  	      <image class="icons-no" v-if="!isAgreement" src="https://imgnew.quanminyanxuan.com/other/f5c463e98905446fbe3e748a3a50152f.png" mode="widthFix" @tap.stop="changeAgreement"></image>
  	      <image class="icons-no" v-if="isAgreement" src="https://imgnew.quanminyanxuan.com/other/9c6d914e0b2a4ccebb3d2a313bcab110.png" mode="widthFix" @tap.stop="changeAgreement"></image>
  	      <view class="text-desc01"> 支付即同意<text style="color:#EE2532;" @tap.stop="openH5Page">《全民生活馆会员服务协议》</text>权益一经领取或使用不可退换。</text></view>
  	    </view> -->
  	  </view>
  	  <!-- <view class="bottom-box-01" v-if="timerBoxIndex == 1" @tap.stop="btnOpen01">
  	    <view class="btn-opens">
  	      <view class="text-descs01">
  	        充值全额返199元至钱包
  	      </view>
          <view class="text-center">
            <view class="text-left">
              <text style="font-size: 30rpx;"><text style="position: relative;top: -10rpx;">￥</text><text style="font-size: 48rpx;font-weight: 700;">199</text> <text style="font-size: 32rpx;margin-left: 12rpx;">充值激活</text> </text>
            </view>
            <view class="text-right">
              立即充值
            </view>
          </view>
  	    </view>
  	  </view> -->
    </view>
		
		<view  class="pay-box-box" v-if="isShowVipWindTow && false">
					<view class="pay-box">
						<view class="pay-box-title">
							<view class="">
								<text>{{minute}}:{{second}}:{{minutes}}</text><text style="margin-left: 10rpx;"></text>后关闭
							</view>
							<image class="close" @click="showVipWindTow(1)" src="https://imgnew.quanminyanxuan.com/other/645722b59c32450a9bab40242ea5143a.png" mode=""></image>
						</view>
						<view class="line"></view>
						<view class="tips-title">开通会员后即可发货</view>
						<view class="pro-box">
							<image :src="productList[changeIndex].productImg" mode=""></image>
							<view class="pro-box-right">
								<view class="pro-title">{{productList[changeIndex].productName}}</view>
								<view class="pro-price">
									<text class="text1">¥</text>0<text class="text2">¥{{productList[changeIndex].originalPrice}}</text>
								</view>
							</view>
						</view>
						<view class="line"></view>
						<view class="price">
							<text class="text3"><text style="font-size: 36rpx;">限时 ¥</text></text>98.00<view class="text4">（开通原价：<text class="text5">¥698</text>）</view>
						</view>
						<view class="pro-pay" @click="openMember()">
							支付开通
							<image src="https://imgnew.quanminyanxuan.com/other/c74c9aa935c74b5c8a577ff14f9063c7.png" mode=""></image>
						</view>
            <view class="bottom-box">
              <view class="user-agreement">
                <image class="icons-no" v-if="!isAgreement" src="https://imgnew.quanminyanxuan.com/other/f5c463e98905446fbe3e748a3a50152f.png" mode="widthFix" @tap.stop="changeAgreement"></image>
                <image class="icons-no" v-if="isAgreement" src="https://imgnew.quanminyanxuan.com/other/9c6d914e0b2a4ccebb3d2a313bcab110.png" mode="widthFix" @tap.stop="changeAgreement"></image>
                <view class="text-desc01"> 支付即同意<text style="color:#EE2532;" @tap.stop="openH5Page">《全民生活馆会员服务协议》</text>权益一经领取或使用不可退换。</text></view>
              </view>
            </view>
					</view>
				</view>
		
  </view>
</template>

<script>
  export default {
    props:{
      isOpenVip:{
        type:Boolean,
        default:false,
      },
			type:{
			  type:Number,
			  default:0,
			},
			productId:{
			  type:Number,
			  default:0,
			},
    },
    data(){
      return {
        productList:[],
				changeIndex:-1,
				isAgreement:true,
				timerBox:[{leftFlag:'限时62折',months:'12个月',price:'98',oPrice:'158'},{leftFlag:'限时4.1折',months:'36个月',price:'198',oPrice:'474'},{leftFlag:'限时1折',months:'终身会员',price:'398',oPrice:'3980'}],
				timerBoxIndex:0,
        isTrueFlag:false, //  是否是免费兑的商品
        isShowVipWindTow:false,
				minute: 0, //分
				second: 0, //秒,
				minutes: 0, //毫秒
        tabChange:0,
        vipIcon:[
          {icon:'https://imgnew.quanminyanxuan.com/other/a9a703777d004cd8afabff07e71396b0.png',text:'会员1分购'},
          {icon:'https://imgnew.quanminyanxuan.com/other/efa5cc07b7064db3b1af06e44909e2f5.png',text:'9.9秒大牌'},
          {icon:'https://imgnew.quanminyanxuan.com/other/d49bd39708464a848909958d0b9ee9e5.png',text:'积分兑好礼'},
          {icon:'https://imgnew.quanminyanxuan.com/other/ae2a37e879a04c43af2476718bb10a99.png',text:'会员领红包'},
          {icon:'https://imgnew.quanminyanxuan.com/other/09af0a15684f4202ab3c64afd1502cf7.png',text:'会员0元购'},
          {icon:'https://imgnew.quanminyanxuan.com/other/284c1d51f44746df9b32eed6e2dcf088.png',text:'专属客服'},
          {icon:'https://imgnew.quanminyanxuan.com/other/45a001cdd4084e97b77f205f113d76f3.png',text:'7天无理由'},
          {icon:'https://imgnew.quanminyanxuan.com/other/70f4324e34e64d1f9118d78146cc2309.png',text:'会员折上折'},
        ],
        
      }
    },
		mounted() {
			this.getProductList()
			this.getSearchConfig()
		},
    methods:{
      changeBtn(index){
        if(this.timerBoxIndex == index) return
        this.timerBoxIndex = index
      },
			getSearchConfig(){
			  this.$http
			  .get('/mallv2/common/querySysConfigValue?key=MEMBER_PRICE_CONFIG')
			  .then(res => {
			    let ObjInfo = JSON.parse(res.data)
			    if(res && res !== null){
			      this.paramsObj = ObjInfo
			      this.timerBox.forEach( (item,index) => {
			        if(index == 0){
			          item.months = ObjInfo.one.months+'个月'
			          item.price = ObjInfo.one.price
			          item.keyTyle = 'one'
			        }
			        if(index == 1){
			          item.months = ObjInfo.three.months+'个月'
			          item.price = ObjInfo.three.price
			          item.keyTyle = 'three'
			        }
			        if(index == 2){
			          item.months = '终身会员'
			          item.price = ObjInfo.six.price
			          item.keyTyle = 'six'
			        } 
			      })
			      console.log(this.timerBox,999)
			    }
			  })
			},
			changeProduct(index){
				if(this.productId == 0){
					uni.navigateTo({
					  url: `/packageG/pages/onePointPurchase/productDetail?id=${this.productList[index].id}&activityType=${this.productList[index].activityType}&shelvesId=${this.productList[index].shelvesId || 0}&subjectId=${this.productList[index].subjectId || 0}&fromIndex=1`
					})
          this.closeInter(0)
				}else{
					if(index == this.changeIndex) return
					this.changeIndex = index
				}
			},
			time(overdueTime) {
				console.log('开始倒计时', overdueTime)
				if (!overdueTime) {
					let tmpTime = `${new Date().getFullYear()}/${new Date().getMonth() +
						1}/${new Date().getDate()}`
					// var dateTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
					var dateTime = new Date(
						new Date(tmpTime).getTime() + 24 * 60 * 60 * 1000 - 1
					)
				}
				this.clock = setInterval(() => {
					if (!overdueTime) {
						var endTime = new Date(dateTime.getTime())
						var nowTime = new Date()
						var nMS = endTime.getTime() - nowTime.getTime()
					} else {
						var nowTime = new Date()
						var nMS = overdueTime - nowTime.getTime()
					}
			
					var myD = Math.floor(nMS / (1000 * 60 * 60 * 24))
					var myH = Math.floor(nMS / (1000 * 60 * 60)) % 24
					var myM = Math.floor(nMS / (1000 * 60)) % 60
					var myS = Math.floor(nMS / 1000) % 60
					var myMS = Math.floor(nMS / 100) % 10
					if (myD >= 0) {
						if (myH <= 9) myH = '0' + myH
						if (myM <= 9) myM = '0' + myM
						if (myS <= 9) myS = '0' + myS
						if (myMS <= 9) myMS ='0' + myMS
			
						this.hour = myH
						this.minute = myM
						this.second = myS
						this.minutes = myMS
					} else {
						this.hour = '00'
						this.minute = '00'
						this.second = '00'
						this.minutes = '0'
						clearInterval(this.clock)
						this.goBack()
					}
				}, 100)
			},
      closeInter(index){
        this.$emit('openVip',index)
      },
			changeAgreement(){
			  this.isAgreement = !this.isAgreement
			},
			getProductList(){
			  this.$http.get('/cms/subjects/getNewSubjectProduct',{
			    params:{
			      subjectId:335,
			      plateId:'',
			      pageNum: 1,
			      pageSize:6, 
			    }
			  }).then(res => {
					res.data.list.forEach((item,index)=>{
						if(item.id == this.productId){
							this.changeIndex = index
              // 说明是免费兑商品来的
              this.isTrueFlag = true
						}
					})
			    this.productList = res.data.list
			  })
			},
      btnOpen01(){
        // 走正常下单
        uni.showLoading({
          title:'支付中..',
          mask:true
        })
        this.openMember()
      },
			btnOpen(){
			  if(!this.isAgreement){
			    // uni.showToast({
			    //   title:'请先阅读并确认会员协议',
			    //   icon:'none'
			    // })
			    uni.showModal({
			      title:'协议说明',
			      content:'请阅读《全民生活馆会员服务协议》，确认将默认同意协议',
			      confirmText:"确认",
			      success:(res)=>{
			        if (res.confirm) {
			          this.isAgreement = true
			        } 
			      }
			    })
			    return
			  }
        // 如果点的tab是第一个
        if(this.timerBoxIndex == 0){
          // 直接走激活会员
          this.openMember()
          return
        }else {
          // 如果点的是第二个tab的立即激活 那一定是没选择的
          uni.showToast({
          	title:'请选择一件商品',
          	icon:'none'
          })
          return
        }
        
        // if(this.changeIndex == -1){
        // 	uni.showToast({
        // 		title:'请选择一件商品',
        // 		icon:'none'
        // 	})
        // 	return
        // }
        
				// this.overtime = new Date().getTime()+10 * 60 * 1000
				// this.time(this.overtime)
        // 走拉起下第二个弹窗
        // this.showVipWindTow()
				// this.closeInter(1)
        return
			  // 走正常下单
			  uni.showLoading({
			    title:'支付中..',
			    mask:true
			  })
			  this.openMember()
			},
			openMember(){
				uni.showLoading({
				  title:'激活中..',
				  mask:true
				})
			  this.$http.post('/mallv2/order/openMember',{
			    memberType:this.timerBox[this.timerBoxIndex].keyTyle
			  }).then(res => {
			    // 订单已生成,调起拉支付
			    this.goPayVip(res.data)
			  })
			},
			goPayVip(data){
			  let _this = this
			  this.$http
			  	.post('/mallv2/order/wxDoUnifiedMemberOrder', {
			  		scorePay: 1,
			  		openid:'',
			  		memberOrderNo: data,
			  		desc: '',
			  		isAnonymity: 0,
			  		type: 'JSAPI',
			  	}).then(res => {
            // 如果是免费会员,就无需支付
            if(res.data.open && res.data.open == 'success'){
              uni.showToast({
                title:'您的会员已激活',
                icon:'none',
              })
              _this.$emit('getUsers')
              uni.hideLoading();
              _this.closeInter(0)
              return
            }
			      let payObj = {
			      	nonceStr: res.data.nonceStr,
			      	package: res.data.package,
			      	signType: res.data.signType,
			      	timeStamp: String(res.data.timeStamp),
			      	paySign: res.data.sign
			      }
			      uni.requestOrderPayment({
			      	...payObj,
			      	success: function(res) {
			      		uni.hideLoading();
                // 支付成功以后,直接通知父组件,刷新user
                // 关闭弹窗
                uni.showToast({
                  title:'激活成功,恭喜您重新激活VIP会员',
                  icon:'none',
                  duration:2500,
                })
                // 
                _this.closeInter(0)
                _this.$emit('getUsers')
                return
			      		_this.showVipWindTow(1)
								
								// 支付成功 记录用户选择的商品
								let product = _this.productList[_this.changeIndex]
                
								_this.$http.post('/mallv2/order/memberPreReceiveProduct',{
								  productId:product.id,
								  shelvesId:product.shelvesId,
								  productSpecId:product.productSpecId
								}).then(res=>{
								  // 记录成功
                  // isTrueFlag 为true 则说明是在0元兑的详情页, 为false则是其他页面
                  if(_this.isTrueFlag){
                    // 通知父组件.刷新用户信息
                    uni.showToast({
                      title:'激活成功,恭喜您重新激活VIP会员',
                      icon:'none',
                      duration:2500,
                    })
                    _this.$emit('getUsers')
                    
                  }else {
                    // 直接跳去首页
                    // uni.switchTab({
                    //   url:'/pages/home/homeVip'
                    // })
                    // 告诉父组件,刷新用户信息, 并弹窗开通成功的弹窗,让父组件拿到数列的索引
                    _this.$emit('getUsers',_this.changeIndex)
                  }
								})
			      	},
			      	fail: function(err) {
			      		uni.hideLoading()
			      	}
			      })
			      
			    })
			  	
			},
			showVipWindTow(index){
				if(index == 1){
					clearInterval(this.clock)
					uni.showTabBar()
				}
        this.isShowVipWindTow = !this.isShowVipWindTow
      },
      openH5Page(){
				uni.navigateTo({
				   url: '/packageB/pages/member/accountSet/webview?url='+this.$util.baseH5Url+'/pages/agreement/agreementVip.html'
				});
			},
      // 禁止冒泡
      stopBtn(){},
    }
  }
</script>

<style scoped lang="scss">
  .open-vip-max {
    width: 750rpx;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1111;
    background: rgba(0,0,0,0.8);
  }
  .open-vip {
    width: 750rpx;
    height: 1150rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:1112;
    // background:linear-gradient(#F8FAFF,#FFFFFF);
    // animation:mymove1 0.2s linear;
    border-radius: 30rpx 30rpx 0 0;
    .tab-head {
      width: 750rpx;
      height: 118rpx;
      display: flex;
      align-items: center;
      position: relative;
      .tab-flag {
        position: absolute;
        left: 0rpx;
        top: 0rpx;
        z-index: 9;
        width: 86rpx;
        height: 42rpx;
        color: #fff;
        background-color:#EE2532;
        font-size: 24rpx;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 24rpx 0 16rpx 0;
      }
      .tab-list {
        width: 50%;
        height: 118rpx;
        .tab-box {
          width: 100%;
          height: 118rpx;
          display: flex;
          font-size: 38rpx;
          font-weight: 500;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          .icons {
            padding: 0 10rpx;
            background-color: #fff;
            color: #D2D2D2;
            font-size:22rpx;
            font-weight:500;
            border-radius: 4rpx;
            margin-left:8rpx;
          }
        }
        .act-tab {
          font-weight: bold;
          color: #2A1D16;
          position: relative;
          .icons {
            background-color: #EE2532 !important;
            color: #fff !important;
          }
          &::after {
            content: '';
            width: 120rpx;
            height: 12rpx;
            border-radius: 6rpx;
            background-color: #EE2532;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%,0);
            z-index: 9;
          }
        }
      }
    }
    .scroll-box{
      height: calc(85vh - 190px);
      margin-top: 44rpx;
      .header-title {
        width: 710rpx;
        position: relative;
        z-index: 10;
        margin-bottom: 24rpx;
        .one-line {
          display: flex;
          align-items: center;
          .line-box {
            width: 8rpx;
            height: 30rpx;
            border-radius: 8rpx;
            background-color: #2A1D16;
            margin: 0 10rpx 0 20rpx;
          }
          .texts-desc {
            font-size: 34rpx;
            color: #2A1D16;
            font-weight: 700;
          }
          .texts-desc01 {
            font-size: 24rpx;
            color: #EE2532;
            margin-left: 10rpx;
          }
        }
        // .two-line {
        //   display: inline-block;
        //   margin-left: 34rpx;
        //   margin-top: 6rpx;
        //   padding:4rpx 20rpx;
        //   border-radius: 36rpx;
        //   background-color: #2A1D16;
        //   color: #fff;
        //   font-size: 24rpx;
        // }
      }
      
      .no-moneys {
        width: 710rpx;
        height: 646rpx;
        margin:0 auto 20rpx;
        position: relative;
        z-index: 10;
        padding-top: 20rpx;
        background-color: #2A1D16;
        border-radius: 16rpx;
        // .bg-no-money {
        //   width: 710rpx;
        //   height: 720rpx;
        //   position: absolute;
        //   left: 0;
        //   top: 0;
        //   z-index: 1;
        // }
        .tips{
          position: absolute;
          top: 54rpx;
          right: 14rpx;
          width: 180rpx;
          height: 46rpx;
          background-color: #EE2532;
          border-radius: 46rpx;
          font-size: 32rpx;
          color: #FFFFFF;
          text-align: center;
          text{
            font-size: 24rpx;
          }
        }
        .product-hot {
          // margin-top: 24rpx;
          width: 710rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap:wrap;
          padding: 0 20rpx;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
          .product-item {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 210rpx;
            background-color: #fff;
            border-radius: 8rpx;
            margin-bottom: 14rpx;
            padding-bottom: 12rpx;
            position: relative;
            .change-product {
              width: 134rpx;
              height: 40rpx;
              border-radius: 8rpx 0 8rpx 0;
              display: flex;
              align-items: center;
              background-color:#BEBEBE;
              color: #FFFFFF;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 1;
              .iconss {
                width: 40rpx;
                height: 40rpx;
                margin-left: 6rpx;
              }
              .texts {
                font-size: 24rpx;
              }
            }
            .act-change {
              background-color: #EE2532;
            }
            .product-img {
              width: 210rpx;
              height: 210rpx;
              border-radius: 8rpx;
            }
            .title {
              width: 86%;
              font-size: 24rpx;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 6rpx;
            }
            .money-btn {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 22rpx;
              font-weight: 700;
              color:#EE2532;
              margin-top: 2rpx;
            }
          }
        }
      }
      
      .vip-card {
        width:710rpx;
        height: 240rpx;
        position: relative;
        margin: 30rpx auto 0;
        .vip-bg {
          width:710rpx;
          height: 240rpx;
        }
        .vip-center {
          width:710rpx;
          height: 240rpx;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 9;
          display: flex;
          flex-direction: column;
          padding: 26rpx 40rpx;
          box-sizing: border-box;
          .vip-title {
            font-size: 32rpx;
            color: #FFE6D9;
            font-weight: 500;
            margin-bottom: 22rpx;
          }
          .vip-money {
            display: flex;
            flex-direction: column;
            color: #FFE6D9;
          }
        }
       
        
      }
      .scroll-vip {
        width: 710rpx;
        height: 206rpx;
        background-image: url(https://imgnew.quanminyanxuan.com/other/1098af14a4ec4546a5fa9a519ff1c25a.png);
        background-size: 100%,100%;
        background-repeat: no-repeat;
        margin: -20rpx auto 0;
        position: relative;
        .tab-flag01 {
          position: absolute;
          left: 0rpx;
          top: 0rpx;
          z-index: 9;
          width: 108rpx;
          height: 30rpx;
          color: #FFE6D9;
          background-color:#EE2532;
          font-size: 22rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16rpx 0 16rpx 0;
        }
        .tab-flag02 {
          position: absolute;
          left: 50%;
          transform: translate(-50%,0);
          bottom: 10rpx;
          z-index: 9;
          margin: 0 auto;
          display: flex;
          align-items: center;
          .line01 {
            width: 10rpx;
            height: 4rpx;
            background-color: #999999;
            border-radius: 4rpx;
            margin-right: 6rpx;
          }
          .act-line {
            width: 20rpx;
            height: 4rpx;
            background-color: #0F0D0D;
            border-radius: 4rpx;
          }
        }
        .scroll-box {
          width: 710rpx;
          height: 206rpx;
          white-space: nowrap;
          .scroll-center {
            min-width: 710rpx;
            // height: 206rpx;
            padding-top: 40rpx;
            .list {
              width: 146rpx;
              display: inline-flex;
              align-items: center;
              flex-direction: column;
              margin-bottom: 16rpx;
              .icon {
                width: 92rpx;
                height: 92rpx;
              }
              .desc01 {
                font-size: 22rpx;
                color: #111111;
              }
            }
                    
          }
        }
      }
    }
    .nav-bar {
      width: 750rpx;
      height: 156rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 1;
      margin-bottom: -16rpx;
      background:linear-gradient(#FFF2FF,#FFFFFF);
      .vip-name {
        display: inline-block;
        margin-top: 14rpx;
        padding: 2rpx 30rpx;
        border-radius: 38rpx;
        background-color: #EE2532;
        color: #FFE6D9;
        font-size: 24rpx;
      }
      .go-home {
        position: absolute;
        top: 30rpx;
        right: 20rpx;
        z-index: 1;
        width: 64rpx;
        height: 64rpx;
      }
      .title {
        font-size: 40rpx;
        color: #2A1D16;
        font-weight: bold;
      }
    }
    
    .text-title-box {
      width: 710rpx;
      height:160rpx;
      margin: 2rpx auto 20rpx;
      position: relative;
      z-index: 10;
      .right-flag {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 9;
        background-color: #F20A3F;
        border-radius: 0 16rpx 0 16rpx;
        width: 110rpx;
        height: 38rpx;
        color: #fff;
        font-size: 22rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text-title {
        width: 710rpx;
        height:160rpx;
      }
      .title-box {
        width: 710rpx;
        position: absolute;
        left: 50%;
        top: 6rpx;
        transform: translate(-50%,0);
        z-index: 10;
        color: #FFE6D9;
        display: flex;
        align-items: baseline;
        justify-content: center;
      }
    }
    .text-desc {
      position: relative;
      z-index: 10;
      font-size: 28rpx;
      color: #FFE6D9;
      width: 750rpx;
      text-align: center;
      margin-top: 20rpx;
    }
    .timer-vip {
      width: 710rpx;
      height: 334rpx;
      padding: 20rpx;
      margin: 0 auto;
      box-sizing: border-box;
      border-radius: 16rpx;
      background-color: #fff;
      position: relative;
      z-index: 10;
      .title {
        font-size: 32rpx;
        color: #2A1D16;
        font-weight: 500;
      }
      .vip-class {
        width: 100%;
        margin-top: 36rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .class-box {
          width: 214rpx;
          height: 214rpx;
          border: 1px solid #22252A;
          border-radius: 16rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .time01 {
            position: absolute;
            left: 0;
            top:-18rpx;
            z-index: 2;
            width: 116rpx;
            height: 34rpx;
            background: linear-gradient(to right, #F61593,#FF2C41);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22rpx;
            color:#FFF;
            border-radius: 18rpx 0 18rpx 0;
          }
          .times02 {
            font-size: 28rpx;
            color:#2A1D16;
            font-weight: 500;
            margin-top:36rpx;
          }
          .money {
            font-size:60rpx;
            color:#EE2532;
            font-weight: bold;
            line-height: 76rpx;
          }
          .price {
            font-size:26rpx;
            color:#999999;
            text-decoration: line-through;
          }
        }
        .class-active {
          background-color: #FFF0F2 !important;
          border:2px solid #EE2532;
        }
      }
    }
    .user-agreement {
      width: 670rpx;
      font-size: 26rpx;
      color:#999999;
      display:flex;
      .icons-no {
        width: 40rpx;
        height: 40rpx;
        vertical-align: middle;
        display: inline-block;
        margin-top: 4rpx;
      }
      .text-desc01 {
        vertical-align: middle;
      }
    }
    .bottom-box {
      width: 750rpx;
      padding:10rpx 0 10rpx;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom:40rpx;
      z-index: 1111;
      background-color:#fff;
      // margin-top: -240rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .user-agreement {
        width: 670rpx;
        font-size: 26rpx;
        color:#999999;
        display:flex;
        margin-top: 30rpx;
        .icons-no {
          width: 40rpx;
          height: 40rpx;
          vertical-align: middle;
          display: inline-block;
          margin-top: 4rpx;
        }
        .text-desc01 {
          vertical-align: middle;
        }
      }
      .btn-open {
        width: 670rpx;
        height: 98rpx;
        border-radius: 98rpx;
        // margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-image: url(https://imgnew.quanminyanxuan.com/other/f61c27c0e3364186ae8a46fed2db1a99.png);
        // background-repeat: no-repeat;
        // background-size: 100%,100%;
        background-color: #2A1D16;
        font-size: 36rpx;
        color:#FFEED9;
        font-weight: bold;
        // margin-bottom:60rpx;
        .icons {
          width: 26rpx;
          height: 26rpx;
          margin-left: 8rpx;
        }
      }
    
    }
    .bottom-box-01 {
      width: 750rpx;
      padding:10rpx 0 10rpx;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom:40rpx;
      z-index: 1111;
      background-color:#fff;
      display: flex;
      flex-direction: column;
      align-items: center;
     .btn-opens {
        width: 670rpx;
        height: 98rpx;
        border-radius: 98rpx;
        // margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url(https://imgnew.quanminyanxuan.com/other/48491fe43bff46559dfea83fd4886170.png);
        background-repeat: no-repeat;
        background-size: 100%,100%;
        background-color: #2A1D16;
        font-size: 36rpx;
        color:#FFEED9;
        font-weight: bold;
        position: relative;
        .text-descs01 {
          position: absolute;
          left: 90rpx;
          top: -20rpx;
          z-index: 9;
          padding: 0 26rpx;
          border:1px solid #D5894C;
          white-space: nowrap;
          color: #D5894C;
          font-size: 24rpx;
          border-radius: 20rpx 20rpx 20rpx 0;
          background-color: #FFF4E1;
        }
        .text-center {
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: space-between;
          .text-left {
            margin-left: 30rpx;
            height: 98rpx;
            display: flex;
            align-items: center;
          }
          .text-right {
            margin-right: 66rpx;
            font-size: 32rpx;
            font-weight: normal;
          }
        }
      }
    }
      
  }
	// .bottom-box {
	//   width: 750rpx;
	//   padding:10rpx 0 52rpx;
	//   box-sizing: border-box;
	//   background-color:#fff;
	//   // margin-top: -240rpx;
	//   display: flex;
	//   flex-direction: column;
	//   align-items: center;
	//   .user-agreement {
	//     width: 670rpx;
	//     font-size: 26rpx;
	//     color:#999999;
	//     display:flex;
	//     .icons-no {
	//       width: 40rpx;
	//       height: 40rpx;
	//       vertical-align: middle;
	//       display: inline-block;
	//       margin-top: 4rpx;
	//     }
	//     .text-desc01 {
	//       vertical-align: middle;
	//     }
	//   }
	//   .btn-open {
	//     width: 710rpx;
	//     height: 138rpx;
	//     // margin-top: 20rpx;
	//     display: flex;
	//     align-items: center;
	//     justify-content: center;
	//     background-image: url(https://imgnew.quanminyanxuan.com/other/f61c27c0e3364186ae8a46fed2db1a99.png);
	//     background-repeat: no-repeat;
	//     background-size: 100%,100%;
	//     font-size: 36rpx;
	//     color:#FFEED9;
	//     font-weight: bold;
	//     // margin-bottom:60rpx;
	//     .icons {
	//       width: 26rpx;
	//       height: 26rpx;
	//       margin-left: 8rpx;
	//     }
	//   }
	
	// }
	
  .pay-box-box{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.7);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1112;
			.pay-box{
				width: 750rpx;
				height: 850rpx;
				background-image: linear-gradient(to bottom,#FFF2FF,#FFFFFF 20%);
				position:absolute;
				left: 0;
				bottom:0;
				border-radius: 30rpx 30rpx 0 0;
				.pay-box-title{
					view{
						font-size: 44rpx;
						color: #2A1D16;
						font-weight: 700;
						text-align: center;
						height:108rpx;
						line-height:108rpx;
						text{
							color: #EE2532;
							font-size: 44rpx;
							margin-left: 20rpx;
						}
					}
					image{
						width: 64rpx;
						height: 64rpx;
						position:absolute;
						right: 22rpx;
						top:22rpx;
					}
				}
				.line{
					width: 670rpx;
					height: 2rpx;
					background-color: #E1E1E1;
					margin: 40rpx auto;
				}
				.tips-title{
					font-size: 28rpx;
					color: #999999;
					padding: 0 40rpx;
				}
				.pro-box{
					width: 710rpx;
					height: 160rpx;
					background: url(https://imgnew.quanminyanxuan.com/other/cc173e033eba421c96f4f2bf865b580d.png) no-repeat;
					background-size: cover;
					padding:10rpx;
					display:flex;
					align-items: center;
					margin:20rpx auto 0;
					image{
						width: 140rpx;
						height: 140rpx;
						margin-right: 20rpx;
					}
					.pro-box-right{
						.pro-title{
							font-size: 32rpx;
							color: #2A1D16;
							width: 400rpx;
							//超过一行省略号
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.pro-price{
							display: flex;
							align-items: baseline;
							font-size: 56rpx;
							color: #EE2532;
							.text1{
								font-size: 30rpx;
								color: #EE2532;
							}
							.text2{
								font-size: 30rpx;
								color: #999999;
								text-decoration: line-through;
								margin-left: 10rpx;
							}
						}
					}
				}
				.price{
					font-size: 56rpx;
					color: #EE2532;
					font-weight: 700;
					padding:0 30rpx;
					display: flex;
					align-items: baseline;
					.text3{
						font-size: 44rpx;
						color: #EE2532;
					}
					.text4{
						font-weight: normal;
						font-size: 24rpx;
						color: #333;
            transform: translateX(-6rpx);
						.text5{
							text-decoration: line-through;
						}
					}
				}
				.pro-pay{
					font-size: 36rpx;
					color: #FFEED9;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #EE2532;
					width: 690rpx;
					height: 100rpx;
					border-radius: 100rpx;
					margin:50rpx auto 0;
          font-weight:600;
					image{
						width: 30rpx;
						height: 30rpx;
            margin-left: 6rpx;
					}
				}
			}
		}
</style>