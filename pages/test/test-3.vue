<template>
	<div>
		<text>图片1(原图, 没有开启 缓存&压缩质量, 大小1.4M - 1468006.4 字节)</text>
		<app-image src="https://desk-fd.zol-img.com.cn/t_s2880x1800c5/g5/M00/03/0C/ChMkJ1XSyouIZWwEABdcKRk9iD8AAAPKAIq4ZUAF1xB614.jpg" width="750" height="400"></app-image>
		
		<text>图片2(开启压缩质量 当前30, 大小通过方法getCompressImageInfo可以获取)</text>
		<text>我这边测试大概在444632字节 大约434KB</text>
		<app-image src="https://desk-fd.zol-img.com.cn/t_s2880x1800c5/g5/M00/03/0C/ChMkJ1XSyouIZWwEABdcKRk9iD8AAAPKAIq4ZUAF1xB614.jpg" width="750" height="400" compressQuality="20" @getCompressImageInfo="getCompressImageInfo"></app-image>
	</div>
</template>

<script>
	export default {
		methods: {
			getCompressImageInfo(data) {
				console.log('获取到的压缩图片信息', data);
			}
		}
	}
</script>

<style>
</style>
