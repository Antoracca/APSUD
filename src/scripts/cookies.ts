/**
 * Consentement aux cookies (CookieBanner.astro) — implémentation maison, aucun script tiers.
 *
 * - Choix stocké dans localStorage sous `apsud_consent` :
 *     { version, date (ISO), categories: { audience: boolean, externes: boolean } }
 *   Valable 6 mois ; au-delà, ou si CONSENT_VERSION change (nouvelle politique), on redemande.
 * - À chaque choix (et au chargement si un choix valide existe), l'événement
 *   `apsud:consent` est émis sur `document` avec ce choix en `detail`.
 *   Exemple pour charger un outil de mesure seulement après accord :
 *     document.addEventListener('apsud:consent', (e) => { if (e.detail.categories.audience) … });
 *   L'état courant est aussi lisible via `window.apsudConsent.get()`.
 * - Tout élément [data-cookie-open] ouvre le panneau de préférences.
 * - [data-cookie-action="accept" | "reject" | "save"] enregistre le choix correspondant.
 */

export type ConsentCategory = 'audience' | 'externes';
export interface Consent {
  version: number;
  date: string;
  categories: Record<ConsentCategory, boolean>;
}

const STORAGE_KEY = 'apsud_consent';
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois (recommandation CNIL)
const CATEGORIES: ConsentCategory[] = ['audience', 'externes'];

const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
const panel = document.querySelector<HTMLDialogElement>('[data-cookie-panel]');
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Stockage ---------- */
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Consent;
    const age = Date.now() - new Date(data.date).getTime();
    if (data.version !== CONSENT_VERSION || !Number.isFinite(age) || age > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeConsent(categories: Record<ConsentCategory, boolean>): Consent {
  const consent: Consent = { version: CONSENT_VERSION, date: new Date().toISOString(), categories };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* stockage indisponible (navigation privée stricte) : le choix vaut pour cette page */
  }
  return consent;
}

function emit(consent: Consent) {
  document.documentElement.dataset.consentAudience = String(consent.categories.audience);
  document.documentElement.dataset.consentExternes = String(consent.categories.externes);
  document.dispatchEvent(new CustomEvent<Consent>('apsud:consent', { detail: consent }));
}

/* ---------- Bandeau ---------- */
function showBanner() {
  if (!banner || !banner.hidden) return;
  banner.hidden = false;
  // deux images : l'état initial est peint avant la transition d'entrée
  requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('is-visible')));
}

function hideBanner() {
  if (!banner || banner.hidden) return;
  const hadFocus = banner.contains(document.activeElement);
  banner.classList.remove('is-visible');
  const done = () => {
    banner.hidden = true;
    if (hadFocus) document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
  };
  if (reduceMotion()) return done();
  let finished = false;
  const once = () => {
    if (finished) return;
    finished = true;
    done();
  };
  banner.addEventListener('transitionend', once, { once: true });
  window.setTimeout(once, 500);
}

/* ---------- Panneau ---------- */
function switches() {
  return panel ? [...panel.querySelectorAll<HTMLButtonElement>('[data-consent-switch]')] : [];
}

function setSwitch(sw: HTMLButtonElement, on: boolean) {
  sw.setAttribute('aria-checked', String(on));
  const state = sw.querySelector('.c-cookie-panel__switch-state');
  if (state) state.textContent = on ? 'Activé' : 'Désactivé';
}

function syncSwitches(consent: Consent | null) {
  for (const sw of switches()) {
    const cat = sw.dataset.consentSwitch as ConsentCategory;
    setSwitch(sw, consent ? consent.categories[cat] : false);
  }
}

function openPanel() {
  if (!panel) return;
  syncSwitches(readConsent());
  if (typeof panel.showModal === 'function') {
    if (!panel.open) panel.showModal();
  } else {
    panel.setAttribute('open', '');
  }
  panel.querySelector<HTMLElement>('.c-cookie-panel__close')?.focus();
}

function closePanel() {
  if (!panel?.open) return;
  if (typeof panel.close === 'function') panel.close();
  else panel.removeAttribute('open');
}

function toggleCategory(btn: HTMLButtonElement) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.closest('.c-cookie-panel__cat')?.classList.toggle('is-open', !expanded);
}

/* ---------- Choix ---------- */
function decide(action: 'accept' | 'reject' | 'save') {
  const categories = {} as Record<ConsentCategory, boolean>;
  for (const cat of CATEGORIES) {
    if (action === 'accept') categories[cat] = true;
    else if (action === 'reject') categories[cat] = false;
    else {
      const sw = panel?.querySelector<HTMLButtonElement>(`[data-consent-switch="${cat}"]`);
      categories[cat] = sw?.getAttribute('aria-checked') === 'true';
    }
  }
  const consent = writeConsent(categories);
  syncSwitches(consent);
  closePanel();
  hideBanner();
  emit(consent);
}

document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  const opener = target.closest<HTMLElement>('[data-cookie-open]');
  if (opener) {
    event.preventDefault();
    openPanel();
    return;
  }
  const action = target.closest<HTMLElement>('[data-cookie-action]');
  if (action) {
    decide(action.dataset.cookieAction as 'accept' | 'reject' | 'save');
    return;
  }
  if (!panel) return;
  const sw = target.closest<HTMLButtonElement>('[data-consent-switch]');
  if (sw && panel.contains(sw)) {
    setSwitch(sw, sw.getAttribute('aria-checked') !== 'true');
    return;
  }
  const acc = target.closest<HTMLButtonElement>('[data-cookie-accordion]');
  if (acc && panel.contains(acc)) {
    toggleCategory(acc);
    return;
  }
  if (target.closest('[data-cookie-close]')) {
    closePanel();
    return;
  }
  // clic sur le voile (hors de la boîte du dialogue) : fermeture sans enregistrer
  if (target === panel && event instanceof MouseEvent) {
    const r = panel.getBoundingClientRect();
    const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
    if (!inside) closePanel();
  }
});

/* ---------- Démarrage ---------- */
declare global {
  interface Window {
    apsudConsent?: { get: () => Consent | null; open: () => void };
  }
  interface DocumentEventMap {
    'apsud:consent': CustomEvent<Consent>;
  }
}
window.apsudConsent = { get: readConsent, open: openPanel };

const existing = readConsent();
if (existing) {
  syncSwitches(existing);
  emit(existing);
} else if (banner) {
  // le bandeau n'apparaît qu'après l'affichage principal (LCP), pour ne pas le retarder ;
  // mais une ressource lente (vidéo du hero en 3G) ne doit pas le repousser indéfiniment :
  // au plus tard BANNER_MAX_WAIT_MS après la construction de la page.
  const BANNER_MAX_WAIT_MS = 2500;
  if (document.readyState === 'complete') showBanner();
  else {
    window.addEventListener('load', showBanner, { once: true });
    window.setTimeout(showBanner, BANNER_MAX_WAIT_MS);
  }
}
