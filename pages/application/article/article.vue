<template>
  <view>
    <!-- 页面内容 -->
	<view class="">
		这是论文首页
	</view>
    <custom-tabbar :tabbar-list="tabbarList"></custom-tabbar>
  </view>
</template>
 
<script>
import CustomTabbar from '@/components/article/article.vue';
 
export default {
  components: {
    CustomTabbar
  },
  data() {
    return {
      tabbarList: [
        { text: '首页', pagePath: '/pages/home/home' },
        { text: '我的', pagePath: '/pages/mine/mine' }
      ]
    };
  }
};
</script>