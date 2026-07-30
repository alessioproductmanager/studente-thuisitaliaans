# -*- coding: utf-8 -*-
"""Genera il portale /scuole/ in 5 lingue da dati.js: pagine madre, 100 pagine
scuola per lingua, sitemap con hreflang e worker email. Rilanciare dopo ogni
modifica a dati.js: python3 genera_sito.py"""
import json, re, html
from pathlib import Path
from datetime import date

QUI = Path(__file__).parent
OUT = QUI / "scuole"
BASEURL = "https://thuisitaliaans.com/scuole/"
testo = (QUI / "dati.js").read_text(encoding="utf-8")
DATI = json.loads(re.search(r"const\s+DATI\s*=\s*(\{.*\})\s*;", testo, re.S).group(1))
LANGS = ["it", "en", "nl", "de", "fr"]
PREF = {"it": "", "en": "en/", "nl": "nl/", "de": "de/", "fr": "fr/"}

MESI = {
 "it": ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],
 "en": ["January","February","March","April","May","June","July","August","September","October","November","December"],
 "nl": ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
 "de": ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
 "fr": ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
}
FRASI = {
 "en": [("ultima domenica di agosto","last Sunday of August"),("terzo weekend di luglio","third weekend of July"),
        ("primi di gennaio","early January"),("primavera e autunno","spring and autumn"),("metà luglio","mid-July"),
        ("fine giugno","late June"),("fine agosto","late August"),("fine ottobre","late October"),
        ("inizio luglio","early July"),("inizio agosto","early August"),("traghetto da Piombino","ferry from Piombino"),
        ("primavera","spring"),("estate","summer"),("autunno","autumn"),("inverno","winter"),("Pasqua","Easter"),(" e "," and "),(" o "," or ")],
 "nl": [("ultima domenica di agosto","laatste zondag van augustus"),("terzo weekend di luglio","derde weekend van juli"),
        ("primi di gennaio","begin januari"),("primavera e autunno","lente en herfst"),("metà luglio","half juli"),
        ("fine giugno","eind juni"),("fine agosto","eind augustus"),("fine ottobre","eind oktober"),
        ("inizio luglio","begin juli"),("inizio agosto","begin augustus"),("traghetto da Piombino","veerboot vanaf Piombino"),
        ("primavera","lente"),("estate","zomer"),("autunno","herfst"),("inverno","winter"),("Pasqua","Pasen"),(" e "," en "),(" o "," of ")],
 "de": [("ultima domenica di agosto","letzter Sonntag im August"),("terzo weekend di luglio","drittes Juli-Wochenende"),
        ("primi di gennaio","Anfang Januar"),("primavera e autunno","Frühjahr und Herbst"),("metà luglio","Mitte Juli"),
        ("fine giugno","Ende Juni"),("fine agosto","Ende August"),("fine ottobre","Ende Oktober"),
        ("inizio luglio","Anfang Juli"),("inizio agosto","Anfang August"),("traghetto da Piombino","Fähre ab Piombino"),
        ("primavera","Frühjahr"),("estate","Sommer"),("autunno","Herbst"),("inverno","Winter"),("Pasqua","Ostern"),(" e "," und "),(" o "," oder ")],
 "fr": [("ultima domenica di agosto","dernier dimanche d'août"),("terzo weekend di luglio","troisième week-end de juillet"),
        ("primi di gennaio","début janvier"),("primavera e autunno","printemps et automne"),("metà luglio","mi-juillet"),
        ("fine giugno","fin juin"),("fine agosto","fin août"),("fine ottobre","fin octobre"),
        ("inizio luglio","début juillet"),("inizio agosto","début août"),("traghetto da Piombino","ferry depuis Piombino"),
        ("primavera","printemps"),("estate","été"),("autunno","automne"),("inverno","hiver"),("Pasqua","Pâques"),(" e "," et "),(" o "," ou ")],
}
def traduci_periodo(s, lang):
    if lang == "it": return s
    for a, b in FRASI[lang]: s = s.replace(a, b)
    for i, m in enumerate(MESI["it"]): s = s.replace(m, MESI[lang][i])
    return s

