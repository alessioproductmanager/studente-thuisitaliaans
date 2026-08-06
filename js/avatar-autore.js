/* avatar-autore.js — la faccia accanto al pulsante WhatsApp.
 *
 * Stessa impostazione di whatsapp.js: autosufficiente, si inietta il
 * proprio CSS, nessuna dipendenza, nessun cookie, nessuna richiesta di
 * rete. Se questo file non c'e', la pagina funziona uguale.
 *
 * Perche' esiste. Il pulsante WhatsApp e' un contatto: serve a chi ha
 * gia' deciso. Chi invece sta ancora decidendo si chiede prima chi sei,
 * e quella domanda oggi non ha una risposta raggiungibile da nessuna
 * pagina se non passando dal piede. Una faccia in basso a destra e' il
 * modo piu' corto per rispondere, e per un sito che vende lezioni di
 * lingua e' anche l'unica cosa che nessuno puo' generare al posto tuo.
 *
 * Sta a SINISTRA del pulsante verde e non sopra: sopra si sovrapporrebbe
 * al riquadro della proposta lingua, che compare anche lui in basso.
 *
 * Non compare sulla pagina autore: un pulsante che porta dove sei gia'
 * e' rumore.
 */
(function () {
  "use strict";

  /* dove porta, per lingua della pagina. Le lingue senza una pagina loro
     vanno all'inglese: meglio una pagina che si capisce di una in una
     lingua che il visitatore non ha scelto. */
  var DOVE = {
    tl: "/fil/alessio",
    it: "/it/alessio",
    en: "/en/alessio",
    /* non /lessen/over-alessio: il Worker toglie sempre la cartella
       interna con un 301, e un link che rimbalza e' un link sbagliato */
    nl: "/over-alessio",
    es: "/es/alessio",
    fr: "/fr/alessio",
    de: "/de/alessio",
    pt: "/pt/alessio",
    ro: "/ro/alessio",
    sq: "/sq/alessio",
    uk: "/uk/alessio",
    zh: "/zh/alessio",
    ar: "/ar/alessio",
    fil: "/fil/alessio",
    bn: "/bn/alessio",
    ti: "/ti/alessio"
  };

  var ETICHETTE = {
    it: "Chi sono",
    en: "About Alessio",
    nl: "Over Alessio",
    de: "\u00dcber Alessio",
    fr: "\u00c0 propos d\u2019Alessio",
    es: "Sobre Alessio",
    pt: "Sobre o Alessio",
    ro: "Despre Alessio",
    sq: "Rreth Alessio-s",
    uk: "\u041f\u0440\u043e \u0410\u043b\u0435\u0441\u0441\u0456\u043e",
    zh: "\u5173\u4e8e Alessio",
    ar: "\u0639\u0646 \u0623\u0644\u064a\u0633\u064a\u0648",
    fil: "Tungkol kay Alessio",
    tl: "Tungkol kay Alessio",
    bn: "\u0986\u09b2\u09c7\u09b8\u09b8\u09bf\u0993 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7",
    ti: "\u1265\u12db\u12d5\u1263 \u12a3\u1208\u1235\u12ee"
  };

  var FOTO = "/assets/alessio.png";

  var lang = (document.documentElement.lang || "en").toLowerCase();
  /* 142 */
  if (!DOVE[lang]) lang = lang.split("-")[0];
  if (!DOVE[lang] && lang === "tl") lang = "fil";
  if (!DOVE[lang] && lang === "fil") lang = "tl";
  /* la lingua di navigazione scelta dal visitatore vince, se ha la pagina */
  var salvata = "";
  try { salvata = localStorage.getItem("linguaNav") || ""; } catch (e) {}
  if (salvata && DOVE[salvata]) lang = salvata;
  var url = DOVE[lang] || DOVE.en;
  var testo = ETICHETTE[lang] || ETICHETTE.en;

  /* gia' qui: niente da fare */
  if (location.pathname.replace(/\.html$/, "").replace(/\/$/, "") ===
      url.replace(/\/$/, "")) return;

  var CSS =
    ".au-flt{position:fixed;right:86px;bottom:20px;z-index:9998;" +
    "width:56px;height:56px;border-radius:50%;overflow:hidden;" +
    "background:#F4F2EC;border:1px solid #E3DFD5;display:block;" +
    "box-shadow:0 6px 20px rgba(0,0,0,.16);" +
    "transition:transform .25s ease,bottom .35s ease;" +
    "-webkit-tap-highlight-color:transparent;}" +
    ".au-flt img{width:100%;height:100%;object-fit:cover;display:block;}" +
    ".au-flt:hover,.au-flt:focus-visible{transform:scale(1.08);}" +
    ".au-flt:focus-visible{outline:3px solid #1F2320;outline-offset:3px;}" +
    /* la barra della proposta lingua sale da sotto: si sposta anche lui,
       come fa il pulsante verde */
    "body.lingua-aperta .au-flt{bottom:86px;}" +
    "@media (max-width:420px){.au-flt{right:78px;width:48px;height:48px;}}" +
    "@media print{.au-flt{display:none!important;}}";

  var stile = document.createElement("style");
  stile.appendChild(document.createTextNode(CSS));
  document.head.appendChild(stile);

  var a = document.createElement("a");
  a.className = "au-flt";
  a.href = url;
  a.setAttribute("aria-label", testo);
  a.setAttribute("title", testo);

  var img = document.createElement("img");
  img.src = FOTO;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  /* se la foto non c'e', il pulsante sparisce invece di lasciare un
     quadrato vuoto in mezzo allo schermo */
  img.onerror = function () { a.remove(); };
  a.appendChild(img);

  document.body.appendChild(a);
})();
