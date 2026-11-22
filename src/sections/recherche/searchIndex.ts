/**
 * Index de recherche du site (pages /recherche et 404) : toutes les pages + les 4 domaines
 * + tous les projets. Calculé à la génération à partir des données (navigation, domaines, projets) :
 * aucune page n'est décrite à la main hors de cette liste.
 * Le filtrage se fait dans le navigateur (src/sections/recherche/SearchResults.astro).
 */
import { domains } from '../../data/domains';
import { getProjects } from '../../data/projects';
import { site } from '../../data/site';

export type SearchGroup = 'pages' | 'domaines' | 'projets';

export interface SearchEntry {
  titre: string;
  href: string;
  description: string;
  groupe: SearchGroup;
  /** Mots supplémentaires trouvables mais non affichés (lieux, bailleurs, sigles) */
  motsCles?: string;
  /** Petite étiquette (« En cours », « Réalisé ») */
  badge?: string;
}

export const searchGroups: Record<SearchGroup, string> = {
  pages: 'Pages',
  domaines: 'Domaines d’action',
  projets: 'Projets',
};

const pages: SearchEntry[] = [
  { titre: 'Accueil', href: '/', description: site.mission },
  { titre: 'Qui sommes-nous', href: '/qui-sommes-nous', description: 'Mission, vision, valeurs, gouvernance et histoire d’APSUD.', motsCles: 'ong association identite valeurs vision' },
  { titre: 'Gouvernance et équipe', href: '/qui-sommes-nous/equipe', description: 'Les instances et l’équipe d’APSUD.', motsCles: 'conseil administration bureau executif assemblee generale' },
  { titre: 'Rapports et transparence', href: '/qui-sommes-nous/rapports', description: 'Rapports d’activité et documents de transparence.', motsCles: 'rapport annuel finances comptes' },
  { titre: 'Nos actions', href: '/nos-actions', description: 'Les domaines dans lesquels APSUD intervient.', motsCles: 'domaines programmes' },
  { titre: 'Tous les projets', href: '/projets', description: 'Les projets réalisés et en cours, filtrables par domaine, préfecture et bailleur.' },
  { titre: 'Nos zones', href: '/nos-zones', description: 'La carte des interventions d’APSUD en République centrafricaine.', motsCles: 'carte prefectures bangui ombella-mpoko ouaka haute-kotto' },
  { titre: 'Partenaires et bailleurs', href: '/partenaires', description: 'Les partenaires techniques et financiers d’APSUD.', motsCles: 'bailleurs financeurs logos' },
  { titre: 'Agir avec nous', href: '/agir', description: 'Toutes les façons de soutenir l’action d’APSUD.' },
  { titre: 'Faire un don', href: '/faire-un-don', description: 'Soutenir les actions d’APSUD.', motsCles: 'donner don soutien' },
  { titre: 'Devenir partenaire', href: '/agir/partenariat', description: 'Construire un partenariat avec APSUD.' },
  { titre: 'Carrières', href: '/carrieres', description: 'Travailler chez APSUD : valeurs et offres d’emploi.', motsCles: 'emploi recrutement poste stage consultance offres' },
  { titre: 'Appels d’offres', href: '/agir/appels-d-offres', description: 'Travaux, fournitures, services et consultances.', motsCles: 'marche fournisseurs prestataires dao' },
  { titre: 'Contact', href: '/contact', description: `${site.contact.adresse}, ${site.contact.pays}.`, motsCles: 'adresse telephone courriel email ecrire' },
  { titre: 'Mentions légales', href: '/mentions-legales', description: 'Éditeur, hébergement, propriété intellectuelle.' },
  { titre: 'Politique de confidentialité', href: '/confidentialite', description: 'Vos données personnelles et vos droits.', motsCles: 'rgpd donnees personnelles vie privee' },
  { titre: 'Politique cookies', href: '/cookies', description: 'Les cookies utilisés et vos choix.', motsCles: 'traceurs consentement' },
].map((p) => ({ ...p, groupe: 'pages' as const }));

const domaines: SearchEntry[] = domains.map((d) => ({
  titre: d.titre,
  href: d.href,
  description: d.intro,
  groupe: 'domaines' as const,
  motsCles: d.intitule,
}));

const projets: SearchEntry[] = getProjects().map((p) => ({
  titre: p.titreCourt,
  href: `/projets/${p.slug}`,
  description: [p.annees, p.prefectures.map((x) => x.nom).join(', ')].filter(Boolean).join(' · '),
  groupe: 'projets' as const,
  badge: p.statutLibelle,
  motsCles: [p.titre, p.sigle, p.code, ...p.lieux, ...p.bailleurs, ...p.partenaires].filter(Boolean).join(' '),
}));

export const searchIndex: SearchEntry[] = [...pages, ...domaines, ...projets];
