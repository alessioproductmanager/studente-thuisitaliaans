#!/usr/bin/env python3
"""
controlla_embedding.py — scopre quali siti delle scuole rifiutano di farsi mostrare
dentro l'anteprima, e scrive embedding.json.

PERCHE' SERVE
  Nell'anteprima a monitor c'e' un iframe con il sito della scuola. Molti siti mandano
  un header X-Frame-Options o una Content-Security-Policy che vieta l'incorporamento:
  in quel caso l'iframe resta bianco e copre il post-it di riserva. Dal browser non si
  puo' capire se un iframe e' bloccato o solo lento — i browser lo impediscono apposta.
  Quindi il controllo va fatto da qui, guardando gli header.

USO
  python3 controlla_embedding.py            controlla tutte le 109 scuole
  python3 controlla_embedding.py --solo arca
  python3 controlla_embedding.py --elenco   mostra l'ultimo risultato senza ricontrollare

RISULTATO
  embedding.json  ->  {"arca": true, "madrelingua": false, ...}
  true  = si puo' incorporare, l'anteprima mostra il sito
  false = vietato, la pagina nasconde l'iframe e lascia vedere il post-it

  Rilancialo ogni tanto: i siti cambiano configurazione.
"""

import json, os, re, sys, ssl, urllib.request, urllib.error

QUI = os.path.dirname(os.path.abspath(__file__))
DATI_JS = os.path.join(QUI, 'dati.js')
USCITA = os.path.join(QUI, 'embedding.json')
UA = 'Mozilla/5.0 (compatible; thuisitaliaans-embed-check/1.0)'


def carica_dati():
    s = open(DATI_JS, encoding='utf-8').read()
    i = s.find('const DATI ='); j = s.rfind('}')
    return json.loads(s[i + len('const DATI ='):j + 1])


def incorporabile(url):
    """None = non raggiungibile, True = si puo' incorporare, False = vietato"""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            h = {k.lower(): v for k, v in r.headers.items()}
    except urllib.error.HTTPError as e:
        h = {k.lower(): v for k, v in e.headers.items()} if e.headers else {}
    except Exception:
        return None, 'non raggiungibile'

    xfo = (h.get('x-frame-options') or '').strip().lower()
    if xfo in ('deny', 'sameorigin') or xfo.startswith('allow-from'):
        return False, f'X-Frame-Options: {xfo}'

    csp = (h.get('content-security-policy') or '')
    m = re.search(r'frame-ancestors([^;]*)', csp, re.I)
    if m:
        val = m.group(1).strip().lower()
        if "'none'" in val or "'self'" in val:
            return False, f'frame-ancestors {val[:40]}'
        return True, f'frame-ancestors permissiva ({val[:30]})'
    return True, 'nessuna restrizione'


def main():
    if '--elenco' in sys.argv:
        d = json.load(open(USCITA, encoding='utf-8')) if os.path.exists(USCITA) else {}
        si = [k for k, v in d.items() if v]
        no = [k for k, v in d.items() if not v]
        print(f'incorporabili: {len(si)} | bloccati: {len(no)}')
        for k in no:
            print('   bloccato:', k)
        return

    solo = sys.argv[sys.argv.index('--solo') + 1] if '--solo' in sys.argv else None
    D = carica_dati()
    scuole = [s for s in D['scuole'] if not solo or s['id'] == solo]
    out = json.load(open(USCITA, encoding='utf-8')) if os.path.exists(USCITA) else {}

    ok = ko = boh = 0
    for n, sc in enumerate(scuole, 1):
        url = sc.get('sito')
        if not url:
            continue
        esito, perche = incorporabile(url)
        stato = {True: 'ok      ', False: 'BLOCCATO', None: 'assente '}[esito]
        print(f'[{n}/{len(scuole)}] {stato} {sc["nome"][:38]:38s} {perche}')
        if esito is None:
            out[sc['id']] = False   # se non risponde, meglio il post-it che il bianco
            boh += 1
        else:
            out[sc['id']] = esito
            ok += esito
            ko += (not esito)

    json.dump(out, open(USCITA, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'\nincorporabili {ok} | bloccati {ko} | non raggiungibili {boh}')
    print(f'scritto in {USCITA}')


if __name__ == '__main__':
    main()
