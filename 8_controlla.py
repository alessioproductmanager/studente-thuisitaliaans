#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 8_controlla.py — capisce perché online si vede ancora la versione vecchia
============================================================================
 Non modifica niente. Guarda e riferisce.

   1. quali file locali hanno le correzioni e quali no
   2. cosa dice Git: tracciati, ignorati, da committare, da inviare
   3. cosa c'è davvero online, scaricando le pagine e cercando le firme
   4. da quale indirizzo vengono servite: /app-ti-en oppure /app/app-ti-en

 Uso:
     python3 8_controlla.py --sito .
     python3 8_controlla.py --sito . --locale     salta i controlli online
============================================================================
"""

import argparse
import glob
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

SITO = "https://thuisitaliaans.com"

# firme: come riconosco che un file ha una certa correzione
FIRME = {
    "app-ti": ("la lingua della pagina vince", "correzione lingua"),
    "app-support": ("la lingua della pagina vince", "correzione lingua"),
    "mappa": ("leaflet.js", "Leaflet"),
    "cartoline": ("<!--cartoline-->", "cartoline"),
    "mappe-scuole": ("<!--mappa-->", "mappa scuole"),
}


def bash(cmd, cwd):
    try:
        r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True,
                           text=True, timeout=40)
        return r.stdout.strip(), r.returncode
    except Exception as exc:
        return f"(errore: {exc})", 1


def scarica(url):
    """Restituisce (codice, testo). Aggiunge un parametro per saltare la cache."""
    sep = "&" if "?" in url else "?"
    req = urllib.request.Request(url + sep + "v=controllo",
                                 headers={"User-Agent": "controllo-thuisitaliaans/1.0",
                                          "Cache-Control": "no-cache"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as exc:
        return 0, str(exc)


def titolo(s):
    print(f"\n{'=' * 70}\n {s}\n{'=' * 70}")


# ---------------------------------------------------------------------------
def controlla_file(radice):
    titolo("1. FILE LOCALI")
    gruppi = {
        "app-ti (radice)": glob.glob(os.path.join(radice, "app-ti.html")),
        "app-ti (app/)": sorted(glob.glob(os.path.join(radice, "app", "app-ti-*.html"))),
        "app-support (radice)": glob.glob(os.path.join(radice, "app-support.html")),
        "app-support (app/)": sorted(glob.glob(os.path.join(radice, "app", "app-support-*.html"))),
        "mappa.html scuole": sorted(glob.glob(os.path.join(radice, "scuole", "**", "mappa.html"),
                                              recursive=True)),
    }
    for nome, files in gruppi.items():
        if not files:
            print(f"  {nome:26} nessun file trovato")
            continue
        if "mappa" in nome:
            ok = sum(1 for f in files if "leaflet.js" in open(f, encoding="utf-8").read())
            print(f"  {nome:26} {ok}/{len(files)} con Leaflet"
                  + ("" if ok == len(files) else "   <-- da riparare"))
        else:
            ok = sum(1 for f in files
                     if "la lingua della pagina vince" in open(f, encoding="utf-8").read())
            print(f"  {nome:26} {ok}/{len(files)} corretti"
                  + ("" if ok == len(files) else "   <-- da sistemare"))

    # il difetto della lingua del browser, in tutte le sue forme
    bug = []
    for f in sorted(glob.glob(os.path.join(radice, "**", "app-*.html"), recursive=True)):
        t = open(f, encoding="utf-8").read()
        if "data[browserLang]" in t and "la lingua della pagina vince" not in t:
            bug.append(os.path.relpath(f, radice))
    print(f"\n  pagine con 'la lingua del browser vince': {len(bug)}")
    for x in bug[:20]:
        print("    -", x)


def controlla_git(radice):
    titolo("2. GIT")
    if not os.path.isdir(os.path.join(radice, ".git")):
        print("  qui non c'è un repository Git")
        return
    remoto, _ = bash("git remote get-url origin", radice)
    print("  origine:", remoto or "(nessuna)")
    stato, _ = bash("git status -sb | head -1", radice)
    print("  ramo:   ", stato)
    modif, _ = bash("git status --short | head -20", radice)
    print("  da committare:", len(modif.splitlines()) if modif else 0)
    for r in modif.splitlines()[:10]:
        print("    ", r)

    tracciati, _ = bash("git ls-files app/ | wc -l", radice)
    print(f"\n  file tracciati sotto app/: {tracciati.strip()}")
    if tracciati.strip() in ("0", ""):
        print("    ATTENZIONE: la cartella app/ non è tracciata da Git.")
        ign, _ = bash("git check-ignore -v app/app-ti-en.html", radice)
        print("    motivo:", ign or "(non ignorata, ma nemmeno aggiunta)")
        print("    rimedio:  git add -f app/ && git commit -m 'app' && git push")

    ultimo, _ = bash("git log -1 --format='%h  %ad  %s' --date=short", radice)
    print("\n  ultimo commit:", ultimo)
    avanti, codice = bash("git rev-list --count origin/main..HEAD", radice)
    if codice != 0 or not avanti.strip().isdigit():
        print("    non riesco a confrontare con origin (remoto assente o ramo diverso)")
    elif avanti.strip() != "0":
        print(f"    {avanti.strip()} commit non ancora inviati: manca 'git push'")
    else:
        print("    tutto inviato a origin")

    # il file corretto è davvero nel commit?
    cont, code = bash("git show HEAD:app/app-ti-en.html | grep -c 'la lingua della pagina vince'", radice)
    print("  la correzione è dentro l'ultimo commit:",
          "sì" if cont.strip() not in ("0", "") else "NO  <-- ecco il punto")


def controlla_online(radice):
    titolo("3. COSA C'È ONLINE")
    prove = [
        (f"{SITO}/app-ti-en", "la lingua della pagina vince", "correzione lingua"),
        (f"{SITO}/app/app-ti-en", "la lingua della pagina vince", "correzione lingua"),
        (f"{SITO}/app-ti-en.html", "la lingua della pagina vince", "correzione lingua"),
        (f"{SITO}/scuole/mappa.html", "leaflet.js", "Leaflet"),
        (f"{SITO}/scuole/citta/siena.html", "<!--cartoline-->", "cartoline"),
        (f"{SITO}/scuole/arca.html", "<!--mappa-->", "mappa scuola"),
    ]
    for url, firma, che_cosa in prove:
        codice, testo = scarica(url)
        if codice != 200:
            print(f"  {codice or 'errore':>6}  {url}")
            continue
        presente = firma in testo
        print(f"  {codice:>6}  {url}\n          {che_cosa}: {'PRESENTE' if presente else 'assente (versione vecchia)'}")


def confronta(radice):
    titolo("4. CONCLUSIONE")
    locale_ok = False
    p = os.path.join(radice, "app", "app-ti-en.html")
    if os.path.exists(p):
        locale_ok = "la lingua della pagina vince" in open(p, encoding="utf-8").read()
    codice, testo = scarica(f"{SITO}/app-ti-en")
    online_ok = codice == 200 and "la lingua della pagina vince" in testo
    codice2, testo2 = scarica(f"{SITO}/app/app-ti-en")
    sotto_app = codice2 == 200

    print(f"  locale corretto: {'sì' if locale_ok else 'no'}")
    print(f"  online corretto: {'sì' if online_ok else 'no'}")
    print(f"  /app/app-ti-en risponde: {'sì (' + str(codice2) + ')' if sotto_app else 'no'}")
    print()
    if locale_ok and not online_ok:
        print("  Il file giusto è sul tuo Mac ma non è quello che il sito serve.")
        if sotto_app:
            print("  Inoltre /app/app-ti-en risponde: ci sono DUE copie online, e")
            print("  quella pubblica (/app-ti-en) è la vecchia.")
        print("  Da guardare, in ordine:")
        print("   · Cloudflare Pages: quale progetto serve thuisitaliaans.com?")
        print("     questo repository potrebbe servire solo /scuole")
        print("   · la build dell'ultimo commit è andata a buon fine?")
        print("   · la cache: Caching -> Configuration -> Purge Everything")
    elif locale_ok and online_ok:
        print("  Tutto allineato: online c'è la versione corretta.")
    elif not locale_ok:
        print("  Il file locale non ha ancora la correzione:")
        print("   python3 7_app_lingue.py --sito app")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--locale", action="store_true", help="niente controlli online")
    a = ap.parse_args()
    radice = os.path.abspath(a.sito)
    if not os.path.isdir(radice):
        sys.exit(f"{radice} non esiste")

    print(f"cartella: {radice}")
    controlla_file(radice)
    controlla_git(radice)
    if not a.locale:
        controlla_online(radice)
        confronta(radice)


if __name__ == "__main__":
    main()
