#!/usr/bin/env python3
"""
genera-pagine.py — costruisce tutte le landing usando le classi di style.css.

Nessuna classe inventata: hero-compatto, pagina-servizio, container-stretto,
section-tag, button, lessons-grid, lesson-card, faq / faq-voce, cta-finale,
link-arrow. In più solo le sei classi di supplemento.css.

Uso:  python3 genera-pagine.py
"""

import html, pathlib

SITO = "https://thuisitaliaans.com"

# ----------------------------------------------------------------------------
# HEADER E FOOTER
# Incolla qui il tuo header e footer reali una volta sola: tutte le pagine
# generate li erediteranno. Così eviti il problema dei "pulsanti sfasati".
# ----------------------------------------------------------------------------

HEADER = """<!-- ►►► INCOLLA QUI L'HEADER DI index.html (da <header class="header"> a </header>) ◄◄◄ -->"""

FOOTER = """<!-- ►►► INCOLLA QUI IL FOOTER DI index.html (da <footer> a </footer>) ◄◄◄ -->"""

SCRIPT_MENU = """<!-- ►►► INCOLLA QUI GLI SCRIPT DEL MENU (hamburger + tendine) ◄◄◄ -->"""


# ----------------------------------------------------------------------------
# CITTÀ — ogni voce ha contenuto realmente diverso, non un modello riempito
# ----------------------------------------------------------------------------

