/**
 * Paramètres globaux du site, lus depuis la base de données de référence
 * `data/apsud/organisation.json` (extraite de apsud.org, voir docs/memoire).
 * Plus tard : remplacé par le singleton « Paramètres du site » du back-office.
 */
import organisation from '../../data/apsud/organisation.json';

const id = organisation.identite;

export const site = {
  sigle: id.sigle,
  nom: id.nom_complet,
  nomAnglais: id.nom_anglais,
  statut: 'ONG nationale de développement et d’action humanitaire',
  pays: 'République centrafricaine',
  /* Slogan lu sur le panneau du siège — à confirmer par APSUD */
  slogan: id.slogan.valeur,
  mission: organisation.mission,
  vision: organisation.vision,
  url: 'https://apsud.org',
  contact: {
    adresse: 'Quartier Micheline, Bimbo',
    boitePostale: 'B.P. 462 Bangui',
    pays: 'République centrafricaine',
    telephones: organisation.contact.telephones as string[],
    /* Adresse principale à arbitrer avec APSUD (infos@ / a.cm@ divergent sur l'ancien site) */
    email: 'infos@apsud.org',
  },
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ong.apsud', icone: 'facebook' },
    { nom: 'X', url: 'https://x.com/apsud25', icone: 'x' },
  ],
} as const;

export const telHref = (tel: string) => `tel:${tel.replace(/[^+\d]/g, '')}`;