L = {
"it": dict(claim="100 scuole selezionate in Italia", h1="Il tuo corso di italiano <em>in Italia</em>,<br>pianificato come un viaggio.",
 sub="Scegli la città, il periodo e il ritmo di studio. Per ogni destinazione: la scuola, le ore a settimana, l'alloggio e una guida con le tre cose da non perdere e gli eventi dell'anno.",
 dove="Dove", quando="Quando", ritmo="Ritmo", durata="Durata", tutta="Tutta l'Italia", qmese="Qualsiasi mese", qualsiasi="Qualsiasi",
 int_opt="Intensivo (20+ h/sett.)", leg_opt="Leggero (≈10 h/sett.)", libera="Libera", w1="1 settimana", w2="2 settimane", w4="3–4 settimane", w12="1–3 mesi",
 cerca="Cerca", chipA="Con alloggio", chipS="Accreditate ASILS", chipM="Vicino al mare", chipV="Solo dati verificati",
 ordina="Ordina:", o_citta="città A–Z", o_scuola="scuola A–Z", trovate="scuole trovate",
 vuoto1="Nessuna scuola con questi filtri.", vuoto2="Prova ad allargare il periodo o togliere un filtro.",
 lbl_int="Intensivo", lbl_leg="Leggero", lbl_inizio="Inizio", lbl_all="Alloggio", si="sì", no="no",
 ogni_lun="ogni lunedì", dal="dal", su_r="su richiesta", hsett="h/sett.", prezzo_da="da €", sett_abbr="/sett.", prezzo_sur="prezzo su richiesta",
 verif="Verificato il", daconf="Dati da confermare con la scuola", vedi="Vedi la scuola",
 footer="Le informazioni su corsi, date e prezzi sono indicative e vanno sempre confermate con la scuola. Le schede con il timbro verde riportano la data dell'ultima verifica. Selezione basata sugli elenchi ufficiali ASILS, EDUITALIA, IALC e sui centri d'esame CILS, CELI e PLIDA.",
 torna="← Tutte le scuole", corsi_h="Il corso", princ="Principianti assoluti", duratam="Durata minima", sett="settimana/e",
 esami="Esami in sede", accr_h="Accreditamenti", guida_h="Cosa non perdere a", eventi_h="Eventi dell'anno", aero="Aeroporto consigliato",
 scrivi_h="Scrivi alla scuola", scrivi_p="Il messaggio parte da thuisitaliaans; la scuola risponde direttamente alla tua email.",
 f_nome="Il tuo nome", f_email="La tua email", f_msg="Il tuo messaggio (date, corso, alloggio…)", f_invia="Invia",
 f_ok="Inviato! La scuola ti risponderà via email.", f_err="Invio non riuscito. Riprova fra poco, oppure scrivi alla scuola dal suo sito.",
 sito_b="Sito della scuola",
 title_home="Soggiorni linguistici in Italia — 100 scuole di italiano | thuisitaliaans",
 meta_home="Trova il tuo corso di italiano in Italia: 100 scuole selezionate, filtri per città, periodo, intensità e durata, guide di viaggio ed eventi.",
 title_s="[[NOME]] — corso di italiano a [[CITTA]] | thuisitaliaans",
 meta_s="Corso di italiano da [[NOME]] a [[CITTA]] ([[REGIONE]]): ore a settimana, date di inizio, alloggio, guida della città e contatto diretto.",
 desc="[[NOME]] è una scuola di italiano per stranieri a [[CITTA]], in [[REGIONE]]: corsi intensivi di circa 20 ore a settimana e formule più leggere, con inizio in genere ogni lunedì. [[ALL]]Qui sotto trovi i dati essenziali del corso, una mini-guida di [[CITTA]] per organizzare il soggiorno e un modulo per scrivere direttamente alla scuola.",
 all_fr="La scuola aiuta anche a trovare l'alloggio. "),
"en": dict(claim="100 hand-picked schools in Italy", h1="Your Italian course <em>in Italy</em>,<br>planned like a trip.",
 sub="Choose the city, the period and your study pace. For every destination: the school, hours per week, housing and a short guide with the three must-sees and this year's events.",
 dove="Where", quando="When", ritmo="Pace", durata="Length", tutta="All of Italy", qmese="Any month", qualsiasi="Any",
 int_opt="Intensive (20+ h/wk)", leg_opt="Light (≈10 h/wk)", libera="Open", w1="1 week", w2="2 weeks", w4="3–4 weeks", w12="1–3 months",
 cerca="Search", chipA="With housing", chipS="ASILS accredited", chipM="By the sea", chipV="Verified data only",
 ordina="Sort:", o_citta="city A–Z", o_scuola="school A–Z", trovate="schools found",
 vuoto1="No schools match these filters.", vuoto2="Try a wider period or remove a filter.",
 lbl_int="Intensive", lbl_leg="Light", lbl_inizio="Start", lbl_all="Housing", si="yes", no="no",
 ogni_lun="every Monday", dal="from", su_r="on request", hsett="h/wk", prezzo_da="from €", sett_abbr="/wk", prezzo_sur="price on request",
 verif="Verified on", daconf="Details to confirm with the school", vedi="View school",
 footer="Course details, dates and prices are indicative and should always be confirmed with the school. Cards with a green stamp show the date of the last check. Selection based on the official ASILS, EDUITALIA and IALC lists and on the CILS, CELI and PLIDA exam centres.",
 torna="← All schools", corsi_h="The course", princ="Complete beginners", duratam="Minimum length", sett="week(s)",
 esami="Exams on site", accr_h="Accreditations", guida_h="What not to miss in", eventi_h="Events this year", aero="Best airport",
 scrivi_h="Write to the school", scrivi_p="Your message is sent via thuisitaliaans; the school replies straight to your email.",
 f_nome="Your name", f_email="Your email", f_msg="Your message (dates, course, housing…)", f_invia="Send",
 f_ok="Sent! The school will reply by email.", f_err="Sending failed. Try again shortly, or contact the school via its website.",
 sito_b="School website",
 title_home="Italian language stays in Italy — 100 schools | thuisitaliaans",
 meta_home="Find your Italian course in Italy: 100 selected schools, filters by city, period, intensity and length, plus travel guides and events.",
 title_s="[[NOME]] — Italian course in [[CITTA]] | thuisitaliaans",
 meta_s="Italian course at [[NOME]] in [[CITTA]] ([[REGIONE]]): hours per week, start dates, housing, city guide and direct contact.",
 desc="[[NOME]] is an Italian language school for foreigners in [[CITTA]] ([[REGIONE]]): intensive courses of about 20 hours per week plus lighter options, usually starting every Monday. [[ALL]]Below you will find the key facts, a mini guide to [[CITTA]] to plan your stay, and a form to write to the school directly.",
 all_fr="The school also helps you find accommodation. "),
"nl": dict(claim="100 geselecteerde scholen in Italië", h1="Jouw cursus Italiaans <em>in Italië</em>,<br>gepland als een reis.",
 sub="Kies de stad, de periode en het studietempo. Voor elke bestemming: de school, de uren per week, de accommodatie en een mini-gids met de drie hoogtepunten en de evenementen van het jaar.",
 dove="Waar", quando="Wanneer", ritmo="Tempo", durata="Duur", tutta="Heel Italië", qmese="Elke maand", qualsiasi="Alle",
 int_opt="Intensief (20+ u/wk)", leg_opt="Licht (≈10 u/wk)", libera="Vrij", w1="1 week", w2="2 weken", w4="3–4 weken", w12="1–3 maanden",
 cerca="Zoeken", chipA="Met accommodatie", chipS="ASILS-erkend", chipM="Aan zee", chipV="Alleen geverifieerd",
 ordina="Sorteer:", o_citta="stad A–Z", o_scuola="school A–Z", trovate="scholen gevonden",
 vuoto1="Geen scholen met deze filters.", vuoto2="Probeer een ruimere periode of verwijder een filter.",
 lbl_int="Intensief", lbl_leg="Licht", lbl_inizio="Start", lbl_all="Accommodatie", si="ja", no="nee",
 ogni_lun="elke maandag", dal="vanaf", su_r="op aanvraag", hsett="u/wk", prezzo_da="vanaf €", sett_abbr="/wk", prezzo_sur="prijs op aanvraag",
 verif="Geverifieerd op", daconf="Gegevens te bevestigen met de school", vedi="Bekijk school",
 footer="Informatie over cursussen, data en prijzen is indicatief en moet altijd bij de school worden bevestigd. Kaarten met een groene stempel tonen de datum van de laatste controle. Selectie op basis van de officiële lijsten van ASILS, EDUITALIA en IALC en de examencentra CILS, CELI en PLIDA.",
 torna="← Alle scholen", corsi_h="De cursus", princ="Absolute beginners", duratam="Minimale duur", sett="week/weken",
 esami="Examens op locatie", accr_h="Accreditaties", guida_h="Niet te missen in", eventi_h="Evenementen dit jaar", aero="Beste luchthaven",
 scrivi_h="Schrijf naar de school", scrivi_p="Je bericht wordt via thuisitaliaans verstuurd; de school antwoordt rechtstreeks op je e-mail.",
 f_nome="Je naam", f_email="Je e-mail", f_msg="Je bericht (data, cursus, accommodatie…)", f_invia="Versturen",
 f_ok="Verstuurd! De school antwoordt per e-mail.", f_err="Versturen mislukt. Probeer het straks opnieuw of neem contact op via de website van de school.",
 sito_b="Website van de school",
 title_home="Taalvakanties Italiaans in Italië — 100 scholen | thuisitaliaans",
 meta_home="Vind jouw cursus Italiaans in Italië: 100 geselecteerde scholen, filters op stad, periode, intensiteit en duur, plus reisgidsen en evenementen.",
 title_s="[[NOME]] — cursus Italiaans in [[CITTA]] | thuisitaliaans",
 meta_s="Cursus Italiaans bij [[NOME]] in [[CITTA]] ([[REGIONE]]): uren per week, startdata, accommodatie, stadsgids en direct contact.",
 desc="[[NOME]] is een school voor Italiaans voor buitenlanders in [[CITTA]] ([[REGIONE]]): intensieve cursussen van ongeveer 20 uur per week en lichtere formules, meestal met start op maandag. [[ALL]]Hieronder vind je de belangrijkste gegevens, een mini-gids van [[CITTA]] om je verblijf te plannen en een formulier om de school rechtstreeks te schrijven.",
 all_fr="De school helpt ook bij het vinden van accommodatie. "),
"de": dict(claim="100 ausgewählte Schulen in Italien", h1="Dein Italienischkurs <em>in Italien</em>,<br>geplant wie eine Reise.",
 sub="Wähle Stadt, Zeitraum und Lerntempo. Für jedes Ziel: die Schule, die Wochenstunden, die Unterkunft und ein kleiner Guide mit den drei Highlights und den Events des Jahres.",
 dove="Wo", quando="Wann", ritmo="Tempo", durata="Dauer", tutta="Ganz Italien", qmese="Jeder Monat", qualsiasi="Beliebig",
 int_opt="Intensiv (20+ Std./Wo.)", leg_opt="Leicht (≈10 Std./Wo.)", libera="Offen", w1="1 Woche", w2="2 Wochen", w4="3–4 Wochen", w12="1–3 Monate",
 cerca="Suchen", chipA="Mit Unterkunft", chipS="ASILS-akkreditiert", chipM="Am Meer", chipV="Nur geprüfte Daten",
 ordina="Sortieren:", o_citta="Stadt A–Z", o_scuola="Schule A–Z", trovate="Schulen gefunden",
 vuoto1="Keine Schulen mit diesen Filtern.", vuoto2="Erweitere den Zeitraum oder entferne einen Filter.",
 lbl_int="Intensiv", lbl_leg="Leicht", lbl_inizio="Beginn", lbl_all="Unterkunft", si="ja", no="nein",
 ogni_lun="jeden Montag", dal="ab", su_r="auf Anfrage", hsett="Std./Wo.", prezzo_da="ab €", sett_abbr="/Wo.", prezzo_sur="Preis auf Anfrage",
 verif="Geprüft am", daconf="Angaben mit der Schule zu bestätigen", vedi="Schule ansehen",
 footer="Angaben zu Kursen, Terminen und Preisen sind Richtwerte und immer mit der Schule zu bestätigen. Karten mit grünem Stempel zeigen das Datum der letzten Prüfung. Auswahl auf Basis der offiziellen Listen von ASILS, EDUITALIA und IALC sowie der Prüfungszentren CILS, CELI und PLIDA.",
 torna="← Alle Schulen", corsi_h="Der Kurs", princ="Absolute Anfänger", duratam="Mindestdauer", sett="Woche(n)",
 esami="Prüfungen vor Ort", accr_h="Akkreditierungen", guida_h="Nicht verpassen in", eventi_h="Events im Jahr", aero="Empfohlener Flughafen",
 scrivi_h="Schreib der Schule", scrivi_p="Deine Nachricht wird über thuisitaliaans gesendet; die Schule antwortet direkt an deine E-Mail.",
 f_nome="Dein Name", f_email="Deine E-Mail", f_msg="Deine Nachricht (Termine, Kurs, Unterkunft…)", f_invia="Senden",
 f_ok="Gesendet! Die Schule antwortet per E-Mail.", f_err="Senden fehlgeschlagen. Versuch es gleich noch einmal oder kontaktiere die Schule über ihre Website.",
 sito_b="Website der Schule",
 title_home="Sprachaufenthalte in Italien — 100 Italienisch-Schulen | thuisitaliaans",
 meta_home="Finde deinen Italienischkurs in Italien: 100 ausgewählte Schulen, Filter nach Stadt, Zeitraum, Intensität und Dauer, dazu Reiseguides und Events.",
 title_s="[[NOME]] — Italienischkurs in [[CITTA]] | thuisitaliaans",
 meta_s="Italienischkurs bei [[NOME]] in [[CITTA]] ([[REGIONE]]): Wochenstunden, Starttermine, Unterkunft, Stadtguide und direkter Kontakt.",
 desc="[[NOME]] ist eine Italienisch-Sprachschule für Ausländer in [[CITTA]] ([[REGIONE]]): Intensivkurse mit rund 20 Wochenstunden und leichtere Formate, Kursbeginn in der Regel jeden Montag. [[ALL]]Unten findest du die wichtigsten Fakten, einen Mini-Guide zu [[CITTA]] für die Planung deines Aufenthalts und ein Formular, um der Schule direkt zu schreiben.",
 all_fr="Die Schule hilft auch bei der Unterkunftssuche. "),
"fr": dict(claim="100 écoles sélectionnées en Italie", h1="Votre cours d'italien <em>en Italie</em>,<br>organisé comme un voyage.",
 sub="Choisissez la ville, la période et le rythme d'étude. Pour chaque destination : l'école, les heures par semaine, le logement et un mini-guide avec les trois incontournables et les événements de l'année.",
 dove="Où", quando="Quand", ritmo="Rythme", durata="Durée", tutta="Toute l'Italie", qmese="Tous les mois", qualsiasi="Indifférent",
 int_opt="Intensif (20+ h/sem.)", leg_opt="Léger (≈10 h/sem.)", libera="Libre", w1="1 semaine", w2="2 semaines", w4="3–4 semaines", w12="1–3 mois",
 cerca="Rechercher", chipA="Avec logement", chipS="Accréditées ASILS", chipM="Au bord de la mer", chipV="Données vérifiées",
 ordina="Trier :", o_citta="ville A–Z", o_scuola="école A–Z", trovate="écoles trouvées",
 vuoto1="Aucune école avec ces filtres.", vuoto2="Élargissez la période ou retirez un filtre.",
 lbl_int="Intensif", lbl_leg="Léger", lbl_inizio="Début", lbl_all="Logement", si="oui", no="non",
 ogni_lun="chaque lundi", dal="dès le", su_r="sur demande", hsett="h/sem.", prezzo_da="dès €", sett_abbr="/sem.", prezzo_sur="prix sur demande",
 verif="Vérifié le", daconf="Infos à confirmer avec l'école", vedi="Voir l'école",
 footer="Les informations sur les cours, dates et prix sont indicatives et doivent toujours être confirmées auprès de l'école. Les fiches avec le tampon vert indiquent la date de la dernière vérification. Sélection basée sur les listes officielles ASILS, EDUITALIA, IALC et les centres d'examen CILS, CELI et PLIDA.",
 torna="← Toutes les écoles", corsi_h="Le cours", princ="Grands débutants", duratam="Durée minimale", sett="semaine(s)",
 esami="Examens sur place", accr_h="Accréditations", guida_h="À ne pas manquer à", eventi_h="Événements de l'année", aero="Aéroport conseillé",
 scrivi_h="Écrire à l'école", scrivi_p="Votre message part via thuisitaliaans ; l'école répond directement à votre e-mail.",
 f_nome="Votre nom", f_email="Votre e-mail", f_msg="Votre message (dates, cours, logement…)", f_invia="Envoyer",
 f_ok="Envoyé ! L'école vous répondra par e-mail.", f_err="Échec de l'envoi. Réessayez dans un instant ou contactez l'école via son site.",
 sito_b="Site de l'école",
 title_home="Séjours linguistiques en Italie — 100 écoles d'italien | thuisitaliaans",
 meta_home="Trouvez votre cours d'italien en Italie : 100 écoles sélectionnées, filtres par ville, période, intensité et durée, avec guides de voyage et événements.",
 title_s="[[NOME]] — cours d'italien à [[CITTA]] | thuisitaliaans",
 meta_s="Cours d'italien chez [[NOME]] à [[CITTA]] ([[REGIONE]]) : heures par semaine, dates de début, logement, guide de la ville et contact direct.",
 desc="[[NOME]] est une école d'italien pour étrangers à [[CITTA]] ([[REGIONE]]) : cours intensifs d'environ 20 heures par semaine et formules plus légères, avec un début en général chaque lundi. [[ALL]]Ci-dessous : les informations essentielles, un mini-guide de [[CITTA]] pour organiser votre séjour et un formulaire pour écrire directement à l'école.",
 all_fr="L'école aide aussi à trouver un logement. "),
}

