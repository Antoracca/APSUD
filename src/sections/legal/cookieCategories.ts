/**
 * Catégories de cookies décrites sur /cookies — reprises À L'IDENTIQUE du bandeau
 * (src/components/layout/CookieBanner.astro + src/scripts/cookies.ts : clé `apsud_consent`,
 * catégories `necessaires`, `audience`, `externes`, choix conservé 6 mois).
 * Si le bandeau change, mettre ce fichier à jour (à terme : une seule source partagée).
 */

export type CookieCategoryId = 'necessaires' | 'audience' | 'externes';

export interface CookieRow {
  nom: string;
  type: string;
  finalite: string;
  duree: string;
  editeur: string;
}

export interface CookieCategory {
  id: CookieCategoryId;
  titre: string;
  texte: string;
  toujoursActif?: boolean;
  /** Traceurs connus aujourd'hui ; vide = aucun outil branché pour l'instant */
  traceurs: CookieRow[];
  /** Phrase affichée quand aucun traceur n'est encore utilisé */
  aucun?: string;
}

export const cookieCategories: CookieCategory[] = [
  {
    id: 'necessaires',
    titre: 'Nécessaires',
    toujoursActif: true,
    texte:
      'Indispensables au fonctionnement du site, ils ne peuvent pas être désactivés. Ils mémorisent par exemple vos choix sur les cookies.',
    traceurs: [
      {
        nom: 'apsud_consent',
        type: 'Stockage local du navigateur',
        finalite: 'Mémorise vos choix sur les cookies',
        duree: '6 mois',
        editeur: 'APSUD',
      },
    ],
  },
  {
    id: 'audience',
    titre: 'Mesure d’audience',
    texte:
      'Ils nous indiquent quelles pages sont consultées et comment, pour améliorer le site. Désactivés tant que vous ne les acceptez pas.',
    traceurs: [],
    aucun: 'Aucun outil de mesure d’audience n’est utilisé à ce jour.',
  },
  {
    id: 'externes',
    titre: 'Contenus externes',
    texte:
      'Vidéos (YouTube, Vimeo), cartes et publications de réseaux sociaux intégrées au site. Ces services déposent leurs propres cookies : tant que vous les refusez, ils ne sont pas chargés.',
    traceurs: [],
    aucun: 'Les cookies de ces services sont décrits dans leurs propres politiques de confidentialité.',
  },
];