CITTA = {
    "ede": {
        "nome": "Ede",
        "titolo_seo": "Italiaanse les in Ede — privéles van een moedertaalspreker",
        "h1": "Italiaanse les in Ede",
        "tag": "Ede & omgeving",
        "occhiello": "Privéles van een Italiaanse moedertaalspreker met twee masters in "
                     "het onderwijzen van Italiaans aan anderstaligen. Van je allereerste "
                     "woord tot C2 — bij jou thuis in Ede, of online.",
        "meta": "Privéles Italiaans in Ede van Alessio, moedertaalspreker met twee masters "
                "in het onderwijzen van Italiaans. Van A1 tot C2, bij jou thuis of online. "
                "Gratis kennismaking.",
        "sede": True,
        "afstand": None,
        "aanbod_lokaal": (
            "<h2>Wat er al is in Ede</h2>"
            "<p>Ede heeft een basiscursus Italiaans bij een lokale cursusaanbieder, "
            "gegeven door een docent met een vertaalachtergrond die in Florence heeft "
            "gewoond. Dat is een prima manier om te beginnen als je in een groep wilt "
            "starten en september je uitkomt.</p>"
            "<p>Wat er niet is: iemand die Italiaans als moedertaal spreekt én is "
            "opgeleid in de didactiek van het Italiaans aan anderstaligen, die je "
            "individueel begeleidt en die verder gaat dan het basisniveau. Dat is "
            "precies het gat waar ik in zit.</p>"
        ),
        "hoek": (
            "<h2>Waarom privéles, en niet een groep</h2>"
            "<p>Een groepscursus werkt als je tempo het groepstempo is, je doel het "
            "groepsdoel, en september je toevallig uitkomt. Vaak is dat niet zo. Je gaat "
            "in mei naar Puglia. Je schoonfamilie woont in Bologna. Je hebt drie jaar "
            "geleden A2 gehaald en bent gestopt.</p>"
            "<p>In een groep van twaalf spreek je een paar minuten per les. Hier is alle "
            "tijd van jou, en de les gaat over wat jij nodig hebt.</p>"
        ),
        "comuni": ["Ede", "Bennekom", "Lunteren", "Otterlo", "Ederveen",
                   "Harskamp", "Wekerom", "De Klomp"],
        "faq_extra": [
            ("Waar in Ede vinden de lessen plaats?",
             "Bij jou thuis, op je werk, of op een rustige plek in Ede die we samen "
             "afspreken. Online kan altijd, en we kunnen ook afwisselen."),
            ("Geef je ook les in Bennekom, Lunteren of Otterlo?",
             "Ja. Alles binnen de gemeente Ede is dichtbij; daar kom ik gewoon naartoe."),
        ],
    },
    "bennekom": {
        "nome": "Bennekom",
        "titolo_seo": "Italiaanse les in Bennekom — privéles aan huis",
        "h1": "Italiaanse les in Bennekom",
        "tag": "Bennekom",
        "occhiello": "Privéles Italiaans bij jou thuis in Bennekom, van een "
                     "moedertaalspreker die om de hoek woont. Geen reistijd, geen groep, "
                     "geen vaste startdatum.",
        "meta": "Privéles Italiaans in Bennekom van een Italiaanse moedertaalspreker uit "
                "Ede. Aan huis of online, van A1 tot C2. Gratis kennismaking.",
        "sede": False,
        "afstand": "Bennekom ligt op een paar minuten van Ede, dus lesgeven aan huis is "
                   "hier het makkelijkst van allemaal.",
        "aanbod_lokaal": (
            "<h2>In Bennekom zelf is er niets</h2>"
            "<p>Voor een cursus Italiaans moet je normaal gesproken naar Ede, Wageningen "
            "of verder. Dat betekent 's avonds in de auto of op de fiets, bij weer en "
            "wind, op een tijdstip dat de cursus bepaalt.</p>"
            "<p>Ik draai het om: ik kom naar jou. Bennekom is voor mij een paar minuten "
            "rijden, dus er is geen reistoeslag en geen gedoe met planning.</p>"
        ),
        "hoek": (
            "<h2>Aan huis, en dus echt op maat</h2>"
            "<p>Les aan de eigen keukentafel klinkt als een detail, maar het verandert "
            "de les. Je kookboek staat er, de foto's van je reis hangen aan de muur, de "
            "brief van de Italiaanse notaris ligt op tafel. Al dat materiaal wordt "
            "lesmateriaal.</p>"
        ),
        "comuni": ["Bennekom", "Ede", "Wageningen", "Renkum", "Heelsum"],
        "faq_extra": [
            ("Reken je reiskosten voor Bennekom?",
             "Nee. Bennekom valt binnen mijn directe omgeving."),
            ("Kunnen we ook met z'n tweeën les nemen?",
             "Ja. Een duo-les met je partner, buurman of een vriend kan gewoon aan huis, "
             "en is per persoon voordeliger."),
        ],
    },
    "wageningen": {
        "nome": "Wageningen",
        "titolo_seo": "Italian lessons in Wageningen — privéles voor internationals",
        "h1": "Italiaanse les in Wageningen",
        "tag": "Wageningen",
        "occhiello": "Privéles Italiaans in Wageningen, in het Nederlands of in het "
                     "Engels. Voor studenten, onderzoekers en iedereen die de taal om "
                     "een concrete reden nodig heeft.",
        "meta": "Privéles Italiaans in Wageningen, in het Nederlands of Engels. Voor "
                "studenten, onderzoekers en expats. Van A1 tot C2, aan huis of online.",
        "sede": False,
        "afstand": "Wageningen ligt op een kwartier van Ede, dus les op locatie is hier "
                   "geen probleem.",
        "aanbod_lokaal": (
            "<h2>Een internationale stad zonder Italiaans aanbod</h2>"
            "<p>Wageningen is een van de meest internationale plaatsen van Nederland, "
            "maar een structureel aanbod Italiaans is er niet. Wie de taal wil leren "
            "wijkt uit naar Utrecht of Arnhem, of belandt op een platform met wisselende "
            "docenten.</p>"
        ),
        "hoek": (
            "<h2>Les in het Nederlands of in het Engels</h2>"
            "<p>Ik spreek vloeiend Italiaans, Engels en Frans, en Nederlands en Spaans op "
            "gemiddeld niveau. Voor internationale studenten en onderzoekers betekent dat: "
            "de uitleg kan in het Engels, ook als je geen woord Nederlands spreekt.</p>"
            "<p>Ga je naar Italië voor een uitwisseling, een veldstudie of een postdoc? "
            "Dan werken we aan wat je daar echt tegenkomt: het inschrijven bij de "
            "gemeente, de taal van je vakgebied, en het gesprek dat na afloop in de bar "
            "gevoerd wordt.</p>"
        ),
        "comuni": ["Wageningen", "Bennekom", "Renkum", "Heelsum", "Rhenen", "Ede"],
        "faq_extra": [
            ("Can the lessons be in English?",
             "Yes. I speak English fluently and often teach Italian through English for "
             "international students and researchers in Wageningen."),
            ("Ik ben hier maar voor één semester. Heeft het zin?",
             "Ja, mits we het doel klein en concreet houden. In drie maanden bereik je "
             "geen B2, maar wel een bruikbare A1 of een stevige A2."),
        ],
    },
    "veenendaal": {
        "nome": "Veenendaal",
        "titolo_seo": "Italiaanse les in Veenendaal — verder dan de vakantiecursus",
        "h1": "Italiaanse les in Veenendaal",
        "tag": "Veenendaal",
        "occhiello": "Privéles Italiaans in Veenendaal, voor wie verder wil dan een paar "
                     "vakantiezinnen. Van de eerste woorden tot C2, in je eigen tempo.",
        "meta": "Privéles Italiaans in Veenendaal. Verder dan de vakantiecursus: van A1 "
                "tot C2, individueel, aan huis of online. Gratis kennismaking.",
        "sede": False,
        "afstand": "Veenendaal ligt op ongeveer twintig minuten van Ede.",
        "aanbod_lokaal": (
            "<h2>Wat er in Veenendaal wordt aangeboden</h2>"
            "<p>Wat je in Veenendaal vindt is meestal een korte vakantiecursus: negen "
            "lessen om je te redden op een terras. Dat is nuttig, en voor sommige mensen "
            "precies genoeg.</p>"
            "<p>Maar als je in Italië een huis hebt gekocht, als je schoonfamilie geen "
            "Engels spreekt, of als je gewoon niet wilt stoppen bij het bestellen van een "
            "koffie, dan loopt zo'n cursus af precies op het moment dat het interessant "
            "wordt.</p>"
        ),
        "hoek": (
            "<h2>Er is geen eindpunt</h2>"
            "<p>Bij mij houdt het traject niet op na negen lessen. Het loopt door tot "
            "waar jij wilt komen: A2 om je te redden, B1 om echt gesprekken te voeren, "
            "B2 om films zonder ondertiteling te volgen, C1 om literatuur te lezen.</p>"
        ),
        "comuni": ["Veenendaal", "Rhenen", "Elst", "Amerongen", "Renswoude", "Ede"],
        "faq_extra": [
            ("Ik heb al een korte cursus gedaan. Moet ik opnieuw beginnen?",
             "Nee. We kijken in de kennismaking waar je staat en pakken daar de draad op. "
             "Herhalen wat je al kunt is zonde van je tijd."),
            ("Kom je naar Veenendaal of doen we het online?",
             "Allebei kan. Veel cursisten hier kiezen voor om de week op locatie en de "
             "andere week online."),
        ],
    },
    "barneveld": {
        "nome": "Barneveld",
        "titolo_seo": "Italiaanse les in Barneveld — privéles aan huis of online",
        "h1": "Italiaanse les in Barneveld",
        "tag": "Barneveld",
        "occhiello": "In Barneveld is geen cursus Italiaans te vinden. Daarom kom ik naar "
                     "je toe — of doen we het online, wat net zo goed werkt.",
        "meta": "Privéles Italiaans in Barneveld. Geen lokaal aanbod? Ik kom naar je toe "
                "of we werken online. Van A1 tot C2, gratis kennismaking.",
        "sede": False,
        "afstand": "Barneveld ligt op ongeveer twintig minuten van Ede.",
        "aanbod_lokaal": (
            "<h2>Geen aanbod in de buurt</h2>"
            "<p>Wie in Barneveld Italiaans wil leren, komt al snel uit bij Amersfoort, "
            "Ede of Utrecht. Dat betekent 's avonds een half uur heen en een half uur "
            "terug, bovenop de les zelf.</p>"
            "<p>Voor één les per week is dat drie uur van je avond. Daar haken de meeste "
            "mensen na een paar maanden op af — niet omdat de les niet leuk was.</p>"
        ),
        "hoek": (
            "<h2>Twee manieren om die reistijd te schrappen</h2>"
            "<p>De eerste: ik kom naar Barneveld. De tweede, en voor de meeste mensen de "
            "praktische: we doen het online. Voor een privéles is dat geen tweede keus. "
            "Je zit dichter bij het scherm dan bij een docent aan tafel, materiaal deel "
            "ik direct, en de les begint op het moment dat hij begint.</p>"
        ),
        "comuni": ["Barneveld", "Voorthuizen", "Kootwijkerbroek", "Garderen",
                   "Terschuur", "Ede", "Nijkerk"],
        "faq_extra": [
            ("Kom je echt helemaal naar Barneveld?",
             "Ja, voor lessen op locatie kom ik naar Barneveld en de omliggende dorpen. "
             "Bij een reeks lessen spreken we een vast moment af."),
            ("Werkt online les net zo goed?",
             "Voor een privéles wel. Wat je mist is de koffie, niet de kwaliteit van de les."),
        ],
    },
    "amersfoort": {
        "nome": "Amersfoort",
        "titolo_seo": "Italiaanse les in Amersfoort — privéles, ook C1 en C2",
        "h1": "Italiaanse les in Amersfoort",
        "tag": "Amersfoort & omgeving",
        "occhiello": "Privéles van een moedertaalspreker met twee masters in didactiek. "
                     "Geen vaste startdata, geen groepstempo — en wél de niveaus waar het "
                     "aanbod in de regio ophoudt.",
        "meta": "Privéles Italiaans in Amersfoort. Geen vaste startdata, alle niveaus tot "
                "C2, eigen lesmateriaal. Op locatie of online. Gratis kennismaking.",
        "sede": False,
        "afstand": "Amersfoort ligt op ongeveer een half uur rijden vanuit Ede.",
        "aanbod_lokaal": (
            "<h2>Twee dingen die in Amersfoort lastig te vinden zijn</h2>"
            "<h3>Het begint op vaste momenten</h3>"
            "<p>Jaarcursussen starten in september, intensieve cursussen in februari. "
            "Besluit je in november dat je Italiaans wilt leren omdat je in maart naar "
            "Rome gaat, dan val je tussen wal en schip.</p>"
            "<h3>Het houdt op rond B2</h3>"
            "<p>De meeste groepstrajecten in de regio lopen tot B1 of B2. Dat is precies "
            "het niveau waarop veel mensen vastlopen: je begrijpt films met ondertiteling "
            "en je redt je op vakantie, maar je voert geen genuanceerd gesprek en je "
            "schrijft nog als een toerist.</p>"
        ),
        "hoek": (
            "<h2>C1 en C2 zijn waar ik het liefst werk</h2>"
            "<p>Literatuur in het origineel, register en beleefdheidsvormen, "
            "argumenteren, schrijven voor werk of studie. Daar zijn mijn beide masters "
            "ook voor bedoeld.</p>"
            "<p>Zit je al een tijd op B1 of B2 en kom je niet vooruit? Dat is bijna nooit "
            "een kwestie van meer woordjes leren. Het is een kwestie van te weinig "
            "productie en te weinig correctie — en dat is precies wat een groep niet kan "
            "bieden en een privéles wel.</p>"
        ),
        "comuni": ["Amersfoort", "Leusden", "Hoevelaken", "Nijkerk", "Soest",
                   "Baarn", "Bunschoten", "Barneveld"],
        "faq_extra": [
            ("Wanneer kan ik beginnen?",
             "Wanneer je wilt. Er zijn geen vaste startmomenten in september of februari: "
             "we plannen de eerste les zodra het jou en mij uitkomt."),
            ("Ik zit al op B2. Kan ik verder dan dat?",
             "Ja. Het aanbod in de regio stopt vaak bij B2. Ik werk door tot C1 en C2, met "
             "literatuur, discussie, register en schrijfvaardigheid op academisch niveau."),
        ],
    },
    "arnhem": {
        "nome": "Arnhem",
        "titolo_seo": "Italiaanse les in Arnhem — privéles op locatie of online",
        "h1": "Italiaanse les in Arnhem",
        "tag": "Arnhem",
        "occhiello": "Privéles Italiaans in Arnhem van een moedertaalspreker uit Ede. "
                     "Individueel, op jouw tempo, van A1 tot C2.",
        "meta": "Privéles Italiaans in Arnhem van een Italiaanse moedertaalspreker met "
                "didactiekmaster. Op locatie of online, van A1 tot C2.",
        "sede": False,
        "afstand": "Arnhem ligt op de spoorlijn Utrecht–Arnhem, een kwartier van "
                   "station Ede-Wageningen.",
        "aanbod_lokaal": (
            "<h2>Wel taalscholen, geen Italiaans specialist</h2>"
            "<p>Arnhem heeft een goed aanbod voor de grote talen, maar een docent die "
            "zich volledig op Italiaans richt is er nauwelijks. Italiaans wordt vaak "
            "meegenomen als negende taal in een breed aanbod, met een docent die ook "
            "Spaans en Frans geeft.</p>"
        ),
        "hoek": (
            "<h2>Eén taal, en de didactiek erachter</h2>"
            "<p>Ik geef alleen Italiaans, en ik ben opgeleid in het onderwijzen ervan aan "
            "anderstaligen. Dat verschil merk je bij de dingen die specifiek Italiaans "
            "zijn en die in een algemeen taalaanbod ondersneeuwen: de dubbele "
            "medeklinker, het <em>congiuntivo</em>, het verschil tussen passato prossimo "
            "en imperfetto, de plaatsing van de pronomi.</p>"
        ),
        "comuni": ["Arnhem", "Oosterbeek", "Velp", "Renkum", "Doorwerth",
                   "Elst", "Duiven", "Ede"],
        "faq_extra": [
            ("Kom je naar Arnhem voor de les?",
             "Ja, dat kan. Arnhem is vanaf Ede goed bereikbaar. Bij een vaste reeks "
             "spreken we een vast tijdstip af."),
            ("Bereid je ook voor op een taalcertificaat?",
             "Ja. Zie de pagina over "
             "<a href=\"/cils-celi-plida-nederland\">CILS, CELI en PLIDA</a>."),
        ],
    },
    "utrecht": {
        "nome": "Utrecht",
        "titolo_seo": "Privéles Italiaans in Utrecht — individueel en zakelijk",
        "h1": "Privéles Italiaans in Utrecht",
        "tag": "Utrecht",
        "occhiello": "Utrecht heeft goede taalscholen. Wat er minder is: individuele "
                     "begeleiding zonder rooster, en Italiaans voor je werk met het "
                     "vocabulaire van jouw sector.",
        "meta": "Privéles Italiaans in Utrecht: individueel, zonder vast rooster, ook "
                "zakelijk Italiaans en in-company. Van A1 tot C2, ook online.",
        "sede": False,
        "afstand": "Utrecht ligt op ongeveer drie kwartier van Ede, en op de directe "
                   "treinverbinding vanaf Ede-Wageningen.",
        "aanbod_lokaal": (
            "<h2>Eerlijk over Utrecht</h2>"
            "<p>Utrecht heeft een sterk aanbod: gevestigde taalinstituten, een "
            "volksuniversiteit, en een paar goede Italiaanse docenten met jarenlange "
            "ervaring en uitstekende beoordelingen. Zoek je een klassieke groepscursus "
            "Italiaans in Utrecht, dan zit je daar prima.</p>"
            "<p>Ik ga niet doen alsof dat niet zo is. Wat ik aanbied is iets anders.</p>"
        ),
        "hoek": (
            "<h2>Waar ik wél het verschil maak</h2>"
            "<ul class=\"elenco-check\">"
            "<li><strong>Geen rooster.</strong> Werk je onregelmatig, reis je veel, of "
            "wisselt je agenda per week? Dan is een vaste cursusavond het probleem, niet "
            "de oplossing.</li>"
            "<li><strong>Zakelijk Italiaans met jouw vocabulaire.</strong> Niet "
            "'zakelijk Italiaans' in het algemeen, maar de woorden van jouw sector, jouw "
            "klanten en jouw documenten.</li>"
            "<li><strong>Boven B2.</strong> Waar het reguliere aanbod ophoudt, gaat een "
            "privétraject door.</li>"
            "<li><strong>Eigen lesmateriaal.</strong> Geen cursusboek: ruim 700 "
            "oefeningen, een eigen app en klassiekers per niveau herschreven.</li>"
            "</ul>"
        ),
        "comuni": ["Utrecht", "De Bilt", "Zeist", "Nieuwegein", "Houten",
                   "Bunnik", "Driebergen", "Veenendaal"],
        "faq_extra": [
            ("Waarom zou ik jou nemen en niet een taalschool in Utrecht?",
             "Als je een groepscursus wilt met een vaste avond en medecursisten: neem een "
             "taalschool in Utrecht, dat is een goede keuze. Kies mij als je onregelmatig "
             "werkt, boven B2 wilt komen, of Italiaans voor je werk nodig hebt."),
            ("Kom je naar Utrecht of is het online?",
             "Voor zakelijke trajecten kom ik naar kantoor. Voor individuele lessen kiezen "
             "de meeste cursisten in Utrecht voor online, omdat het scheelt in reistijd."),
        ],
    },
}


