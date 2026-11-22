/**
 * Filtre des partenaires de l'accueil (HomePartners.astro) — onglets ARIA « tablist ».
 * - Révèle la barre d'onglets (masquée sans JS : tous les logos restent visibles).
 * - Clavier : ← → (boucle), Début, Fin ; activation automatique ; tabindex itinérant.
 * - Filtre la grille par data-category ; met à jour le compteur (région aria-live).
 * - Transition douce via l'API View Transitions quand elle existe et que le mouvement est permis :
 *   chaque logo reçoit un nom de transition le temps du changement, puis le perd.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

type VTDocument = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

document.querySelectorAll<HTMLElement>('[data-partners]').forEach((root) => {
  const bar = root.querySelector<HTMLElement>('[data-partners-bar]');
  const panel = root.querySelector<HTMLElement>('[data-partners-panel]');
  const count = root.querySelector<HTMLElement>('[data-partners-count]');
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-category]'));
  if (!bar || !panel || !tabs.length) return;

  bar.hidden = false;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tabs[0].id);

  function apply(filter: string) {
    let n = 0;
    for (const li of items) {
      const show = filter === 'tous' || li.dataset.category === filter;
      li.hidden = !show;
      if (show) n++;
    }
    if (count) count.textContent = String(n);
    root.dataset.filter = filter;
  }

  function select(tab: HTMLButtonElement, focus = false) {
    if (tab.getAttribute('aria-selected') === 'true') {
      if (focus) tab.focus();
      return;
    }
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    }
    panel!.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();

    const filter = tab.dataset.filter ?? 'tous';
    const doc = document as VTDocument;
    if (!doc.startViewTransition || reduced.matches) {
      apply(filter);
      return;
    }
    /* Noms de transition posés uniquement pendant le filtrage (aucun effet sur le reste de la page) */
    items.forEach((li) => {
      li.style.setProperty('view-transition-name', `partner-${li.dataset.slug}`);
      li.style.setProperty('view-transition-class', 'partner-logo');
    });
    root.classList.add('is-filtering');
    doc
      .startViewTransition(() => apply(filter))
      .finished.finally(() => {
        items.forEach((li) => {
          li.style.removeProperty('view-transition-name');
          li.style.removeProperty('view-transition-class');
        });
        root.classList.remove('is-filtering');
      });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      e.preventDefault();
      select(tabs[next], true);
    });
  });
});
