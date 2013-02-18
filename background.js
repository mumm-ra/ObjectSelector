 chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    $('#xpath').html(request.xpath);
  });