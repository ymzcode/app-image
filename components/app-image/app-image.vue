<template>
	<view><image :src="compSrc" :lazy-load="true" :mode="mode" :style="`width: ${width}${imgUnit}; height: ${height}${imgUnit}; ${imgStyle}`" :class="imgClass"></image></view>
</template>

<script>
/*
* 下面是一些代办事项(todolist)
* - 可以按照图片的原大小进行显示
* - 可以操作图片进行翻转
* - 完善图片缓存功能
* - 完善压缩图片质量功能
* - 
*/

// ## 可自定义项

// * 1 * 自定义要替换的错误图片地址
// 数组形式, 当前对应资源文件 static/imgError/XXXX.png
let defaultImgArr = ['/static/imgError/imgError-1.png'];

// ## 重要,谨慎修改
// 封装的一些函数
// -----------start--------------
// 检查头像图片是否正常访问
// __src 要检查的图片地址
// defaultImg 要替换的默认图片地址， 不填则不进行替换
function checkAvatarImgSrc(__src, defaultImg) {
	
	try {
		
		temp_src = __src;
		// console.log('核查的图片地址', __src);
		return uni.getImageInfo({src: __src})
		
		return new Promise(function(resolve, reject) {
			if (!imageUrl(__src)) {
				// console.log('此图片的地址不对');
				if (defaultImg) {
					temp_src = defaultImg;
				}
				reject({ img: temp_src });
				return;
			}

			// 判断图片是否正常
			uni.getImageInfo({
				src: __src,
				success: res => {
					console.log(res);
					resolve({ res, img: temp_src });
				},
				fail: err => {
					console.log(err);
					if (defaultImg) {
						temp_src = defaultImg;
					}
					reject({ err, img: temp_src });
				},
				complete: e => {
					// console.log(e);
					// console.log('11111');
				}
			});
		});
	} catch (e) {
		//TODO handle the exception
		console.error('checkAvatarImgSrc 方法出错', e);
	}
}

// 检查图片的地址是否携带http
function imageUrl(url) {
	let str = RegExp('http');
	return str.test(url);
}

// -----------end--------------

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
		// 是否压缩图片质量
		// !!! 压缩图片质量不支持网络图片地址
		isCompressImage: {
			type: Boolean,
			default: false
		},
		// 压缩图片质量的大小
		compressQuality: {
			type: Number,
			default: 80
		},
		// 图片是否进行缓存
		isCatch: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			compSrc: '',
			// 判断处理中是否出现错误
			RUNERROR: false
		};
	},
	mounted() {
		this.imgInit()

		// if (this.isCatch) {
		//     this.compSrc = this.catchImg(this.src);
		// }
	},
	computed: {},
	methods: {
		// 图片初始化
		imgInit() {
			if (this.autoCheckImage) {
				this.checkImg()
			} else {
				this.compSrc = this.src
			}
		},
		// 判断图片是否正常
		checkImg() {
			let __src = this.src;
			if (typeof __src !== 'string') {
				console.error('传入的类型错误，不为string', __src);
				return;
			}
			uni.getImageInfo({src: __src}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
				let [error, res]  = data;
				// console.log(data, error, res);
				if (error) {
					this.compSrc = defaultImgArr[this.replaceImgIndex]
					console.error(`图片: ${__src}, 错误信息:`, error);
				} else {
					this.compSrc = res.path
				}
			}).catch(err => {
				console.error('uni.getImageInfo err', err);
			})
		},
		// 对图片进行缓存
		catchImg(imgSrc) {
			let _self = this;
			try {
				const _img = uni.getStorageSync(imgSrc); // 同步方法
				if (_img) {
					// 得到缓存的图片 , 直接返回图片
					console.log(_img);
					return _img;
				} else {
					// 异步方法
					// 本次依旧返回原图片地址 但是下次访问时将返回缓存的地址

					// 检查图片的地址是否携带http
					let str = RegExp('http');
					if (!str.test(imgSrc)) {
						console.error('图片的地址中没有携带http', imgSrc);
						return imgSrc;
					}
					
					
					return ;
					uni.downloadFile({
						url: imgSrc, // 网络图片地址
						success: res => {
							if (res.statusCode === 200) {
								console.log('下载成功', res);
								if (!res.tempFilePath) {
									console.error('error 下载图片后的地址为空', res);
									return;
								}

								let compressImage_Promise = function() {
									return new Promise(function(resolve, reject) {
										try {
											if (_self.isCompressImage) {
												uni.compressImage({
													src: res.tempFilePath,
													quality: 80,
													success: compressImage_res => {
														console.log('压缩成功', compressImage_res);
														resolve(compressImage_res.tempFilePath);
													},
													fail: compressImage_err => {
														console.log('error 压缩失败', compressImage_err);
														reject(compressImage_err);
													}
												});
											} else {
												resolve(res.tempFilePath);
											}
										} catch (e) {
											console.error('error 压缩图片过程中出错', e);
										}
									});
								};

								compressImage_Promise()
									.then(CIP_res => {
										console.log('compressImage_Promise', CIP_res);
										uni.saveFile({
											tempFilePath: CIP_res,
											success: function(res) {
												console.log('保存文件成功', res.savedFilePath);
												uni.setStorage({
													key: imgSrc,
													data: res.savedFilePath,
													success: setStorage_res => {
														console.log('缓存成功', setStorage_res);
													},
													fail: setStorage_err => {
														console.error('error 缓存失败', setStorage_err);
													}
												});
											},
											fail: function(err) {
												console.error('error 保存文件失败', err);
											}
										});
									})
									.catch(CIP_err => {
										console.error('error compressImage_Promise失败', CIP_err);
									});
							}
						},
						fail: err => {
							console.error(err);
						}
					});

					return imgSrc;
				}
			} catch (e) {
				// error
				console.error('error 缓存图片时遇到问题', e);
			}
		}
	}
};
</script>

<style></style>