# ----------------------------------------------------------------------------
# PAGINE PER INTENTO — coprono tutte le città in una volta
# ----------------------------------------------------------------------------

INTENTO = {
    "zakelijk-italiaans": {
        "nome": "Zakelijk Italiaans",
        "titolo_seo": "Zakelijk Italiaans — taaltraining voor werk en in-company",
        "h1": "Zakelijk Italiaans",
        "tag": "Voor je werk",
        "occhiello": "Vergaderen, mailen, onderhandelen en de telefoon opnemen in het "
                     "Italiaans. Individueel of met een klein team, op kantoor of online.",
        "meta": "Zakelijk Italiaans voor professionals en bedrijven: vergaderen, mailen, "
                "onderhandelen. Individueel of in-company, op locatie of online.",
        "corpo": (
            "<h2>Niet 'zakelijk Italiaans', maar jouw Italiaans</h2>"
            "<p>Zakelijke taaltraining gaat vaak mis omdat hij generiek is: een module "
            "over 'de vergadering' en een over 'de e-mail', met woorden die niemand in "
            "jouw sector gebruikt.</p>"
            "<p>Ik werk andersom. Je stuurt me een offerte, een mailwisseling, de website "
            "van je Italiaanse partner of het contract waar je doorheen moet. Dat wordt "
            "het lesmateriaal. Na tien lessen ken je niet 'zakelijk Italiaans' — je kent "
            "de taal van jouw werk.</p>"
            "<h2>Wat we meestal aanpakken</h2>"
            "<ul class=\"elenco-check\">"
            "<li>De telefoon opnemen en een gesprek voeren zonder te bevriezen</li>"
            "<li>Een mail schrijven die professioneel klinkt, niet vertaald</li>"
            "<li>Het verschil tussen <em>tu</em> en <em>Lei</em>, en wanneer het omslaat</li>"
            "<li>Onderhandelen: voorstellen, tegenwerpen, uitstellen, afsluiten</li>"
            "<li>Small talk vóór en na de vergadering — waar in Italië de helft van het "
            "werk gebeurt</li>"
            "<li>Documenten lezen: offertes, contracten, facturen</li>"
            "</ul>"
            "<div class=\"nota\"><p><strong>In-company.</strong> Voor teams geef ik les "
            "op kantoor, individueel of in kleine groepen. Je krijgt een factuur op "
            "bedrijfsnaam met KVK- en btw-gegevens.</p></div>"
        ),
        "faq_extra": [
            ("Hoeveel lessen heb ik nodig?",
             "Dat hangt af van je startniveau. Voor iemand die al op B1 zit en zich "
             "professioneel wil kunnen redden, is tien tot vijftien lessen een realistische "
             "eerste stap."),
            ("Kan mijn werkgever dit vergoeden?",
             "Vaak wel. Je krijgt een factuur op naam van het bedrijf met KVK- en "
             "btw-gegevens."),
            ("Geef je ook les op kantoor?",
             "Ja, in Ede, Amersfoort, Utrecht, Arnhem en omgeving. Verder weg is online "
             "meestal praktischer."),
        ],
    },
    "italiaans-voor-kinderen": {
        "nome": "Italiaans voor kinderen",
        "titolo_seo": "Italiaans voor kinderen — spelenderwijs en tweetalig opgroeien",
        "h1": "Italiaans voor kinderen",
        "tag": "Voor kinderen",
        "occhiello": "Spelenderwijs Italiaans leren, of een tweetalige opvoeding "
                     "ondersteunen. Individueel, samen met een ouder, of met broer en zus.",
        "meta": "Italiaanse les voor kinderen: spelenderwijs leren of een tweetalige "
                "opvoeding ondersteunen. Aan huis in Ede en omgeving, of online.",
        "corpo": (
            "<h2>Kinderen leren anders, en dus lesgeef ik anders</h2>"
            "<p>Een kind van acht heeft niets aan een grammaticaschema. Wat wel werkt: "
            "spelletjes, verhalen, liedjes, tekenen, en veel herhaling die niet als "
            "herhaling voelt. Ik gebruik dezelfde principes als bij volwassenen — begrip "
            "vóór productie, veel input — maar in een vorm die leuk blijft.</p>"
            "<h2>Twee situaties die ik vaak zie</h2>"
            "<h3>Een tweetalig gezin</h3>"
            "<p>Eén ouder is Italiaans, en het kind begrijpt alles maar antwoordt in het "
            "Nederlands. Dat is normaal en het is op te lossen, maar niet door thuis "
            "strenger te zijn. Er is een derde persoon nodig met wie alleen Italiaans "
            "gesproken wordt.</p>"
            "<h3>Een gezin dat naar Italië gaat</h3>"
            "<p>Verhuizing, langere vakanties, of familie in Italië. Hier telt vooral "
            "vertrouwen: een kind dat durft te praten leert in twee weken meer dan een "
            "kind dat zich schaamt.</p>"
            "<div class=\"nota\"><p><strong>Samen met een ouder.</strong> Veel gezinnen "
            "kiezen voor een gezamenlijke les. Het kind vindt het minder eng, de ouder "
            "leert mee, en thuis kun je oefenen zonder dat het een schoolopdracht wordt."
            "</p></div>"
        ),
        "faq_extra": [
            ("Vanaf welke leeftijd?",
             "Vanaf een jaar of zes gaat het meestal goed. Jonger kan ook, maar dan alleen "
             "samen met een ouder en in korte sessies."),
            ("Hoe lang duurt een les voor een kind?",
             "Korter dan voor een volwassene. Voor jonge kinderen werkt drie kwartier "
             "beter dan een uur."),
            ("Krijgt mijn kind huiswerk?",
             "Iets kleins, en het voelt niet als huiswerk: een spelletje, een liedje, een "
             "tekening met woorden erbij."),
        ],
    },
    "italiaanse-conversatieles": {
        "nome": "Conversatieles Italiaans",
        "titolo_seo": "Italiaanse conversatieles — vloeiender spreken vanaf B1",
        "h1": "Italiaanse conversatieles",
        "tag": "Spreekvaardigheid",
        "occhiello": "Je begrijpt veel, maar spreken blijft achter. Conversatieles met "
                     "correctie die je vooruit helpt in plaats van je te onderbreken.",
        "meta": "Italiaanse conversatieles vanaf B1: vloeiender spreken met gerichte "
                "correctie. Online of op locatie in Ede, Amersfoort en omgeving.",
        "corpo": (
            "<h2>Het klassieke probleem</h2>"
            "<p>Je leest zonder moeite, je begrijpt de podcast, en dan staat er iemand "
            "voor je en komt er niets. Dat is geen gebrek aan kennis — het is een gebrek "
            "aan kilometers. Begrijpen en produceren zijn twee verschillende "
            "vaardigheden, en de tweede groeit alleen door hem te gebruiken.</p>"
            "<h2>Waarom 'gewoon praten' vaak niet genoeg is</h2>"
            "<p>Een gesprekspartner die je fouten niet corrigeert, laat je vlot worden in "
            "je eigen fouten. Na een jaar praat je sneller en nog steeds verkeerd, en de "
            "gewoontes zitten inmiddels vast.</p>"
            "<p>Wat wel werkt is correctie op het juiste moment: niet elke fout, wel de "
            "fouten die je begrip van het systeem verraden. En achteraf een korte "
            "terugkoppeling van de twee of drie dingen die echt telden.</p>"
            "<div class=\"nota\"><p>Conversatieles heeft zin vanaf ongeveer B1. Zit je "
            "lager, dan is er eerst structuur nodig: praten zonder basis wordt raden.</p></div>"
            "<h2>Waar we het over hebben</h2>"
            "<p>Jouw werk, actualiteit, een film die je gezien hebt, een artikel dat ik "
            "vooraf stuur, of een discussie waarin je een standpunt moet verdedigen dat "
            "niet het jouwe is — dat laatste is het beste middel tegen vaste zinnetjes.</p>"
        ),
        "faq_extra": [
            ("Vanaf welk niveau heeft conversatieles zin?",
             "Vanaf ongeveer B1. Daaronder is er eerst structuur nodig, anders wordt praten "
             "gokken."),
            ("Corrigeer je alles?",
             "Nee. Alles corrigeren maakt spreken onmogelijk. Ik grijp in bij fouten die "
             "de betekenis raken of die een patroon laten zien, en geef de rest achteraf."),
            ("Kan dit online?",
             "Ja, en voor conversatie werkt het uitstekend. Zie "
             "<a href=\"/italiaans-online-leren\">Italiaans online leren</a>."),
        ],
    },
    "italiaans-voor-beginners": {
        "nome": "Italiaans voor beginners",
        "titolo_seo": "Italiaans voor beginners — vanaf nul, zonder voorkennis",
        "h1": "Italiaans leren voor beginners",
        "tag": "Vanaf nul",
        "occhiello": "Nog nooit een woord Italiaans gesproken? Dat is het makkelijkste "
                     "startpunt dat er is. Geen groep, geen startdatum, geen lesboek.",
        "meta": "Italiaans leren voor beginners: vanaf nul, zonder voorkennis, in je eigen "
                "tempo. Privéles in Ede en omgeving of online. Gratis kennismaking.",
        "corpo": (
            "<h2>Beginnen is makkelijker dan doorgaan</h2>"
            "<p>De eerste maanden Italiaans zijn de leukste. De uitspraak is regelmatig "
            "— je leest wat er staat, anders dan bij Engels of Frans. Veel woorden "
            "herken je al. En na een paar lessen kun je iets zeggen dat echt werkt.</p>"
            "<p>Het moeilijke komt later, rond B1. Daarom is het slim om vanaf het begin "
            "goede gewoontes op te bouwen in plaats van fouten die je er over twee jaar "
            "weer uit moet halen.</p>"
            "<h2>Wat je in de eerste maanden leert</h2>"
            "<ul class=\"elenco-check\">"
            "<li>Uitspraak: de klinkers, de dubbele medeklinker, de klemtoon</li>"
            "<li>Jezelf voorstellen en vertellen waar je vandaan komt</li>"
            "<li>Bestellen, boodschappen doen, de weg vragen</li>"
            "<li>De tegenwoordige tijd en de eerste onregelmatige werkwoorden</li>"
            "<li>Genoeg woorden om een gesprekje te voeren dat nergens over gaat — "
            "precies wat je in Italië de hele dag doet</li>"
            "</ul>"
            "<div class=\"nota\"><p><strong>Je hoeft niets te kopen.</strong> Geen "
            "lesboek: het materiaal schrijf ik zelf, en de "
            "<a href=\"/esercizi/\">700 oefeningen</a> en de "
            "<a href=\"/app-ti.html\">app</a> zijn gratis, ook als je nooit een les neemt."
            "</p></div>"
            "<h2>Ben ik te oud?</h2>"
            "<p>Nee. Volwassenen leren een taal anders dan kinderen, niet slechter: je "
            "begrijpt structuren sneller en je weet wat je wilt zeggen. Wat je mist is "
            "tijd, en dat los je op met regelmaat, niet met talent.</p>"
        ),
        "faq_extra": [
            ("Ik heb geen talenknobbel. Heeft het zin?",
             "Ja. 'Talenknobbel' bestaat niet als vaste eigenschap. Wat telt is regelmaat "
             "en genoeg gelegenheid om te praten zonder afgerekend te worden op fouten."),
            ("Hoe lang tot ik me kan redden op vakantie?",
             "Met een les per week en wat werk ertussendoor red je je meestal na vier tot "
             "zes maanden in de gewone vakantiesituaties."),
            ("Moet ik een boek kopen?",
             "Nee. Al het materiaal schrijf ik zelf en het zit bij de les in."),
        ],
    },
    "italiaans-voor-gevorderden": {
        "nome": "Italiaans voor gevorderden",
        "titolo_seo": "Italiaans voor gevorderden — verder dan B2, tot C1 en C2",
        "h1": "Italiaans voor gevorderden",
        "tag": "B2 en hoger",
        "occhiello": "Vastgelopen rond B1 of B2? Daar houdt het reguliere aanbod op, en "
                     "daar begint het interessante deel.",
        "meta": "Italiaans voor gevorderden: van B2 naar C1 en C2. Literatuur, register, "
                "argumenteren en schrijven. Privéles online of in Ede en omgeving.",
        "corpo": (
            "<h2>Het plafond waar bijna iedereen tegenaan loopt</h2>"
            "<p>Rond B1 of B2 gebeurt iets vervelends: je maakt geen zichtbare "
            "vooruitgang meer. Je begrijpt films met ondertiteling, je redt je in "
            "Italië, mensen zeggen dat je goed Italiaans spreekt — en toch weet je dat "
            "je dezelfde vijftig constructies blijft gebruiken.</p>"
            "<p>Dat is geen inbeelding. Op dit niveau vind je bijna nergens meer les: "
            "groepscursussen lopen tot B2 en houden dan op, en zelfstudie werkt slecht "
            "omdat niemand je nog corrigeert.</p>"
            "<h2>Wat er op C1 en C2 verandert</h2>"
            "<ul class=\"elenco-check\">"
            "<li><strong>Register.</strong> Niet 'correct' Italiaans, maar het juiste "
            "Italiaans voor deze situatie en deze persoon.</li>"
            "<li><strong>Sfumature.</strong> Het verschil tussen twee woorden die het "
            "woordenboek als synoniemen geeft, maar die dat niet zijn.</li>"
            "<li><strong>Syntaxis.</strong> Langere zinnen bouwen zonder de draad kwijt "
            "te raken, en de woordvolgorde gebruiken voor nadruk.</li>"
            "<li><strong>Literatuur in het origineel.</strong> Passato remoto, "
            "negentiende-eeuwse prosa, en wat er onder de tekst zit.</li>"
            "<li><strong>Schrijven.</strong> De vaardigheid die het laatst komt en het "
            "meest verraadt.</li>"
            "</ul>"
            "<div class=\"nota\"><p>Op dit niveau telt het werk tussen de lessen zwaarder "
            "dan de les zelf. Je krijgt elke week een schrijfopdracht die ik grondig "
            "corrigeer — niet met een streep, maar met de reden erbij.</p></div>"
        ),
        "faq_extra": [
            ("Hoe weet ik of ik B2 ben?",
             "Kijk bij de <a href=\"/libri-italiano-facile-b2\">beschrijving van B2</a>, of "
             "vraag een gratis inschatting aan. Zelfinschatting valt op dit niveau vaak "
             "een half niveau te hoog of te laag uit."),
            ("Kan ik me voorbereiden op C1 of C2 certificaat?",
             "Ja. Zie <a href=\"/cils-celi-plida-nederland\">CILS, CELI en PLIDA</a>."),
            ("Wat lezen we?",
             "Wat jou interesseert. Ik heb Italiaanse klassiekers per niveau herschreven, "
             "maar op C1 werken we meestal al met de originele tekst."),
        ],
    },
}


