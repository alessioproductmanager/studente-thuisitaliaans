#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================================
 3_cartoline.py — mette il mazzo di cartoline nelle pagine città e scuola
============================================================================
 Cosa fa:
   · scrive  assets/cartoline.css  e  assets/cartoline.js
   · in ogni pagina città  → blocco cartoline subito sotto l'introduzione
   · in ogni scheda scuola → blocco cartoline sotto "Cosa non perdere"
   · frasi da cartolina in 7 lingue, 10 template grafici a rotazione
   · alt, didascalie con crediti, JSON-LD ImageObject (licenza per Google)

 Uso:
     python3 3_cartoline.py --sito /percorso/del/sito
     python3 3_cartoline.py --sito . --prova        (non scrive: dice solo cosa farebbe)
     python3 3_cartoline.py --sito . --togli        (rimuove tutti i blocchi)

 Struttura attesa:
     <sito>/scuole/*.html               schede scuola (italiano)
     <sito>/scuole/citta/*.html         pagine città (italiano)
     <sito>/scuole/<lingua>/...         le altre 6 lingue
     <sito>/assets/scuola_cartoline/    le foto + manifest.json

 È idempotente: rilanciarlo aggiorna il blocco, non lo duplica.
============================================================================
"""

import argparse
import html
import json
import os
import random
import re
import sys
import unicodedata

MARCA_INIZIO = "<!--cartoline-->"
MARCA_FINE = "<!--/cartoline-->"
MARCA_PIEDE_I = "<!--cartoline-crediti-->"
MARCA_PIEDE_F = "<!--/cartoline-crediti-->"
MARCA_APP_I = "<!--app-mini-->"
MARCA_APP_F = "<!--/app-mini-->"

PREFISSO_FOTO = "/assets/scuola_cartoline"
CSS_URL = "/assets/cartoline.css"
JS_URL = "/assets/cartoline.js"

LINGUE = {"": "it", "de": "de", "en": "en", "es": "es", "fr": "fr", "nl": "nl", "pl": "pl"}
N_TEMPLATE = 10

# foto da non pubblicare (soggetti generici finiti nella città sbagliata)
ESCLUDI = ("appian way",)

PAESE = {"it": "Italia", "en": "Italy", "nl": "Italië", "de": "Italien",
         "fr": "Italie", "es": "Italia", "pl": "Włochy"}

# ---------------------------------------------------------------------------
#  TESTI
# ---------------------------------------------------------------------------
FRASI = {
    "it": {
        "citta": ["Saluti da {c}", "Un abbraccio da {c}", "Cartolina da {c}"],
        "scuola": ["Il mio soggiorno studio a {s}", "Studio l'italiano a {s}", "La mia settimana a {s}"],
        "titolo_c": "{c} in tre cartoline",
        "titolo_s": "La città dove studierai",
        "testo_c": "Così si presenta {c} ({r}): le strade che percorrerai ogni mattina per andare a lezione e i posti dove ti servirà l'italiano vero, quello del bar e del mercato.",
        "testo_s": "{s} è a {c} ({r}). Fuori dall'aula la lingua si allena qui: al banco del caffè, in piazza, al mercato.",
        "nelle_foto": "Nelle foto: {x}.", "e": "e", "foto": "Foto",
        "aria": "Cartoline da {c}", "aiuto": "clicca per girare le cartoline",
    "crediti_tit": 'Crediti fotografici', "crediti_link": 'crediti completi',
        "chip": ['{h} vere/sett.', 'max {n} in classe', 'lezione {m}'],
        "app_tit": 'Arriva già pronto.', "app_txt": "Con l'app <b>ti</b> leggi racconti graduati con la traduzione in 14 lingue. Cinque minuti al giorno da qui alla partenza.", "app_cta": "Scarica l'app ti ↗",
        "app_alt": "L'app ti: cinque minuti al giorno, da zero a C2", "credito_riga": 'Foto di {a}, licenza {l}, da Wikimedia Commons.',
    },
    "en": {
        "citta": ["Greetings from {c}", "Hello from {c}", "A postcard from {c}"],
        "scuola": ["My study stay at {s}", "Learning Italian at {s}", "My week at {s}"],
        "titolo_c": "{c} in three postcards",
        "titolo_s": "The city where you'll study",
        "testo_c": "This is {c} ({r}): the streets you'll walk every morning on your way to class, and the places where you'll need real Italian — the kind spoken at the bar and the market.",
        "testo_s": "{s} is in {c} ({r}). Outside the classroom this is where the language gets practised: at the coffee counter, in the square, at the market.",
        "nelle_foto": "In the photos: {x}.", "e": "and", "foto": "Photos",
        "aria": "Postcards from {c}", "aiuto": "click to shuffle the postcards",
    "crediti_tit": 'Photo credits', "crediti_link": 'full credits',
        "chip": ['{h} real/week', 'max {n} per class', '{m} lesson'],
        "app_tit": 'Arrive ready.', "app_txt": 'With the <b>ti</b> app you read graded stories with support in 14 languages. Five minutes a day between now and departure.', "app_cta": 'Get the ti app ↗',
        "app_alt": 'The ti app: five minutes a day, from zero to C2', "credito_riga": 'Photo by {a}, licence {l}, from Wikimedia Commons.',
    },
    "nl": {
        "citta": ["Groeten uit {c}", "Hallo uit {c}", "Een kaartje uit {c}"],
        "scuola": ["Mijn taalreis bij {s}", "Ik leer Italiaans bij {s}", "Mijn week bij {s}"],
        "titolo_c": "{c} in drie ansichtkaarten",
        "titolo_s": "De stad waar je gaat studeren",
        "testo_c": "Zo ziet {c} ({r}) eruit: de straten waar je elke ochtend doorheen loopt naar de les, en de plekken waar je echt Italiaans nodig hebt — dat van de bar en de markt.",
        "testo_s": "{s} zit in {c} ({r}). Buiten het lokaal oefen je de taal hier: aan de koffiebar, op het plein, op de markt.",
        "nelle_foto": "Op de foto's: {x}.", "e": "en", "foto": "Foto's",
        "aria": "Ansichtkaarten uit {c}", "aiuto": "klik om te bladeren",
    "crediti_tit": 'Fotocredits', "crediti_link": 'volledige credits',
        "chip": ['{h} echt/week', 'max {n} per klas', 'les {m}'],
        "app_tit": 'Kom voorbereid aan.', "app_txt": 'Met de app <b>ti</b> lees je verhalen op niveau, met ondersteuning in 14 talen. Vijf minuten per dag tot je vertrek.', "app_cta": 'Download de ti-app ↗',
        "app_alt": 'De ti-app: vijf minuten per dag, van nul naar C2', "credito_riga": 'Foto van {a}, licentie {l}, via Wikimedia Commons.',
    },
    "de": {
        "citta": ["Grüße aus {c}", "Hallo aus {c}", "Eine Karte aus {c}"],
        "scuola": ["Mein Sprachaufenthalt bei {s}", "Ich lerne Italienisch bei {s}", "Meine Woche bei {s}"],
        "titolo_c": "{c} in drei Postkarten",
        "titolo_s": "Die Stadt, in der du lernst",
        "testo_c": "So sieht {c} ({r}) aus: die Straßen, die du jeden Morgen zum Unterricht gehst, und die Orte, an denen du echtes Italienisch brauchst — das von der Bar und vom Markt.",
        "testo_s": "{s} liegt in {c} ({r}). Außerhalb des Kursraums übst du die Sprache hier: an der Kaffeetheke, auf der Piazza, auf dem Markt.",
        "nelle_foto": "Auf den Fotos: {x}.", "e": "und", "foto": "Fotos",
        "aria": "Postkarten aus {c}", "aiuto": "zum Blättern klicken",
    "crediti_tit": 'Bildnachweis', "crediti_link": 'vollständige Nachweise',
        "chip": ['{h} echt/Woche', 'max. {n} pro Klasse', '{m} Unterricht'],
        "app_tit": 'Komm vorbereitet an.', "app_txt": 'Mit der App <b>ti</b> liest du abgestufte Geschichten mit Unterstützung in 14 Sprachen. Fünf Minuten am Tag bis zur Abreise.', "app_cta": 'Die ti-App laden ↗',
        "app_alt": 'Die ti-App: fünf Minuten am Tag, von null auf C2', "credito_riga": 'Foto von {a}, Lizenz {l}, von Wikimedia Commons.',
    },
    "fr": {
        "citta": ["Bonjour de {c}", "Un bonjour de {c}", "Une carte de {c}"],
        "scuola": ["Mon séjour linguistique à {s}", "J'apprends l'italien à {s}", "Ma semaine à {s}"],
        "titolo_c": "{c} en trois cartes postales",
        "titolo_s": "La ville où vous étudierez",
        "testo_c": "Voici {c} ({r}) : les rues que vous emprunterez chaque matin pour aller en cours et les endroits où il vous faudra le vrai italien, celui du bar et du marché.",
        "testo_s": "{s} se trouve à {c} ({r}). Hors de la classe, la langue se travaille ici : au comptoir du café, sur la place, au marché.",
        "nelle_foto": "Sur les photos : {x}.", "e": "et", "foto": "Photos",
        "aria": "Cartes postales de {c}", "aiuto": "cliquez pour faire défiler",
    "crediti_tit": 'Crédits photo', "crediti_link": 'crédits complets',
        "chip": ['{h} réelles/sem.', 'max {n} par classe', 'cours {m}'],
        "app_tit": 'Arrivez déjà prêt.', "app_txt": "Avec l'appli <b>ti</b>, vous lisez des récits gradués avec un soutien en 14 langues. Cinq minutes par jour d'ici au départ.", "app_cta": "Télécharger l'appli ti ↗",
        "app_alt": "L'appli ti : cinq minutes par jour, de zéro à C2", "credito_riga": 'Photo de {a}, licence {l}, via Wikimedia Commons.',
    },
    "es": {
        "citta": ["Saludos desde {c}", "Un abrazo desde {c}", "Una postal desde {c}"],
        "scuola": ["Mi estancia de estudios en {s}", "Aprendo italiano en {s}", "Mi semana en {s}"],
        "titolo_c": "{c} en tres postales",
        "titolo_s": "La ciudad donde estudiarás",
        "testo_c": "Así es {c} ({r}): las calles que recorrerás cada mañana camino de clase y los sitios donde necesitarás el italiano de verdad, el del bar y el del mercado.",
        "testo_s": "{s} está en {c} ({r}). Fuera del aula el idioma se practica aquí: en la barra del café, en la plaza, en el mercado.",
        "nelle_foto": "En las fotos: {x}.", "e": "y", "foto": "Fotos",
        "aria": "Postales desde {c}", "aiuto": "haz clic para pasar las postales",
    "crediti_tit": 'Créditos fotográficos', "crediti_link": 'créditos completos',
        "chip": ['{h} reales/sem.', 'máx. {n} por clase', 'clase {m}'],
        "app_tit": 'Llega ya preparado.', "app_txt": 'Con la app <b>ti</b> lees relatos graduados con apoyo en 14 idiomas. Cinco minutos al día de aquí a la salida.', "app_cta": 'Descargar la app ti ↗',
        "app_alt": 'La app ti: cinco minutos al día, de cero a C2', "credito_riga": 'Foto de {a}, licencia {l}, desde Wikimedia Commons.',
    },
    "pl": {
        "citta": ["Pozdrowienia z miasta {c}", "Kartka z miasta {c}", "Pozdrowienia — {c}"],
        "scuola": ["Mój kurs językowy w {s}", "Uczę się włoskiego w {s}", "Mój tydzień w {s}"],
        "titolo_c": "{c} na trzech pocztówkach",
        "titolo_s": "Miasto, w którym będziesz się uczyć",
        "testo_c": "Tak wygląda {c} ({r}): ulice, którymi codziennie rano pójdziesz na zajęcia, i miejsca, gdzie przyda się prawdziwy włoski — ten z baru i z targu.",
        "testo_s": "{s} znajduje się w mieście {c} ({r}). Poza salą języka uczysz się tutaj: przy barze z kawą, na placu, na targu.",
        "nelle_foto": "Na zdjęciach: {x}.", "e": "i", "foto": "Zdjęcia",
        "aria": "Pocztówki z miasta {c}", "aiuto": "kliknij, aby przewijać",
    "crediti_tit": 'Źródła zdjęć', "crediti_link": 'pełne źródła',
        "chip": ['{h} rzecz./tydz.', 'maks. {n} w klasie', 'lekcja {m}'],
        "app_tit": 'Przyjedź przygotowany.', "app_txt": 'Z aplikacją <b>ti</b> czytasz teksty na swoim poziomie, ze wsparciem w 14 językach. Pięć minut dziennie do wyjazdu.', "app_cta": 'Pobierz aplikację ti ↗',
        "app_alt": 'Aplikacja ti: pięć minut dziennie, od zera do C2', "credito_riga": 'Zdjęcie: {a}, licencja {l}, z Wikimedia Commons.',
    },
}

CSS = r"""/* ==========================================================================
   cartoline.css — mazzo di cartoline per pagine città e schede scuola
   thuisitaliaans.com · usa i token già presenti nelle pagine
   ========================================================================== */

