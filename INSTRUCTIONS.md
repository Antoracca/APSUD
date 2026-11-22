# INSTRUCTIONS — Refonte du site APSUD

> **À LIRE EN ENTIER AVANT TOUTE ACTION**, par un humain ou une IA.
> Ce fichier est la source de vérité du projet. Il est mis à jour **à chaque étape terminée et validée** (voir §9 Journal).
> Ne rien créer qui existe déjà : vérifier d'abord §8 (Carte des fichiers) et le Journal.

---

## 0. Règles permanentes (s'appliquent à CHAQUE étape, pour toute IA)

1. **Langue : toujours en français.** Toutes les réponses, tous les commentaires de code, tous les documents et tous les messages au développeur sont en français. Jamais en anglais.
2. **Ordre de travail : d'abord la version « normale » (ordinateur), ensuite le responsive.**
   - Étape A : on termine la version ordinateur standard (1440 px) d'une page ou d'une section, fidèle à Prosper, et on la fait valider.
   - Étape B : passe responsive dédiée, avec des **propriétés CSS natives qui s'ajustent toutes seules** : `clamp()` et unités `vw`/`cqi` pour les tailles, grilles `repeat(auto-fit, minmax(…))`, `flex-wrap`, **requêtes de conteneur** (`@container`), `min()`/`max()`, `aspect-ratio`, `object-fit`, `srcset`/`sizes`. Les `@media` ne servent qu'aux vrais changements de disposition.
   - Formats à vérifier à chaque fois (captures obligatoires) :

     | Appareil | Largeur testée |
     |---|---|
     | Grand écran | 1920 px |
     | Ordinateur moyen | 1440 px (référence) |
     | Petit ordinateur | 1280 px et 1024 px |
     | Tablette paysage / portrait | 1024 px / 768 px |
     | Grand téléphone | 430 px |
     | Téléphone standard | 390 px |
     | Petit téléphone | 360 px |

   - Aucun débordement horizontal, cibles tactiles ≥ 44 px, textes lisibles, images nettes et légères à chaque largeur.
