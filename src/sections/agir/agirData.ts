/**
 * Contenus des pages « Agir avec nous » (/agir, /faire-un-don, /agir/partenariat, /contact).
 * Règle : rien n'est inventé. Les faits viennent de `data/apsud/*.json` via les adaptateurs
 * (projects.ts, zones.ts, partners.ts) ; les chiffres sont calculés, jamais saisis.
 * Ce qui manque encore (modalités de don, offres d'emploi, appels d'offres) est annoncé
 * comme tel et renvoie vers le contact. Demain : contenus éditables dans le back-office.
 */
import { getProject, getProjects } from '../../data/projects';
import { partners } from '../../data/partners';
import { zonesSummary } from '../../data/zones';

/** Photo d'un projet réel, avec l'alt et la légende de sa fiche. */
export function projectPhoto(fichier: string) {
  const img = getProjects().flatMap((p) => p.images).find((i) => i.src.endsWith(fichier));
  if (!img) throw new Error(`[agir] image introuvable : ${fichier}`);
  return img;
}

/* ------------------------------------------------------------------ */
/* Chiffres calculés (aucune saisie manuelle)                          */
/* ------------------------------------------------------------------ */
const projets = getProjects();
const bailleurs = partners.filter((p) => p.category === 'bailleur');

export const facts = {
  projets: projets.length,
  enCours: projets.filter((p) => p.statut === 'en_cours').length,
  prefectures: zonesSummary.prefectures,
  bangui: zonesSummary.bangui,
  depuis: zonesSummary.depuis,
  bailleurs: bailleurs.length,
  partenaires: partners.length,
};

/* ------------------------------------------------------------------ */
/* /agir — les façons d'agir (boîtes 3 colonnes, Prosper « How to help ») */
/* ------------------------------------------------------------------ */
export interface Way {
  icon: string;
  title: string;
  text: string;
  link: { label: string; href: string };
  /** Rubrique pas encore alimentée par APSUD : signalée sobrement */
  pending?: string;
}

export const ways: Way[] = [
  {
    icon: 'don',
    title: 'Faire un don',
    text: 'Soutenir directement les équipes d’APSUD sur le terrain. Les coordonnées Mobile Money et bancaires vous sont communiquées par APSUD, sur demande.',
    link: { label: 'Faire un don', href: '/faire-un-don' },
  },
  {
    icon: 'partenariat',
    title: 'Devenir partenaire',
    text: 'Bailleurs, agences des Nations unies et ONG internationales : confiez la mise en œuvre de vos programmes à une ONG nationale implantée en Centrafrique.',
    link: { label: 'Collaborer avec APSUD', href: '/agir/partenariat' },
  },
  {
    icon: 'societe-civile',
    title: 'Travailler avec nous',
    text: 'Rejoindre les équipes d’APSUD à Bangui ou dans les préfectures, au plus près des communautés.',
    link: { label: 'Voir les offres d’emploi', href: '/carrieres' },
  },
  {
    icon: 'calendar',
    title: 'Répondre à un appel d’offres',
    text: 'Fournisseurs et prestataires, centrafricains en priorité : consultez les marchés publiés par APSUD pour ses projets.',
    link: { label: 'Voir les appels d’offres', href: '/agir/appels-d-offres' },
  },
  {
    icon: 'environnement',
    title: 'Proposer un don en nature',
    text: 'Matériel, équipements, savoir-faire : présentez votre proposition à l’équipe, qui vous dira comment elle peut servir les projets en cours.',
    link: { label: 'Écrire à APSUD', href: '/contact?objet=don' },
  },
  {
    icon: 'mail',
    title: 'Nous écrire',
    text: 'Une question, une idée, une demande de la presse ou d’un partenaire : l’équipe d’APSUD vous répond.',
    link: { label: 'Nous contacter', href: '/contact' },
  },
];

/* ------------------------------------------------------------------ */
/* /faire-un-don — ce que permet un don (activités RÉELLES des projets) */
/* ------------------------------------------------------------------ */
export interface Impact {
  icon: string;
  title: string;
  /** Fait tiré de la fiche projet (activité ou résultat publié) */
  fact: string;
  place: string;
  href: string;
}

const lien = (slug: string) => {
  const p = getProject(slug);
  if (!p) throw new Error(`[agir] projet introuvable : ${slug}`);
  return `/projets/${p.slug}`;
};

