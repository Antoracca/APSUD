# PROSPER_TOKENS — Système de design technique de Prosper Global

> Extraction faite le 2026-11-21 à partir du **code source** de https://www.prosperglobal.org/ (accueil + 6 pages internes : `/who-we-are`, `/what-we-do`, `/what-we-do/emergency-response`, `/blog`, un article de blog, `/careers`).
> Toutes les valeurs ci-dessous sont **exactes** (copiées du CSS/JS compilé), avec leur **source** `fichier → sélecteur`.
> Fichiers bruts : `scratchpad/raw/prosper-tokens/` (HTML, `css/`, `js/`, `fonts/`, `styles.pretty.css` = `styles.css` reformaté, 9 622 lignes).
> On capture le **langage** de design, pas le contenu : aucun texte, photo ni logo de Prosper Global ne doit être repris.

Chemin des CSS du thème : `/themes/custom/main/dist/css/` (abrégé `dist/css/` ci-dessous). Le fichier principal est `styles.css` (450 Ko brut, **39,6 Ko compressé**).

---

## 0. Résumé en 12 points (à retenir)

1. **Police unique de marque = Mona Sans (GitHub, licence libre OFL 1.1)**, renommée « Prosper Sans » / « Prosper Sans Condensed » / « Prosper Sans Headline ». **Aucune licence à acheter** : APSUD peut utiliser la même famille.
2. Pas de variables CSS globales : les tokens sont compilés depuis Sass. La **seule vraie source de tokens** est un objet JS (`common.js`, module 2728) : couleurs de marque + durées + courbes d'accélération (§3 et §10).
3. Palette resserrée : **vert-turquoise très sombre `#003634`** (texte + fond fort), **turquoise électrique `#4AFFF4`** (accent), **pierre calcaire `#F5F4EA`** (fond doux), **paille `#E4FFC3`** (accent clair), **flamme `#FF5C12`** (appel au don).
4. Typographie **fluide** : toutes les tailles en `clamp()` calibrées de **360 px à 1600 px** de large.
5. Grille 12 colonnes : conteneur **75 rem (1200 px)**, colonne 4,875 rem, gouttière **1,5 rem (24 px)**, marge latérale **1,5 rem**. Gabarit large 100 rem (1600 px).
6. Points de rupture mobile-first : **48 em (768 px)** et **80 em (1280 px)** surtout ; 55 em, 90 em, 100 em ponctuellement.
7. **Angles quasi droits** : rayon 4 px pour boutons et champs, 0 ailleurs (images, cartes, blocs). **Pas d'ombres** (une seule, sur le lien d'évitement).
8. Signature graphique : **blocs de couleur en escalier** décalés derrière les images et textes (hero, chiffres clés, pied de page, CTA) + le **chevron de marque** (« Amara »).
9. Animations sobres : bibliothèque **Motion** (`animate` + `inView`, IntersectionObserver), compteurs, fondu au défilement (opacité 0,3 → 1), carte qui monte de 16 px au survol. **Tout est coupé si `prefers-reduced-motion`**.
10. Hero vidéo : `<video loop muted playsinline poster>` **sans `autoplay`** — c'est le JS qui lance la lecture ; bouton lecture/pause rond de 44 px. Vidéo MP4 1080p de **8,6 Mo pour 10 s** (trop lourd pour la RCA, voir §14).
11. En-tête **fixe** (`position: fixed`) blanc, hauteur constante (64 px mobile / 85 px ≥ 768 px), **pas de changement au défilement** ; méga-menu au survol.
12. Pile : **Drupal 11.4.13**, thème maison `main` basé sur **Gesso** (Forum One), webpack, React 19.2.7 (formulaires de don), jQuery 4.0.0, OneTrust (cookies) via Google Tag Manager, CDN Fastly/Varnish.

---

## 1. Stack technique observée

| Élément | Valeur observée | Preuve |
|---|---|---|
| CMS | **Drupal 11** (core 11.4.13) | en-tête `X-Generator: Drupal 11`, scripts `/core/misc/drupal.js?v=11.4.13` |
| Thème | `themes/custom/main` (thème maison), dérivé du starter **Gesso** de Forum One (BEM `c-` / `l-` / `u-`, restes `gesso-storybook-text-style`, `gessos-spacing()` non compilé dans `.c-story-header-full__image figcaption`) | `dist/css/styles.css` |
| Thème d'admin | **Gin** (`/themes/contrib/gin/dist/css/components/ajax.css`, `mc_customizations/css/gin-overrides.css`) | `<link>` des pages listes |
| Build front | **webpack** (`self.webpackChunkmain`), Sass compilé, fichiers JS par composant (`card.es6.js`, `quick-stats.js`…) + un tronc commun `common.js` | `dist/js/*.js` |
| JS UI | **React 19.2.7 / react-dom** (dans `common.js`, sert les formulaires de don/pétition), **Motion** (ex-Framer Motion, API `animate()` / `inView()` + `MotionValue`) | `common.js` |
| jQuery | jQuery **4.0.0** (core) + jquery-migrate 4.0.2 | `<script>` |
| Modules contrib visibles | `google_tag`, `better_exposed_filters`, `views_ajax_history`, Views AJAX, recherche **Solr** (`.c-view--solr-search`), `webform` (styles `.webform-button--submit`, signature pad) | `<link>`/`<script>` |
| Cookies | **OneTrust** (injecté via GTM ; lien pied de page `OneTrust.ToggleInfoDisplay()`). Le CSS restyle aussi les boutons OneTrust et contient d'anciens styles **EU Cookie Compliance** (`.eu-cookie-compliance-buttons`, `.sliding-popup-bottom`) | `home.html` l.1139, `styles.css` |
| Mesure | Google Tag Manager, New Relic (`newrelic_page_metrics.js`), **Convert Experiments** (tests A/B, `cdn-4.convertexperiments.com`) | `<script>` |
| Pop-in | `<dialog>` natif + `showModal()`, déclenché au pourcentage de défilement ou au délai, mémorisé en cookie (`popup.js`) | `dist/js/popup.js` |
| Hébergement | nginx + **Varnish/Fastly** (`X-Served-By: cache-sjc…`, `Via: 1.1 varnish`), probablement Pantheon | en-têtes HTTP |
| Cache | HTML `Cache-Control: max-age=31536000, public` ; médias `max-age=315360000` | en-têtes HTTP |
| Librairies **absentes** | Pas de GSAP, ScrollTrigger, Swiper, Splide, Lenis, AOS, Lottie, video.js, Slick ; pas de Tailwind ni Bootstrap | recherche dans tous les JS |

**Poids mesurés (accueil, compressé)** : HTML 39,4 Ko · `styles.css` 39,6 Ko · `common.js` 81,8 Ko · jQuery 26,8 Ko · polices ≈ 48–51 Ko par fichier WOFF2 (4 à 6 chargées) · affiche du hero 61,7 Ko (WebP 1280×853) · **vidéo hero 8 572 250 octets**.

---

## 2. Polices

### 2.1 Fichiers `@font-face` (auto-hébergés, `dist/fonts/*.woff2`)

Source : `dist/css/styles.css` → `@font-face`. Pas de Google Fonts ni Typekit : **tout est auto-hébergé**, nommé par hash (cache illimité).

