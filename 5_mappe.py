#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 5_mappe.py — mappe, trasporti, alloggio ed età nelle pagine scuole
============================================================================
 Cosa fa:
   1. GEOCODIFICA (una volta sola, poi usa la cache)
      cerca le coordinate di ogni scuola e di ogni "top 3" su OpenStreetMap
      e le salva in assets/coordinate.json
   2. PAGINE CITTÀ
      mappa con le scuole in terracotta (clic -> scheda) e i tre luoghi
      in verde salvia (passaggio del mouse -> dettaglio)
   3. SCHEDE SCUOLA
      mappa con la scuola e i tre luoghi, prima di "Giorni festivi",
      e nella stessa scheda due righe su come muoversi in città
   4. FAQ delle pagine città: quanto costa l'alloggio
   5. Riga "Età": dove manca, aggiunge "adulti, 18+"

 Uso:
     python3 5_mappe.py --sito . --geocodifica     (la prima volta, ~10 min)
     python3 5_mappe.py --sito .                   (scrive le pagine)
     python3 5_mappe.py --sito . --prova
     python3 5_mappe.py --sito . --togli

 Le coordinate mancanti si aggiungono a mano in assets/coordinate.json.
============================================================================
"""

import argparse
import html
import json
import os
import re
import sys
import time
import unicodedata

MARCA_I = "<!--mappa-->"
MARCA_F = "<!--/mappa-->"
MARCA_ETA_I = "<!--eta-->"
MARCA_ETA_F = "<!--/eta-->"
MARCA_FAQ_I = "<!--faq-alloggio-->"
MARCA_FAQ_F = "<!--/faq-alloggio-->"

CSS_URL = "/assets/mappe.css"
JS_URL = "/assets/mappe.js"
LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"

NOMINATIM = "https://nominatim.openstreetmap.org/search"
OVERPASS = "https://overpass-api.de/api/interpreter"
UA = ("thuisitaliaans-mappe/1.0 (https://thuisitaliaans.com; info@thuisitaliaans.com)")

LINGUE = {"": "it", "de": "de", "en": "en", "es": "es", "fr": "fr", "nl": "nl", "pl": "pl"}

# ---------------------------------------------------------------------------
#  TESTI
# ---------------------------------------------------------------------------
T = {
    "it": {
        "tit_citta": "Dove sono le scuole a {c}",
        "tit_scuola": "Dove ti trovi",
        "leg_scuole": "scuole", "leg_luoghi": "da non perdere",
        "aiuto": 'Passa sui punti verdi per il dettaglio, clicca su quelli rossi per aprire la scheda.',
        "apri": "Apri la scheda",
        "muoversi": "Come muoversi",
        "a_piedi": "Dalla scuola ai tre luoghi qui sopra sono quasi sempre pochi minuti a piedi: le scuole stanno in centro o poco fuori.",
        "faq_d": "Quanto costa l'alloggio a {c}?",
        "eta": 'Età', "eta_val": 'adulti, 18+',
        "mappa_alt": "Mappa di {c}",
        "tit_intorno": 'Cosa hai intorno',
    },
    "en": {
        "tit_citta": "Where the schools are in {c}",
        "tit_scuola": "Where you'll be",
        "leg_scuole": "schools", "leg_luoghi": "not to be missed",
        "aiuto": 'Hover the green dots for details, click the red ones to open the school page.',
        "apri": "Open the school page",
        "muoversi": "Getting around",
        "a_piedi": "From the school to the three places above it is usually a short walk: the schools are in or near the centre.",
        "faq_d": "How much does accommodation cost in {c}?",
        "eta": 'Ages', "eta_val": 'adults, 18+',
        "mappa_alt": "Map of {c}",
        "tit_intorno": "What's around you",
    },
    "nl": {
        "tit_citta": "Waar de scholen liggen in {c}",
        "tit_scuola": "Waar je terechtkomt",
        "leg_scuole": "scholen", "leg_luoghi": "niet te missen",
        "aiuto": 'Ga met de muis over de groene punten voor details, klik op de rode voor de school.',
        "apri": "Open de schoolpagina",
        "muoversi": "Hoe je je verplaatst",
        "a_piedi": "Van de school naar de drie plekken hierboven is het meestal een paar minuten lopen: de scholen liggen in of vlak bij het centrum.",
        "faq_d": "Wat kost accommodatie in {c}?",
        "eta": 'Leeftijd', "eta_val": 'volwassenen, 18+',
        "mappa_alt": "Kaart van {c}",
        "tit_intorno": 'Wat er in de buurt is',
    },
    "de": {
        "tit_citta": "Wo die Schulen in {c} liegen",
        "tit_scuola": "Wo du sein wirst",
        "leg_scuole": "Schulen", "leg_luoghi": "nicht verpassen",
        "aiuto": 'Mit der Maus über die grünen Punkte für Details, auf die roten klicken für die Schule.',
        "apri": "Schulseite öffnen",
        "muoversi": "Wie man sich fortbewegt",
        "a_piedi": "Von der Schule zu den drei Orten oben sind es meist ein paar Minuten zu Fuß: Die Schulen liegen im Zentrum oder knapp daneben.",
        "faq_d": "Was kostet die Unterkunft in {c}?",
        "eta": 'Alter', "eta_val": 'Erwachsene, 18+',
        "mappa_alt": "Karte von {c}",
        "tit_intorno": 'Was dich umgibt',
    },
    "fr": {
        "tit_citta": "Où sont les écoles à {c}",
        "tit_scuola": "Où vous serez",
        "leg_scuole": "écoles", "leg_luoghi": "à ne pas manquer",
        "aiuto": 'Survolez les points verts pour le détail, cliquez sur les rouges pour ouvrir la fiche.',
        "apri": "Ouvrir la fiche",
        "muoversi": "Comment se déplacer",
        "a_piedi": "De l'école aux trois lieux ci-dessus, c'est presque toujours quelques minutes à pied : les écoles sont au centre ou juste à côté.",
        "faq_d": "Combien coûte le logement à {c} ?",
        "eta": 'Âges', "eta_val": 'adultes, 18+',
        "mappa_alt": "Carte de {c}",
        "tit_intorno": "Ce qu'il y a autour",
    },
    "es": {
        "tit_citta": "Dónde están las escuelas en {c}",
        "tit_scuola": "Dónde estarás",
        "leg_scuole": "escuelas", "leg_luoghi": "imprescindibles",
        "aiuto": 'Pasa el ratón por los puntos verdes para el detalle, haz clic en los rojos para abrir la ficha.',
        "apri": "Abrir la ficha",
        "muoversi": "Cómo moverse",
        "a_piedi": "De la escuela a los tres lugares de arriba suelen ser pocos minutos a pie: las escuelas están en el centro o muy cerca.",
        "faq_d": "¿Cuánto cuesta el alojamiento en {c}?",
        "eta": 'Età', "eta_val": 'adultos, 18+',
        "mappa_alt": "Mapa de {c}",
        "tit_intorno": 'Qué tienes alrededor',
    },
    "pl": {
        "tit_citta": "Gdzie są szkoły w mieście {c}",
        "tit_scuola": "Gdzie będziesz",
        "leg_scuole": "szkoły", "leg_luoghi": "warto zobaczyć",
        "aiuto": 'Najedź na zielone punkty, aby zobaczyć szczegóły, kliknij czerwone, aby otworzyć stronę szkoły.',
        "apri": "Otwórz stronę szkoły",
        "muoversi": "Jak się poruszać",
        "a_piedi": "Ze szkoły do trzech powyższych miejsc jest zwykle kilka minut pieszo: szkoły są w centrum lub tuż obok.",
        "faq_d": "Ile kosztuje zakwaterowanie w mieście {c}?",
        "eta": 'Età', "eta_val": 'dorośli, 18+',
        "mappa_alt": "Mapa: {c}",
        "tit_intorno": 'Co masz w okolicy',
    },
}

# ---------------------------------------------------------------------------
#  ALLOGGIO — stime indicative, non prezzi di una scuola specifica
#  Fasce basate sui listini pubblici delle scuole di italiano e sui dati
#  Idealista 2024 per gli affitti brevi. Il prezzo esatto lo dà la scuola.
# ---------------------------------------------------------------------------
CITTA_CARE = {"Roma", "Firenze", "Venezia", "Milano", "Bolzano", "Merano",
              "Riva del Garda", "Sorrento", "Taormina", "Capri"}

ALLOGGIO = {
    "it": ("In famiglia con colazione si va di solito da circa {f} a settimana in camera singola; "
           "una camera in appartamento condiviso costa in genere da {a}. "
           "Sono stime indicative: il prezzo cambia con la stagione, la distanza dal centro e i pasti inclusi. "
           "Quasi tutte le scuole di questa pagina prenotano l'alloggio per te, quindi conviene chiedere il "
           "preventivo di corso e alloggio nello stesso messaggio."),
    "en": ("A host family with breakfast usually costs about {f} per week for a single room; "
           "a room in a shared flat generally starts at {a}. "
           "These are rough figures: the price changes with the season, the distance from the centre and the meals included. "
           "Almost every school on this page books accommodation for you, so ask for a quote covering course and room together."),
    "nl": ("Bij een gastgezin met ontbijt betaal je meestal ongeveer {f} per week voor een eenpersoonskamer; "
           "een kamer in een gedeeld appartement begint doorgaans bij {a}. "
           "Dit zijn indicaties: de prijs hangt af van het seizoen, de afstand tot het centrum en de inbegrepen maaltijden. "
           "Bijna elke school op deze pagina regelt de accommodatie voor je: vraag dus in één bericht een prijs voor cursus én kamer."),
    "de": ("Eine Gastfamilie mit Frühstück kostet meist etwa {f} pro Woche im Einzelzimmer; "
           "ein Zimmer in einer WG beginnt in der Regel bei {a}. "
           "Das sind Richtwerte: Der Preis hängt von Saison, Entfernung zum Zentrum und den enthaltenen Mahlzeiten ab. "
           "Fast alle Schulen auf dieser Seite buchen die Unterkunft für dich — frag also im selben Schreiben nach Kurs und Zimmer."),
    "fr": ("En famille d'accueil avec petit-déjeuner, comptez en général de {f} par semaine en chambre simple ; "
           "une chambre en appartement partagé démarre en général à {a}. "
           "Ce sont des ordres de grandeur : le prix varie selon la saison, la distance du centre et les repas inclus. "
           "Presque toutes les écoles de cette page réservent le logement pour vous : demandez un devis cours + logement dans le même message."),
    "es": ("En familia con desayuno suele ir de unos {f} por semana en habitación individual; "
           "una habitación en piso compartido empieza normalmente en {a}. "
           "Son cifras orientativas: el precio cambia con la temporada, la distancia al centro y las comidas incluidas. "
           "Casi todas las escuelas de esta página reservan el alojamiento por ti, así que pide el presupuesto de curso y habitación en el mismo mensaje."),
    "pl": ("U rodziny goszczącej ze śniadaniem zwykle jest to około {f} tygodniowo za pokój jednoosobowy; "
           "pokój we wspólnym mieszkaniu zaczyna się zwykle od {a}. "
           "To wartości orientacyjne: cena zależy od sezonu, odległości od centrum i wliczonych posiłków. "
           "Prawie każda szkoła z tej strony rezerwuje zakwaterowanie za ciebie — poproś o wycenę kursu i pokoju w jednej wiadomości."),
}

# ---------------------------------------------------------------------------
#  COME MUOVERSI — solo cose verificabili, città per città
# ---------------------------------------------------------------------------
TRASPORTI = {
    "Roma": "Metro A, B e C più tram e autobus: il biglietto singolo vale 100 minuti e si timbra all'ingresso.",
    "Milano": "Metro M1–M5, tram storici e autobus: il biglietto urbano vale 90 minuti su tutta la rete.",
    "Napoli": "Metro linea 1 e 6, più tre funicolari per il Vomero: il biglietto integrato copre tutto.",
    "Torino": "Metro automatica (linea 1) e una rete di tram fra le più estese d'Italia.",
    "Genova": "Metro, ma soprattutto ascensori pubblici e funicolari: la città è verticale.",
    "Firenze": "Tramvia T1 e T2, con la T2 che collega l'aeroporto al centro in una ventina di minuti.",
    "Venezia": "Nessuna auto: si cammina, e per le distanze lunghe c'è il vaporetto ACTV.",
    "Palermo": "Tram nelle zone esterne e anello ferroviario; il centro storico si gira a piedi.",
    "Cagliari": "Metropolitana leggera di superficie più autobus CTM.",
    "Padova": "Tram su gomma (linea SIR1) da nord a sud, passando accanto alla stazione.",
    "Bologna": "Autobus urbani TPER e il people mover Marconi Express fra stazione e aeroporto.",
    "Pisa": "Il PisaMover collega aeroporto e stazione in cinque minuti; il resto è a piedi.",
    "Rimini": "Il Metromare collega Rimini a Riccione lungo la costa, con corse frequenti.",
    "Trieste": "Autobus urbani Trieste Trasporti; il centro fra piazza Unità e il Borgo Teresiano si gira a piedi.",
    "Verona": "Autobus ATV; dall'Arena alla Casa di Giulietta e a Castelvecchio si va a piedi.",
    "Milazzo": "Autobus urbani e collegamenti per il porto, da cui partono gli aliscafi per le Eolie.",
    "Sorrento": "La Circumvesuviana per Napoli e Pompei, e gli aliscafi dal porto per Capri.",
    "Salerno": "Metropolitana di superficie e autobus; il lungomare si percorre a piedi.",
    "Isola d'Elba": "Autobus di linea fra Portoferraio e i paesi; per muoversi liberi conviene lo scooter.",
    "La Maddalena": "Traghetti frequenti da Palau e autobus locali sull'isola.",
    "Venezia (Mestre)": "Tram e autobus ACTV verso il centro storico.",
}
TRASPORTO_GENERICO = ("Centro compatto: quasi tutto si raggiunge a piedi. "
                      "Per il resto ci sono gli autobus urbani, con biglietto da comprare "
                      "in tabaccheria o in edicola prima di salire.")

TRASPORTI_ALTRE = {
    "en": {"generico": ("Compact centre: you can walk almost everywhere. For the rest there are city "
                        "buses — buy the ticket at a tobacconist or newsstand before you get on.")},
    "nl": {"generico": ("Compact centrum: bijna alles is te belopen. Verder zijn er stadsbussen — koop het "
                        "kaartje bij een tabakszaak of kiosk voordat je instapt.")},
    "de": {"generico": ("Kompaktes Zentrum: fast alles ist zu Fuß erreichbar. Sonst gibt es Stadtbusse — "
                        "das Ticket vorher am Kiosk oder im Tabakladen kaufen.")},
    "fr": {"generico": ("Centre compact : presque tout se fait à pied. Sinon il y a les bus urbains — "
                        "achetez le ticket au tabac ou au kiosque avant de monter.")},
    "es": {"generico": ("Centro compacto: casi todo se hace a pie. Para lo demás están los autobuses "
                        "urbanos — compra el billete en un estanco o quiosco antes de subir.")},
    "pl": {"generico": ("Zwarte centrum: prawie wszędzie dojdziesz pieszo. Poza tym są autobusy miejskie — "
                        "bilet kup w kiosku przed wejściem.")},
}


CSS = r"""/* ==========================================================================
   mappe.css — mappe delle scuole e dei luoghi
   ========================================================================== */
