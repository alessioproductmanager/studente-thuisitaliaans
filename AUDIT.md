# Audit thuisitaliaans.com — 2844 pagine

Due script, sola lettura, nessun file toccato:

- `140-audit.py` — inventario di barra, piede, lingua, identità, SEO, immagini → `audit.json` + `audit.md`
- `141-link.py` — controllo link che **ricostruisce il worker** (`REDIRECT_301`, `CARTELLE_INTERNE`, `CARTELLE`, `PASSANTI`) invece di indovinare → `link.json`

```
python3 140-audit.py --radice .
python3 141-link.py .
```

---

## 0. La prima notizia è buona

**Zero link interni rotti.** Su 174.800 link risolti col routing vero del worker,
nessun 404. Solo **7 link** passano da un 301 evitabile.

Con `assets/` sul tavolo il conto regge: le 168 "rotte" che restano sono tutte
dentro `assets/scuola_cartoline/*/_snippet.html`, che sono modelli di
generazione e non pagine servite. Le 11.907 assenti sono `assets/store/`, che
non mi hai mandato ma che in produzione c'è.

Quindi il problema **non è che qualcosa è rotto. È che ci sono sette siti diversi
sotto lo stesso dominio.**

---

## 1. Le cinque sezioni che vuoi, e cosa c'è al loro posto oggi

| sezione che vuoi | pagine | barre | piedi | link barra | link piede | verso l'app |
|---|---|---|---|---|---|---|
| **1 lezioni** (`/`, lessen, it, en, niveaus) | 88 | `.header` 82px | sitemap 4 colonne | 63 | **78** | **9%** |
| **2 app ti** (app, lingue) | 363 | `.header` + `.lang-topbar` | 2 varianti | 3,7 | **5** | 88% |
| **3 test livello** | 15 | `.testata` | riga sola | 10 | 11 | 100% |
| **4 blog + esercizi** | 1005 | `.ex-topbar` + `.blog-topbar` | 2 varianti | **4,8** | 61 / 11 | **99%** |
| **5 scuole** | 1281 | `.testata` (solo lingue) | crediti foto | 16 | **1** | **0%** |
| *libri/boeken/books* | 84 | `.sito` | riga sola | 17 | 1,9 | **0%** |

**Sette sistemi di barra e cinque di piede.** Nessuno condivide markup con un altro.

Le due colonne a destra sono il punto: sulle **lezioni** il piede ha 78 link e la
barra 63 — 141 link per una sezione di 88 pagine. Su **blog+esercizi**, che fanno
il 99% delle CTA e il grosso del traffico, la barra ha **due link**. È esattamente
rovesciato rispetto al valore.

---

## 2. Dove sono i buchi veri

**scuole — 1281 pagine, il 45% del sito, il piede non è un piede.**
È un blocco di crediti fotografici Wikimedia più un disclaimer. Contiene **un
solo link interno** (un `mailto:` di segnalazione). Niente navigazione, niente
privacy, niente KvK, niente copyright, **niente app**. La barra è il logo più
sette sigle di lingua. 406 di queste pagine non hanno nessuna via verso l'app;
sulle altre 875 il link store c'è ma nessun blocco `ti-cta`.

**lingue — 303 pagine, il piede è di 2 link.**
Sono le pagine con più impressioni del sito. Il piede dice "Ti — 14 languages"
e due link. Un vicolo cieco su ogni pagina.

**libri/boeken/books — 84 pagine, zero e zero.**
Nessun `ti-cta`, nessun link store, piede da 1,9 link. È l'unica famiglia di
pagine che non porta da nessuna parte.

**test-livello — 16 traduzioni, nessun modo di raggiungerle.**
Ha 16 `hreflang` e nessun selettore di lingua visibile in pagina. Sedici pagine
costruite e invisibili l'una all'altra. (Confermo il punto del documento allegato.)

**blog+esercizi — 1003 pagine su 1005 senza `hreflang`.**
La barra è "←︎ Torna al sito" + "Prova gratuita →". Due link, e la CTA punta
alle lezioni, non all'app, mentre il 99% delle pagine ha già il blocco app nel corpo.

