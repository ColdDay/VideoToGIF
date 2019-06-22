// chrome.contextMenus.create({
//   title: "添加热点元素++",
//   contexts: ["page", "selection", "image", "link"],
//   onclick: function(info,tab){
//     chrome.tabs.executeScript(null,{ file: "js/add_select.js" });
//   }
// });
chrome.contextMenus.create({
  title: "设置权重@@",
  contexts: ["page", "selection", "image", "link"],
  onclick: function(info,tab){
    chrome.tabs.executeScript(null,{ file: "js/set_radio.js" });
  }
});
chrome.contextMenus.create({
  title: "删除热点元素--",
  contexts: ["page", "selection", "image", "link"],
  onclick: function(info,tab){
    chrome.tabs.executeScript(null,{ file: "js/delete_select.js" });
  }
});
// chrome.contextMenus.create({
//   title: "导出热点元素->",
//   contexts: ["page", "selection", "image", "link"],
//   onclick: function(info,tab){
//     chrome.tabs.executeScript(null,{ file: "js/export_select.js" });
//   }
// });
