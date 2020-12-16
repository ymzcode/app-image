<template>
	<view class="content">
		<app-image src="/static/logo.png"></app-image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<navigator url="/pages/test/test-1" hover-class="navigator-hover">
			<button type="default">用法测试</button>
		</navigator>
		<navigator url="/pages/test/test-2" hover-class="navigator-hover">
			<button type="default">缓存效果测试</button>
		</navigator>
		<navigator url="/pages/test/test-3" hover-class="navigator-hover">
			<button type="default">压缩图片测试</button>
		</navigator>
		<navigator url="/pages/test/test-4" hover-class="navigator-hover">
			<button type="default">预览图片测试</button>
		</navigator>
		<navigator url="/pages/test/util-test-1" hover-class="navigator-hover">
			<button type="default">工具函数测试:图片base64</button>
		</navigator>
		<navigator url="/pages/test/limit-test" hover-class="navigator-hover">
			<button type="default">性能测试:vue页面</button>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