CSS = """:root{--carta:#FAF6EF;--card:#FFF;--inchiostro:#221D16;--secondario:#6E6759;--terracotta:#BC5533;--terracotta-scuro:#9E4527;--salvia:#5E7357;--salvia-chiara:#EAF0E6;--ambra:#B07C1F;--ambra-chiara:#FBF3DF;--linea:#E7E0D2;--r:18px;--r-s:12px;--ombra:0 1px 2px rgba(34,29,22,.05),0 10px 30px -12px rgba(34,29,22,.14);--serif:"Iowan Old Style",Georgia,"Times New Roman",serif;--sans:-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}body{background:var(--carta);color:var(--inchiostro);font-family:var(--sans);line-height:1.5}a{color:inherit}
.contenitore{max-width:1100px;margin:0 auto;padding:0 20px}
header{padding:16px 0;border-bottom:1px solid var(--linea)}.testata{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
.logo{font-family:var(--serif);font-size:20px;font-weight:700}.logo span{color:var(--terracotta)}.logo a{text-decoration:none}
.lingue{font-size:12px;color:var(--secondario)}.lingue a{text-decoration:none;padding:2px 5px;border-radius:6px}.lingue a.attiva{background:var(--inchiostro);color:#fff}
.badge{font-size:11px;font-weight:700;border-radius:6px;padding:3px 7px;background:var(--salvia-chiara);color:var(--salvia)}
.badge-riga{display:flex;flex-wrap:wrap;gap:6px}
.timbro{display:inline-flex;align-items:center;gap:6px;font-size:12px;border-radius:8px;padding:6px 10px}
.timbro.ok{background:var(--salvia-chiara);color:var(--salvia)}.timbro.attenzione{background:var(--ambra-chiara);color:var(--ambra)}
.bottone{display:inline-block;text-align:center;text-decoration:none;font-size:14px;font-weight:600;border-radius:var(--r-s);padding:10px 16px;border:1px solid var(--linea);background:var(--carta);cursor:pointer;font-family:var(--sans)}
.bottone.pieno{background:var(--terracotta);border-color:var(--terracotta);color:#fff}.bottone.pieno:hover{background:var(--terracotta-scuro)}
footer{border-top:1px solid var(--linea);padding:26px 0 40px;color:var(--secondario);font-size:13px;margin-top:50px}"""