# ----------------------------------------------------------------------------
# TEMPLATE
# ----------------------------------------------------------------------------

BLOCCO_MATERIALE = """
      <h2>Geen lesboek — eigen materiaal</h2>
      <p>Bijna elke taalschool werkt met een commercieel lesboek. Ik niet. Het
      materiaal dat je krijgt heb ik zelf geschreven, en het blijft van jou —
      ook tussen de lessen door.</p>
      <ul class="elenco-check">
        <li><a href="/esercizi/"><strong>Ruim 700 interactieve oefeningen</strong></a>,
        gratis en zonder account, van A1 tot B2.</li>
        <li><a href="/app-ti.html"><strong>Een eigen iOS-app</strong></a> met een
        volledig ERK-traject van A1 tot C2 en een woordenboek van 4.000+ woorden
        in veertien talen.</li>
        <li><strong>Italiaanse klassiekers, per niveau herschreven</strong> — met
        noten en woordenlijst, zodat je op B1 al Pirandello leest.</li>
      </ul>"""

BLOCCO_CHI = """
      <h2>Wie ik ben</h2>
      <p>Ik ben Alessio, Italiaan, en ik woon in Ede. Ik geef al meer dan zes
      jaar Italiaanse les en heb inmiddels meer dan dertig cursisten begeleid.</p>
      <p>Ik heb <strong>twee masters die specifiek gaan over het onderwijzen van
      Italiaans aan anderstaligen</strong>: één aan de Università Ca' Foscari in
      Venetië (ITALS), één aan de Università Giustino Fortunato. Dat is iets
      anders dan Italiaans als moedertaal spreken. Het betekent dat ik weet
      waarom Nederlandstaligen struikelen over het <em>congiuntivo</em>, waarom
      de dubbele medeklinker zo lastig is voor een Nederlands oor, en in welke
      volgorde je dingen aanbiedt zodat ze blijven hangen.</p>
      <p><a class="link-arrow" href="/#reviews">Lees wat cursisten schrijven →</a></p>"""