---

## 3. I difetti puntuali (piccoli, ma sono quelli che vedi)

| cosa | dove | quante |
|---|---|---|
| logo della home con `href="#"` | `index.html` | 1 |
| `href="/./"` nella barra e nel piede | `app/`, `app-ti.html` | **285** |
| pagine con `<style>` incorporato | ovunque | **2843** |
| attributi `style=` in linea | scuole 12.033, app 1.939 | **15.213** |
| `<h1>` multipli | app 45, scuole 7 | 52 |
| `<h1>` assente + canonical assente | blog (stub 301) | 54 |
| `noindex` ancora spediti | blog 89, libri 3 | 92 |
| immagini senza `loading=lazy` | tutte le sezioni | 3053 |

I 54 stub del blog senza H1 né canonical sono le pagine già mappate in
`REDIRECT_301`: vengono servite dal worker come 301, ma i file continuano a
partire nel deploy. Sono peso morto.

---

## 4. Le tre misure che fanno sembrare tutto diverso

| | barra | bottone | menu |
|---|---|---|---|
| lezioni, app | **82px** | `padding:16px 30px` | `gap:40px` |
| blog, esercizi | **74px** | `padding:11px 22px` | — |
| lingue | **~58px** | `padding:11px 22px` | — |
| scuole, test | ? (`cartoline.css`, non nello zip) | — | — |

Ecco i "pulsanti enormi": il `.button` di `style.css` è **il 45% più grande** di
quello di blog/esercizi/lingue, sulle pagine che hanno già la barra più alta e il
menu più largo. Su `app-ti.html` c'è pure una CTA a due righe (`cta-due-righe-v1`)
che è ancora più alta. Tre altezze di barra e due taglie di bottone sulla stessa
identità.

---

## 5. Il selettore lingua: quattro meccanismi

| sezione | hreflang max | pagine senza hreflang | meccanismo |
|---|---|---|---|
| app | 16 | 40/363 | `selettore-lingua.js` 263 · `.lang-switcher` 60 · `.lang-hero` 39 |
| test | 16 | 0 | `selettore-lingua.js`, ma **non visibile in pagina** |
| scuole | 8 | 0 | `nav.lingue` — sigle nella barra |
| lezioni | 4 | 36/88 | `.footer-taal` + sotto-menu |
| libri | 4 | 0 | `selettore-lingua.js` |
| blog+esercizi | 3 | **1003/1005** | nessuno |

`selettore-lingua.js` è già caricato su **1652 pagine**. Il meccanismo unico
esiste già: quello che manca è che legga gli `hreflang` della pagina e si mostri
di conseguenza, invece di essere affiancato da altri tre.

---

## 6. Identità: il sistema c'è già, non è in pagina

I `theme-color` sono coerenti al 100% dentro ogni sezione:

```
lezioni      #31394d   blu ardesia      (70/88)
app          #31394d   blu ardesia      (363/363)
esercizi     #b07c1f   ambra            (707/707)
blog         #5e7357   salvia           (298/298)
scuole       #bc5533   terracotta       (1281/1281)
test         #2f6b3a   verde            (15/15)
libri        #2b4a7a   blu              (78/84)
```

Non compaiono da nessuna parte se non nella barra del browser su mobile.
La favicon di sezione esiste solo per **scuole** e **libri**; le altre puntano
tutte alla generica.

Questo è il perno, e sono d'accordo col documento allegato: **non c'è da inventare
un'identità visiva, c'è da portare in pagina quella che hai già deciso.**

---

## 7. SEO

- **945 title oltre 60 caratteri** — 818 sono scuole. Su mobile Google taglia a ~55.
- **1 title assente**, **14 description assenti**, **423 description fuori 70-165**
- **127 pagine** condividono una description con un'altra pagina (22 testi ripetuti)
- **335 pagine HTML fuori dalle sitemap** — 119 scuole (tutte le `scuole/regione/*`),
  89 blog (gli stub, giusto che siano fuori), 67 lezioni, 56 app, 3 libri privacy
