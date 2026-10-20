// Public IDs belong to Nessun Dorma. Overrides support staging without changing source.
const containerId = import.meta.env.PUBLIC_GTM_ID?.trim() ?? 'GTM-MDFF7FRG';
const measurementId = import.meta.env.PUBLIC_GA4_ID?.trim() ?? 'G-44T1DDD72G';
const analyticsEnabled = import.meta.env.PUBLIC_ANALYTICS_ENABLED !== 'false';
if (Boolean(containerId) !== Boolean(measurementId)) {
  throw new Error('Configure both PUBLIC_GTM_ID and PUBLIC_GA4_ID, or neither.');
}
if (containerId && (!/^GTM-[A-Z0-9]+$/.test(containerId) || !/^G-[A-Z0-9]+$/.test(measurementId))) {
  throw new Error('Invalid GTM or GA4 identifier.');
}

export const consentConfig = {
  cookieName: 'nessun_dorma_consent',
  revision: 1,
  preferenceDays: 365,
  analyticsCookieDays: 180,
  containerId,
  measurementId,
  analyticsEnabled: analyticsEnabled && Boolean(containerId && measurementId),
} as const;
