<template>
	<view class="">
		<text>开启预览图片(默认长按事件 保存相册)</text>
		<app-image src="/static/logo.png" isPreviewImage></app-image>
		<text>开启预览图片 自定义长按事件</text>
		<app-image src="/static/logo.png" isPreviewImage :longPressActions="longPress"></app-image>
		<text>开启预览图片 并 自定义图片点击事件 并 绑定图片预览成功回调(此时可以获取图片事件 但是没有阻止默认操作)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" @imageClick="imageClick" @previewImageSuccess="previewImageSuccess" isPreviewImage></app-image>
		<text>开启预览图片 并 自定义图片点击事件(此时可以获取图片事件 并且阻止默认操作)</text>
		<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg" @imageClick="imageClickStopPr" isPreviewImage></app-image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			longPress: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		};
	},
	methods: {
		imageClick(e) {
			console.log('imageClick', e);
		},
		imageClickStopPr(e) {
			console.log('imageClickStopPr', e);
			e.ignore(); // 阻止默认操作
			uni.showToast({
				title: '此时已经阻止了默认操作, 没有预览图片',
				icon: 'none'
			});
		},
		previewImageSuccess(e) {
			console.log('previewImageSuccess', e);
		}
	}
};
</script>

<style></style>
