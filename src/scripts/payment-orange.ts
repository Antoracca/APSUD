/**
 * Paiement Orange Money (OrangeMoneyForm.astro) — front-end seulement.
 * - Référence de suivi générée sur la page (APS-AAMMJJ-XXXX), à communiquer en cas de question.
 * - Numéro formaté pendant la saisie (« 72 00 00 00 »), 8 chiffres exigés.
 * - Montant repris du récapitulatif (payment-summary.ts) dans le bloc et dans le bouton.
 * - « Payer » : si le numéro est valide, mène à la page provisoire (404). Le numéro n'est ni
 *   envoyé, ni stocké, ni placé dans l'URL. TODO back-end : appel à l'agrégateur Mobile Money.
 */
const DIGITS = 8;
const form = document.querySelector<HTMLFormElement>('[data-om-form]');

if (form) {
  const phone = form.querySelector<HTMLInputElement>('[data-om-phone]')!;
  const error = form.querySelector<HTMLElement>('[data-om-error]')!;
  const pay = form.querySelector<HTMLButtonElement>('[data-om-pay]')!;
  const payLabel = form.querySelector<HTMLElement>('[data-om-pay-label]')!;
  const amount = form.querySelector<HTMLElement>('[data-om-amount]');
  const ref = form.querySelector<HTMLOutputElement>('[data-om-ref]');

  /* Référence : date du jour + 4 caractères sans ambiguïté (ni 0/O, ni 1/I) */
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = crypto.getRandomValues(new Uint32Array(4));
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  if (ref) ref.textContent = `APS-${ymd}-${Array.from(rand, (n) => ALPHABET[n % ALPHABET.length]).join('')}`;

  const showAmount = (text: string) => {
    if (amount) amount.textContent = text;
    payLabel.textContent = `Payer ${text}`;
  };
  const html = document.documentElement;
  if (html.dataset.payAmount) {
    const v = Number(html.dataset.payAmount);
    showAmount(`${new Intl.NumberFormat('fr-FR').format(v).replace(/ /g, ' ')} FCFA`);
  }
  document.addEventListener('pay:amount', (e) => showAmount((e as CustomEvent).detail.text));

  const digits = () => phone.value.replace(/\D/g, '').slice(0, DIGITS);
  phone.addEventListener('input', () => {
    phone.value = digits().replace(/(\d{2})(?=\d)/g, '$1 ');
    if (error.textContent && digits().length === DIGITS) error.textContent = '';
    phone.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = digits();
    if (n.length !== DIGITS) {
      error.textContent = n.length
        ? `Le numéro doit compter ${DIGITS} chiffres (${n.length} saisis).`
        : 'Saisissez le numéro Orange Money qui recevra la demande de confirmation.';
      phone.setAttribute('aria-invalid', 'true');
      phone.focus();
      return;
    }
    pay.setAttribute('aria-disabled', 'true');
    payLabel.textContent = 'Envoi de la demande…';
    phone.value = '';                                      /* rien ne survit à la navigation */
    window.location.assign(form.dataset.pending ?? '/404');
  });
}
