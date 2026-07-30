# -*- coding: utf-8 -*-
"""
verifica_scuole.py — controlla se le date dei corsi delle scuole sono aggiornate.

COSA FA
  1. Legge dati.js (l'unica fonte di verità della pagina).
  2. Per ogni scuola apre `pagina_corsi` (o `sito` se manca) e cerca nel testo:
       - date future ("12 settembre 2026", "September 2026", "05/10/2026"…)
       - la formula "ogni lunedì" / "every Monday"
  3. Classifica: AGGIORNATO / DA_AGGIORNARE / DATE_MANCANTI / SITO_MANCANTE /
     SITO_NON_RAGGIUNGIBILE.
  4. Scrive report_scuole.csv con l'esito e, dove mancano le date, un TESTO
     SUGGERITO pronto da incollare nella scheda.
  5. Con --scrivi aggiorna dati.js: timbra `verificato_il` = oggi e
     `stato_dati` = "verificato" per le scuole risultate AGGIORNATO.

USO
  python3 verifica_scuole.py                # solo report
  python3 verifica_scuole.py --scrivi       # report + timbri in dati.js
  python3 verifica_scuole.py --solo babilonia   # una scuola sola (match sull'id)

NOTE
  - Una richiesta per scuola, con pausa di 2 secondi: gentile con i server.
  - Il controllo è euristico: il report va LETTO, non eseguito alla cieca.
"""

import csv
import json
import re
import sys
import time
from datetime import date
from pathlib import Path

import urllib.request  # libreria standard: nessun 'pip install' necessario

QUI = Path(__file__).parent
_CANDIDATI = [QUI / "dati.js", QUI / "scuole" / "dati.js",
              QUI.parent / "dati.js", QUI.parent / "scuole" / "dati.js"]
DATI_JS = next((p for p in _CANDIDATI if p.exists()), _CANDIDATI[0])
REPORT = QUI / "report_scuole.csv"
OGGI = date.today()
UA = {"User-Agent": "Mozilla/5.0 (compatible; thuisitaliaans-verifica/1.0)"}

MESI = {
    "gennaio": 1, "febbraio": 2, "marzo": 3, "aprile": 4, "maggio": 5,
    "giugno": 6, "luglio": 7, "agosto": 8, "settembre": 9, "ottobre": 10,
    "novembre": 11, "dicembre": 12,
    "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
    "july": 7, "august": 8, "september": 9, "october": 10, "november": 11,
    "december": 12,
}
RE_MESE = "|".join(MESI)

TESTO_SUGGERITO = (
    "Le date di inizio non sono pubblicate sul sito della scuola. "
    "Nella maggior parte delle scuole i corsi intensivi di gruppo partono "
    "ogni lunedì (i principianti assoluti in date fisse, in genere ogni due "
    "settimane). Scrivi alla scuola per confermare la prossima data utile: "
    "in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima."
)


def leggi_dati():
    testo = DATI_JS.read_text(encoding="utf-8")
    m = re.search(r"const\s+DATI\s*=\s*(\{.*\})\s*;", testo, re.S)
    if not m:
        sys.exit("Formato di dati.js non riconosciuto (atteso: const DATI = {...};)")
    return json.loads(m.group(1)), testo


def scrivi_dati(dati, testo_originale):
    intestazione = testo_originale.split("const DATI")[0]
    nuovo = intestazione + "const DATI = " + json.dumps(
        dati, ensure_ascii=False, indent=2) + ";\n"
    DATI_JS.write_text(nuovo, encoding="utf-8")


