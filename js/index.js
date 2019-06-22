var exportBtn = document.getElementById('exportBtn');
var startBtn = document.getElementById('startBtn');
exportBtn.addEventListener("click", function(){
  chrome.tabs.executeScript(null,{ 
    file: "js/export.js" 
  });
});

startBtn.addEventListener("click", function(){
  chrome.tabs.executeScript(null,{ 
    file: "js/start.js" 
  });
});
testBtn.addEventListener("click", function(){
  chrome.tabs.executeScript(null,{ 
    file: "js/create_data.js" 
  }, function(){
    chrome.tabs.executeScript(null,{code:"execAiScript(hotMatch, 'test');"});
  });
});
