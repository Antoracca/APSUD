/**
 * Filtres de /projets (ProjetsListing.astro + ProjetsFiltres.astro), côté client.
 *  - Lit l'URL au chargement (?statut=realise&domaine=…&prefecture=…&bailleur=…) et la tient
 *    à jour (history.replaceState) : un filtre se partage par simple lien.
 *  - Masque les cartes qui ne correspondent pas (attribut `hidden`), met à jour le compteur
 *    (role="status", annoncé aux lecteurs d'écran) et affiche l'état vide si besoin.
 *  - Facettes : chaque option indique combien de projets elle donnerait avec les autres filtres
 *    en place ; une option qui ne donnerait aucun résultat est désactivée.
 *  - Petit écran : le bouton « Filtrer (n) » déplie / replie les champs (aria-expanded) ;
 *    n = nombre de filtres actifs. Dès 48em le bouton est masqué en CSS et tout est déplié.
 * Sans JS, la barre de filtres est masquée et tous les projets restent visibles.
 */
type Field = 'statut' | 'domaine' | 'prefecture' | 'bailleur';
const FIELDS: Field[] = ['statut', 'domaine', 'prefecture', 'bailleur'];

/** Variantes d'URL acceptées pour le statut (liens existants, saisie à la main). */
const STATUT_ALIAS: Record<string, string> = {
  'en-cours': 'en-cours', en_cours: 'en-cours', encours: 'en-cours',
  realise: 'realise', realises: 'realise', 'réalisé': 'realise', 'réalisés': 'realise',
};

document.querySelectorAll<HTMLElement>('[data-projects-filter]').forEach((root) => {
  const form = root.querySelector<HTMLFormElement>('[data-filter-form]');
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-filter-list] > li'));
  if (!form || !items.length) return;

  const count = root.querySelector<HTMLElement>('[data-filter-count]');
  const noun = root.querySelector<HTMLElement>('[data-filter-noun]');
  const reset = root.querySelector<HTMLButtonElement>('[data-filter-reset]');
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  const selects = Array.from(form.querySelectorAll<HTMLSelectElement>('select'));
  const radios = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="statut"]'));
  const toggle = form.querySelector<HTMLButtonElement>('[data-filter-toggle]');
  const activeBadge = form.querySelector<HTMLElement>('[data-filter-active]');
  const activeN = form.querySelector<HTMLElement>('[data-filter-active-n]');

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    form.classList.toggle('is-open', open);
  });

  /** Valeurs de chaque carte, lues une fois. */
  const data = items.map((li) => ({
    li,
    statut: [li.dataset.statut ?? ''],
    domaine: (li.dataset.domaine ?? '').split(' ').filter(Boolean),
    prefecture: (li.dataset.prefecture ?? '').split(' ').filter(Boolean),
    bailleur: (li.dataset.bailleur ?? '').split(' ').filter(Boolean),
  }));

  const read = (): Record<Field, string> => ({
    statut: radios.find((r) => r.checked)?.value ?? '',
    domaine: form.domaine?.value ?? '',
    prefecture: form.prefecture?.value ?? '',
    bailleur: form.bailleur?.value ?? '',
  });

  const matches = (d: (typeof data)[number], f: Record<Field, string>, skip?: Field) =>
    FIELDS.every((k) => k === skip || !f[k] || d[k].includes(f[k]));

  /* État initial depuis l'URL (valeurs inconnues ignorées) */
  const params = new URLSearchParams(location.search);
  const urlStatut = STATUT_ALIAS[(params.get('statut') ?? '').toLowerCase()];
  if (urlStatut) radios.forEach((r) => (r.checked = r.value === urlStatut));
  for (const s of selects) {
    const v = params.get(s.name);
    if (v && Array.from(s.options).some((o) => o.value === v)) s.value = v;
  }

  function apply(fromUser: boolean) {
    const f = read();
    let n = 0;
    for (const d of data) {
      const show = matches(d, f);
      d.li.hidden = !show;
      if (show) d.li.style.setProperty('--_n', String(n++ % 6));
    }

    if (count) count.textContent = String(n);
    if (noun) noun.textContent = n > 1 ? 'projets' : 'projet';
    if (empty) empty.hidden = n > 0;
    const nActive = FIELDS.filter((k) => f[k]).length;
    const active = nActive > 0;
    if (reset) reset.disabled = !active;
    if (activeN) activeN.textContent = String(nActive);
    if (activeBadge) activeBadge.hidden = !active;
    if (fromUser) root.classList.add('is-filtered');

    /* Facettes : statut */
    for (const r of radios) {
      const c = data.filter((d) => matches(d, { ...f, statut: r.value }, r.value ? undefined : 'statut')).length;
      const out = form!.querySelector<HTMLElement>(`[data-count-for="statut:${r.value}"]`);
      if (out) out.textContent = String(c);
      r.disabled = c === 0 && !r.checked;
    }
    /* Facettes : listes déroulantes */
    for (const s of selects) {
      const k = s.name as Field;
      s.classList.toggle('is-active', !!s.value);
      for (const o of Array.from(s.options)) {
        if (!o.value) continue;
        const c = data.filter((d) => matches(d, { ...f, [k]: o.value })).length;
        o.textContent = `${o.dataset.label ?? o.value} (${c})`;
        o.disabled = c === 0 && o.value !== s.value;
      }
    }

    /* URL partageable */
    const q = new URLSearchParams();
    FIELDS.forEach((k) => f[k] && q.set(k, f[k]));
    const qs = q.toString();
    history.replaceState(history.state, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
  }

  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('change', () => apply(true));
  form.addEventListener('reset', () => requestAnimationFrame(() => apply(true)));
  root.querySelector('[data-filter-reset-alt]')?.addEventListener('click', () => {
    form.reset();
    radios[0]?.focus();
  });

  apply(false);
});
