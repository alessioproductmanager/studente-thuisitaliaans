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
