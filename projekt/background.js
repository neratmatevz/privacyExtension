/*chrome.action.onClicked.addListener(function(tab) {
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 250
    });
  });*/
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "highlightWords") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: highlightWords,
          args: [request.words]
        });
      });
    }
  });
  
  function highlightWords(words) {
    //var regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
    var regex = new RegExp(`(${words.join("|")})`, "gi");
    var replaceWith = "<span style='background-color: yellow;'>$1</span>";
    document.body.innerHTML = document.body.innerHTML.replace(regex, replaceWith);
  }