def testo_pagina(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        class R: pass
        r2 = R(); r2.text = r.read().decode("utf-8", errors="replace")
    r = r2
    # via script/style, poi via tag: resta il testo leggibile
    t = re.sub(r"(?is)<(script|style).*?</\1>", " ", r.text)
    t = re.sub(r"(?s)<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", t).lower()


def date_trovate(testo):
    """Coppie (anno, mese) trovate nel testo, più il flag 'ogni lunedì'."""
    coppie = set()
    # "12 settembre 2026" / "september 2026" / "settembre 2026"
    for m in re.finditer(r"(?:\b\d{1,2}\s+)?\b(" + RE_MESE + r")\b[\s,]{0,3}(20\d\d)", testo):
        coppie.add((int(m.group(2)), MESI[m.group(1)]))
    # "05/10/2026" e "2026-10-05"
    for m in re.finditer(r"\b\d{1,2}[/.](\d{1,2})[/.](20\d\d)\b", testo):
        mese = int(m.group(1))
        if 1 <= mese <= 12:
            coppie.add((int(m.group(2)), mese))
    for m in re.finditer(r"\b(20\d\d)-(\d{2})-\d{2}\b", testo):
        mese = int(m.group(2))
        if 1 <= mese <= 12:
            coppie.add((int(m.group(1)), mese))
    ogni_lunedi = bool(re.search(r"ogni\s+luned|every\s+monday|elke\s+maandag", testo))
    return coppie, ogni_lunedi


def valuta(scuola):
    url = scuola.get("pagina_corsi") or scuola.get("sito")
    if not url:
        return "SITO_MANCANTE", "Nessun URL in `sito`/`pagina_corsi`: aggiungilo in dati.js.", TESTO_SUGGERITO
    try:
        testo = testo_pagina(url)
    except Exception as e:
        return "SITO_NON_RAGGIUNGIBILE", f"{url} → {type(e).__name__}: {e}", ""

    coppie, ogni_lunedi = date_trovate(testo)
    limite = (OGGI.year, OGGI.month)
    future = sorted(c for c in coppie if c >= limite and c <= (OGGI.year + 1, OGGI.month))

    if future:
        prime = ", ".join(f"{a}-{m:02d}" for a, m in future[:4])
        extra = " (più formula 'ogni lunedì')" if ogni_lunedi else ""
        return "AGGIORNATO", f"Date future trovate: {prime}{extra}", ""
    if ogni_lunedi:
        return "AGGIORNATO", "Formula 'ogni lunedì' trovata: valida tutto l'anno.", ""
    if coppie:
        vecchie = ", ".join(f"{a}-{m:02d}" for a, m in sorted(coppie)[-3:])
        return ("DA_AGGIORNARE",
                f"Solo date passate ({vecchie}): il calendario sul sito sembra vecchio.",
                TESTO_SUGGERITO)
    return "DATE_MANCANTI", "Nessuna data nel testo della pagina.", TESTO_SUGGERITO


def main():
    scrivi = "--scrivi" in sys.argv
    solo = None
    if "--solo" in sys.argv:
        solo = sys.argv[sys.argv.index("--solo") + 1].lower()

    dati, testo_originale = leggi_dati()
    righe, timbrate = [], 0

    for s in dati["scuole"]:
        if solo and solo not in s["id"]:
            continue
        stato, dettaglio, suggerito = valuta(s)
        righe.append({
            "id": s["id"], "scuola": s["nome"], "citta": s["citta"],
            "url": s.get("pagina_corsi") or s.get("sito") or "",
            "stato": stato, "dettaglio": dettaglio, "testo_suggerito": suggerito,
        })
        print(f"[{stato:22s}] {s['nome']} ({s['citta']})")
        if scrivi and stato == "AGGIORNATO":
            s["verificato_il"] = OGGI.isoformat()
            s["stato_dati"] = "verificato"
            timbrate += 1
        time.sleep(2)

    with REPORT.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(righe[0].keys()))
        w.writeheader()
        w.writerows(righe)

    if scrivi:
        dati["aggiornato_il"] = OGGI.isoformat()
        scrivi_dati(dati, testo_originale)
        print(f"\ndati.js aggiornato: {timbrate} scuole timbrate 'verificato'.")

    conta = {}
    for r in righe:
        conta[r["stato"]] = conta.get(r["stato"], 0) + 1
    print("\nRiepilogo:", ", ".join(f"{k}: {v}" for k, v in sorted(conta.items())))
    print(f"Report completo in {REPORT.name}")


if __name__ == "__main__":
    main()
