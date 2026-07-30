/* lingua.js — adatta il sito alla lingua del visitatore.
 *
 * NON fa redirect automatico. Google lo sconsiglia esplicitamente: se
 * reindirizzi in base ad Accept-Language, Googlebot (che striscia quasi
 * sempre con "en" e da IP statunitensi) non riesce a vedere le altre
 * versioni e queste non vengono indicizzate. Qui mostriamo un invito
 * discreto: il visitatore decide, e la scelta viene ricordata.
 */
(function () {
  var LINGUE = ['nl', 'en', 'it'];
  var TESTI = {
    nl: { m: 'Deze site is er ook in het Nederlands.', s: 'Bekijken', n: 'Nee, bedankt' },
    en: { m: 'This site is also available in English.',  s: 'View',     n: 'No thanks' },
    it: { m: 'Questo sito è disponibile anche in italiano.', s: 'Vai',  n: 'No, grazie' }
  };

  function memoria(chiave, valore) {
    try {
      if (valore === undefined) return localStorage.getItem(chiave);
      localStorage.setItem(chiave, valore);
    } catch (e) { /* modalità privata: pazienza */ }
  }

  var attuale = (document.documentElement.lang || 'nl').slice(0, 2).toLowerCase();

  // Un click su un selettore di lingua (nav o footer) vale come scelta
  // esplicita: la salviamo, cosi' il redirect automatico non riporta
  // l'utente indietro dopo un cambio manuale.
  (function () {
    var alternates = {};
    var tags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    for (var i = 0; i < tags.length; i++) {
      var hl = (tags[i].getAttribute('hreflang') || '').slice(0, 2).toLowerCase();
      var hr = tags[i].getAttribute('href');
      if (LINGUE.indexOf(hl) > -1 && hr) alternates[hr.replace(/\/$/, '')] = hl;
    }
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var assoluto;
      try { assoluto = new URL(a.getAttribute('href'), location.href).toString().replace(/\/$/, ''); }
      catch (err) { return; }
      var hl = a.getAttribute('hreflang');
      var lingua = hl ? hl.slice(0, 2).toLowerCase() : alternates[assoluto];
      if (lingua && LINGUE.indexOf(lingua) > -1) memoria('lingua-scelta', lingua);
    }, true);
  })();

  // se l'utente ha già scelto, rispettiamo la scelta e non chiediamo più
  var scelta = memoria('lingua-scelta');
  if (scelta) {
    if (scelta !== attuale) proponi(scelta, true);
    return;
  }
  if (memoria('lingua-rifiutata') === '1') return;

  // lingua preferita del browser fra quelle che abbiamo
  var preferita = null;
  var elenco = navigator.languages || [navigator.language || ''];
  for (var i = 0; i < elenco.length && !preferita; i++) {
    var codice = String(elenco[i]).slice(0, 2).toLowerCase();
    if (LINGUE.indexOf(codice) > -1) preferita = codice;
  }
  if (!preferita || preferita === attuale) return;

  proponi(preferita, false);

  function proponi(lingua, automatico) {
    // l'URL della versione corrispondente lo prendiamo dagli hreflang:
    // è già nella pagina, non serve indovinarlo
    var link = document.querySelector('link[rel="alternate"][hreflang="' + lingua + '"]');
    if (!link) return;
    var destinazione = link.getAttribute('href');
    if (!destinazione) return;

    if (automatico) { location.replace(destinazione); return; }

    var t = TESTI[lingua] || TESTI.en;
    var barra = document.createElement('div');
    barra.className = 'barra-lingua';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Language');
    barra.innerHTML =
      '<span>' + t.m + '</span>' +
      '<a class="barra-lingua-si" href="' + destinazione + '" hreflang="' + lingua + '">' + t.s + '</a>' +
      '<button type="button" class="barra-lingua-no">' + t.n + '</button>';

    barra.querySelector('.barra-lingua-si').addEventListener('click', function () {
      memoria('lingua-scelta', lingua);
    });
    barra.querySelector('.barra-lingua-no').addEventListener('click', function () {
      memoria('lingua-rifiutata', '1');
      barra.remove();
    });

    document.body.appendChild(barra);
    requestAnimationFrame(function () { barra.classList.add('visibile'); });
  }
})();
