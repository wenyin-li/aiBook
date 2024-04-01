<template>
	<view>
    <web-view :src="url" v-if="url" @message="handleMessage"></web-view>
  </view>
</template>

<script>

export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(e) {
    this.url = e.url
	},
 
	
	onReady() {
		
	},
	methods: {
		
	}
};
</script>

<style>
  
</style>
