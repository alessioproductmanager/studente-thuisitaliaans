# Audit finale — thuisitaliaans.com

## 1. Recensioni

Non ne mancavano. Sono 24 sul sito e 24 nel testo che hai fornito. **Sette però
sono troncate online**, alcune pesantemente:

| Recensione | Cosa manca |
|---|---|
| Enrique | Apertura ("on Preply") + **tutta la versione italiana** |
| Susan | La parte su tecnologia e disponibilità, e la chiusura |
| Amy | "through a variety of activities and games" + la frase finale sulla gioia di vedere la figlia imparare |
| Germaine | Metà: metodo, personalizzazione, "I feel like I'm really using my brain" |
| Marie | Chiusura ("I would definitely recommend…") |
| Fadz | "it is very interactive" |
| Johan & Inte | Frammento centrale |

Testo completo in `recensioni.json`, senza emoji, con codice ISO paese ed
etichetta testuale in NL e IT.

**Tre cose da verificare prima di pubblicare:**

- **Matthijs**: sul sito è 🇧🇪 (Belgio), nel tuo testo 🇳🇱. Ho messo NL.
- **"Katrzyna"**: quasi certamente refuso per *Katarzyna*.
- **Enrique**: la parte italiana contiene "sui Preply" e "É grandissimo"
  (dovrebbero essere "su Preply" e "È"). Sono parole dello studente —
  correggerle significa alterare una citazione. Decidi tu: lasciarle,
  correggerle silenziosamente, o pubblicare solo la parte inglese.

**Nota importante sui rich result:** le recensioni ospitate sul tuo sito non
sono idonee alle stelle nei risultati Google (policy sulle *self-serving
reviews*). Il markup `AggregateRating` su `/` non ti darà stelle. Quello che
funziona: attribuire ogni recensione alla piattaforma d'origine (Preply,
italki, Apprentus) e portare le persone a lasciare recensioni su Google
Business. Nel JSON c'è già il campo `fonte`.

---

## 2. Emoji → icone

`icone.svg.html` contiene lo sprite con 27 simboli e la mappatura completa.

Le emoji sul sito sono di tre tipi e vanno trattate diversamente:

1. **Funzionali** (tipo di esercizio: 📝 🧩 🔎 🃏 …) → sostituire con icona SVG
   **più etichetta testuale**. Un'icona da sola non comunica "cruciverba".
2. **Decorative** (🎨 🐾 🥑 💡 🎯 🗳️ 🏘️ nei post) → **eliminare e basta**.
   Non servono a niente e su alcuni sistemi non renderizzano.
3. **Bandiere** (🇵🇪 🇬🇧 🇳🇱 …) → **non** usare icone. Usa il nome del paese in
   testo. Le bandiere emoji non esistono su Windows (si vedono come "PE", "GB")
   e uno screen reader legge "bandiera del Perù" in mezzo a un nome proprio.
   Nel JSON hai `paese_nl` e `paese_it` pronti.

Le stelle ★★★★★ vanno sostituite con `#ti-stella` ×5 dentro un contenitore con
`aria-label="5 stelle su 5"`. Ora sono caratteri Unicode senza etichetta:
lo screen reader legge "stella stella stella stella stella".

Bonus dal tuo vecchio contenuto: le immagini rating avevano **alt vuoto**.
Passando alle icone il problema sparisce.

---

## 3. Refusi ed errori

| Dove | Ora | Deve diventare |
|---|---|---|
| Home, "Ciao, ik ben Alessio" | "afwisselend **og** bieden" | "afwisselend **en** bieden" |
| Titolo post blog | "…te Leren in **Nederlands**" | "…te Leren in **Nederland**" |
| Home, `<title>` | "Thuis Italiaans \| Persoonlijke Italiaanse lessen" | "Italiaanse les in Ede, Utrecht & Amsterdam \| Thuis Italiaans" |
| Home, `og:image` | `assets/icons/og-image.png` | URL assoluto |
| Recensioni | Katrzyna | Katarzyna (da verificare) |

Il title nuovo tiene la keyword principale e le due città a più alto valore.
Amsterdam sta in fondo perché è la più competitiva: è la landing dedicata che
deve puntarci, non la home.

---

## 4. Home in 14 lingue

Questo è il pezzo più delicato, perché è facile farlo in un modo che **non
serve a niente**. La pagina `/app-ti` ha già un selettore 15 lingue, ma è
client-side su un solo URL: Google indicizza solo l'italiano. Ripetere quello
schema sulla home moltiplicherebbe il lavoro senza nessun guadagno.

**Architettura corretta:**

```
/                     → nl   (resta dov'è, è il mercato principale)
/en/                  → en
/de/  /fr/  /es/  /it/  /pt/  /ro/  /sq/  /uk/  /ar/  /zh/  /bn/  /tl/  /ti/
```

Su ogni versione, nel `<head>`:

```html
<link rel="alternate" hreflang="nl" href="https://thuisitaliaans.com/">
<link rel="alternate" hreflang="en" href="https://thuisitaliaans.com/en/">
<link rel="alternate" hreflang="de" href="https://thuisitaliaans.com/de/">
<!-- … tutte e 14, su ogni pagina, incluse le altre versioni … -->
<link rel="alternate" hreflang="x-default" href="https://thuisitaliaans.com/en/">
```

Regole che si sbagliano quasi sempre:

- L'`hreflang` deve essere **reciproco**: se NL punta a DE, DE deve puntare a NL.
  Se manca il ritorno, Google ignora tutto il gruppo.
- Ogni versione ha **canonical su sé stessa**, non sulla home olandese.
- `<html lang="…">` e `dir="rtl"` per l'arabo.
- **Nessun redirect automatico** in base alla lingua del browser: blocca
  Googlebot (che striscia da IP USA) e infastidisce chi vuole l'altra versione.
  Al massimo un banner che *suggerisce*, come fa `ti-cta.js`.
- La lingua principale (`/`) resta nl e il selettore va nell'header, non nascosto.

**Domanda di priorità, onestamente:** le 14 lingue hanno senso per l'app, che
si rivolge a stranieri e migranti in Italia. Per le **lezioni** il mercato è
NL, e in seconda battuta EN. Prima di tradurre 14 volte una pagina che vende
lezioni in presenza fra Ede e Amsterdam, farei nl + en + it, e userei l'energia
rimanente sulle pagine città e sulla niveautest. Se invece la home deve
diventare la vetrina dell'app più che delle lezioni, allora 14 ha senso —
ma è una decisione di posizionamento, non di SEO.

---

## 5. Riepilogo: stato dopo questi interventi

**Risolto**
- CTA libri per livello (non più sempre A1)
- Banner app nella lingua del browser, senza analytics
- Recensioni complete
- Emoji rimosse
- Refusi, title, og:image

**Ancora aperto, in ordine di impatto**
1. Consolidamento dei ~25 post duplicati (canonical / noindex, senza cambiare URL)
2. Canonical allineati agli URL serviti su tutto il sito
3. Pagine libri A2–C2 (senza queste il CTA per livello punta a pagine inesistenti)
4. Pagine città + pagine trasversali (zakelijk, kinderen, conversatie)
5. `/italiaans-online-leren`, `/proefles`, `/tarieven`
6. Niveautest A1–C2 in olandese
7. hreflang e versioni per lingua
8. Google Business Profile
9. Spezzare gli indici monolitici (706 esercizi / ~200 post su una pagina)

Il punto 3 è bloccante per una cosa che stiamo già consegnando: crea quelle
cinque pagine prima di pubblicare il CTA per livello.
