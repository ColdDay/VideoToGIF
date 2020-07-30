![](https://github.com/ColdDay/mp4ToGif/blob/master/images/%E6%9D%A8%E8%B6%85%E8%B6%8A.gif?raw=true "视频转GIF")

> 在线DEMO体验 [https://www.mofazhuan.com/video-to-gif](https://mofazhuan.com/video-to-gif "视频转GIF")

> Chrome浏览器插件安装点这里     [点这安装 Install](https://chrome.google.com/webstore/detail/%E8%A7%86%E9%A2%91%E8%BD%ACgif/leddonjpeickjppkdpmojghbikcimbca "视频转GIF")

#### 背景   
![](https://user-gold-cdn.xitu.io/2019/1/5/1681d9bf06d63c56?w=300&h=184&f=gif&s=1022939 "视频转GIF")

上面这张图大家都见过吧，哈哈
> 现在聊天时候少不了斗图，光发静图逼格略低了些，GIF在斗图中肯定略胜一筹，手绘动画生成GIF对大多数人来说要求搞了些，不过给某人拍个搞笑的短视频，再加点逗比文字，哈哈，从此你就走上的斗图高手之列，没人敢惹你，一言不合就斗图

> 网上搜一下视频制作表情包，也搜到了几个，但是不多，而且大部分只是单纯的转GIF，可以添加文字的用起来也不是很方便。

> 更可怕的是有的制作GIF的网址超过60帧就要开通VIP，呵呵，看不下去！
> 所以我决定自己贡献一个免费好用的表情包制作工具

#### 工具主要就界面如下
![](https://user-gold-cdn.xitu.io/2019/1/5/1681d6c44a63f4c1?w=1148&h=704&f=png&s=303333 "工具概览")

> 工具不仅提供视频转GIF功能，而且在转换GIF的同时还能添加文字，精确到每一帧，想让文字显示在哪个位置、时间，以及文字大小颜色都可以设置，全部都是浏览器本地生成，没有任何网络请求，离线也能使用。内容随意更改，点击生成就能得到修改后的GIF

#### 使用教程
![](https://user-gold-cdn.xitu.io/2019/1/5/1681d7a6ff5588ad?w=1064&h=1420&f=png&s=342611 "使用介绍")
    
### 实现过程
1. 视频播放时通过canvas将每一帧原图保存到全局数组FPS_LIST中，同时需要把每一帧的播放时间存到图片中，视频在播放的时候，点击文字定位图标，获取当前视频播放时间，填充到文字时间输入框中
2. 点击生成需要重新遍历FPS_LIST，为每一帧添加文字，这里需要注意的时，每行文字都有自己对应显示的时间范围，所以需要判断文字绘制在那一帧图片中。然后生成新的图片数组GIF_IMG_LIST
3. 将图片交给gifshot，最后得到生成后的GIF

#### 是不是很简单

需要声明的是前端生成GIF底层借助一个开源的js库，https://github.com/yahoo/gifshot
本工具是在它的基础上进行的二次开发,感谢作者开源贡献

关于谷歌浏览器开发，可以查看[在线文档](https://github.com/kaola-fed/blog/issues/25 "视频转GIF")

工具具体实现可以访问我的github查看[源代码](https://github.com/ColdDay/mp4ToGif "视频转GIF")，核心代码仅200行，如果对你有帮助，也欢迎 [Star](https://github.com/ColdDay/mp4ToGif "mp4ToGif")


![](https://user-gold-cdn.xitu.io/2019/1/5/1681dcf96c0747d4?w=300&h=216&f=gif&s=1515269 "")

### 希望我的工具能够给爱斗图的朋友们带来一些乐趣
