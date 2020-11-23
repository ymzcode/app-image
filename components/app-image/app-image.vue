<template>
	<view>
		<image :src="compSrc" :lazy-load="lazyLoad" :mode="mode" :style="`width: ${width}${imgUnit}; height: ${height}${imgUnit}; ${imgStyle}`" :class="imgClass"></image>
	</view>
</template>

<script>
import appImageUtil from './AppImageUtil.js'

// * 1 * 自定义要替换的错误图片地址
// 数组形式, 当前对应资源文件 static/imgError/XXXX.png
let defaultImgArr = ['/static/app-image/imgError/imgError-1.png'];

export default {
	name: 'AppImage',
	props: {
		// 宽度
		width: {
			type: [String, Number],
			default: 88
		},
		// 高度
		height: {
			type: [String, Number],
			default: 88
		},
		// 图片的模式名
		mode: {
			type: String,
			default: 'aspectFill'
		},
		// 图片的地址
		src: {
			type: String,
			default: ''
		},
		// 自定义的样式
		imgStyle: {
			type: String,
			default: ''
		},
		// 自定义的样式名
		// !注： 使用公共样式名才会生效，某个页面中的样式名不会生效
		imgClass: {
			type: String,
			default: ''
		},
		// 是否开启图片自检、替换
		autoCheckImage: {
			type: Boolean,
			default: true
		},
		// 图片的大小单位
		imgUnit: {
			type: String,
			default: 'rpx',
			validator: function(value) {
				// 这个值必须匹配下列字符串中的一个
				return ['px', 'rpx'].indexOf(value) !== -1;
			}
		},
		// 如果图片出错， 使用哪个默认图片进行替换
		replaceImgIndex: {
			type: Number,
			default: 0
		},
		// // 是否压缩图片质量
		// isCompressImage: {
		// 	type: Boolean,
		// 	default: false
		// },
		// 压缩图片质量的大小
		// compressQuality: {
		// 	type: Number,
		// 	default: 80
		// },
		// 图片是否进行缓存
		isCatch: {
			type: Boolean,
			default: false
		},
		// 图片懒加载
		lazyLoad: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			compSrc: '',
			// 判断处理中是否出现错误
			RUNERROR: false,
			// 存储图片的信息
			imgInfo: null,
			// 判断是否为网络图片
			networkImg: false,
			// 是否已经获得缓存图
			isGetCatchImg: false
		};
	},
	mounted() {
		// 调用图片初始化
		this.imgInit();
		// appImageUtil.Catch.getAllKey('nosync').then(res => {
		// 	console.log(res);
		// })
		// console.log(appImageUtil.Catch.getAllKey());
		// console.log(appImageUtil.CATCH_FLAG);
	},
	computed: {},
	methods: {
		// 图片初始化
		imgInit() {
			if (this.autoCheckImage) {
				this.checkImageUrl();
				this.checkImg();
			} else {
				this.compSrc = this.src;
			}
		},
		// 检查图片的地址是否携带http,
		// 检查图片传入的参数是否正常
		// 检查图片是否已经缓存
		checkImageUrl() {
			let __src = this.src;
			if (typeof __src !== 'string') {
				console.error('传入的类型错误，不为string', __src);
				return;
			}

			let str = RegExp('http');
			this.networkImg = str.test(__src);

			// 不是网络图片/没有开启缓存, 不检查缓存图片
			if (!this.networkImg || !this.isCatch) {
				return;
			}
			
			// #ifdef APP-PLUS
			const _img = uni.getStorageSync(appImageUtil.CATCH_FLAG + __src); // 同步方法
			if (_img) {
				// 得到缓存的图片 , 直接使用缓存的图片
				// console.log(_img);
				this.compSrc = _img.path;
				this.isGetCatchImg = true;
				return _img;
			}
			// #endif
		},
		// 判断图片是否正常,并下载图片到临时本地路径
		checkImg() {
			let __src = this.isGetCatchImg ? this.compSrc : this.src; // 拿到缓存图时, 使用缓存图进行检查, 没有就使用原图地址
			uni.getImageInfo({ src: __src })
				.then(data => {
					//data为一个数组，数组第一项为错误信息，第二项为返回数据
					let [error, res] = data;
					// console.log(data);
					if (error) {
						this.compSrc = defaultImgArr[this.replaceImgIndex];
						console.error(`图片: ${__src}, 错误信息:`, error);
					} else {
						// 拿到获取的图片信息
						this.imgInfo = res;
						this.compSrc = res.path;
						// #ifdef APP-PLUS
						if (this.beforeCatchImg()) {
							this.catchImg();
						}
						// #endif
					}
				})
				.catch(err => {
					console.error('uni.getImageInfo err', err);
				});
		},
		// 图片缓存之前的判断
		beforeCatchImg() {
			let flag = false;
			// console.log('----------------', this.isCatch, this.imgInfo, this.imgInfo.path, this.networkImg, !this.isGetCatchImg);
			if (this.isCatch && this.imgInfo && this.imgInfo.path && this.networkImg && !this.isGetCatchImg) {
				// 开启图片缓存 图片信息正确获取 图片为网络地址
				flag = true;
			}
			return flag;
		},
		// 保存图片的方法
		saveImgStorage(key, value) {
			uni.setStorage({
				key: appImageUtil.CATCH_FLAG + key,
				data: value
			})
				.then(data => {
					// console.log(data);
				})
				.catch(err => {
					console.error(err);
				});
		},
		// 对图片进行缓存
		catchImg() {
			let _self = this;
			let imgSrc = this.src; // 拿到图片的原地址
			try {
				// 异步方法
				uni.saveFile({
					tempFilePath: this.imgInfo.path
				})
					.then(data => {
						// console.log(data);
						//data为一个数组，数组第一项为错误信息，第二项为返回数据
						let [saveFile_error, saveFile_res] = data;
						// console.log(data, error, res);
						if (saveFile_error) {
							console.error(`保存 下载图片: ${downloadFile_res.tempFilePath}, 错误信息:`, saveFile_error);
							return;
						}
						if (saveFile_res) {
							let imgObj = Object.assign({}, _self.imgInfo);
							imgObj.path = saveFile_res.savedFilePath;
							_self.saveImgStorage(_self.src, imgObj);
							// console.log('图片更换为本地地址');
							_self.compSrc = saveFile_res.savedFilePath;
							return saveFile_res.savedFilePath;
						}
					})
					.catch(err => {
						console.error(err);
					});
			} catch (e) {
				// error
				console.error('error 缓存图片时遇到问题', e);
			}
		}
	}
};
</script>

<style scoped>
.__row {
	/* #ifdef APP-VUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}
.__column {
	/* #ifdef APP-VUE */
	display: flex;
	/* #endif */
	flex-direction: column;
}
.__p {
	padding: 30rpx;
}

</style>
