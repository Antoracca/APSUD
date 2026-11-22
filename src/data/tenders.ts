/**
 * Appels d'offres d'APSUD (page /agir/appels-d-offres) — type « Appel d'offres »
 * (PROSPER_STRUCTURE §14.7). Aucun avis n'est publié pour l'instant : la liste est VIDE.
 * Demain, ces entrées viendront du back-office. Ne jamais ajouter d'avis fictif ici.
 */

export type TenderType = 'travaux' | 'fournitures' | 'services' | 'consultance';
export type TenderStatus = 'ouvert' | 'clos' | 'attribue' | 'annule';

export interface TenderFile {
  label: string;
  href: string;
  poids?: string;
  /** Date ISO de publication (additifs, éclaircissements) */
  date?: string;
}

export interface Tender {
  slug: string;
  reference: string;
  objet: string;
  type: TenderType;
  lots?: string[];
  projetLie?: string;
  zone?: string;
  /** Dates ISO (AAAA-MM-JJ) */
  datePublication: string;
  dateLimiteDepot: string;
  modalitesDepot: string;
  dossier: TenderFile[];
  additifs?: TenderFile[];
  contact?: string;
  statut: TenderStatus;
  resultat?: string;
}

export const tenderTypeLabels: Record<TenderType, string> = {
  travaux: 'Travaux',
  fournitures: 'Fournitures',
  services: 'Services',
  consultance: 'Consultance',
};

export const tenderStatusLabels: Record<TenderStatus, string> = {
  ouvert: 'Ouvert',
  clos: 'Clos',
  attribue: 'Attribué',
  annule: 'Annulé',
};

export const tenders: Tender[] = [];

export const openTenders = (): Tender[] =>
  tenders.filter((t) => t.statut === 'ouvert').sort((a, b) => a.dateLimiteDepot.localeCompare(b.dateLimiteDepot));
export const pastTenders = (): Tender[] =>
  tenders.filter((t) => t.statut !== 'ouvert').sort((a, b) => b.dateLimiteDepot.localeCompare(a.dateLimiteDepot));