| `font-family` déclarée | `font-weight` déclaré | Fichier | Vraie fonte (table `name`) | OS/2 graisse / chasse |
|---|---|---|---|---|
| `Prosper Sans` | 400 normal | `be3a5c6b2960a049b27b.woff2` (48 Ko) | **Mona Sans** « Prosper Sans Regular » | 400 / 5 (normale) |
| `Prosper Sans` | 600 normal | `15a5925c0562e6ebed99.woff2` | Mona Sans (SemiBold supposé) | — |
| `Prosper Sans` | 800 normal | `62af782e77998c8488f6.woff2` (50 Ko) | Mona Sans « Prosper Sans Bold » | 700 / 5 |
| `Prosper Sans` | 400/600/800 italic | `b8a169cc…`, `fd3cb929…`, `5368f7a4…` | Mona Sans Italic | — |
| `Prosper Sans Condensed` | 600 | `044b6817c0b67fb4e57a.woff2` (49 Ko) | Mona Sans « Condensed Medium » | 500 / 3 (condensée) |
| `Prosper Sans Condensed` | 800 | `22a648751b7c8d1cc16a.woff2` (51 Ko) | Mona Sans « Condensed Bold » | 700 / 4 |
| `Prosper Sans Headline` | 400 | `5d96ac2be08291ae212f.woff2` (50 Ko) | Mona Sans « Headline Regular » | 400 / 2 (très étroite) |
| `Mona Sans` | 400/600/800 + italiques | 6 fichiers | Mona Sans (déclarée mais quasi inutilisée) | — |
| `TiemposText`, `TiemposHeadline` | 400–700 | WOFF2 + WOFF | **Tiempos (Klim, commerciale)** — déclarée, **non utilisée** sur les pages analysées (héritage) | — |
| `Futura` | 400–700 | WOFF2 + WOFF | **Futura (commerciale)** — un seul usage (`.c-form-item--discount-code-status`) | — |

Métadonnées lues dans les fichiers : *« Copyright 2022 The Mona Sans Project Authors (github.com/github/mona-sans) »*, licence **SIL Open Font License 1.1**, version 2.027. Ce sont des **instances statiques renommées** de Mona Sans (aucune table `fvar` : pas de police variable).

Largeur moyenne des glyphes (OS/2 `xAvgCharWidth`) : Regular 528 · Bold 544 · Condensed Medium 452 · Condensed Bold 479 · Headline 455. Les deux styles étroits font donc **≈ 86–90 %** de la largeur normale.

**Correspondance des graisses (piège)** : la famille Condensed n'a que 600 et 800. Les `h3`–`h6` demandent `font-weight: 700`, donc le navigateur prend la **800 (Condensed Bold)**. Les boutons demandent 800, donc Condensed Bold aussi.

**Piles de secours** : `"Prosper Sans", system-ui, -apple-system, Roboto, "Helvetica Neue", sans-serif` (idem pour Condensed et Headline).

### 2.2 Rôles

| Rôle | Famille |
|---|---|
| Texte courant, formulaires, dates, libellés | `Prosper Sans` (Mona Sans normale) |
| `h1`, `h2`, titres de page, grand chiffre clé | `Prosper Sans Headline` 400 (étroite, graisse normale, très grande taille) |
| `h3`–`h6`, boutons, menu, titres de cartes, citations, titre du hero | `Prosper Sans Condensed` 700/800 |

### 2.3 Pour APSUD : police et alternatives

- **Recommandation n°1 : Mona Sans elle-même** (libre, OFL). La version 2 est **variable** (axes `wght` 200–900, `wdth` 75–125) et disponible sur Google Fonts (`family=Mona+Sans:wdth,wght@75..125,200..900`, vérifié) et sur GitHub. On l'**auto-héberge** en WOFF2 avec un sous-ensemble latin + latin-ext (accents français), ce qui donne **un seul fichier variable** à la place de 5 ou 6 fichiers statiques.
  - Texte : `font-stretch: 100%` · `wght` 400 / 700.
  - « Condensed » : `font-stretch: 75%–87.5%` · `wght` 500 / 700.
  - « Headline » : `font-stretch: 75%` · `wght` 400.
  - Les valeurs exactes de `wdth` des instances de Prosper ne sont pas lisibles (instances statiques renommées). Il faudra les **caler à l'œil** sur les captures.
