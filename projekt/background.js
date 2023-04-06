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
  }else if(request.action === "pomembneBesede"){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: oznaciPomembneBesede,
        args: [request.words,request.celeBesede]
      });
    });
  }
});
  
function highlightWords(words) {
  //var regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");                     //samo cele besede
  var regex = new RegExp(`(${words.join("|")})`, "gi");                             //vse besede z korenom 
  var replaceWith = "<span style='background-color: yellow;'>$1</span>";
  document.body.innerHTML = document.body.innerHTML.replace(regex, replaceWith);
}

function oznaciPomembneBesede(words,celeBesede) {
  var regexCele = new RegExp(`\\b(${celeBesede.join("|")})\\b`, "gi");                             //vse besede z korenom 
  var replaceWithCele = "<span style='background-color: #C04000;color:white'>$1</span>";
  document.body.innerHTML = document.body.innerHTML.replace(regexCele, replaceWithCele);

  //var regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");                     //samo cele besede
  var regex = new RegExp(`(${words.join("|")})`, "gi");                             //vse besede z korenom 
  var replaceWith = "<span style='background-color: blue; background-color: rgba(0, 0, 0, .1);'>$1</span>";
  document.body.innerHTML = document.body.innerHTML.replace(regex, replaceWith);

}