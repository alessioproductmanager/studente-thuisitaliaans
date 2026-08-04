# Patch 125-131 — ottimizzazione verso l'app

Sei script più uno di indagine. Tutti seguono lo stesso schema:

```bash
python3 NNN-nome.py            # indaga: dice cosa farebbe, non scrive
python3 NNN-nome.py applica
python3 NNN-nome.py togli      # torna indietro
```

Vanno lanciati dalla radice del sito, oppure con `--radice PERCORSO`.
Sono idempotenti: rilanciare `applica` non raddoppia niente.

**Verificato**: applicati tutti in sequenza su una copia del tuo sito
(2843 pagine) e poi tolti tutti, l'albero torna identico all'originale
file per file. Sintassi dei due JS validata con `node --check`.

## Ordine consigliato

```bash
python3 126-cta-app.py applica
python3 127-titoli.py applica
python3 128-banner-app.py applica
python3 129-occhiello.py applica
python3 130-riparazioni.py applica
python3 131-proposta-lingua.py applica
```

Prima di ognuno, lanciarlo senza argomenti per vedere cosa farà.

---

## Cosa fa ciascuno, e perché

### 125-indaga-screenshot.py — sola lettura
Inventario delle cartelle screenshot. Già usato: ha prodotto il
`screenshot.json` che mi hai mandato.

### 126-cta-app.py — 1011 pagine
Il blocco CTA dell'app dove sta il traffico.

Search Console, ultimi 30 giorni:

| sezione | pagine | impressioni | clic | CTR |
|---|---|---|---|---|
| **esercizi** | 312 | 1150 | **64** | **5,57%** |
| lingue | 181 | 1700 | 16 | 0,94% |
| blog | 126 | 1382 | 18 | 1,30% |

Gli esercizi fanno il 43% dei clic del sito col CTR migliore, e
`ti-cta.js` era caricato su 8 pagine in tutto, nessuna delle quali un
esercizio. Lo script lo carica su esercizi, blog e test-livello, e
ribalta la scelta del blocco: sul blog il default passa da *libri* ad
*app*, i libri restano solo su `reading-practice` e `modi-di-dire`.

### 127-titoli.py — 412 titoli
Su mobile sei in posizione 14,2 e converti l'1,91%; su desktop sei in
posizione 36,7 e converti il 3,28%. È rovesciato. La spiegazione più
probabile è la troncatura: 1216 pagine avevano il titolo oltre i 60
caratteri e Google taglia intorno ai 50-55 sullo schermo stretto.

Regola, in quest'ordine, fermandosi appena il titolo rientra:
accorcia la coda di marca → taglia il sottotitolo dopo i due punti →
toglie del tutto la coda → **lascia stare e lo elenca**.

L'ultimo passo è voluto: troncare a metà frase produce titoli peggiori
dell'originale. Restano 28 da riscrivere a mano, elencati dallo script.

Salva gli originali in `.127-titoli-originali.json`. Non cancellarlo se
vuoi poter tornare indietro.

### 128-banner-app.py — 2770 pagine
Smart App Banner. C'era su 15 pagine su 2844, tutte dentro `/app`.

Il banner nativo **non si localizza a mano**: lo disegna Safari nella
lingua del dispositivo, con nome e prezzo dello store locale. La
versione tradotta e visibile a tutti i browser è il blocco di
`ti-cta.js` che mette il 126.

### 129-occhiello.py — 1178 pagine CSS, 181 traduzioni
Due difetti, nessuno nel testo: il messaggio è giusto e resta.

1. `.cta-occhiello` non aveva CSS da nessuna parte. Applicata 2438
   volte, mai definita: un `<p>` nudo col margine di default, staccato
   dal bottone, che su mobile andava a capo su due righe.
2. 181 pagine non inglesi mostravano la frase in inglese.

Il CSS è pensato per lo schermo stretto: corpo piccolo, colore
attenuato che non compete col bottone, margine sopra azzerato e 6px
sotto per attaccare l'occhiello al bottone, `text-wrap:balance` perché
se va su due righe siano bilanciate.

Le nove traduzioni aggiunte:

