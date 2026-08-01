#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 7_app_lingue.py — sistema la lingua nelle 14 pagine app-ti-*.html
============================================================================
 IL PROBLEMA PRINCIPALE
   Lo script dentro le pagine sceglieva la lingua così:

       var initial = 'en';
       if (!localStorage.getItem('ti-lang')) {
         var browserLang = (navigator.language || 'it').slice(0,2);
         if (data[browserLang]) initial = browserLang;
       }
       render(initial);

   Cioè la lingua del BROWSER vinceva su quella della PAGINA. Un olandese
   che apriva /app-ti-en vedeva la pagina in olandese. E Googlebot, che
   renderizza quasi sempre come en-US, vedeva contenuto inglese su tutte e
   14 le URL: per Google erano 14 pagine duplicate.
   In più 'var saved = null' era scritto a mano, quindi la lingua salvata
   in localStorage non veniva mai riletta.

 COSA FA QUESTO SCRIPT
   1. l'avvio usa sempre la lingua della pagina, letta da <html lang>
   2. allinea l'HTML statico alle traduzioni già presenti nel tuo
      dizionario #i18n-data (quello che vedono le anteprime social e i
      crawler prima di eseguire il JavaScript)
   3. aggiunge la chiave cap_coniugazioni, che mancava dal dizionario
   4. corregge og:locale, og:url, og:title e og:description
   5. traduce i testi alternativi delle immagini, che erano tutti italiani

 Uso:
     python3 7_app_lingue.py --sito .
     python3 7_app_lingue.py --sito . --prova     dice solo cosa farebbe

 Serve traduzioni_app.py nella stessa cartella.
 Rilanciarlo non fa danni.
============================================================================
"""

import argparse
import glob
import html
import json
import os
import re
import sys

try:
    from traduzioni_app import ALT, CONIUGAZIONI, DESCRIZIONE, LOCALE
except ImportError:
    sys.exit("Manca traduzioni_app.py: mettilo nella stessa cartella di questo script.")

SITO = "https://thuisitaliaans.com"


def esc(t):
    return html.escape(t or "", quote=True)


def lingua_di(percorso, testo):
    m = re.search(r'<html[^>]*\blang="([a-z]{2})"', testo)
    if m:
        return m.group(1)
    m = re.search(r"app-ti-([a-z]{2})\.html$", os.path.basename(percorso))
    return m.group(1) if m else None


# ---------------------------------------------------------------------------
#  1. l'avvio deve rispettare la lingua della pagina
# ---------------------------------------------------------------------------
RE_AVVIO = re.compile(r"var initial = '[a-z]{2}';.*?render\(initial\);", re.S)

NUOVO_AVVIO = """// la lingua della pagina vince sempre: l'URL dice qual e',
    // e i motori di ricerca devono vedere quella
    var initial = (document.documentElement.lang || 'it').slice(0, 2).toLowerCase();
    if (!data[initial]) initial = 'it';
    render(initial);"""


def sistema_avvio(t):
    if "la lingua della pagina vince sempre" in t:
        return t, 0
    nuovo = RE_AVVIO.sub(lambda m: NUOVO_AVVIO, t, count=1)
    return nuovo, (1 if nuovo != t else 0)


# ---------------------------------------------------------------------------
#  2-3. dizionario e HTML statico
# ---------------------------------------------------------------------------
RE_DIZ = re.compile(r'(<script type="application/json" id="i18n-data">)(.*?)(</script>)', re.S)


def leggi_dizionario(t):
    m = RE_DIZ.search(t)
    if not m:
        return None, None
    try:
        return json.loads(m.group(2)), m
    except Exception:
        return None, None


def completa_dizionario(t, diz):
    """Aggiunge le chiavi usate in pagina ma assenti dal dizionario."""
    m = RE_DIZ.search(t)
    if not m:
        return t, 0
    usate = set(re.findall(r'data-i18n="([^"]+)"', t))
    aggiunte = 0
    for lg, voci in diz.items():
        for chiave in usate - set(voci):
            if chiave == "cap_coniugazioni":
                voci[chiave] = CONIUGAZIONI.get(lg, CONIUGAZIONI["it"])
                aggiunte += 1
    if not aggiunte:
        return t, 0
    nuovo = json.dumps(diz, ensure_ascii=False, indent=2)
    return t[:m.start(2)] + "\n" + nuovo + "\n" + t[m.end(2):], aggiunte


def allinea_statico(t, voci):
    """Scrive nell'HTML il testo della lingua giusta, non quello italiano."""
    cambi = [0]
    tag = r"(?:figcaption|span|h1|h2|h3|p|a|li|strong|div)"

    def sost(m):
        chiave, dentro = m.group(2), m.group(3)
        nuovo = voci.get(chiave)
        if nuovo is None or nuovo == dentro:
            return m.group(0)
        cambi[0] += 1
        return m.group(1) + html.escape(nuovo, quote=False) + m.group(4)

    t = re.sub(r'(<' + tag + r'[^>]*data-i18n="([^"]+)"[^>]*>)([^<]*)(</' + tag + r'>)',
               sost, t)
    return t, cambi[0]


