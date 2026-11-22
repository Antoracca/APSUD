# APSUD — Mémoire du contenu du site actuel

> Extraction exhaustive de https://apsud.org réalisée le 21/11/2026 pour la refonte du site.
> Le texte source est recopié fidèlement (fautes comprises) ; les corrections sont listées dans la section « À corriger ».
> Les éléments **déduits** (non écrits sur le site) sont signalés comme tels.

**Fichiers de données associés**

- `data/apsud/organisation.json` — identité, mission, valeurs, domaines, zones, contact, don, réseaux, couleurs
- `data/apsud/projets.json` — 13 projets complets
- `data/apsud/images.json` — catalogue des 57 images téléchargées (alt, légende, dimensions, poids, URL source)
- Images : `assets/apsud/images/{hero,a-propos,don,projets/<slug>}/` ; logo : `assets/apsud/logo/`
- HTML brut : dossier scratchpad `raw/apsud-contenu/` (temporaire)

## Sommaire

1. [Pages crawlées](#1-pages-crawlées)
2. [Organisation](#2-organisation)
3. [À propos (texte intégral)](#3-à-propos-texte-intégral)
4. [Page d’accueil](#4-page-daccueil)
5. [Projets](#5-projets)
6. [Partenaires et bailleurs](#6-partenaires-et-bailleurs)
7. [Contact](#7-contact)
8. [Faire un don](#8-faire-un-don)
9. [Pied de page, navigation, mentions légales](#9-pied-de-page-navigation-mentions-légales)
10. [Identité visuelle](#10-identité-visuelle)
11. [Images](#11-images)
12. [Audit du site actuel](#12-audit-du-site-actuel)
13. [À corriger dans le texte source](#13-à-corriger-dans-le-texte-source)
14. [Informations manquantes à demander à APSUD](#14-informations-manquantes-à-demander-à-apsud)

## 1. Pages crawlées

| URL | Statut | Contenu |
|---|---|---|
| https://apsud.org/ et /home | 200 (identiques) | Carrousel (3 slides), « Qui sommes nous ? », 2 projets en cours, 14 logos partenaires, pied de page |
| /A_propos | 200 | Présentation, objectif, vision, mission, 6 valeurs, 3 domaines, zones, section équipe vide |
| /liste_projets (et ?page=2, identique) | 200 | 13 fiches projets, pas de pagination |
| /detail-projet/{id}/{titre} | 200 pour 13 ids : 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 19, 20 | Fiche projet complète |
| /detail-projet/{1–4, 12, 16, 17, 21–40} | 500 | Le titre exact dans l’URL est obligatoire : sans lui, toute URL renvoie 500, même pour un projet existant. **[Contrôle qualité]** Les archives montrent que l’id 2 était un vrai projet (Alindao 2023, retiré) et que les ids 3 et 4 étaient d’anciennes saisies des projets 5 et 7 — voir § 15. |
| /Nos_partenaires | 200 | 14 logos sans nom |
| /Contactez_nous | 200 | Coordonnées + formulaire |
| /Faire_un_Don | 200 | Une seule image + « Que fait on de vos don? » |
| /robots.txt | 200 | Tout autorisé |
| /sitemap.xml, /assets/img/apsud.jpg, /frontend/assets/img/logo.png | 404 | — |
| /favicon.ico | 200, 0 octet | Favicon vide |

Aucune page actualités, galerie, offres d’emploi, rapports/publications ou mentions légales n’existe. `/login` (back-office) ignoré.

## 2. Organisation

| Champ | Valeur |
|---|---|
| Sigle | **APSUD** |
| Nom complet | Action pour la Population et le Développement Durable |
| Nom anglais | Action for Population and Sustainable Development |
| Statut | Organisation Non Gouvernementale Nationale de développement et d'action humanitaire, à but non lucratif |
| Indépendance | Indépendante de toute entreprise, collectivité, organisation politique ou religieuse. |
| Pays | République centrafricaine (RCA) |
| Siège | MICHELINE, BIMBO (quartier Micheline, commune de Bimbo, Ombella-M’Poko — préfecture déduite) |
| Boîte postale | B.P. 462 Bangui — *Panneau du siège visible sur la photo du staff (pas dans le texte du site) — à confirmer* |
| Date de création | Non indiquée sur le site |
| Slogan | « Nous sauvons des vies et accompagnons le développement local » — *Panneau du siège visible sur la photo du staff (absent du texte du site) — à confirmer avec APSUD* |
| Accroche du site | « BIENVENUE SUR LE SITE DE L'ONG NATIONALE APSUD » |
| Instances citées | Assemblée Générale, Conseil d'administration, Bureau Exécutif, Antennes, Terrain (dans la valeur « Cohérence ») |
| Équipe publiée | Aucune — section « Notre équipe » vide |

### Chiffres clés

*Le site actuel ne publie aucun chiffre clé. Les chiffres suivants sont **déduits** des fiches projets et doivent être validés par APSUD.* **[Contrôle qualité]** L’ancien site (2023) annonçait « plus de 60 projets réalisés de 2016 à février 2023 » : voir § 15.

| Chiffre | Libellé | Détail |
|---|---|---|
| 13 | projets publiés sur le site | 2 en cours, 11 réalisés |
| 2018–2027 | période couverte par les projets publiés |  |
| 4 116 718 | USD de budgets cumulés (11 projets libellés en USD) | Hors PARSOC (360 721,61 € part probable APSUD / 1,7 M€ global) et Upscale AgriApps (159 214 €). Inclut 430 000 USD pour Boguila (montant ambigu). |
| ≈ 250 000 | personnes bénéficiaires déclarées | Somme des bénéficiaires chiffrés des projets 5, 6, 7, 9, 10, 11, 14, 19 (249 676), sans le projet 13 (chiffre identique au 14, doublon probable). |
| 200 | organisations de la société civile accompagnées (PARSOC) |  |
| 9 | ONG nationales renforcées dans des projets de localisation | 6 ONG de femmes (projet 19) + 3 ONG (projet 15) |
| 1 900 | latrines familiales appuyées | 1 200 (projet 19) + 500 (projet 14) + 200 (projet 7) |
| 12 + Bangui | préfectures d’intervention (projets) |  |
| 7 | bailleurs et partenaires financiers cités dans les fiches projets | FH, BMZ, WHH, UE, Japon, PNUD (+ TGH en coordination) |

## 3. À propos (texte intégral)

Bouton-titre de la page : « QUI SOMMES NOUS » (bouton vert non cliquable).

> **Action pour la Population et le Développement Durable (Action for Population and Sustainable Development – APSUD)** est une Organisation Non Gouvernementale Nationale de développement et d’action humanitaire. À but non lucratif, elle est indépendante de toute entreprise, collectivité, organisation politique ou religieuse.

### Objectifs de l’ONG APSUD

> Améliorer les conditions de vie des personnes en République Centrafricaine

### Vision

> Un Centrafrique juste, meilleur, sans pauvreté et sans discrimination ;

### Mission

> APSUD s’emploie à concevoir et mettre en œuvre de solutions durables à la pauvreté, à l’injustice, à l’insécurité et à la crise humanitaire.

### Valeurs

- **Respect** : Ecoute, tolérance, empathie, ouverture d’esprit et au dialogue. Attitude d’ouverture et reconnaissance des différences permettant de donner de la considération aux points de vue, aux valeurs, aux autres cultures sans préjugés à l’égard de ceux qui les expriment.
- **Solidarité** : Entraide, coopération, mutualité, fraternité, interdépendance. Adhésion collective aux objectifs et valeurs de l’organisation. Conscience de la communauté des intérêts et des droits des individus et des collectivités. Mesures individuelles et collectives pour d’une part renforcer la réponse humanitaire et d’autre part lutter contre l’injustice et la pauvreté.
- **Responsabilité** : Imputabilité, leadership, transparence. Prendre des décisions et en assumer les impacts. Imputabilité à l’égard de ses actions et ses décisions et devoir de rendre des comptes.
- **Cohérence** : Décisions, actions et gestes posés en harmonie avec les valeurs de l’APSUD. Les implications des décisions et des actions sont analysés en fonction de l’ensemble des activités de l’organisation. Un lien logique et une cohésion sont établis entre les orientations, les décisions et les actions à tous les niveaux de l’organisation : l’Assemblée Générale, le Conseil d’administration, le Bureau Exécutif, les antennes et le terrain.
- **Innovation** : Nouvelle approche, changement, pratique ou intervention, animée par une ouverture d’esprit à la création et par des idées neuves. Les forces tant internes qu’externes sont valorisées.
- **Partage de savoir** : Partage des connaissances, des expériences individuelles et corporatives en vue d’enrichir la pratique et le savoir-faire. Le partage du savoir favorise l’interdisciplinarité, l’innovation et un lien de réciprocité. Tous les membres et partenaires de l’organisation apprenante bénéficient ainsi de bases solides pour accroître leur impact et mieux se développer ensemble.

### Domaines d’intervention

> APSUD intervient dans trois (03) domaines :

1. **Sécurité alimentaire et Moyens de subsistance et stabilisation communautaire**
2. **Protection** (protection physique des personnes vulnérables, promotion des droits de l’homme, justice, protection des enfants et lutte contre les violences basées sur le Genre) ;
3. **WASH** (Eau-Hygiène et Assainissement, santé environnementale).

> **La Protection de l’Environnement** est considérée comme un domaine transversal chez APSUD.

*Observation (déduite) :* le **renforcement des capacités de la société civile et la localisation de l’aide** est devenu un axe majeur (projets 15, 18, 19) sans figurer dans les domaines officiels.

### Zones d’intervention (déclarées)

- Les 8 arrondissements de Bangui
- Préfecture d’Ombella Mpoko (BIMBO, BEGOUA, DAMARA)
- Préfecture de la OUAKA (BAMBARI, IPPY, GRIMARI, MALOUM)
- Préfecture de la HAUTE KOTTO (BRIA)

*Zones observées dans les projets :* Bangui ; Ombella-M’Poko (Bimbo) ; Ouaka (Bambari, Ippy, Maloum) ; Ouham (Boguila, Markounda, Batangafo — préfecture déduite pour Markounda et Batangafo) ; Mbomou (Rafaï — déduit) ; Lobaye ; Kémo ; Nana-Mambéré (Bouar) ; Nana-Gribizi (Kaga-Bandoro) ; Bamingui-Bangoran ; Basse-Kotto ; Ouham-Pendé.

### Équipe

Titre « Notre équipe », sous-titre « le bureau de la coordination de l’ONG APSUD. » — **aucun membre publié**. Photo « STAF APSUD » (staff devant le siège).

## 4. Page d’accueil

### Carrousel (hero)

| # | Image | Texte |
|---|---|---|
| 1 | `hero/hero-siege-apsud-facade.png` (siège jaune et vert) | **BIENVENUE SUR LE SITE DE L’ONG NATIONALE APSUD** (h3) |
| 2 | `hero/hero-formation-responsables-ong-partenaires.jpg` | Formation des responsables des ONGs partenaires au sein de l’ONG APSUD |
| 3 | `hero/hero-reunion-staff-innovation-numerique-faim.png` | Réunion du staff du projet innovation numérique contre la FAIM |

Aucun bouton d’action (CTA) dans le hero.

### Section « QUI SOMMES NOUS ? »

Texte de présentation (identique à À propos) + photo du staff légendée « STAFF APSUD ». Pas de lien « En savoir plus ».

### Section « PROJETS EN COURS »

- Innovation numérique contre la faim en RCA  Upscale AgriApps — « lire plus »
- Projet d’Appui au Renforcement de la Société Civile Centrafricaine (PARSOC) — « lire plus »

### Section « Nos partenaires & Bailleurs »

14 logos sans nom ni texte alternatif.

## 5. Projets

13 projets publiés (ordre du site, du plus récent au plus ancien identifiant). Statut issu du site (« Projet en cours » / « Projet réalisé »), cohérent avec les dates au 21/11/2026.

| Id | Titre court (proposé) | Statut | Période | Zone | Bailleur | Budget (source) |
|---|---|---|---|---|---|---|
| 20 | [Innovation numérique contre la faim (FINIYAKA)](#projet-20) | En cours | 2025-03-14 → 2026-12-31 | Bangui et ses environs, préfecture de la Lobaye, préfecture de la Kemo | BMZ | 159214£ |
| 19 | [Autonomisation des ONG nationales de femmes](#projet-19) | Réalisé | 2025-02-01 → 2026-03-31 | Boguila, Markounda | FH | 1.000.000 USD |
| 18 | [PARSOC — Appui au renforcement de la société civile centrafricaine](#projet-18) | En cours | 2025-01-01 → 2027-12-31 | Ouaka, Nana-Mamberé, Nana Gribizi, Bamingui-Bangoran, Basse-Kotto et Ouham-Pendé | Union Européenne (UE) | 1.700.000£/360.721,61£ |
| 15 | [Leadership humanitaire local et WASH à Rafaï](#projet-15) | Réalisé | 2023-11-15 → 2024-11-14 | Rafai | FH | 600 0OO USD |
| 14 | [Réponse d’urgence WASH à Boguila](#projet-14) | Réalisé | 2021-06-01 → 2022-03-31 | Préfecture de l’Ouham ( Nanga Boguila) | FH | 430,000 USD |
| 13 | [Moyens de subsistance et stabilisation à Maloum](#projet-13) | Réalisé | 2018-12-01 → 2019-07-31 | Préfecture de Ouaka (MALOUM) | FH | 250,000 USD |
| 11 | [Hygiène, assainissement et COVID-19 à Bangui et Bambari](#projet-11) | Réalisé | 2020-08-01 → 2021-01-31 | Bambari et Bangui | FH | 100 000 USD |
| 10 | [Réponse WASH et COVID-19 à Bambari, Batangafo et Bimbo](#projet-10) | Réalisé | 2020-06-01 → 2020-10-31 | Bambari, Batangafo et la ville de Bimbo | FH | 300 000 USD |
| 9 | [Assainissement des sites de déplacés de Bambari et Batangafo](#projet-9) | Réalisé | 2019-12-01 → 2020-05-31 | Bambari et Batangafo | FH | 200 000 USD |
| 8 | [Emplois temporaires et cohésion sociale à Bambari et Ippy](#projet-8) | Réalisé | 2019-07-01 → 2019-11-30 | Ippy | FH | 250 000 USD |
| 7 | [Réponse d’urgence WASH dans les quartiers de retour d’Ippy](#projet-7) | Réalisé | 2019-05-15 → 2019-11-14 | Ippy (Ouaka) | FH | 121 000 USD |
| 6 | [Accès d’urgence à l’eau et à l’assainissement à Ippy](#projet-6) | Réalisé | 2018-11-01 → 2019-03-30 | Ippy (Ouaka) | FH | 200 000 USD |
| 5 | [Résilience socio-économique face au COVID-19 (Bangui 3e)](#projet-5) | Réalisé | 2021-07-01 → 2022-03-31 | 3ème arrondissement de Bangui | Japon | 665 718 USD |

### Projet 20 — Innovation numérique contre la faim (FINIYAKA)

<a id="projet-20"></a>

**Titre officiel (source) :** Innovation numérique contre la faim en RCA Upscale AgriApps

| Champ | Valeur |
|---|---|
| Sigle | Upscale AgriApps |
| Code du projet | CAF 1041 |
| Statut | Projet en cours (source : site) |
| Dates | 2025-03-14 → 2026-12-31 |
| Zone (source) | Bangui et ses environs, préfecture de la Lobaye, préfecture de la Kemo |
| Lieux / préfectures | Bangui et ses environs — Bangui ; Lobaye ; Kémo ; Ngou Lekpa (village cité dans les légendes photo) |
| Domaines | Sécurité alimentaire et moyens de subsistance |
| Bailleur(s) | BMZ (Ministère fédéral allemand de la Coopération économique et du Développement (BMZ) — développement du sigle déduit) |
| Partenaire(s) de mise en œuvre | WHH (Welthungerhilfe) |
| Budget (source) | 159214£ — ⚠ Le symbole £ est très probablement une erreur de saisie pour € (financement allemand BMZ/WHH) : à confirmer. |
| Bénéficiaires (source) | Les agriculteurs ; Les éleveurs ; Les entreprises de transformation agricole ; Les groupements agricoles et multiplicateurs de semences |
| URL source | https://apsud.org/detail-projet/20/Innovation%20num%C3%A9rique%20contre%20la%20faim%20en%20RCA%20%20Upscale%20AgriApps |

**Résumé (rédigé, à valider) :** Projet d'innovation numérique contre la faim : développement et diffusion de l'application agricole FINIYAKA, qui facilite l'accès des producteurs à l'information, aux marchés et aux conseils techniques, à Bangui, dans la Lobaye et la Kémo.

#### Objectif général du projet

> Contribuer à l’éradication de la faim et de la malnutrition en améliorant la production alimentaire locale, l’accès aux ressources agricoles et la résilience des petits exploitants agricoles grâce à l’usage des technologies numériques adaptées

#### Objectifs spécifiques du projet

- Promouvoir l’innovation numérique pour faciliter l’accès à l’information, aux marchés et aux services agricoles et ainsi augmenter la productivité et la durabilité des systèmes alimentaires locaux
- Utiliser les plateformes numériques pour mutualiser les ressources, coordonnées les actions et améliorer la gestion des projets de lutte contre la faim dans les pays francophones

#### Résultats attendus du projet

- L’accès à l’information et aux services agricoles est amélioré grâce à l’adoption de l’application FINIYAKA
- Les systèmes alimentaires locaux sont renforcés par la réduction des intermédiaires et l’amélioration de la traçabilité qui garantit la qualité des produits
- Les ressources sont mutualisées grâce à la création d'un espace numérique de partage de données, de bonnes pratiques et d'expertises en matière d’agriculture et d’élevage

#### Activités réalisées

- Création de 06 contenus de 06 spéculations différentes et mis en ligne sur l’application FINIYAKA
- Lancement officiel de l’application FINIYAKA à Bangui en date du 07 Novembre 2025
- Inscription de plus de 244 utilisateurs sont l’application FINIYAKA en RCA
- Signature de deux accords de collaboration avec des entreprises de transformation agricole
- Deux contrats de collaborations ont été signé avec les entreprises SAGINCO Group et SMCAF autour de l’application FINIYAKA

#### Images

- `assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-lancement-finiyaka-01.jpg` — Photo de groupe lors du lancement officiel de l'application FINIYAKA à Bangui, le 7 novembre 2025 *(légende du site : « Lancement officiel de l'application FINIYAKA dans la salle de conférence BEA AFRICA le 7 Novembre 2025 »)*
- `assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-caravane-finiyaka-02.jpg` — Caravane de présentation de l'application FINIYAKA au grand public sur un camion podium, le 7 novembre 2025 *(légende du site : « Carnaval avec l'artiste Strong Berry pour la présentation de l'application au grand le 7 Novembre 2025 »)*
- `assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-productrice-03.jpg` — Un agent d'APSUD présente l'application FINIYAKA sur smartphone à une productrice agricole à Ngou Lekpa *(légende du site : « Présentation de l'application à une productrice agricole à Ngou Lekpa le 23 Avril 2026 »)*
- `assets/apsud/images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-producteurs-04.jpg` — Présentation de l'application FINIYAKA à des producteurs agricoles dans un champ à Ngou Lekpa *(légende du site : « Présentation de l'application à quelques producteurs performants à Ngou lekpa le 24 Avril 2026 »)*

### Projet 19 — Autonomisation des ONG nationales de femmes

<a id="projet-19"></a>

**Titre officiel (source) :** Autonomisation des organisations nationales de femmes à travers leur renforcement et la promotion du leadership humanitaire local féminin)

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH33207 |
| Statut | Projet réalisé (source : site) |
| Dates | 2025-02-01 → 2026-03-31 |
| Zone (source) | Boguila, Markounda |
| Lieux / préfectures | Boguila — Ouham (déduit) ; Markounda — Ouham (déduit) |
| Domaines | Protection/Genre ; WASH ; Renforcement de capacités / localisation |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA, fonds commun géré par OCHA) — développement du sigle déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| ONG bénéficiaires | ARFAD, FEVA, FSFD, JFDDH, AM, AVN |
| Budget (source) | 1.000.000 USD |
| Bénéficiaires (source) | 06 ONG nationales dirigées par les femmes (ARFAD, FEVA, FSFD, JFDDH, AM et AVN) ; 8.000 personnes à Boguila et Markounda |
| URL source | https://apsud.org/detail-projet/19/Autonomisation%20des%20organisations%20nationales%20de%20femmes%20%C3%A0%20travers%20leur%20renforcement%20et%20la%20promotion%20du%20leadership%20humanitaire%20local%20f%C3%A9minin%29 |

**Résumé (rédigé, à valider) :** Renforcement de six ONG nationales dirigées par des femmes pour qu'elles deviennent autonomes, éligibles au Fonds Humanitaire et capables de piloter une réponse humanitaire, combiné à une réponse WASH (eau, assainissement, hygiène) pour 8 000 personnes à Boguila et Markounda.

#### Objectif général du projet

> Contribuer à rendre autonomes les organisations nationales de femmes afin qu’elles soient fiables et éligibles au Fonds Humanitaire, capables de concevoir et mettre en œuvre des projets humanitaires et de participer aux structures de coordination nationales

#### Objectifs spécifiques du projet

- Renforcer les capacités des ONG nationales de femmes et dirigées par les femmes dans tous les secteurs d’une vie associative, leur donner des moyens techniques afin qu’elles aient des compétences suffisantes et qu’elles soient capables de prendre le lead d’une réponse humanitaire tout en participant aux mécanismes de coordination et de prise de décision
- Améliorer l’accès inclusif, adapté et équitable aux infrastructures d’eau potable, aux infrastructures d’assainissement et aux programmes de changement de comportement en faveur de bonnes pratiques d’hygiène à Markounda et à Boguila

#### Résultats attendus du projet

- Les organisations nationales de femmes ont acquis des capacités et possibilités équitables d’assumer des rôles de leadership humanitaire, de mener une bonne gouvernance associative, de mobiliser les ressources et les gérer rationnellement pour une réponse humanitaire
- 8 000 personnes (femmes, hommes, filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité et quantité suffisante dans la sous-préfecture de Markounda et Boguila
- 8 000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré à l’assainissement dans Markounda et Boguila couvrant aussi les besoins des retournés
- 20 000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en pratique d’hygiène et sont sensibilisés à la construction de latrines familiales
- La redevabilité envers les bénéficiaires est assurée ainsi que la lutte contre les exploitations et abus sexuels

#### Activités réalisées

- Evaluation de capacités des ONG nationales de femmes ciblées par la Chargée de Partenariat et de localisation
- Elaboration et validation d’un plan de renforcement de capacités pour chaque ONG évaluée
- Appui dans l’élaboration, la validation et l’appropriation des politiques et manuels de procédures pour garantir une bonne gouvernance et un contrôle interne efficace
- Organisation des ateliers de formation en salle des responsables des départements des ONG bénéficiaires en fonction du plan de renforcement de capacités
- Coaching des ONG partenaires sous forme de stage au sein du bureau d’APSUD
- Suivi de la réalisation des activités par les ONG nationales de femmes
- Atelier de capitalisation et de partage d’expériences entre les ONG bénéficiaires et APSUD
- Evaluation à mi-parcours de la stratégie de renforcement de capacités
- Auto évaluation de chaque organisation de femmes soutenue
- Réhabilitation de 16 points d'eau à Markounda et Boguila
- Mise en place/redynamisation et équipement en kits de rechange de pièces de PMH (Pompe à Motricité Humaine) aux 16 Comités de Gestion des Points d’Eau (CGPE) dans les villages bénéficiaires pour s’assurer de l’entretien des pompes et continuer la sensibilisation même après le projet (activité réalisée par les 06 ONG bénéficiaires
- Formation des artisans réparateurs et leur dotation en kits de rechange et caisse à outils
- Remise des points d'eau réhabilités aux autorités locales en présence des leaders communautaires
- Appui à la construction de 1200 latrines familiales par la stratégie de la participation communautaire en utilisant les matériaux locaux (Activité réalisée par les 6 ONG bénéficiaires)
- Aménagement de 06 décharges de transit (Activité réalisée par les 6 ONG bénéficiaires)
- Construction d’une fosse à ordures sécurisée à Markounda et une autre à Boguila
- Distribution des bacs à ordures de 100 litres chacun (Activité réalisée par les 6 ONG bénéficiaires)
- Dotation en kits de collecte secondaire de déchets solides aux 06 comités locaux d'assainissements mis en place et formés
- Dotation des mairies de Markounda et de Boguila en motos 03 roues pour faciliter l’évacuation des déchets
- Evacuation des déchets
- Construction de 8 blocs de 2 latrines durables
- Promotion à l'hygiène (séances de sensibilisation)
- Distribution des kits d'hygiène incluant des items d'hygiène intimes spécifique pour les femmes et jeunes filles accompagnée de la sensibilisation aux bonnes pratiques d’hygiène pendant les distributions dans les communautés (activité réalisée par les 6 ONG bénéficiaires)
- Réalisation d’enquête CAP initiale, finale et d’un PDM après la distribution des kits (activité réalisée par les 6 ONG bénéficiaires)
- Formation de 24 relais communautaires dont 50% sont les femmes
- Distribution de kits d'hygiène intime aux filles à l'âge de procréer et aux femmes ayant subi un choc dans les zones du projet
- Séances de sensibilisation (masse, focus-group par sexe) des membres des communautés d’intervention sur les principes clés interdisant l’EAS et les mécanismes de signalement mis en place conformes à leur choix à Markounda et Boguila
- Tenue des réunions mensuelles de suivi-évaluation redevabilité et apprentissage
- Main streaming protection autour des thématiques liées à l’accès à l’eau l’hygiène et l’assainissement
- Séances d’information auprès des bénéficiaires et fournisseurs sur le code de conduite d’APSUD, les procédures de signalement des cas de PSEA, les mécanismes de plainte
- Formation du personnel de terrain sur les principes humanitaires, les actions de luttes contre les abus et exploitation sexuels, la fraude et la corruption

#### Images

- `assets/apsud/images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-coaching-ong-femmes-01.jpg` — Une responsable de l'ONG FEVA en stage de coaching au bureau d'APSUD
- `assets/apsud/images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-atelier-formation-responsables-02.jpg` — Atelier de formation des responsables des ONG nationales de femmes sous la banderole du projet APSUD 33207
- `assets/apsud/images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-visite-point-eau-03.jpg` — Équipe d'APSUD et partenaires lors d'une visite de chantier de point d'eau
- `assets/apsud/images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-evacuation-dechets-04.jpg` — Chargement de déchets dans un camion-benne siglé APSUD par des agents d'assainissement

### Projet 18 — PARSOC — Appui au renforcement de la société civile centrafricaine

<a id="projet-18"></a>

**Titre officiel (source) :** Projet d’Appui au Renforcement de la Société Civile Centrafricaine (PARSOC)

| Champ | Valeur |
|---|---|
| Sigle | PARSOC |
| Code du projet | CAF 1068 |
| Statut | Projet en cours (source : site) |
| Dates | 2025-01-01 → 2027-12-31 |
| Zone (source) | Ouaka, Nana-Mamberé, Nana Gribizi, Bamingui-Bangoran, Basse-Kotto et Ouham-Pendé |
| Lieux / préfectures | Ouaka ; Nana-Mambéré ; Nana-Gribizi ; Bamingui-Bangoran ; Basse-Kotto ; Ouham-Pendé ; Antennes MdS : Bouar, Bambari, Kaga-Bandoro |
| Domaines | Protection (droits humains, cohésion sociale, genre) ; Renforcement de la société civile |
| Bailleur(s) | Union Européenne (UE) (Union européenne) |
| Partenaire(s) de mise en œuvre | Deutsche Welthungerhilfe e.V. (WHH) |
| Budget (source) | 1.700.000£/360.721,61£ — ⚠ Deux montants : 1 700 000 (budget global probable du projet) / 360 721,61 (part probable d'APSUD) — interprétation déduite ; le symbole £ est probablement une erreur pour €. À confirmer. |
| Bénéficiaires (source) | 200 organisations de la société civile centrafricaine pour des formations et renforcement de capacités ; 25 OSC porteuses de changement sociale ; La Maison des Services (MdS) |
| URL source | https://apsud.org/detail-projet/18/Projet%20d%E2%80%99Appui%20au%20Renforcement%20de%20la%20Soci%C3%A9t%C3%A9%20Civile%20Centrafricaine%20%28PARSOC%29 |

**Résumé (rédigé, à valider) :** Projet financé par l'Union européenne et mis en œuvre avec Welthungerhilfe pour renforcer 200 organisations de la société civile dans six préfectures, en tant qu'actrices du changement social (droits humains, cohésion sociale, genre), avec l'implantation d'antennes régionales de la Maison des Services.

#### Objectif général du projet

> Contribuer au renforcement de la société civile locale centrafricaine en tant qu‘acteur de changement social dans les domaines des droits humains, de la cohésion sociale et du genre

#### Objectifs spécifiques du projet

- Les capacités organisationnelles, techniques et d‘influence des OSC locales sont renforcées dans les six (6) préfectures ciblées

#### Résultats attendus du projet

- Les OSC locales ciblées sont dynamiques et opérationnelles dans un environnement fragile (habilité/capacité)
- Les OSC dans les zones d’intervention renforcent leur synergie d’action et leur réseautage pour constituer des groupes d’influence (mise en réseau)
- Les OSC dans les zones d’intervention disposent des structures, des ressources et des espaces nécessaires pour initier et déclencher l’action de changement social et d’engagement citoyen (mobilisation sociale)

#### Activités réalisées

- L’installation et l’équipement des antennes régionales de la Maison des Services (MdS) à Bouar, Bambari et Kaga-Bandoro
- Le ciblage des 200 OSC dans les 06 préfectures du projet
- La réhabilitation et la remise officielle des bâtiments de APSUD à la MdS (à Bambari en date du 22 Décembre 2025 et à Kaga-Bandoro le 22 Janvier 2026
- La remise officielle des équipements informatiques et électroniques restants au bureau exécutif de la MdS à Bangui en date du 06 Mars 2026

#### Images

- `assets/apsud/images/projets/parsoc/projet-parsoc-lancement-officiel-bangui-01.jpg` — Photo officielle du lancement du projet PARSOC à Bangui, salle de conférence de la CNSS, 26 août 2025 *(légende du site : « Lancement officiel du projet PARSOC sous le patronage du ministère de l’Economie, du Plan et de la coopération à Bangui le 26 Aout 2025 dans la salle de conférence de la CNSS »)*
- `assets/apsud/images/projets/parsoc/projet-parsoc-lancement-regional-bambari-02.jpg` — Participants au lancement régional du projet PARSOC à Bambari, 14 janvier 2026 *(légende du site : « Lancement régional du projet PARSOC sous la supervision des autorités locales, des structures déconcentrées de l’Etat, les organisations locales de la société civile dans la préfecture de la OUAKA(BAMBARI) le 14 Janvier 2026 »)*
- `assets/apsud/images/projets/parsoc/projet-parsoc-visite-autorites-kaga-bandoro-03.jpg` — Rencontre d'échange avec les autorités locales de la Nana-Gribizi à Kaga-Bandoro, 24 février 2026 *(légende du site : « Visite d’échange et de présentation des activités du projet aux autorités locale de la préfecture de la NANA-GRIBIZI le 24 Février 2026 à KAGA-BANDORO »)*
- `assets/apsud/images/projets/parsoc/projet-parsoc-remise-equipements-mds-04.jpg` — Remise officielle d'équipements informatiques aux responsables de la Maison des Services à Bangui, 6 mars 2026 *(légende du site : « Cérémonie de la remise officielle des équipements informatiques et électroniques aux responsables de la MdS dans le cadre de l'implantation des des antennes de la MdS dans les préfectures de la Ouaka, Nana Gribizi et Nana Mambéré à Bangui le 6 Mars 2026 »)*

### Projet 15 — Leadership humanitaire local et WASH à Rafaï

<a id="projet-15"></a>

**Titre officiel (source) :** Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse efficace et rapide aux besoins critiques en WASH a RAFAÏ

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | CBPF-CAR-23-S-NGO-26265 |
| Statut | Projet réalisé (source : site) |
| Dates | 2023-11-15 → 2024-11-14 |
| Zone (source) | Rafai |
| Lieux / préfectures | Rafaï — Mbomou (déduit ; la préfecture est visible sur les gilets du projet en photo) |
| Domaines | WASH ; Renforcement de capacités / localisation |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | AU SECOURS, LNPDD, OFAHRD |
| Budget (source) | 600 0OO USD — ⚠ Le texte source contient deux lettres « O » au lieu de zéros. |
| Bénéficiaires (source) | AU SECOURS, LNPDD, OFAHRD — ⚠ Le champ « Bénéficiaires » liste les ONG partenaires ; les résultats attendus citent 7 500 personnes (eau), 5 400 (assainissement) et 24 272 (hygiène). |
| URL source | https://apsud.org/detail-projet/15/Leadership%20Humanitaire%20local%20pour%20renforcer%20la%20localisation%20de%20l%E2%80%99aide%20et%20une%20r%C3%A9ponse%20efficace%20et%20rapide%20aux%20besoins%20critiques%20en%20WASH%20a%20RAFA%C3%8F |

**Résumé (rédigé, à valider) :** Projet de localisation de l'aide : APSUD accompagne trois ONG nationales (AU SECOURS, LNPDD, OFAHRD) dans leur renforcement institutionnel tout en réalisant avec elles des activités WASH prioritaires à Rafaï.

#### Objectif général du projet

> contribuer aux renforcements de capacités des ONGs Nationales pour qu’elles soient autonomes fiables et éligibles aux FH ;qu’elles soient aussi en mesure de concevoir et mettre en œuvre des projets humanitaires et participer aux structures de coordination à travers des formations théoriques et la réalisation des activités prioritaires du HRP en WASH dans la sous-préfectures de Rafaï présentant des besoins urgents

#### Objectifs spécifiques du projet

- Renforcer les capacités des ONGs nationales ciblées dans tous les secteurs d’une vie associative, leur donner des moyens techniques afin qu’elles aient des compétences suffisantes et qu’elles soient capable de prendre le lead d’une réponse humanitaire tout en participant aux mécanismes de coordination et de prise de décision
- Améliorer l’accès à l’eau potable et à l’assainissement des populations par la réhabilitation des systèmes d’approvisionnement en eau ainsi que d’infrastructures d’assainissement, la promotion des pratiques d’hygiène et le renforcement des systèmes de gestion des infrastructures Wash pour répondre aux besoins urgents à Rafaï

#### Résultats attendus du projet

- Les acteurs nationaux et locaux ont acquis des capacités et possibilités équitable d’assumer des rôles de leadership humanitaire, de mener une bonne gouvernance associative, de mobiliser les ressources et les gérer rationnellement pour une réponse humanitaire
- 7500 personnes (Hommes, Femmes, Filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité et quantité suffisante dans la sous-préfecture de RAFAÏ
- 5400 personnes (Femmes, Hommes, Filles et garçons) ont un accès amélioré à l’assainissement dans la zone de RAFAÏ couvrant aussi les besoins des IDP.
- 24272 personnes (Hommes, Femmes, Filles et Garçons) comprennent et mettent en pratique les connaissances acquises en pratique d’hygiène et sont sensibilisées à la construction des latrines familiales.

#### Activités réalisées

- Evaluation des capacités des ONGs nationales ciblées par la chargée de partenariat et de localisation
- Elaboration d’un plan de renforcement de capacités pour chaque ONG évaluée
- Appui dans l’élaboration, la validation et l’appropriation des politiques et manuels de procédures pour garantir une bonne gouvernance et un contrôle interne efficace.
- Série de formations en salle des responsables des ONGs nationales en fonction du plan de renforcement de capacités
- Coaching des ONGs partenaires sous forme du stage au sein des locaux d’APSUD
- Suivie de la réalisation des activités des ONGs partenaires
- Partages d’expérience, capitalisation et évaluation à mi-parcours de la stratégie de renforcement de capacités

#### Images

- `assets/apsud/images/projets/leadership-humanitaire-wash-rafai/projet-rafai-formation-ong-partenaires-01.jpg` — Formation en salle des responsables des ONG partenaires du projet à Rafaï *(légende du site : « Formation en salle des responsables des ONGs partenaire en programme »)*
- `assets/apsud/images/projets/leadership-humanitaire-wash-rafai/projet-rafai-travaux-terrain-02.jpg` — Équipes d'APSUD et d'ONG partenaires lors de travaux WASH sur le terrain à Rafaï
- `assets/apsud/images/projets/leadership-humanitaire-wash-rafai/projet-rafai-coaching-bureau-03.jpg` — Séance de travail sur ordinateur entre agents d'APSUD et d'ONG partenaires du projet de leadership humanitaire local

### Projet 14 — Réponse d’urgence WASH à Boguila

<a id="projet-14"></a>

**Titre officiel (source) :** Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vulnérables affectées par les crises à Boguila et ses environs dans la préfecture de l'Ouham

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 19072 |
| Statut | Projet réalisé (source : site) |
| Dates | 2021-06-01 → 2022-03-31 |
| Zone (source) | Préfecture de l’Ouham ( Nanga Boguila) |
| Lieux / préfectures | Boguila (Nanga Boguila) — Ouham |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | Bailleur : 250,000 USD / Partenaire de mise en oeuvre : FH / Budget : 430,000 USD — ⚠ Champs décalés sur le site : le montant 250 000 USD est saisi dans « Bailleur » et « FH » dans « Partenaire ». Budget réel à confirmer (430 000 ou 250 000 USD). |
| Bénéficiaires (source) | 29005 personnes dont 18250 retournés et 10755 populations hautes |
| URL source | https://apsud.org/detail-projet/14/R%C3%A9ponse%20d%27urgence%20en%20eau,%20hygi%C3%A8ne%20et%20assainissement%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20affect%C3%A9es%20par%20les%20crises%20%C3%A0%20Boguila%20et%20ses%20environs%20dans%20la%20pr%C3%A9fecture%20de%20l%27Ouham |

**Résumé (rédigé, à valider) :** Réponse d'urgence en eau, hygiène et assainissement pour les populations retournées, déplacées et hôtes de Boguila : réhabilitation de points d'eau, latrines familiales et publiques, gestion des déchets et prévention du COVID-19.

#### Objectif général du projet

*(vide sur le site)*

#### Objectifs spécifiques du projet

- Promouvoir les moyens de maintenir et l'accès de manière sécurisée aux services WASH aux communautés vulnérables, retournées et déplacées/relocalisées dans les familles d’accueil et populations hautes dans la zone de Boguila

#### Résultats attendus du projet

- R1. 3000 personnes (femmes, hommes, filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité et quantité suffisante dans la commune Boguila
- 3000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré à l’assainissement dans Boguila couvrant aussi les besoins des nouveaux venus
- 30000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en pratiques d’hygiène et sont sensibilisés à la construction de latrines familiales ainsi qu'aux mesures barrières au COVID 19

#### Activités réalisées

- Réhabilitation des six points d'eau à Boguila.
- Mise en place et renforcement d'au moins six comités de gestion du point d'eau (CGPE) pour s’assurer de l’entretien des pompes et continuer la sensibilisation même après le projet.
- Formation des artisans réparateurs et leur dotation en kits de rechange.
- Identification des bénéficiaires de latrines familiales à Boguila
- Appui à la construction de 500 latrines familiales par la stratégie de la participation communautaire en utilisant les matériaux locaux.
- Distribution des bacs à ordures dans la localité, plus précisément dans les FOSA, les écoles et devant les magasins et autres endroits publics.
- Construction des latrines publique et leurs équipements en dispositifs de lavage de mains (écoles, FOSA, marché).
- Dotation en kits de collecte secondaires de déchets solides aux comités locaux d'assainissements qui sont mis en place et renforcés.
- Construction d’une (01) fosse à ordures sécurisée à Boguila sur l’axe Paoua. Ce travail se fera en utilisant la main d’œuvre recrutée localement.
- Promotion à l'hygiène.
- Distribution de kits d'hygiène incluant des items d'hygiène intimes spécifique pour les femmes et jeunes filles accompagnée de la sensibilisation aux bonnes pratiques d’hygiène pendant les distributions dans les communautés. ampagnes d'affichage sur les gestes barrières au COVID 19 et les autres thèmes d'hygiène très négligés dans la localité.
- Installation des dispositifs de lavages de mains dans les lieux publics pour lutter contre la propagation du COVID 19

#### Images

- `assets/apsud/images/projets/urgence-wash-boguila/projet-boguila-distribution-kits-hygiene-01.jpg` — Distribution de kits d'hygiène (seaux et bidons) aux ménages de Boguila
- `assets/apsud/images/projets/urgence-wash-boguila/projet-boguila-point-eau-rehabilite-02.jpg` — Point d'eau réhabilité par APSUD à Boguila dans le cadre du projet FH 19072
- `assets/apsud/images/projets/urgence-wash-boguila/projet-boguila-formation-artisans-reparateurs-03.jpg` — Formation des artisans réparateurs et des comités de gestion des points d'eau à Boguila, avec leurs caisses à outils
- `assets/apsud/images/projets/urgence-wash-boguila/projet-boguila-latrine-familiale-04.jpg` — Latrine familiale construite avec l'appui du projet à Boguila

### Projet 13 — Moyens de subsistance et stabilisation à Maloum

<a id="projet-13"></a>

**Titre officiel (source) :** Accès urgent à des opportunités économiques et des moyens de subsistance aux personnes touchées par la crise pour la stabilisation des communautés affectées par le conflit à Maloum.

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 10582 |
| Statut | Projet réalisé (source : site) |
| Dates | 2018-12-01 → 2019-07-31 |
| Zone (source) | Préfecture de Ouaka (MALOUM) |
| Lieux / préfectures | Maloum — Ouaka |
| Domaines | Sécurité alimentaire, moyens de subsistance et stabilisation communautaire |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 250,000 USD |
| Bénéficiaires (source) | 29005 personnes dont 18250 retournés et 10755 populations hautes — ⚠ Texte identique à celui du projet Boguila (id 14) — probable copier-coller erroné : chiffre à faire confirmer par APSUD. |
| URL source | https://apsud.org/detail-projet/13/Acc%C3%A8s%20urgent%20%C3%A0%20des%20opportunit%C3%A9s%20%C3%A9conomiques%20et%20des%20moyens%20de%20subsistance%20aux%20%20personnes%20touch%C3%A9es%20par%20la%20crise%20pour%20la%20stabilisation%20des%20communaut%C3%A9s%20affect%C3%A9es%20par%20le%20conflit%20%C3%A0%20Maloum. |

**Résumé (rédigé, à valider) :** Emplois temporaires (THIMO), relance d'activités génératrices de revenus et renforcement de la cohésion sociale pour stabiliser les communautés affectées par le conflit à Maloum.

#### Objectif général du projet

*(vide sur le site)*

#### Objectifs spécifiques du projet

- Améliorer les conditions de vie des personnes vulnérables à Maloum en leur offrant un emploi temporaire, en appuyant leur relèvement socioéconomique et en renforçant la cohésion sociale

#### Résultats attendus du projet

- Trois infrastructures socio-économiques et sociocommunautaires sont réhabilitées à travers les THIMO et ainsi 625 travaux temporaires créés
- Au moins 30 microprojets d’AGR formulés, approuvés et appuyés par le projet sont opérationnels et rentables
- Les mécanismes et structures de prévention et de gestion de conflits locaux sont renforcés et opérationnels

#### Activités réalisées

- Exécution des travaux HIMO
- Distribution des kits d'AGR d'urgence
- Focus group/dialogue intercommunautaire sur les thématiques de la cohésion sociale, la prévention et résolution de conflits suite aux audits et entretiens.
- Renforcement de capacités des autorités locales, des leaders des femmes, des leaders des jeunes et d’autres organisations à assise communautaire sur la gestion et la mitigation des conflits, le leadership pour la paix et la consolidation de la cohésion sociale cohésion sociale, la prévention et résolution de conflits suite aux audits et entretiens.
- Appui dans la légalisation des structures appuyées.

#### Images

- `assets/apsud/images/projets/moyens-subsistance-maloum/projet-maloum-distribution-kits-agr-01.jpg` — Distribution de kits d'activités génératrices de revenus devant la base d'APSUD à Maloum
- `assets/apsud/images/projets/moyens-subsistance-maloum/projet-maloum-travaux-himo-02.jpg` — Travaux à haute intensité de main-d'œuvre (THIMO) de réhabilitation d'une piste à Maloum
- `assets/apsud/images/projets/moyens-subsistance-maloum/projet-maloum-travailleurs-thimo-03.jpg` — Travailleurs THIMO en gilets de sécurité rassemblés à Maloum
- `assets/apsud/images/projets/moyens-subsistance-maloum/projet-maloum-dotation-outils-04.jpg` — Brouettes et outils remis aux travailleurs THIMO à Maloum

### Projet 11 — Hygiène, assainissement et COVID-19 à Bangui et Bambari

<a id="projet-11"></a>

**Titre officiel (source) :** Projet d’urgence en hygiène et assainissement à Bangui et Bambari en faveur des personnes les plus vulnérables pour répondre aux besoins humanitaires les plus critiques et freiner la propagation du COVID 19.

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | COVID JAPON |
| Statut | Projet réalisé (source : site) |
| Dates | 2020-08-01 → 2021-01-31 |
| Zone (source) | Bambari et Bangui |
| Lieux / préfectures | Bambari (sites de déplacés) — Ouaka ; Bangui (site de déplacés) et Bimbo — Bangui / Ombella-M’Poko |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 100 000 USD — ⚠ Le code projet « COVID JAPON » suggère un financement japonais (via le FH ?) : à confirmer. |
| Bénéficiaires (source) | 50 000 personnes déplacés internes dont 7800 hommes, 20850 femmes, 9150 garçons et 12200 filles |
| URL source | https://apsud.org/detail-projet/11/Projet%20d%E2%80%99urgence%20en%20hygi%C3%A8ne%20et%20assainissement%20%C3%A0%20Bangui%20et%20Bambari%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20pour%20r%C3%A9pondre%20aux%20besoins%20humanitaires%20les%20plus%20critiques%20et%20freiner%20la%20propagation%20du%20COVID%2019. |

**Résumé (rédigé, à valider) :** Projet d'urgence en hygiène et assainissement sur les sites de déplacés de Bambari, Bangui et Bimbo pour répondre aux besoins critiques et freiner la propagation du COVID-19.

#### Objectif général du projet

*(vide sur le site)*

#### Objectifs spécifiques du projet

- Promouvoir les moyens d’accès et de maintenir de manière sécurisée les services d’assainissement et d’hygiène aux communautés vulnérables, déplacés internes sur les sites IDP de Bambari, les sites IDP de Bangui et ses environs

#### Résultats attendus du projet

- 50000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré aux infrastructures d’assainissement appropriées de façon digne et sécurisée dans le respect des normes du projet SPHERE sur les sites des déplacés de Bambari, le site IDP de Bangui et ses environs
- 50 000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en terme d’hygiène et sont sensibilisés à l’entretien et la bonne utilisation des ouvrages WASH installés ainsi qu'au COVID 19 à Bambari (sites IDP), Bangui (site IDP) et Bimbo (IDP)

#### Activités réalisées

- Vidange des latrines sur les sites IDP: au moins 150 latrines remplies dont 100 à Bambari et 50 à Bangui et Bimbo
- Rehabilitation de 30 cabines de latrines d'urgences par bloc différenciés hommes / femmes et enfants existantes dont 15 à Bambari et 15 à
- Bangui et Bimbo et leur équipements en dispositifs de lavage de mains.
- Collecte secondaire des déchets solides au niveau des sites IDP de Bambari, Bangui et Bimbo.
- Distribution de kits de collecte primaire des déchets et construction de 100 bacs à ordures dont 60 sur les sites IDP de Bambari, 40 sur les sites IDP de Bangui et Bimbo.
- Collecte de données sur les infrastructures WASH et leur état sur les sites IDP. Cette collecte sef fera par l'équipe du projet, assisté par l'équipe de suivi-évaluation.
- Réalisation de campagnes de sensibilisation à travers la mise en place/redynamisation et la formation de clubs d'hygiène au sein des différentes sites.
- Sensibilisation des communautés à travers les campagnes d’affichage et la distribution des dépliants sur le COVID 19.

#### Images

- `assets/apsud/images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-bac-ordures-site-pdi-01.jpg` — Bac à ordures siglé APSUD sur un site de personnes déplacées internes
- `assets/apsud/images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-vidange-latrines-02.jpg` — Camion vidangeur utilisé pour la vidange des latrines sur les sites de déplacés
- `assets/apsud/images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-latrines-urgence-03.jpg` — Cabines de latrines d'urgence installées par APSUD sur un site de déplacés
- `assets/apsud/images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-affichage-sensibilisation-04.jpg` — Affichage de messages de sensibilisation sur l'hygiène et le COVID-19

### Projet 10 — Réponse WASH et COVID-19 à Bambari, Batangafo et Bimbo

<a id="projet-10"></a>

**Titre officiel (source) :** Réponse urgente en Eau, Hygiène et Assainissement pour sauver des vies et lutter contre la propagation du COVID 19 dans les sites des personnes déplacés internes de Bambari; de Batangafo et dans la ville de Bimbo

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | CAR-20/HCF10/RA2/WaSH/NGO/15898 |
| Statut | Projet réalisé (source : site) |
| Dates | 2020-06-01 → 2020-10-31 |
| Zone (source) | Bambari, Batangafo et la ville de Bimbo |
| Lieux / préfectures | Bambari (6 sites de déplacés) — Ouaka ; Batangafo (site de déplacés) — Ouham (déduit) ; Bimbo (FOSA et marchés) — Ombella-M’Poko |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 300 000 USD |
| Bénéficiaires (source) | 65165 personnes dont 11000 hommes, 31000 femmes, 9150 garçons et 14015 filles. On trouve 574 personnes vivant avec handicap parmi les bénéficiaires |
| URL source | https://apsud.org/detail-projet/10/R%C3%A9ponse%20urgente%20en%20Eau,%20Hygi%C3%A8ne%20et%20Assainissement%20pour%20sauver%20des%20vies%20et%20lutter%20contre%20la%20propagation%20du%20COVID%2019%20dans%20les%20sites%20des%20personnes%20d%C3%A9plac%C3%A9s%20internes%20de%20Bambari;%20de%20Batangafo%20et%20dans%20la%20ville%20de%20Bimbo |

**Résumé (rédigé, à valider) :** Réponse urgente en eau, hygiène et assainissement pour sauver des vies et lutter contre le COVID-19 sur les sites de déplacés de Bambari et Batangafo et dans les centres de santé et marchés de Bimbo.

#### Objectif général du projet

*(vide sur le site)*

#### Objectifs spécifiques du projet

- Promouvoir les moyens d’accès et de maintenir de manière sécurisée les services WASH aux communautés vulnérables, déplacés internes sur les sites IDP de Bambari, les sites IDP de Batangafo et aux population de Bimbo plus précisement dans les FOSA et les marchés public

#### Résultats attendus du projet

- 60000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré aux infrastructures d’assainissement appropriées de façondigne et sécurisée dans le respect des normes du projet SPHERE sur les 6 sites des déplacés de Bambari, le site IDP de Batangafo ainsi10 FOSA de Bimbo et 4 marchés publics
- 60 000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en terme d’hygiène et sont sensibilisés à l’entretien et la bonne utilisation des ouvrages WASH installés ainsi qu'au COVID 19 à Bambari (sites IDP), Batangafo (site IDP) et Bimbo (FOSA, Marchés)
- 4000 personnes (femmes, hommes, filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité et quantité suffisante dans les sitesIDP Bambari en coordination avec l'ONG TGH

#### Activités réalisées

- Vidange de 226 latrines d’urgence sur les sites des personnes déplacées internes dont 100 à Batangafo, 97 à Bambari et 29 à Bangui/Bimbo
- Rehabilitation de 80 cabines de latrines d'urgences par bloc différenciés hommes / femmes et enfants existantes dont 60 à Bambari et 20 à Batangafo et leur équipements en dispositifs de lavage de mains.
- Collecte secondaire des déchets solides au niveau des sites IDP de Bambari, Batangafo et Bimbo ainsi que dans les FOSA
- Démolition & Remblai de fosse de latrines pleines en non vidangeables.
- Distribution de kits de collecte primaire des déchets et construction de 200 bacs à ordures dont 100 sur ls sites IDP de Bambari, 50 sur le sit IDP de Bangafo et 50 autres dans les FOSA et marchés de Bimbo et le suivi de leur utilisation
- Distribution de kits d'hygiène aux 1000 ménages incluant des items d'hygiène intimes spécifique pour les femmes et filles et sensibilisations aux bonnes pratiques d’hygiène pendant les distributions.
- Réalisation de campagnes de sensibilisation à travers la mise en place et la formation de clubs d'hygiène au sein des différentes sites et Emission radio ainsi que le spot publicitaire sur le nouveau coron virus
- Mainstreaming protection autour des thématiques liées à l’accès à l’eau l’hygiène et l’assainissement.
- Réalisation de 2 enquêtes spot auprès des bénéficiaires par site permettant de faire une baseline et une endline, ainsi qu’un PDM après la distribution des kits d’hygiène.
- Sensibilisation des communautés à travers les campagnes d’affichage et la distribution des dépliants sur le COVID 19 et Mise en place du comité par quartier et appui dans l’élaboration des plans d’action communautaire pour lutter contre la propagation de COVID 19
- Réhabilitation d'1 forage autour du site IDP d'Alternatif à Bambari.
- Gestion de points de distribution d'eau.
- Rédynamisation des comités de gestion de point d'eau.

#### Images

- `assets/apsud/images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-latrines-urgence-visite-01.jpg` — Visite de latrines d'urgence installées par APSUD sur un site de déplacés au bord du fleuve
- `assets/apsud/images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-distribution-kits-hygiene-02.jpg` — Kits d'hygiène COVID-19 (dispositifs de lavage des mains, brouettes, seaux) prêts à être distribués, projet APSUD 15898
- `assets/apsud/images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-dechargement-futs-eau-03.jpg` — Déchargement de fûts et de matériel WASH d'un camion par les agents d'APSUD
- `assets/apsud/images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-lavage-mains-marche-04.jpg` — Démonstration du lavage des mains à un dispositif installé sur un marché

### Projet 9 — Assainissement des sites de déplacés de Bambari et Batangafo

<a id="projet-9"></a>

**Titre officiel (source) :** Projet d'urgence d'assainissement des sites des personnes déplacées internes de Bambari et Batangafo

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 14342 |
| Statut | Projet réalisé (source : site) |
| Dates | 2019-12-01 → 2020-05-31 |
| Zone (source) | Bambari et Batangafo |
| Lieux / préfectures | Bambari — Ouaka ; Batangafo — Ouham (déduit) |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 200 000 USD |
| Bénéficiaires (source) | 67 000 personnes dont 15 000 hommes, 23000 femmes, 11000 garçons et 18000 filles |
| URL source | https://apsud.org/detail-projet/9/Projet%20d%27urgence%20d%27assainissement%20des%20sites%20des%20personnes%20d%C3%A9plac%C3%A9es%20internes%20de%20Bambari%20et%20Batangafo |

**Résumé (rédigé, à valider) :** Projet d'urgence d'assainissement sur six sites de personnes déplacées à Bambari et Batangafo : latrines, gestion des déchets, vidange et clubs d'hygiène pour prévenir les maladies diarrhéiques et les épidémies.

#### Objectif général du projet

> Contribuer à l'assainissement et lutter contre les maladies diarrhéïques et les risques d'épidémie des PDIs sur six sites IDP de Bambari et de Batangafo

#### Objectifs spécifiques du projet

- Contribuer de manière urgente à améliorer l ’accès à l ’assainissement et à l ’hygiène dans les sites des personnes déplacées internes de Bambari et de Batangafo en faveur des filles, garçons, femmes et hommes vulnérables parmi les IDP.

*Suite du texte source (approche d’intervention) :*

> Dans le site des PDIs, les activités suivantes seront menées: Evacuation des dechets primaires: Les interventions seront basées (a) Assurer un environnement propre et sécurisé à travers la mise en place des bacs à ordures et du systeme de collectes des ordures vers la decharges de transit situé en dehors du site (b) la gestion des excretas: Les intervention seront basées sur la construction des latrines semi-durables vidangeable afin de diminuer la defecation à l'air libre. Evacuation secondaire des dechets liques et solides: les interventions seront centrées sur le (a) le vidange des latrines et (b) le transport des ordures des sites de transits vers la decharge finale.

#### Résultats attendus du projet

- L'accès à un environnement sanitaire sécurisé et aux bonnes pratiques d'hygiène est amélioré pour les PDIs des sites de Bambari et Batangafo
- Les bonnes pratiques d'hygiène sont améliorées pour les PDIs des sites de Bambari et Batangafo ainsi que leurs conditions sanitaires

#### Activités réalisées

- Construction de 40 portes des latrines semi-durable dont 25 à Bambari et 15 à Batangafo
- Vidange des latrines d’urgence
- Mise en place de 150 bacs à ordures dans les sites dont 100 à Bambari et 50 à Batangafo et évacuation secondaires des déchets solides
- Aménagement des décharges de transits et finale
- Formations des relais communautaires, des hygiénistes et vidangeurs
- Distribution de kits de stockage d’eau aux personnes vivant avec handicap et sensibilisations aux bonnes pratiques d’hygiène pendant les distributions
- Mainstreaming protection autour des thématiques liées à l ’accès à l ’eau l’hygiène et l ’assainissement
- Réalisation de campagnes de sensibilisation à travers la mise en place et la formation de 18 clubs d'hygiène au sein des différents sites des personnes déplacées internes des deux localités bénéficiaires.

#### Images

- `assets/apsud/images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-sensibilisation-communautaire-01.jpg` — Séance de sensibilisation à l'hygiène animée par des agents d'APSUD devant une foule sur un site de déplacés
- `assets/apsud/images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-equipe-vidangeurs-02.jpg` — Vidangeurs équipés de combinaisons, bottes et masques à côté d'une fosse de latrines
- `assets/apsud/images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-panneau-sensibilisation-latrines-03.jpg` — Panneau de sensibilisation à l'utilisation des latrines sur un site de déplacés
- `assets/apsud/images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-site-transit-dechets-04.jpg` — Site de transit des déchets aménagé par APSUD (projet FH 14342)

### Projet 8 — Emplois temporaires et cohésion sociale à Bambari et Ippy

<a id="projet-8"></a>

**Titre officiel (source) :** Réponse aux besoins urgents des personnes touchées par les conflits à Bambari et Ippy en moyens de subsistance à travers la création d'emploi temporaire et renforcement de la cohésion sociale

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 12743 |
| Statut | Projet réalisé (source : site) |
| Dates | 2019-07-01 → 2019-11-30 |
| Zone (source) | Ippy |
| Lieux / préfectures | Ippy — Ouaka ; Bambari (cité dans le titre) — Ouaka |
| Domaines | Sécurité alimentaire, moyens de subsistance et stabilisation communautaire |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 250 000 USD |
| Bénéficiaires (source) | — (vide) — ⚠ Champ vide sur le site ; les activités mentionnent 700 jeunes à risque (THIMO). |
| URL source | https://apsud.org/detail-projet/8/R%C3%A9ponse%20aux%20besoins%20urgents%20des%20personnes%20touch%C3%A9es%20par%20les%20conflits%20%C3%A0%20Bambari%20et%20Ippy%20en%20moyens%20de%20subsistance%20%C3%A0%20travers%20la%20cr%C3%A9ation%20d%27emploi%20temporaire%20et%20renforcement%20de%20la%20coh%C3%A9sion%20sociale |

**Résumé (rédigé, à valider) :** Création d'emplois temporaires (THIMO) pour 700 jeunes à risque, appui aux activités génératrices de revenus et aux associations villageoises d'épargne et de crédit, et renforcement de la cohésion sociale à Bambari et Ippy.

#### Objectif général du projet

*(vide sur le site)*

#### Objectifs spécifiques du projet

- Améliorer les conditions de vie des personnes vulnérables à Bambari et Ippy en leur offrant un emploi temporaire, en appuyant leur relèvement socioéconomique et en renforçant la cohésion sociale

#### Résultats attendus du projet

- Trois infrastructures socio-économiques et sociocommunautaires sont réhabilitées à travers les THIMO et ainsi 600 travaux temporaires créés
- Au moins 30 microprojets d’AGR formulés, approuvés et appuyés par le projet sont opérationnels et rentables
- Les mécanismes et structures de prévention et de gestion de conflits locaux sont renforcés et opérationnels

#### Activités réalisées

- Création d’emplois temporaires pour 700 jeunes à risques (THIMO)
- DISTRIBUTION DES KITS D'AGR D'URGENCE
- FORMATION ET ACCOMPAGNEMENT TECHNIQUE
- MISE EN RESEAU DES GROUPEMENTS APPUYES
- APPUI A LA CREATION ET L'ACCOMPAGNEMENT DES ASSOCIATIONS VILLAGEOISES D'EPARGNE ET DE CREDIT (AVEC).
- Renforcement de capacités des autorités locales, des leaders des femmes, des leaders des jeunes et d’autres organisations à assise communautaire sur la gestion et la mitigation des conflits, le leadership pour la paix et la consolidation de la cohésion sociale.
- Mise en place d’un cadre d’échange entre les leaders/leaders religieux/autorités locales et les membres de leur communauté pour engagement des communautés à dialoguer et à se prendre en charge, autour de la notion de "cohésion sociale" et/ou de renforcement de la résilience.
- Focus group/dialogue intercommunautaire sur les thématiques de la cohésion sociale, la prévention et résolution de conflits suite aux audits et entretiens.
- Appui dans la légalisation des structures appuyées.

#### Images

- `assets/apsud/images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-mairie-ippy-rehabilitee-01.jpg` — Hôtel de ville d'Ippy réhabilité par APSUD *(légende du site : « Mairie de Ippy réhabilité »)*
- `assets/apsud/images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-formation-salle-02.jpg` — Formation en salle de bénéficiaires du projet à Ippy
- `assets/apsud/images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-lancement-thimo-03.jpg` — Lancement officiel des travaux THIMO avec les bénéficiaires, août 2019
- `assets/apsud/images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-mise-en-reseau-groupements-04.jpg` — Membres des groupements appuyés lors de leur mise en réseau, projet FH 12743

### Projet 7 — Réponse d’urgence WASH dans les quartiers de retour d’Ippy

<a id="projet-7"></a>

**Titre officiel (source) :** Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vulnérables affectées par les crises et forcées à quitter les sites des déplacés internes et à vivre dans les quartiers de retour d'Ippy

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 12678 |
| Statut | Projet réalisé (source : site) |
| Dates | 2019-05-15 → 2019-11-14 |
| Zone (source) | Ippy (Ouaka) |
| Lieux / préfectures | Ippy (quartiers de retour et axes) — Ouaka |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 121 000 USD |
| Bénéficiaires (source) | 17000 personnes 2100 hommes, femmes 7700, 2300 garçons et 4900 filles. |
| URL source | https://apsud.org/detail-projet/7/R%C3%A9ponse%20d%27urgence%20en%20eau,%20hygi%C3%A8ne%20et%20assainissement%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20affect%C3%A9es%20par%20les%20crises%20et%20forc%C3%A9es%20%C3%A0%20quitter%20les%20sites%20des%20d%C3%A9plac%C3%A9s%20internes%20et%20%C3%A0%20vivre%20dans%20les%20quartiers%20de%20retour%20d%27Ippy |

**Résumé (rédigé, à valider) :** Réponse d'urgence WASH pour les familles retournées et hôtes d'Ippy : latrines familiales, puits équipés de pompes, comités de gestion de l'eau, kits d'hygiène et sensibilisation.

#### Objectif général du projet

> Contribuer de manière urgente à améliorer l ’accès à l ’assainissement, à l ’hygiène et à l ’eau dans les quartiers de retour d’Ippy ainsi que sur les axes en faveur des filles, garçons, femmes et hommes vulnérables parmi les retournés et les familles hôtes.

#### Objectifs spécifiques du projet

- Améliorer l’accès aux services Eau, Hygiène et Assainissement aux communautés vulnérables dans les quartiers de retour d ’Ippy et sur les axes

#### Résultats attendus du projet

- R1. 12000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré aux infrastructures d’assainissement appropriées de façon digne et sécurisée dans le respect des normes SPHERE et nationales dans les quartiers de retour d ’Ippy et sur les axes
- R2. 17 000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en pratiques d’hygiène et sont sensibilisés à l’entretien et la bonne utilisation des ouvrages d'assainissement et d'eau installés
- R3. 4000 personnes (femmes, hommes, filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité suffisante dans la ville d ’Ippy et sur les axes

#### Activités réalisées

- Appui à la construction de 200 latrines familiales en utilisant les matériaux locaux
- Construction d’une (01) fosse à ordures sécurisée
- Appui à la Mairie dans les activités de collecte de déchets solides (poussepousses, brouettes, pelles, râteaux, kits de protection).
- Réalisation de campagnes de sensibilisation à travers la mise en place et la formation des clubs d'hygiène au sein des différents quartiers/villages bénéficiaires
- Mainstreaming protection autour des thématiques liées à l’accès à l’eau l’hygiène et l’assainissement.
- Distribution de kits d'hygiène intimes spécifiques aux femmes et sensibilisation sur la bonne utilisation de ces kits d'hygiène. 100 femmes âgées de 18 à 49 ans
- Aménagement de 7 puits d’eau équipés de Pompe à Motricité Humaine (PMH), selon les normes et directives en matière de WASH de la DGH.
- Mise en place et renforcement de 8 comités de gestion du point d'eau (CGPE) par point d’eau réhabilité pour s’assurer de la bonne gestion des ouvrages et continuer la sensibilisation même après le projet.
- Réhabilitation de 1 forage au village Zoubingui à pk 25 d'Ippy sur l'axe Bambari. (1 des 2 forages qui est en panne).
- Formation des artisans réparateurs de Pompes à motricité humaines (PMH).

#### Images

- `assets/apsud/images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-point-eau-pmh-01.jpg` — Point d'eau équipé d'une pompe à motricité humaine réalisé par APSUD à Ippy
- `assets/apsud/images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-lavage-mains-02.jpg` — Démonstration de l'utilisation d'un dispositif de lavage des mains par un agent d'APSUD à Ippy
- `assets/apsud/images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-sensibilisation-enfants-03.jpg` — Séance de sensibilisation à l'hygiène avec des enfants dans un quartier de retour d'Ippy
- `assets/apsud/images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-distribution-kits-04.jpg` — Kits d'hygiène (seaux, bassines, bidons) alignés pour une distribution à Ippy

### Projet 6 — Accès d’urgence à l’eau et à l’assainissement à Ippy

<a id="projet-6"></a>

**Titre officiel (source) :** Accès urgent, rapide et efficace aux services de base en termes d’eau, assainissement et promotion à l’hygiène pour les hommes, femmes, filles et garçons affectés par la crise dans la ville d'Ippy

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | FH 10577 |
| Statut | Projet réalisé (source : site) |
| Dates | 2018-11-01 → 2019-03-30 |
| Zone (source) | Ippy (Ouaka) |
| Lieux / préfectures | Ippy (4 sites de déplacés) — Ouaka |
| Domaines | WASH |
| Bailleur(s) | FH (Fonds Humanitaire pour la République centrafricaine (FH RCA) — déduit) |
| Partenaire(s) de mise en œuvre | — (vide) |
| Budget (source) | 200 000 USD |
| Bénéficiaires (source) | 11906 personnes dont 2001 hommes, 6005 femmes, 1400 garçons et 2500 filles |
| URL source | https://apsud.org/detail-projet/6/Acc%C3%A8s%20urgent,%20rapide%20et%20efficace%20aux%20services%20de%20base%20en%20termes%20d%E2%80%99eau,%20assainissement%20et%20promotion%20%C3%A0%20l%E2%80%99hygi%C3%A8ne%20pour%20les%20hommes,%20femmes,%20filles%20et%20gar%C3%A7ons%20affect%C3%A9s%20par%20la%20crise%20dans%20la%20ville%20d%27Ippy |

**Résumé (rédigé, à valider) :** Accès urgent à l'eau, à l'assainissement et à l'hygiène sur les quatre sites de déplacés d'Ippy : 72 cabines de latrines, 72 douches, gestion des déchets, forage réhabilité et clubs d'hygiène.

#### Objectif général du projet

> Contribuer de manière urgente à améliorer l’accès à l’assainissement, à l’hygiène et à l’eau sur les 4 sites des personnes déplacés internes à Ippy en faveur des filles, garçons, femmes et hommes déplacés et vulnérables sur les sites ainsi que les familles hôtes.

#### Objectifs spécifiques du projet

- Promouvoir les moyens d’accès et de maintenir de manière sécurisée les services WASH aux communautés vulnérables, déplacés internes sur les sites IDP d’Ippy

#### Résultats attendus du projet

- R1. 11000 personnes (femmes, hommes, filles et garçons) ont un accès amélioré aux infrastructures d’assainissement appropriées de façon digne et sécurisée dans le respect des normes du projet SPHERE sur les 4 sites des déplacés d’Ippy
- R2. 1000 personnes (femmes, hommes, filles et garçons) ciblées ont un accès sécurisé à l’eau en qualité et quantité suffisante dans la ville d’Ippy.
- R3. 11 000 personnes (femmes, hommes, filles et garçons) bénéficiaires comprennent et mettent en pratique les connaissances acquises en pratiques d’hygiène et sont sensibilisés à l’entretien et la bonne utilisation des latrines et douches

#### Activités réalisées

- Construction de 72 cabines de latrines d'urgences par bloc différenciés hommes / femmes et enfants équipées de dispositif de lavage de main sur les sites IDP d’Ippy.
- Construction de 72 nouvelles cabines de douches.
- Distribution de kits de collecte primaire des déchets et installation de 32 bacs à ordures
- Construction d’une (01) fosse à ordures sécurisée et appuyer la mairie dans la gestion des déchets solides
- Aménagement et désinfection d’une source d’Ippy centre.
- Réhabilitation d’un forage et rédynamisation de 2 comités de gestion de point d'eau.
- Distribution de kits d'hygiène incluant des items d'hygiène intimes spécifique pour les femmes et filles et sensibilisations aux bonnes pratiques d’hygiène pendant les distributions.
- Réalisation de campagnes de sensibilisation à travers la mise en place et la formation de 4 clubs d'hygiène au sein des différents sites.
- Mainstreaming protection autour des thématiques liées à l’accès à l’eau l’hygiène et l’assainissement.

#### Images

- `assets/apsud/images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-distribution-kits-wash-01.jpg` — Distribution de bidons et seaux aux personnes déplacées sur un site d'Ippy
- `assets/apsud/images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-point-eau-rehabilite-02.jpg` — Point d'eau réhabilité par APSUD à Ippy (projet FH 10577)
- `assets/apsud/images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-latrine-03.jpg` — Latrine construite par APSUD sur un site de déplacés d'Ippy
- `assets/apsud/images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-chariots-collecte-dechets-04.jpg` — Chariots de collecte des déchets remis pour l'assainissement d'Ippy

### Projet 5 — Résilience socio-économique face au COVID-19 (Bangui 3e)

<a id="projet-5"></a>

**Titre officiel (source) :** Appui à la résilience et au redressement socio-économique des communautés affectées par la pandémie de la COVID-19

| Champ | Valeur |
|---|---|
| Sigle | — |
| Code du projet | — (vide sur le site) |
| Statut | Projet réalisé (source : site) |
| Dates | 2021-07-01 → 2022-03-31 |
| Zone (source) | 3ème arrondissement de Bangui |
| Lieux / préfectures | 3e arrondissement de Bangui — Bangui |
| Domaines | Sécurité alimentaire, moyens de subsistance et stabilisation communautaire ; Protection/Genre |
| Bailleur(s) | Japon (Gouvernement du Japon) |
| Partenaire(s) de mise en œuvre | PNUD |
| Budget (source) | 665 718 USD |
| Bénéficiaires (source) | 1000 jeunes dont 50% des femmes bénéficié des THIMO ; 600 personnes dont 70% des femmes bénéficiaire de l’Alphabétisation fonctionnelle ; 700 personnes parmi les 1000 jeunes ont bénéficié des AGR à travers les groupements constitués et formés |
| URL source | https://apsud.org/detail-projet/5/Appui%20%C3%A0%20la%20r%C3%A9silience%20et%20au%20redressement%20socio-%C3%A9conomique%20des%20communaut%C3%A9s%20affect%C3%A9es%20par%20la%20pand%C3%A9mie%20de%20la%20COVID-19 |

**Résumé (rédigé, à valider) :** Appui à la résilience des jeunes et des femmes du 3e arrondissement de Bangui touchés par la pandémie : travaux HIMO, alphabétisation fonctionnelle, formations et activités génératrices de revenus, cohésion sociale.

#### Objectif général du projet

> Contribuer au renforcement des moyens de subsistance des personnes vulnérables (en particulier les jeunes et les femmes) à la pandémie par la formation professionnelle, et la création d'emplois puis contribuer à la réduction des risques de violence, de discrimination, et de xénophobie exacerbée par COVID-19 envers les réfugiés, les migrants et les PDI pour la cohésion sociale et la stabilisation

#### Objectifs spécifiques du projet

*(vide sur le site)*

#### Résultats attendus du projet

- Personnes vulnérables ont accès à un revenu immédiat pour démarrer leur AGR
- Les bénéficiaires ont renforcé leur capacité d’alphabétisation fonctionnelle pour mener les activités génératrices de revenus.
- Les moyens de subsistance des personnes les plus vulnérables (en particulier les jeunes et les femmes) à la pandémie sont renforcés par la formation professionnelle, et la création d'emplois est soutenue
- Les risques de violence, de discrimination, et de xénophobie exacerbée par COVID-19 envers les réfugiés, les migrants et les PDI sont réduits pour la cohésion sociale et la stabilisation sont atténués
- Les parties prenantes du projet sont toutes informées et participent régulièrement aux activités du projet pour collaborer avec le projet

#### Activités réalisées

- A1. Effectuer des analyses de profil des bénéficiaires potentiels
- A2. Réalisation des travaux HIMO pour la réhabilitation des infrastructures communautaires
- A3. Mettre en œuvre un programme de formation hebdomadaire sur les termes suivants : Cohésion sociale et cohabitation pacifique ; Genre et prévention de la violence sexuelle et basée sur le genre ; Prévention de radicalisme et extrémisme violent ; Épargne et système de sécurité/protection sociale
- A4. Réalisation de la formation en alphabétisation fonctionnelle Sous-activités
- A5. Appuyer le processus de formulation et de validation des microprojets d’AGR et le compte d’exploitation choisis par les bénéficiaires
- A6. Préparation d’un module définitif en tenant compte de l’approche 5S-Kaizen et l’attitude Positive, un pré-test et un post-test pour évaluer la capacité des bénéficiaires et les résultats des formations
- A7. Appuyer les activités génératrices de revenus
- A8. Fournir aux bénéficiaires cibles des kits d'hygiène et les former à l'utilisation des kits en se protégeant eux-mêmes et leurs familles du COVID-19
- A9. Fournir aux bénéficiaires cibles des sources d'énergie renouvelables et les former à entretenir les sources afin qu'ils puissent les utiliser de manière durable
- A10. Appuyer le Comité local de Paix et de Réconciliation à organiser des activités de sensibilisation dans leurs communautés et à diffuser des messages pour empêcher la propagation du COVID-19

#### Images

- `assets/apsud/images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-mairie-3e-rehabilitee-01.jpg` — Mairie du 3e arrondissement de Bangui réhabilitée par APSUD *(légende du site : « Mairie du 3ème arrondissement réhabilitée par l'ONG APSUD »)*
- `assets/apsud/images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-agr-association-polyvalent-02.jpg` — Membres de l'association « Polyvalent » du quartier Yambassa Fondo avec leur activité génératrice de revenus *(légende du site : « Appuyer le processus de formulation et de validation des microprojets d’AGR et le compte d’exploitation choisis par les bénéficiaires »)*
- `assets/apsud/images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-alphabetisation-03.jpg` — Séance de formation en alphabétisation fonctionnelle dans une salle de classe à Bangui *(légende du site : « Formation en alphabétisation »)*
- `assets/apsud/images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-remise-certificats-04.jpg` — Cérémonie de remise des certificats de fin de formation en alphabétisation *(légende du site : « Cérémonie de remise officielle des certificats de fin de formation en alphabetisation »)*

## 6. Partenaires et bailleurs

La page /Nos_partenaires et l’accueil affichent 14 logos sans nom (fichiers `/admin/assets/img/bailleur/img/1719489299.png` … `1719490319.jpg`). Identification et téléchargement : traités par un autre agent (`assets/partenaires/`).

Bailleurs et partenaires **cités dans les fiches projets** :

| Sigle | Nom | Rôle / projets |
|---|---|---|
| FH | Fonds Humanitaire pour la RCA (géré par OCHA) — développement déduit | projets 19, 15, 14, 13, 11, 10, 9, 8, 7, 6 |
| UE | Union européenne | projets 18 |
| WHH | Deutsche Welthungerhilfe e.V. | partenaire de mise en œuvre / chef de file — projets 18, 20 |
| BMZ | Ministère fédéral allemand de la Coopération économique et du Développement — développement déduit | projets 20 |
| PNUD | Programme des Nations unies pour le développement | projets 5 |
| Japon | Gouvernement du Japon | projet 5 (le projet 11 est financé par le FH : corrigé par le contrôle qualité, voir § 15) |
| AU SECOURS, LNPDD, OFAHRD | ONG nationales | co-mise en œuvre, projet 15 |
| ARFAD, FEVA, FSFD, JFDDH, AM, AVN | ONG nationales dirigées par des femmes | bénéficiaires, projet 19 |
| TGH | Triangle Génération Humanitaire (développement déduit) | coordination eau, projet 10 |
| Maison des Services (MdS) | Structure d’appui à la société civile | bénéficiaire, projet 18 |
| SAGINCO Group, SMCAF | Entreprises de transformation agricole | contrats de collaboration, projet 20 |

## 7. Contact

**Page /Contactez_nous** (titre de fil d’Ariane : « Contactez_Nous »)

| Champ | Valeur source |
|---|---|
| Siège nationale | MICHELINE, BIMBO |
| Email | infos@apsud.org / communication@apsud.org / cm@apsud.org |
| Téléphone | (+236) 74 18 62 03 / (+236) 74 18 62 14 / (+236)74 18 62 01 |

**Pied de page** : MICHELINE, BIMBO — Téléphone : (+236) 74.18.62.01 / 74.18.62.03 / 74.18.62.14 — Email : cm@apsud.org / communication@apsud.org / a.cm@apsud.org

**Panneau du siège (photo, à confirmer)** : Tél. (+236) 72 32 56 26 / B.P. 462 Bangui — Site www.apsud.org — Email raf@apsud.org

- Horaires : non publiés.
- Carte / GPS : aucune carte Google Maps ni coordonnées.
- Formulaire : champs « Entrez votre nom », « Entrez votre E-mail », « l'objet de votre message », « Ecrire quelques choses », bouton « envoyé » (action vide, non testé).
- Webmail : https://mail.apsud.org/roundcube14/

### Réseaux sociaux

| Réseau | URL |
|---|---|
| Facebook | https://www.facebook.com/ong.apsud |
| X (Twitter) | https://x.com/apsud25/status/1945204285161005222?s=48 — Le site pointe vers une publication précise et non vers le profil @apsud25 (URL de profil déduite). |
| Instagram | — — Icône présente mais lien vide (#). |
| LinkedIn | — — Aucun lien ; l'icône du pied de page de classe « linkedin » pointe en réalité vers le webmail. |

## 8. Faire un don

Contenu intégral de la page : titre « Faire un don », fil d’Ariane « ACCEUIL > Faire un don », une carte avec une photo (mairie du 3e arrondissement réhabilitée) et le texte « Que fait on de vos don? » + icône cœur.

**Aucune modalité publiée** : ni Mobile Money, ni virement, ni IBAN/RIB, ni formulaire, ni explication de l’usage des dons. Le lien « Faire un don » du pied de page pointe vers `#`.

## 9. Pied de page, navigation, mentions légales

**Menu principal :** Acceuil · A Propos · Liste des projets · Partenaires et Bailleurs · Nous contactez · Faire un don (+ icônes X, Facebook, Instagram, connexion).

**Pied de page :** colonne « Localisation » (adresse, téléphones, emails) ; « Nos liens » (Acceuil, A Propos, Projets, Faire un don) ; « Nos domaines d’actvités » (Wash, Protection/Genre, Sécurité alimentaire — tous liés à /A_propos) ; « © Copyright APSUD. Tous droits reservés » ; icônes X, Facebook, Instagram (#), webmail.

**Mentions légales :** aucune (ni mentions, ni confidentialité, ni cookies).

## 10. Identité visuelle

- **Logo** : Deux mains (teinte chair) entourant un symbole vert à trois feuilles/gouttes, sigle « APSUD » en capitales vertes dessous. Fichier unique publié : `assets/apsud/logo/apsud-logo-original.jpg` (85 × 102 px, JPEG fond blanc), identique à `assets/apsud.jpg`. Pas de version vectorielle/HD en ligne.
- **Vert exact du logo : `#2A8238`** (rgb(42, 130, 56)) — Analyse des pixels du logo (System.Drawing) : teinte exacte la plus fréquente parmi 2 303 pixels verts ; variantes voisines #298137, #2B8138, #288238.
- **Vert du site actuel : `#1BBD36`** (couleur du gabarit BootstrapMade, plus vif/saturé que le logo ; non conforme à la marque).
- Autres couleurs CSS : `#2AE149` (survol), `#21DF41`, `#57E76F`, `#1ED33C`, `#32CD32` (h3 forcés en vert « limegreen »), `green` (#008000, haut du pied de page), `black` (bas du pied de page), textes `#111` / `#444`.
- **Jaune du siège** (façade) : ≈ `#D8B038` (mesuré sur photo, approximatif) — piste d’accent secondaire.
- **Polices actuelles** : Open Sans (texte), Roboto (titres, menu, pied de page) ; Poppins chargée mais quasi inutilisée.
- **Recommandation** : vert de marque `#2A8238`, déclinaisons à dériver (foncé pour les fonds, clair pour les surfaces) ; demander le logo vectoriel.

## 11. Images

57 images téléchargées (logo compris). Détails complets dans `data/apsud/images.json`.

| Fichier | Dimensions | Poids | Alt | Remarques |
|---|---|---|---|---|
| `logo/apsud-logo-original.jpg` | 85×102 | 5 Ko | Logo d'APSUD : deux mains entourant un symbole vert à trois feuilles, avec le sigle APSUD en vert | Seule version du logo publiée (85 × 102 px, JPEG, fond blanc). Identique octet pour octet à assets/apsud.jpg fourni par le client. Aussi déclaré comme favicon, mais via un chemin relatif cassé (assets/img/apsud.jpg -> 404) ; /favicon.ico existe mais est vide (0 octet). Aucune version vectorielle ni haute définition en ligne. |
| `images/hero/hero-siege-apsud-facade.png` | 2889×1218 | 5 837 Ko | Façade du siège de l'ONG nationale APSUD : bâtiment de quatre étages jaune et vert, véhicules de l'organisation garés devant | Slide 1 du carrousel d'accueil (texte : « BIENVENUE SUR LE SITE DE L'ONG NATIONALE APSUD »). Image avec marges blanches intégrées et rendu très retouché (probablement amélioré/agrandi par IA) : à recadrer et à valider avec le client. 5,7 Mo : à optimiser. |
| `images/hero/hero-formation-responsables-ong-partenaires.jpg` | 1080×810 | 150 Ko | Formation des responsables des ONG partenaires dans la salle de réunion d'APSUD | Slide 2 du carrousel. |
| `images/hero/hero-reunion-staff-innovation-numerique-faim.png` | 1233×718 | 2 240 Ko | Réunion de l'équipe du projet Innovation numérique contre la faim autour d'ordinateurs portables | Slide 3 du carrousel. PNG de 2,2 Mo pour une photo : convertir en JPEG/WebP. |
| `images/a-propos/equipe-staff-apsud-devant-siege.jpg` | 2592×1944 | 2 368 Ko | Le staff d'APSUD, en t-shirts orange et verts et masques, pose devant le panneau du siège de l'ONG | Légende du site : « STAFF APSUD » (accueil) / « STAF APSUD » (À propos). Le panneau photographié porte le slogan « Nous sauvons des vies et accompagnons le développement local ». 2,3 Mo : à optimiser. |
| `images/don/don-mairie-3e-arrondissement-rehabilitee.jpg` | 666×499 | 58 Ko | Bâtiment de la mairie du 3e arrondissement de Bangui réhabilité par APSUD | Seule image de la page Don (carte « Que fait on de vos don? »). Doublon exact de projets/resilience-covid19-bangui-3e/projet-resilience-bangui-mairie-3e-rehabilitee-01.jpg. |
| `images/projets/innovation-numerique-faim-agriapps/projet-agriapps-lancement-finiyaka-01.jpg` | 6000×4000 | 6 829 Ko | Photo de groupe lors du lancement officiel de l'application FINIYAKA à Bangui, le 7 novembre 2025 | 6,7 Mo : à optimiser. |
| `images/projets/innovation-numerique-faim-agriapps/projet-agriapps-caravane-finiyaka-02.jpg` | 1280×960 | 177 Ko | Caravane de présentation de l'application FINIYAKA au grand public sur un camion podium, le 7 novembre 2025 |  |
| `images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-productrice-03.jpg` | 1103×839 | 208 Ko | Un agent d'APSUD présente l'application FINIYAKA sur smartphone à une productrice agricole à Ngou Lekpa |  |
| `images/projets/innovation-numerique-faim-agriapps/projet-agriapps-presentation-producteurs-04.jpg` | 1081×489 | 183 Ko | Présentation de l'application FINIYAKA à des producteurs agricoles dans un champ à Ngou Lekpa | Sur le site, l'attribut alt (23 avril 2026, une productrice) diffère de la légende affichée (24 avril 2026, quelques producteurs). |
| `images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-coaching-ong-femmes-01.jpg` | 1387×960 | 370 Ko | Une responsable de l'ONG FEVA en stage de coaching au bureau d'APSUD |  |
| `images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-atelier-formation-responsables-02.jpg` | 1080×799 | 184 Ko | Atelier de formation des responsables des ONG nationales de femmes sous la banderole du projet APSUD 33207 |  |
| `images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-visite-point-eau-03.jpg` | 1080×607 | 128 Ko | Équipe d'APSUD et partenaires lors d'une visite de chantier de point d'eau |  |
| `images/projets/autonomisation-ong-femmes-leadership/projet-femmes-leadership-evacuation-dechets-04.jpg` | 1080×1080 | 326 Ko | Chargement de déchets dans un camion-benne siglé APSUD par des agents d'assainissement | La mention « Entrez le texte » (texte d'un modèle d'édition photo) est incrustée en bas à gauche de l'image : à recadrer. |
| `images/projets/parsoc/projet-parsoc-lancement-officiel-bangui-01.jpg` | 1080×720 | 258 Ko | Photo officielle du lancement du projet PARSOC à Bangui, salle de conférence de la CNSS, 26 août 2025 |  |
| `images/projets/parsoc/projet-parsoc-lancement-regional-bambari-02.jpg` | 1024×461 | 70 Ko | Participants au lancement régional du projet PARSOC à Bambari, 14 janvier 2026 |  |
| `images/projets/parsoc/projet-parsoc-visite-autorites-kaga-bandoro-03.jpg` | 1040×780 | 83 Ko | Rencontre d'échange avec les autorités locales de la Nana-Gribizi à Kaga-Bandoro, 24 février 2026 |  |
| `images/projets/parsoc/projet-parsoc-remise-equipements-mds-04.jpg` | 1280×960 | 185 Ko | Remise officielle d'équipements informatiques aux responsables de la Maison des Services à Bangui, 6 mars 2026 | Sur le site, l'attribut alt de cette photo reprend par erreur le texte de la photo 3 ; la légende affichée (utilisée ici) est correcte. |
| `images/projets/leadership-humanitaire-wash-rafai/projet-rafai-formation-ong-partenaires-01.jpg` | 4032×3024 | 4 430 Ko | Formation en salle des responsables des ONG partenaires du projet à Rafaï | > 4 Mo : à optimiser. |
| `images/projets/leadership-humanitaire-wash-rafai/projet-rafai-travaux-terrain-02.jpg` | 1024×461 | 65 Ko | Équipes d'APSUD et d'ONG partenaires lors de travaux WASH sur le terrain à Rafaï | Le slide 2 de ce projet sur le site n'a pas d'image (src vide) ; cette image était le slide 3. |
| `images/projets/leadership-humanitaire-wash-rafai/projet-rafai-coaching-bureau-03.jpg` | 4032×3024 | 4 701 Ko | Séance de travail sur ordinateur entre agents d'APSUD et d'ONG partenaires du projet de leadership humanitaire local | > 4 Mo : à optimiser. |
| `images/projets/urgence-wash-boguila/projet-boguila-distribution-kits-hygiene-01.jpg` | 1024×677 | 205 Ko | Distribution de kits d'hygiène (seaux et bidons) aux ménages de Boguila |  |
| `images/projets/urgence-wash-boguila/projet-boguila-point-eau-rehabilite-02.jpg` | 1024×768 | 247 Ko | Point d'eau réhabilité par APSUD à Boguila dans le cadre du projet FH 19072 |  |
| `images/projets/urgence-wash-boguila/projet-boguila-formation-artisans-reparateurs-03.jpg` | 1387×924 | 461 Ko | Formation des artisans réparateurs et des comités de gestion des points d'eau à Boguila, avec leurs caisses à outils |  |
| `images/projets/urgence-wash-boguila/projet-boguila-latrine-familiale-04.jpg` | 1024×768 | 262 Ko | Latrine familiale construite avec l'appui du projet à Boguila |  |
| `images/projets/moyens-subsistance-maloum/projet-maloum-distribution-kits-agr-01.jpg` | 1024×768 | 260 Ko | Distribution de kits d'activités génératrices de revenus devant la base d'APSUD à Maloum |  |
| `images/projets/moyens-subsistance-maloum/projet-maloum-travaux-himo-02.jpg` | 1024×768 | 312 Ko | Travaux à haute intensité de main-d'œuvre (THIMO) de réhabilitation d'une piste à Maloum |  |
| `images/projets/moyens-subsistance-maloum/projet-maloum-travailleurs-thimo-03.jpg` | 1024×768 | 236 Ko | Travailleurs THIMO en gilets de sécurité rassemblés à Maloum |  |
| `images/projets/moyens-subsistance-maloum/projet-maloum-dotation-outils-04.jpg` | 1024×768 | 237 Ko | Brouettes et outils remis aux travailleurs THIMO à Maloum |  |
| `images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-bac-ordures-site-pdi-01.jpg` | 1040×780 | 168 Ko | Bac à ordures siglé APSUD sur un site de personnes déplacées internes |  |
| `images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-vidange-latrines-02.jpg` | 1080×1080 | 263 Ko | Camion vidangeur utilisé pour la vidange des latrines sur les sites de déplacés |  |
| `images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-latrines-urgence-03.jpg` | 1040×780 | 202 Ko | Cabines de latrines d'urgence installées par APSUD sur un site de déplacés |  |
| `images/projets/hygiene-assainissement-covid19-bangui-bambari/projet-covid19-bangui-bambari-affichage-sensibilisation-04.jpg` | 539×645 | 96 Ko | Affichage de messages de sensibilisation sur l'hygiène et le COVID-19 |  |
| `images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-latrines-urgence-visite-01.jpg` | 1426×1069 | 335 Ko | Visite de latrines d'urgence installées par APSUD sur un site de déplacés au bord du fleuve |  |
| `images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-distribution-kits-hygiene-02.jpg` | 1334×713 | 292 Ko | Kits d'hygiène COVID-19 (dispositifs de lavage des mains, brouettes, seaux) prêts à être distribués, projet APSUD 15898 |  |
| `images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-dechargement-futs-eau-03.jpg` | 1379×1034 | 412 Ko | Déchargement de fûts et de matériel WASH d'un camion par les agents d'APSUD |  |
| `images/projets/wash-covid19-bambari-batangafo-bimbo/projet-covid19-bambari-batangafo-lavage-mains-marche-04.jpg` | 1024×768 | 183 Ko | Démonstration du lavage des mains à un dispositif installé sur un marché |  |
| `images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-sensibilisation-communautaire-01.jpg` | 1024×492 | 117 Ko | Séance de sensibilisation à l'hygiène animée par des agents d'APSUD devant une foule sur un site de déplacés |  |
| `images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-equipe-vidangeurs-02.jpg` | 403×303 | 58 Ko | Vidangeurs équipés de combinaisons, bottes et masques à côté d'une fosse de latrines |  |
| `images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-panneau-sensibilisation-latrines-03.jpg` | 403×303 | 33 Ko | Panneau de sensibilisation à l'utilisation des latrines sur un site de déplacés |  |
| `images/projets/assainissement-sites-pdi-bambari-batangafo/projet-assainissement-pdi-site-transit-dechets-04.jpg` | 403×303 | 36 Ko | Site de transit des déchets aménagé par APSUD (projet FH 14342) |  |
| `images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-mairie-ippy-rehabilitee-01.jpg` | 1024×768 | 139 Ko | Hôtel de ville d'Ippy réhabilité par APSUD |  |
| `images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-formation-salle-02.jpg` | 1024×768 | 161 Ko | Formation en salle de bénéficiaires du projet à Ippy |  |
| `images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-lancement-thimo-03.jpg` | 1024×768 | 208 Ko | Lancement officiel des travaux THIMO avec les bénéficiaires, août 2019 |  |
| `images/projets/moyens-subsistance-cohesion-bambari-ippy/projet-thimo-bambari-ippy-mise-en-reseau-groupements-04.jpg` | 1513×1135 | 616 Ko | Membres des groupements appuyés lors de leur mise en réseau, projet FH 12743 |  |
| `images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-point-eau-pmh-01.jpg` | 1024×768 | 188 Ko | Point d'eau équipé d'une pompe à motricité humaine réalisé par APSUD à Ippy |  |
| `images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-lavage-mains-02.jpg` | 1024×768 | 153 Ko | Démonstration de l'utilisation d'un dispositif de lavage des mains par un agent d'APSUD à Ippy |  |
| `images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-sensibilisation-enfants-03.jpg` | 1024×768 | 248 Ko | Séance de sensibilisation à l'hygiène avec des enfants dans un quartier de retour d'Ippy |  |
| `images/projets/wash-quartiers-retour-ippy/projet-ippy-retour-distribution-kits-04.jpg` | 1024×768 | 236 Ko | Kits d'hygiène (seaux, bassines, bidons) alignés pour une distribution à Ippy |  |
| `images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-distribution-kits-wash-01.jpg` | 1024×574 | 180 Ko | Distribution de bidons et seaux aux personnes déplacées sur un site d'Ippy |  |
| `images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-point-eau-rehabilite-02.jpg` | 1024×512 | 117 Ko | Point d'eau réhabilité par APSUD à Ippy (projet FH 10577) |  |
| `images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-latrine-03.jpg` | 1024×512 | 144 Ko | Latrine construite par APSUD sur un site de déplacés d'Ippy |  |
| `images/projets/wash-sites-pdi-ippy/projet-ippy-sites-pdi-chariots-collecte-dechets-04.jpg` | 487×366 | 52 Ko | Chariots de collecte des déchets remis pour l'assainissement d'Ippy |  |
| `images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-mairie-3e-rehabilitee-01.jpg` | 666×499 | 58 Ko | Mairie du 3e arrondissement de Bangui réhabilitée par APSUD | Doublon exact de l'image de la page Don. |
| `images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-agr-association-polyvalent-02.jpg` | 427×383 | 56 Ko | Membres de l'association « Polyvalent » du quartier Yambassa Fondo avec leur activité génératrice de revenus |  |
| `images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-alphabetisation-03.jpg` | 1511×1133 | 562 Ko | Séance de formation en alphabétisation fonctionnelle dans une salle de classe à Bangui |  |
| `images/projets/resilience-covid19-bangui-3e/projet-resilience-bangui-remise-certificats-04.jpg` | 1249×806 | 293 Ko | Cérémonie de remise des certificats de fin de formation en alphabétisation |  |

Manquante : le slide 2 du projet 15 (Rafaï) n’a pas d’image sur le site (src vide).

## 12. Audit du site actuel

### Technique

- **Stack** : Laravel (cookies `XSRF-TOKEN` / `apsud_session`, page 404 Laravel par défaut) + gabarit gratuit **BootstrapMade « Company » v4.8.0** (Bootstrap 5, AOS, Swiper, GLightbox, Isotope, Waypoints, animate.css, Bootstrap Icons + Boxicons + Remix Icon). Hébergement LWS.
- **Erreurs 500** au lieu de 404 sur les URL de projets inexistants ; l’URL de détail exige le titre complet encodé (URL de 200 à 400 caractères, non lisibles, fragiles).
- **Favicon cassé** (chemin relatif `assets/img/apsud.jpg` → 404 ; `/favicon.ico` vide).
- `<html lang="en">` alors que le site est en français ; `<title>` identique (« ONG APSUD ») sur toutes les pages ; `meta description` et `keywords` vides ; pas d’Open Graph, pas de sitemap.xml, pas de données structurées.
- **Poids** : images non optimisées (6,7 Mo, 5,7 Mo, 4,6 Mo, 4,4 Mo, 2,3 Mo, 2,2 Mo…) ; PNG utilisés pour des photos ; 3 polices × 14 graisses ; 3 bibliothèques d’icônes et 8 bibliothèques JS chargées partout.
- Liens morts : `href="img_5terre.jpg"` sur toutes les images de la liste des projets, `index.html` dans les fils d’Ariane, Instagram `#`, « Faire un don » du pied de page `#`, titres de projets à l’accueil avec `href=""`.
- Balisage cassé : `<h2>` et `<h3>` mal imbriqués sur les fiches projets, `<button href>` (non cliquable) sur À propos, `<div>` dans `<p>`, `<br>` littéraux affichés (« &lt;br&gt; ») dans les bénéficiaires du projet 20.
- Formulaire de contact sans retour visible ni protection anti-spam apparente ; reliquat `php-email-form/validate.js`.

### Accessibilité

- Textes alternatifs absents ou faux : « Cinque Terre » (texte d’exemple W3Schools) sur toutes les vignettes de projets et sur la page Don ; logos partenaires sans alt ; logo sans alt ; h1 du logo vide (`<span></span>`).
- Contraste faible du vert vif `#1BBD36` / `#32CD32` sur blanc pour les titres h3.
- Carrousel automatique (5 s) sans pause ; texte posé sur photo sans voile garanti.

### Contenu

- Pas de chiffres clés, pas d’histoire/date de création, pas d’équipe (section vide), pas de rapports, pas d’actualités, pas de témoignages.
- Page Don vide (aucune modalité) ; aucune incitation à l’action dans le hero.
- Partenaires réduits à des logos sans nom ni lien.
- Fiches projets hétérogènes : champs vides (objectif général, partenaire, code), champs décalés (projet 14), devises erronées (£), résultats « attendus » au lieu de résultats atteints, nombreuses fautes (voir section 13).
- Zones d’intervention déclarées incomplètes par rapport aux projets.
- Pas de version anglaise malgré un nom anglais officiel et des bailleurs internationaux.

### Design / UX

- Gabarit générique reconnaissable, identité visuelle faible (vert non conforme au logo, logo minuscule en JPEG 85 px).
- Liste des projets en grille de cartes identiques, sans filtre (statut, domaine, zone, bailleur), sans résumé ni dates.
- Fiches projet : slider d’images à hauteur fixe 450 px (déformation), informations clés en liste brute, longs paragraphes à puces collées.
- Menu avec fautes (« Acceuil », « Nous contactez »), pied de page avec fautes (« actvités », « reservés »).
- Pas de recherche, pas de fil d’actualité, pas de liens vers les réseaux bien configurés (X pointe vers une publication, pas vers le profil).

## 13. À corriger dans le texte source

### Navigation et pages

| Source | Correction proposée |
|---|---|
| Acceuil / ACCEUIL | Accueil |
| Nous contactez | Nous contacter / Contact |
| A Propos | À propos |
| Contactez_Nous (titre affiché) | Contactez-nous |
| Siège nationale | Siège national |
| envoyé (bouton) | Envoyer |
| Ecrire quelques choses | Votre message |
| l'objet de votre message | Objet de votre message |
| Nos domaines d'actvités | Nos domaines d’activités |
| Tous droits reservés | Tous droits réservés |
| STAF APSUD (À propos) | Staff APSUD / L’équipe d’APSUD |
| Que fait on de vos don? | Que faisons-nous de vos dons ? |

### À propos

| Source | Correction proposée |
|---|---|
| concevoir et mettre en œuvre de solutions durables | concevoir et mettre en œuvre des solutions durables |
| Les implications des décisions et des actions sont analysés | … sont analysées |
| Un Centrafrique juste, meilleur… ; | Une Centrafrique juste… (ou « Un Centrafrique », usage local) — supprimer le « ; » final |
| Préfecture d’Ombella Mpoko / de la OUAKA / HAUTE KOTTO | Préfecture de l’Ombella-M’Poko / de la Ouaka / de la Haute-Kotto |
| « de l a considération », « T ous les membres » (césures dans le HTML) | de la considération, Tous les membres |
| Objectifs de l’ONG APSUD (un seul objectif) | Objectif de l’ONG APSUD |

### Projets

| Projet | Source | Correction / point à vérifier |
|---|---|---|
| 19 | Titre se terminant par « féminin) » | Supprimer la parenthèse fermante orpheline |
| 19 | Statut « réalisé » | Dates 01/02/2025 → 31/03/2026 : cohérent (terminé) |
| 19 | « …(activité réalisée par les 06 ONG bénéficiaires » | Parenthèse non fermée |
| 20 | Budget « 159214£ » | 159 214 € (devise à confirmer) |
| 20 | « coordonnées les actions » | coordonner les actions |
| 20 | « Inscription de plus de 244 utilisateurs sont l’application » | … sur l’application |
| 20 | « Deux contrats de collaborations ont été signé » | … de collaboration ont été signés |
| 20 | « présentation de l’application au grand le 7 Novembre » | … au grand public le 7 novembre |
| 20 | Bénéficiaires avec « &lt;br&gt; » affichés | Retirer les balises échappées |
| 20 | Alt photo 4 ≠ légende (23 vs 24 avril 2026) | Harmoniser |
| 18 | Budget « 1.700.000£/360.721,61£ » | Préciser : budget total 1 700 000 € / part APSUD 360 721,61 € (à confirmer) |
| 18 | « OSC porteuses de changement sociale » | changement social |
| 18 | « en tant qu‘acteur » (apostrophe erronée) | en tant qu’acteur |
| 18 | « ONG International » | ONG internationale |
| 18 | « (à Bambari en date du 22 Décembre 2025 et à Kaga-Bandoro le 22 Janvier 2026 » | Parenthèse non fermée |
| 18 | « des des antennes », « autorités locale » | des antennes, autorités locales |
| 18 | Alt photo 4 = texte de la photo 3 | Utiliser la légende « Cérémonie de remise officielle… » |
| 15 | Budget « 600 0OO USD » | 600 000 USD |
| 15 | « WASH a RAFAÏ » | WASH à Rafaï |
| 15 | « contribuer aux renforcements… ;qu’elles » | Contribuer au renforcement… ; qu’elles |
| 15 | « dans la sous-préfectures de Rafaï » | dans la sous-préfecture de Rafaï |
| 15 | « capacités et possibilités équitable », « Suivie de la réalisation » | équitables, Suivi de la réalisation |
| 15 | Partenaires de mise en œuvre listant APSUD elle-même | Retirer APSUD de la liste |
| 15 | Slide 2 sans image | Ajouter une photo ou supprimer le slide |
| 14 | Champ Bailleur = « 250,000 USD », Partenaire = « FH », Budget = « 430,000 USD » | Bailleur : FH ; budget à confirmer |
| 14 | Objectif général vide | À compléter |
| 14 | « ampagnes d’affichage » | Campagnes d’affichage |
| 14 | « . Construction d’une (01) fosse… Ce travail se fera… » | Supprimer le point initial ; passer au passé (projet terminé) |
| 14 | « latrines publique » ; « populations hautes » | latrines publiques ; populations hôtes |
| 13 | Bénéficiaires identiques au projet 14 (29005 personnes…) | Probable copier-coller : chiffre à confirmer |
| 13 | Objectif général vide ; activité « …cohésion sociale cohésion sociale… » (répétition) | À compléter / supprimer le doublon |
| 13 | Titre « …aux  personnes… » (double espace) et point final | Nettoyer |
| 11 | Code « COVID JAPON », bailleur « FH » | Vérifier le bailleur réel |
| 11 | « personnes déplacés internes » ; « sef fera » ; « Rehabilitation » | déplacées ; se fera ; Réhabilitation |
| 11 | Objectif général vide | À compléter |
| 10 | « personnes déplacés internes » (titre) ; « façondigne », « ainsi10 FOSA », « sitesIDP » | déplacées ; façon digne ; ainsi que 10 FOSA ; sites IDP |
| 10 | « sur ls sites », « le sit IDP de Bangafo » | sur les sites, le site IDP de Batangafo |
| 10 | « nouveau coron virus », « Rédynamisation », « précisement », « population de Bimbo » | nouveau coronavirus, Redynamisation, précisément, populations de Bimbo |
| 10 | « latrines pleines en non vidangeables » | pleines et non vidangeables |
| 9 | « l ’accès à l ’assainissement » (espaces avant apostrophes) | l’accès à l’assainissement |
| 9 | « dechets », « systeme », « decharge », « liques », « defecation » | déchets, système, décharge, liquides, défécation |
| 9 | « diarrhéïques » | diarrhéiques |
| 9 | Objectifs spécifiques rédigés au futur (« seront menées ») | Passer au passé |
| 8 | Résultat n°1 répété deux fois | Supprimer le doublon |
| 8 | Activités en MAJUSCULES | Casse normale |
| 8 | Zone « Ippy » alors que le titre cite Bambari et Ippy | Compléter la zone |
| 8 | Bénéficiaires vides | À compléter (700 jeunes cités dans les activités) |
| 8 | « Mairie de Ippy réhabilité » (légende) | Mairie d’Ippy réhabilitée |
| 7 | « 17000 personnes 2100 hommes, femmes 7700… » | 17 000 personnes dont 2 100 hommes, 7 700 femmes… |
| 7 | « poussepousses » | pousse-pousse |
| 6 | Date de fin « 2019-03-30 » | Vérifier (31/03/2019 ?) |
| 6 | « personnes déplacés internes » ; « rédynamisation » | déplacées ; redynamisation |
| 5 | Objectifs spécifiques vides ; code projet vide | À compléter |
| 5 | « A.3 » collé à A2 ; « Sous-activités » orphelin après A4 | Restructurer la liste |
| 5 | « 1000 jeunes dont 50% des femmes bénéficié des THIMO » | 1 000 jeunes, dont 50 % de femmes, ont bénéficié des THIMO |
| 5 | « …sont réduits pour la cohésion sociale et la stabilisation sont atténués » | Phrase à réécrire |
| 5 | « alphabetisation » (légende) | alphabétisation |
| Tous | « Activités réalisées. » (point final), « Date de debut », « code du projet » | Activités réalisées, Date de début, Code du projet |
| Tous | Résultats « attendus » pour des projets terminés | Remplacer par les résultats atteints si disponibles |
| Plusieurs | Nombres sans espace (29005, 65165…) et « 06 », « 03 » | 29 005, 65 165 ; six, trois |

## 14. Informations manquantes à demander à APSUD

- Date de création, numéro d’agrément/enregistrement, historique (dates clés).
- Logo en version vectorielle (SVG/AI/PDF) et variantes (horizontale, monochrome, blanche).
- Équipe : direction, coordination, conseil d’administration (noms, fonctions, photos).
- Chiffres clés validés (personnes atteintes, projets, budgets, personnel, bases/antennes).
- Bases et antennes actuelles (Bambari, Maloum, Ippy, Boguila… vus sur photos et textes).
- Modalités de don : Mobile Money (opérateur, numéro, titulaire), coordonnées bancaires, usage des fonds.
- Adresse précise + coordonnées GPS du siège, horaires, adresse e-mail principale (infos@ / cm@ / a.cm@ / raf@ ?), téléphone principal (74 18 62 0x ou 72 32 56 26 ?), boîte postale.
- Comptes réseaux sociaux exacts (profil X, Instagram, LinkedIn, YouTube éventuels).
- Projets supprimés (ids 1–4, 12, 16, 17) : à republier ? Projets plus anciens à ajouter ?
- Résultats atteints (et non attendus) des projets terminés ; rapports annuels, publications.
- Objectifs généraux manquants (projets 8, 10, 11, 13, 14) et objectifs spécifiques du projet 5.
- Confirmation des devises (£ → €) et des budgets ambigus (projets 14, 18, 20).
- Crédits photo, autorisation d’usage des photos de personnes, version non retouchée de la photo du siège.
- Textes légaux : mentions légales (responsable de publication, hébergeur), politique de confidentialité.

## 15. Compléments du contrôle qualité (archives du site, 21/11/2026)

> Ajouté par le contrôle qualité. Sources : Wayback Machine (index CDX de apsud.org, 2018 → 2025). Ces données ont été publiées par APSUD sur ses **anciens sites** mais ne figurent plus sur le site actuel : **à faire valider avant publication**. Détails et URL d’archive : `data/apsud/projets_historiques.json`, `organisation.json` (clés `donnees_archives`, `contact.historique`, `don.coordonnees_bancaires_archives`, `objectifs_specifiques`, `identite.equipe_archives`) et `docs/memoire/CONTROLE_QUALITE.md`.

### 15.1 Quatre versions successives du site
- **2018** (HTML statique) : présentation, activités 2016-2017 (10 projets détaillés), réalisations, avis de recrutement.
- **2021-2022** (Bootstrap) : objectifs spécifiques, pages par domaine et par bailleur (FH, UE, PBF), 12 logos de bailleurs, page don avec RIB BPMC.
- **2023** (WordPress) : **tableau de 60 projets 2015-2023**, zones détaillées, page don avec RIB BGFIBank. Ce WordPress a été **piraté** (pages de spam sous `/apsud/`, mars-juin 2024 ; aujourd’hui en 404).
- **2024 →** (Laravel) : site actuel. En août 2024, il affichait aussi un membre d’équipe et le projet Alindao.

### 15.2 Chiffre clé publié par APSUD
« De 2016 à février 2023, APSUD a réalisé **plus de 60 projets** ». Contrats : Oxfam 17, PNUD 11, Fonds humanitaire 10, UNOPS 9, FAO 3, UNFPA 2, OIM 2, NRC 2, UNICEF 1, ACF 1, ACTED 1, DRC 1. Bailleurs via Oxfam : UE (ECHO, Fonds Bêkou), OFDA/USAID, Sida, AFD, PAM, DFATD, Irish Aid, Inditex, ONU Femmes, MINUSCA. Premier projet recensé : PARVF (PNUD), novembre 2015.

### 15.3 Projet manquant ajouté à `projets.json`
- **id 2 — Assistance d’urgence en eau, assainissement et hygiène pour les populations déplacées d’Alindao** : FH, partenaire ACF, 55 769,81 USD, 01/02/2023 → 31/07/2023, Alindao (Basse-Kotto), 13 172 bénéficiaires. Retiré du site (erreur 500 aujourd’hui), sans photo.

### 15.4 Corrections et compléments sur les 13 projets actuels
- Les 13 fiches ont été comparées champ par champ avec le site : **conformes**.
- **Projet 8** : objectif général (vide sur le site) complété depuis la fiche 2023.
- **Projet 11** : bailleur confirmé **FH (CHF)**, pas le Japon (le code « COVID JAPON » est trompeur).
- **Projet 14** : budget confirmé **430 000 USD** (le « 250,000 USD » du champ Bailleur est une erreur).
- **Écarts de dates** à faire trancher : projet 5 (juin ou juillet 2021), 6 (fin mars, avril ou juillet 2019), 8 (début juin ou juillet 2019), 13 (nov. 2018 → avr. 2019 selon 2023, déc. 2018 → juil. 2019 sur le site).

### 15.5 Organisation
- **Objectifs spécifiques** (site 2021) : développement social ; développement économique contre la pauvreté ; accès à l’eau, l’hygiène et l’assainissement ; prise en charge psychosociale, juridique, médicale et socio-économique des personnes vulnérables ; préservation de l’environnement et de la biodiversité.
- **Zones déjà touchées** (site 2023) : 8 arrondissements de Bangui, Ombella-M’Poko (Bimbo, Bégoua), Mambéré-Kadéi (Berberati, Carnot), Ouham (Batangafo, Nana-Boguila), Lim-Pendé (Paoua), Ouham-Pendé (Bozoum), Ouaka (Bambari, Grimari, Maloum, Ippy), Mbomou (Bangassou), Basse-Kotto (Alindao, Mobaye, Kembé), Haute-Kotto (Bria).
- **Ancien siège** : avenue David Dacko, 2e arrondissement, après le pont Saint-Charles, Bangui — **BP 462 Bangui** (confirme la boîte postale lue sur le panneau). Téléphones 2023 : 74 18 62 09 / 72 36 00 77 ; e-mails : ong.apsud@yahoo.fr, infos@apsud.org.
- **Équipe** (août 2024) : un seul membre publié, chargé de communication (nom dans `organisation.json`, à ne pas republier sans accord).
- **Don** : deux RIB publiés successivement (BPMC en 2022, BGFIBank en 2023) — **à confirmer impérativement**, ne rien publier sans validation écrite d’APSUD.

### 15.6 Images
- Les 57 images initiales sont complètes et correspondent exactement aux images du site actuel.
- 5 images ajoutées dans `assets/apsud/images/archives/` : ancien slide d’accueil HD (équipe « Stop Covid-19 », 2568 × 1581, encore sur le serveur), démonstration de lavage des mains (FH 2020), formation en salle (2020), animation de cohésion sociale (UNFPA/PBF), t-shirts de sensibilisation Oxfam/APSUD en sango.
