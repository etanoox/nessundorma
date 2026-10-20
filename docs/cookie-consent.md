# Privacy e consenso — Nessun Dorma

## Inventario del codice al 20 ottobre 2026

- Sito statico Astro, italiano e inglese. Cloudflare Pages eroga pagine, immagini e font locali.
- Nessun GTM, GA4, pixel, iframe, video incorporato, feed social, form, checkout o invio automatico nel repository corrente.
- Google Maps, Facebook e Instagram sono link esterni: si aprono solo dopo un clic. Il link telefonico usa `tel:`. Le locandine e le foto sono file locali.
- Il repository non contiene cookie applicativi né `localStorage` prima di questa integrazione. Cloudflare può trattare dati tecnici di richiesta; le impostazioni attive del progetto Cloudflare vanno verificate nel pannello.

## Comportamento attuale

`vanilla-cookieconsent` **3.1.0**, con licenza MIT in `public/licenses/cookieconsent.txt`, è fissato nel lockfile e viene distribuito dai file compilati del sito. Nessuna CDN o piattaforma di consenso a pagamento è necessaria.

Finché `PUBLIC_GTM_ID` e `PUBLIC_GA4_ID` non sono entrambi configurati, la libreria non viene eseguita, il banner non appare e non viene creato alcun cookie di preferenza: non ci sono scelte facoltative da chiedere. L'informativa IT/EN resta disponibile nel footer. Questo rispecchia l'inventario reale; non si raccolgono consensi preventivi per strumenti futuri.

Se in futuro vengono configurati **entrambi** gli ID propri di Nessun Dorma, la build attiva la sola categoria facoltativa `analytics`, inizialmente disattivata. Compare il banner IT/EN con Accetta, Rifiuta e Personalizza; la X salva i soli necessari. La scelta viene registrata nel cookie tecnico `nessun_dorma_consent` con categorie, identificativo, data iniziale, ultima data e revisione. Il footer offre sempre l'accesso alle preferenze. Versioni errate, record malformati o scaduti non autorizzano Analytics. L'ID di Hello Agira non è presente né utilizzabile per questo sito.

Non esistono mappe, video o altri servizi incorporati da suddividere in ulteriori categorie. Un eventuale nuovo embed richiederà un proprio blocco tecnico, una finalità esplicita, una revisione del consenso e un aggiornamento della policy **prima** della pubblicazione.

## Durate

- Preferenza: **365 giorni** dalla scelta; non viene rinnovata semplicemente visitando il sito. Scelta e rifiuto persistono in ugual modo. La revisione cambia soltanto per modifiche sostanziali a finalità, fornitori o condizioni.
- `_ga` e `_ga_*`, solo qualora GA4 sia attivato e autorizzato: **180 giorni** configurati con `cookie_update: false`. Verificare che il tag nel container non sovrascriva questi parametri. La durata sul browser è distinta dalla conservazione dei dati nel pannello GA4.
- Non viene dichiarata una durata dei log Cloudflare o dei dati Google: dipende da impostazioni e contratti da verificare.

## Configurazione opzionale Analytics

Impostare nel progetto Cloudflare Pages **solo se si decide di usare GA4**:

```text
PUBLIC_GTM_ID=GTM-...      # container di Nessun Dorma
PUBLIC_GA4_ID=G-...         # proprietà GA4 di Nessun Dorma
```

La build fallisce se manca uno dei due o se il formato è scorretto. `src/lib/consent-config.ts` centralizza ID, revisione, nome e durate. Non aggiungere snippet Google nel layout, nell'HTML o in Cloudflare. Il bootstrap imposta gli stati di Consent Mode Basic come negati e `ga-disable-<ID>=true` senza inviare richieste. Dopo consenso alle statistiche, abilita solo `analytics_storage`, configura la scadenza e carica una sola volta GTM. `ad_storage`, `ad_user_data`, `ad_personalization`, Google Signals e segnali per la personalizzazione pubblicitaria restano disattivati. Nessun iframe GTM `noscript`: senza JavaScript non si può raccogliere la scelta.

