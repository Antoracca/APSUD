/**
 * Paiement des dons (front-end seulement, 2026-11-22) : moyens proposés, réseaux de cartes, taux.
 * Le branchement réel (agrégateur Mobile Money, Stripe ou passerelle bancaire) viendra avec le
 * back-end : les boutons « Payer » mènent pour l'instant à une page inexistante (404).
 */
import type { ImagePath } from '../../data/home';

export type PaymentMethodId = 'orange-money' | 'carte';

export const paymentMethods: {
  id: PaymentMethodId;
  title: string;
  text: string;
  href: string;
}[] = [
  {
    id: 'orange-money',
    title: 'Orange Money',
    text: 'Depuis votre téléphone, en francs CFA. Vous confirmez avec votre code secret.',
    href: '/faire-un-don/orange-money',
  },
  {
    id: 'carte',
    title: 'Carte bancaire',
    text: 'Visa, Mastercard, American Express et autres réseaux, depuis la Centrafrique ou l’étranger.',
    href: '/faire-un-don/carte',
  },
];

/** Logo Orange Money rogné de ses marges blanches (original : assets/apsud/images/hero/orangemonney.png). */
export const orangeMoneyLogo = 'assets/apsud/images/paiement/orange-money.png' as ImagePath;

/** Page de destination provisoire des boutons « Payer » (n'existe pas : page 404 du site). */
export const paymentPendingHref = '/faire-un-don/paiement-en-cours';

/** Indicatif téléphonique de la Centrafrique et longueur d'un numéro national. */
export const phoneCountry = { code: '+236', digits: 8 };

/** Parité fixe franc CFA (XAF) / euro : 1 € = 655,957 FCFA. */
export const xafPerEur = 655.957;

/**
 * Réseaux de cartes affichés et reconnus (types de la bibliothèque card-validator → icône
 * du jeu « logos » d'Iconify). Les Cartes Bancaires (CB) françaises sont co-marquées Visa ou
 * Mastercard : elles sont reconnues par leur réseau international.
 */
export const cardBrands: { type: string; icon: string; name: string }[] = [
  { type: 'visa', icon: 'visa', name: 'Visa' },
  { type: 'mastercard', icon: 'mastercard', name: 'Mastercard' },
  { type: 'american-express', icon: 'amex', name: 'American Express' },
  { type: 'discover', icon: 'discover', name: 'Discover' },
  { type: 'jcb', icon: 'jcb', name: 'JCB' },
  { type: 'unionpay', icon: 'unionpay', name: 'UnionPay' },
  { type: 'diners-club', icon: 'dinersclub', name: 'Diners Club' },
  { type: 'maestro', icon: 'maestro', name: 'Maestro' },
];
