/**
 * Les 4 domaines d'action d'APSUD (pages /nos-actions/<slug>, filtres de /projets).
 * Textes tirés de `data/apsud/organisation.json` (domaines_intervention), jamais réécrits ici.
 * Les 3 domaines officiels + l'axe « société civile et localisation », observé dans les projets
 * récents (15, 18, 19) et signalé comme « à proposer à APSUD » dans la source : `officiel: false`.
 * Les images sont des photos de projets réels ; alt et légende viennent de la fiche projet.
 */
import organisation from '../../data/apsud/organisation.json';
import { byDomain, getProjects, type DomaineSlug, type ProjetImage } from './projects';

export interface Domaine {
  slug: DomaineSlug;
  /** Titre court (menus, filtres, cartes) */
  titre: string;
  /** Intitulé officiel (organisation.json) */
  intitule: string;
  /** Phrase d'introduction (organisation.json, détail du domaine) */
  intro: string;
  /** Nom du pictogramme dans src/icons */
  icone: string;
  href: string;
  officiel: boolean;
  image: ProjetImage;
  /** Nombre de projets rattachés (calculé) */
  projets: number;
}

const di = organisation.domaines_intervention;
const find = (cle: string) => di.domaines.find((d) => d.cle === cle)!;

/** Image d'un projet réel, avec l'alt et la légende de sa fiche. */
function photo(fichier: string): ProjetImage {
  const img = getProjects().flatMap((p) => p.images).find((i) => i.src.endsWith(fichier));
  if (!img) throw new Error(`[domains] image introuvable : ${fichier}`);
  return img;
}

const wash = find('wash');
const secal = find('securite-alimentaire');
const prot = find('protection');

const base = [
  {
    slug: 'eau-hygiene-assainissement' as const,
    titre: 'Eau, hygiène et assainissement',
    intitule: wash.titre,
    intro: `${wash.detail}.`,
    icone: 'eau',
    officiel: true,
    image: photo('projet-boguila-point-eau-rehabilite-02.jpg'),
  },
  {
    slug: 'securite-alimentaire' as const,
    titre: 'Sécurité alimentaire',
    intitule: secal.titre,
    intro: `${secal.titre}.`,
    icone: 'agriculture',
    officiel: true,
    image: photo('projet-maloum-distribution-kits-agr-01.jpg'),
  },
  {
    slug: 'protection' as const,
    titre: 'Protection',
    intitule: prot.titre,
    intro: `${prot.detail!.charAt(0).toUpperCase()}${prot.detail!.slice(1)}.`,
    icone: 'protection',
    officiel: true,
    image: photo('projet-parsoc-lancement-regional-bambari-02.jpg'),
  },
  {
    slug: 'societe-civile' as const,
    titre: 'Société civile et localisation',
    intitule: di.axe_observe_dans_projets.titre,
    intro: `${di.axe_observe_dans_projets.titre}.`,
    icone: 'societe-civile',
    officiel: false,
    image: photo('projet-rafai-formation-ong-partenaires-01.jpg'),
  },
];

export const domains: Domaine[] = base.map((d) => ({
  ...d,
  href: `/nos-actions/${d.slug}`,
  projets: byDomain(d.slug).length,
}));

export const getDomain = (slug: string) => domains.find((d) => d.slug === slug);

/** Domaine transversal (organisation.json) : affiché en mention, pas en page. */
export const transversal = {
  titre: di.transversal.titre,
  texte: di.transversal.texte_source,
  icone: 'environnement',
};