export const impacts: Impact[] = [
  {
    icon: 'eau',
    title: 'Rendre l’eau potable accessible',
    fact: 'Six points d’eau réhabilités, des comités de gestion mis en place et des artisans réparateurs formés et équipés.',
    place: 'Boguila, 2021–2022',
    href: lien('urgence-wash-boguila'),
  },
  {
    icon: 'protection',
    title: 'Construire des latrines dignes',
    fact: 'Appui à la construction de 500 latrines familiales avec les matériaux locaux et la participation des habitants.',
    place: 'Boguila, 2021–2022',
    href: lien('urgence-wash-boguila'),
  },
  {
    icon: 'urgence',
    title: 'Protéger les familles déplacées',
    fact: 'Kits d’hygiène distribués à 1 000 ménages, avec des articles d’hygiène intime pour les femmes et les filles.',
    place: 'Bambari, Batangafo et Bimbo, 2020',
    href: lien('wash-covid19-bambari-batangafo-bimbo'),
  },
  {
    icon: 'agriculture',
    title: 'Redonner un revenu aux jeunes',
    fact: 'Emplois temporaires pour 700 jeunes à risque, kits d’activités génératrices de revenus et associations villageoises d’épargne et de crédit.',
    place: 'Bambari et Ippy, 2019',
    href: lien('moyens-subsistance-cohesion-bambari-ippy'),
  },
  {
    icon: 'societe-civile',
    title: 'Faire grandir les ONG de femmes',
    fact: 'Six ONG nationales dirigées par des femmes évaluées, formées et accueillies en stage au bureau d’APSUD.',
    place: 'Ouham, 2025–2026',
    href: lien('autonomisation-ong-femmes-leadership'),
  },
];

/* Montants purement indicatifs : aucun paiement n'est effectué sur le site. */
export const donationAmounts = {
  XAF: { label: 'FCFA', code: 'XAF', values: [5000, 10000, 25000, 50000], default: 10000 },
  EUR: { label: 'EUR', code: 'EUR', values: [10, 25, 50, 100], default: 25 },
} as const;

export const donationFaq = [
  {
    q: 'Pourquoi les coordonnées de paiement ne sont-elles pas affichées ?',
    a: 'Pour éviter toute erreur de numéro ou tentative de fraude, APSUD communique ses coordonnées Mobile Money et bancaires directement aux donateurs qui en font la demande.',
  },
  {
    q: 'Le montant choisi ici est-il prélevé ?',
    a: 'Non. Les montants proposés sont indicatifs : ils servent seulement à préparer votre message. Aucun paiement n’est effectué sur ce site.',
  },
  {
    q: 'Puis-je donner depuis l’étranger ou faire un don en nature ?',
    a: 'Écrivez à l’équipe en précisant votre pays ou la nature de votre don : elle vous indiquera la marche à suivre.',
  },
];

/* ------------------------------------------------------------------ */
/* /agir/partenariat — pourquoi APSUD (faits vérifiables)              */
/* ------------------------------------------------------------------ */
export const reasons = [
  {
    icon: 'localisation-rca',
    title: 'Une ONG nationale, indépendante',
    text: 'APSUD est une organisation non gouvernementale centrafricaine de développement et d’action humanitaire, à but non lucratif, indépendante de toute entreprise, collectivité, organisation politique ou religieuse.',
  },
  {
    icon: 'map-pin',
    title: 'Présente là où sont les besoins',
    text: `Des projets menés dans ${facts.prefectures} préfectures${facts.bangui ? ' et à Bangui' : ''}, des quartiers de la capitale à la Ouaka, à l’Ouham et au Mbomou, souvent auprès de familles déplacées.`,
  },
  {
    icon: 'partenariat',
    title: 'Habituée aux exigences des bailleurs',
    text: 'Fonds humanitaire pour la RCA, Union européenne, BMZ, Japon : des financements institutionnels gérés selon leurs procédures, du ciblage au rapport final.',
  },
  {
    icon: 'societe-civile',
    title: 'Un relais pour la localisation de l’aide',
    text: 'Trois ONG nationales accompagnées à Rafaï, six ONG de femmes dans l’Ouham, 200 organisations de la société civile ciblées dans six préfectures avec PARSOC.',
  },
];

export const modalities = [
  {
    title: 'Mise en œuvre de programmes',
    text: 'APSUD conduit des projets financés par des bailleurs institutionnels, de l’identification des bénéficiaires au suivi des résultats.',
  },
  {
    title: 'Consortium avec une ONG internationale',
    text: 'Exemple : PARSOC, financé par l’Union européenne et mis en œuvre avec Welthungerhilfe pour renforcer 200 organisations de la société civile.',
  },
  {
    title: 'Renforcement d’organisations locales',
    text: 'Évaluation des capacités, plans de renforcement, manuels de procédures, formations et coaching en stage au bureau d’APSUD.',
  },
];

/* ------------------------------------------------------------------ */
/* /contact — objets du formulaire (pré-remplis par ?objet=…)          */
/* ------------------------------------------------------------------ */
export const contactSubjects = [
  { value: 'information', label: 'Information générale' },
  { value: 'don', label: 'Faire un don' },
  { value: 'partenariat', label: 'Partenariat ou financement' },
  { value: 'recrutement', label: 'Recrutement' },
  { value: 'appels-offres', label: 'Appels d’offres' },
  { value: 'presse', label: 'Presse et médias' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export const contactRoutes = [
  { label: 'Faire un don', text: 'Demander les coordonnées Mobile Money ou bancaires', href: '/faire-un-don' },
  { label: 'Devenir partenaire', text: 'Bailleurs, agences des Nations unies, ONG', href: '/agir/partenariat' },
  { label: 'Offres d’emploi', text: 'Rejoindre les équipes d’APSUD', href: '/carrieres' },
  { label: 'Appels d’offres', text: 'Fournisseurs et prestataires', href: '/agir/appels-d-offres' },
];