CSS_HOME = """.hero{padding:44px 0 28px;text-align:center}.hero h1{font-family:var(--serif);font-weight:600;font-size:clamp(30px,5vw,44px);line-height:1.12}.hero h1 em{font-style:italic;color:var(--terracotta)}
.hero p{margin:12px auto 0;max-width:640px;color:var(--secondario);font-size:16px}
.barra{margin:26px auto 0;max-width:900px;background:var(--card);border:1px solid var(--linea);border-radius:999px;box-shadow:var(--ombra);display:grid;grid-template-columns:1.2fr 1fr 1fr .9fr auto;overflow:hidden}
.campo{padding:12px 18px;text-align:left;border-right:1px solid var(--linea)}.campo label{display:block;font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--secondario)}
.campo select{width:100%;border:0;background:transparent;font:inherit;font-size:15px;outline:none;margin-top:2px}
.barra button{border:0;background:var(--terracotta);color:#fff;font:inherit;font-weight:700;padding:0 28px;cursor:pointer}
@media(max-width:760px){.barra{grid-template-columns:1fr 1fr;border-radius:var(--r)}.campo{border-right:0;border-bottom:1px solid var(--linea)}.barra button{grid-column:1/-1;padding:14px}}
.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px}
.chip{border:1px solid var(--linea);background:var(--card);border-radius:999px;padding:7px 14px;font-size:13px;cursor:pointer;user-select:none;color:var(--secondario)}
.chip.attivo{background:var(--inchiostro);border-color:var(--inchiostro);color:#fff}
.riga-esito{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin:34px 0 14px}.riga-esito h2{font-family:var(--serif);font-weight:600;font-size:20px}.riga-esito small{color:var(--secondario)}
.griglia{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;padding-bottom:60px}
.scheda{background:var(--card);border:1px solid var(--linea);border-radius:var(--r);box-shadow:var(--ombra);padding:18px;display:flex;flex-direction:column;gap:10px}
.scheda .dove{font-size:12px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--terracotta)}.scheda .dove span{color:var(--secondario);font-weight:500;letter-spacing:0;text-transform:none}
.scheda h3{font-family:var(--serif);font-weight:600;font-size:19px;line-height:1.25}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:13.5px;color:var(--secondario)}.meta b{color:var(--inchiostro);font-weight:600}
.azioni{display:flex;gap:8px;margin-top:auto;padding-top:4px}.azioni .bottone{flex:1}
.vuoto{grid-column:1/-1;text-align:center;color:var(--secondario);padding:50px 0}"""

