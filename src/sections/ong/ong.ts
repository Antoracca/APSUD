/**
 * Contenu de /qui-sommes-nous et de ses sous-pages.
 * Tout vient de `data/apsud/organisation.json` (texte de l'ancien site apsud.org) ;
 * les rares phrases de liaison ne contiennent aucun fait nouveau.
 * Plus tard : singleton « Qui sommes-nous » du back-office.
 */
import organisation from '../../../data/apsud/organisation.json';
import { manifesto } from '../../data/home';

const id = organisation.identite;

export type ImagePath = `assets/${string}`;

/* -------------------------------------------------------------------------- */
/* En-tête                                                                      */
/* -------------------------------------------------------------------------- */
export const header = {
  title: 'Qui sommes-nous',
  image: 'assets/apsud/images/a-propos/equipe-staff-apsud-devant-siege.jpg' as ImagePath,
  imageAlt: 'Une quarantaine de membres du staff d’APSUD, masqués, en polos orange, blancs, gris et verts, posent devant le portail bleu et le panneau du siège de l’ONG',
  caption: 'Le staff d’APSUD réuni devant le panneau du siège de l’ONG, à Bimbo.',
};

/* -------------------------------------------------------------------------- */
/* Présentation (texte officiel, découpé en trois paragraphes)                  */
/* -------------------------------------------------------------------------- */
export const intro = {
  lead: `${id.nom_complet} (${id.sigle}) est une organisation non gouvernementale nationale de développement et d’action humanitaire, en République centrafricaine.`,
  paragraphs: [
    `À but non lucratif, elle est ${id.independance.charAt(0).toLowerCase()}${id.independance.slice(1)}`,
    'Son siège est installé dans le quartier Micheline, à Bimbo, aux portes de Bangui. Depuis son premier projet, en novembre 2015, ses équipes centrafricaines interviennent auprès des communautés, de la capitale jusqu’aux préfectures de l’Est.',
  ],
};

/* -------------------------------------------------------------------------- */
/* Mission, vision, objectif                                                    */
/* -------------------------------------------------------------------------- */
export const purpose = {
  title: 'Ce qui nous guide',
  mission: organisation.mission,
  items: [
    { label: 'Notre vision', text: `${organisation.vision}.` },
    { label: 'Notre objectif', text: `${organisation.objectif}.` },
  ],
};

/* -------------------------------------------------------------------------- */
/* Valeurs : nom, mots-clés (1ʳᵉ phrase du texte source), puis le reste         */
/* -------------------------------------------------------------------------- */
export const values = {
  title: 'Nos valeurs',
  /** Pictogramme maison (src/sections/ong/icons/<nom>.svg), dans l'ordre de organisation.json */
  icons: ['respect', 'solidarite', 'responsabilite', 'coherence', 'innovation', 'partage'],
  intro: 'Six valeurs orientent les décisions et les actions d’APSUD, à tous les niveaux de l’organisation.',
  items: organisation.valeurs.map((v) => {
    const [keywords, ...rest] = v.texte.split(/(?<=\.)\s+/);
    return { name: v.nom, keywords: keywords.replace(/\.$/, ''), text: rest.join(' ') };
  }),
};

/* -------------------------------------------------------------------------- */
/* Gouvernance : instances citées dans la valeur « Cohérence »                  */
/* -------------------------------------------------------------------------- */
export const governance = {
  title: 'Notre gouvernance',
  intro:
    'Un lien logique et une cohésion sont établis entre les orientations, les décisions et les actions à tous les niveaux de l’organisation.',
  source: 'Extrait de la valeur « Cohérence » d’APSUD',
  levels: id.gouvernance_citee.map((nom) => nom.replace('Exécutif', 'exécutif').replace('Générale', 'générale')),
  link: { label: 'Gouvernance et équipe', href: '/qui-sommes-nous/equipe' },
};

/* -------------------------------------------------------------------------- */
/* Domaines d'intervention (cartes : src/data/domains.ts)                       */
/* -------------------------------------------------------------------------- */
export const domainsBlock = {
  title: 'Nos domaines d’intervention',
  intro: 'De l’urgence au développement, nos projets s’organisent autour de quatre domaines d’action.',
  link: { label: 'Voir tous les projets', href: '/projets' },
};

/* -------------------------------------------------------------------------- */
/* Sous-pages en attente de contenus (états vides honnêtes)                     */
/* -------------------------------------------------------------------------- */
export const teamPage = {
  title: 'Gouvernance et équipe',
  description: 'Les instances de gouvernance d’APSUD, de l’Assemblée générale jusqu’au terrain. La composition de l’équipe sera publiée prochainement.',
  intro: 'Les orientations, les décisions et les actions d’APSUD sont reliées à tous les niveaux de l’organisation.',
  empty: {
    title: 'La composition de l’équipe sera bientôt publiée',
    text: 'Les noms et les fonctions des membres de la coordination d’APSUD sont en cours de validation avec l’ONG. Pour toute question, écrivez-nous.',
    icon: 'societe-civile',
  },
  related: [
    { label: 'Offres d’emploi', href: '/carrieres' },
    { label: 'Nos valeurs', href: '/qui-sommes-nous#valeurs' },
    { label: 'Rapports et transparence', href: '/qui-sommes-nous/rapports' },
  ],
};

