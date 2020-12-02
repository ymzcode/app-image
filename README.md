# app-image
一个封装自uniapp的图片小组件

-----------------------

### 功能简述

> 注: 
> 1. 目前缓存功能只在app上面进行了实现
>
> 2. 个人设备有限只在Android上进行了测试
>
> 3. 组件内使用了 `uni.getImageInfo` `uni.saveFile` 方法 , 其方法本身有一定限制, 请提前了解一下是否适合您的使用场景
>
> 4. 2020/12/2  更新功能 (图片质量压缩) 使用了plus
>
>    

#### 组件参数

|    参数名    |       类型       | 默认值 | 添加时间 | 使用平台 |
| :----------: | :--------------: | :----: | ------------ | ------------ |
| width(宽度)  | [String, Number] |   88   | 初始功能 | 通用 |
| height(高度) | [String, Number] |   88   | 初始功能 | 通用 |
| mode(图片模式名) |  String |   aspectFill   | 初始功能 | 通用 |
| src(图片的地址) | String |   无   | 初始功能 | 通用 |
| imgStyle(图片的自定义样式) | String |   无   | 初始功能 | 通用 |
| imgClass(图片的自定义样式名) | String |   无   | 初始功能 | 通用 |
| autoCheckImage(是否开启图片自检、替换) | Boolean |   true   | 初始功能 | 通用 |
| imgUnit(图片的大小单位) | String |   rpx   | 初始功能 | 通用 |
| replaceImgIndex(如果图片出错， 使用哪个默认图片进行替换) | Number |   0   | 初始功能 | 通用 |
| isCatch(图片是否进行缓存) | Boolean | false | 初始功能 | 限app(即Android\ios) |
| lazyLoad(图片懒加载) | Boolean | true | 初始功能  | 只针对page与scroll-view下的image有效(详细请查看image组件中关于此属性的介绍) |
| compressQuality(压缩图片质量的大小) | [Number, String] | 0 | 2020/12/2 | 限app |



### 建议使用前阅读的文档

1. https://uniapp.dcloud.io/component/image uni-app中的image组件, 组件的核心
2. http://www.html5plus.org/doc/zh_cn/zip.html#plus.zip.compressImage JSON对象，配置图片压缩转换的参数



### 更新日志

#### 2020/12/2

- 图片压缩质量功能初步完成
- 更新文档