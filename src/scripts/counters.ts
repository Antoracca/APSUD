/**
 * Compteurs des chiffres clés (Prosper `quick-stats.js`, DESIGN.md §4.15 et §6.2 n° 15–16).
 *
 * Quand le bloc [data-stats] entre dans l'écran (une seule fois) :
 *   1. il reçoit .is-inview : la goutte-feuille glisse en place et la marche grandit (CSS) ;
 *   2. chaque [data-count] monte de 0 à sa valeur, formaté en français (« 250 000 »,
 *      espace insécable fine), préfixe/suffixe conservés, décimales conservées,
 *      avec un décalage de --stagger-count × index.
 * Durées et délais lus dans les jetons CSS (--dur-count, --stagger-count, --delay-signature).
 *
 * Sans JS, sans IntersectionObserver ou avec « animations réduites » : les valeurs finales,
 * écrites dans le HTML, restent affichées. La version animée est aria-hidden ; un double
 * masqué visuellement porte la valeur finale pour les lecteurs d'écran.
 */

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animate = !reduced && root.classList.contains('js-reveal') && 'IntersectionObserver' in window;

/** Lit une durée CSS (« 1500ms », « 1.2s ») sur :root. */
function tokenMs(name: string, fallback: number): number {
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith('ms') ? value : raw.endsWith('s') ? value * 1000 : value;
}

/* Sortie très douce, proche de --ease-out (cubic-bezier(0.01, 0, 0.1, 1)) : montée rapide, longue décélération. */
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function decimalsOf(value: string): number {
  const dot = value.indexOf('.');
  return dot === -1 ? 0 : value.length - dot - 1;
}

function initStats(block: HTMLElement): void {
  const values = Array.from(block.querySelectorAll<HTMLElement>('[data-count]'));

  if (!animate) {
    block.classList.add('is-inview');
    return;
  }

  const duration = tokenMs('--dur-count-stats', 1800);
  const stagger = tokenMs('--stagger-count', 150);
  /* Les compteurs démarrent pendant que la goutte finit d'arriver (Prosper attend ~1,8 s :
     on raccourcit l'attente à 0,6 s, amélioration consignée dans MESURES.md). */
  const start = tokenMs('--delay-count', 600);

  const items = values.map((el) => {
    const raw = el.dataset.count ?? '0';
    const decimals = decimalsOf(raw);
    const format = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const target = Number(raw);
    const render = (n: number) => {
      /* espace insécable normale (U+00A0) plutôt que fine (U+202F) : lisible en très grand */
      el.textContent = `${prefix}${format.format(n).replace(/ /g, ' ')}${suffix}`;
    };
    render(0);
    return { el, target, render, index: Number(el.dataset.index ?? 0) };
  });

  const run = () => {
    const t0 = performance.now() + start;
    const frame = (now: number) => {
      let done = true;
      for (const item of items) {
        const begin = t0 + item.index * stagger;
        const progress = Math.min(Math.max((now - begin) / duration, 0), 1);
        if (progress < 1) done = false;
        const value = progress >= 1 ? item.target : item.target * easeOut(progress);
        item.render(Number.isInteger(item.target) ? Math.round(value) : value);
      }
      if (!done) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  /* Déclenchement quand 50 % du bloc est visible (ou tout l'écran si le bloc est plus haut) */
  const amount = Math.min(0.5, (window.innerHeight / Math.max(block.offsetHeight, 1)) * 0.9);
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      block.classList.add('is-inview');
      run();
    },
    { threshold: amount },
  );
  io.observe(block);
}

document.querySelectorAll<HTMLElement>('[data-stats]').forEach(initStats);
