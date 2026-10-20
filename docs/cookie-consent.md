# Privacy e consenso — Nessun Dorma

## Inventario del codice al 20 ottobre 2026

- Sito statico Astro, italiano e inglese. Cloudflare Pages eroga pagine, immagini e font locali.
- GTM e GA4 sono predisposti nel repository ma vengono caricati solo dopo consenso esplicito. Nessun altro pixel, iframe, video incorporato, feed social, form, checkout o invio automatico è presente.
- Google Maps, Facebook e Instagram sono link esterni: si aprono solo dopo un clic. Il link telefonico usa `tel:`. Le locandine e le foto sono file locali.
- Il repository non contiene cookie applicativi né `localStorage` prima di questa integrazione. Cloudflare può trattare dati tecnici di richiesta; le impostazioni attive del progetto Cloudflare vanno verificate nel pannello.

## Comportamento attuale

`vanilla-cookieconsent` **3.1.0**, con licenza MIT in `public/licenses/cookieconsent.txt`, è fissato nel lockfile e viene distribuito dai file compilati del sito. Nessuna CDN o piattaforma di consenso a pagamento è necessaria.

Gli ID pubblici di Nessun Dorma (`GTM-MDFF7FRG` e `G-44T1DDD72G`) sono centralizzati in `src/lib/consent-config.ts`. La sola categoria facoltativa `analytics` è inizialmente disattivata. Il banner IT/EN presenta Accetta, Rifiuta e Personalizza; la X salva i soli necessari. Il cookie tecnico `nessun_dorma_consent` registra categorie, identificativo, date e revisione. Il footer permette di modificare la scelta. Consensi scaduti, malformati o di altra revisione non autorizzano Analytics. Nessun identificativo di Hello Agira è utilizzato.

Non esistono mappe, video o altri servizi incorporati da suddividere in ulteriori categorie. Un eventuale nuovo embed richiederà un proprio blocco tecnico, una finalità esplicita, una revisione del consenso e un aggiornamento della policy **prima** della pubblicazione.

## Durate

- Preferenza: **365 giorni** dalla scelta; non viene rinnovata semplicemente visitando il sito. Scelta e rifiuto persistono in ugual modo. La revisione cambia soltanto per modifiche sostanziali a finalità, fornitori o condizioni.
- `_ga` e `_ga_*`, solo qualora GA4 sia attivato e autorizzato: **180 giorni** configurati con `cookie_update: false`. Verificare che il tag nel container non sovrascriva questi parametri. La durata sul browser è distinta dalla conservazione dei dati nel pannello GA4.
- Non viene dichiarata una durata dei log Cloudflare o dei dati Google: dipende da impostazioni e contratti da verificare.

## Configurazione Analytics

Gli identificativi e il dominio `https://nessundormapub.it` sono predefiniti nella build. Le variabili `PUBLIC_GTM_ID`, `PUBLIC_GA4_ID` e `SITE_URL` servono soltanto per ambienti alternativi; `PUBLIC_ANALYTICS_ENABLED=false` disattiva completamente il banner e il caricamento Analytics. Non aggiungere snippet Google nel layout, nell'HTML o in Cloudflare. Il bootstrap imposta gli stati di Consent Mode Basic come negati e `ga-disable-G-44T1DDD72G=true` senza inviare richieste. Dopo consenso alle statistiche, abilita solo `analytics_storage`, configura la scadenza e carica una sola volta GTM. `ad_storage`, `ad_user_data` e `ad_personalization` rimangono negati. Nessun iframe GTM `noscript`: senza JavaScript non si può raccogliere la scelta.

Quando si revocano le statistiche, la pagina disabilita il tag, elimina i cookie `_ga*`, `_gid` e `_gat*` di prima parte accessibili su percorsi e domini raggiungibili, poi ricarica per interrompere script, timer e listener già avviati. I cambiamenti tra schede sono comunicati via `BroadcastChannel`, con controlli su focus, visibilità e ritorno dalla cronologia; un controllo periodico rileva scadenze a pagina aperta. Cookie di terze parti non accessibili e dati già raccolti dai fornitori non possono essere rimossi dal JavaScript del sito.

