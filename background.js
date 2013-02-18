 chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    $('#xpath').html(request.xpath);
  });

 chrome.browserAction.onClicked.addListener(function(tab) {
    //chrome.tabs.insertCSS({code: ".important_color {background-color: red !important;}"});
    chrome.tabs.executeScript(null, { file: "jquery-1.9.1.min.js" });
    chrome.tabs.executeScript(null, { file: "selector.js" });

});