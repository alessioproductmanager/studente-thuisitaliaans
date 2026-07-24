/* modulo-contatto.js — invio asincrono del modulo di intake.
   Se il Worker non e' ancora configurato, NON perde il contatto:
   apre il client di posta con il messaggio gia' compilato. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const esito = document.createElement('p');
  esito.className = 'form-esito';
  esito.setAttribute('role', 'status');
  esito.setAttribute('aria-live', 'polite');
  esito.style.cssText = 'margin-top:1rem;font-weight:500;display:none';
  form.appendChild(esito);

  const mostra = (testo, ok) => {
    esito.textContent = testo;
    esito.style.color = ok ? '#1a7f4b' : '#b3261e';
    esito.style.display = 'block';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bottone = form.querySelector('button[type="submit"]');
    const etichetta = bottone ? bottone.textContent : '';
    if (bottone) { bottone.disabled = true; bottone.textContent = '…'; }

    const dati = new FormData(form);
    dati.set('_pagina', location.pathname);

    try {
      const r = await fetch(form.action, {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: dati,
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        form.reset();
        mostra(j.messaggio || 'Bedankt!', true);
        return;
      }
      throw new Error(j.errore || 'invio non riuscito');
    } catch (err) {
      // fallback: nessun contatto viene perso
      const oggetto = encodeURIComponent('Aanvraag intake — ' + (dati.get('name') || ''));
      const corpo = encodeURIComponent(
        'Naam: ' + (dati.get('name') || '') +
        '\nE-mail: ' + (dati.get('email') || '') +
        '\n\nBericht:\n' + (dati.get('message') || ''));
      mostra('Even geduld, je mailprogramma wordt geopend…', true);
      location.href = 'mailto:thuisitaliaans@gmail.com?subject=' + oggetto + '&body=' + corpo;
    } finally {
      if (bottone) { bottone.disabled = false; bottone.textContent = etichetta; }
    }
  });
});
