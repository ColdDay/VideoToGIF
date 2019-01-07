var GIF_IMG = document.getElementById('mainImg')
var PLAY_VIDEO = document.getElementById('play')
var GLOBAL_W = document.getElementById('gifWidth').value
var GLOBAL_SCALE = 1
var FPS_LIST = []
var GIF_IMG_LIST = []
function getLoopImg () {
  if (PLAY_VIDEO.currentTime > 0) {
    var canvas = document.createElement('canvas')
    canvas.curTime = PLAY_VIDEO.currentTime
    GLOBAL_SCALE = PLAY_VIDEO.offsetWidth / PLAY_VIDEO.offsetHeight
    canvas.width = GLOBAL_W * window.devicePixelRatio
    canvas.height = GLOBAL_W / GLOBAL_SCALE * window.devicePixelRatio
    var context = canvas.getContext('2d')
    context.imageSmoothingEnabled = false
    context.drawImage(PLAY_VIDEO, 0, 0, PLAY_VIDEO.videoWidth, PLAY_VIDEO.videoHeight, 0, 0, canvas.width, canvas.height)
    var img = document.createElement('img')
    img.src = canvas.toDataURL()
    img.time = PLAY_VIDEO.currentTime
    img.width = canvas.width
    img.height = canvas.height
    FPS_LIST.push(img)
    if (PLAY_VIDEO.ended) {
		$('#getOver').click()
    } else if(PLAY_VIDEO.paused) {

	} else {
      setTimeout(function () {
        getLoopImg()
      }, 100)
    }
  } else {
    setTimeout(function () {
      getLoopImg()
    }, 10)
  }
}

$('#selectVideo').on('change', function (e) {
  if (e.target.type != 'file') return
  FPS_LIST = []
  var video = e.target.files[0] || e.dataTransfer.files[0]
  $(GIF_IMG).hide()
  $(PLAY_VIDEO).show()
  $('.text-list').empty()
  $('#startGet').show()
  $('#addText').show()
  $('#selectTip').text('重新选择')
  PLAY_VIDEO.width = GLOBAL_W
  PLAY_VIDEO.src = URL.createObjectURL(video)
  PLAY_VIDEO.playbackRate = 1
  addTextInput()
})
function startGet(){
	$('#status').text('取图中...')
	addTextInput()
	PLAY_VIDEO.play()
	getLoopImg()
}
$('#startGet').on('click', function (e) {
	startGet()
	$(this).hide()
	$('#getOver').show()
})
$('#getOver').on('click', function (e) {
	$('#getOver').hide()
	$('#createGif').show()
	PLAY_VIDEO.pause()
	$('#status').text('取图完成')
})

$('#createGif').on('click', function (e) {
	$('.loading').show()
	$(GIF_IMG).hide()
	$('#status').text('正在生成GIF...')
  	$(PLAY_VIDEO).hide()
	setTimeout(function(){
		showGIF()
	},10)
})
$('#addText').on('click', function (e) {
	addTextInput()
})

$('#gifWidth').on('change', function (e) {
	GLOBAL_W = e.target.value || 200
	PLAY_VIDEO.width = GLOBAL_W
	if (GIF_IMG_LIST.length) {
		$('.loading').show()
		$(GIF_IMG).hide()
		showGIF()
	}
})
$('body').on('click', '.text-btn', function () {
  var curTime = PLAY_VIDEO.currentTime.toFixed(2)
  var $this = $(this)
  if ($(this).hasClass('start')) {
    $this.removeClass('start').addClass('on')
    $this.parent().find('.time-input.start').val(curTime)
    addTextInput()
  } else if ($(this).hasClass('on')) {
    $this.removeClass('on').addClass('end')
    $this.parent().find('.time-input.end').val(curTime)
  }
})
$('body').on('click', '.delete-text', function () {
  $(this).closest('.time-split').remove()
})

