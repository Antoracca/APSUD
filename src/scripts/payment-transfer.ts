/**
 * Virement bancaire (TransferForm.astro) — front-end seulement.
 * - Motif de virement généré sur la page (DON-AAMMJJ-XXXX) pour rattacher le don et envoyer le reçu.
 * - Montant repris du récapitulatif (payment-summary.ts).
 * - Boutons « Copier » (presse-papiers), confirmés par un message lu par les lecteurs d'écran.
 * Rien n'est envoyé ni conservé. Les coordonnées affichées sont PROVISOIRES (paymentData.ts).
 */
const box = document.querySelector<HTMLElement>('[data-transfer]');

if (box) {
  const status = box.querySelector<HTMLElement>('[data-transfer-status]');

  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = crypto.getRandomValues(new Uint32Array(4));
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const ref = `DON-${ymd}-${Array.from(rand, (n) => ALPHABET[n % ALPHABET.length]).join('')}`;
  box.querySelectorAll('[data-transfer-ref]').forEach((el) => { el.textContent = ref; });
  box.querySelectorAll<HTMLElement>('[data-copy-ref]').forEach((el) => { el.dataset.copy = ref; });

  const showAmount = (text: string) => box.querySelectorAll('[data-transfer-amount]').forEach((el) => { el.textContent = text; });
  const html = document.documentElement;
  if (html.dataset.payAmount) {
    const v = Number(html.dataset.payAmount);
    const cur = ({ EUR: '€', USD: '$' } as Record<string, string>)[html.dataset.payCurrency ?? ''] ?? 'FCFA';
    showAmount(`${new Intl.NumberFormat('fr-FR').format(v).replace(/ /g, ' ')} ${cur}`);
  }
  document.addEventListener('pay:amount', (e) => showAmount((e as CustomEvent).detail.text));

  box.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy]');
    if (!btn) return;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      const label = btn.textContent;
      btn.dataset.copied = '';
      btn.textContent = 'Copié';
      if (status) status.textContent = `${label?.replace('Copier ', '')} copié dans le presse-papiers.`;
      setTimeout(() => { delete btn.dataset.copied; btn.textContent = label; }, 2000);
    } catch {
      if (status) status.textContent = 'Copie impossible : sélectionnez le texte et copiez-le à la main.';
    }
  });
}
