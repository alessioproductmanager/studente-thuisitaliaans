# Audit SEO — thuisitaliaans.com

Basato su ispezione diretta di home, `/esercizi/`, `/blog/`, `/app-ti`, e su
un'analisi delle SERP olandesi e delle schede Google nel corridoio Ede–Amsterdam.

---

## Cosa non so, e che nessun audit può sapere dall'esterno

Prima di tutto il resto, perché cambia il peso di ogni conclusione qui sotto.

- **Non ho accesso a Search Console.** Non conosco il tuo traffico organico,
  le tue posizioni, le query che già converti, né quali pagine hanno backlink.
- **Non ho un crawler.** `robots.txt` e `sitemap.xml` non sono riuscito a
  leggerli. I JSON-LD del sito non li vedo perché l'estrattore rimuove gli
  `<script>`: quando scrivo "manca lo schema" è un'ipotesi, non una verifica.
- **Non ho volumi di ricerca.** Quando scrivo "poco competitiva" è un giudizio
  basato su chi occupa la prima pagina, non su un numero.
- **Il motore che ho usato non è Google.** L'ordine dei risultati può differire.

Per questo non do un punteggio numerico: sarebbe precisione finta. I punti
sotto sono ordinati per impatto stimato, non misurato.

---

## 1. Il blog è un passivo, non un patrimonio

**Il problema più grande del sito, e l'unico che può danneggiare tutto il resto.**

Nella sola categoria "Italian Classes" del 2023 ci sono almeno 25 post che
dicono la stessa cosa con titoli riformulati. È il profilo tipico che
l'Helpful Content system declassa, e l'effetto è **a livello di dominio**:
trascina giù anche i 706 esercizi, che sono contenuto buono.

Finché quel cluster è indicizzato, ogni pagina nuova parte in salita.

→ Istruzioni operative in `CONSOLIDAMENTO.md`. Pillar consegnati:
`/waarom-thuis-italiaans` e `/why-thuis-italiaans`.

**Correzione a un consiglio che ti avevo dato:** i tre post principali da
consolidare sono in inglese, e un `canonical` fra lingue diverse Google lo
ignora. Per questo il pillar è doppio, con hreflang reciproco.

---

## 2. Canonical disallineati su ~900 pagine

`/esercizi/index.html` dichiara canonical su sé stesso, ma Cloudflare serve
`/esercizi`. Stesso disallineamento su `/blog/` e `/app-ti`.

Stai dicendo a Google che l'URL buono è uno e servendogliene un altro. Su
scala di sito è un rumore di fondo costante.

→ Allinea i canonical alla forma **senza estensione**, lascia i `.html` come
301 in ingresso. Nessun URL viene rinominato.

---

## 3. Le 15 lingue di `/app-ti` sono invisibili a Google

Il selettore SQ / AR / BN / ZH / DE / EN / ES / FR / IT / NL / PT / RO / TL /
TI / UK è client-side su un URL solo, con un canonical solo. Google indicizza
l'italiano e basta.

Tutto il lavoro di traduzione dell'app non produce una singola pagina
indicizzabile. È lo spreco più grosso del sito in rapporto allo sforzo già fatto.

→ Servono URL distinti (`/app-ti/en/`, `/app-ti/ar/`…) con hreflang reciproco.

---

## 4. Sito trilingue senza un solo hreflang

Home in olandese, esercizi e blog in italiano, metà dei post in inglese,
alcuni in olandese. Nessuna segmentazione, nessun `hreflang`.

Caso concreto: `leer-overal-italiaans-online-lessen-...` e
`impara-litaliano-ovunque-lezioni-...` sono lo stesso articolo, stessa data,
due lingue, zero collegamento reciproco. Si cannibalizzano.

---

## 5. Indici monolitici, zero hub crawlabili

`/esercizi/` renderizza tutte le 706 schede in una pagina sola. `/blog/` tutti
i ~200 post. Conseguenze:

- LCP e INP pessimi su mobile
- i filtri (Livello, Focus, Tipo) sono client-side, quindi **non esiste un URL
  per "esercizi A1" o "cruciverba italiano"** — proprio le query dove potresti
  vincere

→ Hub statici **aggiuntivi**: `/esercizi/a1/`, `/esercizi/cruciverba/`,
`/esercizi/verbi/`. Aggiungere, non rinominare.

---

## 6. Local SEO: il vantaggio più grande, quasi tutto inutilizzato

Dalla competitor analysis, il quadro reale:

| Zona | Concorrenza | Verdetto |
|---|---|---|
| **Ede** | Mille Parole (scheda Google vuota: 0 recensioni, 0 orari) · Cultura Ede (corso base tenuto da un traduttore olandese) | **Campo aperto** |
| **Amersfoort** | Dante Alighieri (volontari, solo serale a Hoevelaken, partenze fisse) · Volksuniversiteit (gruppi, solo A1–B2) | **Quasi aperto**, buco su privato e C1–C2 |
| **Utrecht** | De Luca 4,9/27 · Accademia Avanzi · Heart of Language 4,7/25 · Babel · Volksuniversiteit · Kookoovaja 5,0/46 | **Duro** — solo nicchie |
| **Amsterdam** | Taalhuis Amsterdam (partner Dante Alighieri) + Augusta, Alfabeto, La Moka, Istituto Italiano di Cultura | **Non attaccare frontalmente** |

Nessun NAP sul sito, nessun profilo Google Business. Con 24 testimonianze da
migrare e un concorrente dormiente a Ede, quella è la vittoria più veloce
disponibile su tutto il progetto.

→ `GOOGLE-BUSINESS.md`, landing Ede e Amersfoort consegnate.

