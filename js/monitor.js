/* monitor.js — lo screenshot dentro il monitor scorre da solo.
   Scende, arriva in fondo, risale. Se l'utente scorre a mano l'automatico si
   ferma e riprende dopo 5 secondi, dal punto dove e' rimasto.
   Gira solo quando il monitor e' visibile: fermo, non consuma batteria. */
(function () {
  var PAUSA = 5000;                  // quanto aspetta dopo che tocchi
  var SECONDI = 30, SECONDI_MOBILE = 40;   // per l'intera altezza

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".monitor-schermo .live-wrap").forEach(function (box) {
    if (!box.querySelector("img.live-shot")) return;

    var giu = true, fermo = 0, visibile = false, mio = false, ultimo = 0;

    function passo(ora) {
      var corsa = box.scrollHeight - box.clientHeight;
      if (corsa < 20 || !visibile || ora < fermo) { ultimo = ora; return; }
      var dt = ultimo ? Math.min(ora - ultimo, 100) : 16;
      ultimo = ora;
      var sec = (window.innerWidth <= 820 ? SECONDI_MOBILE : SECONDI);
      var d = corsa / (sec * 1000) * dt;
      mio = true;
      box.scrollTop += giu ? d : -d;
      mio = false;
      if (box.scrollTop >= corsa - 1) giu = false;
      else if (box.scrollTop <= 1) giu = true;
    }

    function tocca() { fermo = performance.now() + PAUSA; }
    ["wheel", "touchstart", "pointerdown", "keydown"].forEach(function (e) {
      box.addEventListener(e, tocca, { passive: true });
    });
    box.addEventListener("scroll", function () { if (!mio) tocca(); }, { passive: true });

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (v) { visibile = v[0].isIntersecting; },
        { threshold: 0.15 }).observe(box);
    } else { visibile = true; }

    (function giro(t) { passo(t || 0); requestAnimationFrame(giro); })();
  });
})();
