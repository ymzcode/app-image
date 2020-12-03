/*
 * 介绍: 搭配appImage组件的工具函数, 方便做更多的操作, 可单独使用
 * 作者: 吃饱了不饿
 * 更新时间: 2020/11/23
 */

"use strict"

let appImageUtil = {}

function FilterCatchImage(list) {
	let arr = []
	if (list.length > 0) {
		arr = list.filter((item, index) => {
			// console.log(item);
			return item.indexOf('appImageCatch#') === 0
		})
	}

	return arr
}

// 读取\存入缓存图片的唯一标识(除非必要, 请勿修改此值)
appImageUtil.CATCH_FLAG = 'appImageCatch#'

appImageUtil.Catch = {
	/**
	 * @Description 查询获取当前appImage已缓存的所有图片的key
	 * @date 2020/11/23
	 * @param {String} mode 模式 可选参数 sync-同步方法 nosync-异步方法, 不传参数默认使用同步方法
	 * @return {Arror} 返回一个图片数组, 无数据时返回空数组
	 * @example 
	 * 1) getAllKey() 或 getAllKey('sync') 
	 * 2) getAllKey('nosync').then(arr => {}).catch(err => {})
	 */
	getAllKey: function(mode) {
		if (mode === 'sync' || !mode) {
			const res = uni.getStorageInfoSync();
			return FilterCatchImage(res.keys)
		} else if (mode === 'nosync') {
			return new Promise((resolve, reject) => {
				uni.getStorageInfo().then(data => {
					let [error, res] = data;
					if (error) {
						reject(error)
					}
					// console.log(data);
					resolve(FilterCatchImage(res.keys))
				}).catch(err => {
					console.error('Catch getAll error', err);
					reject(err)
				})
			})
		}
	}
}

appImageUtil.Size = {
	/**
	 * @Description 计算图片的比例尺寸 即图片宽小于750时 显示原图的大小, 如果大于取其一定比例, 显示完整的图片
	 * @date 2020/12/3
	 * @param {String,Number} width 原图的宽度
	 * @param {String,Number} height 原图的高度
	 * @return {Object} 返回一个图片大小的对象, 其单位默认为rpx  px:rpx = 1:2
	 * @example 
	 * 1) proportionSize(2880, 1800) 返回 {width: 750, height: 469}
	 */
	proportionSize: function(width, height) {
		width = Number(width)
		height = Number(height)
		let imgSize = {
			width: 88,
			height: 88
		}
		let coe = 0
		if (!width || !height || width <= 0 || height <= 0) {
			return imgSize;
		}
		if (width > 750) {
			coe = 750 / width
			imgSize.width = 750
			imgSize.height = Math.round(coe * height)
		} else {
			imgSize.width = width
			imgSize.height = height
		}
		
		// console.log('proportionSize', imgSize);
		
		return imgSize
		
	}
}

export default appImageUtil;
