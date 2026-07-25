# Riorganizzazione — cosa è successo e cosa devi decidere

## 1. Prima di tutto: quasi tutto quello che ti avevo mandato esisteva già

Aprendo lo zip ho scoperto che il sito è molto più costruito di quello che si
vede da fuori. Avevi **già fatto** quasi tutte le pagine che ti ho "consegnato",
e le tue sono più sviluppate delle mie.

| Tua pagina | byte | Mio duplicato | byte |
|---|---:|---|---:|
| `waarom-thuis-italiaans.html` | 10.335 | stesso nome | 9.305 |
| `zakelijk-italiaans.html` | 11.918 | stesso nome | 10.309 |
| `italiaans-voor-beginners.html` | 12.555 | stesso nome | 10.566 |
| `italiaans-voor-kinderen.html` | 12.141 | stesso nome | 10.203 |
| `tarieven.html` | 12.757 | stesso nome | 8.689 |
| `italiaans-online.html` | 11.959 | `italiaans-online-leren.html` | 10.668 |
| `conversatieles-italiaans.html` | 12.048 | `italiaanse-conversatieles.html` | 10.297 |
| `italiaans-examen-certificaat.html` | 12.820 | `cils-celi-plida-nederland.html` | 13.923 |
| `italiaanse-les-ede-utrecht.html` | 12.213 | Ede + Utrecht + Amersfoort separate | 11.071 |

Idem per le pagine di livello: le hai già in **tre lingue**
(`libri-italiano-facile-*`, `italiaanse-boeken-*`, `italian-books-*`), e anche
la struttura `/it/` e `/en/` che ti avevo detto che mancava.

**Non ho sovrascritto niente.** Le mie versioni stanno in `_lavoro/proposte/`,
fuori dal deploy. Confrontale e prendi quello che ti serve, ma il default
sensato è tenere le tue.

Questo significa anche che il mio audit era sbagliato su alcuni punti: dicevo
che mancavano hreflang e struttura per lingua, e in buona parte ci sono. Quello
che avevo visto dall'esterno era solo la home.

## 2. Cosa ho integrato davvero

Solo ciò che non avevi:

```
lessen/italiaanse-les-bennekom.html      niveaus/libri-italiano-facile-c2.html
lessen/italiaanse-les-wageningen.html    lessen/why-thuis-italiaans.html  (versione EN)
lessen/italiaanse-les-veenendaal.html    js/ti-cta.js
lessen/italiaanse-les-barneveld.html     css/supplemento.css
lessen/italiaanse-les-arnhem.html        assets/icone.svg.html
                                         _lavoro/dati/recensioni.json
```

Nota: le cinque pagine città nuove usano ancora il **mio** guscio. Prima di
pubblicarle, allineale al markup delle tue (`italiaanse-les-amsterdam.html` è
un buon modello) oppure incolla header e footer nei generatori in
`_lavoro/strumenti/`.

`why-thuis-italiaans.html` ha `hreflang` verso `waarom-thuis-italiaans`:
verifica che la tua pagina NL abbia il rimando reciproco, altrimenti Google
ignora la coppia.

## 3. Le cartelle

```
ROOT — solo l'essenziale
  index.html
  app-ti · app-support · app-privacy · app-termini
  website-privacy
  boeken.html · books.html · libri.html          (home dei sotto-siti)
  books-privacy · libri-privacy
  robots.txt · sitemap.xml · llms.txt · wrangler.jsonc

lessen/     15 pagine servizio NL (le tue 10 + 5 nuove)
niveaus/    16 pagine di livello (IT + NL + EN)
_lavoro/    documenti, script, proposte — NON pubblicato

già organizzate, non toccate:
  esercizi/  libri/  boeken/  books/  lingue/  it/  en/  blog/
  assets/  css/  js/
```

La root passa da **46 voci a 20**.

## 4. Nessun URL è cambiato

Questo è il punto importante. `/zakelijk-italiaans` continua a rispondere 200
anche se il file ora è in `lessen/`. Il Worker lo risolve.

Ho patchato `js/index.js` aggiungendo `risolviAsset()`, che cerca il documento
in root, poi in `lessen/`, poi in `niveaus/`. Le cartelle già organizzate e i
file statici passano diretti, senza costo.

Quindi: **niente 301, nessun backlink perso, sitemap invariata.**

Se un giorno vuoi che gli URL riflettano le cartelle (`/lessen/tarieven`),
si può fare — ma è una decisione separata che richiede 301 e aggiornamento
della sitemap. Oggi non serve.

## 5. Avevi cinque file di lavoro pubblici su internet

Con `assets.directory: "."` **tutto** ciò che sta nel repo viene servito.
Erano scaricabili da chiunque:

```
/AUDIT-FINALE.md          ← analisi con nomi dei concorrenti
/GOOGLE-BUSINESS.md
/CONSOLIDAMENTO.md
/DA-COMPILARE.md          ← elenco di dati riservati da inserire
/README.md
/dati/recensioni.json
/strumenti/genera-livelli.py
/css/landing.css
```

Ora sono in `_lavoro/`, e ho aggiunto `.assetsignore` che esclude
`_lavoro/`, `*.md`, `*.py`, `strumenti/`, `dati/`.

**Verifica dopo il deploy** che `https://thuisitaliaans.com/AUDIT-FINALE.md`
dia 404. Se dà ancora il file, la tua versione di Wrangler non legge
`.assetsignore`: in quel caso sposta `_lavoro/` fuori dalla cartella del
progetto.

`css/landing.css` l'ho cancellato: era il tema che mi ero inventato.

## 6. Da fare adesso

- [ ] `npx wrangler deploy` e verifica che 4-5 URL vecchi rispondano 200
      (`/tarieven`, `/zakelijk-italiaans`, `/libri-italiano-facile-b1`,
      `/italiaanse-boeken-a2`, `/italian-books-c1`)
- [ ] Verifica che i `.md` diano 404
- [ ] Aggiungi le 6 pagine nuove a `sitemap.xml` (1.220 URL, ora ne mancano 6)
- [ ] Allinea il markup delle 5 città nuove alle tue
- [ ] Confronta `_lavoro/proposte/` e cancella quello che non ti serve
- [ ] `ti-cta.js`: prima di attivarlo, controlla che punti agli URL giusti —
      in `CFG.libri` ci sono `libri-italiano-facile-{a1..c2}`, che ora esistono
      tutti e sei

## 7. Cosa NON ho toccato

`index.html`, le pagine app, le legali, `boeken.html`/`books.html`/`libri.html`,
`robots.txt` (che è fatto molto bene), `sitemap.xml`, e tutte le cartelle
già organizzate — comprese `blog/`, che non era nello zip e resta dov'è.
