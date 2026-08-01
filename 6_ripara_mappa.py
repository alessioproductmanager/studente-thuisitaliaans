#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 6_ripara_mappa.py — rimette Leaflet nelle pagine mappa.html
============================================================================
 Cosa era successo:
   5_mappe.py, con --togli, ripuliva i riferimenti a Leaflet che aveva
   messo lui. La regola però era cieca e ha tolto anche quelli che in
   scuole/mappa.html c'erano già di tuo. Senza Leaflet la variabile L non
   esiste, la mappa grande non si disegna e restano solo i filtri e
   l'elenco delle città.

 Cosa fa questo script:
   · rimette <link> e <script> di Leaflet in tutte le mappa.html (7 lingue)
   · non tocca niente se ci sono già
   · corregge togli_assets dentro 5_mappe.py, così non può ricapitare

 Uso:
     python3 6_ripara_mappa.py --sito .
     python3 6_ripara_mappa.py --sito . --prova     dice solo cosa farebbe
============================================================================
"""

import argparse
import os
import re
import sys

LEAFLET = ('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">'
           '<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>')

LINGUE = ("", "de", "en", "es", "fr", "nl", "pl")


def ripara(percorso, prova):
    t = open(percorso, encoding="utf-8").read()
    if "leaflet.js" in t:
        return "già a posto"
    if "</head>" not in t:
        return "manca </head>"
    if not prova:
        open(percorso, "w", encoding="utf-8").write(t.replace("</head>", LEAFLET + "</head>", 1))
    return "riparata"


def correggi_script(radice, prova):
    """Rende togli_assets di 5_mappe.py meno aggressivo."""
    p = os.path.join(radice, "5_mappe.py")
    if not os.path.exists(p):
        return "5_mappe.py non trovato qui: correggilo a mano o riscaricalo"
    t = open(p, encoding="utf-8").read()
    vecchio = '''def togli_assets(t):
    for u in (LEAFLET_CSS, CSS_URL):
        t = re.sub(r'<link rel="stylesheet" href="' + re.escape(u) + r'">\\s*', "", t)
    for u in (LEAFLET_JS, JS_URL):
        t = re.sub(r'<script defer src="' + re.escape(u) + r'"></script>\\s*', "", t)
    return t'''
    nuovo = '''def togli_assets(t):
    """Toglie solo i riferimenti aggiunti da questo script.
    Leaflet si rimuove unicamente se è nel blocco che abbiamo messo noi:
    in scuole/mappa.html c'era già di suo e va lasciato stare."""
    blocco = (f'<link rel="stylesheet" href="{LEAFLET_CSS}">\\n'
              f'<link rel="stylesheet" href="{CSS_URL}">\\n'
              f'<script defer src="{LEAFLET_JS}"></script>\\n'
              f'<script defer src="{JS_URL}"></script>\\n')
    if blocco in t:
        return t.replace(blocco, "", 1)
    # ripiego: togli solo i nostri due file, mai Leaflet
    t = re.sub(r'<link rel="stylesheet" href="' + re.escape(CSS_URL) + r'">\\s*', "", t)
    return re.sub(r'<script defer src="' + re.escape(JS_URL) + r'"></script>\\s*', "", t)'''
    if vecchio not in t:
        return "già corretto (o versione diversa)"
    if not prova:
        open(p, "w", encoding="utf-8").write(t.replace(vecchio, nuovo, 1))
    return "corretto"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--prova", action="store_true")
    a = ap.parse_args()

    radice = os.path.abspath(a.sito)
    dir_scuole = os.path.join(radice, "scuole")
    if not os.path.isdir(dir_scuole):
        sys.exit(f"Non trovo {dir_scuole}. Lancia dalla radice del sito.")

    n = 0
    for suff in LINGUE:
        base = os.path.join(dir_scuole, suff) if suff else dir_scuole
        p = os.path.join(base, "mappa.html")
        if not os.path.exists(p):
            continue
        esito = ripara(p, a.prova)
        print(f"  {os.path.relpath(p, radice):32} {esito}")
        n += 1 if esito == "riparata" else 0

    print(f"\n{'(prova) ' if a.prova else ''}pagine riparate: {n}")
    print("5_mappe.py:", correggi_script(radice, a.prova))
    if n and not a.prova:
        print("\nRicarica online le 7 mappa.html e la mappa torna a funzionare.")


if __name__ == "__main__":
    main()
