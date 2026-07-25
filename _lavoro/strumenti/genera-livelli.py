#!/usr/bin/env python3
# genera-livelli.py — costruisce le sei pagine livello A1–C2.
#
# Uso:  python3 genera-livelli.py
# Output: libri-italiano-facile-{a1..c2}.html
#
# Per aggiungere un romanzo a un livello, modifica la lista "libri"
# del livello corrispondente qui sotto e rilancia lo script.

import html, pathlib

SITO = "https://thuisitaliaans.com"

LIVELLI = {
    "A1": {
        "titolo": "Principiante assoluto",
        "occhiello": "Si parte da zero",
        "sintesi": "Capisci e usi espressioni quotidiane e frasi molto semplici. "
                   "Sai presentarti, fare domande basilari su dove abiti, chi conosci "
                   "e cosa possiedi, e rispondere allo stesso tipo di domande.",
        "grammatica": [
            "Articoli determinativi e indeterminativi",
            "Genere e numero dei nomi",
            "Presente indicativo: essere, avere, verbi regolari in -are, -ere, -ire",
            "Preposizioni semplici e i primi usi di a, in, di, da",
            "Aggettivi qualificativi e concordanza",
            "Numeri, ora, giorni e mesi",
            "C'è / ci sono, questo / quello",
        ],
        "sai_fare": [
            "Presentarti e dire da dove vieni",
            "Ordinare al bar e al ristorante",
            "Chiedere e dare indicazioni stradali",
            "Parlare della tua famiglia e della tua casa",
            "Fare la spesa e chiedere il prezzo",
        ],
        "durata": "Con una lezione a settimana e un po' di lavoro fra una e l'altra, "
                  "l'A1 si copre di solito in quattro-sei mesi.",
        "libri": [],
        "esercizi": True,
        "prossimo": "A2",
    },
    "A2": {
        "titolo": "Elementare",
        "occhiello": "Il passato e i primi racconti",
        "sintesi": "Comunichi in situazioni semplici e di routine. Sai raccontare "
                   "qualcosa che è successo, descrivere il tuo ambiente e affrontare "
                   "gli scambi quotidiani senza bloccarti.",
        "grammatica": [
            "Passato prossimo e scelta dell'ausiliare",
            "Imperfetto indicativo e contrasto con il passato prossimo",
            "Futuro semplice e futuro anteriore",
            "Pronomi diretti e indiretti, anche con i tempi composti",
            "Imperativo diretto e negativo, con i pronomi",
            "Preposizioni articolate",
            "Comparativi e superlativi",
            "Verbi riflessivi ai tempi composti",
        ],
        "sai_fare": [
            "Raccontare la tua giornata di ieri e le vacanze",
            "Descrivere una persona nell'aspetto e nel carattere",
            "Fare una telefonata formale e prenotare",
            "Scrivere una mail semplice ma corretta",
            "Gestire un imprevisto in viaggio",
        ],
        "durata": "Dall'A1 all'A2 servono in media sei-otto mesi con una lezione "
                  "a settimana.",
        "libri": [],
        "esercizi": True,
        "prossimo": "B1",
    },
    "B1": {
        "titolo": "Intermedio",
        "occhiello": "Dove comincia l'italiano vero",
        "sintesi": "Te la cavi nella maggior parte delle situazioni che capitano "
                   "in Italia. Sai esprimere opinioni, dare motivazioni, raccontare "
                   "una trama e sostenere una conversazione senza che l'altro debba "
                   "rallentare.",
        "grammatica": [
            "Congiuntivo presente e passato",
            "Condizionale semplice e composto",
            "Periodo ipotetico della realtà e della possibilità",
            "Pronomi relativi: che, cui, il quale",
            "Discorso indiretto al presente",
            "Si impersonale e si passivante",
            "Gerundio presente e passato, stare + gerundio",
            "Particelle ci e ne",
            "Connettivi di causa, effetto, scopo",
        ],
        "sai_fare": [
            "Dare la tua opinione e argomentarla",
            "Raccontare la trama di un film o di un libro",
            "Scrivere un reclamo o una recensione",
            "Sostenere un colloquio di lavoro semplice",
            "Capire il telegiornale nelle linee generali",
        ],
        "durata": "Il B1 è il livello più lungo: di solito otto-dodici mesi. "
                  "È anche quello dove più persone si fermano, perché capiscono "
                  "abbastanza da sentirsi a posto ma non abbastanza da parlare bene.",
        "libri": [],
        "esercizi": True,
        "prossimo": "B2",
    },
    "B2": {
        "titolo": "Intermedio superiore",
        "occhiello": "Autonomia vera",
        "sintesi": "Capisci testi complessi anche su argomenti che non conosci. "
                   "Interagisci con scioltezza e naturalezza, e un parlante nativo "
                   "non deve fare sforzi per parlare con te.",
        "grammatica": [
            "Congiuntivo imperfetto e trapassato",
            "Concordanza dei tempi completa",
            "Periodo ipotetico dell'irrealtà",
            "Forma passiva con essere, venire e andare",
            "Discorso indiretto con cambio di tempo",
            "Connettivi argomentativi e strutture concessive",
            "Registro formale e informale",
            "Verbi pronominali: farcela, andarsene, cavarsela",
        ],
        "sai_fare": [
            "Discutere argomenti astratti e attualità",
            "Scrivere una lettera formale o un testo argomentativo",
            "Capire un film italiano senza sottotitoli",
            "Lavorare in italiano su temi tecnici del tuo settore",
            "Cogliere l'ironia e i sottintesi",
        ],
        "durata": "Dal B1 al B2 servono in genere otto-dodici mesi. È il livello "
                  "richiesto da molte università italiane.",
        "libri": [],
        "esercizi": True,
        "prossimo": "C1",
    },
    "C1": {
        "titolo": "Avanzato",
        "occhiello": "Sfumature, registro, letteratura",
        "sintesi": "Ti esprimi in modo fluente e spontaneo senza cercare le parole. "
                   "Usi la lingua in modo flessibile ed efficace per scopi sociali, "
                   "accademici e professionali, e cogli i significati impliciti.",
        "grammatica": [
            "Passato remoto e trapassato remoto",
            "Costruzioni implicite e participio assoluto",
            "Sfumature aspettuali e verbi fraseologici",
            "Sintassi complessa e subordinazione multipla",
            "Linguaggi settoriali: giuridico, medico, economico",
            "Varietà regionali e italiano parlato colloquiale",
            "Modi di dire opachi e metafore lessicalizzate",
        ],
        "sai_fare": [
            "Leggere letteratura italiana in originale",
            "Seguire un dibattito acceso fra più persone",
            "Scrivere testi strutturati su temi complessi",
            "Riconoscere il registro e adattarlo alla situazione",
            "Capire l'italiano burocratico dei documenti",
        ],
        "durata": "Il C1 non si misura più in mesi ma in quantità di lettura, "
                  "ascolto e produzione. Qui il lavoro fra una lezione e l'altra "
                  "conta più della lezione stessa.",
        "libri": [],
        "esercizi": False,
        "prossimo": "C2",
    },
    "C2": {
        "titolo": "Padronanza",
        "occhiello": "Quasi come un nativo",
        "sintesi": "Capisci senza sforzo praticamente tutto ciò che leggi e ascolti. "
                   "Riassumi informazioni da fonti diverse, ricostruisci argomentazioni "
                   "e ti esprimi in modo molto scorrevole e preciso, cogliendo anche "
                   "le sfumature più fini.",
        "grammatica": [
            "Sintassi del periodo ipotetico misto",
            "Prosa ottocentesca e italiano letterario",
            "Stilistica: ritmo, ordine delle parole, enfasi",
            "Italiano giuridico e amministrativo",
            "Etimologia e famiglie di parole",
            "Toscanismi, meridionalismi, settentrionalismi",
        ],
        "sai_fare": [
            "Leggere Manzoni, Verga e Pirandello senza note",
            "Tenere una presentazione professionale in italiano",
            "Scrivere con precisione stilistica e registro controllato",
            "Cogliere allusioni culturali e riferimenti impliciti",
            "Tradurre mantenendo tono e sfumatura",
        ],
        "durata": "Il C2 non si raggiunge con un corso: si mantiene con l'uso. "
                  "A questo livello le lezioni servono soprattutto per la correzione "
                  "fine e per l'ampliamento lessicale.",
        "libri": [],
        "esercizi": False,
        "prossimo": None,
    },
}

