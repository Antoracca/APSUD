# DESIGN.md — Système de design du futur site APSUD

> **Statut** : proposition v1 du 2026-11-21, **à valider** par le développeur. Les décisions D2 (palette) et D3 (police) d'INSTRUCTIONS §7 sont tranchées ici sous forme de proposition. D4 (vidéo) est argumentée au §7.
> **Sources** : `docs/design/reference/PROSPER_TOKENS.md` (valeurs exactes du CSS/JS de Prosper Global), `PROSPER_VISUEL.md` (relevés dans le navigateur + captures), `PROSPER_STRUCTURE.md` (architecture, gabarits, contenu), `data/apsud/organisation.json` (identité et couleurs APSUD), captures `docs/design/reference/screenshots/`.
> **Pour qui** : un développeur front ou une IA qui code le site. Chaque règle est **actionnable** : un token, une valeur, un comportement. Aucune valeur en dur dans les composants : tout passe par les tokens du §2.10.
> **Droits** : on reprend le **langage** de design de Prosper Global (structure, rythme, typographie, procédés). Aucun texte, photo, logo ni pictogramme de Prosper n'est réutilisé.

---

## Sommaire

0. [Décisions en bref](#0-décisions-en-bref)
1. [Principes et direction artistique](#1-principes-et-direction-artistique)
2. [Tokens](#2-tokens) — couleurs, typographie, espacements, grille, points de rupture, formes, ombres, z-index, mouvement, **bloc `:root` complet**
3. [Iconographie](#3-iconographie)
4. [Composants](#4-composants)
5. [Patrons de pages](#5-patrons-de-pages)
6. [Motion](#6-motion)
7. [Vidéo hero](#7-vidéo-hero)
8. [Responsive et mobile-first](#8-responsive-et-mobile-first)
9. [Accessibilité et performance](#9-accessibilité-et-performance)
10. [Checklist « anti-générique »](#10-checklist-anti-générique)
11. [Questions ouvertes à poser à APSUD](#11-questions-ouvertes)

---

## 0. Décisions en bref

| # | Sujet | Proposition | Pourquoi |
|---|---|---|---|
| D2 | **Palette** | **Vert APSUD `#2A8238`** (couleur du logo, primaire) + **Forêt `#0B2A1A`** (encre et fonds sombres) + **Soleil `#F4B731`** (accent chaud, don et temps forts). Surfaces : **Pousse `#A8E87C`** (vert lumineux, rôle de l'aqua de Prosper), **Coton `#F7F3E8`** (crème chaude), blanc. | Même architecture que Prosper (une encre teintée, une couleur de marque, un aplat lumineux, une crème, une couleur d'action rare), transposée en vert. Tous les couples texte/fond sont vérifiés WCAG (§2.1.4). |
| D3 | **Police** | **Mona Sans** (variable, licence libre SIL OFL 1.1), auto-hébergée, un seul fichier WOFF2. Trois rôles obtenus par l'axe de chasse : Texte (100 %), Condensée (75 %), Titre (75 %, graisse plus forte). | La police « Prosper Sans » **est** Mona Sans renommée (vérifié dans la table `name` des WOFF2, PROSPER_TOKENS §2). On obtient la même typographie **sans licence à acheter**. |
| D4 | **Vidéo hero** | **Oui, en amélioration progressive** : l'image (poster) est le contenu ; la vidéo (6–8 s, 720p, ≤ 1,2 Mo, sans son) n'est chargée que sur écran ≥ 768 px, connexion 4G, sans « économie de données » ni « animations réduites ». | Garde l'émotion du hero Prosper sans pénaliser les visiteurs en 3G (Prosper : 8,6 Mo pour 10 s, inutilisable en RCA). |
| — | **Signature graphique** | La **goutte-feuille** (forme du logo : carré à trois coins arrondis et un coin vif, qui se lit goutte d'eau ou feuille selon son orientation) + les **aplats décalés en escalier** de Prosper. | Remplace le chevron « Amara » de Prosper par une forme née du logo APSUD et de ses métiers (eau, agriculture, environnement). |
| — | **Stack** | Astro statique + CSS natif à tokens + JS natif par composant (PROSPER_TOKENS §19). | Hors du périmètre de ce document ; les composants ci-dessous sont agnostiques. |

---

## 1. Principes et direction artistique

### 1.1 L'idée en une phrase

**Un éditorial humanitaire calme, dense et sûr de lui, ancré en Centrafrique** : de grandes photos documentaires des équipes APSUD et des communautés, des titres en grotesque condensée, une palette verte disciplinée réchauffée par un seul jaune, des aplats qui se décalent comme des marches, et des preuves (projets, chiffres, bailleurs) partout. Le site doit paraître **conçu par une agence qui fait des sites d'ONG internationales**, pas monté à partir d'un gabarit.

### 1.2 Sept principes

1. **La retenue fait le premium.** Une idée par écran, une couleur d'action rare, des angles vifs, aucun effet gratuit. L'impression de qualité vient de la cohérence (PROSPER_VISUEL §8).
2. **La preuve avant la promesse.** Chaque section affirme puis prouve : un chiffre sourcé, un projet, un bailleur, une photo légendée. La cible n°1 est le **bailleur ou l'ONG internationale** qui fait sa *due diligence* (PROSPER_STRUCTURE §7), avant le donateur individuel.
3. **Les personnes ont un prénom et un lieu.** Les légendes sont narratives (« Prénom, rôle, action, localité, préfecture »). Les communautés **agissent** ; pas de misérabilisme.
4. **Le texte n'est jamais posé sur une photo.** Il est toujours dans un aplat plein (hero, légende-cartouche, CTA). Pas de voile sombre, pas de dégradé sur les images.
5. **Le contenu existe sans JavaScript.** Tout est dans le HTML servi. Les animations ne font que *révéler* ou *compter* ; elles ne conditionnent jamais l'affichage (défaut majeur du site actuel, sections vides avec AOS).
6. **Conçu pour la 3G d'abord.** Chaque octet se justifie : une police, peu de JS, images AVIF, vidéo optionnelle.
7. **Un seul système.** Couleurs, espacements, rayons, durées : uniquement des tokens. Un composant = un fichier + son style à part (INSTRUCTIONS §5).

### 1.3 Ce qu'on imite de Prosper (fidèlement)

| Élément | Ce qu'on reprend | Source |
|---|---|---|
| Typographie | Mona Sans en trois rôles (texte / condensée / titre), échelle fluide `clamp()` calibrée 360 → 1600 px, casse de phrase, interlignage serré des titres (1,0–1,15), colonne de lecture de 690 px | TOKENS §2, §4 ; VISUEL §3 |
| Couleur (architecture) | Encre sombre teintée qui sert de texte **et** de fond fort ; aplat lumineux de signature ; crème ; teinte pâle ; couleur d'action chaude réservée | TOKENS §3 |
| Formes | Rayon 4 px sur les contrôles, 0 partout ailleurs ; aucune ombre ; relief par aplats décalés | TOKENS §7, §13 |
| Mise en page | Conteneur 1200 px, gabarit large 1600 px, largeurs nommées (lecture, intro, média, large, plein) ; zigzag image carrée + boîte crème calée en bas ; cartes asymétriques 58,58 / 41,42 | TOKENS §5 ; VISUEL §4 |
| Header | Blanc, opaque, 4 portes + bouton de don, méga-menu « tiroir commun » (toutes les colonnes ensemble, délai 300 ms), menu mobile plein écran en accordéon et en grande typo | STRUCTURE §3.2–3.3 |
| Hero | Média 16:9 pleine largeur + bloc de texte sombre qui chevauche en bas à gauche + barre d'accent de 6 rem ; bouton pause rond de 44 px | TOKENS §14 |
| Footer | Grand aplat lumineux à bord supérieur en escalier, phrase-signature, colonnes de liens, newsletter, pastille de preuve, « Gérer les cookies » | TOKENS §12 ; STRUCTURE §3.4 |
| Interactions | Soulignement qui s'épaissit (1 → 2 px), contour qui s'affirme (1 → 3 px), compteurs, révélation douce (opacité 0,3 → 1), courbes `cubic-bezier` exactes, `prefers-reduced-motion` respecté | TOKENS §9, §10 |
| Éditorial | 4 portes de navigation, chaque page finit par un double CTA puis des contenus liés, encadré « En bref », citations attribuées | STRUCTURE §1, §6 |

### 1.4 Ce qu'on adapte pour APSUD et la RCA

| Prosper | APSUD | Raison |
|---|---|---|
| Aqua électrique `#4AFFF4` | **Pousse `#A8E87C`** (vert lumineux) | Garder le rôle d'aplat de signature, dans la famille verte de la marque |
| Orange flamme `#FF5C12` (urgence) | **Soleil `#F4B731`**, issu du jaune de la façade du siège (`#D8B038`, organisation.json) éclairci | Couleur chaude ancrée dans le réel d'APSUD ; contraste 8,57:1 avec l'encre |
| Chevron « Amara » | **Goutte-feuille** (§1.6) | Forme née du logo (trois feuilles/gouttes) et des métiers |
| Header toujours fixe de ~136 px (bandeau + nav) | Header de 64 px (mobile) / 80 px (≥ 768 px) ; en mobile il **se masque en descendant et revient en remontant** ; le bandeau d'annonce défile avec la page | 136 px fixes mangent 17 % d'un écran de 800 px |
| Vidéo MP4 1080p de 8,6 Mo, une seule source | Poster AVIF ≤ 60 Ko + vidéo optionnelle ≤ 1,2 Mo, conditions strictes (§7) | Connexions 3G, forfaits chers |
| 4 sollicitations au premier écran (bandeau, alerte, hero, pop-up) | **Une seule** annonce visible à la fois ; pas de pop-up au chargement | Respect du visiteur, accessibilité |
| Pas de listing de projets, emplois externalisés | Projets filtrables, partenaires par catégorie, offres d'emploi et appels d'offres gérés sur le site | Ce sont les preuves attendues par les bailleurs |
| Partage Facebook / LinkedIn / e-mail | **WhatsApp en premier**, puis Facebook, LinkedIn, e-mail | Canal dominant en RCA |
| Chiffres balisés en `<h2>`, burger en `<span>` | `<dl>` pour les chiffres, `<button aria-expanded>` partout | Corriger leurs défauts d'accessibilité (STRUCTURE §10) |
| Cookies OneTrust (payant, lourd) | Bandeau maison aux tokens, 3 boutons de même poids | RGPD/CNIL, bailleurs européens, poids |

### 1.5 Ce qu'on évite (liste noire)

- **Clichés « IA » et « template »** : dégradés violet-bleu ou arc-en-ciel, verre dépoli (*glassmorphism*), coins très arrondis (12–24 px), ombres floues flottantes, blobs, illustrations 3D, formes organiques aléatoires, effets néon, grain ajouté.
- **Emojis**, et **icônes de bibliothèques** utilisées telles quelles (Font Awesome, Bootstrap Icons, Boxicons, Remix, Heroicons, Lucide…). Uniquement le set maison du §3.
- **Pictogrammes clichés** : cœur pour le don, poignée de main pour le partenariat, globe pour la langue, ampoule pour l'innovation, silhouette de l'Afrique, mains qui tiennent une pousse, cookie pour les cookies.
- **Mise en page de gabarit** : rangée « 3 colonnes icône + titre + texte » centrée, toutes les sections centrées, carrousel plein écran automatique (le site actuel), compteurs « 100+ » partout, témoignages en carrousel, « Bienvenue sur le site de… ».
- **Mouvement gadget** : apparition en fondu-montée de chaque bloc, parallaxe, défilement détourné (*scroll-jacking*), curseur personnalisé, zoom des images au survol, texte qui défile.
- **Typographie** : capitales sur les titres, menus et boutons ; plus d'une famille ; graisses inutiles chargées (le site actuel charge 3 familles × 14 graisses).
- **Photo** : banque d'images, photos de salle avec vidéoprojecteur, façades plein cadre, enfants en détresse sans contexte ni consentement, filtres, duotone, voiles sombres.
- **Texte creux** : « Ensemble, construisons un avenir meilleur », « Nous sommes passionnés par… ». Chaque phrase doit contenir un fait, un lieu, un chiffre ou une action.

### 1.6 La signature graphique APSUD

#### a) La goutte-feuille

Forme : un carré dont **trois coins sont arrondis à 50 %** et **un coin reste vif**. Les trois arrondis se rejoignent en un cercle : on obtient une forme pleine et douce avec une seule pointe.

- **Pointe en bas à gauche** (0°) : c'est une **feuille** (agriculture, environnement, moyens de subsistance).
- **Pointe en haut** (rotation 135°) : c'est une **goutte d'eau** (WASH).
- **Pointe en bas** (rotation −45°) : c'est un **repère de localisation** (zones).

Elle reprend les trois feuilles/gouttes du logo APSUD sans redessiner le logo. C'est la **seule forme courbe** du système, comme le chevron chez Prosper.

```css
.c-goutte {                      /* composant décoratif, aria-hidden="true" */
  aspect-ratio: 1;
  inline-size: var(--goutte-size, 8rem);
  border-radius: 50% 50% 50% 0;  /* coin vif en bas à gauche = feuille */
  background: var(--goutte-color, var(--color-brand));
}
.c-goutte--eau  { rotate: 135deg; }   /* pointe en haut */
.c-goutte--lieu { rotate: -45deg; }   /* pointe en bas */
```

SVG de référence (viewBox 100 × 100, feuille) : `<path d="M0 100V50a50 50 0 0 1 50-50 50 50 0 0 1 50 50 50 50 0 0 1-50 50Z"/>`

Usages autorisés (et seulement ceux-là) :
1. **Grande goutte** dans la section chiffres clés (rôle du chevron Prosper) : elle glisse en place à l'entrée dans l'écran (§6).
2. **Coin du CTA image** et de la page 404 (grande, en `--color-brand`).
3. **Puce** des listes « En bref » (10 px, `--color-brand`).
4. **Marqueur** du sur-titre (8 px) et des repères de la carte de RCA.
5. **Aplat derrière les pictogrammes thématiques** (§3.3).

Interdits : la déformer, l'utiliser en filigrane, en motif répété, en dégradé, ou en recréer un « faux logo ».

#### b) Les aplats décalés en escalier (« marches »)

Repris de Prosper : de grands rectangles de couleur **orthogonaux**, décalés derrière ou à côté des images et des textes. Exemples : la barre Soleil de 6 rem à gauche du bloc texte du hero ; le petit carré Soleil derrière la légende-cartouche Pousse ; la marche Pousse pâle entre la goutte et le panneau des chiffres ; le bord du footer en trois marches. **Toujours** des rectangles, toujours en tokens de couleur, jamais d'ombre ni de dégradé (un `linear-gradient` à arrêt net est permis pour dessiner une marche).

#### c) Les mots sur bandes

Pour un manifeste ou le poster d'une vidéo : une phrase découpée en 3–4 lignes, chaque ligne posée sur une bande pleine (Coton, Pousse, Soleil, Pousse pâle) décalée en escalier. Utilisation **rare** : une fois par page au maximum.

### 1.7 Direction photo

- **Documentaire, lumière naturelle**, couleurs fidèles, sans filtre, duotone, grain ni voile.
- **L'équipe APSUD sur le terrain**, gilet ou casquette au logo visible : la photo dit « nous sommes sur place » sans texte.
- **Bénéficiaires en action** : construction de latrines, forages, distribution de kits, champs, formations d'ONG locales, réunions communautaires. Plans rapprochés (taille ou poitrine), sujets décentrés pour laisser de l'air.
- **Dignité et consentement** : pas d'enfant en détresse ; consentement image enregistré (champ `consentement_image`, PROSPER_STRUCTURE §14.11) ; noms changés signalés par un astérisque.
- **Cadrages** : 16:9 (hero et en-tête de page), 4:3 (cartes), 1:1 (zigzag en desktop), 3:2 (actualités, diptyques), 4:5 (hero en mobile).
- **À exclure** : photos de salle avec vidéoprojecteur, façades plein cadre, captures d'écran, logos superposés, texte incrusté.
- Les 20–30 photos du client arrivent dans `assets/photos-client/` ; chacune reçoit un alias, un `alt` descriptif et une légende narrative dans `data/apsud/images.json`.

### 1.8 Logo

- Le logo actuel n'existe qu'en JPEG 85 × 102 px. **Demander le fichier source** ; à défaut, le vectoriser fidèlement (SVG, couleurs exactes `#2A8238` et teinte chair des mains), **sans le modifier**, puis le faire valider par APSUD.
- En-tête : symbole + sigle « APSUD », suivis à droite du nom complet sur deux lignes en petit (« Action pour la Population / et le Développement Durable », Mona Sans 500, 11–12 px, `--color-text-muted`), comme la mention secondaire du logo Prosper. Le nom complet disparaît sous 400 px de large.
- Versions à produire : couleur sur fond clair, monochrome Forêt, monochrome blanc (sur Forêt), symbole seul (favicon 32/180/512, `icon.svg`).
- Zone de protection : la hauteur du « A » d'APSUD tout autour. Taille minimale : 32 px de haut pour le symbole.

---

## 2. Tokens

> Trois niveaux : **primitives** (valeurs brutes, `--apsud-*`), **sémantiques** (rôles, `--color-*`, `--font-*`…), **composants** (rares, `--button-*`, `--header-*`). Les composants n'utilisent **que** les sémantiques et les tokens de composant. Le bloc complet à copier est au §2.10.

### 2.1 Couleurs

#### 2.1.1 Logique de la palette

| Prosper (rôle) | Valeur Prosper | APSUD | Valeur APSUD | Justification |
|---|---|---|---|---|
| Encre + fond fort | `#003634` | **Forêt 900** | `#0B2A1A` | Vert-forêt quasi noir (teinte 149°), jamais de noir pur ; 15,44:1 sur blanc |
| — (pas d'équivalent : la marque Prosper *est* l'aqua) | — | **Vert APSUD 500** | `#2A8238` | Vert exact du logo (mesuré sur 2 303 pixels, organisation.json). Couleur primaire : bouton principal, logo, goutte-feuille, carte |
| Accent lumineux de signature | `#4AFFF4` | **Pousse 300** | `#A8E87C` | Vert jeune et lumineux ; grands aplats (bandeau d'annonce, panneau des chiffres, footer), texte Forêt dessus (10,66:1) |
| Fond doux (pierre) | `#F5F4EA` | **Coton** | `#F7F3E8` | Crème plus chaude (latérite, coton) ; boîtes du zigzag, sections alternées |
| Aplat clair d'accent (paille) | `#E4FFC3` | **Pousse 100** | `#E3F7CF` | Teinte pâle pour marches, CTA clair, survols d'icônes |
| Action / urgence | `#FF5C12` | **Soleil 400** | `#F4B731` | Jaune du siège APSUD ; don, campagne, badge « En cours », barre du hero ; toujours avec texte Forêt (8,57:1) |
| Texte secondaire | `#557978` / `#AABCBB` | **Mousse** | `#4D6457` | Gris-vert lisible (6,41:1 sur blanc). Prosper utilisait `#AABCBB` pour les dates (1,9:1 : **échec**), on corrige |
| Erreur | `#C8102E` | **Erreur** | `#B42318` | 6,57:1 sur blanc |

Pourquoi pas le vert du site actuel `#1BBD36` : il ne correspond pas au logo et **échoue** avec du texte blanc (2,51:1). Le vert du logo `#2A8238` passe (4,83:1).

Pourquoi pas une 3ᵉ couleur « latérite » (ocre-rouge) : testée, elle entre en conflit avec le Soleil et l'Erreur et dilue la discipline « une seule couleur chaude ». Elle reste disponible pour la cartographie si nécessaire (§11).

#### 2.1.2 Primitives

| Token | Hex | HSL | Usage principal |
|---|---|---|---|
| `--apsud-foret-950` | `#061B10` | 149° 64 % 6 % | Survol du bouton Forêt, fond du sous-footer sombre éventuel |
| `--apsud-foret-900` | `#0B2A1A` | 149° 58 % 10 % | **Encre** : texte, titres, bordures de contrôles, fonds sombres |
| `--apsud-vert-800` | `#14431F` | 134° 54 % 17 % | Bouton primaire actif, texte sur Pousse si besoin |
| `--apsud-vert-700` | `#1B5A28` | 132° 54 % 23 % | Survol du bouton primaire, texte des badges « Réalisé » |
| `--apsud-vert-600` | `#226E30` | 131° 53 % 28 % | **Texte vert** sur clair (liens actifs, succès) — le 500 est trop clair sur Coton |
| `--apsud-vert-500` | `#2A8238` | 130° 51 % 34 % | **Couleur de marque** (logo) : bouton primaire, goutte-feuille, carte |
| `--apsud-vert-400` | `#4FA557` | 126° 35 % 48 % | Vert lisible sur Forêt (5,04:1) |
| `--apsud-vert-300` | `#8BCB84` | 114° 41 % 66 % | Données (carte, graphiques) |
| `--apsud-vert-200` | `#BDE3B5` | 110° 45 % 80 % | Filets décoratifs verts |
| `--apsud-vert-100` | `#DDF0D7` | 106° 45 % 89 % | Fond du badge « Réalisé » |
| `--apsud-vert-50` | `#EFF8EC` | 105° 46 % 95 % | Fond de message de succès |
| `--apsud-pousse-700` | `#77BC4B` | 97° 46 % 52 % | Pousse actif |
| `--apsud-pousse-600` | `#8FD462` | 96° 57 % 61 % | Survol des boutons Pousse |
| `--apsud-pousse-300` | `#A8E87C` | 96° 70 % 70 % | **Aplat de signature** |
| `--apsud-pousse-100` | `#E3F7CF` | 90° 71 % 89 % | Marches, CTA clair, survol d'icônes |
| `--apsud-soleil-800` | `#8A5E00` | 41° 100 % 27 % | **Texte jaune-ocre** sur clair (5,70:1 sur blanc), rare |
| `--apsud-soleil-700` | `#C4870A` | 40° 90 % 40 % | Soleil actif |
| `--apsud-soleil-600` | `#E0A01A` | 41° 79 % 49 % | Survol des boutons Soleil |
| `--apsud-soleil-400` | `#F4B731` | 41° 90 % 57 % | **Accent chaud** |
| `--apsud-soleil-100` | `#FCEBC2` | 42° 91 % 87 % | Sélection de texte, surlignage, fond « à noter » |
| `--apsud-coton` | `#F7F3E8` | 44° 48 % 94 % | **Fond doux** |
| `--apsud-sable` | `#ECE4D0` | 43° 42 % 87 % | Fond doux appuyé (footer bas, alternance dans le Coton) |
| `--apsud-blanc` | `#FFFFFF` | — | Fond de page |
| `--apsud-mousse` | `#4D6457` | 146° 13 % 35 % | Texte secondaire |
| `--apsud-lichen` | `#7A8C80` | 140° 7 % 51 % | Texte désactivé **sur fond sombre uniquement**, icônes décoratives |
| `--apsud-ligne` | `#C9D3CB` | 132° 10 % 81 % | Filets décoratifs (séparateurs de listes, tableaux) |
| `--apsud-erreur` | `#B42318` | 4° 76 % 40 % | Erreur |
| `--apsud-erreur-100` | `#FCE8E6` | 5° 79 % 95 % | Fond de champ en erreur |

#### 2.1.3 Sémantiques (thème clair)

| Token | Valeur | Rôle |
|---|---|---|
| `--color-bg` | blanc | Fond de page |
| `--color-surface-soft` | coton | Sections alternées, boîtes du zigzag, encadrés |
| `--color-surface-sand` | sable | Bas du footer, survol de ligne de tableau |
| `--color-surface-signature` | pousse-300 | Bandeau d'annonce, panneau des chiffres, footer, légende-cartouche |
| `--color-surface-tint` | pousse-100 | Marches, CTA clair, survol d'icônes sociales |
| `--color-surface-strong` | foret-900 | Bloc texte du hero, CTA sombre, sections inversées |
| `--color-surface-warm` | soleil-100 | Surlignage, encadré « à noter » |
| `--color-text` | foret-900 | Texte, titres, liens |
| `--color-text-muted` | mousse | Dates, métadonnées, aides de champ |
| `--color-text-inverse` | coton | Texte sur Forêt (13,92:1) |
| `--color-text-brand` | vert-600 | Texte vert sur clair |
| `--color-brand` | vert-500 | Logo, goutte-feuille, bouton primaire |
| `--color-accent` | soleil-400 | Barre du hero, carré de légende, CTA de don |
| `--color-link` | foret-900 | Liens (couleur du texte) |
| `--color-link-decoration` | vert-500 | Couleur du soulignement des liens |
| `--color-border-control` | foret-900 | Bordures des champs, boutons contour, cases (≥ 3:1 requis) |
| `--color-border-subtle` | ligne | Filets décoratifs |
| `--color-focus` | foret-900 | Anneau de focus sur clair |
| `--color-focus-inverse` | pousse-300 | Anneau de focus sur Forêt |
| `--color-selection-bg` / `-text` | soleil-100 / foret-900 | `::selection` |
| `--color-success` / `-bg` | vert-600 / vert-50 | Validation |
| `--color-error` / `-bg` | erreur / erreur-100 | Erreur |
| `--color-warning-text` / `-bg` | soleil-800 / soleil-100 | Avertissement (« Clôture dans 3 jours ») |
| `--color-disabled-bg` / `-text` | sable / mousse | Bouton désactivé |

**Thèmes de section** (repris des `has-theme-*` de Prosper) : une classe de section redéfinit localement les sémantiques. Les composants n'ont pas à connaître le fond.

| Classe | Fond | Texte | Accent | Focus | Bouton principal |
|---|---|---|---|---|---|
| `.t-blanc` (défaut) | blanc | Forêt | Soleil | Forêt | Vert APSUD / blanc |
| `.t-coton` | Coton | Forêt | Soleil | Forêt | Vert APSUD / blanc |
| `.t-pousse` | Pousse 300 | Forêt | Forêt | Forêt | Forêt / Pousse |
| `.t-pousse-pale` | Pousse 100 | Forêt | Vert APSUD | Forêt | Vert APSUD / blanc |
| `.t-foret` | Forêt 900 | Coton | Soleil | Pousse | Pousse / Forêt |

#### 2.1.4 Contrastes vérifiés (WCAG 2.2)

Calculés avec la formule de luminance relative WCAG (script `scratchpad/scripts/contrast.mjs`). AA texte courant ≥ 4,5 ; AA grand texte (≥ 24 px, ou ≥ 18,66 px gras) et composants d'interface ≥ 3 ; AAA ≥ 7.

| Texte / premier plan | Fond | Ratio | Verdict | Usage autorisé |
|---|---|---|---|---|
| Forêt 900 | Blanc | **15,44** | AAA | Tout texte |
| Forêt 900 | Coton | **13,92** | AAA | Tout texte |
| Forêt 900 | Sable | **12,18** | AAA | Tout texte |
| Forêt 900 | Pousse 300 | **10,66** | AAA | Tout texte (footer, bandeau, chiffres) |
| Forêt 900 | Pousse 100 | **13,58** | AAA | Tout texte |
| Forêt 900 | Soleil 400 | **8,57** | AAA | Bouton de don, badge « En cours » |
| Forêt 900 | Soleil 600 (survol) | **6,77** | AA | Bouton de don au survol |
| Forêt 900 | Soleil 100 | **13,09** | AAA | Surlignage |
| Coton | Forêt 900 | **13,92** | AAA | Texte sur fond sombre |
| Blanc | Forêt 950 | **17,92** | AAA | Survol sombre |
| Pousse 300 | Forêt 900 | **10,66** | AAA | Bouton sur fond sombre, liens actifs sur sombre |
| Soleil 400 | Forêt 900 | **8,57** | AAA | Accent sur sombre |
| Blanc | **Vert APSUD 500** | **4,83** | AA | **Bouton primaire** (texte 17–19 px gras) |
| Blanc | Vert 600 (survol) | **6,29** | AA | Bouton primaire au survol |
| Blanc | Vert 700 (actif) | **8,27** | AAA | Bouton primaire actif |
| Vert 600 | Blanc / Coton | **6,29 / 5,67** | AA | Texte vert sur clair |
| Vert APSUD 500 | Coton | 4,36 | AA grand texte seulement | **Interdit** en texte courant sur Coton : utiliser Vert 600 |
| Vert APSUD 500 | Blanc | 4,83 | AA | Texte vert possible sur blanc, préférer Vert 600 |
| Vert 400 | Forêt 900 | 5,04 | AA | Texte vert sur sombre |
| Vert 700 | Vert 100 | **6,90** | AA | Badge « Réalisé » |
| Vert 700 | Pousse 100 | **7,27** | AAA | Badge « Ouvert » |
| Mousse | Blanc / Coton / Sable | **6,41 / 5,78 / 5,06** | AA | Texte secondaire |
| Soleil 800 | Blanc / Soleil 100 | **5,70 / 4,84** | AA | Avertissement |
| Erreur | Blanc / Erreur 100 | **6,57 / 5,58** | AA | Messages d'erreur |
| Lichen | Blanc | 3,57 | Échec texte | Décoratif seulement ; sur Forêt : 4,33 (grand texte) |
| Ligne | Blanc | 1,54 | — | Filet **décoratif** uniquement, jamais bordure de contrôle |
| Pousse 300 / Soleil 400 | Blanc | 1,45 / 1,80 | — | Aplats **décoratifs** ; jamais seuls pour porter une information |
| Vert APSUD 500 | Pousse 300 | 3,33 | Composant ≥ 3 | Bouton Vert sur footer Pousse (limite de composant respectée) |
| *Ancien vert `#1BBD36`* | Blanc | *2,51* | *Échec* | *Abandonné* |

Règles qui découlent du tableau :
1. Le texte courant est **toujours** Forêt, Coton (sur sombre), Mousse ou Vert 600.
2. Pousse et Soleil sont des **fonds**, jamais des couleurs de texte sur clair.
3. Toute information portée par une couleur (statut, carte) est **doublée** d'un texte ou d'une forme.
4. Bordures de champs, cases, interrupteurs : Forêt (≥ 3:1). La couleur « Ligne » n'est jamais une bordure de contrôle.

#### 2.1.5 États interactifs

| Élément | Repos | Survol | Actif (`:active`) | Focus visible | Désactivé |
|---|---|---|---|---|---|
| Bouton primaire | Vert 500 / blanc | Vert 600 | Vert 700 | anneau 2 px Forêt, décalé 2 px | Sable / Mousse, `cursor: not-allowed` |
| Bouton de don (Soleil) | Soleil 400 / Forêt | Soleil 600 | Soleil 700 | idem | idem |
| Bouton Forêt | Forêt 900 / Pousse 300 | Forêt 950 | Vert 800 | idem | idem |
| Bouton sur sombre | Pousse 300 / Forêt | Pousse 600 | Pousse 700 | anneau 2 px Pousse, décalé 2 px | Lichen / Forêt 950 |
| Bouton contour | transparent, bordure 1 px Forêt + `outline` 1 px | `outline` 3 px (le contour s'épaissit sans décaler la mise en page) | fond Pousse 100 | anneau | bordure Ligne, texte Mousse |
| Lien | Forêt, soulignement Vert 500 1 px | soulignement 2 px | — | anneau 2 px décalé 2 px | — |
| Puce de filtre | bordure Forêt, fond transparent | `outline` 3 px | — | anneau | texte Mousse, bordure Ligne |
| Puce sélectionnée | Forêt / Pousse + coche | Forêt 950 | — | anneau Forêt décalé 3 px | — |

### 2.2 Typographie

#### 2.2.1 Famille

- **Mona Sans** (GitHub, SIL OFL 1.1), version 2, **variable** : axes `wght` 200–900 et `wdth` 75–125, italique séparé. Sources : `github.com/github/mona-sans` (releases) ou Google Fonts (`family=Mona+Sans:wdth,wght@75..125,200..900`), à **télécharger et auto-héberger** (pas d'appel à Google en production : performance et RGPD).
- **Sous-ensemble** : latin + latin-ext (accents français, `œ`, `«»`, espace fine insécable U+202F, `’`, `–`, `—`, `…`, `€`, symbole de degré). Outil : `pyftsubset` (fonttools) ou `glyphhanger`. Cible : **≤ 70 Ko** pour le romain variable. Par défaut **pas d'italique** (citations, légendes et titres d'ouvrages en romain, comme chez Prosper) : on économise un second fichier. L'italique variable (≤ 45 Ko) ne serait ajouté que si un besoin éditorial réel apparaît ; sinon le navigateur ne doit **pas** synthétiser d'italique (`font-synthesis: none`).
- **Pourquoi c'est fidèle** : « Prosper Sans », « Prosper Sans Condensed » et « Prosper Sans Headline » sont des instances statiques renommées de Mona Sans (PROSPER_TOKENS §2.1). Aucune licence à acheter, aucune « alternative » à trouver.
- **Basculer vers une autre famille** (si APSUD voulait se distinguer de Prosper ou si la police posait problème) : changer uniquement `--font-family-base` et les trois `--font-stretch-*`. Alternatives testées dans les documents de référence, par ordre de proximité :
  1. **Hubot Sans** (GitHub, OFL, axe `wdth` 75–125, mêmes métriques, plus mécanique) : mêmes valeurs d'étirement.
  2. **Archivo** (OFL, axe `wdth` 62–125) : `--font-stretch-condensed: 70%`, `--font-stretch-headline: 62%`, `--fw-headline: 600`.
  3. Si une licence commerciale était un jour achetée (ex. une grotesque propriétaire de fonderie), déclarer la nouvelle `@font-face`, garder les rôles et recaler les trois étirements à l'œil sur les captures `prosper-*.png`.
- **Pile de secours** : `"Mona Sans", "Mona Sans Fallback", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. `"Mona Sans Fallback"` est une `@font-face` locale (Arial) avec `size-adjust`, `ascent-override`, `descent-override` calculés par l'outil de polices d'Astro ou `@capsizecss/metrics`, pour éviter le décalage de mise en page (CLS) au chargement.

```css
@font-face {
  font-family: "Mona Sans";
  src: url("/fonts/mona-sans-vf-latin.woff2") format("woff2-variations");
  font-weight: 200 900;
  font-stretch: 75% 125%;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-024F, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215;
}
/* <link rel="preload" href="/fonts/mona-sans-vf-latin.woff2" as="font" type="font/woff2" crossorigin> */
```

#### 2.2.2 Trois rôles

| Rôle | Token famille | `font-stretch` | Graisses | Usage | Équivalent Prosper |
|---|---|---|---|---|---|
| **Texte** | `--font-text` | `--font-stretch-text: 100%` | 400 courant, 600 accent, 700 gras | Paragraphes, listes, formulaires, légendes, dates, métadonnées | Prosper Sans |
| **Condensée** | `--font-condensed` | `--font-stretch-condensed: 75%` | 700 (titres h3–h6, nav), 800 (boutons, liens d'action) | h3–h6, titres de cartes, navigation, boutons, citations (500), sur-titres | Prosper Sans Condensed (600/800) |
| **Titre** | `--font-headline` | `--font-stretch-headline: 75%` | **600** (`--fw-headline`, à caler entre 560 et 640) | h1, h2, manifeste, chiffres clés | Prosper Sans Headline |

> Calibrage : la Headline de Prosper est plus étroite (classe de chasse OS/2 n° 2) que ce que l'axe de Mona Sans permet (75 % minimum). On compense par une graisse 600 et un interlettrage de −0,01 em. **À vérifier à l'œil** contre `prosper-who-we-are-desktop.png` au premier prototype ; si les titres paraissent trop larges, réduire d'abord la taille max du h1 (75 → 70 px) plutôt que de changer de famille.

#### 2.2.3 Échelle fluide

Toutes les tailles sont des `clamp()` **calibrés de 360 px à 1600 px de large** (même méthode que Prosper ; formules recalculées par `scratchpad/scripts/clamp.mjs`). Les minimums de h1–h3 sont **abaissés** par rapport à Prosper pour le français (mots longs : « assainissement », « Ombella-M'Poko ») : 40 px au lieu de 56 px pour le h1.

| Token | Rôle | Famille / graisse | `clamp()` | px min → max | Interligne | Interlettrage |
|---|---|---|---|---|---|---|
| `--fs-display` | Manifeste (phrase-mission) | Titre 600 | `clamp(2rem, 1.2742rem + 3.2258vw, 4.5rem)` | 32 → 72 | 1,0 | −0,01em |
| `--fs-h1` | Titre de page | Titre 600 | `clamp(2.5rem, 1.8649rem + 2.8226vw, 4.6875rem)` | 40 → 75 | 1,05 | −0,01em |
| `--fs-hero` | Titre du hero (dans le bloc sombre) | Condensée 700 | `clamp(2rem, 1.6371rem + 1.6129vw, 3.25rem)` | 32 → 52 | 1,1 | 0 |
| `--fs-h2` | Section | Titre 600 | `clamp(2.125rem, 1.7802rem + 1.5323vw, 3.3125rem)` | 34 → 53 | 1,1 | 0 |
| `--fs-h3` | Boîte, CTA | Condensée 700 | `clamp(1.75rem, 1.4778rem + 1.2097vw, 2.6875rem)` | 28 → 43 | 1,1 | 0,01em |
| `--fs-h4` | Titre de carte projet | Condensée 700 | `clamp(1.375rem, 1.1935rem + 0.8065vw, 2rem)` | 22 → 32 | 1,15 | 0,01em |
| `--fs-h5` | Titre de tuile, offre | Condensée 700 | `clamp(1.25rem, 1.123rem + 0.5645vw, 1.6875rem)` | 20 → 27 | 1,2 | 0,01em |
| `--fs-h6` | Titre de colonne, groupe de menu | Condensée 700 | `clamp(1.125rem, 1.0161rem + 0.4839vw, 1.5rem)` | 18 → 24 | 1,2 | 0,01em |
| `--fs-stat` | Chiffre clé | Titre 600, chiffres tabulaires | `clamp(2.75rem, 2.0968rem + 2.9032vw, 5rem)` | 44 → 80 | 1,0 | 0 |
| `--fs-quote` | Citation agrandie | Condensée 500 | `clamp(1.5rem, 1.2823rem + 0.9677vw, 2.25rem)` | 24 → 36 | 1,3 | 0 |
| `--fs-lead` | Chapeau, texte du hero | Texte 400 | `clamp(1.125rem, 1.0706rem + 0.2419vw, 1.3125rem)` | 18 → 21 | 1,45 | 0 |
| `--fs-body` | Corps | Texte 400 | `clamp(1rem, 0.9637rem + 0.1613vw, 1.125rem)` | 16 → 18 | 1,5 | 0 |
| `--fs-small` | Métadonnées, aides, fil d'Ariane | Texte 400/500 | `clamp(0.875rem, 0.8569rem + 0.0806vw, 0.9375rem)` | 14 → 15 | 1,45 | 0 |
| `--fs-caption` | Légende photo, mentions | Texte 400 | `clamp(0.8125rem, 0.7944rem + 0.0806vw, 0.875rem)` | 13 → 14 | 1,4 | 0 |
| `--fs-overline` | Sur-titre (cartes, en-tête de projet) | Condensée 700 | `clamp(0.8125rem, 0.7944rem + 0.0806vw, 0.875rem)` | 13 → 14 | 1,2 | 0,03em |
| `--fs-button` | Bouton | Condensée 800 | `clamp(1.0625rem, 1.0262rem + 0.1613vw, 1.1875rem)` | 17 → 19 | 1,1 | 0 |
| `--fs-button-lg` | Grand bouton (CTA, don) | Condensée 800 | `clamp(1.25rem, 1.1048rem + 0.6452vw, 1.75rem)` | 20 → 28 | 1,0 | −0,01em |
| `--fs-nav` | Entrées du menu desktop | Condensée 700 | `clamp(1.125rem, 1.0706rem + 0.2419vw, 1.3125rem)` | 18 → 21 | 1,0 | 0 |
| `--fs-nav-mobile` | Entrées du menu mobile | Condensée 700 | `clamp(1.75rem, 1.6774rem + 0.3226vw, 2rem)` | 28 → 32 | 1,05 | 0 |

#### 2.2.4 Règles typographiques

- **Casse de phrase partout** (titres, menus, boutons). Pas de `text-transform: uppercase`, y compris pour l'urgence. Seuls les sigles sont en capitales (APSUD, WASH, PSEA, OCHA).
- **Hiérarchie par la taille et la chasse**, pas par la couleur : les titres sont en Forêt, comme le texte.
- **Un seul h1 par page.** Sur les pages thématiques, le h1 est un **slogan** ; le terme technique est dans le fil d'Ariane et le `<title>` (STRUCTURE §6.1).
- **Mesure** : texte courant limité à `--measure-text` (43,125 rem = 690 px, 65–75 caractères). Chapeau limité à 36,75 rem.
- **Habillage** : `text-wrap: balance` sur h1–h6 et légendes courtes ; `text-wrap: pretty` sur les paragraphes. `hyphens: auto` avec `lang="fr"` sur les paragraphes **sous 30 em** uniquement ; jamais sur les titres (préférer `overflow-wrap: break-word`).
- **Typographie française** : espace fine insécable (U+202F) avant `; : ! ?` et à l'intérieur des guillemets `« »` ; apostrophe typographique `’` ; tiret demi-cadratin pour les intervalles (« 2023 – 2025 ») ; nombres formatés par `Intl.NumberFormat('fr-FR')` (« 250 000 », séparateur U+202F) ; monnaie « 5 000 FCFA ».
- **Chiffres** : `font-variant-numeric: tabular-nums lining-nums` dans les chiffres clés, dates, tableaux et compteurs (pas de saut de largeur pendant l'animation).
- **Gras** : 600 dans le texte courant (`<strong>`), jamais de gras sur des paragraphes entiers.
- **Marges** : titres `margin-block: 0 var(--space-4)` ; `* + h2 { margin-block-start: 1.5em }`, `* + h3…h6 { margin-block-start: 1em }` ; deux titres consécutifs : 0. Paragraphes `margin-block: 0 var(--space-4)`.
- **Liens dans le texte** : soulignés en permanence (couleur `--color-link-decoration`, épaisseur 1 px, décalage 2 px, survol 2 px animé par `@property`).

### 2.3 Espacements

Base **4 px**, multiples de 8 px pour la mise en page (comme Prosper, base 0,5 rem). Nom = nombre × 4 px.

| Token | rem | px | Usage typique |
|---|---|---|---|
| `--space-1` | 0.25 | 4 | Écart icône/texte serré |
| `--space-2` | 0.5 | 8 | Écart icône/texte, padding de badge |
| `--space-3` | 0.75 | 12 | Padding vertical de bouton, contenu de carte (mobile) |
| `--space-4` | 1 | 16 | Marge de paragraphe, contenu de carte |
| `--space-5` | 1.25 | 20 | Padding des boîtes Coton (mobile) |
| `--space-6` | 1.5 | 24 | Gouttière de grille, padding du hero (mobile) |
| `--space-8` | 2 | 32 | Écart de grille de cartes |
| `--space-10` | 2.5 | 40 | Padding des boîtes Coton (≥ 80em), padding du footer |
| `--space-12` | 3 | 48 | Padding des CTA (≥ 48em) |
| `--space-16` | 4 | 64 | Padding du panneau des chiffres (≥ 80em), fin de section mobile |
| `--space-20` | 5 | 80 | Fin de section (≥ 48em) |
| `--space-24` | 6 | 96 | Barre du hero (largeur), décalage de la 2ᵉ carte |
| `--space-30` | 7.5 | 120 | Grand rythme (séparateur `hr` ≥ 48em) |

Tokens fluides :

| Token | Valeur | px | Usage |
|---|---|---|---|
| `--space-section` | `clamp(4rem, 2.8387rem + 5.1613vw, 8rem)` | 64 → 128 | Espace vertical entre deux sections de **même fond** |
| `--space-section-sm` | `clamp(3rem, 2.4194rem + 2.5806vw, 5rem)` | 48 → 80 | Padding interne d'une section à fond coloré |
| `--space-stack` | `clamp(1.5rem, 1.2097rem + 1.2903vw, 2.5rem)` | 24 → 40 | Écart entre le titre d'une section et son contenu |
| `--gutter` | `clamp(1rem, 0.8548rem + 0.6452vw, 1.5rem)` | 16 → 24 | Marge latérale du conteneur et gouttière |

Règle de rythme : deux sections consécutives sur le **même fond** sont séparées par `--space-section` ; un **changement de fond** sépare à lui seul (padding interne `--space-section-sm`), jamais de filet entre sections (comme Prosper).

### 2.4 Grille et conteneurs

- **Grille 12 colonnes** : colonne 4,875 rem (78 px), gouttière 1,5 rem (24 px), total **75 rem (1200 px)** — identique à Prosper.
- **Largeurs nommées** (utilisées par les sections, jamais de colonnes Bootstrap) :

| Token | Valeur | Équivalent Prosper | Usage |
|---|---|---|---|
| `--container` | 75rem (1200 px) | 12 colonnes | Conteneur standard, zigzag, grilles de cartes |
| `--container-wide` | 100rem (1600 px) | 20 colonnes | Header, hero, footer, bandes pleine largeur |
| `--measure-media` | 62.25rem (996 px) | 10 colonnes | Titre de page, image de corps, vidéo, citation |
| `--measure-logos` | 55.875rem (894 px) | 9 colonnes | Grille de logos, carte |
| `--measure-text` | 43.125rem (690 px) | 7 colonnes | Colonne de lecture |
| `--measure-intro` | 36.75rem (588 px) | 6 colonnes | Texte d'intro centré |

- Classe utilitaire `.l-constrain` : `max-inline-size: var(--container); margin-inline: auto; padding-inline: var(--gutter)`. Variantes `.l-constrain--wide | --media | --text | --intro`.
- **Plein écran** : hero et image d'en-tête `inline-size: min(100%, var(--container-wide))` centrés, sans marge latérale.
- **Grilles de contenu** (CSS Grid, `gap: var(--space-8)`) : 2 colonnes ≥ 37.5em ; 3 colonnes ≥ 48em ; 4 colonnes : 2 entre 37.5em et 55em puis 4. Grilles de cartes : `grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr))` quand le nombre est variable.
- **Asymétrie** : mise en avant à 2 cartes en `58.58fr 41.42fr` (rapport √2) avec la 2ᵉ décalée de `--space-24` vers le bas, via requête de conteneur `@container (min-width: 37.5rem)`.

### 2.5 Points de rupture (mobile-first, `min-width`)

| Nom | em | px | Rôle |
|---|---|---|---|
| `xs` | 30em | 480 | Petits ajustements (chiffres 2 colonnes, nom complet du logo visible dès 400 px via conteneur) |
| `sm` | 37.5em | 600 | Grilles 2 colonnes |
| **`md`** | **48em** | **768** | **Bascule principale** : menu desktop, hero superposé, zigzag côte à côte, header 80 px |
| `lg` | 55em | 880 | Cartes et boutons plus larges, filtres en ligne |
| **`xl`** | **80em** | **1280** | **Desktop** : paddings max, footer en escalier complet |
| `2xl` | 90em | 1440 | Header sans padding latéral additionnel |
| `3xl` | 100em | 1600 | Au-delà : tout est centré dans 100 rem |

Les variables CSS ne fonctionnant pas dans `@media`, utiliser les valeurs en dur **uniquement** sous forme de *custom media* (PostCSS `postcss-custom-media`, natif dans Astro via Lightning CSS) :
```css
@custom-media --bp-xs (width >= 30em);
@custom-media --bp-sm (width >= 37.5em);
@custom-media --bp-md (width >= 48em);
@custom-media --bp-lg (width >= 55em);
@custom-media --bp-xl (width >= 80em);
@custom-media --bp-2xl (width >= 90em);
@custom-media --motion-ok (prefers-reduced-motion: no-preference);
```
Le JS lit le point de rupture via `matchMedia('(width >= 48em)')` (pas de `body::before { content }`).

### 2.6 Formes

| Token | Valeur | Usage |
|---|---|---|
| `--radius-none` | 0 | Images, cartes, boîtes, sections, bandeaux, panneau de cookies, puces de filtre |
| `--radius-control` | 4px | Boutons, champs, cases à cocher, badges |
| `--radius-round` | 50% | Bouton lecture/pause de la vidéo, pastilles de pagination « point » |
| `--radius-goutte` | 50% 50% 50% 0 | Goutte-feuille uniquement |
| `--border-width` | 1px | Bordures de contrôles, filets |
| `--border-width-strong` | 2px | Case à cocher, encadré « En bref » (bord gauche : 4px) |
| `--outline-hover` | 3px | Épaississement du contour au survol (boutons contour, puces) |

Angles : **vifs**. Les seuls « angles » graphiques sont les marches orthogonales et la pointe de la goutte-feuille. Pas de triangles ni de diagonales décoratives.

### 2.7 Ombres

**Aucune ombre floue.** Deux exceptions, toutes deux en **ombre pleine décalée** (cohérente avec les marches) :

| Token | Valeur | Usage |
|---|---|---|
| `--shadow-none` | none | Partout |
| `--shadow-step` | `0.5rem 0.5rem 0 var(--color-surface-signature)` | Éléments flottants : bandeau cookies, panneau de préférences, menu « Filtres » ouvert, info-bulle de la carte |
| `--shadow-step-strong` | `0.5rem 0.5rem 0 var(--color-surface-strong)` | Lien d'évitement au focus |

Les éléments flottants ont aussi une bordure 1 px Forêt pour se détacher sans flou.

### 2.8 Index z

| Token | Valeur | Élément |
|---|---|---|
| `--z-below` | −1 | Marches décoratives derrière un média |
| `--z-base` | 0 | Contenu |
| `--z-raised` | 1 | Légende-cartouche, bloc texte du hero, lien étendu des cartes |
| `--z-sticky` | 50 | Barre de filtres collante, sommaire d'ancres |
| `--z-header` | 100 | Header |
| `--z-megamenu` | 101 | Tiroir du méga-menu et son fond |
| `--z-drawer` | 200 | Menu mobile plein écran |
| `--z-modal` | 1000 | Dialogues (filtres mobile, préférences cookies) |
| `--z-cookie` | 1100 | Bandeau cookies |
| `--z-skiplink` | 9999 | Lien d'évitement |

### 2.9 Mouvement (durées et courbes)

Valeurs **exactes** de Prosper (`common.js`, module 2728) + quelques durées d'orchestration.

| Token | Valeur | Usage |
|---|---|---|
| `--ease-in-out` | `cubic-bezier(0.95, 0, 0.05, 1)` | Mouvements « signature » (goutte, marche, carte qui monte) — très expo |
| `--ease-out` | `cubic-bezier(0.01, 0, 0.1, 1)` | Entrées (menu, tiroir, révélation, soulignement) |
| `--ease-in` | `cubic-bezier(0.9, 0, 0.99, 1)` | Sorties, fonds de bouton |
| `--ease-linear` | `linear` | Spinner, barre de progression |
| `--dur-shortest` | 150ms | Changement de couleur de puce |
| `--dur-short` | 200ms | Fond de bouton, soulignement |
| `--dur-outro` | 195ms | Fermetures |
| `--dur-intro` | 270ms | Ouvertures (header qui revient, bandeau cookies) |
| `--dur-standard` | 375ms | Révélation, survol de carte |
| `--dur-long` | 400ms | Accordéons longs |
| `--dur-menu` | 300ms | Tiroir du méga-menu, menu mobile |
| `--delay-menu` | 300ms | Délai d'ouverture du méga-menu au survol |
| `--dur-signature` | 1200ms | Glissement de la goutte et croissance de la marche |
| `--delay-signature` | 400ms | Délai avant la goutte |
| `--dur-count` | 1500ms | Compteurs |
| `--stagger-count` | 150ms | Décalage entre compteurs |

### 2.10 Bloc `:root` complet (à copier dans `src/styles/tokens.css`)

```css
/* ==========================================================================
   APSUD — Design tokens v1 (2026-11-21)
   Primitives (--apsud-*) → sémantiques (--color-*, --font-*, --space-*…) → composants
   Règle : les composants n'utilisent jamais les primitives directement.
   ========================================================================== */

@property --underline-thickness {
  syntax: "<length>";
  inherits: false;
  initial-value: 1px;
}

:root {
  /* ---------- 1. Primitives de couleur ---------- */
  --apsud-foret-950: #061B10;
  --apsud-foret-900: #0B2A1A;
  --apsud-vert-800:  #14431F;
  --apsud-vert-700:  #1B5A28;
  --apsud-vert-600:  #226E30;
  --apsud-vert-500:  #2A8238;  /* vert du logo APSUD */
  --apsud-vert-400:  #4FA557;
  --apsud-vert-300:  #8BCB84;
  --apsud-vert-200:  #BDE3B5;
  --apsud-vert-100:  #DDF0D7;
  --apsud-vert-50:   #EFF8EC;
  --apsud-pousse-700: #77BC4B;
  --apsud-pousse-600: #8FD462;
  --apsud-pousse-300: #A8E87C;
  --apsud-pousse-100: #E3F7CF;
  --apsud-soleil-800: #8A5E00;
  --apsud-soleil-700: #C4870A;
  --apsud-soleil-600: #E0A01A;
  --apsud-soleil-400: #F4B731;
  --apsud-soleil-100: #FCEBC2;
  --apsud-coton:  #F7F3E8;
  --apsud-sable:  #ECE4D0;
  --apsud-blanc:  #FFFFFF;
  --apsud-mousse: #4D6457;
  --apsud-lichen: #7A8C80;
  --apsud-ligne:  #C9D3CB;
  --apsud-erreur:     #B42318;
  --apsud-erreur-100: #FCE8E6;

  /* ---------- 2. Couleurs sémantiques (thème clair) ---------- */
  --color-bg:                 var(--apsud-blanc);
  --color-surface-soft:       var(--apsud-coton);
  --color-surface-sand:       var(--apsud-sable);
  --color-surface-signature:  var(--apsud-pousse-300);
  --color-surface-tint:       var(--apsud-pousse-100);
  --color-surface-strong:     var(--apsud-foret-900);
  --color-surface-warm:       var(--apsud-soleil-100);

  --color-text:          var(--apsud-foret-900);
  --color-text-muted:    var(--apsud-mousse);
  --color-text-inverse:  var(--apsud-coton);
  --color-text-brand:    var(--apsud-vert-600);
  --color-heading:       var(--color-text);

  --color-brand:   var(--apsud-vert-500);
  --color-accent:  var(--apsud-soleil-400);

  --color-link:             var(--color-text);
  --color-link-decoration:  var(--apsud-vert-500);

  --color-border-control: var(--apsud-foret-900);
  --color-border-subtle:  var(--apsud-ligne);

  --color-focus:          var(--apsud-foret-900);
  --color-focus-inverse:  var(--apsud-pousse-300);

  --color-selection-bg:   var(--apsud-soleil-100);
  --color-selection-text: var(--apsud-foret-900);

  --color-success:        var(--apsud-vert-600);
  --color-success-bg:     var(--apsud-vert-50);
  --color-error:          var(--apsud-erreur);
  --color-error-bg:       var(--apsud-erreur-100);
  --color-warning-text:   var(--apsud-soleil-800);
  --color-warning-bg:     var(--apsud-soleil-100);
  --color-disabled-bg:    var(--apsud-sable);
  --color-disabled-text:  var(--apsud-mousse);

  /* Statuts (badges, carte) */
  --color-status-ongoing-bg:   var(--apsud-soleil-400);  /* En cours */
  --color-status-ongoing-text: var(--apsud-foret-900);
  --color-status-done-bg:      var(--apsud-vert-100);    /* Réalisé */
  --color-status-done-text:    var(--apsud-vert-700);
  --color-status-open-bg:      var(--apsud-pousse-100);  /* Offre ouverte */
  --color-status-open-text:    var(--apsud-vert-700);
  --color-status-closed-bg:    var(--apsud-sable);       /* Clôturé */
  --color-status-closed-text:  var(--apsud-mousse);

  /* Carte de RCA */
  --color-map-ongoing:  var(--apsud-soleil-400);
  --color-map-done:     var(--apsud-vert-500);
  --color-map-none:     var(--apsud-coton);
  --color-map-stroke:   var(--apsud-foret-900);
  --color-map-boundary: var(--apsud-blanc);

  /* ---------- 3. Typographie ---------- */
  --font-family-base: "Mona Sans", "Mona Sans Fallback", system-ui, -apple-system,
                      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-text:      var(--font-family-base);
  --font-condensed: var(--font-family-base);
  --font-headline:  var(--font-family-base);
  --font-stretch-text:      100%;
  --font-stretch-condensed: 75%;
  --font-stretch-headline:  75%;

  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;
  --fw-heavy:    800;
  --fw-headline: 600;   /* à caler entre 560 et 640 sur le prototype */

  --fs-display:   clamp(2rem, 1.2742rem + 3.2258vw, 4.5rem);          /* 32 → 72 */
  --fs-h1:        clamp(2.5rem, 1.8649rem + 2.8226vw, 4.6875rem);     /* 40 → 75 */
  --fs-hero:      clamp(2rem, 1.6371rem + 1.6129vw, 3.25rem);         /* 32 → 52 */
  --fs-h2:        clamp(2.125rem, 1.7802rem + 1.5323vw, 3.3125rem);   /* 34 → 53 */
  --fs-h3:        clamp(1.75rem, 1.4778rem + 1.2097vw, 2.6875rem);    /* 28 → 43 */
  --fs-h4:        clamp(1.375rem, 1.1935rem + 0.8065vw, 2rem);        /* 22 → 32 */
  --fs-h5:        clamp(1.25rem, 1.123rem + 0.5645vw, 1.6875rem);     /* 20 → 27 */
  --fs-h6:        clamp(1.125rem, 1.0161rem + 0.4839vw, 1.5rem);      /* 18 → 24 */
  --fs-stat:      clamp(2.75rem, 2.0968rem + 2.9032vw, 5rem);         /* 44 → 80 */
  --fs-quote:     clamp(1.5rem, 1.2823rem + 0.9677vw, 2.25rem);       /* 24 → 36 */
  --fs-lead:      clamp(1.125rem, 1.0706rem + 0.2419vw, 1.3125rem);   /* 18 → 21 */
  --fs-body:      clamp(1rem, 0.9637rem + 0.1613vw, 1.125rem);        /* 16 → 18 */
  --fs-small:     clamp(0.875rem, 0.8569rem + 0.0806vw, 0.9375rem);   /* 14 → 15 */
  --fs-caption:   clamp(0.8125rem, 0.7944rem + 0.0806vw, 0.875rem);   /* 13 → 14 */
  --fs-overline:  clamp(0.8125rem, 0.7944rem + 0.0806vw, 0.875rem);   /* 13 → 14 */
  --fs-button:    clamp(1.0625rem, 1.0262rem + 0.1613vw, 1.1875rem);  /* 17 → 19 */
  --fs-button-lg: clamp(1.25rem, 1.1048rem + 0.6452vw, 1.75rem);      /* 20 → 28 */
  --fs-nav:       clamp(1.125rem, 1.0706rem + 0.2419vw, 1.3125rem);   /* 18 → 21 */
  --fs-nav-mobile: clamp(1.75rem, 1.6774rem + 0.3226vw, 2rem);        /* 28 → 32 */

  --lh-tight:   1;
  --lh-heading: 1.1;
  --lh-snug:    1.2;
  --lh-quote:   1.3;
  --lh-caption: 1.4;
  --lh-lead:    1.45;
  --lh-body:    1.5;

  --ls-headline: -0.01em;
  --ls-condensed: 0.01em;
  --ls-overline:  0.03em;

  /* ---------- 4. Espacements ---------- */
  --space-0: 0;
  --space-1: 0.25rem;  /*   4 */
  --space-2: 0.5rem;   /*   8 */
  --space-3: 0.75rem;  /*  12 */
  --space-4: 1rem;     /*  16 */
  --space-5: 1.25rem;  /*  20 */
  --space-6: 1.5rem;   /*  24 */
  --space-8: 2rem;     /*  32 */
  --space-10: 2.5rem;  /*  40 */
  --space-12: 3rem;    /*  48 */
  --space-16: 4rem;    /*  64 */
  --space-20: 5rem;    /*  80 */
  --space-24: 6rem;    /*  96 */
  --space-30: 7.5rem;  /* 120 */
  --space-section:    clamp(4rem, 2.8387rem + 5.1613vw, 8rem);      /* 64 → 128 */
  --space-section-sm: clamp(3rem, 2.4194rem + 2.5806vw, 5rem);      /* 48 → 80 */
  --space-stack:      clamp(1.5rem, 1.2097rem + 1.2903vw, 2.5rem);  /* 24 → 40 */
  --gutter:           clamp(1rem, 0.8548rem + 0.6452vw, 1.5rem);    /* 16 → 24 */

  /* ---------- 5. Mise en page ---------- */
  --container:      75rem;      /* 1200 */
  --container-wide: 100rem;     /* 1600 */
  --measure-media:  62.25rem;   /*  996 */
  --measure-logos:  55.875rem;  /*  894 */
  --measure-text:   43.125rem;  /*  690 */
  --measure-intro:  36.75rem;   /*  588 */
  --grid-columns: 12;
  --grid-gap:     var(--space-8);
  --header-h:     4rem;         /* 64 ; 5rem (80) à partir de 48em, voir plus bas */
  --eyebrow-h:    0px;          /* mis à jour en JS (ResizeObserver) */
  --tap-min:      2.75rem;      /* 44 : cible tactile minimale */
  --tap-comfort:  3rem;         /* 48 : cible tactile confortable (mobile) */
  --control-h:    3rem;         /* 48 : hauteur des champs */

  /* ---------- 6. Formes ---------- */
  --radius-none:    0;
  --radius-control: 4px;
  --radius-round:   50%;
  --radius-goutte:  50% 50% 50% 0;
  --border-width:        1px;
  --border-width-strong: 2px;
  --outline-hover:       3px;
  --focus-width:  2px;
  --focus-offset: 2px;

  /* ---------- 7. Ombres (pleines et décalées uniquement) ---------- */
  --shadow-none: none;
  --shadow-step:        0.5rem 0.5rem 0 var(--color-surface-signature);
  --shadow-step-strong: 0.5rem 0.5rem 0 var(--color-surface-strong);

  /* ---------- 8. Index z ---------- */
  --z-below: -1;
  --z-base: 0;
  --z-raised: 1;
  --z-sticky: 50;
  --z-header: 100;
  --z-megamenu: 101;
  --z-drawer: 200;
  --z-modal: 1000;
  --z-cookie: 1100;
  --z-skiplink: 9999;

  /* ---------- 9. Mouvement ---------- */
  --ease-in-out: cubic-bezier(0.95, 0, 0.05, 1);
  --ease-out:    cubic-bezier(0.01, 0, 0.1, 1);
  --ease-in:     cubic-bezier(0.9, 0, 0.99, 1);
  --ease-linear: linear;
  --dur-shortest: 150ms;
  --dur-short:    200ms;
  --dur-outro:    195ms;
  --dur-intro:    270ms;
  --dur-menu:     300ms;
  --dur-standard: 375ms;
  --dur-long:     400ms;
  --dur-signature: 1200ms;
  --dur-count:     1500ms;
  --delay-menu:      300ms;
  --delay-signature: 400ms;
  --stagger-count:   150ms;

  /* ---------- 10. Tokens de composants ---------- */
  --button-primary-bg:          var(--apsud-vert-500);
  --button-primary-bg-hover:    var(--apsud-vert-600);
  --button-primary-bg-active:   var(--apsud-vert-700);
  --button-primary-text:        var(--apsud-blanc);
  --button-donate-bg:           var(--apsud-soleil-400);
  --button-donate-bg-hover:     var(--apsud-soleil-600);
  --button-donate-bg-active:    var(--apsud-soleil-700);
  --button-donate-text:         var(--apsud-foret-900);
  --button-ink-bg:              var(--apsud-foret-900);
  --button-ink-bg-hover:        var(--apsud-foret-950);
  --button-ink-bg-active:       var(--apsud-vert-800);
  --button-ink-text:            var(--apsud-pousse-300);
  --button-on-dark-bg:          var(--apsud-pousse-300);
  --button-on-dark-bg-hover:    var(--apsud-pousse-600);
  --button-on-dark-bg-active:   var(--apsud-pousse-700);
  --button-on-dark-text:        var(--apsud-foret-900);
  --button-pad-block:  var(--space-3);
  --button-pad-inline: var(--space-5);
  --button-min-h:      var(--tap-min);

  --hero-bar-w:  var(--space-24);   /* barre Soleil à gauche du bloc texte */
  --caption-max: 24rem;             /* légende-cartouche */
  --card-media-ratio: 4 / 3;
  --tile-media-ratio: 3 / 2;
  --icon-size: 1.5rem;
  --icon-stroke: 2;
}

@media (width >= 48em) {
  :root { --header-h: 5rem; }   /* 80 px */
}

/* Thèmes de section : redéfinissent localement les sémantiques */
.t-coton       { --color-bg: var(--apsud-coton); background: var(--color-bg); }
.t-pousse      { --color-bg: var(--apsud-pousse-300); background: var(--color-bg);
                 --color-accent: var(--apsud-foret-900);
                 --color-text-muted: var(--apsud-vert-800);  /* Mousse sur Pousse = 4,43 : échec */
                 --button-primary-bg: var(--apsud-foret-900);
                 --button-primary-bg-hover: var(--apsud-foret-950);
                 --button-primary-bg-active: var(--apsud-vert-800);
                 --button-primary-text: var(--apsud-pousse-300);
                 --shadow-step: 0.5rem 0.5rem 0 var(--apsud-foret-900); }
.t-pousse-pale { --color-bg: var(--apsud-pousse-100); background: var(--color-bg); }
.t-foret       { --color-bg: var(--apsud-foret-900); background: var(--color-bg);
                 --color-text: var(--apsud-coton);
                 --color-heading: var(--apsud-coton);
                 --color-text-muted: var(--apsud-vert-200);
                 --color-link: var(--apsud-coton);
                 --color-link-decoration: var(--apsud-pousse-300);
                 --color-border-control: var(--apsud-coton);
                 --color-focus: var(--apsud-pousse-300);
                 --button-primary-bg: var(--button-on-dark-bg);
                 --button-primary-bg-hover: var(--button-on-dark-bg-hover);
                 --button-primary-bg-active: var(--button-on-dark-bg-active);
                 --button-primary-text: var(--button-on-dark-text);
                 color: var(--color-text); }

::selection { background: var(--color-selection-bg); color: var(--color-selection-text); }
```

> Contrastes propres aux thèmes, vérifiés : texte secondaire du thème `.t-foret` (Vert 200 `#BDE3B5` sur Forêt) **10,89:1** ; texte secondaire du thème `.t-pousse` (Vert 800 sur Pousse) **7,83:1** — la Mousse sur Pousse ne donne que 4,43:1 et est donc interdite. Le texte des boutons Vert APSUD est **blanc**, jamais Coton (Coton sur Vert 500 : 4,36:1).

**Pas de thème sombre global en v1** (le public consulte surtout en journée sur mobile ; un thème sombre doublerait la recette). L'architecture sémantique le permet plus tard : il suffira d'un bloc `@media (prefers-color-scheme: dark)` qui redéfinit les sémantiques.

---

## 3. Iconographie

> Exigence INSTRUCTIONS §4.3 : **un seul set d'icônes SVG maison**, aucune bibliothèque, aucun emoji. Prosper n'a pas de bibliothèque non plus ; ses icônes d'interface les plus récentes (recherche, chevron) sont en **trait de 2 px, terminaisons et jonctions arrondies** (PROSPER_TOKENS §16). On prolonge cette ligne et on la rend systématique.

### 3.1 Deux familles

| Famille | Grille | Trait | Taille d'affichage | Couleur | Rôle |
|---|---|---|---|---|---|
| **Icônes d'interface** (`src/icons/ui/`) | 24 × 24 | 2 px | 16, 20, **24** px | `currentColor` | Navigation, actions, métadonnées |
| **Pictogrammes thématiques** (`src/icons/themes/`) | 48 × 48 | 2,5 px | **48**, 64, 96 px | trait Forêt + aplat d'accent | Domaines, valeurs, chiffres clés, façons d'agir |
| **Logos de réseaux** (`src/icons/social/`) | officiels | — | 20–24 px | `currentColor` (monochrome) | Facebook, X, LinkedIn, WhatsApp, YouTube, Instagram |

Les logos de réseaux ne sont **pas redessinés** : on utilise les glyphes monochromes officiels de chaque marque (règles d'usage des marques), simplement passés en `currentColor`.

### 3.2 Règles de dessin (icônes d'interface)

| Règle | Valeur |
|---|---|
| `viewBox` | `0 0 24 24` |
| Zone utile | 20 × 20 (marge de 2 px sur chaque bord, **trait compris**) |
| Formes de référence (*keylines*) | cercle Ø 20 ; carré 18 × 18 ; rectangle portrait 16 × 20 ; rectangle paysage 20 × 16 |
| Trait | `stroke-width="2"`, `fill="none"`, `stroke="currentColor"` |
| Terminaisons | `stroke-linecap="round"` |
| Jonctions | `stroke-linejoin="round"` |
| Angles | **90° et 45° uniquement** (diagonales à 45°) ; rectangles sans `rx` (la jonction ronde donne déjà un angle doux de 1 px) |
| Courbes | **arcs de cercle uniquement** + la goutte-feuille ; pas de Bézier libre |
| Écart minimal entre deux traits | 2 px |
| Complexité | 6 tracés maximum ; lisible à 16 px |
| Remplissage | interdit, sauf : lecture / pause (formes pleines géométriques), point central d'un repère (Ø 3) |
| Taille 16 px | version dédiée à trait 1,5 et détails simplifiés pour : flèche, chevron, fermer, plus, moins, coche, lien externe, téléchargement, recherche |
| Orientation | une seule flèche et un seul chevron dessinés ; les autres sens par classes `.is-left / .is-up / .is-down` (`rotate`) |
| Alignement optique | les formes pleines (goutte) peuvent déborder de 0,5 px de la zone utile pour paraître de même taille qu'un carré |
| Fichier | SVG optimisé (SVGO), sans `width/height`, sans `id`, sans couleur en dur, un fichier par icône, nom en kebab-case français |

### 3.3 Règles des pictogrammes thématiques (48 × 48)

- Même grammaire que l'interface, à l'échelle : zone utile 40 × 40, trait **2,5**, terminaisons et jonctions rondes, arcs uniquement.
- **Aplat d'accent décalé** (la signature) : une goutte-feuille pleine de 24 × 24 posée **derrière** le dessin, en bas à gauche (x 4 → 28, y 20 → 44), couleur `var(--icon-accent, var(--apsud-pousse-300))`. Le dessin au trait la chevauche en partie : c'est la « marche » appliquée à l'icône. Sur fond Pousse, l'aplat passe en Pousse 100 ; sur Forêt, le trait passe en Coton et l'aplat reste Pousse.
- Le pictogramme se lit **sans** l'aplat (l'aplat est décoratif).
- Toujours accompagné d'un libellé texte : un pictogramme n'est jamais seul pour porter le sens.

### 3.4 Icônes de référence (code exact)

```svg
<!-- ui/fleche-droite.svg -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  <path d="M4 12h15.5M13.5 6l6 6-6 6"/>
</svg>

<!-- ui/telechargement.svg -->
<svg viewBox="0 0 24 24" …mêmes attributs…><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>

<!-- ui/goutte.svg (eau) : goutte-feuille, pointe en haut -->
<svg viewBox="0 0 24 24" …><path d="M12 3.5 16.98 8.48A7.04 7.04 0 1 1 7.02 8.48Z"/></svg>

<!-- ui/feuille.svg : goutte-feuille, pointe en bas à gauche, nervure -->
<svg viewBox="0 0 24 24" …><path d="M4 20v-8a8 8 0 1 1 8 8Z"/><path d="M4 20l8-8"/></svg>

<!-- ui/localisation.svg : goutte-feuille pointe en bas + point -->
<svg viewBox="0 0 24 24" …><path d="M12 21 7.02 16.02A7.04 7.04 0 1 1 16.98 16.02Z"/><circle cx="12" cy="11" r="2.5"/></svg>
```

Ces cinq icônes fixent le style : tout nouveau dessin doit pouvoir se poser à côté d'elles sans qu'on remarque une différence de poids, de terminaison ou de géométrie.

### 3.5 Inventaire (≈ 50 icônes, dont 32 indispensables au lancement ★)

**Interface (24 px)**

| Fichier | ★ | Usage | Construction |
|---|---|---|---|
| `fleche-droite` | ★ | Lien fléché, « Voir tous les projets », carte | Trait horizontal 4 → 19,5 + pointe à 45° (voir §3.4) |
| `fleche-haut-droite` | ★ | Lien externe (site d'un bailleur) | Diagonale 45° + équerre ; pas de carré « fenêtre » |
| `chevron-bas` | ★ | Accordéon, select, méga-menu | V à 45°, 12 × 6 |
| `plus` / `moins` | ★ | Accordéon du menu mobile, FAQ | Croix 14 × 14 / trait 14 |
| `fermer` | ★ | Bandeau, menu, dialogue | Croix à 45°, 14 × 14 |
| `menu` | ★ | Burger | 3 traits de 18 px, écart 6 px ; anime en croix (§6) |
| `recherche` | ★ | Loupe | Cercle Ø 13 + manche à 45° de 5 px |
| `filtre` | ★ | Bouton « Filtrer » mobile | 3 traits horizontaux de longueurs 18/12/6, alignés à gauche (pas de curseurs) |
| `coche` | ★ | Puce sélectionnée, validation, case | Coche 45°/45°, branches 5 et 10 |
| `telechargement` | ★ | Rapports, TDR, DAO | §3.4 |
| `document` | ★ | Fichier, rapport | Rectangle 14 × 18, coin plié à 45° de 4 px, 2 lignes de texte |
| `calendrier` | ★ | Dates, période de projet | Rectangle 18 × 16, 2 anneaux, 1 trait d'en-tête ; **pas** de grille de jours |
| `echeance` | ★ | Date limite (offres, appels d'offres) | Cercle Ø 18 + aiguilles 90° (12 h → 3 h) |
| `localisation` | ★ | Zone, lieu de l'offre, adresse | §3.4 (goutte-feuille pointe en bas) |
| `telephone` | ★ | Liens `tel:` | Combiné en arc de cercle simplifié |
| `courriel` | ★ | Liens `mailto:` | Rectangle 20 × 14 + V à 45° |
| `partager` | | Partage natif (Web Share) | 3 cercles Ø 4 reliés par 2 traits |
| `lecture` / `pause` | ★ | Vidéo (grille 48, **pleins**) | Triangle équilatéral / deux barres 8 × 28 |
| `alerte` | ★ | Message d'erreur, avertissement | Cercle Ø 18 + trait vertical + point |
| `info` | | Note, aide | Cercle Ø 18 + point + trait |
| `carte` | | Bascule « vue carte » | Pli en 3 panneaux verticaux (pas de pin dessus) |
| `grille` / `liste` | | Bascule « vue grille / liste » | 4 carrés 7 × 7 / 3 traits + 3 points |
| `reglages` | | « Personnaliser » (cookies), préférences | 2 traits horizontaux avec un cercle Ø 5 chacun, décalés |
| `retour-haut` | | Bouton de retour en haut (pages longues seulement) | Flèche orientée vers le haut |

Pas d'icône pour la langue (FR / EN en texte), pas d'icône de cookie, pas d'icône « maison » pour l'accueil.

**Thématiques (48 px, avec aplat)** — domaines et sous-domaines d'APSUD

| Fichier | ★ | Domaine / usage | Construction |
|---|---|---|---|
| `eau` | ★ | WASH (domaine) | Goutte-feuille pointe en haut, petite vague intérieure en arc |
| `assainissement` | ★ | Latrines, gestion des déchets | Cabine rectangulaire 16 × 24 à toit plat débordant, porte, petite aération |
| `hygiene` | ★ | Kits d'hygiène, lavage des mains | Seau trapèze + anse en arc + 2 gouttes |
| `point-eau` | ★ | Forages, pompes, réhabilitation | Pompe à motricité humaine : fût vertical, bec à 90°, levier à 45° |
| `sante` | ★ | Santé, vaccination | Seringue à 45° (corps, piston, aiguille) ; **pas** de croix médicale |
| `securite-alimentaire` | ★ | Domaine sécurité alimentaire | Épi : tige verticale + 3 paires de goutte-feuilles alternées |
| `agriculture` | ★ | Agriculture, maraîchage, AgriApps | Pousse : 2 feuilles (goutte-feuilles) sur tige + ligne de sol |
| `moyens-subsistance` | ★ | AGR, cash, marché | Étal de marché : auvent à 3 festons en arcs + plateau |
| `protection` | ★ | Domaine protection | Toit à 45° au-dessus d'une silhouette (tête Ø 6 + épaules en arc) |
| `protection-enfance` | ★ | Protection de l'enfant | Silhouette adulte + silhouette enfant (½ hauteur), mains reliées par un trait |
| `genre` | ★ | Genre, VBG, ONG de femmes | Deux silhouettes de même taille sur une ligne de base commune ; **pas** de symboles ♀ ♂ |
| `cohesion-sociale` | ★ | Cohésion, stabilisation communautaire | **Arbre à palabres** : houppier en 3 arcs + tronc + banc |
| `societe-civile` | ★ | Renforcement des OSC, localisation | 3 cercles Ø 8 en triangle reliés + un 4ᵉ plus grand au centre |
| `gouvernance` | | Gouvernance, redevabilité | Pupitre : rectangle + 3 traits de « texte » + ligne de sol |
| `numerique` | ★ | Numérique, AgriApps, Mobile Money | Téléphone 14 × 24 + 2 arcs d'onde à droite |
| `urgence` | ★ | Réponse d'urgence, sites PDI | Abri : tente à 45° + porte ; **pas** de triangle d'alerte |
| `education` | | Éducation, sensibilisation | Ardoise : rectangle 24 × 18 + cadre + 2 traits « écriture » |
| `environnement` | ★ | Axe transversal environnement | Feuille (goutte-feuille) + nervure + 2 nervures secondaires à 45° |
| `formation` | | Ateliers, renforcement de capacités | Tableau sur chevalet + silhouette à côté |

**Données et institution (48 px, avec aplat)**

| Fichier | ★ | Usage | Construction |
|---|---|---|---|
| `beneficiaires` | ★ | Chiffre « personnes atteintes » | 3 silhouettes, la centrale devant |
| `bailleur` | ★ | Bailleurs, financement | Pile de 3 pièces (ellipses) vue de profil ; **pas** de billet ni de « $ » |
| `partenariat` | ★ | Partenaires, consortium | Deux anneaux entrelacés ; **pas** de poignée de main |
| `projet` | ★ | Fiche projet, « projets menés » | Porte-documents + onglet |
| `zone` | ★ | Zones, préfectures | Polygone irrégulier à angles de 45°/90° + repère goutte-feuille |
| `emploi` | ★ | Carrières | Badge porte-nom à cordon |
| `appel-offres` | | Appels d'offres | Document + tampon circulaire |
| `rapport` | ★ | Transparence, rapports | Document + 3 barres de graphique |
| `don` | ★ | Faire un don | Main ouverte (arc de paume + pouce) sous une goutte-feuille — écho des mains du logo ; **pas** de cœur |
| `mobile-money` | ★ | Don par Mobile Money | Téléphone + flèche entrante |
| `virement` | | Don par virement | Deux flèches opposées horizontales sur un rectangle (pas de bâtiment à colonnes) |
| `don-nature` | | Don en nature | Caisse en perspective frontale + couvercle ouvert |
| `benevolat` | | Bénévolat et stages | Silhouette + goutte-feuille tenue (main levée) |
| `plainte` | ★ | Mécanisme de plaintes, signalement | Bulle de dialogue carrée + point d'exclamation |

**Valeurs APSUD** (page « Qui sommes-nous ») : pas de pictogramme abstrait par valeur (cliché). Les 6 valeurs (Respect, Solidarité, Responsabilité, Cohérence, Innovation, Partage de savoir) sont présentées **typographiquement** (grand chiffre 01–06 en Titre + nom + texte), avec la goutte-feuille en puce.

### 3.6 Intégration

- Composant `<Icon name="fleche-droite" size="24" />` qui insère le SVG en ligne (pas de police d'icônes, pas de requête par icône). Pour une icône répétée plus de 5 fois sur une page (puces, liste d'offres) : sprite `<symbol>` + `<use href="#i-…">`.
- Icône **décorative** (à côté d'un texte) : `aria-hidden="true" focusable="false"`. Icône **seule** dans un bouton : `aria-hidden` sur le SVG + `aria-label` sur le bouton (ou texte `.u-visually-hidden`).
- Classe `.c-icon { inline-size: 1em; block-size: 1em; flex: none; vertical-align: -0.125em; }` : l'icône suit la taille du texte voisin, sauf taille explicite.

---

## 4. Composants

> Convention : **un composant = un fichier `.astro` (ou équivalent) + un fichier de style** (`components/<Nom>/<Nom>.astro` + `<Nom>.css`). Classes BEM préfixées comme chez Prosper : `c-` composant, `l-` mise en page, `u-` utilitaire, `t-` thème, `is-`/`has-` états. Chaque fiche donne : **anatomie**, **variantes**, **états**, **responsive**, **animation**, **accessibilité**.

### 4.0 Fondations transverses

- **Lien d'évitement** `c-skiplink` : premier élément du `<body>`, « Aller au contenu », caché hors écran, visible au focus en haut à gauche (fond Forêt, texte Coton, `--shadow-step`), cible `<main id="contenu" tabindex="-1">`.
- **Révélation au défilement** : classe `.js-reveal` ajoutée **par JS seulement** si `IntersectionObserver` existe et si `prefers-reduced-motion: no-preference` ; sinon tout est visible d'emblée.
- **Lien étendu** (cartes cliquables) : le lien du titre porte `::after { content: ""; position: absolute; inset: 0; z-index: var(--z-raised) }` ; la carte est en `position: relative`. Pas de JS, pas de `<a>` englobant tout un bloc. Les autres liens internes de la carte (bailleur) passent au-dessus (`position: relative; z-index: 2`).
- **Texte masqué** `.u-visually-hidden` (clip, 1 px), jamais `display: none` pour du texte destiné aux lecteurs d'écran.

### 4.1 Bandeau d'annonce (eyebrow)

- **Anatomie** : bande pleine largeur au-dessus du header ; texte 1 ligne (desktop) en `--fs-body`, accroche en 600 ; un lien souligné ; bouton fermer (icône 20 px dans une cible de 44 × 44) à droite.
- **Variantes** : `--info` (fond Pousse 300, texte Forêt) ; `--urgence` (fond Soleil 400, texte Forêt). Contenu issu du type « Annonce » (PROSPER_STRUCTURE §14.13).
- **Comportement** : **défile avec la page** (n'est pas fixe, différence voulue avec Prosper). Fermeture mémorisée **7 jours** (`localStorage`, clé `apsud-annonce-<id>`, enveloppée dans `try/catch`). Une seule annonce à la fois sur tout le site ; si une alerte de campagne est active, le bandeau est masqué.
- **Responsive** : mobile : texte sur 2–3 lignes max (`--fs-small`), le lien passe à la ligne ; padding `--space-3 var(--gutter)`. Desktop : centré dans `--container-wide`, padding `--space-3 --space-6`.
- **Animation** : fermeture = hauteur 0 en `--dur-outro` `--ease-in` (via `grid-template-rows: 1fr → 0fr`), le header remonte sans saut.
- **A11y** : `<aside aria-label="Annonce">` ; bouton `aria-label="Fermer l'annonce"`.

### 4.2 Header desktop (≥ 48em)

- **Anatomie** (gauche → droite, dans `--container-wide`, padding latéral `clamp(0.5rem, 10.9375vw - 4.75rem, 4rem)`, 0 à partir de 90em comme Prosper) :
  1. **Logo** (symbole + sigle, hauteur 44 px) + nom complet sur 2 lignes (`--fs-caption`, Mousse) ; lien vers l'accueil, `aria-label="APSUD, accueil"`.
  2. **4 portes** centrées : *L'ONG · Nos actions · Nos zones · Agir avec nous* (Condensée 700, `--fs-nav`). Chaque titre est un lien vers le hub **et** ouvre le tiroir.
  3. **Actions** à droite : loupe (lien vers `/recherche`, cible 44 px) ; **FR / EN** (texte `--fs-small` 600, la langue courante soulignée, `hreflang`) ; bouton **Faire un don** (primaire, Vert APSUD, `--fs-button`).
- **Dimensions** : hauteur `--header-h` (80 px) ; fond blanc **opaque** ; filet bas 1 px `--color-border-subtle` **uniquement après défilement** (classe `is-scrolled` posée à `scrollY > 8`). Pas d'ombre.
- **Position** : `position: sticky; top: 0` (le bandeau d'annonce défile au-dessus puis disparaît). Hauteur constante en desktop (pas de rétrécissement).
- **États des portes** : repos Forêt ; survol ou tiroir ouvert : **pastille Pousse 300** derrière le titre, qui déborde de `--space-2` (comme l'aqua de Prosper) + soulignement 2 px ; page courante : soulignement 2 px Vert APSUD permanent + `aria-current="page"` sur le lien de la page en cours.
- **Responsive** : entre 48em et 64em, le nom complet du logo est masqué et l'écart entre portes réduit (largeur des groupes `clamp(6.75rem, 14.84375vw - 0.375rem, 11.5rem)`).
- **A11y** : `<header>` + `<nav aria-label="Navigation principale">` ; liste `<ul>` ; la loupe a un libellé masqué « Rechercher ».

### 4.3 Méga-menu « tiroir commun »

- **Anatomie** : un seul panneau blanc qui descend sous **toute** la barre ; les sous-liens des 4 portes apparaissent **en même temps**, chacun aligné sous sa porte (4 colonnes). Libellés courts (2–4 mots), pas d'image, pas de description. Dernier lien de colonne en 700 avec flèche (« Tous nos projets → », « Toutes nos zones → »). Contenu : PROSPER_STRUCTURE §13 (tableau « Méga-menu »).
- **Dimensions** : hauteur égalisée sur la colonne la plus longue (CSS Grid, pas de calcul JS) ; padding `--space-6` haut, `--space-10` bas ; sous-liens en Condensée 600 `--fs-body`, couleur Mousse, interligne 1,2, écart vertical `--space-3`.
- **États des sous-liens** : repos Mousse ; survol/focus : Forêt + soulignement + **glissement de 10 px** (`padding-inline-start: 0 → 0.625rem`, `--dur-menu` `--ease-out`) ; page courante : Forêt 700 + soulignement Vert.
- **Ouverture** : survol de la barre des portes avec **délai `--delay-menu` (300 ms)** pour éviter les ouvertures accidentelles ; translation `translateY(-100%) → 0` en `--dur-menu` `--ease-out` ; fermeture **sans délai** en 100 ms `--ease-in`. Au clavier : ouverture au focus d'un titre (classe `has-focused-child` sur `focusin`), fermeture sur `Échap` (focus rendu au titre) et sur `focusout` hors du menu.
- **Voile** : aucun (la page reste visible), mais le panneau a un filet bas 1 px Ligne.
- **Tactile (tablette ≥ 48em)** : premier toucher sur une porte = ouvre le tiroir (`aria-expanded="true"`), second toucher = suit le lien. Détecté par `pointerType === "touch"`.
- **A11y** : chaque porte = lien + bouton de déroulement implicite ; on expose `aria-expanded` sur un `<button>` frère visuellement fusionné, ou on adopte le modèle « disclosure navigation » (pas `role="menu"`).

### 4.4 Header mobile (< 48em)

- **Anatomie** : hauteur 64 px ; logo (symbole + sigle, 36 px de haut ; nom complet masqué sous 400 px) ; à droite : **Faire un don** (bouton primaire `--small`, toujours visible) + **burger** (`<button aria-expanded aria-controls="menu-mobile">`, cible 48 × 48, libellé masqué « Menu »).
- **Comportement au défilement** (adaptation APSUD) : le header **se masque en descendant** (`translateY(-100%)` en `--dur-outro` `--ease-in`) après `2 × --header-h` de défilement, et **revient dès qu'on remonte** de 8 px (`--dur-intro` `--ease-out`). Il reste toujours visible si le menu est ouvert, si le focus est dedans, ou si `prefers-reduced-motion` (dans ce cas, simplement fixe sans animation).

### 4.5 Menu mobile (drawer plein écran)

- **Anatomie** : panneau blanc plein écran sous le header (`block-size: calc(100dvh - var(--header-h))`), défilement interne, le header (logo, don, croix) reste visible au-dessus.
  1. 4 portes en **très grande typographie** (Condensée 700, `--fs-nav-mobile`, 28–32 px), séparées par un filet Ligne, cibles de 64 px de haut.
  2. Chaque porte = **lien vers le hub** (zone texte) + **bouton « + »** séparé (48 × 48, `aria-expanded`, `aria-controls`) qui déplie l'accordéon des sous-liens (Condensée 600, `--fs-h6`, Mousse, retrait `--space-4`, cibles 48 px).
  3. Bloc « Rechercher » (champ + bouton) en bas de liste.
  4. Pied du panneau sur fond Coton : téléphone cliquable, e-mail, WhatsApp, réseaux sociaux, **FR / EN**.
- **Animation** : ouverture `translateY(-100%) → 0` en `--dur-menu` `--ease-out` ; fermeture `--dur-menu` `--ease-in` ; accordéon `grid-template-rows: 0fr → 1fr` en `--dur-menu` `--ease-out` ; l'icône **« + » devient « − »** (le trait vertical passe en `scaleY(0)`), plus lisible qu'une rotation. Burger → croix : barres décalées 500 / 700 / 600 ms comme Prosper, ramenées à **270 / 375 / 300 ms** (plus vif sur mobile).
- **Comportement** : défilement de la page bloqué (`overflow: hidden` sur `html`) ; **piège de focus** dans le panneau ; `Échap` ferme et rend le focus au burger ; un toucher sur un lien ferme le menu ; `inert` posé sur `<main>` et le footer pendant l'ouverture.
- **A11y** : `<nav id="menu-mobile" aria-label="Navigation principale">` ; libellé du burger qui bascule « Ouvrir le menu » / « Fermer le menu ».

### 4.6 Hero vidéo (accueil, pages « campagne »)

- **Anatomie** :
  1. **Média** : `<picture>` poster (LCP) + `<video>` optionnelle par-dessus (§7). Ratio **16:9** en desktop (`max-block-size: min(56.25vw, 85svh)`), **4:5** en mobile (poster recadré par direction artistique). `object-fit: cover`, point focal par image.
  2. **Bouton lecture/pause** : rond 44 × 44 (`--radius-round`), fond blanc à 70 % (`color-mix(in srgb, var(--apsud-blanc) 70%, transparent)`), icône Forêt pleine 20 px, en bas à droite à `--space-4` (`--space-6` ≥ 48em). Masqué si la vidéo n'est pas chargée.
  3. **Bloc texte** `t-foret` : sur-titre facultatif (« Projet en cours · WASH »), **h1** `--fs-hero` Condensée 700 Coton (5–8 mots), chapeau `--fs-lead` (1–2 phrases avec un chiffre réel), actions : bouton **sur sombre** (Pousse) « Découvrir nos actions » + lien fléché Coton « Faire un don ». En mode campagne/urgence : bouton **Soleil** (don).
  4. **Barre Soleil** (marche) : `::before` du bloc, `inline-size: --hero-bar-w` (6 rem), collée à gauche du bloc, de `inset-block: 4rem 0` (elle descend du milieu du bloc jusqu'en bas).
- **Disposition ≥ 48em** : grille à une zone, le bloc se pose **en bas à gauche sur le média** (`align-self: end; margin-inline-start: var(--space-24); max-inline-size: min(37.5rem, 50vw - 6rem); min-inline-size: 19rem`), padding `--space-8` (`--space-12` ≥ 80em). Le bloc **déborde sous le média de `--space-8`** pour accrocher la section suivante (adaptation : sur Prosper il est calé au bas).
- **Disposition mobile** : média en haut, bloc en dessous sur toute la largeur (padding `--space-6 var(--gutter) --space-8`) ; la barre Soleil devient une **marche horizontale** de 4 rem × 0,75 rem posée sur le bord haut-gauche du bloc.
- **Variantes** : `--video` (accueil) ; `--image` (hubs « Agir avec nous », « Faire un don », listing Actualités avec article-phare) ; `--campagne` (bouton Soleil, sur-titre « Urgence »). Thème du bloc : `t-foret` (défaut), `t-pousse` (rare).
- **Animation** : aucune à l'arrivée (le LCP doit s'afficher tel quel). La vidéo apparaît en fondu (opacité 0 → 1, `--dur-standard`) quand elle peut jouer (`canplay`).
- **A11y** : la vidéo est décorative (`aria-hidden="true"`, pas de piste audio) ; le bouton a `aria-label` qui bascule « Mettre la vidéo en pause » / « Lire la vidéo » et `aria-pressed` ; WCAG 2.2.2 respecté (contenu animé > 5 s pausable).

### 4.7 En-tête de page interne

Gabarit B de Prosper (STRUCTURE §4.2), le plus fréquent.

- **Anatomie** : fil d'Ariane (dès le niveau 2) → **h1** (`--fs-h1`, Titre 600, aligné à gauche dans `--measure-media`, `padding-block: --space-12 --space-10`) → chapeau facultatif (`--fs-lead`, `--measure-intro`) → **image d'en-tête** 16:9 pleine largeur (`--container-wide`) avec **légende-cartouche** (§4.8).
- **Variantes** :
  - `--texte` (gabarit C : légal, transparence, contact) : h1 dans `--measure-text`, sans image, date de mise à jour en `--fs-small` Mousse.
  - `--article` : h1 + sous-titre (h2 visuel en `--fs-lead`), image, **ligne méta** (date à gauche, partage à droite).
  - `--projet` : sur-titre (badge statut + domaine), h1 (titre court), titre officiel en `--fs-lead` Mousse, image, puis la fiche d'identité (§4.27).
  - `--zone` : h1 = nom de la zone, phrase-bilan en `--fs-h3` sous l'image.
- **Responsive** : mobile, image en 4:3 (direction artistique `<picture>`), légende **sous** l'image (cartouche pleine largeur) ; ≥ 48em, cartouche à cheval sur le bas de l'image.
- **A11y** : l'image d'en-tête est chargée en `loading="eager"` + `fetchpriority="high"` (LCP des pages internes).

### 4.8 Légende-cartouche (signature)

- **Anatomie** : `<figure>` + `<figcaption>` ; le cartouche est un aplat **Pousse 300**, texte Forêt `--fs-caption` (13–14 px), interligne 1,4, padding `--space-3 --space-4`, `max-inline-size: var(--caption-max)` (24 rem). Un **carré Soleil** (marche) de 5 × 4,375 rem dépasse à gauche du cartouche (`::before`, `z-index: var(--z-below)` relatif).
- **Position** : à cheval sur le bas de l'image (`translate: 0 50%`), aligné sur la colonne de texte (marge gauche = `--space-24` en desktop).
- **Contenu** : légende **narrative** obligatoire — « Prénom, rôle, action, localité (préfecture). » + crédit « © APSUD / Nom du photographe » en fin.
- **Variantes** : `--hero` (en-tête de page) ; `--bottom` (image de corps : cartouche sous l'image, aligné à gauche, sans marche) ; `--simple` (diptyque : texte Mousse sous l'image, sans aplat).
- **A11y** : la légende ne remplace pas l'`alt` (l'`alt` décrit l'image, la légende raconte).

### 4.9 Sur-titre (eyebrow / overline)

Prosper n'en met presque jamais ; APSUD en met **seulement là où il informe** (cartes et en-têtes de projet, d'offre, d'actualité). Jamais au-dessus d'un h2 de section.

- **Anatomie** : goutte-feuille de 8 px (couleur selon le statut : Soleil = en cours, Vert APSUD = réalisé, Mousse = neutre) + texte Condensée 700 `--fs-overline`, interlettrage 0,03 em, **casse de phrase** (pas de capitales), segments séparés par « · ». Ex. : « En cours · Eau, hygiène et assainissement · Ouaka ».
- Couleur du texte : Forêt (sur clair), Coton (sur sombre).

### 4.10 Boutons

- **Métriques communes** : Condensée 800, `--fs-button`, interligne 1,1 ; padding `--button-pad-block --button-pad-inline` ; `min-block-size: var(--button-min-h)` (44 px ; 48 px en mobile pour les CTA principaux) ; `border-radius: var(--radius-control)` ; bordure 1 px de la couleur du fond ; `white-space: nowrap` (sauf mobile étroit : `normal`) ; icône facultative **après** le texte (flèche, téléchargement), 20 px, écart `--space-2`.
- **Variantes** :

| Variante | Fond / texte | Survol | Actif | Usage |
|---|---|---|---|---|
| `c-button` (primaire) | Vert APSUD / blanc | Vert 600 | Vert 700 | Action principale d'une section ; « Faire un don » du header |
| `--don` | Soleil 400 / Forêt | Soleil 600 | Soleil 700 | Don, campagne, urgence ; **un seul par écran** |
| `--encre` | Forêt / Pousse 300 | Forêt 950 | Vert 800 | Envoi de formulaire, bouton sur fond Pousse |
| `--sur-sombre` | Pousse 300 / Forêt | Pousse 600 | Pousse 700 | Bouton principal sur fond Forêt |
| `--contour` | transparent / Forêt, bordure 1 px + `outline` 1 px | `outline` → **3 px** | fond Pousse 100 | Action secondaire (« Voir tous les projets ») |
| `--contour-sur-sombre` | transparent / Coton, bordure Coton | `outline` 3 px Coton | fond Forêt 950 | Secondaire sur sombre |
| `--carre` (tertiaire) | transparent / Forêt, bordure 1 px, **rayon 0** | se **remplit** en Forêt, texte Coton | — | Actions dans les tuiles et filtres |
| `--texte` | — / Forêt souligné | soulignement 2 px | — | Action discrète |

- **Tailles** : `--small` (padding `--space-1 --space-4`, `--fs-small` → 16 px, min 36 px de haut en desktop, **44 px en mobile**) ; défaut ; `--large` (`--fs-button-lg`, padding `--space-3 --space-6`, interlettrage −0,01 em) pour les CTA de fin de page et le don.
- **États** : focus visible = anneau `--focus-width` `--color-focus` décalé `--focus-offset` ; désactivé = Sable / Mousse, `aria-disabled="true"` (pas l'attribut `disabled` sur les liens) ; **chargement** = libellé conservé + anneau tournant de 16 px (trait 2, `--ease-linear` 900 ms) à droite, `aria-busy="true"`, largeur figée (pas de saut).
- **Animation** : couleur de fond en `--dur-short` `--ease-in` (valeur Prosper) ; `outline-width` en `--dur-short` `--ease-out` ; la flèche facultative glisse de 4 px au survol (`translate`, `--dur-short` `--ease-out`). Pas d'échelle, pas d'ombre.
- **Responsive** : en mobile, les boutons de fin de section passent en pleine largeur (`inline-size: 100%`) quand ils sont seuls ; deux boutons s'empilent avec `--space-3` d'écart.
- **Règle** : `<a>` pour naviguer, `<button>` pour agir. Libellés 1 à 4 mots, verbes d'action (« Découvrir le projet », « Postuler », « Télécharger le rapport (PDF, 2,4 Mo) »), jamais « Cliquez ici » ni « En savoir plus » seul.

### 4.11 Lien fléché et liens d'action

- **Lien d'action** (`c-link-action`, équivalent du « Read more » de Prosper) : Texte **800** (pas Condensée), `--fs-body`, souligné 1 px (`--color-link-decoration`), `text-underline-offset: 2px`, suivi de l'icône `fleche-droite` 1 em.
- **États** : survol/focus du lien **ou de la carte parente** (`.c-card:hover .c-link-action`, `:focus-within`) : `--underline-thickness` 1 → 2 px (`--dur-short` `--ease-out`) + flèche `translate: 4px 0`.
- **Variante externe** : icône `fleche-haut-droite` + `rel="noopener"` + texte masqué « (site externe) ».
- **Variante téléchargement** : icône `telechargement` + format et poids entre parenthèses, calculés au build (« Rapport annuel 2025 (PDF, 2,4 Mo) »).
- **Lien de texte courant** : voir §2.2.4.

### 4.12 Carte projet (composant central)

- **Anatomie** (de haut en bas) :
  1. **Média** 4:3 (`--card-media-ratio`), `object-fit: cover`, rayon 0. **Badge de statut** en cartouche sur le bord bas-gauche du média, à cheval (`translate: 0 50%`) : « En cours » (Soleil 400 / Forêt) ou « Réalisé » (Vert 100 / Vert 700), Condensée 700 `--fs-overline`, padding `--space-1 --space-3`, rayon 4 px.
  2. **Sur-titre** : domaine(s) · zone principale (« Eau, hygiène et assainissement · Ouaka »).
  3. **Titre** h3 visuel `--fs-h4` Condensée 700 (titre **court** du projet, ≤ 70 caractères ; le titre officiel n'apparaît que sur la fiche).
  4. **Chapeau** (1–2 lignes, `--fs-body`, `line-clamp: 3` en desktop).
  5. **Métadonnées** en `<dl>` horizontal, `--fs-small` Mousse : icône `calendrier` + « 2023 – 2025 » ; icône `bailleur` + sigle du ou des bailleurs (« FH/OCHA, BMZ ») ; icône `beneficiaires` + « 12 400 personnes » si disponible.
  6. **Lien d'action** « Découvrir le projet » (lien étendu sur toute la carte).
- **Variantes** :
  - `--large` (mise en avant accueil) : grille asymétrique **58,58 % / 41,42 %**, la 2ᵉ carte décalée de `--space-24` vers le bas (≥ 37.5rem de conteneur) ; titre en `--fs-h3`.
  - `--standard` (listing, grille 1 / 2 / 3 colonnes).
  - `--compact` (projets liés, encadré « Projet lié » d'un article) : média 1:1 de 6 rem à gauche, titre `--fs-h6`, statut, période ; pas de chapeau.
- **États** : survol/focus-within : **une marche Pousse 300 de 0,5 rem** se déploie sous le média (`scaleX(0 → 1)` depuis la gauche, `--dur-standard` `--ease-in-out`) + soulignement du lien 1 → 2 px. **Pas de zoom d'image, pas d'ombre, pas de montée de la carte.** Focus clavier : anneau autour de la carte entière (`:focus-within` avec `outline` sur la carte).
- **Responsive** : mobile 1 colonne, gap `--space-10` ; ≥ 37.5em 2 colonnes ; ≥ 55em 3 colonnes (listing).
- **Données** : `titre_court`, `statut`, `domaines`, `zones`, `date_debut/fin`, `bailleurs`, `beneficiaires_total`, `chapeau`, `image_principale` (PROSPER_STRUCTURE §14.2). Champs absents = ligne masquée, jamais « N/A ».

### 4.13 Carte actualité (tuile)

- **Anatomie** : média **3:2** (facultatif) ; **date** (`<time>`, Texte 700 `--fs-small`, Mousse) + catégorie (« Terrain », « Communiqué ») sur la même ligne, séparées par « · » ; titre h3 visuel `--fs-h5` ; chapeau 2 lignes (`line-clamp: 2`) ; lien d'action « Lire l'article ».
- **Variantes** : `--image` ; `--texte` (communiqués, presse : fond Coton, padding `--space-6`, pas d'image, filet haut 4 px Vert APSUD) ; `--externe` (« APSUD dans les médias » : nom du média en sur-titre, icône lien externe) ; `--une` (article-phare en hero du listing).
- **États** : comme la carte projet (marche sous le média, soulignement). Version `--texte` : la marche est le filet haut qui passe de 4 à 8 px.
- **Responsive** : 1 / 2 / 3 colonnes ; en mobile, variante horizontale compacte possible dans les listes « liées » (image 1:1 de 5,5 rem à gauche).

### 4.14 Carte offre d'emploi (ligne)

Les offres se lisent en **liste**, pas en grille (comme le listing Jobvite, mais sur le site).

- **Anatomie** (ligne séparée par un filet haut 1 px Ligne, padding-block `--space-6`) :
  - Colonne gauche : **badges** type de contrat (« CDD », « Consultance », « Stage ») en contour 1 px Forêt, rayon 4 px, `--fs-overline` ; **intitulé** h3 visuel `--fs-h5` (lien étendu) ; métadonnées : `localisation` + lieu (« Bambari, Ouaka »), projet lié éventuel, référence (« APSUD/RH/2026/012 », Mousse).
  - Colonne droite : **date limite** (`echeance` + « Jusqu'au 12 décembre 2026 ») + **badge d'échéance** : « Clôture dans 5 jours » (Soleil 100 / Soleil 800) si ≤ 7 jours, « Clôture demain » (Erreur 100 / Erreur) si ≤ 1 jour ; flèche 24 px.
- **États** : survol : fond de ligne Coton (`--dur-shortest`), flèche glisse de 4 px ; clôturée : badge « Clôturée » (Sable / Mousse), intitulé en Mousse, ligne non cliquable vers la candidature mais lien vers la fiche archivée ; offre pourvue : masquée du listing par défaut.
- **Responsive** : mobile, tout empilé ; la date limite passe sous l'intitulé ; cible de toute la ligne ≥ 64 px.
- **État vide** : boîte Coton « Aucune offre ouverte pour le moment » + lien « Déposer une candidature spontanée » + rappel « APSUD ne demande jamais de frais de candidature ».
- **Variante** `--appel-offres` : même composant ; badges « Travaux / Fournitures / Services », statut ouvert / clos / attribué, référence en premier.

### 4.15 Chiffres clés (manifeste + compteurs)

Reproduction fidèle du `c-quick-stats` de Prosper, avec la goutte-feuille à la place du chevron.

- **Anatomie** (section `t-coton`) :
  1. **Manifeste** : la mission APSUD en une phrase (≈ 20–30 mots), `--fs-display`, Titre 600, interligne 1,0, `max-inline-size: var(--measure-media)`, aligné à gauche. Ce n'est **pas** un titre (`<p class="c-stats__statement">`), le h2 de la section est masqué (« APSUD en chiffres »).
  2. **Grille** ≥ 48em : `[goutte] [marche] [panneau]` = `minmax(6rem, 1fr) 2rem minmax(0, 3fr)` alignée à droite du conteneur ; la **goutte-feuille géante** (Vert APSUD, 10–16 rem) à gauche, la **marche** Pousse 100 qui monte derrière, le **panneau Pousse 300** (padding `--space-6` → `--space-16`) qui contient les chiffres.
  3. **Chiffres** dans le panneau : `<dl>` en 2 colonnes (gap `--space-6` → `--space-12`), 4 items. Chaque item : `<dd>` chiffre `--fs-stat` Titre 600 tabulaire + suffixe éventuel (« + », « % ») ; `<dt>` libellé 5–10 mots `--fs-body` ; source en `--fs-caption` Vert 800 (« Source : fiches projets APSUD, 2018–2026 »).
- **Données** : type « Chiffre clé » (STRUCTURE §14.12) ; **un chiffre non validé par APSUD n'est pas publié** (`valide_par_apsud`). Les pistes déduites (13 projets, 12 préfectures + Bangui, ≈ 250 000 bénéficiaires, 1 900 latrines…) restent à valider.
- **Animation** (§6) : la goutte glisse de −40 % en X et la marche croît (`scaleY 0 → 1` depuis le bas) : délai `--delay-signature`, durée `--dur-signature`, `--ease-in-out` ; puis chaque chiffre compte de 0 à sa valeur en `--dur-count`, décalage `--stagger-count` × index, `--ease-out`, formaté `fr-FR`. Déclenché une fois quand 50 % du bloc est visible.
- **Sans JS / mouvement réduit** : valeurs finales affichées directement (elles sont dans le HTML ; le JS ne fait que réécrire le texte pendant l'animation, avec `aria-hidden` sur la version animée et la valeur finale dans un `<span class="u-visually-hidden">`).
- **Responsive** : mobile : manifeste puis panneau pleine largeur, chiffres en 2 colonnes dès 30em (1 colonne en dessous) ; la goutte devient petite (5 rem) et se pose en haut à droite du panneau, à cheval.
- **Variante** `--domaine` / `--zone` / `--projet` : 3 chiffres, sans manifeste, panneau seul.

### 4.16 Bandeau partenaires et bailleurs (logos)

Priorité n°1 du client (INSTRUCTIONS §2).

- **Anatomie** : h2 de section aligné à gauche (« Ils financent et accompagnent nos actions ») + phrase d'intro ; **grille de logos** dans `--measure-logos` → `--container` : cellules blanches de ratio 3:2, séparées par des filets 1 px Ligne (effet tableau, pas de cartes flottantes), logo centré `max-block-size: 3.5rem; max-inline-size: 70%`, `object-fit: contain`. Lien « Tous nos partenaires et bailleurs » en fin.
- **Couleur des logos** : **en couleur d'origine**, sans filtre gris. Raison : les chartes de visibilité des bailleurs (ex. emblème de l'Union européenne) interdisent de modifier leurs logos ; l'uniformité vient des **cellules identiques**, pas de la décoloration. Version monochrome **uniquement** si le partenaire fournit une version officielle (`logo_monochrome`). Respecter les règles notées dans `docs/memoire/PARTENAIRES.md` et le champ `autorisation_usage_logo`.
- **Variantes** : `--accueil` (8–12 logos marqués `afficher_bandeau_accueil`) ; `--complet` (page Partenaires : onglets ou puces par catégorie « Bailleurs institutionnels · Agences des Nations unies · ONG internationales · Partenaires techniques et État », chaque cellule ouvre la fiche partenaire) ; `--projet` (bailleurs d'un projet, 2–4 logos plus grands avec rôle : « Bailleur », « Chef de file du consortium »).
- **États** : cellule survolée : fond Coton + nom du partenaire révélé sous le logo en `--fs-caption` (il est toujours présent pour les lecteurs d'écran via `alt="Nom complet (sigle)"`) ; focus : anneau sur la cellule.
- **Responsive** : 2 colonnes (mobile), 3 (≥ 37.5em), 4 (≥ 55em), 6 (≥ 80em). **Pas de carrousel défilant**.

### 4.17 Citation / témoignage

- **Anatomie** (`<figure>` + `<blockquote>` + `<figcaption>`) : **carré Soleil** de 2,5 rem portant un guillemet « « » en Titre 600 Forêt (rôle du carré paille de Prosper) ; citation `--fs-quote` Condensée 500, interligne 1,3, Forêt, ≤ 280 caractères ; attribution : nom (Texte 700) + qualité et localité (Mousse) — ex. « Présidente d'une association de femmes, Ippy (Ouaka) » ; mention de langue si traduit (« Propos recueillis en sango et traduits »).
- **Variantes** : `--image` (portrait 1:1 à gauche, `flex-basis: 30.375rem` en desktop, la citation à droite calée en bas, fond Coton) ; `--simple` (centrée dans `--measure-media`, sans image) ; `--sur-sombre` (`t-foret`, carré Soleil conservé).
- **Règles** : citations **réelles et attribuées**, consentement enregistré ; anonymisation signalée (« nom changé* »). Pas de carrousel de témoignages : un témoignage par page, choisi.
- **Responsive** : mobile, portrait au-dessus (4:3), citation en dessous.

### 4.18 Bloc image + texte alterné (zigzag)

Signature de mise en page Prosper (`l-side-by-side`).

- **Anatomie** : grille 2 colonnes `1fr 1fr`, lignes `1fr 3fr auto` ; **image** sur les lignes 1–3 ; **boîte Coton** sur les lignes 2–4, qui **chevauche le bas** de l'image et la dépasse ; dans la boîte : h3 (`--fs-h3`, 3–5 mots, titre-slogan), texte 1–3 phrases (avec un chiffre), lien d'action. Padding de la boîte `--space-5` → `--space-10` (≥ 80em).
- **Variantes** : `--image-gauche` / `--image-droite` (alternance **automatique** : nth-of-type) ; `--pictogramme` (le pictogramme thématique de 64 px s'ajoute en haut de la boîte : pages domaines) ; `--citation` (le h3 est une citation entre guillemets).
- **Images** : 1:1 en desktop (≥ 48em, 480 × 480 affichés), 4:3 en mobile, via `<picture>` (direction artistique).
- **Responsive** : mobile : image puis boîte collée en dessous (la boîte remonte de `--space-8` sur l'image, décalée de `--space-6` à droite) ; l'alternance est neutralisée.
- **Animation** : révélation douce (opacité 0,3 → 1 sur la boîte, `--dur-standard`, `--ease-out`, seuil `min(0.5, hauteur fenêtre / hauteur bloc)`), **uniquement** avec `.js-reveal`.

### 4.19 CTA (don, partenariat)

- **CTA simple** `c-cta` : panneau pleine largeur du conteneur, padding `--space-6` → `--space-12` ; h2 visuel `--fs-h3` Condensée 800 (32 → 43 px), 1 phrase, 1 bouton. Thèmes : `t-foret` (bouton Soleil pour le don, Pousse sinon), `t-pousse-pale`, `t-coton`, `t-pousse`.
- **Double CTA** `c-cta-double` (fin de **presque toutes les pages**) : titre de groupe facultatif centré (h2, `--fs-h3`) + 2 panneaux côte à côte (≥ 48em, gap `--space-6`) : à gauche **« Soutenir nos actions »** (`t-foret`, bouton Soleil « Faire un don »), à droite **« Devenir partenaire »** (`t-pousse-pale`, bouton primaire). Contenus paramétrables (champ `cta_fin`).
- **CTA image** `--image` : photo à droite (50 % → 40 % ≥ 80em), contenu à gauche, **goutte-feuille géante** (Vert APSUD) collée sur le bord gauche à cheval sur la photo (rôle du chevron 108 × 132 de Prosper).
- **Raccord avec le footer** : si le dernier bloc d'une page est sur Coton ou Pousse, le footer en tient compte (§4.24).
- **Responsive** : panneaux empilés, boutons pleine largeur.

### 4.20 Inscription à la lettre d'information

- **Emplacement** : footer (colonne de droite) ; éventuellement fin des articles.
- **Anatomie** : titre h2 visuel `--fs-h6` (« Recevoir nos nouvelles ») ; 1 phrase (« Un e-mail par mois : projets, offres d'emploi, rapports. ») ; champ e-mail (libellé visible) ; case de consentement explicite non cochée ; bouton `--encre` « S'inscrire » ; mention de confidentialité `--fs-caption` + lien.
- **États** : erreur de champ (§4.26) ; envoi (bouton en chargement) ; **succès** : le formulaire est remplacé par un message dans une zone `aria-live="polite"` (« Merci. Confirmez votre adresse dans l'e-mail que nous venons d'envoyer. ») — **double opt-in**.
- **Pas de SMS** (Prosper en propose ; inutile ici).
- **Responsive** : champ et bouton empilés < 30em, en ligne au-delà dans la colonne.

### 4.21 Filtres de listing

Absents chez Prosper (selects + bouton « Appliquer ») ; APSUD a besoin de filtres **tactiles et partageables**.

- **Anatomie (≥ 55em)** : barre au-dessus de la grille, collante sous le header (`position: sticky; top: var(--header-h); z-index: var(--z-sticky)`, fond blanc, filet bas Ligne) :
  1. **Statut** en contrôle segmenté (`role="radiogroup"` de puces) : « Tous (13) · En cours (2) · Réalisés (11) ».
  2. **Domaine** : puces cochables (multi-sélection), avec pictogramme 20 px.
  3. **Préfecture**, **Bailleur**, **Année** : boutons-déroulants (« Préfecture ▾ ») ouvrant un panneau flottant (bordure Forêt + `--shadow-step`) avec cases à cocher et compteurs ; bailleurs avec mini-logo.
  4. Compteur de résultats `aria-live="polite"` (« 7 projets ») + bouton texte « Tout effacer ».
  5. Rangée des **filtres actifs** en puces supprimables (« Ouaka × »).
  6. Bascule **Grille / Carte** (projets) à droite.
- **Puce** : Condensée 700 `--fs-small`, hauteur 40 px (48 px en mobile), padding `--space-2 --space-4`, **rayon 0** (puces carrées, signature orthogonale), bordure 1 px Forêt. Survol : `outline` 3 px ; sélectionnée : fond Forêt, texte Pousse, icône `coche` 16 px ; compteur 0 : `aria-disabled`, texte Mousse, bordure Ligne.
- **Mobile (< 55em)** : un bouton « Filtrer (3) » (icône `filtre`) + le segmenté Statut restent visibles ; le reste s'ouvre dans un **dialogue plein écran** (`<dialog>`, `--z-modal`) qui monte du bas (`translateY(100%) → 0`, `--dur-menu` `--ease-out`), sections en accordéon, et un bouton collant en bas « Afficher 7 projets » (`--encre`, pleine largeur) + « Effacer ».
- **Comportement** : filtres reflétés dans l'URL (`?statut=en-cours&domaine=wash&zone=ouaka&bailleur=fh&annee=2024`) via `history.replaceState` ; liens « voir plus » des pages domaine/zone pointent vers le listing **pré-filtré** ; résultats filtrés côté client (données JSON générées au build, < 30 Ko) ; **sans JS** : tous les projets sont affichés (groupés par statut) et les pages domaine/zone servent de filtres.
- **A11y** : groupes en `<fieldset>` + `<legend>` ; puces = `<button aria-pressed>` (multi) ou radios stylées (statut) ; annonce du nombre de résultats ; focus rendu au déclencheur à la fermeture du dialogue.

### 4.22 Pagination et « Charger plus »

- **Par défaut : « Charger plus »** (meilleur en 3G que des pages entières) : bouton `--contour` centré « Afficher 9 projets de plus » + indication « 9 sur 23 » + barre de progression fine (2 px, Vert APSUD sur Ligne). Le bouton est un **lien** `href="?page=2"` amélioré en JS (charge le fragment, ajoute les cartes, déplace le focus sur la première nouvelle carte, met à jour l'URL).
- **Pagination numérotée** (actualités, ressources, pour le référencement) : `<nav aria-label="Pagination">` ; cases carrées 44 × 44 (rayon 0), Condensée 700 ; page courante : fond Forêt, texte Pousse, `aria-current="page"` ; survol : `outline` 3 px ; « Précédent / Suivant » avec flèches ; ellipse « … » au-delà de 7 pages ; en mobile : « Précédent · Page 2 sur 9 · Suivant ».

### 4.23 Fil d'Ariane

- **Anatomie** : `<nav aria-label="Fil d'Ariane">` + `<ol>` ; Texte 500 `--fs-small` ; liens Forêt soulignés au survol seulement ; séparateur `chevron-bas` tourné (`.is-right`), 12 px, Mousse, `aria-hidden` ; page courante non liée, `aria-current="page"`, Mousse.
- **Présent** à partir du niveau 2 (pas sur l'accueil ni les hubs de premier niveau). Il porte le **terme technique** quand le h1 est un slogan.
- **Mobile** : seul le parent direct est affiché, précédé d'une flèche gauche (« ← Nos actions »), cible 44 px.
- **SEO** : JSON-LD `BreadcrumbList`.

### 4.24 Footer

- **Anatomie** (de haut en bas) :
  1. **Bord supérieur en escalier** : 3 marches Pousse 300 (`__step--1/2/3`) de hauteurs 0 / 4,3125 rem / 8,5625 rem (≥ 80em), 1,75 rem en mobile ; elles « mordent » dans la section précédente.
  2. **Corps** `t-pousse` (padding `--space-10 var(--gutter)`, `--space-16` en haut ≥ 80em), grille ≥ 80em : `[signature 26.875rem] [L'ONG] [Nos actions] [Agir] [Lettre d'information 20rem]` :
     - **Signature** : le slogan APSUD (« Nous sauvons des vies et accompagnons le développement local », **à confirmer**) en Condensée 700 2,5 rem, interligne 1.
     - **3 colonnes de liens** (titres Condensée 700 `--fs-h6`, casse de phrase, liés aux hubs ; liens Texte 400 `--fs-small`, cibles 44 px en mobile) — contenu : PROSPER_STRUCTURE §3.4.
     - **Coordonnées** (absentes chez Prosper, indispensables ici) sous la signature : siège Micheline, Bimbo ; B.P. ; téléphones `tel:` ; e-mail principal (**à arbitrer**) ; horaires ; bouton WhatsApp.
     - **Lettre d'information** (§4.20).
     - **Réseaux** : glyphes officiels 24 px dans des cibles 44 × 44 ; survol : fond Pousse 100. Ne publier que les comptes **réellement actifs** (Facebook, X ; Instagram et LinkedIn à confirmer).
  3. **Bas de footer** `t-coton` (ou Sable si la section précédente est Coton) : logo couleur ; « ONG nationale de droit centrafricain — Agrément n° … » (**à obtenir**) ; liens Mentions légales · Confidentialité · Cookies · **Gérer les cookies** (bouton qui rouvre le panneau) · Plan du site ; © APSUD + année ; **pastille de preuve** (rôle de l'anneau « 86 % » de Prosper) : anneau SVG Vert APSUD + phrase courte, ex. « 13 projets dans 12 préfectures et Bangui depuis 2018 » (**chiffres à valider**) + lien vers Transparence.
- **Raccord** : si la dernière section de la page est en Pousse, les marches sont supprimées et le corps se colle (classe posée au build, sans JS).
- **Responsive** : mobile : signature → coordonnées → colonnes de liens en **accordéons** (`<details>`) → lettre d'information → réseaux → bas de footer ; tout en 1 colonne.
- **Animation** : l'anneau de la pastille se dessine (`stroke-dashoffset`, 2 s `--ease-out`) quand il est entièrement visible ; rien d'autre.
- **A11y** : `<footer>` ; chaque colonne est un `<nav aria-labelledby>` ; le bouton « Gérer les cookies » est un `<button>`.

### 4.25 Bandeau cookies + panneau de préférences

Conforme RGPD et recommandations CNIL (bailleurs européens), au style du site (INSTRUCTIONS §4.5).

- **Principe** : aucun cookie ou traceur non essentiel avant le choix ; **refuser aussi simple qu'accepter** ; choix conservé **6 mois** puis redemandé ; lien permanent « Gérer les cookies » dans le footer. Si le site n'utilise finalement **aucun** traceur soumis à consentement (mesure d'audience exemptée type Matomo auto-hébergé correctement configuré, pas d'intégrations tierces), le bandeau devient inutile : le garder seulement pour les contenus externes (vidéos, cartes).
- **Bandeau** `c-cookie-banner` :
  - Desktop : **carte flottante en bas à gauche** (`inset: auto auto var(--space-6) var(--space-6)`, `max-inline-size: 28rem`), fond blanc, bordure 1 px Forêt, **`--shadow-step`** (ombre pleine Pousse décalée de 8 px), rayon 0. Mobile : **pleine largeur en bas**, collée au bord, `padding-bottom: max(var(--space-4), env(safe-area-inset-bottom))`.
  - Contenu : titre h2 visuel `--fs-h6` (« Vos choix sur les cookies ») ; 2 phrases claires (à quoi servent les cookies, que rien n'est déposé sans accord) ; lien « Politique cookies ».
  - **3 boutons de même poids visuel** (même variante `--contour`, même taille) : « Tout refuser » · « Personnaliser » · « Tout accepter » ; en mobile, empilés en pleine largeur dans cet ordre. Lien discret « Continuer sans accepter » en haut à droite (équivaut à refuser).
  - Ne masque **pas** le contenu (pas de voile) ; ne bloque pas le défilement ; n'apparaît **qu'après** l'affichage du LCP (insertion en JS après l'événement `load`). Sans JS, aucun traceur ne peut être chargé, donc aucun bandeau n'est nécessaire.
  - Animation : `translateY(1rem) + opacity 0 → 0/1`, `--dur-intro` `--ease-out` ; fermeture `--dur-outro` `--ease-in`.
- **Panneau de préférences** (`<dialog>` modal, `--z-modal`) : desktop centré `max-inline-size: 40rem`, mobile plein écran ; titre, intro, puis **catégories en accordéon** :
  1. *Nécessaires* — « Toujours actifs » (texte, pas d'interrupteur) : préférence de langue, fermeture d'annonce, consentement lui-même.
  2. *Mesure d'audience* — interrupteur (désactivé par défaut).
  3. *Contenus externes* (vidéos YouTube/Vimeo, cartes, publications de réseaux sociaux) — interrupteur ; tant qu'il est refusé, chaque contenu externe affiche une **façade** (image + bouton « Afficher la vidéo (YouTube dépose des cookies) »).
  Chaque catégorie : description 1–2 phrases + « Voir les cookies » (tableau nom / finalité / durée). Pied : « Tout refuser » · « Enregistrer mes choix » · « Tout accepter ».
- **Interrupteur** `c-switch` : `<button role="switch" aria-checked>` ; piste 44 × 24, bordure 2 px Forêt ; activé : piste Forêt, curseur Pousse avec `coche` ; désactivé : piste blanche, curseur Forêt ; transition `--dur-short` `--ease-out` ; libellé texte à gauche, état écrit (« Activé / Désactivé ») pour ne pas dépendre de la couleur.
- **Stockage** : cookie first-party `apsud_consent` (JSON : version, date, catégories), durée 6 mois ; changement de version de la politique = nouvelle demande.
- **Outil** : implémentation maison (≈ 3 Ko) ou **tarteaucitron.js** / **Klaro** stylés aux tokens (PROSPER_TOKENS §19.3). Pas de OneTrust.
- **A11y** : le bandeau est une région `role="region" aria-label="Consentement aux cookies"` (pas une modale bloquante) ; il est placé **en début de DOM** après le lien d'évitement pour être atteint vite au clavier ; le panneau est un vrai `<dialog>` (focus piégé, `Échap`).

### 4.26 Formulaires

- **Champ** : libellé **au-dessus** (Texte 500 `--fs-body`, interlettrage 0,5 px), aide facultative (`--fs-small` Mousse, reliée par `aria-describedby`) ; contrôle **48 px** de haut (`--control-h`, Prosper : 42 px — on agrandit pour le tactile), padding `0 var(--space-3)`, fond blanc, bordure 1 px Forêt, rayon 4 px, Texte 500 **16 px minimum** (évite le zoom iOS), texte Forêt, placeholder Mousse (jamais à la place du libellé).
- **Obligatoire** : mention texte « (obligatoire) » dans le libellé, pas seulement un astérisque ; ou à l'inverse « (facultatif) » si la majorité des champs est obligatoire.
- **États** : survol : bordure 2 px (`box-shadow: inset 0 0 0 1px`) ; focus : anneau 2 px Forêt décalé 2 px ; **erreur** : bordure Erreur 2 px, fond Erreur 100, icône `alerte` 20 px à droite, message sous le champ (`--fs-small`, Erreur, préfixé de l'icône, `id` relié par `aria-describedby`, `aria-invalid="true"`) ; succès (après validation serveur) : icône `coche` Vert 600 ; désactivé : bordure Ligne, fond Sable.
- **Récapitulatif d'erreurs** : en haut du formulaire après envoi raté, boîte Erreur 100 avec filet gauche 4 px Erreur, titre « 2 champs à corriger » et liens vers chaque champ ; le focus y est déplacé.
- **Textarea** : min 6 lignes, `resize: vertical`, compteur de caractères si limite (`aria-live="polite"` à 80 %).
- **Select** : `appearance: none` + `chevron-bas` 16 px à droite ; pour plus de 15 options (pays), select natif conservé.
- **Case à cocher / radio** : 24 × 24, bordure 2 px Forêt, rayon 4 px (case) / rond (radio) ; cochée : fond Forêt + `coche` Pousse ; survol : bordure 3 px ; libellé cliquable, cible totale ≥ 44 px de haut.
- **Fichier** (CV, PDF ≤ 5 Mo) : bouton `--contour` « Choisir un fichier » + nom du fichier choisi + « Formats acceptés : PDF, DOCX. 5 Mo maximum. » ; glisser-déposer en bonus (zone bordée 1 px Forêt, **pas de pointillés**).
- **Anti-spam** : champ piège masqué (*honeypot*) + délai minimal de remplissage ; pas de CAPTCHA visuel.
- **Mise en page** : 1 colonne en mobile ; 2 colonnes ≥ 48em pour les champs courts (nom / e-mail) ; largeur max `--measure-text`.
- **Bouton d'envoi** : `--encre`, `min-inline-size: 10rem`, état de chargement (§4.10).
- **Confirmation** : page ou panneau de succès (fond Vert 50, filet gauche 4 px Vert 600, titre, ce qui va se passer ensuite et quand).

### 4.27 Composants complémentaires

| Composant | Anatomie | Règles |
|---|---|---|
| **Badge de statut** `c-badge` | Condensée 700 `--fs-overline`, padding `--space-1 --space-3`, rayon 4 px | En cours (Soleil / Forêt) ; Réalisé (Vert 100 / Vert 700) ; Ouvert (Pousse 100 / Vert 700) ; Clôturé (Sable / Mousse) ; toujours un **mot**, jamais une pastille de couleur seule |
| **Fiche d'identité projet** `c-project-facts` | `<dl>` en encadré Coton, colonne latérale (≥ 80em, collante) ou bloc sous l'en-tête (mobile) : Code, Période, Statut, Zones (liens), Bailleur(s) (logos), Partenaires de mise en œuvre, Budget (si publiable), Bénéficiaires | `<dt>` Condensée 700 `--fs-small` ; `<dd>` Texte `--fs-body` ; filets Ligne entre lignes |
| **En bref** `c-key-points` | Encadré Coton, filet gauche 4 px Vert APSUD, titre « En bref » (`--fs-h6`), 3 puces goutte-feuille 10 px | En tête des projets et actualités |
| **Fichier téléchargeable** `c-file` | icône `document` 48 px + titre + type · année · format · poids (« PDF, 2,4 Mo ») + bouton `telechargement` | Poids calculé au build ; avertir au-delà de 5 Mo (« fichier lourd ») |
| **Carte de la RCA** `c-map-rca` | SVG maison des 16 préfectures + Bangui (léger, ≤ 40 Ko, simplifié), préfectures remplies selon le statut (`--color-map-*`), contours Forêt 0,75 px, repères goutte-feuille pour les bases ; légende (« Projets en cours · Projets réalisés · Pas de projet publié ») ; info-bulle (bordure Forêt + `--shadow-step`) : nom, nombre de projets, domaines, lien | Chaque préfecture = lien focusable (`<a>` dans le SVG) ; **liste textuelle équivalente** sous la carte (la couleur n'est jamais seule) ; pas de Google Maps |
| **Partage** `c-share` | « Partager » + WhatsApp, Facebook, LinkedIn, E-mail, Copier le lien ; sur mobile, bouton unique Web Share API en premier | Liens de partage simples (pas de SDK tiers, pas de cookies) |
| **Onglets** `c-tabs` | Liste d'onglets en puces carrées (style §4.21), panneau en dessous | Moyens de don (Mobile Money / Virement / Depuis l'étranger / En nature) ; `role="tablist"`, flèches clavier |
| **Accordéon / FAQ** `c-accordion` | `<details>` + `<summary>` (Condensée 700 `--fs-h6`, icône plus/moins à droite), filets Ligne | Contenu présent dans le HTML (indexable) |
| **Sommaire d'ancres** `c-toc` | Liste Condensée 600 `--fs-small`, filet gauche 2 px Ligne, entrée active : filet Vert APSUD 4 px | Pages légales, éthique ; collant à gauche ≥ 80em, `<details>` replié en mobile |
| **Tableau** `c-table` | En-tête Coton, Condensée 700 ; lignes séparées par filets Ligne ; nombres alignés à droite, tabulaires | Rapports par année, budgets ; en mobile : défilement horizontal dans un conteneur `role="region" tabindex="0" aria-label`, avec l'indication « Faites défiler → » sous le tableau (pas d'ombre ni de dégradé de bord) |
| **Diptyque** `l-diptych` | 2 photos, grande (60 %) + petite (40 %) décalée de `--space-12` vers le bas, légendes `--simple` | Fiches projet, articles |
| **Retour en haut** | Bouton carré 44 px Forêt / Pousse, en bas à droite, apparaît après 3 écrans | Pages longues uniquement (listing, légal) |

---

## 5. Patrons de pages

> Arborescence et types de contenu : PROSPER_STRUCTURE §13–14. Ici : **l'ordre des sections, leurs composants et leur fond**. Règle d'alternance : majorité de fonds **blancs** (comme Prosper), Coton pour les sections de preuve, Forêt pour les moments forts, Pousse réservé au bandeau, au panneau des chiffres et au footer. **Jamais deux sections Forêt consécutives**, jamais plus de 2 sections colorées d'affilée. Chaque page se termine par un **double CTA** (sauf don, légal, 404) puis le footer.

Gabarits (repris de Prosper) : **A** page-hero · **B** page standard (h1 + image légendée) · **C** page texte · **D** article · **E** tunnel (don).

### 5.1 Accueil (`/`, gabarit A)

| # | Section | Composants | Fond | Contenu / règle |
|---|---|---|---|---|
| 0 | Annonce (facultative) | §4.1 | Pousse ou Soleil | Désactivée par défaut |
| 1 | Hero | §4.6 `--video` | média + bloc Forêt | h1 5–8 mots (ex. « De l'eau potable, puis l'avenir » — à écrire avec APSUD), chapeau avec un chiffre réel, « Découvrir nos actions » + « Faire un don » |
| 2 | Manifeste + chiffres | §4.15 | Coton | Mission (organisation.json) + 4 chiffres **validés** |
| 3 | Projets en cours | h2 aligné à gauche + 2 × §4.12 `--large` asymétriques + bouton `--contour` « Voir les 13 projets » | Blanc | Les projets `mis_en_avant_accueil` (PARSOC, AgriApps à ce jour) |
| 4 | Nos domaines | h2 + 3 zigzags §4.18 `--pictogramme` (WASH, Sécurité alimentaire, Protection) + bande « Société civile & localisation » | Blanc (boîtes Coton) | Titres-slogans, un chiffre par domaine |
| 5 | Nos zones (aperçu) | §4.27 carte RCA (≥ 48em à gauche) + texte + 3 chiffres par zone + lien « Où nous intervenons » | Coton | Statut des préfectures calculé depuis les projets |
| 6 | Témoignage | §4.17 `--image` | Blanc | Un seul, réel, attribué |
| 7 | Partenaires et bailleurs | §4.16 `--accueil` | Blanc | Logos en couleur, cellules égales |
| 8 | Actualités | h2 + 3 × §4.13 + lien « Toutes les actualités » | Blanc | 3 plus récentes |
| 9 | Double CTA | §4.19 | panneaux Forêt + Pousse pâle | Don / Partenariat |
| — | Footer | §4.24 | Pousse | — |

Arc éditorial : *agir → croire → preuves → projets → méthode → territoire → voix → confiance → nouvelles → agir*.

### 5.2 À propos — « Qui sommes-nous » (`/qui-sommes-nous`, gabarit B)

| # | Section | Composants | Fond |
|---|---|---|---|
| 1 | Fil d'Ariane absent (niveau 1) ; h1 « Qui sommes-nous » | §4.7 | Blanc |
| 2 | Photo de l'équipe devant le siège + légende-cartouche | §4.8 `--hero` | — |
| 3 | Intro 3 paragraphes : statut (ONG nationale indépendante), ce que fait APSUD, APSUD en chiffres | texte `--measure-text`, 1er paragraphe en `--fs-lead` | Blanc |
| 4 | Vision · Mission · Objectif | 3 colonnes ≥ 48em : sur-titre + phrase en `--fs-h4` Condensée ; filet haut 4 px Vert APSUD | Coton |
| 5 | Nos 6 valeurs | grille 3 × 2 (2 × 3 en tablette, 1 en mobile) : numéro 01–06 en Titre `--fs-h2` Vert 600 + nom h3 + texte (2–3 phrases, **résumé** du texte source) | Blanc |
| 6 | Repères (si dates fournies) | frise horizontale défilante en mobile, filet Forêt + goutte-feuille aux jalons | Blanc |
| 7 | Chiffres clés | §4.15 `--projet` (3 chiffres) | Coton |
| 8 | Zigzags : Gouvernance et équipe · Travailler avec nous · Nos partenaires | §4.18 × 3 | Blanc |
| 9 | Boîtes 2 colonnes : Transparence et rapports · Éthique et protection (PSEA) | panneaux `t-pousse-pale` + bouton | Blanc |
| 10 | Double CTA | §4.19 | — |

### 5.3 Liste des projets (`/projets`, gabarit B sans image)

| # | Section | Composants | Fond |
|---|---|---|---|
| 1 | Fil d'Ariane (« Nos actions / Projets ») ; h1 (ex. « Nos projets sur le terrain ») ; chapeau 1 phrase | §4.7 `--texte` large | Blanc |
| 2 | Compteurs en ligne : « 2 en cours · 11 réalisés · 12 préfectures et Bangui · depuis 2018 » | chiffres `--fs-h3` Titre + libellés `--fs-small` | Blanc |
| 3 | Barre de filtres collante : **Statut** (Tous / En cours / Réalisés), **Domaine**, **Préfecture**, **Bailleur**, **Année** ; bascule Grille / Carte | §4.21 | Blanc |
| 4 | Résultats : grille de §4.12 `--standard` (1 / 2 / 3 col.), tri « plus récents d'abord » ; les projets **en cours** toujours en tête quand le statut est « Tous » | §4.12 | Blanc |
| 4 bis | Vue carte : §4.27 carte RCA filtrée + liste sous la carte | §4.27 | Blanc |
| 5 | « Charger plus » | §4.22 | Blanc |
| 6 | État vide : « Aucun projet ne correspond à ces filtres » + bouton « Effacer les filtres » + suggestion (« Voir les projets réalisés en Ouaka ») | boîte Coton | — |
| 7 | CTA partenariat (« Vous financez des actions en RCA ? Travaillons ensemble ») | §4.19 simple `t-foret` | — |

### 5.4 Détail d'un projet (`/projets/{slug}`, gabarit B variante projet)

| # | Section | Composants | Fond |
|---|---|---|---|
| 1 | Fil d'Ariane ; sur-titre (badge statut + domaines) ; h1 = titre court ; titre officiel complet en `--fs-lead` Mousse | §4.7 `--projet` | Blanc |
| 2 | Image principale + légende-cartouche | §4.8 | — |
| 3 | Grille ≥ 80em `[contenu 7 col.] [fiche d'identité 4 col., collante]` ; mobile : fiche **avant** le contenu | §4.27 fiche d'identité | Blanc |
| 4 | En bref (3 puces) | §4.27 | Coton |
| 5 | Contexte · Objectif général · Objectifs spécifiques (liste numérotée) · Activités (liste avec pictogrammes 24 px si pertinents) | texte riche, h2 `--fs-h2` | Blanc |
| 6 | Résultats chiffrés | §4.15 `--projet` (3–4 chiffres avec source) | Pousse (panneau) |
| 7 | Galerie : diptyques légendés | §4.27 diptyque | Blanc |
| 8 | Témoignage lié | §4.17 | Blanc |
| 9 | Zones du projet : mini-carte RCA (préfectures du projet surlignées) + liste des localités | §4.27 | Coton |
| 10 | Bailleurs et partenaires du projet | §4.16 `--projet` | Blanc |
| 11 | Documents (fiche projet, rapports) | §4.27 fichier | Blanc |
| 12 | Actualités liées (3) + projets similaires (même domaine, 3, `--compact`) | §4.13, §4.12 | Blanc |
| 13 | Double CTA | §4.19 | — |

Données manquantes : la section est **omise** (pas de titre orphelin). JSON-LD : `Project` n'existe pas dans schema.org ; utiliser `CreativeWork` + `about`, `funder` (Organization), `areaServed`, `startDate` / `endDate` non standard → `temporalCoverage: "2023/2025"`.

### 5.5 Partenaires et bailleurs (`/partenaires`, gabarit B)

| # | Section | Composants | Fond |
|---|---|---|---|
| 1 | h1 (ex. « Partenaires et bailleurs ») + photo d'un atelier avec partenaires + légende | §4.7 | Blanc |
| 2 | Intro : APSUD, partenaire de mise en œuvre de confiance (2 paragraphes) | texte | Blanc |
| 3 | Chiffres du partenariat (bailleurs, projets cofinancés, années de collaboration) | §4.15 `--zone` (3 chiffres) | Coton |
| 4 | Grille de logos **par catégorie** (puces de filtre : Toutes · Bailleurs institutionnels · Agences des Nations unies · ONG internationales · Partenaires techniques et État) ; clic = fiche partenaire (page ou panneau) avec nom complet, type, projets avec APSUD, période, lien externe | §4.16 `--complet`, §4.21 (puces) | Blanc |
| 5 | « Pourquoi travailler avec APSUD » : 4 arguments (ancrage local, connaissance des zones, procédures et redevabilité, renforcement des ONG locales) en zigzag ou boîtes 2 × 2 | §4.18 | Blanc |
| 6 | Modalités de collaboration (mise en œuvre directe, consortium, sous-subvention, renforcement de capacités) | accordéon §4.27 | Coton |
| 7 | Témoignage d'un partenaire | §4.17 `--simple` | Blanc |
| 8 | CTA « Proposer un partenariat » → `/contact?objet=partenariat` | §4.19 simple `t-foret` | — |

### 5.6 Actualités (`/actualites`) et article (`/actualites/{slug}`)

**Listing (gabarit A)** : hero `--image` avec l'**article à la une** (bloc : date, titre, chapeau, « Lire l'article ») → filtres (Catégorie, Domaine, Zone) §4.21 en version légère (puces + 1 déroulant) → grille 3 colonnes de §4.13 → pagination numérotée §4.22 → lettre d'information (§4.20, `t-pousse-pale`) → footer.

**Article (gabarit D)** :

| # | Section | Composants |
|---|---|---|
| 1 | Fil d'Ariane ; catégorie en sur-titre ; h1 (6–12 mots) ; sous-titre facultatif | §4.7 `--article` |
| 2 | Image + légende-cartouche | §4.8 |
| 3 | Ligne méta : date (`<time>`), auteur, temps de lecture ; partage à droite (WhatsApp en premier) | §4.27 partage |
| 4 | En bref (3 puces) | §4.27 |
| 5 | Corps `--measure-text` : paragraphes de 2–4 phrases, h2 descriptifs ou interrogatifs, images de corps en `--measure-media` toutes les 3–4 sections, diptyques, citation agrandie, encadré « Projet lié » (§4.12 `--compact`) | texte riche, §4.17, §4.27 |
| 6 | Sujets liés : puces-liens (domaine, zone) vers le listing filtré | puces §4.21 (liens) |
| 7 | 3 articles liés | §4.13 |
| 8 | Double CTA | §4.19 |

Communiqué : même gabarit sans image ; chapeau en Texte 600.

### 5.7 Offres d'emploi (`/carrieres`) et détail (`/carrieres/{slug}`)

**Listing (gabarit B)** :

| # | Section | Composants | Fond |
|---|---|---|---|
| 1 | h1 + photo d'équipe + accroche employeur (2 phrases) | §4.7 | Blanc |
| 2 | **Offres ouvertes** : compteur (« 3 offres ouvertes ») + filtres légers (Type de contrat, Lieu, Domaine) + liste §4.14 triée par date limite | §4.14, §4.21 | Blanc |
| 3 | État vide soigné | §4.14 | Coton |
| 4 | Candidature spontanée : texte + bouton | §4.19 simple `t-pousse-pale` | — |
| 5 | Engagements : égalité des chances, PSEA, **« APSUD ne demande jamais de frais de candidature »** (encadré Soleil 100, filet gauche Soleil 800) | texte + encadré | Blanc |
| 6 | Lien vers les **appels d'offres** (fournisseurs) | lien fléché | Blanc |
| 7 | Offres clôturées (archive repliée, `noindex` sur chaque fiche clôturée) | `<details>` + §4.14 | Blanc |

**Fiche offre (gabarit C enrichi)** : fil d'Ariane → badges (type, statut) → h1 intitulé → ligne méta (lieu, référence, date de publication, **date limite** en évidence avec badge d'échéance) → bouton **« Postuler »** (primaire) + « Télécharger les TDR (PDF, x Ko) » → grille ≥ 80em `[texte 7 col.] [encadré collant : récapitulatif + Postuler + Partager]` → sections dans l'ordre : Contexte · Objet du poste / de la mission · Responsabilités et activités · Livrables · Calendrier et durée · Profil recherché (formation, expérience, compétences, langues : français, sango) · Conditions · **Modalités de candidature** (pièces, adresse ou formulaire, date limite répétée) · Engagements (égalité, PSEA, aucun frais) → formulaire de candidature (§4.26, si en ligne) → offres similaires → footer. JSON-LD `JobPosting` (titre, description, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation` avec `addressCountry: "CF"`).

### 5.8 Contact (`/contact`, gabarit C)

| # | Section | Composants |
|---|---|---|
| 1 | h1 « Nous contacter » + phrase d'aiguillage | §4.7 `--texte` |
| 2 | **Aiguillage par besoin** (liens ou ancres) : partenariat → formulaire catégorie Partenariat ; recrutement → Carrières ; fournisseurs → Appels d'offres ; presse → contact presse ; **plainte ou signalement** → mécanisme de plaintes | liste de liens fléchés en 2 colonnes |
| 3 | Grille ≥ 48em `[coordonnées 5 col.] [formulaire 7 col.]` — coordonnées : siège Micheline, Bimbo (Ombella-M'Poko) ; B.P. ; téléphones `tel:` (cibles 48 px) ; e-mail principal ; horaires ; bouton WhatsApp ; **carte statique** légère (image OpenStreetMap exportée, ≤ 40 Ko) + lien « Itinéraire » | §4.26, §4.27 |
| 4 | Formulaire : Nom, E-mail, Téléphone (facultatif), **Catégorie** (Information générale · Partenariat / bailleur · Recrutement · Don · Presse · Plainte ou signalement), Objet, Message, consentement | §4.26 |
| 5 | **Mécanisme de gestion des plaintes** (boîte Coton, filet gauche Vert APSUD) : à qui s'adresse-t-il (communautés, bénéficiaires, partenaires), canaux (téléphone, e-mail dédié, boîte physique, formulaire confidentiel), confidentialité, non-représailles, délai de réponse | texte + bouton |

La catégorie « Plainte ou signalement » bascule le formulaire vers un **canal confidentiel** (destinataire : point focal PSEA uniquement, champs anonymes possibles).

### 5.9 Faire un don (`/faire-un-don`, gabarit E)

- **Header simplifié** : logo + lien « ← Retour au site » + bouton « Nous contacter » ; pas de méga-menu (moins de fuites, plus de concentration). Footer réduit (coordonnées, légal).
- **Grille ≥ 55em** `[argumentaire 5 col.] [module de don 7 col.]` ; mobile : **module de don d'abord**, argumentaire ensuite (les visiteurs viennent pour donner).

| Zone | Contenu | Composants |
|---|---|---|
| Argumentaire | Photo terrain + légende ; « Pourquoi donner » (3 paragraphes courts) ; **où va votre don** (répartition, **à fournir**) ; **équivalences** (ex. « 5 000 FCFA = 1 kit d'hygiène » — **à valider**) en liste avec pictogrammes ; preuves : bailleurs qui font confiance à APSUD (logos §4.16 `--projet`) ; lien Transparence | §4.8, §4.16 |
| Module de don | h1 « Faire un don » ; **onglets** : *Mobile Money* (opérateurs, numéro marchand, titulaire, instructions pas à pas numérotées, référence « DON-APSUD », bouton « Copier le numéro ») · *Virement bancaire* (banque, titulaire, RIB/IBAN/SWIFT en `<dl>` avec boutons « Copier ») · *Depuis l'étranger* (virement international, plateforme en ligne future) · *Don en nature* (contact) ; puis formulaire **« Je signale mon don »** (nom, e-mail, montant, canal, référence de transaction) pour le reçu et le remerciement | §4.27 onglets, §4.26 |
| FAQ courte | Reçu, sécurité, usage des fonds, contact donateurs | §4.27 accordéon |

Le bouton Soleil n'apparaît qu'**une fois** (signalement du don). Aucune modalité n'est publiée tant qu'APSUD ne l'a pas fournie (organisation.json : aucune modalité sur le site actuel) : la page affiche alors un état d'attente « Les modalités de don en ligne arrivent. Contactez-nous » — **ne pas inventer de numéros**. Structure prête pour un paiement en ligne ultérieur (CinetPay, Flutterwave, Stripe) sans refonte.

### 5.10 Mentions légales, confidentialité, cookies (gabarit C)

- h1 + « Mise à jour le … » (`--fs-small` Mousse) ; ≥ 80em : **sommaire d'ancres collant à gauche** (§4.27) + texte `--measure-text` ; mobile : sommaire replié en `<details>` en tête.
- Titres h2 **numérotés** (« 1. Éditeur du site »), paragraphes courts, listes, tableaux (cookies : nom, finalité, durée, éditeur).
- Page Cookies : bouton « Modifier mes choix » qui ouvre le panneau §4.25.
- Pas de double CTA ; lien « Une question ? Nous contacter » en fin.

### 5.11 Page 404

- Gabarit C allégé, `t-coton` sur toute la hauteur utile.
- **Goutte-feuille géante** (Vert APSUD, 16–24 rem) à droite en desktop, posée « tombée » (rotation −20°), décorative ; en mobile, petite en haut.
- h1 « Cette page n'existe pas ou a été déplacée » ; 1 phrase ; **champ de recherche** ; 4 liens fléchés vers les portes (L'ONG, Nos actions, Nos zones, Agir avec nous) + « Voir les projets en cours ».
- Pas d'humour forcé, pas de « Oups ».
- **Redirections 301** des anciennes adresses (site Laravel) à mettre en place dans `.htaccess` : `/home` → `/` ; `/A_propos` → `/qui-sommes-nous` ; `/liste_projets` → `/projets` ; `/detail-projet/{id}` → `/projets/{slug}` (table de correspondance depuis `projets.json`) ; `/Nos_partenaires` → `/partenaires` ; `/Contactez_nous` → `/contact` ; `/Faire_un_Don` → `/faire-un-don`. La 404 ne doit pas exposer de domaine de développement (défaut relevé chez Prosper).

### 5.12 Autres gabarits (rappel)

- **Hub « Nos actions »** et **page domaine** : gabarit B ; h1 slogan ; zigzags `--pictogramme` ; chiffres du domaine ; projets du domaine (filtre statut) ; actualités et ressources liées ; double CTA (PROSPER_STRUCTURE §5.8–5.9).
- **Nos zones** et **page zone** : carte RCA en grand + liste groupée ; page zone avec phrase-bilan en `--fs-h3`, projets de la zone, chiffres (§5.12 de STRUCTURE).
- **Appels d'offres** : comme Carrières avec §4.14 `--appel-offres` ; fiche avec DAO, additifs datés, résultats d'attribution.
- **Ressources et rapports** : filtres (type, domaine, année, zone) + liste de §4.27 « fichier » ; fiche document avec résumé.
- **Transparence** : tableau des rapports par année (§4.27 tableau) avec poids des fichiers.

---

## 6. Motion

### 6.1 Principes

- Le mouvement **confirme** une action ou **révèle** une preuve ; il ne décore pas.
- Propriétés animées : `transform`, `opacity`, `outline-width`, `--underline-thickness`, `grid-template-rows` (accordéons), `stroke-dashoffset`. **Jamais** `width/height/top/left` (coût de mise en page) ni `filter`.
- Courbes et durées : **uniquement** les tokens du §2.9 (valeurs Prosper).
- JS : IntersectionObserver natif + Web Animations API (`element.animate`) ; **pas** de GSAP, Motion, AOS, Lenis, Swiper.
- Tout ce qui est animé au défilement **est déjà dans le HTML dans son état final**. L'état initial (masqué, à 0) n'est posé que par le JS, juste avant d'animer.

### 6.2 Inventaire

| # | Animation | Déclencheur | Propriétés et valeurs | Durée | Courbe | Délai | `prefers-reduced-motion: reduce` |
|---|---|---|---|---|---|---|---|
| 1 | Soulignement de lien | survol / focus | `--underline-thickness` 1 → 2 px | `--dur-short` 200 ms | `--ease-out` | 0 | instantané |
| 2 | Contour de bouton | survol | `outline-width` 1 → 3 px | 200 ms | `--ease-out` | 0 | instantané |
| 3 | Fond de bouton | survol / actif | `background-color` | 200 ms | `--ease-in` | 0 | conservé (pas de mouvement) |
| 4 | Flèche de lien / bouton | survol | `translate` 0 → 4 px | 200 ms | `--ease-out` | 0 | désactivé |
| 5 | Marche sous la carte | survol / focus-within | `scale` X 0 → 1 (origine gauche) | `--dur-standard` 375 ms | `--ease-in-out` | 0 | marche affichée sans animation |
| 6 | Méga-menu (ouverture) | survol 300 ms / focus | `translate` Y −100 % → 0 + sous-liens `opacity` 0 → 1 | `--dur-menu` 300 ms | `--ease-out` | `--delay-menu` 300 ms (souris uniquement) | apparition instantanée |
| 7 | Méga-menu (fermeture) | sortie / Échap | inverse | 100 ms | `--ease-in` | 0 | instantané |
| 8 | Sous-lien du méga-menu | survol / focus | `padding-inline-start` 0 → 0,625 rem (seule exception de propriété de mise en page, héritée de Prosper ; isolée par `contain: layout`) | 300 ms | `--ease-out` | 0 | désactivé |
| 9 | Menu mobile | burger | `translate` Y −100 % → 0 | 300 ms | `--ease-out` / `--ease-in` | 0 | instantané |
| 10 | Burger → croix | burger | 3 barres : rotation ±45°, barre centrale `scale` X → 0 | 270 / 375 / 300 ms | `--ease-in-out` | 0 | instantané |
| 11 | Accordéon | clic | `grid-template-rows` 0fr → 1fr ; icône + → − | 300 ms (400 ms si long) | `--ease-out` | 0 | instantané |
| 12 | Header mobile masqué / affiché | défilement bas / haut | `translate` Y 0 ↔ −100 % | 195 ms / 270 ms | `--ease-in` / `--ease-out` | 0 | header fixe, jamais masqué |
| 13 | Bandeau d'annonce (fermeture) | clic | `grid-template-rows` 1fr → 0fr | 195 ms | `--ease-in` | 0 | instantané |
| 14 | Révélation du zigzag | 50 % visible (seuil adapté) | boîte `opacity` 0,3 → 1 | 375 ms | `--ease-out` | 0 | pas d'état initial |
| 15 | Goutte + marche (chiffres) | 50 % du bloc visible, une fois | goutte `translate` X −40 % → 0 ; marche `scale` Y 0 → 1 (origine bas) | `--dur-signature` 1 200 ms | `--ease-in-out` | `--delay-signature` 400 ms | état final direct |
| 16 | Compteurs | après #15 | texte 0 → valeur, formaté `fr-FR`, décimales conservées | `--dur-count` 1 500 ms | `--ease-out` | `--stagger-count` 150 ms × index | valeur finale directe |
| 17 | Anneau de la pastille footer | 100 % visible, une fois | `stroke-dashoffset` plein → valeur | 2 000 ms | `--ease-out` | 0 | état final direct |
| 18 | Vidéo hero (apparition) | `canplay` | `opacity` 0 → 1 | 375 ms | `--ease-out` | 0 | **vidéo non chargée** |
| 19 | Bandeau cookies | après `load` | `translate` Y 1 rem → 0 + `opacity` | 270 ms | `--ease-out` | 0 | apparition instantanée |
| 20 | Dialogue (filtres mobile, préférences) | ouverture | mobile : `translate` Y 100 % → 0 ; desktop : `opacity` + `scale` 0,98 → 1 | 300 ms | `--ease-out` | 0 | instantané |
| 21 | Résultats filtrés | changement de filtre | nouvelles cartes `opacity` 0 → 1 | 200 ms | `--ease-out` | 30 ms × index (max 6) | instantané |
| 22 | Chargement de bouton | envoi | anneau `rotate` 360° en boucle | 900 ms | `--ease-linear` | 0 | anneau remplacé par « Envoi… » |
| 23 | Défilement doux vers une ancre | clic d'ancre | `scroll-behavior: smooth` | navigateur | — | — | `auto` |

**Interdits** : parallaxe, fondu-montée systématique de tous les blocs, carrousels, transitions de page, zoom d'image, curseur personnalisé, animations en boucle hors vidéo (Lottie, GIF), clignotements (> 3 par seconde : interdit par WCAG 2.3.1).

### 6.3 Code de référence

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
a { text-decoration-thickness: var(--underline-thickness);
    transition: --underline-thickness var(--dur-short) var(--ease-out); }
a:is(:hover, :focus-visible) { --underline-thickness: 2px; }
```

```js
// reveal.js — ≈ 0,6 Ko : n'agit que si le navigateur le permet et si l'utilisateur l'accepte
const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
if (motionOK && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');           // pose l'état initial en CSS
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
```

---

## 7. Vidéo hero

### 7.1 Recommandation : **oui, en amélioration progressive**

La vidéo en hero est un marqueur fort du style Prosper et donne au site une présence « ONG internationale ». Mais servie comme chez Prosper (MP4 1080p de 8,6 Mo, une seule source, chargée sur tous les écrans), elle coûterait **plus d'une minute de téléchargement en 3G** et une part réelle du forfait d'un visiteur centrafricain. D'où la règle :

> **L'image est le contenu, la vidéo est un bonus.** Le poster (photo terrain forte) est l'élément LCP et suffit à lui seul. La vidéo n'est demandée qu'aux visiteurs qui peuvent se l'offrir.

Si aucune vidéo de qualité n'est disponible (D4), on lance le site **avec la photo seule** : le hero est complet sans vidéo. Mieux vaut une photo excellente qu'une vidéo médiocre.

### 7.2 Conditions de chargement (toutes requises)

| Condition | Test | Pourquoi |
|---|---|---|
| Écran ≥ 48em | `matchMedia('(width >= 48em)')` | En mobile, la vidéo occupe peu de place pour beaucoup d'octets ; le poster 4:5 suffit |
| Pas d'économie de données | `!navigator.connection?.saveData` | Respect du choix explicite de l'utilisateur |
| Réseau rapide | `navigator.connection?.effectiveType` vaut `4g` ou est inconnu (Safari, Firefox) | Exclure `slow-2g`, `2g`, `3g` |
| Pas de mouvement réduit | `matchMedia('(prefers-reduced-motion: no-preference)')` | Accessibilité |
| Page chargée | après `load` + `requestIdleCallback` (repli `setTimeout` 2 s) | Ne jamais concurrencer le LCP, la police et le CSS |
| Hero visible | IntersectionObserver | Pause hors écran (économie de batterie et de processeur) |

Le choix « pause » de l'utilisateur est mémorisé pour la session (`sessionStorage`, dans `try/catch`).

### 7.3 Spécifications du fichier

| Paramètre | Valeur |
|---|---|
| Durée | **6 à 8 s**, boucle parfaite (fondu croisé interne si nécessaire au montage) |
| Définition | **1280 × 720** (720p) ; pas de 1080p (le bloc texte couvre un tiers de l'image, le gain est invisible) |
| Images par seconde | 24 |
| Audio | **aucune piste** (`-an`) |
| Formats | 1) **WebM AV1** (`video/webm; codecs="av01.0.05M.08"`) ; 2) **MP4 H.264** High, `yuv420p`, `+faststart` (repli universel) |
| Poids cible | **≤ 1,2 Mo** en AV1, **≤ 1,5 Mo** en MP4 (débit ≈ 1,2–1,5 Mb/s) |
| Poster desktop | 1600 × 900, **AVIF ≤ 60 Ko** + WebP ≤ 90 Ko + JPEG ≤ 140 Ko ; = première image de la vidéo (pas de saut visuel) |
| Poster mobile | 800 × 1000 (4:5, recadré), **AVIF ≤ 40 Ko** |
| Contenu | Équipes APSUD et communautés en action (forage, construction de latrines, distribution, champ, atelier) ; plans **stables et lents**, peu de coupes (1–2), pas de texte incrusté, pas de logo, pas de clignotement ; visages identifiables uniquement avec consentement ; enfants seulement en contexte digne |
| Sous-titres | sans objet (pas de parole) ; si une vidéo **avec** parole est un jour utilisée, c'est un autre composant (lecteur avec sous-titres `.vtt` FR, pas en hero) |

Commandes d'encodage (à adapter) :

```bash
# MP4 H.264 720p, 8 s, sans son
ffmpeg -i source.mov -t 8 -an -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libx264 -profile:v high -preset veryslow -crf 28 -pix_fmt yuv420p \
  -movflags +faststart hero-720.mp4
# WebM AV1 (SVT-AV1)
ffmpeg -i source.mov -t 8 -an -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libsvtav1 -preset 4 -crf 40 -g 240 -pix_fmt yuv420p hero-720.webm
# Poster = première image
ffmpeg -i hero-720.mp4 -frames:v 1 -q:v 2 poster-1600.png   # puis AVIF/WebP au build
```

Si le poids dépasse la cible : augmenter le CRF (+2), réduire à 6 s, ou réduire à 960 × 540.

### 7.4 Balisage et comportement

```html
<div class="c-hero c-hero--video">
  <div class="c-hero__media">
    <picture>  <!-- élément LCP -->
      <source media="(width >= 48em)" type="image/avif" srcset="/img/hero-1280.avif 1280w, /img/hero-1600.avif 1600w" sizes="100vw">
      <source media="(width >= 48em)" type="image/webp" srcset="/img/hero-1280.webp 1280w, /img/hero-1600.webp 1600w" sizes="100vw">
      <source type="image/avif" srcset="/img/hero-m-480.avif 480w, /img/hero-m-800.avif 800w" sizes="100vw">
      <img src="/img/hero-1280.jpg" width="1600" height="900" alt="" fetchpriority="high" decoding="async">
    </picture>
    <video class="c-hero__video" muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"
           data-src-av1="/video/hero-720.webm" data-src-mp4="/video/hero-720.mp4"></video>
    <button class="c-hero__toggle" type="button" aria-pressed="false" aria-label="Mettre la vidéo en pause" hidden>
      <!-- icônes pause / lecture (grille 48, pleines) -->
    </button>
  </div>
  <div class="c-hero__content t-foret">…h1, chapeau, actions…</div>
</div>
```

- `muted` + `playsinline` + `loop` sont dans le HTML ; **pas d'attribut `autoplay` ni de `<source>`** dans le HTML : le JS injecte les sources (AV1 puis MP4) **seulement si les conditions du §7.2 sont réunies**, puis appelle `video.play()` (lecture automatique autorisée car muette). Ainsi aucun octet vidéo n'est téléchargé en mobile ou en 3G.
- L'image d'accroche est un `<picture>` sous la vidéo (et non l'attribut `poster`, qui ne gère ni AVIF ni la direction artistique). La vidéo passe en `opacity: 1` à l'événement `playing`.
- `alt=""` sur l'image du hero **si** elle est purement d'ambiance et que le h1 porte le message ; sinon un `alt` descriptif.
- **Bouton pause** : 44 × 44, visible dès que la vidéo joue, focusable, `aria-pressed` et `aria-label` qui basculent ; la pause manuelle prime sur l'automatisme ; changement de `prefers-reduced-motion` pendant la visite → pause.
- **Repli** : toute erreur (`error`, `play()` rejeté) → la vidéo reste masquée, l'image reste. Aucun message d'erreur.
- Cache serveur (LWS, `.htaccess`) : vidéos et posters versionnés par hash, `Cache-Control: public, max-age=31536000, immutable` ; type MIME `video/webm` déclaré.

---

## 8. Responsive et mobile-first

### 8.1 Méthode

- CSS écrit **mobile d'abord** (`min-width`), points de rupture du §2.5. Les composants préfèrent les **requêtes de conteneur** (`@container`) pour s'adapter à leur emplacement (carte en grille ou en colonne latérale).
- Typographie et espacements **fluides** (`clamp()`) : peu de ruptures nécessaires.
- Appareils de référence : Android d'entrée de gamme **360 × 800** (Tecno, Itel, Samsung série A), Chrome Android et **Opera Mini** (mode économie : sans JS → le site doit rester complet), iPhone 375 × 812, tablette 768 × 1024, desktop 1280, 1440, 1920.

### 8.2 Règles par point de rupture

| Plage | Header | Grilles | Hero | Zigzag | Filtres | Footer |
|---|---|---|---|---|---|---|
| < 30em (≤ 479) | 64 px, logo + Don + burger ; masqué au défilement bas | 1 colonne ; chiffres 1 colonne | poster 4:5, bloc dessous, marche horizontale | empilé, boîte décalée | bouton « Filtrer » + dialogue ; Statut visible | 1 colonne, liens en accordéons |
| 30–37.5em | idem, nom complet du logo dès 400 px | chiffres 2 colonnes | idem | idem | idem | idem |
| 37.5–48em | idem | cartes 2 colonnes, logos 3 | idem | idem | idem | 2 colonnes (liens) |
| **48–55em** | **80 px, menu desktop**, méga-menu | cartes 2 colonnes | **16:9, bloc superposé** | **côte à côte, alternance** | dialogue | 2–3 colonnes |
| 55–80em | idem | cartes 3 colonnes, logos 4 | idem | idem | **barre en ligne collante** | 3 colonnes |
| ≥ 80em | idem, padding max | idem, logos 6 | bloc avec padding `--space-12` | boîte padding `--space-10` | idem | grille complète, escalier complet |
| ≥ 100em | centré dans 100 rem | centré dans 75 rem | média max 100 rem | idem | idem | centré |

### 8.3 Cibles tactiles et interactions

- **44 × 44 px minimum** pour toute cible (WCAG 2.5.8 exige 24 px ; on vise le confort), **48 px** pour les actions principales en mobile (burger, Don, puces de filtre, liens du menu mobile, champs, liens `tel:`).
- Espacement minimal de 8 px entre deux cibles adjacentes.
- Aucune information ni action **uniquement au survol** : la révélation du nom du partenaire au survol est un bonus, le nom est aussi dans l'`alt` et sur la fiche.
- `@media (hover: hover)` pour les effets de survol (évite les états « collés » au toucher).
- `touch-action: manipulation` sur les boutons (supprime le délai du double-tap).

### 8.4 Comportements spécifiques au mobile

- **Bouton « Faire un don » toujours dans le header** (même quand le menu est fermé).
- **Liens d'action natifs** : `tel:` (format international `+236…`), `mailto:`, `https://wa.me/236…` (WhatsApp), partage via Web Share API.
- **Champs** : police ≥ 16 px (pas de zoom iOS) ; `inputmode` et `autocomplete` corrects (`tel`, `email`, `name`) ; clavier numérique pour les montants (`inputmode="numeric"`).
- **Hauteurs** : `100dvh` / `svh` (jamais `100vh` seul) pour le menu et les dialogues ; marges `env(safe-area-inset-*)` en bas (bandeau cookies, bouton collant des filtres).
- **Orientation paysage** sur téléphone : le hero limite sa hauteur à `85svh`, le menu mobile défile.
- **Tableaux** : défilement horizontal encadré (§4.27), jamais de débordement de page. Test : aucune barre de défilement horizontale de 320 px à 1920 px.
- **Images** : direction artistique (`<picture media>`) pour le hero, l'en-tête de page et le zigzag (4:5 ou 4:3 en mobile, 16:9 ou 1:1 en desktop).
- **Économie de données** : si `Save-Data` (en-tête HTTP ou `navigator.connection.saveData`), pas de vidéo, pas de chargement anticipé des pages, images limitées à 1x.
- **Hors ligne** (phase 2, facultatif) : service worker minimal qui garde en cache les pages visitées et affiche une page « Vous êtes hors ligne » aux couleurs du site.

---

## 9. Accessibilité et performance

### 9.1 Accessibilité (cible WCAG 2.2 AA, certains critères AAA)

- **Contrastes** : tous les couples du §2.1.4 ; aucun texte sous 4,5:1 ; composants et graphiques ≥ 3:1 ; information jamais portée par la seule couleur (statuts écrits, carte doublée d'une liste).
- **Structure** : `<html lang="fr">` (et `lang="en"` sur les passages anglais, `lang="sg"` sur une citation en sango) ; un `h1` par page ; hiérarchie de titres sans saut ; régions `header`, `nav` (étiquetées), `main`, `footer` ; lien d'évitement.
- **Clavier** : tout est utilisable au clavier, ordre logique ; focus **toujours visible** (anneau 2 px décalé 2 px, Forêt ou Pousse sur sombre ; jamais `outline: none` sans remplacement) ; `Échap` ferme menus et dialogues ; piège de focus dans les dialogues et le menu mobile ; focus restitué au déclencheur.
- **Composants natifs** : `<button>`, `<a>`, `<dialog>`, `<details>`, `<fieldset>` ; ARIA seulement pour compléter (`aria-expanded`, `aria-controls`, `aria-current`, `aria-pressed`, `aria-live`). Corriger les défauts relevés chez Prosper (burger en `<span>`, chiffres en `<h2>`, faux boutons).
- **Images** : `alt` descriptif (ce qu'on voit, utile au propos) ; `alt=""` pour les décoratives ; légendes narratives en `<figcaption>` ; logos : `alt="Nom complet (sigle)"`.
- **Formulaires** : libellés visibles, aides et erreurs liées (`aria-describedby`), récapitulatif d'erreurs, pas de limite de temps, pas de CAPTCHA visuel.
- **Mouvement** : `prefers-reduced-motion` respecté partout (§6) ; vidéo pausable (2.2.2) ; aucun clignotement.
- **Zoom** : mise en page intacte à 200 % et en largeur 320 px (1.4.10) ; espacement de texte modifiable (1.4.12) ; pas de texte dans les images.
- **Liens** : intitulés explicites hors contexte (« Découvrir le projet PARSOC » via texte masqué si nécessaire) ; liens externes et téléchargements annoncés (format, poids).
- **Langue claire** : sigles développés au premier usage (`<abbr title>` pour WASH, PSEA, OCHA, PDI) ; phrases courtes.
- **Recette** : axe DevTools + Lighthouse à chaque composant ; test au clavier ; NVDA + Firefox, TalkBack + Chrome Android ; vérification des contrastes des **photos réelles** sous les cartouches (texte jamais sur photo : déjà garanti).

### 9.2 Budgets de performance

Mesurés sur un Android d'entrée de gamme avec profil réseau **3G rapide** (1,6 Mb/s, RTT 150 ms) et **4G lente**.

| Indicateur | Cible | Remarque |
|---|---|---|
| **LCP** | **≤ 2,5 s** en 4G lente ; **≤ 4 s** en 3G rapide | Élément LCP = poster du hero ou image d'en-tête |
| **CLS** | **≤ 0,05** | `width/height` partout, police avec métriques de repli, bandeau cookies en surimpression |
| **INP** | **≤ 200 ms** | JS minimal |
| TBT (labo) | ≤ 150 ms | |
| HTML (compressé) | ≤ 30 Ko | |
| CSS (compressé) | **≤ 20 Ko** au total ; CSS critique en ligne ≤ 14 Ko | Un fichier global + CSS par page générés par Astro |
| JS (compressé) | **≤ 10 Ko** au total sur l'accueil | Menu, révélation, compteurs, vidéo, cookies, filtres (listing seulement, ≤ 6 Ko + données) |
| Polices | **1 fichier ≤ 70 Ko** (Mona Sans variable, sous-ensemble) | Préchargé |
| Poids total page d'accueil (hors vidéo) | **≤ 500 Ko** | Prosper : ~0,8–1 Mo |
| Vidéo hero | ≤ 1,2 Mo (AV1) / 1,5 Mo (MP4), **0 octet en mobile et 3G** | §7 |
| Requêtes au premier rendu | ≤ 15 | |
| Lighthouse mobile | Performance ≥ 95 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100 | |

### 9.3 Images

| Usage | Ratio | Largeurs `srcset` | `sizes` (exemple) | Poids cible (AVIF) |
|---|---|---|---|---|
| Hero desktop | 16:9 | 1280, 1600, 1920 | `100vw` | ≤ 60 Ko (1600) |
| Hero mobile | 4:5 | 480, 800 | `100vw` | ≤ 40 Ko (800) |
| En-tête de page | 16:9 / 4:3 | 480, 800, 1280, 1600 | `min(100vw, 100rem)` | ≤ 70 Ko (1600) |
| Zigzag | 1:1 / 4:3 | 400, 600, 960 | `(width >= 48em) 50vw, 100vw` | ≤ 45 Ko (960) |
| Carte projet | 4:3 | 320, 480, 640, 960 | `(width >= 55em) 33vw, (width >= 37.5em) 50vw, 100vw` | ≤ 35 Ko (640) |
| Tuile actualité | 3:2 | 320, 480, 640 | idem | ≤ 30 Ko (640) |
| Portrait / citation | 1:1 | 320, 480, 640 | `(width >= 48em) 30rem, 100vw` | ≤ 30 Ko |
| Logos partenaires | libre | SVG de préférence ; sinon PNG 2x | — | ≤ 10 Ko (SVG) / 15 Ko (PNG) |
| Image de partage (OG) | 1200 × 630 | — | — | JPEG ≤ 120 Ko |

- **Formats** : `<picture>` avec **AVIF** (qualité ≈ 50, effort 6) → **WebP** (≈ 72) → **JPEG** progressif mozjpeg (≈ 75) en repli. Générés au build (`astro:assets` / Sharp), jamais à la main.
- **Chargement** : `loading="lazy"` + `decoding="async"` sur **toutes** les images hors du premier écran ; image LCP en `loading="eager"` + `fetchpriority="high"` (et `<link rel="preload" as="image" imagesrcset imagesizes>` pour le hero) ; jamais de lazy-loading en JS.
- **Dimensions** : `width` et `height` toujours renseignés ; `aspect-ratio` en CSS ; fond de substitution = `--color-surface-soft` (pas de flou LQIP lourd).
- **Recadrage** : point focal par image (champ dans `images.json` : `focal: [x, y]` en %), appliqué via `object-position`.
- **Métadonnées** : EXIF supprimés (GPS des photos terrain : **sécurité des équipes et des communautés**).

### 9.4 Autres règles de performance

- Aucun script tiers avant consentement ; pas de Google Fonts, de jQuery, de Bootstrap, de bibliothèque d'icônes, de GTM au lancement.
- Pages statiques compressées (Brotli/gzip activés sur LWS via `.htaccess`), HTTP/2, actifs versionnés par hash avec cache d'un an `immutable`, HTML `Cache-Control: no-cache` (revalidation).
- `content-visibility: auto` + `contain-intrinsic-size` sur les sections longues hors écran (listes d'archives, footer).
- Préchargement des liens au survol / à l'approche (*speculation rules* ou `prefetch` Astro) **désactivé** si `Save-Data` ou réseau lent.
- Mesure : rapport Lighthouse CI à chaque déploiement (GitHub Actions), échec du build si un budget est dépassé.

---

## 10. Checklist « anti-générique »

À passer **avant chaque validation** de composant ou de page. Une seule case non cochée = à reprendre.

**Identité**
- [ ] On reconnaît APSUD **sans voir le logo** : vert Forêt/Vert APSUD/Pousse, une touche de Soleil, goutte-feuille, aplats décalés.
- [ ] Aucune couleur hors tokens ; aucune valeur en dur (`grep` des `#` et `px` dans les composants : seulement dans `tokens.css`).
- [ ] Le Soleil apparaît **au plus une fois** comme bouton par écran.
- [ ] Une seule famille de police (Mona Sans), trois rôles ; aucun titre en capitales.

**Forme**
- [ ] Rayons : 0 partout, 4 px sur les contrôles, rien d'autre (pas de 8, 12, 16, 24 px).
- [ ] Aucune ombre floue, aucun dégradé (sauf arrêt net pour une marche), aucun voile sur photo, aucun texte sur photo.
- [ ] Les icônes viennent toutes de `src/icons/` et respectent le §3.2 (trait 2, arcs, 45°/90°) ; aucun emoji ; aucune icône cliché (cœur, poignée de main, globe, ampoule, Afrique).
- [ ] Mise en page : au moins un procédé asymétrique ou décalé par page (zigzag, cartes 58/42, marche, cartouche) ; pas plus de deux sections centrées par page.

**Contenu**
- [ ] Chaque titre dit quelque chose de précis (3–7 mots) ; aucune formule creuse (« Ensemble, construisons… », « Bienvenue sur le site de… »).
- [ ] Chaque section de preuve contient un **chiffre sourcé et validé**, un **lieu** ou un **nom** ; sinon elle est retirée.
- [ ] Chaque photo a une légende narrative (prénom, rôle, action, localité) et un `alt` ; aucune image de banque d'images.
- [ ] Les libellés de boutons sont des verbes précis (« Découvrir le projet », « Postuler », « Télécharger le rapport (PDF, 2,4 Mo) »), jamais « En savoir plus » seul ni « Cliquez ici ».
- [ ] Typographie française respectée (espaces fines, guillemets « », apostrophe ’, nombres `fr-FR`).
- [ ] Aucun contenu inventé : numéros de don, chiffres, noms, citations viennent d'APSUD (`data/apsud/*.json`) ou sont marqués « à valider » et non publiés.

**Comportement**
- [ ] Le contenu s'affiche intégralement **sans JS** (test : JS désactivé, et Opera Mini).
- [ ] Aucun carrousel automatique, aucune parallaxe, aucun fondu-montée systématique.
- [ ] `prefers-reduced-motion` : tout s'affiche dans son état final.
- [ ] Une seule sollicitation promotionnelle visible à la fois (pas de bandeau + alerte + pop-up).

**Qualité perçue**
- [ ] Testé à 360, 390, 768, 1024, 1280, 1440, 1920 px : pas de débordement, pas de ligne orpheline gênante dans les titres (`text-wrap: balance`).
- [ ] Les états vides, d'erreur, de chargement et de succès sont dessinés (listes sans résultat, formulaire envoyé, offre clôturée).
- [ ] Les budgets du §9.2 sont tenus ; Lighthouse mobile ≥ 95 / 100 / 100 / 100.
- [ ] Comparaison côte à côte avec `prosper-*.png` : même densité, même respiration, même retenue.
- [ ] Comparaison avec `apsud-actuel-*.png` : aucun élément de l'ancien gabarit BootstrapMade ne subsiste (slider, capitales, vert `#1BBD36`, icônes Bootstrap, sections vides).

---

## 11. Questions ouvertes

À poser à APSUD (ou au développeur) avant ou pendant l'intégration ; aucune ne bloque le démarrage du squelette.

| # | Question | Impact |
|---|---|---|
| 1 | Logo en vectoriel (SVG/AI/PDF) et charte éventuelle ? | Header, footer, favicon (§1.8) |
| 2 | Validation de la palette : le **Soleil** (jaune du siège) convient-il comme couleur d'action ? | D2 |
| 3 | Slogan officiel (« Nous sauvons des vies et accompagnons le développement local » lu sur le panneau du siège) ? | Footer, accueil |
| 4 | Chiffres clés validés (projets, préfectures, bénéficiaires, latrines, OSC accompagnées) avec date et source | §4.15, pastille du footer |
| 5 | Adresse e-mail principale unique ; horaires ; coordonnées GPS du siège | Contact, footer |
| 6 | Numéro d'agrément / d'enregistrement et date de création | Footer, mentions légales |
| 7 | Modalités de don (Mobile Money : opérateurs, numéros, titulaire ; banque : RIB/IBAN/SWIFT) et équivalences de don | §5.9 |
| 8 | Vidéo disponible (rushes terrain de 30 s minimum, 1080p ou plus) ? | D4, §7 |
| 9 | Liste officielle des zones (4 déclarées contre 12 préfectures + Bangui dans les projets) | Carte, filtres |
| 10 | Comptes de réseaux sociaux actifs (Instagram, LinkedIn ?) | Footer |
| 11 | Témoignages réels avec consentement ; photos avec consentement | §4.17, §1.7 |
| 12 | Version anglaise : quelles pages au lancement ? | Sélecteur FR / EN |
| 13 | Le 4ᵉ axe « Société civile et localisation » devient-il un domaine officiel ? | Navigation, pictogrammes |

Points à **vérifier au premier prototype** (non mesurables sans rendu) : graisse et chasse exactes de la Headline (`--fw-headline`, `--font-stretch-headline`) contre les captures Prosper ; métriques de la police de repli (`size-adjust`) ; lisibilité du nom complet du logo à 11–12 px ; rendu de la goutte-feuille géante à côté du panneau Pousse.

---

*Fin du document. Prochaine étape suggérée (INSTRUCTIONS §9, étape 3) : faire valider D2, D3 et D4, puis créer `src/styles/tokens.css` à partir du §2.10 et les 32 icônes ★ du §3.5.*