Quando si revocano le statistiche, la pagina disabilita il tag, elimina i cookie `_ga*`, `_gid` e `_gat*` di prima parte accessibili su percorsi e domini raggiungibili, poi ricarica per interrompere script, timer e listener già avviati. I cambiamenti tra schede sono comunicati via `BroadcastChannel`, con controlli su focus, visibilità e ritorno dalla cronologia; un controllo periodico rileva scadenze a pagina aperta. Cookie di terze parti non accessibili e dati già raccolti dai fornitori non possono essere rimossi dal JavaScript del sito.

## Pannelli da verificare prima di attivare Analytics

1. **Google Tag Manager:** un solo tag Google GA4 previsto; nessun tag Ads, remarketing, custom HTML, Conversion Linker, pixel o trigger pubblicitario; nessuno snippet duplicato. Controllare i trigger e la pagina pubblicata dopo il deploy. Il consenso alle statistiche non autorizza eventuali tag pubblicitari presenti nel container.
2. **GA4:** proprietà e flusso di Nessun Dorma, conservazione di dati utente/evento, Google Signals, collegamenti Google Ads, condivisioni, trattamento e trasferimenti; verificare che la configurazione del tag mantenga `cookie_expires` e `cookie_update` e non abiliti funzioni pubblicitarie.
3. **Cloudflare Pages e dominio:** Web Analytics / RUM, automatic injection, Zaraz, Apps, Workers, Transform Rules e altri script aggiunti all'edge; Bot Management o challenge possono introdurre cookie propri. Verificare log e loro durata, DPA e localizzazione/trasferimenti. L'audit del repository non vede modifiche apportate dopo la build.
4. **Dominio:** configurare `SITE_URL` con il dominio definitivo per canonical e sitemap; visitare il sito pubblico da browser pulito e ripetere le verifiche di rete e cookie.

## Dati mancanti per finalizzare l'informativa

- Identità/denominazione legale esatta del titolare del sito (persona o impresa), eventuale partita IVA e indirizzo/recapito per richieste privacy. È noto solo il marchio Nessun Dorma, l'indirizzo Via Cairoli 21 e il telefono fornito; non sono stati copiati i dati personali di Hello Agira.
- Dominio definitivo del sito.
- Impostazioni e accordi effettivi di Cloudflare, eventuali strumenti aggiunti dal pannello e conservazione dei log.
- Se si intende attivare GA4: ID propri, conferma del container, impostazioni dell'account e durate; completare nell'informativa il quadro dei destinatari e trasferimenti effettivi.

La pagina `/privacy/` e la versione `/en/privacy/` dichiarano apertamente le informazioni non ancora confermate. La denominazione del titolare e il contatto scritto vanno completati prima di considerare l'informativa definitiva. Non sono presenti transazioni, account o prenotazioni: al momento non emerge la necessità di condizioni contrattuali separate; una breve nota sui materiali e sull'aggiornamento delle informazioni è inclusa nella pagina.

## Verifiche eseguite localmente

- Build statica IT/EN e `npm run verify`: policy, link, assenza di tag Google precaricati e licenza.
- Browser Chromium headless: senza ID, su desktop 1440 e mobile 390/320: zero cookie, zero richieste esterne, nessun errore JS e nessun overflow orizzontale.
- Build separata con **ID fittizi intercettati localmente** (`GTM-TEST123`, `G-TEST123`): prima della scelta nessuna richiesta Google; Rifiuta, X e Personalizza senza selezionare statistiche salvano solo necessari; Accetta avvia una sola richiesta GTM; revoca cancella un cookie `_ga` simulato e ricarica; seconda scheda rileva il cambio; revisione errata non avvia GTM; banner mobile visibile. Questi test non ispezionano il contenuto di un container GTM reale.
- Dopo i test, ricompilare senza ID per la versione attuale. Ripetere sul dominio pubblico: richieste verso `googletagmanager.com`, `google-analytics.com`, `google.com`, `/cdn-cgi/rum/` e cookie del browser prima/dopo ciascuna scelta. Verificare su dispositivo mobile reale se disponibile.

## Riferimenti

- https://github.com/orestbida/cookieconsent
- https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://www.garanteprivacy.it/faq/Cookie
- https://eur-lex.europa.eu/eli/reg/2016/679/ojv
- https://developers.cloudflare.com/pages/how-to/web-analytics/
