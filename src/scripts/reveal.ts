/**
 * Révélation au défilement (équivalent de `inView` de la librairie Motion utilisée par Prosper).
 * - [data-reveal] : l'élément apparaît (fondu + montée) quand il entre dans l'écran.
 * - [data-reveal-delay="150"] : décalage en ms (cascade).
 * - Événement `reveal` émis sur l'élément, écouté par les compteurs et les formes animées.
 * Sans JS ou avec « animations réduites », tout le contenu est visible d'emblée.
 */
const root = document.documentElement;

function revealAll() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.classList.add('is-revealed');
    el.dispatchEvent(new CustomEvent('reveal'));
  });
}

if (!root.classList.contains('js-reveal') || !('IntersectionObserver' in window)) {
  revealAll();
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('is-revealed');
        el.dispatchEvent(new CustomEvent('reveal'));
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el));
}
