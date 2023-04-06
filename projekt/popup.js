document.addEventListener("DOMContentLoaded", function() {
    var highlightButton = document.getElementById("highlight-button");
    var wordInput = document.getElementById("word-input");
    var oznaciPomembneBesedeButton = document.getElementById("oznaciPomembneBesede");
    
    
    highlightButton.addEventListener("click", function() {
      var words = wordInput.value.split(/\s+/).filter(Boolean);
      chrome.runtime.sendMessage({ action: "highlightWords", words: words });
    });

    oznaciPomembneBesedeButton.addEventListener("click", function() {
      chrome.runtime.sendMessage({ action: "pomembneBesede", words: koreni, celeBesede: celeBesede});
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



