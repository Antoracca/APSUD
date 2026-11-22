/**
 * Données des pages « Nos actions » (hub + 4 domaines), toutes calculées depuis
 * src/data/projects.ts, src/data/domains.ts et data/apsud/organisation.json.
 * Aucun chiffre saisi à la main : si un projet change, les pages suivent.
 */
import organisation from '../../../data/apsud/organisation.json';
import { getProjects, byDomain, type DomaineSlug, type Projet, type ProjetImage } from '../../data/projects';
import { domains, type Domaine } from '../../data/domains';

const uniq = <T,>(a: T[]) => [...new Set(a)];

/** Image d'un projet réel (alt + légende de sa fiche). */
export function projectPhoto(fichier: string): ProjetImage {
  const img = getProjects().flatMap((p) => p.images).find((i) => i.src.endsWith(fichier));
  if (!img) throw new Error(`[actions] image introuvable : ${fichier}`);
  return img;
}

/** Légende d'une photo : celle de la fiche, sinon sa description (alt). */
export const captionOf = (img: ProjetImage) => img.legende ?? img.alt;

export interface DomainStats {
  projets: number;
  enCours: number;
  prefectures: { slug: string; nom: string }[];
  periode: string | null;
  bailleurs: string[];
}

export function domainStats(slug: DomaineSlug): DomainStats {
  const list = byDomain(slug);
  const debuts = list.map((p) => p.anneeDebut).filter((a): a is number => !!a);
  const fins = list.map((p) => p.anneeFin ?? p.anneeDebut).filter((a): a is number => !!a);
  const min = debuts.length ? Math.min(...debuts) : null;
  const max = fins.length ? Math.max(...fins) : null;
  const prefs = new Map<string, string>();
  list.flatMap((p) => p.prefectures).forEach((x) => prefs.set(x.slug, x.nom));
  return {
    projets: list.length,
    enCours: list.filter((p) => p.statut === 'en_cours').length,
    prefectures: [...prefs].map(([slug, nom]) => ({ slug, nom })).sort((a, b) => a.nom.localeCompare(b.nom, 'fr')),
    periode: min && max ? (min === max ? String(min) : `${min}–${max}`) : null,
    bailleurs: uniq(list.flatMap((p) => p.bailleurs)).sort((a, b) => a.localeCompare(b, 'fr')),
  };
}

/** Méta d'une carte projet : bailleurs · période */
export const projectMeta = (p: Projet) => [p.bailleurs.slice(0, 2).join(' · '), p.annees].filter(Boolean).join(' · ');

/**
 * Objectif spécifique d'APSUD rattaché à chaque domaine (ancien site 2018-2021,
 * organisation.json › objectifs_specifiques : à faire valider par APSUD).
 */
const os = organisation.objectifs_specifiques.valeurs;
const objectifByDomain: Partial<Record<DomaineSlug, string>> = {
  'eau-hygiene-assainissement': os.find((v) => v.includes('eau'))!,
  'securite-alimentaire': os.find((v) => v.includes('économique'))!,
  protection: os.find((v) => v.includes('psychosociale'))!,
};
export const domainObjective = (slug: DomaineSlug) => objectifByDomain[slug] ?? null;

/** Libellé du statut d'un domaine (le 4e axe n'est pas dans la liste officielle). */
export const domainKind = (d: Domaine) => (d.officiel ? 'Domaine d’intervention' : 'Axe de travail');

/** Textes du hub, repris tels quels d'organisation.json. */
export const hub = {
  objectif: organisation.objectif,
  mission: organisation.mission,
  environnement: organisation.objectifs_specifiques.valeurs.find((v) => v.includes('environnement')) ?? null,
};

export { domains };

/** Photo d'en-tête du hub (projet FH 15898, Bambari · Batangafo · Bimbo, 2020). */
export const hubPhoto = projectPhoto('projet-covid19-bambari-batangafo-latrines-urgence-visite-01.jpg');

/** Bilan global, calculé : nombre de projets documentés et première année. */
const all = getProjects();
export const hubTotals = {
  projets: all.length,
  depuis: Math.min(...all.map((p) => p.anneeDebut).filter((a): a is number => !!a)),
};

/** Ordre de lecture d'un domaine : projets avec photo d'abord (cartes), puis les autres (tuiles). */
export function domainProjects(slug: DomaineSlug) {
  const list = byDomain(slug);
  return {
    withImage: list.filter((p) => p.images.length > 0),
    withoutImage: list.filter((p) => p.images.length === 0),
    enCours: list.filter((p) => p.statut === 'en_cours').length,
    realises: list.filter((p) => p.statut === 'realise').length,
  };
}

/** Les autres domaines (navigation en bas de page domaine). */
export const siblingsOf = (slug: DomaineSlug) => domains.filter((d) => d.slug !== slug);