CSS_SCUOLA = """.crumb{margin:22px 0 6px;font-size:13px}.crumb a{color:var(--terracotta);text-decoration:none;font-weight:600}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:var(--terracotta);margin-top:10px}.eyebrow span{color:var(--secondario);font-weight:500;letter-spacing:0;text-transform:none}
h1{font-family:var(--serif);font-weight:600;font-size:clamp(26px,4vw,36px);line-height:1.15;margin:4px 0 10px}
.descr{max-width:760px;color:var(--secondario);font-size:15.5px;margin:10px 0 4px}
.colonne{display:grid;grid-template-columns:1.2fr .9fr;gap:18px;margin-top:22px}@media(max-width:820px){.colonne{grid-template-columns:1fr}}
.pannello{background:var(--card);border:1px solid var(--linea);border-radius:var(--r);box-shadow:var(--ombra);padding:20px}
.pannello h2{font-family:var(--serif);font-weight:600;font-size:19px;margin-bottom:12px}
.dati{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;font-size:14px;color:var(--secondario)}.dati b{display:block;color:var(--inchiostro);font-weight:600}
.guida ol{list-style:none;counter-reset:n;display:flex;flex-direction:column;gap:10px;margin-top:4px}
.guida ol li{counter-increment:n;display:flex;gap:12px;align-items:flex-start}
.guida ol li::before{content:counter(n);flex:0 0 26px;height:26px;border-radius:50%;background:var(--carta);border:1px solid var(--linea);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--terracotta)}
.guida b{display:block;font-weight:600}.guida small{color:var(--secondario)}
.evento{display:flex;justify-content:space-between;gap:10px;font-size:14px;padding:7px 0;border-bottom:1px dashed var(--linea)}.evento span{color:var(--secondario)}
.aero{color:var(--secondario);font-size:14px;margin-top:10px}
form .riga{margin-bottom:10px}form label{display:block;font-size:12px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--secondario);margin-bottom:4px}
form input,form textarea{width:100%;font:inherit;font-size:15px;padding:10px 12px;border:1px solid var(--linea);border-radius:var(--r-s);background:var(--carta);outline:none}
form textarea{min-height:110px;resize:vertical}.nascosto{position:absolute;left:-9999px}
.esito{margin-top:10px;font-size:14px;display:none;border-radius:var(--r-s);padding:10px 12px}
.esito.ok{display:block;background:var(--salvia-chiara);color:var(--salvia)}.esito.err{display:block;background:var(--ambra-chiara);color:var(--ambra)}"""

def rep(t, m):
    for k, v in m.items(): t = t.replace("[[" + k + "]]", v)
    return t

def switcher(lang, slugpath):
    out = []
    for l2 in LANGS:
        url = "/scuole/" + PREF[l2] + slugpath
        cls = ' class="attiva"' if l2 == lang else ""
        out.append('<a' + cls + ' href="' + url + '">' + l2.upper() + '</a>')
    return '<nav class="lingue">' + " · ".join(out) + '</nav>'

def alternates(slugpath):
    righe = []
    for l2 in LANGS:
        righe.append('<link rel="alternate" hreflang="' + l2 + '" href="' + BASEURL + PREF[l2] + slugpath + '">')
    righe.append('<link rel="alternate" hreflang="x-default" href="' + BASEURL + PREF["en"] + slugpath + '">')
    return "\n".join(righe)

