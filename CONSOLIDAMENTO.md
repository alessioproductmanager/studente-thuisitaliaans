# Consolidamento blog — istruzioni per post

## La correzione che cambia l'esecuzione

Ti avevo detto: pillar unico + canonical dai duplicati. Sbagliato così com'era.

**I tre post da consolidare sono in inglese.** Google dice esplicitamente di
non usare `rel="canonical"` fra versioni in lingue diverse: un canonical
cross-language viene ignorato, o peggio, deindicizza la pagina inglese senza
consolidare niente.

Quindi il pillar è doppio:

| Pagina | Lingua | Ruolo |
|---|---|---|
| `/waarom-thuis-italiaans` | nl | Pillar per il mercato olandese |
| `/why-thuis-italiaans` | en | Bersaglio canonical dei duplicati inglesi |

Le due sono collegate da `hreflang` reciproco, già presente nei file.

---

## Passo 1 — Guarda i backlink prima di toccare qualsiasi cosa

Search Console → **Link** → *Pagine più collegate esternamente*.

Esporta e cerca gli URL dei duplicati. Serve una sola informazione per ognuno:
**ha almeno un backlink esterno da un dominio reale, sì o no?**

Non fidarti della memoria. Un post del 2023 può avere un link da un forum o
da una directory che non ricordi.

---

## Passo 2 — I tre post principali

### `/blog/duolingo-vs-individual-classes.html`
### `/blog/discovering-the-italian-language-beyond-just-an-app.html`
### `/blog/italian-private-classes-vs-group-classes-pros-and-cons.html`

Questi tre coprono esattamente il contenuto di `/why-thuis-italiaans`.

**Se hanno backlink** → resta 200, aggiungi nel `<head>`:

```html
<link rel="canonical" href="https://thuisitaliaans.com/why-thuis-italiaans">
```

e **riduci il corpo** a un abstract di 3-4 frasi con un link visibile in cima:

```html
<p><em>This article has been expanded and updated:
<a href="/why-thuis-italiaans">App, language school, marketplace or private
lessons?</a></em></p>
```

Il canonical è un *hint*. Se lasci 1.200 parole diverse dal pillar, Google lo
ignora. La riduzione non è opzionale: è ciò che lo rende credibile.

**Se non hanno backlink** → più semplice e più sicuro:

```html
<meta name="robots" content="noindex, follow">
```

Niente canonical. Non mettere mai canonical e noindex insieme sulla stessa
pagina: sono istruzioni contraddittorie e Google ne ignora una a caso.

---

## Passo 3 — Gli altri ~22 post "Italian Classes"

Sono quelli che dicono la stessa cosa con titoli riformulati: *Customized
Italian Courses*, *Discover Our Customized Italian Courses*, *Tailored Italian
Courses and Innovative Methodology*, *Master Italian with Tailored Language
Courses*, *Personalized Italian Language Courses*, *Engaging Personalized
Italian Language Courses*, *Learn Italian Online with Alessio*, *Mastering
Italian Online with Alessio*, *Discover the Joy of Learning Italian Online with
Me*, *Learn Italian Online with Confidence and, with Alessio!*, e così via.

Stessa regola, bersaglio diverso a seconda del contenuto:

| Contenuto del post | Canonical / noindex verso |
|---|---|
| Confronto con app, gruppi, piattaforme | `/why-thuis-italiaans` |
| Descrizione generica dei corsi | `/italiaans-online-leren` |
| Lezioni per bambini | la futura pagina `italiaans-voor-kinderen` |
| Italiano per il lavoro | la futura pagina `zakelijk-italiaans` |

Finché quelle due pagine non esistono, usa `noindex, follow` e basta: meglio
un noindex temporaneo che un canonical verso un 404.

---

## Passo 4 — Togli i duplicati dagli indici

Non basta il canonical. Vanno anche:

- [ ] rimossi dalla lista in `/blog/index.html`
- [ ] rimossi da `sitemap.xml` (nella sitemap va **solo** l'URL canonico)
- [ ] rimossi dalle pagine `category-italian-classes.html`

Un URL noindex dentro la sitemap è un segnale contraddittorio e compare come
errore in Search Console.

---

## Passo 5 — Aggiungi i pillar

- [ ] `/waarom-thuis-italiaans` e `/why-thuis-italiaans` in `sitemap.xml`
- [ ] Link dal menu o dalla home
- [ ] Link dalle landing Ede, Amersfoort, online (aggiungi un rimando)

---

## Cosa NON fare

- **Nessun 301.** Gli URL restano dove sono, come hai chiesto.
- **Non cancellare** nessun post. Un 404 butta via il backlink; un canonical
  o un noindex lo conserva.
- **Non fare tutto in un giorno.** Fai i tre principali, aspetta due settimane,
  guarda in Search Console cosa succede a impressioni e pagine indicizzate,
  poi procedi con gli altri.
- **Non aspettarti effetti in una settimana.** Il consolidamento si vede in
  sei-dieci settimane.

---

## Come capisci che ha funzionato

Search Console → **Indicizzazione delle pagine**:

- le pagine con canonical passano a *"Pagina alternativa con tag canonical
  appropriato"* — è lo stato corretto, non un errore
- le pagine noindex passano a *"Esclusa dal tag noindex"* — anche questo
  è corretto

Search Console → **Prestazioni**: le impressioni totali possono scendere nelle
prime settimane. È normale e atteso — stai togliendo dall'indice pagine che
generavano impressioni senza clic. Il segnale da guardare è il **CTR medio**
e le posizioni delle pagine rimaste.
