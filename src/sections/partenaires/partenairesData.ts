/**
 * Page /partenaires — les 36 organisations de data/apsud/partenaires.json, groupées par type.
 *
 *  - Logo : celui retenu par src/data/partners.ts (HD officiel, sinon logo du site APSUD, sinon archives).
 *    Exception MINUSCA : le fichier « HD » est l'emblème ONU seul, à ne jamais utiliser seul pour
 *    représenter la mission (docs/memoire/PARTENAIRES.md) → on garde le logo du site APSUD.
 *    Sans logo : monogramme typographique (sigle) sur goutte-feuille.
 *  - Projets liés : uniquement ceux documentés (projets_lies[].id → fiche du site), jamais les
 *    projets d'archives (décision D5 : rien publier sans confirmation d'APSUD).
 *  - Groupes : tirés du champ `type`, affinés à la main pour les fonds (FH RCA, CERF, Bêkou…)
 *    afin de coller aux familles de la consigne. Aucune organisation n'est ajoutée ni retirée.
 */
import raw from '../../../data/apsud/partenaires.json';
import projetsData from '../../../data/apsud/projets.json';
import { partners } from '../../data/partners';
import { hasImage } from '../../lib/images';

type Raw = (typeof raw)[number] & Record<string, unknown>;

export type GroupeSlug = 'fonds' | 'onu' | 'bilateral' | 'ong-internationales' | 'ong-nationales' | 'prive';

export const groupes: { slug: GroupeSlug; titre: string; onglet: string; texte: string }[] = [
  {
    slug: 'fonds',
    titre: 'Fonds humanitaires et multilatéraux',
    onglet: 'Fonds humanitaires',
    texte: 'Fonds communs et instruments multilatéraux qui financent la réponse humanitaire et le relèvement en Centrafrique.',
  },
  {
    slug: 'onu',
    titre: 'Agences des Nations unies',
    onglet: 'Agences ONU',
    texte: 'Agences, programmes et mission des Nations unies présents en République centrafricaine.',
  },
  {
    slug: 'bilateral',
    titre: 'Coopérations bilatérales',
    onglet: 'Coopérations bilatérales',
    texte: 'Agences de coopération et gouvernements partenaires du développement de la Centrafrique.',
  },
  {
    slug: 'ong-internationales',
    titre: 'ONG internationales',
    onglet: 'ONG internationales',
    texte: 'Organisations non gouvernementales internationales avec lesquelles APSUD conduit ou a conduit des actions.',
  },
  {
    slug: 'ong-nationales',
    titre: 'ONG nationales partenaires',
    onglet: 'ONG nationales',
    texte: 'Organisations centrafricaines associées à la mise en œuvre de nos projets.',
  },
  {
    slug: 'prive',
    titre: 'Fondations et entreprises',
    onglet: 'Entreprises',
    texte: 'Acteurs privés ayant soutenu des actions menées avec APSUD.',
  },
];

/** Fonds classés « agence ONU » ou « bailleur de fonds » dans la source, regroupés ici. */
const FONDS = new Set(['fh-rca', 'cerf', 'fonds-bekou', 'gavi', 'pbf', 'echo', 'union-europeenne', 'undp-securite-humaine']);
const BILATERAL_FUNDS = new Set(['afd']);

function groupeOf(p: Raw): GroupeSlug {
  if (FONDS.has(p.slug)) return 'fonds';
  if (BILATERAL_FUNDS.has(p.slug)) return 'bilateral';
  switch (p.type) {
    case 'agence ONU': return 'onu';
    case 'gouvernement': return 'bilateral';
    case 'ONG internationale': return 'ong-internationales';
    case 'partenaire de mise en oeuvre': return 'ong-nationales';
    case 'entreprise': return 'prive';
    default: return 'fonds';
  }
}

const projetById = new Map(projetsData.projets.map((p) => [p.id_source, p]));

