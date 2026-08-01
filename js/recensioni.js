/* recensioni.js — riempie il pannello delle recensioni leggendo
   /scuole/recensioni.json. Se per quella scuola non ci sono dati,
   il pannello resta nascosto e la pagina non cambia.

   Le recensioni sono di Google e vengono mostrate come arrivano:
   nessun filtro, nessuna selezione, con nome e foto dell'autore e
   l'attribuzione richiesta dai termini di Google. */
(function () {
  var DATI = "/scuole/recensioni.json";

  var T = {
    it: { conta: "su {n} recensioni Google", fonte: "Recensioni da Google, {d}.",
          titolo: "Cosa dicono gli studenti",
          mesi: ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio",
                 "agosto","settembre","ottobre","novembre","dicembre"] },
    en: { conta: "from {n} Google reviews", fonte: "Reviews from Google, {d}.",
          titolo: "What students say",
          mesi: ["January","February","March","April","May","June","July",
                 "August","September","October","November","December"] },
    nl: { conta: "uit {n} Google-recensies", fonte: "Recensies van Google, {d}.",
          titolo: "Wat studenten zeggen",
          mesi: ["januari","februari","maart","april","mei","juni","juli",
                 "augustus","september","oktober","november","december"] },
    de: { conta: "aus {n} Google-Bewertungen", fonte: "Bewertungen von Google, {d}.",
          titolo: "Was Studierende sagen",
          mesi: ["Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli",
                 "August","September","Oktober","November","Dezember"] },
    fr: { conta: "sur {n} avis Google", fonte: "Avis de Google, {d}.",
          titolo: "Ce que disent les \u00e9tudiants",
          mesi: ["janvier","f\u00e9vrier","mars","avril","mai","juin","juillet",
                 "ao\u00fbt","septembre","octobre","novembre","d\u00e9cembre"] },
    es: { conta: "de {n} rese\u00f1as de Google", fonte: "Rese\u00f1as de Google, {d}.",
          titolo: "Lo que dicen los estudiantes",
          mesi: ["enero","febrero","marzo","abril","mayo","junio","julio",
                 "agosto","septiembre","octubre","noviembre","diciembre"] },
    pl: { conta: "z {n} opinii Google", fonte: "Opinie z Google, {d}.",
          titolo: "Co m\u00f3wi\u0105 studenci",
          mesi: ["stycze\u0144","luty","marzec","kwiecie\u0144","maj","czerwiec","lipiec",
                 "sierpie\u0144","wrzesie\u0144","pa\u017adziernik","listopad","grudzie\u0144"] }
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
    if (p.length < 2) return iso;
    var m = parseInt(p[1], 10) - 1;
    var nome = (T[lg].mesi[m] || "");
    return nome + " " + p[0];
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
        var autore = '<span class="rec-autore">' + testo(r.autore) + '</span>';
        html += '<div class="rec-uno">' + foto + '<div class="rec-corpo">' + autore +
          '<span class="rec-meta">' + stelle(r.voto) + ' \u00b7 ' + testo(r.quando) + '</span>' +
          '<span class="rec-testo">' + testo(r.testo) + '</span></div></div>';
      }
      html += '</div>';
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
