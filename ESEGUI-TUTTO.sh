#!/bin/bash
# Ordine giusto di esecuzione. $1 = cartella sito, $2 = cartella blog.
set -e
SITO="${1:-.}"; BLOG="$2"
python3 135-ticta-niente-doppioni.py "$SITO"
python3 136-scuole-card-doppia.py   "$SITO"
python3 137-libri-bottone-doppio.py "$SITO"
python3 138-lingua-giusta.py        "$SITO"
[ -n "$BLOG" ] && python3 139-stub-blog.py "$BLOG" "$SITO"
python3 140-tappa-primo.py          "$SITO"
python3 141-lingue-showcase.py      "$SITO"
python3 142-esercizi-prezzo.py      "$SITO"
python3 143-grammatica-stelle.py    "$SITO"
python3 144-card-prezzo.py          "$SITO"
python3 145-testlivello.py          "$SITO"
[ -n "$BLOG" ] && python3 146-blog-prezzo.py "$BLOG" "$SITO"
python3 147-oro-unico.py            "$SITO" $BLOG
python3 148-store-pl-e-sitemap.py   "$SITO"
python3 149-verifica-store.py       "$SITO" || true
# --- secondo giro (150-155) ---
[ -n "$BLOG" ] && python3 150-blog-ordina.py "$BLOG"
python3 151-banner-finale.py "$SITO" $BLOG
# 152 ritirato: annullato dal 157
python3 153-pillola-accenti.py "$SITO"
python3 154-rete-margini.py "$SITO"
python3 155-card-scatti.py "$SITO" $BLOG
python3 156-screenshot-14-lingue.py "$SITO"
python3 157-ripristino-e-prezzi-snelli.py "$SITO"
python3 158-store-normalizza.py "$SITO"
python3 156-screenshot-14-lingue.py "$SITO"
python3 159-ventaglio-tappa-centro.py "$SITO" $BLOG