BLOCCO_LIBRI_VUOTO = """
      <div class="lp-nota">
        <p><strong>Da completare.</strong> Inserisci qui i romanzi graduati
        disponibili per questo livello. Nel file <code>genera-livelli.py</code>
        aggiungi i titoli alla lista <code>libri</code> del livello e rilancia
        lo script.</p>
      </div>"""


def card_libro(t):
    return f"""
        <div class="lp-card">
          <h3>{html.escape(t['titolo'])}</h3>
          <p>{html.escape(t.get('autore', ''))}{' · ' if t.get('autore') and t.get('nota') else ''}{html.escape(t.get('nota', ''))}</p>
        </div>"""


def pagina(codice, d):
    slug = f"libri-italiano-facile-{codice.lower()}"
    url = f"{SITO}/{slug}"
    li = lambda xs: "\n".join(f"        <li>{html.escape(x)}</li>" for x in xs)

    libri = (
        '<div class="lp-griglia">' + "".join(card_libro(t) for t in d["libri"]) + "</div>"
        if d["libri"] else BLOCCO_LIBRI_VUOTO
    )

    esercizi_blocco = (
        f"""      <h2>Esercizi di livello {codice}</h2>
      <p>Sul sito trovi esercizi interattivi gratuiti filtrabili per livello:
      cloze, cruciverba, crucipuzzle, dettati, abbinamenti e quiz di grammatica
      e lessico. Non serve registrarsi.</p>
      <p><a class="lp-cta lp-cta--vuoto" href="/esercizi/">Vai agli esercizi {codice} &rarr;</a></p>"""
        if d["esercizi"] else
        f"""      <h2>Esercizi di livello {codice}</h2>
      <p>Gli esercizi interattivi del sito arrivano fino al B2. Per il {codice}
      il percorso continua dentro l'app <em>Ti</em>, che copre tutti i livelli
      QCER fino al C2, e attraverso la lettura dei testi originali.</p>
      <p><a class="lp-cta lp-cta--vuoto" href="/app-ti.html">Scopri l'app Ti &rarr;</a></p>"""
    )

    prossimo = (
        f"""      <h2>E dopo il {codice}?</h2>
      <p>Quando ti senti stabile a questo livello, il passo successivo è il
      <a href="/libri-italiano-facile-{d['prossimo'].lower()}">{d['prossimo']}</a>.</p>"""
        if d["prossimo"] else
        """      <h2>Dopo il C2</h2>
      <p>Non c'è un livello successivo. A questo punto non si tratta più di
      imparare l'italiano, ma di usarlo e mantenerlo.</p>"""
    )

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Italiano livello {codice} — cosa impari, esercizi e letture graduate | Thuis Italiaans</title>
<meta name="description" content="Il livello {codice} del QCER spiegato: cosa sai fare, quale grammatica copre, quanto tempo serve, quali esercizi e quali romanzi graduati leggere.">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="livello" content="{codice}">

