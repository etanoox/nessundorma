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
  assert.equal((html.match(/class="gallery-tile /g) || []).length, 7, `${file}: foto del locale mancanti`);
  assert.ok(html.includes('tel:+393348720911'), `${file}: numero errato`);
  assert.ok(html.includes('Via Cairoli 21'), `${file}: indirizzo mancante`);
  assert.ok(!html.includes('€'), `${file}: non sono previsti prezzi`);
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
  assert.ok(!('priceRange' in json), 'Nessuna fascia di prezzo dichiarata');
  console.log(`${file}: 44 cocktail, 4 categorie food, 3 eventi, link e dati strutturati OK.`);
}
const cssDir = await readdir('dist/_astro');
assert.ok(cssDir.some(x => x.endsWith('.css')), 'CSS compilato mancante');
console.log('Verifica completata.');
