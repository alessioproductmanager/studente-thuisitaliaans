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

  /*nav-lingua-v3: lingua di navigazione coerente su tutto il sito.
  Su pagine solo in italiano (esercizi, blog) e su sezioni che non coprono
  la lingua dell'utente (es. scuole), il toggle elenca comunque tutte le
  lingue: sceglierne una salva la preferenza, traduce le voci principali
  della barra e mostra un avviso, senza lasciare la pagina. */
  var NAVLOC = {"nl":{"voci":[["Lessen","/"],["De app Ti","/app-ti-nl"],["Niveautest","/test-livello/italiaans-niveautest"],["Boeken","/boeken"],["Oefeningen","/esercizi/"],["Blog","/blog/"],["Taalscholen","/scuole/nl/"]],"cta":["Gratis proefles","/#contact"],"sez":"Deze pagina is niet beschikbaar in het Nederlands.","solo":"Deze pagina is alleen in het Italiaans beschikbaar."},"en":{"voci":[["Lessons","/en/"],["The Ti app","/app-ti-en"],["Level test","/test-livello/italian-level-test"],["Books","/books"],["Exercises","/esercizi/"],["Blog","/blog/"],["Schools in Italy","/scuole/en/"]],"cta":["Free trial","/en/#contact"],"sez":"This page is not available in English.","solo":"This page is only available in Italian."},"it":{"voci":[["Lezioni","/it/"],["L'app Ti","/app-ti"],["Test di livello","/test-livello-italiano"],["Libri","/libri"],["Esercizi","/esercizi/"],["Blog","/blog/"],["Scuole in Italia","/scuole/"]],"cta":["Lezione di prova","/it/#contact"],"sez":"Questa pagina non è disponibile in italiano."},"es":{"voci":[["Clases","/es/"],["La app Ti","/app-ti-es"],["Test de nivel","/test-livello/test-de-nivel-italiano"],["Libros","/books"],["Ejercicios","/esercizi/"],["Blog","/blog/"],["Escuelas en Italia","/scuole/es/"]],"cta":["Clase de prueba","/es/#contact"],"sez":"Esta página no está disponible en español.","solo":"Esta página solo está disponible en italiano."},"fr":{"voci":[["Cours","/fr/"],["L'app Ti","/app-ti-fr"],["Test de niveau","/test-livello/test-de-niveau-italien"],["Livres","/books"],["Exercices","/esercizi/"],["Blog","/blog/"],["Écoles en Italie","/scuole/fr/"]],"cta":["Cours d'essai","/fr/#contact"],"sez":"Cette page n'est pas disponible en français.","solo":"Cette page n'est disponible qu'en italien."},"de":{"voci":[["Unterricht","/de/"],["Die Ti-App","/app-ti-de"],["Einstufungstest","/test-livello/italienisch-einstufungstest"],["Bücher","/books"],["Übungen","/esercizi/"],["Blog","/blog/"],["Sprachschulen in Italien","/scuole/de/"]],"cta":["Probestunde","/de/#contact"],"sez":"Diese Seite ist auf Deutsch nicht verfügbar.","solo":"Diese Seite ist nur auf Italienisch verfügbar."},"pt":{"voci":[["Aulas","/pt/"],["A app Ti","/app-ti-pt"],["Teste de nível","/test-livello/teste-de-nivel-italiano"],["Livros","/books"],["Exercícios","/esercizi/"],["Blog","/blog/"],["Escolas na Itália","/scuole/en/"]],"cta":["Aula experimental","/pt/#contact"],"sez":"Esta página não está disponível em português.","solo":"Esta página só está disponível em italiano."},"ro":{"voci":[["Lecții","/ro/"],["Aplicația Ti","/app-ti-ro"],["Test de nivel","/test-livello/test-de-nivel-italiana"],["Cărți","/books"],["Exerciții","/esercizi/"],["Blog","/blog/"],["Școli în Italia","/scuole/en/"]],"cta":["Lecție de probă","/ro/#contact"],"sez":"Această pagină nu este disponibilă în română.","solo":"Această pagină este disponibilă doar în italiană."},"sq":{"voci":[["Mësime","/sq/"],["Aplikacioni Ti","/app-ti-sq"],["Test niveli","/test-livello/test-niveli-italisht"],["Libra","/books"],["Ushtrime","/esercizi/"],["Blog","/blog/"],["Shkolla në Itali","/scuole/en/"]],"cta":["Mësim prove","/sq/#contact"],"sez":"Kjo faqe nuk është e disponueshme në shqip.","solo":"Kjo faqe është e disponueshme vetëm në italisht."},"uk":{"voci":[["Уроки","/uk/"],["Застосунок Ti","/app-ti-uk"],["Тест рівня","/test-livello/test-rivnya-italiyskoyi"],["Книжки","/books"],["Вправи","/esercizi/"],["Блог","/blog/"],["Школи в Італії","/scuole/en/"]],"cta":["Пробний урок","/uk/#contact"],"sez":"Ця сторінка недоступна українською.","solo":"Ця сторінка доступна лише італійською."},"zh":{"voci":[["课程","/zh/"],["Ti 应用","/app-ti-zh"],["水平测试","/test-livello/yidaliyu-shuiping-ceshi"],["图书","/books"],["练习","/esercizi/"],["博客","/blog/"],["意大利的语言学校","/scuole/en/"]],"cta":["试听课","/zh/#contact"],"sez":"此页面暂无中文版本。","solo":"本页面仅提供意大利语版本。"},"ar":{"voci":[["الدروس","/ar/"],["تطبيق Ti","/app-ti-ar"],["اختبار المستوى","/test-livello/ikhtibar-mustawa-alitaliya"],["كتب","/books"],["تمارين","/esercizi/"],["مدونة","/blog/"],["مدارس في إيطاليا","/scuole/en/"]],"cta":["درس تجريبي","/ar/#contact"],"sez":"هذه الصفحة غير متاحة بالعربية.","solo":"هذه الصفحة متاحة بالإيطالية فقط."},"fil":{"voci":[["Mga aralin","/fil/"],["Ang Ti app","/app-ti-tl"],["Pagsusulit sa antas","/test-livello/pagsusulit-antas-italyano"],["Mga libro","/books"],["Mga ehersisyo","/esercizi/"],["Blog","/blog/"],["Mga paaralan sa Italya","/scuole/en/"]],"cta":["Libreng trial","/fil/#contact"],"sez":"Hindi available sa Filipino ang pahinang ito.","solo":"Available lang sa Italyano ang pahinang ito."},"bn":{"voci":[["পাঠ","/bn/"],["Ti অ্যাপ","/app-ti-bn"],["লেভেল টেস্ট","/test-livello/italian-vasha-star-porikkha"],["বই","/books"],["অনুশীলন","/esercizi/"],["ব্লগ","/blog/"],["ইতালির স্কুল","/scuole/en/"]],"cta":["ফ্রি ট্রায়াল","/bn/#contact"],"sez":"এই পাতাটি বাংলায় নেই।","solo":"এই পাতাটি শুধু ইতালীয় ভাষায় আছে।"},"ti":{"voci":[["ትምህርታት","/ti/"],["መተግበሪ Ti","/app-ti-ti"],["ፊተና ደረጃ","/test-livello/mefetesha-derejat-italyanenya"],["መጻሕፍቲ","/books"],["ልምምዳት","/esercizi/"],["ብሎግ","/blog/"],["ኣብ ኢጣልያ ዘለዋ ቤት ትምህርቲ","/scuole/en/"]],"cta":["ናጻ ፊተነ ትምህርቲ","/ti/#contact"],"sez":"እዛ ገጽ ብትግርኛ የላን።","solo":"እዛ ገጽ ብጣልያንኛ ጥራይ እያ ዘላ።"}};

  var VOCE_INVERSA = {};
  (function () {
    for (var c in NAVLOC) {
      var v = NAVLOC[c].voci;
      for (var i = 0; i < v.length; i++) VOCE_INVERSA[v[i][1]] = i;
    }
  })();

  function linguaSalvata() {
    try { return localStorage.getItem("linguaNav") || ""; } catch (e) { return ""; }
  }
  function salvaLingua(c) {
    try { localStorage.setItem("linguaNav", c); } catch (e) {}
  }

  function avvisoLingua(testo, codice) {
    if (!testo) return;
    var vecchio = document.querySelector(".u-avviso-lingua");
    if (vecchio) vecchio.parentNode.removeChild(vecchio);
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

  function applicaNav(codice, sezione) {
    var d = NAVLOC[codice];
    if (!d) return;
    var link = document.querySelectorAll(".u-sw__l a");
    for (var i = 0; i < link.length; i++) {
      var indice = VOCE_INVERSA[link[i].getAttribute("href")];
      if (indice !== undefined) {
        link[i].textContent = d.voci[indice][0];
        link[i].setAttribute("href", d.voci[indice][1]);
        link[i].removeAttribute("aria-current");
      }
    }
    var logo = document.querySelector("a.u-logo");
    if (logo && VOCE_INVERSA[logo.getAttribute("href")] === 0) logo.setAttribute("href", d.voci[0][1]);
    var cta = document.querySelector("a.u-cta");
    if (cta) {
      var h = cta.getAttribute("href") || "";
      if (h.indexOf("#contact") > -1 && h.charAt(0) === "/") {
        cta.textContent = d.cta[0];
        cta.setAttribute("href", d.cta[1]);
      }
    }
    avvisoLingua(sezione ? d.sez : d.solo, codice);
  }

  function vociLinguaFerma(ul, codici, attiva, azione) {
    for (var i = 0; i < codici.length; i++) {
      (function (c) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = NOMI[c] || c.toUpperCase();
        if (c === attiva) a.setAttribute("aria-current", "true");
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var attuale = ul.querySelector("[aria-current]");
          if (attuale) attuale.removeAttribute("aria-current");
          a.setAttribute("aria-current", "true");
          azione(c);
        });
        li.appendChild(a);
        ul.appendChild(li);
      })(codici[i]);
    }
  }

  function ordina(codici) {
    codici.sort(function (x, y) {
      return (NOMI[x] || x).localeCompare(NOMI[y] || y);
    });
    return codici;
  }

  function chiudi(nodo, bot) {
    nodo.removeAttribute("data-aperto");
    bot.setAttribute("aria-expanded", "false");
  }

  function bottoneLingua(nodo) {
    var bot = document.createElement("button");
    bot.type = "button";
    bot.className = "u-lang__b";
    bot.setAttribute("aria-expanded", "false");
    bot.setAttribute("aria-label", nodo.getAttribute("data-u-lingua") || "Language");
    bot.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align:-4px"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg></span><b aria-hidden="true">\u25be</b>';
    bot.addEventListener("click", function (e) {
      e.stopPropagation();
      if (nodo.hasAttribute("data-aperto")) chiudi(nodo, bot);
      else { nodo.setAttribute("data-aperto", ""); bot.setAttribute("aria-expanded", "true"); }
    });
    document.addEventListener("click", function () { chiudi(nodo, bot); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") chiudi(nodo, bot);
    });
    return bot;
  }

  function montaLinguaSolo(nodo) {
    if (corrente() !== "it" || nodo.getAttribute("data-montato")) return;
    nodo.setAttribute("data-montato", "1");
    var bot = bottoneLingua(nodo);
    var lista = document.createElement("ul");
    lista.className = "u-lang__l";
    var scelta = linguaSalvata() || "it";
    var codici = [];
    for (var c in NAVLOC) codici.push(c);
    vociLinguaFerma(lista, ordina(codici), NAVLOC[scelta] ? scelta : "it", function (c) {
      salvaLingua(c);
      if (c === "it") { location.reload(); return; }
      applicaNav(c, false);
      chiudi(nodo, bot);
    });
    nodo.appendChild(bot);
    nodo.appendChild(lista);
    var s = linguaSalvata();
    if (s && s !== "it" && NAVLOC[s]) applicaNav(s, false);
  }

  function estendiLingueMancanti(nodo, b, ul, alt) {
    var presenti = {};
    for (var i = 0; i < alt.length; i++) presenti[alt[i].codice] = 1;
    var mancanti = [];
    for (var c in NAVLOC) if (!presenti[c]) mancanti.push(c);
    if (!mancanti.length) return;
    var s = linguaSalvata();
    if (s && !presenti[s] && NAVLOC[s]) {
      var att = ul.querySelector("[aria-current]");
      if (att) att.removeAttribute("aria-current");
    }
    vociLinguaFerma(ul, ordina(mancanti), presenti[s] ? "" : s, function (c) {
      salvaLingua(c);
      if (corrente() !== "en") {
        for (var j = 0; j < alt.length; j++) {
          if (alt[j].codice === "en") { location.href = alt[j].href; return; }
        }
      }
      applicaNav(c, true);
      chiudi(nodo, b);
    });
    if (s && !presenti[s] && NAVLOC[s]) applicaNav(s, true);
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
    estendiLingueMancanti(nodo, b, ul, alt);

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
