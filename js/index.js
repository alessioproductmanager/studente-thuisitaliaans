// ─────────────────────────────────────────────────────────────
//  thuisitaliaans — Worker unico
//  1. serve gli asset statici
//  2. inietta il beacon Cloudflare Web Analytics in ogni HTML
//  3. riceve il modulo di contatto su POST /api/contatto
//
//  SEGRETI DA IMPOSTARE (una volta sola):
//    npx wrangler secret put RESEND_API_KEY
//  VARIABILI (in wrangler.jsonc -> "vars"):
//    MAIL_A   destinatario, es. "thuisitaliaans@gmail.com"
//    MAIL_DA  mittente su dominio verificato, es. "modulo@thuisitaliaans.com"
// ─────────────────────────────────────────────────────────────

const BEACON = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "263e866dd6a24216999ef6625771d40a"}'></script><!-- End Cloudflare Web Analytics -->`;

class IniettoreBeacon {
	element(element) { element.append(BEACON, { html: true }); }
}

const TESTI = {
	nl: { ok: "Bedankt! Ik neem zo snel mogelijk contact met je op.", ko: "Er ging iets mis. Mail me gerust rechtstreeks." },
	en: { ok: "Thanks! I'll get back to you as soon as possible.",    ko: "Something went wrong. Feel free to email me directly." },
	it: { ok: "Grazie! Ti rispondo il prima possibile.",              ko: "Qualcosa e' andato storto. Scrivimi pure direttamente." },
};

function risposta(dati, stato = 200) {
	return new Response(JSON.stringify(dati), {
		status: stato,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}

async function gestisciContatto(request, env) {
	if (request.method !== "POST") return risposta({ ok: false, errore: "metodo non consentito" }, 405);

	const tipo = request.headers.get("content-type") || "";
	const campi = tipo.includes("application/json")
		? await request.json()
		: Object.fromEntries(await request.formData());

	const lingua = TESTI[campi._taal] ? campi._taal : "nl";

	// honeypot: se e' pieno e' un bot. Rispondiamo ok e buttiamo via.
	if (campi._gotcha) return risposta({ ok: true, messaggio: TESTI[lingua].ok });

	const nome      = String(campi.name    || "").trim().slice(0, 120);
	const email     = String(campi.email   || "").trim().slice(0, 160);
	const messaggio = String(campi.message || "").trim().slice(0, 5000);

	if (!nome || !email || !messaggio || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
		return risposta({ ok: false, errore: "campi mancanti o e-mail non valida" }, 400);
	}

	// Nessun provider configurato: lo diciamo chiaramente invece di far
	// finta che sia andata bene. Il client passa al fallback mailto.
	if (!env.RESEND_API_KEY) return risposta({ ok: false, errore: "provider non configurato" }, 503);

	const invio = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
		body: JSON.stringify({
			from: env.MAIL_DA || "modulo@thuisitaliaans.com",
			to: [env.MAIL_A || "thuisitaliaans@gmail.com"],
			reply_to: email,
			subject: `Nuova richiesta di intake — ${nome}`,
			text: `Nome: ${nome}\nE-mail: ${email}\nLingua modulo: ${lingua}\nPagina: ${campi._pagina || "-"}\n\nMessaggio:\n${messaggio}\n`,
		}),
	});

	if (!invio.ok) return risposta({ ok: false, errore: TESTI[lingua].ko }, 502);
	return risposta({ ok: true, messaggio: TESTI[lingua].ok });
}


/* ------------------------------------------------------------------
 * 301 permanenti.
 *
 * 1) Vecchi articoli del blog accorpati in una pagina unica.
 *    Erano stub in noindex con un link "questo articolo e' stato
 *    ampliato": un 301 passa il valore dei link invece di sprecarlo.
 * 2) Percorsi interni delle cartelle di riorganizzazione. Le pagine
 *    sono servite alla radice; /lessen/x e /niveaus/x rispondevano
 *    200 sulla stessa pagina, creando un secondo URL per lo stesso
 *    contenuto.
 * ------------------------------------------------------------------ */
