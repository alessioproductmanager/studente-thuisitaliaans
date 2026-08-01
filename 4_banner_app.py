#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 4_banner_app.py — riquadri dell'app in /esercizi/ e /blog/
============================================================================
   · esercizi: al posto della sola icona, tre schermate a ventaglio
   · blog: riquadro dell'app in fondo all'articolo (it / en / nl)
   · le schermate seguono la lingua del browser (assets/store)
   · tariffa lezioni privatecorretta: €40 -> €50 all'ora

 Uso:
     python3 4_banner_app.py --sito /percorso/del/sito
     python3 4_banner_app.py --sito . --prova     non scrive niente
     python3 4_banner_app.py --sito . --togli     rimette com'era

 Serve che in assets/store/ ci siano le cartelle delle lingue.
 È idempotente: si può rilanciare.
============================================================================
"""

import argparse
import html
import os
import re
import sys

MARCA_I = "<!--app-banner-->"
MARCA_F = "<!--/app-banner-->"
CSS_URL = "/assets/app-banner.css"
JS_URL = "/assets/app-lingua.js"
STORE = "/assets/store"

LINGUE_STORE = ("ar", "bn", "de", "en", "en_AU", "en_CA", "en_US", "es", "es_MX",
                "fr", "fr_CA", "it", "nl", "pt", "pt_BR", "ro", "uk", "zh")

SCATTI_ESERCIZI = ("01_lettore", "03_percorso", "08_tappa")
SCATTI_BLOG = ("02_edicola", "04_mappa", "10_metodo")

# tariffa vera delle lezioni private
CORREZIONI_PREZZO = [
    (re.compile(r"€\s?40(\s*(?:per|/)\s*(?:uur|ora|hour|Stunde|heure|hora))", re.I), r"€50\1"),
    (re.compile(r"(vanaf|begint bij|a partire da|from|ab|à partir de|desde)\s*€\s?40", re.I), r"\1 €50"),
]

TESTI = {
    "it": {"stelle": "iOS App Store", "aria": "Valutazione cinque stelle su iOS App Store",
           "tit": "Continua sul telefono",
           "txt": "L'app <strong>Ti</strong>: percorso A1–C2, 25 romanzi graduati, edicola tematica e dizionario in 14 lingue. Venti minuti al giorno.",
           "cta": "Scopri l'app Ti →", "alt": "App Ti"},
    "en": {"stelle": "iOS App Store", "aria": "Five-star rating on the iOS App Store",
           "tit": "Keep going on your phone",
           "txt": "The <strong>Ti</strong> app: an A1–C2 path, 25 graded novels, a themed newsstand and a dictionary in 14 languages. Twenty minutes a day.",
           "cta": "Discover the Ti app →", "alt": "Ti app"},
    "nl": {"stelle": "iOS App Store", "aria": "Vijf sterren in de iOS App Store",
           "tit": "Ga verder op je telefoon",
           "txt": "De app <strong>Ti</strong>: traject A1–C2, 25 verhalen op niveau, een thematische kiosk en een woordenboek in 14 talen. Twintig minuten per dag.",
           "cta": "Ontdek de Ti-app →", "alt": "Ti-app"},
}


CSS = r"""/* ==========================================================================
   app-banner.css — riquadri dell'app ti per /esercizi/ e /blog/
   usa i token già presenti (--primary, --gold, --radius, --surface, --border)
   ========================================================================== */

/* ---------- schermate a ventaglio (comuni) ------------------------------- */
.app-scatti{position:relative;flex:0 0 238px;width:238px;height:252px}
.app-scatti .app-scatto{position:absolute;top:50%;width:116px;display:block;margin:0}
.app-scatti .app-scatto img{
  width:100%;height:auto;display:block;border-radius:11px;
  box-shadow:0 2px 4px rgba(0,0,0,.2),0 16px 30px -12px rgba(0,0,0,.6);
}
.app-scatti .app-scatto:nth-of-type(1){left:0;transform:translateY(-50%) rotate(-4.5deg) scale(.94);z-index:1}
.app-scatti .app-scatto:nth-of-type(2){left:56px;transform:translateY(-50%);z-index:3}
.app-scatti .app-scatto:nth-of-type(3){left:114px;transform:translateY(-50%) rotate(4.5deg) scale(.94);z-index:2}

