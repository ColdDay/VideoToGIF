# mp4ToGif
![](https://raw.githubusercontent.com/ColdDay/mp4ToGif/master/demo-1.gif "视频转GIF")   

视频转GIF在线使用网址 [https://coldday.github.io/mp4ToGif/](https://coldday.github.io/mp4ToGif/ "视频转GIF")

Chrome浏览器插件安装点这里[点这安装](https://chrome.google.com/webstore/detail/%E8%A7%86%E9%A2%91%E8%BD%ACgif/leddonjpeickjppkdpmojghbikcimbca "视频转GIF")

#### 背景   
> 现在聊天时候少不了斗图，光发静图逼格略低了些，GIF在斗图中肯定略胜一筹，手绘动画生成GIF对大多数人来说要求搞了些，不过给某人拍个搞笑的短视频，再加点逗比文字，哈哈，从此你就走上的斗图高手之列，没人敢惹你，一言不合就斗图

#### 工具主要就界面如下
![](https://user-gold-cdn.xitu.io/2019/1/5/1681d6c44a63f4c1?w=1148&h=704&f=png&s=303333 "工具概览")

> 转换GIF的同时，工具还能添加文字，精确到每一帧，想让文字显示在哪个位置、时间，以及文字大小颜色都可以设置，全部都是浏览器本地生成，没有任何网络请求，离线也能使用。内容随意更改，点击生成就能得到修改后的GIF

#### 使用教程
![](https://user-gold-cdn.xitu.io/2019/1/5/1681d7a6ff5588ad?w=1064&h=1420&f=png&s=342611 "使用介绍")
    
### 实现过程
1. 视频播放时通过canvas将每一帧原图保存到全局数组FPS_LIST中，同时需要把每一帧的播放时间存到图片中，视频在播放的时候，点击文字定位图标，获取当前视频播放时间，填充到文字时间输入框中
2. 点击生成需要重新遍历FPS_LIST，为每一帧添加文字，这里需要注意的时，每行文字都有自己对应显示的时间范围，所以需要判断文字绘制在那一帧图片中。然后生成新的图片数组GIF_IMG_LIST
3. 将图片交给gifshot，最后得到生成后的GIF

是不是很简单

前端生成GIF底层借助一个开源的js库，https://github.com/yahoo/gifshot
本工具是在它的基础上进行的二次开发

关于谷歌浏览器开发，可以查看[在线文档](https://github.com/kaola-fed/blog/issues/25 "视频转GIF")

工具具体实现可以访问我的github查看[源代码](https://github.com/ColdDay/mp4ToGif "视频转GIF")，核心代码仅200行，如果对你有帮助，也欢迎 [Star](https://github.com/ColdDay/mp4ToGif "mp4ToGif")