- Alternatives libres très proches (si on veut s'en éloigner) :
  1. **Archivo** (Omnibus-Type, OFL, Google Fonts) : grotesque de la même famille esthétique, avec un axe de chasse `wdth` 62–125 et un axe de graisse. On garde ainsi les trois rôles (normale, condensée, très étroite pour les titres) avec un seul fichier variable.
  2. **Hubot Sans** (GitHub, OFL) : sœur de Mona Sans (mêmes auteurs et métriques, plus géométrique et plus « mécanique »), avec axe de chasse. C'est le contraste le plus proche si l'on veut une identité distincte.
- Tiempos (commerciale, non utilisée) : si une serif est un jour nécessaire (citations longues, rapport annuel), prendre **Source Serif 4** ou **Newsreader** (OFL, variables, avec optical size).
- Futura (commerciale, usage marginal) : à ignorer ; si besoin, **Jost** ou **League Spartan**.

---

## 3. Couleurs

### 3.1 Palette de marque officielle (objet JS de tokens)

Source : `dist/js/common.js` → module `2728`, export `Ab` (copié tel quel).

| Groupe | Nom | Hex |
|---|---|---|
| Primaire – bright turquoise | bright-turquoise | `#4AFFF4` |
| | shade-20 / shade-40 | `#3ED4CB` / `#31AAA3` |
| | tint-20 / 40 / 60 / 80 | `#DBFFFD` / `#B7FFFB` / `#92FFF8` / `#6EFFF6` |
| Primaire – dark turquoise | dark-turquoise | **`#003634`** |
| | tint-20 / 40 / 60 / 80 | `#AABCBB` / `#557978` / `#668685` / `#335E5D` |
| Primaire – deep turquoise | deep-turquoise / shade-40 | `#002827` / `#001817` |
| | turquoise / turquoise-shade-75 | `#00B4AA` / `#002D2B` |
| Secondaire | flame (+ tint-60/70/90) | **`#FF5C12`** (`#D44D0F` / `#AA3D0C` / `#551F06`) |
| | lime | `#B3FF00` |
| | limestone | **`#F5F4EA`** |
| | straw | **`#E4FFC3`** |
| Informationnel | burgundy `#85022A`, forest `#35530A`, ocean `#263F6A`, slate `#37465A`, sunflower `#FAAF1E`, rose `#FFB6CA`, sky `#DAFAFA`, cloud `#F5F2F5`, gray `#D9D9D0` | (+ teintes 20–80) |
| Niveaux de gris (héritage) | dark `#0F1D2B`, gray-1 `#EFF4F8`, gray-2 `#B6C7D4`, gray-3 `#91A3B0`, gray-4 `#5B6B7C`, gray-5 `#3F4F5F`, gray-6 `#4E535A` | |
| Erreur | red base / light | `#C8102E` / `#E51232` |

### 3.2 Fréquence réelle dans le CSS (ce qui compte vraiment)

Comptage des hex dans tous les CSS : `#003634` ×216 · `#fff` ×57 · `#4afff4` ×26 · `#f5f4ea` ×20 · `#e4ffc3` ×19 · `#aabcbb` ×15 · `#557978` ×14 · `#5b6b7c` ×13 · `#91a3b0` ×12 · `#eff4f8` ×9 · `#c8102e` ×8 · `#335e5d` ×8 · `#ff5c12` ×6.
En pratique : **une couleur d'encre (#003634), du blanc, un accent vif (#4AFFF4), deux fonds doux (#F5F4EA, #E4FFC3) et une couleur d'action (#FF5C12)**.

### 3.3 Rôles sémantiques (déduits des sélecteurs)

| Rôle | Valeur | Source |
|---|---|---|
| Texte courant, titres, liens | `#003634` | `styles.css → body`, `h1…h6`, `a` |
| Fond de page | `#fff` | `body` |
| Fond doux de section | `#F5F4EA` | `.c-quick-stats`, `.c-cta--tertiary`, `.l-side-by-side__content>.c-button-box`, `.c-cta-two-up--secondary` |
| Fond accent clair | `#E4FFC3` | `.c-cta--quaternary`, blocs décalés du hero, `::selection` |
| Fond accent vif | `#4AFFF4` | `.l-eyebrow`, `.c-quick-stats__block`, `.c-footer-desktop__middle`, légende du hero image |
| Fond fort (inversé) | `#003634` + texte `#F5F4EA` ou `#fff` | `.c-hero__content.has-theme-primary`, `.c-cta--primary` |
| Fond CTA turquoise pâle | `#B7FFFB` | `.c-cta--secondary` |
| Texte secondaire / dates / placeholders | `#AABCBB` | `.c-tile__date`, `::placeholder`, `.c-quick-stats__eyebrow` |
| Liens du sous-menu | `#557978`, `#003634` au survol | `.c-main-navigation__group-children a` |
| Filet (`hr`) | `#AABCBB` 1 px, largeur 88 % | `hr` |
| Bordure de tableau | `#3F4F5F` 1 px ; en-tête `#EFF4F8` | `td`, `th`, `thead` |
| Bandeau d'alerte | fond `#EFF4F8`, texte `#003634` | `dist/css/alert.css → .c-alert` |
| Sélection de texte | fond `#E4FFC3`, texte `#003634` | `::selection` |
| Erreur de champ | bordure `#C8102E`, fond `#F4CFD5` | `input.error` |
| Désactivé | fond `#AABCBB`, texte `#557978` | `.c-button--is-disabled` |

### 3.4 Thèmes du hero (variables locales, seules variables CSS du site)

Source : `dist/css/hero.css → .c-hero__content.has-theme-*`

| Thème | `--color-hero-background` | `--color-hero-text` | `--color-hero-accent` |
|---|---|---|---|
| primary (par défaut) | `#003634` | `#F5F4EA` | `#E4FFC3` |
| secondary | `#4AFFF4` | `#003634` | `#E4FFC3` |
| tertiary | `#F5F4EA` | `#003634` | `#E4FFC3` |
| quaternary | `#E4FFC3` | `#003634` | `#F5F4EA` |

---

## 4. Échelle typographique

`html { font-size: 100%; line-height: 1.45 }` · `body { font-size: clamp(1rem, 0.9637096774rem + 0.1612903226vw, 1.125rem); line-height: 1.5; color: #003634 }`.
**Toutes les formules `clamp()` sont calibrées entre 360 px (minimum) et 1600 px (maximum) de large** (vérifié : 0,9637 rem + 0,1613 vw = 16 px à 360 px et 18 px à 1600 px).

| Niveau | Famille | Graisse | Taille (source exacte) | px min → max | line-height | letter-spacing |
|---|---|---|---|---|---|---|
| `h1` | Headline | 400 | `clamp(3.5rem, 3.1552419355rem + 1.5322580645vw, 4.6875rem)` | 56 → 75 | 1 | 0 |
| `.c-page-title__title` | Headline | 400 | idem h1 | 56 → 75 | 1.1 | — |
| `.c-quick-stats__title` (grande phrase d'intro) | Headline | 400 | `clamp(2rem, 1.2741935484rem + 3.2258064516vw, 4.5rem)` | 32 → 72 | 1 | — |
| `h2` | Headline | 400 | `clamp(2.5rem, 2.2641129032rem + 1.0483870968vw, 3.3125rem)` | 40 → 53 | 1.1 | 0.5px |
| `.c-featured-stories__title` | Condensed | 700 | idem h2 | 40 → 53 | 1.1 | 0 |
| `.c-hero__title` | Condensed | 700 | 2rem, puis ≥ 48em `clamp(2.125rem, 1.8709677419rem + 1.1290322581vw, 3rem)` | 32 / 34 → 48 | 1.1 / 1.15 | — |
| `.c-cta__title` | Condensed | 800 | 32px, puis ≥ 48em 48px | 32 / 48 | 110 % / 100 % | — |
| `h3`, `blockquote` | Condensed | 700 | `clamp(2rem, 1.8004032258rem + 0.8870967742vw, 2.6875rem)` | 32 → 43 | 1.1 (bq 1.2) | 0.5px |
| `h4`, `.c-card__title` | Condensed | 700 | `clamp(1.5rem, 1.3548387097rem + 0.6451612903vw, 2rem)` | 24 → 32 | 1.2 | 0.5px |
| `h5`, `.c-tile__title` (base) | Condensed | 700 | `clamp(1.25rem, 1.122983871rem + 0.564516129vw, 1.6875rem)` | 20 → 27 | 1.2 | 0.5px |
| `h6`, titre de groupe du menu | Condensed | 700 | `clamp(1.125rem, 1.0161290323rem + 0.4838709677vw, 1.5rem)` | 18 → 24 | 1.2 (menu : 1) | 0.5px |
| Texte d'intro / hero | Sans | 400 | `clamp(1.125rem, 1.0887096774rem + 0.1612903226vw, 1.25rem)` | 18 → 20 | 1.45 | — |
| Corps `p` | Sans | 400 | `clamp(1rem, 0.9637096774rem + 0.1612903226vw, 1.125rem)` | 16 → 18 | 1.5 | — |
| Bouton | Condensed | 800 | `clamp(1.125rem, 1.0887096774rem + 0.1612903226vw, 1.25rem)` | 18 → 20 | 1.1 | — |
| Bouton large | Condensed | 800 | `clamp(1.25rem, 1.0322580645rem + 0.9677419355vw, 2rem)` | 20 → 32 | 1 | -1px |
| Surtitre (eyebrow) chiffres clés | Condensed | — | `clamp(1.125rem, 1.0161290323rem + 0.4838709677vw, 1.5rem)`, couleur `#AABCBB` | 18 → 24 | 1.15 | **.05em** |
| Date de carte | Sans | 700 | 1rem, couleur `#AABCBB` | 16 | 1.4 | — |
| Bandeau alerte | Sans | — | .9375rem (titre 1.0625rem gras) | 15 / 17 | — | — |
| Libellé de champ | Sans | 500 | 1rem | 16 | 1.7 | .5px |
| `small` | — | — | 75 % | — | — | — |
| Mention légale newsletter | Arial | — | .75rem | 12 | — | — |

Règles : marge des titres `0 0 1rem`, `* + h* { margin-top: 1em }`, deux titres qui se suivent : `margin-top: 0`. Paragraphe : `margin 0 0 1rem`. `text-transform: uppercase` est **rare** (7 occurrences : boutons de pop-in et de cookies) : **la typographie ne crie pas en capitales**, elle joue sur la chasse étroite et la taille.

---

## 5. Espacements, conteneurs et grille

### 5.1 Unité d'espacement

Base **0,5 rem (8 px)**. Utilitaires `u-spaced-N-above/below` = N × 0,5 rem : 0-5 (.25) · 1 (.5) · 1-5 (.75) · 2 (1) · 2-5 (1.25) · 3 (1.5) · 3-5 (1.75) · 4 (2) · 5 (2.5) · 6 (3) · 7 (3.5) · 8 (4) · 9 · 10 · 12 · 13 · 15 · 17 rem×0,5. Source : `styles.css → .u-spaced-*`.
Marges verticales les plus fréquentes : 2rem (×39), 3rem (×28), 1.5rem, 1rem, **5rem** (×20, fin de section ≥ 48em), **4rem** (×18, fin de section mobile), 2.5rem, 4.5rem, 7.5rem (`hr` ≥ 48em), 6rem (`.c-featured-stories` margin-block).
**Rythme de section** : 4–4,5 rem en mobile → 5–7,5 rem en desktop.

### 5.2 Conteneurs (`styles.css → .l-constrain*`)

`.l-constrain { max-width: 75rem; margin: 0 auto; padding-left/right: 1.5rem }`.
Variantes par nombre de colonnes : 2 → 11.25rem · 3 → 17.625 · 4 → 24 · 5 → 30.375 · 6 → **36.75** (texte d'intro) · 7 → **43.125** (colonne de lecture d'article) · 8 → 49.5 · 9 → 55.875 · 10 → 62.25 · 11 → 68.625 · 12 → **75** · 18 → 90 · 20 → **100rem** (bandeaux pleine largeur, hero, navigation).

Grille déduite : **12 colonnes de 4,875 rem (78 px) + 11 gouttières de 1,5 rem (24 px) = 75 rem (1200 px)**.

### 5.3 Grilles de contenu (`.l-grid--N-col`)

CSS Grid (repli flexbox), `grid-gap: 2rem`.
- 2 colonnes à partir de 37.5em (600 px).
- 3 colonnes à partir de 47.5em (760 px).
- 4 colonnes : 2 colonnes entre 37.5 et 50em, puis 4 à partir de 50.0625em.
- 6 colonnes : 3 colonnes entre 37.5 et 62.4375em, puis 6 à partir de 62.5em.

Cartes mises en avant (`featured-stories.css`) : requête de conteneur `@container (min-width: 37.5rem)`, colonnes **58,58 % / 41,42 %** (ratio d'argent √2), la 2ᵉ carte décalée vers le bas → mise en page **asymétrique**.

Bloc image + texte (`.l-side-by-side`) : grille 2 colonnes `1fr 1fr`, lignes `1fr 3fr auto`. L'image occupe les lignes 1 à 3, le texte les lignes 2 à 4 dans un encart `#F5F4EA` (padding 1.25rem → 2.5rem ≥ 80em) qui **chevauche** le bas de l'image. Variante `--image-right` qui alterne gauche/droite.

---

## 6. Points de rupture (exacts)

Source : comptage des `@media` dans `styles.css`. Approche **mobile-first** (`min-width`).

| em | px | Occurrences | Rôle |
|---|---|---|---|
| 30em | 480 | 4 | petits ajustements (chiffres clés) |
| 37.5em / 37.5625em | 600 / 601 | 2 / 4 | grilles 2 colonnes, eyebrow centré |
| **48em** | **768** | **301** | **tablette — bascule principale** (menu desktop, hero en superposition) |
| 55em | 880 | 11 | cartes, boutons |
| **80em** | **1280** | **82** | **desktop** |
| 90em | 1440 | 6 | desktop large (navigation sans padding) |
| 100em | 1600 | 2 | très large (`body::before content: "wide"`) |

Le JS lit le point de rupture courant via `body::before { content: "mobile" | "tablet" | "desktop" | "wide" }`. Le JS utilise aussi `matchMedia("(min-width: 768px)")` et `(max-width: 767px)`.

---

## 7. Formes, bordures, ombres

- **Rayons** : `4px` (×10 : boutons `.c-button`, champs, cases à cocher) · `0` (×15 : boutons tertiaires, images, cartes) · `50%` (bouton vidéo, puces) · `8px` (anneau de focus du bouton sur fond sombre). **Aucune carte arrondie.**
- **Ombres** : quasi inexistantes. Une seule : `0 3px 6px rgba(15,29,43,.16), 0 3px 6px rgba(15,29,43,.23)` sur `.c-skiplinks__link`. **Le relief vient des aplats de couleur décalés, pas des ombres.**
- **Bordures** : 1px `#003634` (boutons, champs) ; `hr` 1px `#AABCBB` ; `.c-main-navigation` `border-bottom: .0625rem solid #fff`.
- **Focus** : `outline: 2px solid` (transparent au repos, `#003634` en `:focus-visible`), `outline-offset: 2px` (liens) ou `4px` (champs). Sur fond sombre : cadre `::after` à −4px, rayon 8px, couleur `#4AFFF4`.

---

## 8. Boutons

Source : `styles.css → .c-button` et variantes (les mêmes règles habillent OneTrust, Webform et EU Cookie Compliance).

| Variante | Fond | Texte | Bordure | Survol | Actif |
|---|---|---|---|---|---|
| `.c-button` (primaire) | `#003634` | `#4AFFF4` | 1px `#003634` | fond `#002D2B`, bordure `#335E5D` | fond `#003634` |
| `--primary-on-dark` | `#4AFFF4` | `#003634` | `#4AFFF4` | `#3ED4CB` | `#31AAA3` |
| `--secondary` (contour) | transparent | `#003634` | 1px + `outline 1px` | **l'outline passe de 1px à 3px** (le contour s'épaissit) | — |
| `--tertiary` (carré) | transparent | `#003634` | `solid #003634`, rayon 0 | fond `#003634`, texte `#fff` (remplissage) | — |
| `--tertiary-on-dark` | transparent | `#fff` | `solid #fff` | fond `#fff`, texte `#003634` | — |
| `--quaternary` (**don / urgence**) | `#FF5C12` | `#002827` | `#FF5C12` | `#D44D0F` + texte `#fff` | `#AA3D0C` |
| `--text` (lien) | — | `#003634`, souligné | — | soulignement 1px → 2px | — |
| `--is-disabled` | `#AABCBB` | `#557978` | — | `cursor: not-allowed` | — |

Métriques communes : `font-family: Condensed`, `font-weight: 800`, `line-height: 1.1`, `padding: .75rem .75rem` (→ `.875rem .75rem` à ≥ 48em), `border-radius: 4px`, `white-space: nowrap`, `margin-bottom: .5rem`, `transition: background 200ms cubic-bezier(0.9, 0, 0.99, 1)`.
- `--small` : `padding .25rem 1rem` (→ `.5rem 1rem` à ≥ 55em), corps 16 → 18.
- `--large` : 20 → 32 px, `letter-spacing: -1px`, `padding .5rem 1rem` (→ `.75rem 1.25rem`, à droite 2rem pour le chevron).
- `--large-no-break` : 2rem, hauteur 4rem, `padding 1rem 2rem`.
- `--external-link` : icône SVG 16×16 en `::after` (trait 1px, terminaisons carrées).
- `--is-submitted` : spinner SVG animé (`animateTransform`, 1s) en `::after`.
- Bouton du menu « Donate » : `padding .75rem .625rem` → `.875rem .75rem` à ≥ 80em, survol `#001817`.

**Lien « lire la suite » des cartes** (`card.css → .c-card__read-more`) : Condensed 800, souligné 1px, `text-underline-offset: 2px`. Au survol de la **carte entière**, le soulignement passe à 2px (200ms, `cubic-bezier(0.01,0,0.1,1)`). Il n'y a **pas de flèche** : l'appel à l'action est un texte souligné.

---

## 9. Liens

Source : `styles.css → a`.
```
color: #003634; text-decoration: underline;
text-decoration-thickness: var(--underline-thickness);   /* @property, valeur initiale 1px */
text-underline-offset: 2px;
transition: --underline-thickness, color 200ms cubic-bezier(0.01, 0, 0.1, 1);
:hover, :focus → --underline-thickness: 2px
```
La propriété personnalisée est déclarée avec `@property --underline-thickness { syntax: "<length>"; inherits: false; initial-value: 1px }` (en tête de `card.css`, `hero.css`, `alert.css`…) pour que **l'épaississement du soulignement soit animé**.
Dans le menu, les liens ne sont pas soulignés au repos et le sont au survol. Les liens du sous-menu glissent de 0,625rem vers la droite (`padding-inline-start`, .3s).

---

## 10. Mouvement : courbes, durées, animations

### 10.1 Tokens (JS `common.js` → module 2728, export `Ds`)

```
ease-in-out : cubic-bezier(0.95, 0, 0.05, 1)   // très « expo » : départ et arrivée lents
ease-out    : cubic-bezier(0.01, 0, 0.1, 1)    // décélération très marquée (entrées)
ease-in     : cubic-bezier(0.9, 0, 0.99, 1)    // accélération (sorties)
linear      : linear
duration : shortest 150ms · short 200ms · standard 375ms · long 400ms · intro 270ms · outro 195ms
```
Les mêmes courbes reviennent dans le CSS : `(0.01,0,0.1,1)` ×10, `(0.95,0,0.05,1)` ×8, `(0.9,0,0.99,1)` ×5, plus `(0.4,0,0.2,1)` ×2 (Material, un seul composant).

### 10.2 Inventaire

| Effet | Implémentation | Valeurs |
|---|---|---|
| Soulignement de lien | CSS | 1 → 2px, 200ms ease-out |
| Carte qui monte | `.c-tile__animate:hover, :has(:focus-visible)` | `translateY(-16px)`, **375ms `cubic-bezier(0.95,0,0.05,1)`** |
| Méga-menu desktop | `.c-main-navigation__group-children` + fond | `translateY(-100%) → 0`, 300ms ease-out **avec 300ms de délai** à l'ouverture ; fermeture 100ms ease-in |
| Menu mobile | `.c-main-navigation__groups` | `translateY(-100%) → 0`, 300ms ease-out (fermeture 300ms ease-in) |
| Accordéon du menu mobile | `grid-template-rows: 0fr → 1fr` | 300ms ease-out ; flèche `rotate(.5turn)` |
| Burger → croix | 3 barres de 1.5rem × .1875rem | transitions de 500 / 700 / 600ms (barres décalées) |
| Bandeau eyebrow | `.l-main-navigation { transition: top 500ms cubic-bezier(0.95,0,0.05,1) }` | la nav remonte quand on ferme le bandeau |
| Révélation au défilement | `side-by-side.js` : `inView` (Motion) | opacité **0,3 → 1**, durée `standard` (375ms), ease-out ; seuil `amount` = min(0,5 ; hauteur fenêtre / hauteur bloc) |
| Compteurs | `quick-stats.js` | 1) le chevron « Amara » glisse (`translateX`) et la marche de couleur grandit (`scaleY` 0 → 1) : délai .4s, durée 1.2s ; 2) chaque nombre compte de 0 à sa valeur : 1.5s, décalage 0.15s × index, ease-out, format `en-US` conservant décimales et séparateurs |
| Anneau d'efficacité | `efficiency-lockup.js` | `stroke-dashoffset` 196.16 → 27.46 (86 %) en 2s, déclenché quand l'élément est entièrement visible |
| Vidéo dans les cartes | `card.es6.js` | lecture quand 50 % de la carte est visible, pause sinon |
| Pop-in | `@keyframes fadeInAnimation` 0 → 1 | `ease .5s` ; voile `rgba(255,255,255,.7)` |
| Défilement doux | `html { scroll-behavior: smooth }` | seulement si `prefers-reduced-motion: no-preference` |

**Absents** : parallaxe, transitions entre pages, zoom d'image au survol, carrousel, défilement « smooth » en JS (Lenis), animations Lottie.
**Accessibilité** : chaque animation JS teste `prefers-reduced-motion: reduce` et affiche directement l'état final. Le CSS de la navigation force `transition-duration: .01ms !important`.

---

## 11. En-tête (header)

Source : `styles.css → .l-main-navigation`, `.c-main-navigation*`, `.l-site-container` ; JS `main-navigation.js`.

- `.l-main-navigation { position: fixed; top: 0; width: 100%; background: #fff; z-index: 100 }` : **toujours visible, ne se cache pas, ne rétrécit pas au défilement** (aucun écouteur `scroll` dans le JS du menu).
- Hauteur réservée (`.l-site-container padding-top`) : **4rem (64 px)** en mobile, **5.3125rem (85 px)** à partir de 48em. Barre des groupes : 5.25rem.
- Largeur max 100rem. Padding latéral `clamp(0.5rem, calc(10.9375vw - 4.75rem), 4rem)`, mis à 0 à partir de 90em.
- Logo : SVG horizontal, largeur `clamp(7.8125rem, calc(10.3515625vw + 2.84375rem), 11.125rem)` (125 → 178 px).
- Desktop : 4 entrées centrées (largeur de chaque groupe `clamp(6.75rem, calc(14.84375vw - .375rem), 11.5rem)`), loupe de recherche, bouton Donate primaire à droite. Survol d'un titre : fond `#4AFFF4` qui déborde de .5rem. **Méga-menu** : toutes les colonnes de sous-liens descendent ensemble sur fond blanc (hauteur égalisée en JS sur la colonne la plus haute).
- Mobile : burger 1.5rem à droite, panneau plein écran (`height: 91vh`) qui descend du haut, groupes en accordéon, titres 1.5rem Condensed 700, sous-liens 1.125rem `#557978`. `html, body.main-navigation-is-open` bloque le défilement.
- Au-dessus : bandeau **eyebrow** facultatif (`.l-eyebrow`, fond `#4AFFF4`, 18px, padding `.875rem 1.5rem`, z-index 101, refermable) et bandeau **alerte** (`.c-alert`, fond `#EFF4F8`, sous la nav, z-index 99).

---

## 12. Pied de page

Source : `styles.css → .c-footer-desktop*`, `.c-footer__*` ; JS `footer.js`.
- Conteneur max 1600px. Le haut est une **silhouette en escalier** : trois « marches » `#4AFFF4` (`__top-step--one/two/three`) de hauteurs 0 / 4.3125rem / 8.5625rem à ≥ 80em (1.75rem en mobile). Le corps est un grand aplat `#4AFFF4` (`padding 2.5rem 24px`, `3.75rem` en haut à ≥ 80em).
- Accroche à gauche : Condensed 700, 2.5rem, `line-height: 1`, colonne de 26.875rem.
- Colonnes de menus (titres Condensed 700, 1.125 → 1rem, `letter-spacing .5px`), bloc newsletter de 20rem, mention de confidentialité .75rem.
- `footer.js` : si la dernière section de la page a un fond `#F5F4EA`, le pied de page prend la même couleur pour un raccord sans couture.

---

## 13. Cartes, tuiles, sections types

| Composant | Valeurs clés | Source |
|---|---|---|
| `.c-card` | largeur 37.5rem (small 25, large 50), `gap 1rem 2rem` ; média **ratio 4/3** (`aspect-ratio: 1.3333`), `object-fit: cover` ; contenu `gap .75rem` (→ 1rem ≥ 601px) ; titre 24 → 32 px 700 ; résumé `line-height 1.4` ; toute la carte est cliquable (JS) | `card.css` |
| `.c-tile` | date 1rem 700 `#AABCBB` ; titre Condensed 2rem ; résumé 16 → 18 ; bouton tertiaire visible à ≥ 48em ; survol : monte de 16px et le bouton tertiaire se remplit | `styles.css` |
| Hero image (article) | `figure.c-caption-image--hero` pleine largeur `min(100vw - scrollbar, 100rem)` ; légende dans un encart `#4AFFF4` de 24rem posé sur l'image ; barre `#E4FFC3` de 5rem à sa gauche | `styles.css` |
| Chiffres clés `.c-quick-stats` | fond `#F5F4EA`, titre Headline 32 → 72 px ; grille `chevron | marche #E4FFC3 | panneau #4AFFF4` ; panneau `padding 16px → 64px`, `gap 20px → 48px`, 2 colonnes de chiffres ; `margin-bottom 104px` | `styles.css`, `quick-stats.js` |
| CTA `.c-cta` | `padding 1.5rem → 3rem` ; 4 fonds : `#003634` / `#B7FFFB` / `#F5F4EA` / `#E4FFC3` ; titre Condensed 800 32 → 48px ; variante image : contenu 50 % → 40 %, chevron SVG de 108×132px collé à gauche | `styles.css` |
| Citation `.c-enlarged-quote` | carré de guillemet 2.5rem fond `#E4FFC3` ; texte Condensed 500 1.5 → 2rem `line-height 1.3` ; image à gauche (flex-basis 30.375rem) | `styles.css` |
| Pop-in `.c-pop-up` | `<dialog>` ; en bas d'écran en mobile, centré à ≥ 48em ; voile `rgba(255,255,255,.7)` ; fondu .5s | `styles.css`, `popup.js` |

**Motif de signature** : de grands aplats de couleur **décalés et en escalier**, posés derrière ou à côté des images et des textes (hero : barre de 6rem à gauche du bloc texte ; chiffres clés : marche ; pied de page : escalier ; CTA image : chevron). Tout est orthogonal, sans arrondi ni dégradé : un seul `linear-gradient(to bottom, transparent 28%, #E4FFC3 28%)`, qui sert d'ailleurs à dessiner une marche nette.

---

## 14. Hero vidéo (implémentation exacte)

HTML (`home.html` l.462–495) :
```html
<link rel="preload" as="image" fetchpriority="high" href="…/styles/cta_hero_poster/public/…jpg.webp">
<div class="c-hero">
  <div class="c-hero__media">
    <div class="c-inline-video__container" data-inline-video>
      <video class="c-hero__video" loop muted playsinline poster="…cta_hero_poster…jpg.webp">
        <source src="/sites/default/files/2026-11/…mp4" type=video/mp4 />
      </video>
      <button class="c-inline-video__toggle" type="button" data-inline-video-toggle
              data-state="paused" aria-label="Play video" title="Play video" hidden>
        <span class="…icon--play"><svg viewBox="0 0 48 48"><path d="M16 10v28l22-14z"/></svg></span>
        <span class="…icon--pause"><svg viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28zm16-28v28h8V10h-8z"/></svg></span>
      </button>
    </div>
  </div>
  <div class="c-hero__content has-theme-primary"> h1.c-hero__title · .c-hero__text · .c-hero__button (bouton quaternary orange) </div>
</div>
```

- **Pas d'attribut `autoplay` ni `preload`**. `inline-video.js` affiche le bouton (`hidden = false`), appelle `video.play()` (erreur ignorée), puis **met en pause si `prefers-reduced-motion: reduce`** (et suit les changements de ce réglage). Un clic de l'utilisateur prend le pas sur l'automatisme. `aria-label` et `title` basculent entre « Play video » et « Pause video ».
- Bouton : 44×44 px (min/max), cercle `rgba(255,255,255,.65)`, en bas à droite à 16px (24px à ≥ 48em), icône pleine à 75 %, focus `#003634`.
- Média : `aspect-ratio: 16/9; object-fit: cover; inline-size: 100%`, largeur max du hero 100rem.
- Disposition : en **mobile**, vidéo puis bloc texte en dessous (`padding 1.5rem`, fond `#003634`). À **≥ 48em**, grille à une seule zone (`grid-template-areas: "content"`) : le bloc texte se pose **en bas à gauche sur la vidéo** (`align-self: end; margin-inline-start: 6rem; max-inline-size: min(37.5rem, 50vw - 6rem); min-inline-size: 19rem`) avec une **barre d'accent `#E4FFC3` de 6rem** à sa gauche (`::before`, `inset-block: 4rem 0`).
- Fichier : **MP4 H.264 1920×1080, 10,0 s, 8 572 250 octets (≈ 6,9 Mb/s), avec une piste audio inutile** (puisque la vidéo est muette). **Une seule source** : pas de WebM/AV1, **pas de version mobile, pas de `media`**, pas de désactivation en mode économie de données. Affiche WebP 1280×853 de 61,7 Ko. Servi par le CDN avec un cache de 10 ans.
- ⚠️ **À ne pas copier tel quel pour la RCA** : 8,6 Mo sur une connexion 3G (≈ 1 Mb/s) représentent plus d'une minute de téléchargement. Voir §19.4.

---

## 15. Formulaires

Source : `styles.css → input[type=…]`, `select`, `textarea`, `.c-form-item__label`.
- Champ : hauteur **2.625rem (42 px)**, `padding 0 .625rem`, fond `#fff`, bordure 1px `#003634`, rayon 4px, Sans 500 1rem, texte `#003634`, placeholder `#AABCBB`.
- Focus : `outline: 1px solid #003634; outline-offset: 4px`.
- Désactivé : bordure `#5B6B7C`. Erreur : bordure `#C8102E`, fond `#F4CFD5`, icône SVG 1rem à droite (`padding-right 2.25rem`). Succès : icône verte.
- `select` : `appearance: none`, chevron SVG `.75rem` à `right .625rem`.
- `textarea` : `min-height 2.625rem`, `padding .75rem .625rem`, `resize: vertical`.
- Case à cocher : 1.375rem, bordure 2px `#003634`, rayon 4px ; survol : bordure 3px ; coche en SVG.
- Libellé : Sans 500 1rem, `letter-spacing .5px`, `line-height 1.7`.
- Bouton d'envoi `.c-button--form-submit` : `#003634` / `#4AFFF4`, Condensed 700, `min-width 10rem`, `padding .875rem`.

---

## 16. Icônes

- **Pas de bibliothèque d'icônes** (ni Font Awesome, ni sprite). Les icônes sont des **SVG en data-URI dans le CSS** (26 SVG uniques) et quelques SVG en ligne dans le HTML (lecture/pause, anneau d'efficacité). Classe générique `.c-icon { width: 1em; height: 1em; fill: currentColor; vertical-align: middle; top: -2px }`, orientations `.is-down/.is-left/.is-right` par `rotate`.
- Style hétérogène (héritage), mais une ligne dominante pour les icônes d'interface :
  - recherche 22×22 et chevron de menu 17×11 : **trait 2px, terminaisons et angles arrondis**, couleur unie ;
  - lien externe 16×16 : **trait 1px, terminaisons carrées** ;
  - icône de bouton d'envoi 14×14 : trait 1.75 arrondi, `#4AFFF4` ;
  - fermeture 22×22 et coche : **formes pleines** ;
  - lecture/pause 48×48 : formes pleines géométriques.
