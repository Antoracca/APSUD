/**
 * Comportements du pied de page (Footer.astro) :
 * 1. Raccord de couleur : le fond derrière les marches prend la couleur de la dernière section
 *    de la page (équivalent de `footerBackground` dans footer.js de Prosper). Le CSS :has()
 *    couvre déjà les thèmes t-* ; ce script couvre les autres fonds.
 * 2. Lettre d'information : validation + message de remerciement en place.
 *    ⚠ AUCUN ENVOI RÉEL : rien ne quitte le navigateur. Voir le bloc « TODO back-end ».
 * 3. Pastille de preuve : l'anneau se dessine et le nombre compte de 0 à sa valeur
 *    quand la pastille est entièrement visible (efficiency-lockup.js + quick-stats.js de Prosper).
 *    Avec « animations réduites » (ou sans JS), l'état final est affiché d'emblée.
 * 4. Escalier (innovation APSUD) : les marches se dressent l'une après l'autre quand le haut
 *    du footer entre à l'écran (.is-risen, transitions dans Footer.css).
 * 5. Retour en haut (porté par la plus haute marche) : défilement doux si autorisé, puis le
 *    focus revient au début de la page (lien d'évitement), comme après un rechargement.
 */

const footer = document.querySelector<HTMLElement>('[data-footer]');
const motionOk = document.documentElement.classList.contains('js-reveal');

/* ---------- 1. Raccord de couleur ---------- */
function syncLeadBackground() {
  if (!footer) return;
  const main = document.querySelector('main');
  let el = main?.lastElementChild as HTMLElement | null;
  // descend dans les enveloppes transparentes (ex. <div> autour d'une <section>)
  for (let i = 0; el && i < 3; i++) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(bg)) {
      footer.style.setProperty('--footer-lead-bg', bg);
      return;
    }
    el = el.lastElementChild as HTMLElement | null;
  }
}

/* ---------- 2. Lettre d'information ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(form: HTMLFormElement, field: HTMLInputElement, message: string) {
  const out = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (out) {
    out.textContent = message;
    out.hidden = !message;
  }
}

function initNewsletter() {
  const form = footer?.querySelector<HTMLFormElement>('[data-newsletter-form]');
  const thanks = footer?.querySelector<HTMLElement>('[data-newsletter-thanks]');
  if (!form || !thanks) return;
  const email = form.elements.namedItem('email') as HTMLInputElement;
  const consent = form.elements.namedItem('consent') as HTMLInputElement;

  email.addEventListener('input', () => {
    if (email.getAttribute('aria-invalid') === 'true' && EMAIL_RE.test(email.value.trim())) setError(form, email, '');
  });
  consent.addEventListener('change', () => {
    if (consent.checked) setError(form, consent, '');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = email.value.trim();
    const emailMsg = !value
      ? 'Indiquez votre adresse e-mail.'
      : EMAIL_RE.test(value)
        ? ''
        : 'Cette adresse e-mail semble incomplète (exemple : nom@domaine.org).';
    const consentMsg = consent.checked ? '' : 'Cochez la case pour confirmer votre inscription.';
    setError(form, email, emailMsg);
    setError(form, consent, consentMsg);
    if (emailMsg) return email.focus();
    if (consentMsg) return consent.focus();

    /* TODO back-end : envoyer { email } au service d'envoi (double opt-in) ici,
       puis n'afficher le remerciement qu'en cas de succès. Aucun envoi pour l'instant. */

    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  });
}

/* ---------- 3. Pastille de preuve ---------- */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function countUp(el: HTMLElement, target: number, duration: number) {
  const fmt = new Intl.NumberFormat('fr-FR');
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = fmt.format(Math.round(target * easeOut(t)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function readMs(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? (raw.endsWith('ms') ? n : n * 1000) : fallback;
}

function initProof() {
  const proof = footer?.querySelector<HTMLElement>('[data-proof]');
  const count = proof?.querySelector<HTMLElement>('[data-proof-count]');
  if (!proof || !count) return;
  const target = Number(count.dataset.target);
  if (!motionOk || !('IntersectionObserver' in window) || !Number.isFinite(target)) {
    proof.classList.add('is-drawn');
    return;
  }
  count.textContent = '0';
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      // double rAF : laisse le navigateur peindre l'état initial avant la transition
      requestAnimationFrame(() => requestAnimationFrame(() => proof.classList.add('is-drawn')));
      countUp(count, target, readMs('--dur-ring', 2000));
    },
    { threshold: 1 },
  );
  io.observe(proof);
}

/* ---------- 4. Escalier qui se dresse ---------- */
function initStairs() {
  const stairs = footer?.querySelector<HTMLElement>('[data-footer-stairs]');
  if (!stairs) return;
  if (!motionOk || !('IntersectionObserver' in window)) {
    stairs.classList.add('is-risen');
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      stairs.classList.add('is-risen');
    },
    // l'escalier se dresse quand il a franchi le dernier quart de l'écran
    { rootMargin: '0px 0px -25% 0px' },
  );
  io.observe(stairs);
}

/* ---------- 5. Retour en haut ---------- */
function initToTop() {
  const link = footer?.querySelector<HTMLAnchorElement>('[data-footer-totop]');
  if (!link) return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    // premier élément focalisable de la page (lien d'évitement) : la tabulation repart du début
    const first = document.querySelector<HTMLElement>('.c-skiplink, header a, header button');
    first?.focus({ preventScroll: true });
  });
}

if (footer) {
  syncLeadBackground();
  initNewsletter();
  initProof();
  initStairs();
  initToTop();
}
