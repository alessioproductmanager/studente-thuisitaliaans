/* store-lingua-extra.js — gli screenshot dell'app restano nella lingua della
   pagina. Cambiano solo per chi parla una lingua che il sito NON ha ma l'app
   si': vedere le immagini nella propria lingua e' meglio che vederle in una
   terza lingua che non si e' scelta.
   Se l'immagine nuova non carica, resta quella di prima. */
(function () {
  var SITO = ["it", "en", "nl", "de", "fr", "es", "pl"];
  var EXTRA = ["ar", "bn", "pt", "ro", "uk", "zh"];

  var b = (navigator.language || "").slice(0, 2).toLowerCase();
  if (!b || SITO.indexOf(b) !== -1 || EXTRA.indexOf(b) === -1) return;

  document.querySelectorAll("[data-store-extra] picture").forEach(function (p) {
    var img = p.querySelector("img"), src = p.querySelector("source");
    if (!img) return;
    var prima = img.getAttribute("src");
    var dopo = prima.replace(/\/assets\/store\/[a-z_]+\//, "/assets/store/" + b + "/");
    if (dopo === prima) return;
    var prova = new Image();
    prova.onload = function () {
      img.setAttribute("src", dopo);
      if (src) src.setAttribute("srcset", dopo.replace(/\.jpg$/, ".webp"));
    };
    prova.src = dopo;
  });
})();
