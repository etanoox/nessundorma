// Google measurement is deliberately absent until this project's own IDs are supplied.
// Both IDs are required: the GA property ID is needed to disable collection on revocation.
const containerId = import.meta.env.PUBLIC_GTM_ID?.trim() ?? '';
const measurementId = import.meta.env.PUBLIC_GA4_ID?.trim() ?? '';
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
  analyticsEnabled: Boolean(containerId && measurementId),
} as const;
