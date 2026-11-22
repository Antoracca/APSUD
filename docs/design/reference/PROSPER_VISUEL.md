# Prosper Global — analyse visuelle et comportementale

> Référence de design pour la refonte d'APSUD. Ce document décrit le **langage visuel** de https://www.prosperglobal.org/ (ex-Mercy Corps, Drupal 11, thème dérivé de Gesso). On n'en reprend **pas** le contenu.
> Relevés faits le 21/11/2026 dans un vrai navigateur (panneau navigateur, viewport 1024 px puis émulation mobile 375×812) et avec Edge headless (captures 1440 px et 390 px).
> Les valeurs en px sont des **valeurs calculées** (`getComputedStyle`). La typographie est fluide, donc une taille relevée à 1024 px grandit un peu à 1440 px.

---

## 0. Index des captures

Dossier : `docs/design/reference/screenshots/`

| Fichier | Contenu | Remarque |
|---|---|---|
| `prosper-home-desktop.png` | Accueil 1440×900, au premier chargement | La **pop-up de dons** est ouverte (voilée de blanc à 70 %). C'est ce que voit un nouveau visiteur. |
| `prosper-home-desktop-sans-popup.png` | Accueil 1440×900, pop-up refusée | Hero vidéo, bandeau de campagne, header. |
| `prosper-home-full-desktop.png` | Accueil pleine hauteur, 1440×7613 | Page entière. Le méga-menu y apparaît ouvert parce que le pointeur était sur la nav pendant la capture. Utile pour le voir. |
| `prosper-home-mobile.png` | Accueil 390×844 | Émulation mobile réelle via CDP. |
| `prosper-home-full-mobile.png` | Accueil pleine hauteur, 390×8626 | Empilement mobile complet. |
| `prosper-who-we-are-desktop.png` / `-mobile.png` | Page « Who we are » | Gabarit de page de section : titre, photo 16:9, légende, texte étroit, blocs en zigzag. |
| `prosper-what-we-do-desktop.png` / `-mobile.png` | Page « What we do » | Même gabarit avec un intertitre et un zigzag de 3 programmes. |
| `prosper-blog-article-desktop.png` / `-mobile.png` | Article de blog | Gabarit article : titre long, photo pleine largeur, date et partage, encadré « points clés », images en duo décalé. |
| `apsud-actuel-home-desktop.png` / `-mobile.png` | Site APSUD actuel, premier écran | **Aucun 406 dans Edge** : le navigateur envoie les bons en-têtes. |
| `apsud-actuel-home-full-desktop.png` / `-full-mobile.png` | Site APSUD actuel, page entière | Les sections « Qui sommes-nous » et « Projets en cours » sortent **vides** : le contenu est rendu en JS avec des animations AOS qui ne se déclenchent pas hors écran. Ce défaut existe aussi pour les robots et le référencement. |

Note technique : en mode `--headless=new`, Edge ne descend pas sous environ 500 px de largeur de fenêtre. Les premières captures à 390 px montraient donc une page coupée à droite. Les captures mobiles finales passent par le protocole DevTools (`Emulation.setDeviceMetricsOverride`, `mobile:true`, user-agent Android). Le script est dans le scratchpad (`cdpshot.mjs`).

---

## 1. Sensation globale, en une phrase

**Un éditorial humanitaire calme et sûr de lui.** De grandes photos documentaires de vraies personnes, des titres en grotesque condensée très gras, une palette réduite (vert-pétrole presque noir, aqua électrique, crème, touche de vert tilleul) et des blocs de couleur rectangulaires qui se décalent les uns par rapport aux autres. Il n'y a ni ombre, ni dégradé, ni coin arrondi sur les images. L'impression « premium » vient de la **retenue** et de la **cohérence**, pas des effets.

---

## 2. Palette observée (rôles)

