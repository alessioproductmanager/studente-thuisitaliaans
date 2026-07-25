#!/usr/bin/env python3
"""genera-resto.py — rigenera le pagine restanti con le classi di style.css.
Riusa il guscio di genera-pagine.py. Lancia PRIMA genera-pagine.py."""

import pathlib, html
from genera_pagine_mod import guscio, SITO, BLOCCO_MATERIALE, BLOCCO_CHI, FAQ_BASE

LIVELLI = {
 "A1": ("Principiante assoluto","Si parte da zero",
  "Capisci e usi espressioni quotidiane e frasi molto semplici. Sai presentarti, fare domande basilari e rispondere allo stesso tipo di domande.",
  ["Articoli determinativi e indeterminativi","Genere e numero dei nomi",
   "Presente indicativo: essere, avere, verbi regolari in -are, -ere, -ire",
   "Preposizioni semplici: a, in, di, da","Aggettivi qualificativi e concordanza",
   "Numeri, ora, giorni e mesi","C'è / ci sono, questo / quello"],
  ["Presentarti e dire da dove vieni","Ordinare al bar e al ristorante",
   "Chiedere e dare indicazioni stradali","Parlare della tua famiglia e della tua casa",
   "Fare la spesa e chiedere il prezzo"],
  "Con una lezione a settimana e un po' di lavoro fra una e l'altra, l'A1 si copre di solito in quattro-sei mesi.",
  True,"A2"),
 "A2": ("Elementare","Il passato e i primi racconti",
  "Comunichi in situazioni semplici e di routine. Sai raccontare qualcosa che è successo e affrontare gli scambi quotidiani senza bloccarti.",
  ["Passato prossimo e scelta dell'ausiliare","Imperfetto e contrasto con il passato prossimo",
   "Futuro semplice e futuro anteriore","Pronomi diretti e indiretti, anche con i tempi composti",
   "Imperativo diretto e negativo, con i pronomi","Preposizioni articolate",
   "Comparativi e superlativi","Verbi riflessivi ai tempi composti"],
  ["Raccontare la tua giornata di ieri e le vacanze","Descrivere una persona nell'aspetto e nel carattere",
   "Fare una telefonata formale e prenotare","Scrivere una mail semplice ma corretta",
   "Gestire un imprevisto in viaggio"],
  "Dall'A1 all'A2 servono in media sei-otto mesi con una lezione a settimana.",
  True,"B1"),
 "B1": ("Intermedio","Dove comincia l'italiano vero",
  "Te la cavi nella maggior parte delle situazioni che capitano in Italia. Sai esprimere opinioni, dare motivazioni e sostenere una conversazione senza che l'altro debba rallentare.",
  ["Congiuntivo presente e passato","Condizionale semplice e composto",
   "Periodo ipotetico della realtà e della possibilità","Pronomi relativi: che, cui, il quale",
   "Discorso indiretto al presente","Si impersonale e si passivante",
   "Gerundio presente e passato, stare + gerundio","Particelle ci e ne",
   "Connettivi di causa, effetto, scopo"],
  ["Dare la tua opinione e argomentarla","Raccontare la trama di un film o di un libro",
   "Scrivere un reclamo o una recensione","Sostenere un colloquio di lavoro semplice",
   "Capire il telegiornale nelle linee generali"],
  "Il B1 è il livello più lungo: di solito otto-dodici mesi. È anche quello dove più persone si fermano, perché capiscono abbastanza da sentirsi a posto ma non abbastanza da parlare bene.",
  True,"B2"),
 "B2": ("Intermedio superiore","Autonomia vera",
  "Capisci testi complessi anche su argomenti che non conosci. Interagisci con scioltezza, e un parlante nativo non deve fare sforzi per parlare con te.",
  ["Congiuntivo imperfetto e trapassato","Concordanza dei tempi completa",
   "Periodo ipotetico dell'irrealtà","Forma passiva con essere, venire e andare",
   "Discorso indiretto con cambio di tempo","Connettivi argomentativi e strutture concessive",
   "Registro formale e informale","Verbi pronominali: farcela, andarsene, cavarsela"],
  ["Discutere argomenti astratti e attualità","Scrivere una lettera formale o un testo argomentativo",
   "Capire un film italiano senza sottotitoli","Lavorare in italiano su temi del tuo settore",
   "Cogliere l'ironia e i sottintesi"],
  "Dal B1 al B2 servono in genere otto-dodici mesi. È il livello richiesto da molte università italiane.",
  True,"C1"),
 "C1": ("Avanzato","Sfumature, registro, letteratura",
  "Ti esprimi in modo fluente e spontaneo senza cercare le parole, e cogli i significati impliciti.",
  ["Passato remoto e trapassato remoto","Costruzioni implicite e participio assoluto",
   "Sfumature aspettuali e verbi fraseologici","Sintassi complessa e subordinazione multipla",
   "Linguaggi settoriali: giuridico, medico, economico","Varietà regionali e parlato colloquiale",
   "Modi di dire opachi e metafore lessicalizzate"],
  ["Leggere letteratura italiana in originale","Seguire un dibattito acceso fra più persone",
   "Scrivere testi strutturati su temi complessi","Riconoscere il registro e adattarlo",
   "Capire l'italiano burocratico dei documenti"],
  "Il C1 non si misura più in mesi ma in quantità di lettura, ascolto e produzione. Qui il lavoro fra una lezione e l'altra conta più della lezione stessa.",
  False,"C2"),
 "C2": ("Padronanza","Quasi come un nativo",
  "Capisci senza sforzo praticamente tutto ciò che leggi e ascolti, e ti esprimi cogliendo anche le sfumature più fini.",
  ["Sintassi del periodo ipotetico misto","Prosa ottocentesca e italiano letterario",
   "Stilistica: ritmo, ordine delle parole, enfasi","Italiano giuridico e amministrativo",
   "Etimologia e famiglie di parole","Toscanismi, meridionalismi, settentrionalismi"],
  ["Leggere Manzoni, Verga e Pirandello senza note","Tenere una presentazione professionale",
   "Scrivere con precisione stilistica e registro controllato","Cogliere allusioni culturali",
   "Tradurre mantenendo tono e sfumatura"],
  "Il C2 non si raggiunge con un corso: si mantiene con l'uso. A questo livello le lezioni servono per la correzione fine e per l'ampliamento lessicale.",
  False,None),
}