FAQ_BASE = [
    ("Kan ik eerst kennismaken zonder te betalen?",
     "Ja, de kennismaking is gratis en vrijblijvend. We bespreken je doel en je "
     "niveau, en je merkt meteen of het klikt."),
    ("Wat kost het?",
     "Alle tarieven staan open en bloot op <a href=\"/tarieven\">de tarievenpagina</a>. "
     "Geen intakekosten, geen verborgen bedragen."),
    ("Moet ik een lesboek kopen?",
     "Nee. Al het lesmateriaal schrijf ik zelf en het zit bij de les in."),
]


def faq_html(voci):
    out = ['      <h2>Veelgestelde vragen</h2>', '      <div class="faq">']
    for d, r in voci:
        out.append('        <details class="faq-voce">')
        out.append(f'          <summary>{d}</summary>')
        out.append(f'          <p>{r}</p>')
        out.append('        </details>')
    out.append('      </div>')
    return "\n".join(out)


def faq_schema(voci):
    import json
    return json.dumps({
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": d,
             "acceptedAnswer": {"@type": "Answer",
                                "text": r.replace('<a href="/tarieven">', '')
                                         .replace('<a href="/esercizi/">', '')
                                         .replace('<a href="/italiaans-online-leren">', '')
                                         .replace('<a href="/cils-celi-plida-nederland">', '')
                                         .replace('<a href="/libri-italiano-facile-b2">', '')
                                         .replace('</a>', '')}}
            for d, r in voci
        ]
    }, ensure_ascii=False, indent=6)