| Rôle | Valeur | Où |
|---|---|---|
| Encre et fond sombre principal | `#003634` (rgb 0,54,52), vert-pétrole très profond | Tout le texte, le bouton « Donate », le bloc de contenu du hero, les CTA sombres |
| Survol du sombre | `#002D2B`, puis `#001817` pour « Donate » | Hover des boutons |
| Accent signature | `#4AFFF4`, aqua électrique | Bandeau du haut (eyebrow), bloc des chiffres, fond du footer, texte du bouton Donate, bouton sur fond sombre |
| Survol de l'accent | `#3ED4CB` | |
| Accent doux | `#B7FFFB`, aqua pâle | CTA secondaire pleine largeur |
| Fond neutre chaud | `#F5F4EA`, crème | Boîtes texte du zigzag, section « déclaration + chiffres », bas du footer, texte clair sur fond sombre |
| Accent complémentaire | `#E4FFC3`, vert tilleul pâle | Petit carré décalé derrière les légendes, rectangle qui dépasse derrière le hero, survol des icônes sociales |
| Urgence (dons) | `#FF5C12`, orange vif ; survol `#D44D0F` | **Uniquement** les CTA de campagne d'urgence. Texte `#002827`. |
| Texte secondaire | `#557978` | Liens de sous-menu |
| Désactivé | `#AABCBB` | |

