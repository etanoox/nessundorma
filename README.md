# Nessun Dorma — Agira

Prima versione del sito di Nessun Dorma Cocktail Bar. One-page in italiano (`/`) e inglese (`/en/`), sviluppata con Astro, CSS e JavaScript essenziale. Contenuti già presenti nell’HTML, senza dipendenza da JavaScript per leggere i menu.

## Avvio sul Mac

Serve Node.js 22.12 o successivo. Estrai questa cartella, apri il Terminale al suo interno e lancia:

```bash
npm ci
npm run dev
```

Apri l’indirizzo mostrato nel Terminale, normalmente `http://localhost:4321`.

```bash
npm run build
npm run verify
npm run preview
```

`dist/` è il sito compilato. Le due lingue sono pagine statiche complete. Il menu food è interamente statico; le sei categorie cocktail sono espandibili. Le locandine si aprono a dimensione maggiore e funzionano anche senza JavaScript come link alle immagini.

## GitHub e Cloudflare Pages

1. Crea un repository GitHub e carica il contenuto di questa cartella. `node_modules`, `dist` e `.astro` sono esclusi da Git.
2. Su Cloudflare Pages collega il repository.
3. Imposta comando di build `npm run build` e directory di output `dist`.
4. Imposta `NODE_VERSION` a `22.16.0` o una versione successiva compatibile.
5. Quando il dominio definitivo è confermato, aggiungi la variabile `SITE_URL` con il suo indirizzo HTTPS (senza percorsi) e ricompila. Verranno generati canonical, alternate assoluti, sitemap e robots.txt con il dominio corretto.

Non servono database, funzioni server o un adattatore Cloudflare. Nessun servizio a pagamento è integrato nel progetto. La configurazione segue la documentazione ufficiale di [Cloudflare Pages per Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

## Dove aggiornare i contenuti

| Contenuto | File |
| --- | --- |
| Cocktail e ingredienti delle focacce, IT/EN | `src/data/menu.ts` |
| Contatti e locandine degli eventi | `src/data/site.ts` |
| Testi, orari e struttura della pagina | `src/components/Home.astro` |
| Colori, tipografia, layout e responsive | `src/styles/global.css` |
| Fotografie e logo ufficiale | `public/images/` |
| Locandine | `public/posters/` |

Le foto sono fornite da Giuseppe per questo progetto. Il logo ufficiale è conservato senza ridisegno. Le fotografie sono ottimizzate in WebP con conversione in sRGB; il ritaglio visivo dipende dal layout. I font Cormorant Garamond e Manrope sono serviti localmente dai pacchetti Fontsource. Non vengono caricati font, mappe o feed social da terzi all’apertura della pagina. I collegamenti esterni si attivano solo quando il visitatore li apre. Nessun analytics, cookie di tracciamento, form o invio automatico è integrato.

La sezione fotografica del locale contiene i sette nuovi scatti: arco, specchio, dettagli del banco, Mario al lavoro, dipinto, parete in pietra e carambola. Lo scatto della parete era allegato sia in JPG sia in WebP: sul sito appare una sola volta in WebP.

## Contenuti da confermare prima della versione definitiva

- Nel Mai Tai il foglio indica **Monin** senza specificare prodotto o gusto. È stato conservato così, senza aggiungere un ingrediente inventato.
- Le ricette restano quelle del foglio di Mario, anche quando differiscono dalle versioni comuni: per esempio limone nei Mojito, mirtillo nel Cosmopolitan e sciroppo di fragola nel Sex on the Beach. In inglese “mirtillo” è tradotto letteralmente “blueberry”: chiarire con Mario se intende cranberry.
- La locandina **Pink Tribute** riporta il 19 settembre alle 22, senza anno. Il sito non attribuisce un anno. Tutte e tre le locandine sono etichettate come eventi passati.
- Nessun prezzo esposto. Nessun calendario futuro inventato. Le foto del tagliere e della pausa raccontano il locale; non è stato creato un listino di prodotti non confermati.
- Per i contatti è attivo il link telefonico. WhatsApp non è inserito perché non è stato confermato come canale del locale.
- Il link Facebook è quello fornito. Potrà essere sostituito con l’URL permanente della pagina quando disponibile.

## Controlli inclusi

La build è statica e il comando `npm run verify` controlla entrambe le lingue, i 44 cocktail, le quattro categorie food, i tre eventi, le ancore, i riferimenti agli asset, i contatti e il JSON-LD BarOrPub. Nessun prezzo né dato commerciale non fornito è aggiunto. Il layout include navigazione mobile, focus visibile, dialog nativo, immagini responsive e rispetto di `prefers-reduced-motion`.
