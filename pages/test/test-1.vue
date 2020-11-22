<template>
	<view class="">
		<text>图片1(默认使用大小88单位rpx)</text>
		<app-image src="/static/logo.png"></app-image>
		<text>图片2(没有开启缓存)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" width="750" height="500"></app-image>
		<text>图片2(开启缓存)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" width="750" height="500" isCatch></app-image>
		<text>图片3(错误图片地址)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/xxxxxxxx.jpg" width="750" height="500" isCatch></app-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style scoped>
</style>
