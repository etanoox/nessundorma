import type { Translation } from 'vanilla-cookieconsent';
import { consentConfig } from '../lib/consent-config';

type Lang = 'it' | 'en';
export function consentTranslation(lang: Lang): Translation {
  const l = (it: string, en: string) => lang === 'it' ? it : en;
  const policy = lang === 'it' ? '/privacy/' : '/en/privacy/';
  return {
    consentModal: {
      title: l('La tua scelta sui cookie.', 'Your cookie choice.'),
      description: l(
        `Usiamo un cookie tecnico per ricordare la scelta. Solo se acconsenti attiviamo le statistiche di Google. Puoi rifiutare e continuare a usare il sito; la X mantiene solo i necessari. <a href="${policy}">Privacy e cookie</a>.`,
        `A necessary cookie remembers your choice. Google statistics run only with your consent. You can reject and continue using the site; the X keeps only necessary cookies. <a href="${policy}">Privacy and cookies</a>.`,
      ),
      acceptAllBtn: l('Accetta', 'Accept'),
      acceptNecessaryBtn: l('Rifiuta', 'Reject'),
      showPreferencesBtn: l('Personalizza', 'Customise'),
      closeIconLabel: l('Chiudi e mantieni solo i cookie necessari', 'Close and keep necessary cookies only'),
    },
    preferencesModal: {
      title: l('Preferenze cookie', 'Cookie preferences'),
      acceptAllBtn: l('Accetta', 'Accept'),
      acceptNecessaryBtn: l('Rifiuta', 'Reject'),
      savePreferencesBtn: l('Salva la scelta', 'Save choice'),
      closeIconLabel: l('Chiudi senza modificare la scelta', 'Close without changing your choice'),
      sections: [
        { title: l('Scegli tu', 'Your choice'), description: l(
          `Le statistiche sono facoltative. Puoi modificare o revocare la scelta in qualsiasi momento dal footer. <a href="${policy}">Leggi l’informativa.</a>`,
          `Statistics are optional. You can change or withdraw your choice at any time from the footer. <a href="${policy}">Read the notice.</a>`,
        ) },
        { title: l('Necessari · sempre attivi', 'Necessary · always active'), description: l(
          `Il cookie ${consentConfig.cookieName} conserva categorie, identificativo, date e revisione della scelta per ${consentConfig.preferenceDays} giorni.`,
          `The ${consentConfig.cookieName} cookie stores categories, choice ID, dates and revision for ${consentConfig.preferenceDays} days.`,
        ), linkedCategory: 'necessary' },
        ...(consentConfig.analyticsEnabled ? [{
          title: l('Statistiche · Google Analytics', 'Statistics · Google Analytics'),
          description: l(
            'Google Tag Manager e Analytics si caricano solo dopo il consenso. Senza consenso non inviamo neanche misurazioni prive di cookie. La pubblicità rimane disattivata.',
            'Google Tag Manager and Analytics load only after consent. Without consent, not even cookieless measurements are sent. Advertising remains disabled.',
          ),
          linkedCategory: 'analytics',
          cookieTable: { headers: { name: l('Nome', 'Name'), purpose: l('Scopo', 'Purpose'), duration: l('Durata', 'Duration') }, body: [
            { name: '_ga', purpose: l('Distinguere le visite', 'Distinguish visits'), duration: l('Fino a 180 giorni', 'Up to 180 days') },
            { name: '_ga_*', purpose: l('Stato della sessione', 'Session state'), duration: l('Fino a 180 giorni', 'Up to 180 days') },
          ] },
        }] : []),
      ],
    },
  };
}