<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:title" content="Italiano livello {codice} — {html.escape(d['titolo'])}">
<meta property="og:description" content="{html.escape(d['sintesi'][:150])}">
<meta property="og:image" content="{SITO}/assets/icons/og-image.png">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Thuis Italiaans">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#31394d">

<link rel="stylesheet" href="/css/landing.css">

<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "{SITO}/" }},
        {{ "@type": "ListItem", "position": 2, "name": "Livello {codice}" }}
      ]
    }},
    {{
      "@type": "DefinedTerm",
      "name": "Livello {codice} — {html.escape(d['titolo'])}",
      "description": "{html.escape(d['sintesi'])}",
      "inDefinedTermSet": {{
        "@type": "DefinedTermSet",
        "name": "Quadro comune europeo di riferimento per la conoscenza delle lingue (QCER)"
      }}
    }}
  ]
}}
</script>
</head>
<body>

<!-- &#9658;&#9658;&#9658; INCOLLA QUI L'HEADER DEL SITO &#9668;&#9668;&#9668; -->

<div class="lp-wrap lp-breadcrumb">
  <a href="/">Home</a> &rsaquo; Livello {codice}
</div>

<header class="lp-hero">
  <div class="lp-wrap">
    <span class="lp-kicker">{html.escape(d['occhiello'])}</span>
    <h1>Italiano livello {codice}: {html.escape(d['titolo'])}</h1>
    <p class="lp-lead">{html.escape(d['sintesi'])}</p>
    <p>
      <a class="lp-cta" href="/#contact">Lezione di prova gratuita</a>
      <a class="lp-cta lp-cta--vuoto" href="/esercizi/">Esercizi gratuiti</a>
    </p>
  </div>
