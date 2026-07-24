/* nav.js — menu mobile + tendine.
 * Prima questo codice viveva inline in fondo a index.html: le pagine
 * generate (tariffe, servizi, /en/, /it/) non ce l'avevano, quindi li'
 * hamburger e tendine erano morti.
 * Inoltre usava querySelector (singolare) e gestiva UNA sola tendina:
 * da quando il menu ne ha due (Zelf leren + Taal), la seconda non si
 * apriva nemmeno in home.
 */
(function () {
  // ---- menu mobile ----
  var apri = document.getElementById('navApri');
  var nav = document.getElementById('navPrincipale');
  if (apri && nav) {
    apri.addEventListener('click', function () {
      var aperto = nav.classList.toggle('aperto');
      apri.setAttribute('aria-expanded', aperto ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('aperto');
        apri.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- tendine: TUTTE, non solo la prima ----
  var gruppi = Array.prototype.slice.call(document.querySelectorAll('.con-sotto'));
  if (!gruppi.length) return;

  function chiudiTutte(tranne) {
    gruppi.forEach(function (g) {
      if (g === tranne) return;
      g.classList.remove('aperto');
      var b = g.querySelector('.sotto-apri');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  gruppi.forEach(function (g) {
    var bottone = g.querySelector('.sotto-apri');
    if (!bottone) return;
    bottone.addEventListener('click', function (e) {
      if (window.matchMedia('(min-width:901px)').matches) {
        chiudiTutte(g);
        var aperto = g.classList.toggle('aperto');
        bottone.setAttribute('aria-expanded', aperto ? 'true' : 'false');
        e.stopPropagation();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.con-sotto')) chiudiTutte(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chiudiTutte(null);
  });
})();
