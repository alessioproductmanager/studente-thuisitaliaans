/* game-mode.js — barra "modalità gioco" per le pagine esercizio.
 *
 * Ricostruito dal contratto d'uso: le 693 pagine chiamano soltanto
 *
 *     GameMode.init({ timerSeconds: 120, revealSolutions: function(){ ... } });
 *
 * e alcune poi nascondono singoli pezzi via #gmBar / #gmTimerDisplay.
 * Il markup non è nell'HTML: lo crea questo script, con le classi che
 * esistono già in css/esercizi.css (.game-mode-bar, .game-mode-toggle,
 * .game-timer-display, .solution-btn, .confirm-overlay, .confirm-box,
 * .confirm-box-actions).
 *
 * Nessuna dipendenza, nessun cookie, nessuna richiesta di rete.
 */
(function (window, document) {
  "use strict";

  var TESTI = {
    modalita: "Modalità gioco",
    soluzioni: "Mostra soluzioni",
    conferma: "Vuoi davvero vedere le soluzioni?",
    dettaglio: "L'esercizio verrà completato e non potrai più provare da solo.",
    si: "Sì, mostra",
    no: "Annulla",
    tempoScaduto: "Tempo scaduto"
  };

  var stato = {
    avviato: false,
    restanti: 0,
    totali: 0,
    intervallo: null,
    rivelate: false,
    opzioni: null
  };

  var el = {};

  /* ------------------------------------------------------------------ */

  function mmss(s) {
    if (s < 0) s = 0;
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function crea(tag, classe, testo) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (testo != null) n.textContent = testo;
    return n;
  }

  /* --------------------------------------------------------- COSTRUZIONE */

  function costruisciBarra(conTimer) {
    var bar = crea("div", "game-mode-bar");
    bar.id = "gmBar";

    /* interruttore */
    var label = crea("label", "game-mode-toggle");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = "gmToggle";
    input.setAttribute("aria-label", TESTI.modalita);
    label.appendChild(input);
    label.appendChild(crea("span", null, TESTI.modalita));
    bar.appendChild(label);

    /* timer */
    var timer = crea("span", "game-timer-display", conTimer ? mmss(stato.totali) : "");
    timer.id = "gmTimerDisplay";
    timer.setAttribute("role", "timer");
    timer.setAttribute("aria-live", "off");
    bar.appendChild(timer);

    /* bottone soluzioni */
    var btn = crea("button", "solution-btn", TESTI.soluzioni);
    btn.type = "button";
    btn.id = "gmSolutionBtn";
    bar.appendChild(btn);

    el.bar = bar;
    el.toggle = input;
    el.timer = timer;
    el.btn = btn;
    return bar;
  }

  function costruisciModale() {
    var ov = crea("div", "confirm-overlay");
    ov.id = "gmConfirm";
    var box = crea("div", "confirm-box");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");

    var h = crea("p", null, TESTI.conferma);
    h.style.fontWeight = "700";
    h.style.marginBottom = "6px";
    box.appendChild(h);
    box.appendChild(crea("p", null, TESTI.dettaglio));

    var azioni = crea("div", "confirm-box-actions");
    azioni.style.marginTop = "20px";

    var ok = crea("button", "solution-btn", TESTI.si);
    ok.type = "button";
    var no = crea("button", "solution-btn", TESTI.no);
    no.type = "button";

    azioni.appendChild(no);
    azioni.appendChild(ok);
    box.appendChild(azioni);
    ov.appendChild(box);

    el.overlay = ov;
    el.ok = ok;
    el.no = no;
    return ov;
  }

  function inserisci(bar) {
    /* La barra sta sopra il pannello dell'esercizio: .ex-panel è il
       contenitore usato da tutte le pagine. Se manca, si ripiega su
       <main class="ex-page"> e poi sul body. */
    var panel = document.querySelector(".ex-panel");
    if (panel && panel.parentNode) {
      panel.parentNode.insertBefore(bar, panel);
      return;
    }
    var main = document.querySelector("main.ex-page") || document.querySelector("main");
    if (main) {
      main.insertBefore(bar, main.firstChild);
      return;
    }
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* -------------------------------------------------------------- TIMER */

  function aggiornaTimer() {
    el.timer.textContent = mmss(stato.restanti);
    if (stato.totali > 0 && stato.restanti <= Math.max(10, stato.totali * 0.15)) {
      el.timer.classList.add("urgent");
    } else {
      el.timer.classList.remove("urgent");
    }
  }

  function fermaTimer() {
    if (stato.intervallo) {
      clearInterval(stato.intervallo);
      stato.intervallo = null;
    }
  }

  function avviaTimer() {
    if (stato.totali <= 0) return;
    fermaTimer();
    stato.restanti = stato.totali;
    aggiornaTimer();
    el.timer.classList.add("active");
    el.timer.setAttribute("aria-live", "polite");

    stato.intervallo = setInterval(function () {
      stato.restanti--;
      aggiornaTimer();
      if (stato.restanti <= 0) {
        fermaTimer();
        el.timer.textContent = TESTI.tempoScaduto;
        el.timer.classList.add("urgent");
        rivela(true);
      }
    }, 1000);
  }

  function annullaTimer() {
    fermaTimer();
    el.timer.classList.remove("active", "urgent");
    el.timer.setAttribute("aria-live", "off");
    el.timer.textContent = stato.totali > 0 ? mmss(stato.totali) : "";
  }

  /* ---------------------------------------------------------- SOLUZIONI */

  function rivela(automatico) {
    if (stato.rivelate) return;
    stato.rivelate = true;
    fermaTimer();
    chiudiModale();

    if (typeof stato.opzioni.revealSolutions === "function") {
      try {
        stato.opzioni.revealSolutions();
      } catch (e) {
        /* una pagina con markup diverso non deve bloccare il resto */
        if (window.console && console.warn) console.warn("revealSolutions:", e);
      }
    }

    el.btn.disabled = true;
    el.btn.style.opacity = ".5";
    el.btn.style.cursor = "default";
    if (!automatico) el.timer.classList.remove("active");
  }

  function apriModale() {
    el.overlay.style.display = "flex";
    el.no.focus();
    document.addEventListener("keydown", tastoModale);
  }

  function chiudiModale() {
    el.overlay.style.display = "none";
    document.removeEventListener("keydown", tastoModale);
  }

  function tastoModale(e) {
    if (e.key === "Escape") chiudiModale();
  }

  /* ----------------------------------------------------------- PUBBLICO */

  var GameMode = {
    init: function (opzioni) {
      opzioni = opzioni || {};
      stato.opzioni = opzioni;
      stato.totali = parseInt(opzioni.timerSeconds, 10) || 0;
      stato.restanti = stato.totali;
      stato.rivelate = false;

      function monta() {
        if (document.getElementById("gmBar")) return;

        inserisci(costruisciBarra(stato.totali > 0));
        document.body.appendChild(costruisciModale());

        /* Senza timer l'interruttore non ha niente da accendere:
           lo si nasconde, come già fanno a mano 43 pagine. */
        if (stato.totali <= 0) {
          el.toggle.parentNode.style.display = "none";
          el.timer.style.display = "none";
        }

        el.toggle.addEventListener("change", function () {
          if (this.checked) avviaTimer();
          else annullaTimer();
        });

        el.btn.addEventListener("click", function () {
          if (stato.rivelate) return;
          apriModale();
        });

        el.ok.addEventListener("click", function () { rivela(false); });
        el.no.addEventListener("click", chiudiModale);
        el.overlay.addEventListener("click", function (e) {
          if (e.target === el.overlay) chiudiModale();
        });
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", monta);
      } else {
        monta();
      }
    },

    /* utili se una pagina vuole pilotarlo da sé */
    start: avviaTimer,
    stop: annullaTimer,
    reveal: function () { rivela(false); }
  };

  window.GameMode = GameMode;
})(window, document);
