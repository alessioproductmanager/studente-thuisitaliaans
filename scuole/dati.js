// Database soggiorni linguistici — thuisitaliaans.com
// UNICA FONTE DI VERITÀ: genera_sito.py legge da qui e produce tutte le pagine.
const DATI = {
  "aggiornato_il": "2026-07-31",
  "nota": "Date, prezzi, email e parte degli accreditamenti sono SEGNAPOSTO finché stato_dati non passa a 'verificato'. Il badge ASILS è presente solo dove verificato sugli elenchi ufficiali. Usare verifica_scuole.py e COME_SI_AGGIORNA.txt.",
  "scuole": [
    {
      "id": "scuola-leonardo-da-vinci-firenze",
      "nome": "Scuola Leonardo da Vinci Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.leonardo-florence.com",
      "pagina_corsi": "https://www.leonardo-florence.com/it/corsi-di-italiano-a-firenze.html",
      "email": "info@leonardo-florence.com",
      "accreditamenti": [
        "ASILS",
        "AIL"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "AIL"
      ],
      "note": "Parte del network Scuola Leonardo da Vinci (Firenze, Milano, Roma, Torino). Corsi standard/intensivi e programmi culturali su arte, cucina, moda; sede d'esame DITALS. Corso online da €150/sett.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 80,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata",
      "corsi_speciali": [
        "Storia dell'arte",
        "Cucina",
        "Musica",
        "Moda e design",
        "Preparazione DITALS",
        "La Dolce Vita 50+"
      ],
      "prezzi_rilevati": {
        "aula_da": null,
        "online_da": 150,
        "iscrizione": 80,
        "iscrizione_mesi": 12,
        "fonte": "leonardo-florence.com",
        "rilevato_il": "2026-07-31"
      }
    },
    {
      "id": "abc-firenze",
      "nome": "ABC Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://abcschool.com",
      "pagina_corsi": "https://www.abcschool.com/it/corsi/gruppo",
      "email": "info@abcschool.com",
      "accreditamenti": [
        "ASILS",
        "AIL",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "AIL",
        "CILS"
      ],
      "note": "Scuola a Firenze (e Sestri Levante). Corso intensivo di gruppo da 30 lezioni/sett: grammatica, conversazione e pratica. Sede d'esame per certificazioni di italiano.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 70,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Intensivo 30 lezioni",
        "Individuali",
        "Preparazione CILS"
      ]
    },
    {
      "id": "centro-fiorenza",
      "nome": "Centro Fiorenza",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://centrofiorenza.com",
      "pagina_corsi": "",
      "email": "info@centrofiorenza.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "In via Santo Spirito (Oltrarno), con sede estiva all'Isola d'Elba. Classi max 12.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-michelangelo",
      "nome": "Istituto Michelangelo",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.michelangelo-edu.it",
      "pagina_corsi": "",
      "email": "info@michelangelo-edu.it",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Corsi intensivi di lingua più programmi di storia dell'arte (anche in inglese per principianti) con visite a musei e monumenti di Firenze. Corsi di cultura italiana abbinabili al pomeriggio.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Storia dell'arte",
        "Cultura italiana",
        "Cucina italiana",
        "Perfezionamento per insegnanti"
      ]
    },
    {
      "id": "europass-italian-language-school",
      "nome": "Europass Italian Language School",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.europassitalian.com",
      "pagina_corsi": "https://www.europassitalian.com/courses/live-courses",
      "email": "info@europassitalian.com",
      "accreditamenti": [
        "ASILS",
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "CELI",
        "DITALS"
      ],
      "note": "Scuola dinamica in centro a Firenze e online. Ampio programma di attività culturali; corsi standard e intensivi per tutti i livelli, lezioni da 45 minuti.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "online"
      ],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "centro-machiavelli",
      "nome": "Centro Machiavelli",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://centromachiavelli.it",
      "pagina_corsi": "https://centromachiavelli.it/it/iscrizione-altri-corsi",
      "email": "info@centromachiavelli.it",
      "accreditamenti": [
        "ASILS",
        "EDUITALIA",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 320
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Fondata nel 1978 in Oltrarno (San Niccolò), terrazza sull'Arno. Intensivo €320/sett, max 10 per classe. Famosa per i laboratori artigianali 'Firenze nell'Arte': oreficeria, mosaico fiorentino, restauro, calzature, rilegatura.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "dizione",
        "pittura",
        "storia dell'arte",
        "vino",
        "over50",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Super intensivo",
        "Giro d'Italia",
        "Italiano + storia dell'arte",
        "50+",
        "Firenze nell'Arte (oreficeria, mosaico, restauro, pittura)",
        "Experit (italiano + tirocinio)"
      ]
    },
    {
      "id": "linguaviva",
      "nome": "Linguaviva",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.linguaviva.it",
      "pagina_corsi": "",
      "email": "info@linguaviva.it",
      "accreditamenti": [
        "ASILS",
        "IALC",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Storica scuola fiorentina, parte del gruppo Linguaviva. Corsi intensivi, preparazione esami e programmi culturali; sede riconosciuta per Bildungsurlaub.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "moda",
        "online"
      ],
      "email_stato": "stimata"
    },
    {
      "id": "accademia-del-giglio",
      "nome": "Accademia del Giglio",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://adg.it",
      "pagina_corsi": "",
      "email": "info@adg.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "In centro a Firenze, unisce lingua e arte: corsi di disegno, pittura e storia dell'arte accanto all'italiano. Classi piccole.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "pittura",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Italiano + disegno e pittura",
        "Storia dell'arte",
        "Preparazione CILS/CELI"
      ]
    },
    {
      "id": "scuola-toscana",
      "nome": "Scuola Toscana",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.scuola-toscana.com",
      "pagina_corsi": "https://www.scuola-toscana.com/en/course-individual-private.php",
      "email": "info@scuola-toscana.com",
      "accreditamenti": [
        "ASILS",
        "AIL",
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 183
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "AIL"
      ],
      "note": "Dal 1989, in via de' Benci. Membro fondatore ASILS e AIL; inizio ogni lunedì tutto l'anno, classi max 8.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 8,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "online"
      ],
      "anteprima": true,
      "email_stato": "confermata"
    },
    {
      "id": "istituto-il-david",
      "nome": "Istituto Il David",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.davidschool.com",
      "pagina_corsi": "",
      "email": "info@davidschool.com",
      "accreditamenti": [
        "EDUITALIA",
        "LICET",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "pittura",
        "artigianato",
        "over50",
        "junior"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "parola-italian-language-school",
      "nome": "Parola Italian Language School",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.parola.it",
      "pagina_corsi": "https://www.parola.it/starting-dates-courses-2",
      "email": "info@parola.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 190
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "confermata"
    },
    {
      "id": "istituto-lorenzo-de-medici-firenze",
      "nome": "Istituto Lorenzo de' Medici Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.lorenzodemedici.it",
      "pagina_corsi": "",
      "email": "info@lorenzodemedici.it",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Istituto internazionale (LdM) dal 1973, in via Faenza. Sede principale del gruppo; programmi con crediti USA.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "storia dell'arte",
        "cucina",
        "moda",
        "pittura"
      ],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "centro-lingua-italiana-calvino",
      "nome": "Centro Lingua Italiana Calvino",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.clicschool.it",
      "pagina_corsi": "",
      "email": "info@clicschool.it",
      "accreditamenti": [
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "CLIC, viale Fratelli Rosselli. Preparazione e sede d'esame CILS; corsi 2/4/6 ore al giorno.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte"
      ],
      "email_stato": "stimata"
    },
    {
      "id": "istituto-galilei",
      "nome": "Istituto Galilei",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.galilei.it",
      "pagina_corsi": "",
      "email": "info@galilei.it",
      "accreditamenti": [
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "A 5 min dal Duomo. Specializzata in corsi individuali e piccoli gruppi (max 4), lezioni da 60 min.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 60,
        "max_studenti_classe": 4,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "pittura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "sprachcaffe-firenze",
      "nome": "Sprachcaffe Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.sprachcaffe.com",
      "pagina_corsi": "",
      "email": "info@sprachcaffe.com",
      "accreditamenti": [
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Parte della catena internazionale Sprachcaffe; corsi tutto l'anno con inizio ogni lunedì.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "cucina",
        "arte",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-europeo",
      "nome": "Istituto Europeo",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.istitutoeuropeo.org",
      "pagina_corsi": "",
      "email": "info@istitutoeuropeo.org",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Corsi di lingua abbinati a musica/canto lirico, belle arti, cucina e vino; programmi di internship.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "musica",
        "cucina",
        "vino",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "centro-ponte-vecchio",
      "nome": "Centro Ponte Vecchio",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": []
    },
    {
      "id": "accademia-europea-di-firenze",
      "nome": "Accademia Europea di Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://aefirenze.it",
      "pagina_corsi": "",
      "email": "info@aefirenze.it",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 240
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "A Palazzo Niccolini (via Cavour). Corso di gruppo €240/sett, max 14, tassa €80, lezioni 45 min. Attività culturali settimanali: opera, degustazioni, concerti di fine corso. Date fisse mensili 2026.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 80,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "musica",
        "cultura",
        "online"
      ],
      "anteprima": false,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Italiano Plus Arte",
        "Italiano Plus Cultura",
        "Italiano Plus Musica",
        "Preparazione CILS",
        "Voice & Opera",
        "Disegno e Pittura"
      ]
    },
    {
      "id": "centro-koine-firenze",
      "nome": "Centro Koinè Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.koinecenter.com",
      "pagina_corsi": "",
      "email": "info@koinecenter.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "accademia-riaci",
      "nome": "Accademia Riaci",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.accademiariaci.info",
      "pagina_corsi": "",
      "email": "info@accademiariaci.info",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Scuola d'arte e design dal 1983 nel centro storico. Lingua abbinata a oreficeria, scultura, pittura, artigianato; lezioni molto personalizzate.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "pittura",
        "artigianato",
        "moda",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "dilit-international-house",
      "nome": "Dilit International House",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.dilit.it",
      "pagina_corsi": "https://www.dilit.it/en/dates-and-fees.html",
      "email": "info@dilit.it",
      "accreditamenti": [
        "ASILS",
        "IALC",
        "EDUITALIA",
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 230
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-17",
          "2026-09-21",
          "2026-10-19",
          "2026-11-16",
          "2026-12-07"
        ],
        "principianti": "date fisse mensili per principianti assoluti; chi parla già italiano inizia ogni lunedì"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "CELI",
        "DITALS"
      ],
      "note": "Fondata nel 1974, villino Liberty a due passi da Termini. Membro International House, EAQUALS, IALC. Classi 5–14 studenti.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "servizio_alloggio": "gratuito",
        "wifi": true,
        "tassa_iscrizione": 85
      },
      "extra": [
        "arte",
        "storia dell'arte",
        "cucina",
        "online",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "prezzi_rilevati": {
        "aula_da": null,
        "online_da": null,
        "iscrizione": 85,
        "iscrizione_mesi": 12,
        "fonte": "dilit.it",
        "rilevato_il": "2026-07-31"
      }
    },
    {
      "id": "torre-di-babele",
      "nome": "Torre di Babele",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.torredibabele.com",
      "pagina_corsi": "",
      "email": "info@torredibabele.com",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "DITALS"
      ],
      "note": "Dal 1984 in una villa liberty vicino a La Sapienza. Max 12 per classe (media 8). Sede d'esame DITALS. Ricchi corsi tematici: cucina, fotografia, moda, pittura, gioielleria, canto.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "fotografia",
        "moda",
        "musica",
        "over50",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Intensive Plus",
        "Super Intensive",
        "50+",
        "Experit (italiano + tirocinio)",
        "Italian on tour",
        "Preparazione esami"
      ]
    },
    {
      "id": "scuola-leonardo-da-vinci-roma",
      "nome": "Scuola Leonardo da Vinci Roma",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.scuolaleonardo.com",
      "pagina_corsi": "",
      "email": "info@scuolaleonardo.com",
      "accreditamenti": [
        "ASILS",
        "AIL",
        "EDUITALIA",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 175
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-03",
          "2026-08-17",
          "2026-08-31",
          "2026-09-14",
          "2026-09-28",
          "2026-10-12",
          "2026-10-26",
          "2026-11-09",
          "2026-11-23",
          "2026-12-07"
        ],
        "principianti": "date fisse ogni 2 settimane; chi parla già italiano inizia ogni lunedì"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "AIL"
      ],
      "note": "Corsi di gruppo con inizio ogni lunedì (principianti assoluti in date fisse, ogni 2 settimane). Verificato a mano sul sito ufficiale il 31/07/2026: il sito ha una protezione anti-bot e lo script non può leggerlo.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 80,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "email_stato": "stimata",
      "prezzi_rilevati": {
        "aula_da": 175,
        "online_da": null,
        "iscrizione": 80,
        "iscrizione_mesi": 12,
        "fonte": "leonardo-rome.com",
        "rilevato_il": "2026-07-31"
      }
    },
    {
      "id": "studioitalia",
      "nome": "Studioitalia",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://accademiastudioitalia.com",
      "pagina_corsi": "https://accademiastudioitalia.com/beginner-intensive-italian-course-calendar-2025-2026",
      "email": "info@accademiastudioitalia.com",
      "accreditamenti": [
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-03",
          "2026-09-07",
          "2026-10-05",
          "2026-11-02",
          "2026-12-07"
        ],
        "principianti": "date fisse mensili; chi parla già italiano inizia ogni lunedì"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Dal 1985, vicino Piazza del Popolo (Ottaviano/Lepanto). Partner Cambridge, metodologia DITALS.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "online",
        "cucina",
        "arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "kappa-language-school",
      "nome": "Kappa Language School",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.kappalanguageschool.com",
      "pagina_corsi": "",
      "email": "info@kappalanguageschool.com",
      "accreditamenti": [
        "LICET"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 200
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI",
        "PLIDA"
      ],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 60,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 30,
        "servizio_alloggio": "a pagamento",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "scudit-scuola-d-italiano",
      "nome": "Scudit Scuola d'Italiano",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.scudit.net",
      "pagina_corsi": "https://www.scudit.net/tipidicorso.htm",
      "email": "scudit@scudit.net",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 210
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-10",
          "2026-08-24",
          "2026-09-07",
          "2026-09-21",
          "2026-10-05",
          "2026-10-19",
          "2026-11-02",
          "2026-11-16",
          "2026-11-30",
          "2026-12-14"
        ],
        "principianti": "date fisse ogni 2 settimane (principianti assoluti in date dedicate)"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Fondata da Roberto Tartaglione, autore di manuali d'italiano. Intensivo €210/sett (20 ore, 45 min), classi di solito 5-9 (max 12). Tassa €50. Membro LICET. Attività culturale gratuita ogni settimana.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte",
        "musica"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "tassa_iscrizione": 50,
      "corsi_speciali": [
        "Mille e una Roma",
        "Un viaggio chiamato cinema",
        "Due settimane a Roma",
        "Superintensivo 30/35/40",
        "Full immersion"
      ]
    },
    {
      "id": "ciao-italia",
      "nome": "Ciao Italia",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.ciao-italia.it",
      "pagina_corsi": "",
      "email": "info@ciao-italia.it",
      "accreditamenti": [
        "EDUITALIA",
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 140
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI",
        "PLIDA"
      ],
      "note": "Nel quartiere Monti, a due passi dal Colosseo. Standard da €140/sett (2 sett €260), max 12. Membro EDUITALIA, sede d'esame CELI/PLIDA, riconosciuta Bildungsurlaub. Corsi di arte, cucina e pittura.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 50,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 45,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "pittura",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Business",
        "Arte",
        "Cucina",
        "Pittura",
        "Preparazione CELI/PLIDA"
      ]
    },
    {
      "id": "italiaidea",
      "nome": "Italiaidea",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.italiaidea.com",
      "pagina_corsi": "",
      "email": "info@italiaidea.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "PLIDA"
      ],
      "note": "In centro a Roma, classi piccole (max 8). Specializzata in italiano per il lavoro e commerciale, oltre ai corsi standard.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 8,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "a pagamento",
        "wifi": true
      },
      "extra": [
        "online",
        "letteratura",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Italiano per il lavoro",
        "Italiano commerciale",
        "Preparazione CILS/CELI"
      ]
    },
    {
      "id": "scuola-d-italiano-dante-alighieri-roma",
      "nome": "Scuola d'Italiano Dante Alighieri Roma",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://clidante.it",
      "pagina_corsi": "",
      "email": "info@clidante.it",
      "accreditamenti": [
        "ASILS",
        "EDUITALIA",
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "Dal 1994 in Piazza Bologna. Corsi di gruppo con inizio ogni lunedì, versioni standard o combinate, anche serali. Programma Opera unico: lingua italiana e canto lirico. Membro ASILS.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "storia dell'arte",
        "musica",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Lingua e cultura",
        "Programma Opera (lingua e canto)",
        "Corsi serali",
        "Programmi per università USA",
        "Combinati"
      ]
    },
    {
      "id": "istituto-lorenzo-de-medici-roma",
      "nome": "Istituto Lorenzo de' Medici Roma",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.lorenzodemedici.it",
      "pagina_corsi": "",
      "email": "info@lorenzodemedici.it",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Istituto internazionale (LdM) dal 1973; programmi universitari con crediti USA. Sedi a Firenze, Roma e Tuscania.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "storia dell'arte",
        "cucina",
        "moda",
        "pittura"
      ],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-italiano",
      "nome": "Istituto Italiano",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.istitutoitaliano.it",
      "pagina_corsi": "",
      "email": "info@istitutoitaliano.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "In via Calimala, palazzo storico tra il Duomo e Ponte Vecchio (sede fiorentina del gruppo).",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte"
      ],
      "email_stato": "stimata"
    },
    {
      "id": "scuola-leonardo-da-vinci-milano",
      "nome": "Scuola Leonardo da Vinci Milano",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.leonardo-milan.com",
      "pagina_corsi": "https://www.leonardo-milan.com/dates-courses-in-milan.html",
      "email": "info@scuolaleonardo.com",
      "accreditamenti": [
        "ASILS",
        "AIL",
        "EDUITALIA",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "AIL",
        "DITALS"
      ],
      "note": "Corsi di gruppo con inizio ogni lunedì (principianti assoluti in date fisse, ogni 2 settimane). Verificato a mano sul sito ufficiale il 31/07/2026: il sito ha una protezione anti-bot e lo script non può leggerlo.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 70,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "moda",
        "pittura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "email_stato": "stimata"
    },
    {
      "id": "linguadue",
      "nome": "Linguadue",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.linguaviva.it",
      "pagina_corsi": "",
      "email": "info@linguaviva.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Gruppo Linguaviva",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "il-centro",
      "nome": "Il Centro",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://ilcentro.net",
      "pagina_corsi": "",
      "email": "info@ilcentro.net",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 300
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "CELI",
        "PLIDA"
      ],
      "note": "Dal 1986 in via Ponte Vetero, a due passi dal Duomo. Lezioni da 60 minuti; preparazione esami CILS, CELI, PLIDA.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 60,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "servizio_alloggio": "gratuito",
        "wifi": true,
        "tassa_iscrizione": 0
      },
      "extra": [
        "cucina",
        "arte",
        "storia dell'arte",
        "online"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "ellci-milano",
      "nome": "ELLCI Milano",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.ellci.it",
      "pagina_corsi": "",
      "email": "info@ellci.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI"
      ],
      "note": "In centro a Milano, piccoli gruppi (5-12). Standard 20 lezioni/sett, corsi mattina/pomeriggio/sera. Centro d'esame CELI, accreditata Regione Lombardia, Bildungsurlaub, EduItalia.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "cultura-italiana-bologna",
      "nome": "Cultura Italiana Bologna",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.culturaitaliana.eu",
      "pagina_corsi": "https://www.culturaitaliana.eu/it/informazioni/prezzi-e-date-di-inizio/",
      "email": "info@culturaitaliana.it",
      "accreditamenti": [
        "ASILS",
        "Bildungsurlaub",
        "CSN",
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 25,
          "prezzo_da_settimana": 394
        },
        {
          "tipo": "leggero",
          "ore_settimana": 15
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "Dal 1980 in via Castiglione. Iscrizione gratuita, sede d'esame CILS; classi 6–12, prezzi tutto compreso.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 50,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "cucina",
        "dizione",
        "online",
        "letteratura",
        "moda",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "madrelingua",
      "nome": "Madrelingua",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://madrelinguaitaliano.com",
      "pagina_corsi": "",
      "email": "info@madrelinguaitaliano.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 300
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Nel centro storico di Bologna (via Altabella). Standard 20h €300/sett, intensivo 30h €450. Membro ASILS, certificata UNI 11863:2022. Sconto 15% sui corsi di gruppo.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Intensivo 30 ore",
        "Corsi serali",
        "Lezioni individuali",
        "Online"
      ]
    },
    {
      "id": "alce-accademia-lingue-e-culture-europee",
      "nome": "ALCE Accademia Lingue e Culture Europee",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.alce.it",
      "pagina_corsi": "",
      "email": "info@alce.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-venezia",
      "nome": "Istituto Venezia",
      "citta": "Venezia",
      "regione": "Veneto",
      "sito": "https://www.istitutovenezia.com",
      "pagina_corsi": "https://www.istitutovenezia.com/italian-language-courses-dates.html",
      "email": "info@istitutovenezia.com",
      "accreditamenti": [
        "ASILS",
        "Bildungsurlaub",
        "EDUITALIA",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 350
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "CELI",
        "PLIDA"
      ],
      "note": "Dal 1995 in Campo Santa Margherita, cuore universitario di Venezia. Coordina i corsi della Venice International University; sede esami CILS/CELI/PLIDA.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "easy-italian-language-art",
      "nome": "Easy Italian Language & Art",
      "citta": "Venezia",
      "regione": "Veneto",
      "sito": "https://easyitalianlanguage.com",
      "pagina_corsi": "",
      "email": "info@easyitalianlanguage.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 15,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 5,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte"
      ],
      "email_stato": "stimata"
    },
    {
      "id": "ca-foscari-school-for-international-education",
      "nome": "Ca' Foscari School for International Education",
      "citta": "Venezia",
      "regione": "Veneto",
      "sito": "https://www.unive.it",
      "pagina_corsi": "",
      "email": "info@unive.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Corsi di italiano dell'Università Ca' Foscari",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "idea-verona",
      "nome": "Idea Verona",
      "citta": "Verona",
      "regione": "Veneto",
      "sito": "https://www.ideaverona.com",
      "pagina_corsi": "https://www.ideaverona.com/it/home/iscrizione",
      "email": "info@ideaverona.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "lingua-it",
      "nome": "Lingua IT",
      "citta": "Verona",
      "regione": "Veneto",
      "sito": "https://www.linguait.it",
      "pagina_corsi": "",
      "email": "info@linguait.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "l-italiano-con-noi",
      "nome": "L'Italiano con Noi",
      "citta": "Verona",
      "regione": "Veneto",
      "sito": "https://litalianoconnoi.com",
      "pagina_corsi": "",
      "email": "info@litalianoconnoi.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "bertrand-russell",
      "nome": "Bertrand Russell",
      "citta": "Padova",
      "regione": "Veneto",
      "sito": "https://www.bertrand-russell.it",
      "pagina_corsi": "https://www.bertrand-russell.it/scheda-di-iscrizione-corsi-di-italiano",
      "email": "info@bertrand-russell.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "piccola-universita-italiana-trieste",
      "nome": "Piccola Università Italiana Trieste",
      "citta": "Trieste",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.piccolauniversitaitaliana.com",
      "pagina_corsi": "https://piccolauniversitaitaliana.com/italian-language-courses/italian-course-to-enrol-at-italian-universities",
      "email": "info@piccolauniversitaitaliana.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-venezia-trieste",
      "nome": "Istituto Venezia Trieste",
      "citta": "Trieste",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.istitutovenezia.com",
      "pagina_corsi": "https://www.istitutovenezia.com/italian-language-courses-dates.html",
      "email": "info@istitutovenezia.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "linguaviva-lignano",
      "nome": "Linguaviva Lignano",
      "citta": "Lignano Sabbiadoro",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.linguaviva.it",
      "pagina_corsi": "",
      "email": "info@linguaviva.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Centro estivo per ragazzi e adulti",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "alpha-beta-piccadilly-bolzano",
      "nome": "Alpha Beta Piccadilly Bolzano",
      "citta": "Bolzano",
      "regione": "Alto Adige",
      "sito": "https://www.alphabeta.it",
      "pagina_corsi": "",
      "email": "info@alphabeta.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "alpha-beta-piccadilly-merano",
      "nome": "Alpha Beta Piccadilly Merano",
      "citta": "Merano",
      "regione": "Alto Adige",
      "sito": "https://www.alphabeta.it",
      "pagina_corsi": "",
      "email": "info@alphabeta.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "clm-bell-trento",
      "nome": "CLM Bell Trento",
      "citta": "Trento",
      "regione": "Trentino",
      "sito": "https://www.clm-bell.it",
      "pagina_corsi": "",
      "email": "info@clm-bell.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "clm-bell-riva-del-garda",
      "nome": "CLM Bell Riva del Garda",
      "citta": "Riva del Garda",
      "regione": "Trentino",
      "sito": "https://www.clm-bell.it",
      "pagina_corsi": "",
      "email": "info@clm-bell.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "l-italiano-porticando",
      "nome": "L'Italiano Porticando",
      "citta": "Torino",
      "regione": "Piemonte",
      "sito": "https://www.italianoporticando.com",
      "pagina_corsi": "",
      "email": "info@italianoporticando.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "ciaoitaly-scuola-leonardo-da-vinci-torino",
      "nome": "CiaoItaly Scuola Leonardo da Vinci Torino",
      "citta": "Torino",
      "regione": "Piemonte",
      "sito": "https://www.scuolaleonardo.com",
      "pagina_corsi": "",
      "email": "info@scuolaleonardo.com",
      "accreditamenti": [
        "ASILS",
        "AIL"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "AIL"
      ],
      "note": "Corsi di gruppo con inizio ogni lunedì (principianti assoluti in date fisse, ogni 2 settimane). Verificato a mano sul sito ufficiale il 31/07/2026: il sito ha una protezione anti-bot e lo script non può leggerlo.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "a-door-to-italy",
      "nome": "A Door to Italy",
      "citta": "Genova",
      "regione": "Liguria",
      "sito": "https://www.adoortoitaly.com",
      "pagina_corsi": "",
      "email": "info@adoortoitaly.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "scuola-tricolore",
      "nome": "Scuola Tricolore",
      "citta": "Genova",
      "regione": "Liguria",
      "sito": "https://www.scuolatricolore.it",
      "pagina_corsi": "",
      "email": "info@scuolatricolore.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "abc-school-sestri-levante",
      "nome": "ABC School Sestri Levante",
      "citta": "Sestri Levante",
      "regione": "Liguria",
      "sito": "https://www.abcschool.com",
      "pagina_corsi": "https://www.abcschool.com/it/corsi/gruppo",
      "email": "info@abcschool.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "omnilingua",
      "nome": "Omnilingua",
      "citta": "Sanremo",
      "regione": "Liguria",
      "sito": "https://www.omnilingua.net",
      "pagina_corsi": "https://www.omnilingua.net/courses/italian/prices",
      "email": "info@omnilingua.net",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "romanica",
      "nome": "Romanica",
      "citta": "Modena",
      "regione": "Emilia-Romagna",
      "sito": "https://www.romanica.it",
      "pagina_corsi": "",
      "email": "scuola@romanica.it",
      "accreditamenti": [
        "ASILS",
        "AIL"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "CELI"
      ],
      "note": "Corsi in presenza e online",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "confermata"
    },
    {
      "id": "reggio-lingua",
      "nome": "Reggio Lingua",
      "citta": "Reggio Emilia",
      "regione": "Emilia-Romagna",
      "sito": "https://www.reggiolingua.it",
      "pagina_corsi": "",
      "email": "info@reggiolingua.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "scuola-palazzo-malvisi-ravenna",
      "nome": "Scuola Palazzo Malvisi Ravenna",
      "citta": "Ravenna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.scuolapalazzomalvisi.com",
      "pagina_corsi": "",
      "email": "info@scuolapalazzomalvisi.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "scuola-palazzo-malvisi-bagno-di-romagna",
      "nome": "Scuola Palazzo Malvisi Bagno di Romagna",
      "citta": "Bagno di Romagna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.scuolapalazzomalvisi.com",
      "pagina_corsi": "",
      "email": "info@scuolapalazzomalvisi.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Lingua e benessere termale",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "tiberius-international",
      "nome": "Tiberius International",
      "citta": "Rimini",
      "regione": "Emilia-Romagna",
      "sito": "https://www.tiberius-international.com",
      "pagina_corsi": "https://www.tiberius-international.com/italian-courses-in-rimini",
      "email": "info@tiberius-international.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "societa-dante-alighieri-siena",
      "nome": "Società Dante Alighieri Siena",
      "citta": "Siena",
      "regione": "Toscana",
      "sito": "https://www.dantealighieri.com",
      "pagina_corsi": "",
      "email": "info@dantealighieri.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "saena-iulii",
      "nome": "Saena Iulia",
      "citta": "Siena",
      "regione": "Toscana",
      "sito": "https://www.saenaiulia.it",
      "pagina_corsi": "",
      "email": "",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": []
    },
    {
      "id": "universita-per-stranieri-di-siena",
      "nome": "Università per Stranieri di Siena",
      "citta": "Siena",
      "regione": "Toscana",
      "sito": "https://www.unistrasi.it",
      "pagina_corsi": "",
      "email": "info@unistrasi.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Corsi di lingua dell'ateneo, sede degli esami CILS",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "cultura-italiana-arezzo",
      "nome": "Cultura Italiana Arezzo",
      "citta": "Arezzo",
      "regione": "Toscana",
      "sito": "https://www.culturaitalianaarezzo.it",
      "pagina_corsi": "",
      "email": "info@culturaitalianaarezzo.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "lucca-italian-school",
      "nome": "Lucca Italian School",
      "citta": "Lucca",
      "regione": "Toscana",
      "sito": "https://www.luccaitalianschool.com",
      "pagina_corsi": "",
      "email": "info@luccaitalianschool.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "centro-koine-lucca",
      "nome": "Centro Koinè Lucca",
      "citta": "Lucca",
      "regione": "Toscana",
      "sito": "https://www.koinecenter.com",
      "pagina_corsi": "",
      "email": "info@koinecenter.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-linguistico-mediterraneo",
      "nome": "Istituto Linguistico Mediterraneo",
      "citta": "Pisa",
      "regione": "Toscana",
      "sito": "https://www.ilm.it",
      "pagina_corsi": "",
      "email": "info@ilm.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "centro-culturale-giacomo-puccini",
      "nome": "Centro Culturale Giacomo Puccini",
      "citta": "Viareggio",
      "regione": "Toscana",
      "sito": "https://www.centropuccini.it",
      "pagina_corsi": "https://www.centropuccini.it/italian-language-courses-dates-in-viareggio.html",
      "email": "info@centropuccini.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "scuola-leonardo-da-vinci-viareggio",
      "nome": "Scuola Leonardo da Vinci Viareggio",
      "citta": "Viareggio",
      "regione": "Toscana",
      "sito": "https://www.scuolaleonardo.com",
      "pagina_corsi": "",
      "email": "info@scuolaleonardo.com",
      "accreditamenti": [
        "AIL"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "AIL"
      ],
      "note": "Corsi di gruppo con inizio ogni lunedì (principianti assoluti in date fisse, ogni 2 settimane). Verificato a mano sul sito ufficiale il 31/07/2026: il sito ha una protezione anti-bot e lo script non può leggerlo.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 14,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "il-sasso",
      "nome": "Il Sasso",
      "citta": "Montepulciano",
      "regione": "Toscana",
      "sito": "https://www.ilsasso.com",
      "pagina_corsi": "https://www.ilsasso.com/date-dei-corsi/",
      "email": "info@ilsasso.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-07-27",
          "2026-08-10",
          "2026-08-24",
          "2026-09-07",
          "2026-09-21",
          "2026-10-05",
          "2026-10-19",
          "2026-11-02",
          "2026-11-16",
          "2026-11-30"
        ],
        "principianti": "date fisse ogni 2 settimane; chi parla già italiano inizia ogni lunedì"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Chiusa per vacanze dal 12 dicembre 2026 al 7 febbraio 2027. Corsi speciali 'Avventure Italiane': Italiano camminando, Italiano & Arte, Il mondo etrusco (ottobre–novembre 2026).",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "vino",
        "storia dell'arte",
        "letteratura"
      ],
      "anteprima": true,
      "email_stato": "confermata"
    },
    {
      "id": "terramare",
      "nome": "Terramare",
      "citta": "Orbetello",
      "regione": "Toscana",
      "sito": "https://www.terramare.it",
      "pagina_corsi": "",
      "email": "info@terramare.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "centro-fiorenza-isola-d-elba",
      "nome": "Centro Fiorenza Isola d'Elba",
      "citta": "Isola d'Elba",
      "regione": "Toscana",
      "sito": "https://centrofiorenza.com",
      "pagina_corsi": "",
      "email": "info@centrofiorenza.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Sede estiva sull'isola",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "il-sillabo",
      "nome": "Il Sillabo",
      "citta": "San Giovanni Valdarno",
      "regione": "Toscana",
      "sito": "https://www.sillabo.it",
      "pagina_corsi": "",
      "email": "info@sillabo.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "comitato-linguistico",
      "nome": "Comitato Linguistico",
      "citta": "Perugia",
      "regione": "Umbria",
      "sito": "https://www.comitatolinguistico.com",
      "pagina_corsi": "",
      "email": "info@comitatolinguistico.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 270
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Dal 1986 nel centro storico di Perugia, aule panoramiche. Corso intensivo €270/sett, standard €180/sett; membro ASILS.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "universita-per-stranieri-di-perugia",
      "nome": "Università per Stranieri di Perugia",
      "citta": "Perugia",
      "regione": "Umbria",
      "sito": "https://www.unistrapg.it",
      "pagina_corsi": "",
      "email": "info@unistrapg.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "L'ateneo storico per stranieri, sede degli esami CELI",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "accademia-lingua-italiana-assisi",
      "nome": "Accademia Lingua Italiana Assisi",
      "citta": "Assisi",
      "regione": "Umbria",
      "sito": "https://aliassisi.it",
      "pagina_corsi": "",
      "email": "info@aliassisi.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-24",
          "2026-09-14",
          "2026-10-12",
          "2026-11-02",
          "2026-11-30"
        ],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS",
        "PLIDA"
      ],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 50,
        "max_studenti_classe": 15,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "confermata"
    },
    {
      "id": "lingua-si",
      "nome": "Lingua Sì",
      "citta": "Orvieto",
      "regione": "Umbria",
      "sito": "https://www.linguasi.it",
      "pagina_corsi": "",
      "email": "info@linguasi.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "la-lingua-la-vita",
      "nome": "La Lingua La Vita",
      "citta": "Todi",
      "regione": "Umbria",
      "sito": "https://www.lalingualavita.com",
      "pagina_corsi": "",
      "email": "info@lalingualavita.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "centro-studi-italiani",
      "nome": "Centro Studi Italiani",
      "citta": "Urbania",
      "regione": "Marche",
      "sito": "https://www.centrostudiitaliani.org",
      "pagina_corsi": "",
      "email": "info@centrostudiitaliani.org",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "scuola-dante-alighieri-campus-l-infinito",
      "nome": "Scuola Dante Alighieri Campus L'Infinito",
      "citta": "Recanati",
      "regione": "Marche",
      "sito": "https://www.scuoladantealighieri.org",
      "pagina_corsi": "",
      "email": "info@scuoladantealighieri.org",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Nella città di Leopardi",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "istituto-lorenzo-de-medici-tuscania",
      "nome": "Istituto Lorenzo de' Medici Tuscania",
      "citta": "Tuscania",
      "regione": "Lazio",
      "sito": "https://www.lorenzodemedici.it",
      "pagina_corsi": "",
      "email": "info@lorenzodemedici.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "centro-italiano",
      "nome": "Centro Italiano",
      "citta": "Napoli",
      "regione": "Campania",
      "sito": "https://www.centroitaliano.it",
      "pagina_corsi": "",
      "email": "info@centroitaliano.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 230
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Dal 1982 nel centro storico di Napoli, vicino all'università e a Via Toledo. Intensivo €230/sett, classi max 12. Corsi speciali su cucina napoletana, vini campani e canto lirico.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata",
      "corsi_speciali": [
        "Italiano + cucina napoletana",
        "Degustazione vini campani",
        "Italiano + canto lirico",
        "50+",
        "Immersione nei borghi della Campania"
      ]
    },
    {
      "id": "sant-anna-institute",
      "nome": "Sant'Anna Institute",
      "citta": "Sorrento",
      "regione": "Campania",
      "sito": "https://www.sorrentolingue.com",
      "pagina_corsi": "",
      "email": "info@sorrentolingue.com",
      "accreditamenti": [
        "EDUITALIA"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI"
      ],
      "note": "Struttura storica sulla Marina Grande, di fronte al Vesuvio. Programmi universitari con crediti USA; centro esami CELI e Cambridge.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "cucina",
        "arte",
        "storia dell'arte"
      ],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "accademia-italiana-salerno",
      "nome": "Accademia Italiana Salerno",
      "citta": "Salerno",
      "regione": "Campania",
      "sito": "https://www.accademia-italiana.it",
      "pagina_corsi": "https://accademia-italiana.it/language-courses-it/date-e-prezzi-2026",
      "email": "info@accademia-italiana.it",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "accademia-leonardo",
      "nome": "Accademia Leonardo",
      "citta": "Salerno",
      "regione": "Campania",
      "sito": "https://www.accademialeonardo.it",
      "pagina_corsi": "https://www.accademialeonardo.it/it/studiare-l-italiano/date-inizio-corsi.html",
      "email": "info@accademialeonardo.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "piccola-universita-italiana-tropea",
      "nome": "Piccola Università Italiana Tropea",
      "citta": "Tropea",
      "regione": "Calabria",
      "sito": "https://www.piccolauniversitaitaliana.com",
      "pagina_corsi": "https://piccolauniversitaitaliana.com/italian-language-courses/italian-course-to-enrol-at-italian-universities",
      "email": "info@piccolauniversitaitaliana.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "caffe-italiano-club",
      "nome": "Caffè Italiano Club",
      "citta": "Tropea",
      "regione": "Calabria",
      "sito": "https://www.caffeitalianoclub.net",
      "pagina_corsi": "",
      "email": "info@caffeitalianoclub.net",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "universita-per-stranieri-dante-alighieri",
      "nome": "Università per Stranieri Dante Alighieri",
      "citta": "Reggio Calabria",
      "regione": "Calabria",
      "sito": "https://www.unistrada.it",
      "pagina_corsi": "",
      "email": "info@unistrada.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Ateneo per stranieri della Calabria",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "porta-d-oriente",
      "nome": "Porta d'Oriente",
      "citta": "Otranto",
      "regione": "Puglia",
      "sito": "https://www.porta-doriente.com",
      "pagina_corsi": "",
      "email": "info@porta-doriente.com",
      "accreditamenti": [
        "Bildungsurlaub"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI"
      ],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 50,
        "max_studenti_classe": 8,
        "materiale": "inclusi",
        "test_ingresso": "in sede",
        "tassa_iscrizione": 70,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "vino",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "confermata"
    },
    {
      "id": "babilonia-centro-di-lingua-e-cultura-italiana",
      "nome": "Babilonia Centro di Lingua e Cultura Italiana",
      "citta": "Taormina",
      "regione": "Sicilia",
      "sito": "https://www.babilonia.it",
      "pagina_corsi": "",
      "email": "info@babilonia.it",
      "accreditamenti": [
        "ASILS",
        "EDUITALIA",
        "Bildungsurlaub",
        "CSN"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI"
      ],
      "note": "A Taormina, tra mare e monti. Iscrizione gratuita, insegnanti con DILS II (Università per Stranieri di Perugia); corsi di cucina, ceramica e vino siciliani.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "pittura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "anteprima": true,
      "email_stato": "confermata"
    },
    {
      "id": "laboling",
      "nome": "Laboling",
      "citta": "Milazzo",
      "regione": "Sicilia",
      "sito": "https://www.laboling.com",
      "pagina_corsi": "https://www.laboling.com/it/dates-and-prices",
      "email": "info@laboling.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": 280
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CILS"
      ],
      "note": "A Milazzo, base per le Isole Eolie. Da €280/sett. Corsi speciali: italiano + vela e trekking, corso alle Eolie, 50+, preparazione CILS. Sede d'esame CILS.",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "cucina",
        "online",
        "over50",
        "vela",
        "trekking"
      ],
      "anteprima": true,
      "email_stato": "stimata",
      "corsi_speciali": [
        "Intensivo Plus",
        "Campus",
        "50+ Senior",
        "Preparazione CILS",
        "Italiano + vela e trekking",
        "Corso alle Isole Eolie"
      ]
    },
    {
      "id": "solemar-academy",
      "nome": "Solemar Academy",
      "citta": "Cefalù",
      "regione": "Sicilia",
      "sito": "https://solemar-academy.com",
      "pagina_corsi": "https://solemar-academy.com/en/italian-courses/",
      "email": "cefalu@solemar-academy.com",
      "accreditamenti": [
        "ASILS"
      ],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [
        "CELI"
      ],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "confermata"
    },
    {
      "id": "solemar-sicilia",
      "nome": "Solemar Sicilia",
      "citta": "Palermo (Mondello)",
      "regione": "Sicilia",
      "sito": "https://www.solemarsicilia.it",
      "pagina_corsi": "",
      "email": "info@solemarsicilia.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "email_stato": "stimata"
    },
    {
      "id": "itastra-universita-di-palermo",
      "nome": "Itastra Università di Palermo",
      "citta": "Palermo",
      "regione": "Sicilia",
      "sito": "https://www.unipa.it",
      "pagina_corsi": "",
      "email": "info@unipa.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Scuola di italiano per stranieri dell'Università di Palermo",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": false,
      "email_stato": "stimata"
    },
    {
      "id": "scuola-virgilio",
      "nome": "Scuola Virgilio",
      "citta": "Trapani",
      "regione": "Sicilia",
      "sito": "https://www.scuolavirgilio.it",
      "pagina_corsi": "",
      "email": "info@scuolavirgilio.it",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "pintadera-centro-mediterraneo",
      "nome": "Pintadera Centro Mediterraneo",
      "citta": "Alghero",
      "regione": "Sardegna",
      "sito": "https://www.pintadera.info",
      "pagina_corsi": "https://pintadera.info/courses/italian-language/lingua-standard-group-course",
      "email": "info@pintadera.info",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "",
      "verificato_il": "2026-07-31",
      "stato_dati": "verificato",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "one-world-italiano",
      "nome": "One World Italiano",
      "citta": "Cagliari",
      "regione": "Sardegna",
      "sito": "https://www.oneworlditaliano.com",
      "pagina_corsi": "",
      "email": "info@oneworlditaliano.com",
      "accreditamenti": [],
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20,
          "prezzo_da_settimana": null
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10,
          "prezzo_da_settimana": null
        }
      ],
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse, in genere ogni 2 settimane"
      },
      "durata_min_settimane": 1,
      "alloggio": true,
      "esami_in_sede": [],
      "note": "Le date di inizio non sono pubblicate sul sito della scuola. Nella maggior parte delle scuole i corsi intensivi di gruppo partono ogni lunedì (i principianti assoluti in date fisse, in genere ogni due settimane). Scrivi alla scuola per confermare la prossima data utile: in alta stagione (giugno–settembre) i posti si chiudono 2–3 settimane prima.",
      "verificato_il": null,
      "stato_dati": "da_verificare",
      "info": {
        "durata_lezione_min": 45,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": null,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [],
      "anteprima": true,
      "email_stato": "stimata"
    },
    {
      "id": "inflorence-academy",
      "nome": "InFlorence Academy",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.inflorenceacademy.it",
      "accreditamenti": [
        "EDUITALIA",
        "LICET",
        "CSN"
      ],
      "esami_in_sede": [
        "DITALS"
      ],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 25
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-25",
          "2026-09-15",
          "2026-10-13",
          "2026-11-10"
        ],
        "principianti": "date fisse mensili; chi parla già italiano inizia ogni lunedì"
      },
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "pittura",
        "moda",
        "storia dell'arte",
        "cucina"
      ],
      "stato_dati": "da_verificare",
      "verificato_il": null,
      "email": "info@inflorenceacademy.it",
      "email_stato": "stimata",
      "note": "Prima scuola di lingua italiana fondata a Firenze, in Palazzo Guadagni (1502)."
    },
    {
      "id": "centro-italiano-firenze",
      "nome": "Centro Italiano Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.centroitalianofirenze.com",
      "accreditamenti": [],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse ogni 2 settimane"
      },
      "info": {
        "max_studenti_classe": 12,
        "materiale": "inclusi",
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "storia dell'arte"
      ],
      "stato_dati": "da_verificare",
      "verificato_il": null,
      "email": "info@centroitalianofirenze.com",
      "email_stato": "stimata",
      "note": "In Piazza D'Azeglio; corsi personalizzati con abbinamento a interessi dello studente."
    },
    {
      "id": "studitalia",
      "nome": "Studitalia",
      "citta": "Olbia",
      "regione": "Sardegna",
      "sito": "https://www.studitalia.com",
      "accreditamenti": [],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse ogni 2 settimane"
      },
      "info": {
        "durata_lezione_min": 50,
        "max_studenti_classe": 6,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "stato_dati": "verificato",
      "verificato_il": "2026-07-31",
      "email": "info@studitalia.com",
      "email_stato": "stimata",
      "note": "Piccola scuola vicino al centro di Olbia, a due passi dalla Costa Smeralda. Gruppi ridotti (max 6), iscrizione gratuita; corsi pratici di cucina, ceramica, chitarra."
    },
    {
      "id": "trulli-italian-school",
      "nome": "Trulli Italian School",
      "citta": "Alberobello",
      "regione": "Puglia",
      "sito": "https://www.trullischool.com",
      "accreditamenti": [
        "LICET"
      ],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse ogni 2 settimane"
      },
      "info": {
        "durata_lezione_min": 55,
        "max_studenti_classe": 6,
        "materiale": "inclusi",
        "test_ingresso": "primo giorno",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "dizione",
        "online",
        "letteratura",
        "moda",
        "pittura",
        "storia dell'arte",
        "vino",
        "over50"
      ],
      "stato_dati": "verificato",
      "verificato_il": "2026-07-31",
      "email": "info@trullischool.com",
      "email_stato": "stimata",
      "note": "Ad Alberobello, città UNESCO dei trulli. Classi da 5-6 studenti; alloggio anche in trullo. Iscrizione gratuita."
    },
    {
      "id": "gaia-institute",
      "nome": "GAIA Institute",
      "citta": "La Maddalena",
      "regione": "Sardegna",
      "sito": "https://www.gaia-institute.it",
      "accreditamenti": [],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse ogni 2 settimane"
      },
      "info": {
        "wifi": true
      },
      "extra": [
        "cucina",
        "online"
      ],
      "stato_dati": "da_verificare",
      "verificato_il": null,
      "email": "info@gaia-institute.it",
      "email_stato": "stimata"
    },
    {
      "id": "punto-e-virgola",
      "nome": "Punto e Virgola",
      "citta": "Grottaglie",
      "regione": "Puglia",
      "sito": "https://www.puntoevirgola.eu",
      "accreditamenti": [],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "date fisse ogni 2 settimane"
      },
      "info": {
        "wifi": true
      },
      "extra": [
        "cucina",
        "artigianato",
        "online"
      ],
      "stato_dati": "da_verificare",
      "verificato_il": null,
      "email": "info@puntoevirgola.eu",
      "email_stato": "stimata"
    },
    {
      "id": "arca",
      "nome": "Arca",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.arca-bologna.com",
      "pagina_corsi": "https://www.arca-bologna.com/it/corsi/date-prezzi/",
      "accreditamenti": [
        "ASILS",
        "Bildungsurlaub"
      ],
      "esami_in_sede": [
        "CELI"
      ],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "ogni-lunedi",
        "date": [],
        "principianti": "ogni lunedì; possibile qualsiasi giorno lavorativo"
      },
      "info": {
        "durata_lezione_min": 60,
        "max_studenti_classe": 10,
        "materiale": "inclusi",
        "test_ingresso": "online",
        "tassa_iscrizione": 0,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "arte",
        "cucina",
        "online",
        "letteratura",
        "storia dell'arte",
        "musica",
        "vino",
        "over50"
      ],
      "email": "info@arca-bologna.com",
      "email_stato": "stimata",
      "note": "Classi piccole (3–8 studenti). Chiusa 10–23 agosto e 21 dic–10 gen. Una delle prime scuole d'italiano di Bologna.",
      "stato_dati": "verificato",
      "verificato_il": "2026-07-31"
    },
    {
      "id": "italianme",
      "nome": "Italianme",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.italianme.it",
      "accreditamenti": [
        "LICET",
        "Bildungsurlaub"
      ],
      "esami_in_sede": [
        "CILS"
      ],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "date-fisse",
        "date": [
          "2026-08-03",
          "2026-09-07",
          "2026-10-05",
          "2026-11-02",
          "2026-11-30"
        ],
        "principianti": "date fisse mensili; chi parla già italiano inizia ogni lunedì"
      },
      "info": {
        "durata_lezione_min": 45,
        "materiale": "inclusi",
        "servizio_alloggio": "gratuito",
        "wifi": true,
        "max_studenti_classe": 8
      },
      "extra": [
        "arte",
        "cucina",
        "musica",
        "fotografia",
        "letteratura",
        "moda",
        "teatro"
      ],
      "email": "info@italianme.it",
      "email_stato": "stimata",
      "note": "In via Tornabuoni, palazzo storico con terrazza panoramica. Corsi combinati lingua + passione (arte, canto, cucina, cinema).",
      "stato_dati": "da_verificare",
      "verificato_il": null
    },
    {
      "id": "influent",
      "nome": "Influent",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.influent.it",
      "accreditamenti": [],
      "esami_in_sede": [],
      "alloggio": true,
      "corsi": [
        {
          "tipo": "intensivo",
          "ore_settimana": 20
        },
        {
          "tipo": "leggero",
          "ore_settimana": 10
        }
      ],
      "durata_min_settimane": 1,
      "inizio": {
        "frequenza": "flessibile",
        "date": [],
        "principianti": "date a scelta dello studente (dalla domenica al sabato)"
      },
      "info": {
        "max_studenti_classe": 1,
        "servizio_alloggio": "gratuito",
        "wifi": true
      },
      "extra": [
        "cucina",
        "arte"
      ],
      "email": "info@influent.it",
      "email_stato": "stimata",
      "note": "Corsi interamente individuali (one-to-one), programma e date su misura dello studente.",
      "stato_dati": "da_verificare",
      "verificato_il": null
    }
  ],
  "citta": {
    "Firenze": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Galleria degli Uffizi",
          "perche": "Botticelli, Leonardo e il Rinascimento in un solo palazzo, nato nel Cinquecento come sede degli uffici amministrativi granducali: da lì il nome. Prenotare sempre."
        },
        {
          "nome": "Cupola del Brunelleschi e Duomo",
          "perche": "La salita fra le due calotte è una lezione di ingegneria del Quattrocento: Brunelleschi la costruì senza centine, con oltre quattro milioni di mattoni posati a spina di pesce."
        },
        {
          "nome": "Oltrarno e Ponte Vecchio",
          "perche": "Botteghe artigiane, San Frediano e il tramonto da piazzale Michelangelo. Sopra il ponte corre il Corridoio Vasariano, il passaggio privato che i Medici usavano per non passare in strada."
        }
      ],
      "eventi": [
        {
          "nome": "Scoppio del Carro",
          "quando": "Pasqua",
          "desc": "La domenica di Pasqua, in Piazza del Duomo, un carro secolare esplode in fuochi d'artificio accesi da una colomba meccanica. Tradizione fiorentina purissima: ideale per il lessico delle feste e delle tradizioni."
        },
        {
          "nome": "Maggio Musicale Fiorentino",
          "quando": "aprile–giugno",
          "desc": "Uno dei più antichi festival musicali d'Europa porta opera e concerti in città per settimane. Per chi studia a Firenze è l'occasione di unire lingua e cultura alta, con il lessico della musica e del teatro."
        },
        {
          "nome": "Pitti Uomo",
          "quando": "gennaio e giugno",
          "desc": "Due volte l'anno Firenze diventa capitale mondiale della moda maschile. Le strade si riempiono di addetti ai lavori: utile per il vocabolario della moda e per sentire l'italiano del business e dello stile."
        },
        {
          "nome": "Firenze Rocks",
          "quando": "giugno",
          "desc": "A giugno il più grande festival rock italiano porta star internazionali alle Cascine. Ambiente giovane e informale: ottimo per l'italiano colloquiale, il gergo dei concerti e socializzare con coetanei."
        },
        {
          "nome": "Festa della Rificolona",
          "quando": "7 settembre",
          "desc": "Il 7 settembre i bambini sfilano con lanterne di carta illuminate. Una festa popolare e poetica, perfetta per il lessico delle tradizioni e per vedere la Firenze più autentica lontano dai circuiti turistici."
        }
      ],
      "aeroporto": "Firenze (FLR) o Pisa (PSA)",
      "coord": [
        43.77,
        11.25
      ]
    },
    "Roma": {
      "regione": "Lazio",
      "top3": [
        {
          "nome": "Colosseo e Fori Imperiali",
          "perche": "Il centro del mondo antico, da percorrere a piedi in mezza giornata. Il nome ufficiale è Anfiteatro Flavio: «Colosseo» viene dal colosso di Nerone che stava lì accanto."
        },
        {
          "nome": "Musei Vaticani e San Pietro",
          "perche": "Cappella Sistina e cupola: prenotare sempre. La Guardia Svizzera presta servizio qui ininterrottamente dal 1506, ed è tuttora composta solo da cittadini svizzeri."
        },
        {
          "nome": "Pantheon e Trastevere",
          "perche": "La Roma che si vive la sera, fra piazze e trattorie. La cupola del Pantheon, in calcestruzzo romano, resta dopo duemila anni la più grande al mondo senza armatura in acciaio."
        }
      ],
      "eventi": [
        {
          "nome": "Natale di Roma",
          "quando": "21 aprile",
          "desc": "Il 21 aprile Roma celebra la sua fondazione (753 a.C.) con cortei in costume, rievocazioni storiche ai Fori e fuochi al Circo Massimo. Per uno studente è un'immersione nella storia romana raccontata dal vivo: ottimo per il lessico storico e per capire quanto i romani amino la loro città."
        },
        {
          "nome": "Estate Romana",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre Roma si riempie di cinema all'aperto, concerti sul Tevere e festival nei quartieri. Le serate lunghe sono l'occasione ideale per praticare l'italiano fuori dall'aula, ordinando un gelato o chiacchierando a un concerto gratuito."
        },
        {
          "nome": "Festa del Cinema di Roma",
          "quando": "ottobre",
          "desc": "A ottobre l'Auditorium ospita anteprime, registi e attori da tutto il mondo. Anche senza biglietto, la città respira cinema: perfetto per allenare l'ascolto con l'italiano parlato del red carpet e delle interviste."
        },
        {
          "nome": "Internazionali di tennis",
          "quando": "maggio",
          "desc": "A maggio il Foro Italico ospita uno dei tornei più importanti al mondo. Il vocabolario dello sport, i numeri e il tifo dal vivo rendono queste giornate un laboratorio di italiano colloquiale."
        },
        {
          "nome": "Sei Nazioni di rugby",
          "quando": "febbraio–marzo",
          "desc": "Tra febbraio e marzo Roma ospita le partite casalinghe dell'Italia. I pub e lo stadio si riempiono di tifosi: un contesto informale perfetto per imparare esclamazioni, tifo e italiano di tutti i giorni."
        }
      ],
      "aeroporto": "Roma Fiumicino (FCO)",
      "coord": [
        41.9,
        12.5
      ]
    },
    "Milano": {
      "regione": "Lombardia",
      "top3": [
        {
          "nome": "Duomo e terrazze",
          "perche": "Il Duomo ha più di tremila statue e si cammina sulle terrazze fra le guglie, in marmo di Candoglia. La cattedrale fu iniziata nel 1386 e la facciata finita solo nell'Ottocento."
        },
        {
          "nome": "Cenacolo di Leonardo",
          "perche": "L'Ultima Cena in Santa Maria delle Grazie: si entra a gruppi di venticinque per quindici minuti, e i biglietti finiscono con mesi di anticipo."
        },
        {
          "nome": "Brera e Navigli",
          "perche": "La pinacoteca e le vie d'artista di Brera, poi i canali dell'aperitivo. I Navigli servivano a portare per via d'acqua il marmo di Candoglia al cantiere del Duomo."
        }
      ],
      "eventi": [
        {
          "nome": "Fuorisalone / Design Week",
          "quando": "aprile",
          "desc": "Ad aprile Milano diventa la capitale mondiale del design: installazioni, mostre e feste in ogni quartiere. Per uno studente è un'immersione nel lessico del design, dell'arte e dell'italiano creativo e professionale."
        },
        {
          "nome": "Prima della Scala",
          "quando": "7 dicembre",
          "desc": "Il 7 dicembre la Scala inaugura la stagione lirica: è l'evento culturale più elegante d'Italia. Anche solo viverne l'atmosfera in città aiuta col lessico dell'opera, della musica e dell'italiano formale."
        },
        {
          "nome": "Settimana della Moda",
          "quando": "febbraio e settembre",
          "desc": "Milano Fashion Week riempie la città di sfilate ed eventi due volte l'anno. Vocabolario della moda, dei colori e dello stile: perfetto per chi vuole un italiano legato al mondo del fashion."
        },
        {
          "nome": "MiTo SettembreMusica",
          "quando": "settembre",
          "desc": "A settembre Milano e Torino si uniscono in un festival di musica classica e contemporanea. Concerti spesso gratuiti: un modo raffinato per allenare l'ascolto e il lessico musicale."
        }
      ],
      "aeroporto": "Milano Linate (LIN) o Malpensa (MXP)",
      "coord": [
        45.46,
        9.19
      ]
    },
    "Bologna": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "Le Due Torri e i portici UNESCO",
          "perche": "62 km di portici: la città si studia camminando."
        },
        {
          "nome": "Il Quadrilatero",
          "perche": "Il mercato medievale dove si mangia la vera cucina emiliana."
        },
        {
          "nome": "San Luca",
          "perche": "Il portico più lungo del mondo, fino al santuario."
        }
      ],
      "eventi": [
        {
          "nome": "Il Cinema Ritrovato",
          "quando": "fine giugno",
          "desc": "A giugno Bologna proietta capolavori restaurati in Piazza Maggiore, sotto le stelle. Cinema d'autore gratuito all'aperto: ideale per l'ascolto e per immergersi nell'italiano colto e cinefilo."
        },
        {
          "nome": "Arte Fiera",
          "quando": "febbraio",
          "desc": "A gennaio-febbraio Bologna ospita una delle più importanti fiere d'arte moderna d'Italia. Per gli studenti è l'occasione di praticare il lessico dell'arte contemporanea e della critica."
        },
        {
          "nome": "Bologna Estate",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre la città anima cortili, parchi e piazze con concerti, cinema e incontri, spesso gratuiti. La Bologna universitaria dà il meglio: perfetta per socializzare e praticare l'italiano."
        }
      ],
      "aeroporto": "Bologna (BLQ)",
      "coord": [
        44.49,
        11.34
      ]
    },
    "Venezia": {
      "regione": "Veneto",
      "top3": [
        {
          "nome": "Piazza San Marco e Palazzo Ducale",
          "perche": "Ottomila metri quadri di mosaici su fondo d'oro nella basilica, e accanto il palazzo del doge. I quattro cavalli di bronzo in facciata sono copie: gli originali, presi a Costantinopoli nel 1204, sono all'interno."
        },
        {
          "nome": "Murano e Burano",
          "perche": "Le isole del vetro e del merletto, in vaporetto. Le case di Burano sono dipinte a colori forti perché i pescatori le riconoscessero rientrando con la nebbia."
        },
        {
          "nome": "Cannaregio e il ghetto",
          "perche": "La Venezia dove si vive davvero, con i bacari e le osterie. Il Ghetto di Venezia, istituito nel 1516, è il primo d'Europa e ha dato il nome alla parola in tutte le lingue."
        }
      ],
      "eventi": [
        {
          "nome": "Carnevale",
          "quando": "gennaio–febbraio",
          "desc": "A febbraio Venezia indossa maschere e costumi settecenteschi in una delle feste più famose al mondo. Tra calli e piazze è un'immersione totale: lessico delle tradizioni, dei costumi e della storia veneziana."
        },
        {
          "nome": "Festa del Redentore",
          "quando": "terzo weekend di luglio",
          "desc": "La terza domenica di luglio Venezia celebra con un ponte votivo e fuochi d'artificio spettacolari sull'acqua. Festa profondamente veneziana: ottima per vivere la città con i locali, lontano dai clichè turistici."
        },
        {
          "nome": "Mostra del Cinema",
          "quando": "fine agosto–settembre",
          "desc": "A fine agosto il Lido ospita il festival di cinema più antico del mondo. Registi e attori invadono Venezia: perfetto per allenare l'ascolto con l'italiano del cinema e delle interviste."
        },
        {
          "nome": "Biennale",
          "quando": "maggio–novembre",
          "desc": "La grande mostra internazionale d'arte e architettura anima Venezia per mesi. Per chi studia è un percorso nel lessico dell'arte contemporanea e un motivo in più per esplorare la città in italiano."
        },
        {
          "nome": "Regata Storica",
          "quando": "prima domenica di settembre",
          "desc": "La prima domenica di settembre il Canal Grande ospita un corteo di barche storiche e gare di voga. Spettacolo veneziano autentico: ideale per il lessico delle tradizioni e della vita sull'acqua."
        }
      ],
      "aeroporto": "Venezia (VCE)",
      "coord": [
        45.44,
        12.32
      ]
    },
    "Siena": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Piazza del Campo",
          "perche": "La conchiglia più bella d'Italia, divisa in nove settori in ricordo del Governo dei Nove che resse Siena nel Trecento. Si sale sulla Torre del Mangia."
        },
        {
          "nome": "Duomo di Siena",
          "perche": "Il pavimento istoriato e la libreria Piccolomini. La navata incompiuta accanto doveva essere il transetto di una cattedrale ancora più grande, fermata dalla peste del 1348."
        },
        {
          "nome": "Le contrade",
          "perche": "Musei di contrada e vita di rione: chiedere alla scuola una visita. Le diciassette contrade hanno un proprio territorio, una chiesa e una fontana dove si battezzano i nuovi nati."
        }
      ],
      "eventi": [
        {
          "nome": "Palio di Siena",
          "quando": "2 luglio e 16 agosto",
          "desc": "Il 2 luglio e il 16 agosto le contrade si sfidano in una corsa di novanta secondi in Piazza del Campo, dopo giorni di prove e cene all'aperto. Il rito italiano più intenso che esista."
        },
        {
          "nome": "Chigiana International Festival",
          "quando": "luglio–agosto",
          "desc": "Fra luglio e agosto l'Accademia Chigiana porta concerti e masterclass di livello mondiale nei palazzi senesi. Ambiente colto e internazionale: buono per il lessico musicale e l'italiano formale."
        }
      ],
      "aeroporto": "Firenze (FLR) o Pisa (PSA)",
      "coord": [
        43.32,
        11.33
      ]
    },
    "Perugia": {
      "regione": "Umbria",
      "top3": [
        {
          "nome": "Rocca Paolina e centro storico",
          "perche": "Una città sotterranea dentro la città."
        },
        {
          "nome": "Galleria Nazionale dell'Umbria",
          "perche": "Perugino e Piero della Francesca."
        },
        {
          "nome": "Assisi",
          "perche": "A mezz'ora: la basilica di Giotto."
        }
      ],
      "eventi": [
        {
          "nome": "Umbria Jazz",
          "quando": "luglio",
          "desc": "A luglio Perugia diventa la capitale del jazz mondiale, con concerti in piazza e per le vie del centro, molti gratuiti. Ambiente internazionale e rilassato: perfetto per praticare l'italiano tra un concerto e l'altro."
        },
        {
          "nome": "Eurochocolate",
          "quando": "autunno",
          "desc": "A ottobre Perugia si riempie di cioccolato con degustazioni e sculture di cacao. Una festa golosa e affollata: ottima per il lessico del cibo, dei sapori e per socializzare in italiano."
        },
        {
          "nome": "Festival Internazionale del Giornalismo",
          "quando": "aprile",
          "desc": "In primavera Perugia ospita giornalisti da tutto il mondo per incontri gratuiti sull'attualità. Per uno studente avanzato è un'occasione unica di ascoltare l'italiano dei media e del dibattito."
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)",
      "coord": [
        43.11,
        12.39
      ]
    },
    "Torino": {
      "regione": "Piemonte",
      "top3": [
        {
          "nome": "Museo Egizio",
          "perche": "La collezione egizia più importante fuori dal Cairo."
        },
        {
          "nome": "Mole Antonelliana",
          "perche": "Museo del Cinema e ascensore panoramico."
        },
        {
          "nome": "Caffè storici e portici",
          "perche": "Il bicerin, piazza San Carlo, la città sabauda."
        }
      ],
      "eventi": [
        {
          "nome": "Salone Internazionale del Libro",
          "quando": "maggio",
          "desc": "A maggio il Lingotto ospita la fiera del libro più importante d'Italia, con centinaia di presentazioni e autori. Per chi studia italiano è un'immersione totale nella lingua scritta e parlata."
        },
        {
          "nome": "Terra Madre Salone del Gusto",
          "quando": "settembre",
          "desc": "A settembre Slow Food riunisce a Torino produttori da tutto il mondo fra degustazioni e laboratori. Perfetto per il lessico del cibo, dell'agricoltura e della sostenibilità."
        },
        {
          "nome": "Luci d'Artista",
          "quando": "novembre–gennaio",
          "desc": "Da novembre a gennaio artisti contemporanei illuminano piazze e vie di Torino con opere luminose. Passeggiata serale gratuita: bella per il lessico dell'arte e per uscire con i compagni di corso."
        }
      ],
      "aeroporto": "Torino (TRN) o Milano (MXP)",
      "coord": [
        45.07,
        7.69
      ]
    },
    "Genova": {
      "regione": "Liguria",
      "top3": [
        {
          "nome": "Acquario e Porto Antico",
          "perche": "Il più grande acquario d'Italia, nel porto di Renzo Piano."
        },
        {
          "nome": "Palazzi dei Rolli",
          "perche": "Le dimore UNESCO di via Garibaldi."
        },
        {
          "nome": "I caruggi",
          "perche": "Il centro medievale più esteso d'Europa, da perdersi."
        }
      ],
      "eventi": [
        {
          "nome": "Rolli Days",
          "quando": "primavera e autunno",
          "desc": "Due volte l'anno i palazzi nobiliari dei Rolli, patrimonio UNESCO, aprono le porte con visite guidate gratuite. Occasione perfetta per il lessico dell'arte e dell'architettura, ascoltando guide italiane."
        },
        {
          "nome": "Salone Nautico",
          "quando": "settembre",
          "desc": "A settembre Genova ospita il più grande salone nautico del Mediterraneo e la città si riempie di visitatori. Utile per il lessico del mare, delle barche e dell'italiano commerciale."
        }
      ],
      "aeroporto": "Genova (GOA)",
      "coord": [
        44.41,
        8.93
      ]
    },
    "Sestri Levante": {
      "regione": "Liguria",
      "top3": [
        {
          "nome": "Baia del Silenzio",
          "perche": "Una delle baie più fotografate d'Italia, a due passi dalla scuola."
        },
        {
          "nome": "Punta Manara",
          "perche": "Sentiero a picco sul mare, un'ora di cammino."
        },
        {
          "nome": "Cinque Terre",
          "perche": "In treno in 30–40 minuti."
        }
      ],
      "eventi": [
        {
          "nome": "Andersen Festival",
          "quando": "giugno",
          "desc": "A giugno la città si riempie di teatro di strada, illustratori e spettacoli dedicati alle fiabe, in ricordo del passaggio di Andersen. Linguaggio semplice e visivo: ottimo per i principianti."
        },
        {
          "nome": "Barcarolata",
          "quando": "luglio",
          "desc": "A luglio le barche del porto si travestono da carri allegorici e sfilano nella Baia del Silenzio. Festa marinara ironica e locale: perfetta per il lessico del mare e per ridere con la gente del posto."
        }
      ],
      "aeroporto": "Genova (GOA) o Pisa (PSA)",
      "coord": [
        44.27,
        9.4
      ]
    },
    "Sanremo": {
      "regione": "Liguria",
      "top3": [
        {
          "nome": "La Pigna",
          "perche": "Il borgo medievale a chiocciola sopra la città."
        },
        {
          "nome": "Pista ciclabile del Ponente",
          "perche": "24 km sul mare, sull'ex ferrovia."
        },
        {
          "nome": "Villa Nobel e i giardini",
          "perche": "La Riviera dei fiori di fine Ottocento."
        }
      ],
      "eventi": [
        {
          "nome": "Festival di Sanremo",
          "quando": "febbraio",
          "desc": "A febbraio l'Ariston ospita la gara canora che tiene incollata l'Italia intera per cinque sere. Anche solo guardarlo in tv con dei coinquilini è una lezione di lingua e di costume."
        },
        {
          "nome": "Milano-Sanremo, la Classicissima",
          "quando": "marzo",
          "desc": "A marzo la corsa ciclistica più lunga del calendario arriva sul lungomare di Sanremo dopo quasi trecento chilometri. Giornata di festa: buona per il lessico sportivo e geografico."
        }
      ],
      "aeroporto": "Nizza (NCE) o Genova (GOA)",
      "coord": [
        43.82,
        7.78
      ]
    },
    "Napoli": {
      "regione": "Campania",
      "top3": [
        {
          "nome": "Spaccanapoli e Napoli sotterranea",
          "perche": "La città greco-romana sotto i vicoli: quaranta metri più in basso si cammina negli acquedotti scavati dai greci e usati come rifugi durante i bombardamenti del 1943."
        },
        {
          "nome": "Museo Archeologico Nazionale",
          "perche": "I tesori di Pompei ed Ercolano, fra cui i mosaici della Casa del Fauno. Molti affreschi sono qui e non sul sito: senza il museo, Pompei si capisce a metà."
        },
        {
          "nome": "Pompei e il Vesuvio",
          "perche": "In Circumvesuviana, gita di un giorno. Il Vesuvio è l'unico vulcano attivo dell'Europa continentale e ha alle pendici una delle aree più densamente abitate al mondo."
        }
      ],
      "eventi": [
        {
          "nome": "Maggio dei Monumenti",
          "quando": "maggio",
          "desc": "Per tutto maggio Napoli apre chiese, palazzi e cortili normalmente chiusi, con visite e concerti spesso gratuiti. Occasione straordinaria per il lessico dell'arte e per girare la città con i napoletani."
        },
        {
          "nome": "Miracolo di San Gennaro",
          "quando": "19 settembre",
          "desc": "Il 19 settembre il Duomo si riempie per attendere lo scioglimento del sangue del patrono, fra preghiere e applausi. Rito napoletano per eccellenza: intenso e rivelatore del rapporto tra città e fede."
        },
        {
          "nome": "Napoli Pizza Village",
          "quando": "giugno",
          "desc": "A giugno il lungomare si riempie di pizzaioli, forni e concerti per una settimana dedicata alla pizza napoletana. Golosissimo e affollato: perfetto per il lessico del cibo e per ordinare senza timidezza."
        }
      ],
      "aeroporto": "Napoli (NAP)",
      "coord": [
        40.85,
        14.27
      ]
    },
    "Sorrento": {
      "regione": "Campania",
      "top3": [
        {
          "nome": "Centro storico e Marina Grande",
          "perche": "Limoni, intarsi e il borgo dei pescatori."
        },
        {
          "nome": "Costiera Amalfitana",
          "perche": "Positano e Amalfi in battello o bus."
        },
        {
          "nome": "Capri",
          "perche": "Aliscafo in 25 minuti."
        }
      ],
      "eventi": [
        {
          "nome": "Concerti e feste d'estate",
          "quando": "estate",
          "desc": "D'estate chiostri, ville e piazze di Sorrento ospitano concerti, cinema all'aperto e serate danzanti. Contesto turistico ma vivace: buono per praticare l'italiano fuori dall'aula."
        },
        {
          "nome": "Processioni della Settimana Santa",
          "quando": "Pasqua",
          "desc": "La notte del Venerdì Santo le confraternite bianche e nere attraversano Sorrento in silenzio, con canti antichi. Rito solenne e impressionante: ottimo per il lessico religioso."
        }
      ],
      "aeroporto": "Napoli (NAP)",
      "coord": [
        40.63,
        14.37
      ]
    },
    "Salerno": {
      "regione": "Campania",
      "top3": [
        {
          "nome": "Duomo di San Matteo",
          "perche": "Romanico normanno e il chiostro arabo."
        },
        {
          "nome": "Lungomare e centro storico",
          "perche": "Il salotto della città, fino al porto."
        },
        {
          "nome": "Costiera e Paestum",
          "perche": "Amalfi da un lato, i templi greci dall'altro."
        }
      ],
      "eventi": [
        {
          "nome": "Luci d'Artista",
          "quando": "novembre–gennaio",
          "desc": "Da novembre a gennaio il centro di Salerno si copre di installazioni luminose che attirano visitatori da tutto il Sud. Passeggiata serale affollata: ottima per l'italiano di tutti i giorni."
        },
        {
          "nome": "Giffoni Film Festival",
          "quando": "luglio",
          "desc": "A luglio il festival di cinema per ragazzi più famoso al mondo si tiene a pochi chilometri da Salerno, con migliaia di giovani giurati. Ambiente giovanile: perfetto per l'italiano parlato dai coetanei."
        }
      ],
      "aeroporto": "Napoli (NAP)",
      "coord": [
        40.68,
        14.77
      ]
    },
    "Tropea": {
      "regione": "Calabria",
      "top3": [
        {
          "nome": "Santa Maria dell'Isola",
          "perche": "Il santuario benedettino su uno scoglio che un tempo era davvero un'isola: la lingua di sabbia che lo unisce alla costa si è formata nei secoli. Si sale con una scalinata scavata nella roccia."
        },
        {
          "nome": "Centro storico a picco sul mare",
          "perche": "Il paese sta su una rupe di arenaria alta una sessantina di metri, con i palazzi nobiliari affacciati sul Tirreno. Sotto la città corrono cantine e passaggi scavati nella roccia."
        },
        {
          "nome": "Capo Vaticano",
          "perche": "Promontorio di granito con calette e uno dei tramonti più aperti del Sud: nelle giornate limpide si vede lo Stromboli fumare all'orizzonte. Il faro è del 1885."
        }
      ],
      "eventi": [
        {
          "nome": "Feste patronali d'estate",
          "quando": "estate",
          "desc": "D'estate Tropea e i paesi vicini celebrano i santi con processioni, luminarie e fuochi sulla scogliera. Feste popolari genuine: ottime per il lessico delle tradizioni calabresi."
        },
        {
          "nome": "Sagra della cipolla rossa",
          "quando": "estate",
          "desc": "D'estate la celebre cipolla rossa di Tropea ha la sua sagra, fra degustazioni, stand e musica. Occasione golosa per il lessico del cibo e per chiacchierare a tavola con i calabresi."
        }
      ],
      "aeroporto": "Lamezia Terme (SUF)",
      "coord": [
        38.68,
        15.9
      ]
    },
    "Trieste": {
      "regione": "Friuli-Venezia Giulia",
      "top3": [
        {
          "nome": "Piazza Unità d'Italia",
          "perche": "La piazza sul mare più grande d'Europa."
        },
        {
          "nome": "Castello di Miramare",
          "perche": "Il castello asburgico sul golfo."
        },
        {
          "nome": "Caffè storici",
          "perche": "Svevo, Joyce e la tradizione mitteleuropea."
        }
      ],
      "eventi": [
        {
          "nome": "Barcolana",
          "quando": "ottobre",
          "desc": "La seconda domenica di ottobre più di duemila barche a vela partono insieme dal golfo di Trieste. È la regata più affollata al mondo e la città intera scende sulle rive: spettacolare."
        },
        {
          "nome": "Trieste Film Festival",
          "quando": "gennaio",
          "desc": "A gennaio il festival porta il cinema dell'Europa centrale e orientale, in lingua originale con sottotitoli. Ottimo per l'ascolto e per capire la vocazione di frontiera di Trieste."
        },
        {
          "nome": "Bloomsday",
          "quando": "16 giugno",
          "desc": "Il 16 giugno Trieste ricorda James Joyce, che qui visse dieci anni, con letture e passeggiate letterarie. Occasione curiosa per l'italiano letterario e per una città molto europea."
        }
      ],
      "aeroporto": "Trieste (TRS) o Venezia (VCE)",
      "coord": [
        45.65,
        13.77
      ]
    },
    "Taormina": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Teatro Antico",
          "perche": "Scena greca con l'Etna sullo sfondo."
        },
        {
          "nome": "Isola Bella",
          "perche": "La perla dello Ionio, riserva naturale."
        },
        {
          "nome": "Etna",
          "perche": "Escursione sul vulcano attivo più alto d'Europa."
        }
      ],
      "eventi": [
        {
          "nome": "Taormina Film Fest",
          "quando": "giugno–luglio",
          "desc": "Fra giugno e luglio il Teatro Antico ospita proiezioni e ospiti internazionali sotto le stelle, con l'Etna sullo sfondo. Cornice irripetibile: buona per il lessico del cinema."
        },
        {
          "nome": "Concerti al Teatro Antico",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre il teatro greco-romano ospita opera, concerti e balletto affacciato sul mare. Serata memorabile: ottima per il lessico musicale e per l'italiano formale."
        }
      ],
      "aeroporto": "Catania (CTA)",
      "coord": [
        37.85,
        15.29
      ]
    },
    "Milazzo": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Castello di Milazzo",
          "perche": "La cittadella fortificata più grande della Sicilia."
        },
        {
          "nome": "Isole Eolie",
          "perche": "Aliscafi per Lipari, Vulcano e Stromboli."
        },
        {
          "nome": "Capo Milazzo",
          "perche": "Piscina naturale e sentieri sul promontorio."
        }
      ],
      "eventi": [
        {
          "nome": "Feste patronali",
          "quando": "estate",
          "desc": "Durante l'estate Milazzo celebra i suoi santi con processioni, luminarie e sagre sul mare. Feste popolari genuine: perfette per il lessico delle tradizioni siciliane e per conoscere la gente del posto."
        },
        {
          "nome": "MishMash Festival",
          "quando": "agosto",
          "desc": "Un festival estivo che mescola musica, arte e cultura sul lungomare di Milazzo. Ambiente giovane e informale, ideale per praticare l'italiano colloquiale in un contesto rilassato e balneare."
        }
      ],
      "aeroporto": "Catania (CTA) o Palermo (PMO)",
      "coord": [
        38.22,
        15.24
      ]
    },
    "Palermo (Mondello)": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Cappella Palatina e Monreale",
          "perche": "I mosaici arabo-normanni UNESCO."
        },
        {
          "nome": "Mercati storici",
          "perche": "Ballarò e il Capo: lo street food come lezione di lingua."
        },
        {
          "nome": "Mondello",
          "perche": "La spiaggia liberty dei palermitani."
        }
      ],
      "eventi": [
        {
          "nome": "Festino di Santa Rosalia",
          "quando": "metà luglio",
          "desc": "A metà luglio Palermo festeggia la patrona per cinque giorni, con il carro trionfale che sfila fino al mare e fuochi al Foro Italico. La festa più grande della Sicilia: travolgente e popolarissima."
        },
        {
          "nome": "Ballarò Buskers",
          "quando": "ottobre",
          "desc": "A ottobre il quartiere di Ballarò si riempie di artisti di strada, musica e mercato, fra i vicoli più veri di Palermo. Contesto informale e caotico: ottimo per l'italiano parlato e il dialetto che si sente attorno."
        }
      ],
      "aeroporto": "Palermo (PMO)",
      "coord": [
        38.2,
        13.32
      ]
    },
    "Palermo": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Cappella Palatina e Monreale",
          "perche": "I mosaici arabo-normanni UNESCO."
        },
        {
          "nome": "Mercati storici",
          "perche": "Ballarò e il Capo: lo street food come lezione di lingua."
        },
        {
          "nome": "Teatro Massimo",
          "perche": "Il più grande teatro lirico d'Italia."
        }
      ],
      "eventi": [
        {
          "nome": "Festino di Santa Rosalia",
          "quando": "metà luglio",
          "desc": "A metà luglio Palermo festeggia la patrona per cinque giorni, con il carro trionfale che sfila fino al mare e fuochi al Foro Italico. La festa più grande della Sicilia: travolgente e popolarissima."
        },
        {
          "nome": "Ballarò Buskers",
          "quando": "ottobre",
          "desc": "A ottobre il quartiere di Ballarò si riempie di artisti di strada, musica e mercato, fra i vicoli più veri di Palermo. Contesto informale e caotico: ottimo per l'italiano parlato e il dialetto che si sente attorno."
        }
      ],
      "aeroporto": "Palermo (PMO)",
      "coord": [
        38.12,
        13.36
      ]
    },
    "Alghero": {
      "regione": "Sardegna",
      "top3": [
        {
          "nome": "Centro storico catalano",
          "perche": "Bastioni sul mare e dialetto catalano vivo."
        },
        {
          "nome": "Grotte di Nettuno",
          "perche": "In barca o dalla scalinata di Capo Caccia."
        },
        {
          "nome": "Spiagge della Riviera del Corallo",
          "perche": "Le Bombarde, Lazzaretto, Maria Pia."
        }
      ],
      "eventi": [
        {
          "nome": "Settimana Santa algherese",
          "quando": "Pasqua",
          "desc": "Ad Alghero la Settimana Santa segue il rito spagnolo, con confraternite incappucciate e canti in catalano. Un pezzo di Spagna in Sardegna: interessante per capire quanto sia varia l'Italia."
        },
        {
          "nome": "Cap d'Any de l'Alguer",
          "quando": "dicembre–gennaio",
          "desc": "Il capodanno algherese si festeggia in piazza con concerti e fuochi, e il nome resta in catalano. Serata informale e affollata, ottima per l'italiano di tutti i giorni."
        },
        {
          "nome": "Festa de Sant Miquel",
          "quando": "settembre",
          "desc": "A settembre la città celebra il patrono con processione, banda e stand nel centro storico. Festa sentita e poco turistica: perfetta per ascoltare l'italiano parlato dagli algheresi."
        }
      ],
      "aeroporto": "Alghero (AHO)",
      "coord": [
        40.56,
        8.32
      ]
    },
    "Otranto": {
      "regione": "Puglia",
      "top3": [
        {
          "nome": "Cattedrale e il mosaico",
          "perche": "L'albero della vita del 1163, pavimento intero."
        },
        {
          "nome": "Castello aragonese e borgo",
          "perche": "Il punto più a est d'Italia."
        },
        {
          "nome": "Baia dei Turchi",
          "perche": "Le spiagge caraibiche del Salento."
        }
      ],
      "eventi": [
        {
          "nome": "Alba dei Popoli",
          "quando": "dicembre–gennaio",
          "desc": "Fra dicembre e gennaio Otranto celebra la prima alba dell'anno sul punto più a est d'Italia, con concerti e incontri. Suggestivo e poco affollato: bello per vedere il Salento d'inverno."
        },
        {
          "nome": "Festa dei Santi Martiri",
          "quando": "metà agosto",
          "desc": "A metà agosto Otranto ricorda gli ottocento martiri del 1480 con processione, luminarie e fuochi sul mare. Festa identitaria fortissima: ottima per il lessico storico e religioso."
        }
      ],
      "aeroporto": "Brindisi (BDS)",
      "coord": [
        40.15,
        18.49
      ]
    },
    "Viareggio": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Passeggiata liberty",
          "perche": "Caffè e stabilimenti storici sul mare."
        },
        {
          "nome": "Torre del Lago",
          "perche": "La villa di Puccini sul lago di Massaciuccoli."
        },
        {
          "nome": "Alpi Apuane",
          "perche": "Le cave di marmo dietro la costa."
        }
      ],
      "eventi": [
        {
          "nome": "Carnevale di Viareggio",
          "quando": "febbraio",
          "desc": "A febbraio carri alti venti metri sfilano sul lungomare, con caricature di politici e personaggi famosi. Ironia italiana allo stato puro: ottima per capire l'attualità e il lessico della satira."
        },
        {
          "nome": "Festival Puccini",
          "quando": "luglio–agosto",
          "desc": "Fra luglio e agosto le opere di Puccini vanno in scena all'aperto a Torre del Lago, davanti al lago dove il compositore le scrisse. Cornice irripetibile per il lessico della lirica."
        },
        {
          "nome": "Premio letterario Viareggio-Rèpaci",
          "quando": "estate",
          "desc": "D'estate uno dei premi letterari più antichi d'Italia porta scrittori e giurati sul lungomare, con incontri aperti al pubblico. Occasione per l'italiano letterario e per scoprire nuovi autori."
        }
      ],
      "aeroporto": "Pisa (PSA)",
      "coord": [
        43.87,
        10.24
      ]
    },
    "Lucca": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Le Mura",
          "perche": "4 km di passeggiata alberata sopra i bastioni."
        },
        {
          "nome": "Piazza dell'Anfiteatro e Torre Guinigi",
          "perche": "L'ovale romano e la torre con i lecci in cima."
        },
        {
          "nome": "Duomo di San Martino",
          "perche": "Il Volto Santo e Ilaria del Carretto."
        }
      ],
      "eventi": [
        {
          "nome": "Lucca Summer Festival",
          "quando": "giugno–luglio",
          "desc": "Fra giugno e luglio le mura di Lucca ospitano concerti di star internazionali in piazza Napoleone. Pubblico giovane e informale: ideale per l'italiano colloquiale e il gergo dei concerti."
        },
        {
          "nome": "Lucca Comics & Games",
          "quando": "fine ottobre",
          "desc": "A fine ottobre Lucca diventa la capitale europea del fumetto e del gioco, con centomila visitatori in costume. Caos festoso: perfetto per l'italiano giovanile e per fare amicizia in fretta."
        },
        {
          "nome": "Luminara di Santa Croce",
          "quando": "13 settembre",
          "desc": "La sera del 13 settembre Lucca spegne le luci e una processione a lume di candela attraversa la città fino al Duomo. Atmosfera sospesa e molto locale: bella per il lessico religioso e delle tradizioni."
        }
      ],
      "aeroporto": "Pisa (PSA)",
      "coord": [
        43.84,
        10.5
      ]
    },
    "Pisa": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Piazza dei Miracoli",
          "perche": "Torre, Duomo e Battistero: il romanico pisano."
        },
        {
          "nome": "Lungarni e Borgo Stretto",
          "perche": "La Pisa vera, universitaria."
        },
        {
          "nome": "Marina e San Rossore",
          "perche": "Mare e parco naturale a 15 minuti."
        }
      ],
      "eventi": [
        {
          "nome": "Luminara di San Ranieri",
          "quando": "16 giugno",
          "desc": "La sera del 16 giugno centomila lumini disegnano i palazzi lungo l'Arno e la città spegne l'illuminazione pubblica. Uno degli spettacoli più belli d'Italia: ottimo per il lessico delle tradizioni."
        },
        {
          "nome": "Gioco del Ponte",
          "quando": "ultimo sabato di giugno",
          "desc": "L'ultimo sabato di giugno le due metà di Pisa si sfidano spingendo un carrello sul Ponte di Mezzo, dopo un corteo in armatura. Rievocazione fisica e rumorosa: perfetta per il tifo e il lessico storico."
        },
        {
          "nome": "Internet Festival",
          "quando": "ottobre",
          "desc": "A ottobre Pisa ospita incontri, laboratori e talk sul digitale, molti gratuiti e in italiano. Per studenti avanzati è un'ottima palestra per il lessico tecnologico e per il dibattito."
        }
      ],
      "aeroporto": "Pisa (PSA)",
      "coord": [
        43.72,
        10.4
      ]
    },
    "Montepulciano": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Piazza Grande",
          "perche": "Il salotto rinascimentale della Val di Chiana."
        },
        {
          "nome": "Cantine storiche",
          "perche": "Il Vino Nobile si degusta sotto i palazzi."
        },
        {
          "nome": "Val d'Orcia",
          "perche": "Pienza e San Quirico a mezz'ora."
        }
      ],
      "eventi": [
        {
          "nome": "Bravìo delle Botti",
          "quando": "ultima domenica di agosto",
          "desc": "L'ultima domenica di agosto gli otto contradaioli spingono botti da ottanta chili su per le vie in salita del paese. Sfida durissima e molto sentita: ottima per il tifo e il lessico delle contrade."
        },
        {
          "nome": "Cantiere Internazionale d'Arte",
          "quando": "luglio",
          "desc": "A luglio il paese si riempie di musica contemporanea, teatro e opera, con giovani artisti da tutto il mondo. Ambiente creativo e aperto: facile parlare italiano con gli altri partecipanti."
        }
      ],
      "aeroporto": "Firenze (FLR) o Roma (FCO)",
      "coord": [
        43.1,
        11.78
      ]
    },
    "Orbetello": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Laguna di Orbetello",
          "perche": "Oasi WWF, fenicotteri e birdwatching."
        },
        {
          "nome": "Monte Argentario",
          "perche": "Porto Ercole e Porto Santo Stefano."
        },
        {
          "nome": "Feniglia e Giannella",
          "perche": "I due tomboli di sabbia fra laguna e mare."
        }
      ],
      "eventi": [
        {
          "nome": "Sagre della laguna",
          "quando": "estate",
          "desc": "D'estate i paesi attorno alla laguna organizzano sagre di pesce, anguilla e bottarga, con tavolate all'aperto. Contesto genuino e conviviale: ottimo per il lessico del pesce e della cucina locale."
        },
        {
          "nome": "Palio marinaro dell'Argentario",
          "quando": "15 agosto",
          "desc": "Il 15 agosto i rioni di Porto Santo Stefano si sfidano a remi nel golfo, davanti a tutto il paese. Gara antica e molto sentita: perfetta per il tifo e il lessico del mare."
        }
      ],
      "aeroporto": "Roma (FCO)",
      "coord": [
        42.44,
        11.21
      ]
    },
    "Modena": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "Duomo, Ghirlandina e Piazza Grande",
          "perche": "Il romanico UNESCO di Lanfranco e Wiligelmo."
        },
        {
          "nome": "Museo Enzo Ferrari",
          "perche": "La Motor Valley comincia qui."
        },
        {
          "nome": "Mercato Albinelli",
          "perche": "Aceto balsamico, tortellini, Lambrusco."
        }
      ],
      "eventi": [
        {
          "nome": "Motor Valley Fest",
          "quando": "primavera",
          "desc": "In primavera Modena celebra la terra di Ferrari, Lamborghini e Ducati con esposizioni, prove in pista e incontri. Ideale per il lessico dei motori e dell'ingegneria, e per l'entusiasmo emiliano."
        },
        {
          "nome": "Festival della Filosofia",
          "quando": "settembre",
          "desc": "A settembre Modena, Carpi e Sassuolo ospitano lezioni pubbliche gratuite di filosofi da tutto il mondo. Per studenti avanzati è la palestra ideale per l'italiano del pensiero e del dibattito."
        }
      ],
      "aeroporto": "Bologna (BLQ)",
      "coord": [
        44.65,
        10.93
      ]
    },
    "Rimini": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "Tempio Malatestiano",
          "perche": "L'Alberti e Piero della Francesca."
        },
        {
          "nome": "Borgo San Giuliano",
          "perche": "I murales felliniani e il ponte di Tiberio."
        },
        {
          "nome": "La spiaggia",
          "perche": "15 km di riviera, la macchina del divertimento."
        }
      ],
      "eventi": [
        {
          "nome": "La Notte Rosa",
          "quando": "inizio luglio",
          "desc": "A inizio luglio tutta la riviera romagnola resta sveglia una notte intera, fra concerti gratuiti, fuochi e spiagge aperte. Caos allegro: perfetto per l'italiano informale e per conoscere gente."
        },
        {
          "nome": "Meeting di Rimini",
          "quando": "agosto",
          "desc": "Ad agosto la fiera ospita una settimana di incontri, mostre e dibattiti con ospiti da tutto il mondo. Per studenti avanzati è ottimo per l'italiano del confronto e delle idee."
        }
      ],
      "aeroporto": "Rimini (RMI) o Bologna (BLQ)",
      "coord": [
        44.06,
        12.57
      ]
    },
    "Verona": {
      "regione": "Veneto",
      "top3": [
        {
          "nome": "Arena di Verona",
          "perche": "L'anfiteatro romano che d'estate diventa teatro d'opera."
        },
        {
          "nome": "Casa di Giulietta e piazza delle Erbe",
          "perche": "Il mito shakespeariano nel foro romano."
        },
        {
          "nome": "Castelvecchio",
          "perche": "Il museo allestito da Carlo Scarpa."
        }
      ],
      "eventi": [
        {
          "nome": "Stagione lirica areniana",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre l'Arena romana ospita opere liriche davanti a quindicimila spettatori, con il cuscino e la candela accesa. Esperienza unica: ottima per il lessico dell'opera."
        },
        {
          "nome": "Vinitaly",
          "quando": "aprile",
          "desc": "Ad aprile la fiera del vino più importante d'Italia riempie Verona di produttori e buyer da tutto il mondo. Utile per il lessico del vino e per sentire l'italiano commerciale."
        },
        {
          "nome": "Verona in Love",
          "quando": "febbraio",
          "desc": "Attorno a San Valentino la città di Giulietta si riempie di installazioni, mercatini e concerti a tema. Occasione leggera: buona per il lessico dei sentimenti e per l'italiano di tutti i giorni."
        },
        {
          "nome": "Tocatì, festival dei giochi di strada",
          "quando": "settembre",
          "desc": "A settembre le piazze di Verona si riempiono di giochi tradizionali da tutta Europa, da provare gratis. Contesto ludico e informale: perfetto per imparare verbi d'azione e regole in italiano."
        }
      ],
      "aeroporto": "Verona (VRN)",
      "coord": [
        45.44,
        10.99
      ]
    },
    "Urbania": {
      "regione": "Marche",
      "top3": [
        {
          "nome": "Urbino",
          "perche": "Il Palazzo Ducale di Federico da Montefeltro, a 20 minuti."
        },
        {
          "nome": "Ceramiche di Casteldurante",
          "perche": "La maiolica rinascimentale ancora in bottega."
        },
        {
          "nome": "Barco Ducale e il Metauro",
          "perche": "La campagna marchigiana dei duchi."
        }
      ],
      "eventi": [
        {
          "nome": "Festa Nazionale della Befana",
          "quando": "primi di gennaio",
          "desc": "Nei primi giorni di gennaio Urbania diventa la casa ufficiale della Befana, con calze giganti, mercatini e la vecchietta che scende dalla torre. Perfetta per il lessico delle feste e per i modi di dire."
        }
      ],
      "aeroporto": "Rimini (RMI) o Ancona (AOI)",
      "coord": [
        43.67,
        12.52
      ]
    },
    "Padova": {
      "regione": "Veneto",
      "top3": [
        {
          "nome": "Cappella degli Scrovegni",
          "perche": "Giotto: prenotare, l'ingresso è contingentato."
        },
        {
          "nome": "Basilica del Santo",
          "perche": "Meta di pellegrinaggio da otto secoli."
        },
        {
          "nome": "Prato della Valle e Orto Botanico",
          "perche": "La piazza ellittica e il giardino UNESCO del 1545."
        }
      ],
      "eventi": [
        {
          "nome": "Festa di Sant'Antonio",
          "quando": "13 giugno",
          "desc": "Il 13 giugno Padova si riempie di pellegrini per il santo più amato d'Italia, con processione e messe tutto il giorno. Occasione per il lessico religioso e per vedere quanto conta Sant'Antonio qui."
        },
        {
          "nome": "Sherwood Festival",
          "quando": "giugno–luglio",
          "desc": "Fra giugno e luglio il festival porta concerti, dibattiti e cucina all'aperto per settimane, con un pubblico universitario. Ambiente giovane e informale: perfetto per l'italiano colloquiale."
        }
      ],
      "aeroporto": "Venezia (VCE)",
      "coord": [
        45.41,
        11.88
      ]
    },
    "Bolzano": {
      "regione": "Alto Adige",
      "top3": [
        {
          "nome": "Museo Archeologico e Ötzi",
          "perche": "L'uomo venuto dal ghiaccio."
        },
        {
          "nome": "Passeggiate e funivia del Renon",
          "perche": "Le montagne sopra la città in venti minuti."
        },
        {
          "nome": "Piazza Walther e i portici",
          "perche": "Il bilinguismo che si tocca: perfetto per chi studia le lingue."
        }
      ],
      "eventi": [
        {
          "nome": "Mercatini di Natale",
          "quando": "dicembre",
          "desc": "Da fine novembre Piazza Walther diventa il mercatino di Natale più famoso d'Italia, tra vin brulé e artigianato altoatesino. Contesto bilingue italiano-tedesco: curioso da vivere mentre studi."
        },
        {
          "nome": "Bolzano Film Festival",
          "quando": "aprile",
          "desc": "Ad aprile il festival porta cinema indipendente dall'area alpina, spesso in lingua originale con sottotitoli. Ottimo allenamento all'ascolto e occasione per parlare di film in italiano."
        },
        {
          "nome": "Südtirol Jazz Festival",
          "quando": "giugno–luglio",
          "desc": "Fra giugno e luglio il jazz si suona in rifugi, cantine e piazze di tutto l'Alto Adige, spesso gratis. Pubblico internazionale e rilassato: facile attaccare bottone in italiano."
        }
      ],
      "aeroporto": "Bolzano (BZO) o Verona (VRN)",
      "coord": [
        46.5,
        11.35
      ]
    },
    "Merano": {
      "regione": "Alto Adige",
      "top3": [
        {
          "nome": "Terme di Merano",
          "perche": "La città termale asburgica."
        },
        {
          "nome": "Passeggiata Tappeiner",
          "perche": "Sentiero panoramico fra vigneti e palme."
        },
        {
          "nome": "Giardini di Castel Trauttmansdorff",
          "perche": "Uno dei giardini botanici più belli d'Europa."
        }
      ],
      "eventi": [
        {
          "nome": "Merano WineFestival",
          "quando": "novembre",
          "desc": "A novembre i portici e il Kurhaus ospitano una delle rassegne enologiche più selettive d'Italia, con produttori da tutto il Paese. Perfetto per il lessico del vino, dei sapori e della degustazione."
        },
        {
          "nome": "Settimane Musicali Meranesi",
          "quando": "fine agosto–settembre",
          "desc": "Fra fine agosto e settembre orchestre internazionali suonano nel Kursaal liberty di Merano. Pubblico elegante e attento: buona occasione per l'italiano formale e il lessico musicale."
        },
        {
          "nome": "Gran Premio ippico di Merano",
          "quando": "settembre",
          "desc": "A settembre l'ippodromo di Maia ospita una delle corse a ostacoli più importanti d'Europa. Giornata di festa e scommesse: utile per i numeri, il lessico sportivo e l'italiano parlato in fretta."
        }
      ],
      "aeroporto": "Bolzano (BZO) o Verona (VRN)",
      "coord": [
        46.67,
        11.16
      ]
    },
    "Lignano Sabbiadoro": {
      "regione": "Friuli-Venezia Giulia",
      "top3": [
        {
          "nome": "La spiaggia",
          "perche": "8 km di sabbia dorata sull'Adriatico."
        },
        {
          "nome": "Laguna di Marano",
          "perche": "Gite in barca fra casoni e riserve naturali."
        },
        {
          "nome": "Aquileia",
          "perche": "La città romana e i mosaici UNESCO, a mezz'ora."
        }
      ],
      "eventi": [
        {
          "nome": "Stagione balneare",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre Lignano si riempie di famiglie e giovani, tra spiaggia, sport e locali sul lungomare. Ambiente informale e molto frequentato: ottimo per socializzare in italiano."
        }
      ],
      "aeroporto": "Venezia (VCE) o Trieste (TRS)",
      "coord": [
        45.68,
        13.14
      ]
    },
    "Reggio Emilia": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "Sala del Tricolore",
          "perche": "Dove è nata la bandiera italiana nel 1797."
        },
        {
          "nome": "Piazza Prampolini e il Duomo",
          "perche": "Il salotto della città."
        },
        {
          "nome": "Teatro Municipale Valli",
          "perche": "Uno dei teatri all'italiana più eleganti."
        }
      ],
      "eventi": [
        {
          "nome": "Fotografia Europea",
          "quando": "primavera",
          "desc": "In primavera palazzi e chiostri di Reggio ospitano mostre fotografiche da tutta Europa, con incontri e visite guidate. Ottimo per il lessico dell'immagine e per parlare d'arte in italiano."
        },
        {
          "nome": "Festival Aperto",
          "quando": "autunno",
          "desc": "In autunno teatro, danza e musica contemporanea animano i teatri storici della città. Programmazione di ricerca: buona per un italiano colto e per il lessico dello spettacolo."
        }
      ],
      "aeroporto": "Bologna (BLQ)",
      "coord": [
        44.7,
        10.63
      ]
    },
    "Ravenna": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "San Vitale e Galla Placidia",
          "perche": "I mosaici bizantini UNESCO più belli d'Occidente."
        },
        {
          "nome": "Sant'Apollinare Nuovo e in Classe",
          "perche": "Le processioni d'oro del VI secolo."
        },
        {
          "nome": "Tomba di Dante",
          "perche": "Il poeta riposa qui, non a Firenze."
        }
      ],
      "eventi": [
        {
          "nome": "Ravenna Festival",
          "quando": "giugno–luglio",
          "desc": "Fra giugno e luglio opera, musica sinfonica e teatro riempiono basiliche e chiostri bizantini. Cornice unica: ottima per il lessico musicale e per un italiano colto e formale."
        },
        {
          "nome": "Settembre Dantesco",
          "quando": "settembre",
          "desc": "A settembre Ravenna ricorda Dante, che qui è sepolto, con letture della Commedia, concerti e cerimonie. Occasione preziosa per l'italiano letterario e per capire il rapporto del Paese col suo poeta."
        },
        {
          "nome": "La Notte d'Oro",
          "quando": "ottobre",
          "desc": "A ottobre musei, mosaici e monumenti restano aperti fino a notte, con concerti e visite gratuite. Serata cittadina e informale: perfetta per girare e chiacchierare in italiano."
        }
      ],
      "aeroporto": "Bologna (BLQ) o Rimini (RMI)",
      "coord": [
        44.42,
        12.2
      ]
    },
    "Bagno di Romagna": {
      "regione": "Emilia-Romagna",
      "top3": [
        {
          "nome": "Le Terme",
          "perche": "Acque calde note dai tempi dei Romani."
        },
        {
          "nome": "Foreste Casentinesi",
          "perche": "Il parco nazionale alle porte del paese."
        },
        {
          "nome": "Il borgo",
          "perche": "Un paese termale d'Appennino, lento e autentico."
        }
      ],
      "eventi": [
        {
          "nome": "Sagre d'autunno",
          "quando": "autunno",
          "desc": "In autunno i borghi dell'Appennino romagnolo si riempiono di sagre dedicate a tartufo, castagne e funghi. Tavolate lunghe e clima familiare: il posto migliore per il lessico del cibo e del bosco."
        }
      ],
      "aeroporto": "Bologna (BLQ) o Firenze (FLR)",
      "coord": [
        43.83,
        11.96
      ]
    },
    "Arezzo": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Affreschi di Piero della Francesca",
          "perche": "La Leggenda della Vera Croce in San Francesco."
        },
        {
          "nome": "Piazza Grande e la Pieve",
          "perche": "La piazza in pendenza del film 'La vita è bella'."
        },
        {
          "nome": "Fiera Antiquaria",
          "perche": "Ogni primo weekend del mese, dal 1968."
        }
      ],
      "eventi": [
        {
          "nome": "Giostra del Saracino",
          "quando": "giugno e settembre",
          "desc": "Due volte l'anno i quattro quartieri di Arezzo si sfidano in una giostra cavalleresca in Piazza Grande, con costumi e sbandieratori. Rievocazione appassionata: ottima per il lessico storico e per il tifo di quartiere."
        }
      ],
      "aeroporto": "Firenze (FLR)",
      "coord": [
        43.46,
        11.88
      ]
    },
    "Assisi": {
      "regione": "Umbria",
      "top3": [
        {
          "nome": "Basilica di San Francesco",
          "perche": "Giotto e Cimabue sulla vita del santo."
        },
        {
          "nome": "Rocca Maggiore",
          "perche": "La fortezza che domina la valle umbra."
        },
        {
          "nome": "Eremo delle Carceri",
          "perche": "Il bosco del silenzio sul monte Subasio."
        }
      ],
      "eventi": [
        {
          "nome": "Calendimaggio",
          "quando": "maggio",
          "desc": "A maggio Assisi torna al Medioevo: la parte di sopra e quella di sotto si sfidano in cortei, canti e prove, e la città si illumina di torce. Spettacolare per il lessico storico e musicale."
        },
        {
          "nome": "Festa di San Francesco",
          "quando": "4 ottobre",
          "desc": "Il 4 ottobre l'Italia intera guarda ad Assisi per la festa del patrono nazionale, con celebrazioni e pellegrini da tutto il mondo. Occasione per il lessico religioso e per un italiano formale e solenne."
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)",
      "coord": [
        43.07,
        12.62
      ]
    },
    "Orvieto": {
      "regione": "Umbria",
      "top3": [
        {
          "nome": "Duomo di Orvieto",
          "perche": "La facciata d'oro e la cappella di Luca Signorelli."
        },
        {
          "nome": "Pozzo di San Patrizio",
          "perche": "La doppia elica del Cinquecento."
        },
        {
          "nome": "Orvieto sotterranea",
          "perche": "Grotte e cunicoli etruschi sotto la rupe."
        }
      ],
      "eventi": [
        {
          "nome": "Umbria Jazz Winter",
          "quando": "dicembre–gennaio",
          "desc": "Fra Natale e Capodanno il jazz riempie teatri, palazzi e piazze di Orvieto, fino al concerto di fine anno. Città piccola e festival intenso: facile incontrare le stesse persone e fare conversazione."
        },
        {
          "nome": "Corpus Domini col corteo storico",
          "quando": "giugno",
          "desc": "A giugno quattrocento figuranti in costume medievale accompagnano la processione del Corpus Domini per le vie di Orvieto. Colpo d'occhio spettacolare: buono per il lessico storico e religioso."
        }
      ],
      "aeroporto": "Roma (FCO)",
      "coord": [
        42.72,
        12.11
      ]
    },
    "Todi": {
      "regione": "Umbria",
      "top3": [
        {
          "nome": "Piazza del Popolo",
          "perche": "Una delle piazze medievali più armoniose d'Italia."
        },
        {
          "nome": "Tempio della Consolazione",
          "perche": "Il capolavoro rinascimentale fuori le mura."
        },
        {
          "nome": "San Fortunato",
          "perche": "La scalinata e il panorama sulla valle del Tevere."
        }
      ],
      "eventi": [
        {
          "nome": "Todi Festival",
          "quando": "fine agosto",
          "desc": "A fine agosto il borgo si riempie di teatro, musica e danza, con spettacoli nelle piazze e nei palazzi. Dimensione raccolta: facile incrociare artisti e pubblico e attaccare discorso."
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)",
      "coord": [
        42.78,
        12.41
      ]
    },
    "Recanati": {
      "regione": "Marche",
      "top3": [
        {
          "nome": "Casa Leopardi e la biblioteca",
          "perche": "La casa del poeta, con la biblioteca del padre."
        },
        {
          "nome": "Il colle dell'Infinito",
          "perche": "La siepe e il panorama della poesia più famosa d'Italia."
        },
        {
          "nome": "Villa Colloredo Mels",
          "perche": "Le opere di Lorenzo Lotto."
        }
      ],
      "eventi": [
        {
          "nome": "Lunaria",
          "quando": "luglio",
          "desc": "A luglio concerti e spettacoli riempiono la piazza di Recanati sotto le stelle, nel paese di Leopardi. Cornice raccolta e poetica: bella per il lessico della musica e della poesia."
        },
        {
          "nome": "Celebrazioni leopardiane",
          "quando": "29 giugno",
          "desc": "Il 29 giugno Recanati ricorda Giacomo Leopardi con letture, incontri e visite ai luoghi dell'Infinito. Occasione preziosa per l'italiano letterario e per uno dei poeti più amati del Paese."
        }
      ],
      "aeroporto": "Ancona (AOI)",
      "coord": [
        43.4,
        13.55
      ]
    },
    "Tuscania": {
      "regione": "Lazio",
      "top3": [
        {
          "nome": "San Pietro e Santa Maria Maggiore",
          "perche": "Il romanico più puro del Lazio, su un colle etrusco."
        },
        {
          "nome": "Necropoli etrusche",
          "perche": "I sarcofagi della famiglia dei Curunas."
        },
        {
          "nome": "Lago di Bolsena",
          "perche": "Il grande lago vulcanico a mezz'ora."
        }
      ],
      "eventi": [
        {
          "nome": "Sagre della Tuscia",
          "quando": "estate",
          "desc": "D'estate i borghi della Tuscia si susseguono con sagre di pesce di lago, olio e vino, spesso nelle piazze medievali. Contesto genuino: perfetto per il lessico del cibo e per l'italiano informale."
        }
      ],
      "aeroporto": "Roma (FCO)",
      "coord": [
        42.42,
        11.87
      ]
    },
    "San Giovanni Valdarno": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Palazzo d'Arnolfo",
          "perche": "Il museo delle Terre Nuove nel palazzo trecentesco."
        },
        {
          "nome": "Basilica e l'Annunciazione",
          "perche": "La tavola del Beato Angelico."
        },
        {
          "nome": "Casa di Masaccio",
          "perche": "La città natale del padre del Rinascimento in pittura."
        }
      ],
      "eventi": [
        {
          "nome": "Perdono di San Giovanni",
          "quando": "settembre",
          "desc": "A settembre la città celebra il perdono con fiera, giostre, bancarelle e fuochi, come si fa da secoli. Festa di paese autentica: ideale per il lessico delle tradizioni e per l'italiano informale."
        }
      ],
      "aeroporto": "Firenze (FLR)",
      "coord": [
        43.57,
        11.53
      ]
    },
    "Trento": {
      "regione": "Trentino",
      "top3": [
        {
          "nome": "Castello del Buonconsiglio",
          "perche": "Il ciclo dei Mesi di Torre Aquila."
        },
        {
          "nome": "MUSE",
          "perche": "Il museo delle scienze di Renzo Piano."
        },
        {
          "nome": "Piazza Duomo",
          "perche": "La città del Concilio, fra affreschi e portici."
        }
      ],
      "eventi": [
        {
          "nome": "Mercatini di Natale",
          "quando": "dicembre",
          "desc": "A dicembre Piazza Fiera si riempie di casette di legno, strudel e vin brulè ai piedi delle mura medievali. Atmosfera alpina: ottima per il lessico del Natale e del cibo invernale."
        },
        {
          "nome": "Festival dell'Economia",
          "quando": "maggio–giugno",
          "desc": "Fra maggio e giugno economisti e giornalisti da tutto il mondo tengono incontri pubblici gratuiti in città. Per studenti avanzati è ottimo per l'italiano dell'attualità e dei numeri."
        },
        {
          "nome": "Feste Vigiliane",
          "quando": "giugno",
          "desc": "A giugno Trento celebra il patrono con palio delle zattere sull'Adige, cortei in costume e mercati. Festa cittadina viva e poco turistica: buona per il lessico delle tradizioni."
        }
      ],
      "aeroporto": "Verona (VRN)",
      "coord": [
        46.07,
        11.12
      ]
    },
    "Riva del Garda": {
      "regione": "Trentino",
      "top3": [
        {
          "nome": "Il lago e la Rocca",
          "perche": "Il Garda trentino, fra vela e windsurf."
        },
        {
          "nome": "Bastione e panorami",
          "perche": "La funivia... a piedi: mezz'ora di salita, vista intera."
        },
        {
          "nome": "Cascata del Varone",
          "perche": "La forra scavata nella montagna."
        }
      ],
      "eventi": [
        {
          "nome": "Notte di Fiaba",
          "quando": "fine agosto",
          "desc": "A fine agosto Riva si trasforma per quattro giorni attorno a una fiaba diversa ogni anno, con spettacoli e fuochi sul lago. Festa per famiglie: perfetta per un italiano semplice e chiaro."
        },
        {
          "nome": "Musica Riva Festival",
          "quando": "luglio",
          "desc": "A luglio giovani musicisti da tutto il mondo suonano in concerti spesso gratuiti sul lungolago. Ambiente internazionale e informale: facile fare conversazione in italiano."
        }
      ],
      "aeroporto": "Verona (VRN)",
      "coord": [
        45.88,
        10.84
      ]
    },
    "Isola d'Elba": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Portoferraio e le ville di Napoleone",
          "perche": "I cento giorni prima dei Cento Giorni."
        },
        {
          "nome": "Monte Capanne",
          "perche": "In cabinovia fino al tetto dell'arcipelago."
        },
        {
          "nome": "Le spiagge",
          "perche": "Sansone, Fetovaia, Cavoli: acqua da Caraibi."
        }
      ],
      "eventi": [
        {
          "nome": "Stagione balneare",
          "quando": "maggio–settembre",
          "desc": "Da maggio a settembre l'isola vive sulle spiagge, tra stabilimenti, escursioni in barca e feste nei paesi. Contesto informale e rilassato: perfetto per l'italiano parlato di ogni giorno."
        },
        {
          "nome": "Elba Isola Musicale d'Europa",
          "quando": "settembre",
          "desc": "A settembre il festival porta musica da camera di livello internazionale in chiese, ville e piazze dell'isola. Ambiente raccolto e colto: buono per il lessico musicale e per l'italiano formale."
        }
      ],
      "aeroporto": "Pisa (PSA) + traghetto da Piombino",
      "coord": [
        42.81,
        10.31
      ]
    },
    "Reggio Calabria": {
      "regione": "Calabria",
      "top3": [
        {
          "nome": "Bronzi di Riace",
          "perche": "Al Museo Archeologico: i due guerrieri greci del V secolo a.C."
        },
        {
          "nome": "Lungomare Falcomatà",
          "perche": "'Il più bel chilometro d'Italia'."
        },
        {
          "nome": "Aspromonte",
          "perche": "Il parco nazionale sopra lo Stretto."
        }
      ],
      "eventi": [
        {
          "nome": "Festa della Madonna della Consolazione",
          "quando": "settembre",
          "desc": "A settembre il quadro della Madonna scende dal santuario in città accompagnato da migliaia di persone. La festa più sentita della Calabria: intensa e profondamente popolare."
        }
      ],
      "aeroporto": "Reggio Calabria (REG)",
      "coord": [
        38.11,
        15.65
      ]
    },
    "Cefalù": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Duomo di Cefalù",
          "perche": "Il Cristo Pantocratore arabo-normanno UNESCO."
        },
        {
          "nome": "La Rocca",
          "perche": "La salita al tempio di Diana, vista sul borgo."
        },
        {
          "nome": "Il porto vecchio e la spiaggia",
          "perche": "Il borgo marinaro del Gattopardo."
        }
      ],
      "eventi": [
        {
          "nome": "Festa del SS. Salvatore",
          "quando": "inizio agosto",
          "desc": "A inizio agosto Cefalù celebra il patrono per quattro giorni, con la 'ntinna a mare — un palo insaponato sopra l'acqua — processione e fuochi. Festa siciliana vera, ideale per il lessico delle tradizioni."
        }
      ],
      "aeroporto": "Palermo (PMO)",
      "coord": [
        38.04,
        14.02
      ]
    },
    "Trapani": {
      "regione": "Sicilia",
      "top3": [
        {
          "nome": "Centro storico e le saline",
          "perche": "La falce di terra fra due mari, coi mulini a vento."
        },
        {
          "nome": "Erice",
          "perche": "Il borgo medievale in funivia, sopra le nuvole."
        },
        {
          "nome": "Egadi",
          "perche": "Favignana e Levanzo in aliscafo."
        }
      ],
      "eventi": [
        {
          "nome": "Processione dei Misteri",
          "quando": "Pasqua",
          "desc": "Il Venerdì Santo venti gruppi scultorei attraversano Trapani per ventiquattro ore ininterrotte, portati a spalla. È una delle processioni più lunghe d'Europa: impressionante e identitaria."
        },
        {
          "nome": "Luglio Musicale Trapanese",
          "quando": "estate",
          "desc": "D'estate la Villa Margherita ospita opera, operetta e concerti all'aperto, con una tradizione di decenni. Serata popolare ed elegante insieme: buona per il lessico della lirica."
        },
        {
          "nome": "Cous Cous Fest a San Vito Lo Capo",
          "quando": "settembre",
          "desc": "A settembre San Vito Lo Capo, a un'ora da Trapani, ospita una gara internazionale di cous cous con concerti sulla spiaggia. Golosissimo: perfetto per il lessico del cibo e delle spezie."
        }
      ],
      "aeroporto": "Trapani (TPS) o Palermo (PMO)",
      "coord": [
        38.02,
        12.51
      ]
    },
    "Cagliari": {
      "regione": "Sardegna",
      "top3": [
        {
          "nome": "Il Castello",
          "perche": "Il quartiere alto, fra bastioni e torri pisane."
        },
        {
          "nome": "Museo Archeologico",
          "perche": "I giganti di Mont'e Prama e i bronzetti nuragici."
        },
        {
          "nome": "Il Poetto",
          "perche": "8 km di spiaggia cittadina, coi fenicotteri di Molentargius."
        }
      ],
      "eventi": [
        {
          "nome": "Festa di Sant'Efisio",
          "quando": "1 maggio",
          "desc": "Il 1° maggio migliaia di sardi in costume tradizionale accompagnano il santo lungo un corteo di chilometri. È la processione più grande del Mediterraneo: imperdibile per il lessico dei costumi e delle tradizioni."
        },
        {
          "nome": "Festa di San Saturnino",
          "quando": "fine ottobre",
          "desc": "A fine ottobre Cagliari ricorda il suo primo patrono con celebrazioni attorno alla basilica paleocristiana. Festa raccolta e cittadina: buona per il lessico religioso e per vedere la Cagliari dei cagliaritani."
        }
      ],
      "aeroporto": "Cagliari (CAG)",
      "coord": [
        39.22,
        9.12
      ]
    },
    "Olbia": {
      "regione": "Sardegna",
      "coord": [
        40.92,
        9.5
      ],
      "aeroporto": "Olbia Costa Smeralda (OLB)",
      "top3": [
        {
          "nome": "Basilica di San Simplicio",
          "perche": "Chiesa romanica in granito dell'XI secolo, il monumento più antico della Gallura."
        },
        {
          "nome": "Golfo di Olbia e Isola di Tavolara",
          "perche": "Un'ora di barca e ti trovi davanti a una montagna che esce dal mare."
        },
        {
          "nome": "Corso Umberto",
          "perche": "La passeggiata del centro: aperitivo, negozi e la vita quotidiana olbiese."
        }
      ],
      "eventi": [
        {
          "nome": "Festa di San Simplicio",
          "quando": "metà maggio",
          "desc": "A metà maggio Olbia festeggia il patrono per una settimana, tra processione, palio, poesia sarda e stand gastronomici. È la festa più sentita dell'anno: perfetta per il lessico delle tradizioni e per conoscere i sardi."
        },
        {
          "nome": "Sagra delle cozze",
          "quando": "estate",
          "desc": "Il golfo di Olbia vive di allevamenti di cozze e d'estate li celebra con degustazioni sul mare. Occasione golosa per il lessico del cibo, dei numeri e per imparare a ordinare al banco."
        },
        {
          "nome": "Estate olbiese",
          "quando": "giugno–settembre",
          "desc": "Da giugno a settembre concerti, cinema all'aperto e mercatini animano il molo Brin e le piazze del centro. Serate lunghe e informali, ideali per praticare l'italiano fuori dall'aula."
        }
      ],
      "guida": ""
    },
    "Alberobello": {
      "regione": "Puglia",
      "coord": [
        40.78,
        17.24
      ],
      "aeroporto": "Bari (BRI)",
      "top3": [
        {
          "nome": "Rione Monti",
          "perche": "Oltre mille trulli in fila sulla collina: patrimonio UNESCO, da girare la mattina presto."
        },
        {
          "nome": "Trullo Sovrano",
          "perche": "L'unico trullo a due piani, oggi museo: si capisce come si viveva davvero qui."
        },
        {
          "nome": "Rione Aia Piccola",
          "perche": "Il quartiere dei trulli ancora abitati: silenzioso, senza negozi, molto più autentico."
        }
      ],
      "eventi": [
        {
          "nome": "Festa dei Santi Medici Cosma e Damiano",
          "quando": "fine settembre",
          "desc": "A fine settembre Alberobello si accende di luminarie monumentali, bande musicali e processione per i santi patroni. La festa più importante dell'anno: perfetta per il lessico delle tradizioni pugliesi."
        },
        {
          "nome": "Alberobello Light Festival",
          "quando": "dicembre–gennaio",
          "desc": "Nelle settimane di Natale i trulli diventano schermi per proiezioni luminose e il paese si riempie di mercatini. Un modo suggestivo di vedere Alberobello fuori stagione, con meno turisti e più tempo per parlare."
        },
        {
          "nome": "Sagre della Valle d'Itria",
          "quando": "estate",
          "desc": "D'estate i paesi vicini — Locorotondo, Martina Franca, Cisternino — si susseguono con sagre di orecchiette, bombette e vino. Il contesto migliore per il lessico del cibo e per l'italiano informale a tavola."
        }
      ],
      "guida": ""
    },
    "La Maddalena": {
      "regione": "Sardegna",
      "coord": [
        41.21,
        9.41
      ],
      "aeroporto": "Olbia (OLB)",
      "top3": [
        {
          "nome": "Parco Nazionale dell'Arcipelago",
          "perche": "Sessanta isole di granito e acqua trasparente: il giro in barca è d'obbligo."
        },
        {
          "nome": "Caprera e il Compendio Garibaldino",
          "perche": "La casa dove Garibaldi visse e morì, a pochi minuti di bici dal centro."
        },
        {
          "nome": "Giro in barca tra Budelli, Spargi e Santa Maria",
          "perche": "Una giornata in gommone tra cale deserte: si prenota al porto la mattina."
        }
      ],
      "eventi": [
        {
          "nome": "Festa di Santa Maria Maddalena",
          "quando": "22 luglio",
          "desc": "Il 22 luglio l'isola festeggia la patrona con processione a mare, barche addobbate e fuochi d'artificio. Festa profondamente locale: ottima per il lessico delle tradizioni marinare."
        },
        {
          "nome": "Regate nell'arcipelago",
          "quando": "primavera–estate",
          "desc": "Tra primavera ed estate l'arcipelago ospita regate veliche di ogni livello e il porto si riempie di equipaggi. Utile per il lessico della vela, del mare e del meteo."
        },
        {
          "nome": "Estate maddalenina",
          "quando": "giugno–settembre",
          "desc": "D'estate concerti, cinema all'aperto e mercatini animano piazza Umberto I e il lungomare fino a notte. Serate informali, ideali per chiacchierare con gli isolani."
        }
      ],
      "guida": ""
    },
    "Grottaglie": {
      "regione": "Puglia",
      "coord": [
        40.53,
        17.43
      ],
      "aeroporto": "Brindisi (BDS)",
      "top3": [
        {
          "nome": "Quartiere delle Ceramiche",
          "perche": "Decine di botteghe scavate nella roccia: si entra, si guarda tornire, si compra."
        },
        {
          "nome": "Castello Episcopio e Museo della Ceramica",
          "perche": "Nelle cantine del castello, otto secoli di ceramica grottagliese."
        },
        {
          "nome": "Gravina di Riggio e le chiese rupestri",
          "perche": "Un canyon con cascata e cripte affrescate, a pochi minuti dal centro."
        }
      ],
      "eventi": [
        {
          "nome": "Mostra della Ceramica",
          "quando": "agosto",
          "desc": "Ad agosto il castello ospita la storica mostra-concorso della ceramica, con opere dei maestri locali e dimostrazioni al tornio. Perfetta per il lessico dell'artigianato e dei materiali."
        },
        {
          "nome": "Festa di San Ciro",
          "quando": "31 gennaio",
          "desc": "Il 31 gennaio Grottaglie celebra il patrono con processione, luminarie e bancarelle nel freddo dell'inverno pugliese. Una festa vera, senza turisti: ottima per ascoltare l'italiano quotidiano del Sud."
        },
        {
          "nome": "Presepi e Natale nelle grotte",
          "quando": "dicembre–gennaio",
          "desc": "A dicembre le grotte e le botteghe del quartiere ceramico ospitano presepi artistici e mercatini. Occasione ideale per il lessico del Natale e delle tradizioni religiose."
        }
      ],
      "guida": ""
    }
  }
};
