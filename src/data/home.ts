/**
 * Contenu de la page d'accueil.
 * Structure calquée sur l'accueil de Prosper Global (PROSPER_STRUCTURE.md §5.1),
 * contenu 100 % APSUD, tiré de data/apsud/*.json.
 *
 * ⚠ Chiffres clés : déduits des fiches projets et de l'ancien site (60+ projets, 2023).
 *   Ils DOIVENT être validés par APSUD avant mise en ligne (CONTROLE_QUALITE.md).
 * ⚠ Les photos sont celles du site actuel ; elles seront remplacées par les photos
 *   fournies par le client (assets/photos-client/).
 */
import projetsData from '../../data/apsud/projets.json';

type Projet = (typeof projetsData.projets)[number];
const byId = (id: number): Projet => {
  const p = projetsData.projets.find((x) => x.id_source === id);
  if (!p) throw new Error(`Projet ${id} introuvable dans data/apsud/projets.json`);
  return p;
};

/** Chemin d'image relatif à la racine du dépôt (résolu par src/lib/images.ts). */
export type ImagePath = `assets/${string}`;

/* -------------------------------------------------------------------------- */
/* 0. Bandeau d'annonce (eyebrow) — un seul, fermable, mémorisé 7 jours       */
/* -------------------------------------------------------------------------- */
export const eyebrow = {
  id: 'nouveau-site-2026',
  strong: 'Le nouveau site d’APSUD est en ligne.',
  text: 'Même équipe, mêmes terrains, depuis 2015 en Centrafrique.',
  link: { label: 'Voir nos projets', href: '/projets' },
};

/* -------------------------------------------------------------------------- */
/* 1. Hero vidéo (photo en attendant la vidéo)                                */
/* -------------------------------------------------------------------------- */
export const hero = {
  title: 'Rester après l’urgence. Bâtir ce qui dure.',
  text:
    'Points d’eau remis en service, latrines familiales, emplois temporaires, ONG locales renforcées : depuis 2015, nos équipes centrafricaines travaillent avec les communautés de Bangui jusqu’à Rafaï.',
  cta: { label: 'Soutenir nos actions', href: '/faire-un-don' },
  /* Photo fournie par le développeur le 2026-11-22 (2752 × 1536, image générée par IA : à remplacer
     par une vraie photo de terrain APSUD avant la mise en ligne). Mains unies au centre du cadre :
     lisible en 16:9 (ordinateur, bloc sombre en bas à gauche) comme en recadrage 4:5 (téléphone). */
  poster: 'assets/apsud/images/hero/mains-unies.jpg' as ImagePath,
  posterAlt: 'Des mains d’adultes et d’enfants posées les unes sur les autres au centre d’un cercle, bracelets colorés aux poignets',
  /* Vidéo à fournir par APSUD : 6–8 s, 720p, sans son, ≤ 1,5 Mo (DESIGN.md §7) */
  video: null as null | { mp4: string; webm?: string },
};

/* -------------------------------------------------------------------------- */
/* 2. Manifeste + chiffres clés                                               */
/* -------------------------------------------------------------------------- */
export const manifesto = {
  statement:
    'Nous travaillons aux côtés des communautés centrafricaines pour répondre à l’urgence et créer les conditions d’un développement durable, afin que chacun, de Bangui à la Haute-Kotto, puisse vivre dans la dignité.',
  stats: [
    { value: 60, suffix: '+', label: 'projets menés en Centrafrique depuis 2015' },
    { value: 12, suffix: '', label: 'préfectures et la ville de Bangui couvertes par nos projets' },
    { value: 250000, suffix: '', label: 'personnes touchées par nos projets d’eau, d’hygiène et de subsistance' },
    { value: 1900, suffix: '', label: 'latrines familiales construites ou réhabilitées avec les ménages' },
  ],
};

/* -------------------------------------------------------------------------- */
/* 3. Projets en cours (équivalent « Featured stories »)                       */
/* -------------------------------------------------------------------------- */
const parsoc = byId(18);
const agriapps = byId(20);

export const featuredProjects = {
  title: 'Projets en cours',
  items: [
    {
      size: 'large' as const,
      href: `/projets/${parsoc.slug}`,
      image: 'assets/apsud/images/projets/parsoc/projet-parsoc-lancement-regional-bambari-02.jpg' as ImagePath,
      imageAlt: 'Lancement régional du projet PARSOC à Bambari, en présence des organisations de la société civile',
      meta: 'Union européenne · Welthungerhilfe · 2025–2027',
      title: 'PARSOC : 200 organisations de la société civile renforcées dans six préfectures',
      text:
        'Avec Welthungerhilfe et le soutien de l’Union européenne, nous accompagnons des associations centrafricaines qui défendent les droits humains, la cohésion sociale et l’égalité femmes-hommes.',
    },
    {
      size: 'medium' as const,
      href: `/projets/${agriapps.slug}`,
      image: 'assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-productrice-03.jpg' as ImagePath,
      imageAlt: 'Un agent d’APSUD présente l’application FINIYAKA sur smartphone à une productrice agricole',
      meta: 'BMZ · Welthungerhilfe · 2025–2026',
      title: 'FINIYAKA, l’application qui relie les producteurs aux marchés',
      text:
        'Conseils techniques, prix et acheteurs dans la poche des agriculteurs de Bangui, de la Lobaye et de la Kémo.',
    },
  ],
  cta: { label: 'Voir tous les projets', href: '/projets' },
};

