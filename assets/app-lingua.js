/* app-lingua.js — mostra le schermate dell'app nella lingua del browser.
   Riscrive il segmento di lingua in qualsiasi percorso assets/store/<lingua>/file.
   Non serve nessun attributo speciale nell'HTML. */
(function () {
  var CARTELLE = ["ar", "bn", "de", "en", "en_AU", "en_CA", "en_US", "es", "es_MX",
                  "fr", "fr_CA", "it", "nl", "pt", "pt_BR", "ro", "uk", "zh"];
  var PERCORSO = /(assets\/store\/)([A-Za-z_]+)(\/[^\/"']+\.(?:jpg|jpeg|png|webp))/;

  function cartella() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (!l) return null;
    var u = l.replace("-", "_");
    if (CARTELLE.indexOf(u) >= 0) return u;
    var b = u.split("_")[0];
    return CARTELLE.indexOf(b) >= 0 ? b : null;
  }

  function riscrivi(valore, c) {
    if (!valore) return null;
    var m = valore.match(PERCORSO);
    if (!m || m[2] === c) return null;
    return valore.replace(PERCORSO, "$1" + c + "$3");
  }

  function applica() {
    var c = cartella();
    if (!c) return;
    var nodi = document.querySelectorAll('img[src*="assets/store/"], source[srcset*="assets/store/"]');
    for (var i = 0; i < nodi.length; i++) {
      var n = nodi[i];
      if (n.tagName === "SOURCE") {
        var s = riscrivi(n.getAttribute("srcset"), c);
        if (s) n.setAttribute("srcset", s);
      } else {
        var v = riscrivi(n.getAttribute("src"), c);
        if (v) n.setAttribute("src", v);
      }
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", applica)
    : applica();
})();
