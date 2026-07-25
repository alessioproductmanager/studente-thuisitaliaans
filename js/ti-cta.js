/* ti-cta.js — banner CTA multilingua + CTA libri per livello
 *
 * Nessun analytics, nessun cookie, nessun localStorage, nessuna richiesta di rete.
 * Legge solo navigator.languages (non richiede consenso GDPR: non è storage).
 *
 * PRINCIPIO SEO: l'HTML della pagina contiene già la versione nella lingua
 * della pagina. Questo script SOSTITUISCE il testo solo se il browser è
 * impostato su un'altra lingua supportata. Senza JS il blocco funziona lo
 * stesso, e Google indicizza la versione server-side.
 *
 * USO:
 *   <script src="/js/ti-cta.js" defer></script>
 */
(function () {
  'use strict';

  var LINGUE = ['sq','ar','bn','zh','de','en','es','fr','it','nl','pt','ro','tl','ti','uk'];
  var RTL = { ar: true };

  /* URL dei libri per livello. Cambia qui se cambi i nomi dei file. */
  var LIBRI = {
    A1: '/libri-italiano-facile-a1.html',
    A2: '/libri-italiano-facile-a2.html',
    B1: '/libri-italiano-facile-b1.html',
    B2: '/libri-italiano-facile-b2.html',
    C1: '/libri-italiano-facile-c1.html',
    C2: '/libri-italiano-facile-c2.html'
  };

  /* Fallback: livello dedotto dalla categoria del post, se manca data-livello.
     Le categorie senza livello (for-teachers, italian-classes) non mostrano
     il blocco libri: cambia il data-ti-cta a "app" su quelle pagine. */
  var LIVELLO_PER_CATEGORIA = {
    'language-hacking': 'A1',
    'cultura-italiana': 'A2',
    'modi-di-dire': 'B1',
    'reading-practice': 'B2'
  };

  var LIVELLO_DEFAULT = 'A2';

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

  function linguaBrowser() {
    var lista = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'it'];
    for (var i = 0; i < lista.length; i++) {
      var code = String(lista[i]).toLowerCase().split('-')[0];
      if (code === 'fil') code = 'tl';          /* Filippino → Tagalog */
      if (code === 'tir') code = 'ti';
      if (LINGUE.indexOf(code) !== -1) return code;
    }
    return null;
  }

  function linguaPagina() {
    var l = (document.documentElement.getAttribute('lang') || 'it').toLowerCase().split('-')[0];
    return LINGUE.indexOf(l) !== -1 ? l : 'it';
  }

  function livelloDi(blocco) {
    /* 1. attributo esplicito sul blocco */
    var l = blocco.getAttribute('data-livello');
    if (l) return l.toUpperCase();
    /* 2. <meta name="livello" content="B1"> nella pagina */
    var meta = document.querySelector('meta[name="livello"]');
    if (meta && meta.content) return meta.content.toUpperCase();
    /* 3. categoria del post */
    var cat = document.querySelector('meta[name="categoria"]');
    if (cat && LIVELLO_PER_CATEGORIA[cat.content]) return LIVELLO_PER_CATEGORIA[cat.content];
    /* 4. categoria dedotta dall'URL (…/category-modi-di-dire.html o body class) */
    var chiavi = Object.keys(LIVELLO_PER_CATEGORIA);
    var corpo = document.body.className + ' ' + location.pathname;
    for (var i = 0; i < chiavi.length; i++) {
      if (corpo.indexOf(chiavi[i]) !== -1) return LIVELLO_PER_CATEGORIA[chiavi[i]];
    }
    return LIVELLO_DEFAULT;
  }

  function scrivi(el, testo) {
    if (el && testo) el.textContent = testo;
  }

  function applica(blocco, lingua) {
    var tipo = blocco.getAttribute('data-ti-cta');
    var p = PREFISSI[tipo];
    if (!p) return;

    var dizionario = T[lingua] || T.it;
    var livello = livelloDi(blocco);

    var titolo = blocco.querySelector('[data-ti="titolo"]');
    var testo = blocco.querySelector('[data-ti="testo"]');
    var cta = blocco.querySelector('[data-ti="cta"]');

    var freccia = RTL[lingua] ? ' \u2190' : ' \u2192';

    scrivi(titolo, dizionario[p + '_t'].replace('{L}', livello));
    scrivi(testo, dizionario[p + '_d'].replace('{L}', livello));
    if (cta) {
      cta.textContent = dizionario[p + '_c'].replace('{L}', livello) + freccia;
      if (tipo === 'libri' && LIBRI[livello]) cta.setAttribute('href', LIBRI[livello]);
    }

    blocco.setAttribute('lang', lingua);
    blocco.setAttribute('dir', RTL[lingua] ? 'rtl' : 'ltr');
  }

  function init() {
    var blocchi = document.querySelectorAll('[data-ti-cta]');
    if (!blocchi.length) return;

    var pagina = linguaPagina();
    var browser = linguaBrowser();
    var lingua = browser || pagina;

    for (var i = 0; i < blocchi.length; i++) {
      var b = blocchi[i];
      /* Il livello va sempre risolto, anche se la lingua non cambia:
         così la CTA libri smette di puntare sempre ad A1. */
      if (lingua !== pagina || b.getAttribute('data-ti-cta') === 'libri') {
        applica(b, lingua);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
