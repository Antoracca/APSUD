/**
 * Navigation principale — 4 « portes » comme Prosper Global
 * (Who we are · What we do · Where we work · How to help), transposées pour APSUD.
 * Les pages cibles seront créées une par une (voir INSTRUCTIONS.md §9).
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}

export const mainNav: NavGroup[] = [
  {
    label: "L'ONG",
    href: '/qui-sommes-nous',
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
    links: [
      { label: 'Eau, hygiène et assainissement', href: '/nos-actions/eau-hygiene-assainissement' },
      { label: 'Sécurité alimentaire', href: '/nos-actions/securite-alimentaire' },
      { label: 'Protection et genre', href: '/nos-actions/protection' },
      { label: 'Société civile locale', href: '/nos-actions/societe-civile' },
      { label: 'Tous les projets', href: '/projets' },
    ],
  },
  {
    label: 'Nos zones',
    href: '/nos-zones',
    links: [
      { label: 'Bangui', href: '/nos-zones#bangui' },
      { label: 'Ombella-M’Poko', href: '/nos-zones#ombella-mpoko' },
      { label: 'Ouaka', href: '/nos-zones#ouaka' },
      { label: 'Haute-Kotto', href: '/nos-zones#haute-kotto' },
      { label: 'Carte des interventions', href: '/nos-zones' },
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
