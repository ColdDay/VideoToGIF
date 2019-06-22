if (window.snakeStart) {
  var selectEles = document.querySelectorAll('[snake-select]');
  var arr = []
  for (let index = 0; index < selectEles.length; index++) {
    const element = selectEles[index];
    var selectorText = generateSelector(element);
    var radio = element.getAttribute('snake-radio') * 1;
    arr.push({
      radio: radio,
      match: selectorText
    })
  }
  window.hotMatch = arr;
  var result = document.getElementById('snake-result');
  if (result) {
    document.body.removeChild(result)
  }
  var textarea = document.createElement('textarea');
  textarea.id = 'snake-result';
  textarea.style.position = 'fixed';
  textarea.style.top = '50%';
  textarea.style.width = '100%';
  textarea.style.height = '300px';
  textarea.style.zIndex = 999;
  textarea.style.fontSize = '14px';
  textarea.innerText = JSON.stringify(arr);
  document.body.appendChild(textarea);

  setTimeout(function(){
    document.body.removeChild(document.getElementById('snake-result'))
  }, 5000)
} else {
  alert('您还没有开始录制');
}
