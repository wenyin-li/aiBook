<template>
    <web-view :src="chatUrl"></web-view>
</template>

<script>
    export default {
        data() {
        	return {
                chatUrl:'',
								productInfo:'',
								customField:'',
								userid:'',
								orderIdList:''
        	}
        },
        onLoad(e) {
            const phoneRes = uni.getSystemInfoSync()
            const machine = phoneRes.platform == 'android'?'android':'ios'
            let pages = getCurrentPages();
            let enterPage = ''
            let enterType = ''
            if(pages.length == 1){
              enterPage = 0   
              enterType = 4   //1-商品详情 2-订单详情 3-个人中心
            }else{
              enterPage = e.orderId?e.orderId:pages[pages.length - 2].options.id || 0   //商品id
              enterType = enterPage==0?3:e.orderId?2:1   //1-商品详情 2-订单详情 3-个人中心
            }
            let phone = uni.getStorageSync('userInfo').tel || ''
            let os = '小程序'
            let token = uni.getStorageSync('token')
            let headImg = uni.getStorageSync('userInfo').headImg
            
            let channel = uni.getStorageSync('channel') || 'qmyx_default_weapp'
            this.userid = uni.getStorageSync('userInfo').id || uni.getStorageSync('userInfo').tel || ''
						
						this.nickname = uni.getStorageSync('userInfo').nickname || ''
            
						// 自定义参数
						// let customField = '{}'
						// let cardInfo = 
						this.productInfo = e.productInfo
						this.customField = e.customField
						
						this.customField = e.customField
						
						this.getOrderIdList(()=>{
							this.getUrlType(phone,channel,machine,enterPage,enterType,os,token,headImg)
						})
						// this.getUrlType(phone,channel,machine,enterPage,enterType,os,token,headImg)
						
						
            uni.setNavigationBarTitle({
                title: '在线客服'
            });
        },
        methods: {
					getOrderIdList(callback){
						this.$http
						  .post('/mallv2/order/queryOrderInfoList',{
								userId:uni.getStorageSync('userInfo').id,
								h5Token:''
							})
						  .then(res => {
								if(res.data.length>0){
									if(res.data.length == 1){
										this.orderIdList =res.data[0].childOrderNo
									}
									if(res.data.length>1){
										this.orderIdList =res.data[0].childOrderNo+','+res.data[1].childOrderNo
									}
								}
								callback()
						  })
						  .catch(err => {
						    
						  })
					},
					getUrlType(phone,channel,machine,enterPage,enterType,os,token,headImg){
						let chatUrl1 = `https://sale.quanminyanxuan.com/weapp/pages/about/chat.html?urlTitle=智能电子书&userid=${this.userid}&os=${os}&channel=${channel}&orderIdList=${this.orderIdList}&nickname=${this.nickname}&newType=${enterType}`
						
						if(this.productInfo){
							this.chatUrl = `${chatUrl1}&otherParams=${this.productInfo}`
						}
						else{
							this.chatUrl = `${chatUrl1}`
						}
						
					}
        }
        
    }
</script>

<style>
</style>
