#!/usr/bin/env python3
"""
riorganizza.py — mette ordine nella root senza cambiare un solo URL pubblico.

Cosa fa:
  1. sposta le pagine servizio in /lessen/ e quelle di livello in /niveaus/
  2. sposta i file di lavoro in /_lavoro/ (non deployato)
  3. patcha js/index.js perché il Worker risolva i vecchi URL nelle nuove cartelle
  4. scrive .assetsignore
  5. NON tocca index, app-*, privacy, termini, boeken/books/libri e le cartelle
     già organizzate

Gli URL restano identici: /zakelijk-italiaans continua a rispondere 200.
Nessun 301, nessun backlink perso.

Uso:  python3 riorganizza.py            (mostra cosa farebbe)
      python3 riorganizza.py --esegui   (esegue)
"""

import pathlib, shutil, sys, re

RADICE = pathlib.Path(".")
ESEGUI = "--esegui" in sys.argv

# ---------------------------------------------------------------- INTOCCABILI
# Restano in root: home, app, legali, e le pagine principali dei sotto-siti.
ROOT_FISSA = {
    "index.html",
    "app-ti.html", "app-support.html", "app-privacy.html", "app-termini.html",
    "website-privacy.html",
    "boeken.html", "books.html", "libri.html",
    "books-privacy.html", "libri-privacy.html",
    "robots.txt", "sitemap.xml", "llms.txt",
    "wrangler.jsonc", "worker-amazon-locale.js",
}

# Cartelle già organizzate: non si toccano.
CARTELLE_FISSE = {
    "assets", "css", "js", "esercizi", "blog",
    "libri", "boeken", "books", "lingue", "it", "en",
}

# ------------------------------------------------------------------ DESTINAZIONI

# Pagine servizio in olandese → /lessen/
LESSEN = [
    "conversatieles-italiaans.html",
    "italiaans-examen-certificaat.html",
    "italiaans-online.html",
    "italiaans-voor-beginners.html",
    "italiaans-voor-kinderen.html",
    "italiaanse-les-amsterdam.html",
    "italiaanse-les-ede-utrecht.html",
    "tarieven.html",
    "waarom-thuis-italiaans.html",
    "zakelijk-italiaans.html",
    # nuove
    "italiaanse-les-arnhem.html",
    "italiaanse-les-barneveld.html",
    "italiaanse-les-bennekom.html",
    "italiaanse-les-veenendaal.html",
    "italiaanse-les-wageningen.html",
]

# Pagine di livello, tutte e tre le lingue → /niveaus/
NIVEAUS = (
    [f"libri-italiano-facile-{l}.html" for l in ["a1", "a2", "b1", "b2", "c1", "c2"]] +
    [f"italiaanse-boeken-{l}.html"     for l in ["a1", "a2", "b1", "b2", "c1"]] +
    [f"italian-books-{l}.html"         for l in ["a1", "a2", "b1", "b2", "c1"]]
)

# Fuori dal deploy → /_lavoro/
LAVORO_FILE = ["*.md"]
LAVORO_DIR = ["strumenti", "dati"]

# Da cancellare
DA_CANCELLARE = ["css/landing.css"]


# ------------------------------------------------------------------ PATCH WORKER

RISOLUTORE = '''
/* ------------------------------------------------------------------
 * Risoluzione URL dopo la riorganizzazione in cartelle.
 * Gli URL pubblici NON cambiano: /zakelijk-italiaans continua a
 * rispondere 200 anche se il file ora sta in /lessen/.
 * Ordine di ricerca: root → lessen → niveaus.
 * ------------------------------------------------------------------ */
const CARTELLE = ["", "lessen/", "niveaus/"];

async function risolviAsset(request, env) {
\tconst url = new URL(request.url);
\tlet p = url.pathname;

\t// Le cartelle già organizzate e i file statici passano diretti.
\tif (/^\\/(assets|css|js|esercizi|blog|libri|boeken|books|lingue|it|en)\\//.test(p)
\t    || /\\.[a-z0-9]{2,5}$/i.test(p) && !p.endsWith(".html")) {
\t\treturn env.ASSETS.fetch(request);
\t}

\t// Nome del documento, senza slash iniziale ed estensione.
\tlet nome = p.replace(/^\\//, "").replace(/\\/$/, "").replace(/\\.html$/, "");
\tif (!nome) return env.ASSETS.fetch(request);

\tfor (const cartella of CARTELLE) {
\t\tconst prova = new URL(`/${cartella}${nome}.html`, url.origin);
\t\tconst r = await env.ASSETS.fetch(new Request(prova, request));
\t\tif (r.status === 200) return r;
\t}
\treturn env.ASSETS.fetch(request);
}
'''