def guscio(slug, titolo_seo, meta, h1, tag, occhiello, corpo, voci_faq,
           schema_extra, cta_titolo, cta_testo):
    faq_j = faq_schema(voci_faq)
    extra = ("," + schema_extra) if schema_extra else ""
    return f"""<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(titolo_seo)} | Thuis Italiaans</title>
<meta name="description" content="{html.escape(meta)}">
<link rel="canonical" href="{SITO}/{slug}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta property="og:type" content="website">
<meta property="og:url" content="{SITO}/{slug}">
<meta property="og:title" content="{html.escape(titolo_seo)}">
<meta property="og:description" content="{html.escape(meta)}">
<meta property="og:image" content="{SITO}/assets/icons/og-image.png">
<meta property="og:locale" content="nl_NL">
<meta property="og:site_name" content="Thuis Italiaans">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#31394d">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/supplemento.css">

<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITO}/" }},
        {{ "@type": "ListItem", "position": 2, "name": "{html.escape(h1)}" }}
      ]
    }},
    {faq_j}{extra}
  ]
}}
</script>
</head>
<body>

{HEADER}

<main class="pagina-servizio">

  <div class="container briciole">
    <a href="/">Home</a> › {html.escape(h1)}
  </div>

  <section class="hero-compatto">
    <div class="container">
      <span class="section-tag">{html.escape(tag)}</span>
      <h1>{html.escape(h1)}</h1>
      <p class="occhiello">{occhiello}</p>
      <a class="button" href="/#contact">Gratis kennismaking</a>
    </div>
  </section>

  <div class="contenuto">
    <div class="container-stretto">
{corpo}

{faq_html(voci_faq)}
    </div>
  </div>

</main>

<section class="cta-finale">
  <div class="container">
    <h2>{html.escape(cta_titolo)}</h2>
    <p>{html.escape(cta_testo)}</p>
    <a class="button" href="/#contact">Plan een gratis kennismaking</a>
    <p class="torna"><a href="/">Terug naar de homepage</a></p>
  </div>
</section>

{FOOTER}

{SCRIPT_MENU}
<script src="/js/ti-cta.js" defer></script>
</body>
</html>
"""


