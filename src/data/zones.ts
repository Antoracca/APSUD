/**
 * Zones d'intervention (HomeZones.astro) : croise le fond de carte des préfectures
 * (src/data/rca-prefectures.json, généré par tools/geo-rca.mjs depuis geoBoundaries)
 * et les fiches projets (data/apsud/projets.json, champ lieux[].prefecture).
 *
 * Normalisation des noms de préfecture saisis dans les fiches :
 *  - accents, apostrophes typographiques, casse (« Kémo » = « Kemo ») ;
 *  - mentions entre parenthèses retirées (« Ouham (déduit) », « Mbomou (déduit ; …) ») ;
 *  - lieux doubles éclatés (« Bangui / Ombella-M’Poko » → Bangui + Ombella-M’Poko) ;
 *  - variantes orthographiques (« Nana-Gribizi » → Nana-Grébizi, graphie de geoBoundaries).
 * Un projet n'est compté qu'une fois par préfecture, même s'il y a plusieurs lieux.
 */
import projetsData from '../../data/apsud/projets.json';
import geo from './rca-prefectures.json';

export type ZoneStatus = 'ongoing' | 'done' | 'none';

export interface ZoneProject {
  slug: string;
  titre: string;
  statut: 'en_cours' | 'realise';
  periode: string;
}

export interface Zone {
  nom: string;
  slug: string;
  d: string;
  cx: number;
  cy: number;
  enCours: number;
  realises: number;
  status: ZoneStatus;
  projets: ZoneProject[];
  /** Ordre d'apparition de la cascade d'entrée (sud-ouest → est), de 0 à n − 1. */
  ordre: number;
}

const ALIASES: Record<string, string> = {
  'nana-gribizi': 'nana-grebizi',
  'ombella-mpoko': 'ombella-m-poko',
};

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** « Bangui / Ombella-M’Poko (déduit) » → ['bangui', 'ombella-m-poko'] */
export function normalizePrefecture(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/\([^)]*\)/g, '')
    .split('/')
    .map((part) => slugify(part.trim()))
    .filter(Boolean)
    .map((s) => ALIASES[s] ?? s);
}

const periode = (a?: number | null, b?: number | null) =>
  a && b && a !== b ? `${a}–${b}` : String(a ?? b ?? '');

type Projet = (typeof projetsData.projets)[number];
const known = new Set(geo.prefectures.map((p) => p.slug));
const byZone = new Map<string, Projet[]>();
for (const p of projetsData.projets) {
  const slugs = new Set(p.lieux.flatMap((l) => normalizePrefecture(l.prefecture)));
  for (const s of slugs) {
    if (!known.has(s)) {
      console.warn(`[zones] préfecture inconnue « ${s} » (projet ${p.slug})`);
      continue;
    }
    byZone.set(s, [...(byZone.get(s) ?? []), p]);
  }
}

// Cascade : on balaie du sud-ouest (x petit, y grand) vers l'est.
const [, , vbW, vbH] = geo.viewBox.split(' ').map(Number);
const sweep = (p: { cx: number; cy: number }) => p.cx / vbW + 0.45 * (1 - p.cy / vbH);
const order = [...geo.prefectures].sort((a, b) => sweep(a) - sweep(b)).map((p) => p.slug);

export const zones: Zone[] = geo.prefectures.map((pref) => {
  const list = (byZone.get(pref.slug) ?? [])
    .slice()
    .sort((a, b) => (a.statut === b.statut ? (b.annee_debut ?? 0) - (a.annee_debut ?? 0) : a.statut === 'en_cours' ? -1 : 1));
  const enCours = list.filter((p) => p.statut === 'en_cours').length;
  const realises = list.filter((p) => p.statut === 'realise').length;
  return {
    ...pref,
    enCours,
    realises,
    status: enCours ? 'ongoing' : realises ? 'done' : 'none',
    projets: list.map((p) => ({
      slug: p.slug,
      titre: p.titre_court ?? p.titre,
      statut: p.statut as ZoneProject['statut'],
      periode: periode(p.annee_debut, p.annee_fin),
    })),
    ordre: order.indexOf(pref.slug),
  };
});

export const mapViewBox = geo.viewBox;
export const mapSource = geo.source;

const actives = zones.filter((z) => z.status !== 'none');
const projetsCouverts = new Set(actives.flatMap((z) => z.projets.map((p) => p.slug)));
const annees = projetsData.projets.map((p) => p.annee_debut).filter((a): a is number => !!a);

export const zonesSummary = {
  prefectures: actives.filter((z) => z.slug !== 'bangui').length,
  bangui: actives.some((z) => z.slug === 'bangui'),
  enCours: zones.filter((z) => z.status === 'ongoing').length,
  projets: projetsCouverts.size,
  depuis: Math.min(...annees),
  total: zones.filter((z) => z.slug !== 'bangui').length,
};

/** Libellé « 1 projet » / « 3 projets » */
export const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`;
