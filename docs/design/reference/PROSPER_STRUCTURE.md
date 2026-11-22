# PROSPER_STRUCTURE — Architecture, contenu et réflexion éditoriale de prosperglobal.org

> **Objet** : analyse de l'architecture d'information, des gabarits de pages, des composants, du ton éditorial et de la stratégie de conversion de https://www.prosperglobal.org/ (Drupal 11, ex-Mercy Corps), puis transposition section par section pour le futur site APSUD.
> **Date de relevé** : 2026-11-21. **Pages analysées** : 50 (HTML brut + DOM rendu Edge headless pour 6 pages + 4 captures).
> **Données brutes** : `scratchpad/raw/prosper-structure/` (HTML, CSS `styles.css`, JS de navigation, pages Jobvite). Plans de page extraits : `scratchpad/outlines/*.txt`.
> **Règle de droits** : on décrit leur *langage* (structure, rythme, procédés). Les rares libellés anglais cités ci-dessous servent uniquement à identifier un bloc (moins de 15 mots chacun) ; aucun texte Prosper ne doit être réutilisé dans le site APSUD.
> **Documents liés** : `PROSPER_TOKENS.md` (couleurs, typo, espacements), `PROSPER_VISUEL.md` (traitement visuel), `docs/design/DESIGN.md` (synthèse applicable), `data/apsud/*.json` (données APSUD).

---

## Sommaire