function showGIF () {
  GIF_IMG_LIST = []
  var curTime = new Date().getTime()
  drawText()
  var curTime1 = new Date().getTime()
  gifshot.createGIF({
    'images': GIF_IMG_LIST,
    'gifWidth': GLOBAL_W,
    'gifHeight': GLOBAL_W / GLOBAL_SCALE,
    'frameDuration': 1
  }, function (obj) {
	  if (!obj.error) {
	    var image = obj.image
			GIF_IMG.src = image
			$(GIF_IMG).show()
			$('.loading').hide()
      $('#status').text('已完成、右键存储图片')
	  }
	  $('#downloadGif').show()
  })
}
function addTextInput () {
  var index = $('.time-split').length + 1
  var html = '<li class="time-split">' +
			'<span class="text-btn start" title="点击可以自动选择视频当前的时间，再次选择结束选择"></span> ' +
			'<input type="text" class="text-input" placeholder="第' + index + '句话"/> ' +
			'<input type="text" class="time-input start" placeholder="开始时间"/>' +
			'<span class="split">-</span>' +
			'<input type="text" class="time-input end" placeholder="结束时间"/> ' +
			'<input type="text" class="color-input" placeholder="文字颜色"/> ' +
			'<input type="number" class="size-input" placeholder="文字大小" min="16" value="36"/> ' +
			'<select class="positon-select" title="文字位置">'+
				'<option value="1-1">左上</option>'+
				'<option value="1-2">上</option>'+
				'<option value="1-3">右上</option>'+
				'<option value="2-1">左中</option>'+
				'<option value="2-2">中</option>'+
				'<option value="2-3">右中</option>'+
				'<option value="3-1">左下</option>'+
				'<option value="3-2" selected>下</option>'+
				'<option value="3-3">右下</option>'+
			'</select> '+
			'<span class="delete-text" ></span> ' +
		'</li>'
  $('.text-list').append(html)
  $('.time-split').last().find('.color-input').minicolors({
    defaultValue: '#FFF'
  })
}
function drawText () {
  var timeList = []
  $('.time-split').each(function (index, item) {
    var text = $(item).find('.text-input').val()
    var start = $(item).find('.time-input.start').val() * 1
    var end = $(item).find('.time-input.end').val() * 1
    var color = $(item).find('.color-input').val()
	var size = $(item).find('.size-input').val()
	var positon = $(item).find('.positon-select')[0].value
    timeList.push({
      text: text,
      start: start,
      end: end,
      color: color,
      size: size + 'px',
	  font: 'Georgia',
	  positon: positon
    })
  })
  for (var i = 0; i < FPS_LIST.length; i++) {
    (function (index) {
      var img = FPS_LIST[index]
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var context = canvas.getContext('2d')
      context.imageSmoothingEnabled = false
      context.drawImage(img, 0, 0, img.width, img.height)
      var index = timeList.findIndex(function (item) {
        return img.time > item.start && img.time < item.end
      })
      if (index !== -1) {
		  	var item = timeList[index]
        	context.textAlign = 'center'
			context.font = item.size + ' ' + item.font
			context.fillStyle = item.color
			var w = canvas.width/3
			var h = canvas.height/3
			var row = item.positon.split('-')[0]
			var col = item.positon.split('-')[1]
			context.fillText(item.text, col * w - w/2, row * h - h/2)
      }
      var exportImg = document.createElement('img')
      exportImg.src = canvas.toDataURL()
      GIF_IMG_LIST.push(exportImg)
    })(i)
  }
}
function download () {
  // base64 string
  var base64str = GIF_IMG.src.split('base64,')[1]

  // decode base64 string, remove space for IE compatibility
  var binary = atob(base64str.replace(/\s/g, ''))

  // get binary length
  var len = binary.length

  // create ArrayBuffer with binary length
  var buffer = new ArrayBuffer(len)

  // create 8-bit Array
  var view = new Uint8Array(buffer)

  // save unicode of binary data into 8-bit Array
  for (var i = 0; i < len; i++) {
	 view[i] = binary.charCodeAt(i)
  }

  // create the blob object with content-type "application/pdf"
  var blob = new Blob([view], { type: 'image/gif' })

  var eleLink = document.createElement('a')
  eleLink.download = 'filename.gif'
  eleLink.style.display = 'none'
  eleLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
