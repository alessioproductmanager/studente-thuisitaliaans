# Da compilare + come pubblicare

## 1. Placeholder da sostituire

Tutti nel formato `{{NOME}}`. Fai un find-replace su tutti i file del pacchetto.
Mandami i valori e li sostituisco io.

### Dati aziendali (in tutte e 4 le pagine + GOOGLE-BUSINESS.md)

| Placeholder | Cosa serve |
|---|---|
| `{{TELEFOON}}` | Numero in formato internazionale: `+31 6 ...` |
| `{{EMAIL}}` | Email di contatto pubblica |
| `{{STRAAT_EN_NUMMER}}` | Via e numero a Ede |
| `{{POSTCODE}}` | Codice postale |
| `{{LAT}}` / `{{LON}}` | Coordinate — le prendi da Google Maps, tasto destro sul punto |
| `{{BTW_NUMMER}}` | Partita IVA olandese (`NL...B01`) |
| `{{OPENINGSTIJDEN}}` | Orari per Google Business |

Se lavori da casa e non ricevi studenti lì: togli l'intero blocco `address` e
`geo` dallo schema, e su Google Business scegli *service-area business*.

### Prezzi (in `tarieven.html`, più `{{PRIJS_LOS_UUR}}` nelle altre 3)

| Placeholder | Cosa serve |
|---|---|
| `{{PRIJS_LOS_UUR}}` | Lezione singola online — solo il numero nello schema (es. `55.00`), con € nella tabella |
| `{{PRIJS_LOCATIE}}` | Lezione singola sul posto |
| `{{AANTAL_PAKKET}}` / `{{PRIJS_PAKKET}}` | Numero di lezioni del pacchetto e prezzo |
| `{{PRIJS_DUO}}` | Lezione per due persone |
| `{{PRIJS_ZAKELIJK}}` | Tariffa business, o "Op aanvraag" |
| `{{FASCIA_PREZZO}}` | Per lo schema: `€€` o `$$` |

### Condizioni

| Placeholder | Cosa serve |
|---|---|
| `{{DUUR_LES}}` | Durata standard, es. `60 minuten` |
| `{{DUUR_KENNISMAKING}}` | Es. `30 minuten` |
| `{{BTW_REGEL}}` | Riga sotto la tabella, es. "Alle prijzen zijn inclusief btw" |
| `{{BTW_ANTWOORD}}` | Versione estesa per la FAQ |
| `{{REISKOSTEN_REGEL}}` / `{{REISKOSTEN_ANTWOORD}}` | Rimborso chilometrico sì/no e da quale distanza |
| `{{ANNULERINGSBELEID}}` | Es. "Tot 24 uur van tevoren kosteloos verzetten" |
| `{{BETAALWIJZE}}` | Bonifico, iDEAL, Tikkie… |

**Non ho inventato nessun prezzo.** Meglio una pagina non pubblicata che una
con numeri sbagliati.

---

## 2. Dove mettere i file

```
/css/landing.css
/italiaanse-les-ede.html
/italiaanse-les-amersfoort.html
/italiaans-online-leren.html
/tarieven.html
```

I canonical puntano alla forma **senza estensione** (`/italiaanse-les-ede`),
coerente con come Cloudflare già serve `/esercizi` e `/blog`. Verifica che il
routing faccia lo stesso per queste pagine.

---

## 3. Dopo la pubblicazione

- [ ] Aggiungi le 4 pagine al menu di navigazione — senza link interni Google
      le trova tardi e male
- [ ] Aggiungile a `sitemap.xml`
- [ ] Link dalla home: le quattro card dei percorsi devono puntare alle pagine,
      non restare `#anchor`
- [ ] Link dal blog: i post di categoria `italian-classes` linkano alle landing
      pertinenti
- [ ] Cambia il `<title>` della home come da README
- [ ] Testa lo schema su `search.google.com/test/rich-results`

---

## 4. Nota importante sullo schema

Il blocco `LocalBusiness` completo (con `Person`, credenziali e indirizzo)
sta **solo in `italiaanse-les-ede.html`**, ed è l'unico posto dove deve stare:
è la pagina della sede. Le altre tre referenziano quel nodo con
`"@id": "https://thuisitaliaans.com/#business"`.

Se sposti quel blocco, aggiorna gli `@id`, altrimenti i riferimenti si rompono.

**Non c'è `Review` né `AggregateRating` da nessuna parte**, ed è voluto: le
recensioni auto-ospitate non sono idonee ai rich result e un `AggregateRating`
sull'organizzazione è una delle cause tipiche di penalizzazione manuale per
structured data. Le stelle arrivano da Google Business.

---

## 5. Cosa NON è ancora coperto

Dei buchi individuati nella competitor analysis, questi restano aperti:

- Pagina CILS / CELI / PLIDA in Nederland (nicchia vuota, alto intento)
- Utrecht — solo su `privéles` e `zakelijk`, mai sul termine testa
- Amsterdam — inquadrata come online-first
- Niveautest A1–C2
- Consolidamento dei ~25 post duplicati del blog
- Canonical allineati sul resto del sito

Il consolidamento del blog resta la cosa a più alto impatto: finché quel
cluster è lì, anche queste pagine nuove partono in salita.

---

## 6. Pagine livello A1–C2 — i romanzi

Le sei pagine `libri-italiano-facile-{a1..c2}.html` hanno il blocco dei
romanzi **vuoto**, con un avviso visibile. Non ho inventato l'assegnazione
dei titoli ai livelli perché non la conosco.

Per completarle, apri `genera-livelli.py`, riempi la lista `libri` di ogni
livello e rilancia lo script:

```python
"B1": {
    ...
    "libri": [
        {"titolo": "Il servitore di due padroni", "autore": "Goldoni",
         "nota": "20 capitoli, 60 voci di lessico"},
        {"titolo": "Gian Burrasca", "autore": "Vamba", "nota": ""},
    ],
```

```
python3 genera-livelli.py
```

Le sei pagine si rigenerano con i titoli al posto dell'avviso.

**Finché il blocco è vuoto, non pubblicare le pagine livello.** Il CTA in
`ti-cta.js` ci punta: meglio lasciarlo su A1 per qualche giorno che mandare
gli utenti su pagine con un avviso di redazione visibile.

## 7. Le due lingue delle pagine livello

Le sei pagine sono in **italiano**, coerenti con `/esercizi/` e con lo slug
`libri-italiano-facile-*` a cui `ti-cta.js` già punta, e con il fatto che il
CTA compare su post del blog in italiano.

Se in futuro vuoi intercettare anche query olandesi tipo *"wat is niveau B1
Italiaans"*, servono pagine separate (`/italiaans-niveau-b1`) collegate a
queste con hreflang — **non** tradurre queste in olandese, altrimenti perdi
la corrispondenza con il CTA e con gli slug esistenti.
