chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "highlightWords") {
      var words = request.words;
      var regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
      var replaceWith = "<span style='background-color: yellow;'>$1</span>";
      document.body.innerHTML = document.body.innerHTML.replace(regex, replaceWith);
    }
  });