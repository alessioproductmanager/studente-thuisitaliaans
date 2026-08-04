/* 132-uniforma
 * selettore-lingua.js — un selettore solo, per tutto il sito.
 *
 * PERCHE'
 *   C'erano due sistemi diversi e incompatibili: le pillole di
 *   .lang-switcher su 75 pagine di /app, e il gruppo lang-topbar +
 *   lang-hero + lang-section + lang-footer su 303 pagine di /lingue.
 *   Sulle altre 2300 pagine non c'era niente: nessun modo di cambiare
 *   lingua, se non il riquadro che compare da solo.
 *
 * COME
 *   Non ha elenchi di indirizzi. Legge gli hreflang che la pagina
 *   dichiara gia', come fa proposta-lingua.js. Quindi vale per la home,
 *   per le schede scuola, per il test e per qualunque cosa aggiungerai.
 *   Se una pagina non ha versioni tradotte non disegna niente: offrire
 *   un cambio lingua che non porta da nessuna parte e' peggio che non
 *   offrirlo.
 *
 * DOVE
 *   In fondo al piede pagina. Se trova gia' un selettore vecchio nella
 *   pagina (.lang-switcher, .lang-footer) non ne aggiunge un secondo.
 *
 * Nessun cookie, nessuna rete, nessun analytics.
 */
(function () {
  "use strict";

  var NOMI = {
    it:"Italiano", en:"English", nl:"Nederlands", de:"Deutsch",
    fr:"Français", es:"Español", pt:"Português", "pt-br":"Português (BR)",
    pl:"Polski", ro:"Română", uk:"Українська", ar:"العربية",
    zh:"中文", "zh-cn":"中文", bn:"বাংলা", sq:"Shqip",
    tl:"Filipino", fil:"Filipino", ti:"ትግርኛ", ru:"Русский", tr:"Türkçe"
  };

  var TITOLO = {
    it:"Questa pagina in altre lingue", en:"This page in other languages",
    nl:"Deze pagina in andere talen", de:"Diese Seite in anderen Sprachen",
    fr:"Cette page dans d'autres langues", es:"Esta página en otros idiomas",
    pt:"Esta página noutras línguas", pl:"Ta strona w innych językach",
    ro:"Această pagină în alte limbi", uk:"Ця сторінка іншими мовами",
    ar:"هذه الصفحة بلغات أخرى", zh:"本页面的其他语言版本",
    bn:"অন্যান্য ভাষায় এই পাতা", sq:"Kjo faqe në gjuhë të tjera",
    fil:"Ang pahinang ito sa ibang wika", ti:"እዛ ገጽ ብኻልኦት ቋንቋታት"
  };

  function avvia() {
    /* se la pagina ha gia' un selettore suo, non ne metto un secondo */
    if (document.querySelector(
        ".lang-switcher, .lang-footer, .u-lingue")) return;

    var alt = document.querySelectorAll('link[rel="alternate"][hreflang]');
    if (alt.length < 2) return;

    var qui = (document.documentElement.lang || "").toLowerCase();
    var voci = [];
    var visti = {};

    for (var i = 0; i < alt.length; i++) {
      var code = (alt[i].getAttribute("hreflang") || "").toLowerCase();
      var href = alt[i].getAttribute("href");
      if (!code || !href || code === "x-default") continue;
      if (visti[code]) continue;
      visti[code] = 1;
      voci.push({ c: code, h: href, n: NOMI[code] || code.toUpperCase() });
    }
    if (voci.length < 2) return;

    voci.sort(function (a, b) { return a.n.localeCompare(b.n); });

    var piede = document.querySelector(".u-piede") ||
                document.querySelector("footer");
    if (!piede) return;

    var box = document.createElement("div");
    box.className = "u-lingue";
    var t = document.createElement("p");
    t.className = "u-lingue-titolo";
    t.textContent = TITOLO[qui.slice(0, 2)] || TITOLO.en;
    box.appendChild(t);

    var ul = document.createElement("ul");
    for (var k = 0; k < voci.length; k++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", voci[k].h);
      a.setAttribute("hreflang", voci[k].c);
      a.setAttribute("lang", voci[k].c);
      a.textContent = voci[k].n;
      if (voci[k].c === qui) a.setAttribute("aria-current", "true");
      li.appendChild(a);
      ul.appendChild(li);
    }
    box.appendChild(ul);
    piede.appendChild(box);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