.cartoline{
  --cart-blu:#2C4B78;            /* blu posta aerea */
  --cart-mano:"Snell Roundhand","Segoe Script","Bradley Hand",var(--serif);
  --cart-carta:#FCFAF5;
  --cart-ombra:0 1px 2px rgba(34,29,22,.10),0 20px 38px -18px rgba(34,29,22,.45);
  margin:24px 0;
  display:grid;
  gap:14px;
  align-items:center;
  background:var(--card);
  border:1px solid var(--linea);
  border-radius:var(--r);
  padding:20px 22px 18px;
  box-shadow:var(--ombra);
}
.cartoline--scuola{margin-top:18px;padding:16px 16px 14px}
@media(min-width:880px){
  .cartoline--citta{grid-template-columns:1fr minmax(300px,430px);gap:34px;padding:24px 28px 22px}
}

/* ---------- testo di corredo ---------------------------------------- */
.cart-testo h2,.cart-testo h3{font-family:var(--serif);font-size:20px;margin-bottom:8px;font-weight:600}
.cart-testo p{font-size:15px;color:var(--secondario);line-height:1.6}
.cart-crediti{margin-top:12px;font-size:11.5px;line-height:1.55;color:var(--secondario)}
.cart-crediti a{color:inherit;text-decoration:underline;text-underline-offset:2px}

