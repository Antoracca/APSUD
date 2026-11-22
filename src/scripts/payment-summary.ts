/**
 * Récapitulatif des pages de paiement (PaymentShell.astro) : lit ?montant=…&devise=… dans l'URL,
 * affiche le montant formaté, convertit l'euro en FCFA pour Orange Money (parité fixe),
 * et publie le montant pour les formulaires (événement `pay:amount` + attributs data-*).
 * Le lien « Modifier » renvoie vers /faire-un-don. Aucune donnée personnelle n'est lue ni écrite.
 */
const XAF_PER_EUR = 655.957;
/* Dollar : taux flottant, valeur INDICATIVE (à mettre à jour ou à fournir par l'agrégateur au branchement) */
const XAF_PER_USD = 600;
const nf = (d = 0) => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const label = (code: string) => (code === 'XAF' ? 'FCFA' : code === 'EUR' ? '€' : code === 'USD' ? '$' : code);
export const formatAmount = (value: number, code: string) =>
  `${nf(code !== 'XAF' && !Number.isInteger(value) ? 2 : 0).format(value).replace(/ /g, ' ')} ${label(code)}`;

const box = document.querySelector<HTMLElement>('[data-pay-summary]');
if (box) {
  const params = new URLSearchParams(window.location.search);
  const raw = Number(params.get('montant'));
  const code = (['EUR', 'USD'] as const).find((c) => c === params.get('devise')) ?? 'XAF';
  const valid = Number.isFinite(raw) && raw > 0 && raw < 100_000_000;
  const out = box.querySelector<HTMLOutputElement>('[data-pay-amount]');
  const converted = box.querySelector<HTMLElement>('[data-pay-converted]');

  if (valid) {
    let value = raw;
    let currency = code;
    if (out) out.textContent = formatAmount(raw, code);
    /* Orange Money débite en francs CFA */
    if (box.dataset.method === 'orange-money' && code !== 'XAF') {
      value = Math.round(raw * (code === 'EUR' ? XAF_PER_EUR : XAF_PER_USD));
      currency = 'XAF';
      if (out) out.textContent = formatAmount(value, 'XAF');
      if (converted) {
        converted.textContent = code === 'EUR'
          ? `Soit ${formatAmount(raw, 'EUR')} au taux fixe 1 € = 655,957 FCFA.`
          : `Soit ${formatAmount(raw, 'USD')} au taux indicatif 1 $ ≈ ${XAF_PER_USD} FCFA (taux du jour appliqué au paiement).`;
        converted.hidden = false;
      }
    }
    document.documentElement.dataset.payAmount = String(value);
    document.documentElement.dataset.payCurrency = currency;
    document.dispatchEvent(new CustomEvent('pay:amount', { detail: { value, currency, text: formatAmount(value, currency) } }));
  }
}