HOME = """<!DOCTYPE html>
<html lang="[[LANG]]">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>[[TITLE]]</title>
<meta name="description" content="[[METADESC]]">
<link rel="canonical" href="[[CANON]]">
[[ALTS]]
<style>[[CSS]]</style>
</head>
<body>
<header><div class="contenitore testata">
  <div class="logo"><a href="https://thuisitaliaans.com/">thuis<span>italiaans</span></a> · [[CLAIM]]</div>
  [[SWITCHER]]
</div></header>
<section class="hero contenitore">
  <h1>[[H1]]</h1><p>[[SUB]]</p>
  <div class="barra">
    <div class="campo"><label>[[DOVE]]</label><select id="f-citta"><option value="">[[TUTTA]]</option></select></div>
    <div class="campo"><label>[[QUANDO]]</label><select id="f-mese"><option value="">[[QMESE]]</option></select></div>
    <div class="campo"><label>[[RITMO]]</label><select id="f-ritmo"><option value="">[[QUALS]]</option><option value="intensivo">[[INT]]</option><option value="leggero">[[LEG]]</option></select></div>
    <div class="campo"><label>[[DURATA]]</label><select id="f-durata"><option value="">[[LIBERA]]</option><option value="1">[[W1]]</option><option value="2">[[W2]]</option><option value="4">[[W4]]</option><option value="12">[[W12]]</option></select></div>
    <button id="cerca">[[CERCA]]</button>
  </div>
  <div class="chips">
    <span class="chip" data-filtro="alloggio">[[CHIPA]]</span>
    <span class="chip" data-filtro="asils">[[CHIPS]]</span>
    <span class="chip" data-filtro="mare">[[CHIPM]]</span>
    <span class="chip" data-filtro="verificate">[[CHIPV]]</span>
  </div>
</section>
<main class="contenitore">
  <div class="riga-esito"><h2 id="conta"></h2>
  <small>[[ORDINA]] <select id="ordina" style="border:0;background:transparent;font:inherit;color:var(--terracotta);font-weight:600"><option value="citta">[[OCITTA]]</option><option value="nome">[[OSCUOLA]]</option></select></small></div>
  <div class="griglia" id="griglia"></div>
</main>
<footer><div class="contenitore">[[FOOTER]]</div></footer>
<script src="[[DATIPATH]]"></script>
<script>
(function(){
const T=[[TJSON]];
const MARE=["Taormina","Milazzo","Palermo","Palermo (Mondello)","Alghero","Otranto","Tropea","Sorrento","Salerno","Napoli","Genova","Sestri Levante","Sanremo","Viareggio","Rimini","Orbetello","Trieste","Venezia","Pisa","Cefal\\u00f9","Trapani","Cagliari","Lignano Sabbiadoro","Isola d'Elba"];
const stato={chips:{}};
const selCitta=document.getElementById("f-citta");
[...new Set(DATI.scuole.map(function(s){return s.citta}))].sort(function(a,b){return a.localeCompare(b,"it")}).forEach(function(c){
  var o=document.createElement("option");o.value=c;o.textContent=c;selCitta.appendChild(o);});
const selMese=document.getElementById("f-mese");const oggi=new Date();
for(var i=0;i<12;i++){var d=new Date(oggi.getFullYear(),oggi.getMonth()+i,1);var o=document.createElement("option");
  o.value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");o.textContent=T.mesi[d.getMonth()]+" "+d.getFullYear();selMese.appendChild(o);}
document.querySelectorAll(".chip").forEach(function(ch){ch.addEventListener("click",function(){
  ch.classList.toggle("attivo");stato.chips[ch.dataset.filtro]=ch.classList.contains("attivo");disegna();});});
["f-citta","f-mese","f-ritmo","f-durata","ordina"].forEach(function(id){document.getElementById(id).addEventListener("change",disegna)});
document.getElementById("cerca").addEventListener("click",disegna);
function iniziaNelMese(s,mese){if(!mese)return true;if(s.inizio&&s.inizio.frequenza==="ogni-lunedi")return true;
  return ((s.inizio&&s.inizio.date)||[]).some(function(d){return String(d).indexOf(mese)===0});}
function filtra(){var citta=selCitta.value,mese=selMese.value,ritmo=document.getElementById("f-ritmo").value,durata=document.getElementById("f-durata").value;
 return DATI.scuole.filter(function(s){
  if(citta&&s.citta!==citta)return false;
  if(!iniziaNelMese(s,mese))return false;
  if(ritmo&&!s.corsi.some(function(c){return c.tipo===ritmo}))return false;
  if(durata&&s.durata_min_settimane>Number(durata))return false;
  if(stato.chips.alloggio&&!s.alloggio)return false;
  if(stato.chips.asils&&s.accreditamenti.indexOf("ASILS")<0)return false;
  if(stato.chips.mare&&MARE.indexOf(s.citta)<0)return false;
  if(stato.chips.verificate&&s.stato_dati!=="verificato")return false;
  return true;});}
function card(s){
 var i=null,l=null;s.corsi.forEach(function(c){if(c.tipo==="intensivo")i=c;if(c.tipo==="leggero")l=c;});
 var inizio=s.inizio.frequenza==="ogni-lunedi"?T.ogni_lun:(s.inizio.date[0]?T.dal+" "+s.inizio.date[0]:T.su_r);
 var prezzo=(i&&i.prezzo_da_settimana)?T.prezzo_da+i.prezzo_da_settimana+T.sett_abbr:T.prezzo_sur;
 var timbro=s.stato_dati==="verificato"?'<div class="timbro ok">\\u2713 '+T.verif+' '+(s.verificato_il||"\\u2014")+'</div>'
   :'<div class="timbro attenzione">\\u25cc '+T.daconf+'</div>';
 var badges=s.accreditamenti.map(function(a){return '<span class="badge">'+a+'</span>'}).join("");
 return '<article class="scheda">'
  +'<div class="dove">'+s.citta+' <span>\\u00b7 '+s.regione+'</span></div><h3>'+s.nome+'</h3>'
  +(badges?'<div class="badge-riga">'+badges+'</div>':'')
  +'<div class="meta"><div>'+T.lbl_int+' <b>'+(i?i.ore_settimana+" "+T.hsett:"\\u2014")+'</b></div>'
  +'<div>'+T.lbl_leg+' <b>'+(l?l.ore_settimana+" "+T.hsett:"\\u2014")+'</b></div>'
  +'<div>'+T.lbl_inizio+' <b>'+inizio+'</b></div>'
  +'<div>'+T.lbl_all+' <b>'+(s.alloggio?T.si:T.no)+'</b></div>'
  +'<div style="grid-column:1/-1">'+T.lbl_int+' <b>'+prezzo+'</b></div></div>'
  +timbro
  +'<div class="azioni"><a class="bottone pieno" href="'+s.id+'.html">'+T.vedi+'</a></div></article>';}
function disegna(){var lista=filtra();var ord=document.getElementById("ordina").value;
 lista.sort(function(a,b){return (a[ord]+a.nome).localeCompare(b[ord]+b.nome,"it")});
 document.getElementById("griglia").innerHTML=lista.length?lista.map(card).join("")
  :'<div class="vuoto">'+T.vuoto1+'<br>'+T.vuoto2+'</div>';
 document.getElementById("conta").textContent=lista.length+" "+T.trovate;}
disegna();
})();
</script>
</body></html>"""

SCUOLA = """<!DOCTYPE html>
<html lang="[[LANG]]">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>[[TITLE]]</title>
<meta name="description" content="[[METADESC]]">
<link rel="canonical" href="[[CANON]]">
[[ALTS]]
<script type="application/ld+json">[[JSONLD]]</script>
<style>[[CSS]]</style>
</head>
<body>
<header><div class="contenitore testata">
  <div class="logo"><a href="https://thuisitaliaans.com/">thuis<span>italiaans</span></a> · [[CLAIM]]</div>
  [[SWITCHER]]
</div></header>
<main class="contenitore">
  <div class="crumb"><a href="index.html">[[TORNA]]</a></div>
  <div class="eyebrow">[[CITTA]] <span>· [[REGIONE]] · Italia</span></div>
  <h1>[[NOME]]</h1>
  [[BADGES]]
  <p class="descr">[[DESCR]]</p>
  [[TIMBRO]]
  <div class="colonne">
    <div>
      <div class="pannello"><h2>[[CORSI_H]]</h2>
        <div class="dati">
          <div>[[LBL_INT]]<b>[[ORE_INT]] [[HSETT]]</b></div>
          <div>[[LBL_LEG]]<b>[[ORE_LEG]] [[HSETT]]</b></div>
          <div>[[LBL_INIZIO]]<b>[[INIZIO]]</b></div>
          <div>[[PRINC]]<b>[[PRINC_V]]</b></div>
          <div>[[DURATAM]]<b>[[DURATA_V]] [[SETT]]</b></div>
          <div>[[LBL_ALL]]<b>[[ALL_V]]</b></div>
          [[EXTRA_DATI]]
        </div>
      </div>
      <div class="pannello guida" style="margin-top:18px"><h2>[[GUIDA_H]] [[CITTA_BREVE]]</h2>
        <ol>[[TOP3]]</ol>
        <h2 style="margin-top:16px">[[EVENTI_H]]</h2>[[EVENTI]]
        <div class="aero">✈ [[AERO_H]]: [[AERO_V]]</div>
      </div>
    </div>
    <div>
      <div class="pannello"><h2>[[SCRIVI_H]]</h2>
        <p style="font-size:13px;color:var(--secondario);margin-bottom:12px">[[SCRIVI_P]]</p>
        <form id="modulo">
          <div class="riga"><label>[[F_NOME]]</label><input type="text" name="nome" required maxlength="80"></div>
          <div class="riga"><label>[[F_EMAIL]]</label><input type="email" name="email" required maxlength="120"></div>
          <div class="riga"><label>[[F_MSG]]</label><textarea name="messaggio" required minlength="10" maxlength="3000"></textarea></div>
          <div class="nascosto"><label>Sito web<input type="text" name="sito_web" tabindex="-1" autocomplete="off"></label></div>
          <button class="bottone pieno" type="submit" style="width:100%">[[F_INVIA]]</button>
          <div class="esito" id="esito"></div>
        </form>
        [[SITO_BTN]]
      </div>
    </div>
  </div>
</main>
<footer><div class="contenitore">[[FOOTER]]</div></footer>
<script>
(function(){
var form=document.getElementById("modulo"),esito=document.getElementById("esito");
form.addEventListener("submit",function(ev){ev.preventDefault();
 var d={scuola_id:"[[ID]]",lingua:"[[LANG]]",pagina:"[[CANON]]",
  nome:form.nome.value,email:form.email.value,messaggio:form.messaggio.value,sito_web:form.sito_web.value};
 var btn=form.querySelector("button");btn.disabled=true;
 fetch("/scuole/api/contatto",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
 .then(function(r){if(!r.ok)throw 0;esito.className="esito ok";esito.textContent="[[F_OK]]";form.reset();})
 .catch(function(){esito.className="esito err";esito.textContent="[[F_ERR]]";})
 .finally(function(){btn.disabled=false;});});
})();
</script>
</body></html>"""

