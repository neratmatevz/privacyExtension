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
