#!/usr/bin/env python3
"""
aggiorna_recensioni.py — riempie recensioni.json leggendo Google Places API (New).

USO
  export GOOGLE_PLACES_KEY="la-tua-chiave"
  python3 aggiorna_recensioni.py            # aggiorna tutto
  python3 aggiorna_recensioni.py --solo arca ellci-milano
  python3 aggiorna_recensioni.py --prova    # non scrive niente, mostra cosa farebbe

COSA PRODUCE
  place_ids.json   id Google di ogni scuola. Si puo' tenere per sempre (vedi note).
  recensioni.json  voto, numero di recensioni e le ultime recensioni. Lo legge il sito.

NOTE SUI TERMINI DI GOOGLE — leggile prima di metterlo in produzione
  1. Il place_id si puo' memorizzare a tempo indeterminato. Il RESTO del contenuto
     (voto, testi, foto) non va tenuto in cache oltre 30 giorni: quindi questo script
     va rilanciato almeno una volta al mese. Un cron settimanale e' la scelta sicura.
  2. Le recensioni vanno mostrate come sono, con nome e foto dell'autore, e con
     l'attribuzione a Google. Il pannello del sito lo fa gia'.
  3. NON aggiungere JSON-LD aggregateRating con questi dati: sono recensioni di terzi
     e Google non vuole markup di questo tipo. Rischi una manual action.
  4. Ogni giro costa: una Text Search per le scuole senza place_id (solo la prima volta)
     piu' un Place Details per scuola. Con 109 scuole e cron settimanale resti basso,
     ma tieni d'occhio la fatturazione e metti un budget alert.
"""

import json, os, re, sys, time, urllib.request, urllib.error, difflib
from urllib.parse import urlparse

QUI = os.path.dirname(os.path.abspath(__file__))
DATI_JS = os.path.join(QUI, 'dati.js')
PLACE_IDS = os.path.join(QUI, 'place_ids.json')
USCITA = os.path.join(QUI, 'recensioni.json')

CHIAVE = os.environ.get('GOOGLE_PLACES_KEY', '')
LINGUA = os.environ.get('GOOGLE_PLACES_LANG', 'it')
MAX_RECENSIONI = 5

CERCA = 'https://places.googleapis.com/v1/places:searchText'
DETTAGLI = 'https://places.googleapis.com/v1/places/{}'


def carica_dati():
    s = open(DATI_JS, encoding='utf-8').read()
    i = s.find('const DATI ='); j = s.rfind('}')
    return json.loads(s[i + len('const DATI ='):j + 1])


def chiama(url, corpo=None, fields=''):
    testa = {'X-Goog-Api-Key': CHIAVE, 'X-Goog-FieldMask': fields,
             'Content-Type': 'application/json'}
    dati = json.dumps(corpo).encode() if corpo is not None else None
    req = urllib.request.Request(url, data=dati, headers=testa,
                                 method='POST' if corpo is not None else 'GET')
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        print(f'   ! HTTP {e.code}: {e.read().decode()[:200]}')
    except Exception as e:
        print(f'   ! {e}')
    return None


def dominio(u):
    try:
        d = urlparse(u).netloc.lower()
        return d[4:] if d.startswith('www.') else d
    except Exception:
        return ''


def trova_place_id(sc):
    """Text Search + scelta del risultato migliore. Il sito ufficiale vale piu' del nome."""
    query = f"{sc['nome']} {sc['citta']} Italia"
    r = chiama(CERCA, {'textQuery': query, 'languageCode': LINGUA,
                       'maxResultCount': 5, 'regionCode': 'IT'},
               'places.id,places.displayName,places.websiteUri,places.formattedAddress')
    if not r or not r.get('places'):
        return None, 'nessun risultato'
    mio = dominio(sc.get('sito', ''))
    migliore, punteggio, perche = None, 0.0, ''
    for p in r['places']:
        nome = (p.get('displayName') or {}).get('text', '')
        pt = difflib.SequenceMatcher(None, nome.lower(), sc['nome'].lower()).ratio()
        if mio and dominio(p.get('websiteUri', '')) == mio:
            pt += 1.0
            perche = 'sito coincidente'
        if pt > punteggio:
            migliore, punteggio = p, pt
            perche = perche or f'nome simile {pt:.0%}'
    if punteggio < 0.55:
        return None, f'match troppo debole ({punteggio:.0%})'
    return migliore['id'], perche


def dettagli(pid):
    return chiama(DETTAGLI.format(pid), None,
                  'id,displayName,rating,userRatingCount,googleMapsUri,reviews')


def main():
    prova = '--prova' in sys.argv
    solo = []
    if '--solo' in sys.argv:
        solo = sys.argv[sys.argv.index('--solo') + 1:]
        solo = [x for x in solo if not x.startswith('--')]

    if not CHIAVE and not prova:
        sys.exit('Manca GOOGLE_PLACES_KEY. Esporta la chiave e riprova.')

    D = carica_dati()
    scuole = [s for s in D['scuole'] if not solo or s['id'] in solo]
    ids = json.load(open(PLACE_IDS, encoding='utf-8')) if os.path.exists(PLACE_IDS) else {}
    out = json.load(open(USCITA, encoding='utf-8')) if os.path.exists(USCITA) else {}

    nuovi, aggiornati, falliti = 0, 0, []
    for n, sc in enumerate(scuole, 1):
        sid = sc['id']
        print(f'[{n}/{len(scuole)}] {sc["nome"]} ({sc["citta"]})')
        pid = ids.get(sid)
        if not pid:
            if prova:
                print('   (prova) cercherei il place_id'); continue
            pid, perche = trova_place_id(sc)
            if not pid:
                print(f'   - non trovata: {perche}'); falliti.append((sid, perche)); continue
            print(f'   + place_id trovato ({perche})')
            ids[sid] = pid; nuovi += 1
            time.sleep(0.2)
        if prova:
            print('   (prova) chiederei i dettagli'); continue
        d = dettagli(pid)
        if not d:
            falliti.append((sid, 'dettagli non recuperati')); continue
        rec = []
        for r in (d.get('reviews') or [])[:MAX_RECENSIONI]:
            testo = ((r.get('text') or {}).get('text') or
                     (r.get('originalText') or {}).get('text') or '').strip()
            if not testo:
                continue
            aut = r.get('authorAttribution') or {}
            rec.append({'autore': aut.get('displayName', ''),
                        'foto': aut.get('photoUri', ''),
                        'profilo': aut.get('uri', ''),
                        'voto': r.get('rating'),
                        'quando': r.get('relativePublishTimeDescription', ''),
                        'testo': testo})
        out[sid] = {'voto': d.get('rating'), 'conta': d.get('userRatingCount'),
                    'mappa': d.get('googleMapsUri', ''), 'recensioni': rec,
                    'aggiornato': time.strftime('%Y-%m-%d')}
        print(f'   voto {d.get("rating")} su {d.get("userRatingCount")} recensioni, {len(rec)} testi')
        aggiornati += 1
        time.sleep(0.2)

    if prova:
        print('\n(prova) niente scritto su disco.'); return

    json.dump(ids, open(PLACE_IDS, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(out, open(USCITA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'\nplace_id nuovi: {nuovi} | scuole aggiornate: {aggiornati} | scritte in {USCITA}')
    if falliti:
        print(f'\nda sistemare a mano ({len(falliti)}): metti il place_id in place_ids.json')
        for sid, perche in falliti:
            print(f'   {sid}: {perche}')


if __name__ == '__main__':
    main()
