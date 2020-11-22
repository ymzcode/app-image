# app-image
一个封装自uniapp的图片小组件

-----------------------

### 功能简述

> 注: 
> 1. 目前缓存功能只在app上面进行了实现
> 2. 个人设备有限只在Android上进行了测试
> 3. 组件内使用了 `uni.getImageInfo` `uni.saveFile` 方法 , 其方法本身有一定限制, 请提前了解一下是否适合您的使用场景
> 4. 萌新的第一个组件 有问题还请大佬指正, 后续会添加完善更多的功能, 尽可能的去兼容更多的平台. 

#### 组件参数

|    参数名    |       类型       | 默认值 |
| :----------: | :--------------: | :----: |
| width(宽度)  | [String, Number] |   88   |
| height(高度) | [String, Number] |   88   |
| mode(图片模式名) |  String |   aspectFill   |
| src(图片的地址) | String |   无   |
| imgStyle(图片的自定义样式) | String |   无   |
| imgClass(图片的自定义样式名) | String |   无   |
| autoCheckImage(是否开启图片自检、替换) | Boolean |   true   |
| imgUnit(是否开启图片自检、替换) | String |   rpx   |
| replaceImgIndex(如果图片出错， 使用哪个默认图片进行替换) | Number |   0   |
| isCatch(图片是否进行缓存) | Boolean |   false   |
| lazyLoad(图片懒加载) | Boolean |   true   |

