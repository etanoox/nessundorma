import { readFile, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

// Verifica i contenuti pubblicati e i riferimenti locali dopo la compilazione.
for (const [file, language] of [['dist/index.html', 'it'], ['dist/en/index.html', 'en']]) {
  const html = await readFile(file, 'utf8');
  assert.ok(html.includes(`<html lang="${language}">`), `${file}: lingua errata`);
  assert.equal((html.match(/class="drink"/g) || []).length, 44, `${file}: cocktail mancanti`);
  assert.equal((html.match(/class="food-category"/g) || []).length, 4, `${file}: categorie food mancanti`);
  assert.equal((html.match(/class="event-card reveal"/g) || []).length, 3, `${file}: eventi mancanti`);
  assert.equal((html.match(/class="gallery-tile /g) || []).length, 6, `${file}: foto del locale mancanti`);
  assert.ok(html.includes('class="story-photo reveal"><img src="/images/mario-al-banco.webp"'), `${file}: foto di Mario non aggiornata`);
  assert.ok(html.includes('tel:+393348720911'), `${file}: numero errato`);
  assert.ok(html.includes('Via Cairoli 21'), `${file}: indirizzo mancante`);
  assert.ok(html.includes('data-cookie-preferences') === (process.env.PUBLIC_ANALYTICS_ENABLED !== 'false'), `${file}: comando preferenze non coerente con la configurazione`);
  assert.ok(html.includes(`href="${language === 'it' ? '/privacy/' : '/en/privacy/'}"`), `${file}: informativa non collegata`);
  assert.ok(!/<(?:script|iframe)\b[^>]*\ssrc="https?:\/\/[^" ]*(?:googletagmanager|google-analytics|google\.com)/i.test(html), `${file}: servizio Google caricato prima del consenso`);
  assert.ok(!/\b(?:price|prezzo)\s*[:=]\s*["']?\d|\d\s*€/i.test(html), `${file}: non sono previsti prezzi specifici`);
  assert.ok(!/Lorem ipsum|TODO|placeholder/i.test(html), `${file}: testo provvisorio`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: ID duplicati`);
  for (const m of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(m[1]), `${file}: ancora inesistente ${m[1]}`);
  for (const m of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)"/g)) {
    if (m[1] === '/' || m[1] === '/en/') continue;
    await access(join('dist', m[1]));
  }
  const json = JSON.parse(html.match(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(json['@type'], 'BarOrPub');
  assert.equal(json.openingHoursSpecification[1].closes, '03:00');
  assert.equal(json.priceRange, '€');
  assert.equal(json.address.postalCode, '94011');
  assert.equal(json.servesCuisine, language === 'it' ? 'Focacce e taglieri' : 'Focaccia and sharing boards');
  assert.equal(json.image, 'https://nessundormapub.it/images/atmosfera.webp');
  assert.ok(html.includes('<meta property="og:image" content="https://nessundormapub.it/images/atmosfera.webp"'), `${file}: immagine social mancante`);
  console.log(`${file}: 44 cocktail, 4 categorie food, 3 eventi, link e dati strutturati OK.`);
}
const cssDir = await readdir('dist/_astro');
assert.ok(cssDir.some(x => x.endsWith('.css')), 'CSS compilato mancante');
for (const [file, language] of [['dist/privacy/index.html', 'it'], ['dist/en/privacy/index.html', 'en']]) {
  const html = await readFile(file, 'utf8');
  assert.ok(html.includes(`<html lang="${language}">`), `${file}: lingua errata`);
  assert.ok(html.includes('vanilla-cookieconsent') === (process.env.PUBLIC_ANALYTICS_ENABLED !== 'false'), `${file}: informativa cookie incoerente`);
  assert.ok(!/<(?:script|iframe)\b[^>]*\ssrc="https?:\/\/[^" ]*(?:googletagmanager|google-analytics|google\.com)/i.test(html), `${file}: servizio Google caricato prima del consenso`);
}
const licence = await readFile('dist/licenses/cookieconsent.txt', 'utf8');
assert.ok(licence.startsWith('MIT License') && licence.includes('Orest Bida'), 'Licenza CookieConsent mancante');
console.log('Verifica completata.');
