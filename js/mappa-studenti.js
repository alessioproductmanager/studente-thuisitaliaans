/* mappa-studenti.js — fumetto dei pin, senza dipendenze */
(function () {
  var sez = document.querySelector('.mp-sezione');
  if (!sez) return;
  var box = sez.querySelector('.mp-tela');
  var tip = sez.querySelector('.mp-tip');
  var svg = box.querySelector('svg');
  var attivo = null;

  function mostra(pin) {
    var punto = pin.querySelector('.mp-punto');
    var r = punto.getBoundingClientRect();
    var b = box.getBoundingClientRect();
    tip.innerHTML = '<b>' + pin.dataset.bandiera + ' ' + pin.dataset.paese + '</b>' +
                    '<span>' + pin.dataset.studenti + '</span>';
    tip.hidden = false;
    tip.style.left = (r.left - b.left + r.width / 2) + 'px';
    tip.style.top = (r.top - b.top - 10) + 'px';
    if (attivo) attivo.classList.remove('is-attivo');
    attivo = pin;
    pin.classList.add('is-attivo');
  }

  function nascondi() {
    tip.hidden = true;
    if (attivo) { attivo.classList.remove('is-attivo'); attivo = null; }
  }

  svg.querySelectorAll('.mp-pin').forEach(function (pin) {
    pin.addEventListener('mouseenter', function () { mostra(pin); });
    pin.addEventListener('focus', function () { mostra(pin); });
    pin.addEventListener('blur', nascondi);
    pin.addEventListener('click', function (e) {
      e.stopPropagation();
      if (attivo === pin) { nascondi(); } else { mostra(pin); }
    });
    pin.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostra(pin); }
      if (e.key === 'Escape') nascondi();
    });
  });

  box.addEventListener('mouseleave', nascondi);
  sez.querySelector('.mp-mappa').addEventListener('scroll', nascondi);
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mp-pin')) nascondi();
  });
  window.addEventListener('resize', nascondi);
})();