/* ---------- il mazzo -------------------------------------------------- */
.cart-mazzo{
  position:relative;
  width:100%;
  aspect-ratio:1.44/1;
  margin:6px 84px 26px 16px;
  perspective:1400px;
}
.cart-mazzo:focus-visible{outline:2px solid var(--terracotta);outline-offset:8px;border-radius:6px}

.cart{
  position:absolute;
  inset:0;
  margin:0;
  transform-origin:50% 88%;
  transition:transform .85s cubic-bezier(.22,.85,.28,1),filter .85s ease,opacity .4s ease;
  will-change:transform;
}
.cart[data-pos="0"]{transform:rotate(var(--rot,0deg));z-index:3}
.cart[data-pos="1"]{transform:rotate(calc(var(--rot,0deg) - 3.2deg)) translate(-3%,3.4%) scale(.955);z-index:2;filter:brightness(.965) saturate(.95)}
.cart[data-pos="2"]{transform:rotate(calc(var(--rot,0deg) + 4.4deg)) translate(-6.5%,6.8%) scale(.912);z-index:1;filter:brightness(.93) saturate(.9)}
.cart.esce{transform:rotate(calc(var(--rot,0deg) + 2deg)) translate(16px,-11%) scale(1.01);z-index:9}

.cart-carta{
  position:relative;height:100%;
  background:var(--card);
  border-radius:3px;
  padding:11px 11px 13px;
  box-shadow:var(--cart-ombra);
}
.cart-foto{position:relative;height:100%;overflow:hidden;background:var(--linea)}
.cart-foto img{display:block;width:100%;height:100%;object-fit:cover}

