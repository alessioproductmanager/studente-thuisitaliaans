/* mappa-studenti.js
   Mappa zoomabile senza librerie.
   I perni stanno FUORI dal gruppo che si ingrandisce: si spostano
   con lo zoom ma non si deformano mai. Le etichette che si
   sovrappongono spariscono, e ricompaiono man mano che si zooma. */
(function () {
  var tela = document.querySelector('[data-mappa]');
  if (!tela) return;

  var svg    = tela.querySelector('.mp-svg');
  var vista  = tela.querySelector('.mp-vista');
  var tip    = tela.querySelector('.mp-tip');
  var perni  = [].slice.call(tela.querySelectorAll('.mp-perno'));
  var LARG = 1000, ALT = 383;          // proporzioni del disegno del mondo
  var k = 1, tx = 0, ty = 0, kMin = 1, attivo = null;

  function misura() { return { w: tela.clientWidth, h: tela.clientHeight }; }

  function limita() {
    var m = misura(), lw = LARG * k, lh = ALT * k;
    tx = lw <= m.w ? (m.w - lw) / 2 : Math.min(0, Math.max(m.w - lw, tx));
    ty = lh <= m.h ? (m.h - lh) / 2 : Math.min(0, Math.max(m.h - lh, ty));
  }

  function collide(a, b) {
    return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
  }

  /* I compagni di paese si aprono a ventaglio. Il raggio e' in PIXEL e cresce
     con lo zoom fino a un massimo: a mappamondo restano un grappolo sul paese
     giusto, da vicino si separano abbastanza da leggere ogni nome. */
  function ventaglio(p) {
    var n = +p.dataset.n;
    if (n < 2) return [0, 0];
    var i = +p.dataset.i;
    var dentro = n > 6 ? Math.floor(n / 3) : 0;
    var anello, quanti, idx;
    if (i < dentro) { anello = 0.45; quanti = dentro; idx = i; }
    else { anello = 1; quanti = n - dentro; idx = i - dentro; }
    var t = Math.min(1, Math.max(0, (k / kMin - 1) / 5));
    var R = (3 + 1.1 * n + (23 + 4.1 * n) * t) * anello;
    var a = 2 * Math.PI * idx / quanti - Math.PI / 2;
    return [R * Math.cos(a), R * Math.sin(a)];
  }

  function disegna() {
    var m = misura();
    svg.setAttribute('viewBox', '0 0 ' + m.w + ' ' + m.h);
    vista.setAttribute('transform',
      'translate(' + tx.toFixed(1) + ',' + ty.toFixed(1) + ') scale(' + k.toFixed(4) + ')');

    var presi = [];
    perni.forEach(function (p) {
      var v = ventaglio(p);
      var x = tx + parseFloat(p.dataset.x) * LARG * k + v[0];
      var y = ty + parseFloat(p.dataset.y) * ALT * k + v[1];
      p.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');

      var fuori = x < -20 || x > m.w + 20 || y < -10 || y > m.h + 30;
      p.style.display = fuori ? 'none' : '';
      if (fuori) return;

      // l'etichetta si mostra solo se trova posto
      var t = p.querySelector('.mp-nome');
      var lar = t.textContent.length * 6.1 + 8;
      var box = { x1: x - lar / 2, x2: x + lar / 2, y1: y + 2, y2: y + 16 };
      var libero = presi.every(function (b) { return !collide(box, b); });
      p.classList.toggle('is-muto', !libero);
      if (libero) presi.push(box);
    });
  }

  function zoomA(nuovo, cx, cy) {
    var m = misura();
    if (cx === undefined) { cx = m.w / 2; cy = m.h / 2; }
    nuovo = Math.min(kMin * 12, Math.max(kMin, nuovo));
    tx = cx - (cx - tx) * (nuovo / k);
    ty = cy - (cy - ty) * (nuovo / k);
    k = nuovo;
    limita(); disegna(); nascondi();
  }

  function mostra(p) {
    var r = p.getBoundingClientRect(), b = tela.getBoundingClientRect();
    tip.innerHTML = '<b>' + p.getAttribute('aria-label').split(' — ')[0] + '</b>' +
                    '<span>' + p.getAttribute('aria-label').split(' — ')[1] + '</span>';
    tip.hidden = false;
    tip.style.left = (r.left - b.left + r.width / 2) + 'px';
    tip.style.top  = (r.top - b.top - 4) + 'px';
    if (attivo) attivo.classList.remove('is-attivo');
    attivo = p; p.classList.add('is-attivo');
  }
  function nascondi() {
    tip.hidden = true;
    if (attivo) { attivo.classList.remove('is-attivo'); attivo = null; }
  }

  perni.forEach(function (p) {
    p.addEventListener('mouseenter', function () { mostra(p); });
    p.addEventListener('focus', function () { mostra(p); });
    p.addEventListener('blur', nascondi);
    p.addEventListener('click', function (e) {
      e.stopPropagation();
      attivo === p ? nascondi() : mostra(p);
    });
  });

  tela.querySelectorAll('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      zoomA(k * (b.dataset.zoom === '1' ? 1.6 : 1 / 1.6));
    });
  });
  tela.querySelector('[data-reset]').addEventListener('click', function () {
    k = kMin; tx = 0; ty = 0; limita(); disegna(); nascondi();
  });

  // trascinamento (mouse e dito) + pizzico
  var giu = false, px = 0, py = 0, mosso = false, dita = {};
  tela.addEventListener('pointerdown', function (e) {
    dita[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (Object.keys(dita).length > 1) return;
    giu = true; mosso = false; px = e.clientX; py = e.clientY;
    tela.setPointerCapture(e.pointerId);
    tela.classList.add('is-trascina');
  });
  var distIniziale = 0, kIniziale = 1;
  tela.addEventListener('pointermove', function (e) {
    if (!dita[e.pointerId]) return;
    dita[e.pointerId] = { x: e.clientX, y: e.clientY };
    var id = Object.keys(dita);
    if (id.length === 2) {
      var a = dita[id[0]], b = dita[id[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (!distIniziale) { distIniziale = d; kIniziale = k; return; }
      var r = tela.getBoundingClientRect();
      zoomA(kIniziale * d / distIniziale,
            (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      return;
    }
    if (!giu) return;
    tx += e.clientX - px; ty += e.clientY - py;
    px = e.clientX; py = e.clientY; mosso = true;
    limita(); disegna(); nascondi();
  });
  function su(e) {
    delete dita[e.pointerId];
    if (Object.keys(dita).length < 2) distIniziale = 0;
    giu = false; tela.classList.remove('is-trascina');
  }
  tela.addEventListener('pointerup', su);
  tela.addEventListener('pointercancel', su);

  tela.addEventListener('wheel', function (e) {
    e.preventDefault();
    var r = tela.getBoundingClientRect();
    zoomA(k * (e.deltaY < 0 ? 1.14 : 1 / 1.14), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  tela.addEventListener('dblclick', function (e) {
    var r = tela.getBoundingClientRect();
    zoomA(k * 1.8, e.clientX - r.left, e.clientY - r.top);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mp-perno')) nascondi();
  });

  function avvia() {
    var m = misura();
    kMin = m.w / LARG;
    if (k < kMin || Math.abs(k - kMin) < 0.001) k = kMin;
    // su schermo stretto la mappa e' alta: si parte un po' piu' vicini
    if (m.w / m.h < 1.6) k = Math.max(k, kMin * 1.5);
    limita(); disegna();
  }
  window.addEventListener('resize', function () { kMin = misura().w / LARG; limita(); disegna(); });
  avvia();
})();
