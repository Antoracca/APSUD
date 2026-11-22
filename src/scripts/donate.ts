/**
 * Module de don non transactionnel (/faire-un-don, DonatePanel.astro).
 * - Récapitulatif en direct de l'intention de don (devise + montant choisi ou saisi).
 * - « Procéder au paiement » mène à la page du moyen choisi (Orange Money ou carte) avec le montant :
 *   /faire-un-don/orange-money?montant=25000&devise=XAF (aucune donnée personnelle dans l'URL).
 * - Petite « pulsation » du récapitulatif à chaque changement (coupée si animations réduites).
 * Front-end seulement : aucun débit tant que le back-end de paiement n'est pas branché.
 */
const nf = new Intl.NumberFormat('fr-FR');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-donate]').forEach((panel) => {
  const summary = panel.querySelector<HTMLOutputElement>('[data-donate-summary]');
  const cta = panel.querySelector<HTMLAnchorElement>('[data-donate-cta]');
  const other = panel.querySelector<HTMLInputElement>('[data-donate-other]');
  const unit = panel.querySelector<HTMLElement>('[data-donate-unit]');
  if (!summary || !cta) return;

  const currency = () =>
    panel.querySelector<HTMLInputElement>('[data-donate-currency]:checked') ??
    panel.querySelector<HTMLInputElement>('[data-donate-currency]')!;

  function amount(code: string): number | null {
    const typed = Number(other?.value);
    if (other && other.value !== '' && Number.isFinite(typed) && typed > 0) return Math.round(typed);
    const r = panel.querySelector<HTMLInputElement>(`input[name="montant-${code}"]:checked`);
    return r ? Number(r.value) : null;
  }

  function update(animate = true) {
    const cur = currency();
    const code = cur.value;
    const label = cur.dataset.label ?? code;
    const value = amount(code);
    const typed = !!other && other.value !== '' && Number(other.value) > 0;
    panel.classList.toggle('is-other', typed);
    if (unit) unit.textContent = label;

    summary!.textContent = value ? `${nf.format(value)} ${label}` : 'à préciser';

    const method = panel.querySelector<HTMLInputElement>('[data-donate-method]:checked');
    const url = new URL(method?.dataset.href ?? '/faire-un-don/orange-money', window.location.origin);
    if (value) {
      url.searchParams.set('montant', String(value));
      url.searchParams.set('devise', code);
    }
    cta!.href = url.pathname + url.search;

    if (animate && !reduced.matches) {
      const css = getComputedStyle(document.documentElement);
      summary!.animate(
        [{ transform: 'translateY(30%)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: parseFloat(css.getPropertyValue('--dur-intro')) || 270, easing: css.getPropertyValue('--ease-out').trim() || 'ease-out' },
      );
    }
  }

  panel.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.matches('[data-donate-amount]') && other) other.value = '';
    update();
  });
  other?.addEventListener('input', () => update(false));
  update(false);
});
