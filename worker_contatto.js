// worker_contatto.js — Cloudflare Worker per il modulo "Scrivi alla scuola"
// Rotta consigliata: thuisitaliaans.com/scuole/api/contatto
// Segreto da impostare:  wrangler secret put RESEND_API_KEY
// Rigenerato da genera_sito.py: NON modificare EMAILS a mano, compilare `email` in dati.js.

const MITTENTE = "posta@thuisitaliaans.com";     // indirizzo VERIFICATO su Resend (dominio thuisitaliaans.com)
const PROPRIETARIO = "info@thuisitaliaans.com";  // la tua casella: riceve copia di ogni messaggio
const ORIGINE = "https://thuisitaliaans.com";

const EMAILS = {
  "scuola-leonardo-da-vinci-firenze": "",
  "abc-firenze": "",
  "centro-fiorenza": "",
  "istituto-michelangelo": "",
  "europass-italian-language-school": "",
  "centro-machiavelli": "",
  "linguaviva": "",
  "accademia-del-giglio": "",
  "scuola-toscana": "",
  "istituto-il-david": "",
  "parola-italian-language-school": "",
  "istituto-lorenzo-de-medici-firenze": "",
  "centro-lingua-italiana-calvino": "",
  "istituto-galilei": "",
  "sprachcaffe-firenze": "",
  "istituto-europeo": "",
  "centro-ponte-vecchio": "",
  "accademia-europea-di-firenze": "",
  "centro-koine-firenze": "",
  "accademia-riaci": "",
  "dilit-international-house": "",
  "torre-di-babele": "",
  "scuola-leonardo-da-vinci-roma": "",
  "studioitalia": "",
  "kappa-language-school": "",
  "scudit-scuola-d-italiano": "",
  "ciao-italia": "",
  "italiaidea": "",
  "scuola-d-italiano-dante-alighieri-roma": "",
  "istituto-lorenzo-de-medici-roma": "",
  "istituto-italiano": "",
  "scuola-leonardo-da-vinci-milano": "",
  "linguadue": "",
  "il-centro": "",
  "ellci-milano": "",
  "cultura-italiana-bologna": "",
  "madrelingua": "",
  "alce-accademia-lingue-e-culture-europee": "",
  "istituto-venezia": "",
  "easy-italian-language-art": "",
  "ca-foscari-school-for-international-education": "",
  "idea-verona": "",
  "lingua-it": "",
  "l-italiano-con-noi": "",
  "bertrand-russell": "",
  "piccola-universita-italiana-trieste": "",
  "istituto-venezia-trieste": "",
  "linguaviva-lignano": "",
  "alpha-beta-piccadilly-bolzano": "",
  "alpha-beta-piccadilly-merano": "",
  "clm-bell-trento": "",
  "clm-bell-riva-del-garda": "",
  "l-italiano-porticando": "",
  "ciaoitaly-scuola-leonardo-da-vinci-torino": "",
  "a-door-to-italy": "",
  "scuola-tricolore": "",
  "abc-school-sestri-levante": "",
  "omnilingua": "",
  "romanica": "",
  "reggio-lingua": "",
  "scuola-palazzo-malvisi-ravenna": "",
  "scuola-palazzo-malvisi-bagno-di-romagna": "",
  "tiberius-international": "",
  "societa-dante-alighieri-siena": "",
  "saena-iulii": "",
  "universita-per-stranieri-di-siena": "",
  "cultura-italiana-arezzo": "",
  "lucca-italian-school": "",
  "centro-koine-lucca": "",
  "istituto-linguistico-mediterraneo": "",
  "centro-culturale-giacomo-puccini": "",
  "scuola-leonardo-da-vinci-viareggio": "",
  "il-sasso": "",
  "terramare": "",
  "centro-fiorenza-isola-d-elba": "",
  "il-sillabo": "",
  "comitato-linguistico": "",
  "universita-per-stranieri-di-perugia": "",
  "accademia-lingua-italiana-assisi": "",
  "lingua-si": "",
  "la-lingua-la-vita": "",
  "centro-studi-italiani": "",
  "scuola-dante-alighieri-campus-l-infinito": "",
  "istituto-lorenzo-de-medici-tuscania": "",
  "centro-italiano": "",
  "sant-anna-institute": "",
  "accademia-italiana-salerno": "",
  "accademia-leonardo": "",
  "piccola-universita-italiana-tropea": "",
  "caffe-italiano-club": "",
  "universita-per-stranieri-dante-alighieri": "",
  "porta-d-oriente": "",
  "babilonia-centro-di-lingua-e-cultura-italiana": "",
  "laboling": "",
  "solemar-academy": "",
  "solemar-sicilia": "",
  "itastra-universita-di-palermo": "",
  "scuola-virgilio": "",
  "pintadera-centro-mediterraneo": "",
  "one-world-italiano": ""
};
const NOMI = {
  "scuola-leonardo-da-vinci-firenze": "Scuola Leonardo da Vinci Firenze",
  "abc-firenze": "ABC Firenze",
  "centro-fiorenza": "Centro Fiorenza",
  "istituto-michelangelo": "Istituto Michelangelo",
  "europass-italian-language-school": "Europass Italian Language School",
  "centro-machiavelli": "Centro Machiavelli",
  "linguaviva": "Linguaviva",
  "accademia-del-giglio": "Accademia del Giglio",
  "scuola-toscana": "Scuola Toscana",
  "istituto-il-david": "Istituto Il David",
  "parola-italian-language-school": "Parola Italian Language School",
  "istituto-lorenzo-de-medici-firenze": "Istituto Lorenzo de' Medici Firenze",
  "centro-lingua-italiana-calvino": "Centro Lingua Italiana Calvino",
  "istituto-galilei": "Istituto Galilei",
  "sprachcaffe-firenze": "Sprachcaffe Firenze",
  "istituto-europeo": "Istituto Europeo",
  "centro-ponte-vecchio": "Centro Ponte Vecchio",
  "accademia-europea-di-firenze": "Accademia Europea di Firenze",
  "centro-koine-firenze": "Centro Koinè Firenze",
  "accademia-riaci": "Accademia Riaci",
  "dilit-international-house": "Dilit International House",
  "torre-di-babele": "Torre di Babele",
  "scuola-leonardo-da-vinci-roma": "Scuola Leonardo da Vinci Roma",
  "studioitalia": "Studioitalia",
  "kappa-language-school": "Kappa Language School",
  "scudit-scuola-d-italiano": "Scudit Scuola d'Italiano",
  "ciao-italia": "Ciao Italia",
  "italiaidea": "Italiaidea",
  "scuola-d-italiano-dante-alighieri-roma": "Scuola d'Italiano Dante Alighieri Roma",
  "istituto-lorenzo-de-medici-roma": "Istituto Lorenzo de' Medici Roma",
  "istituto-italiano": "Istituto Italiano",
  "scuola-leonardo-da-vinci-milano": "Scuola Leonardo da Vinci Milano",
  "linguadue": "Linguadue",
  "il-centro": "Il Centro",
  "ellci-milano": "ELLCI Milano",
  "cultura-italiana-bologna": "Cultura Italiana Bologna",
  "madrelingua": "Madrelingua",
  "alce-accademia-lingue-e-culture-europee": "ALCE Accademia Lingue e Culture Europee",
  "istituto-venezia": "Istituto Venezia",
  "easy-italian-language-art": "Easy Italian Language & Art",
  "ca-foscari-school-for-international-education": "Ca' Foscari School for International Education",
  "idea-verona": "Idea Verona",
  "lingua-it": "Lingua IT",
  "l-italiano-con-noi": "L'Italiano con Noi",
  "bertrand-russell": "Bertrand Russell",
  "piccola-universita-italiana-trieste": "Piccola Università Italiana Trieste",
  "istituto-venezia-trieste": "Istituto Venezia Trieste",
  "linguaviva-lignano": "Linguaviva Lignano",
  "alpha-beta-piccadilly-bolzano": "Alpha Beta Piccadilly Bolzano",
  "alpha-beta-piccadilly-merano": "Alpha Beta Piccadilly Merano",
  "clm-bell-trento": "CLM Bell Trento",
  "clm-bell-riva-del-garda": "CLM Bell Riva del Garda",
  "l-italiano-porticando": "L'Italiano Porticando",
  "ciaoitaly-scuola-leonardo-da-vinci-torino": "CiaoItaly Scuola Leonardo da Vinci Torino",
  "a-door-to-italy": "A Door to Italy",
  "scuola-tricolore": "Scuola Tricolore",
  "abc-school-sestri-levante": "ABC School Sestri Levante",
  "omnilingua": "Omnilingua",
  "romanica": "Romanica",
  "reggio-lingua": "Reggio Lingua",
  "scuola-palazzo-malvisi-ravenna": "Scuola Palazzo Malvisi Ravenna",
  "scuola-palazzo-malvisi-bagno-di-romagna": "Scuola Palazzo Malvisi Bagno di Romagna",
  "tiberius-international": "Tiberius International",
  "societa-dante-alighieri-siena": "Società Dante Alighieri Siena",
  "saena-iulii": "Saena Iulii",
  "universita-per-stranieri-di-siena": "Università per Stranieri di Siena",
  "cultura-italiana-arezzo": "Cultura Italiana Arezzo",
  "lucca-italian-school": "Lucca Italian School",
  "centro-koine-lucca": "Centro Koinè Lucca",
  "istituto-linguistico-mediterraneo": "Istituto Linguistico Mediterraneo",
  "centro-culturale-giacomo-puccini": "Centro Culturale Giacomo Puccini",
  "scuola-leonardo-da-vinci-viareggio": "Scuola Leonardo da Vinci Viareggio",
  "il-sasso": "Il Sasso",
  "terramare": "Terramare",
  "centro-fiorenza-isola-d-elba": "Centro Fiorenza Isola d'Elba",
  "il-sillabo": "Il Sillabo",
  "comitato-linguistico": "Comitato Linguistico",
  "universita-per-stranieri-di-perugia": "Università per Stranieri di Perugia",
  "accademia-lingua-italiana-assisi": "Accademia Lingua Italiana Assisi",
  "lingua-si": "Lingua Sì",
  "la-lingua-la-vita": "La Lingua La Vita",
  "centro-studi-italiani": "Centro Studi Italiani",
  "scuola-dante-alighieri-campus-l-infinito": "Scuola Dante Alighieri Campus L'Infinito",
  "istituto-lorenzo-de-medici-tuscania": "Istituto Lorenzo de' Medici Tuscania",
  "centro-italiano": "Centro Italiano",
  "sant-anna-institute": "Sant'Anna Institute",
  "accademia-italiana-salerno": "Accademia Italiana Salerno",
  "accademia-leonardo": "Accademia Leonardo",
  "piccola-universita-italiana-tropea": "Piccola Università Italiana Tropea",
  "caffe-italiano-club": "Caffè Italiano Club",
  "universita-per-stranieri-dante-alighieri": "Università per Stranieri Dante Alighieri",
  "porta-d-oriente": "Porta d'Oriente",
  "babilonia-centro-di-lingua-e-cultura-italiana": "Babilonia Centro di Lingua e Cultura Italiana",
  "laboling": "Laboling",
  "solemar-academy": "Solemar Academy",
  "solemar-sicilia": "Solemar Sicilia",
  "itastra-universita-di-palermo": "Itastra Università di Palermo",
  "scuola-virgilio": "Scuola Virgilio",
  "pintadera-centro-mediterraneo": "Pintadera Centro Mediterraneo",
  "one-world-italiano": "One World Italiano"
};

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
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || msg.length < 10 || !(id in NOMI))
      return new Response("Dati mancanti", { status: 400, headers: CORS });

    const destScuola = EMAILS[id] || "";
    const to = destScuola || PROPRIETARIO;

    const corpo =
      "Uno studente sul sito thuisitaliaans ha un messaggio per te:\n\n" +
      msg + "\n\n" +
      "— " + nome + " <" + email + ">\n" +
      "Scuola: " + NOMI[id] + "\n" +
      "Pagina: " + String(d.pagina || "") + "\n" +
      "Lingua dello studente: " + String(d.lingua || "") +
      (destScuola ? "" : "\n\n[NOTA INTERNA: email della scuola non ancora in archivio — inoltrare a mano]");

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
