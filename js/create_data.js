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
}