- **Pictogramme de marque** : le chevron « Amara » (SVG 202×241, couleur `#00D2C8` / `#4AFFF4`), réutilisé comme élément graphique (chiffres clés, CTA image, pied de page).
- Pour APSUD (cf. INSTRUCTIONS §4.3) : établir **une seule** règle d'icônes maison, par exemple une grille 24 px, un trait de 2 px et des terminaisons arrondies (ce qui prolonge les icônes les plus récentes de Prosper), plus un pictogramme de marque dérivé du logo APSUD qui joue le rôle du chevron.

---

## 17. Images

- `<picture>` systématique avec **WebP + JPEG (ou PNG) de repli**, `srcset` 1x/2x et sources `media="(min-width: 768px)"` pour la **direction artistique** (cadrage différent selon l'écran). Exemple bloc image + texte : 347×260 (4:3) en mobile, **426×426 (1:1)** en desktop.
- Styles d'image Drupal nommés par usage : `pg_card_200/300/400/600`, `pg_tile_medium_{small,medium,large}_{1x,2x}`, `pr_side_by_side_{small,medium}_{1x,2x}`, `image_caption_bottom_resizable_*`, `cta_hero_poster`. Recadrage par point focal (`?h=…` dans l'URL).
- `width` et `height` toujours renseignés ; `sizes="min(100vw, 800px)"` sur les cartes.
- `loading="lazy"` sur toutes les images hors écran ; `loading="eager"` sur l'image de tête des pages internes ; affiche du hero **préchargée** avec `fetchpriority="high"`.
- Ratios : **16/9** (hero), **4/3** (cartes, vidéo de tuile en mobile), **1/1** (tuile large, bloc image + texte en desktop), **3/2** (vidéo d'en-tête d'article).
- Traitement : `object-fit: cover`, **aucun filtre, aucun duotone, aucun voile sombre ni dégradé** sur les photos. Le texte n'est **jamais posé directement sur la photo** : il est toujours dans un aplat plein (hero, légende, CTA). C'est ce qui garantit le contraste sans assombrir l'image.