1. [Ce qu'il faut retenir en 12 points](#1-ce-quil-faut-retenir-en-12-points)
2. [Arborescence complète de Prosper Global](#2-arborescence-complète-de-prosper-global)
3. [Gabarit global : bandeaux, header, navigation, footer, pop-ups, cookies](#3-gabarit-global)
4. [Grille, gabarits de page et bibliothèque de composants](#4-grille-gabarits-de-page-et-bibliothèque-de-composants)
5. [Analyse page par page, section par section (+ équivalent APSUD)](#5-analyse-page-par-page)
6. [Ton éditorial et hiérarchie des titres](#6-ton-éditorial-et-hiérarchie-des-titres)
7. [Stratégie de conversion (don, newsletter, contact, partenariat)](#7-stratégie-de-conversion)
8. [Impact, partenaires, rapports : comment ils prouvent](#8-impact-partenaires-rapports)
9. [Listings, filtres, pagination, contenus liés](#9-listings-filtres-pagination-contenus-liés)
10. [Accessibilité](#10-accessibilité)
11. [SEO et métadonnées](#11-seo-et-métadonnées)
12. [Ce que Prosper fait mal (et qu'APSUD fera mieux)](#12-ce-que-prosper-fait-mal)
13. [Proposition d'arborescence complète du futur site APSUD](#13-proposition-darborescence-apsud)
14. [Types de contenu dynamiques à gérer depuis l'administration](#14-types-de-contenu-dynamiques)

---

## 1. Ce qu'il faut retenir en 12 points

1. **Navigation à 4 portes + 1 bouton** : *Qui nous sommes / Ce que nous faisons / Où nous travaillons / Comment aider* + bouton plein **Donate** toujours visible. Chaque porte ouvre au plus 5 à 6 liens. Pas de 6e entrée, pas de « Accueil » dans le menu.
2. **Un seul méga-panneau** : au survol de la barre, *tous* les sous-menus descendent ensemble dans un tiroir blanc commun (4 colonnes alignées sous leur titre). Lecture d'ensemble immédiate, aucune cascade.
3. **Header fixe, blanc, opaque** (84 px), jamais transparent sur le hero. Au-dessus : un bandeau « eyebrow » fermable (annonce institutionnelle). En dessous : une barre d'alerte de campagne fermable.
4. **Une page = une suite de blocs « paragraphs »** réutilisables (Drupal Paragraphs) : titre de page, image-légende héroïque, texte formaté, côte à côte image/texte alterné, chiffres clés, citation agrandie, double CTA, tuiles liées. Une vingtaine de composants suffisent pour tout le site.
5. **Alternance gauche/droite systématique** des blocs image + texte (`l-side-by-side--image-left` puis `--image-right`), avec apparition au défilement (opacité 0,3 → 1).
6. **Les chiffres sont des héros** : 4 chiffres clés animés (compteur) sous le hero, repris dans « Pourquoi donner », l'efficience (86 % au programme) jusque dans le footer et sur la page de don.
7. **Les gens ont un prénom et un lieu** : chaque photo porte une légende narrative (prénom + rôle + village/région + action). C'est le principal outil de storytelling, plus que les témoignages formels.
8. **Chaque page se termine par une action** : bloc « double CTA » (don mensuel + rapport, ou don + pétition, ou contact) puis contenus liés (articles + ressources filtrés par pays ou thème).
9. **Le contenu est relié par taxonomies** : *Pays* et *Domaine d'intervention* (Focus area) relient pages thématiques, pages pays, blog et centre de ressources (`/blog?cid=8`, `/research-resources?fid=75`).
10. **Articles très structurés** : titre, photo pleine largeur + légende, date + partage, encadré « Points clés » (3 puces), corps en colonne de lecture étroite, photos intercalées, citation agrandie, double CTA de don, « Sujets liés » (boutons-étiquettes), 3 articles liés.
11. **Le don est un parcours dédié** : page sans menu (logo seul), formulaire en 3 étapes numérotées, montants préréglés, ponctuel/mensuel, couverture des frais, don en hommage, preuves de confiance (efficience, labels), alternatives (téléphone, courrier, autres moyens).
12. **Les emplois sont externalisés** (Jobvite + job boards par pays), la page Carrières n'est qu'une vitrine : c'est le point faible à ne pas copier ; APSUD gérera ses offres en interne.

---

## 2. Arborescence complète de Prosper Global

> `/sitemap.xml` renvoie **404** (aucun plan XML publié) ; le `robots.txt` impose `Crawl-delay: 30` et bloque `/search/`, `/taxonomy/*`, `/user/*`, `/admin/`. L'arborescence ci-dessous est reconstruite à partir du menu principal, du footer, des liens internes et des fils d'Ariane.

```
/                                   Accueil (campagne + preuves + histoires + presse)
├── /who-we-are                     Qui nous sommes (hub)
│   ├── /who-we-are/our-team        Direction + Conseil d'administration (grille de personnes)
│   │   └── /who-we-are/our-team/{nom}      Fiche personne (type « person »)
│   ├── /who-we-are/why-give        Pourquoi donner
│   ├── /who-we-are/financials      Finances et rapports annuels (listes d'années → PDF)
│   ├── /who-we-are/our-efficiency  Notre efficience (86 / x / y %) + labels
│   ├── /who-we-are/ethics-policies Éthique, sauvegarde (safeguarding), signalement
│   ├── /who-we-are/privacy-policy  Politique de confidentialité
│   ├── /prosper-global             Changement de nom (page de transition de marque)
│   └── /pathway                    Stratégie à 10 ans
├── /careers                        Carrières (vitrine)
│   ├── /careers/national           Job boards par pays (liens externes UltiPro)
│   ├── /careers/talent-database    Vivier de talents
│   ├── /careers/benefits           Rémunération et avantages
│   └── jobs.jobvite.com/prosperglobal/…   Liste et fiches d'offres (externe)
├── /research-resources             Centre de ressources (listing filtrable)
│   ├── /research-resources/{slug}  Fiche ressource (PDF + résumé)
│   ├── /research-resources/research-partnerships
│   └── /research-resources/contact
├── /blog                           Histoires / blog (hero + listing filtrable paginé)
│   └── /blog/{slug}                Article (BlogPosting)
├── /press-room                     Salle de presse (hub)
│   ├── /press-room/releases        Communiqués (listing)
│   │   └── /press-room/releases/{slug}
│   ├── /press-room/clips           Revue de presse (liens externes)
│   ├── /press-room/media-contacts  Contacts presse
│   └── /press-room/media-resources Ressources médias (+ fiche CEO)
├── /what-we-do                     Ce que nous faisons (hub)
│   ├── /what-we-do/emergency-response          Urgence
│   ├── /what-we-do/food-security-nutrition     Alimentation et emploi
│   ├── /what-we-do/climate-environment-energy  Climat
│   ├── /what-we-do/ventures                    Fonds d'investissement
│   └── /what-we-do/focus-areas                 15 domaines (grille de tuiles)
├── /voices-of-prosperity           Initiative-étendard (étude + vidéo + histoires)
├── /where-we-work                  Carte du monde + liste des pays par région
│   └── /where-we-work/{pays}       Page pays (contexte, impact, carte, CTA, liés)
├── /how-to-help                    Comment aider (hub de toutes les façons de donner)
│   ├── /how-to-help/advocacy       Plaidoyer (pétitions)
│   ├── /how-to-help/donor-advised-fund, /give-stock, /employee-matching-gifts …
│   ├── /leave-a-legacy             Legs
│   └── /partners                   Partenariats entreprises et fondations
│       ├── /partners/employee-engagement, /grantmaking, /cause-marketing
│       └── /partners/contact
├── /donate                         Formulaire de don (gabarit sans menu)
│   ├── /donate/become-monthly-giver           Formulaire mensuel
│   └── /donate/{campagne}?source=…            Formulaires de campagne (tracés)
├── /become-a-monthly-giver         Page d'argumentaire du don mensuel
├── /annualreport → /annual-reports/2025       Rapport annuel en ligne
├── /contact-us                     Contact (aiguillage + formulaire)
│   └── /contact-us/admin-offices, /contact-us/visa-verification-letter
├── /tenders                        Appels d'offres fournisseurs
├── /explore-our-websites           Sites pays / langues (FR pour RDC, Niger…)
└── /search                         Recherche (Solr)
```

**Profondeur** : 3 niveaux maximum. **Logique** : 4 hubs de navigation = 4 questions du visiteur (« qui êtes-vous ? », « que faites-vous ? », « où ? », « que puis-je faire ? »). Les contenus « froids » (finances, éthique, confidentialité, appels d'offres, contact) vivent dans le footer.

**Équivalent APSUD proposé** : même logique à 4 portes, en français : *L'ONG / Nos actions / Nos zones / Agir avec nous* + bouton *Faire un don*. Voir §13.

---

## 3. Gabarit global

### 3.1 Pile des bandeaux en haut de page (de haut en bas)

| Ordre | Bloc | Rôle | Comportement |
|---|---|---|---|
| 1 | **Lien d'évitement** « Skip to main content » | Accessibilité | Visuellement masqué, visible au focus, cible `#main` |
| 2 | **Eyebrow** (bandeau cyan pleine largeur) | Annonce institutionnelle (ici : changement de nom) — phrase d'accroche en gras + phrase + lien « Read more » | Bouton fermer ; fermeture mémorisée **7 jours** (localStorage) ; hauteur exposée en variable CSS `--eyebrow-height` pour décaler le header fixe |
| 3 | **Header** (navigation principale) | Logo, 4 portes, recherche, Donate | Fixe (`position: fixed`), blanc opaque, 5,25 rem (84 px) |
| 4 | **Bannière de géolocalisation** | Propose la version Europe aux visiteurs européens | Modale centrée avec voile ; « Oui » / « Non merci » |
| 5 | **Barre de reprise de don** | Si un don a été commencé puis abandonné : « Terminez votre don de [montant] » | Boutons « Je suis prêt » / fermer |
| 6 | **Alerte de campagne** (`c-alert--secondary`) | Campagne du moment (ex. don triplé) : titre court + 1 phrase + petit bouton | Fermable |
| 7 | **Pop-up « lightbox »** (`<dialog>`) | Campagne (GivingTuesday) : image, titre, texte, « Donate now » / « No thank you » | Déclencheur : temps (0 s) ou défilement 50 % ; délais de ré-affichage paramétrables (7 jours après accept/refus) |

**Équivalent APSUD proposé** :
- Garder **lien d'évitement** + **un seul bandeau eyebrow** paramétrable depuis l'admin (ex. « Nouveau site APSUD — découvrez nos projets 2026 » ou « Urgence : inondations à … — soutenez la réponse »), fermable, mémorisé 7 jours.
- Garder **une alerte de campagne** optionnelle (type de contenu « Annonce », §14) — désactivée par défaut.
- **Pas** de géolocalisation ni de reprise de don (pas de paiement en ligne au départ).
- **Pop-up** : à proscrire au chargement (mauvais pour la 3G et l'accessibilité) ; si utilisé, déclenchement au défilement 50 % uniquement, une fois par 30 jours, et jamais sur mobile < 768 px.

### 3.2 Header (desktop ≥ 768 px)

Structure (gauche → droite), conteneur de 20 colonnes centré :
1. **Logo** horizontal SVG (symbole + nom + mention « formerly Mercy Corps » en petit, à côté) → lien accueil (`title="Home"`, `rel="home"`).
2. **4 groupes** centrés, titres-liens cliquables (le titre mène au hub) : *Who we are · What we do · Where we work · How to help*. Typo display grasse, ~20 px.
3. **Actions** à droite : icône loupe (lien `/search`, pas de champ inline) + bouton **Donate** plein (vert pétrole foncé, texte blanc).

**Méga-menu « tiroir commun »** (CSS `:hover` sur `.c-main-navigation__groups` + classe `has-focused-child` pour le clavier) :
- Au survol de *n'importe quel* titre, un panneau blanc (`drawer-backdrop`) descend sous toute la barre (transition 300 ms, délai 300 ms, courbe `cubic-bezier(0.01,0,0.1,1)`) et **les 4 listes de sous-liens apparaissent en même temps**, chacune sous son titre. La hauteur du tiroir est calculée en JS = la plus longue liste.
- Sous-liens : 5 par groupe, + « View all » sur *How to help*.
- Pas d'images, pas de descriptions dans le méga-menu : uniquement des libellés courts (2-3 mots).

Contenu des groupes :
| Groupe | Sous-liens |
|---|---|
| Who we are | Our leadership · Careers · Research and resources · Blog · Press room |
| What we do | Emergency response · Food and work · Climate · Ventures · Voices of Prosperity |
| Where we work | Africa · Asia · Europe · Latin America · Middle East (ancres de la page carte) |
| How to help | Give monthly · Make a donation · Take a stand · Send a card · Partner with us · View all |

À noter : le **blog, la presse et les carrières sont rangés sous « Qui nous sommes »**, pas dans un menu « Actualités ». Choix délibéré : 4 portes seulement.

**Équivalent APSUD proposé** :
- Logo APSUD (symbole mains + feuilles) + nom complet sur 2 lignes « Action pour la Population / et le Développement Durable » en petit à droite du sigle (même procédé que la mention « formerly »).
- 4 portes : **L'ONG** · **Nos actions** · **Nos zones** · **Agir avec nous** ; loupe ; sélecteur de langue discret « FR / EN » ; bouton **Faire un don** (vert APSUD plein).
- Tiroir commun identique, 4 à 6 liens par colonne (détail §13).
- Header fixe blanc opaque, 72-80 px ; ombre légère seulement après défilement.

### 3.3 Navigation mobile (< 768 px)

- Header réduit : logo + bouton **Donate** (toujours visible) + **burger** à 3 traits.
- Le burger se transforme en croix par rotation des traits (134° / 45°, transitions 500-700 ms) ; ouverture = classe `main-navigation-is-open` sur `<html>` et `<body>` (blocage du défilement de la page).
- Le panneau occupe **tout l'écran** (100 vh), défilement interne, apparition par translation verticale (300 ms).
- Chaque groupe = **accordéon** : le titre reste un lien vers le hub, une icône « + » séparée ouvre/ferme les sous-liens (`c-main-navigation__group--opened`).
- Entrée supplémentaire « Search » visible uniquement sur mobile (`is-mobile-only`).
- Un clic sur un lien referme automatiquement le menu.

Défauts relevés : le burger est un `<span>` (pas un `<button>`, pas d'`aria-expanded`), l'icône d'accordéon n'est pas focusable.

**Équivalent APSUD proposé** : même schéma (plein écran, accordéons, bouton don visible fermé), mais en `<button aria-expanded aria-controls>`, cibles tactiles ≥ 48 px, piège de focus dans le panneau, fermeture par Échap, et en pied de panneau : téléphone cliquable, e-mail, réseaux sociaux, FR/EN.

### 3.4 Footer

Fond « limestone » (beige clair) ; si le dernier bloc de la page est un double CTA de même couleur, le footer reprend sa couleur (JS `footerBackground`) pour fusionner les deux.

| Zone | Contenu |
|---|---|
| **Haut** | Motif décoratif « en escalier » (3 marches, `c-footer-desktop__top-step`) — rappel graphique du logo |
| **Milieu gauche** | Signature institutionnelle en grand (1 phrase-manifeste, 7 mots) |
| **Milieu centre** | 2 colonnes de liens, titres en CAPITALES liens vers le hub : WHO WE ARE (Our leadership, Becoming Prosper Global, Careers, Financials and annual reports, Ethics and policies, Press room, Contact us) · HOW TO HELP (Give monthly, Make a donation, Take a stand, Send a card, Partner with us, Include us in your will) |
| **Milieu** | Réseaux : Facebook, Instagram, LinkedIn (icônes) |
| **Milieu droite** | **Newsletter** « STAY CONNECTED » : e-mail (obligatoire, message d'aide « désinscription à tout moment »), téléphone optionnel avec consentement SMS explicite, bouton « SIGN UP », message de remerciement en place |
| **Bas** | Logo · statut légal + numéro fiscal · Privacy Policy · **Manage cookies** (rouvre le centre de préférences) · Copyright · Explore our websites · **pastille d'efficience** (anneau SVG « 86 % » + phrase + lien) |

**Équivalent APSUD proposé** :
- Signature : le slogan APSUD (« Nous sauvons des vies et accompagnons le développement local », à confirmer — `organisation.json`).
- Colonnes : **L'ONG** (Qui sommes-nous, Gouvernance et équipe, Rapports et transparence, Éthique et protection, Carrières, Appels d'offres) · **Nos actions** (WASH, Sécurité alimentaire, Protection, Société civile, Projets) · **Agir** (Faire un don, Devenir partenaire, Bénévolat/Stages, Contact).
- Bloc **coordonnées** (absent chez Prosper car c'est un site global ; indispensable pour APSUD) : siège Micheline, Bimbo ; B.P. ; téléphones cliquables ; e-mail principal ; horaires.
- Newsletter e-mail seule (pas de SMS) + case de consentement.
- Bas : logo, « ONG nationale de droit centrafricain — Agrément n° … » (à demander), Mentions légales, Confidentialité, **Gérer les cookies**, © APSUD année, et à la place de la pastille 86 % : une **pastille de preuve** APSUD (ex. « 13 projets • 12 préfectures + Bangui » une fois validé).

### 3.5 Bannière cookies

- Outil : **OneTrust** (`onetrust-consent-sdk`). Depuis notre géolocalisation, **aucun bandeau n'est affiché par défaut** (modèle « opt-out » US) ; seul le lien footer « Manage cookies » ouvre le **Centre de préférences** : modale centrée, titre « Privacy Preference Center », texte d'explication, bouton « Allow All », section « Manage Consent Preferences » avec catégories en accordéon (*Strictly Necessary — Always Active*, *Performance*, *Targeting*), lien « Cookies Details » par catégorie, bouton « Confirm My Choices ».
- La version UK/Europe (hreflang `en-gb`) déclenche un bandeau classique.

**Équivalent APSUD proposé** (conforme RGPD/CNIL, exigé par INSTRUCTIONS §4.5) : bandeau **en bas d'écran** (carte flottante à gauche sur desktop, pleine largeur sur mobile), fond blanc, texte court (2 phrases), **3 boutons de même poids visuel** : « Tout refuser » · « Personnaliser » · « Tout accepter » ; le panneau « Personnaliser » reprend le modèle OneTrust (catégories en accordéon, nécessaire toujours actif, interrupteurs) ; lien permanent « Gérer les cookies » au footer ; aucun script de mesure chargé avant consentement.

---

## 4. Grille, gabarits de page et bibliothèque de composants

### 4.1 Grille et largeurs

- Conteneur `l-constrain` sur **20 colonnes** (max ~1600 px) ; points de rupture : **48em (768 px)** — utilisé 291 fois —, **80em (1280 px)**, **90em (1440 px)**, + quelques ruptures fines (30, 37.5, 55em).
- Largeurs de contenu par type de bloc (classe `l-constrain--N-columns`) :

| Bloc | Colonnes sur 20 | Usage |
|---|---|---|
| Texte courant (`c-formatted-text`) | **7** | Colonne de lecture étroite (~65-75 caractères) |
| Texte centré d'intro (`c-centered-text`) | 6, centré | Titre de section + 1 phrase |
| Titre de page, citation, vidéo, image-légende de corps | 10 | |
| Côte à côte image/texte | 12 | |
| Carte (pays) | 9 | |
| Logos partenaires | 9 | |
| Chiffres clés, double CTA, boîtes 2/3 colonnes | 20 | Pleine largeur utile |
| Hero, image héroïque | 100 % | Bord à bord |

**Équivalent APSUD proposé** : reprendre cette **échelle de largeurs nommées** (lecture / intro / média / côte-à-côte / large / plein) dans les tokens plutôt que des colonnes Bootstrap ; c'est elle qui donne le rythme « éditorial » respirant.

### 4.2 Les 5 gabarits de page

| Gabarit | Pages | En-tête | Particularités |
|---|---|---|---|
| **A. Page-hero (campagne)** | Accueil, Blog, How to help, Become a monthly giver | `c-hero` : vidéo ou photo pleine largeur + carte de texte superposée en bas à gauche (H1, texte, bouton) | Pas de fil d'Ariane |
| **B. Page standard** | Who we are, What we do, Careers, Partners, pages thématiques, pages pays, Why give, Pathway… | `l-preface` : fil d'Ariane (si niveau 2) + **H1 seul** (grand, aligné à gauche, 10 colonnes) puis **image héroïque pleine largeur avec légende** dans un cartouche cyan | Corps = blocs paragraphs |
| **C. Page texte institutionnelle** | Financials, Efficiency, Ethics, Privacy, Contact, Media contacts, Benefits | H1 en **7 colonnes**, pas d'image | Sommaire d'ancres (Ethics), listes d'années, formulaires |
| **D. Article** (`l-story`) | Blog, communiqué, ressource | `c-story-header-full` : H1 (+ sous-titre H2 optionnel), image + légende, **date + partage** (Facebook, LinkedIn, e-mail) | Points clés, citations, sujets liés, articles liés |
| **E. Tunnel de don** | /donate, /donate/* | Logo seul, **pas de menu** | 2 colonnes : argumentaire à gauche, formulaire à droite |

### 4.3 Bibliothèque de composants (inventaire relevé sur 50 pages)

| Composant (classe) | Occ. | Description | Réutilisé pour APSUD comme… |
|---|---|---|---|
| `c-hero` | 4 | Média plein écran (vidéo boucle muette `playsinline` + poster, bouton lecture/pause) + carte de texte superposée | Hero accueil + hero don |
| `c-page-title` | 40 | H1 (variantes `--large`, `--article`, `--has-subtitle`) | Titre de toutes les pages |
| `c-breadcrumb` | 13 | Fil d'Ariane, à partir du niveau 2 | Idem |
| `c-caption-image` | 36 | Image + **légende narrative** dans un cartouche coloré (variantes `--hero`, `--bottom`, `--left`, `--right`) | Toutes les photos terrain |
| `c-formatted-text` | 87 | Texte riche (H2/H3, listes, liens, gras) en 7 colonnes | Corps de pages |
| `c-left-aligned-text` / `c-centered-text` | 8 / 11 | Titre de section (H2) ± 1 phrase, aligné gauche ou centré | Intertitres de sections |
| `l-side-by-side` + `c-button-box` | 21 / 40 | Image 4:3 + boîte texte (H3, résumé 1-3 phrases, lien texte), alternance gauche/droite, fondu au scroll | Domaines, projets phares, pages hubs |
| `c-button-box-columns` (2 col.) / `-three-column` | 5 / 3 | Boîtes texte + bouton en grille 2 ou 3, fond coloré | Façons d'agir, liens institutionnels |
| `c-quick-stats` + `c-stat` | 7 / 24 | Grand énoncé + 3-4 chiffres animés (compteur) | Chiffres clés APSUD |
| `c-cta` (`--one-up`, `--image`) | 37 | Panneau d'appel à l'action : 1 phrase + 1 bouton | Fin de page |
| `c-cta-two-up` | 14 | 2 CTA côte à côte (titre de groupe H3 optionnel), variante primaire (foncé) / secondaire (clair) | Fin de page systématique |
| `c-enlarged-quote` (`--image`) | 6 | Citation agrandie + nom + rôle/lieu (± portrait) | Témoignages bénéficiaires/partenaires |
| `c-key-takeaways` | 3 | Encadré « Points clés » (3 puces) en tête d'article | Actualités |
| `c-card` (`--large`, `--medium`) | 2 | Carte histoire : image, H3, résumé, « Read more » ; grille asymétrique | À la une (accueil) |
| `c-tile` + `l-tile-grid` | 110 / 25 | Tuile : image ou date, titre, résumé, bouton texte ; grille de 3 | Listings, contenus liés |
| `c-preview-tiles` | 3 | Tuiles « Dans [pays] » avec résumé | Projets par zone |
| `c-related-articles` | 16 | Titre + 3 tuiles + bouton « See more » vers listing filtré | Bas de pages domaine/zone/projet |
| `c-related-topics` | 3 | Étiquettes-boutons (pays, domaine) | Bas d'article |
| `c-person-teaser` / `c-person-three-column` | 42 / 3 | Portrait, nom (H3), fonction ; grille de 3 | Équipe, CA |
| `l-logo-grid` + `c-logo` | 2 / 14 | Grille de logos cliquables | Partenaires & bailleurs |
| `l-diptych` | 5 | 2 photos côte à côte, grande/petite, légendes 2-3 lignes | Galerie de projet |
| `l-embedded-video` | 6 | Vidéo en 10 colonnes (Acquia DAM) | Vidéo institutionnelle |
| `c-map` / `l-react-map` | 2 / 1 | Carte Google embarquée (pays) ; carte du monde SVG (TopoJSON 110m) avec légende *Active / Concluded* | Carte des préfectures de RCA |
| `c-country-list` | 1 | Liste de pays groupée par région (H3) | Liste des zones |
| `c-efficiency-lockup` | 4 | Anneau % + phrase + lien | Pastille de transparence |
| `c-social-sharing` | 5 | Partage FB / LinkedIn / e-mail | Articles, offres |
| `c-pager` | 3 | Pagination numérotée (9 pages + « Next ») | Listings |
| `c-donation-form` | 2 | Formulaire de don en 3 étapes | Page don (version APSUD simplifiée) |
| `c-file` | — | Lien de téléchargement avec type et poids (« 15.68 MB ») | Rapports |
| `c-alert`, `l-eyebrow`, `c-pop-up` | — | Bandeaux et modale de campagne | Annonces |

---

## 5. Analyse page par page

Convention : chaque page liste ses sections **dans l'ordre d'affichage**, avec *rôle*, *disposition*, *composants*, *CTA* ; puis un bloc **Équivalent APSUD proposé**.

### 5.1 Accueil `/`

**Meta** : titre « Homepage | Prosper Global », description 1 phrase de mission, OG image = logo, JSON-LD `NGO` + `WebSite`.

| # | Section | Rôle | Disposition / composants | CTA |
|---|---|---|---|---|
| 0 | Eyebrow + header + alerte campagne | Annonce + navigation + urgence du moment | Voir §3 | « Read more », « 3X my gift » |
| 1 | **Hero vidéo de campagne** | Émotion + appel au don immédiat | Vidéo boucle muette plein écran (poster webp préchargé `fetchpriority="high"`), bouton lecture/pause en bas à droite ; carte de texte superposée **en bas à gauche** débordant sur une bande colorée : H1 de 6 mots à l'impératif, 1-2 phrases avec un **montant concret** et son effet, bouton en capitales | 1 bouton (couleur d'accent chaude) |
| 2 | **Manifeste + chiffres clés** (`c-quick-stats`) | Dire qui on est en 1 phrase, prouver par 4 chiffres | Énoncé de ~25 mots en très grand (display, pas un titre) sur fond clair ; à gauche le symbole du logo glisse en entrée + une « marche » verticale se déploie ; à droite panneau coloré (cyan) avec **grille 2×2** de chiffres animés : *personnes atteintes / pays / membres d'équipe / % d'équipe locale* ; teaser de 5-8 mots sous chaque chiffre ; animation désactivée si `prefers-reduced-motion` | — |
| 3 | **Histoires à la une** (`c-featured-stories`) | Storytelling récent | H2 « Featured stories » ; grille **asymétrique** : 1 grande carte (~60 %) + 1 moyenne décalée vers le bas ; image, H3, résumé 1 phrase, « Read more » | Bouton secondaire « See more stories » → /blog |
| 4 | **Comment nous travaillons** | Différenciation (local + long terme) | H2 aligné à gauche puis **2 côte-à-côte alternés** (image gauche, puis image droite) ; boîte : H3 de 3-5 mots, 2-3 phrases avec un chiffre (95 %), lien texte | « Learn more » → /who-we-are, /what-we-do |
| 5 | **Initiative-étendard** (Voices of Prosperity) | Leadership d'idées | H2 + 1 côte-à-côte dont le **H3 est une citation** de bénéficiaire entre guillemets | « Find out more » |
| 6 | **Depuis la salle de presse** | Crédibilité médiatique | H2 + 3 tuiles texte (date, titre, résumé tronqué, bouton ; icône « lien externe » pour les passages TV) | « See more news » |
| 7 | **Double CTA** (`c-cta-two-up--secondary`) | Conversion finale | Titre de groupe H3 (« Build lasting change ») + 2 panneaux : don mensuel (foncé) / rapport annuel (clair) | « Explore monthly giving », « Read the latest report » |
| 8 | Footer | | §3.4 | Newsletter |
| — | Pop-up de campagne | Conversion forcée | §3.1 | « Donate now » / « No thank you » |

**Lecture éditoriale** : l'accueil suit l'arc *Urgence (agir) → Identité (croire) → Preuves (chiffres) → Histoires (ressentir) → Méthode (comprendre) → Idées (respecter) → Presse (faire confiance) → Agir (convertir)*. Aucun bloc « nos partenaires » sur l'accueil (ils sont sur /partners) ; aucune liste de projets.

**Équivalent APSUD proposé** (accueil) :
1. **Hero** : vidéo courte (≤ 15 s, ≤ 2 Mo, désactivable, poster AVIF) ou photo terrain (distribution de kits WASH, travaux HIMO) ; carte en bas à gauche : H1 de 5-7 mots (ex. « De l'eau potable, puis l'avenir »), 1 phrase avec un chiffre réel (ex. latrines, bénéficiaires d'un projet), bouton « Découvrir nos actions » + lien secondaire « Faire un don ».
2. **Manifeste + chiffres clés** : la mission APSUD en une phrase (`organisation.json` › mission) + 4 chiffres **validés par APSUD** (pistes : projets menés, préfectures couvertes, bénéficiaires, ONG locales renforcées — `chiffres_cles.deduits`). Le symbole APSUD (mains + feuilles) joue le rôle animé du symbole Prosper.
3. **Projets en cours** (remplace « histoires à la une ») : grande carte PARSOC + carte AgriApps (statut « En cours », bailleur, zone) → « Voir tous les projets ».
4. **Nos domaines d'intervention** : H2 + 3 côte-à-côte alternés WASH / Sécurité alimentaire & moyens de subsistance / Protection, + mention de l'axe transversal Environnement et de l'axe Société civile & localisation.
5. **Carte des zones** (aperçu) : carte de la RCA avec préfectures actives → « Où nous intervenons ».
6. **Témoignage** en citation agrandie (bénéficiaire ou ONG partenaire, prénom + localité).
7. **Partenaires & bailleurs** : bandeau de logos (priorité n°1 du client — INSTRUCTIONS §2) → « Tous nos partenaires ».
8. **Actualités** : 3 tuiles datées → « Toutes les actualités ».
9. **Double CTA** : « Soutenir nos actions » (don) / « Devenir partenaire » (bailleurs, ONG internationales).

### 5.2 Qui nous sommes `/who-we-are` (hub)

| # | Section | Disposition | CTA |
|---|---|---|---|
| 1 | H1 « Who we are » | Gabarit B | — |
| 2 | Image héroïque + légende (prénom, rôle, localité, action) | Plein écran, cartouche cyan | — |
| 3 | Intro en 3 paragraphes : **croyance** (1 phrase-choc), **ce que nous faisons** (1 phrase), **qui nous sommes en chiffres** (3 400 personnes, 30+ pays) | Texte 7 col. | — |
| 4 | Vidéo institutionnelle | 10 col. | — |
| 5 | 3 côte-à-côte alternés : *Rencontrer la direction* (portrait CEO) / *Travailler avec nous* / *Pourquoi donner* | Image G / D / G | Liens « Read more » |
| 6 | Boîtes 2 colonnes : *Finances et rapports* / *Éthique et politiques* | Fond coloré | Boutons « Learn more » |

**Équivalent APSUD proposé** → page **L'ONG** : H1 « Qui sommes-nous » ; photo du staff devant le siège (`a-propos/equipe-staff-apsud-devant-siege.jpg`) + légende ; intro (statut d'ONG nationale indépendante, vision, mission) ; bloc **Vision / Mission / Objectif** en 3 colonnes ; **6 valeurs** (Respect, Solidarité, Responsabilité, Cohérence, Innovation, Partage de savoir) en grille de 3×2 avec icônes maison ; repères historiques (frise, si APSUD fournit les dates) ; côte-à-côte *Gouvernance et équipe* / *Travailler avec nous* / *Nos partenaires* ; boîtes *Rapports et transparence* / *Éthique et protection (PSEA)*.

### 5.3 Notre direction `/who-we-are/our-team` + fiche personne

- H1, fil d'Ariane ; **H2 « Leadership team »** puis grille 3 colonnes de `c-person-teaser` (photo carrée, nom H3, fonction) ; **H2 « Board of Directors »** puis même grille (fonction + pays de rattachement). 76 fiches au total.
- **Fiche personne** (type de contenu `person`) : fil d'Ariane, portrait, nom, fonction, biographie en 3-4 paragraphes (parcours, rôle actuel, approche). OG type `website`.

**Équivalent APSUD proposé** → **Gouvernance et équipe** : H2 *Organes de gouvernance* (Assemblée générale, Conseil d'administration, Commissariat aux comptes… — `gouvernance_citee`) en boîtes texte ; H2 *Coordination* en grille de portraits (Coordonnateur, RAF, Chargée de partenariat et localisation…) ; H2 *Équipes terrain* (bases, effectifs). Fiche personne optionnelle (activée par membre). Données à demander à APSUD (section vide sur le site actuel).

### 5.4 Carrières `/careers` et sous-pages

**/careers** (vitrine) :
| # | Section | Disposition | CTA |
|---|---|---|---|
| 1 | H1 + photo héroïque + légende | Gabarit B | — |
| 2 | Pitch employeur (valeurs : curiosité, courage, bienveillance, collaboration) | Texte 7 col. | — |
| 3 | H2 « Apply now » + liste de 4 portes : bureaux internationaux (Jobvite), **job boards par pays**, consultances, vivier de talents | Liste de liens | Liens externes |
| 4 | Mentions : égalité des chances, **« nous ne demandons jamais de frais »** (anti-arnaque), règles d'usage de l'IA en entretien | Texte en gras d'amorce | — |
| 5 | Vidéo | | |
| 6 | 2 côte-à-côte : *Investir dans nos équipes* (avantages) / *Engagement et efficacité d'équipe* | Alternance | « Learn more » |
| 7 | H2 centré « Meet a few team members » + 3 portraits | Grille 3 | Fiches |

**/careers/national** : liens vers un job board **par pays** (dont *Central African Republic* et *DRC*), regroupés par région (H2).
**/careers/talent-database** : vivier de candidatures spontanées — H4 d'accroche centré, « pourquoi rejoindre » (3 puces), « que se passe-t-il ensuite », notes spéciales (une seule base, anciens employés → autre formulaire).
**/careers/benefits** : liste d'avantages en gras + précision.

**Fiche d'offre (Jobvite, externe)** : en-tête (intitulé, catégorie, lieu) + bouton **Apply** / **Apply later** ; description structurée : *Contexte (Background) → Objet du poste/de la mission → Activités → Livrables → Calendrier → Expérience et compétences requises → Égalité des chances → Sauvegarde et éthique → Avertissement* ; bas : Apply, « Retour aux offres », partage (LinkedIn, Facebook, X, e-mail). **Listing Jobvite** : recherche par mot-clé + filtres *Région / Lieu / Catégorie* ; offres groupées par catégorie métier (Finance, RH, Programmes, MEAL, Opérations…), chaque ligne = intitulé + lieu.

**Équivalent APSUD proposé** → **Carrières** (gérée en interne, type « Offre d'emploi » §14) :
1. H1 + photo d'équipe + accroche employeur (travailler pour une ONG nationale, proximité des communautés) ;
2. **Liste des offres ouvertes** directement sur la page (cartes : intitulé, type de contrat CDD/consultance/stage/bénévolat, lieu — Bangui, Bambari…, date limite avec badge « Clôture dans X jours ») ; filtres *Type / Lieu / Domaine* ; état vide soigné (« Aucune offre ouverte — déposez une candidature spontanée ») ;
3. **Fiche d'offre** reprenant exactement la structure Jobvite ci-dessus + TDR en PDF + modalités de candidature (e-mail dédié ou formulaire avec CV/LM), date limite, mention « APSUD ne demande jamais de frais de candidature », politique PSEA ;
4. **Candidature spontanée / vivier** ;
5. Offres clôturées archivées (non indexées) ;
6. Lien vers **Appels d'offres** (voir 5.21).

### 5.5 Recherche et ressources `/research-resources` + fiche ressource

- **Listing** : H1 ; intro 1 phrase avec liens (partenariats de recherche, contact) ; **filtres en `<select>`** : *Country* (≈ 50 pays dont « Central African Republic ») et *Focus Area* (15 domaines) + bouton « Appliquer » ; grille de tuiles 3 colonnes (image, titre, résumé 1 phrase, « Read more ») ; pagination numérotée.
- **Fiche ressource** : gabarit Article : H1 + **sous-titre H2**, image, date, partage ; **lien de fichier** (`c-file`) avec titre et poids (« 15.68 MB ») ; résumé 2 paragraphes (ce que le rapport examine / ce qu'il trouve) ; « Related research and resources » (3 tuiles).

**Équivalent APSUD proposé** → **Ressources & rapports** : rapports annuels, rapports de projet, études/évaluations, fiches projet, plans stratégiques, politiques (PSEA, anti-fraude) ; filtres *Type de document / Domaine / Année / Préfecture* ; fiche avec bouton de téléchargement indiquant format et poids (essentiel en 3G) + résumé ; éventuellement « Demander le document » pour les documents restreints.

### 5.6 Blog `/blog` + article

**Listing** (gabarit A) :
| # | Section | Disposition |
|---|---|---|
| 1 | **Hero** de l'article-phare (photo/vidéo + carte : titre, chapeau, « Read more ») | Plein écran |
| 2 | Filtres *Country* + *Focus Area* + bouton | Ligne de 2 selects |
| 3 | Grille de tuiles 3 col. × 2 (6 par page) | Image, titre, chapeau, « Read more » |
| 4 | Pagination (`?page=n`, 9 pages visibles + « Next ») | |

**Article** (`/blog/{slug}`, type BlogPosting) :
| # | Section | Détail |
|---|---|---|
| 1 | H1 (6-12 mots, souvent avec deux-points ou citation) | Grand, 10 col. |
| 2 | Photo pleine largeur + légende en cartouche cyan superposé en bas à gauche | |
| 3 | Ligne méta : **date** à gauche, **partage** (Facebook, LinkedIn, e-mail) à droite | |
| 4 | **Encadré « Key takeaways »** : 3 puces, fond beige | Résumé pour lecteur pressé |
| 5 | Corps 7 col. : paragraphes courts (2-4 phrases), intertitres H2 interrogatifs ou descriptifs (« How is … responding? »), liens internes nombreux vers d'autres articles | |
| 6 | Photos intercalées (10 col.) avec légendes narratives | toutes les 3-4 sections |
| 7 | **Citation agrandie** (phrase forte + nom + fonction) | Reprise d'une citation du corps |
| 8 | Chiffres dans le texte (personnes atteintes, litres d'eau, kits) | |
| 9 | **Double CTA de don** contextualisé (« donner mensuellement » / « donner pour [ce pays] ») | Fond foncé |
| 10 | **Related topics** : étiquettes-boutons (pays, domaine) → listing filtré | |
| 11 | **Related articles** : 3 tuiles | |

**Équivalent APSUD proposé** → **Actualités** (type « Actualité » §14) avec catégories : *Actualité terrain, Lancement de projet, Événement/atelier, Communiqué, Plaidoyer* ; mêmes filtres *Zone / Domaine / Catégorie* ; article avec **encadré « En bref »** (3 puces), légendes narratives, citation, encadré « Projet lié » (carte du projet), étiquettes, 3 articles liés, CTA don + partenaire. Partage WhatsApp **en plus** (canal dominant en RCA).

### 5.7 Salle de presse `/press-room`, communiqués, contacts médias

- **Hub** : H1 ; section H2 « News releases and alerts » (3 tuiles texte datées + « See all ») ; section H2 « … in the news » (3 tuiles vers médias externes, titre préfixé par le média « Associated Press: … », icône lien externe) ; **CTA** « Have a media request? » → contacts ; 2 côte-à-côte : *Ressources médias* (photos, vidéos, fiches) / *Rencontrer la CEO* (porte-parole).
- **Communiqué** : gabarit Article sans image : H1, partage, date, chapeau en gras, corps factuel avec sources citées (agences ONU, presse), **appel à l'action en liste** (« toutes les parties doivent… », « les bailleurs doivent… »), mention du nombre d'organisations signataires.
- **Contacts médias** : texte + contacts par spécialité + adresse photos.

**Équivalent APSUD proposé** : pas de « salle de presse » autonome au lancement ; les **communiqués** sont une catégorie d'Actualités ; une page **Presse & médias** légère (contact presse, kit média : logo, fiche de présentation PDF, photos libres de droits, « APSUD dans les médias » = liens externes datés).

### 5.8 Ce que nous faisons `/what-we-do` (hub)

| # | Section | Disposition | CTA |
|---|---|---|---|
| 1 | H1 + photo héroïque légendée | B | |
| 2 | H2 d'intro (formule « répondre à la crise n'est qu'un début ») + 3 paragraphes de positionnement (pas d'aide à distance ; travailler avec les acteurs locaux ; innover) | 7 col. | |
| 3 | H2 aligné gauche « How we work, start to finish » | | |
| 4 | **3 côte-à-côte alternés** = 3 piliers (Urgence / Alimentation & emploi / Climat) ; chaque H3 est un **titre-slogan** (pas le nom technique) | G / D / G | « Learn more » |
| 5 | H2 centré + côte-à-côte initiative-étendard | | « Find out more » |
| 6 | Double CTA « Join us » : domaines d'intervention / stratégie 10 ans | | « Explore our focus areas », « Learn more » |

**Équivalent APSUD proposé** → **Nos actions** : H1 « Nos actions » ; positionnement (de l'urgence au développement local, localisation de l'aide) ; 3 côte-à-côte = **WASH**, **Sécurité alimentaire, moyens de subsistance et stabilisation communautaire**, **Protection** (avec titres-slogans en français, ex. « L'eau d'abord », « Vivre de son travail », « Protéger chaque personne ») ; 4e bloc **Renforcement de la société civile & localisation** (PARSOC, projets 15/18/19) ; bandeau transversal *Protection de l'environnement* ; double CTA *Voir tous les projets* / *Télécharger notre plan stratégique* (si existant).

### 5.9 Pages thématiques `/what-we-do/{domaine}`

Structure commune (ex. urgence, alimentation, climat) :
| # | Section | Détail |
|---|---|---|
| 1 | Fil d'Ariane + H1 **slogan** (« The first response », « Food and work for all ») — le libellé technique n'existe que dans le fil d'Ariane | |
| 2 | Photo héroïque + légende | |
| 3 | Chapeau = reprise du résumé de la boîte du hub (cohérence) | 7 col. |
| 4 | 2 à 4 H2 de fond : historique et références (liens vers articles), priorités (cash, eau), méthode (« locally led »), au-delà de l'urgence | 7 col. |
| 5 | **Related articles** (3 tuiles, filtrées par domaine) + « See more articles » → `/blog?fid=75#grid` | |
| 6 | **Related research and resources** (3 tuiles) + « See more » → `/research-resources?fid=75#grid` | |

Variante **Ventures** : chiffres clés (3 stats : entreprises soutenues, capitaux mobilisés, clients), H2 « famille de fonds » (liste en gras), côte-à-côte « thèse », CTA rapport.

**Équivalent APSUD proposé** → **Page domaine** (type « Domaine d'intervention » §14) : H1 slogan + photo ; chapeau ; H2 *Le contexte en RCA* (besoins, chiffres sectoriels sourcés OCHA/Cluster) ; H2 *Notre approche* ; **chiffres du domaine** (latrines, points d'eau réhabilités, kits distribués — agrégés des projets) ; **Projets du domaine** (cartes, filtre en cours/réalisés) ; citation ; actualités liées ; ressources liées ; CTA.

### 5.10 Domaines d'intervention `/what-we-do/focus-areas`

H1 ; texte d'intro aligné gauche (2 paragraphes) ; `c-view--focus-areas` : **grille de 15 tuiles** (titre seul + image) menant chacune à un listing ; c'est la **taxonomie** utilisée dans les filtres.

**Équivalent APSUD proposé** : inutile en page séparée (3-5 domaines seulement) ; la taxonomie *Domaine* existe en back-office et alimente filtres et pages domaine.

### 5.11 Initiative-étendard `/voices-of-prosperity`

H1 ; photo héroïque ; H2 question (« What does it mean to prosper? ») + méthode chiffrée (personnes interrogées, langues, pays) ; vidéo ; H2 + 3 paragraphes ; **CTA image** plein cadre (« A blueprint for the future » → rapport) ; **citation agrandie** de participant (anonymisée : « participante, ville, pays ») ; **3 tuiles-histoires** avec résumé ; H2 centré + H4 d'accroche ; boîtes 2 col. (partenaires / experts) ; double CTA.

**Équivalent APSUD proposé** : modèle pour une **page « dossier »** réutilisable (ex. « Localisation de l'aide en RCA » autour de PARSOC et des ONG de femmes accompagnées) : question-titre, méthode chiffrée, vidéo/portraits, rapport téléchargeable, citations, histoires, appel aux partenaires. À activer quand APSUD aura un sujet-phare.

### 5.12 Où nous travaillons `/where-we-work` + page pays

**Page carte** :
| # | Section | Détail |
|---|---|---|
| 1 | H1 | |
| 2 | **Carte du monde interactive** (React, TopoJSON world-110m, pays colorés) + légende **Actif / Terminé** | Pleine largeur |
| 3 | Texte : effectifs, % d'équipe locale, programmes définis avec les partenaires locaux, note « liste mise à jour régulièrement » | 7 col. |
| 4 | **Liste des pays par région** (H3 Afrique, Asie, Moyen-Orient, Europe, Amérique latine), ancres `#africa` utilisées par le méga-menu | 7 col. |

**Page pays** (ex. RDC, Niger) :
| # | Section | Détail |
|---|---|---|
| 1 | Fil d'Ariane (« Where we work / DRC ») + H1 nom du pays | |
| 2 | Photo héroïque + légende | |
| 3 | **Phrase-bilan en H3 très grand** : depuis quand, quoi, combien de personnes atteintes l'an dernier | |
| 4 | H2 « The context » + paragraphes (chiffres de déplacés, insécurité alimentaire) | |
| 5 | **Carte Google** embarquée (9 col.) | |
| 6 | H2 « Our impact » + H3 par axe (eau, moyens de subsistance, alimentation, paix) avec chiffres | |
| 7 | Photos légendées + **diptyque** (2 photos, légendes 2 lignes) | |
| 8 | Chiffres clés pays (`c-quick-stats`, 3 stats) — sur Niger | |
| 9 | **Double CTA** (don mensuel / plaidoyer) | |
| 10 | Articles liés + ressources liées (filtrés `cid`) | |

**Équivalent APSUD proposé** → **Nos zones** (type « Zone d'intervention » §14) : **carte de la RCA** (SVG maison des 16 préfectures + Bangui) avec préfectures colorées *projets en cours / réalisés / présence passée*, info-bulle (nombre de projets, domaines) ; liste des zones groupées (Bangui ; Ombella-M'Poko ; Ouaka ; Ouham ; …) ; **page zone** (Bangui, Ouaka-Bambari, Ouham…) : phrase-bilan, contexte, carte locale, projets de la zone, chiffres, photos, actualités ; bureaux/bases présents. Attention : les zones déclarées (4) et observées dans les projets (12 + Bangui) diffèrent — à valider (`organisation.json` › `zones_intervention.note`).

### 5.13 Comment aider `/how-to-help` (hub)

| # | Section | Disposition | CTA |
|---|---|---|---|
| 1 | **Hero** photo + carte : H1 (« changer des vies toute l'année »), 1 phrase | A | « Explore monthly giving » |
| 2 | Double CTA « Take action » : pétitions / carte-hommage | Foncé + clair | « Sign our petitions », « Send a card » |
| 3 | Double CTA « Make a gift » : don ponctuel / legs | | « Make a one-time gift », « Learn more » |
| 4 | Boîtes 3 colonnes ×2 : fonds de dotation, IRA, immobilier, abondement employeur, crypto, actions | Grille 3 | « Learn more » / « Contact us » |
| 5 | Côte-à-côte « Partner with us » | | « Learn more » |

**Équivalent APSUD proposé** → **Agir avec nous** : hero ; double CTA *Faire un don* / *Devenir partenaire* ; boîtes 3 colonnes : *Don en Mobile Money* (Orange Money, Moov Africa/Telecel — à confirmer), *Virement bancaire*, *Don en nature / matériel*, *Bénévolat & stages*, *Mécénat d'entreprise local*, *Diaspora centrafricaine* ; côte-à-côte *ONG et bailleurs : collaborer avec APSUD* (consortium, sous-subvention, localisation).

### 5.14 Faire un don `/donate` (tunnel)

Gabarit E (logo seul, pas de menu ni footer complet) ; **2 colonnes** :
- **Gauche (argumentaire)** : photo + légende datée et créditée (AFP), 3-4 paragraphes courts (besoin → ce que fait le don → urgence en gras italique → espoir), **pastille d'efficience** 86 % + logos de labels (Candid, CharityWatch, Charity Navigator) + phrase de preuve, **alternatives** : téléphone, courrier (PDF à imprimer), crypto, fonds de dotation, « autres façons de donner », mention fiscale.
- **Droite (formulaire `c-donation-form`)** en **3 étapes numérotées** :
  1. *Votre don* : message « Envisagez un don mensuel », bascule **Ponctuel / Mensuel**, **montants préréglés** (ponctuel : 50/75/150/500/1 000 ; mensuel : 15/25/30/50/110), champ « autre montant », case **« couvrir les frais de traitement (+x $) »**, case **don en hommage/mémoire** (nom, e-carte au destinataire) ;
  2. *Type de paiement* : carte, PayPal, Venmo (boutons portefeuilles) ;
  3. *Vos informations* : nom, e-mail, adresse, ville, État/code postal, pays (liste complète), téléphone optionnel + consentement SMS, commentaire optionnel ; bouton final.
- Paramètre `?source=` pour tracer la campagne ; cookie qui mémorise le choix « mensuel ».

**Page d'argumentaire du don mensuel** `/become-a-monthly-giver` : hero « Become a Partner in Prosperity » (le programme de dons mensuels a un **nom de club**) ; histoire du programme ; H3 « Why give monthly? » en 3 raisons en gras ; **chiffres-équivalences** (« X $/mois = nourrir N enfants pendant un an ») ; citation de donateur.

**Équivalent APSUD proposé** → **Faire un don** (le site actuel n'a aucune modalité : `organisation.json` › `don.note`) :
- Gabarit allégé mais **avec** header simplifié (logo + retour) ;
- Gauche : photo terrain + légende, pourquoi donner, **où va votre don** (répartition à fournir par APSUD), preuves (projets, bailleurs institutionnels qui font confiance à APSUD : FH/OCHA, UE, BMZ, PNUD…) ;
- Droite : **sélecteur de canal** en onglets : *Mobile Money* (numéro marchand, instructions pas à pas, référence « DON-APSUD ») / *Virement* (banque, IBAN/RIB — à fournir) / *Depuis l'étranger* (virement international, plateforme tierce ultérieure) / *Don en nature* ; **équivalences** (« 5 000 FCFA = 1 kit d'hygiène » — à valider) ; formulaire « Je signale mon don » (nom, e-mail, montant, canal, référence) pour remerciement et reçu ;
- Mentions : statut, usage des fonds, contact donateurs. Prévoir l'intégration future d'un paiement en ligne (CinetPay, Flutterwave, Stripe) sans changer la structure.

### 5.15 Plaidoyer `/how-to-help/advocacy`

H1 ; texte d'intro ; côte-à-côte par **pétition** (H3 = l'exigence à l'impératif, 1 phrase, bouton en capitales « SIGN THE PETITION ») ; CTA « Would you like to contact Congress? » → « Find your rep ».

**Équivalent APSUD proposé** : non prioritaire ; si besoin, rubrique *Plaidoyer* dans Actualités (positions, déclarations conjointes d'ONG nationales, participation aux clusters).

### 5.16 Partenaires `/partners`

| # | Section | Disposition | CTA |
|---|---|---|---|
| 1 | H1 « Corporate & Foundation Partners » + photo légendée | B | |
| 2 | 2 paragraphes : la collaboration au cœur ; partenariats sur mesure | 7 col. | |
| 3 | **Grille de logos** (8 entreprises/fondations), chaque logo lié à la page partenariat du partenaire | 9 col. | Liens externes |
| 4 | H2 centré « Ways to partner » + boîtes 3 colonnes (engagement salarié, subventions, produit-partage) | | « Learn more » |
| 5 | H2 centré + vidéo d'un partenariat-phare | | |
| 6 | H2 centré « Impact areas » + 3 côte-à-côte (urgence, climat, économie) avec argumentaire « s'associer à nous permet à vos salariés/clients de… » | | |
| 7 | CTA « Interested in exploring a partnership? » | Foncé | « Contact us » |

**Équivalent APSUD proposé** → **Partenaires & bailleurs** (priorité n°1) : H1 ; intro (APSUD partenaire de mise en œuvre de confiance) ; **grille de logos filtrable** par catégorie : *Bailleurs institutionnels* (UE, BMZ, Japon, PNUD, FH/OCHA, CERF, USAID, SIDA, UK Aid, Fonds Bêkou…), *Agences ONU* (UNICEF, ONU Femmes, UNOPS, MINUSCA…), *ONG internationales partenaires* (Oxfam, Welthungerhilfe, Au Secours…), *Partenaires techniques / État* — chaque logo ouvre une **fiche** (nom complet, type, projets financés avec APSUD, période, lien) — voir `partenaires.json` et `docs/memoire/PARTENAIRES.md` pour les règles d'usage des logos ; **chiffres de partenariat** (bailleurs, projets cofinancés) ; H2 *Pourquoi travailler avec APSUD* (ancrage local, connaissance des zones, procédures, redevabilité) ; *Modalités* (mise en œuvre, consortium, sous-subvention, renforcement de capacités) ; CTA *Proposer un partenariat* → formulaire contact catégorie « Partenariat ».

### 5.17 Contact `/contact-us`

Gabarit C : H1 ; H2 « We're here to help. » ; **aiguillage par besoin** sous forme de phrases avec lien : téléphone + horaires, adresse postale pour dons, e-mail donateurs mensuels, visas/attestations d'emploi, **presse → contacts médias**, **appels d'offres → /tenders**, bureaux, **retour communautaire** (plateforme de plaintes Zendesk renvoyée au bon pays) ; puis **formulaire** : Nom, E-mail, Objet, **Catégorie** (liste : général, donateurs, programmes, bénévolat, presse, collecte, retour sur le site), Message ; anti-spam honeypot (+ champ « laisser vide »).

**Équivalent APSUD proposé** → **Contact** : H1 ; colonne gauche : **coordonnées** (siège Micheline-Bimbo, B.P., téléphones cliquables `tel:`, e-mail principal unique à arbitrer, horaires, bouton WhatsApp), **carte** (OpenStreetMap statique légère + lien itinéraire) ; colonne droite : formulaire Nom, E-mail, Téléphone (optionnel), **Catégorie** (Information générale, Partenariat/bailleur, Recrutement, Don, Presse, **Plainte ou signalement** → redirige vers le mécanisme de plaintes), Message, consentement RGPD ; bloc séparé **Mécanisme de gestion des plaintes** (redevabilité envers les communautés, ligne verte/numéro si existant, confidentialité).

### 5.18 Pages de transparence : Financials, Efficiency, Ethics

- **Financials** : H1 7 col. ; 2 phrases d'intro (statut, déductibilité) ; H2 « Audited Financial Statements » + **liste d'années séparées par « | »** (2025 → 2009, chaque année = PDF) ; H2 « IRS Form 990 » idem ; liens vers rapports annuels.
- **Our efficiency** : texte + **3 chiffres** (programmes / administration / collecte, en %) + grille de logos de labels et d'adhésions.
- **Ethics** : H1 ; H2 engagement ; **sommaire d'ancres** (8 entrées : signaler, approche de sauvegarde, comment signaler, anonymat, non-représailles, que se passe-t-il ensuite, politiques) ; définitions des fautes (sauvegarde, fraude/corruption, RH) ; rapports annuels de sauvegarde **en 4 langues** (EN/AR/FR/ES) par année.

**Équivalent APSUD proposé** → **Transparence & redevabilité** : rapports annuels et financiers par année (tableau : année, rapport d'activité, états financiers audités, poids), répartition des dépenses (si fournie), procédures (manuel de procédures, politique d'achats) ; **Éthique & protection** : code de conduite, **PSEA** (prévention de l'exploitation et des abus sexuels), anti-fraude, signalement confidentiel (e-mail dédié, formulaire), non-représailles, sommaire d'ancres. Très attendu par les bailleurs (due diligence).

### 5.19 Rapport annuel en ligne `/annual-reports/2025`

H1 long (titre de rapport + accroche) ; photo + légende ; **lettre de la CEO** (paragraphes, phrase-clé en gras, signature nom + fonction) ; vidéo ; `c-quick-stats` « Impact at a Glance » (4 chiffres) ; H2 + **tuiles « Dans [pays] »** (4 histoires) ; H2 « Continuing our impact, together » ; double CTA **téléchargements** (résumé financier PDF / version imprimable PDF).

**Équivalent APSUD proposé** : **Rapport annuel en ligne** (type « Rapport » avec mode « page ») : mot du Coordonnateur, chiffres de l'année, projets de l'année par zone, bailleurs de l'année, téléchargements. Excellent support de présentation au client.

### 5.20 Autres pages relevées

| Page | Structure | Équivalent APSUD |
|---|---|---|
| **Pathway** (stratégie 10 ans) | H1 ; « mis à jour le … » ; H2 appel à l'action, « notre pourquoi », **3 priorités d'impact** (gras + définition), **3 leviers**, engagements | *Plan stratégique* (si APSUD en a un) sinon section de « Qui sommes-nous » |
| **Why give** | Hero ; « quand on a besoin de nous, nous sommes là » ; 4 chiffres ; H2 impact en crise et au-delà ; diptyque ; preuves | Intégré à la page *Faire un don* (colonne gauche) |
| **Leave a legacy** | Explication, société de légataires, outil partenaire, citation de donateurs | Non pertinent |
| **Prosper Global (rebranding)** | Annonce, vidéo, « pourquoi ce nom », « même organisation », boîtes 2×2 (FAQ, donateurs, presse, initiative), CTA FAQ + communiqué | Modèle pour annoncer le **nouveau site** ou un changement d'identité |
| **Explore our websites** | Liste alphabétique des sites pays avec langue entre parenthèses (dont RDC et Niger en français) | Sélecteur FR/EN suffit |
| **Search** | H1 « Search » + champ + bouton (Solr) | Recherche plein texte sur projets, actualités, offres, ressources |
| **Privacy policy** | H2 politique générale, données collectées (listes), H3 automatiques, droits, contact | *Politique de confidentialité* + *Mentions légales* + *Politique cookies* (inexistantes aujourd'hui) |
| **Tenders** `/tenders` | Intro (égalité de traitement, encouragement des fournisseurs locaux) + liste des appels | **Appels d'offres** : indispensable pour APSUD (marchés de travaux WASH, fournitures) — type §14 |
| **Media resources / contacts** | Accès photos, vidéos, fiches ; contacts | *Presse & médias* |

---

## 6. Ton éditorial et hiérarchie des titres

### 6.1 Hiérarchie

- **Pas de sur-titres (eyebrows) au-dessus des titres** : Prosper n'utilise quasiment jamais de petit label en capitales au-dessus d'un H2. La hiérarchie repose sur la **taille** (H1 énorme, display condensé) et sur les **légendes en cartouche coloré**. Les seules capitales : titres de colonnes du footer, « STAY CONNECTED », certains boutons de campagne.
- **H1** : un seul par page, court ; sur les pages thématiques c'est un **slogan**, le terme technique restant dans le fil d'Ariane et la balise `<title>` (ex. `<title>` « The first response » mais fil d'Ariane « Emergency response »).
- **H2** = sections (souvent 3-6 mots) ; **H3** = titres de boîtes, cartes, personnes ; **H4** = accroches centrées ponctuelles.
- Les chiffres des `c-stat` sont balisés en **H2** (mauvaise pratique sémantique à ne pas reproduire).

**Équivalent APSUD proposé** : on peut ajouter un **sur-titre discret** (ex. « Projet en cours · WASH ») sur les cartes et en-têtes de projets, où il apporte de l'information ; ailleurs, suivre la sobriété Prosper. Chiffres clés en `<p>`/`<strong>` avec `<dl>`.

### 6.2 Ton et procédés

| Procédé | Observation | Règle APSUD |
|---|---|---|
| **Titres courts** | Titres de 2 à 6 mots ; jeux de mots et formules (« Bases covered, climate-ready ») | Titres de 3 à 7 mots, concrets, sans jargon (« WASH » expliqué au premier usage) |
| **Phrases binaires** | Rythme en deux temps, contraste (rapide / plus rapide ; urgence / long terme) | Une phrase-choc en tête de chaque page, puis l'explication |
| **« Nous » / « vous »** | « Nous » pour l'organisation, « vous » pour le donateur (« your gift ») | Idem ; « vous » aussi pour les bailleurs dans Partenaires |
| **Chiffres partout** | Personnes atteintes, %, litres, kits, années d'expérience ; montants concrets dans les CTA de don | Chaque section de preuve porte un chiffre **sourcé et validé** (sinon on ne publie pas) |
| **Prénom + lieu** | Légendes : « Prénom, rôle, fait X à [village], [pays] » ; noms changés signalés par astérisque | Légendes narratives systématiques ; consentement image ; noms changés signalés |
| **Citations** | Toujours attribuées : nom + fonction, ou « participante, ville, pays » | Idem (bénéficiaires, chefs de quartier, ONG partenaires, autorités) |
| **Dignité** | Les personnes sont actrices (« builders, leaders ») ; pas de misérabilisme ; promesse de « prospérer à leurs conditions » | Les communautés centrafricaines agissent ; éviter les images de détresse sans contexte |
| **Verbes d'action** | CTA : Learn more, Read more, Find out more, See more stories, Give monthly, Give now, Sign the petition, Contact us, Download, Explore… | CTA en français : « Découvrir le projet », « Lire l'article », « Voir tous les projets », « Faire un don », « Devenir partenaire », « Postuler », « Télécharger (PDF, 2 Mo) », « Nous écrire » |
| **Longueur des CTA** | 1 à 3 mots ; capitales réservées aux CTA de campagne | 1 à 4 mots ; jamais « Cliquez ici » |
| **Paragraphes** | 2 à 4 phrases ; listes à puces ; liens internes dans le texte | Idem (lecture mobile) |
| **Points clés** | 3 puces en tête des articles | « En bref » en tête des actualités et fiches projet |

---

## 7. Stratégie de conversion

| Levier | Où | Comment |
|---|---|---|
| **Bouton Donate permanent** | Header desktop et mobile (même menu fermé) | Couleur pleine contrastée, toujours à droite |
| **Campagne saisonnière** | Eyebrow, alerte, hero, pop-up | Même message décliné à 4 endroits, paramétré `?source=` pour mesurer |
| **Don mensuel prioritaire** | Hub How to help (hero), fin d'articles, formulaire (« Consider a monthly gift »), club nommé | Le don récurrent est le produit principal |
| **Fin de page = CTA** | Presque toutes les pages | Double CTA (don + autre action) |
| **Preuves de confiance** | Footer, page de don, efficience | % au programme, labels, rapports |
| **Newsletter** | Footer uniquement | E-mail + SMS optionnel |
| **Contact qualifié** | Contact (catégories), Partenaires (formulaire dédié), Presse | Aiguillage par besoin avant le formulaire |
| **Rappel d'abandon** | Barre de reprise de don | Cookie |

**Équivalent APSUD proposé** : l'objectif n°1 d'APSUD n'est pas le don individuel mais la **crédibilité auprès des bailleurs et ONG internationales** (et le recrutement). Hiérarchie de conversion : 1) *Devenir partenaire / contacter* ; 2) *Consulter projets et rapports* (preuve) ; 3) *Postuler / répondre aux appels d'offres* ; 4) *Faire un don* (Mobile Money, diaspora) ; 5) *Newsletter*. Le bouton du header reste « Faire un don » (convention ONG) mais chaque page se termine par un double CTA **« Devenir partenaire » + « Faire un don »**.

---

## 8. Impact, partenaires, rapports

- **Impact** : chiffres agrégés (accueil, why give, rapport annuel, pages pays) + histoires individuelles (blog) + études (centre de ressources). Le triptyque *chiffre → histoire → preuve documentaire* est constant.
- **Partenaires** : uniquement des **entreprises et fondations** sur /partners (grille de logos) ; les bailleurs publics n'ont pas de vitrine (ils apparaissent dans les ressources : consortiums, bulletins).
- **Rapports** : rapport annuel en page web + PDF ; finances par année ; rapports pays en ressources ; rapports de sauvegarde multilingues.

**Équivalent APSUD proposé** : chaque **fiche projet** relie *bailleur(s)* ↔ *zone(s)* ↔ *domaine(s)* ↔ *chiffres* ↔ *photos* ↔ *documents* ; la page Partenaires affiche pour chaque bailleur les projets financés ; les chiffres clés de l'accueil sont **calculés** à partir des projets publiés (ou saisis manuellement, avec source et date).

---

## 9. Listings, filtres, pagination, contenus liés

| Listing | Filtres | Tri | Pagination | Carte |
|---|---|---|---|---|
| Blog | Pays, Domaine (selects + bouton) | Date décroissante | Numérotée, 6/page | Tuile image + titre + chapeau |
| Ressources | Pays, Domaine | Date | Numérotée | Tuile image |
| Communiqués | aucun | Date | « See all » | Tuile texte datée |
| Domaines | — | Alphabétique | — | Tuile titre |
| Pays | Région (groupes) | Alphabétique | — | Lien texte |
| Offres (Jobvite) | Mot-clé, Région, Lieu, Catégorie | Groupé par catégorie | — | Ligne texte |
| Équipe | Groupes (direction / CA) | Alphabétique | — | Portrait |

- Les filtres sont des **paramètres d'URL** (`?cid=8`, `?fid=75`, ancre `#grid`) : les blocs « voir plus » des pages pays/domaines renvoient vers le listing **pré-filtré**.
- Pas de filtre par **statut** (aucun listing de projets chez Prosper).

**Équivalent APSUD proposé** → listing **Projets** (absent chez Prosper, central pour APSUD) : filtres **Statut** (En cours / Réalisés), **Domaine**, **Zone/préfecture**, **Bailleur**, **Année** ; filtres en « puces » cliquables (plus tactiles que des selects) avec compteur, réinitialisation, URL partageable ; vue **grille** + vue **carte** ; tri par date de début ; pagination « Charger plus » (meilleure en 3G que des pages numérotées) ; cartes : photo, badge statut, domaine, titre court, zone, bailleur (logo mini), période.

---

## 10. Accessibilité

**Bonnes pratiques relevées** : lien d'évitement ; `<nav role="navigation" aria-labelledby>` ; `<main>` ; `<footer role="contentinfo">` ; fil d'Ariane avec titre masqué ; textes alternatifs descriptifs sur toutes les photos ; `aria-live="polite"` sur les messages de la newsletter ; libellés masqués visuellement (`visually-hidden`) ; pop-up en `<dialog>` avec `aria-labelledby`/`aria-describedby` ; animations neutralisées sous `prefers-reduced-motion` (compteurs, fondus) ; pagination avec `aria-label` (« Go to page 2 ») ; navigation clavier du méga-menu (`focusin`/`focusout`).

**Défauts relevés** : burger en `<span>` sans `aria-expanded` ; bouton newsletter en `<span role="button">` ; `aria-labelledby` des tuiles contenant du texte au lieu d'un id ; chiffres en `<h2>` ; boutons de tuile `role="button" tabindex="-1"` ; légendes parfois en minuscules forcées dans les `alt`.

**Équivalent APSUD proposé** : reprendre les bonnes pratiques, corriger tous les défauts ci-dessus, viser WCAG 2.2 AA (contrastes du vert #2A8238 à vérifier sur blanc pour le texte courant), focus visible épais, cibles ≥ 44×44 px, `lang="fr"` et `lang="en"` sur les passages anglais, sous-titres pour la vidéo.

---

## 11. SEO et métadonnées

| Élément | Prosper | Équivalent APSUD |
|---|---|---|
| `<title>` | « Titre de page \| Prosper Global » | « Titre \| APSUD — ONG centrafricaine » (accueil : nom complet) |
| `meta description` | **Présente seulement sur ~1 page sur 5** | Obligatoire, champ dédié dans l'admin (avec repli sur le chapeau) |
| Canonical + shortlink | Oui | Canonical oui |
| OpenGraph | `og:site_name`, `og:type` (website/page/article), `og:url`, `og:title`, `og:description`, `og:image` 1200×630 (style d'image dédié) avec `og:image:alt`, `og:updated_time`, `fb:app_id` | Idem + image OG générée par contenu |
| Twitter Cards | **Absentes** | `twitter:card=summary_large_image` |
| JSON-LD | `NGO` (accueil, mais nom et `sameAs` encore « Mercy Corps »), `WebSite`, `WebPage` + `BreadcrumbList`, `BlogPosting` (headline, image, datePublished, author, publisher) ; la page 404 expose un domaine de dev | `NGO` complet (nom, sigle, adresse Bimbo, téléphone, logo, `sameAs` réseaux, `areaServed: Central African Republic`), `BreadcrumbList`, `NewsArticle`/`BlogPosting`, **`JobPosting`** pour les offres (visibilité Google Jobs), `Event` si événements, `Project`→ `CreativeWork`/`Article` |
| hreflang | `en` + `en-gb` sur certaines pages | `fr` (défaut) + `en` + `x-default` |
| Sitemap | **`/sitemap.xml` en 404** | Sitemap XML généré automatiquement + déclaré dans robots.txt |
| robots.txt | Standard Drupal, `Crawl-delay: 30` | Standard, bloquer /admin et recherches |
| URLs | Lisibles, anglaises, par rubrique | Lisibles en français sans accents : `/projets/parsoc`, `/nos-zones/ouaka` |
| Images | `<picture>` avec WebP + JPG, `srcset` 200→ multiples tailles, `loading="lazy"`, poster hero préchargé | AVIF + WebP + JPG, largeurs adaptées, lazy partout sauf hero |

---

## 12. Ce que Prosper fait mal

1. **Emplois externalisés** sur deux plateformes (Jobvite + UltiPro par pays) : rupture de marque et de navigation. → APSUD : offres en interne, `JobPosting`.
2. **Sitemap absent**, meta descriptions manquantes, JSON-LD obsolète (ancien nom) et domaine de développement exposé en 404. → APSUD : SEO technique complet dès le lancement.
3. **Pression au don excessive** (eyebrow + alerte + hero + pop-up immédiate = 4 sollicitations avant de lire) : la capture d'accueil montre la pop-up masquant les chiffres. → APSUD : une seule sollicitation visible à la fois.
4. **Accessibilité inégale** (burger non bouton, faux boutons). → APSUD : composants natifs.
5. **Aucun listing de projets** ni de partenaires institutionnels : la preuve repose sur les articles. → APSUD : les projets et bailleurs sont le cœur du site.
6. **Poids** : vidéo de hero en MP4 lourde + scripts tiers (GTM, New Relic, Convert, OneTrust). → APSUD : budget performance strict pour la 3G.
7. **Adresses e-mail visibles et multiples** : cohérent chez eux, mais APSUD a 6 adresses incohérentes sur son site actuel → arbitrer une adresse principale.

---

## 13. Proposition d'arborescence APSUD

> Langue par défaut : français (`/`), version anglaise sous `/en/` (pages principales, projets et partenaires en priorité). Profondeur max. 3. Les 4 portes du menu sont en gras.

```
/                                         Accueil
├── **L'ONG**  /qui-sommes-nous
│   ├── /qui-sommes-nous                  Qui sommes-nous (hub)
│   ├── /qui-sommes-nous/gouvernance-equipe     Gouvernance et équipe
│   │   └── /equipe/{slug}                Fiche membre (optionnelle)
│   ├── /qui-sommes-nous/transparence     Rapports et transparence
│   ├── /qui-sommes-nous/ethique-protection     Éthique, PSEA, signalement
│   ├── /ressources                       Ressources et rapports (listing)
│   │   └── /ressources/{slug}            Fiche document
│   ├── /carrieres                        Carrières (offres ouvertes)
│   │   └── /carrieres/{slug}             Fiche offre
│   └── /appels-offres                    Appels d'offres
│       └── /appels-offres/{slug}         Fiche appel d'offres
├── **Nos actions**  /nos-actions
│   ├── /nos-actions                      Hub domaines
│   ├── /nos-actions/eau-hygiene-assainissement   WASH
│   ├── /nos-actions/securite-alimentaire         Sécurité alim., moyens de subsistance, stabilisation
│   ├── /nos-actions/protection                   Protection, genre, droits humains
│   ├── /nos-actions/societe-civile-localisation  Renforcement société civile & localisation
│   ├── /projets                          Projets (listing filtrable : en cours / réalisés)
│   │   └── /projets/{slug}               Fiche projet
│   └── /temoignages                      (optionnel) Témoignages
├── **Nos zones**  /nos-zones
│   ├── /nos-zones                        Carte de la RCA + liste
│   └── /nos-zones/{slug}                 Page zone (Bangui, Ombella-M'Poko, Ouaka, Ouham…)
├── **Agir avec nous**  /agir
│   ├── /agir                             Hub (toutes les façons d'agir)
│   ├── /faire-un-don                     Faire un don (bouton du header)
│   ├── /partenaires                      Partenaires & bailleurs
│   │   └── /partenaires/{slug}           Fiche partenaire (optionnelle)
│   ├── /agir/devenir-partenaire          Devenir partenaire (formulaire qualifié)
│   └── /agir/benevolat-stages            Bénévolat & stages
├── /actualites                           Actualités (listing ; dans le menu sous L'ONG ou en lien rapide)
│   └── /actualites/{slug}                Article
├── /presse                               Presse & médias (footer)
├── /contact                              Contact + mécanisme de plaintes (footer + menu mobile)
├── /recherche                            Recherche
├── /mentions-legales, /confidentialite, /cookies   (footer)
└── /rapport-annuel/{année}               Rapport annuel en ligne (quand disponible)
```

**Méga-menu (tiroir commun)** :
| L'ONG | Nos actions | Nos zones | Agir avec nous |
|---|---|---|---|
| Qui sommes-nous | Eau, hygiène, assainissement | Bangui | Faire un don |
| Gouvernance et équipe | Sécurité alimentaire | Ombella-M'Poko | Partenaires & bailleurs |
| Actualités | Protection | Ouaka | Devenir partenaire |
| Ressources et rapports | Société civile & localisation | Ouham | Bénévolat & stages |
| Carrières | **Tous nos projets** | **Toutes nos zones** (carte) | Appels d'offres |
| Transparence | | | Contact |

### 13.1 Sections par page (APSUD)

**Accueil** : (1) eyebrow paramétrable · (2) hero vidéo/photo + carte H1 + 2 CTA · (3) manifeste + 4 chiffres clés · (4) projets en cours (2 cartes asymétriques) · (5) 3 domaines en côte-à-côte alternés · (6) aperçu carte des zones · (7) citation-témoignage · (8) bandeau de logos partenaires & bailleurs · (9) 3 actualités · (10) double CTA partenaire/don · footer.

**Qui sommes-nous** : H1 + photo d'équipe légendée · intro (statut, indépendance) · Vision / Mission / Objectif (3 colonnes) · 6 valeurs (grille 3×2, icônes maison) · historique/repères (frise, si données) · chiffres clés · côte-à-côte alternés : gouvernance & équipe / travailler avec nous / partenaires · boîtes 2 colonnes : transparence / éthique · double CTA.

**Gouvernance et équipe** : H1 · organes de gouvernance (boîtes) · grille portraits coordination · équipes terrain et bases · CTA carrières.

**Transparence** : H1 · intro · tableau des rapports par année (activité, financier, audit) avec poids · répartition des ressources (si fournie) · procédures clés · lien éthique.

**Éthique & protection** : H1 · sommaire d'ancres · code de conduite · PSEA · anti-fraude · signaler (canaux, confidentialité, non-représailles, suite donnée) · documents.

**Nos actions (hub)** : H1 + photo · positionnement · 4 côte-à-côte (WASH, Sécurité alimentaire, Protection, Société civile) · bandeau Environnement transversal · chiffres agrégés · double CTA projets/partenariat.

**Page domaine** : fil d'Ariane + H1 slogan + photo · chapeau · contexte RCA · notre approche · chiffres du domaine · projets du domaine (filtre statut) · citation · actualités liées · ressources liées · double CTA.

**Projets (listing)** : H1 + intro courte · compteurs (X en cours, Y réalisés) · filtres puces (statut, domaine, zone, bailleur, année) · bascule grille/carte · grille de cartes · « Charger plus » · CTA partenariat.

**Fiche projet** : fil d'Ariane · badge statut + domaine (sur-titre) · H1 (titre court) + titre officiel complet en sous-titre · photo héroïque légendée · **fiche d'identité** en encadré latéral (code, période, zones, bailleur(s) avec logo, partenaires de mise en œuvre, budget si publiable, bénéficiaires) · « En bref » (3 puces) · contexte · objectif général et objectifs spécifiques · activités (liste) · résultats (chiffres en `c-stat`) · galerie/diptyque légendé · témoignage · documents (fiche, rapport) · carte des zones du projet · projets similaires (3) · double CTA.

**Nos zones** : H1 · carte RCA interactive + légende (en cours / réalisés) · texte (présence, bases) · liste groupée par préfecture · CTA.

**Page zone** : fil d'Ariane + H1 · photo · phrase-bilan (depuis quand, combien de projets, personnes atteintes) · contexte local · carte · projets de la zone · chiffres · photos · actualités liées · CTA.

**Agir avec nous** : hero · double CTA don/partenariat · boîtes 3 colonnes (Mobile Money, virement, nature, bénévolat, entreprises, diaspora) · côte-à-côte « ONG et bailleurs ».

**Faire un don** : gauche argumentaire + preuves + équivalences ; droite onglets de canaux + formulaire « Je signale mon don » ; FAQ courte (reçu, sécurité, usage des fonds).

**Partenaires & bailleurs** : H1 · intro · chiffres partenariat · grille de logos filtrable par catégorie (fiche au clic) · pourquoi APSUD · modalités de collaboration · témoignage de partenaire · CTA « Proposer un partenariat ».

**Actualités** : article-phare en hero · filtres (catégorie, domaine, zone) · grille 3 colonnes · « Charger plus ». **Article** : H1, photo légendée, date + partage (FB, LinkedIn, WhatsApp, e-mail), En bref, corps, photos, citation, projet lié, étiquettes, 3 liés, double CTA.

**Carrières** : H1 + photo + pitch · offres ouvertes (filtres type/lieu) · état vide · candidature spontanée · avertissement anti-fraude · lien appels d'offres. **Fiche offre** : intitulé, type, lieu, date limite, contexte, missions, livrables, profil, conditions, modalités, documents (TDR), PSEA, partage, « Postuler ».

**Appels d'offres** : H1 + principes (égalité, fournisseurs locaux) · liste (référence, objet, lot, date limite, statut ouvert/clos/attribué) · fiche (DAO en PDF, modalités de dépôt, contact, additifs/éclaircissements, résultats).

**Ressources** : H1 + intro · filtres (type, domaine, année, zone) · tuiles · fiche document (résumé, téléchargement format/poids, projet lié).

**Contact** : coordonnées + carte + WhatsApp · formulaire à catégories · mécanisme de plaintes.

---

## 14. Types de contenu dynamiques

> Conçus pour un panneau d'administration (CMS headless ou back-office sur mesure, cf. décision D1). Champs communs à **tous** les types publiables : `id`, `slug` (auto, éditable), `statut_publication` (brouillon / en relecture / publié / archivé), `date_publication`, `auteur`, `date_maj`, `langue` (fr/en) + lien vers la traduction, **bloc SEO** (`seo_titre`, `seo_description`, `image_og`, `noindex`), `mis_en_avant` (booléen, pour l'accueil), `ordre`. Les champs `*` sont obligatoires. Les sources de données initiales sont indiquées (`data/apsud/…`).

### 14.1 Taxonomies (listes gérées)

| Taxonomie | Valeurs initiales | Utilisée par |
|---|---|---|
| **Domaine d'intervention** (entité riche, §14.4) | WASH ; Sécurité alimentaire, moyens de subsistance et stabilisation communautaire ; Protection ; Renforcement de la société civile & localisation ; (transversal) Environnement | Projets, Actualités, Ressources, Témoignages, Chiffres |
| **Zone** (entité riche, §14.5) | Bangui ; préfectures (Ombella-M'Poko, Ouaka, Ouham, Mbomou, Lobaye, Kémo, Nana-Mambéré, Nana-Gribizi, Bamingui-Bangoran, Basse-Kotto, Ouham-Pendé, Haute-Kotto) ; localités (Bimbo, Bambari, Ippy, Maloum, Boguila, Batangafo, Rafaï…) en hiérarchie | Projets, Actualités, Offres, Ressources |
| **Catégorie d'actualité** | Terrain ; Lancement de projet ; Événement/atelier ; Communiqué ; Plaidoyer ; Vie de l'ONG | Actualités |
| **Type de document** | Rapport annuel ; Rapport financier/audit ; Rapport de projet ; Étude/évaluation ; Fiche projet ; Politique/procédure ; Plan stratégique ; Kit média | Ressources |
| **Type de contrat** | CDI ; CDD ; Consultance ; Stage ; Bénévolat | Offres |
| **Catégorie de partenaire** | Bailleur institutionnel ; Agence ONU ; ONG internationale ; Partenaire technique/État ; Secteur privé ; Réseau/consortium | Partenaires |

### 14.2 Projet *(type central)* — source : `data/apsud/projets.json` (13 projets)

| Champ | Type | Notes |
|---|---|---|
| `titre_court`* | texte (≤ 70 car.) | Utilisé dans cartes et H1 |
| `titre_officiel` | texte long | Titre contractuel complet |
| `sigle` / `code_projet` | texte | ex. PARSOC, code FH |
| `statut`* | liste : en préparation / **en cours** / **réalisé** / suspendu | Calculable à partir des dates, forçable |
| `date_debut`*, `date_fin` | date | Affichage « 2023 – 2025 » |
| `domaines`* | relation multiple → Domaine | |
| `zones`* | relation multiple → Zone | Alimente la carte |
| `lieux_precis` | liste de textes + coordonnées GPS optionnelles | Marqueurs de carte |
| `bailleurs`* | relation multiple → Partenaire (catégorie bailleur) | |
| `partenaires_mise_en_oeuvre` | relation multiple → Partenaire | Consortium, chef de file |
| `budget_montant`, `budget_devise`, `budget_publiable` | nombre, liste (USD/EUR/XAF), booléen | Masqué si non publiable |
| `beneficiaires_total` + `beneficiaires_detail` | nombre + répéteur (catégorie, femmes, hommes, enfants) | |
| `chapeau`* | texte (≤ 300 car.) | Cartes + meta description |
| `en_bref` | 3 puces | Encadré en tête |
| `contexte` | texte riche | |
| `objectif_general` | texte | |
| `objectifs_specifiques` | liste | |
| `activites` | liste (texte + icône optionnelle) | |
| `resultats_chiffres` | répéteur (valeur, unité, libellé, source) | Rendus en chiffres clés |
| `resultats_texte` | texte riche | |
| `image_principale`* | média (+ alt*, légende narrative, crédit) | |
| `galerie` | médias multiples (alt, légende, crédit, consentement) | `data/apsud/images.json` |
| `video` | URL/média | |
| `temoignages` | relation → Témoignage | |
| `documents` | relation → Rapport/Document | |
| `actualites_liees` | relation inverse automatique | |
| `mis_en_avant_accueil` | booléen | |

### 14.3 Actualité

| Champ | Type | Notes |
|---|---|---|
| `titre`* | texte | 6-12 mots |
| `categorie`* | Catégorie d'actualité | |
| `date_publication`* | date | Affichée |
| `chapeau`* | texte ≤ 300 car. | |
| `en_bref` | 3 puces | Encadré « En bref » |
| `image_principale`* | média + alt + légende + crédit | |
| `corps`* | blocs (paragraphe, intertitre, image légendée, diptyque, citation, chiffres, vidéo, fichier, encadré) | Constructeur de blocs = « paragraphs » Prosper |
| `domaines`, `zones` | relations | Filtres + « Sujets liés » |
| `projets_lies` | relation → Projet | Encadré « Projet lié » |
| `auteur_signature` | texte ou relation Membre d'équipe | |
| `cta_fin` | choix (don / partenariat / aucun / personnalisé) | |
| `est_communique` | booléen | Gabarit sans image possible |

### 14.4 Domaine d'intervention

`nom`*, `slug`*, `titre_slogan` (H1), `nom_court` (menu/footer), `icone` (SVG maison)*, `couleur_accent` (token), `image_principale`*, `chapeau`*, `contexte_rca` (texte riche + sources), `approche` (texte riche), `chiffres` (relation → Chiffre clé), `citation` (relation → Témoignage), `ordre`, `est_transversal` (booléen).

### 14.5 Zone d'intervention

`nom`*, `type`* (capitale / préfecture / sous-préfecture / localité), `parent` (relation → Zone), `code_carte`* (identifiant du tracé SVG), `coordonnees` (lat/long), `image_principale`, `phrase_bilan`, `contexte` (texte riche), `presence` (liste : bureau, base, antenne — adresse), `date_debut_presence`, `statut_presence` (active / passée), `chiffres` (relation → Chiffre clé). *Les projets liés et le nombre de projets sont calculés.*

### 14.6 Offre d'emploi

| Champ | Type | Notes |
|---|---|---|
| `intitule`* | texte | |
| `reference` | texte | ex. APSUD/RH/2026/012 |
| `type_contrat`* | Type de contrat | |
| `lieu`* | relation → Zone (+ texte libre) | |
| `projet_lie` | relation → Projet | |
| `domaine` | relation → Domaine | |
| `date_publication`*, `date_limite`* | date/heure | Fermeture automatique, badge « Clôture dans X jours » |
| `nombre_postes`, `duree`, `date_prise_poste` | texte/nombre | |
| `contexte`, `missions`*, `livrables`, `profil_requis`*, `competences`, `conditions` | texte riche | Structure Jobvite |
| `documents` | fichiers (TDR, fiche de poste) | |
| `modalites_candidature`* | choix (formulaire en ligne / e-mail / dépôt physique) + texte + e-mail | |
| `pieces_demandees` | liste (CV, lettre, diplômes, références) | |
| `mentions` | texte par défaut (égalité, PSEA, aucun frais) | Pré-rempli |
| `statut_offre` | ouverte / clôturée / pourvue | Clôturée = archivée, `noindex` |
| → schéma `JobPosting` généré | | |

**Candidature** (si formulaire en ligne) : `offre`*, `nom`*, `email`*, `telephone`*, `cv` (PDF ≤ 5 Mo)*, `lettre`, `pieces`, `consentement`*, `date`, `statut_traitement` (reçue / présélection / entretien / retenue / non retenue). Accès restreint au rôle RH.

### 14.7 Appel d'offres

`reference`*, `objet`*, `type` (travaux / fournitures / services / consultance), `lots` (répéteur), `projet_lie`, `zone`, `date_publication`*, `date_limite_depot`*, `lieu_modalites_depot`*, `dossier_dao` (fichiers)*, `additifs_eclaircissements` (fichiers datés), `contact`, `statut` (ouvert / clos / attribué / annulé), `resultat_attribution` (texte + fichier).

### 14.8 Partenaire / Bailleur — source : `data/apsud/partenaires.json`, `docs/memoire/PARTENAIRES.md`

`nom_complet`*, `sigle`, `categorie`* (taxonomie), `logo_couleur`* (SVG de préférence), `logo_monochrome` (pour bandeaux), `logo_fond_sombre`, `site_web`, `description_courte`, `pays_origine`, `projets` (relation inverse calculée), `periode_collaboration`, `autorisation_usage_logo` (booléen + date + note)*, `afficher_bandeau_accueil` (booléen), `ordre`.

### 14.9 Rapport / Document

`titre`*, `sous_titre`, `type_document`*, `annee`*, `date`, `resume`, `image_couverture`, `fichier`* (PDF) — **poids et format calculés automatiquement** —, `langue`, `projets_lies`, `domaines`, `zones`, `acces` (public / sur demande), `version_web` (relation → page « rapport annuel en ligne », optionnel).

### 14.10 Membre d'équipe

`prenom`*, `nom`*, `fonction`*, `groupe`* (Conseil d'administration / Coordination / Équipe terrain / Assemblée), `photo` (+ alt), `zone_affectation`, `biographie`, `email_public` (optionnel), `linkedin`, `afficher_fiche` (booléen), `ordre`, `porte_parole_presse` (booléen).

### 14.11 Témoignage

`citation`* (≤ 280 car.), `auteur_nom` (ou « nom changé »), `anonymise` (booléen), `auteur_qualite`* (bénéficiaire, leader communautaire, partenaire, autorité, employé), `localite` (relation → Zone), `photo` + `consentement_image`* (booléen + date + justificatif), `projet_lie`, `domaine`, `langue_originale` (sango, français…), `mis_en_avant`.

### 14.12 Chiffre clé

`valeur`* (nombre ou texte, ex. « 12 + Bangui »), `prefixe`, `suffixe` (%, +, k), `libelle`* (5-10 mots), `source`* (projet, rapport, estimation), `date_reference`*, `portee` (globale / domaine / zone / projet), `relation` (selon portée), `mode` (manuel / calculé automatiquement depuis les projets), `valide_par_apsud`* (booléen — non publié sinon), `ordre`, `animation` (booléen).

### 14.13 Annonce (eyebrow, alerte, pop-up)

`type`* (eyebrow / alerte / pop-up), `titre`, `texte`*, `lien_libelle`, `lien_url`, `image` (pop-up), `date_debut`, `date_fin`, `pages_cibles` (toutes / accueil / liste), `declencheur` (pop-up : défilement %), `duree_memorisation_fermeture` (jours), `actif`.

### 14.14 Page éditoriale (pages institutionnelles libres)

`titre`*, `gabarit` (standard / hero / texte), `en_tete` (image + légende ou hero), `corps` (constructeur de blocs : texte, côte-à-côte, chiffres clés, citation, double CTA, grille de boîtes, logos, tuiles liées, vidéo, carte, sommaire d'ancres, fichiers), `parent` (pour le fil d'Ariane).

### 14.15 Paramètres du site (singleton)

Identité (nom, sigle, slogan, logos), coordonnées (adresse, B.P., téléphones, e-mails par usage, horaires, WhatsApp, GPS), réseaux sociaux, **modalités de don** (Mobile Money : opérateurs, numéros, instructions ; banque : intitulé, IBAN/RIB, SWIFT ; équivalences de don), statut légal (agrément, numéro), menus (principal, footer), textes du bandeau cookies, adresses de réception des formulaires par catégorie, mentions légales.

### 14.16 Données entrantes (formulaires, accès restreint)

| Type | Champs | Rôle d'accès |
|---|---|---|
| Message de contact | nom, e-mail, téléphone, catégorie, objet, message, consentement, date, statut (nouveau/traité) | Communication |
| Plainte / signalement | canal, confidentialité, description, localité, contact optionnel, date, suivi | Point focal PSEA uniquement |
| Proposition de partenariat | organisation, type, contact, objet, budget indicatif, message | Direction / partenariats |
| Signalement de don | nom, e-mail, montant, canal, référence de transaction, date, reçu envoyé | Finances |
| Inscription newsletter | e-mail, langue, consentement, date, double opt-in | Communication |
| Candidature | §14.6 | RH |

### 14.17 Rôles et circuit de publication (recommandé)

- **Administrateur** (tout), **Communication** (actualités, pages, témoignages, annonces, médias), **Programmes** (projets, zones, domaines, chiffres — soumis à relecture), **RH** (offres, candidatures), **Logistique/Achats** (appels d'offres), **Finances** (rapports financiers, dons).
- Circuit : brouillon → relecture (Communication) → publication ; historique des versions ; **tout chiffre et toute photo de personne exigent la case de validation/consentement** avant publication.

---

*Fin du document. Prochaine étape suggérée : croiser ce plan avec `PROSPER_TOKENS.md` et `PROSPER_VISUEL.md` pour rédiger `docs/design/DESIGN.md`, puis faire valider l'arborescence §13 et les types de contenu §14 par le développeur.*
