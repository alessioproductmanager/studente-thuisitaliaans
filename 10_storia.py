#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 10_storia.py — trova cosa è cambiato e ha rotto /app-ti-en
============================================================================
 Non modifica niente. Interroga la storia di Git e riferisce.

   1. le pagine app-ti-*.html sono mai state nella radice? quando sono
      state spostate in app/, e da quale commit?
   2. cosa hanno toccato gli ultimi commit
   3. esistono file di configurazione del deploy (_redirects, _routes.json,
      wrangler.toml, functions/) e sono cambiati di recente?
   4. com'era il repository l'ultima volta che il sito funzionava

 Uso:
     python3 10_storia.py --sito .
     python3 10_storia.py --sito . --giorni 3
============================================================================
"""

import argparse
import os
import subprocess
import sys


def git(cmd, radice):
    r = subprocess.run("git " + cmd, shell=True, cwd=radice,
                       capture_output=True, text=True, timeout=60)
    return r.stdout.rstrip(), r.returncode


def titolo(s):
    print(f"\n{'=' * 72}\n {s}\n{'=' * 72}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--giorni", type=int, default=4)
    a = ap.parse_args()
    radice = os.path.abspath(a.sito)
    if not os.path.isdir(os.path.join(radice, ".git")):
        sys.exit(f"Non c'è un repository Git in {radice}")

    print("cartella:", radice)

    # ------------------------------------------------------------------
    titolo("1. LE PAGINE SONO STATE SPOSTATE?")
    for nome in ("app-ti-en.html", "app-support-en.html"):
        out, _ = git(f'log --all --oneline --format="%h %ad %s" --date=short -- "{nome}"', radice)
        print(f"\n  {nome} nella RADICE:")
        print("   ", (out.replace("\n", "\n    ") if out else "mai esistito lì"))

        out, _ = git(f'log --all --oneline --format="%h %ad %s" --date=short -- "app/{nome}"', radice)
        print(f"  app/{nome}:")
        print("   ", (out.split("\n")[0] if out else "mai esistito") ,
              f"  ({len(out.splitlines())} commit)" if out else "")

    # rinomini veri e propri
    out, _ = git('log --diff-filter=R --find-renames --name-status '
                 '--format="%n>>> %h %ad %s" --date=short -- app/ ', radice)
    if out.strip():
        print("\n  SPOSTAMENTI registrati da Git:")
        for r in out.splitlines()[:30]:
            if r.strip():
                print("   ", r)
    else:
        print("\n  Git non registra rinomini: i file potrebbero essere stati")
        print("  cancellati e ricreati, oppure c'erano già in app/ da sempre.")

    # ------------------------------------------------------------------
    titolo(f"2. COSA HANNO TOCCATO GLI ULTIMI COMMIT ({a.giorni} giorni)")
    out, _ = git(f'log --since="{a.giorni} days ago" --format="%n>>> %h  %ad  %s" '
                 f'--date=format:"%d/%m %H:%M" --name-status', radice)
    righe = out.splitlines()
    if not righe:
        out, _ = git('log -8 --format="%n>>> %h  %ad  %s" --date=short --name-status', radice)
        righe = out.splitlines()
    conta = {}
    commit = None
    for r in righe:
        if r.startswith(">>>"):
            commit = r
            conta[commit] = []
        elif r.strip() and commit:
            conta[commit].append(r)
    for c, files in list(conta.items())[:12]:
        print(f"\n  {c[4:]}")
        print(f"    {len(files)} file toccati")
        interessanti = [f for f in files
                        if "app-" in f or "_redirect" in f or "_routes" in f
                        or "wrangler" in f or "functions/" in f or "_headers" in f]
        for f in interessanti[:12]:
            print("     ", f)
        if files and not interessanti:
            for f in files[:4]:
                print("     ", f)
            if len(files) > 4:
                print(f"      ... e altri {len(files)-4}")

    # ------------------------------------------------------------------
    titolo("3. CONFIGURAZIONE DEL DEPLOY")
    conf = ["_redirects", "_routes.json", "_headers", "wrangler.toml",
            "netlify.toml", "vercel.json", ".github/workflows"]
    trovati = False
    for c in conf:
        p = os.path.join(radice, c)
        if os.path.exists(p):
            trovati = True
            print(f"\n  {c} — presente")
            out, _ = git(f'log -3 --format="   %h %ad %s" --date=short -- "{c}"', radice)
            print(out or "   mai committato")
            if os.path.isfile(p) and os.path.getsize(p) < 4000:
                print("   contenuto:")
                for riga in open(p, encoding="utf-8", errors="replace").read().splitlines()[:20]:
                    print("     ", riga)
    if not trovati:
        print("\n  nessun file di configurazione trovato nella radice")
        out, _ = git('log --all --diff-filter=D --format="%h %ad %s" --date=short '
                     '-- _redirects _routes.json wrangler.toml', radice)
        if out.strip():
            print("  ma qualcuno è stato CANCELLATO:")
            print("   ", out.replace("\n", "\n    "))
            print("  <-- probabilmente è questo il punto")

    # ------------------------------------------------------------------
    titolo("4. COM'ERA PRIMA")
    out, _ = git('log -12 --format="%h|%ad|%s" --date=format:"%d/%m %H:%M"', radice)
    print("\n  Per vedere l'elenco dei file di un commit passato:")
    print("    git ls-tree --name-only HEAD~5")
    print("\n  Per confrontare due momenti:")
    print("    git diff --stat HEAD~5 HEAD")
    print("\n  ultimi commit:")
    for r in out.splitlines():
        h, d, s = (r.split("|", 2) + ["", ""])[:3]
        num, _ = git(f'ls-tree --name-only {h} | grep -c "^app-ti-"', radice)
        num2, _ = git(f'ls-tree --name-only {h}:app 2>/dev/null | grep -c "app-ti-"', radice)
        print(f"    {h}  {d}  radice:{num.strip() or 0:>3} app/:{num2.strip() or 0:>3}  {s[:40]}")
    print("\n  'radice' = quante app-ti-*.html stavano nella radice in quel commit.")
    print("  Se in un commit erano 14 e in quello dopo 0, hai trovato il momento.")


if __name__ == "__main__":
    main()