/* ---------- riga delle stelle ------------------------------------------- */
.app-stelle{display:flex;align-items:center;gap:7px;margin:0 0 8px;
  font:600 .78rem/1 inherit;letter-spacing:.4px}
.app-stelle .app-stelle-ico{color:var(--gold,#f5b400);font-size:.95rem;letter-spacing:1px}
.app-solo-lettori{position:absolute;width:1px;height:1px;overflow:hidden;
  clip:rect(0 0 0 0);white-space:nowrap}

/* ---------- esercizi: riquadro scuro già esistente ----------------------- */
.ex-app-promo--scatti{align-items:center;gap:28px}
.ex-app-promo--scatti .app-stelle{color:rgba(255,255,255,.72)}

/* ---------- blog: riquadro dentro l'articolo ----------------------------- */
.app-banner{
  margin:34px 0 0;padding:26px 30px;
  background:linear-gradient(160deg,#31394d 0%,#3f4a66 100%);
  border-radius:var(--radius,22px);color:#fff;
  display:flex;align-items:center;gap:28px;
  box-shadow:0 12px 35px rgba(49,57,77,.18);
}
.app-banner-testo{flex:1;min-width:0}
.app-banner .app-stelle{color:rgba(255,255,255,.72)}
.app-banner h3{color:#fff;font-size:1.18rem;margin:0 0 7px;line-height:1.3}
.app-banner p{color:rgba(255,255,255,.85);font-size:.95rem;line-height:1.55;margin:0 0 16px}
.app-banner strong{color:var(--gold,#f5b400)}
.app-banner .app-banner-cta{
  display:inline-flex;padding:13px 26px;border-radius:999px;
  background:var(--gold,#f5b400);color:#31394d;font-weight:700;
  text-decoration:none;transition:.35s ease;
}
.app-banner .app-banner-cta:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(245,180,0,.35)}

/* ---------- schermi stretti ---------------------------------------------- */
@media(max-width:720px){
  .app-banner,.ex-app-promo--scatti{flex-direction:column;text-align:center;gap:18px}
  .app-scatti{flex-basis:auto;width:212px;height:224px;margin:0 auto}
  .app-scatti .app-scatto{width:102px}
  .app-scatti .app-scatto:nth-of-type(2){left:50px}
  .app-scatti .app-scatto:nth-of-type(3){left:102px}
  .app-stelle{justify-content:center}
  .app-banner{padding:22px}
}
"""
JS = r"""/* app-lingua.js — mostra le schermate dell'app nella lingua del browser.
   Riscrive il segmento di lingua in qualsiasi percorso assets/store/<lingua>/file.
   Non serve nessun attributo speciale nell'HTML. */
(function () {
  var CARTELLE = ["ar", "bn", "de", "en", "en_AU", "en_CA", "en_US", "es", "es_MX",
                  "fr", "fr_CA", "it", "nl", "pt", "pt_BR", "ro", "uk", "zh"];
  var PERCORSO = /(assets\/store\/)([A-Za-z_]+)(\/[^\/"']+\.(?:jpg|jpeg|png|webp))/;

  function cartella() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (!l) return null;
    var u = l.replace("-", "_");
    if (CARTELLE.indexOf(u) >= 0) return u;
    var b = u.split("_")[0];
    return CARTELLE.indexOf(b) >= 0 ? b : null;
  }

  function riscrivi(valore, c) {
    if (!valore) return null;
    var m = valore.match(PERCORSO);
    if (!m || m[2] === c) return null;
    return valore.replace(PERCORSO, "$1" + c + "$3");
  }

  function applica() {
    var c = cartella();
    if (!c) return;
    var nodi = document.querySelectorAll('img[src*="assets/store/"], source[srcset*="assets/store/"]');
    for (var i = 0; i < nodi.length; i++) {
      var n = nodi[i];
      if (n.tagName === "SOURCE") {
        var s = riscrivi(n.getAttribute("srcset"), c);
        if (s) n.setAttribute("srcset", s);
      } else {
        var v = riscrivi(n.getAttribute("src"), c);
        if (v) n.setAttribute("src", v);
      }
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", applica)
    : applica();
})();
"""

def esc(t):
    return html.escape(t or "", quote=True)


def lingua_pagina(t):
    m = re.search(r'<html[^>]*\blang="([a-zA-Z]{2})', t)
    lg = (m.group(1).lower() if m else "it")
    return lg if lg in TESTI else "it"


def scatto(nome, lingua, alt):
    cart = lingua if lingua in LINGUE_STORE else "en"
    return (f'<picture class="app-scatto">'
            f'<source type="image/webp" srcset="{STORE}/{cart}/{nome}.webp">'
            f'<img src="{STORE}/{cart}/{nome}.jpg" alt="{esc(alt)}" '
            f'width="600" height="1298" loading="lazy" decoding="async"></picture>')


def stelle(T):
    return (f'<p class="app-stelle"><span class="app-stelle-ico" aria-hidden="true">'
            f'\u2605\u2605\u2605\u2605\u2605</span><span>{esc(T["stelle"])}</span>'
            f'<span class="app-solo-lettori"> \u2014 {esc(T["aria"])}</span></p>')


# ---------------------------------------------------------------------------
#  esercizi
# ---------------------------------------------------------------------------
RE_PROMO = re.compile(r'<div class="ex-app-promo(?: ex-app-promo--scatti)?">.*?</div>\s*</div>', re.S)


def rifai_esercizio(t):
    m = RE_PROMO.search(t)
    if not m:
        return t, 0
    vecchio = m.group(0)
    corpo = re.search(r'<div class="ex-app-promo-body">(.*?)</div>\s*$', vecchio, re.S)
    if not corpo:
        return t, 0
    dentro = corpo.group(1)
    dentro = re.sub(r'<p class="app-stelle">.*?</p>', "", dentro, flags=re.S)
    T = TESTI["it"]
    scatti = "".join(scatto(n, "it", T["alt"]) for n in SCATTI_ESERCIZI)
    nuovo = (f'{MARCA_I}<div class="ex-app-promo ex-app-promo--scatti">'
             f'<div class="app-scatti">{scatti}</div>'
             f'<div class="ex-app-promo-body">{stelle(T)}{dentro.strip()}</div>'
             f'</div>{MARCA_F}')
    return t.replace(vecchio, nuovo, 1), 1


def ripristina_esercizio(t):
    m = re.search(re.escape(MARCA_I) + r"(.*?)" + re.escape(MARCA_F), t, re.S)
    if not m:
        return t
    corpo = re.search(r'<div class="ex-app-promo-body">(.*?)</div></div>', m.group(1), re.S)
    dentro = corpo.group(1) if corpo else ""
    dentro = re.sub(r'<p class="app-stelle">.*?</p>', "", dentro, flags=re.S).strip()
    vecchio = ('<div class="ex-app-promo">\n      <div class="ex-app-promo-icon">\n'
               '        <img src="../assets/icons/icon-512.png" alt="Icona app Ti" '
               'width="512" height="512" loading="lazy" decoding="async">\n      </div>\n'
               f'      <div class="ex-app-promo-body">\n        {dentro}\n      </div>\n    </div>')
    return t.replace(m.group(0), vecchio, 1)


# ---------------------------------------------------------------------------
#  blog
# ---------------------------------------------------------------------------
def banner_blog(lingua):
    T = TESTI[lingua]
    scatti = "".join(scatto(n, lingua, T["alt"]) for n in SCATTI_BLOG)
    return (f'{MARCA_I}<section class="app-banner">'
            f'<div class="app-scatti">{scatti}</div>'
            f'<div class="app-banner-testo">{stelle(T)}'
            f'<h3>{esc(T["tit"])}</h3><p>{T["txt"]}</p>'
            f'<a class="app-banner-cta" href="../app-ti">{esc(T["cta"])}</a>'
            f'</div></section>{MARCA_F}')


def innesta_blog(t, banner):
    m = re.search(r'<div class="article-end-cta">.*?</div>', t, re.S)
    if not m:
        return t, 0
    return t[:m.end()] + "\n      " + banner + t[m.end():], 1


# ---------------------------------------------------------------------------
#  comuni
# ---------------------------------------------------------------------------
def togli(t):
    return re.sub(re.escape(MARCA_I) + r".*?" + re.escape(MARCA_F) + r"\s*", "", t, flags=re.S)


def metti_assets(t):
    if CSS_URL in t:
        return t
    tag = f'<link rel="stylesheet" href="{CSS_URL}">\n<script src="{JS_URL}" defer></script>\n'
    return t.replace("</head>", tag + "</head>", 1)


def togli_assets(t):
    t = re.sub(r'<link rel="stylesheet" href="' + re.escape(CSS_URL) + r'">\s*', "", t)
    return re.sub(r'<script src="' + re.escape(JS_URL) + r'" defer></script>\s*', "", t)


def prezzi(t):
    n = 0
    for regex, sost in CORREZIONI_PREZZO:
        t, k = regex.subn(sost, t)
        n += k
    return t, n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--prova", action="store_true")
    ap.add_argument("--togli", action="store_true")
    ap.add_argument("--salta-prezzi", action="store_true")
    a = ap.parse_args()

    radice = os.path.abspath(a.sito)
    dir_es = os.path.join(radice, "esercizi")
    dir_blog = os.path.join(radice, "blog")
    if not os.path.isdir(dir_es) and not os.path.isdir(dir_blog):
        sys.exit(f"Non trovo né {dir_es} né {dir_blog}. Usa --sito con la radice del sito.")

    if not a.togli and not a.prova:
        os.makedirs(os.path.join(radice, "assets"), exist_ok=True)
        open(os.path.join(radice, "assets", "app-banner.css"), "w", encoding="utf-8").write(CSS)
        open(os.path.join(radice, "assets", "app-lingua.js"), "w", encoding="utf-8").write(JS)
        print("scritti assets/app-banner.css e assets/app-lingua.js")

    n_es = n_blog = n_prezzi = 0

    # ---- esercizi -------------------------------------------------------
    if os.path.isdir(dir_es):
        for f in sorted(os.listdir(dir_es)):
            if not f.endswith(".html"):
                continue
            p = os.path.join(dir_es, f)
            t = t0 = open(p, encoding="utf-8").read()
            if a.togli:
                t = togli_assets(ripristina_esercizio(t))
            else:
                t = togli(t) if MARCA_I in t and "ex-app-promo--scatti" not in t else t
                if MARCA_I in t:
                    t = ripristina_esercizio(t)
                t, k = rifai_esercizio(t)
                n_es += k
                if k:
                    t = metti_assets(t)
            if t != t0 and not a.prova:
                open(p, "w", encoding="utf-8").write(t)

    # ---- blog -----------------------------------------------------------
    if os.path.isdir(dir_blog):
        for f in sorted(os.listdir(dir_blog)):
            if not f.endswith(".html"):
                continue
            p = os.path.join(dir_blog, f)
            t = t0 = open(p, encoding="utf-8").read()
            t = togli(t)
            if a.togli:
                t = togli_assets(t)
            else:
                t, k = innesta_blog(t, banner_blog(lingua_pagina(t)))
                n_blog += k
                if k:
                    t = metti_assets(t)
                if not a.salta_prezzi:
                    t, kp = prezzi(t)
                    n_prezzi += kp
            if t != t0 and not a.prova:
                open(p, "w", encoding="utf-8").write(t)

    if a.togli:
        print("rimesso tutto com'era (le tariffe corrette restano)")
        return
    print(f"\n{'(prova) ' if a.prova else ''}esercizi con le tre schermate: {n_es}")
    print(f"articoli del blog con il riquadro app: {n_blog}")
    print(f"tariffe corrette da €40 a €50: {n_prezzi}")


if __name__ == "__main__":
    main()
