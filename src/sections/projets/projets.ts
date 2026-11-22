/**
 * Utilitaires propres aux pages /projets et /projets/[slug] (aucune donnée inventée).
 *  - `partnerFor` : retrouve la fiche partenaire (logo) d'un bailleur ou d'un partenaire de mise
 *    en œuvre tel qu'il est écrit dans projets.json (« FH », « WHH (Welthungerhilfe) »…) ;
 *  - `cardMeta` : sur-titre des cartes (« Bailleur · 2025–2026 ») ;
 *  - `cardStatus` : statut au format attendu par ProjectCard.
 */
import { partners, type Partner } from '../../data/partners';
import type { Projet } from '../../data/projects';

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Sigles des fiches projets qui ne correspondent à aucun nom de partenaire tel quel. */
const ALIAS: Record<string, string> = { fh: 'fh-rca' };

export function partnerFor(raw: string): Partner | null {
  const inside = raw.match(/\(([^)]+)\)/)?.[1] ?? '';
  const outside = raw.replace(/\s*\([^)]*\)/g, '');
  const keys = [raw, outside, inside].map(norm).filter(Boolean);
  for (const k of keys) {
    if (ALIAS[k]) {
      const p = partners.find((x) => x.slug === ALIAS[k]);
      if (p) return p;
    }
  }
  return (
    partners.find((p) => {
      const names = [p.slug.replace(/-/g, ' '), p.short, p.name, p.name.replace(/\s*\([^)]*\)/g, '')].map(norm);
      return keys.some((k) => names.includes(k));
    }) ?? null
  );
}

/** Nom affiché d'un bailleur : sigle propre si la fiche partenaire existe, sinon tel que saisi. */
export const donorLabel = (raw: string) => {
  const p = partnerFor(raw);
  return p ? (p.slug === 'fh-rca' ? 'FH RCA' : p.short) : raw;
};

export const cardMeta = (p: Projet) => [...p.bailleurs.map(donorLabel), p.annees].filter(Boolean).join(' · ');

export const cardStatus = (p: Projet) => (p.statut === 'en_cours' ? 'en-cours' : 'realise') as 'en-cours' | 'realise';

const mois = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
const asDate = (s: string | null) => (s ? new Date(`${s}T12:00:00`) : null);

/** Période lisible : « mars 2025 – décembre 2026 » ; repli sur les années si les dates manquent. */
export function periode(p: Projet): string {
  const a = asDate(p.dateDebut);
  const b = asDate(p.dateFin);
  if (a && b) return `${mois.format(a)} – ${mois.format(b)}`;
  if (a) return `depuis ${mois.format(a)}`;
  return p.annees;
}

/** Valeur machine pour <time datetime> (« 2025-03 »). */
export const isoMois = (s: string | null) => (s ? s.slice(0, 7) : undefined);
