/* mappa-studenti.js
   Mappa zoomabile senza librerie.
   Tre accorgimenti per non andare a scatti:
     1. le misure della tela si leggono una volta sola (leggerle a ogni
        fotogramma obbliga il browser a ricalcolare il layout);
     2. si disegna al massimo una volta per fotogramma, via requestAnimationFrame;
     3. zoom e ritorno a casa sono interpolati, non saltano.
   I perni stanno fuori dal gruppo che si ingrandisce: si spostano con lo
   zoom ma non si deformano mai. */
(function () {
  var tela = document.querySelector('[data-mappa]');
  if (!tela) return;

  var svg     = tela.querySelector('.mp-svg');
  var vista   = tela.querySelector('.mp-vista');
  var tip     = tela.querySelector('.mp-tip');
  var cursore = tela.querySelector('[data-cursore]');
  var perni   = [].slice.call(tela.querySelectorAll('.mp-perno'));
  var io      = tela.querySelector('.mp-io');
  var LARG = 1000, ALT = 383, MAX = 12;
  /* Il fulcro dello zoom non e' il puntatore ma i Paesi Bassi: e' li' che sta
     la maggior parte degli studenti, quindi avvicinandosi si finisce sempre
     sull'Europa invece che dove capita il mouse. Se il punto e' uscito dallo
     schermo lo si riporta al bordo piu' vicino, cosi' non si scappa via. */
  var FUOCO_X = 0.50114, FUOCO_Y = 0.19254;
  var k = 1, tx = 0, ty = 0, kMin = 1, attivo = null;
  var W = 0, H = 0, inCoda = false, animazione = null;

  function rimisura() {
    W = tela.clientWidth; H = tela.clientHeight;
    kMin = W / LARG;
  }

  function programma() {
    if (inCoda) return;
    inCoda = true;
    requestAnimationFrame(function () { inCoda = false; disegna(); });
  }

  function fulcro() {
    var x = tx + FUOCO_X * LARG * k, y = ty + FUOCO_Y * ALT * k;
    return [Math.max(0, Math.min(W, x)), Math.max(0, Math.min(H, y))];
  }

  function limita() {
    var lw = LARG * k, lh = ALT * k;
    tx = lw <= W ? (W - lw) / 2 : Math.min(0, Math.max(W - lw, tx));
    ty = lh <= H ? (H - lh) / 2 : Math.min(0, Math.max(H - lh, ty));
  }

  /* I compagni di paese si aprono a ventaglio. Il raggio e' in pixel e cresce
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

  function collide(a, b) {
    return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
  }

  function disegna() {
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    vista.setAttribute('transform',
      'translate(' + tx.toFixed(1) + ',' + ty.toFixed(1) + ') scale(' + k.toFixed(4) + ')');

    var presi = [];

    /* Alessio si posiziona per primo: il suo nome prenota il posto e sono
       gli studenti intorno a cedere, non lui. */
    if (io) {
      var ix = tx + parseFloat(io.dataset.x) * LARG * k;
      var iy = ty + parseFloat(io.dataset.y) * ALT * k;
      io.setAttribute('transform', 'translate(' + ix.toFixed(1) + ',' + iy.toFixed(1) + ')');
      var iFuori = ix < -20 || ix > W + 20 || iy < -30 || iy > H + 30;
      io.style.display = iFuori ? 'none' : '';
      if (!iFuori) presi.push({ x1: ix - 28, x2: ix + 28, y1: iy + 2, y2: iy + 17 });
    }

    for (var i = 0; i < perni.length; i++) {
      var p = perni[i], v = ventaglio(p);
      var x = tx + parseFloat(p.dataset.x) * LARG * k + v[0];
      var y = ty + parseFloat(p.dataset.y) * ALT * k + v[1];
      p.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');

      var fuori = x < -20 || x > W + 20 || y < -10 || y > H + 30;
      p.style.display = fuori ? 'none' : '';
      if (fuori) continue;

      var testo = p.querySelector('.mp-nome').textContent;
      var lar = testo.length * 6.1 + 10;
      var box = { x1: x - lar / 2, x2: x + lar / 2, y1: y + 2, y2: y + 16 };
      var libero = true;
      for (var j = 0; j < presi.length; j++) {
        if (collide(box, presi[j])) { libero = false; break; }
      }
      p.classList.toggle('is-muto', !libero);
      if (libero) presi.push(box);
    }
    if (cursore && document.activeElement !== cursore) {
      cursore.value = Math.log(k / kMin) / Math.log(MAX) * 100;
    }
  }

  function porta(nuovo, cx, cy) {
    if (cx === undefined) { cx = W / 2; cy = H / 2; }
    nuovo = Math.min(kMin * MAX, Math.max(kMin, nuovo));
    tx = cx - (cx - tx) * (nuovo / k);
    ty = cy - (cy - ty) * (nuovo / k);
    k = nuovo;
    limita(); programma();
  }

  function anima(meta, cx, cy) {
    cancelAnimationFrame(animazione);
    var da = k, t0 = performance.now();
    (function passo(ora) {
      var q = Math.min(1, (ora - t0) / 280);
      var e = 1 - Math.pow(1 - q, 3);
      porta(da + (meta - da) * e, cx, cy);
      if (q < 1) animazione = requestAnimationFrame(passo);
    })(t0);
  }

  function mostra(p) {
    var r = p.getBoundingClientRect(), b = tela.getBoundingClientRect();
    var parti = p.getAttribute('aria-label').split(' — ');
    tip.innerHTML = '<b>' + parti[0] + '</b><span>' +
                    (p.dataset.bandiera ? p.dataset.bandiera + ' ' : '') + parti[1] + '</span>';
    tip.hidden = false;
    tip.style.left = (r.left - b.left + r.width / 2) + 'px';
    tip.style.top = (r.top - b.top - 4) + 'px';
    if (attivo) attivo.classList.remove('is-attivo');
    attivo = p; p.classList.add('is-attivo');
  }
  function nascondi() {
    tip.hidden = true;
    if (attivo) { attivo.classList.remove('is-attivo'); attivo = null; }
  }

  (io ? perni.concat([io]) : perni).forEach(function (p) {
    p.addEventListener('mouseenter', function () { mostra(p); });
    p.addEventListener('focus', function () { mostra(p); });
    p.addEventListener('blur', nascondi);
    p.addEventListener('click', function (e) {
      e.stopPropagation();
      attivo === p ? nascondi() : mostra(p);
    });
  });

  if (cursore) {
    cursore.addEventListener('input', function () {
      cancelAnimationFrame(animazione);
      var f = fulcro();
      porta(kMin * Math.pow(MAX, cursore.value / 100), f[0], f[1]);
      nascondi();
    });
  }
  tela.querySelector('[data-reset]').addEventListener('click', function () {
    nascondi();
    var da = k, t0 = performance.now(), tx0 = tx, ty0 = ty;
    cancelAnimationFrame(animazione);
    (function passo(ora) {
      var q = Math.min(1, (ora - t0) / 320), e = 1 - Math.pow(1 - q, 3);
      k = da + (kMin - da) * e;
      tx = tx0 * (1 - e); ty = ty0 * (1 - e);
      limita(); programma();
      if (q < 1) animazione = requestAnimationFrame(passo);
    })(t0);
  });

  /* trascinamento e pizzico */
  var giu = false, px = 0, py = 0, dita = {}, distIniziale = 0, kIniziale = 1;
  tela.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.mp-comandi')) return;
    dita[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (Object.keys(dita).length > 1) return;
    giu = true; px = e.clientX; py = e.clientY;
    tela.setPointerCapture(e.pointerId);
    tela.classList.add('is-trascina');
  });
  tela.addEventListener('pointermove', function (e) {
    if (!dita[e.pointerId]) return;
    dita[e.pointerId] = { x: e.clientX, y: e.clientY };
    var id = Object.keys(dita);
    if (id.length === 2) {
      var a = dita[id[0]], b = dita[id[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (!distIniziale) { distIniziale = d; kIniziale = k; return; }
      var r = tela.getBoundingClientRect();
      porta(kIniziale * d / distIniziale,
            (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      return;
    }
    if (!giu) return;
    tx += e.clientX - px; ty += e.clientY - py;
    px = e.clientX; py = e.clientY;
    limita(); programma(); nascondi();
  });
  function su(e) {
    delete dita[e.pointerId];
    if (Object.keys(dita).length < 2) distIniziale = 0;
    giu = false; tela.classList.remove('is-trascina');
  }
  tela.addEventListener('pointerup', su);
  tela.addEventListener('pointercancel', su);

  /* rotella: fattore continuo, cosi' non salta di gradino in gradino */
  tela.addEventListener('wheel', function (e) {
    e.preventDefault();
    cancelAnimationFrame(animazione);
    var fatt = Math.exp(-Math.max(-90, Math.min(90, e.deltaY)) * 0.0022);
    var f = fulcro();
    porta(k * fatt, f[0], f[1]);
    nascondi();
  }, { passive: false });

  tela.addEventListener('dblclick', function () {
    var f = fulcro();
    anima(k * 1.9, f[0], f[1]);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mp-perno')) nascondi();
  });

  function avvia() {
    rimisura();
    k = kMin;
    if (W / H < 1.6) k = kMin * 1.5;   /* schermo stretto: si parte piu' vicini */
    limita(); disegna();
  }
  window.addEventListener('resize', function () { rimisura(); limita(); programma(); });
  avvia();
})();
