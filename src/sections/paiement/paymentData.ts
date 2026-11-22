/**
 * Paiement des dons (front-end seulement, 2026-11-22) : moyens proposés, réseaux de cartes, taux.
 * Le branchement réel (agrégateur Mobile Money, Stripe ou passerelle bancaire) viendra avec le
 * back-end : les boutons « Payer » mènent pour l'instant à une page inexistante (404).
 */
import type { ImagePath } from '../../data/home';

export type PaymentMethodId = 'orange-money' | 'carte' | 'virement';

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
  {
    id: 'virement',
    title: 'Virement bancaire',
    text: 'Depuis la Centrafrique ou l’étranger, vers notre compte Ecobank, BGFIBank ou BSIC.',
    href: '/faire-un-don/virement',
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

/**
 * Virement bancaire : banques proposées et coordonnées.
 * ATTENTION — COORDONNÉES PROVISOIRES (2026-11-22) : numéros génériques (codes banque 999xx
 * inexistants) en attendant les vraies coordonnées confirmées par écrit par APSUD (décision D5).
 * Clés RIB et IBAN calculés pour être bien formés, mais aucun compte réel derrière.
 * Format CEMAC : code banque (5) + code guichet (5) + numéro de compte (11) + clé (2) ; IBAN « CF ».
 * Logos officiels : Ecobank (Wikimedia Commons), BGFIBank (Wikipédia), BSIC (bsicbank.com).
 */
export const transferProvisional = true;

export type BankId = 'ecobank' | 'bgfi' | 'bsic';

export const banks: {
  id: BankId;
  name: string;
  logo: ImagePath;
  agency: string;
  bankCode: string;
  branchCode: string;
  account: string;
  ribKey: string;
  iban: string;
  bic: string;
}[] = [
  {
    id: 'ecobank',
    name: 'Ecobank Centrafrique',
    logo: 'assets/apsud/images/paiement/banques/ecobank.svg' as ImagePath,
    agency: 'Agence principale, Bangui',
    bankCode: '99901', branchCode: '00001', account: '00000000001', ribKey: '07',
    iban: 'CF4299901000010000000000107',
    bic: 'EXEMCFBG001',
  },
  {
    id: 'bgfi',
    name: 'BGFIBank Centrafrique',
    logo: 'assets/apsud/images/paiement/banques/bgfi.png' as ImagePath,
    agency: 'Agence principale, Bangui',
    bankCode: '99902', branchCode: '00001', account: '00000000002', ribKey: '12',
    iban: 'CF4299902000010000000000212',
    bic: 'EXEMCFBG002',
  },
  {
    id: 'bsic',
    name: 'BSIC Centrafrique',
    logo: 'assets/apsud/images/paiement/banques/bsic.svg' as ImagePath,
    agency: 'Agence principale, Bangui',
    bankCode: '99903', branchCode: '00001', account: '00000000003', ribKey: '17',
    iban: 'CF4299903000010000000000317',
    bic: 'EXEMCFBG003',
  },
];

/** IBAN lisible : groupes de 4 caractères. */
export const formatIban = (iban: string) => iban.replace(/(.{4})/g, '$1 ').trim();
