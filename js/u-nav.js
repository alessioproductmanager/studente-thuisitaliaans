/* u-144 — barra, piede, selettore di lingua.
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

  /*nav-lingua-v1: toggle su pagine solo in italiano.
  La scelta non naviga (la pagina esiste solo in italiano): viene salvata,
  la barra si traduce e appare un avviso. Sulle pagine multilingua il click
  su una lingua viene comunque salvato, cosi' la navigazione e' coerente. */
  var NAVLOC = {"nl":{"voci":{"/it/":["Lessen","/"],"/app-ti":["De app Ti","/app-ti-nl"],"/test-livello-italiano":["Niveautest","/test-livello/italiaans-niveautest"],"/libri":["Boeken","/boeken"],"/esercizi/":["Oefeningen","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Taalscholen","/scuole/nl/"]},"cta":["Gratis proefles","/#contact"],"avviso":"Deze pagina is alleen in het Italiaans beschikbaar."},"en":{"voci":{"/it/":["Lessons","/en/"],"/app-ti":["The Ti app","/app-ti-en"],"/test-livello-italiano":["Level test","/test-livello/italian-level-test"],"/libri":["Books","/books"],"/esercizi/":["Exercises","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Schools in Italy","/scuole/en/"]},"cta":["Free trial","/en/#contact"],"avviso":"This page is only available in Italian."},"it":{"voci":{"/it/":["Lezioni","/it/"],"/app-ti":["L'app Ti","/app-ti"],"/test-livello-italiano":["Test di livello","/test-livello-italiano"],"/libri":["Libri","/libri"],"/esercizi/":["Esercizi","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Scuole in Italia","/scuole/"]},"cta":["Lezione di prova","/it/#contact"]},"es":{"voci":{"/it/":["Clases","/es/"],"/app-ti":["La app Ti","/app-ti-es"],"/test-livello-italiano":["Test de nivel","/test-livello/test-de-nivel-italiano"],"/libri":["Libros","/books"],"/esercizi/":["Ejercicios","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Escuelas en Italia","/scuole/es/"]},"cta":["Clase de prueba","/es/#contact"],"avviso":"Esta página solo está disponible en italiano."},"fr":{"voci":{"/it/":["Cours","/fr/"],"/app-ti":["L'app Ti","/app-ti-fr"],"/test-livello-italiano":["Test de niveau","/test-livello/test-de-niveau-italien"],"/libri":["Livres","/books"],"/esercizi/":["Exercices","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Écoles en Italie","/scuole/fr/"]},"cta":["Cours d'essai","/fr/#contact"],"avviso":"Cette page n'est disponible qu'en italien."},"de":{"voci":{"/it/":["Unterricht","/de/"],"/app-ti":["Die Ti-App","/app-ti-de"],"/test-livello-italiano":["Einstufungstest","/test-livello/italienisch-einstufungstest"],"/libri":["Bücher","/books"],"/esercizi/":["Übungen","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Sprachschulen in Italien","/scuole/de/"]},"cta":["Probestunde","/de/#contact"],"avviso":"Diese Seite ist nur auf Italienisch verfügbar."},"pt":{"voci":{"/it/":["Aulas","/pt/"],"/app-ti":["A app Ti","/app-ti-pt"],"/test-livello-italiano":["Teste de nível","/test-livello/teste-de-nivel-italiano"],"/libri":["Livros","/books"],"/esercizi/":["Exercícios","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Escolas na Itália","/scuole/en/"]},"cta":["Aula experimental","/pt/#contact"],"avviso":"Esta página só está disponível em italiano."},"ro":{"voci":{"/it/":["Lecții","/ro/"],"/app-ti":["Aplicația Ti","/app-ti-ro"],"/test-livello-italiano":["Test de nivel","/test-livello/test-de-nivel-italiana"],"/libri":["Cărți","/books"],"/esercizi/":["Exerciții","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Școli în Italia","/scuole/en/"]},"cta":["Lecție de probă","/ro/#contact"],"avviso":"Această pagină este disponibilă doar în italiană."},"sq":{"voci":{"/it/":["Mësime","/sq/"],"/app-ti":["Aplikacioni Ti","/app-ti-sq"],"/test-livello-italiano":["Test niveli","/test-livello/test-niveli-italisht"],"/libri":["Libra","/books"],"/esercizi/":["Ushtrime","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Shkolla në Itali","/scuole/en/"]},"cta":["Mësim prove","/sq/#contact"],"avviso":"Kjo faqe është e disponueshme vetëm në italisht."},"uk":{"voci":{"/it/":["Уроки","/uk/"],"/app-ti":["Застосунок Ti","/app-ti-uk"],"/test-livello-italiano":["Тест рівня","/test-livello/test-rivnya-italiyskoyi"],"/libri":["Книжки","/books"],"/esercizi/":["Вправи","/esercizi/"],"/blog/":["Блог","/blog/"],"/scuole/":["Школи в Італії","/scuole/en/"]},"cta":["Пробний урок","/uk/#contact"],"avviso":"Ця сторінка доступна лише італійською."},"zh":{"voci":{"/it/":["课程","/zh/"],"/app-ti":["Ti 应用","/app-ti-zh"],"/test-livello-italiano":["水平测试","/test-livello/yidaliyu-shuiping-ceshi"],"/libri":["图书","/books"],"/esercizi/":["练习","/esercizi/"],"/blog/":["博客","/blog/"],"/scuole/":["意大利的语言学校","/scuole/en/"]},"cta":["试听课","/zh/#contact"],"avviso":"本页面仅提供意大利语版本。"},"ar":{"voci":{"/it/":["الدروس","/ar/"],"/app-ti":["تطبيق Ti","/app-ti-ar"],"/test-livello-italiano":["اختبار المستوى","/test-livello/ikhtibar-mustawa-alitaliya"],"/libri":["كتب","/books"],"/esercizi/":["تمارين","/esercizi/"],"/blog/":["مدونة","/blog/"],"/scuole/":["مدارس في إيطاليا","/scuole/en/"]},"cta":["درس تجريبي","/ar/#contact"],"avviso":"هذه الصفحة متاحة بالإيطالية فقط."},"fil":{"voci":{"/it/":["Mga aralin","/fil/"],"/app-ti":["Ang Ti app","/app-ti-tl"],"/test-livello-italiano":["Pagsusulit sa antas","/test-livello/pagsusulit-antas-italyano"],"/libri":["Mga libro","/books"],"/esercizi/":["Mga ehersisyo","/esercizi/"],"/blog/":["Blog","/blog/"],"/scuole/":["Mga paaralan sa Italya","/scuole/en/"]},"cta":["Libreng trial","/fil/#contact"],"avviso":"Available lang sa Italyano ang pahinang ito."},"bn":{"voci":{"/it/":["পাঠ","/bn/"],"/app-ti":["Ti অ্যাপ","/app-ti-bn"],"/test-livello-italiano":["লেভেল টেস্ট","/test-livello/italian-vasha-star-porikkha"],"/libri":["বই","/books"],"/esercizi/":["অনুশীলন","/esercizi/"],"/blog/":["ব্লগ","/blog/"],"/scuole/":["ইতালির স্কুল","/scuole/en/"]},"cta":["ফ্রি ট্রায়াল","/bn/#contact"],"avviso":"এই পাতাটি শুধু ইতালীয় ভাষায় আছে।"},"ti":{"voci":{"/it/":["ትምህርታት","/ti/"],"/app-ti":["መተግበሪ Ti","/app-ti-ti"],"/test-livello-italiano":["ፊተና ደረጃ","/test-livello/mefetesha-derejat-italyanenya"],"/libri":["መጻሕፍቲ","/books"],"/esercizi/":["ልምምዳት","/esercizi/"],"/blog/":["ብሎግ","/blog/"],"/scuole/":["ኣብ ኢጣልያ ዘለዋ ቤት ትምህርቲ","/scuole/en/"]},"cta":["ናጻ ፊተነ ትምህርቲ","/ti/#contact"],"avviso":"እዛ ገጽ ብጣልያንኛ ጥራይ እያ ዘላ።"}};

  function linguaSalvata() {
    try { return localStorage.getItem("linguaNav") || ""; } catch (e) { return ""; }
  }
  function salvaLingua(c) {
    try { localStorage.setItem("linguaNav", c); } catch (e) {}
  }

  function avvisoLingua(testo, codice) {
    if (!testo || document.querySelector(".u-avviso-lingua")) return;
    var div = document.createElement("div");
    div.className = "u-avviso-lingua";
    if (codice === "ar") div.setAttribute("dir", "rtl");
    div.style.cssText = "background:#fdf3d7;color:#5b4a12;font-size:.85rem;padding:7px 14px;display:flex;justify-content:center;align-items:center;gap:12px";
    var span = document.createElement("span");
    span.textContent = testo;
    var x = document.createElement("button");
    x.type = "button";
    x.setAttribute("aria-label", "OK");
    x.textContent = "\u00d7";
    x.style.cssText = "background:none;border:0;font-size:1.1rem;cursor:pointer;color:inherit;line-height:1;padding:0 4px";
    x.addEventListener("click", function () { div.parentNode.removeChild(div); });
    div.appendChild(span); div.appendChild(x);
    var bar = document.querySelector(".u-bar");
    if (bar && bar.parentNode) bar.parentNode.insertBefore(div, bar.nextSibling);
    else document.body.insertBefore(div, document.body.firstChild);
  }

  function applicaNav(codice) {
    var d = NAVLOC[codice];
    if (!d) return;
    var link = document.querySelectorAll(".u-sw__l a");
    for (var i = 0; i < link.length; i++) {
      var v = d.voci[link[i].getAttribute("href")];
      if (v) { link[i].textContent = v[0]; link[i].setAttribute("href", v[1]); link[i].removeAttribute("aria-current"); }
    }
    var cta = document.querySelector("a.u-cta");
    if (cta && d.cta) { cta.textContent = d.cta[0]; cta.setAttribute("href", d.cta[1]); }
    avvisoLingua(d.avviso, codice);
  }

  function montaLinguaSolo(nodo) {
    if (corrente() !== "it" || nodo.getAttribute("data-montato")) return;
    nodo.setAttribute("data-montato", "1");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "u-lang__b";
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-label", nodo.getAttribute("data-u-lingua") || "Language");
    b.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align:-4px"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg></span><b aria-hidden="true">\u25be</b>';
    var ul = document.createElement("ul");
    ul.className = "u-lang__l";
    var codici = [];
    for (var c in NAVLOC) codici.push(c);
    codici.sort(function (x, y) {
      return (NOMI[x] || x).localeCompare(NOMI[y] || y);
    });
    var scelta = linguaSalvata() || "it";
    for (var i = 0; i < codici.length; i++) {
      (function (c) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = NOMI[c] || c.toUpperCase();
        if (c === scelta) a.setAttribute("aria-current", "true");
        a.addEventListener("click", function (e) {
          e.preventDefault();
          salvaLingua(c);
          if (c === "it") { location.reload(); return; }
          applicaNav(c);
          var attuale = ul.querySelector('[aria-current]');
          if (attuale) attuale.removeAttribute("aria-current");
          a.setAttribute("aria-current", "true");
          nodo.removeAttribute("data-aperto");
          b.setAttribute("aria-expanded", "false");
        });
        li.appendChild(a);
        ul.appendChild(li);
      })(codici[i]);
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
    var s = linguaSalvata();
    if (s && s !== "it" && NAVLOC[s]) applicaNav(s);
  }

  function montaLingua(nodo) {
    var alt = alternative();
    if (alt.length < 2) { montaLinguaSolo(nodo); return; }              /* una lingua sola: niente menu */

    var ora = corrente();
    var b = document.createElement("button");
    b.type = "button";
    b.className = "u-lang__b";
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-label", nodo.getAttribute("data-u-lingua") || "Language");
    b.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align:-4px"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg></span><b aria-hidden="true">▾</b>';

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
      a.addEventListener("click", function () { salvaLingua(this.hreflang); });
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

  function montaCommutatore(bar) {
    var sw = bar.querySelector(".u-sw");
    if (!sw) return;
    var b = sw.querySelector(".u-sw__b");
    if (!b) return;
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var ap = sw.hasAttribute("data-aperto");
      if (ap) { sw.removeAttribute("data-aperto"); b.setAttribute("aria-expanded", "false"); }
      else    { sw.setAttribute("data-aperto", ""); b.setAttribute("aria-expanded", "true"); }
    });
    document.addEventListener("click", function () {
      sw.removeAttribute("data-aperto");
      b.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        sw.removeAttribute("data-aperto");
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
    if (bar) { montaCommutatore(bar); montaMenu(bar); segnaCorrente(bar); }
    var l = document.querySelectorAll("[data-u-lang]");
    for (var i = 0; i < l.length; i++) montaLingua(l[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", via);
  } else { via(); }
})();
