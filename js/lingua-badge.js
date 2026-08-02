/* lingua-badge.js — sotto il pulsante dell'app compare una riga che dice che
   l'app c'e' anche nella lingua di chi legge. Solo quando serve: se la lingua
   del browser e' la stessa della pagina non compare, perche' sarebbe ovvio.
   Il nome della lingua e' scritto nella lingua del lettore. */
(function () {
  var FRASI = {
    it: "Disponibile anche in italiano",
    en: "Also available in English",
    nl: "Ook beschikbaar in het Nederlands",
    de: "Auch auf Deutsch verfügbar",
    fr: "Disponible aussi en français",
    es: "Disponible también en español",
    pl: "Dostępne także po polsku",
    pt: "Disponível também em português",
    ro: "Disponibil și în română",
    sq: "E disponueshme edhe në shqip",
    uk: "Доступно також українською",
    zh: "也提供中文版",
    ar: "متوفر أيضًا بالعربية",
    bn: "বাংলাতেও পাওয়া যায়",
    tl: "Available din sa Filipino",
    ti: "ብትግርኛ እውን ይርከብ"
  };

  var pagina = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
  var b = (navigator.language || "").slice(0, 2).toLowerCase();
  if (!b || b === pagina || !FRASI[b]) return;

  var visti = 0;
  document.querySelectorAll('a[href*="apps.apple.com"]').forEach(function (a) {
    if (visti >= 2) return;                 // basta una o due volte per pagina
    if (a.parentNode.querySelector(".lingua-badge")) return;
    var p = document.createElement("p");
    p.className = "lingua-badge";
    p.lang = b;
    p.textContent = FRASI[b];
    a.insertAdjacentElement("afterend", p);
    visti++;
  });
})();
