/* recensioni.js — riempie il pannello delle recensioni leggendo
   /scuole/recensioni.json. Se per quella scuola non ci sono dati,
   il pannello resta nascosto e la pagina non cambia.

   Le recensioni sono di Google e vengono mostrate come arrivano:
   nessun filtro, nessuna selezione, con nome e foto dell'autore e
   l'attribuzione richiesta dai termini di Google. */
(function () {
  var DATI = "/scuole/recensioni.json";

  var T = {
    it: { conta: "su {n} recensioni Google", tutte: "Leggi tutte le recensioni su Google \u2192",
          fonte: "Recensioni da Google, aggiornate il {d}.", titolo: "Cosa dicono gli studenti" },
    en: { conta: "from {n} Google reviews", tutte: "Read all the reviews on Google \u2192",
          fonte: "Reviews from Google, updated on {d}.", titolo: "What students say" },
    nl: { conta: "uit {n} Google-recensies", tutte: "Lees alle recensies op Google \u2192",
          fonte: "Recensies van Google, bijgewerkt op {d}.", titolo: "Wat studenten zeggen" },
    de: { conta: "aus {n} Google-Bewertungen", tutte: "Alle Bewertungen auf Google lesen \u2192",
          fonte: "Bewertungen von Google, Stand {d}.", titolo: "Was Studierende sagen" },
    fr: { conta: "sur {n} avis Google", tutte: "Lire tous les avis sur Google \u2192",
          fonte: "Avis de Google, mis \u00e0 jour le {d}.", titolo: "Ce que disent les \u00e9tudiants" },
    es: { conta: "de {n} rese\u00f1as de Google", tutte: "Leer todas las rese\u00f1as en Google \u2192",
          fonte: "Rese\u00f1as de Google, actualizadas el {d}.", titolo: "Lo que dicen los estudiantes" },
    pl: { conta: "z {n} opinii Google", tutte: "Przeczytaj wszystkie opinie w Google \u2192",
          fonte: "Opinie z Google, zaktualizowane {d}.", titolo: "Co m\u00f3wi\u0105 studenci" }
  };

  function lingua() {
    var l = (document.documentElement.lang || "it").slice(0, 2).toLowerCase();
    return T[l] ? l : "it";
  }

  function idScuola() {
    var p = location.pathname.split("/").pop() || "";
    return p.replace(/\.html$/, "");
  }

  function stelle(voto) {
    var pieno = Math.round(voto);
    var s = "";
    for (var i = 1; i <= 5; i++) s += (i <= pieno ? "\u2605" : "\u2606");
    return s;
  }

  function testo(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : s;
    return d.innerHTML;
  }

  function data(iso, lg) {
    if (!iso) return "";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return lg === "en" ? p[2] + "/" + p[1] + "/" + p[0] : p[2] + "-" + p[1] + "-" + p[0];
  }

  function disegna(pannello, d, lg) {
    var L = T[lg];
    if (!d || d.voto == null) return;              // niente dati: resta nascosto

    var html = '<h2>' + testo(L.titolo) + '</h2>' +
      '<div class="rec-testa">' +
        '<span class="rec-voto">' + String(d.voto).replace(".", lg === "en" ? "." : ",") + '</span>' +
        '<span class="rec-stelle" aria-hidden="true">' + stelle(d.voto) + '</span>' +
        '<span class="rec-conta">' + testo(L.conta.replace("{n}", d.conta || 0)) + '</span>' +
      '</div>';

    var rec = d.recensioni || [];
    if (rec.length) {
      html += '<div class="rec-lista">';
      for (var i = 0; i < rec.length; i++) {
        var r = rec[i];
        var foto = r.foto
          ? '<img class="rec-foto" src="' + testo(r.foto) + '" alt="" width="34" height="34" ' +
            'loading="lazy" decoding="async" referrerpolicy="no-referrer">'
          : '<span class="rec-foto" aria-hidden="true"></span>';
        var autore = r.profilo
          ? '<a class="rec-autore" href="' + testo(r.profilo) + '" rel="nofollow noopener" ' +
            'target="_blank">' + testo(r.autore) + '</a>'
          : '<span class="rec-autore">' + testo(r.autore) + '</span>';
        html += '<div class="rec-uno">' + foto + '<div class="rec-corpo">' + autore +
          '<span class="rec-meta">' + stelle(r.voto) + ' \u00b7 ' + testo(r.quando) + '</span>' +
          '<span class="rec-testo">' + testo(r.testo) + '</span></div></div>';
      }
      html += '</div>';
    }

    if (d.mappa) {
      html += '<a class="rec-tutte" href="' + testo(d.mappa) + '" rel="nofollow noopener" ' +
              'target="_blank">' + testo(L.tutte) + '</a>';
    }
    html += '<span class="rec-fonte">' + testo(L.fonte.replace("{d}", data(d.aggiornato, lg))) + '</span>';

    pannello.innerHTML = html;
    pannello.removeAttribute("hidden");
  }

  function avvia() {
    var pannello = document.querySelector(".pannello.recensioni");
    if (!pannello) return;
    var id = idScuola();
    if (!id) return;

    fetch(DATI, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (tutte) {
        if (tutte && tutte[id]) disegna(pannello, tutte[id], lingua());
      })
      .catch(function () { /* niente rete: il pannello resta nascosto */ });
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", avvia)
    : avvia();
})();
