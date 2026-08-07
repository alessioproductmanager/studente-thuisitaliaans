/* proposta-lingua.js — thuisitaliaans
 * ---------------------------------------------------------------------------
 * Propone al visitatore la versione della pagina nella sua lingua, con un
 * riquadro in basso a destra.
 *
 * NON HA ELENCHI DI INDIRIZZI. Legge gli hreflang che ogni pagina gia'
 * dichiara: cosi' vale per la home, per le schede scuola, per il test e per
 * qualunque cosa aggiungerai, senza che io debba sapere in anticipo quante
 * lingue ha quella sezione. Se una pagina ha il polacco, lo trova; se domani
 * ne aggiungi un'altra, la trova lo stesso.
 *
 * PROPONE E BASTA, non reindirizza. Il motivo lo hai gia' scritto tu nelle
 * pagine dell'app: sovrascrivere la lingua dell'indirizzo con quella del
 * browser rompeva l'hreflang e mostrava a Googlebot — che si presenta come
 * "en" — il contenuto inglese su tutte le versioni.
 *
 * Si chiude e non torna. La scelta vale per tutto il sito, non pagina per
 * pagina: chi ha detto no una volta non vuole che glielo si richieda altrove.
 */
(function () {
  "use strict";

  /* 138-proposta-lingua
     Il riquadro veniva creato ma restava invisibile ovunque tranne che nelle
     15 pagine del test, che hanno una copia dello script scritta a mano.
     Il motivo: i nomi delle classi non coincidevano con quelli del CSS.
     uniforme.css definisce .proposta-lingua{opacity:0} e la rende visibile
     solo con .entra, mentre qui si aggiungeva .pl-entra. Stessa cosa per
     l'uscita (.va-via) e per la x (.chiudi-x). Adesso i nomi sono quelli
     del foglio di stile. */


  var FRASI = {
    it: { t: "Questa pagina è disponibile in italiano", b: "Vai all'italiano", c: "Non ora" },
    en: { t: "This page is available in English", b: "Switch to English", c: "Not now" },
    nl: { t: "Deze pagina is ook in het Nederlands", b: "Ga naar het Nederlands", c: "Niet nu" },
    de: { t: "Diese Seite gibt es auch auf Deutsch", b: "Zur deutschen Fassung", c: "Später" },
    fr: { t: "Cette page existe aussi en français", b: "Passer au français", c: "Plus tard" },
    es: { t: "Esta página también está en español", b: "Ver en español", c: "Ahora no" },
    pt: { t: "Esta página também está em português", b: "Ver em português", c: "Agora não" },
    pl: { t: "Ta strona jest dostępna po polsku", b: "Przejdź na polski", c: "Nie teraz" },
    ro: { t: "Această pagină există și în română", b: "Vezi în română", c: "Mai târziu" },
    uk: { t: "Ця сторінка є також українською", b: "Перейти до української", c: "Не зараз" },
    zh: { t: "本页面也有中文版", b: "查看中文版", c: "暂不" },
    ar: { t: "هذه الصفحة متوفرة بالعربية", b: "اذهب إلى النسخة العربية", c: "ليس الآن" },
    sq: { t: "Kjo faqe është edhe në shqip", b: "Shko te shqipja", c: "Jo tani" },
    bn: { t: "এই পাতা বাংলাতেও আছে", b: "বাংলায় দেখুন", c: "এখন নয়" },
    tl: { t: "May Filipino din ang pahinang ito", b: "Tingnan sa Filipino", c: "Hindi ngayon" },
    ti: { t: "እዛ ገጽ ብትግርኛ እውን ኣላ", b: "ናብ ትግርኛ ኪድ", c: "ሕጂ ኣይኰነን" }
  };
  var RTL = ["ar"];
  var CHIAVE = "lingua-proposta-chiusa";

  /* 131-proposta-lingua */
  /* La x e il "Non ora" non vogliono dire la stessa cosa, quindi non
     valgono la stessa cosa. La x dura una sessione: chi la preme per
     sbaglio ritrova la proposta alla visita dopo. "Non ora" dura 30
     giorni: e' una scelta, e va rispettata, ma non per sempre.
     Il vecchio valore "1" era eterno: lo puliamo, cosi' chi era
     rimasto bloccato torna a vedere la proposta. */
  var GIORNI = 30;

  function zitta() {
    try {
      if (sessionStorage.getItem(CHIAVE) === "1") return true;
    } catch (e) {}
    try {
      var v = localStorage.getItem(CHIAVE);
      if (!v) return false;
      if (v === "1") { localStorage.removeItem(CHIAVE); return false; }
      var fino = parseInt(v, 10);
      if (!fino || Date.now() > fino) { localStorage.removeItem(CHIAVE); return false; }
      return true;
    } catch (e) { return false; }
  }

  function taci(perSempre) {
    try {
      if (perSempre) {
        localStorage.setItem(CHIAVE,
          String(Date.now() + GIORNI * 86400000));
      } else {
        sessionStorage.setItem(CHIAVE, "1");
      }
    } catch (e) {}
  }

  function avvia() {
    var pagina = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
    var browser = (navigator.language || "").slice(0, 2).toLowerCase();
    if (!pagina || !browser || browser === pagina) return;
    if (!FRASI[browser]) return;
    if (zitta()) return;

    /* le versioni le dichiara la pagina, non io */
    var alt = document.querySelector(
      'link[rel="alternate"][hreflang="' + browser + '"]');
    if (!alt || !alt.getAttribute("href")) return;
    var dove = alt.getAttribute("href");

    /* se l'indirizzo alternativo e' questa stessa pagina, non c'e' niente da
       proporre: succede quando hreflang e lang non concordano */
    if (dove.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "") ===
        location.pathname.replace(/\/$/, "")) return;

    var d = FRASI[browser];
    var box = document.createElement("aside");
    box.className = "proposta-lingua";
    box.setAttribute("lang", browser);
    box.setAttribute("role", "complementary");
    if (RTL.indexOf(browser) > -1) box.setAttribute("dir", "rtl");
    box.innerHTML =
      '<button class="chiudi-x" type="button" aria-label="chiudi">&times;</button>' +
      '<p class="pl-testo"></p>' +
      '<div class="pl-azioni">' +
        '<a class="pl-si"></a>' +
        '<button class="pl-no" type="button"></button>' +
      "</div>";
    box.querySelector(".pl-testo").textContent = d.t;
    var si = box.querySelector(".pl-si");
    si.textContent = d.b;
    si.setAttribute("href", dove);
    si.setAttribute("hreflang", browser);
    box.querySelector(".pl-no").textContent = d.c;

    function chiudi(perSempre) {
      box.classList.add("va-via");
      setTimeout(function () { if (box.parentNode) box.remove(); }, 260);
      taci(perSempre);
    }
    box.querySelector(".chiudi-x").addEventListener("click", function () {
      chiudi(false);   /* solo questa sessione */
    });
    box.querySelector(".pl-no").addEventListener("click", function () {
      chiudi(true);    /* 30 giorni */
    });
    document.body.appendChild(box);
    setTimeout(function () { box.classList.add("entra"); }, 700);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