const REDIRECT_301 = {
 "/blog/achieving-italian-language-certification-personalized-lessons": "/why-thuis-italiaans",
 "/blog/custom-italian-courses-designed-for-effective-learning": "/why-thuis-italiaans",
 "/blog/customized-italian-courses": "/why-thuis-italiaans",
 "/blog/discover-our-customized-italian-courses": "/why-thuis-italiaans",
 "/blog/discover-personalized-italian-language-courses": "/why-thuis-italiaans",
 "/blog/discover-the-joy-of-learning-italian-online-with-me": "/why-thuis-italiaans",
 "/blog/discover-the-unique-approach-to-learning-italian-with-alessio": "/why-thuis-italiaans",
 "/blog/dive-into-interactive-italian-learning": "/why-thuis-italiaans",
 "/blog/elevate-your-italian-learning-with-expert-led-online-courses": "/why-thuis-italiaans",
 "/blog/embrace-the-richness-of-italian-culture": "/why-thuis-italiaans",
 "/blog/engaging-personalized-italian-language-courses": "/why-thuis-italiaans",
 "/blog/enhance-your-italian-listening-skills": "/why-thuis-italiaans",
 "/blog/enhance-your-italian-with-conversational-classes": "/why-thuis-italiaans",
 "/blog/enhance-your-italian-with-our-expert-led-online-courses": "/why-thuis-italiaans",
 "/blog/expertly-crafted-italian-courses-with-alessio": "/why-thuis-italiaans",
 "/blog/explore-personalized-online-italian-classes-tailored-to-you": "/why-thuis-italiaans",
 "/blog/immerse-yourself-in-italian-culture-with-customized-language-classes": "/why-thuis-italiaans",
 "/blog/impara-litaliano-ovunque-lezioni-online-e-in-presenza-ad-amsterdam": "/why-thuis-italiaans",
 "/blog/italiaans-leren-in-amsterdam-privelessen-groepslessen-en-online-cursussen": "/waarom-thuis-italiaans",
 "/blog/italian-classes-from-home": "/why-thuis-italiaans",
 "/blog/italian-classes-near-you-and-online": "/why-thuis-italiaans",
 "/blog/italian-courses-for-kids-play-learn-and-grow-with-tailored-italian-lessons": "/why-thuis-italiaans",
 "/blog/italian-culture-courses": "/why-thuis-italiaans",
 "/blog/italian-for-specific-professions-tailored-courses-for-healthcare-law-and-hospitality-and-more": "/why-thuis-italiaans",
 "/blog/italian-for-travel-your-ultimate-guide": "/why-thuis-italiaans",
 "/blog/italian-language-immersion-dive-deep-with-online-italian-lessons": "/why-thuis-italiaans",
 "/blog/italian-private-classes-discover-the-advantages-of-personalized-learning": "/why-thuis-italiaans",
 "/blog/learn-italian-as-a-kid-with-me": "/why-thuis-italiaans",
 "/blog/learn-italian-comprehensive-guide-to-fast-and-effective-learning": "/why-thuis-italiaans",
 "/blog/learn-italian-for-daily-use": "/why-thuis-italiaans",
 "/blog/learn-italian-online-with-alessio": "/why-thuis-italiaans",
 "/blog/learn-italian-online-with-confidence-and-alessio": "/why-thuis-italiaans",
 "/blog/learn-italian-with-our-self-study-materials": "/why-thuis-italiaans",
 "/blog/learning-italian-courses-and-tips-for-every-learner": "/why-thuis-italiaans",
 "/blog/learning-italian-online-for-business-with-alessio": "/why-thuis-italiaans",
 "/blog/leer-overal-italiaans-online-lessen-en-fysieke-lessen-in-amsterdam": "/waarom-thuis-italiaans",
 "/blog/master-italian-for-business-with-alessio": "/why-thuis-italiaans",
 "/blog/master-italian-pronunciation-with-expert-guidance": "/why-thuis-italiaans",
 "/blog/master-italian-with-tailored-language-courses": "/why-thuis-italiaans",
 "/blog/mastering-italian-gestures-with-italian-classes": "/why-thuis-italiaans",
 "/blog/mastering-italian-online": "/why-thuis-italiaans",
 "/blog/mastering-the-italian-language": "/why-thuis-italiaans",
 "/blog/navigating-italian-learning-courses": "/why-thuis-italiaans",
 "/blog/online-italian-courses-with-alessio": "/why-thuis-italiaans",
 "/blog/personalized-italian-classes-tailored-just-for-you": "/why-thuis-italiaans",
 "/blog/personalized-italian-language-learning-customized-courses-for-all-levels": "/why-thuis-italiaans",
 "/blog/private-italian-classes-unlock-your-italian-language-potential-with-a-personalized-approach": "/why-thuis-italiaans",
 "/blog/private-italian-course-exclusive-tailored-education-for-every-learner": "/why-thuis-italiaans",
 "/blog/private-italian-lessons-master-the-language-with-customized-one-on-one-instruction": "/why-thuis-italiaans",
 "/blog/speak-italian-like-a-local-with-alessio": "/why-thuis-italiaans",
 "/blog/tailored-italian-courses-and-innovative-methodology": "/why-thuis-italiaans",
 "/blog/the-power-of-one-on-one-italian-learning": "/why-thuis-italiaans",
 "/blog/transform-your-italian-learning-experience": "/why-thuis-italiaans",
 "/blog/unlocking-italian-fluency-custom-courses-for-you": "/why-thuis-italiaans"
};