## Pannelli da verificare prima della pubblicazione

1. **Google Tag Manager:** un solo tag Google GA4 previsto; nessun tag Ads, remarketing, custom HTML, Conversion Linker, pixel o trigger pubblicitario; nessuno snippet duplicato. Controllare i trigger e la pagina pubblicata dopo il deploy. Il consenso alle statistiche non autorizza eventuali tag pubblicitari presenti nel container.
2. **GA4:** proprietà e flusso di Nessun Dorma, conservazione di dati utente/evento, Google Signals, collegamenti Google Ads, condivisioni, trattamento e trasferimenti; verificare che la configurazione del tag mantenga `cookie_expires` e `cookie_update` e non abiliti funzioni pubblicitarie.
3. **Cloudflare Pages e dominio:** Web Analytics / RUM, automatic injection, Zaraz, Apps, Workers, Transform Rules e altri script aggiunti all'edge; Bot Management o challenge possono introdurre cookie propri. Verificare log e loro durata, DPA e localizzazione/trasferimenti. L'audit del repository non vede modifiche apportate dopo la build.
4. **Dominio:** verificare DNS e TLS su `nessundormapub.it`; ripetere le verifiche sul sito pubblico con browser pulito.

## Informativa e punti aperti

Il titolare indicato è Mario Cortelletti, contatto scritto `info@nessundormapub.it`, locale in Via Cairoli 21, Agira. L'informativa bilingue è in `/privacy/` e `/en/privacy/`. Restano da verificare eventuale denominazione d'impresa e partita IVA, assetto e conservazione dei log Cloudflare, accordi e trasferimenti dei fornitori, proprietà e configurazione reale GTM/GA4. Nessuna transazione, account o prenotazione è presente nel codice, quindi non sono stati creati termini contrattuali separati; sono incluse note sui materiali e sull'aggiornamento delle informazioni.

## Verifiche eseguite localmente

- Build statica IT/EN e `npm run verify`: policy, link, assenza di tag Google precaricati e licenza.
- Browser Chromium headless: con Analytics disattivato via flag, su desktop 1440 e mobile 390/320: zero cookie, zero richieste esterne, nessun errore JS e nessun overflow orizzontale.
- Build separata con **ID fittizi intercettati localmente** (`GTM-TEST123`, `G-TEST123`): prima della scelta nessuna richiesta Google; Rifiuta, X e Personalizza senza selezionare statistiche salvano solo necessari; Accetta avvia una sola richiesta GTM; revoca cancella un cookie `_ga` simulato e ricarica; seconda scheda rileva il cambio; revisione errata non avvia GTM; banner mobile visibile. Questi test non ispezionano il contenuto di un container GTM reale.
- Build con gli ID reali: browser Chromium con richieste GTM intercettate localmente. Prima della scelta zero richieste; rifiuto, X e personalizzazione senza statistiche zero; accettazione una richiesta a `gtm.js?id=GTM-MDFF7FRG`; revoca rimuove `_ga` simulato e interrompe i caricamenti; sincronizzazione tra schede, revisione non valida e mobile 320 px passano. L’intercettazione non verifica il contenuto del container pubblicato. Sul dominio pubblico ripetere i controlli per `googletagmanager.com`, `google-analytics.com`, `google.com`, `/cdn-cgi/rum/` e cookie prima e dopo le scelte. Ripetere sul dominio pubblico: richieste verso `googletagmanager.com`, `google-analytics.com`, `google.com`, `/cdn-cgi/rum/` e cookie del browser prima/dopo ciascuna scelta. Verificare su dispositivo mobile reale se disponibile.

## Riferimenti

- https://github.com/orestbida/cookieconsent
- https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://www.garanteprivacy.it/faq/Cookie
- https://eur-lex.europa.eu/eli/reg/2016/679/ojv
- https://developers.cloudflare.com/pages/how-to/web-analytics/
