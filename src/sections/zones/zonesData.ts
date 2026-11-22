/**
 * Page /nos-zones — liste des zones d'intervention, calculée (jamais saisie à la main) :
 *  - fond de carte et compteurs : src/data/zones.ts ;
 *  - projets de chaque préfecture : src/data/projects.ts (byPrefecture) ;
 *  - localités : champ lieux[] des fiches (data/apsud/projets.json), mentions entre parenthèses retirées ;
 *  - zones déclarées par APSUD (page À propos) : organisation.json › zones_intervention.declarees_a_propos.
 * Une zone déclarée sans projet publié (Haute-Kotto) est affichée honnêtement comme telle.
 *
 * Ancres : slug du fond de carte, sauf « ombella-m-poko » → « ombella-mpoko » (liens du méga-menu).
 */
import organisation from '../../../data/apsud/organisation.json';
import projetsData from '../../../data/apsud/projets.json';
import { zones, normalizePrefecture, type Zone } from '../../data/zones';
import { byPrefecture, type Projet } from '../../data/projects';
import { getDomain } from '../../data/domains';

const ANCHORS: Record<string, string> = { 'ombella-m-poko': 'ombella-mpoko' };
export const zoneAnchor = (slug: string) => ANCHORS[slug] ?? slug;

const clean = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();
const uniq = <T,>(a: T[]) => [...new Set(a)];

/** Zones déclarées sur la page À propos d'APSUD (« Préfecture de la Ouaka » → ouaka). */
const declarees = organisation.zones_intervention.declarees_a_propos;
const declared = new Map<string, string[]>(
  declarees.map((d) => {
    const nom = d.zone.replace(/^Préfecture (de la |de l[’']|de |du )?/i, '');
    const slug = normalizePrefecture(nom)[0] ?? '';
    return [slug, (d as { localites?: string[] }).localites ?? []];
  }),
);

/** Localités citées dans les fiches projets pour une préfecture donnée. */
function localitesFromProjects(slug: string): string[] {
  return projetsData.projets.flatMap((p) =>
    p.lieux
      .filter((l) => l.lieu && normalizePrefecture(l.prefecture).includes(slug))
      .flatMap((l) => clean(l.lieu!).split(/\s+et\s+|,\s*/))
      .map((s) => s.trim())
      .filter((s) => s && !/^bangui$/i.test(s) && !/^ses environs$/i.test(s)),
  );
}

export interface ZoneProjetLigne {
  slug: string;
  titre: string;
  statut: Projet['statut'];
  statutLibelle: string;
  annees: string;
  domaine: string | null;
  bailleurs: string[];
}

export interface ZoneEntry {
  slug: string;
  anchor: string;
  nom: string;
  type: 'Capitale' | 'Préfecture';
  declaree: boolean;
  localites: string[];
  enCours: number;
  realises: number;
  status: Zone['status'];
  projets: ZoneProjetLigne[];
}

const toEntry = (z: Zone): ZoneEntry => {
  const projets = byPrefecture(z.slug);
  const loc = uniq([...(declared.get(z.slug) ?? []), ...localitesFromProjects(z.slug)]);
  return {
    slug: z.slug,
    anchor: zoneAnchor(z.slug),
    nom: z.nom,
    type: z.slug === 'bangui' ? 'Capitale' : 'Préfecture',
    declaree: declared.has(z.slug),
    localites: z.slug === 'bangui' && declared.has('bangui') ? ['les 8 arrondissements'] : loc,
    enCours: z.enCours,
    realises: z.realises,
    status: z.status,
    projets: projets.map((p) => ({
      slug: p.slug,
      titre: p.titreCourt,
      statut: p.statut,
      statutLibelle: p.statutLibelle,
      annees: p.annees,
      domaine: p.domaines[0] ? getDomain(p.domaines[0])?.titre ?? null : null,
      bailleurs: p.bailleurs.map((b) => clean(b)),
    })),
  };
};

/** Bangui d'abord, puis ordre alphabétique ; seules les zones avec projet ou déclarées par APSUD. */
export const zoneEntries: ZoneEntry[] = zones
  .filter((z) => z.status !== 'none' || declared.has(z.slug))
  .map(toEntry)
  .sort((a, b) =>
    a.slug === 'bangui' ? -1 : b.slug === 'bangui' ? 1 : a.nom.localeCompare(b.nom, 'fr'),
  );
