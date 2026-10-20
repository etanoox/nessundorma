import * as CookieConsent from 'vanilla-cookieconsent';
import { consentTranslation } from '../data/cookie-consent';
import { consentConfig } from '../lib/consent-config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}

const lang = document.documentElement.lang === 'en' ? 'en' : 'it';
const { cookieName, measurementId, analyticsEnabled } = consentConfig;
const disableKey = `ga-disable-${measurementId}` as const;
let analyticsStarted = false;
let reloading = false;
let lastChoice = '';
let channel: BroadcastChannel | undefined;
try { if (typeof BroadcastChannel === 'function') channel = new BroadcastChannel('nessun-dorma-consent'); } catch { /* unavailable */ }

function storedChoice(): string {
  return document.cookie.split('; ').find(c => c.startsWith(`${cookieName}=`)) ?? '';
}

function validRecord(): boolean {
  const raw = storedChoice().split('=').slice(1).join('=');
  if (!raw) return false;
  try {
    const record = JSON.parse(decodeURIComponent(raw));
    const now = Date.now();
    const first = Date.parse(record.consentTimestamp);
    const last = Date.parse(record.lastConsentTimestamp);
    const categories = record.categories;
    return record.revision === consentConfig.revision
      && typeof record.consentId === 'string' && /^[a-f0-9-]{36}$/i.test(record.consentId)
      && Number.isFinite(first) && Number.isFinite(last) && first <= last
      && last <= now + 5 * 60_000 && last >= now - consentConfig.preferenceDays * 86_400_000
      && Array.isArray(categories) && categories.includes('necessary')
      && categories.every((c: unknown) => c === 'necessary' || (analyticsEnabled && c === 'analytics'));
  } catch { return false; }
}

function clearAnalyticsCookies(): void {
  const labels = location.hostname.split('.');
  const domains = new Set(['', location.hostname]);
  for (let i = 0; i < labels.length - 1; i++) domains.add(`.${labels.slice(i).join('.')}`);
  const paths = new Set(['/']);
  const segments = location.pathname.split('/').filter(Boolean);
  for (let i = 1; i <= segments.length; i++) {
    const path = `/${segments.slice(0, i).join('/')}`;
    paths.add(path); paths.add(`${path}/`);
  }
  const names = document.cookie.split(';').map(c => c.trim().split('=')[0]);
  for (const name of names.filter(n => /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(n))) {
    for (const domain of domains) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
    }
  }
}

function reloadWithoutAnalytics(clearCookies = true): void {
  if (reloading) return;
  reloading = true;
  if (analyticsEnabled) window[disableKey] = true;
  if (clearCookies) clearAnalyticsCookies();
  location.reload();
}

function startAnalytics(): void {
  if (!analyticsEnabled || analyticsStarted || !validRecord() || !CookieConsent.acceptedCategory('analytics')) return;
  analyticsStarted = true;
  window[disableKey] = false;
  window.gtag('set', {
    cookie_expires: consentConfig.analyticsCookieDays * 86_400,
    cookie_update: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.gtag('consent', 'update', {
    analytics_storage: 'granted', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${consentConfig.containerId}`;
  document.head.append(script);
}

function syncConsent(): void {
  if (analyticsEnabled && validRecord() && CookieConsent.validConsent() && CookieConsent.acceptedCategory('analytics')) {
    startAnalytics();
  } else {
    if (analyticsEnabled) window[disableKey] = true;
    clearAnalyticsCookies();
    if (analyticsStarted) { reloadWithoutAnalytics(); return; }
  }
  lastChoice = storedChoice();
}

async function initialise(): Promise<void> {
  // A stale or malformed record must not be treated as a grant by the library.
  if (storedChoice() && !validRecord()) document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`;
  await CookieConsent.run({
    revision: consentConfig.revision,
    mode: 'opt-in',
    autoShow: analyticsEnabled,
    lazyHtmlGeneration: false,
    manageScriptTags: false,
    disablePageInteraction: false,
    cookie: { name: cookieName, path: '/', secure: true, sameSite: 'Lax', expiresAfterDays: consentConfig.preferenceDays },
    guiOptions: {
      consentModal: { layout: 'box wide', position: 'bottom center', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      ...(analyticsEnabled ? { analytics: { enabled: false } } : {}),
    },
    language: { default: lang, translations: { it: consentTranslation('it'), en: consentTranslation('en') } },
    onConsent: syncConsent,
    onFirstConsent: () => channel?.postMessage('changed'),
    onChange: () => { channel?.postMessage('changed'); syncConsent(); },
  });
  syncConsent();
  document.querySelectorAll<HTMLButtonElement>('[data-cookie-preferences]').forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => CookieConsent.showPreferences());
  });
  const check = () => {
    if (storedChoice() !== lastChoice) reloadWithoutAnalytics(false);
    else if (analyticsStarted && !validRecord()) reloadWithoutAnalytics();
  };
  window.addEventListener('focus', check);
  window.addEventListener('pageshow', check);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  if (channel) channel.onmessage = check;
  // A choice may expire while the tab remains open and in the foreground.
  window.setInterval(check, 30_000);
}

initialise().catch(error => {
  if (analyticsEnabled) window[disableKey] = true;
  clearAnalyticsCookies();
  console.warn('Cookie preferences unavailable', error instanceof Error ? error.message : error);
});
