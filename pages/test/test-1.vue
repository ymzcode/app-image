<template>
	<view class="">
		<text>图片1</text>
		<app-image src="/static/logo.png"></app-image>
		<text>图片2(没有开启缓存)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg"></app-image>
		<text>图片2(开启缓存)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" isCatch></app-image>
		<text>图片3(错误图片地址)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/xxxxxxxx.jpg" isCatch></app-image>
		<text>图片4(设置固定宽高 300, 关闭缓存)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" width="300" height="300" :isCatch="false"></app-image>
		<text>图片5(关闭自动调整图片尺寸 不设置宽高默认为 88rpx)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" :isProportion="false"></app-image>
		<text>图片6(关闭自动调整图片尺寸 设置宽高为 200rpx)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" :isProportion="false" width="200" height="200"></app-image>
		<text>图片7(开启自动调整图片尺寸 设置宽高为 200rpx)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" width="200" height="200"></app-image>
		<text>图片8(关闭图片自检时 缓存\自动调整图片尺寸\压缩图片等扩展功能失效 默认大小88rpx)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" :autoCheckImage="false"></app-image>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>

<style scoped></style>
