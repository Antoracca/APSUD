/**
 * Offres d'emploi d'APSUD (page /carrieres) — type « Offre d'emploi » (PROSPER_STRUCTURE §14.6).
 * Aucune offre n'est publiée pour l'instant : la liste est VIDE et la page affiche un état vide
 * honnête. Demain, ces entrées viendront du back-office ; le type est prêt dès maintenant.
 * Ne jamais ajouter d'offre fictive ici.
 */

export type JobContract = 'cdi' | 'cdd' | 'consultance' | 'stage' | 'benevolat';
export type JobStatus = 'ouverte' | 'cloturee' | 'pourvue';

export interface Job {
  slug: string;
  intitule: string;
  /** ex. « APSUD/RH/2026/012 » */
  reference?: string;
  typeContrat: JobContract;
  /** Lieu d'affectation (ex. « Bambari, Ouaka ») */
  lieu: string;
  domaine?: string;
  projetLie?: string;
  /** Dates ISO (AAAA-MM-JJ) */
  datePublication: string;
  dateLimite: string;
  nombrePostes?: number;
  duree?: string;
  statut: JobStatus;
  /** Termes de référence (PDF) */
  tdr?: { href: string; poids?: string };
}

export const contractLabels: Record<JobContract, string> = {
  cdi: 'CDI',
  cdd: 'CDD',
  consultance: 'Consultance',
  stage: 'Stage',
  benevolat: 'Bénévolat',
};

export const jobs: Job[] = [];

const byDeadline = (a: Job, b: Job) => a.dateLimite.localeCompare(b.dateLimite);

/** Offres ouvertes, de la plus urgente à la plus lointaine. */
export const openJobs = (): Job[] => jobs.filter((j) => j.statut === 'ouverte').sort(byDeadline);
/** Offres clôturées (archive repliée ; les offres pourvues ne sont pas listées). */
export const closedJobs = (): Job[] => jobs.filter((j) => j.statut === 'cloturee').sort(byDeadline).reverse();
