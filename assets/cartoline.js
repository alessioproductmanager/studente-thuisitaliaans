/* cartoline.js — fa "smazzare" le cartoline. Senza JS restano impilate, ferme. */
(function () {
  var PAUSA = 5200, USCITA = 560;
  var ridotto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function avanza(mazzo) {
    var carte = mazzo.querySelectorAll('.cart');
    if (carte.length < 2 || mazzo.dataset.ferma === '1') return;
    var n = carte.length, davanti = null, i;
    for (i = 0; i < n; i++) if (carte[i].dataset.pos === '0') davanti = carte[i];
    if (!davanti) return;
    davanti.classList.add('esce');
    setTimeout(function () {
      for (i = 0; i < n; i++) {
        carte[i].dataset.pos = String((parseInt(carte[i].dataset.pos, 10) + n - 1) % n);
      }
      davanti.classList.remove('esce');
    }, USCITA);
  }

  function attiva(mazzo) {
    var timer = null;
    function via() { if (!timer) timer = setInterval(function () { avanza(mazzo); }, PAUSA); }
    function stop() { clearInterval(timer); timer = null; }

    mazzo.addEventListener('mouseenter', function () { mazzo.dataset.ferma = '1'; });
    mazzo.addEventListener('mouseleave', function () { mazzo.dataset.ferma = '0'; });
    mazzo.addEventListener('focusin', function () { mazzo.dataset.ferma = '1'; });
    mazzo.addEventListener('focusout', function () { mazzo.dataset.ferma = '0'; });
    mazzo.addEventListener('click', function () { avanza(mazzo); });
    mazzo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avanza(mazzo); }
    });

    if (ridotto) return;                       // niente rotazione automatica
    if (!('IntersectionObserver' in window)) { via(); return; }
    new IntersectionObserver(function (voci) {
      voci[0].isIntersecting ? via() : stop();
    }, { threshold: 0.25 }).observe(mazzo);
  }

  function inizio() {
    var mazzi = document.querySelectorAll('.cart-mazzo');
    for (var i = 0; i < mazzi.length; i++) attiva(mazzi[i]);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', inizio)
    : inizio();
})();

/* Schermate dell'app nella lingua del browser (se disponibile in assets/store). */
(function () {
  var CARTELLE = ["ar","bn","de","en","en_AU","en_CA","en_US","es","es_MX",
                  "fr","fr_CA","it","nl","pt","pt_BR","ro","uk","zh"];
  var BASE = "/assets/store";

  function cartella() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (!l) return null;
    var u = l.replace("-", "_");
    if (CARTELLE.indexOf(u) >= 0) return u;
    var b = u.split("_")[0];
    return CARTELLE.indexOf(b) >= 0 ? b : null;
  }

  function applica() {
    var c = cartella();
    if (!c) return;
    var el = document.querySelectorAll("picture[data-app]");
    for (var i = 0; i < el.length; i++) {
      var nome = el[i].getAttribute("data-app");
      var img = el[i].querySelector("img");
      var src = el[i].querySelector("source");
      if (!img || img.getAttribute("src").indexOf("/" + c + "/") >= 0) continue;
      if (src) src.srcset = BASE + "/" + c + "/" + nome + ".webp";
      img.setAttribute("src", BASE + "/" + c + "/" + nome + ".jpg");
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", applica)
    : applica();
})();