3. **Fidélité à Prosper Global** : fond, forme, couleurs (transposées en vert APSUD), typographie, espacements et **surtout les animations** (apparitions au défilement, glissements, compteurs qui montent à l'arrivée sur la section, transitions de menu, survols).
4. **Vérifier les animations, pas seulement des captures fixes.** Une capture ne montre qu'un instant. On utilise `tools/anim.mjs`, qui enregistre une **séquence d'images** pendant le défilement (début, milieu, fin de chaque animation) et relève, via le protocole DevTools, la **liste des animations réellement jouées** (propriété animée, durée, délai, courbe). On le lance sur Prosper et sur APSUD, et on compare les deux.
5. **Initiative et amélioration** : reproduire fidèlement Prosper, puis proposer et réaliser des améliorations (performance, accessibilité, détails d'animation, idées propres à APSUD), sans jamais casser la fidélité. Les améliorations sont signalées comme telles dans le Journal.
6. Avant de finir une étape : mettre à jour le Journal (§9) et la carte des fichiers (§8).

## 1. Le projet en une phrase

Refaire de zéro le site de l'ONG centrafricaine **APSUD** (site actuel : https://apsud.org/) pour qu'il atteigne le niveau des grandes ONG internationales, en reprenant le **langage de design** de **Prosper Global** (https://www.prosperglobal.org/) et en gardant l'**identité APSUD** (logo vert, couleur verte) et ses **données réelles**.

Objectif commercial : présenter la nouvelle version au client APSUD pour qu'il relance son site. L'ancien site doit apparaître « comme la nuit », le nouveau « comme le jour ».

## 2. Ce qu'on GARDE d'APSUD

- Le logo et la **couleur verte** de la marque (couleur primaire). On peut la nuancer avec **2 à 3 couleurs** complémentaires.
- Toutes les données : identité, à propos, mission, localisation, domaines, **projets réalisés et en cours** (avec images), **partenaires et bailleurs (nom + logo, priorité n°1)**, contact, page de don.
- Base de données de référence : `data/apsud/*.json` + mémoire lisible `docs/memoire/*.md`.

## 3. Ce qu'on REPREND de Prosper Global

Le style de A à Z : typographie (police = très important), structure des pages, hero avec vidéo, header/navbar, footer, dispositions (gauche/droite, vertical/horizontal), rythme, couleurs (transposées en vert APSUD), animations, qualité et traitement des images, responsive, bannière cookies, ton et réflexion éditoriale.
Référence détaillée : `docs/design/reference/` → synthèse applicable : `docs/design/DESIGN.md`.

**Limite** : on reprend le *langage de design*, pas leurs textes, photos ni logo (droits d'auteur). Si leur police est commerciale, on utilise l'alternative libre la plus proche (ou on achète la licence) — voir DESIGN.md.

## 4. Exigences de qualité (non négociables)

1. **Professionnel, aux normes internationales** — doit donner l'impression d'avoir été fait par plusieurs experts (front-end, design, couleur, contenu) qui connaissent les sites d'ONG internationales.
2. **Rien de générique** : ni textes creux, ni composants « template », ni icônes vues partout. On ne doit pas deviner qu'une IA l'a fait.
3. **Icônes SVG maison**, cohérentes avec le style Prosper (grille, épaisseur de trait, terminaisons définies dans DESIGN.md). Pas de Font Awesome / Bootstrap Icons / emojis.
4. **Responsive exemplaire** : desktop optimal ET mobile exceptionnel (mobile-first, cibles tactiles, menu mobile soigné).
5. **Bannière cookies** conforme (accepter / refuser / personnaliser), au style du site.
6. Couleurs, formes, angles/triangles, espacements : **uniformes** partout (tokens uniquement, aucune valeur en dur).
7. Performance adaptée aux connexions de Centrafrique (mobile, 3G) : images AVIF/WebP, lazy-loading, vidéo légère et désactivable.
8. Accessibilité WCAG AA (contrastes, navigation clavier, `prefers-reduced-motion`).

## 5. Architecture du code (règles)

- **Un fichier par chose** : chaque page a son fichier, chaque section sa propre section, chaque composant son propre fichier, **le style à part** du composant. Jamais tout dans un seul fichier.
- Arborescence par couches : `pages/` (routes) → `sections/` (blocs d'une page) → `components/` (briques réutilisables) → `styles/` (tokens, base, utilitaires) → `icons/` (SVG maison) → `data/` (contenu).
- Le contenu ne doit pas être codé en dur dans les composants : il vient de `data/` aujourd'hui, du **back-end / panneau d'administration** demain (projets réalisés/en cours, offres d'emploi, actualités, partenaires…). Concevoir les types de contenu dès maintenant (voir PROSPER_STRUCTURE.md, fin du document).
- Deux volets : **vitrine** (site public) + **partie fonctionnelle** (back-end connecté plus tard, admin pour publier sans développeur).
- Stack technique : **Astro 7 (sortie statique)**, CSS natif à tokens, JS natif par composant. Hébergement **LWS** (dépôt FTP du dossier `dist/`). Pas de panneau d'administration pour l'instant (D1).
- Conventions de code :
  - `src/pages/` une page = un fichier · `src/sections/<page>/` une section = un fichier · `src/components/{layout,ui}/` un composant = `Nom.astro` + `Nom.css` (importé dans le frontmatter) · `src/scripts/` comportements JS · `src/icons/` SVG maison · `src/data/` adaptateurs vers `data/apsud/*.json` · `src/lib/` utilitaires.
  - Classes BEM préfixées comme Prosper : `c-` composant, `l-` mise en page, `u-` utilitaire, `t-` thème de section (`t-coton`, `t-pousse`, `t-foret`…).
  - CSS dans `@layer components` ; **aucune couleur ni taille en dur** : uniquement les variables de `src/styles/tokens.css`.
  - Images : chemins `assets/...` résolus par `src/lib/images.ts` puis `<Picture>` d'Astro (AVIF/WebP automatiques).
  - Le contenu reste visible sans JS ; les animations respectent `prefers-reduced-motion`.
- Lancer en local : `npm run dev` (http://localhost:4321) · construire : `npm run build` → `dist/` · captures : `node tools/shot.mjs <url> <largeur> <hauteur|full> <sortie.png> [port]`.

## 6. Méthode de travail

1. On avance **étape par étape, composant par composant, page par page**. Chaque étape est **validée par le développeur (le client interne)** avant de passer à la suivante.
2. Après chaque étape validée : mettre à jour §9 Journal et §8 Carte des fichiers.
3. Images : le client va fournir **20 à 30+ photos** (actions humanitaires, villages et zones rurales en difficulté, pauvreté, interventions sur le terrain). Elles seront intégrées section par section ; chacune reçoit un alias, un texte alternatif et une mention dans `data/apsud/images.json`. Dossier d'arrivée prévu : `assets/photos-client/` (à trier ensuite).
4. Vidéo hero : recommandation dans DESIGN.md §Vidéo hero. À confirmer avec le client selon la vidéo disponible.
5. Avant de créer un fichier : vérifier qu'il n'existe pas déjà (§8). Pas de doublons.

## 7. Décisions en attente

| # | Sujet | État |
|---|-------|------|
| D1 | Stack technique | ✅ **Validé le 2026-11-21** : Astro statique, hébergement LWS, pas d'admin pour l'instant (back-end plus tard) |
| D2 | Palette finale (vert APSUD + 2 couleurs) | Appliquée par défaut (proposition A) : Vert #2A8238 + Forêt #0B2A1A + Soleil #F4B731 — modifiable en un seul endroit (`src/styles/tokens.css`) |
| D3 | Police | ✅ Mona Sans variable (police réelle de Prosper, licence libre), paquet `@fontsource-variable/mona-sans` |
| D4 | Vidéo en hero (oui/non, quelle vidéo) | À valider — oui en amélioration progressive, ≤ 1,5 Mo, poster d'abord (DESIGN.md §7) |
| D5 | Données d'archives (RIB, anciens contacts, projet Alindao, 60 projets historiques) | **Ne rien publier sans confirmation écrite d'APSUD** |

### 7.1 Proposition de stack

**Ce qu'utilise Prosper Global** : Drupal 11 (thème maison dérivé de Gesso, Sass + webpack, classes BEM `c-` `l-` `u-`), React 19 pour les formulaires de don uniquement, bibliothèque Motion (révélations au scroll), jQuery, OneTrust pour les cookies. Police « Prosper Sans » = **Mona Sans** renommée (licence libre OFL), donc utilisable telle quelle. Détails : `docs/design/reference/PROSPER_TOKENS.md` §1 et §19.

**Pourquoi ne pas copier Drupal** : trop lourd pour l'hébergement actuel d'APSUD (LWS mutualisé = PHP + MySQL, pas de Node permanent) et pour une ONG de cette taille ; leur JS (~110 Ko) est inutile ici.

**Recommandation (option A)** :
| Couche | Choix |
|---|---|
| Vitrine | **Astro 5** en sortie statique : HTML pré-généré, 0 Ko de JS par défaut, un fichier `.astro` par composant, styles à part, routes par fichier. LWS sert le dossier généré sans rien installer. |
| Styles | CSS natif + tokens (`src/styles/tokens.css`), `clamp()` comme Prosper, `@layer`. Pas de Tailwind. |
| JS | Petits scripts natifs par composant (menu, accordéons, compteurs, révélations, vidéo, cookies) : cible ≤ 10 Ko. |
| Contenu phase 1 | `data/apsud/*.json` lus par les Content Collections d'Astro (schémas typés). |
| Admin phase 2 | **WordPress headless** sur `admin.apsud.org` (LWS) : types projet, emploi, actualité, partenaire (+ ACF). Bouton Publier → build automatique → déploiement FTP. Le site public reste statique (rapide et sûr). |

**Variantes** : B = thème WordPress classique écrit à la main (plus simple à exploiter, moins rapide) ; C = Kirby CMS (PHP sans base de données, admin très propre, licence ~99 €/site).

## 8. Carte des fichiers

```
APSUD/
├── INSTRUCTIONS.md            ← ce fichier (source de vérité)
├── CLAUDE.md / AGENTS.md      ← renvoient ici (lecture automatique par les IA)
├── .claude/launch.json        ← serveurs locaux : « apsud-dev » (Astro, port 4321) et « apsud-fichiers » (port 8765)
├── package.json / astro.config.mjs / tsconfig.json ← projet Astro 7 (sortie statique)
├── tools/
│   ├── shot.mjs               ← capture fixe d'une page (Edge headless), port au choix
│   ├── anim.mjs               ← séquence d'images + valeurs pour vérifier une animation
│   ├── overflow.mjs           ← contrôle responsive automatique (débordements, cibles < 44 px, textes < 12 px) sans capture
│   ├── logos-bandeau.mjs      ← logos partenaires SANS FOND pour le bandeau défilant de l'accueil → assets/partenaires/bandeau/
│   └── geo-rca.mjs            ← convertit le GeoJSON des préfectures RCA en chemins SVG
├── public/favicon.svg
├── src/
│   ├── pages/index.astro      ← accueil (assemble les sections)
│   ├── layouts/BaseLayout.astro ← gabarit commun (SEO, polices, header, footer, cookies)
│   ├── sections/paiement/     ← PaymentShell (cadre + récapitulatif), OrangeMoneyForm, CardForm, paymentData
│   ├── sections/home/         ← 9 sections : Hero, Manifesto, FeaturedProjects, HowWeWork, Vision, Zones (carte), RecentProjects, Partners, CtaTwoUp
│   ├── components/layout/     ← SkipLink, Eyebrow, Header (méga-menu + menu mobile), Footer, CookieBanner
│   ├── components/ui/         ← Button, ArrowLink, Icon, Logo, LeafDrop (goutte-feuille), LeafSeal (sceau goutte-feuille + logo, section chiffres), CardBrand (logos des réseaux de cartes, Iconify), CaptionImage, ProjectCard, SideBySide, Tile
│   ├── scripts/               ← reveal, header, eyebrow, counters, hero-video, footer, cookies, partners-filter, zones-map
│   ├── styles/                ← tokens.css (toutes les valeurs) + base.css
│   ├── icons/                 ← ~30 icônes SVG maison (planche : docs/design/icones.html)
│   ├── data/                  ← adaptateurs : site, navigation, home, partners, zones, rca-prefectures.json
│   └── lib/images.ts          ← résout les chemins assets/… pour <Picture>
├── assets/
│   ├── apsud.jpg              ← logo fourni par le client (85×102)
│   ├── apsud/logo/            ← variantes du logo APSUD récupérées
│   ├── apsud/images/          ← images du site actuel (par catégorie / projet)
│   │   └── archives/          ← images retrouvées sur le serveur / dans les archives web (contrôle qualité)
│   └── partenaires/
│       ├── source-apsud/      ← logos tels que sur apsud.org
│       ├── archives-apsud/    ← logos des anciennes versions du site (référence, pas production)
│       ├── hd/                ← versions officielles haute qualité (usage externe)
│       └── bandeau/           ← copies détourées / rognées pour le bandeau défilant (générées, ne pas éditer)
├── data/apsud/
│   ├── organisation.json      ← identité, mission, contact, don, couleurs
│   ├── projets.json           ← tous les projets (réalisés / en cours)
│   ├── projets_historiques.json ← 60 projets 2015-2023 publiés sur l'ancien site (archives, à valider)
│   ├── partenaires.json       ← partenaires & bailleurs + chemins des logos
│   └── images.json            ← catalogue des images (alias, alt, mention)
└── docs/
    ├── memoire/
    │   ├── APSUD_CONTENU.md   ← mémoire lisible du contenu APSUD + audit de l'ancien site
    │   ├── PARTENAIRES.md     ← fiches partenaires & règles d'usage des logos
    │   ├── CONTROLE_QUALITE.md← vérifications + ce qu'il faut demander au client
    │   └── planche-logos.html ← planche visuelle de tous les logos (ouvrir via le serveur local)
    └── design/
        ├── DESIGN.md          ← design system APSUD (tokens, composants, pages)
        ├── icones.html        ← planche des icônes maison
        ├── animations/MESURES.md ← mesures réelles des animations de Prosper (+ images)
        ├── captures/          ← captures d'état du site APSUD (accueil-2026-11-22-desktop.png)
        └── reference/         ← analyse brute de Prosper Global + captures
```

## 9. Journal (mettre à jour à chaque étape)

| Date | Étape | État | Notes |
|------|-------|------|-------|
| 2026-11-21 | 0. Cadrage + fichier d'instructions | ✅ Fait | Consignes du développeur consignées ici |
| 2026-11-21 | 1. Analyse APSUD (contenu, projets, images, partenaires, logos) | ✅ Validé (2026-11-22) | 14 projets (12 réalisés, 2 en cours) + 60 projets historiques ; 62 images ; 36 partenaires/bailleurs dont 24 avec logo (20 fichiers HD) ; vert du logo mesuré **#2A8238**. Contrôle qualité adversarial passé (Wayback Machine incluse). Manques → CONTROLE_QUALITE.md |
| 2026-11-21 | 2. Analyse Prosper Global (structure, tokens, visuel) + DESIGN.md | ✅ Validé (2026-11-22) | Drupal 11 ; police = Mona Sans (libre) ; 16 captures ; DESIGN.md v1 (palette Vert #2A8238 / Forêt #0B2A1A / Soleil #F4B731, 27 composants, 11 patrons de pages, vidéo hero conditionnelle) |
| 2026-11-21 | 3. Validation stack, palette, police | ✅ Fait | Astro statique + LWS, pas d'admin pour l'instant ; palette A ; Mona Sans |
| 2026-11-21 | 4. Mise en place du projet | ✅ Fait | Astro 7.4, tokens, base, polices, icônes maison, outils de capture et d'animation |
| 2026-11-22 | 5. Accueil version ordinateur (1re version) | ✅ **Validé par le développeur le 2026-11-22** | 9 sections + header/méga-menu + footer en escalier + cookies + **carte interactive RCA** (innovation). Reprise le 22/11 : finitions contrôlées ; logos partenaires révélés par un seul déclencheur (bug corrigé) ; bandeau cookies déplacé en bas à droite (il masquait le titre du hero) ; pages de test supprimées ; `tools/shot.mjs` attend désormais la fin des animations. Capture : `docs/design/captures/accueil-2026-11-22-desktop.png` |
| 2026-11-22 | 6. Pages intérieures (version ordinateur) | ✅ **Validé par le développeur le 2026-11-22** | 37 pages sans erreur, aucun lien interne cassé (vérifié par exploration automatique) : qui-sommes-nous (+ équipe, rapports, éthique), projets (liste filtrable + 14 fiches), nos-actions (+ 4 domaines), nos-zones, partenaires (36 organisations), agir, faire-un-don (non transactionnel), partenariat, contact (formulaire sans envoi réel), carrières, appels d'offres, mentions légales, confidentialité, cookies, recherche, 404. Infos manquantes = états vides honnêtes, rien d'inventé. Captures : `docs/design/captures/pages/` |
| 2026-11-22 | 7. Passe responsive (mobile, tablette, petits écrans) | ⏳ En cours | Consigne : rendu « application mobile », aucun débordement, propriétés natives ; pas de captures par format, contrôle automatique des débordements (`tools/overflow.mjs`). Garder tel quel ce qui est déjà correct. État initial (360/768) : 9 pages débordaient (fiches projets, carrières), cibles tactiles trop petites (liens fléchés, fil d'Ariane, footer). 4 agents lancés (socle/composants, accueil, pages ONG-actions-zones-partenaires, pages projets-agir-contact-pratiques). Si interruption : relancer le workflow `apsud-responsive` (run wf_18e10271-0f0). |
| 2026-11-22 | 7b. Corrections accueil : méga-menu, chiffres, animation « sceau » | ✅ Fait (à valider par le développeur) | **Méga-menu** (`Header.css`, `scripts/header.ts`) : le fond du tiroir était écrasé à 1 px (`align-items: center` de la grille) → panneau blanc opaque, filet + ombre (`--shadow-panel`) qui le détachent de la hero. Une seule porte ouverte à la fois : 1re ouverture après 120 ms (`--nav-open-delay`), puis passage d'une porte à l'autre immédiat ; sortie tolérée 180 ms (`--nav-close-grace`) ; clavier (focus = ouverture), Échap, double toucher tablette conservés ; repli sans JS par `:hover`/`:focus-within`. Pas de menu « ENG » sur le site (aucun sélecteur de langue). **Chiffres** (`HomeManifesto.css`) : « 250 000 » débordait sur « 1 900 » (768 px : « 250 0001 900 ») → taille du chiffre plafonnée à 25 % de sa colonne (`--stats-number-fit`, unités cqi), marges et écarts du panneau fluides ; écart mesuré ≥ 26 px aux 8 largeurs. **Animation** (nouveau `LeafSeal.astro/.css`, jetons `--seal-*`) : le contour de la goutte se trace (balayage conique, trait 3 px constant) pendant son glissement, le symbole + « APSUD » l'accompagnent à gauche, l'aplat vert se remplit, le symbole se pose dans le cercle et une onde blanche fait ressortir le logo ; **effet inverse** demandé ensuite : après 1,6 s de pose, le logo ressort (à gauche ≥ 90em, au-dessus en dessous) et la goutte redevient verte, séparée. État fixe (sans JS / mouvement réduit) = état final. Symbole découpé en disque (le carré blanc du JPEG apparaissait sur le Coton). Vérifié : survol et clavier par DevTools, 8 largeurs, `tools/anim.mjs` (1440 et 768 : toutes les animations jouées avec les durées et délais prévus), `tools/overflow.mjs`. Reste hors périmètre : à 768 px la grille du header dépasse de 13 px (logo + 4 portes + actions), préexistant. |
| 2026-11-22 | 7c. Nouvelle photo du hero | ✅ Fait (à valider) | `assets/apsud/images/hero/mains-unies.jpg` (2752 × 1536, copie .jpg du fichier fourni ; **image générée par IA : à remplacer par une vraie photo de terrain APSUD avant la mise en ligne**). Cadrage par jeton `--hero-focus` (52 % 45 %, aussi origine du zoom lent) ; téléphone : photo en portrait 4:5 fondue dans le bloc Forêt (`--hero-ratio-mobile`, `--hero-fade-h`) ; tablette 48–64em : 4:3 (`--hero-ratio-tablet`) pour que le bloc sombre ne couvre plus toute la photo ; `sizes` recalculé (224vw / 134vw) pour servir une image nette aux recadrages. Vérifié aux 8 largeurs, aucun débordement. |
| 2026-11-22 | 7d. Bandeau défilant bailleurs / partenaires (accueil) | ✅ Fait (à valider) | Inspiré du bandeau « Récipiendaire fier de ce prix » d'Alight (vidéo du développeur). `HomePartners.astro/.css` réécrits (l'ancienne grille filtrable est retirée de l'accueil ; `scripts/partners-filter.ts` n'est plus importé nulle part) : titre à gauche avec « partagent » en italique large + double trait de pinceau SVG dessiné à l'apparition ; deux rangées superposées (Bailleurs ← en haut, Partenaires de mise en œuvre → en bas, 12 + 12), logos **sans fond** dans leurs vraies couleurs directement sur un **vert doux** (`--band-bg`, choisi après essai : sur le Pousse vif, FH RCA, CERF, les bleus ONU et WHH devenaient illisibles) ; fond SVG goutte-feuille en contours qui dérive lentement ; entrée et sortie de section **en fondu** (blanc → vert → Coton, formes masquées dans les fondus) pour supprimer les arêtes franches ; défilement continu au survol et au toucher (seul le focus clavier l'arrête, demande du développeur) ; bouton Pause retiré à la demande du développeur ; **appel au don au « juste milieu »**, entre les deux rangées : capsule Forêt « *Et vous ?* — Rejoignez celles et ceux qui rendent possible l'action d'APSUD en Centrafrique » + bouton Soleil « Agir à leurs côtés » (→ /faire-un-don), marche Vert APSUD, texte dans `partnersBand.give` (src/data/home.ts) ; « animations réduites » : rangées balayables sans défilement automatique. Logos chargés immédiatement (en différé ils apparaissaient vides dans la zone rognée). Vérifié : 8 largeurs, `tools/anim.mjs` (pinceau 900 ms, entrée des rangées 1,2 s décalées de 180 ms), `tools/overflow.mjs` sans débordement. |
| 2026-11-22 | 7e. Préparation au déploiement GitHub | ✅ Fait | Correction d'un commentaire CSS mal fermé dans `src/styles/tokens.css` qui empêchait la minification ; `npm run build` génère désormais 38 pages statiques dans `dist/`. `plateforme-consortium/` est exclu du dépôt de la vitrine via `.gitignore`. |
| 2026-11-22 | 7e. Méga-menu : « À la une » réparée et redessinée, refonte intérieure | ✅ Fait (à valider) | **Photo « À la une » absente sur Vercel** : image en `loading="lazy"` dans une colonne rognée tant que le menu est fermé, donc jamais (ou trop tard) chargée selon le navigateur et le réseau → préchargée dès que la page est au repos, et au plus tard à la première ouverture (`scripts/header.ts`). En local sur un build de production elle se chargeait ; à confirmer sur l'URL Vercel (dépôt privé, non consultable). L'étiquette « À la une » était aussi masquée par le fond du panneau (couche créée par son `clip-path`) → `position: relative`. **Carte redessinée** : photo 4:3 plus grande (22rem), dégradé vert nuancé en surimpression (Forêt → Vert APSUD → transparent, `--nav-feature-overlay`), texte posé sur l'image, marche Pousse, zoom lent au survol, rideau puis texte en fondu. **Refonte intérieure** (≥ 90em) : présentation de la porte active sous le logo (titre + phrase, `intro` dans `data/navigation.ts`) ; « Nos zones » : mini-carte des préfectures (zones d'intervention en Pousse) dont la préfecture s'allume en Vert au survol ou au focus de son lien (`zone` dans la navigation, tracés arrondis ~22 Ko) ; sous-liens plus grands (`--fs-nav-link`) et pictogrammes maison pour les 4 domaines d'action. |
| 2026-11-22 | 7f. Paiement des dons (front-end) + logos bailleurs en couleur | ✅ Fait (à valider) | **Page Faire un don** : étape 3 « Modalités » → « **Moyen de paiement** » (cartes de choix Orange Money / Carte bancaire), bouton « Demander les coordonnées » → « **Procéder au paiement** » vers la page du moyen choisi (`?montant=…&devise=…`, aucune donnée personnelle dans l'URL) ; FAQ et mentions mises à jour. **Pages** `/faire-un-don/orange-money` (logo fourni, rogné : `assets/apsud/images/paiement/orange-money.png` ; numéro +236 à 8 chiffres formaté, référence de suivi APS-AAMMJJ-XXXX, 3 étapes, bouton orange de la marque, conversion EUR → FCFA à la parité fixe 655,957) et `/faire-un-don/carte` (bibliothèque **card-validator** de Braintree/PayPal : réseau détecté et logo dans le champ, espacement 4-4-4-4 ou 4-6-5 Amex, Luhn, expiration, cryptogramme 3/4 chiffres ; logos officiels **@iconify-json/logos** : Visa, Mastercard, Amex, Discover, JCB, UnionPay, Diners, Maestro ; CB = co-marquées Visa/Mastercard, pas de logo CB dans le jeu). « Payer » → `/faire-un-don/paiement-en-cours` = **404 provisoire** ; champs carte sans `name`, formulaire sans `action`, valeurs effacées avant la navigation. Mention visible « paiement en cours de mise en service : aucun montant débité » (à retirer au branchement). **À faire au branchement** : remplacer les champs carte par les champs hébergés du prestataire (Stripe Payment Element) pour la conformité PCI et la détection de fraude (3-D Secure, Radar) ; brancher l'agrégateur Mobile Money ; reproduire la capture Orange Money que le développeur doit envoyer. **Logos « Ils ont financé »** (page don) : variante `tone="vert"` d'AgirLogos, logos sans fond en couleur sur le vert doux ; drapeau du Japon redessiné en SVG aux proportions officielles (`assets/partenaires/bandeau/japon.svg`, l'ancien fichier était ovale et flou). Carte « À la une » : ligne d'en-tête crème et lien souligné Soleil (le vert jurait). |
| 2026-11-22 | 7g. Méga-menu visible dès 768 px | ✅ Fait (poussé `9659f7c`) | Entre 48em et 90em, la présentation de la porte active (titre, phrase, mini-carte) et « À la une » passent dans une 3e rangée du panneau sous les liens (tokens `--nav-map-w-md`, `--nav-feature-w-md`, `--nav-feature-ratio-md`). Cause du « manque » en production : écran 1280/1366 sous le seuil 90em. |
| 2026-11-22 | 7h. Paiement par virement bancaire (front-end) | ✅ Fait (à valider) | 3e moyen sur /faire-un-don (logos des 3 banques) et page `/faire-un-don/virement` (`TransferForm.astro/.css`, `scripts/payment-transfer.ts`) : origine **Centrafrique/CEMAC** (RIB : banque, guichet, compte, clé) ou **étranger** (IBAN + BIC/SWIFT), banque **Ecobank, BGFIBank ou BSIC**, affichage en CSS seul (`:has`), motif DON-AAMMJJ-XXXX généré, boutons Copier, montant repris. Logos officiels dans `assets/apsud/images/paiement/banques/` (Ecobank : Wikimedia Commons ; BGFI : Wikipédia ; BSIC : bsicbank.com). **COORDONNÉES PROVISOIRES** dans `paymentData.ts` (codes banque 99901-99903 inexistants, BIC EXEMCFBG00x, clés et IBAN bien formés) + bandeau « Coordonnées d’exemple, à ne pas utiliser » : à remplacer par les vraies après confirmation écrite d'APSUD (D5), puis passer `transferProvisional` à `false`. **Dollar (USD)** ajouté comme 3e devise de don (10/25/50/100) : bascule CSS généralisée, `$` dans les récapitulatifs ; Orange Money convertit au **taux indicatif 1 $ ≈ 600 FCFA** (`XAF_PER_USD` dans `payment-summary.ts`, à remplacer par le taux de l'agrégateur). |
| 2026-11-22 | 7i. « Ils ont financé » complété (page don) | ✅ Fait (à valider) | 4 → **9 bailleurs** (+ Sida, UK Aid, Gavi, PAM, Fonds Bêkou, tous avec logo sans fond) dans `DonateArgument.astro` ; ton « vert » d'AgirLogos fixé à **3 colonnes** à toute largeur (3 rangées pleines, plus de trou) ; la règle auto-fit de `DonateArgument.css` ne s'applique plus qu'au ton neutre. Vérifié aux 8 largeurs, sans débordement. |
| — | 8. Intégration des photos client + vidéo | ⏸ À faire | |
| — | 9. Back-end / panneau d'administration | ⏸ À faire | |

### Consigne du 2026-11-21 (développeur)
« Reproduire fidèlement https://www.prosperglobal.org/ avec toutes les animations, couleurs, styles et formes pour chaque section », en Astro, en local, hébergement LWS conservé, sans page d'administration pour l'instant.
→ On reproduit **la mise en page, les formes, les animations et les comportements** de Prosper section par section, avec **les textes, photos, logos et la palette verte d'APSUD** (pas de reprise de leurs textes, photos ni logo).

## 10. REPRISE — plan du chantier (mis à jour le 2026-11-22, 1 h 45)

**Pour reprendre** : lancer le serveur (`npm run dev`, ou « apsud-dev » dans le panneau navigateur), ouvrir http://localhost:4321, relire ce fichier.
Mode de travail demandé : **rapide**, concentré sur la conception et l'innovation des sections ; les vérifications lourdes sont groupées à la fin (étape D).

### A. Accueil version ordinateur — ✅ terminé et VALIDÉ le 2026-11-22
- Les « images manquantes » vues sur les captures pleine page étaient des captures prises au milieu de l'animation de dévoilement, pas un bug : en navigation réelle tout s'affiche (vérifié).
- Attention : le panneau navigateur de l'application est très petit et ralentit les animations → toujours vérifier avec `tools/shot.mjs` (Edge headless, 1440 × 900).
- **Prochaine action : faire valider l'accueil par le développeur**, puis passer à B.

### B. Pages intérieures — ✅ construites et VALIDÉES le 2026-11-22
- Petits nettoyages à faire : déplacer les 6 pictogrammes des valeurs de `src/sections/ong/icons/` vers `src/icons/` (et les afficher via `Icon`) ; vérifier `astro check` (types).
- Branchements à prévoir plus tard (back-end) : envoi réel du formulaire de contact (`src/scripts/contact-form.ts`, TODO), lettre d'information, offres d'emploi (`src/data/jobs.ts`) et appels d'offres (`src/data/tenders.ts`).
- ⚠ Captures en mode développement : Astro génère chaque image à la première demande (lent avec les originaux de 4–6 Mo) → utiliser une attente de 15 s (`node tools/shot.mjs <url> 1440 full <sortie> <port> 15000`), sinon des photos paraissent vides alors qu'elles s'affichent bien.
- ⚠ Ne lancer qu'UN serveur Astro : si « Another astro dev server is already running », faire `npx astro dev stop`.

### C. Contenus à obtenir du client (bloquant pour la mise en ligne, pas pour le design)
Ajouts du 2026-11-22 : équipe de coordination (noms, fonctions, photos) ; rapports d'activité ; politiques d'éthique / PSEA ; numéros Mobile Money et coordonnées bancaires confirmés par écrit ; agrément, date de création, directeur·rice de publication ; e-mail principal, horaires et GPS du siège ; devise des budgets PARSOC et AgriApps (£ → € ?) ; photos du projet Alindao et légendes manquantes ; confirmation du classement des 36 partenaires et des 22 sans projet publié ; validation de l'axe « Société civile et localisation » comme 4e domaine.
Voir `docs/memoire/CONTROLE_QUALITE.md` : chiffres clés validés (60+, 12 préfectures, 250 000, 1 900 sont **déduits**), logo vectoriel, photos HD (20-30 prévues → `assets/photos-client/`), vidéo hero, modalités de don, e-mail principal, adresse/GPS, agrément, équipe, accord sur l'usage des logos.

### D. À la fin (vérifications lourdes, regroupées)
1. Passe **responsive** sur les 8 largeurs (§0.2) avec propriétés natives.
2. **Animations** : mesure image par image Prosper vs APSUD avec `tools/anim.mjs` (voir `docs/design/animations/MESURES.md`) et alignement.
3. Revue stricte (fidélité, accessibilité, aucune valeur en dur).
4. **Version légère** : budget de poids (PROSPER_TOKENS §19.4), images optimisées, JS minimal, test 3G.
5. `npm run build` puis dépôt FTP du dossier `dist/` sur LWS.
