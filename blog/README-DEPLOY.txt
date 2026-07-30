SERIE "THE SCIENCE OF LEARNING ITALIAN" — 20 post EN · 30 luglio 2026
=====================================================================

CONTENUTO DEL PACCHETTO (tutto va in /blog/ del sito):
  · 20 nuovi post .html (slug senza estensione nei link, come da convenzione)
  · index.html                     → sostituisce blog/index.html (20 card in testa alla griglia)
  · category-language-hacking.html → sostituisce (18 card nuove, conteggio 47)
  · category-for-teachers.html     → sostituisce (2 card nuove, conteggio 8)
  · sitemap-fragment.xml           → 20 <url> da incollare nel sitemap.xml esistente
  · indexnow-urls.txt              → lista URL da inviare a IndexNow dopo il deploy

STRUTTURA DELLA SERIE
  Pillar: science-of-learning-italian (linka tutti i 19 figli; ogni figlio rilinka il pillar)
  Language Hacking (18): four strands · comprehensible input · spaced repetition ·
    retrieval practice · extensive reading · output hypothesis · shadowing ·
    fluency practice · vocab size · pre-learning vocab · interleaving ·
    CEFR levels · can-do self-assessment · error-driven learning ·
    grammar in context (ITALS/noticing) · 20 minutes a day · chunks
  For Teachers (2): apps-for-italian-teachers · italian-class-technology-gdpr
  Corrisponde alla roadmap del documento interno: POST 1 = four strands,
  POST 2 = cefr-levels, POST 3 = apps-for-teachers, POST 4 = class-gdpr,
  più il resto della valutazione didattica trasformato in contenuto.

CONVENZIONI RISPETTATE (dal template più recente del blog)
  · JSON-LD BlogPosting con @id #alessio / #organizzazione, license CC BY-NC-ND,
    description, NIENTE aggregateRating · BreadcrumbList a 4 livelli
  · Footer con licenza due livelli (testo CC BY-NC-ND 4.0, foto escluse) + credito foto
  · Sidebar: book pick ruotato per livello, card app "ti", card lezioni
  · CTA di fine articolo orientata all'app (../app-ti); per i 2 post teacher, CTA teacher mode
  · Immagini cover riusate da /blog/media esistente (nessun upload nuovo necessario)
  · App citata sempre come "ti" (mai "Tuffo Italiano")
  · Attribuzioni in <small> a fine post: Nation, Krashen, Swain, Schmidt, Bjork,
    © Council of Europe (QCER/ELP), CILS=Siena / CELI=Perugia (solo identificazione),
    ITALS=Ca' Foscari (solo background accademico, nessuna affiliazione implicita).
    Tutto parafrasato, zero testo verbatim.

INTERLINKING
  · Ogni post linka: pillar + 3–6 post fratelli + ../app-ti + ../esercizi/index
    + ../boeken + post esistenti pertinenti (italian-graded-readers-by-level,
    graded-readers-vs-dual-language, how-long-does-it-take-to-learn-italian)
  · Nessun link a slug inesistenti (verificato contro i 270 file del blog attuale)

DOPO IL DEPLOY
  1. Incolla sitemap-fragment.xml nel sitemap e ping Google/Bing
  2. Invia indexnow-urls.txt via IndexNow (config già presente sul sito)
  3. Ordine consigliato se pubblichi scaglionato: cefr-levels → four-strands →
     pillar → resto → i due teacher per ultimi (come da roadmap 2→1→3→4)
  4. Date di pubblicazione distribuite gen–lug 2026 (dateModified = 30/07/2026);
     le card sono inserite in posizione cronologica nella griglia, non in testa
