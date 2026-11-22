/**
 * Bandeau d'annonce (Eyebrow.astro).
 * - Expose sa hauteur dans `--eyebrow-h` (ResizeObserver) : le header fixe et le <main> s'en servent.
 * - Croix : replie le bandeau, mémorise la fermeture 7 jours (localStorage, enveloppé dans try/catch),
 *   puis rend le focus au premier lien du header pour ne pas le perdre.
 */
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const root = document.documentElement;

function setHeight(px: number) {
  root.style.setProperty('--eyebrow-h', `${Math.round(px)}px`);
}

function init(el: HTMLElement) {
  const id = el.dataset.eyebrow ?? 'annonce';
  const key = `apsud-annonce-${id}`;

  if (el.hidden) {
    setHeight(0);
    return;
  }

  const ro = new ResizeObserver(([entry]) => {
    const box = entry.borderBoxSize?.[0];
    setHeight(el.hidden ? 0 : box ? box.blockSize : el.offsetHeight);
  });
  ro.observe(el);

  const close = el.querySelector<HTMLButtonElement>('[data-eyebrow-close]');
  close?.addEventListener('click', () => {
    try {
      localStorage.setItem(key, String(Date.now() + SEVEN_DAYS));
    } catch {
      /* stockage indisponible (navigation privée) : fermeture pour cette page seulement */
    }

    const finish = () => {
      el.hidden = true;
      ro.disconnect();
      setHeight(0);
      document.querySelector<HTMLElement>('[data-header] a, [data-header] button')?.focus();
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      finish();
      return;
    }
    el.addEventListener('transitionend', finish, { once: true });
    window.setTimeout(() => { if (!el.hidden) finish(); }, 600);   /* filet de sécurité */
    el.classList.add('is-closing');
  });
}

document.querySelectorAll<HTMLElement>('[data-eyebrow]').forEach(init);
