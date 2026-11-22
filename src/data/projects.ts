/**
 * Adaptateur unique des projets : `data/apsud/projets.json` → type `Projet` propre,
 * utilisé par toutes les pages (liste /projets, fiche /projets/[slug], domaines, zones).
 * Demain : remplacé par l'API du back-office, sans toucher aux pages.
 *
 * Normalisations :
 *  - préfectures : réutilise `normalizePrefecture` de zones.ts (accents, parenthèses,
 *    lieux doubles, variantes) et le nom officiel du fond de carte ;
 *  - domaines : les 7 libellés libres des fiches → 4 slugs stables (voir DOMAIN_MAP) ;
 *  - images : seuls les chemins réellement présents dans `assets/` sont gardés (hasImage).
 * Aucune donnée n'est inventée : un champ absent reste vide (tableau vide ou null).
 */
import projetsData from '../../data/apsud/projets.json';
import { hasImage } from '../lib/images';
import { normalizePrefecture, zones } from './zones';

export type ProjetStatut = 'en_cours' | 'realise';
export type DomaineSlug =
  | 'eau-hygiene-assainissement'
  | 'securite-alimentaire'
  | 'protection'
  | 'societe-civile';

export interface ProjetImage {
  src: string;
  alt: string;
  legende: string | null;
}

export interface ProjetPrefecture {
  slug: string;
  nom: string;
}

export interface Projet {
  id: number;
  slug: string;
  titre: string;
  titreCourt: string;
  sigle: string | null;
  code: string | null;
  statut: ProjetStatut;
  statutLibelle: string;
  dateDebut: string | null;
  dateFin: string | null;
  anneeDebut: number | null;
  anneeFin: number | null;
  /** « 2025–2026 » ou « 2021 » */
  annees: string;
  /** Lieux tels que saisis (localités), sans les mentions entre parenthèses */
  lieux: string[];
  prefectures: ProjetPrefecture[];
  domaines: DomaineSlug[];
  bailleurs: string[];
  partenaires: string[];
  budget: {
    montant: number;
    /** « 430 000 USD » : devise telle qu'affichée par la source */
    texte: string;
    /** Note de contrôle qualité quand la devise est douteuse (ex. « £ » probablement « € ») */
    aVerifier: string | null;
  } | null;
  beneficiaires: string[];
  resume: string;
  objectifGeneral: string | null;
  description: string | null;
  objectifs: string[];
  activites: string[];
  resultats: string[];
  resultatsNature: string | null;
  images: ProjetImage[];
  urlSource: string | null;
}

/** Libellés des fiches → domaine normalisé */
const DOMAIN_MAP: Record<string, DomaineSlug> = {
  'wash': 'eau-hygiene-assainissement',
  'securite alimentaire et moyens de subsistance': 'securite-alimentaire',
  'securite alimentaire, moyens de subsistance et stabilisation communautaire': 'securite-alimentaire',
  'protection/genre': 'protection',
  'protection (droits humains, cohesion sociale, genre)': 'protection',
  'renforcement de capacites / localisation': 'societe-civile',
  'renforcement de la societe civile': 'societe-civile',
};

const key = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function normalizeDomain(raw: string, slug: string): DomaineSlug | null {
  const d = DOMAIN_MAP[key(raw)];
  if (!d) console.warn(`[projects] domaine inconnu « ${raw} » (projet ${slug})`);
  return d ?? null;
}

const prefNames = new Map(zones.map((z) => [z.slug, z.nom]));
const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const clean = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();
const uniq = <T,>(a: T[]) => [...new Set(a)];

export const formatAnnees = (a?: number | null, b?: number | null) =>
  a && b && a !== b ? `${a}–${b}` : String(a ?? b ?? '');

type Raw = (typeof projetsData.projets)[number];

function adapt(p: Raw): Projet {
  const prefSlugs = uniq(p.lieux.flatMap((l) => normalizePrefecture(l.prefecture)));
  const b = p.budget as Raw['budget'] | null;
  const devise = b?.devise_affichee ?? '';
  return {
    id: p.id_source,
    slug: p.slug,
    titre: p.titre,
    titreCourt: p.titre_court ?? p.titre,
    sigle: p.sigle ?? null,
    code: p.code_projet ?? null,
    statut: p.statut as ProjetStatut,
    statutLibelle: p.statut === 'en_cours' ? 'En cours' : 'Réalisé',
    dateDebut: p.date_debut ?? null,
    dateFin: p.date_fin ?? null,
    anneeDebut: p.annee_debut ?? null,
    anneeFin: p.annee_fin ?? null,
    annees: formatAnnees(p.annee_debut, p.annee_fin),
    lieux: uniq(p.lieux.map((l) => l.lieu).filter((l): l is string => !!l).map(clean).filter(Boolean)),
    prefectures: prefSlugs
      .filter((s) => prefNames.has(s))
      .map((s) => ({ slug: s, nom: prefNames.get(s)! })),
    domaines: uniq(
      (p.domaines ?? []).map((d) => normalizeDomain(d, p.slug)).filter((d): d is DomaineSlug => !!d),
    ),
    bailleurs: p.bailleurs ?? [],
    partenaires: p.partenaires_mise_en_oeuvre ?? [],
    budget:
      b && typeof b.montant === 'number'
        ? {
            montant: b.montant,
            texte: `${nf.format(b.montant)} ${devise}`.trim(),
            aVerifier: b.devise_probable && b.devise_probable !== devise ? (b.note ?? null) : null,
          }
        : null,
    beneficiaires: p.beneficiaires ?? [],
    resume: p.resume ?? '',
    objectifGeneral: p.objectif_general ?? null,
    description: p.description_complete ?? null,
    objectifs: p.objectifs ?? [],
    activites: p.activites ?? [],
    resultats: p.resultats ?? [],
    resultatsNature: p.resultats_nature ?? null,
    images: (p.images ?? [])
      .filter((i) => hasImage(i.chemin))
      .map((i) => ({ src: i.chemin, alt: i.alt, legende: i.legende ?? null })),
    urlSource: p.url_source ?? null,
  };
}

/** En cours d'abord, puis du plus récent au plus ancien. */
const projets: Projet[] = projetsData.projets.map(adapt).sort((a, b) =>
  a.statut === b.statut ? (b.anneeDebut ?? 0) - (a.anneeDebut ?? 0) : a.statut === 'en_cours' ? -1 : 1,
);

export const getProjects = (): Projet[] => projets;
export const getProject = (slug: string): Projet | undefined => projets.find((p) => p.slug === slug);
export const byDomain = (d: DomaineSlug): Projet[] => projets.filter((p) => p.domaines.includes(d));
export const byPrefecture = (slug: string): Projet[] =>
  projets.filter((p) => p.prefectures.some((x) => x.slug === slug));
export const byStatus = (s: ProjetStatut): Projet[] => projets.filter((p) => p.statut === s);

/** Valeurs disponibles pour les filtres de /projets (calculées, jamais saisies à la main). */
export const projectFacets = {
  prefectures: uniq(projets.flatMap((p) => p.prefectures.map((x) => x.slug)))
    .map((slug) => ({ slug, nom: prefNames.get(slug)! }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr')),
  bailleurs: uniq(projets.flatMap((p) => p.bailleurs)).sort((a, b) => a.localeCompare(b, 'fr')),
  annees: uniq(projets.map((p) => p.anneeDebut).filter((a): a is number => !!a)).sort((a, b) => b - a),
};
