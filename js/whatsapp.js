/* whatsapp.js — bottone WhatsApp galleggiante, su tutte le pagine.
 *
 * Autosufficiente: inietta il proprio CSS, non ha dipendenze,
 * non usa cookie, storage o richieste di rete.
 *
 * Il messaggio precompilato segue la lingua della pagina (<html lang>).
 * Su una pagina olandese lo studente apre WhatsApp e trova già scritto
 * un messaggio in olandese: è la differenza fra un contatto e un campo vuoto
 * che nessuno riempie.
 *
 * Si sposta in alto quando compare la barra lingua, per non sovrapporsi.
 */
(function () {
  "use strict";

  var NUMERO = "31626497253";          /* formato internazionale, senza + né zeri */

  var TESTI = {
    nl: { m: "Hoi Alessio! Ik wil graag meer weten over de Italiaanse lessen.",
          a: "Stuur een WhatsApp-bericht" },
    it: { m: "Ciao Alessio! Vorrei sapere di più sulle lezioni di italiano.",
          a: "Scrivi su WhatsApp" },
    en: { m: "Hi Alessio! I'd like to know more about your Italian lessons.",
          a: "Send a WhatsApp message" },
    de: { m: "Hallo Alessio! Ich würde gern mehr über den Italienischunterricht erfahren.",
          a: "Eine WhatsApp-Nachricht senden" },
    fr: { m: "Bonjour Alessio ! J'aimerais en savoir plus sur les cours d'italien.",
          a: "Envoyer un message WhatsApp" },
    es: { m: "¡Hola Alessio! Me gustaría saber más sobre las clases de italiano.",
          a: "Enviar un mensaje de WhatsApp" }
  };

  var CSS =
    '.wa-flt{position:fixed;right:20px;bottom:20px;z-index:9998;' +
    'width:56px;height:56px;border-radius:50%;background:#25D366;' +
    'display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 6px 20px rgba(0,0,0,.22);transition:transform .25s ease,bottom .35s ease;' +
    '-webkit-tap-highlight-color:transparent;}' +
    '.wa-flt:hover,.wa-flt:focus-visible{transform:scale(1.08);}' +
    '.wa-flt:focus-visible{outline:3px solid #31394d;outline-offset:3px;}' +
    '.wa-flt svg{width:30px;height:30px;fill:#fff;}' +
    '.wa-flt.wa-su{bottom:96px;}' +          /* quando c'è la barra lingua */
    '@media(max-width:560px){.wa-flt{right:14px;bottom:14px;width:52px;height:52px;}' +
    '.wa-flt.wa-su{bottom:104px;}}' +
    '@media print{.wa-flt{display:none;}}' +
    '@media(prefers-reduced-motion:reduce){.wa-flt{transition:none;}}';

  var ICONA =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96' +
    '-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47' +
    '-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5' +
    '.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37' +
    '-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63' +
    '.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z' +
    'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21' +
    'h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2m0 18c-1.53 0-3.03-.41-4.34-1.19l-.31-.18' +
    '-3.22.84.86-3.14-.2-.32a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41' +
    'a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23"/></svg>';

  function lingua() {
    var l = (document.documentElement.getAttribute("lang") || "nl").toLowerCase().split("-")[0];
    return TESTI[l] ? l : "en";
  }

  function monta() {
    if (document.querySelector(".wa-flt")) return;

    var s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);

    var t = TESTI[lingua()];
    var a = document.createElement("a");
    a.className = "wa-flt";
    a.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(t.m);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", t.a);
    a.title = t.a;
    a.innerHTML = ICONA;
    document.body.appendChild(a);

    /* La barra lingua è fissa in basso al centro: se compare, alzo il bottone. */
    var barra = document.querySelector(".barra-lingua");
    if (barra && window.MutationObserver) {
      var sposta = function () {
        a.classList.toggle("wa-su", barra.classList.contains("visibile"));
      };
      new MutationObserver(sposta).observe(barra, {
        attributes: true, attributeFilter: ["class"]
      });
      sposta();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", monta);
  } else {
    monta();
  }
})();
