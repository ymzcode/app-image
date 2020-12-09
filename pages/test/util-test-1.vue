<template>
	<view class="">
		<app-image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uniapp4@2x.png"></app-image>
		<text>点击按钮将上方[网络图片]转换为base64</text>
		<button type="default" @tap="toBase64('https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uniapp4@2x.png')">网络图片转化base64</button>
		<app-image src="/static/logo.png"></app-image>
		<text>点击按钮将上方[本地图片]转换为base64</text>
		<button type="default" @tap="toBase64('/static/logo.png')">本地图片转化base64</button>
	</view>
</template>

<script>
	import appImageUtil from '@/components/app-image/AppImageUtil.js'
	export default {
		methods: {
			toBase64(src) {
				appImageUtil.Base64.image(src).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style>
</style>
