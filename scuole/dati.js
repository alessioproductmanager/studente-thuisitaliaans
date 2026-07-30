// Database soggiorni linguistici — thuisitaliaans.com
// UNICA FONTE DI VERITÀ: genera_sito.py legge da qui e produce tutte le pagine.
const DATI = {
  "aggiornato_il": "2026-07-30",
  "nota": "Date, prezzi, email e parte degli accreditamenti sono SEGNAPOSTO finché stato_dati non passa a 'verificato'. Il badge ASILS è presente solo dove verificato sugli elenchi ufficiali. Usare verifica_scuole.py e COME_SI_AGGIORNA.txt.",
  "scuole": [
    {
      "id": "scuola-leonardo-da-vinci-firenze",
      "nome": "Scuola Leonardo da Vinci Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.scuolaleonardo.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "abc-firenze",
      "nome": "ABC Firenze",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.abcschool.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-fiorenza",
      "nome": "Centro Fiorenza",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.centrofiorenza.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-michelangelo",
      "nome": "Istituto Michelangelo",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "europass-italian-language-school",
      "nome": "Europass Italian Language School",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.europassitalian.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-machiavelli",
      "nome": "Centro Machiavelli",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.centromachiavelli.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "linguaviva",
      "nome": "Linguaviva",
      "citta": "Firenze",
      "regione": "Toscana",
      "sito": "https://www.linguaviva.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-del-giglio",
      "nome": "Accademia del Giglio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-toscana",
      "nome": "Scuola Toscana",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-il-david",
      "nome": "Istituto Il David",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "parola-italian-language-school",
      "nome": "Parola Italian Language School",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-lorenzo-de-medici-firenze",
      "nome": "Istituto Lorenzo de' Medici Firenze",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-lingua-italiana-calvino",
      "nome": "Centro Lingua Italiana Calvino",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-galilei",
      "nome": "Istituto Galilei",
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
      "note": "Specializzata in corsi individuali",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "sprachcaffe-firenze",
      "nome": "Sprachcaffe Firenze",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-europeo",
      "nome": "Istituto Europeo",
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
      "note": "Lingua e musica",
      "verificato_il": null,
      "stato_dati": "da_verificare"
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-europea-di-firenze",
      "nome": "Accademia Europea di Firenze",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-koine-firenze",
      "nome": "Centro Koinè Firenze",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-riaci",
      "nome": "Accademia Riaci",
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
      "note": "Lingua, arte e design",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "dilit-international-house",
      "nome": "Dilit International House",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.dilit.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "torre-di-babele",
      "nome": "Torre di Babele",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.torredibabele.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-leonardo-da-vinci-roma",
      "nome": "Scuola Leonardo da Vinci Roma",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.scuolaleonardo.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "studioitalia",
      "nome": "Studioitalia",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "kappa-language-school",
      "nome": "Kappa Language School",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scudit-scuola-d-italiano",
      "nome": "Scudit Scuola d'Italiano",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.scudit.net",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "ciao-italia",
      "nome": "Ciao Italia",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "italiaidea",
      "nome": "Italiaidea",
      "citta": "Roma",
      "regione": "Lazio",
      "sito": "https://www.italiaidea.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-d-italiano-dante-alighieri-roma",
      "nome": "Scuola d'Italiano Dante Alighieri Roma",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-lorenzo-de-medici-roma",
      "nome": "Istituto Lorenzo de' Medici Roma",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-italiano",
      "nome": "Istituto Italiano",
      "citta": "Roma",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-leonardo-da-vinci-milano",
      "nome": "Scuola Leonardo da Vinci Milano",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.scuolaleonardo.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "linguadue",
      "nome": "Linguadue",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.linguaviva.it",
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
      "note": "Gruppo Linguaviva",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "il-centro",
      "nome": "Il Centro",
      "citta": "Milano",
      "regione": "Lombardia",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "ellci-milano",
      "nome": "ELLCI Milano",
      "citta": "Milano",
      "regione": "Lombardia",
      "sito": "https://www.ellci.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "cultura-italiana-bologna",
      "nome": "Cultura Italiana Bologna",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://www.culturaitaliana.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "madrelingua",
      "nome": "Madrelingua",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
      "sito": "https://madrelinguaitaliano.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "alce-accademia-lingue-e-culture-europee",
      "nome": "ALCE Accademia Lingue e Culture Europee",
      "citta": "Bologna",
      "regione": "Emilia-Romagna",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-venezia",
      "nome": "Istituto Venezia",
      "citta": "Venezia",
      "regione": "Veneto",
      "sito": "https://www.istitutovenezia.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "easy-italian-language-art",
      "nome": "Easy Italian Language & Art",
      "citta": "Venezia",
      "regione": "Veneto",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "ca-foscari-school-for-international-education",
      "nome": "Ca' Foscari School for International Education",
      "citta": "Venezia",
      "regione": "Veneto",
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
      "note": "Corsi di italiano dell'Università Ca' Foscari",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "idea-verona",
      "nome": "Idea Verona",
      "citta": "Verona",
      "regione": "Veneto",
      "sito": "https://www.ideaverona.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "lingua-it",
      "nome": "Lingua IT",
      "citta": "Verona",
      "regione": "Veneto",
      "sito": "https://www.linguait.it",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "l-italiano-con-noi",
      "nome": "L'Italiano con Noi",
      "citta": "Verona",
      "regione": "Veneto",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "bertrand-russell",
      "nome": "Bertrand Russell",
      "citta": "Padova",
      "regione": "Veneto",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "piccola-universita-italiana-trieste",
      "nome": "Piccola Università Italiana Trieste",
      "citta": "Trieste",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.piccolauniversitaitaliana.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-venezia-trieste",
      "nome": "Istituto Venezia Trieste",
      "citta": "Trieste",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.istitutovenezia.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "linguaviva-lignano",
      "nome": "Linguaviva Lignano",
      "citta": "Lignano Sabbiadoro",
      "regione": "Friuli-Venezia Giulia",
      "sito": "https://www.linguaviva.it",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "alpha-beta-piccadilly-bolzano",
      "nome": "Alpha Beta Piccadilly Bolzano",
      "citta": "Bolzano",
      "regione": "Alto Adige",
      "sito": "https://www.alphabeta.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "alpha-beta-piccadilly-merano",
      "nome": "Alpha Beta Piccadilly Merano",
      "citta": "Merano",
      "regione": "Alto Adige",
      "sito": "https://www.alphabeta.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "clm-bell-trento",
      "nome": "CLM Bell Trento",
      "citta": "Trento",
      "regione": "Trentino",
      "sito": "https://www.clm-bell.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "clm-bell-riva-del-garda",
      "nome": "CLM Bell Riva del Garda",
      "citta": "Riva del Garda",
      "regione": "Trentino",
      "sito": "https://www.clm-bell.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "l-italiano-porticando",
      "nome": "L'Italiano Porticando",
      "citta": "Torino",
      "regione": "Piemonte",
      "sito": "https://www.italianoporticando.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "ciaoitaly-scuola-leonardo-da-vinci-torino",
      "nome": "CiaoItaly Scuola Leonardo da Vinci Torino",
      "citta": "Torino",
      "regione": "Piemonte",
      "sito": "https://www.scuolaleonardo.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "a-door-to-italy",
      "nome": "A Door to Italy",
      "citta": "Genova",
      "regione": "Liguria",
      "sito": "https://www.adoortoitaly.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-tricolore",
      "nome": "Scuola Tricolore",
      "citta": "Genova",
      "regione": "Liguria",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "abc-school-sestri-levante",
      "nome": "ABC School Sestri Levante",
      "citta": "Sestri Levante",
      "regione": "Liguria",
      "sito": "https://www.abcschool.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "omnilingua",
      "nome": "Omnilingua",
      "citta": "Sanremo",
      "regione": "Liguria",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "romanica",
      "nome": "Romanica",
      "citta": "Modena",
      "regione": "Emilia-Romagna",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "note": "Corsi in presenza e online",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "reggio-lingua",
      "nome": "Reggio Lingua",
      "citta": "Reggio Emilia",
      "regione": "Emilia-Romagna",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-palazzo-malvisi-ravenna",
      "nome": "Scuola Palazzo Malvisi Ravenna",
      "citta": "Ravenna",
      "regione": "Emilia-Romagna",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-palazzo-malvisi-bagno-di-romagna",
      "nome": "Scuola Palazzo Malvisi Bagno di Romagna",
      "citta": "Bagno di Romagna",
      "regione": "Emilia-Romagna",
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
      "note": "Lingua e benessere termale",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "tiberius-international",
      "nome": "Tiberius International",
      "citta": "Rimini",
      "regione": "Emilia-Romagna",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "societa-dante-alighieri-siena",
      "nome": "Società Dante Alighieri Siena",
      "citta": "Siena",
      "regione": "Toscana",
      "sito": "https://www.dantealighieri.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "saena-iulii",
      "nome": "Saena Iulii",
      "citta": "Siena",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "universita-per-stranieri-di-siena",
      "nome": "Università per Stranieri di Siena",
      "citta": "Siena",
      "regione": "Toscana",
      "sito": "https://www.unistrasi.it",
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
      "note": "Corsi di lingua dell'ateneo, sede degli esami CILS",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "cultura-italiana-arezzo",
      "nome": "Cultura Italiana Arezzo",
      "citta": "Arezzo",
      "regione": "Toscana",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "lucca-italian-school",
      "nome": "Lucca Italian School",
      "citta": "Lucca",
      "regione": "Toscana",
      "sito": "https://www.luccaitalianschool.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-koine-lucca",
      "nome": "Centro Koinè Lucca",
      "citta": "Lucca",
      "regione": "Toscana",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-linguistico-mediterraneo",
      "nome": "Istituto Linguistico Mediterraneo",
      "citta": "Pisa",
      "regione": "Toscana",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-culturale-giacomo-puccini",
      "nome": "Centro Culturale Giacomo Puccini",
      "citta": "Viareggio",
      "regione": "Toscana",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-leonardo-da-vinci-viareggio",
      "nome": "Scuola Leonardo da Vinci Viareggio",
      "citta": "Viareggio",
      "regione": "Toscana",
      "sito": "https://www.scuolaleonardo.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "il-sasso",
      "nome": "Il Sasso",
      "citta": "Montepulciano",
      "regione": "Toscana",
      "sito": "https://www.ilsasso.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "terramare",
      "nome": "Terramare",
      "citta": "Orbetello",
      "regione": "Toscana",
      "sito": "https://www.terramare.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-fiorenza-isola-d-elba",
      "nome": "Centro Fiorenza Isola d'Elba",
      "citta": "Isola d'Elba",
      "regione": "Toscana",
      "sito": "https://www.centrofiorenza.com",
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
      "note": "Sede estiva sull'isola",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "il-sillabo",
      "nome": "Il Sillabo",
      "citta": "San Giovanni Valdarno",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "comitato-linguistico",
      "nome": "Comitato Linguistico",
      "citta": "Perugia",
      "regione": "Umbria",
      "sito": "https://www.comitatolinguistico.com",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "universita-per-stranieri-di-perugia",
      "nome": "Università per Stranieri di Perugia",
      "citta": "Perugia",
      "regione": "Umbria",
      "sito": "https://www.unistrapg.it",
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
      "note": "L'ateneo storico per stranieri, sede degli esami CELI",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-lingua-italiana-assisi",
      "nome": "Accademia Lingua Italiana Assisi",
      "citta": "Assisi",
      "regione": "Umbria",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "lingua-si",
      "nome": "Lingua Sì",
      "citta": "Orvieto",
      "regione": "Umbria",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "la-lingua-la-vita",
      "nome": "La Lingua La Vita",
      "citta": "Todi",
      "regione": "Umbria",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-studi-italiani",
      "nome": "Centro Studi Italiani",
      "citta": "Urbania",
      "regione": "Marche",
      "sito": "https://www.centrostudiitaliani.org",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-dante-alighieri-campus-l-infinito",
      "nome": "Scuola Dante Alighieri Campus L'Infinito",
      "citta": "Recanati",
      "regione": "Marche",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "istituto-lorenzo-de-medici-tuscania",
      "nome": "Istituto Lorenzo de' Medici Tuscania",
      "citta": "Tuscania",
      "regione": "Lazio",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "centro-italiano",
      "nome": "Centro Italiano",
      "citta": "Napoli",
      "regione": "Campania",
      "sito": "https://www.centroitaliano.it",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "sant-anna-institute",
      "nome": "Sant'Anna Institute",
      "citta": "Sorrento",
      "regione": "Campania",
      "sito": "https://www.santannainstitute.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-italiana-salerno",
      "nome": "Accademia Italiana Salerno",
      "citta": "Salerno",
      "regione": "Campania",
      "sito": "https://www.accademia-italiana.it",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "accademia-leonardo",
      "nome": "Accademia Leonardo",
      "citta": "Salerno",
      "regione": "Campania",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "piccola-universita-italiana-tropea",
      "nome": "Piccola Università Italiana Tropea",
      "citta": "Tropea",
      "regione": "Calabria",
      "sito": "https://www.piccolauniversitaitaliana.com",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "caffe-italiano-club",
      "nome": "Caffè Italiano Club",
      "citta": "Tropea",
      "regione": "Calabria",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "universita-per-stranieri-dante-alighieri",
      "nome": "Università per Stranieri Dante Alighieri",
      "citta": "Reggio Calabria",
      "regione": "Calabria",
      "sito": "https://www.unistrada.it",
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
      "note": "Ateneo per stranieri della Calabria",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "porta-d-oriente",
      "nome": "Porta d'Oriente",
      "citta": "Otranto",
      "regione": "Puglia",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "babilonia-centro-di-lingua-e-cultura-italiana",
      "nome": "Babilonia Centro di Lingua e Cultura Italiana",
      "citta": "Taormina",
      "regione": "Sicilia",
      "sito": "https://www.babilonia.it",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "laboling",
      "nome": "Laboling",
      "citta": "Milazzo",
      "regione": "Sicilia",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "note": "Partner Università per Stranieri di Siena",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "solemar-academy",
      "nome": "Solemar Academy",
      "citta": "Cefalù",
      "regione": "Sicilia",
      "sito": "",
      "pagina_corsi": "",
      "email": "",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "solemar-sicilia",
      "nome": "Solemar Sicilia",
      "citta": "Palermo (Mondello)",
      "regione": "Sicilia",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "itastra-universita-di-palermo",
      "nome": "Itastra Università di Palermo",
      "citta": "Palermo",
      "regione": "Sicilia",
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
      "note": "Scuola di italiano per stranieri dell'Università di Palermo",
      "verificato_il": null,
      "stato_dati": "da_verificare"
    },
    {
      "id": "scuola-virgilio",
      "nome": "Scuola Virgilio",
      "citta": "Trapani",
      "regione": "Sicilia",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "pintadera-centro-mediterraneo",
      "nome": "Pintadera Centro Mediterraneo",
      "citta": "Alghero",
      "regione": "Sardegna",
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
      "stato_dati": "da_verificare"
    },
    {
      "id": "one-world-italiano",
      "nome": "One World Italiano",
      "citta": "Cagliari",
      "regione": "Sardegna",
      "sito": "https://www.oneworlditaliano.com",
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
      "stato_dati": "da_verificare"
    }
  ],
  "citta": {
    "Firenze": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Galleria degli Uffizi",
          "perche": "Botticelli, Leonardo e il Rinascimento in un solo palazzo."
        },
        {
          "nome": "Cupola del Brunelleschi e Duomo",
          "perche": "La salita fra le due calotte è una lezione di ingegneria del Quattrocento."
        },
        {
          "nome": "Oltrarno e Ponte Vecchio",
          "perche": "Botteghe artigiane, San Frediano, tramonto da piazzale Michelangelo."
        }
      ],
      "eventi": [
        {
          "nome": "Scoppio del Carro",
          "quando": "Pasqua"
        },
        {
          "nome": "Maggio Musicale Fiorentino",
          "quando": "aprile–giugno"
        }
      ],
      "aeroporto": "Firenze (FLR) o Pisa (PSA)"
    },
    "Roma": {
      "regione": "Lazio",
      "top3": [
        {
          "nome": "Colosseo e Fori Imperiali",
          "perche": "Il centro del mondo antico, da percorrere a piedi in mezza giornata."
        },
        {
          "nome": "Musei Vaticani e San Pietro",
          "perche": "Cappella Sistina e la cupola: prenotare sempre."
        },
        {
          "nome": "Pantheon e Trastevere",
          "perche": "La Roma che si vive la sera, fra piazze e trattorie."
        }
      ],
      "eventi": [
        {
          "nome": "Natale di Roma",
          "quando": "21 aprile"
        },
        {
          "nome": "Estate Romana",
          "quando": "giugno–settembre"
        }
      ],
      "aeroporto": "Roma Fiumicino (FCO)"
    },
    "Milano": {
      "regione": "Lombardia",
      "top3": [
        {
          "nome": "Duomo e terrazze",
          "perche": "Il gotico più teatrale d'Italia, visto da sopra."
        },
        {
          "nome": "Cenacolo di Leonardo",
          "perche": "L'Ultima Cena: biglietti mesi prima."
        },
        {
          "nome": "Brera e Navigli",
          "perche": "Pinacoteca di giorno, aperitivo sui canali la sera."
        }
      ],
      "eventi": [
        {
          "nome": "Fuorisalone / Design Week",
          "quando": "aprile"
        },
        {
          "nome": "Prima della Scala",
          "quando": "7 dicembre"
        }
      ],
      "aeroporto": "Milano Linate (LIN) o Malpensa (MXP)"
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
          "quando": "fine giugno"
        }
      ],
      "aeroporto": "Bologna (BLQ)"
    },
    "Venezia": {
      "regione": "Veneto",
      "top3": [
        {
          "nome": "Piazza San Marco e Palazzo Ducale",
          "perche": "Basilica, campanile e il palazzo della Serenissima."
        },
        {
          "nome": "Murano e Burano",
          "perche": "Vetro e case colorate: mezza giornata in vaporetto."
        },
        {
          "nome": "Cannaregio e il ghetto",
          "perche": "La Venezia dei veneziani, lontana dalla folla."
        }
      ],
      "eventi": [
        {
          "nome": "Carnevale",
          "quando": "gennaio–febbraio"
        },
        {
          "nome": "Festa del Redentore",
          "quando": "terzo weekend di luglio"
        }
      ],
      "aeroporto": "Venezia (VCE)"
    },
    "Siena": {
      "regione": "Toscana",
      "top3": [
        {
          "nome": "Piazza del Campo",
          "perche": "La conchiglia più bella d'Italia; salire sulla Torre del Mangia."
        },
        {
          "nome": "Duomo di Siena",
          "perche": "Il pavimento istoriato e la libreria Piccolomini."
        },
        {
          "nome": "Le contrade",
          "perche": "Musei di contrada e vita di rione: chiedere alla scuola una visita."
        }
      ],
      "eventi": [
        {
          "nome": "Palio di Siena",
          "quando": "2 luglio e 16 agosto"
        }
      ],
      "aeroporto": "Firenze (FLR) o Pisa (PSA)"
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
          "quando": "luglio"
        },
        {
          "nome": "Eurochocolate",
          "quando": "autunno"
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)"
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
          "quando": "maggio"
        }
      ],
      "aeroporto": "Torino (TRN) o Milano (MXP)"
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
          "quando": "primavera e autunno"
        }
      ],
      "aeroporto": "Genova (GOA)"
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
          "quando": "giugno"
        }
      ],
      "aeroporto": "Genova (GOA) o Pisa (PSA)"
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
          "quando": "febbraio"
        }
      ],
      "aeroporto": "Nizza (NCE) o Genova (GOA)"
    },
    "Napoli": {
      "regione": "Campania",
      "top3": [
        {
          "nome": "Spaccanapoli e Napoli sotterranea",
          "perche": "La città greco-romana sotto i vicoli."
        },
        {
          "nome": "Museo Archeologico Nazionale",
          "perche": "I tesori di Pompei ed Ercolano."
        },
        {
          "nome": "Pompei e il Vesuvio",
          "perche": "In Circumvesuviana, gita di un giorno."
        }
      ],
      "eventi": [
        {
          "nome": "Maggio dei Monumenti",
          "quando": "maggio"
        }
      ],
      "aeroporto": "Napoli (NAP)"
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
          "quando": "estate"
        }
      ],
      "aeroporto": "Napoli (NAP)"
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
          "quando": "novembre–gennaio"
        }
      ],
      "aeroporto": "Napoli (NAP)"
    },
    "Tropea": {
      "regione": "Calabria",
      "top3": [
        {
          "nome": "Santa Maria dell'Isola",
          "perche": "Il santuario sullo scoglio, icona della Calabria."
        },
        {
          "nome": "Centro storico a picco sul mare",
          "perche": "Palazzi nobiliari e affacci sul Tirreno."
        },
        {
          "nome": "Capo Vaticano",
          "perche": "Spiagge e tramonti sulle Eolie."
        }
      ],
      "eventi": [
        {
          "nome": "Feste patronali d'estate",
          "quando": "estate"
        }
      ],
      "aeroporto": "Lamezia Terme (SUF)"
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
          "quando": "ottobre"
        }
      ],
      "aeroporto": "Trieste (TRS) o Venezia (VCE)"
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
          "quando": "giugno–luglio"
        }
      ],
      "aeroporto": "Catania (CTA)"
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
          "quando": "estate"
        }
      ],
      "aeroporto": "Catania (CTA) o Palermo (PMO)"
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
          "quando": "metà luglio"
        }
      ],
      "aeroporto": "Palermo (PMO)"
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
          "quando": "metà luglio"
        }
      ],
      "aeroporto": "Palermo (PMO)"
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
          "quando": "Pasqua"
        }
      ],
      "aeroporto": "Alghero (AHO)"
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
          "quando": "dicembre–gennaio"
        }
      ],
      "aeroporto": "Brindisi (BDS)"
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
          "quando": "febbraio"
        },
        {
          "nome": "Festival Puccini",
          "quando": "luglio–agosto"
        }
      ],
      "aeroporto": "Pisa (PSA)"
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
          "quando": "giugno–luglio"
        },
        {
          "nome": "Lucca Comics & Games",
          "quando": "fine ottobre"
        }
      ],
      "aeroporto": "Pisa (PSA)"
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
          "quando": "16 giugno"
        }
      ],
      "aeroporto": "Pisa (PSA)"
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
          "quando": "ultima domenica di agosto"
        }
      ],
      "aeroporto": "Firenze (FLR) o Roma (FCO)"
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
          "quando": "estate"
        }
      ],
      "aeroporto": "Roma (FCO)"
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
          "quando": "primavera"
        }
      ],
      "aeroporto": "Bologna (BLQ)"
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
          "quando": "inizio luglio"
        }
      ],
      "aeroporto": "Rimini (RMI) o Bologna (BLQ)"
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
          "quando": "giugno–settembre"
        },
        {
          "nome": "Vinitaly",
          "quando": "aprile"
        }
      ],
      "aeroporto": "Verona (VRN)"
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
          "quando": "primi di gennaio"
        }
      ],
      "aeroporto": "Rimini (RMI) o Ancona (AOI)"
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
          "quando": "13 giugno"
        }
      ],
      "aeroporto": "Venezia (VCE)"
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
          "quando": "dicembre"
        }
      ],
      "aeroporto": "Bolzano (BZO) o Verona (VRN)"
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
          "quando": "novembre"
        }
      ],
      "aeroporto": "Bolzano (BZO) o Verona (VRN)"
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
          "quando": "giugno–settembre"
        }
      ],
      "aeroporto": "Venezia (VCE) o Trieste (TRS)"
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
          "quando": "primavera"
        }
      ],
      "aeroporto": "Bologna (BLQ)"
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
          "quando": "giugno–luglio"
        }
      ],
      "aeroporto": "Bologna (BLQ) o Rimini (RMI)"
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
          "quando": "autunno"
        }
      ],
      "aeroporto": "Bologna (BLQ) o Firenze (FLR)"
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
          "quando": "giugno e settembre"
        }
      ],
      "aeroporto": "Firenze (FLR)"
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
          "quando": "maggio"
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)"
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
          "quando": "dicembre–gennaio"
        }
      ],
      "aeroporto": "Roma (FCO)"
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
          "quando": "fine agosto"
        }
      ],
      "aeroporto": "Perugia (PEG) o Roma (FCO)"
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
          "quando": "luglio"
        }
      ],
      "aeroporto": "Ancona (AOI)"
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
          "quando": "estate"
        }
      ],
      "aeroporto": "Roma (FCO)"
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
          "quando": "settembre"
        }
      ],
      "aeroporto": "Firenze (FLR)"
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
          "quando": "dicembre"
        }
      ],
      "aeroporto": "Verona (VRN)"
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
          "quando": "fine agosto"
        }
      ],
      "aeroporto": "Verona (VRN)"
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
          "quando": "maggio–settembre"
        }
      ],
      "aeroporto": "Pisa (PSA) + traghetto da Piombino"
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
          "quando": "settembre"
        }
      ],
      "aeroporto": "Reggio Calabria (REG)"
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
          "quando": "inizio agosto"
        }
      ],
      "aeroporto": "Palermo (PMO)"
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
          "quando": "Pasqua"
        }
      ],
      "aeroporto": "Trapani (TPS) o Palermo (PMO)"
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
          "quando": "1 maggio"
        }
      ],
      "aeroporto": "Cagliari (CAG)"
    }
  }
};