const CARTELLE_INTERNE = /^\/(lessen|niveaus)\/([a-z0-9-]+)\/?$/;

function redirectPermanente(url) {
	const p = url.pathname.replace(/\/$/, "") || "/";

	const diretto = REDIRECT_301[p];
	if (diretto) return new URL(diretto + url.search, url.origin).toString();

	const interno = p.match(CARTELLE_INTERNE);
	if (interno) return new URL("/" + interno[2] + url.search, url.origin).toString();

	return null;
}

/* ------------------------------------------------------------------
 * Risoluzione URL dopo la riorganizzazione in cartelle.
 * Gli URL pubblici NON cambiano: /zakelijk-italiaans risponde 200
 * anche se il file ora sta in /lessen/.
 *
 * Nota su Cloudflare: wrangler.jsonc non imposta html_handling, quindi
 * vale il default "auto-trailing-slash":
 *   GET /foo        -> serve /foo.html          (200)
 *   GET /foo.html   -> redirect a /foo          (mai 200)
 *   GET /cartella/  -> serve /cartella/index.html
 * Per questo qui si chiede sempre la forma SENZA estensione.
 * ------------------------------------------------------------------ */
const CARTELLE = ["", "lessen/", "niveaus/", "app/"];
const PASSANTI = /^\/(assets|css|js|esercizi|blog|libri|boeken|books|lingue|it|en)\//;

async function trovaIn(nome, url, request, env) {
	for (const cartella of CARTELLE) {
		const prova = new URL(`/${cartella}${nome}`, url.origin);
		const r = await env.ASSETS.fetch(new Request(prova, request));
		if (r.status === 200) return r;
	}
	return null;
}

async function risolviAsset(request, env) {
	const url = new URL(request.url);
	const p = url.pathname;

	// Cartelle già organizzate e file statici: passano diretti.
	if (PASSANTI.test(p) || (/\.[a-z0-9]{2,5}$/i.test(p) && !p.endsWith(".html"))) {
		return env.ASSETS.fetch(request);
	}

	// Richiesta con .html: si redirige alla forma canonica senza estensione.
	if (p.endsWith(".html")) {
		const pulito = p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
		return Response.redirect(new URL(pulito + url.search, url.origin).toString(), 301);
	}

	const nome = p.replace(/^\//, "").replace(/\/$/, "");
	if (!nome) return env.ASSETS.fetch(request);

	const trovato = await trovaIn(nome, url, request, env);
	return trovato || env.ASSETS.fetch(request);
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.pathname === "/api/contatto") return gestisciContatto(request, env);

		const permanente = redirectPermanente(url);
		if (permanente) return Response.redirect(permanente, 301);

		const asset = await risolviAsset(request, env);
		const contentType = asset.headers.get("content-type") || "";
		if (!contentType.includes("text/html")) return asset;

		const paese = request.cf && request.cf.country;
		let rewriter = new HTMLRewriter().on("body", new IniettoreBeacon());
		if (paese) rewriter = rewriter.on("html", { element(el) { el.setAttribute("data-paese", paese); } });
		return rewriter.transform(asset);
	},
};