def pagina_citta(slug, d):
    comuni = "".join(f'<li>{html.escape(c)}</li>' for c in d["comuni"])
    afstand = f"<p>{html.escape(d['afstand'])}</p>" if d["afstand"] else ""

    corpo = f"""{d['aanbod_lokaal']}

{d['hoek']}
{BLOCCO_MATERIALE}
{BLOCCO_CHI}

      <h2>Waar ik lesgeef</h2>
      {afstand}
      <ul class="comuni">{comuni}</ul>
      <p>Woon je verder weg, of komt reizen slecht uit? Dan werkt
      <a href="/italiaans-online-leren">online les</a> net zo goed — en dat is
      geen tweede keus.</p>

      <h2>Voor wie</h2>
      <div class="lessons-grid">
        <a class="lesson-card" href="/italiaans-voor-beginners">
          <h3>Beginners</h3>
          <p>Vanaf nul, zonder voorkennis, in je eigen tempo.</p>
        </a>
        <a class="lesson-card" href="/italiaans-voor-gevorderden">
          <h3>Gevorderden</h3>
          <p>Verder dan B2, tot C1 en C2 — waar het reguliere aanbod ophoudt.</p>
        </a>
        <a class="lesson-card" href="/zakelijk-italiaans">
          <h3>Zakelijk Italiaans</h3>
          <p>Vergaderen, mailen en onderhandelen. Ook in-company.</p>
        </a>
        <a class="lesson-card" href="/italiaans-voor-kinderen">
          <h3>Kinderen</h3>
          <p>Spelenderwijs leren, of een tweetalige opvoeding ondersteunen.</p>
        </a>
      </div>"""

    schema = f"""    {{
      "@type": "Service",
      "name": "Privéles Italiaans in {d['nome']}",
      "serviceType": "Taalles Italiaans",
      "provider": {{ "@id": "{SITO}/#business" }},
      "areaServed": [{", ".join('{ "@type": "City", "name": "%s" }' % c for c in d["comuni"])}],
      "availableChannel": [
        {{ "@type": "ServiceChannel", "name": "Op locatie in {d['nome']} en omgeving" }},
        {{ "@type": "ServiceChannel", "name": "Online", "serviceUrl": "{SITO}/italiaans-online-leren" }}
      ],
      "offers": {{ "@type": "Offer", "url": "{SITO}/tarieven", "priceCurrency": "EUR", "price": "{{{{PRIJS_LOS_UUR}}}}" }}
    }}"""

    return guscio(
        slug=f"italiaanse-les-{slug}",
        titolo_seo=d["titolo_seo"],
        meta=d["meta"],
        h1=d["h1"],
        tag=d["tag"],
        occhiello=d["occhiello"],
        corpo=corpo,
        voci_faq=d["faq_extra"] + FAQ_BASE,
        schema_extra=schema,
        cta_titolo=f"Zullen we kennismaken?",
        cta_testo="Een half uur, vrijblijvend en gratis. We kijken waar je staat, "
                  "wat je wilt bereiken, en of ik daar de juiste persoon voor ben.",
    )