---

## 18. Index z (couches)

| z-index | Élément |
|---|---|
| −1 | `.c-country-list__region-title` |
| 0–2 | `.l-tile-grid` (1), groupes de boutons (1–2), légende du hero image (1–2) |
| 99 | `.l-alert` (≥ 80em) |
| **100** | `.l-main-navigation`, `.c-main-navigation*`, `.c-donation-restore` |
| 101 | `.l-eyebrow` (bandeau au-dessus de la nav) |
| 9999 | `.c-skiplinks` (lien d'évitement) |
| 99990 | `.sliding-popup-bottom` (bannière de cookies, héritage EU Cookie Compliance) |

Pour APSUD, une échelle à tokens suffit : `--z-base: 0; --z-raised: 1; --z-header: 100; --z-banner: 110; --z-modal: 1000; --z-cookie: 1100; --z-skiplink: 9999`.

---

## 19. Recommandation de stack pour APSUD

### 19.1 Contraintes

1. **Vitrine maintenant**, **panneau d'administration plus tard** (projets réalisés et en cours, offres d'emploi, actualités, partenaires) utilisable sans développeur, en français.
2. Hébergement actuel **LWS mutualisé** : PHP + MySQL, FTP/SFTP, pas de Node.js permanent, pas de Docker, mémoire PHP limitée.
3. **Public en RCA** : mobile, 3G ou moins, forfaits data chers. Il faut un HTML léger, peu ou pas de JS, des images AVIF/WebP et une vidéo optionnelle.
4. Architecture imposée par INSTRUCTIONS §5 : `pages/ → sections/ → components/ → styles/ → icons/ → data/`, un fichier par composant, styles séparés.