/* -------------------------------------------------------------------------- */
/* 4. Notre façon de travailler (zigzag côte à côte)                           */
/* -------------------------------------------------------------------------- */
export const howWeWork = {
  title: 'Notre façon de travailler',
  rows: [
    {
      image: 'assets/apsud/images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-lavage-mains-02.jpg' as ImagePath,
      imageAlt: 'Un agent d’APSUD montre l’utilisation d’un dispositif de lavage des mains dans un quartier de retour d’Ippy',
      title: 'Centrafricains, sur le terrain',
      text:
        'Nos équipes viennent des régions où nous intervenons. Elles parlent sango avec les familles, connaissent les chefs de quartier et restent quand les projets se terminent.',
      link: { label: 'Découvrir l’ONG', href: '/qui-sommes-nous' },
    },
    {
      image: 'assets/apsud/images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-coaching-ong-femmes-01.jpg' as ImagePath,
      imageAlt: 'Une responsable de l’ONG FEVA en stage de coaching au bureau d’APSUD',
      title: 'Transmettre pour durer',
      text:
        'En 2025, six ONG nationales dirigées par des femmes ont été formées et accompagnées par APSUD pour piloter elles-mêmes des réponses humanitaires à Boguila et Markounda.',
      link: { label: 'Voir nos domaines d’action', href: '/nos-actions' },
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 5. Vision (équivalent « Voices of Prosperity »)                             */
/* -------------------------------------------------------------------------- */
export const vision = {
  title: 'Notre vision',
  image: 'assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-producteurs-04.jpg' as ImagePath,
  imageAlt: 'Présentation de l’application FINIYAKA à des producteurs agricoles dans un champ à Ngou Le',
  quote: 'Un Centrafrique juste, meilleur, sans pauvreté et sans discrimination.',
  text:
    'Cette vision guide chacun de nos projets : de l’eau potable dans les sites de déplacés jusqu’au renforcement des organisations qui porteront demain le développement de leur région.',
  link: { label: 'Nos valeurs', href: '/qui-sommes-nous#valeurs' },
};

/* -------------------------------------------------------------------------- */
/* 6. Projets réalisés récemment (équivalent « From the press room »)          */
/* -------------------------------------------------------------------------- */
const recent = [19, 15, 14].map(byId);
const periode = (p: Projet) =>
  [p.annee_debut, p.annee_fin].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join('–');

export const recentProjects = {
  title: 'Projets réalisés',
  items: recent.map((p) => ({
    href: `/projets/${p.slug}`,
    date: periode(p),
    place: (p.lieux ?? [])
      .map((l) => l.lieu)
      .filter(Boolean)
      .join(', '),
    title: p.titre_court ?? p.titre,
    text: p.resume,
  })),
  cta: { label: 'Tous les projets réalisés', href: '/projets?statut=realise' },
};

/* -------------------------------------------------------------------------- */
/* 7. Bailleurs et partenaires (priorité n°1 du client)                        */
/* -------------------------------------------------------------------------- */
export const partnersBand = {
  title: 'Ils financent et partagent notre action',
  /* mot mis en valeur (italique + trait de pinceau) dans le titre du bandeau */
  emphasis: 'partagent',
  overline: 'Bailleurs et partenaires',
  /* Appel au don placé entre les deux rangées : pas de « Faire un don », une invitation à rejoindre */
  give: {
    title: 'Et vous ?',
    text: 'Rejoignez celles et ceux qui rendent possible l’action d’APSUD en Centrafrique.',
    label: 'Agir à leurs côtés',
    href: '/faire-un-don',
  },
  rows: [
    { category: 'bailleur' as const, label: 'Bailleurs', direction: 'left' as const },
    { category: 'partenaire' as const, label: 'Partenaires de mise en œuvre', direction: 'right' as const },
  ],
  text:
    'Fonds humanitaire, agences des Nations unies, coopérations bilatérales et ONG internationales : plus de trente organisations ont travaillé avec APSUD.',
  cta: { label: 'Tous nos partenaires', href: '/partenaires' },
};

/* -------------------------------------------------------------------------- */
/* 8. Double appel à l'action                                                  */
/* -------------------------------------------------------------------------- */
export const ctaTwoUp = {
  title: 'Agir avec APSUD',
  primary: {
    title: 'Financer le terrain',
    text: 'Un don aide nos équipes à intervenir là où les besoins sont les plus forts.',
    cta: { label: 'Faire un don', href: '/faire-un-don' },
  },
  secondary: {
    title: 'Mettre en œuvre ensemble',
    text: 'Bailleurs, agences et ONG internationales : un partenaire national présent dans 12 préfectures.',
    cta: { label: 'Devenir partenaire', href: '/agir/partenariat' },
  },
};