Ce qu'il faut retenir :
- Une seule couleur sombre sert à la fois au texte et aux fonds. Le noir pur n'est jamais utilisé : le « noir » est teinté de la couleur de marque.
- Une couleur saturée sert de signature (l'aqua) et une couleur chaude est réservée à l'action urgente (l'orange).
- Les fonds alternent blanc, crème, aqua et sombre. C'est ce changement de fond qui sépare les sections, pas des filets.

Transposition APSUD : le vert actuel est `#1BBD36` dans `style.css`, avec un vert plus sombre en footer. On peut construire un « vert-forêt quasi noir » pour l'encre et les fonds sombres, le vert du logo comme signature saturée, une crème chaude et un vert tilleul pâle, plus **une** couleur chaude (ocre, jaune ou orange) réservée au bouton « Faire un don ». Le jaune du bâtiment APSUD visible dans le slider est une piste naturelle.

---

## 3. Typographie

### Familles (propriétaires, servies en woff2)

| Famille | Graisses chargées | Usage |
|---|---|---|
| **Prosper Sans Headline** | 400, une coupe display déjà très noire | H1 de pages intérieures, grande phrase-manifeste, chiffres clés, certains H2 |
| **Prosper Sans Condensed** | 600 / 800 (rendu en 700) | H1 du hero, H2 de section, H3 de cartes, navigation, **tous les boutons** |
| **Prosper Sans** | 400 / 600 / 800 | Texte courant, légendes, liens texte (800) |

On trouve aussi dans les CSS Tiempos, Futura et Mona Sans, des reliquats de l'ancienne marque ou de microsites, non utilisés sur l'accueil.
**Équivalents libres pour APSUD** : une grotesque à axe de largeur fait le même travail avec une seule famille, par exemple **Archivo** (variable, `wdth` 62–125) en largeur 100 pour le texte et en largeur 75 ou moins avec une graisse de 700–800 pour les titres et boutons. Autres pistes : *Barlow* + *Barlow Condensed*, ou *Bricolage Grotesque*.

### Échelle relevée (viewport 1024 px, puis mobile 375 px)

| Élément | Famille / graisse | Taille, interlignage | Mobile |
|---|---|---|---|
| H1 de page (« Who we are ») | Headline 400 | 66 px / 1,10 | env. 40 px |
| Phrase-manifeste (accueil) | Headline 400 | 53 px / **1,0** (très serré) | 32,5 px / 1,0 |
| Chiffres clés | Headline 400, interlettrage +0,5 px | 58 px / 1,3 | 28,7 px |
| H2 de section (« Featured stories ») | Condensed 700 | 47 px / 1,10 | **40 px** (le H2 reste grand) |
| H1 du hero (sur bloc sombre) | Condensed 700, couleur crème | 41,5 px / 1,15 | 32 px |
| H3 de boîte du zigzag | Condensed 700, +0,5 px | 38 px / 1,2 | 32 px |
| H3 de carte | Condensed 700, +0,5 px | 28 px / 1,2 | 24 px |
| Navigation principale | Condensed 700 | 21 px | Menu mobile : env. 30 px |
| Texte courant | Sans 400 | **17 px / 1,5** | 16 px / 1,5 |
| Bandeau eyebrow | Sans 400, passage en gras pour l'accroche | 18 px / 1,3 | |
| Légende photo | Sans 400 | 13 px / 1,4 | |
| Bouton | Condensed **800** | 19 px (petit : 17 px) | |
| Lien d'action (« Read more ») | Sans **800**, souligné 1 px, décalé de 2 px | 17 px | |

Traitement des titres :
- **Casse de phrase partout**, pas de capitales, sauf le bouton « DONATE NOW » de la pop-up et le bouton du hero d'urgence. Les capitales sont donc réservées à l'urgence.
- **Interlettrage nul ou à peine positif** (+0,5 px) : de la densité, sans compression artificielle.
- **Interlignage très serré** (1,0 à 1,15) sur les gros titres. Ils forment des blocs compacts et noirs.
- **Contraste d'échelle fort** : un texte de 17 px voisine avec des titres de 47 à 66 px, soit un rapport d'environ 3 à 4.
- La largeur de lecture est limitée à **690 px** (colonne « seven-columns »), soit 70 à 80 caractères.

---

## 4. Grille, rythme vertical, respiration

- Conteneur standard `l-constrain` : max **1200 px** et 24 px de gouttière. La navigation a un conteneur plus large : max 1600 px et 36 px de gouttière. Le système est nommé en 20 colonnes (« twenty-columns »).
- Les **photos de hero et certaines sections sortent du conteneur** et occupent toute la largeur. On passe sans cesse de pleine largeur à contenu contraint.
- **Rythme** : chaque section respire avec environ 120 à 160 px d'espace vertical (40 px de marge entre paragraphes Drupal, plus les marges propres aux composants). Il n'y a jamais deux blocs denses collés.
- **Densité** : faible à moyenne. Sur 1440 × 900 on voit au plus un message et une image. L'accueil fait environ 7 600 px de haut sur desktop et environ 8 600 px sur mobile, pour 8 sections seulement.
- **Rapport texte/image** : environ 50/50 sur l'accueil, environ 60 % image sur les pages de section. Le texte arrive toujours en petits blocs de 2 ou 3 lignes.
- **Mise en page en zigzag décalé**, la signature de mise en page (voir `prosper-who-we-are-desktop.png`, `prosper-what-we-do-desktop.png`) :
  - une image **carrée 1:1** (480 × 480) d'un côté ;
  - de l'autre côté, une boîte crème (20 px de padding) **alignée sur le bas** de l'image, donc plus courte qu'elle ;
  - les côtés s'inversent à chaque rangée. Le décalage vertical crée un rythme en escalier, et le haut de la colonne texte reste vide, ce qui fait respirer.
- **Histoires à la une** : asymétrie volontaire, avec une grande carte 4:3 à gauche (environ 60 %) et une petite carte à droite **décalée vers le bas**.
- **Section manifeste + chiffres** : une grande phrase sur fond crème, puis un bloc aqua de 2 × 2 chiffres calé à droite. À sa gauche, un rectangle tilleul et le chevron du logo en très grand empiètent sur le bloc.

---

## 5. Signature graphique (formes, lignes, découpes)

1. **Le chevron du logo** : une flèche « lecture » aux angles arrondis, en aqua plus soutenu. On le retrouve en très grand comme élément graphique (section chiffres, `c-quick-stats__amara`) et dans les photos, brodé sur les casquettes et gilets du personnel.
2. **Rectangles décalés et superposés** : derrière la légende de chaque photo de hero, un petit carré tilleul (80 × 70 px, pseudo-élément `::before`) dépasse à gauche d'un cartouche aqua. Derrière le bloc texte du hero, un rectangle tilleul dépasse aussi. Ce motif de « marches » est récurrent.
3. **Découpe en escalier du footer** : le bord supérieur du footer aqua n'est pas droit. Une marche rectangulaire (`c-footer-desktop__top-step`) mord dans la section crème au-dessus.
4. **Mots sur bandes de couleur** : sur la vignette vidéo de « Who we are », la phrase est découpée en lignes, chacune posée sur une bande pleine (crème, tilleul, vert vif, aqua) et décalée en escalier, comme des étiquettes.
5. **Angles vifs partout** : `border-radius: 0` sur les images, boîtes et sections. **4 px** seulement sur les boutons.
6. **À plat** : aucune ombre portée (`box-shadow: none` sur les cartes), aucun dégradé, aucune texture.
7. **Légende-cartouche** : la légende photo n'est pas dessous en gris. C'est un cartouche aqua posé à cheval sur le bas de la photo, avec le carré tilleul décalé.

---

## 6. Direction artistique photo

- **Documentaire, lumière naturelle**, sans filtre, duotone ni grain ajouté. Couleurs fidèles, assez saturées : peaux chaudes, textiles colorés, ciels réels.
- **L'humain d'abord** : quasiment chaque image montre une ou deux personnes en plan rapproché (taille ou poitrine), souvent **face caméra et souriantes**, ou en pleine action (déblayer, porter, cultiver, discuter).
- **Le personnel local porte la marque** (casquette ou gilet au logo). La photo raconte « nos équipes sont sur place » sans texte.
- **Faible profondeur de champ** sur les portraits (arrière-plan flou, couleurs de fond douces). Plans larges réservés aux contextes de crise (camps, ruines).
- **Cadrages** : 16:9 pour les heros de page, 4:3 pour les cartes, **1:1** pour le zigzag. Les sujets sont décentrés pour laisser de l'air côté texte.
- **Dignité** : pas de misérabilisme dans les pages institutionnelles. L'image de crise (enfants, camps) est réservée aux campagnes d'urgence.
- Pour APSUD : privilégier les photos d'équipes APSUD sur le terrain (gilets et logo visibles), les bénéficiaires en action (eau-hygiène-assainissement, agriculture, formations), avec des cadrages serrés et en lumière naturelle. Éviter les photos de salle avec projecteur et les façades plein cadre (cas actuel du slider).

---

## 7. Composants et comportements

### 7.1 Pile d'en-tête

Captures : `prosper-home-desktop-sans-popup.png`, `prosper-home-mobile.png`.

Trois couches empilées en haut d'écran :
1. **Eyebrow** (`l-eyebrow`) : bandeau aqua plein, 18 px, une phrase avec la partie importante en gras, un lien souligné et une croix de fermeture. Hauteur 51 px (122 px sur mobile, car le texte passe sur 4 lignes).
2. **Navigation** (`l-main-navigation`) : fond blanc, 85 px. Logo à gauche (avec la mention « formerly Mercy Corps »), 4 entrées condensées en gras, loupe, puis bouton **Donate** sombre à texte aqua.
3. **Bandeau de campagne** : fond sombre, titre aqua, texte aqua, bouton orange, croix. Il défile avec la page.

**Au scroll**, l'eyebrow et la navigation sont `position: fixed` (top 0 et top 51 px). Le header **reste toujours visible**, sans se rétracter, se masquer ni gagner d'ombre, même en remontant. Cela fait environ 136 px de chrome fixe. C'est lourd sur un petit écran et ce n'est pas à copier tel quel.

### 7.2 Méga-menu desktop

Visible en haut de `prosper-home-full-desktop.png`.
- Au survol de n'importe quelle entrée, **un seul panneau** descend et montre les enfants des **4 colonnes en même temps**.
- Transition `transform 300ms cubic-bezier(0.01,0,0.1,1)` avec **300 ms de délai**, pour éviter les ouvertures accidentelles.
- L'entrée survolée prend un **fond aqua en pastille** et un soulignement.
- Les sous-liens sont en Condensed 500 et `#557978`. Au survol, ils passent en couleur d'encre, se soulignent et **glissent de 10 px** (`padding-inline-start`).

### 7.3 Menu mobile

Relevé dans le navigateur en émulation 375 px.
- Le burger (3 barres) devient une croix. Le panneau plein écran blanc **descend depuis le haut**. L'eyebrow, le logo et le bouton Donate restent visibles au-dessus.
- 4 entrées en **très grand** (Condensed, environ 30 px), séparées par beaucoup d'air, avec un chevron à droite. C'est un **accordéon** : le chevron pivote et les sous-liens apparaissent en retrait, en couleur grisée.
- Lien « Search » avec loupe en bas de liste.

### 7.4 Hero vidéo (accueil)

- Balise `<video>` : un MP4 de 1920 × 1080, **environ 10 s en boucle**, `muted`, `loop`, `playsinline`. `autoplay` vaut false dans le HTML : la lecture est lancée en JS. Un poster WebP est servi via un style d'image Drupal (`cta_hero_poster`) et l'image est cadrée avec `object-fit: cover`.
- Affichée en 16:9 pleine largeur (576 px de haut à 1024 px de large).
- **Bouton pause** rond, blanc à 65 %, en bas à droite (accessibilité WCAG 2.2.2).
- Composition desktop : un **bloc de contenu sombre** (`#003634`) chevauche le bas gauche de la vidéo, avec un H1 crème, un paragraphe crème et un bouton orange en capitales. Un rectangle tilleul dépasse derrière, à gauche.
- Composition mobile : la vidéo en haut, puis le bloc sombre en dessous sur toute la largeur. Pas de texte posé sur l'image, donc la lisibilité est garantie.
- Sur les pages intérieures, le hero est remplacé par **titre puis photo** : un H1 noir sur blanc, puis la photo 16:9 pleine largeur et sa légende-cartouche.

### 7.5 Boutons et liens (états)

| Variante | Repos | Survol |
|---|---|---|
| Principal sombre (Donate) | fond `#003634`, texte aqua, radius 4, padding 12/10 | fond `#001817` |
| Secondaire (contour) | transparent, bordure 1 px sombre | **ajoute un `outline` de 3 px** : le contour paraît s'épaissir, sans bouger le layout |
| Tertiaire | contour | se remplit en sombre, texte blanc |
| Urgence (quaternary) | orange `#FF5C12`, texte sombre | orange foncé `#D44D0F`, texte **blanc** |
| Sur fond sombre | aqua | aqua foncé `#3ED4CB` |
| Lien texte (« Learn more », « Read more ») | 800, souligné 1 px, décalé de 2 px | soulignement **2 px** |
| Carte cliquable | | **Rien ne bouge** : ni zoom, ni ombre. Seul le soulignement de « Read more » s'épaissit. Toute la carte est cliquable. |
| Icônes sociales (footer, partage) | pictos sombres | fond tilleul `#E4FFC3` |

Courbes d'animation utilisées : `cubic-bezier(0.01,0,0.1,1)` (sortie très douce), `cubic-bezier(0.9,0,0.99,1)` pour les fonds de bouton (200 ms) et `cubic-bezier(0.95,0,0.05,1)`. Les durées vont de 200 à 550 ms.

### 7.6 Animations au scroll

- **Compteurs** : les chiffres clés partent de 0 et montent jusqu'à leur valeur quand le bloc entre dans l'écran (observé de « 0m » à « 37m », de « 0 » à « 3,400 »).
- **Parallaxe légère** : le grand chevron (`translateX` piloté en JS) et le rectangle tilleul glissent en place à l'arrivée du bloc.
- **Anneau d'efficacité** du footer : un cercle de progression se dessine (`@keyframes efficiency-ring-draw`) et le pourcentage monte.
- Une animation générique `fadeInAnimation` existe. En revanche, **pas de fondu systématique** de chaque bloc : la plupart des contenus sont simplement là.
- Les animations sont placées sous `@media (prefers-reduced-motion: no-preference)`, avec une variante `reduce`.

### 7.7 Pop-up de dons (campagne)

Voir `prosper-home-desktop.png`.
- Modale centrée sur fond crème (environ 590 px de large), avec un visuel de campagne (photo, bandeau sombre et titre en capitales tilleul), un H3 Condensed de 38 px, 2 lignes de texte, puis un bouton plein « DONATE NOW » et un bouton contour « No thank you ».
- Voile blanc à 70 % (pas noir). Elle apparaît au chargement et disparaît une fois refusée (mémorisée).
- **Bilan** : eyebrow, navigation, bandeau de campagne et pop-up font **quatre couches promotionnelles** au premier écran. C'est efficace pour la collecte mais intrusif, à ne pas reproduire pour APSUD (une seule annonce au maximum).

### 7.8 Bandeau cookies

- Solution **OneTrust**. Le visiteur est géolocalisé au Maroc, donc **aucun bandeau n'a été affiché**. Les groupes C0001, C0002 et C0004 sont actifs par défaut, soit un modèle opt-out pour cette région. Il n'y a donc **rien eu à refuser**.
- Un lien « Manage cookies » en pied de page ouvre le centre de préférences OneTrust, dans son style générique (non personnalisé).
- Pour APSUD (cible RCA et bailleurs européens) : un bandeau sobre en bas d'écran, aux couleurs du site, avec « Tout refuser » aussi visible que « Tout accepter » et un lien permanent « Gérer les cookies » dans le footer.

### 7.9 Footer

- Bord supérieur en **escalier**, fond aqua plein. Une signature-slogan en Condensed d'environ 40 px à gauche.
- 3 colonnes : deux colonnes de liens avec un titre en capitales souligné (Condensed 16 px), puis une colonne d'inscription à la lettre (email et téléphone, champs blancs à bord sombre, bouton sombre « SIGN UP »).
- Sous-footer crème : logo, statut juridique et numéro fiscal, liens légaux soulignés, et un **indicateur de transparence financière** (anneau et pourcentage de dépenses allées aux programmes). C'est une très bonne idée à reprendre pour APSUD : afficher la part des fonds allant au terrain, si la donnée existe.

### 7.10 Gabarit article

Voir `prosper-blog-article-desktop.png`.
- Un H1 Condensed sur 2 lignes, puis une photo pleine largeur avec sa légende-cartouche, puis une ligne avec la date à gauche et le partage (f / in / mail) à droite.
- **Encadré « Key takeaways »** : fond crème, 3 puces. C'est le résumé avant la lecture.
- Colonne de texte de 690 px avec des liens soulignés et des intertitres H2 Condensed.
- Les images internes sont **en duo décalé** (une grande, une petite plus basse) avec une légende de 13 px dessous.

---

## 8. Pourquoi ça fait « ONG internationale premium »

1. **Une typographie propriétaire et une condensée très grasse** : les titres ont du poids, de l'autorité, et rien de « template ».
2. **Une palette réduite et disciplinée** : un sombre, un aqua, un crème, une pointe de tilleul. L'orange n'apparaît que pour l'urgence, donc il garde sa force.
3. **Du vide assumé** : grands espaces, colonnes de texte étroites, un message par écran.
4. **Des photos vraies et incarnées** : personnel local identifiable, regards caméra, lumière naturelle. Pas de banque d'images.
5. **Une seule idée graphique, répétée partout** (rectangles décalés et chevron), qui donne une identité reconnaissable sans illustration.
6. **Des micro-interactions sobres et cohérentes** : soulignement qui s'épaissit, contour qui s'affirme, aucun gadget.
7. **La preuve par les chiffres et la transparence** : compteurs, part des fonds aux programmes, rapport annuel.
8. **L'accessibilité visible** : contraste très élevé (`#003634` sur blanc ou crème), bouton pause vidéo, `prefers-reduced-motion`, lien d'évitement, cibles généreuses.
9. **Pas de carrousel**, alors que le site APSUD actuel repose sur un slider plein écran.

---

## 9. Écarts avec le site APSUD actuel

Captures : `apsud-actuel-*.png`.

| Aspect | APSUD actuel | Cible inspirée de Prosper |
|---|---|---|
| Premier écran | Slider plein écran (100vh), photos de salle ou de façade, légende dans une boîte grise semi-transparente | Hero vidéo ou photo humaine, bloc de message chevauchant, un seul CTA |
| Navigation | 6 entrées en capitales, Roboto 13 px environ, vert vif en élément actif, icônes sociales dans le header (dont Google+) | 4 ou 5 entrées en casse de phrase, condensée grasse, bouton « Faire un don » distinct |
| Typo | Roboto / Poppins / Open Sans (template Bootstrap « BootstrapMade ») | Une famille à axe de largeur (texte et condensée) |
| Couleur | Vert `#1BBD36` sur blanc, footer vert saturé, sous-footer noir | Vert-forêt profond pour l'encre, vert logo en accent, crème, tilleul, une couleur chaude pour le don |
| Contenu | Sections rendues en JS + AOS, **vides** si l'animation ne se déclenche pas (captures pleine page) | Contenu en HTML serveur, animations réservées aux chiffres et aux formes |
| Rythme | Grands blocs gris vides, peu de hiérarchie | Alternance de fonds, zigzag décalé, manifeste et chiffres |
| Mobile | Header logo + icônes sociales, burger, slider | Header compact, bouton Don visible, menu en accordéon en grande typo |

---

## 10. À reprendre / à adapter / à éviter

**Reprendre**
- La grotesque condensée grasse en casse de phrase pour les titres, avec un texte courant de 17 px sur une ligne de 1,5 et une colonne de 690 px.
- Le système encre sombre teintée + accent saturé + crème + tilleul.
- Le zigzag d'images carrées avec boîte crème alignée en bas.
- La légende-cartouche colorée avec carré décalé.
- La phrase-manifeste en très grand, suivie de 4 chiffres clés animés.
- La carte entièrement cliquable avec un hover discret (soulignement de 1 à 2 px).
- Les boutons à 4 px de rayon, en condensée 800, avec un contour qui s'affirme au survol.
- Le footer en aplat couleur avec découpe en escalier et l'indicateur de transparence.
- Le bouton pause sur la vidéo et le respect de `prefers-reduced-motion`.

**Adapter**
- Le header fixe : garder le bouton Don toujours visible, mais **réduire la hauteur** au scroll (ou masquer en descente et réafficher en remontée), surtout sur mobile.
- Le méga-menu : APSUD a peu de pages, un menu déroulant simple ou un mini méga-menu « Nos domaines » (Eau-hygiène-assainissement, Protection/Genre, Sécurité alimentaire) suffit.
- La vidéo hero : une boucle courte (8 à 10 s, moins de 3 Mo, 720p) avec un poster, car la bande passante est limitée en RCA. Sinon, une photo forte.

**Éviter**
- L'empilement eyebrow + bandeau de campagne + pop-up.
- Les animations qui conditionnent l'affichage du contenu (défaut actuel d'APSUD).
- Les capitales partout, les ombres et les dégradés.
