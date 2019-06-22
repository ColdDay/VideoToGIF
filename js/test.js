(function(){
  /*
日志上报refer类型:
  no_match 没有匹配到元素
  js_exception js程序异常
  lunch_over 浏览结束
  click_over 浏览并点击跳走
  onbeforeunload 页面离开
*/
var config = {
  scrollTimeRange: [24000, 30000], // 滚动消耗时间范围
  scrollTimerOnce: [1500, 3000], // 滑动频率，触发滑动时间
  scrollLen: [80, 300], //每次滑动距离范围
}

// 日志上报功能
function AiLog(type, val, data) {
  if (type == 'js_exception') data +=  '，标题' + document.title;
  // 【重要！！！！】 console不能删除，puppeteer通信使用
  console.log(type);
  // 【重要！！！！】 console不能删除，puppeteer通信使用
  data += '，状态码=' + document.readyState;
  var params = 'post_style=common&filter[terminal_id]=' + aiConfig.terminal_id + '&filter[task_id]=' + aiConfig.task_id + '&filter[fill_id]=' + aiConfig.fill_id + '&filter[data]=' + data + '&filter[refer]=' + type + '&filter[value]=' + val;
  var url = 'https://www.mafengwo.cn/rest/advert/murcielago/vlog/?' + params;
  var ajax = new XMLHttpRequest();
  ajax.open('get',url);
  ajax.send(null);
};
// 获取区间随机整数
function randomFrom(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
};
// 判断元素是否在屏幕内
function isviewPort(ele) {
  return true; // pjs暂不支持
  var viewWidth = window.innerWidth || document.documentElement.clientWidth;
  var bounding = ele.getBoundingClientRect();
  if (
      (bounding.left + bounding.width) < 0 ||
      bounding.left >= viewWidth
  ) {
      return false
  } else {
      return true
  }
}
// 获取元素到顶部的距离
function getElementToPageTop(el) {
  if(el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}
// 判断元素是否可见
function isVisible(el) {
  return el.offsetWidth !== 0 || el.offsetHeight !== 0
}
// 获取匹配到的所有可见元素
function getVisibleEles(match) {
  var eles = document.querySelectorAll(match);
  var matchEles = []
  for (let index = 0; index < eles.length; index++) {
    const element = eles[index];
    if (isVisible(element)) {
      matchEles.push(element)
    }    
  }
  return matchEles;
}
// 随机获取匹配到的可见元素
function getRandomVisibleEle(match) {
  var eles = getVisibleEles(match);
  var randomIndex = randomFrom(0, eles.length - 1)
  return eles[randomIndex];
}

// 随机获取匹配到的随机元素
function getRandomEle(match) {
  var eles = document.querySelectorAll(match);
  var randomIndex = randomFrom(0, eles.length - 1)
  return eles[randomIndex];
}
// 获取元素距离屏幕顶部距离
function getElementTopAi(elem) {
  var elemTop = elem.offsetTop;
  elem = elem.offsetParent;
  while (elem != null) {
    elemTop += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return elemTop;
};
// 随机浮动距离
function getRandomElementTopAi(elem) {
  var elemTop = elem.offsetTop;
  elem = elem.offsetParent;
  while (elem != null) {
    elemTop += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return elemTop - randomFrom(100, 300);
};
function mouseClick(el){
  triggerMouseEvent (el, "mouseover");
  triggerMouseEvent (el, "mousedown");
  triggerMouseEvent (el, "mouseup");
  triggerMouseEvent (el, "click");
}
function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}
function triggerTouchEvent(el, eventType) {
  try {
    // 获取目标元素的坐标、大小
    var rect = el.getBoundingClientRect();
    var randomLen = randomFrom()
    var randomX = randomFrom(rect.left, rect.left + rect.width);
    var randomY = randomFrom(rect.top, rect.top + rect.height);
    if (eventType == 'touchstart') {
      //  展示点击区域，测试用
      var dom = document.createElement('span');
      dom.style.position = 'fixed';
      dom.style.top = randomY + 'px';
      dom.style.left = randomX + 'px';
      dom.style.width = '30px';
      dom.style.height = '30px';
      dom.style.backgroundColor = 'red';
      dom.style.opacity = 0.5;
      dom.style.zIndex = 9999;
      document.body.appendChild(dom)
    }
    // 构建touch对象
    var touch = new Touch({
      identifier: Date.now(),
      target: el,
      clientX: randomX,
      clientY: randomY,
      pageY: randomY,
      pageX: randomX,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5
    });
    
    // 兼容老版浏览器
    var touchEvent = document.createEvent('UIEvent');
    touchEvent.initEvent(eventType, true, true); // eventType就是例如touchstart、touchend
    touchEvent.touches = [touch];
    touchEvent.targetTouches = [];
    touchEvent.changedTouches = [touch];
    
    // 构建TouchEvent
    // var touchEvent = new TouchEvent(eventType, {
    //     cancelable: true,
    //     bubbles: true,
    //     touches: [touch],
    //     targetTouches: [],
    //     changedTouches: [touch]
    // });
    el.dispatchEvent(touchEvent);
  } catch (e) {

  }
}
// 模拟触摸点击
function touchClick(ele) {
  try {
    triggerTouchEvent(ele, 'touchstart');
    setTimeout(function () {
      triggerTouchEvent(ele, 'touchend');
    }, 250);
  } catch (error) {
    console.log('no support touch')
  }
}
// 普通点击，带有热点
function click(ele) {
  setTimeout(function() {
    touchClick(ele)
  },100)
  setTimeout(function () {
    mouseClick(ele);
  }, 500)
};
// 二跳点击，带有热点，并上报日志
function clickOver(ele) {
  var nowDate = new Date().getTime();
  aiConfig.useTime = nowDate - aiConfig.startTime;
  if (aiConfig.isDirect == '1') {
    AiLog('click_over', aiConfig.useTime, aiConfig.curHot + '，耗时:' + aiConfig.useTime);
    
    setTimeout(function() {
      touchClick(ele)
    },100)
    setTimeout(function () {
      mouseClick(ele);
    }, 500)
  } else {
    AiLog('lunch_over', aiConfig.useTime, aiConfig.curHot + '，耗时:' + aiConfig.useTime);
    setTimeout(function () {
      window.close();
    }, 1000)
  }
};

// 按照权重随机抽取
function Draw(prizes) {
  this.prizes = prizes;
  var prizeList = []
  prizes.map(function (item) {
    prizeList.push(item)
    for (var i = 0; i < item.radio; i++) {
      prizeList.push(item)
    }
  });
  prizeList = reset(prizeList)

  function reset(arr) {
    var eachArr = arr.concat([])
    var lastArr = []

    function deepEach(deepArr) {
      if (deepArr.length) {
        var randomIndex = randomFrom(0, eachArr.length - 1)
        lastArr.push(eachArr[randomIndex])
        eachArr.splice(randomIndex, 1)
        deepEach(eachArr)
      }
    }
    deepEach(eachArr)
    return lastArr
  }
  this.getResult = function () {
    var random = randomFrom(0, prizeList.length - 1);
    return prizeList[random]
  }
}

// 模拟用户随机滚动,不指定距离
function scrollRandom(callback) {
  var randomIndex = randomFrom(1, 10);
  var scrollLen = parseInt(document.body.scrollHeight / randomIndex);
  scrollAi(0, scrollLen, function () {
    console.log('scrollEnd')
    callback && callback()
  });
};

// 指定目的位置滚动
function scrollAi(curScrollTop, scrollTop, callback, scrollContainer) {
  var scrollEle = window;
  if (scrollContainer) scrollEle = scrollContainer;
  if (curScrollTop < (scrollTop)) {
    scrollEle.scrollTo(0, curScrollTop);
    var randomLen = randomFrom(config.scrollLen[0], config.scrollLen[1]);
    var timer = randomFrom(config.scrollTimerOnce[0], config.scrollTimerOnce[1]);
    if (new Date().getTime() - aiConfig.startTime > 25000) {
      randomLen = scrollTop - curScrollTop;
    }
    setTimeout(function () {
      scrollAi(curScrollTop + randomLen, scrollTop, callback, scrollContainer);
    }, timer);
  } else {
    scrollEle.scrollTo(0, scrollTop);
    var scrollTime = new Date().getTime() - aiConfig.startTime;
    var max = randomFrom(config.scrollTimeRange[0], config.scrollTimeRange[1]);
    if (scrollTime < 20000) {
      var stayTime = max - scrollTime;
      console.log('停留时间', stayTime);
      setTimeout(function () {
        callback();
      }, stayTime)
    } else {
      callback();
    }
  }
};


// 通用滚动点击跳走
function scrollAndClick(elementOrClass) {
  console.log(elementOrClass);
  var paramType = typeof elementOrClass;
  var ele = '';
  if (paramType.toLowerCase() === 'object') {
    ele = elementOrClass;
  } else if (paramType.toLowerCase() === 'string') {
    var elemens = document.querySelectorAll(elementOrClass);
    if (!elemens.length) {
      // 没找到匹配点在页面随机滚动，上报日志
      scrollRandom();
      AiLog('no_match', '目标没匹配到_scrollAndClick', elementOrClass);
      return;
    };
    var randomIndex = randomFrom(0, elemens.length - 1);
    ele = elemens[randomIndex];
  }
  var scrollTop = getElementTopAi(ele) || 0;
  var floorLen = randomFrom(100, 300);
  scrollTop = Math.abs(scrollTop - floorLen);
  aiConfig.scrollHeight = scrollTop;
  scrollAi(0, scrollTop, function () {
    setTimeout(function () {
      clickOver(ele);
    }, randomFrom(3000, 5000));
  })
};

function isLink(url){
  return /^http/.test(url) || url[0] == '/'
}
// 获取header或footer高度
function getInvalidHeight(target) {
  if (target === 'header') return 70;
  var element = document.getElementsByTagName(target)[0] || document.getElementsByClassName(target)[0];
  if (element) {
    return getElementTopAi(element);
  } else {
    if (target === 'footer') return 400;
  }
}



// 通用点击方法,非个性化配置走此
function commonClick() {
  window.onbeforeunload = function (){
    aiConfig.useTime = new Date().getTime() - aiConfig.startTime;
    AiLog('onbeforeunload_base', aiConfig.href, '基础规则点击' + aiConfig.useTime);
  }
  var clienHeight = document.body.clientHeight; // 内容高度
  var topArea = 100; // 顶部不可点高度
  var footerArea = 600; // 底部不可点高度
  // 内容较少的缩小底部不可点区域
  if (clienHeight < 2000) {
    footerArea = clienHeight * 0.2;
  }
  var aElements = document.getElementsByTagName('a');
  var aLinks = [];
  var safeLinks = []; // 内容区域没有时使用
  for (var i = 0; i < aElements.length; i++) {
    var sHref = aElements[i].getAttribute('href') || '';
    // 判断链接合法性
    if (isLink(sHref) && isVisible(aElements[i])) {
      var offsetTop = getElementTopAi(aElements[i]);
      var offsetHeight = aElements[i].offsetHeight;
      // 判断可见链接
      if ((offsetTop + offsetHeight) > topArea && offsetTop < (clienHeight - footerArea)) {
        aLinks.push(aElements[i]);
      } else {
        safeLinks.push(aElements[i])
      }
    }
  }

  var onclickBtns = document.querySelectorAll('[onclick]');
  var matchBtns = [];
  for (var index = 0; index < onclickBtns.length; index++) {
    const element = onclickBtns[index];
    if (isVisible(element)) {
      matchBtns.push(element)
    }
  }

  aLinks = aLinks.concat(matchBtns);
  if (aLinks.length > 0) {
    var top1Arr = []; // 优先点击***
    var top2Arr = []; // 优先点击**
    var viewportHeight = document.documentElement.clientHeight;
    aLinks.map((item) => {
      // var itemBound = item.getBoundingClientRect();
      if (getElementToPageTop(item) < viewportHeight) {
        top1Arr.push(item);
      } else {
        top2Arr.push(item);
      }
    });

    var random = randomFrom(1, 10);
    var targetArr = [];
    // 70%的概率点击首屏
    if (randomFrom(1, 100) < 70) {
      targetArr = top1Arr;
      if (!top1Arr.length) {
        targetArr = top2Arr;
      }
    } else {
      targetArr = top2Arr;
      if (!top2Arr.length) {
        targetArr = top1Arr;
      }
    }
    var oTarDom = targetArr[randomFrom(0, targetArr.length - 1)];
    // 12%的概率点到内容区域外面
    if (Math.random() < 0.12) {
      oTarDom = safeLinks[randomFrom(0, safeLinks.length - 1)];
    }
    scrollAndClick(oTarDom);
  } else if (safeLinks.length) {
    var oTarDom = safeLinks[randomFrom(0, safeLinks.length - 1)];
    scrollAndClick(oTarDom);
  }
}
// 设置window.config
function setWindowConfig (terminal_id, task_id, fill_id, isDirect, supplier) {
  window.aiConfig = {
    isDirect: isDirect,
    terminal_id: terminal_id,
    task_id: task_id,
    fill_id: fill_id,
    supplier: supplier,
    startTime: new Date().getTime(),
    useTime: '',
    curHot: '',
    href: '无',
    scrollHeight: 0
  }
};

// 有配置信息
function matchSucc (hotMatch) {
  var draw = new Draw(hotMatch);
  var drawResult = draw.getResult();
  aiConfig.curHot = drawResult.desc;
  console.log(aiConfig.curHot);
  //页面离开上报数据
  window.onbeforeunload = function () {
    AiLog('onbeforeunload', aiConfig.useTime, aiConfig.curHot);
  }
  if (drawResult.exec) {
    drawResult.exec();
  } else {
    if(typeof drawResult.match  === 'object') {
      scrollAndClick(drawResult.match);
    } else {
      var elements = document.querySelectorAll(drawResult.match);
      if (!elements.length) {
        AiLog('js_exception', '目标没匹配到_走通用点击', drawResult.match);
        // 随机抽取链接滚动跳转
        commonClick()
      } else {
        scrollAndClick(drawResult.match);
      }
    }
    
  }
}

// 通用选择节点方法
function mGetElement(selecter) {
  var ele = document.querySelectorAll(selecter);
  try {
    var flag = ele[0].offsetTop;
    return ele;
  } catch (error) {
    commonClick();
    AiLog('js_exception', '未找到dom, proxy=' + aiConfig.supplier, selecter +'----' + error.toString());
    throw error
  }
}

function execAiScript(hotMatch, title){
  try {
      var task = window.mTask;
      if (!task) {
        task = {
          terminal_id: 1,
          task_id: 2,
          fill_id: 3,
          isDirect: 1,
          supplier: '无'
        }
      }
      setWindowConfig(task.terminal_id, task.task_id, task.fill_id, task.isDirect, task.supplier);
      if(hotMatch){
        matchSucc(hotMatch);
      }else{
        commonClick();
      }
      AiLog('onload', title + ', proxy=' + aiConfig.supplier, '二跳 Flag=' + task.isDirect);
    } catch (error) {
      AiLog('js_exception', '全局异常, proxy=' + aiConfig.supplier, '----' + error.toString());
      console.log(error)
    }
  }
  window.execAiScript = execAiScript
})()