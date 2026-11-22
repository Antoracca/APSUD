/**
 * Partenaires et bailleurs (priorité n°1 du client), lus depuis data/apsud/partenaires.json.
 * Choix du logo : version HD officielle si disponible, sinon logo du site APSUD,
 * sinon logo retrouvé dans les archives. Les partenaires sans logo sont exclus du bandeau.
 */
import data from '../../data/apsud/partenaires.json';
import { hasImage } from '../lib/images';

type Raw = (typeof data)[number] & { [k: string]: unknown };

export interface Partner {
  slug: string;
  name: string;
  short: string;
  category: 'bailleur' | 'partenaire';
  url: string | null;
  logo: string;
  /** Logo sans fond pour le bandeau défilant (tools/logos-bandeau.mjs), sinon le logo d'origine. */
  bandLogo: string;
}

const list = (Array.isArray(data) ? data : (data as { partenaires: Raw[] }).partenaires) as Raw[];

function pickLogo(p: Raw): string | null {
  const candidates: (string | undefined)[] = [
    (p.logo_hd as { chemin?: string } | null)?.chemin,
    (p.logo_source_apsud as { chemin?: string } | null)?.chemin,
  ];
  const archive = JSON.stringify(p).match(/assets\/partenaires\/archives-apsud\/[\w.-]+/);
  if (archive) candidates.push(archive[0]);
  return candidates.find((c) => hasImage(c)) ?? null;
}

/** Nom court affiché (sigle propre, sans les précisions entre parenthèses). */
function shortName(p: Raw): string {
  const s = String(p.sigle ?? p.nom_affiche ?? p.slug);
  return s.split(/[(/–-]/)[0].trim() || String(p.nom_affiche);
}

export const partners: Partner[] = list
  .map((p) => {
    const logo = pickLogo(p);
    if (!logo) return null;
    return {
      slug: String(p.slug),
      name: String(p.nom_officiel ?? p.nom_affiche),
      short: shortName(p),
      category: p.categorie === 'bailleur' ? 'bailleur' : 'partenaire',
      url: (p.site_officiel as string | null) ?? null,
      logo,
      bandLogo: hasImage(`assets/partenaires/bandeau/${p.slug}.png`) ? `assets/partenaires/bandeau/${p.slug}.png` : logo,
    } satisfies Partner;
  })
  .filter((p): p is Partner => p !== null);

/** Ordre du bandeau d'accueil : bailleurs des projets récents d'abord. */
const featuredOrder = [
  'fh-rca', 'union-europeenne', 'bmz', 'welthungerhilfe', 'pnud', 'unicef',
  'oxfam', 'unops', 'onu-femmes', 'minusca', 'usaid', 'cerf', 'gavi', 'fao',
];

export const featuredPartners: Partner[] = featuredOrder
  .map((slug) => partners.find((p) => p.slug === slug))
  .filter((p): p is Partner => Boolean(p));

/** Rang d'affichage : bailleurs des projets récents d'abord (featuredOrder), puis ordre alphabétique. */
const rank = (slug: string) => {
  const i = featuredOrder.indexOf(slug);
  return i === -1 ? featuredOrder.length : i;
};

/** Organisations d'une catégorie, triées pour le bandeau défilant de l'accueil. */
export function partnersByCategory(category: Partner['category']): Partner[] {
  return partners
    .filter((p) => p.category === category)
    .sort((a, b) => rank(a.slug) - rank(b.slug) || a.short.localeCompare(b.short, 'fr'));
}
