/**
 * En-tête (Header.astro).
 *
 * 1. Défilement : `c-header--scrolled` au-delà de 8 px (barre réduite + filet) ; en mobile,
 *    `--scroll-y` posé sur le header pour qu'il suive le bandeau d'annonce qui défile, puis se cale en haut.
 * 2. Méga-menu desktop : UNE porte active à la fois (`.is-active` + `data-active` sur la liste).
 *    Première ouverture après une courte intention de survol (--nav-open-delay), puis changement
 *    de porte immédiat ; sortie du panneau tolérée (--nav-close-grace). Clavier : la porte qui reçoit
 *    le focus s'ouvre aussitôt ; Échap referme et rend le focus à la porte. Tablette tactile :
 *    premier toucher = ouvre la colonne, second = suit le lien. « À la une » fait partie du panneau.
 * 3. Menu mobile : burger <button aria-expanded>, panneau plein écran, accordéons,
 *    piège de focus, Échap, `body.is-locked`, `inert` sur le reste de la page.
 */
const header = document.querySelector<HTMLElement>('[data-header]');

if (header) {
  const desktop = window.matchMedia('(width >= 48em)');
  const SCROLL_THRESHOLD = 8;
  const SCROLL_CAP = 1000;   /* au-delà, plus aucune écriture : le bandeau est loin */

  /* ------------------------------------------------------------------ */
  /* 1. Défilement                                                       */
  /* ------------------------------------------------------------------ */
  let lastY = -1;
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = Math.max(0, window.scrollY);
    header.classList.toggle('c-header--scrolled', y > SCROLL_THRESHOLD);
    const capped = Math.min(y, SCROLL_CAP);
    if (capped !== lastY) {
      lastY = capped;
      header.style.setProperty('--scroll-y', `${capped}px`);
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------ */
  /* 2. Méga-menu desktop : une seule porte active à la fois             */
  /* ------------------------------------------------------------------ */
  const doors = header.querySelector<HTMLElement>('[data-header-doors]');
  const feature = header.querySelector<HTMLElement>('[data-header-feature]');
  if (doors) {
    const doorEls = Array.from(doors.querySelectorAll<HTMLElement>('.c-header__door'));
    const linkOf = (door: HTMLElement) => door.querySelector<HTMLElement>('.c-header__door-link');
    /* Zones du panneau ouvert : colonnes, fond commun, « À la une » (les traverser ne ferme rien) */
    const PANEL = '.c-header__clip, .c-header__backdrop-clip, .c-header__feature';
    const inMenu = (node: Node | null) => !!node && (doors.contains(node) || !!feature?.contains(node));

    /* « À la une » : la photo est en chargement différé, mais elle reste rognée tant que le menu est
       fermé ; certains navigateurs ne la chargent alors jamais (ou trop tard, en ligne). On la
       précharge dès que la page est au repos, et au plus tard à la première ouverture. */
    const featureImg = feature?.querySelector<HTMLImageElement>('img') ?? null;
    const loadFeature = () => { if (featureImg && featureImg.loading !== 'eager') featureImg.loading = 'eager'; };
    const idle = (cb: () => void) =>
      'requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 3000 }) : window.setTimeout(cb, 1500);
    if (document.readyState === 'complete') idle(loadFeature);
    else window.addEventListener('load', () => idle(loadFeature), { once: true });

    /* Mini-carte « Nos zones » : survol ou focus d'un lien de zone = sa préfecture s'allume */
    const mapParts = Array.from(header.querySelectorAll<SVGElement>('[data-zone-path]'));
    const lightZone = (slug: string | null) =>
      mapParts.forEach((el) => el.classList.toggle('is-lit', !!slug && el.dataset.zonePath === slug));
    doors.querySelectorAll<HTMLElement>('[data-zone]').forEach((link) => {
      const on = () => lightZone(link.dataset.zone ?? null);
      const off = () => lightZone(null);
      link.addEventListener('pointerenter', on);
      link.addEventListener('focus', on);
      link.addEventListener('pointerleave', off);
      link.addEventListener('blur', off);
    });

    /* Délais lus dans les jetons (tokens.css) */
    const tokenMs = (name: string, fallback: number) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const v = parseFloat(raw);
      return Number.isNaN(v) ? fallback : raw.endsWith('ms') ? v : raw.endsWith('s') ? v * 1000 : v;
    };
    const OPEN_DELAY = tokenMs('--nav-open-delay', 120);
    const CLOSE_GRACE = tokenMs('--nav-close-grace', 180);

    let active: HTMLElement | null = null;
    let pending: HTMLElement | null = null;
    let openTimer = 0;
    let closeTimer = 0;
    let silentFocus = false;   /* focus rendu par Échap : ne pas rouvrir */

    const clearTimers = () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
      pending = null;
    };
    /** Ouvre la colonne de `door` (et referme l'autre), ou ferme tout si null. */
    const setActive = (door: HTMLElement | null) => {
      clearTimers();
      if (door === active) return;
      active = door;
      if (door) loadFeature();
      doorEls.forEach((d) => d.classList.toggle('is-active', d === door));
      if (door) doors.dataset.active = String(doorEls.indexOf(door) + 1);
      else {
        delete doors.dataset.active;
        doorEls.forEach((d) => d.classList.remove('is-touched'));
      }
    };
    /** Survol d'une porte : changement immédiat si un panneau est déjà ouvert, sinon courte intention. */
    const hoverDoor = (door: HTMLElement) => {
      window.clearTimeout(closeTimer);
      if (active) { setActive(door); return; }
      if (pending === door) return;
      window.clearTimeout(openTimer);
      pending = door;
      openTimer = window.setTimeout(() => setActive(door), OPEN_DELAY);
    };
    const scheduleClose = () => {
      window.clearTimeout(openTimer);
      pending = null;
      if (!active) return;
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => setActive(null), CLOSE_GRACE);
    };

    /* Souris / stylet : on classe la cible du pointeur (barre d'une porte, panneau, ailleurs) */
    header.addEventListener('pointerover', (e) => {
      if (e.pointerType === 'touch' || !desktop.matches) return;
      const t = e.target as HTMLElement;
      if (t.closest(PANEL)) { window.clearTimeout(closeTimer); return; }
      const door = t.closest<HTMLElement>('.c-header__door');
      if (door && doors.contains(door)) hoverDoor(door);
      else scheduleClose();                 /* logo, loupe, bouton de don : le panneau se referme */
    });
    header.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'touch') scheduleClose();
    });

    /* Clavier : la porte qui reçoit le focus (ou dont un sous-lien le reçoit) s'ouvre aussitôt */
    const onFocusIn = (e: FocusEvent) => {
      if (silentFocus) return;
      const door = (e.target as HTMLElement).closest<HTMLElement>('.c-header__door');
      if (door) setActive(door);
      else if (!active) setActive(doorEls.at(-1) ?? null);   /* « À la une » : rattachée à la dernière porte */
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!inMenu(e.relatedTarget as Node)) setActive(null);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !active) return;
      const target = (e.target as HTMLElement).closest<HTMLElement>('.c-header__door') ?? active;
      setActive(null);
      silentFocus = true;
      linkOf(target)?.focus();
      silentFocus = false;
    };
    [doors, feature].forEach((zone) => {
      if (!zone) return;
      zone.addEventListener('focusin', onFocusIn);
      zone.addEventListener('focusout', onFocusOut);
      zone.addEventListener('keydown', onEscape);
    });

    /* Tablette tactile : premier toucher sur une porte = ouvrir sa colonne, second = suivre le lien */
    let touch = false;
    doors.addEventListener('pointerdown', (e) => { touch = e.pointerType === 'touch'; });
    doorEls.forEach((door) => {
      linkOf(door)?.addEventListener('click', (e) => {
        if (!touch || !desktop.matches) return;
        if (door.classList.contains('is-touched')) return;   /* second toucher : on suit le lien */
        e.preventDefault();
        setActive(door);
        doorEls.forEach((d) => d.classList.toggle('is-touched', d === door));
      });
    });
    document.addEventListener('pointerdown', (e) => {
      if (!inMenu(e.target as Node) && !(e.target as HTMLElement).closest?.(PANEL)) setActive(null);
    });
    /* Passage en mobile : rien ne doit rester ouvert */
    desktop.addEventListener('change', () => setActive(null));
  }

  /* ------------------------------------------------------------------ */
  /* 3. Menu mobile                                                      */
  /* ------------------------------------------------------------------ */
  const burger = header.querySelector<HTMLButtonElement>('[data-header-burger]');
  const burgerLabel = header.querySelector<HTMLElement>('[data-header-burger-label]');
  const drawer = header.querySelector<HTMLElement>('[data-header-drawer]');
  const inerted: HTMLElement[] = [];
  const KEEP_ACTIVE = '[data-cookie-banner], [data-cookie-dialog], dialog';
  let open = false;

  const focusables = () =>
    Array.from(
      header.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => el.offsetParent !== null && !el.closest('[hidden]') && getComputedStyle(el).visibility !== 'hidden');

  function setOpen(next: boolean, { restoreFocus = true } = {}) {
    if (!burger || !drawer || open === next) return;
    open = next;
    header.classList.toggle('c-header--open', next);
    burger.setAttribute('aria-expanded', String(next));
    if (burgerLabel) burgerLabel.textContent = next ? 'Fermer le menu' : 'Ouvrir le menu';
    document.body.classList.toggle('is-locked', next);
    document.documentElement.classList.toggle('is-locked', next);

    if (next) {
      /* Le reste de la page devient inerte : ni focus, ni lecteur d'écran */
      Array.from(document.body.children).forEach((el) => {
        if (el === header || !(el instanceof HTMLElement) || el.inert || el.tagName === 'SCRIPT') return;
        if (el.matches(KEEP_ACTIVE)) return;   /* le consentement cookies doit rester utilisable */
        el.inert = true;
        inerted.push(el);
      });
      drawer.scrollTop = 0;
    } else {
      inerted.splice(0).forEach((el) => { el.inert = false; });
      if (restoreFocus && header.contains(document.activeElement)) burger.focus();
    }
  }

  burger?.addEventListener('click', () => setOpen(!open));

  /* Accordéons : le chevron pivote, les sous-liens se déplient (grid-template-rows 0fr → 1fr) */
  header.querySelectorAll<HTMLButtonElement>('[data-header-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.closest('[data-header-accordion]')?.classList.toggle('is-open', !expanded);
    });
  });

  /* Un lien choisi referme le menu (utile pour les ancres de la même page) */
  drawer?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a[href]')) setOpen(false, { restoreFocus: false });
  });

  /* Échap + piège de focus */
  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      burger?.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && (active === first || !header.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !header.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  });

  /* Passage en desktop pendant que le menu est ouvert : on le referme proprement */
  desktop.addEventListener('change', (e) => { if (e.matches) setOpen(false, { restoreFocus: false }); });
}
