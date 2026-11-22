/**
 * Formulaire de contact (/contact, ContactForm.astro).
 * - Pré-remplissage depuis l'URL : ?objet=don|partenariat|…, et pour un don ?montant=&devise=
 *   (message d'amorce modifiable). Aucune donnée personnelle n'est lue ni écrite dans l'URL.
 * - Validation à l'envoi puis en direct sur les champs déjà signalés : messages reliés aux champs
 *   (aria-invalid + aria-describedby), résumé d'erreurs focalisé avec liens vers les champs.
 * - Pot de miel : si le champ caché est rempli, on simule une confirmation sans rien faire.
 * - Confirmation affichée EN PLACE, sans envoi réel ; un lien mailto reprend objet et message.
 *
 * TODO back-end : remplacer le corps de submit() par un fetch POST vers le point d'API
 * (PHP sur LWS ou service de formulaires), puis afficher la confirmation ou une erreur réseau.
 */
const currencyLabels: Record<string, string> = { XAF: 'FCFA', EUR: 'EUR', USD: 'USD' };
const nf = new Intl.NumberFormat('fr-FR');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

document.querySelectorAll<HTMLElement>('[data-contact]').forEach((root) => {
  const form = root.querySelector<HTMLFormElement>('[data-contact-form]');
  const errors = root.querySelector<HTMLElement>('[data-contact-errors]');
  const errorsList = root.querySelector<HTMLUListElement>('[data-contact-errors-list]');
  const done = root.querySelector<HTMLElement>('[data-contact-done]');
  const again = root.querySelector<HTMLButtonElement>('[data-contact-again]');
  const mailto = root.querySelector<HTMLAnchorElement>('[data-contact-mailto]');
  const subject = root.querySelector<HTMLSelectElement>('[data-contact-subject]');
  const message = root.querySelector<HTMLTextAreaElement>('[data-contact-message]');
  const count = root.querySelector<HTMLElement>('[data-contact-count]');
  if (!form || !errors || !errorsList || !done || !subject || !message) return;

  /* ---------- Pré-remplissage ---------- */
  const params = new URLSearchParams(window.location.search);
  const objet = params.get('objet');
  if (objet && [...subject.options].some((o) => o.value === objet)) subject.value = objet;
  const montant = Number(params.get('montant'));
  const devise = currencyLabels[params.get('devise') ?? ''];
  if (objet === 'don' && !message.value) {
    message.value =
      montant > 0 && devise
        ? `Bonjour, je souhaite faire un don de ${nf.format(montant)} ${devise} à APSUD. Pouvez-vous me communiquer vos coordonnées Mobile Money ou bancaires ?`
        : 'Bonjour, je souhaite faire un don à APSUD. Pouvez-vous me communiquer vos coordonnées Mobile Money ou bancaires ?';
  } else if (objet === 'partenariat' && !message.value) {
    message.value = 'Bonjour, nous souhaitons échanger avec APSUD au sujet d’un partenariat. Organisation, programme, zone et calendrier envisagés : ';
  }

  const maxLen = message.maxLength > 0 ? message.maxLength : 2000;
  const updateCount = () => { if (count) count.textContent = `${message.value.length} / ${maxLen}`; };
  message.addEventListener('input', updateCount);
  updateCount();

  /* ---------- Validation ---------- */
  type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const fields = [...form.querySelectorAll<Field>('[required]')];

  function messageFor(f: Field): string | null {
    const v = 'value' in f ? f.value.trim() : '';
    if (f instanceof HTMLInputElement && f.type === 'checkbox') {
      return f.checked ? null : 'Cochez cette case pour que nous puissions vous répondre.';
    }
    if (!v) {
      if (f instanceof HTMLSelectElement) return 'Choisissez l’objet de votre message.';
      return `Renseignez le champ « ${labelOf(f)} ».`;
    }
    if (f instanceof HTMLInputElement && f.type === 'email' && !EMAIL.test(v)) {
      return 'Saisissez une adresse e-mail valide, par exemple nom@domaine.org.';
    }
    if (f instanceof HTMLTextAreaElement && f.minLength > 0 && v.length < f.minLength) {
      return `Votre message doit compter au moins ${f.minLength} caractères.`;
    }
    return null;
  }

  function labelOf(f: Field): string {
    return form!.querySelector(`label[for="${f.id}"]`)?.textContent?.trim() ?? f.name;
  }

  function show(f: Field, msg: string | null) {
    const err = document.getElementById(`${f.id}-error`);
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      err.textContent = msg ?? '';
      err.hidden = !msg;
    }
  }

  fields.forEach((f) => {
    const ev = f instanceof HTMLInputElement && f.type === 'checkbox' ? 'change' : 'input';
    f.addEventListener(ev, () => {
      if (f.getAttribute('aria-invalid') === 'true') show(f, messageFor(f));
    });
    f.addEventListener('blur', () => {
      if (f.getAttribute('aria-invalid') === 'true') show(f, messageFor(f));
    });
  });

  function validate(): boolean {
    const invalid: { f: Field; msg: string }[] = [];
    fields.forEach((f) => {
      const msg = messageFor(f);
      show(f, msg);
      if (msg) invalid.push({ f, msg });
    });
    errorsList!.replaceChildren(
      ...invalid.map(({ f, msg }) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${f.id}`;
        a.textContent = msg;
        a.addEventListener('click', (e) => { e.preventDefault(); f.focus(); });
        li.append(a);
        return li;
      }),
    );
    errors!.hidden = invalid.length === 0;
    if (invalid.length) errors!.focus();
    return invalid.length === 0;
  }

  /* ---------- Envoi (simulé) ---------- */
  function submit() {
    const data = new FormData(form!);
    if (mailto) {
      const label = subject!.selectedOptions[0]?.textContent ?? 'Contact';
      const body = `${String(data.get('message') ?? '')}\n\n${String(data.get('nom') ?? '')}`;
      mailto.href = `${mailto.href.split('?')[0]}?subject=${encodeURIComponent(`[Site APSUD] ${label}`)}&body=${encodeURIComponent(body)}`;
    }
    form!.hidden = true;
    errors!.hidden = true;
    done!.hidden = false;
    done!.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trap = form.querySelector<HTMLInputElement>('input[name="site"]');
    if (trap && trap.value) { form.hidden = true; done.hidden = false; return; }
    if (validate()) submit();
  });

  again?.addEventListener('click', () => {
    form.reset();
    fields.forEach((f) => show(f, null));
    updateCount();
    done.hidden = true;
    form.hidden = false;
    form.querySelector<HTMLInputElement>('input:not([tabindex="-1"])')?.focus();
  });
});
