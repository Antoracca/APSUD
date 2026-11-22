/**
 * Navigation principale — 4 « portes » comme Prosper Global
 * (Who we are · What we do · Where we work · How to help), transposées pour APSUD.
 * Les pages cibles seront créées une par une (voir INSTRUCTIONS.md §9).
 */

export interface NavLink {
  label: string;
  href: string;
  /** Préfecture mise en évidence sur la mini-carte du méga-menu (slug de rca-prefectures.json) */
  zone?: string;
  /** Pictogramme maison affiché devant le lien dans le méga-menu */
  icon?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** Phrase de présentation affichée à gauche du méga-menu (≥ 90em) */
  intro?: string;
  /** Affiche la mini-carte des préfectures dans la présentation */
  map?: boolean;
  links: NavLink[];
}

export const mainNav: NavGroup[] = [
  {
    label: "L'ONG",
    href: '/qui-sommes-nous',
    intro: 'Une ONG centrafricaine, avec des équipes centrafricaines, aux côtés des communautés depuis 2015.',
    links: [
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
      { label: 'Mission et valeurs', href: '/qui-sommes-nous#valeurs' },
      { label: 'Gouvernance et équipe', href: '/qui-sommes-nous/equipe' },
      { label: 'Rapports et transparence', href: '/qui-sommes-nous/rapports' },
      { label: 'Offres d’emploi', href: '/carrieres' },
    ],
  },
  {
    label: 'Nos actions',
    href: '/nos-actions',
    intro: 'Quatre domaines d’intervention, de la réponse d’urgence au développement durable.',
    links: [
      { label: 'Eau, hygiène et assainissement', href: '/nos-actions/eau-hygiene-assainissement', icon: 'eau' },
      { label: 'Sécurité alimentaire', href: '/nos-actions/securite-alimentaire', icon: 'agriculture' },
      { label: 'Protection et genre', href: '/nos-actions/protection', icon: 'protection' },
      { label: 'Société civile locale', href: '/nos-actions/societe-civile', icon: 'societe-civile' },
      { label: 'Tous les projets', href: '/projets' },
    ],
  },
  {
    label: 'Nos zones',
    href: '/nos-zones',
    intro: 'Bangui et les préfectures où nos équipes travaillent. Survolez une zone pour la situer.',
    map: true,
    links: [
      { label: 'Bangui', href: '/nos-zones#bangui', zone: 'bangui' },
      { label: 'Ombella-M’Poko', href: '/nos-zones#ombella-mpoko', zone: 'ombella-m-poko' },
      { label: 'Ouaka', href: '/nos-zones#ouaka', zone: 'ouaka' },
      { label: 'Haute-Kotto', href: '/nos-zones#haute-kotto', zone: 'haute-kotto' },
      { label: 'Carte des interventions', href: '/nos-zones' },
    ],
  },
  {
    label: 'Agir avec nous',
    href: '/agir',
    intro: 'Donner, s’associer à nos projets ou répondre à nos appels d’offres : chaque soutien compte sur le terrain.',
    links: [
      { label: 'Faire un don', href: '/faire-un-don' },
      { label: 'Devenir partenaire', href: '/agir/partenariat' },
      { label: 'Partenaires et bailleurs', href: '/partenaires' },
      { label: 'Appels d’offres', href: '/agir/appels-d-offres' },
      { label: 'Nous contacter', href: '/contact' },
    ],
  },
];

export const donateLink: NavLink = { label: 'Faire un don', href: '/faire-un-don' };
export const searchLink: NavLink = { label: 'Rechercher', href: '/recherche' };

export const footerNav: NavGroup[] = [
  {
    label: "L'ONG",
    href: '/qui-sommes-nous',
    links: [
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
      { label: 'Gouvernance et équipe', href: '/qui-sommes-nous/equipe' },
      { label: 'Rapports et transparence', href: '/qui-sommes-nous/rapports' },
      { label: 'Éthique et protection', href: '/qui-sommes-nous/ethique' },
      { label: 'Offres d’emploi', href: '/carrieres' },
      { label: 'Nous contacter', href: '/contact' },
    ],
  },
  {
    label: 'Agir avec nous',
    href: '/agir',
    links: [
      { label: 'Faire un don', href: '/faire-un-don' },
      { label: 'Devenir partenaire', href: '/agir/partenariat' },
      { label: 'Partenaires et bailleurs', href: '/partenaires' },
      { label: 'Appels d’offres', href: '/agir/appels-d-offres' },
      { label: 'Tous les projets', href: '/projets' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