def e(s): return html.escape(str(s), quote=True)

OUT.mkdir(exist_ok=True)
for l2 in LANGS:
    if PREF[l2]: (OUT / PREF[l2].strip("/")).mkdir(exist_ok=True)

# ── pagine madre ──
for lang in LANGS:
    t = L[lang]
    T = {k: t[k] for k in ["lbl_int","lbl_leg","lbl_inizio","lbl_all","si","no","ogni_lun","dal","su_r","hsett",
                            "prezzo_da","sett_abbr","prezzo_sur","verif","daconf","vedi","vuoto1","vuoto2","trovate"]}
    T["mesi"] = MESI[lang]
    pagina = rep(HOME, {
        "LANG": lang, "TITLE": e(t["title_home"]), "METADESC": e(t["meta_home"]),
        "CANON": BASEURL + PREF[lang], "ALTS": alternates(""), "CSS": CSS + CSS_HOME,
        "CLAIM": t["claim"], "SWITCHER": switcher(lang, ""), "H1": t["h1"], "SUB": t["sub"],
        "DOVE": t["dove"], "QUANDO": t["quando"], "RITMO": t["ritmo"], "DURATA": t["durata"],
        "TUTTA": t["tutta"], "QMESE": t["qmese"], "QUALS": t["qualsiasi"], "INT": t["int_opt"], "LEG": t["leg_opt"],
        "LIBERA": t["libera"], "W1": t["w1"], "W2": t["w2"], "W4": t["w4"], "W12": t["w12"], "CERCA": t["cerca"],
        "CHIPA": t["chipA"], "CHIPS": t["chipS"], "CHIPM": t["chipM"], "CHIPV": t["chipV"],
        "ORDINA": t["ordina"], "OCITTA": t["o_citta"], "OSCUOLA": t["o_scuola"], "FOOTER": t["footer"],
        "DATIPATH": ("../" if PREF[lang] else "") + "dati.js", "TJSON": json.dumps(T, ensure_ascii=False),
    })
    (OUT / PREF[lang] / "index.html").write_text(pagina, encoding="utf-8")

# ── pagine scuola ──
for s in DATI["scuole"]:
    citta = DATI["citta"][s["citta"]]
    intens = next((c for c in s["corsi"] if c["tipo"] == "intensivo"), None)
    legg = next((c for c in s["corsi"] if c["tipo"] == "leggero"), None)
    for lang in LANGS:
        t = L[lang]
        slugpath = s["id"] + ".html"
        canon = BASEURL + PREF[lang] + slugpath
        inizio = t["ogni_lun"] if s["inizio"]["frequenza"] == "ogni-lunedi" else (
            (t["dal"] + " " + s["inizio"]["date"][0]) if s["inizio"]["date"] else t["su_r"])
        princ = s["inizio"].get("principianti", "")
        if lang != "it" and princ == "date fisse, in genere ogni 2 settimane":
            princ = {"en": "fixed dates, usually every 2 weeks", "nl": "vaste data, meestal om de 2 weken",
                     "de": "feste Termine, meist alle 2 Wochen", "fr": "dates fixes, en général toutes les 2 semaines"}[lang]
        badges = "".join('<span class="badge">' + e(a) + "</span>" for a in s["accreditamenti"])
        extra = ""
        if intens and intens.get("prezzo_da_settimana"):
            extra += '<div>' + t["lbl_int"] + '<b>' + t["prezzo_da"] + str(intens["prezzo_da_settimana"]) + t["sett_abbr"] + '</b></div>'
        if s["esami_in_sede"]:
            extra += '<div>' + t["esami"] + '<b>' + e(", ".join(s["esami_in_sede"])) + '</b></div>'
        timbro = ('<div class="timbro ok">✓ ' + t["verif"] + ' ' + (s["verificato_il"] or "—") + '</div>'
                  if s["stato_dati"] == "verificato" else
                  '<div class="timbro attenzione">◌ ' + t["daconf"] + '</div>')
        top3 = ""
        for voce in citta["top3"]:
            top3 += "<li><div><b>" + e(voce["nome"]) + "</b>"
            if lang == "it":
                top3 += "<small>" + e(voce["perche"]) + "</small>"
            top3 += "</div></li>"
        eventi = "".join('<div class="evento"><b>' + e(ev["nome"]) + '</b><span>'
                         + e(traduci_periodo(ev["quando"], lang)) + "</span></div>" for ev in citta["eventi"])
        descr = rep(t["desc"], {"NOME": e(s["nome"]), "CITTA": e(s["citta"]), "REGIONE": e(s["regione"]),
                                "ALL": t["all_fr"] if s["alloggio"] else ""})
        jsonld = json.dumps({"@context": "https://schema.org", "@type": "LanguageSchool",
                             "name": s["nome"], "url": canon,
                             "address": {"@type": "PostalAddress", "addressLocality": s["citta"],
                                         "addressRegion": s["regione"], "addressCountry": "IT"},
                             **({"sameAs": [s["sito"]]} if s["sito"] else {})}, ensure_ascii=False)
        sito_btn = ('<a class="bottone" style="width:100%;margin-top:10px" target="_blank" rel="noopener" href="'
                    + e(s["sito"]) + '">' + t["sito_b"] + "</a>") if s["sito"] else ""
        pagina = rep(SCUOLA, {
            "LANG": lang, "TITLE": e(rep(t["title_s"], {"NOME": s["nome"], "CITTA": s["citta"]})),
            "METADESC": e(rep(t["meta_s"], {"NOME": s["nome"], "CITTA": s["citta"], "REGIONE": s["regione"]})),
            "CANON": canon, "ALTS": alternates(slugpath), "JSONLD": jsonld, "CSS": CSS + CSS_SCUOLA,
            "CLAIM": t["claim"], "SWITCHER": switcher(lang, slugpath), "TORNA": t["torna"],
            "CITTA": e(s["citta"]), "CITTA_BREVE": e(s["citta"].split(" (")[0]), "REGIONE": e(s["regione"]),
            "NOME": e(s["nome"]), "BADGES": ('<div class="badge-riga">' + badges + "</div>") if badges else "",
            "DESCR": descr, "TIMBRO": timbro, "CORSI_H": t["corsi_h"],
            "LBL_INT": t["lbl_int"], "LBL_LEG": t["lbl_leg"], "LBL_INIZIO": t["lbl_inizio"], "LBL_ALL": t["lbl_all"],
            "ORE_INT": str(intens["ore_settimana"]) if intens else "—", "ORE_LEG": str(legg["ore_settimana"]) if legg else "—",
            "HSETT": t["hsett"], "INIZIO": inizio, "PRINC": t["princ"], "PRINC_V": e(princ),
            "DURATAM": t["duratam"], "DURATA_V": str(s["durata_min_settimane"]), "SETT": t["sett"],
            "ALL_V": t["si"] if s["alloggio"] else t["no"], "EXTRA_DATI": extra,
            "GUIDA_H": t["guida_h"], "TOP3": top3, "EVENTI_H": t["eventi_h"], "EVENTI": eventi,
            "AERO_H": t["aero"], "AERO_V": e(traduci_periodo(citta["aeroporto"], lang)),
            "SCRIVI_H": t["scrivi_h"], "SCRIVI_P": t["scrivi_p"], "F_NOME": t["f_nome"], "F_EMAIL": t["f_email"],
            "F_MSG": t["f_msg"], "F_INVIA": t["f_invia"], "F_OK": t["f_ok"], "F_ERR": t["f_err"],
            "SITO_BTN": sito_btn, "FOOTER": t["footer"], "ID": s["id"],
        })
        (OUT / PREF[lang] / slugpath).write_text(pagina, encoding="utf-8")