/** Sigle propre (« Sida (Asdi en français) » → « Sida », « Japon / ODA » → « Japon ») */
const sigleCourt = (s: string) => s.split(/\s[(/–]|\s-\s/)[0].trim();

/** Monogramme : 2 à 4 lettres du sigle, sans les mots de liaison. */
function monogramme(sigle: string): string {
  const s = sigleCourt(sigle).replace(/[^\p{L}\p{N}\s-]/gu, '');
  if (/^[\p{Lu}\p{N}]{2,5}$/u.test(s)) return s;
  const words = s.split(/[\s-]+/).filter((w) => w && !/^(de|du|des|la|le|et|pour)$/i.test(w));
  return words.length > 1 ? words.map((w) => w[0]).join('').toUpperCase().slice(0, 4) : s.slice(0, 2).toUpperCase();
}

export interface PartenaireFiche {
  slug: string;
  groupe: GroupeSlug;
  nom: string;
  sigle: string;
  categorie: 'Bailleur' | 'Partenaire';
  site: string | null;
  logo: string | null;
  monogramme: string;
  /** Logo affiché sur l'ancien site d'APSUD (liste officielle de 14) */
  surSiteApsud: boolean;
  projets: { slug: string; titre: string; statut: string; annees: string; role: string | null }[];
}

const annees = (a?: number | null, b?: number | null) => (a && b && a !== b ? `${a}–${b}` : String(a ?? b ?? ''));

const list = (Array.isArray(raw) ? raw : (raw as { partenaires: Raw[] }).partenaires) as Raw[];

export const fiches: PartenaireFiche[] = list.map((p) => {
  const fromAdapter = partners.find((x) => x.slug === p.slug)?.logo ?? null;
  const sourceApsud = (p.logo_source_apsud as { chemin?: string } | null)?.chemin ?? null;
  const logo = p.slug === 'minusca' && hasImage(sourceApsud) ? sourceApsud : fromAdapter;
  const sigle = String(p.sigle ?? p.nom_affiche);
  const liens = (p.projets_lies as { id: number; role_du_partenaire?: string }[] | undefined) ?? [];
  return {
    slug: p.slug,
    groupe: groupeOf(p),
    nom: String(p.nom_officiel ?? p.nom_affiche).replace(/\s*–\s*nom légal complet à confirmer/, '').replace(/\s*\([^)]*à confirmer[^)]*\)/, ''),
    sigle: sigleCourt(sigle),
    categorie: p.categorie === 'bailleur' ? 'Bailleur' : 'Partenaire',
    site: (p.site_officiel as string | null) ?? null,
    logo,
    monogramme: monogramme(sigle),
    surSiteApsud: Boolean(p.affiche_sur_apsud_org),
    projets: liens
      .map((l) => {
        const pr = projetById.get(l.id);
        if (!pr) return null;
        return {
          slug: pr.slug,
          titre: pr.titre_court ?? pr.titre,
          statut: pr.statut === 'en_cours' ? 'En cours' : 'Réalisé',
          annees: annees(pr.annee_debut, pr.annee_fin),
          role: l.role_du_partenaire && l.role_du_partenaire !== 'bailleur' ? l.role_du_partenaire : null,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.annees.localeCompare(a.annees)),
  };
});

/** Ordre d'une grille : organisations avec projets documentés d'abord, puis logo, puis nom. */
const rank = (f: PartenaireFiche) => (f.projets.length ? 0 : f.logo ? 1 : 2);
export const fichesParGroupe = groupes
  .map((g) => ({
    ...g,
    fiches: fiches
      .filter((f) => f.groupe === g.slug)
      .sort((a, b) => rank(a) - rank(b) || b.projets.length - a.projets.length || a.sigle.localeCompare(b.sigle, 'fr')),
  }))
  .filter((g) => g.fiches.length > 0);

/** Chiffres calculés pour l'introduction */
export const chiffres = {
  organisations: fiches.length,
  bailleurs: fiches.filter((f) => f.categorie === 'Bailleur').length,
  projetsCofinances: new Set(fiches.flatMap((f) => f.projets.map((p) => p.slug))).size,
  fhRca: fiches.find((f) => f.slug === 'fh-rca')?.projets.length ?? 0,
};
