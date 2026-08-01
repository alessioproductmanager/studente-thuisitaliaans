/* mappe.js — disegna le mappe con Leaflet leggendo la configurazione JSON. */
(function () {
  var SEGNO_SCUOLA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M3 8.5 12 4l9 4.5-9 4.5z"/><path d="M7 11v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5"/></svg>';
  var SEGNO_AEREO = '<svg viewBox="0 0 24 24" fill="currentColor">' +
    '<path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  var SEGNO_LUOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 3.5l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z"/></svg>';

  function icona(tipo) {
    var d = tipo === "s" ? 26 : 24;
    var cl = tipo === "s" ? "pin" : (tipo === "a" ? "pin-aereo" : "pin-luogo");
    var segno = tipo === "s" ? SEGNO_SCUOLA : (tipo === "a" ? SEGNO_AEREO : SEGNO_LUOGO);
    return L.divIcon({
      className: "",
      html: '<div class="' + cl + '" style="width:' + d + 'px;height:' + d + 'px">' + segno + '</div>',
      iconSize: [d, d], iconAnchor: [d / 2, d / 2]
    });
  }

  function disegna(dati) {
    var el = document.getElementById(dati.id);
    if (!el || typeof L === "undefined") return;

    var mappa = L.map(el, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mappa);

    var coord = [];
    for (var i = 0; i < dati.punti.length; i++) {
      var p = dati.punti[i];
      var m = L.marker(p.c, { icon: icona(p.t), keyboard: p.t === "s", title: p.n }).addTo(mappa);
      // un aeroporto lontano allargherebbe troppo l'inquadratura
      if (p.t !== "a" || p.vicino) coord.push(p.c);

      if (p.t === "s" && p.u) {
        if (dati.hover) {                     // solo nelle pagine città
          m.bindTooltip('<b>' + p.n + '</b>' + (dati.apri ? '<i>' + dati.apri + '</i>' : ""), {
            direction: "auto", offset: [0, -6], opacity: 1, className: "tip-scuola"
          });
        }
        m.on("click", function (u) {
          return function () { window.location.href = u; };
        }(p.u));
      } else if (p.t === "l" && dati.hover) {
        m.bindTooltip('<b>' + p.n + '</b>' + (p.d ? p.d : ""), {
          direction: "auto", offset: [0, -6], opacity: 1, sticky: false
        });
      } else if (p.t === "a") {
        m.bindPopup('<b>' + p.n + '</b>' +
          (p.km != null ? '<span class="pop-perche">' + p.km + ' km</span>' : ""));
      } else if (p.t === "l") {
        // nelle schede scuola niente fumetto al passaggio, ma il clic
        // deve comunque dare il perché del luogo
        m.bindPopup('<b>' + p.n + '</b>' + (p.d ? '<span class="pop-perche">' + p.d + '</span>' : ""));
      }
    }

    if (coord.length > 1) {
      mappa.fitBounds(L.latLngBounds(coord).pad(0.34));
      if (mappa.getZoom() > 16) mappa.setZoom(16);
    } else {
      mappa.setView(coord[0] || dati.centro, 15);
    }
    mappa.on("focus", function () { mappa.scrollWheelZoom.enable(); });
    mappa.on("blur", function () { mappa.scrollWheelZoom.disable(); });
  }

  function avvia() {
    var conf = document.querySelectorAll('script[data-mappa]');
    for (var i = 0; i < conf.length; i++) {
      try {
        var d = JSON.parse(conf[i].textContent);
        d.id = conf[i].getAttribute("data-mappa");
        disegna(d);
      } catch (e) { /* configurazione illeggibile: la mappa resta vuota */ }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
