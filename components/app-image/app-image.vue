<template>
	<view>
		<image
			:src="mainSrc"
			:lazy-load="lazyLoad"
			:mode="mode"
			:fade-show="fadeShow"
			:webp="webp"
			:show-menu-by-longpress="showMenuByLongpress"
			:style="`width: ${mainWidth}${imgUnit}; height: ${mainHeight}${imgUnit}; ${imgStyle}`"
			:class="imgClass"
			@tap="onImageClick"
		></image>
	</view>
</template>

<script>
import appImageUtil from './AppImageUtil.js';

// * 1 * 自定义要替换的错误图片地址
// 数组形式, 当前对应资源文件 static/imgError/XXXX.png
let defaultImgArr = ['/static/app-image/imgError/imgError-1.png'];

export default {
	name: 'AppImage',
	props: {
		// 宽度
		width: {
			type: [String, Number],
			default: null
		},
		// 高度
		height: {
			type: [String, Number],
			default: null
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
		// 前置条件 开启图片自检、替换
		// 压缩图片质量的大小
		// 注: 此功能只限app端使用
		compressQuality: {
			type: [Number, String],
			default: 0
		},
		// 图片是否进行缓存
		isCatch: {
			type: Boolean,
			default: false
		},
		// 图片懒加载
		lazyLoad: {
			type: Boolean,
			default: true
		},
		// 图片显示动画效果
		fadeShow: {
			type: Boolean,
			default: true
		},
		// 默认不解析 webP 格式，只支持网络资源
		webp: {
			type: Boolean,
			default: false
		},
		// 开启长按图片显示识别小程序码菜单
		showMenuByLongpress: {
			type: Boolean,
			default: false
		},
		// 前置条件 开启图片自检、替换
		// 是否开启自动调整图片尺寸
		isProportion: {
			type: Boolean,
			default: true
		},
		// 是否开启预览图片
		isPreviewImage: {
			type: Boolean,
			default: false
		},
		// 开启预览图片时自定义longPressActions属性
		// 长按图片显示操作菜单，如不填默认为保存相册
		longPressActions: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			compSrc: '',
			// 压缩后的图片地址
			qualitySrc: '',
			// 判断处理中是否出现错误
			RUNERROR: false,
			// 存储图片的信息
			imgInfo: null,
			// 判断是否为网络图片
			networkImg: false,
			// 是否已经获得缓存图
			isGetCatchImg: false,
			// 图片错误时使用图片的大小
			imageErrSize: {
				width: 1,
				height: 1
			}
		};
	},
	mounted() {
		// 调用图片初始化
		this.imgInit();
		// appImageUtil.Catch.getAllKey('nosync').then(res => {
		// 	console.log(res);
		// })
		// console.log(appImageUtil.Catch.getAllKey());
		// console.log(uni.getStorageSync('appImageCatch#https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg'));
		// console.log(appImageUtil.CATCH_FLAG);
	},
	computed: {
		mainSrc() {
			// #ifdef APP-PLUS
			if (this.autoCheckImage && this.compressQuality > 0) {
				return this.qualitySrc;
			}
			// #endif
			return this.compSrc;
		},
		mainWidth() {
			if (this.width) {
				return this.width;
			}
			if (this.autoCheckImage && this.isProportion) {
				return appImageUtil.Size.proportionSize(this.imgInfo ? this.imgInfo.width : this.imageErrSize.width, this.imgInfo ? this.imgInfo.height : this.imageErrSize.height).width;
			}

			return 88;
		},
		mainHeight() {
			if (this.height) {
				return this.height;
			}
			if (this.autoCheckImage && this.isProportion) {
				return appImageUtil.Size.proportionSize(this.imgInfo ? this.imgInfo.width : this.imageErrSize.width, this.imgInfo ? this.imgInfo.height : this.imageErrSize.height).height;
			}

			return 88;
		}
	},
	methods: {
		// 图片点击事件
		onImageClick(event) {
			// 注释此行 可打开冒泡
			event.stopPropagation()
			// console.log('点击图片', this.mainSrc);
			let jump = true;
			this.$emit('imageClick', {
				src: this.mainSrc,
				ignore: () => jump = false
			})
			if (jump && this.isPreviewImage) {
				this.previewImage()
			}
		},
		// 预览图片
		previewImage() {
			let option = {
				urls: [this.mainSrc],
				success: (e) => {
					this.$emit('previewImageSuccess', e)
				},
				fail: (err) => {
					console.error('预览图片失败', err);
					this.$emit('previewImageError', err)
				}
			}
			JSON.stringify(this.longPressActions) !== '{}' ? option['longPressActions'] = this.longPressActions : ''
			// console.log(option);
			uni.previewImage(option);
		},
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
				this.handleImageError()
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
						this.handleImageError();
						console.error(`图片: ${__src}, 错误信息:`, error);
					} else {
						// 拿到获取的图片信息
						this.imgInfo = res;
						this.compSrc = res.path;
						// #ifdef APP-PLUS
						this.compressImage();
						if (this.beforeCatchImg()) {
							this.catchImg();
						}
						// #endif
					}
				})
				.catch(err => {
					this.handleImageError();
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
		},
		// 对图片进行压缩
		compressImage() {
			let _self = this;
			if (_self.compressQuality > 0) {
				plus.zip.compressImage(
					{
						src: _self.compSrc,
						dst: `_doc/${new Date().getTime()}.jpg`,
						quality: _self.compressQuality,
						overwrite: true
					},
					function(event) {
						// console.log('Compress success!', event);
						_self.qualitySrc = event.target;
						// 将数据抛给父页面
						_self.$emit('getCompressImageInfo', event);
					},
					function(error) {
						console.error('压缩图片出错', error);
					}
				);

				return;
				// 这里没有使用这种方法 我实验过后发现效果很不明显 不确定此方法是否生效 后续还要再深入研究
				// 所有暂时使用了html5+ 扩展性更大 效果更好 因此只限app端使用

				// uni.compressImage({
				// 	src: this.compSrc,
				// 	quality: this.compressQuality
				// }).then(data => {
				// 	//data为一个数组，数组第一项为错误信息，第二项为返回数据
				// 	let [compressImage_error, compressImage_res] = data;
				// 	console.log(compressImage_error, compressImage_res);
				// 	if (compressImage_error) {
				// 		console.error(`压缩图片遇到错误`, compressImage_error);
				// 		return;
				// 	}

				// 	if (compressImage_res) {
				// 		this.qualitySrc = compressImage_res.tempFilePath
				// 	}

				// }).catch(err => {
				// 	console.error('uni.compressImage err', err);
				// })
			}
		},
		// 图片错误的处理方法
		handleImageError() {
			uni.getImageInfo({ src: defaultImgArr[this.replaceImgIndex] })
				.then(data => {
					//data为一个数组，数组第一项为错误信息，第二项为返回数据
					let [error, res] = data;
					// console.log(data);
					if (error) {
						uni.showToast({
							title: '加载自定义图片失败',
							icon: 'none'
						});
						console.error(`加载自定义图片失败`, error);
					} else {
						// 拿到获取的图片信息
						this.compSrc = defaultImgArr[this.replaceImgIndex];
						this.imageErrSize.width = res.width;
						this.imageErrSize.height = res.height;
					}
				})
				.catch(err => {
					console.error('uni.getImageInfo err', err);
				});
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