# ── sitemap con hreflang ──
oggi = date.today().isoformat()
righe = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
percorsi = [""] + [s["id"] + ".html" for s in DATI["scuole"]]
for p in percorsi:
    for lang in LANGS:
        righe.append("<url><loc>" + BASEURL + PREF[lang] + p + "</loc>")
        for l2 in LANGS:
            righe.append('<xhtml:link rel="alternate" hreflang="' + l2 + '" href="' + BASEURL + PREF[l2] + p + '"/>')
        righe.append('<xhtml:link rel="alternate" hreflang="x-default" href="' + BASEURL + PREF["en"] + p + '"/>')
        righe.append("<lastmod>" + oggi + "</lastmod></url>")
righe.append("</urlset>")
(OUT / "sitemap-scuole.xml").write_text("\n".join(righe), encoding="utf-8")

# ── worker email ──
mappa = {s["id"]: s.get("email", "") for s in DATI["scuole"]}
nomi = {s["id"]: s["nome"] for s in DATI["scuole"]}
worker = """// worker_contatto.js — Cloudflare Worker per il modulo "Scrivi alla scuola"
// Rotta consigliata: thuisitaliaans.com/scuole/api/contatto
// Segreto da impostare:  wrangler secret put RESEND_API_KEY
// Rigenerato da genera_sito.py: NON modificare EMAILS a mano, compilare `email` in dati.js.

const MITTENTE = "posta@thuisitaliaans.com";     // indirizzo VERIFICATO su Resend (dominio thuisitaliaans.com)
const PROPRIETARIO = "info@thuisitaliaans.com";  // la tua casella: riceve copia di ogni messaggio
const ORIGINE = "https://thuisitaliaans.com";

const EMAILS = __EMAILS__;
const NOMI = __NOMI__;

const CORS = {
  "Access-Control-Allow-Origin": ORIGINE,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (req.method !== "POST") return new Response("Metodo non valido", { status: 405, headers: CORS });
    let d;
    try { d = await req.json(); } catch { return new Response("JSON non valido", { status: 400, headers: CORS }); }

    // Honeypot: i bot compilano il campo nascosto, gli umani no.
    if (d.sito_web) return new Response("ok", { status: 200, headers: CORS });

    const email = String(d.email || "").trim();
    const nome = String(d.nome || "").trim().slice(0, 80);
    const msg = String(d.messaggio || "").trim().slice(0, 3000);
    const id = String(d.scuola_id || "");
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email) || msg.length < 10 || !(id in NOMI))
      return new Response("Dati mancanti", { status: 400, headers: CORS });

    const destScuola = EMAILS[id] || "";
    const to = destScuola || PROPRIETARIO;

    const corpo =
      "Uno studente sul sito thuisitaliaans ha un messaggio per te:\\n\\n" +
      msg + "\\n\\n" +
      "— " + nome + " <" + email + ">\\n" +
      "Scuola: " + NOMI[id] + "\\n" +
      "Pagina: " + String(d.pagina || "") + "\\n" +
      "Lingua dello studente: " + String(d.lingua || "") +
      (destScuola ? "" : "\\n\\n[NOTA INTERNA: email della scuola non ancora in archivio — inoltrare a mano]");

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "thuisitaliaans <" + MITTENTE + ">",
        to: [to],
        bcc: destScuola ? [PROPRIETARIO] : [],
        reply_to: email,
        subject: "C'è posta per te da " + email,
        text: corpo,
      }),
    });
    if (!r.ok) return new Response("Invio fallito", { status: 502, headers: CORS });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...CORS, "Content-Type": "application/json" },
    });
  },
};
"""
worker = worker.replace("__EMAILS__", json.dumps(mappa, ensure_ascii=False, indent=2))
worker = worker.replace("__NOMI__", json.dumps(nomi, ensure_ascii=False, indent=2))
(QUI / "worker_contatto.js").write_text(worker, encoding="utf-8")

n = len(list(OUT.rglob("*.html")))
print("Pagine HTML generate:", n, "| sitemap URL:", len(percorsi) * len(LANGS))
