/**
 * Carte des zones d'intervention (HomeZones.astro).
 * - Survol / focus d'une préfecture → aperçu dans le panneau de droite.
 * - Clic / Entrée / Espace → épingle la préfecture (aria-pressed) ; nouveau clic ou Échap → synthèse.
 * - En quittant la carte, le panneau revient à la préfecture épinglée, sinon à la synthèse.
 * - Le contour de la préfecture active est redessiné au premier plan via <use> (sinon les
 *   voisines le recouvrent), les autres s'estompent (CSS, .is-spotlight).
 * Sans JS, le panneau affiche la synthèse et la liste <details> reste disponible.
 */
function initZones(root: HTMLElement) {
  const map = root.querySelector<SVGSVGElement>('[data-zones-map]');
  const ring = root.querySelector<SVGUseElement>('[data-zones-ring]');
  const panel = root.querySelector<HTMLElement>('[data-zones-panel]');
  if (!map || !ring || !panel) return;

  const targets = [...map.querySelectorAll<SVGElement>('[data-zone]')];
  const details = new Map(
    [...panel.querySelectorAll<HTMLElement>('[data-detail]')].map((el) => [el.dataset.detail!, el]),
  );
  let pinned: string | null = null;
  let shown = 'summary';

  const show = (slug: string | null) => {
    const key = slug ?? 'summary';
    if (key === shown) return;
    details.get(shown)?.setAttribute('hidden', '');
    details.get(key)?.removeAttribute('hidden');
    shown = key;
    targets.forEach((t) => t.classList.toggle('is-active', t.dataset.zone === slug));
    map.classList.toggle('is-spotlight', !!slug);
    // Bangui est une pastille (<g>) : pas de contour de préfecture à redessiner.
    const pathTarget = slug && slug !== 'bangui' ? `#zone-${slug}` : '';
    ring.setAttribute('href', pathTarget);
    ring.classList.toggle('is-visible', !!pathTarget);
  };

  const pin = (slug: string | null) => {
    pinned = slug;
    targets.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.zone === slug)));
    show(slug);
  };

  for (const t of targets) {
    const slug = t.dataset.zone!;
    t.addEventListener('pointerenter', () => show(slug));
    t.addEventListener('focus', () => show(slug));
    t.addEventListener('blur', () => show(pinned));
    t.addEventListener('click', () => pin(pinned === slug ? null : slug));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pin(pinned === slug ? null : slug);
      } else if (e.key === 'Escape') {
        pin(null);
      }
    });
  }
  map.addEventListener('pointerleave', () => show(pinned));

  // Légende-filtre : un seul bouton enfoncé à la fois (le rendu est en CSS via :has()).
  const keys = [...root.querySelectorAll<HTMLButtonElement>('[data-key]')];
  keys.forEach((k) => k.setAttribute('aria-pressed', 'false'));
  for (const k of keys) {
    k.addEventListener('click', () => {
      const on = k.getAttribute('aria-pressed') !== 'true';
      keys.forEach((o) => o.setAttribute('aria-pressed', String(o === k && on)));
    });
  }
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pinned) pin(null);
  });
}

document.querySelectorAll<HTMLElement>('[data-zones]').forEach(initZones);
