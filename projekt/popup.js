document.addEventListener("DOMContentLoaded", function() {
    var highlightButton = document.getElementById("highlight-button");
    var wordInput = document.getElementById("word-input");
  
    highlightButton.addEventListener("click", function() {
      var words = wordInput.value.split(/\s+/).filter(Boolean);
      chrome.runtime.sendMessage({ action: "highlightWords", words: words });
    });
  });



