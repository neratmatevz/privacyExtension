document.addEventListener("DOMContentLoaded", function() {
    var highlightButton = document.getElementById("highlight-button");
    var wordInput = document.getElementById("word-input");
    var oznaciPomembneBesedeButton = document.getElementById("oznaciPomembneBesede");
    let languageSelect = document.getElementById("zberiJezik");
    
    highlightButton.addEventListener("click", function() {
      var words = wordInput.value.split(/\s+/).filter(Boolean);
      chrome.runtime.sendMessage({ action: "highlightWords", words: words });
    });

    oznaciPomembneBesedeButton.addEventListener("click", function() {
      let selectedLanguage = languageSelect.value;
      if (selectedLanguage === "slovene") {
        chrome.runtime.sendMessage({ action: "pomembneBesede", words: koreni, celeBesede: celeBesede});  
      } else if (selectedLanguage === "english") {
        chrome.runtime.sendMessage({ action: "pomembneBesede", words: roots, celeBesede: fullWords});
      }
    });

});


let koreni = ["oseb","podat","zbiran","uporab","deljenje","deli",
      "razkri","soglas","varn","hramba","sled","deli",                        //pomembni koreni besed za privacy
      "piškot","prijava","tretje","stran","registr"
    ];

let celeBesede = ["osebni podatki","osebne podatke","ime","priimek",
      "geslo","uporabniško","telefon","email","e-pošta","nastavitve","piškotki",
      "razkritje","deljenje","tretje strani","tretjim stranem","varnost","odjava",    //pomembne cele besede za privacy
      "posredovanje","obdelujemo","pošiljamo","piškotke","shranjujemo","shranjeni",
      "zasebnost","zasebnosti","IP","operacijski sistem","naprava","kontakt","naslov"
    ];


let roots = ["person","collec","use","sharing","share",
    "disclose","consent","secur","storage","trac","divide",        //important roots for privacy
    "cookie","log","third","party","register"
  ];

let fullWords = ["personal data","personal information","name","surname",
    "password","username","phone","email","settings","cookies",
    "disclosure","sharing","third parties","third party","security","logout",    //important full words for privacy
    "transmission","processing","sending","cookies","storage","stored",
    "privacy","IP","operating system","device","contact","address"
  ];

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var url = tabs[0].url;

  // Get all cookies for the current URL
  chrome.cookies.getAll({ url: url }, function(cookies) {
    var cookieList = document.getElementById("cookie-list");

    // Clear the cookie list before adding the updated cookies
    cookieList.innerHTML = "";

    // Add a checkbox for each cookie
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = cookie.name;
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(cookie.name + " (" + cookie.domain + ")"));
      cookieList.appendChild(li);
    }

    preveriDomenoCookie(cookies);

    // Add a click event listener to the delete button
    var deleteButton = document.getElementById("delete-cookies-button");
    deleteButton.addEventListener("click", function() {
      var selectedCookies = document.querySelectorAll("input[type=checkbox]:checked");

      // Remove each selected cookie
      for (var i = 0; i < selectedCookies.length; i++) {
        var cookieName = selectedCookies[i].value;

        chrome.cookies.remove({ url: url, name: cookieName }, function() {
          console.log("Cookie removed: " + cookieName);

          // Update the cookie list after deleting a cookie
          chrome.cookies.getAll({ url: url }, function(updatedCookies) {
            cookieList.innerHTML = "";
            for (var j = 0; j < updatedCookies.length; j++) {
              var updatedCookie = updatedCookies[j];
              var li = document.createElement("li");
              var checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.value = updatedCookie.name;
              li.appendChild(checkbox);
              li.appendChild(document.createTextNode(updatedCookie.name + " (" + updatedCookie.domain + ")"));
              cookieList.appendChild(li);
            }
            preveriDomenoCookie(cookies);
          });
        });
      }
    });
  });
});


function preveriDomenoCookie(cookies){
  var thirdpartyH3 = document.getElementById("3rdParty");
  var thirdPartyDomains = [];
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    if (cookie.domain != window.location.hostname && !thirdPartyDomains.includes(cookie.domain)) {
      thirdPartyDomains.push(cookie.domain);
    }
  }
  if (thirdPartyDomains.length > 0) {
    thirdpartyH3.innerHTML = "Stran uporablja piškotke teh domen : ("+ thirdPartyDomains.join(", ")+")!";
    thirdpartyH3.style.color = "green";
  } 
  
}

//Skrij/Odkrij za cookieje
const toggleCookiesButton = document.getElementById('toggle-cookies-button');
const cookieList = document.getElementById('skrij');

toggleCookiesButton.addEventListener('click', function() {
  if (cookieList.style.display === 'none') {
    cookieList.style.display = 'block';
  } else {
    cookieList.style.display = 'none';
  }
});