</header>

<main class="lp-wrap lp-stretto">

      <h2>Cosa sai fare al livello {codice}</h2>
      <ul class="lp-check">
{li(d['sai_fare'])}
      </ul>

      <h2>La grammatica del {codice}</h2>
      <ul class="lp-check">
{li(d['grammatica'])}
      </ul>

      <h2>Quanto tempo serve</h2>
      <p>{html.escape(d['durata'])}</p>
      <div class="lp-nota">
        <p>Le stime valgono per chi studia con una certa regolarità e parte da una
        lingua romanza o germanica. Contano molto di più la costanza e la quantità
        di produzione orale che il numero di ore totali.</p>
      </div>

      <h2>Leggere al livello {codice}</h2>
      <p>I classici italiani riscritti per questo livello, con note del docente
      e glossario integrato: leggi letteratura vera senza dover cercare ogni
      parola sul dizionario.</p>
{libri}

{esercizi_blocco}

{prossimo}

      <h2>Studiare da solo, o con un insegnante</h2>
      <p>Il materiale di questo sito è gratuito e basta a portarti avanti da
      solo. Quello che non può darti è la correzione: qualcuno che ti fermi
      quando sbagli e ti spieghi perché. Se vuoi provare, la lezione di
      conoscenza non costa nulla.</p>

</main>

<section class="lp-finale">
  <div class="lp-wrap">
    <h2>Non sai se sei al livello {codice}?</h2>
    <p>Parliamone. Mezz'ora, gratis e senza impegno: capiamo dove sei
    davvero e cosa ti manca per il livello successivo.</p>
    <p><a class="lp-cta" href="/#contact">Prenota una lezione gratuita</a></p>
  </div>
</section>

<!-- &#9658;&#9658;&#9658; INCOLLA QUI IL FOOTER DEL SITO &#9668;&#9668;&#9668; -->

<script src="/js/ti-cta.js" defer></script>
</body>
</html>
"""


if __name__ == "__main__":
    out = pathlib.Path(".")
    for codice, d in LIVELLI.items():
        p = out / f"libri-italiano-facile-{codice.lower()}.html"
        p.write_text(pagina(codice, d), encoding="utf-8")
        stato = f"{len(d['libri'])} libri" if d["libri"] else "libri DA COMPILARE"
        print(f"  {p.name:36} {stato}")
    print("\nFatto. Sei pagine generate.")
