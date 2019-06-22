var radio = prompt("输入点击权重，（参考1-10，值越大点击概率越大）");
if(radio!=null){
  window.currentDmpSelect.setAttribute('snake-radio', radio);
} else {
  window.currentDmpSelect.removeAttribute('snake-select');
}