const responsabilite = organisation.valeurs.find((v) => v.nom === 'Responsabilité')!;
export const reportsPage = {
  title: 'Rapports et transparence',
  description: 'Rapports d’activité et documents de transparence d’APSUD : publication en préparation.',
  intro: 'La responsabilité est l’une des six valeurs d’APSUD : rendre compte de nos actions et de nos décisions.',
  quote: {
    text: responsabilite.texte.split(/(?<=\.)\s+/).slice(1).join(' '),
    source: 'Valeur « Responsabilité » d’APSUD',
  },
  empty: {
    title: 'Nos rapports seront bientôt en ligne',
    text: 'Les rapports d’activité et les documents de transparence d’APSUD sont en cours de préparation. En attendant, vous pouvez en faire la demande à notre équipe.',
    icon: 'download',
  },
  related: [
    { label: 'Tous nos projets', href: '/projets' },
    { label: 'Partenaires et bailleurs', href: '/partenaires' },
    { label: 'Gouvernance et équipe', href: '/qui-sommes-nous/equipe' },
  ],
};

/* -------------------------------------------------------------------------- */
/* Éthique et protection (lien du footer) — en attente des politiques d'APSUD   */
/* -------------------------------------------------------------------------- */
const respect = organisation.valeurs.find((v) => v.nom === 'Respect')!;

export const ethicsPage = {
  title: 'Éthique et protection',
  description: 'Politiques d’éthique, de protection des personnes et de signalement d’APSUD : publication en préparation.',
  intro: 'Le respect des personnes que nous accompagnons guide chacune de nos interventions.',
  quote: {
    text: respect.texte.split(/(?<=\.)\s+/).slice(1).join(' '),
    source: 'Valeur « Respect » d’APSUD',
  },
  empty: {
    title: 'Nos politiques seront bientôt en ligne',
    text: 'Le code de conduite, la politique de protection contre l’exploitation et les abus sexuels et la procédure de signalement d’APSUD sont en cours de publication. Pour toute question ou tout signalement, contactez directement notre équipe.',
    icon: 'protection',
  },
  related: [
    { label: 'Nos valeurs', href: '/qui-sommes-nous#valeurs' },
    { label: 'Rapports et transparence', href: '/qui-sommes-nous/rapports' },
    { label: 'Nous contacter', href: '/contact' },
  ],
};

/* -------------------------------------------------------------------------- */
/* Chiffres clés (mêmes chiffres que l'accueil : ⚠ à valider par APSUD)         */
/* -------------------------------------------------------------------------- */
export const figures = {
  statement: 'Depuis 2015, nos équipes répondent à l’urgence et accompagnent le développement local, aux côtés des communautés centrafricaines.',
  stats: manifesto.stats,
};

/* -------------------------------------------------------------------------- */
/* Zigzag                                                                       */
/* -------------------------------------------------------------------------- */
export const zigzag = {
  title: 'Une ONG nationale, enracinée',
  rows: [
    {
      image: 'assets/apsud/images/hero/hero-siege-apsud-facade.png' as ImagePath,
      imageAlt: 'Façade du siège de l’ONG nationale APSUD : bâtiment de quatre étages jaune et vert, véhicules de l’organisation garés devant',
      title: 'Un siège à Bimbo',
      text: 'Notre siège du quartier Micheline, à Bimbo, coordonne les équipes et les antennes qui travaillent au plus près des communautés.',
      link: { label: 'Nous contacter', href: '/contact' },
      focus: '50% 50%',
    },
    {
      image: 'assets/apsud/images/hero/hero-formation-responsables-ong-partenaires.jpg' as ImagePath,
      imageAlt: 'Formation des responsables des ONG partenaires dans la salle de réunion d’APSUD',
      title: 'Partager le savoir',
      text: 'Nous formons les responsables d’ONG partenaires dans nos locaux, pour que les organisations centrafricaines portent elles-mêmes la réponse.',
      link: { label: 'Société civile et localisation', href: '/nos-actions/societe-civile' },
      focus: '50% 50%',
    },
    {
      image: 'assets/apsud/images/archives/archive-2020-covid-bangui-bambari-formation-salle.jpg' as ImagePath,
      imageAlt: 'Une session de formation en salle organisée par APSUD pendant la riposte au COVID-19',
      title: 'Rendre des comptes',
      text: 'Imputabilité, leadership, transparence : la responsabilité est l’une de nos valeurs. Nos rapports seront publiés ici.',
      link: { label: 'Rapports et transparence', href: '/qui-sommes-nous/rapports' },
      focus: '50% 50%',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Double CTA                                                                   */
/* -------------------------------------------------------------------------- */
export const cta = {
  primary: {
    title: 'Soutenir nos actions',
    text: 'Votre don aide nos équipes à rester aux côtés des communautés, de l’urgence au développement.',
    cta: { label: 'Faire un don', href: '/faire-un-don' },
  },
  secondary: {
    title: 'Agir avec nous',
    text: 'Bailleurs, agences, ONG : construisons ensemble des réponses durables en Centrafrique.',
    cta: { label: 'Devenir partenaire', href: '/agir/partenariat' },
  },
};
