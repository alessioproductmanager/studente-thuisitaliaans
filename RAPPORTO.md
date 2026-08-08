# Ads e banner — pacchetto 135–149 · 8 agosto 2026

Da lanciare in locale, in quest'ordine (o con `./ESEGUI-TUTTO.sh cartella-sito cartella-blog`).
Tutti idempotenti: rilanciarli non fa danni. `condivisi.py` deve stare accanto agli script.
Le traduzioni sono RACCOLTE dal sito stesso (i18n di app-ti, homepage di lingua, grammatica);
le uniche nuove sono la testata dello showcase, la caption «Lezione» e il polacco della card.

## Risultati sul tuo archivio (verificati qui)

| # | Cosa | Contatore |
|---|---|---|
| 135 | ti-cta.js non raddoppia più i banner (blog 33, esercizi 706, test 14) | 1 patch js |
| 136 | via la card u-appcta dalle scuole col banner completo | 406 pagine |
| 137 | via il bottone app ridondante dai libri | 81 pagine |
| 138 | card+footer privacy fr/de/es/pl tradotti · 7 bottoni «Start with A1» · 24 «Aloita» (finlandese!) su pagine filippine | 4+16+31 fix |
| 139 | stub del blog cancellati (tutti coperti dai 301 del worker) | 54 file |
| 140 | «tappa» primo screenshot: esercizi + banner piccolo scuole | 706+756 |
| 141 | showcase «Ti in action» in lingua (testata+piede erano inglesi ovunque), card tappa in testa, stelline+prezzo nell'eroe e nel big-cta | 325 landing |
| 142 | blocco prezzi (pastiglia verde) + stelline al bottone sugli esercizi | 706 |
| 143 | stelline accanto al bottone in grammatica | 840 |
| 144 | riga «★★★★★ App Store · da €5,83/mese» dentro le card compatte, 16 lingue | 230 card |
| 145 | test di livello: stelline al bottone + prezzo + oro standard | 15 |
| 146 | prezzo nel banner del blog (it/en/nl) | 237 articoli |
| 147 | oro unico #FFC93C ovunque (via il #FFC400) | 2.859 file |
| 148 | scuole/pl → screenshot inglesi (pl non è lingua dell'app) · pl fuori dallo swap · sitemap-immagini ricostruita dai file veri (via 01_edicola & co., dentro 08_tappa) | 75 pag + 189 voci |
| 149 | verifica jpg+webp di /assets/store — **lancialo tu in locale**, qui gli asset non c'erano | exit 1 se mancano |

## Ordine dei banner ora, ovunque
titolo → testo → **stelline #FFC93C** → occhiello/prezzo (**€5,83 in evidenza**) → bottone.
Scuole: banner grande + piccolo restano entrambi, come concordato.

## Dopo il deploy, tre controlli a mano
1. `python3 149-verifica-store.py .` dalla cartella con /assets: se mancano jpg
   (specie 08_tappa, 11_esame, 14_report in ar/bn/pt/ro/uk/zh) lo swap di lingua
   resta muto per quei file — è il «blocco» che cercavi.
2. Una landing /lingue/ in zh o ar sul telefono: card «tappa» prima, prezzo sotto il bottone.
3. Un articolo blog: un solo box app in fondo (il blocco libri può esserci: è voluto).

Nota: le «prima di prenotare» de/fr non avevano nulla di visibile che mancava
(solo stili inutilizzati nel head): lasciate stare.
