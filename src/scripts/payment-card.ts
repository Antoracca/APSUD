/**
 * Paiement par carte (CardForm.astro) — vérifications sur l'appareil avec card-validator.
 * - Numéro : réseau reconnu dès les premiers chiffres (logo dans le champ), espaces aux bons
 *   endroits (4-4-4-4, ou 4-6-5 pour American Express), contrôle de Luhn et de longueur.
 * - Expiration « MM / AA » formatée pendant la saisie, refusée si passée.
 * - Cryptogramme : 3 chiffres, 4 pour American Express (l'aide change avec le réseau).
 * - Titulaire et e-mail du reçu.
 * Erreurs affichées en quittant un champ ou à l'envoi. « Payer » : si tout est valide, les champs
 * sont vidés puis on va sur la page provisoire (404). Rien n'est envoyé ni conservé.
 * TODO back-end : remplacer par les champs hébergés du prestataire (Stripe Payment Element…).
 */
import valid from 'card-validator';

const form = document.querySelector<HTMLFormElement>('[data-card-form]');

if (form) {
  const $ = <T extends HTMLElement>(sel: string) => form.querySelector<T>(sel)!;
  const number = $<HTMLInputElement>('[data-card-number]');
  const expiry = $<HTMLInputElement>('[data-card-expiry]');
  const cvc = $<HTMLInputElement>('[data-card-cvc]');
  const name = $<HTMLInputElement>('[data-card-name]');
  const email = $<HTMLInputElement>('[data-card-email]');
  const detected = $<HTMLElement>('[data-card-detected]');
  const brandName = $<HTMLElement>('[data-card-brand-name]');
  const cvcHint = $<HTMLElement>('[data-card-cvc-hint]');
  const pay = $<HTMLButtonElement>('[data-card-pay]');
  const payLabel = $<HTMLElement>('[data-card-pay-label]');
  const errorOf = (key: string) => $<HTMLElement>(`[data-error-for="${key}"]`);

  /* Montant (repris du récapitulatif) dans le bouton */
  const html = document.documentElement;
  const setAmount = (text: string) => { payLabel.textContent = `Payer ${text}`; };
  if (html.dataset.payAmount) {
    const v = Number(html.dataset.payAmount);
    const cur = html.dataset.payCurrency === 'EUR' ? '€' : 'FCFA';
    setAmount(`${new Intl.NumberFormat('fr-FR').format(v).replace(/ /g, ' ')} ${cur}`);
  }
  document.addEventListener('pay:amount', (e) => setAmount((e as CustomEvent).detail.text));

  let cvcSize = 3;

  /* ---------- Numéro ---------- */
  const formatNumber = () => {
    const digits = number.value.replace(/\D/g, '');
    const check = valid.number(digits);
    const card = check.card;
    const max = card ? Math.max(...card.lengths) : 19;
    const kept = digits.slice(0, max);
    const gaps = card?.gaps ?? [4, 8, 12, 16];
    let out = '';
    for (let i = 0; i < kept.length; i++) {
      if (gaps.includes(i) && i > 0) out += ' ';
      out += kept[i];
    }
    const caret = number.selectionStart === number.value.length;
    number.value = out;
    if (caret) number.setSelectionRange(out.length, out.length);

    if (card) {
      detected.dataset.brand = card.type;
      brandName.textContent = `Carte ${card.niceType} reconnue`;
      cvcSize = card.code.size;
      cvcHint.textContent = cvcSize === 4
        ? 'Les 4 chiffres au recto de la carte, au-dessus du numéro.'
        : `Les ${cvcSize} chiffres au dos de la carte.`;
      cvc.maxLength = cvcSize;
    } else {
      delete detected.dataset.brand;
      brandName.textContent = '';
      cvcSize = 3;
      cvc.maxLength = 4;
    }
    return check;
  };

  const rules: Record<string, () => string> = {
    number: () => {
      const digits = number.value.replace(/\D/g, '');
      if (!digits) return 'Saisissez le numéro de votre carte.';
      const check = valid.number(digits);
      if (!check.card) return 'Ce réseau de carte n’est pas reconnu.';
      if (!check.isValid) return 'Ce numéro de carte n’est pas valide : vérifiez les chiffres saisis.';
      return '';
    },
    expiry: () => {
      if (!expiry.value.trim()) return 'Saisissez la date d’expiration.';
      const check = valid.expirationDate(expiry.value.replace(/\s/g, ''));
      if (!check.isValid) return 'Date d’expiration invalide ou dépassée (format MM / AA).';
      return '';
    },
    cvc: () => {
      if (!cvc.value) return 'Saisissez le cryptogramme.';
      return valid.cvv(cvc.value, cvcSize).isValid ? '' : `Le cryptogramme compte ${cvcSize} chiffres.`;
    },
    name: () => (valid.cardholderName(name.value.trim()).isValid ? '' : 'Saisissez le nom inscrit sur la carte.'),
    email: () => (email.value.trim() && email.checkValidity() ? '' : 'Saisissez une adresse e-mail valide pour recevoir votre reçu.'),
  };
  const inputs: Record<string, HTMLInputElement> = { number, expiry, cvc, name, email };

  const check = (key: string, show: boolean) => {
    const message = rules[key]();
    const input = inputs[key];
    input.dataset.valid = String(!message);
    if (show) {
      errorOf(key).textContent = message;
      input.toggleAttribute('aria-invalid', !!message);
    } else if (!message) {
      errorOf(key).textContent = '';
      input.removeAttribute('aria-invalid');
    }
    return !message;
  };

  number.addEventListener('input', () => { formatNumber(); check('number', false); });

  /* ---------- Expiration : « MM / AA » ---------- */
  expiry.addEventListener('input', (e) => {
    let d = expiry.value.replace(/\D/g, '').slice(0, 4);
    if (d.length === 1 && Number(d) > 1) d = `0${d}`;      /* « 7 » → « 07 » */
    const deleting = (e as InputEvent).inputType?.startsWith('delete');
    expiry.value = d.length > 2 || (d.length === 2 && !deleting) ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
    check('expiry', false);
  });

  cvc.addEventListener('input', () => { cvc.value = cvc.value.replace(/\D/g, '').slice(0, cvcSize); check('cvc', false); });
  [name, email].forEach((el) => el.addEventListener('input', () => check(el === name ? 'name' : 'email', false)));
  Object.entries(inputs).forEach(([key, el]) => el.addEventListener('blur', () => { if (el.value) check(key, true); }));

  /* ---------- Envoi ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = Object.keys(rules).map((key) => [key, check(key, true)] as const);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) { inputs[firstBad[0]].focus(); return; }
    pay.setAttribute('aria-disabled', 'true');
    payLabel.textContent = 'Paiement en cours…';
    Object.values(inputs).forEach((el) => { el.value = ''; });   /* aucune donnée de carte ne survit */
    window.location.assign(form.dataset.pending ?? '/404');
  });
}