def pagina_intento(slug, d):
    corpo = f"""{d['corpo']}
{BLOCCO_MATERIALE}
{BLOCCO_CHI}

      <h2>Waar</h2>
      <p>Op locatie in <a href="/italiaanse-les-ede">Ede</a>,
      <a href="/italiaanse-les-amersfoort">Amersfoort</a>,
      <a href="/italiaanse-les-utrecht">Utrecht</a>,
      <a href="/italiaanse-les-arnhem">Arnhem</a> en omgeving, of
      <a href="/italiaans-online-leren">online</a> waar je ook bent.</p>"""

    schema = f"""    {{
      "@type": "Service",
      "name": "{d['nome']}",
      "serviceType": "Taalles Italiaans",
      "provider": {{ "@id": "{SITO}/#business" }},
      "areaServed": {{ "@type": "Country", "name": "Nederland" }},
      "offers": {{ "@type": "Offer", "url": "{SITO}/tarieven" }}
    }}"""

    return guscio(
        slug=slug,
        titolo_seo=d["titolo_seo"],
        meta=d["meta"],
        h1=d["h1"],
        tag=d["tag"],
        occhiello=d["occhiello"],
        corpo=corpo,
        voci_faq=d["faq_extra"] + FAQ_BASE,
        schema_extra=schema,
        cta_titolo="Kennismaken kost niets",
        cta_testo="Een half uur waarin we kijken waar je staat en wat je wilt "
                  "bereiken. Past het niet, dan zeg ik dat.",
    )


if __name__ == "__main__":
    out = pathlib.Path(".")
    n = 0
    for slug, d in CITTA.items():
        p = out / f"italiaanse-les-{slug}.html"
        p.write_text(pagina_citta(slug, d), encoding="utf-8")
        print(f"  {p.name}")
        n += 1
    for slug, d in INTENTO.items():
        p = out / f"{slug}.html"
        p.write_text(pagina_intento(slug, d), encoding="utf-8")
        print(f"  {p.name}")
        n += 1
    print(f"\n{n} pagine generate con le classi di style.css.")
