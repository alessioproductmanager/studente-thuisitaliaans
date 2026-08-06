/* generato da grammatica_136.py — la prova interattiva dei capitoli di grammatica.
   Le frasi tradotte arrivano dagli attributi data- del contenitore. */
(function () {
  "use strict";
  var scatola = document.getElementById("provaCap");
  if (!scatola) return;
  var lacune = scatola.querySelectorAll("select[data-giusta]");
  var esito = document.getElementById("provaEsito");
  var tastoC = document.getElementById("provaCorreggi");
  var tastoR = document.getElementById("provaRicomincia");
  if (!lacune.length || !esito || !tastoC || !tastoR) return;

  function frase(modello, giuste, totale) {
    return String(modello).replace("%d", giuste).replace("%d", totale);
  }

  tastoC.addEventListener("click", function () {
    var giuste = 0, i;
    for (i = 0; i < lacune.length; i++) {
      var s = lacune[i];
      var dopo = s.nextSibling;
      if (dopo && dopo.nodeType === 1 && dopo.className === "gr-soluzione") {
        dopo.parentNode.removeChild(dopo);
      }
      if (s.value === s.getAttribute("data-giusta")) {
        s.className = "giusto";
        giuste++;
      } else {
        s.className = "sbagliato";
        var sol = document.createElement("b");
        sol.className = "gr-soluzione";
        sol.textContent = " " + s.getAttribute("data-giusta");
        s.parentNode.insertBefore(sol, s.nextSibling);
      }
    }
    esito.textContent = giuste === lacune.length
      ? frase(scatola.getAttribute("data-perfetto"), giuste, lacune.length)
      : frase(scatola.getAttribute("data-esito"), giuste, lacune.length);
  });

  tastoR.addEventListener("click", function () {
    var i;
    for (i = 0; i < lacune.length; i++) {
      lacune[i].value = "";
      lacune[i].className = "";
    }
    var tutte = scatola.querySelectorAll(".gr-soluzione");
    for (i = 0; i < tutte.length; i++) {
      tutte[i].parentNode.removeChild(tutte[i]);
    }
    esito.textContent = "";
  });
})();
