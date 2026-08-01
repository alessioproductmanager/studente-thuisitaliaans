/* recensioni.js — riempie il pannello delle recensioni leggendo
   /scuole/recensioni.json. Se per quella scuola non ci sono dati,
   il pannello resta nascosto e la pagina non cambia.

   Le recensioni sono di Google e vengono mostrate come arrivano:
   nessun filtro, nessuna selezione, con nome e foto dell'autore e
   l'attribuzione richiesta dai termini di Google. */
(function () {
  var DATI = "/scuole/recensioni.json";

  var T = {
    it: { conta: "su {n} recensioni Google", fonte: "Recensioni da Google, aggiornate al {d}.",
          titolo: "Cosa dicono gli studenti" },
    en: { conta: "from {n} Google reviews", fonte: "Reviews from Google, updated in {d}.",
          titolo: "What students say" },
    nl: { conta: "uit {n} Google-recensies", fonte: "Recensies van Google, bijgewerkt in {d}.",
          titolo: "Wat studenten zeggen" },
    de: { conta: "aus {n} Google-Bewertungen", fonte: "Bewertungen von Google, Stand {d}.",
          titolo: "Was Studierende sagen" },
    fr: { conta: "sur {n} avis Google", fonte: "Avis de Google, mis \u00e0 jour en {d}.",
          titolo: "Ce que disent les \u00e9tudiants" },
    es: { conta: "de {n} rese\u00f1as de Google", fonte: "Rese\u00f1as de Google, actualizadas en {d}.",
          titolo: "Lo que dicen los estudiantes" },
    pl: { conta: "z {n} opinii Google", fonte: "Opinie z Google, zaktualizowane w {d} r.",
          titolo: "Co m\u00f3wi\u0105 studenci" }
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

  function anno(iso) {
    return iso ? String(iso).slice(0, 4) : "";
  }

  function testo(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : s;
    return d.innerHTML;
  }

  function disegna(pannello, d, lg) {
    var L = T[lg];
    if (!d || d.voto == null) return;              // niente dati: resta nascosto

    var html = '<h2>' + testo(L.titolo) + '</h2>' +
      '<div class="rec-testa">' +
        '<span class="rec-voto">' + Number(d.voto).toFixed(1).replace(".", lg === "en" ? "." : ",") + '</span>' +
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
        var autore = '<span class="rec-autore">' + testo(r.autore) + '</span>';
        html += '<div class="rec-uno">' + foto + '<div class="rec-corpo">' + autore +
          '<span class="rec-meta">' + stelle(r.voto) + ' \u00b7 ' + testo(r.quando) + '</span>' +
          '<span class="rec-testo">' + testo(r.testo) + '</span></div></div>';
      }
      html += '</div>';
    }

    html += '<span class="rec-fonte">' + testo(L.fonte.replace("{d}", anno(d.aggiornato))) + '</span>';

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


/* --- il timbro accanto al nome della scuola mostra l'anno della verifica --- */
(function () {
  var VERIFICA = {
    it: "Verificato nel {a}", en: "Checked in {a}", nl: "Gecontroleerd in {a}",
    de: "Gepr\u00fcft {a}", fr: "V\u00e9rifi\u00e9 en {a}", es: "Verificado en {a}",
    pl: "Zweryfikowane w {a}"
  };

  function scrivi() {
    var e = document.querySelector(".timbro[data-verificato]");
    if (!e) return;
    var d = e.getAttribute("data-verificato") || "";
    if (d.length < 4) return;             // senza data lascio quello che c'era
    var lg = (document.documentElement.lang || "it").slice(0, 2).toLowerCase();
    var frase = (VERIFICA[lg] || VERIFICA.it).replace("{a}", d.slice(0, 4));
    e.className = "timbro ok";
    e.textContent = frase;
  }

  // gira dopo lo script inline della pagina, che altrimenti riscriverebbe il testo
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", scrivi)
    : scrivi();
  setTimeout(scrivi, 0);
})();


/* --- colonna recensioni nella tabella di confronto delle pagine città --- */
(function () {
  var celle = document.querySelectorAll("td[data-rec]");
  if (!celle.length) return;

  function stelle(v) {
    var n = Math.round(v), s = "";
    for (var i = 1; i <= 5; i++) s += (i <= n ? "\u2605" : "\u2606");
    return s;
  }

  fetch("/scuole/recensioni.json", { cache: "no-cache" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (tutte) {
      if (!tutte) return;
      var lg = (document.documentElement.lang || "it").slice(0, 2).toLowerCase();
      var trovate = 0;
      for (var i = 0; i < celle.length; i++) {
        var d = tutte[celle[i].getAttribute("data-rec")];
        if (!d || d.voto == null) continue;
        trovate++;
        var voto = Number(d.voto).toFixed(1).replace(".", lg === "en" ? "." : ",");
        celle[i].innerHTML =
          '<span class="conf-rec"><span class="cr-voto">' + voto + '</span> ' +
          '<span class="cr-stelle" aria-hidden="true">' + stelle(d.voto) + '</span> ' +
          '<span class="cr-conta">(' + (d.conta || 0) + ')</span></span>';
      }
      // se nessuna scuola ha recensioni, tolgo del tutto la colonna
      if (!trovate) {
        var tab = celle[0].closest("table");
        if (tab) {
          var n = celle[0].cellIndex;
          tab.querySelectorAll("tr").forEach(function (tr) {
            if (tr.cells[n]) tr.deleteCell(n);
          });
        }
      }
    })
    .catch(function () { /* niente rete: restano i trattini */ });
})();
