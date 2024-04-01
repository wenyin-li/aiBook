<template>
  <view class="tabbar">
    <view v-for="(item, index) in tabbarList" :key="index" class="tabbar-item" @click="switchTab(index)">
      {{ item.text }}
    </view>
  </view>
</template>
 
<script>
export default {
  props: {
    tabbarList: {
      type: Array,
      default: () => [
        { text: '首页', pagePath: '/pages/home/home' },
        { text: '我的', pagePath: '/pages/mine/mine' }
      ]
    }
  },
  methods: {
    switchTab(index) {
      const item = this.tabbarList[index];
      uni.switchTab({
        url: item.pagePath
      });
    }
  }
};
</script>
 
<style>
.tabbar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.tabbar-item {
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
</style>