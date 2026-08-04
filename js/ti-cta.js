/* ti-cta.js v2 — banner CTA multilingua + CTA libri per livello
 *
 * AUTOSUFFICIENTE. Non devi incollare HTML né CSS da nessuna parte.
 * L'unica cosa da aggiungere ai template è questa riga prima di </body>:
 *
 *     <script src="/js/ti-cta.js" defer></script>
 *
 * Lo script fa tutto il resto:
 *   - inietta il proprio CSS
 *   - decide quale blocco serve in base alla pagina
 *   - lo inserisce in fondo all'articolo
 *   - risolve il livello CEFR leggendo la categoria dalla pagina
 *   - traduce nella lingua del browser (15 lingue)
 *
 * Se in una pagina vuoi controllare tu il blocco, inserisci a mano un
 * <aside data-ti-cta="app|esercizi|libri" data-livello="B1"></aside>:
 * quando ne trova almeno uno, l'inserimento automatico si disattiva.
 *
 * Nessun cookie, nessun localStorage, nessuna richiesta di rete,
 * nessun analytics. Legge solo navigator.languages.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * CONFIGURAZIONE
   * ------------------------------------------------------------------ */

  var CFG = {
    autoInserimento: true,
    /* URL dell'app per lingua: la pagina di default (/app-ti) e' in
       italiano, le altre lingue hanno la propria versione. */
    urlApp: function (lingua) {
      if (lingua === 'it') return '/app-ti';
      var note = ['nl','en','de','es','fr','pt','ro','uk','sq','ar','zh','bn','tl','ti'];
      return note.indexOf(lingua) !== -1 ? '/app-ti-' + lingua : '/app-ti-en';
    },
    /* Pagine-livello dei libri per lingua (nl/en/it; le altre lingue
       ricadono sull'inglese). */
    libriPerLingua: {
      nl: { A1:'/italiaanse-boeken-a1', A2:'/italiaanse-boeken-a2', B1:'/italiaanse-boeken-b1', B2:'/italiaanse-boeken-b2', C1:'/italiaanse-boeken-c1', C2:'/italiaanse-boeken-c2' },
      en: { A1:'/italian-books-a1', A2:'/italian-books-a2', B1:'/italian-books-b1', B2:'/italian-books-b2', C1:'/italian-books-c1', C2:'/italian-books-c2' },
      it: { A1:'/libri-italiano-facile-a1', A2:'/libri-italiano-facile-a2', B1:'/libri-italiano-facile-b1', B2:'/libri-italiano-facile-b2', C1:'/libri-italiano-facile-c1', C2:'/libri-italiano-facile-c2' }
    },
    urlLibro: function (lingua, liv) {
      var mappa = this.libriPerLingua[lingua] || this.libriPerLingua.en;
      return mappa[liv] || mappa[CFG.livelloDefault];
    },
    /* Livello del blocco libri in base alla categoria del post. */
    livelloPerCategoria: {
      'language-hacking': 'A1',
      'cultura-italiana': 'A2',
      'modi-di-dire': 'B1',
      'reading-practice': 'B2'
    },
    /* Categorie dove il blocco libri è fuori posto: mostra l'app. */
    categorieSenzaLibri: ['for-teachers', 'italian-classes'],
    livelloDefault: 'A2',
    colore: '#31394d'
  };

  var LINGUE = ['sq','ar','bn','zh','de','en','es','fr','it','nl','pt','ro','tl','ti','uk'];
  var RTL = { ar: true };

  /* ------------------------------------------------------------------ *
   * TRADUZIONI
   * ------------------------------------------------------------------ */

  var T = {
    it: {
      app_t: 'Studia anche da solo con Ti',
      app_d: "L'app iOS di Alessio per imparare l'italiano dall'A1 al C2: percorso QCER, edicola tematica, romanzi graduati e dizionario in 14 lingue.",
      app_c: "Scopri l'app Ti",
      ese_t: 'E se ti portassi gli esercizi in tasca?',
      ese_d: "L'app Ti ha un percorso QCER completo dall'A1 al C2, edicola tematica, romanzi graduati e un dizionario in 14 lingue.",
      ese_c: "Scopri l'app",
      lib_t: 'Leggi un libro al tuo livello',
      lib_d: 'I classici italiani riscritti per il livello {L}, con note e glossario.',
      lib_c: 'Vedi i libri {L}'
    },
    nl: {
      app_t: 'Studeer ook zelfstandig met Ti',
      app_d: 'De iOS-app van Alessio om Italiaans te leren van A1 tot C2: volledig ERK-traject, thematische bibliotheek, gegradeerde romans en een woordenboek in 14 talen.',
      app_c: 'Ontdek de Ti-app',
      ese_t: 'En als je de oefeningen op zak had?',
      ese_d: 'De Ti-app heeft een volledig ERK-traject van A1 tot C2, een thematische bibliotheek, gegradeerde romans en een woordenboek in 14 talen.',
      ese_c: 'Ontdek de app',
      lib_t: 'Lees een boek op jouw niveau',
      lib_d: 'Italiaanse klassiekers herschreven voor niveau {L}, met noten en woordenlijst.',
      lib_c: 'Bekijk de {L}-boeken'
    },
    en: {
      app_t: 'Study on your own with Ti',
      app_d: "Alessio's iOS app for learning Italian from A1 to C2: a full CEFR path, themed library, graded novels and a dictionary in 14 languages.",
      app_c: 'Discover the Ti app',
      ese_t: 'What if you had the exercises in your pocket?',
      ese_d: 'The Ti app has a complete CEFR path from A1 to C2, a themed library, graded novels and a dictionary in 14 languages.',
      ese_c: 'Discover the app',
      lib_t: 'Read a book at your level',
      lib_d: 'Italian classics rewritten for level {L}, with notes and a glossary.',
      lib_c: 'See the {L} books'
    },
    de: {
      app_t: 'Lerne auch allein mit Ti',
      app_d: 'Alessios iOS-App, um Italienisch von A1 bis C2 zu lernen: vollständiger GER-Lernpfad, thematische Bibliothek, abgestufte Romane und ein Wörterbuch in 14 Sprachen.',
      app_c: 'Die Ti-App entdecken',
      ese_t: 'Und wenn du die Übungen in der Tasche hättest?',
      ese_d: 'Die Ti-App bietet einen vollständigen GER-Lernpfad von A1 bis C2, eine thematische Bibliothek, abgestufte Romane und ein Wörterbuch in 14 Sprachen.',
      ese_c: 'Die App entdecken',
      lib_t: 'Lies ein Buch auf deinem Niveau',
      lib_d: 'Italienische Klassiker, neu geschrieben für Niveau {L}, mit Anmerkungen und Glossar.',
      lib_c: 'Die {L}-Bücher ansehen'
    },
    fr: {
      app_t: 'Étudie aussi en autonomie avec Ti',
      app_d: "L'application iOS d'Alessio pour apprendre l'italien de A1 à C2 : parcours CECRL complet, bibliothèque thématique, romans gradués et dictionnaire en 14 langues.",
      app_c: "Découvrir l'application Ti",
      ese_t: 'Et si tu avais les exercices dans ta poche ?',
      ese_d: "L'application Ti propose un parcours CECRL complet de A1 à C2, une bibliothèque thématique, des romans gradués et un dictionnaire en 14 langues.",
      ese_c: "Découvrir l'application",
      lib_t: 'Lis un livre à ton niveau',
      lib_d: 'Les classiques italiens réécrits pour le niveau {L}, avec notes et glossaire.',
      lib_c: 'Voir les livres {L}'
    },
    es: {
      app_t: 'Estudia también por tu cuenta con Ti',
      app_d: 'La app de iOS de Alessio para aprender italiano de A1 a C2: itinerario MCER completo, biblioteca temática, novelas graduadas y diccionario en 14 idiomas.',
      app_c: 'Descubre la app Ti',
      ese_t: '¿Y si llevaras los ejercicios en el bolsillo?',
      ese_d: 'La app Ti tiene un itinerario MCER completo de A1 a C2, biblioteca temática, novelas graduadas y un diccionario en 14 idiomas.',
      ese_c: 'Descubre la app',
      lib_t: 'Lee un libro a tu nivel',
      lib_d: 'Los clásicos italianos reescritos para el nivel {L}, con notas y glosario.',
      lib_c: 'Ver los libros {L}'
    },
    pt: {
      app_t: 'Estuda também sozinho com o Ti',
      app_d: 'A app iOS do Alessio para aprender italiano de A1 a C2: percurso QECR completo, biblioteca temática, romances graduados e dicionário em 14 línguas.',
      app_c: 'Descobre a app Ti',
      ese_t: 'E se tivesses os exercícios no bolso?',
      ese_d: 'A app Ti tem um percurso QECR completo de A1 a C2, biblioteca temática, romances graduados e um dicionário em 14 línguas.',
      ese_c: 'Descobre a app',
      lib_t: 'Lê um livro ao teu nível',
      lib_d: 'Os clássicos italianos reescritos para o nível {L}, com notas e glossário.',
      lib_c: 'Ver os livros {L}'
    },
    ro: {
      app_t: 'Studiază și singur cu Ti',
      app_d: 'Aplicația iOS a lui Alessio pentru a învăța italiana de la A1 la C2: parcurs CECRL complet, bibliotecă tematică, romane gradate și dicționar în 14 limbi.',
      app_c: 'Descoperă aplicația Ti',
      ese_t: 'Și dacă ai avea exercițiile în buzunar?',
      ese_d: 'Aplicația Ti are un parcurs CECRL complet de la A1 la C2, bibliotecă tematică, romane gradate și un dicționar în 14 limbi.',
      ese_c: 'Descoperă aplicația',
      lib_t: 'Citește o carte la nivelul tău',
      lib_d: 'Clasicii italieni rescriși pentru nivelul {L}, cu note și glosar.',
      lib_c: 'Vezi cărțile {L}'
    },
    sq: {
      app_t: 'Studio edhe vetë me Ti',
      app_d: 'Aplikacioni iOS i Alessios për të mësuar italishten nga A1 deri në C2: program i plotë sipas niveleve europiane, bibliotekë tematike, romane të graduara dhe fjalor në 14 gjuhë.',
      app_c: 'Zbulo aplikacionin Ti',
      ese_t: "Po sikur t'i kishe ushtrimet në xhep?",
      ese_d: 'Aplikacioni Ti ka një program të plotë nga A1 deri në C2, bibliotekë tematike, romane të graduara dhe një fjalor në 14 gjuhë.',
      ese_c: 'Zbulo aplikacionin',
      lib_t: 'Lexo një libër në nivelin tënd',
      lib_d: 'Klasikët italianë të rishkruar për nivelin {L}, me shënime dhe fjalorth.',
      lib_c: 'Shiko librat {L}'
    },
    uk: {
      app_t: 'Навчайся також самостійно з Ti',
      app_d: 'Застосунок Alessio для iOS, щоб вивчати італійську від A1 до C2: повний курс за європейськими рівнями, тематична бібліотека, адаптовані романи та словник 14 мовами.',
      app_c: 'Дізнатися про застосунок Ti',
      ese_t: 'А якби вправи були у тебе в кишені?',
      ese_d: 'У застосунку Ti є повний курс від A1 до C2, тематична бібліотека, адаптовані романи та словник 14 мовами.',
      ese_c: 'Дізнатися про застосунок',
      lib_t: 'Читай книжку свого рівня',
      lib_d: 'Італійська класика, переписана для рівня {L}, з примітками та словником.',
      lib_c: 'Переглянути книжки {L}'
    },
    ar: {
      app_t: 'ادرس أيضًا بمفردك مع Ti',
      app_d: 'تطبيق أليسيو لـ iOS لتعلّم الإيطالية من A1 إلى C2: مسار كامل حسب المستويات الأوروبية، ومكتبة موضوعية، وروايات مُيسّرة، وقاموس بـ14 لغة.',
      app_c: 'اكتشف تطبيق Ti',
      ese_t: 'ماذا لو كانت التمارين في جيبك؟',
      ese_d: 'يوفّر تطبيق Ti مسارًا كاملًا من A1 إلى C2، ومكتبة موضوعية، وروايات مُيسّرة، وقاموسًا بـ14 لغة.',
      ese_c: 'اكتشف التطبيق',
      lib_t: 'اقرأ كتابًا في مستواك',
      lib_d: 'روائع الأدب الإيطالي مُعاد كتابتها للمستوى {L}، مع ملاحظات ومسرد.',
      lib_c: 'شاهد كتب {L}'
    },
    zh: {
      app_t: '用 Ti 自学意大利语',
      app_d: 'Alessio 的 iOS 应用，从 A1 到 C2 学习意大利语：完整的欧洲语言等级课程、主题书库、分级小说，以及 14 种语言的词典。',
      app_c: '了解 Ti 应用',
      ese_t: '如果练习就在你口袋里呢？',
      ese_d: 'Ti 应用提供从 A1 到 C2 的完整课程、主题书库、分级小说和 14 种语言的词典。',
      ese_c: '了解应用',
      lib_t: '读一本适合你水平的书',
      lib_d: '为 {L} 级别改写的意大利经典名著，附注释和词汇表。',
      lib_c: '查看 {L} 书籍'
    },
    bn: {
      app_t: 'Ti দিয়ে নিজে নিজেও শিখুন',
      app_d: 'ইতালীয় ভাষা A1 থেকে C2 পর্যন্ত শেখার জন্য Alessio-র iOS অ্যাপ: সম্পূর্ণ ইউরোপীয় স্তরভিত্তিক কোর্স, বিষয়ভিত্তিক লাইব্রেরি, সহজ করা উপন্যাস এবং ১৪টি ভাষার অভিধান।',
      app_c: 'Ti অ্যাপটি দেখুন',
      ese_t: 'অনুশীলনগুলো যদি পকেটে থাকত?',
      ese_d: 'Ti অ্যাপে রয়েছে A1 থেকে C2 পর্যন্ত সম্পূর্ণ কোর্স, বিষয়ভিত্তিক লাইব্রেরি, সহজ করা উপন্যাস এবং ১৪টি ভাষার অভিধান।',
      ese_c: 'অ্যাপটি দেখুন',
      lib_t: 'আপনার স্তরের একটি বই পড়ুন',
      lib_d: '{L} স্তরের জন্য নতুন করে লেখা ইতালীয় ক্লাসিক, টীকা ও শব্দকোষসহ।',
      lib_c: '{L} স্তরের বইগুলো দেখুন'
    },
    tl: {
      app_t: 'Mag-aral din nang mag-isa gamit ang Ti',
      app_d: 'Ang iOS app ni Alessio para matuto ng Italyano mula A1 hanggang C2: kumpletong kurso ayon sa mga antas na Europeo, aklatang pangkatema, mga nobelang isinaayos ayon sa antas, at diksyunaryo sa 14 na wika.',
      app_c: 'Tuklasin ang Ti app',
      ese_t: 'Paano kung nasa bulsa mo ang mga pagsasanay?',
      ese_d: 'May kumpletong kurso ang Ti app mula A1 hanggang C2, aklatang pangkatema, mga nobelang isinaayos ayon sa antas, at diksyunaryo sa 14 na wika.',
      ese_c: 'Tuklasin ang app',
      lib_t: 'Magbasa ng aklat na akma sa antas mo',
      lib_d: 'Mga klasikong Italyano na isinulat muli para sa antas {L}, may mga tala at talasalitaan.',
      lib_c: 'Tingnan ang mga aklat na {L}'
    },
    ti: {
      app_t: "ብ Ti ባዕልኻ'ውን ተመሃር",
      app_d: 'ናይ Alessio iOS መተግበሪ ጣልያንኛ ካብ A1 ክሳብ C2 ንምምሃር፦ ምሉእ ኣውሮጳዊ ደረጃታት ዘለዎ መንገዲ፣ ብኣርእስቲ ዝተኸፋፈለ ቤተ-መጻሕፍቲ፣ ብደረጃ ዝተዳለዉ ልብ-ወለዳት፣ ከምኡውን ብ14 ቋንቋታት መዝገበ-ቃላት።',
      app_c: 'መተግበሪ Ti ርአ',
      ese_t: 'እቲ ልምምዳት ኣብ ጁባኻ እንተዝኸውንከ?',
      ese_d: 'መተግበሪ Ti ካብ A1 ክሳብ C2 ምሉእ መንገዲ፣ ብኣርእስቲ ዝተኸፋፈለ ቤተ-መጻሕፍቲ፣ ብደረጃ ዝተዳለዉ ልብ-ወለዳትን ብ14 ቋንቋታት መዝገበ-ቃላትን ኣለዎ።',
      ese_c: 'መተግበሪ ርአ',
      lib_t: 'ኣብ ደረጃኻ ዘሎ መጽሓፍ ኣንብብ',
      lib_d: 'ናይ ጣልያን ክላሲካዊ ስራሓት ንደረጃ {L} ተጻሒፎም፣ ምስ መብርሂታትን መዝገበ-ቃላትን።',
      lib_c: 'መጻሕፍቲ {L} ርአ'
    }
  };

  var PREFISSI = { app: 'app', esercizi: 'ese', libri: 'lib' };

  /* ------------------------------------------------------------------ *
   * CSS (iniettato una sola volta)
   * ------------------------------------------------------------------ */

  function iniettaCss() {
    if (document.getElementById('ti-cta-css')) return;
    var c = CFG.colore;
    var css =
      '.ti-cta{margin:3rem 0 0;padding:1.5rem 1.75rem;' +
      'border:1px solid ' + c + '2e;border-left:3px solid ' + c + ';' +
      'border-radius:10px;background:' + c + '0a;}' +
      '.ti-cta__t{margin:0 0 .4rem;font-size:1.05rem;line-height:1.3;font-weight:700;color:' + c + ';}' +
      '.ti-cta__d{margin:0 0 .9rem;font-size:.95rem;line-height:1.55;opacity:.85;}' +
      '.ti-cta__a{display:inline-block;font-weight:600;text-decoration:none;color:' + c + ';' +
      'border-bottom:2px solid currentColor;padding-bottom:1px;}' +
      '.ti-cta__a:hover,.ti-cta__a:focus-visible{opacity:.7;}' +
      '.ti-cta[dir="rtl"]{border-left:1px solid ' + c + '2e;border-right:3px solid ' + c + ';}' +
      '@media(prefers-color-scheme:dark){.ti-cta{background:#ffffff0d;border-color:#ffffff26;}' +
      '.ti-cta__t,.ti-cta__a{color:inherit;}}';
    var s = document.createElement('style');
    s.id = 'ti-cta-css';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------ *
   * LINGUA
   * ------------------------------------------------------------------ */

  function normalizza(code) {
    code = String(code || '').toLowerCase().split('-')[0];
    if (code === 'fil') return 'tl';
    if (code === 'tir') return 'ti';
    return code;
  }

  function linguaBrowser() {
    var lista = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < lista.length; i++) {
      var c = normalizza(lista[i]);
      if (LINGUE.indexOf(c) !== -1) return c;
    }
    return null;
  }

  function linguaPagina() {
    var l = normalizza(document.documentElement.getAttribute('lang') || 'it');
    return LINGUE.indexOf(l) !== -1 ? l : 'it';
  }

  /* ------------------------------------------------------------------ *
   * CATEGORIA E LIVELLO
   * ------------------------------------------------------------------ */

  /* La categoria si legge dal link "category-…" che ogni post ha già in
     pagina. Nessuna modifica ai tuoi file necessaria. */
  function categoriaPagina() {
    var meta = document.querySelector('meta[name="categoria"]');
    if (meta && meta.content) return meta.content.toLowerCase();

    var link = document.querySelector('a[href*="category-"]');
    if (link) {
      var m = link.getAttribute('href').match(/category-([a-z0-9-]+)/i);
      if (m) return m[1].toLowerCase();
    }

    var testo = (document.body.className + ' ' + location.pathname).toLowerCase();
    var tutte = Object.keys(CFG.livelloPerCategoria).concat(CFG.categorieSenzaLibri);
    for (var i = 0; i < tutte.length; i++) {
      if (testo.indexOf(tutte[i]) !== -1) return tutte[i];
    }
    return null;
  }

  function livelloDi(blocco) {
    var esplicito = blocco && blocco.getAttribute('data-livello');
    if (esplicito) return esplicito.toUpperCase();

    var meta = document.querySelector('meta[name="livello"]');
    if (meta && meta.content) return meta.content.toUpperCase();

    var cat = categoriaPagina();
    if (cat && CFG.livelloPerCategoria[cat]) return CFG.livelloPerCategoria[cat];

    return CFG.livelloDefault;
  }

  /* ------------------------------------------------------------------ *
   * QUALE BLOCCO SERVE IN QUESTA PAGINA
   * ------------------------------------------------------------------ */

  /* 126-cta-app */
  /* Il default del blog era 'libri'. I dati dicono che il sito deve
     spingere l'app: i libri restano solo dove il pezzo parla di lettura,
     dove il reader e' la risposta naturale alla domanda del lettore. */
  var CATEGORIE_LIBRI = ['reading-practice', 'modi-di-dire'];

  function tipoPerPagina() {
    var p = location.pathname.toLowerCase();
    var eIndice = /(^|\/)(index(\.html)?)?$/.test(p) || p.indexOf('category-') !== -1;

    if (p.indexOf('/esercizi') !== -1) return 'esercizi';

    /* il test di livello e' il punto di massima intenzione del sito:
       chi ha appena scoperto di essere A2 vuole sapere come arrivare a B1 */
    if (p.indexOf('/test-livello') !== -1) return 'app';

    if (p.indexOf('/blog') !== -1) {
      if (eIndice) return null;              /* niente sugli indici e sulle categorie */
      var cat = categoriaPagina();
      if (cat && CATEGORIE_LIBRI.indexOf(cat) !== -1) return 'libri';
      return 'app';
    }
    return null;
  }

  function contenitore() {
    var candidati = ['article', '.post-content', '.entry-content', '.contenuto',
                     '.articolo', 'main', '#content'];
    for (var i = 0; i < candidati.length; i++) {
      var el = document.querySelector(candidati[i]);
      if (el) return el;
    }
    return null;
  }

  /* ------------------------------------------------------------------ *
   * COSTRUZIONE E TRADUZIONE
   * ------------------------------------------------------------------ */

  function costruisci(tipo) {
    var el = document.createElement('aside');
    el.className = 'ti-cta ti-cta--' + tipo;
    el.setAttribute('data-ti-cta', tipo);
    el.setAttribute('data-ti-auto', '1');
    el.innerHTML =
      '<p class="ti-cta__t" data-ti="titolo"></p>' +
      '<p class="ti-cta__d" data-ti="testo"></p>' +
      '<a class="ti-cta__a" data-ti="cta" href="#"></a>';
    return el;
  }

  function applica(blocco, lingua) {
    var tipo = blocco.getAttribute('data-ti-cta');
    var p = PREFISSI[tipo];
    if (!p) return;

    var diz = T[lingua] || T.it;
    var liv = livelloDi(blocco);
    var freccia = RTL[lingua] ? ' \u2190' : ' \u2192';

    var t = blocco.querySelector('[data-ti="titolo"]');
    var d = blocco.querySelector('[data-ti="testo"]');
    var a = blocco.querySelector('[data-ti="cta"]');

    if (t) t.textContent = diz[p + '_t'].replace('{L}', liv);
    if (d) d.textContent = diz[p + '_d'].replace('{L}', liv);
    if (a) {
      a.textContent = diz[p + '_c'].replace('{L}', liv) + freccia;
      if (tipo === 'libri') {
        a.setAttribute('href', CFG.urlLibro(lingua, liv));
      } else if (!a.getAttribute('href') || a.getAttribute('href') === '#') {
        a.setAttribute('href', CFG.urlApp(lingua));
      }
    }

    blocco.setAttribute('lang', lingua);
    blocco.setAttribute('dir', RTL[lingua] ? 'rtl' : 'ltr');
  }

  /* ------------------------------------------------------------------ *
   * AVVIO
   * ------------------------------------------------------------------ */

  function init() {
    var lingua = linguaBrowser() || linguaPagina();
    var esistenti = document.querySelectorAll('[data-ti-cta]');

    if (esistenti.length) {
      /* Blocchi messi a mano: lo script li traduce e basta. */
      iniettaCss();
      for (var i = 0; i < esistenti.length; i++) applica(esistenti[i], lingua);
      return;
    }

    if (!CFG.autoInserimento) return;

    var tipo = tipoPerPagina();
    if (!tipo) return;

    var padre = contenitore();
    if (!padre) return;

    iniettaCss();
    var blocco = costruisci(tipo);
    padre.appendChild(blocco);
    applica(blocco, lingua);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