| | |
|---|---|
| pt | Metade do percurso A1 está aberta, sem registo |
| ro | Jumătate din parcursul A1 este deschisă, fără înregistrare |
| uk | Половина курсу A1 відкрита, без реєстрації |
| sq | Gjysma e rrugëtimit A1 është e hapur, pa regjistrim |
| fil | Bukas na ang kalahati ng A1, walang sign-up |
| ar | نصف مسار A1 متاح بدون تسجيل |
| zh | A1 课程已开放一半，无需注册 |
| bn | A1 কোর্সের অর্ধেক উন্মুক্ত, নিবন্ধন ছাড়াই |
| ti | ፍርቂ መገዲ A1 ክፉት እዩ፡ ብዘይ ምዝገባ |

Le prime cinque le ho verificate bene. **Su ti e bn ti consiglio un
controllo** prima di mandare in produzione: sono le due su cui ho meno
appigli, e finiscono su 47 pagine.

### 130-riparazioni.py — 3 file
L'audit segnalava «più di un tag title» come fosse un dettaglio. Non lo
è: dentro due post c'era **un intero secondo documento HTML** incollato
nel footer, con DOCTYPE, head e body di un altro articolo.

- `navigating-italian-language-learning-home-vs-abroad.html`: 5065
  caratteri estranei, e il canonical iniettato puntava a
  `/why-thuis-italiaans`. Stavi dicendo a Google che quel post è il
  duplicato di una pagina che non c'entra.
- `navigating-italian-learning-courses.html`: 16132 caratteri
  estranei. Il body cominciava a riga 67, l'intruso a riga 94: il post
  non ha corpo proprio e l'unico `<h1>` era dell'articolo intruso.

Più `come-la-pandemia-ha-cambiato-gli-italiani.html`, che non aveva
meta description **e nemmeno il title** — cosa che l'audit non aveva
visto.

Copie di sicurezza in `.130-backup/`.

### 131-proposta-lingua.py
La proposta lingua scriveva un flag eterno in localStorage sia sulla ×
sia su «Non ora». Un clic per sbaglio e quel visitatore non la rivedeva
mai più, su nessuna delle 1747 pagine.

Ora: **×** vale solo per la sessione, quindi torna alla visita
successiva, come volevi. **«Non ora»** vale 30 giorni. Il vecchio flag
eterno viene ripulito al primo caricamento, così chi era bloccato
rientra nel giro.

---

## L'audit Bing, verificato riga per riga

| segnalazione | verdetto |
|---|---|
| Alt mancanti (209) | **falso positivo**. Su 21.592 immagini, zero senza alt. I 937 `alt=""` sono sul logo dentro un link che ha già testo visibile: lì l'alt vuoto è corretto |
| Meta description mancante (1) | confermato, risolto dal 130 |
| Title troppo lunghi (97) | in realtà **1216**. Bing aveva campionato poco |
| Tag duplicati | molto peggio di così, vedi 130 |

---

## Rimasto fuori, e perché

**`/lingue`** — la sezione con più impressioni del sito (1700) e il CTR
peggiore (0,94%). Sono le pagine dell'app: ricevono più attenzione di
tutto il resto e la sprecano. Meritano un intervento loro, non una
passata automatica. Il dato che lo motiva: 47 query con intento app
(«learn italian app», «best app to learn italian») fanno 145
impressioni e **zero clic**, tutte tra posizione 33 e 91.

**Gli screenshot nel blocco CTA** — uso `store/` (600×1298 JPG, già
dimensionato per il web) e non `screenshots/` (1320×2868 PNG, master
per l'App Store). Mi mancano due cose: cosa sono i **140 file senza
lingua** su 504, e la conferma che vuoi solo quelli **senza fascia di
testo** (il 21% ce l'ha) — il testo lo mette l'HTML tradotto, altrimenti
finisce doppio e in una lingua sbagliata. `store/` inoltre non ha fil,
sq e ti: quelle tre ricadranno sull'inglese.

Mandami `ls assets/store` e `ls assets/store/it`.

**Attribuzione pt/ct sui link App Store** — appena hai il provider
token. Serve a vedere in App Store Connect quanti download arrivano dal
sito, separati da ricerca organica e da ASA.

**Le 16 CPP** — il blocco `ti-cta.js` può puntarci via `?ppid=`. Un post
sulla cittadinanza che apre la CPP del simulatore B1 converte meglio
della product page generica.

---

## Da fare a mano

`blog/navigating-italian-learning-courses.html`: tolto l'intruso resta
un guscio senza articolo. O riscrivi il corpo, o mettilo in 301 verso
`blog/near-by-me-italian-classes`, che è la pagina da cui il contenuto
era stato copiato.

I 28 titoli che nessuna regola automatica accorcia in modo sensato:
li elenca `127-titoli.py` quando lo lanci.
