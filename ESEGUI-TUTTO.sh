#!/bin/bash
# Ordine giusto di esecuzione. $1 = cartella sito, $2 = cartella blog.
# nessun abort a catena: se uno script inciampa, lo si segnala e si prosegue
fallito=""
esegui(){ python3 "$@" || { echo "  !! $1 ha segnalato un errore (proseguo)"; fallito="$fallito $1"; }; }
SITO="${1:-.}"; BLOG="$2"
esegui 135-ticta-niente-doppioni.py "$SITO"
esegui 136-scuole-card-doppia.py   "$SITO"
esegui 137-libri-bottone-doppio.py "$SITO"
esegui 138-lingua-giusta.py        "$SITO"
[ -n "$BLOG" ] && esegui 139-stub-blog.py "$BLOG" "$SITO"
esegui 140-tappa-primo.py          "$SITO"
esegui 141-lingue-showcase.py      "$SITO"
esegui 142-esercizi-prezzo.py      "$SITO"
esegui 143-grammatica-stelle.py    "$SITO"
esegui 144-card-prezzo.py          "$SITO"
esegui 145-testlivello.py          "$SITO"
[ -n "$BLOG" ] && esegui 146-blog-prezzo.py "$BLOG" "$SITO"
esegui 147-oro-unico.py            "$SITO" $BLOG
esegui 148-store-pl-e-sitemap.py   "$SITO"
esegui 149-verifica-store.py       "$SITO"
# --- secondo giro (150-155) ---
[ -n "$BLOG" ] && esegui 150-blog-ordina.py "$BLOG"
esegui 151-banner-finale.py "$SITO" $BLOG
# 152 ritirato (annullato dal 157) · 140 ritirato (sostituito dal 159)
esegui 153-pillola-accenti.py "$SITO"
esegui 154-rete-margini.py "$SITO"
esegui 155-card-scatti.py "$SITO" $BLOG
esegui 156-screenshot-14-lingue.py "$SITO"
esegui 157-ripristino-e-prezzi-snelli.py "$SITO"
esegui 158-store-normalizza.py "$SITO"
esegui 156-screenshot-14-lingue.py "$SITO"
esegui 159-ventaglio-tappa-centro.py "$SITO" $BLOG
esegui 160-leggibilita-fondo-scuro.py "$SITO"
esegui 161-menu-coerente.py "$SITO"
esegui 162-memoria-lingua.py "$SITO"
[ -n "$BLOG" ] && esegui 163-titoli-che-cliccano.py "$SITO" "$BLOG"
[ -n "$BLOG" ] && esegui 164-blog-hreflang.py "$BLOG" "$3"
esegui 165-gemelli-dei-vincitori.py "$SITO" "$BLOG"
[ -n "$BLOG" ] && esegui 166-seo-secondo-giro.py "$BLOG"
[ -n "$BLOG" ] && esegui 167-card-gemelle-distinte.py "$BLOG" && esegui 150-blog-ordina.py "$BLOG"
[ -n "$BLOG" ] && esegui 168-badge-lingua-card.py "$SITO" "$BLOG"
[ -n "$BLOG" ] && esegui 170-sidebar-app-allineata.py "$SITO" "$BLOG"
# --- date del blog: prima si sparpaglia, poi le foto, poi si riordina,
#     e SOLO ALLA FINE si riallineano dati strutturati e sitemap ---
if [ -n "$BLOG" ]; then
  esegui 171-date-realistiche.py     "$BLOG"
  # 169 NON va in catena: sposta le date dopo il 171, e al giro successivo
  # il 171 ricalcola tutto da capo - i due si rincorrono all'infinito.
  # Il 171 fa gia' la spaziatura e in coda elenca le copertine ripetute:
  # quelle si risolvono con una foto diversa, non con una data.
  # Per lanciarlo a mano: python3 169-distanzia-foto-uguali.py blog
  esegui 150-blog-ordina.py          "$BLOG"
  esegui 172-date-coerenti.py        "$SITO" "$BLOG"
fi

echo
if [ -n "$fallito" ]; then echo "RIEPILOGO · script con errori:$fallito"; else echo "RIEPILOGO · tutti gli script completati."; fi