- **210 pagine con zero link entranti** — 56 sono tutte le traduzioni di
  `app/app-privacy-*`, `app-termini-*`, `app-support-*`: esistono, sono in
  sitemap, ma nessuna pagina del sito ci porta

---

## 8. La cartella assets

2428 file, **331,8 MB**. Di questi, **135,1 MB non li cita nessuno**: stanno nel
deploy, li serve Cloudflare, e non li chiede nessuna pagina.

| cartella | file | peso | citati | **orfani** |
|---|---|---|---|---|
| `assets/scuola_cartoline/` | 1422 | 212,1 MB | 1226 | **196** (20,1 MB) |
| `assets/screenshots/` | 135 | **100,6 MB** | 0 | **135** (tutti) |
| `assets/test/` | 38 | 13,4 MB | 0 | **38** (tutti) |
| `assets/books/` | 76 | 3,2 MB | 76 | 0 |
| `assets/qr/` | 706 | 1,2 MB | 706 | 0 |
| `assets/icons/` | 37 | 0,3 MB | 12 | **25** |

**`screenshots/` è il grosso: 100,6 MB, zero riferimenti.** Sono i master
1320×2868 per l'App Store. Nel deploy del sito non servono: le pagine usano
`store/` (600×1298, già dimensionato per il web). Sono un terzo del peso del
sito, pubblicamente raggiungibili, e non li usa niente. Stessa storia per
`test/` (13,4 MB) e per 196 cartoline rimaste da versioni precedenti (20,1 MB).

**Le icone di sezione: generate, e mai collegate.** `119_icone_sezioni.py` ha
prodotto tre serie complete — libri, scuole, test-livello — di nove file
ciascuna. Collegate: tre di scuole e tre di libri. La serie **test-livello è
intera e inutilizzata**, e infatti quelle 15 pagine non hanno nessuna favicon.
Anche le `og-image.png` di sezione — l'immagine che si vede per prima quando
condividi un link su WhatsApp — non le usa nessuno.

**Formati doppi**: 715 jpg (130,9 MB) e 679 webp (96,1 MB). Giusto se l'HTML usa
`<picture>` col ripiego; da controllare che sia così ovunque, perché altrimenti
sono 130 MB spediti per niente.

Il conto: **135 MB su 331 MB del deploy non li chiede nessuno.** Non è un
problema di correttezza — Cloudflare li serve e basta — ma è tempo di
pubblicazione e superficie inutile. È l'unica cosa che ti lascio da fare a mano,
perché cancellare file non è una cosa che faccio io di mia iniziativa.

---

## 9. Lo script: `135-unifica.py`

Uno solo, tre comandi, reversibile.

```bash
python3 135-unifica.py                 # indaga: dice cosa farebbe, non scrive
python3 135-unifica.py applica
python3 135-unifica.py verifica
python3 135-unifica.py togli           # torna indietro
```

**Cosa fa, misurato sulla tua copia:**

```
  pagine toccate ............ 2843
  testate sostituite ........ 2843     sette sistemi -> uno
  testate in piu' rimosse ...   29     pagine che ne avevano due
  piedi in piu' rimossi .....   28
  blocchi di licenza salvati  5095     CC BY-SA, disclaimer, recensioni
  link conservati nel piede . 25983    nessun link perso, vedi sotto
  CTA app inserite nel corpo   583     scuole 406 + libri 84 + lezioni 79
  serie di icone collegate ..   21     finalmente test-livello
  href="/./" riparati .......   60
```

**Le cinque configurazioni.** Una barra alta 64px ovunque (erano 82 / 74 / 58),
un bottone 11/22 ovunque (erano 16/30 e 11/22), colore e icona presi dal
`theme-color` che avevi già deciso. Un piede a tre colonne: questa sezione ·
l'app Ti (identica ovunque, è il punto di convergenza) · Thuis Italiaans.

**Il selettore lingua** legge i `<link rel="alternate" hreflang>` della pagina:
16 lingue sull'app e sul test, 8 su scuole, 4 sulle lezioni, e su una pagina
senza traduzioni non compare invece di comparire vuoto. Nessun elenco da
mantenere.

