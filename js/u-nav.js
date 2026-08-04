/* u-135 — barra, piede, selettore di lingua.
   Il selettore legge i <link rel="alternate" hreflang> della pagina:
   nessun elenco da mantenere a mano, e una pagina senza traduzioni non
   mostra niente invece di mostrare un menu vuoto. */
(function () {
  "use strict";

  var NOMI = {
    it:"Italiano", en:"English", nl:"Nederlands", de:"Deutsch", fr:"Français",
    es:"Español", pl:"Polski", pt:"Português", ro:"Română", uk:"Українська",
    ru:"Русский", ar:"العربية", zh:"中文", hi:"हिन्दी", bn:"বাংলা",
    tr:"Türkçe", sq:"Shqip", ti:"ትግርኛ", fil:"Filipino", tl:"Tagalog",
    am:"አማርኛ", so:"Soomaali", fa:"فارسی", ur:"اردو", vi:"Tiếng Việt",
    th:"ไทย", ja:"日本語", ko:"한국어", id:"Bahasa Indonesia"
  };

  function corrente() {
    var l = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return l.split("-")[0];
  }

  function alternative() {
    var out = [], visti = {};
    var link = document.querySelectorAll('link[rel="alternate"][hreflang]');
    for (var i = 0; i < link.length; i++) {
      var c = (link[i].getAttribute("hreflang") || "").toLowerCase();
      var h = link[i].getAttribute("href");
      if (!c || !h || c === "x-default" || visti[c]) continue;
      visti[c] = 1;
      out.push({ codice: c.split("-")[0], href: h });
    }
    return out;
  }

  function montaLingua(nodo) {
    var alt = alternative();
    if (alt.length < 2) return;              /* una lingua sola: niente menu */

    var ora = corrente();
    var b = document.createElement("button");
    b.type = "button";
    b.className = "u-lang__b";
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-label", nodo.getAttribute("data-u-lingua") || "Language");
    b.innerHTML = '<span>' + (NOMI[ora] || ora.toUpperCase()) + '</span><b aria-hidden="true">▾</b>';

    var ul = document.createElement("ul");
    ul.className = "u-lang__l";
    alt.sort(function (x, y) {
      return (NOMI[x.codice] || x.codice).localeCompare(NOMI[y.codice] || y.codice);
    });
    for (var i = 0; i < alt.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = alt[i].href;
      a.hreflang = alt[i].codice;
      a.textContent = NOMI[alt[i].codice] || alt[i].codice.toUpperCase();
      if (alt[i].codice === ora) a.setAttribute("aria-current", "true");
      li.appendChild(a);
      ul.appendChild(li);
    }

    nodo.appendChild(b);
    nodo.appendChild(ul);

    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var ap = nodo.hasAttribute("data-aperto");
      if (ap) { nodo.removeAttribute("data-aperto"); b.setAttribute("aria-expanded", "false"); }
      else    { nodo.setAttribute("data-aperto", ""); b.setAttribute("aria-expanded", "true"); }
    });
    document.addEventListener("click", function () {
      nodo.removeAttribute("data-aperto");
      b.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        nodo.removeAttribute("data-aperto");
        b.setAttribute("aria-expanded", "false");
      }
    });
  }

  function montaMenu(bar) {
    var apri = bar.querySelector(".u-apri");
    if (!apri) return;
    apri.addEventListener("click", function () {
      var ap = bar.hasAttribute("data-aperto");
      if (ap) { bar.removeAttribute("data-aperto"); apri.setAttribute("aria-expanded", "false"); }
      else    { bar.setAttribute("data-aperto", ""); apri.setAttribute("aria-expanded", "true"); }
    });
  }

  function segnaCorrente(bar) {
    var qui = location.pathname.replace(/\/$/, "") || "/";
    var a = bar.querySelectorAll(".u-menu a");
    for (var i = 0; i < a.length; i++) {
      var h = (a[i].getAttribute("href") || "").split("#")[0].replace(/\/$/, "");
      if (h && h === qui) a[i].setAttribute("aria-current", "page");
    }
  }

  function via() {
    var bar = document.querySelector(".u-bar");
    if (bar) { montaMenu(bar); segnaCorrente(bar); }
    var l = document.querySelectorAll("[data-u-lang]");
    for (var i = 0; i < l.length; i++) montaLingua(l[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", via);
  } else { via(); }
})();