AVVISO_LIBRI = """      <div class="nota"><p><strong>Da completare.</strong> Inserisci qui i romanzi
      graduati disponibili per questo livello: apri <code>genera-resto.py</code>,
      riempi la lista <code>LIBRI</code> e rilancia lo script.</p></div>"""

LIBRI = {}   # es. "B1": [("Il servitore di due padroni","Goldoni","20 capitoli")]

def pagina_livello(cod):
    tit, occ, sint, gram, sf, dur, ese, pross = LIVELLI[cod]
    li = lambda xs: "\n".join(f'        <li>{html.escape(x)}</li>' for x in xs)
    libri = LIBRI.get(cod)
    blocco_libri = ('<div class="lessons-grid">' + "".join(
        f'<div class="lesson-card"><h3>{html.escape(t)}</h3><p>{html.escape(a)} · {html.escape(n)}</p></div>'
        for t,a,n in libri) + '</div>') if libri else AVVISO_LIBRI
    ese_b = (f"""      <h2>Esercizi di livello {cod}</h2>
      <p>Sul sito trovi esercizi interattivi gratuiti filtrabili per livello. Non serve registrarsi.</p>
      <p><a class="link-arrow" href="/esercizi/">Vai agli esercizi {cod} →</a></p>""" if ese else
      f"""      <h2>Esercizi di livello {cod}</h2>
      <p>Gli esercizi del sito arrivano fino al B2. Per il {cod} il percorso continua
      nell'app <em>Ti</em>, che copre tutti i livelli QCER fino al C2.</p>
      <p><a class="link-arrow" href="/app-ti.html">Scopri l'app Ti →</a></p>""")
    pr = (f"""      <h2>E dopo il {cod}?</h2>
      <p>Quando ti senti stabile a questo livello, il passo successivo è il
      <a href="/libri-italiano-facile-{pross.lower()}">{pross}</a>.</p>""" if pross else
      """      <h2>Dopo il C2</h2>
      <p>Non c'è un livello successivo. A questo punto non si tratta più di imparare
      l'italiano, ma di usarlo e mantenerlo.</p>""")
    corpo = f"""      <h2>Cosa sai fare al livello {cod}</h2>
      <ul class="elenco-check">
{li(sf)}
      </ul>

      <h2>La grammatica del {cod}</h2>
      <ul class="elenco-check">
{li(gram)}
      </ul>

      <h2>Quanto tempo serve</h2>
      <p>{html.escape(dur)}</p>
      <div class="nota"><p>Le stime valgono per chi studia con regolarità e parte da una
      lingua romanza o germanica. Contano più la costanza e la quantità di produzione
      orale che il numero di ore totali.</p></div>

      <h2>Leggere al livello {cod}</h2>
      <p>I classici italiani riscritti per questo livello, con note del docente e
      glossario integrato.</p>
{blocco_libri}

{ese_b}

{pr}"""
    faq = [(f"Come faccio a sapere se sono {cod}?",
            "Nella lezione di conoscenza, gratuita, faccio una valutazione. L'autovalutazione "
            "sbaglia spesso di mezzo livello, in un senso o nell'altro."),
           ("Devo comprare un libro?",
            "No. Il materiale lo scrivo io ed è incluso.")]
    return guscio(slug=f"libri-italiano-facile-{cod.lower()}",
        titolo_seo=f"Italiano livello {cod} — cosa impari, esercizi e letture graduate",
        meta=f"Il livello {cod} del QCER spiegato: cosa sai fare, quale grammatica copre, "
             f"quanto tempo serve, quali esercizi e quali romanzi graduati leggere.",
        h1=f"Italiano livello {cod}: {tit}", tag=occ, occhiello=html.escape(sint),
        corpo=corpo, voci_faq=faq, schema_extra=f"""    {{
      "@type": "DefinedTerm",
      "name": "Livello {cod} — {html.escape(tit)}",
      "description": "{html.escape(sint)}",
      "inDefinedTermSet": {{ "@type": "DefinedTermSet", "name": "QCER" }}
    }}""",
        cta_titolo=f"Non sai se sei al livello {cod}?",
        cta_testo="Parliamone. Mezz'ora, gratis e senza impegno: capiamo dove sei davvero "
                  "e cosa ti manca per il livello successivo.", lang="it")

if __name__ == "__main__":
    for cod in LIVELLI:
        p = pathlib.Path(f"libri-italiano-facile-{cod.lower()}.html")
        p.write_text(pagina_livello(cod), encoding="utf-8")
        print(f"  {p.name}  {'libri OK' if LIBRI.get(cod) else 'libri DA COMPILARE'}")
    print("\n6 pagine livello rigenerate.")