**Le CTA nel corpo, per pubblico** — stessa app, frase diversa:

| dove | cosa dice |
|---|---|
| scuole | *Prepara il livello prima di partire.* Arrivare in Italia già a un A2 cambia il corso che puoi permetterti |
| esercizi | *Hai sbagliato qualcosa?* Nell'app la stessa regola torna spiegata |
| blog | *Continua con un romanzo al tuo livello* |
| libri | *Il libro, e poi la voce* — ogni romanzo è anche nell'app, con audio |
| test | *Hai il tuo livello: comincia da lì* |
| lezioni | *Tra una lezione e l'altra* |

### Perché puoi lanciarlo senza paura

Ho fatto girare tutto su una copia delle tue 2843 pagine:

- **Zero link persi.** Ho confrontato il grafo dei link prima e dopo: 7779
  bersagli prima, 7781 dopo. L'unico sparito è `/./`, che era il bug. I link
  che il nuovo piede non mostra — le 27 città, i livelli dei libri, i badge di
  ProductHunt — finiscono in un `<details>` chiuso: **restano nell'HTML**, quindi
  Google li vede come prima. Cambia l'ingombro, non il grafo. Era il punto su
  cui ti avevo detto che non volevo tirare a indovinare.
- **Zero link rotti nuovi.** 168 prima, 168 dopo, e sono tutte dentro
  `assets/scuola_cartoline/*/_snippet.html`, che sono modelli, non pagine.
- **I blocchi di legge sopravvivono.** 5095 fra crediti CC BY-SA, disclaimer
  delle scuole, nota sulle recensioni e licenza del blog vengono estratti dal
  vecchio piede e rimessi tali e quali nel nuovo. Sono obblighi di licenza.
- **Non tocca ciò che non è arredo.** `<header class="pf-testa">` dentro il
  profilo del test e `<header class="lp-hero">` sulla landing restano dove sono:
  sono contenuto, non barre.
- **`togli` riporta indietro byte per byte.** Verificato con md5 su tutte le
  2843 pagine: identiche all'originale.
- **È idempotente.** Rilanciarlo dice "0 pagine, 2843 già a posto".
- **Non sposta niente.** Nessun file spostato, nessun URL cambiato, sitemap e
  worker intatti. `css/style.css`, `blog.css`, `esercizi.css`, `lingue.css` non
  li tocca: tolto il markup vecchio le loro regole diventano inerti da sole, e
  si ripuliscono con calma dopo.
- **Peso**: +1,2 MB su 160 MB di HTML, circa 430 byte a pagina.
- Il salvataggio sta in `.unifica/` e lo script scrive `.assetsignore` perché
  non finisca nel deploy.

### Dopo

```
  con la barra nuova ...... 2843
  col piede nuovo ......... 2843
  col selettore lingua .... 2843
  con una via verso l'app . 2843  (100,0%)
```

Da 2437 pagine su 2843 con una via verso l'app, a tutte.

---

## 10. Quello che resta da decidere

1. **`libri` l'ho messo dentro l'app**, con colore e icona sue (#2b4a7a, la
   serie già generata). Non è una sesta sezione: è la vetrina della collana, e
   la sua CTA è "il libro, e poi la voce". Se invece la vuoi a sé, si cambia una
   riga in `SEZIONI`.
2. **I 135 MB orfani in `assets/`**: `screenshots/`, `test/` e 196 cartoline.
   Dimmi se li tolgo dal deploy e ti scrivo lo script, oppure lo fai tu — ma
   cancellare file non lo faccio senza il tuo sì.
3. **I 92 `noindex`** ancora spediti (89 stub del blog già mappati in
   `REDIRECT_301`, 3 libri): il worker li serve già come 301, quindi i file non
   servono più.
4. **Le voci dei menu** sono in `VOCI_BARRA` e `VOCI_PIEDE` in cima allo script,
   in nl/it/en. Se una voce non ti convince si cambia lì, e si rilancia.
