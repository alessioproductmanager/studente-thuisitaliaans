# thuisitaliaans — pacchetto SEO

## Installazione: una riga

Copia `js/ti-cta.js` in `/js/` sul sito. Poi, prima di `</body>` nei template:

```html
<script src="/js/ti-cta.js" defer></script>
```

**Fine.** Niente HTML da incollare, niente CSS da aggiungere, nessun file
esistente da modificare. Lo script:

- inietta il proprio CSS
- capisce in che pagina si trova e sceglie il blocco giusto
- lo inserisce in fondo all'articolo
- legge la categoria dal link `category-…` già presente nel post
- traduce nella lingua del browser (15 lingue)

Nessun cookie, nessun localStorage, nessuna richiesta di rete, nessun analytics.
Legge solo `navigator.languages`, che non richiede consenso GDPR.

### Cosa appare, e dove

| Pagina | Blocco |
|---|---|
| `/blog/<post>` categoria `modi-di-dire` | Libri B1 |
| `/blog/<post>` categoria `cultura-italiana` | Libri A2 |
| `/blog/<post>` categoria `language-hacking` | Libri A1 |
| `/blog/<post>` categoria `reading-practice` | Libri B2 |
| `/blog/<post>` categoria `italian-classes` o `for-teachers` | App Ti |
| `/blog/` e `/blog/category-*` | niente |
| `/esercizi/*` | "E se ti portassi gli esercizi in tasca?" |
| tutto il resto | niente |

### Se vuoi decidere tu

Metti a mano un blocco in pagina e l'inserimento automatico si spegne:

```html
<aside data-ti-cta="libri" data-livello="C1"></aside>
<aside data-ti-cta="app"></aside>
<aside data-ti-cta="esercizi"></aside>
```

### Configurazione

Tutto in cima al file, oggetto `CFG`: URL dei libri, mappa categoria → livello,
colore, livello di default.

### Da rivedere

Traduzioni da far controllare a madrelingua: **bn**, **ti**, **tl**, **sq**.

---

## Prerequisito bloccante

Il CTA per livello punta a `libri-italiano-facile-{a1…c2}.html`.
**Esiste solo A1.** Crea A2, B1, B2, C1, C2 prima di pubblicare lo script,
altrimenti quattro categorie del blog su cinque linkano a un 404.

Se non fai in tempo, apri `ti-cta.js` e in `CFG.libri` fai puntare
temporaneamente tutti i livelli ad A1.

---

## Correzioni da fare a mano

Sono cinque, tutte di una riga.

### 1. Logo rotto sul blog

Su `/blog/` il logo usa un path **relativo**, quindi risolve a
`/blog/assets/icons/icon-512.png` — che non esiste. Sulla home e su
`/esercizi/` il path è corretto, per questo lì si vede.

```html
<!-- prima -->
<img src="assets/icons/icon-512.png" alt="Logo thuisitaliaans">
<!-- dopo -->
<img src="/assets/icons/icon-512.png" alt="Logo thuisitaliaans">
```

Controlla anche gli altri asset di `/blog/` (CSS, favicon): se uno è relativo,
probabilmente lo sono tutti.

### 2. Refuso home

Sezione "Ciao, ik ben Alessio": `afwisselend og bieden` → `afwisselend en bieden`

### 3. Refuso titolo post

`…Italiaans te Leren in Nederlands` → `…Italiaans te Leren in Nederland`

Cambia **solo il testo del titolo**, non lo slug: l'URL resta
`waarom-prive-en-kleine-groepslessen-…-in-nederlands.html`.

### 4. Title home

```html
<title>Italiaanse les in Ede, Utrecht &amp; Amsterdam | Thuis Italiaans</title>
```

### 5. Meta social home

```html
<meta property="og:url" content="https://thuisitaliaans.com/">
<meta property="og:image" content="https://thuisitaliaans.com/assets/icons/og-image.png">
<meta property="og:locale" content="nl_NL">
<meta property="og:site_name" content="Thuis Italiaans">
<meta name="robots" content="index, follow, max-image-preview:large">
```

L'`og:image` era relativo: l'anteprima social non caricava l'immagine.

---

## Recensioni

`dati/recensioni.json` — tutte e 24, complete. Sette erano troncate online:
Enrique (mancava tutta la parte italiana), Susan, Amy, Germaine, Marie, Fadz,
Johan & Inte.

Le bandiere emoji restano, come da tua indicazione: campo `bandiera`.
I campi `paese_nl` / `paese_it` ci sono comunque, se un giorno servissero.

Matthijs: **BE 🇧🇪**.

Da verificare: **"Katrzyna"** è quasi certamente un refuso per *Katarzyna*.

Nota: le recensioni ospitate sul tuo sito non danno stelle nei risultati Google
(policy sulle *self-serving reviews*). Mostra la piattaforma d'origine dove la
conosci — campo `fonte` — e porta le persone a recensire su Google Business.

---

## Icone

`assets/icone.svg.html` — sprite con 27 icone che sostituiscono le emoji
funzionali dell'indice esercizi e della home.

**Le emoji delle recensioni restano.** Sono l'unica eccezione.

Le emoji decorative dei post (🥑 💡 🎯 🗳️ 🏘️ 🌍) vanno tolte e basta,
senza sostituzione.
