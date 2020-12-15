# app-image
一个封装自uniapp的图片小组件

-----------------------

## 使用方法

```
<app-image src="https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/run1x9.jpg"></app-image>
```

此时用到

1. 自动调整图片的尺寸大小
2. 错误图片自动替换
3. 图片开启懒加载
4. 图片模式名aspectFill

### 计划完成

- [x] 图片转base64(已实现app端和web端 网络图片和本地图片转换)
- [ ] 图片旋转\裁剪图片
- [ ] 图片水印
- [ ] 错误图片展示使用div实现
- [ ] 图片加载中效果实现
- [x] 点击图片进行预览
- [ ] 图片缓存的增\删\改
- [ ] 识别图片中的文字
- [ ] 使用大量图片进行极限\性能测试

### 功能简述

> 注: 
> 1. 目前缓存功能只在app上面进行了实现
> 2. 组件内使用了 `uni.getImageInfo` `uni.saveFile` 方法 , 其方法本身有一定限制, 请提前了解一下是否适合您的使用场景
> 3. 2020/12/2  更新功能 (图片质量压缩) 使用了plus
> 4. **插件用在每个人不同场景 一定会存在或多或少的未知问题 有问题还望告知  一起讨论解决问题**

#### 组件参数

|    使用前提    |    参数名    |       类型       | 默认值 | 添加时间 | 使用平台 |
| :----------: | :--------------: | :----: | ------------ | ------------ | ------------ |
| 无 | width(宽度)  | [String, Number] |   88   | 初始功能 | 通用 |
| 无 | height(高度) | [String, Number] |   88   | 初始功能 | 通用 |
| 无 | mode(图片模式名) |  String |   aspectFill   | 初始功能 | 通用 |
| 无 | src(图片的地址) | String |   无   | 初始功能 | 通用 |
| 无 | imgStyle(图片的自定义样式) | String |   无   | 初始功能 | 通用 |
| 无 | imgClass(图片的自定义样式名) | String |   无   | 初始功能 | 通用 |
| 无 | imgUnit(图片的大小单位) | String |   rpx   | 初始功能 | 通用 |
| 无 | autoCheckImage(是否开启图片自检、替换) | Boolean | true | 初始功能 | 通用 |
| 无 | lazyLoad(图片懒加载) | Boolean | true | 初始功能 | 只针对page与scroll-view下的image有效(详细请查看image组件中关于此属性的介绍) |
| 无 | fadeShow(图片显示动画效果) | Boolean | true | 2020/12/6 | 仅App-nvue 2.3.4+ Android有效 |
| 无 | webp | Boolean | false | 2020/12/6 | 默认不解析 webP 格式，只支持网络资源 |
| 无 | showMenuByLongpress(开启长按图片显示识别小程序码菜单) | Boolean | false | 2020/12/6 | 微信小程序2.7.0 |
| 开启autoCheckImage | replaceImgIndex(如果图片出错， 使用哪个默认图片进行替换) | Number |   0   | 初始功能 | 通用 |
| 开启autoCheckImage | isCatch(图片是否进行缓存) | Boolean | false | 初始功能 | 限app(即Android\ios) |
| 开启autoCheckImage | compressQuality(压缩图片质量的大小) | [Number, String] | 0 | 2020/12/2 | 限app |
| 开启autoCheckImage | isProportion(是否开启自动调整图片尺寸) | Boolean | true | 2020/12/6 | 限app |
| 无 | isPreviewImage(是否开启预览图片) | Boolean | false | 2020/12/15 | 兼容性同uni.previewImage |
| 开启isPreviewImage | longPressActions(长按图片显示操作菜单，如不填默认为保存相册) | Object | {} | 2020/12/15 | 使用用法同uni.previewImage中longPressActions属性 |



### 组件抛出的事件

|       事件名        |          说明          |                        方法抛出的数据                        |
| :-----------------: | :--------------------: | :----------------------------------------------------------: |
|     imageClick      | 图片点击事件, 可自定义 | src - 当前图片的地址, 非传入地址, 而是处理后的展示地址<br />ignore - 阻止默认事件的函数, 通过调用ignore() 可以阻止后续的事件执行, 以便自定义事件 |
| previewImageSuccess |      预览图片成功      |                {"errMsg": "previewImage:ok"}                 |
|  previewImageError  |      预览图片失败      |                  {"errMsg":  ------------}                   |



### 建议使用前阅读的文档

1. https://uniapp.dcloud.io/component/image uni-app中的image组件, 组件的核心
2. http://www.html5plus.org/doc/zh_cn/zip.html#plus.zip.compressImage JSON对象，配置图片压缩转换的参数



### 更新日志

### 2020/12/6

- 本次更新调整较多, 我只测试了我的本地环境 如果您已经投入使用请务必测试当前版本组件是否正常运行! 如有问题还望告知!
- 更改props宽高的默认值null, 如果 没有设置高度&没有开启自动调整尺寸 默认显示88rpx
- ~~更改props图片模式名默认由之前的aspectFill 改为 aspectFit~~ (web端显示效果较差 大图片会缩小居中, 导致两边空白 放弃)
- 更改测试案例(现在功能参数较多, 使用多个参数展示)
- 更新文档说明
- 同步image组件的属性(方法没用到暂时没有同步)
- 添加缓存存储的唯一标识(**之前缓存的文件会重新进行缓存**) (更改此项是为了避免缓存产生冲突)
- 添加组件的工具函数(可单独使用, 后期可能会添加新的方法 如果更改建议复制一份 避免后期更新替换问题)
- 添加图片压缩质量功能(compressQuality) 以plus方法实现 详细可以查看测试页面
- 添加图片自动调整尺寸功能(会显示图片的原大小, 如果超过会 最大长度以750rpx,计算其同比例高度显示. 功能和mode中的aspectFit 类似. 显示效果会好一些)

#### 2020/12/2

- 图片压缩质量功能初步完成
- 更新文档