/**
 * Vidéo du hero en amélioration progressive (DESIGN.md §7.2 et §7.4).
 *
 * La photo (<picture>) est le contenu ; la vidéo n'est qu'un bonus. Le HTML ne contient
 * AUCUNE source : elles sont injectées ici seulement si TOUTES les conditions sont réunies :
 *   - écran ≥ 48em ;
 *   - pas d'« économie de données » (navigator.connection.saveData) ;
 *   - réseau 4G (ou type inconnu : Safari, Firefox) ;
 *   - pas de « animations réduites ».
 * Chargement après `load` + temps mort du navigateur, pour ne jamais concurrencer le LCP.
 * La vidéo apparaît (fondu) à l'événement `playing` ; le bouton pause/lecture s'affiche alors.
 * La pause manuelle prime sur l'automatisme et est mémorisée pour la session.
 * Hors écran, la vidéo est mise en pause (batterie, processeur).
 * Toute erreur : la vidéo reste masquée, la photo reste. Aucun message.
 */

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

const STORAGE_KEY = 'apsud:hero-video-paused';
const LABEL_PAUSE = 'Mettre la vidéo en pause';
const LABEL_PLAY = 'Lire la vidéo';

const wideScreen = window.matchMedia('(width >= 48em)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function readPaused(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}
function writePaused(paused: boolean): void {
  try {
    if (paused) window.sessionStorage.setItem(STORAGE_KEY, '1');
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* stockage indisponible (navigation privée) : on ignore */
  }
}

function canLoadVideo(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (!wideScreen.matches || reducedMotion.matches) return false;
  if (connection?.saveData) return false;
  const type = connection?.effectiveType;
  return type === undefined || type === '4g';
}

function whenIdle(callback: () => void): void {
  const start = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(callback, { timeout: 2000 });
    else window.setTimeout(callback, 2000);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

function initHeroVideo(video: HTMLVideoElement): void {
  const toggle = video.parentElement?.querySelector<HTMLButtonElement>('[data-hero-toggle]') ?? null;
  let userPaused = readPaused();
  let inView = true;
  let loaded = false;

  const setState = (state: 'playing' | 'paused') => {
    if (!toggle) return;
    const label = state === 'playing' ? LABEL_PAUSE : LABEL_PLAY;
    toggle.dataset.state = state;
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  };

  const tryPlay = () => {
    if (userPaused || !inView || reducedMotion.matches) return;
    video.play().catch(() => {
      /* lecture refusée : la photo reste, le bouton propose « Lire » */
      setState('paused');
    });
  };

  const load = () => {
    if (loaded || !canLoadVideo()) return;
    loaded = true;
    const sources: Array<[string | undefined, string]> = [
      [video.dataset.srcWebm, 'video/webm'],
      [video.dataset.srcMp4, 'video/mp4'],
    ];
    for (const [src, type] of sources) {
      if (!src) continue;
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      video.append(source);
    }
    if (!video.querySelector('source')) return;
    if (video.dataset.poster) video.poster = video.dataset.poster;

    video.addEventListener('playing', () => {
      video.classList.add('is-playing');
      if (toggle) toggle.hidden = false;
      setState('playing');
    });
    video.addEventListener('pause', () => setState('paused'));
    video.addEventListener('error', () => {
      video.classList.remove('is-playing');
      if (toggle) toggle.hidden = true;
    }, true);

    video.load();
    if (userPaused) {
      /* la visiteuse avait mis en pause : on affiche le bouton « Lire » sans lancer */
      if (toggle) toggle.hidden = false;
      setState('paused');
    } else {
      tryPlay();
    }
  };

  toggle?.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      writePaused(false);
      video.play().catch(() => setState('paused'));
    } else {
      userPaused = true;
      writePaused(true);
      video.pause();
    }
  });

  /* Pause hors écran, reprise au retour (sauf pause manuelle) */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!loaded) return;
      if (inView) tryPlay();
      else if (!video.paused) video.pause();
    }).observe(video);
  }

  /* Réglage « animations réduites » activé pendant la visite : pause */
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && !video.paused) video.pause();
  });
  /* Passage en grand écran après coup (rotation de tablette) : on retente le chargement */
  wideScreen.addEventListener('change', () => {
    if (!loaded) whenIdle(load);
  });

  whenIdle(load);
}

document.querySelectorAll<HTMLVideoElement>('[data-hero-video]').forEach(initHeroVideo);
