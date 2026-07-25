#!/usr/bin/env python3
"""genera-servizio.py — online, tarieven, CILS e i due pillar, con le classi di style.css."""
import pathlib, html
from genera_pagine_mod import guscio, SITO, BLOCCO_MATERIALE, BLOCCO_CHI, FAQ_BASE

P = {}

P["italiaans-online-leren"] = dict(
 titolo_seo="Italiaans online leren met een docent — privéles van A1 tot C2",
 meta="Online privéles Italiaans met een moedertaalspreker en didactiekmaster. Vaste docent, eigen lesmateriaal, 700+ oefeningen en een app. Van A1 tot C2.",
 h1="Italiaans online leren met een docent", tag="Online · wereldwijd",
 occhiello="Eén vaste docent, een opgebouwd traject van A1 tot C2, en lesmateriaal dat ik zelf schrijf. Geen losse lessen bij steeds iemand anders.",
 corpo="""      <h2>Het probleem met de meeste online lessen</h2>
      <p>Op de grote platforms boek je een uur bij iemand die je nog niet kent. Het uur is
      vaak leuk. Maar er is geen plan, niemand houdt bij waar je gebleven bent, en tussen
      twee lessen gebeurt er niets. Na een half jaar heb je twintig aangename gesprekken
      gehad en sta je ongeveer waar je begon.</p>
      <blockquote class="citazione">
        <p>&ldquo;Anders dan veel italki-docenten, van wie de lessen vaak structuur missen,
        is Alessio erg georganiseerd: hij bereidt elke les zorgvuldig voor en past die aan
        mijn eigen interesses aan.&rdquo;</p>
        <footer>— Matthijs</footer>
      </blockquote>

      <h2>Wat je hier wél krijgt</h2>
      <div class="lessons-grid">
        <div class="lesson-card"><h3>Eén docent</h3><p>Dezelfde persoon van A1 tot C2. Ik weet wat je vorige maand fout deed.</p></div>
        <div class="lesson-card"><h3>Een echt traject</h3><p>Volgens de officiële ERK-niveaus, met duidelijke tussenstappen.</p></div>
        <div class="lesson-card"><h3>Werk tussendoor</h3><p>Een schrijfopdracht die ik corrigeer, plus gerichte oefeningen.</p></div>
        <div class="lesson-card"><h3>Materiaal dat blijft</h3><p>700+ oefeningen, een app en graded readers. Ook als je stopt.</p></div>
      </div>

      <h2>Hoe een online les eruitziet</h2>
      <p>Een les duurt {{DUUR_LES}} en is voor ongeveer twee derde spreken. Ik corrigeer
      terwijl je praat, niet achteraf in een lijstje. Het thema kies je zelf mee: je werk,
      je reis, een artikel dat je gelezen hebt.</p>
      <p>Je hebt alleen een browser, een koptelefoon en een rustige plek nodig. Geen account,
      geen speciale software, geen platform dat een deel van je lesgeld inhoudt.</p>
      <div class="nota"><p><strong>Combineren mag.</strong> Woon je tussen Ede en Amsterdam?
      Dan kun je afwisselen: om de week bij jou thuis in <a href="/italiaanse-les-ede">Ede</a>
      of <a href="/italiaanse-les-amersfoort">Amersfoort</a>, de andere week online.</p></div>"""
      + BLOCCO_MATERIALE + BLOCCO_CHI,
 faq=[("Werkt online les net zo goed als op locatie?","Voor een privéles wel. Je zit dichter bij het scherm dan bij een docent aan tafel, materiaal deel ik direct, en er gaat geen tijd verloren aan reizen."),
      ("Ik woon niet in Nederland. Kan dat?","Ja. Ik geef les aan cursisten over de hele wereld en spreek Italiaans, Engels en Frans vloeiend, plus Nederlands en Spaans op gemiddeld niveau."),
      ("Wat is het verschil met italki of Preply?","Daar boek je losse lessen bij wisselende docenten, meestal zonder doorlopend programma. Hier heb je één docent, één opgebouwd traject en lesmateriaal dat ik zelf schrijf."),
      ("Wat als ik een keer niet kan?","{{ANNULERINGSBELEID}}")],
 schema=f"""    {{
      "@type": "Service", "name": "Online privéles Italiaans",
      "serviceType": "Online taalles Italiaans",
      "provider": {{ "@id": "{SITO}/#business" }},
      "areaServed": {{ "@type": "Country", "name": "Wereldwijd" }},
      "offers": {{ "@type": "Offer", "url": "{SITO}/tarieven", "priceCurrency": "EUR", "price": "{{{{PRIJS_LOS_UUR}}}}" }}
    }}""",
 cta=("Eerst kijken of het klikt","Een gratis kennismaking van een half uur, waar je ook woont."))