### 19.2 Ce qu'on ne reprend pas de Prosper

- **Drupal 11** : excellent mais lourd pour un mutualisé (Composer, PHP 8.3+, mémoire, Solr, Varnish/CDN derrière). C'est disproportionné pour une ONG de cette taille et coûteux à maintenir.
- Le bundle JS (React + Motion + jQuery ≈ 110 Ko compressés) : tout ce dont APSUD a besoin (menu, accordéons, compteurs, révélation au défilement, vidéo, cookies) tient en **moins de 8 Ko** de JS natif avec IntersectionObserver.

### 19.3 Recommandation : site statique Astro + CMS PHP « headless » sur LWS

| Couche | Choix | Pourquoi |
|---|---|---|
| Front (vitrine) | **Astro 5** en sortie **statique** (`output: 'static'`) | HTML pré-généré, **0 Ko de JS par défaut**, composants `.astro` à un fichier par composant avec styles à part (correspond à §5), routes par fichier (`src/pages/`), images optimisées au build (`astro:assets` : AVIF/WebP, `srcset`, dimensions). Le résultat est un dossier de fichiers HTML/CSS que **LWS sert sans rien installer**. |
| Styles | **CSS natif** + tokens en propriétés personnalisées (`styles/tokens.css`), `clamp()` 360 → 1600 comme Prosper, CSS en couches `@layer` | Pas de Tailwind : les tokens restent lisibles et uniques (exigence §4.6). |
| JS | Petits scripts natifs par composant (îlots Astro `<script>`) | menu, accordéon, compteur, révélation, vidéo, cookies. |
| Polices | **Mona Sans variable** auto-hébergée, sous-ensemble latin + latin-ext, `font-display: swap`, préchargement d'un seul fichier | Même ADN que Prosper, licence libre. |
| Contenu, phase 1 | `data/apsud/*.json` (déjà existant) lu au build par les **Content Collections** d'Astro (schémas typés) | Les types projet / emploi / actualité / partenaire sont validés dès maintenant. |
| Admin, phase 2 | **WordPress en mode headless** sur un sous-domaine LWS (`admin.apsud.org`) : types de contenu personnalisés `projet`, `emploi`, `actualite`, `partenaire` + champs ACF, API REST native. Astro lit l'API au build. | PHP/MySQL natif chez LWS, interface en français connue des équipes d'ONG, rôles et utilisateurs, médiathèque, gratuit. Le site public reste statique : pas de surface d'attaque WordPress exposée aux visiteurs, et une vitesse maximale. |
| Publication | Bouton « Publier » → webhook → **GitHub Actions** (build Astro) → déploiement **SFTP/FTP** vers LWS (ex. `SamKirkland/FTP-Deploy-Action`) | Le site est en ligne 2 à 3 minutes après la publication, sans développeur. |
| Formulaires | Contact / candidature : petit script PHP sur LWS (ou formulaire WordPress via l'API) avec anti-spam par champ piège (honeypot) | Pas de service tiers payant. |
| Cookies | Bannière maison (accepter / refuser / personnaliser) ou **tarteaucitron.js** / **Klaro** (libres, RGPD), stylées aux tokens | OneTrust est payant et lourd. |

**Variante B (si l'on refuse toute chaîne de build ou GitHub)** : un **thème WordPress classique** écrit à la main (sans constructeur de pages), avec les mêmes tokens, templates `template-parts/` par section et composant, cache de pages (LiteSpeed Cache si le plan LWS est sous LiteSpeed, sinon WP Super Cache), images WebP/AVIF générées. C'est plus simple à exploiter, mais un peu moins rapide et moins sûr que le statique.
**Variante C (alternative payante, très propre)** : **Kirby CMS** (PHP, fichiers plats, sans base de données, panneau d'administration élégant et personnalisable, licence d'environ 99 € par site). Il tourne parfaitement sur un mutualisé LWS et produit directement le HTML.

### 19.4 Budget de performance proposé (accueil, connexion 3G)

| Ressource | Prosper (mesuré) | Cible APSUD |
|---|---|---|
| HTML compressé | 39 Ko | ≤ 30 Ko |
| CSS compressé | 40 Ko (+ 8 petits fichiers) | **≤ 20 Ko**, critique en ligne |
| JS compressé | ≈ 110 Ko + GTM + tests A/B | **≤ 10 Ko** |
| Polices | 4–6 × 50 Ko | **1 fichier variable latin ≤ 60–80 Ko** (+ 1 italique seulement si nécessaire) |
| Image LCP (affiche) | 62 Ko WebP | **≤ 60 Ko AVIF** (WebP de repli), `fetchpriority="high"` |
| Vidéo hero | **8,6 Mo** 1080p, piste audio incluse | **≤ 1,5 Mo** : 720p, 6–8 s, H.264 CRF ~28 + WebM/AV1, **piste audio retirée** ; **non chargée** sur mobile (< 48em), en mode économie de données (`navigator.connection.saveData`), sur réseau `2g/3g` (`effectiveType`) ou si `prefers-reduced-motion` : on affiche alors l'affiche seule. `preload="none"`, la source est injectée en JS après le chargement de la page. Bouton pause conservé (44 px). |
| Total page d'accueil (hors vidéo) | ~0,8–1 Mo | **≤ 500 Ko** |

---

## 20. Tokens prêts à transposer (squelette pour `styles/tokens.css`)

Les valeurs Prosper sont gardées telles quelles pour tout ce qui n'est pas la couleur. Les couleurs sont à **transposer en vert APSUD** (décision D2, DESIGN.md) **en conservant les rôles** :

```css
:root {
  /* Rôles couleur (valeurs Prosper → à remplacer par la gamme verte APSUD) */
  --color-ink:            #003634; /* texte + fond fort        → vert APSUD très sombre */
  --color-ink-hover:      #002D2B;
  --color-accent:         #4AFFF4; /* accent vif               → vert APSUD lumineux   */
  --color-accent-hover:   #3ED4CB;
  --color-accent-active:  #31AAA3;
  --color-surface-soft:   #F5F4EA; /* fond doux (pierre)                               */
  --color-surface-tint:   #E4FFC3; /* aplat clair d'accent (paille)                    */
  --color-surface-pale:   #B7FFFB; /* CTA secondaire                                   */
  --color-action:         #FF5C12; /* don / urgence           → 2e couleur APSUD       */
  --color-action-hover:   #D44D0F;
  --color-action-active:  #AA3D0C;
  --color-muted:          #AABCBB; /* dates, placeholders, filets                     */
  --color-muted-strong:   #557978;
  --color-error:          #C8102E;
  --color-error-bg:       #F4CFD5;

  /* Typo */
  --font-sans: "Mona Sans", system-ui, -apple-system, Roboto, "Helvetica Neue", sans-serif;
  --fs-h1:   clamp(3.5rem, 3.1552419355rem + 1.5322580645vw, 4.6875rem);
  --fs-h2:   clamp(2.5rem, 2.2641129032rem + 1.0483870968vw, 3.3125rem);
  --fs-h3:   clamp(2rem, 1.8004032258rem + 0.8870967742vw, 2.6875rem);
  --fs-h4:   clamp(1.5rem, 1.3548387097rem + 0.6451612903vw, 2rem);
  --fs-h5:   clamp(1.25rem, 1.122983871rem + 0.564516129vw, 1.6875rem);
  --fs-h6:   clamp(1.125rem, 1.0161290323rem + 0.4838709677vw, 1.5rem);
  --fs-lead: clamp(1.125rem, 1.0887096774rem + 0.1612903226vw, 1.25rem);
  --fs-body: clamp(1rem, 0.9637096774rem + 0.1612903226vw, 1.125rem);
  --fs-display: clamp(2rem, 1.2741935484rem + 3.2258064516vw, 4.5rem);

  /* Espace (base 8 px) */
  --space-1: .5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2rem;
  --space-5: 2.5rem; --space-6: 3rem; --space-8: 4rem; --space-10: 5rem; --space-15: 7.5rem;

  /* Mise en page */
  --container: 75rem; --container-wide: 100rem; --container-text: 43.125rem; --container-intro: 36.75rem;
  --gutter: 1.5rem; --grid-gap: 2rem;
  --header-h: 4rem;           /* 5.3125rem à partir de 48em */

  /* Formes */
  --radius-control: 4px; --radius-none: 0; --border: 1px;

  /* Mouvement */
  --ease-in-out: cubic-bezier(0.95, 0, 0.05, 1);
  --ease-out:    cubic-bezier(0.01, 0, 0.1, 1);
  --ease-in:     cubic-bezier(0.9, 0, 0.99, 1);
  --dur-shortest: 150ms; --dur-short: 200ms; --dur-standard: 375ms; --dur-long: 400ms;
  --dur-intro: 270ms; --dur-outro: 195ms;
}
/* Points de rupture : 30em, 37.5em, 48em (principal), 55em, 80em (desktop), 90em, 100em */
```

---

## 21. Limites de cette extraction

- Les valeurs `wdth` exactes des instances « Condensed » et « Headline » de Mona Sans ne sont pas lisibles (instances statiques renommées) : il faut les caler visuellement.
- Le fichier `Prosper Sans` 600 (`15a5925c…`) et les italiques n'ont pas été ouverts (graisse supposée).
- La bannière OneTrust est injectée par GTM : son rendu exact (textes, disposition) n'est pas dans le code source téléchargé ; seule l'harmonisation des boutons l'est.
- Les pages de don (React) n'ont pas été analysées en détail.
- Captures d'écran : voir `docs/design/reference/screenshots/` (produites par une autre étape) et `scratchpad/raw/prosper-tokens/home-1440.png`.
