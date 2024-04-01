<template>
  <view class="wrapper">
    <view class="book-content">
      {{content}}
    </view>
    <view class="pop-bottom" v-if="isShowCZ || isShowPay"></view>
    <view class="pop-cz" v-if="isShowCZ">
      <view class="cz-title">
        <image class="back-close" src="https://saasimg.quanminyanxuan.com/other/f45e30eb276b4a5dbbc57307d2ee55f1.png"
          mode="widthFix" @tap.stop="backPop"></image>
        充值
      </view>
      <view class="my-goldcoins">
        金币剩余：0
      </view>
      <view class="cz-list">
        <view class="cz-item" v-for="(item,index) in czList" :key="index" :class="czIndex == index ? 'cz-act' : ''"
          @tap="btnCZ(index)">
          <view class="desc-tis">
            首充送20金币
          </view>
          <view class="cz-nums">
            <image class="icons" src="https://saasimg.quanminyanxuan.com/other/d1da3926075d45ebbd39a6ed6c82c02f.png"
              mode="widthFix"></image>
            {{item.czGold}}
          </view>
          <view class="cz-money">
            ￥{{item.money}}
          </view>
        </view>
        <view class="go-btn" @tap="czMoney">
          立即支付
        </view>
      </view>
    </view>
    <view class="pop-content" v-if="isShowPay">
      <view class="pay-title" v-if="showText">
        阅读全文需要 <text style="color: #497CF7;">9.9元</text>
      </view>
      <!-- <view class="my-goldcoins" v-if="showText">
        金币剩余：0
      </view> -->
      <image class="gold-icons" src="https://saasimg.quanminyanxuan.com/other/75bda34f29174050ba7f36af26094599.png"
        mode="widthFix"></image>
      <view class="go-btn" @tap="getCreateOrder">
        {{isMoneyOk ? '立即支付' :'金币不足，立即充值'}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        urlJson: 'https://img.firedigit.cn/aiFile/novel/novel_14003032744213329.json',
        content: '',
        isShowPay: false,
        isShowCZ: false,
        userInfo: {

        },
        isMoneyOk:true,
        bookDetail: '',
        czList: [{
            czGold: 100,
            money: '10.00',
            czId: 1
          },
          {
            czGold: 200,
            money: '20.00',
            czId: 2
          },
          {
            czGold: 300,
            money: '30.00',
            czId: 3
          },
          {
            czGold: 400,
            money: '40.00',
            czId: 4
          },
          {
            czGold: 500,
            money: '50.00',
            czId: 5
          },
          {
            czGold: 600,
            money: '60.00',
            czId: 6
          },
        ],
        czIndex: 0,
        showText:false,
      }
    },
    onLoad(option) {
      
      
    },
    onShow(e) {
      this.bookDetail = uni.getStorageSync('bookDetail')
      if(this.bookDetail.name){
        uni.setNavigationBarTitle({
          title:this.bookDetail.name
        })
      }
      // if(this.bookDetail.url){
      //   this.urlJson = this.bookDetail.url
      // }
      
      this.geturlJson()
      // 进来一定能拿得到缓存，判断是否打开支付的弹窗
      if(this.bookDetail.payStatus == 1){
        // 未支付
        this.isShowPay = true
        setTimeout(()=>{
          this.showText = true
        },500)
      }
    },
    methods: {
      btnCZ(index) {
        if (this.czIndex == index) {
          return
        }
        this.czIndex = index
      },
      backPop(){
        this.isShowCZ = false
        this.isShowPay = true
      },
      getCreateOrder () {
        // if(!this.isMoneyOk){
        //   // 用户的金币不足
        //   this.isShowPay = false
        //   this.isShowCZ = true
        //   return
        // }
        this.$http.post('/payment/order/createOrder', {
          spuId: this.bookDetail.id,
          type: 1,
          payType: 'wx'
        }).then(res => {
          if (res.code == 200) {
            let orderNo = res.data.orderNo
            this.goPay(res.data.orderNo)
          }
        })
      },
      goPay(orderNo) {
        uni.showLoading({
          mask: true,
        })
        // 请求支付信息
        this.$http.post('/payment/pay/wx/jsapi', {
          company: 'yuanwu',
          orderNo: orderNo,
        }).then(res => {
          uni.hideLoading()
          // 购买成功
          if (res.code == 200) {
            let payInfo = res.data.body
            // 返回的信息
            let payObj = {
              nonceStr: payInfo.nonceStr,
              package: payInfo.package,
              signType: payInfo.signType,
              timeStamp: String(payInfo.timeStamp),
              paySign: payInfo.paySign
            }
            // 调起支付
            uni.requestOrderPayment({
              ...payObj,
              success: function(res) {
                uni.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
                // 支付完成，关闭弹窗，让用户继续购买
                this.isShowCZ = false
                this.isShowPay = false
              },
              fail: function(err) {
          
              }
          
            })
          }
                  
        })
      },
      czMoney() {
        this.$http.post('/payment/pay/wx/payJsapiGoldCoins', {
          company: 'yuanwu',
          payMoney: Number(this.czList[this.czIndex].money),
        }).then(res => {

          if (res.code == 200) {
            let payInfo = res.data.body
            // 返回的信息
            let payObj = {
              nonceStr: payInfo.nonceStr,
              package: payInfo.package,
              signType: payInfo.signType,
              timeStamp: String(payInfo.timeStamp),
              paySign: payInfo.paySign
            }
            // 调起支付
            uni.requestOrderPayment({
              ...payObj,
              success: function(res) {
                uni.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
                // 支付完成，关闭弹窗，让用户继续购买
                this.isShowCZ = false
                this.isShowPay = true
              },
              fail: function(err) {

              }

            })
          }
        
        })
      },
      geturlJson() {
        uni.request({
          url: this.urlJson,
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            // let jsondata = JSON.parse()
            // console.log(jsondata, 999999)
            this.content = res.data.content
          }
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
    padding-top: 30rpx;

    .book-content {
      width: 690rpx;
      height: 90vh;
      font-size: 30rpx;
      line-height: 46rpx;
      word-spacing: 4rpx;
      white-space: pre-wrap;
    }
    .pop-bottom {
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 9;
      left: 0;
      bottom: 0;
      // background-color: rgba(0, 0, 0, 0.5);
    }

    .pop-cz {
      width: 100%;
      height: 936rpx;
      position: fixed;
      z-index: 9;
      left: 0;
      bottom: 0;
      background-color: #fff;
      display: flex;
      align-items: center;
      flex-direction: column;
      border-radius: 40rpx 40rpx 0 0;

      .cz-title {
        width: 100%;
        padding-top: 64rpx;
        font-size: 46rpx;
        font-weight: bold;
        color: #232323;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .back-close {
          width: 52rpx;
          height: 52rpx;
          position: absolute;
          left: 12rpx;
          z-index: 9;
        }
      }

      .my-goldcoins {
        color: #666666;
        font-size: 30rpx;
        margin-top: 32rpx;
      }

      .cz-list {
        width: 690rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 66rpx;

        .cz-item {
          width: 218rpx;
          height: 172rpx;
          border-radius: 20rpx;
          border: 1px solid #DDDDDD;
          margin-bottom: 24rpx;

          .desc-tis {
            width: 149rpx;
            height: 36rpx;
            background-image: url(https://saasimg.quanminyanxuan.com/other/5c993c84abb44ab1897a147fa21ddb96.png);
            background-repeat: no-repeat;
            background-size: 100%, 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 20rpx;
          }

          .cz-nums {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 12rpx;
            color: #232323;
            font-size: 40rpx;
            font-weight: 500;

            .icons {
              width: 38rpx;
              height: 38rpx;
              margin-right: 12rpx;
            }
          }

          .cz-money {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 6rpx;
            color: #999999;
            font-size: 28rpx;
          }
        }

        .cz-act {
          border: 1px solid #497CF7;
          position: relative;

          &::after {
            content: '';
            width: 56rpx;
            height: 56rpx;
            background-image: url(https://saasimg.quanminyanxuan.com/other/e96244de27a8415fa5fcfb937724d58c.png);
            background-repeat: no-repeat;
            background-size: 100%, 100%;
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 9;
          }
        }

        .go-btn {
          width: 480rpx;
          height: 98rpx;
          border-radius: 98rpx;
          background: linear-gradient(to right, #6BB6FF, #337BFF);
          color: #ffffff;
          font-size: 32rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 80rpx auto 0;
        }
      }
    }

    .pop-content {
      width: 100%;
      height: 936rpx;
      position: fixed;
      z-index: 9;
      left: 0;
      bottom: 0;
      background-image: url(https://saasimg.quanminyanxuan.com/other/06c400aaa98a40c69eca303c6bb7d9f8.png);
      background-size: 100%, 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;

      .pay-title {
        padding-top: 100rpx;
        font-size: 48rpx;
        font-weight: bold;
        color: #232323;
        font-style: oblique;
        display: flex;
        align-items: center;
      }

      .my-goldcoins {
        color: #666666;
        font-size: 30rpx;
        margin-top: 20rpx;
      }

      .gold-icons {
        width: 400rpx;
        height: 416rpx;
        margin: 52rpx 0 60rpx;
      }

      .go-btn {
        width: 480rpx;
        height: 98rpx;
        border-radius: 98rpx;
        background: linear-gradient(to right, #6BB6FF, #337BFF);
        color: #ffffff;
        font-size: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
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