P["tarieven"] = dict(
 titolo_seo="Tarieven Italiaanse les — alles op een rij, geen intakekosten",
 meta="Alle tarieven voor privéles Italiaans, online en op locatie. Gratis kennismaking, geen intakekosten, geen verplicht lesboek.",
 h1="Tarieven", tag="Duidelijk vooraf",
 occhiello="Alles staat hieronder. Geen intakekosten, geen verplicht lesboek, geen bedragen die pas in het gesprek naar boven komen.",
 corpo="""      <h2>Privéles</h2>
      <table class="tabella">
        <thead><tr><th>Wat</th><th>Duur</th><th>Prijs</th></tr></thead>
        <tbody>
          <tr><td><strong>Kennismaking</strong></td><td>{{DUUR_KENNISMAKING}}</td><td><strong>Gratis</strong></td></tr>
          <tr><td>Losse les — online</td><td>{{DUUR_LES}}</td><td>{{PRIJS_LOS_UUR}}</td></tr>
          <tr><td>Losse les — op locatie</td><td>{{DUUR_LES}}</td><td>{{PRIJS_LOCATIE}}</td></tr>
          <tr><td>Pakket van {{AANTAL_PAKKET}} lessen</td><td>{{DUUR_LES}} per les</td><td>{{PRIJS_PAKKET}}</td></tr>
          <tr><td>Duo-les (twee personen)</td><td>{{DUUR_LES}}</td><td>{{PRIJS_DUO}}</td></tr>
          <tr><td>Zakelijk / in-company</td><td>In overleg</td><td>{{PRIJS_ZAKELIJK}}</td></tr>
        </tbody>
      </table>
      <p>{{BTW_REGEL}} · {{REISKOSTEN_REGEL}}</p>

      <h2>Wat er altijd bij zit</h2>
      <ul class="elenco-check">
        <li><strong>Al het lesmateriaal.</strong> Ik schrijf het zelf, je koopt geen boek.</li>
        <li><strong>Ruim 700 online oefeningen</strong>, gratis en zonder account.</li>
        <li><strong>Een schrijfopdracht per les</strong>, door mij gecorrigeerd.</li>
        <li><strong>Een lesplan op maat</strong>, afgestemd op jouw doel en niveau.</li>
        <li><strong>Een factuur</strong> met KVK- en btw-gegevens, ook op bedrijfsnaam.</li>
      </ul>

      <div class="nota"><p><strong>Waarom de prijzen hier gewoon staan.</strong> Bij veel
      taalscholen moet je eerst een intakegesprek boeken — soms betaald — voordat je hoort
      wat een traject kost. Ik vind dat een rare manier om te beginnen.</p></div>

      <h2>Gratis, ook als je nooit een les neemt</h2>
      <ul class="elenco-check">
        <li><a href="/esercizi/">Meer dan 700 interactieve oefeningen</a> van A1 tot B2.</li>
        <li><a href="/blog/">Artikelen</a> over grammatica, cultuur en uitdrukkingen.</li>
        <li><a href="/app-ti.html">De app Ti</a> — gratis, inclusief het ERK-traject en het woordenboek.</li>
      </ul>""",
 faq=[("Kost de kennismaking iets?","Nee. De kennismaking is gratis en vrijblijvend, en er zijn geen intakekosten."),
      ("Zijn de tarieven inclusief btw?","{{BTW_ANTWOORD}}"),
      ("Reken je reiskosten voor les op locatie?","{{REISKOSTEN_ANTWOORD}}"),
      ("Wat als ik een les moet afzeggen?","{{ANNULERINGSBELEID}}"),
      ("Kan mijn werkgever dit vergoeden?","Vaak wel. Je krijgt een factuur op naam van het bedrijf, met KVK- en btw-gegevens."),
      ("Hoe wordt er betaald?","{{BETAALWIJZE}}")],
 schema="", cta=("Nog even kijken of het klikt?","De kennismaking kost niets en verplicht tot niets."))

if __name__ == "__main__":
    for slug, d in P.items():
        p = pathlib.Path(f"{slug}.html")
        p.write_text(guscio(slug=slug, titolo_seo=d["titolo_seo"], meta=d["meta"],
            h1=d["h1"], tag=d["tag"], occhiello=d["occhiello"], corpo=d["corpo"],
            voci_faq=d["faq"] + FAQ_BASE[:1], schema_extra=d["schema"],
            cta_titolo=d["cta"][0], cta_testo=d["cta"][1]), encoding="utf-8")
        print(f"  {p.name}")
