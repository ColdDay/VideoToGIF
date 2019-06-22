document.onmousedown = function(e){  
  var e = e || window.event;
  if(e.button == "2"){
    if (window.snakeStart) {
      window.currentDmpSelect = e.target;
      e.target.setAttribute('snake-select', '1');
      var snakeId = new Date().getTime();
      e.target.setAttribute('snake-id', snakeId);
      e.target.setAttribute('snake-radio', '1');
    }
  }
}