---

## 7. Il posizionamento è sotto-sfruttato, e non è quello che sembra

Ho guardato cosa usa la concorrenza: Babel, Volksuniversiteit, Taalhuis,
Dante Alighieri, Accademia Avanzi — **tutti lavorano con un lesboek commerciale.**

Nel campione olandese non esiste un concorrente con materiale didattico
proprietario. Tu hai 706 esercizi, un'app con percorso A1–C2, classici
graduati e un dizionario in 14 lingue.

**Questo è il differenziatore, non "native docent"** — madrelingua lo sono anche
Luca, Angela, Valentina, Paola. E non è nemmeno "piccola scuola specializzata":
su quel terreno perdi contro chi ha sedi, staff e decine di recensioni.

Il secondo differenziatore è la **trasparenza sui prezzi**. La recensione più
negativa che ho trovato su una scuola della zona riguarda esattamente
l'opposto: intake a pagamento e nessuna informazione prima.

---

## 8. Nicchie vuote, verificate

**CILS / CELI / PLIDA in olandese** — SERP occupata da coLanguage (wiki
sottile), Italstudio ed ESL (agenzie di viaggi-studio), un post di Superprof
e profili Preply. Nessun insegnante basato in Olanda la presidia.
→ Pagina consegnata. Nota: nel testo è scritto esplicitamente che non sei
esaminatore, perché su Preply ci sono docenti con DITALS-II ed esaminatori
PLIDA certificati.

**Niveautest** — qui **mi correggo**: ti avevo detto che era terreno vergine.
Non lo è. Ce l'hanno EF, Cursito, Italstudio, 17-minute-languages, ESL, Babel,
Dit is Italiaans. Sono tutte deboli (20-40 domande, spesso ferme all'A2, o
dietro iscrizione al corso), quindi l'idea regge — ma come *versione migliore
di una cosa esistente*, non come land grab. Aspettative sui backlink
ridimensionate di conseguenza.

---

## 9. Errori puntuali

| Dove | Problema |
|---|---|
| Home | `og:image` relativo → anteprima social rotta |
| Home | "afwisselend **og** bieden" → refuso, dovrebbe essere "en" |
| Home | `<title>` senza keyword né geografia |
| Home | Nessun NAP: indirizzo e telefono assenti ovunque |
| `/blog/` | Logo con path relativo → risolve a `/blog/assets/...`, **immagine rotta** |
| Titolo post | "in **Nederlands**" → dovrebbe essere "Nederland" |
| Recensioni | 7 su 24 troncate; Enrique perde tutta la parte italiana |
| Ovunque | `meta-keywords`, ignorato dai motori dal 2009 |
| Social | og:image è l'icona 512 quadrata, tagliata male da `summary_large_image` |

---

## 10. Una cosa da NON fare, proposta da tutti e tre gli audit esterni

**Review schema.** Dal 2019 Google esclude dai rich result le *self-serving
reviews* — quelle che l'azienda raccoglie e ospita sul proprio sito. Marcare le
tue 24 testimonianze con `Review` o `AggregateRating` non ti darà mai le
stelle, e un `AggregateRating` sull'organizzazione è tra le cause tipiche di
manual action per structured data spam.

Le stelle arrivano **solo** da Google Business. Le recensioni sul sito servono
a convertire chi è già arrivato, non a farlo arrivare.

Per lo stesso motivo, in nessuna delle pagine che ti ho consegnato c'è un
blocco `Review`.

---

## Stato del lavoro

### Consegnato

- `ti-cta.js` — CTA per livello + banner app in 15 lingue, autoinserito
- `recensioni.json` — 24 recensioni complete
- `icone.svg.html` — sprite per togliere le emoji funzionali
- Landing: Ede, Amersfoort, `italiaans-online-leren`, `tarieven`
- Sei pagine livello A1–C2 (sbloccano il CTA per livello)
- `cils-celi-plida-nederland`
- Pillar `waarom-thuis-italiaans` + `why-thuis-italiaans` con hreflang
- `GOOGLE-BUSINESS.md`, `CONSOLIDAMENTO.md`

### Blocca il resto

1. **Consolidamento dei ~25 duplicati** — la cosa a più alto impatto, e l'unica
   che nessuno dei tre audit esterni ha nominato
2. **Canonical allineati** su tutto il sito
3. **Google Business Profile**
4. Compilare i placeholder (prezzi e dati di contatto) e i titoli dei romanzi
   nelle sei pagine livello

### Dopo

5. Hub crawlabili negli esercizi
6. hreflang e URL per lingua sull'app
7. Utrecht (solo privéles/zakelijk) e Amsterdam (online-first)
8. `zakelijk-italiaans`, `italiaans-voor-kinderen`, `italiaanse-conversatieles`
9. Niveautest, e solo dopo la cattura email
10. Backlink: ciaotutti.nl (il Gelderland non è rappresentato nella loro
    directory), Italstudio — che ha sede a Ede e non è un concorrente —
    Springest, e i profili Apprentus e Preply che devono linkare al sito

---

## Come misurare, fra tre mesi

Senza baseline non si valuta niente. **Prima di pubblicare**, salva da Search
Console: impressioni totali, clic totali, CTR medio, numero di pagine
indicizzate, e le posizioni per `Italiaanse les Ede`, `Italiaanse les
Amersfoort`, `privéles Italiaans`, `Italiaans leren online`.

Nelle prime settimane dopo il consolidamento **le impressioni caleranno**.
È il comportamento atteso: stai togliendo dall'indice pagine che generavano
impressioni senza clic. Guarda il CTR e le posizioni, non il volume grezzo.