VECCHIO_FETCH = '\t\tconst asset = await env.ASSETS.fetch(request);'
NUOVO_FETCH = '\t\tconst asset = await risolviAsset(request, env);'

ASSETSIGNORE = """# File di lavoro: non vanno pubblicati.
_lavoro/
*.md
*.py
strumenti/
dati/
.DS_Store
__MACOSX/
"""


# ------------------------------------------------------------------------ MOTORE

azioni = []


def sposta(nome, dest):
    src = RADICE / nome
    if not src.exists():
        azioni.append(("assente", nome, ""))
        return
    d = RADICE / dest
    azioni.append(("sposta", nome, f"{dest}/{nome}"))
    if ESEGUI:
        d.mkdir(parents=True, exist_ok=True)
        shutil.move(str(src), str(d / src.name))


def main():
    for n in LESSEN:
        sposta(n, "lessen")
    for n in NIVEAUS:
        sposta(n, "niveaus")

    for pattern in LAVORO_FILE:
        for f in sorted(RADICE.glob(pattern)):
            azioni.append(("sposta", f.name, f"_lavoro/{f.name}"))
            if ESEGUI:
                (RADICE / "_lavoro").mkdir(exist_ok=True)
                shutil.move(str(f), str(RADICE / "_lavoro" / f.name))

    for d in LAVORO_DIR:
        src = RADICE / d
        if src.is_dir():
            azioni.append(("sposta", d + "/", f"_lavoro/{d}/"))
            if ESEGUI:
                (RADICE / "_lavoro").mkdir(exist_ok=True)
                shutil.move(str(src), str(RADICE / "_lavoro" / d))

    for f in DA_CANCELLARE:
        p = RADICE / f
        if p.exists():
            azioni.append(("cancella", f, ""))
            if ESEGUI:
                p.unlink()

    # patch worker
    w = RADICE / "js" / "index.js"
    if w.exists():
        s = w.read_text(encoding="utf-8")
        if "risolviAsset" in s:
            azioni.append(("worker", "js/index.js", "già patchato"))
        elif VECCHIO_FETCH in s:
            azioni.append(("worker", "js/index.js", "patch risoluzione cartelle"))
            if ESEGUI:
                s = s.replace("export default {", RISOLUTORE + "\nexport default {", 1)
                s = s.replace(VECCHIO_FETCH, NUOVO_FETCH, 1)
                w.write_text(s, encoding="utf-8")
        else:
            azioni.append(("ATTENZIONE", "js/index.js",
                           "riga ASSETS.fetch non trovata: patch manuale"))

    a = RADICE / ".assetsignore"
    azioni.append(("scrive", ".assetsignore", ""))
    if ESEGUI:
        a.write_text(ASSETSIGNORE, encoding="utf-8")

    # riepilogo
    larg = max(len(x[1]) for x in azioni)
    for tipo, src, dst in azioni:
        print(f"  {tipo:10} {src:<{larg}}  {dst}")

    n_sposta = sum(1 for a in azioni if a[0] == "sposta")
    n_assenti = sum(1 for a in azioni if a[0] == "assente")
    print(f"\n  {n_sposta} spostamenti, {n_assenti} file assenti (normale se non li hai ancora aggiunti)")
    if not ESEGUI:
        print("\n  Anteprima. Per eseguire: python3 riorganizza.py --esegui")


if __name__ == "__main__":
    main()