# ---------------------------------------------------------------------------
#  4. meta
# ---------------------------------------------------------------------------
def sistema_meta(t, lg, nome_file, voci):
    cambi = 0
    loc = LOCALE.get(lg)
    if loc:
        t2 = re.sub(r'<meta property="og:locale" content="[^"]*">',
                    f'<meta property="og:locale" content="{loc}">', t, count=1)
        cambi += 1 if t2 != t else 0
        t = t2
        t = re.sub(r'<meta property="og:locale:alternate" content="' + re.escape(loc) + r'">\s*',
                   "", t)

    url = f"{SITO}/{nome_file[:-5]}"
    t2 = re.sub(r'<meta property="og:url" content="[^"]*">',
                f'<meta property="og:url" content="{url}">', t, count=1)
    cambi += 1 if t2 != t else 0
    t = t2

    # og:title dal titolo grande della pagina, che è già tradotto
    h1 = voci.get("hero_h1")
    if h1:
        titolo = f"{h1.rstrip('.')} · Ti | Thuis Italiaans"
        for prop in ('property="og:title"', 'name="twitter:title"'):
            t2 = re.sub(r'<meta ' + re.escape(prop) + r' content="[^"]*">',
                        f'<meta {prop} content="{esc(titolo)}">', t, count=1)
            cambi += 1 if t2 != t else 0
            t = t2

    desc = DESCRIZIONE.get(lg)
    if desc:
        for prop in ('property="og:description"', 'name="twitter:description"',
                     'name="description"'):
            t2 = re.sub(r'<meta ' + re.escape(prop) + r' content="[^"]*">',
                        f'<meta {prop} content="{esc(desc)}">', t, count=1)
            cambi += 1 if t2 != t else 0
            t = t2
    return t, cambi


# ---------------------------------------------------------------------------
#  5. testi alternativi delle immagini
# ---------------------------------------------------------------------------
def sistema_alt(t, lg):
    cambi = 0
    for originale, per_lingua in ALT.items():
        trad = per_lingua.get(lg)
        if not trad:
            continue
        for forma in (originale, html.escape(originale, quote=True)):
            vecchio = f'alt="{forma}"'
            if vecchio in t:
                t = t.replace(vecchio, f'alt="{esc(trad)}"')
                cambi += 1
    return t, cambi


# ---------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--prova", action="store_true")
    a = ap.parse_args()

    radice = os.path.abspath(a.sito)
    pagine = sorted(glob.glob(os.path.join(radice, "app-ti-*.html")))
    if not pagine:
        sys.exit(f"Nessuna app-ti-*.html in {radice}. Lancia dalla cartella che le contiene.")

    tot = dict(avvio=0, chiavi=0, statico=0, meta=0, alt=0)
    for p in pagine:
        t = t0 = open(p, encoding="utf-8").read()
        lg = lingua_di(p, t)
        diz, _ = leggi_dizionario(t)
        if not diz or lg not in diz:
            print(f"  {os.path.basename(p):20} dizionario assente o lingua ignota, saltata")
            continue

        t, c0 = sistema_avvio(t)
        t, c1 = completa_dizionario(t, diz)
        t, c2 = allinea_statico(t, diz[lg])
        t, c3 = sistema_meta(t, lg, os.path.basename(p), diz[lg])
        t, c4 = sistema_alt(t, lg)

        tot["avvio"] += c0
        tot["chiavi"] += c1
        tot["statico"] += c2
        tot["meta"] += c3
        tot["alt"] += c4
        if t != t0 and not a.prova:
            open(p, "w", encoding="utf-8").write(t)
        print(f"  {os.path.basename(p):20} avvio:{c0}  testi:{c2:2}  meta:{c3}  alt:{c4:2}  chiavi:{c1:2}")

    print(f"\n{'(prova) ' if a.prova else ''}pagine trattate: {len(pagine)}")
    print(f"  avvio corretto in {tot['avvio']} pagine  <- la correzione che conta")
    print(f"  testi allineati alla lingua: {tot['statico']}")
    print(f"  chiavi aggiunte al dizionario: {tot['chiavi']}")
    print(f"  meta corretti: {tot['meta']}")
    print(f"  testi alternativi tradotti: {tot['alt']}")
    print("\nDopo aver caricato online, prova una pagina con il browser in una lingua")
    print("diversa: /app-ti-en deve restare in inglese anche da un browser olandese.")


if __name__ == "__main__":
    main()