/* ---------- francobollo ---------------------------------------------- */
.cart-bollo{
  position:absolute;top:9px;right:9px;z-index:3;
  width:40px;height:49px;
  background:linear-gradient(155deg,#EFE5D2,#DDCBAB);
  border:2px solid #FFFDF8;
  border-radius:2px;
  box-shadow:0 1px 3px rgba(34,29,22,.3);
  transform:rotate(4deg);
  display:flex;align-items:flex-end;justify-content:center;
  font:700 8px/1 var(--sans);letter-spacing:.4px;color:#8A7A5C;
  padding-bottom:4px;
}
.cart-bollo::before{
  content:"";position:absolute;inset:4px;border:1px dashed rgba(138,122,92,.55);border-radius:1px;
}
.cart-bollo::after{content:"ITALIA";position:relative}

/* ---------- timbro postale ------------------------------------------- */
.cart-timbro{
  position:absolute;top:38px;right:16px;z-index:4;
  width:62px;height:62px;border-radius:50%;
  border:1.6px solid rgba(44,75,120,.62);
  color:rgba(44,75,120,.72);
  display:flex;align-items:center;justify-content:center;text-align:center;
  font:700 8.5px/1.25 var(--sans);letter-spacing:.6px;text-transform:uppercase;
  transform:rotate(-13deg);
  padding:6px;
  overflow:hidden;
}
.cart-timbro::before{
  content:"";position:absolute;inset:4px;border-radius:50%;border:1px solid rgba(44,75,120,.4);
}

/* ---------- saluto ---------------------------------------------------- */
.cart-saluto{
  position:absolute;left:0;right:0;bottom:0;z-index:3;
  padding:26px 14px 11px;
  background:linear-gradient(transparent,rgba(20,15,10,.72));
  color:#fff;
  font-family:var(--cart-mano);font-style:italic;
  font-size:clamp(19px,4.4vw,27px);line-height:1.15;
  text-shadow:0 2px 10px rgba(0,0,0,.5);
}

/* ==========================================================================
   TEMPLATE 1 — posta aerea (bordo a chevron rosso/blu)
   ========================================================================== */
.cart--t1 .cart-carta{
  padding:13px;
  background:
    repeating-linear-gradient(45deg,var(--terracotta) 0 9px,#fff 9px 18px,var(--cart-blu) 18px 27px,#fff 27px 36px) border-box;
  border:0;
}
.cart--t1 .cart-carta::before{
  content:"";position:absolute;inset:7px;background:var(--card);
}
.cart--t1 .cart-foto{z-index:1;margin:-2px}
.cart--t1 .cart-bollo{top:12px;right:12px}
.cart--t1 .cart-timbro{top:66px;right:26px}

/* ==========================================================================
   TEMPLATE 2 — timbro grande a cavallo dell'angolo
   ========================================================================== */
.cart--t2 .cart-carta{padding:9px 9px 11px}
.cart--t2 .cart-timbro{
  width:92px;height:92px;top:-14px;right:-14px;
  border-width:2px;font-size:9.5px;letter-spacing:1px;
  background:rgba(250,246,239,.28);backdrop-filter:blur(1px);
  transform:rotate(-9deg);
}
.cart--t2 .cart-bollo{display:none}
.cart--t2 .cart-saluto{
  background:none;color:var(--card);
  text-align:center;padding:0 16px 16px;
  font-size:clamp(20px,4.8vw,30px);
}
.cart--t2 .cart-foto::after{
  content:"";position:absolute;inset:0;background:linear-gradient(transparent 55%,rgba(20,15,10,.62))
}

/* ==========================================================================
   TEMPLATE 3 — lettere grandi in serif, sotto la foto
   ========================================================================== */
.cart--t3 .cart-carta{padding:10px 10px 46px;background:var(--cart-carta)}
.cart--t3 .cart-saluto{
  position:absolute;bottom:8px;left:12px;right:12px;top:auto;
  background:none;color:var(--terracotta);
  font-family:var(--serif);font-style:normal;font-weight:700;
  font-size:clamp(15px,3.2vw,21px);letter-spacing:.6px;text-transform:uppercase;
  text-shadow:none;padding:0;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.cart--t3 .cart-bollo{top:10px;right:10px;bottom:auto;width:34px;height:42px;transform:rotate(-5deg)}
.cart--t3 .cart-timbro{display:none}

/* ==========================================================================
   TEMPLATE 4 — retro della cartolina (righe + riquadro indirizzo)
   ========================================================================== */
.cart--t4 .cart-carta{padding:10px;display:flex;gap:9px;background:var(--cart-carta)}
.cart--t4 .cart-foto{flex:1 1 60%;min-width:0}
.cart--t4 .cart-carta::after{
  content:"";flex:1 1 40%;
  border-left:1px solid var(--linea);
  background:
    repeating-linear-gradient(transparent 0 15px,var(--linea) 15px 16px) 0 42px/100% 100% no-repeat;
}
.cart--t4 .cart-bollo{top:14px;right:14px;transform:rotate(-3deg)}
.cart--t4 .cart-timbro{top:52px;right:22px;width:52px;height:52px;font-size:7.5px}
.cart--t4 .cart-saluto{
  left:auto;right:12px;bottom:12px;width:36%;
  background:none;color:var(--inchiostro);text-shadow:none;padding:0;
  font-size:clamp(14px,3vw,20px);line-height:1.25;
}

/* ==========================================================================
   TEMPLATE 5 — nastro di carta (come il post-it del monitor)
   ========================================================================== */
.cart--t5 .cart-carta{padding:12px 12px 14px;transform:none}
.cart--t5 .cart-saluto{
  top:16px;bottom:auto;left:-8px;right:auto;
  width:auto;max-width:78%;
  background:var(--ambra-chiara);
  color:var(--inchiostro);text-shadow:none;
  padding:7px 16px 8px;
  border-radius:2px;
  box-shadow:0 4px 12px rgba(34,29,22,.2);
  transform:rotate(-2.2deg);
  font-size:clamp(16px,3.4vw,23px);
}
.cart--t5 .cart-saluto::before{
  content:"";position:absolute;top:-7px;left:22px;width:44px;height:14px;
  background:rgba(255,255,255,.55);border:1px solid rgba(34,29,22,.08);transform:rotate(-4deg);
}
.cart--t5 .cart-bollo{top:auto;bottom:10px;right:10px}
.cart--t5 .cart-timbro{display:none}

/* ==========================================================================
   TEMPLATE 6 — fascia diagonale in alto a sinistra
   ========================================================================== */
.cart--t6 .cart-carta{padding:10px}
.cart--t6 .cart-saluto{
  top:30px;bottom:auto;left:-72px;right:auto;
  width:300px;text-align:center;
  background:var(--terracotta);
  padding:8px 0 9px;
  transform:rotate(-32deg);
  font-size:clamp(12px,2.4vw,15px);line-height:1.2;
  text-shadow:none;
  box-shadow:0 6px 16px rgba(34,29,22,.25);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.cart--t6 .cart-bollo{top:auto;bottom:11px;left:11px;right:auto;transform:rotate(-6deg)}
.cart--t6 .cart-timbro{top:auto;bottom:20px;left:52px;right:auto;width:54px;height:54px;font-size:7.5px}

/* ==========================================================================
   TEMPLATE 7 — la cartolina è un francobollo (bordo dentellato)
   ========================================================================== */
.cart--t7 .cart-carta{padding:14px;background:#fff;border-radius:2px}
.cart--t7 .cart-carta::before{
  content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:
    radial-gradient(circle 4.5px at 8px 0,var(--carta) 97%,#0000) top left/16px 16px repeat-x,
    radial-gradient(circle 4.5px at 8px 16px,var(--carta) 97%,#0000) bottom left/16px 16px repeat-x,
    radial-gradient(circle 4.5px at 0 8px,var(--carta) 97%,#0000) top left/16px 16px repeat-y,
    radial-gradient(circle 4.5px at 16px 8px,var(--carta) 97%,#0000) top right/16px 16px repeat-y;
}
.cart--t7 .cart-bollo{display:none}
.cart--t7 .cart-timbro{top:16px;right:18px;width:56px;height:56px;font-size:7.5px}
.cart--t7 .cart-saluto{
  padding:24px 14px 10px;
  font-family:var(--serif);font-style:italic;font-weight:600;
  font-size:clamp(16px,3.4vw,22px);
}
.cart--t7 .cart-foto::before{
  content:"€ 0,15";position:absolute;left:8px;bottom:8px;z-index:3;
  font:700 10px/1 var(--sans);color:#fff;letter-spacing:.6px;
  text-shadow:0 1px 4px rgba(0,0,0,.6);
}

/* ==========================================================================
   TEMPLATE 8 — album di viaggio (angolini di carta)
   ========================================================================== */
.cart--t8 .cart-carta{padding:16px 16px 42px;background:var(--ambra-chiara)}
.cart--t8 .cart-foto{box-shadow:0 2px 8px rgba(34,29,22,.22)}
.cart--t8 .cart-carta::before,
.cart--t8 .cart-carta::after{
  content:"";position:absolute;width:26px;height:26px;z-index:3;
  background:linear-gradient(45deg,rgba(255,255,255,.9) 50%,transparent 51%);
  box-shadow:0 1px 2px rgba(34,29,22,.2);
}
.cart--t8 .cart-carta::before{left:10px;bottom:36px;transform:rotate(45deg)}
.cart--t8 .cart-carta::after{right:10px;top:10px;transform:rotate(225deg)}
.cart--t8 .cart-saluto{
  bottom:9px;left:16px;right:16px;top:auto;
  background:none;color:var(--inchiostro);text-shadow:none;padding:0;
  font-size:clamp(16px,3.4vw,23px);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.cart--t8 .cart-bollo{top:auto;bottom:6px;right:14px;width:28px;height:34px}
.cart--t8 .cart-timbro{display:none}

/* ==========================================================================
   TEMPLATE 9 — fascia salvia in basso
   ========================================================================== */
.cart--t9 .cart-carta{padding:10px 10px 40px;background:var(--salvia)}
.cart--t9 .cart-saluto{
  bottom:8px;left:14px;right:14px;top:auto;
  background:none;color:#fff;text-shadow:none;padding:0;
  font-family:var(--serif);font-style:normal;font-weight:600;
  font-size:clamp(14px,3vw,19px);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.cart--t9 .cart-bollo{top:10px;left:10px;right:auto;transform:rotate(-5deg)}
.cart--t9 .cart-timbro{top:42px;left:20px;right:auto;border-color:rgba(255,255,255,.75);color:rgba(255,255,255,.85)}
.cart--t9 .cart-timbro::before{border-color:rgba(255,255,255,.5)}

/* ==========================================================================
   TEMPLATE 10 — cartiglio ovale in basso a destra
   ========================================================================== */
.cart--t10 .cart-carta{padding:12px;border-radius:14px;background:var(--cart-carta)}
.cart--t10 .cart-foto{border-radius:9px}
.cart--t10 .cart-saluto{
  left:auto;right:14px;bottom:14px;width:auto;max-width:70%;
  background:rgba(252,250,245,.94);
  color:var(--terracotta-scuro);text-shadow:none;
  padding:9px 20px 10px;border-radius:999px;
  border:1px solid var(--linea);
  box-shadow:0 6px 18px rgba(34,29,22,.22);
  font-size:clamp(15px,3.2vw,21px);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}
.cart--t10 .cart-bollo{top:12px;right:12px;transform:rotate(6deg)}
.cart--t10 .cart-timbro{display:none}

/* ==========================================================================
   accessibilità / preferenze
   ========================================================================== */
@media(prefers-reduced-motion:reduce){
  .cart{transition:none}
}
@media(max-width:760px){
  .cart-mazzo{margin:4px 64px 20px 8px}
  .cart.esce{transform:rotate(calc(var(--rot,0deg) + 2deg)) translate(10px,-12%) scale(.99)}
  .cart[data-pos="1"]{transform:rotate(calc(var(--rot,0deg) - 2.6deg)) translate(-2.4%,2.8%) scale(.962)}
  .cart[data-pos="2"]{transform:rotate(calc(var(--rot,0deg) + 3.4deg)) translate(-5%,5.4%) scale(.925)}
}
@media(max-width:520px){
  .cartoline{padding:14px 14px 12px}
  .cart-mazzo{margin:4px 30px 18px 14px}
  .cart-timbro{transform:rotate(-13deg) scale(.85)}
}

/* frasi lunghe (nomi di scuola) */
.cartoline--scuola .cart-saluto{font-size:clamp(14px,2.9vw,19px);line-height:1.2}
.cartoline--scuola .cart--t3 .cart-saluto,
.cartoline--scuola .cart--t9 .cart-saluto{font-size:clamp(12px,2.5vw,16px)}
.cartoline--scuola .cart--t6 .cart-saluto{font-size:clamp(11px,2.2vw,13.5px)}

/* più aria per le fasce di testo quando la frase è lunga */
.cartoline--scuola .cart--t3 .cart-carta{padding-bottom:58px}
.cartoline--scuola .cart--t8 .cart-carta{padding-bottom:56px}
.cartoline--scuola .cart--t9 .cart-carta{padding-bottom:56px}

/* riga crediti compatta */
.cart-crediti{margin-top:10px;font-size:11.5px;line-height:1.5;color:var(--secondario)}
.cart-crediti a{color:inherit}

/* crediti completi nel piede pagina */
.cart-crediti-lungo{margin-top:14px;padding-top:12px;border-top:1px dashed var(--linea);font-size:11.5px;line-height:1.55;color:var(--secondario)}
.cart-crediti-lungo b{color:var(--inchiostro);font-size:11px;letter-spacing:.6px;text-transform:uppercase;display:block;margin-bottom:6px}
.cart-crediti-lungo li{list-style:none;margin-bottom:4px}
.cart-crediti-lungo a{color:inherit}

/* chip informativi nelle liste scuola delle pagine città */
.citta-scuola .tagriga{margin-top:8px}
.citta-scuola .tag{font-size:11.5px;padding:3px 9px}

/* schede scuola: colonna stretta, la cartolina non deve sbordare */
.cartoline--scuola .cart-mazzo{margin:4px 84px 18px 4px}
.cartoline--scuola .cart.esce{transform:rotate(calc(var(--rot,0deg) + 1.5deg)) translate(14px,-11%) scale(1)}

/* crediti in fondo pagina, dentro un riquadro */
.cart-crediti-lungo{margin:22px 0 6px;padding:16px 18px;border:1px solid var(--linea);
  border-radius:var(--r-s);background:var(--card);font-size:12px;line-height:1.6;color:var(--secondario)}
.cart-crediti-lungo b{color:var(--inchiostro);font-size:11px;letter-spacing:.8px;text-transform:uppercase;
  display:block;margin-bottom:8px}
.cart-crediti-lungo ul{margin:0;padding:0}
.cart-crediti-lungo li{list-style:none;margin-bottom:5px}
.cart-crediti-lungo i{color:var(--inchiostro);font-style:italic}
.cart-crediti-lungo a{color:inherit;text-decoration:underline;text-underline-offset:2px}

/* promo app compatta, dentro la scheda scuola */
.app-mini{margin-top:18px;display:grid;grid-template-columns:98px 1fr;gap:18px;align-items:center;
  background:linear-gradient(135deg,#FBF7F0,#F3E9DD);border:1px solid var(--linea);
  border-radius:var(--r);padding:16px 18px}
.app-mini-tel{width:100%;height:auto;border-radius:10px;filter:drop-shadow(3px 6px 12px rgba(34,29,22,.2))}
.app-mini h2{font-family:var(--serif);font-size:19px;margin:0 0 6px;font-weight:600}
.app-mini p{font-size:14px;color:var(--secondario);line-height:1.55;margin:0 0 12px}
.app-mini p b{color:var(--inchiostro)}
.app-mini .app-cta{display:inline-block;background:var(--inchiostro);color:#fff;font-weight:600;
  text-decoration:none;padding:9px 17px;border-radius:999px;font-size:14px}
.app-mini .app-cta:hover{background:var(--terracotta)}
@media(max-width:520px){.app-mini{grid-template-columns:74px 1fr;gap:14px;padding:14px}}
"""
JS = r"""/* cartoline.js — fa "smazzare" le cartoline. Senza JS restano impilate, ferme. */
(function () {
  var PAUSA = 5200, USCITA = 560;
  var ridotto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function avanza(mazzo) {
    var carte = mazzo.querySelectorAll('.cart');
    if (carte.length < 2 || mazzo.dataset.ferma === '1') return;
    var n = carte.length, davanti = null, i;
    for (i = 0; i < n; i++) if (carte[i].dataset.pos === '0') davanti = carte[i];
    if (!davanti) return;
    davanti.classList.add('esce');
    setTimeout(function () {
      for (i = 0; i < n; i++) {
        carte[i].dataset.pos = String((parseInt(carte[i].dataset.pos, 10) + n - 1) % n);
      }
      davanti.classList.remove('esce');
    }, USCITA);
  }

  function attiva(mazzo) {
    var timer = null;
    function via() { if (!timer) timer = setInterval(function () { avanza(mazzo); }, PAUSA); }
    function stop() { clearInterval(timer); timer = null; }

    mazzo.addEventListener('mouseenter', function () { mazzo.dataset.ferma = '1'; });
    mazzo.addEventListener('mouseleave', function () { mazzo.dataset.ferma = '0'; });
    mazzo.addEventListener('focusin', function () { mazzo.dataset.ferma = '1'; });
    mazzo.addEventListener('focusout', function () { mazzo.dataset.ferma = '0'; });
    mazzo.addEventListener('click', function () { avanza(mazzo); });
    mazzo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); avanza(mazzo); }
    });

    if (ridotto) return;                       // niente rotazione automatica
    if (!('IntersectionObserver' in window)) { via(); return; }
    new IntersectionObserver(function (voci) {
      voci[0].isIntersecting ? via() : stop();
    }, { threshold: 0.25 }).observe(mazzo);
  }

  function inizio() {
    var mazzi = document.querySelectorAll('.cart-mazzo');
    for (var i = 0; i < mazzi.length; i++) attiva(mazzi[i]);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', inizio)
    : inizio();
})();
"""


# ---------------------------------------------------------------------------
#  utilità
# ---------------------------------------------------------------------------
def slug(t):
    t = unicodedata.normalize("NFKD", t)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower().replace("'", "-").replace("\u2019", "-")
    t = re.sub(r"[^a-z0-9]+", "-", t)
    return re.sub(r"-{2,}", "-", t).strip("-")


def esc(t):
    return html.escape(t or "", quote=True)


def soggetto_da_alt(alt_it, citta):
    """'Piazza del Campo, Siena — Toscana, Italia' -> 'Piazza del Campo'"""
    s = re.split(r"\s+—\s+", alt_it)[0]
    s = re.sub(r",\s*" + re.escape(citta) + r"\s*$", "", s, flags=re.I).strip(" ,")
    return s


ESTERNI = re.compile(
    r"panorama|panoramic|veduta|vedute|vista|views?\b|skyline|cityscape|aerial|drone|dall.alto|"
    r"piazza|piazzale|lungomare|lungarno|spiagg|beach|porto|harbou?r|costa|coast|baia|\bbay\b|"
    r"golfo|gulf|centro storico|old town|tetti|roofs|valle|colline|campagna|ponte|bridge|canale|"
    r"canal|riva|marina|isola|island|scorcio|dal mare", re.I)
INTERNI = re.compile(
    r"intern|interior|\bsala\b|salone|corridoio|navata|biblioteca|\baula\b|museo|museum|galleria|"
    r"gallery|camera|stanza|\broom\b|\bhall\b|indoor|soffitto|volta|affresc|fresco|dipint|painting|"
    r"ritratt|portrait|statua|busto|altare|mostra|esposizione|collezione|vetrina|banco|scala\b", re.I)


def e_esterno(testo):
    """Vero solo se la foto è chiaramente un esterno: evita di far pensare
    che una sala o un quadro siano la scuola."""
    if not testo or INTERNI.search(testo):
        return False
    return bool(ESTERNI.search(testo))


CODE_GEO = re.compile(r",\s*(tuscany|toscana|sicily|sicilia|italy|italia|italie|apulia|puglia|lazio|"
                      r"veneto|liguria|piemonte|lombardia|umbria|marche|sardinia|sardegna|campania|"
                      r"calabria|emilia[- ]romagna|trentino|friuli[^,]*|alto[- ]adige)\s*$", re.I)


def soggetto_presentabile(s):
    """Tiene solo i soggetti che stanno bene dentro una frase."""
    for _ in range(3):
        s2 = CODE_GEO.sub("", s or "").strip(" ,")
        if s2 == s:
            break
        s = s2
    if not s or len(s) > 46 or len(s) < 5:
        return None
    if re.search(r"\d{3,}", s) or s.isupper():
        return None
    if re.search(r"\b(jpg|png|dsc|img|panoramio|unsplash|lccn|btv1b)\b", s, re.I):
        return None
    return s


def pulisci_autore(a):
    """'This Photo was taken by Wolfgang Moroder . Feel free...' -> 'Wolfgang Moroder'"""
    a = re.sub(r"^\s*(this (photo|image|file|picture) was (taken|created|made) by|foto[:.]|photo[:.]|\u00a9)\s*",
               "", a or "", flags=re.I)
    a = re.split(r"\.\s", a)[0]
    a = re.split(r"\s*[;|]\s*", a)[0]
    a = re.sub(r"\s*\(.*?\)\s*", " ", a)
    a = re.sub(r"\s+", " ", a).strip(" .,-\u2013")
    if len(a) > 42:
        a = a[:40].rsplit(" ", 1)[0] + "\u2026"
    return a or "Wikimedia Commons"


def elenco(voci, cong):
    if len(voci) == 1:
        return voci[0]
    return ", ".join(voci[:-1]) + f" {cong} " + voci[-1]


# ---------------------------------------------------------------------------
#  costruzione del blocco
# ---------------------------------------------------------------------------
def alt_lingua(voce, lingua, citta):
    """'Duomo di Arezzo — Toscana, Italia' -> 'Duomo di Arezzo (Toscana, Italia)'"""
    base = voce["alt"].get(lingua) or voce["alt"].get("it", "")
    pezzi = re.split(r"\s+\u2014\s+", base)
    sogg = pezzi[0].strip()
    coda = pezzi[1].strip() if len(pezzi) > 1 else ""
    coda = re.sub(r"(Italia|Italy|Itali\u00eb|Italien|Italie|W\u0142ochy)\s*$", PAESE[lingua], coda)
    return f"{sogg} ({coda})" if coda else sogg


def cartolina(voce, lingua, citta, template, rot, saluto, prima):
    src = voce["src"].replace("/immagini", PREFISSO_FOTO)
    sw = voce["srcset_webp"].replace("/immagini", PREFISSO_FOTO)
    sj = voce["srcset_jpg"].replace("/immagini", PREFISSO_FOTO)
    alt = alt_lingua(voce, lingua, citta)
    carica = ('loading="eager" fetchpriority="high"' if prima else 'loading="lazy"')
    return (
        f'<figure class="cart cart--t{template}" data-pos="{0 if prima else ""}" style="--rot:{rot}deg">'
        f'<div class="cart-carta"><div class="cart-foto">'
        f'<picture>'
        f'<source type="image/webp" srcset="{sw}" sizes="(max-width:880px) 88vw, 460px">'
        f'<img src="{src}" srcset="{sj}" sizes="(max-width:880px) 88vw, 460px" '
        f'width="{voce["larghezza"]}" height="{voce["altezza"]}" {carica} decoding="async" '
        f'alt="{esc(alt)}">'
        f'</picture>'
        f'<span class="cart-bollo" aria-hidden="true"></span>'
        f'<span class="cart-timbro" aria-hidden="true">{esc(citta.upper())}<br>POSTE</span>'
        f'<span class="cart-saluto">{esc(saluto)}</span>'
        f'</div></div></figure>'
    )


def blocco(voci, lingua, citta, regione, scuola, templates, i_frase, url_pagina):
    T = FRASI[lingua]
    tipo = "scuola" if scuola else "citta"
    rot = [-1.7, 1.3, -0.6, 2.0, -1.1]

    carte = []
    for k, v in enumerate(voci):
        # il nome della scuola solo se la foto è chiaramente un esterno,
        # altrimenti sembrerebbe una foto della scuola stessa
        esterno = e_esterno(alt_lingua(v, lingua, citta))
        frasi = T["scuola"] if (scuola and esterno) else T["citta"]
        saluto = frasi[(i_frase + k) % len(frasi)].format(c=citta, s=scuola or citta)
        if lingua == "it":
            saluto = re.sub(r"\ba (?=[AEIOUaeiou])", "ad ", saluto)   # a Arca -> ad Arca
        carte.append(cartolina(v, lingua, citta, templates[k % len(templates)],
                               rot[(i_frase + k) % len(rot)], saluto, k == 0))
    # posizioni iniziali: 0,1,2
    for k in range(len(carte)):
        carte[k] = carte[k].replace('data-pos=""', f'data-pos="{k}"', 1)

    titolo = (T["titolo_s"] if scuola else T["titolo_c"]).format(c=citta, r=regione)
    testo = (T["testo_s"] if scuola else T["testo_c"]).format(c=citta, r=regione, s=scuola or citta)

    sogg = [soggetto_presentabile(soggetto_da_alt(alt_lingua(v, lingua, citta), citta)) for v in voci]
    sogg = [s for s in sogg if s]
    if sogg:
        testo += " " + T["nelle_foto"].format(x=elenco(sogg, T["e"]))

    # niente crediti accanto alla foto: stanno tutti in fondo alla pagina

    jsonld = {
        "@context": "https://schema.org",
        "@graph": [{
            "@type": "ImageObject",
            "contentUrl": f'https://thuisitaliaans.com{v["src"].replace("/immagini", PREFISSO_FOTO)}',
            "name": alt_lingua(v, lingua, citta),
            "caption": alt_lingua(v, lingua, citta),
            "width": v["larghezza"], "height": v["altezza"],
            "creator": {"@type": "Person", "name": v.get("autore", "")},
            "creditText": f'{v.get("autore","")} / Wikimedia Commons',
            "copyrightNotice": v.get("autore", ""),
            "license": v.get("licenza_url") or v.get("fonte", ""),
            "acquireLicensePage": v.get("fonte", ""),
            "contentLocation": {"@type": "Place", "name": f"{citta}, {regione}, Italia"},
            "representativeOfPage": False,
            "isPartOf": {"@id": url_pagina},
        } for v in voci]
    }

    mazzo = (f'  <div class="cart-mazzo" tabindex="0" role="group" '
             f'aria-label="{esc(T["aria"].format(c=citta))} — {esc(T["aiuto"])}">\n'
             f'    ' + "\n    ".join(carte) + '\n  </div>')
    parte_testo = (f'  <div class="cart-testo">\n'
                   f'    <h2 id="cart-tit">{esc(titolo)}</h2>\n'
                   f'    <p>{esc(testo)}</p>\n'
                   f'  </div>')
    # nelle schede scuola la colonna è stretta: prima la cartolina, poi due righe
    dentro = (mazzo + "\n" + parte_testo) if scuola else (parte_testo + "\n" + mazzo)

    blocco_html = (
        f'{MARCA_INIZIO}\n'
        f'<section class="cartoline cartoline--{tipo}" aria-labelledby="cart-tit">\n'
        f'{dentro}\n'
        f'</section>\n'
        f'<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>\n'
        f'{MARCA_FINE}'
    )

    # crediti completi per il piede pagina
    righe = []
    for v in voci:
        aut = pulisci_autore(v.get("autore", ""))
        lic = esc(v.get("licenza", ""))
        url_lic = esc(v.get("licenza_url") or v.get("fonte", ""))
        url_file = esc(v.get("fonte", ""))
        frase = T["credito_riga"].format(
            a=esc(aut),
            l=f'<a href="{url_lic}" rel="license nofollow noopener" target="_blank">{lic}</a>')
        frase = frase.replace("Wikimedia Commons",
                              f'<a href="{url_file}" rel="nofollow noopener" target="_blank">Wikimedia Commons</a>', 1)
        righe.append(f'<li><i>{esc(alt_lingua(v, lingua, citta))}</i>. {frase}</li>')
    piede = (f'{MARCA_PIEDE_I}<div class="cart-crediti-lungo" id="crediti-foto">'
             f'<b>{esc(T["crediti_tit"])}</b><ul>' + "".join(righe) + '</ul></div>' + MARCA_PIEDE_F)

    return blocco_html, piede


# ---------------------------------------------------------------------------
#  innesto nella pagina
# ---------------------------------------------------------------------------
def togli_blocco(t):
    t = re.sub(re.escape(MARCA_INIZIO) + r".*?" + re.escape(MARCA_FINE) + r"\n?", "", t, flags=re.S)
    t = re.sub(re.escape(MARCA_PIEDE_I) + r".*?" + re.escape(MARCA_PIEDE_F) + r"\n?", "", t, flags=re.S)
    return re.sub(re.escape(MARCA_APP_I) + r".*?" + re.escape(MARCA_APP_F) + r"\n?", "", t, flags=re.S)


def metti_assets(t):
    if CSS_URL in t:
        return t
    tag = f'<link rel="stylesheet" href="{CSS_URL}">\n<script src="{JS_URL}" defer></script>\n'
    return t.replace("</head>", tag + "</head>", 1)


def innesta_citta(t, blocco_html):
    m = re.search(r'<section class="citta-hero">.*?</section>', t, re.S)
    if not m:
        return None
    return t[:m.end()] + "\n" + blocco_html + "\n" + t[m.end():]


def fine_div(t, i):
    """indice subito dopo il </div> che chiude il <div ...> che comincia in i"""
    livello = 0
    for m in re.finditer(r"<div\b|</div>", t[i:]):
        if m.group(0).startswith("<div"):
            livello += 1
        else:
            livello -= 1
            if livello == 0:
                return i + m.end()
    return -1


def innesta_scuola(t, blocco_html):
    i = t.find('<div class="pannello guida"')
    if i < 0:
        return None
    j = fine_div(t, i)          # resta dentro la colonna di destra
    if j < 0:
        return None
    return t[:j] + "\n" + blocco_html + "\n" + t[j:]


LINGUE_APP = ("it", "en", "nl", "de", "fr", "es")


def card_app(lingua, prefisso):
    T = FRASI[lingua]
    img = lingua if lingua in LINGUE_APP else "en"
    return (f'{MARCA_APP_I}<section class="app-mini">'
            f'<img class="app-mini-tel" src="{prefisso}app/{img}/03_percorso.jpg" '
            f'alt="{esc(T["app_alt"])}" width="600" height="1298" loading="lazy" decoding="async">'
            f'<div class="app-mini-testo"><h2>{esc(T["app_tit"])}</h2><p>{T["app_txt"]}</p>'
            f'<a class="app-cta" href="https://apps.apple.com/app/id6791650799" '
            f'target="_blank" rel="noopener">{esc(T["app_cta"])}</a></div>'
            f'</section>{MARCA_APP_F}')


def innesta_app(t, card_html):
    i = t.find('<div class="pannello gp"')
    if i < 0:
        return t
    return t[:i] + card_html + t[i:]


def innesta_piede(t, piede_html):
    """dentro l'ultimo .contenitore del footer, così eredita i margini laterali"""
    i = t.rfind("</footer>")
    if i < 0:
        return t
    vuoto = '<div class="contenitore"></div>'
    j = t.rfind(vuoto, 0, i)
    if j >= 0:
        return t[:j] + '<div class="contenitore">' + piede_html + "</div>" + t[j + len(vuoto):]
    return t[:i] + '<div class="contenitore">' + piede_html + "</div>\n" + t[i:]


def chip_citta(t, lingua):
    """Sostituisce '20 h/sett.' con chip utili presi dalla tabella di confronto."""
    mt = re.search(r'<table class="conf-tab">.*?</table>', t, re.S)
    ms = re.search(r'<div class="citta-scuole">(.*?)</div>\s*<section', t, re.S)
    if not mt or not ms:
        return t, 0

    dati = {}
    for riga in re.findall(r"<tr>(.*?)</tr>", mt.group(0), re.S):
        href = re.search(r'<td><a href="([^"]+)"', riga)
        if not href:
            continue
        celle = [re.sub(r"<[^>]+>", "", c).strip()
                 for c in re.findall(r"<td[^>]*>(.*?)</td>", riga, re.S)]
        if len(celle) >= 4:
            dati[href.group(1)] = celle[1:4]      # ore, studenti, durata

    modelli = FRASI[lingua]["chip"]
    blocco_lista = ms.group(1)
    nuovo = blocco_lista
    n = 0
    for scheda in re.findall(r'<a class="citta-scuola"[^>]*href="([^"]+)"[^>]*>.*?</a>', blocco_lista, re.S):
        pass
    for m in re.finditer(r'<a class="citta-scuola"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', blocco_lista, re.S):
        href, dentro = m.group(1), m.group(2)
        vals = dati.get(href)
        if not vals:
            continue
        ore, studenti, durata = (vals + ["", "", ""])[:3]
        pezzi = []
        if ore:
            pezzi.append(modelli[0].format(h=ore))
        if studenti and studenti.isdigit():
            pezzi.append(modelli[1].format(n=studenti))
        if durata:
            pezzi.append(modelli[2].format(m=durata))
        if not pezzi:
            continue
        chips = ('<div class="tagriga">'
                 + "".join(f'<span class="tag">{esc(x)}</span>' for x in pezzi)
                 + "</div>")
        dentro_nuovo = re.sub(r'<div class="meta2">.*?</div>', "", dentro, flags=re.S)
        dentro_nuovo = re.sub(r'<div class="tagriga">.*?</div>', "", dentro_nuovo, flags=re.S)
        nuovo = nuovo.replace(m.group(0),
                              m.group(0).replace(dentro, dentro_nuovo + chips), 1)
        n += 1
    if n:
        t = t.replace(blocco_lista, nuovo, 1)
    return t, n


# ---------------------------------------------------------------------------
#  main
# ---------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sito", default=".", help="cartella radice del sito")
    ap.add_argument("--prova", action="store_true", help="non scrive niente")
    ap.add_argument("--togli", action="store_true", help="rimuove i blocchi")
    a = ap.parse_args()

    radice = os.path.abspath(a.sito)
    dir_scuole = os.path.join(radice, "scuole")
    dir_foto = os.path.join(radice, "assets", "scuola_cartoline")
    if not os.path.isdir(dir_scuole):
        sys.exit(f"Non trovo {dir_scuole}. Usa --sito con la radice del sito.")

    # ---- 1. assets ----------------------------------------------------
    if not a.togli and not a.prova:
        os.makedirs(os.path.join(radice, "assets"), exist_ok=True)
        open(os.path.join(radice, "assets", "cartoline.css"), "w", encoding="utf-8").write(CSS)
        open(os.path.join(radice, "assets", "cartoline.js"), "w", encoding="utf-8").write(JS)
        print("scritti assets/cartoline.css e assets/cartoline.js")

    # ---- 2. rimozione --------------------------------------------------
    if a.togli:
        n = 0
        for base, _, files in os.walk(dir_scuole):
            for f in files:
                if not f.endswith(".html"):
                    continue
                p = os.path.join(base, f)
                t = open(p, encoding="utf-8").read()
                if MARCA_INIZIO in t:
                    open(p, "w", encoding="utf-8").write(togli_blocco(t))
                    n += 1
        print(f"blocchi rimossi da {n} pagine")
        return

    # ---- 3. foto -------------------------------------------------------
    mf = os.path.join(dir_foto, "manifest.json")
    if not os.path.exists(mf):
        sys.exit(f"Manca {mf}. Copia la cartella scuola_cartoline in assets/.")
    manifest = json.load(open(mf, encoding="utf-8"))

    per_citta = {}
    for v in manifest:
        if any(x in v["alt"]["it"].lower() for x in ESCLUDI):
            continue
        per_citta.setdefault(v["citta_slug"], []).append(v)
    for k in per_citta:
        per_citta[k].sort(key=lambda v: v["file_base"])

    scarse = {k: len(v) for k, v in per_citta.items() if len(v) < 3}
    if scarse:
        print("città con meno di 3 foto (escluse quelle sbagliate):",
              ", ".join(f"{k}({n})" for k, n in sorted(scarse.items())))

    # ---- 4. censimento pagine ------------------------------------------
    pagine = []          # (percorso, lingua, tipo, citta_slug, nome_scuola, chiave_logica)
    for suff, lingua in LINGUE.items():
        base = os.path.join(dir_scuole, suff) if suff else dir_scuole
        if not os.path.isdir(base):
            continue
        for f in sorted(os.listdir(base)):
            if not f.endswith(".html") or f in ("index.html", "mappa.html"):
                continue
            p = os.path.join(base, f)
            t = open(p, encoding="utf-8").read()
            m = re.search(r'"@type": "LanguageSchool".*?"name": "(.*?)".*?"addressLocality": "(.*?)"', t, re.S)
            if not m:
                continue
            pagine.append((p, lingua, "scuola", slug(m.group(2)), m.group(1), "s:" + f[:-5]))
        dir_citta = os.path.join(base, "citta")
        if os.path.isdir(dir_citta):
            for f in sorted(os.listdir(dir_citta)):
                if not f.endswith(".html"):
                    continue
                pagine.append((os.path.join(dir_citta, f), lingua, "citta", f[:-5], None, "c:" + f[:-5]))

    # ---- 5. assegnazione template (mai lo stesso nella stessa città) ----
    chiavi = {}
    for p, lingua, tipo, cs, nome, chiave in pagine:
        chiavi.setdefault(cs, {}).setdefault(chiave, None)
    assegna = {}
    for cs, elenco_chiavi in chiavi.items():
        rnd = random.Random("cartoline-" + cs)
        anello = list(range(1, N_TEMPLATE + 1))
        rnd.shuffle(anello)
        i = 0
        for chiave in sorted(elenco_chiavi, key=lambda k: (k[0] != "c", k)):
            t3 = [anello[(i + k) % N_TEMPLATE] for k in range(3)]
            assegna[chiave] = (t3, i // 3)
            i += 3

    # ---- 6. scrittura ---------------------------------------------------
    fatti, saltati, n_chip, n_app = 0, [], 0, 0
    for p, lingua, tipo, cs, nome, chiave in pagine:
        voci = per_citta.get(cs)
        if not voci:
            saltati.append((p, "nessuna foto"))
            continue
        voci = voci[:3]
        regione = voci[0]["regione"]
        citta = voci[0]["citta"]
        templates, i_frase = assegna[chiave]
        url = "https://thuisitaliaans.com/" + os.path.relpath(p, radice).replace(os.sep, "/")

        b, piede = blocco(voci, lingua, citta, regione, nome, templates, i_frase, url)
        t = open(p, encoding="utf-8").read()
        t = togli_blocco(t)
        t = metti_assets(t)
        nuovo = innesta_citta(t, b) if tipo == "citta" else innesta_scuola(t, b)
        if nuovo is None:
            saltati.append((p, "punto d'innesto non trovato"))
            continue
        nuovo = innesta_piede(nuovo, piede)
        if tipo == "scuola":
            prefisso = "" if os.path.dirname(p) == dir_scuole else "../"
            prima = nuovo
            nuovo = innesta_app(nuovo, card_app(lingua, prefisso))
            if nuovo != prima:
                n_app += 1
        if tipo == "citta":
            nuovo, k = chip_citta(nuovo, lingua)
            n_chip += k
        if not a.prova:
            open(p, "w", encoding="utf-8").write(nuovo)
        fatti += 1

    print(f"\n{'(prova) ' if a.prova else ''}cartoline inserite in {fatti} pagine")
    print(f"chip informativi al posto di '20 h/sett.': {n_chip} schede")
    print(f"promo app compatta: {n_app} pagine")
    if saltati:
        print(f"saltate {len(saltati)}:")
        for p, perche in saltati[:15]:
            print("  -", os.path.relpath(p, radice), "→", perche)


if __name__ == "__main__":
    main()
