<template>
	<view style="padding-bottom: 200rpx;">
		<text>说明: 测试过程中 \n [开启缓存] [开启图片预览] [开启图片懒加载] [开启自动调整图片尺寸] [开启图片自检、替换] \n </text>
		<view class="image-card" v-for="(item,index) in imageArr" :key="item.id">
			<app-image :src="item.url" isCatch isPreviewImage></app-image>
			<text class="image-card-text">{{index + 1}}</text>
		</view>
		<view class="bottom-box">
			<view class="more-btn" @click="getImageTen">
				<text class="more-btn-text">再来10张</text>
			</view>
			<view class="page-info">
				<text>当前图片数量: {{imageArr.length}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 用一个接口 很容易超限
	// 本来想用这些随机展示, 无奈效果太差 质量参差不齐 已放弃 但保留代码
	// 实在找不到合适的接口
	// 测试暂时搁置 用下面的方式测试难以得到严谨的结果 可以自行娱乐
	// 申明: 以下接口地址全部由网络文章中收集而来 如有冒犯 可留言删除
	const IMAGEURL = [
		{
			url: 'https://acg.xydwz.cn/gqbz/gqbz.php?return=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.imgurl,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://img.paulzzh.tech/touhou/random?type=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.preview,
					text: res.data.author
				})
			}
		},
		{
			url: 'http://www.dmoe.cc/random.php?return=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.imgurl,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://api.ixiaowai.cn/gqapi/gqapi.php?return=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.imgurl,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php?return=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.imgurl,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://api.mtyqx.cn/api/random.php?return=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.imgurl,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://img.xjh.me/random_img.php?return=json&type=bg&ctype=nature',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: `https:${res.data.img}`,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://api.lyiqk.cn/scenery?type=json',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: res.data.pic,
					text: '暂无'
				})
			}
		},
		{
			url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
			fun: function (res) {
				this.imageArr.push({
					id: new Date().getTime(),
					url: `https://cn.bing.com${res.data.images[0].url}`,
					text: '暂无'
				})
			}
		}
	]
		
	export default {
		data() {
			return {
				imageArr: []
			}
		},
		onLoad() {
			this.getImageTen()
		},
		methods: {
			// 获取10张图片
			getImageTen() {
				for(let i = 0; i < 10; i++) {
					this.api_getImage()
				}
			},
			api_getImage() {
				let _self = this
				// 随机取接口
				let obj = IMAGEURL[Math.floor((Math.random()*IMAGEURL.length))]
				// console.log(obj);
				uni.request({
					url: obj.url,
					success: (res) => {
						console.log(res);
						obj.fun.call(_self, res)
					},
					fail: (err) => {
						console.error('请求接口报错', err);
					}
				})
			}
		}
	}
</script>

<style scoped>
.image-card{
	display: flex;
	flex-direction: column;
}
.image-card-text{
	font-size: 28rpx;
	margin: 0 20rpx;
}
.bottom-box{
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30rpx 0;
	position: fixed;
	bottom: 0;
}
.more-btn{
	background-color: #007AFF;
	border-radius: 60rpx;
	width: 300rpx;
	padding: 20rpx 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.more-btn-text{
	color: #FFFFFF;
}
</style>
