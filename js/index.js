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
 * Risoluzione URL dopo la riorganizzazione in cartelle.
 * Gli URL pubblici NON cambiano: /zakelijk-italiaans continua a
 * rispondere 200 anche se il file ora sta in /lessen/.
 * Ordine di ricerca: root → lessen → niveaus.
 * ------------------------------------------------------------------ */
const CARTELLE = ["", "lessen/", "niveaus/"];

async function risolviAsset(request, env) {
	const url = new URL(request.url);
	let p = url.pathname;

	// Le cartelle già organizzate e i file statici passano diretti.
	if (/^\/(assets|css|js|esercizi|blog|libri|boeken|books|lingue|it|en)\//.test(p)
	    || /\.[a-z0-9]{2,5}$/i.test(p) && !p.endsWith(".html")) {
		return env.ASSETS.fetch(request);
	}

	// Nome del documento, senza slash iniziale ed estensione.
	let nome = p.replace(/^\//, "").replace(/\/$/, "").replace(/\.html$/, "");
	if (!nome) return env.ASSETS.fetch(request);

	for (const cartella of CARTELLE) {
		const prova = new URL(`/${cartella}${nome}.html`, url.origin);
		const r = await env.ASSETS.fetch(new Request(prova, request));
		if (r.status === 200) return r;
	}
	return env.ASSETS.fetch(request);
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.pathname === "/api/contatto") return gestisciContatto(request, env);

		const asset = await risolviAsset(request, env);
		const contentType = asset.headers.get("content-type") || "";
		if (!contentType.includes("text/html")) return asset;

		const paese = request.cf && request.cf.country;
		let rewriter = new HTMLRewriter().on("body", new IniettoreBeacon());
		if (paese) rewriter = rewriter.on("html", { element(el) { el.setAttribute("data-paese", paese); } });
		return rewriter.transform(asset);
	},
};