.mappa-box{margin-top:18px}
.mappa{
  height:min(52vh,400px);min-height:300px;width:100%;
  border:1px solid var(--linea);border-radius:var(--r,18px);
  box-shadow:var(--ombra);background:#EDE7DA;
  overflow:hidden;margin-top:4px;z-index:1;
}
.mappa-box .leaflet-container{font-family:var(--sans);background:#EFE9DE}

/* pin: stessa forma della mappa grande di /scuole/mappa.html */
.mappa .pin,.mappa .pin-luogo{
  border:2px solid #fff;border-radius:999px;color:#fff;
  font:700 12px/1 var(--sans);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 6px rgba(34,29,22,.35);
}
.mappa .pin{background:var(--terracotta,#BC5533);width:26px;height:26px;cursor:pointer}
.mappa .pin-luogo{background:var(--salvia,#5E7357);width:24px;height:24px;font-size:11px}
.mappa .pin svg,.mappa .pin-luogo svg{width:13px;height:13px;display:block}

/* legenda */
.mappa-legenda{
  display:flex;align-items:center;flex-wrap:wrap;gap:4px 14px;
  margin-top:10px;font-size:12px;color:var(--secondario)
}
.mappa-legenda .lg{width:10px;height:10px;border-radius:999px;display:inline-block;margin-right:5px;flex:0 0 10px}


.mappa-legenda .lg-s{background:var(--terracotta,#BC5533)}
.mappa-legenda .lg-l{background:var(--salvia,#5E7357)}
.mappa-aiuto{flex-basis:100%;font-size:11.5px;opacity:.85;margin-top:2px}

/* fumetti */
.mappa .leaflet-popup-content{margin:12px 14px;font-family:var(--sans);min-width:0;font-size:13.5px;line-height:1.5}
.mappa .leaflet-popup-content b{font-family:var(--serif);font-size:16px;display:block;margin-bottom:2px}
.mappa .leaflet-popup-content a{color:var(--terracotta);font-weight:600}
.mappa .pop-perche{display:block;color:var(--secondario);font-size:13px;line-height:1.5}
.mappa .leaflet-popup-content-wrapper{max-width:260px}
.mappa .leaflet-tooltip{min-width:170px;
  font-family:var(--sans);font-size:12.5px;line-height:1.45;max-width:240px;white-space:normal;
  background:var(--card,#fff);border:1px solid var(--linea);color:var(--inchiostro);
  box-shadow:0 6px 18px rgba(34,29,22,.2);border-radius:8px;padding:8px 10px
}
.mappa .leaflet-tooltip b{display:block;font-family:var(--serif);font-size:13.5px;margin-bottom:2px}

/* come muoversi */
.mappa-muoversi{margin-top:14px;padding-top:12px;border-top:1px dashed var(--linea)}
.mappa-muoversi b{
  display:block;font-size:11px;letter-spacing:.8px;text-transform:uppercase;
  color:var(--inchiostro);margin-bottom:6px
}
.mappa-muoversi p{font-size:13.5px;line-height:1.6;color:var(--secondario);margin:0 0 6px}
.mappa-muoversi p:last-child{margin-bottom:0}

@media(max-width:640px){
  .mappa{height:270px}
}

/* fumetto della scuola: nome più invito ad aprire la scheda */
.mappa .leaflet-tooltip.tip-scuola{min-width:0;max-width:230px;border-color:var(--terracotta)}
.mappa .leaflet-tooltip.tip-scuola b{color:var(--terracotta-scuro,#9E4527)}
.mappa .leaflet-tooltip.tip-scuola i{
  display:block;font-style:normal;font-size:11.5px;color:var(--secondario);margin-top:3px
}
"""
JS = r"""/* mappe.js — disegna le mappe con Leaflet leggendo la configurazione JSON. */
(function () {
  var SEGNO_SCUOLA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M3 8.5 12 4l9 4.5-9 4.5z"/><path d="M7 11v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5"/></svg>';
  var SEGNO_LUOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 3.5l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z"/></svg>';

  function icona(tipo) {
    var d = tipo === "s" ? 26 : 24;
    var cl = tipo === "s" ? "pin" : "pin-luogo";
    return L.divIcon({
      className: "",
      html: '<div class="' + cl + '" style="width:' + d + 'px;height:' + d + 'px">' +
            (tipo === "s" ? SEGNO_SCUOLA : SEGNO_LUOGO) + '</div>',
      iconSize: [d, d], iconAnchor: [d / 2, d / 2]
    });
  }

  function disegna(dati) {
    var el = document.getElementById(dati.id);
    if (!el || typeof L === "undefined") return;

    var mappa = L.map(el, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mappa);

    var coord = [];
    for (var i = 0; i < dati.punti.length; i++) {
      var p = dati.punti[i];
      var m = L.marker(p.c, { icon: icona(p.t), keyboard: p.t === "s", title: p.n }).addTo(mappa);
      coord.push(p.c);

      if (p.t === "s" && p.u) {
        if (dati.hover) {                     // solo nelle pagine città
          m.bindTooltip('<b>' + p.n + '</b>' + (dati.apri ? '<i>' + dati.apri + '</i>' : ""), {
            direction: "auto", offset: [0, -6], opacity: 1, className: "tip-scuola"
          });
        }
        m.on("click", function (u) {
          return function () { window.location.href = u; };
        }(p.u));
      } else if (p.t === "l" && dati.hover) {
        m.bindTooltip('<b>' + p.n + '</b>' + (p.d ? p.d : ""), {
          direction: "auto", offset: [0, -6], opacity: 1, sticky: false
        });
      } else if (p.t === "l") {
        // nelle schede scuola niente fumetto al passaggio, ma il clic
        // deve comunque dare il perché del luogo
        m.bindPopup('<b>' + p.n + '</b>' + (p.d ? '<span class="pop-perche">' + p.d + '</span>' : ""));
      }
    }

    if (coord.length > 1) {
      mappa.fitBounds(L.latLngBounds(coord).pad(0.34));
      if (mappa.getZoom() > 16) mappa.setZoom(16);
    } else {
      mappa.setView(coord[0] || dati.centro, 15);
    }
    mappa.on("focus", function () { mappa.scrollWheelZoom.enable(); });
    mappa.on("blur", function () { mappa.scrollWheelZoom.disable(); });
  }

  function avvia() {
    var conf = document.querySelectorAll('script[data-mappa]');
    for (var i = 0; i < conf.length; i++) {
      try {
        var d = JSON.parse(conf[i].textContent);
        d.id = conf[i].getAttribute("data-mappa");
        disegna(d);
      } catch (e) { /* configurazione illeggibile: la mappa resta vuota */ }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
"""

def esc(t):
    return html.escape(t or "", quote=True)


def slug(t):
    t = unicodedata.normalize("NFKD", t)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower().replace("'", "-").replace("\u2019", "-")
    return re.sub(r"-{2,}", "-", re.sub(r"[^a-z0-9]+", "-", t)).strip("-")


RE_GUIDA = re.compile(r'<div class="pannello guida".*?<ol>(.*?)</ol>', re.S)
RE_VOCE = re.compile(r"<li><div><b>(.*?)</b><small>(.*?)</small>", re.S)


def testo_semplice(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s))).strip()


def raccogli_luoghi(dir_scuole, dati):
    """I tre luoghi sono già tradotti nelle schede scuola: li rileggo da lì,
    così il fumetto parla la lingua della pagina."""
    per_citta = {}
    for suff, lingua in LINGUE.items():
        base = os.path.join(dir_scuole, suff) if suff else dir_scuole
        if not os.path.isdir(base):
            continue
        for s in dati["scuole"]:
            chiave = (lingua, s["citta"])
            if chiave in per_citta:
                continue
            p = os.path.join(base, s["id"] + ".html")
            if not os.path.exists(p):
                continue
            m = RE_GUIDA.search(open(p, encoding="utf-8").read())
            if not m:
                continue
            voci = [(testo_semplice(a), testo_semplice(b)) for a, b in RE_VOCE.findall(m.group(1))]
            if voci:
                per_citta[chiave] = voci
    return per_citta


def leggi_dati(dir_scuole):
    p = os.path.join(dir_scuole, "dati.js")
    if not os.path.exists(p):
        sys.exit(f"Manca {p}")
    t = open(p, encoding="utf-8").read()
    return json.loads(t[t.find("{"):t.rfind("}") + 1])


# ---------------------------------------------------------------------------
#  1. GEOCODIFICA
# ---------------------------------------------------------------------------
GENERICHE = re.compile(
    r"\b(scuola|scuole|centro|centri|istituto|accademia|academy|school|schools|"
    r"italian|italiano|italiana|language|languages|lingua|lingue|di|de|della|del|"
    r"per|stranieri|international|house|studi|study|studies|cultura|culturale|"
    r"education|educational|formazione|srl|s\.r\.l\.|societa|societ\u00e0)\b", re.I)


def distanza_km(a, b):
    import math
    dlat = math.radians(b[0] - a[0])
    dlon = math.radians(b[1] - a[1])
    m = math.sin(dlat / 2) ** 2 + math.cos(math.radians(a[0])) * math.cos(math.radians(b[0])) * math.sin(dlon / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(m))


def varianti_nome(nome, citta):
    """Diverse forme dello stesso nome, dalla più precisa alla più larga."""
    n = re.sub(r"\(.*?\)", " ", nome).strip()
    n = re.sub(r"\s+", " ", n)
    v = [n]
    # senza il nome della città in coda: "Scuola Leonardo da Vinci Firenze" -> "Scuola Leonardo da Vinci"
    senza = re.sub(r"\s*" + re.escape(citta) + r"\s*$", "", n, flags=re.I).strip()
    if senza and senza != n:
        v.append(senza)
    # solo le parole distintive: "Centro Machiavelli" -> "Machiavelli"
    core = " ".join(p for p in senza.split() if not GENERICHE.fullmatch(p))
    if core and core not in v and len(core) > 2:
        v.append(core)
    return v


def geocodifica(dati, percorso_cache, riprova=False, radice="."):
    try:
        import requests
    except ImportError:
        sys.exit("Serve 'requests'. Attiva il .venv o installa con pip.")

    cache = {}
    if os.path.exists(percorso_cache):
        cache = json.load(open(percorso_cache, encoding="utf-8"))
    ses = requests.Session()
    ses.headers.update({"User-Agent": UA})

    def salva():
        json.dump(cache, open(percorso_cache, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # ---------- Nominatim ------------------------------------------------
    def nominatim(query, centro, raggio_km):
        par = {"q": query, "format": "json", "limit": 5, "countrycodes": "it",
               "addressdetails": 0}
        if centro:
            d = 0.35
            par["viewbox"] = f"{centro[1]-d},{centro[0]+d},{centro[1]+d},{centro[0]-d}"
        try:
            r = ses.get(NOMINATIM, params=par, timeout=25)
            ris = r.json() if r.status_code == 200 else []
        except Exception as exc:
            print(f"      ! rete: {exc}")
            ris = []
        time.sleep(1.1)                       # regola di Nominatim: 1 al secondo
        for x in ris:
            c = [round(float(x["lat"]), 6), round(float(x["lon"]), 6)]
            if not centro or distanza_km(centro, c) <= raggio_km:
                return c
        return None

    # ---------- Overpass: cerca le scuole di lingua mappate --------------
    scuole_osm = {}

    def overpass_citta(nome_citta, centro):
        if nome_citta in scuole_osm or not centro:
            return scuole_osm.get(nome_citta, [])
        q = (f'[out:json][timeout:40];'
             f'(nwr(around:12000,{centro[0]},{centro[1]})["name"]'
             f'["amenity"~"^(language_school|school|college|university)$"];'
             f'nwr(around:12000,{centro[0]},{centro[1]})["name"]["office"="educational_institution"];);'
             f'out center tags;')
        try:
            r = ses.post(OVERPASS, data={"data": q}, timeout=60)
            el = r.json().get("elements", []) if r.status_code == 200 else []
        except Exception:
            el = []
        time.sleep(2.5)                       # Overpass è un servizio gratuito: piano
        fuori = []
        for e in el:
            c = e.get("center") or ({"lat": e.get("lat"), "lon": e.get("lon")})
            if c.get("lat") is None:
                continue
            fuori.append((e["tags"]["name"], [round(c["lat"], 6), round(c["lon"], 6)]))
        scuole_osm[nome_citta] = fuori
        return fuori

    def confronta(nome, citta, centro):
        """Cerca fra le scuole già mappate su OSM in quella città."""
        elenco = overpass_citta(citta, centro)
        if not elenco:
            return None
        # il nome della città non conta: altrimenti "ABC Firenze" pesca
        # "Università di Firenze"
        scarta = set(re.findall(r"[a-z\u00e0-\u00ff]{3,}", citta.lower()))

        def chiavi(s):
            s = GENERICHE.sub(" ", s.lower())
            return set(re.findall(r"[a-z\u00e0-\u00ff]{4,}", s)) - scarta

        def sigle(s):
            return set(re.findall(r"\b[A-Z]{2,6}\b", s))

        mie, mie_sig = chiavi(nome), sigle(nome)
        if not mie and not mie_sig:
            return None
        migliore, punti = None, 0
        for n_osm, c in elenco:
            p = len(mie & chiavi(n_osm)) + len(mie_sig & sigle(n_osm))
            if p > punti:
                migliore, punti = c, p
        return migliore if punti >= 1 else None

    # ---------- giro sulle scuole ----------------------------------------
    tot = ok = 0
    mancanti = []
    for s in dati["scuole"]:
        chiave = "scuola:" + s["id"]
        if chiave in cache and (cache[chiave] is not None or not riprova):
            continue
        citta = s["citta"].split(" (")[0]
        centro = dati["citta"].get(s["citta"], {}).get("coord")
        tot += 1
        c = None
        for v in varianti_nome(s["nome"], citta):
            c = nominatim(f"{v}, {citta}, Italia", centro, 18)
            if c:
                break
        via = "nominatim"
        if not c:
            c = confronta(s["nome"], s["citta"], centro)
            via = "openstreetmap"
        cache[chiave] = c
        ok += 1 if c else 0
        if not c:
            mancanti.append((s["nome"], citta, chiave))
        print(f"  {'ok ' if c else 'NO '} {s['nome'][:46]:48} {via if c else ''}")
        if tot % 8 == 0:
            salva()

    # ---------- giro sui luoghi -------------------------------------------
    for nome_citta, c in dati["citta"].items():
        centro = c.get("coord")
        for i, luogo in enumerate(c.get("top3", [])):
            chiave = f"luogo:{slug(nome_citta)}:{i}"
            if chiave in cache and (cache[chiave] is not None or not riprova):
                continue
            tot += 1
            base = re.split(r"\s+(?:e|ed|and|con|fino)\s+", luogo["nome"])[0]
            base = re.sub(r"\(.*?\)", " ", base).strip(" ,")
            g = None
            for v in (base, re.sub(r"^(Il|La|Le|Lo|I|Gli|L')\s+", "", base)):
                g = nominatim(f"{v}, {nome_citta.split(' (')[0]}, Italia", centro, 22)
                if g:
                    break
            cache[chiave] = g
            ok += 1 if g else 0
            if not g:
                mancanti.append((luogo["nome"], nome_citta, chiave))
            print(f"  {'ok ' if g else 'NO '} {nome_citta[:16]:18} {luogo['nome'][:40]}")
            if tot % 8 == 0:
                salva()

    salva()
    print(f"\ntrovati {ok} su {tot}. Cache: {percorso_cache}")

    if mancanti:
        p = os.path.join(radice, "assets", "coordinate-mancanti.txt")
        with open(p, "w", encoding="utf-8") as f:
            f.write("COORDINATE DA AGGIUNGERE A MANO\n" + "=" * 60 + "\n\n"
                    "Apri il link, clicca col destro sul punto giusto in Google Maps,\n"
                    "copia le due cifre e mettile in assets/coordinate.json al posto di null,\n"
                    'in questa forma:   "scuola-x": [43.771, 11.254]\n\n')
            for nome, citta, chiave in mancanti:
                url = "https://www.google.com/maps/search/" + requests.utils.quote(f"{nome} {citta}")
                f.write(f'"{chiave}"\n  {nome} — {citta}\n  {url}\n\n')
        print(f"da completare a mano: {len(mancanti)} → {p}")
        print("(le voci senza coordinate semplicemente non avranno il pallino)")


# ---------------------------------------------------------------------------
#  2. MAPPE
# ---------------------------------------------------------------------------
LUOGHI_TRADOTTI = {}


def punti_citta(dati, cache, nome_citta, lingua, prefisso):
    scuole = []
    for s in dati["scuole"]:
        if s["citta"] != nome_citta:
            continue
        c = cache.get("scuola:" + s["id"])
        if c:
            scuole.append({"t": "s", "n": s["nome"], "c": c, "u": f'{prefisso}{s["id"]}.html'})
    tradotti = LUOGHI_TRADOTTI.get((lingua, nome_citta)) or []
    luoghi = []
    for i, l in enumerate(dati["citta"].get(nome_citta, {}).get("top3", [])):
        c = cache.get(f"luogo:{slug(nome_citta)}:{i}")
        if not c:
            continue
        nome, desc = (tradotti[i] if i < len(tradotti) else (l["nome"], l.get("perche", "")))
        luoghi.append({"t": "l", "n": nome, "c": c, "d": desc[:190]})
    return scuole, luoghi


def blocco_mappa(dati, cache, nome_citta, lingua, prefisso, scuola_id=None, n=0):
    scuole, luoghi = punti_citta(dati, cache, nome_citta, lingua, prefisso)
    if scuola_id:
        scuole = [x for x in scuole if x["u"].endswith(scuola_id + ".html")]
    punti = scuole + luoghi
    if not punti:
        return None
    L = T[lingua]
    # se la scuola non ha coordinate, la mappa mostra solo i luoghi:
    # il titolo e il testo devono dirlo, non fingere di sapere dov'è la scuola
    scuola_sulla_mappa = bool(scuole) if scuola_id else True
    centro = dati["citta"].get(nome_citta, {}).get("coord") or punti[0]["c"]
    idm = f"mappa-{n}"
    conf = {"centro": centro, "punti": punti, "hover": scuola_id is None,
            "apri": L["apri"]}
    if not scuola_id:
        titolo = L["tit_citta"].format(c=nome_citta)
    else:
        titolo = (L["tit_scuola"] if scuola_sulla_mappa else L["tit_intorno"]).format(c=nome_citta)

    extra = ""
    if scuola_id:
        base = nome_citta.split(" (")[0]
        riga = TRASPORTI.get(nome_citta) or TRASPORTI.get(base)
        if lingua != "it":
            riga = TRASPORTI_ALTRE[lingua]["generico"] if not riga else riga
        elif not riga:
            riga = TRASPORTO_GENERICO
        seconda = f'<p>{esc(L["a_piedi"])}</p>' if scuola_sulla_mappa else ""
        extra = (f'<div class="mappa-muoversi"><b>{esc(L["muoversi"])}</b>'
                 f'<p>{esc(riga)}</p>{seconda}</div>')

    voce_s = (f'<span class="lg lg-s"></span>{esc(L["leg_scuole"])}'
              if (scuole or not scuola_id) else "")
    legenda = (f'<p class="mappa-legenda">{voce_s}'
               f'<span class="lg lg-l"></span>{esc(L["leg_luoghi"])}'
               + (f'<span class="mappa-aiuto">{esc(L["aiuto"])}</span>' if not scuola_id else "")
               + '</p>')

    return (f'{MARCA_I}<div class="pannello mappa-box"><h2>{esc(titolo)}</h2>'
            f'<div class="mappa" id="{idm}" role="img" aria-label="{esc(L["mappa_alt"].format(c=nome_citta))}"></div>'
            f'{legenda}{extra}'
            f'<script type="application/json" data-mappa="{idm}">{json.dumps(conf, ensure_ascii=False)}</script>'
            f'</div>{MARCA_F}')


# ---------------------------------------------------------------------------
#  3. INNESTI
# ---------------------------------------------------------------------------
def togli(t):
    for a, b in ((MARCA_I, MARCA_F), (MARCA_ETA_I, MARCA_ETA_F), (MARCA_FAQ_I, MARCA_FAQ_F)):
        t = re.sub(re.escape(a) + r".*?" + re.escape(b) + r"\s*", "", t, flags=re.S)
    return t


def metti_assets(t):
    if CSS_URL in t:
        return t
    tag = (f'<link rel="stylesheet" href="{LEAFLET_CSS}">\n'
           f'<link rel="stylesheet" href="{CSS_URL}">\n'
           f'<script defer src="{LEAFLET_JS}"></script>\n'
           f'<script defer src="{JS_URL}"></script>\n')
    return t.replace("</head>", tag + "</head>", 1)


def togli_assets(t):
    """Toglie solo i riferimenti aggiunti da questo script.
    Leaflet si rimuove unicamente se è nel blocco che abbiamo messo noi:
    in scuole/mappa.html c'era già di suo e va lasciato stare."""
    blocco = (f'<link rel="stylesheet" href="{LEAFLET_CSS}">\n'
              f'<link rel="stylesheet" href="{CSS_URL}">\n'
              f'<script defer src="{LEAFLET_JS}"></script>\n'
              f'<script defer src="{JS_URL}"></script>\n')
    if blocco in t:
        return t.replace(blocco, "", 1)
    # ripiego: togli solo i nostri due file, mai Leaflet
    t = re.sub(r'<link rel="stylesheet" href="' + re.escape(CSS_URL) + r'">\s*', "", t)
    return re.sub(r'<script defer src="' + re.escape(JS_URL) + r'"></script>\s*', "", t)


def innesta_citta(t, blocco):
    m = re.search(r'<section class="sez citta-box">', t)
    if m:
        return t[:m.start()] + blocco + "\n" + t[m.start():]
    m = re.search(r'</main>', t)
    return t[:m.start()] + blocco + "\n" + t[m.start():] if m else None


def innesta_scuola(t, blocco):
    """prima del riquadro dei giorni festivi"""
    for ancora in ('<div class="pannello festivi"', '<div class="pannello gp"'):
        i = t.find(ancora)
        if i >= 0:
            return t[:i] + blocco + "\n" + t[i:]
    i = t.find("Giorni festivi")
    if i < 0:
        return None
    j = t.rfind('<div class="pannello', 0, i)
    return t[:j] + blocco + "\n" + t[j:] if j >= 0 else None


# etichette dell'età già presenti nel sito, in tutte le lingue
ETICHETTE_ETA = ("Età", "Alter", "Ages", "Âges", "Leeftijd", "Edad", "Wiek", "Age")
RE_ETA = re.compile(r'<span class="etich">(?:' + "|".join(ETICHETTE_ETA) + r')</span>')

# in spagnolo e polacco il generatore lascia l'etichetta in italiano: la traduce
DA_TRADURRE = {"es": "Edad", "pl": "Wiek"}


def traduci_etichetta_eta(t, lingua, indietro=False):
    """Porta l'etichetta dell'età nella lingua della pagina (solo es e pl)."""
    giusta = DA_TRADURRE.get(lingua)
    if not giusta:
        return t, 0
    da, a = ("Età", giusta) if not indietro else (giusta, "Età")
    vecchio = f'<span class="etich">{da}</span>'
    n = t.count(vecchio)
    return (t.replace(vecchio, f'<span class="etich">{a}</span>'), n) if n else (t, 0)


def aggiungi_eta(t, lingua):
    """dove non c'è la riga Età, la aggiunge in cima ai dati del corso"""
    L = T[lingua]
    if RE_ETA.search(t) or MARCA_ETA_I in t:
        return t, 0
    m = re.search(r'<div class="dativ2">', t)
    if not m:
        return t, 0
    fine = t.find("</div>", t.rfind('<div class="riga-dato">', m.end(), t.find("</div></div>", m.end()) + 12))
    icona = ('<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" '
             'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
             '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.2"/>'
             '<path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3A4.5 4.5 0 0 1 15 18.5V20"/>'
             '<path d="M16.5 14.5h1a3.5 3.5 0 0 1 3.5 3.5V20"/></svg>')
    riga = (f'{MARCA_ETA_I}<div class="riga-dato">{icona}'
            f'<span class="etich">{esc(L["eta"])}</span>'
            f'<span class="val">{esc(L["eta_val"])}</span></div>{MARCA_ETA_F}')
    i = t.find('<div class="riga-dato">', m.end())
    return (t[:i] + riga + t[i:], 1) if i > 0 else (t, 0)


def faq_alloggio(t, lingua, nome_citta):
    if MARCA_FAQ_I in t:
        return t, 0
    m = re.search(r'<div class="pannello citta-faq">', t)
    if not m:
        return t, 0
    caro = nome_citta.split(" (")[0] in CITTA_CARE
    f = "€230–320" if caro else "€180–260"
    a = "€200–280" if caro else "€150–220"
    L = T[lingua]
    blocco = (f'{MARCA_FAQ_I}<details><summary>{esc(L["faq_d"].format(c=nome_citta))}</summary>'
              f'<div>{esc(ALLOGGIO[lingua].format(f=f, a=a))}</div></details>{MARCA_FAQ_F}')
    i = t.find(">", m.end() - 1) + 1
    return t[:i] + blocco + t[i:], 1


# ---------------------------------------------------------------------------
#  main
# ---------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".")
    ap.add_argument("--geocodifica", action="store_true")
    ap.add_argument("--riprova", action="store_true",
                    help="ritenta anche le voci rimaste senza coordinate")
    ap.add_argument("--prova", action="store_true")
    ap.add_argument("--togli", action="store_true")
    a = ap.parse_args()

    radice = os.path.abspath(a.sito)
    dir_scuole = os.path.join(radice, "scuole")
    if not os.path.isdir(dir_scuole):
        sys.exit(f"Non trovo {dir_scuole}")
    os.makedirs(os.path.join(radice, "assets"), exist_ok=True)
    cache_path = os.path.join(radice, "assets", "coordinate.json")

    dati = leggi_dati(dir_scuole)

    if a.geocodifica or a.riprova:
        geocodifica(dati, cache_path, riprova=a.riprova, radice=radice)
        return

    if a.togli:
        n = 0
        for base, _, files in os.walk(dir_scuole):
            for f in files:
                if not f.endswith(".html"):
                    continue
                p = os.path.join(base, f)
                t = t0 = open(p, encoding="utf-8").read()
                t = togli_assets(togli(t))
                lg = "it"
                for suff, l in LINGUE.items():
                    if suff and (os.sep + suff + os.sep) in p:
                        lg = l
                t, _ = traduci_etichetta_eta(t, lg, indietro=True)
                if t != t0:
                    open(p, "w", encoding="utf-8").write(t)
                    n += 1
        print(f"rimosso da {n} pagine")
        return

    if not os.path.exists(cache_path):
        sys.exit("Mancano le coordinate. Lancia prima:  python3 5_mappe.py --sito . --geocodifica")
    cache = json.load(open(cache_path, encoding="utf-8"))

    if not a.prova:
        open(os.path.join(radice, "assets", "mappe.css"), "w", encoding="utf-8").write(CSS)
        open(os.path.join(radice, "assets", "mappe.js"), "w", encoding="utf-8").write(JS)
        print("scritti assets/mappe.css e assets/mappe.js")

    global LUOGHI_TRADOTTI
    LUOGHI_TRADOTTI = raccogli_luoghi(dir_scuole, dati)

    per_id = {s["id"]: s for s in dati["scuole"]}
    n_citta = n_scuola = n_eta = n_faq = n_trad = 0
    senza = []

    for suff, lingua in LINGUE.items():
        base = os.path.join(dir_scuole, suff) if suff else dir_scuole

        # ---- schede scuola ----
        if os.path.isdir(base):
            for f in sorted(os.listdir(base)):
                if not f.endswith(".html") or f in ("index.html", "mappa.html"):
                    continue
                sid = f[:-5]
                s = per_id.get(sid)
                if not s:
                    continue
                p = os.path.join(base, f)
                t = t0 = open(p, encoding="utf-8").read()
                t = togli(t)
                b = blocco_mappa(dati, cache, s["citta"], lingua, "", sid, n_scuola)
                if b:
                    nuovo = innesta_scuola(t, b)
                    if nuovo:
                        t = metti_assets(nuovo)
                        n_scuola += 1
                    else:
                        senza.append((p, "punto d'innesto mappa"))
                else:
                    senza.append((p, "coordinate mancanti"))
                t, k = aggiungi_eta(t, lingua)
                n_eta += k
                t, k2 = traduci_etichetta_eta(t, lingua)
                n_trad += k2
                if t != t0 and not a.prova:
                    open(p, "w", encoding="utf-8").write(t)

        # ---- pagine città ----
        dir_citta = os.path.join(base, "citta")
        if not os.path.isdir(dir_citta):
            continue
        for f in sorted(os.listdir(dir_citta)):
            if not f.endswith(".html"):
                continue
            p = os.path.join(dir_citta, f)
            t = t0 = open(p, encoding="utf-8").read()
            nome_citta = next((c for c in dati["citta"] if slug(c) == f[:-5]), None)
            if not nome_citta:
                continue
            t = togli(t)
            b = blocco_mappa(dati, cache, nome_citta, lingua, "../", None, 1000 + n_citta)
            if b:
                nuovo = innesta_citta(t, b)
                if nuovo:
                    t = metti_assets(nuovo)
                    n_citta += 1
            t, k = faq_alloggio(t, lingua, nome_citta)
            n_faq += k
            if t != t0 and not a.prova:
                open(p, "w", encoding="utf-8").write(t)

    print(f"\n{'(prova) ' if a.prova else ''}mappe nelle pagine città: {n_citta}")
    print(f"mappe nelle schede scuola: {n_scuola}")
    print(f"riga Età aggiunta: {n_eta}")
    print(f"domanda sull'alloggio: {n_faq}")
    if n_trad:
        print(f"etichetta \"Età\" tradotta in spagnolo e polacco: {n_trad}")
    if senza:
        print(f"\nsenza mappa: {len(senza)}")
        for p, perche in senza[:10]:
            print("  -", os.path.relpath(p, radice), "→", perche)


if __name__ == "__main__":
    main()
