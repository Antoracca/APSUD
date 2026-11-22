# Partenaires et bailleurs d'APSUD

> Mémoire de projet — refonte du site apsud.org. Source de vérité des données : `data/apsud/partenaires.json`.
> Collecte : 21/11/2026, à partir de https://apsud.org/Nos_partenaires, de l'accueil (`/home`, bloc « Nos partenaires & Bailleurs »), de `/liste_projets` et des 13 pages `/detail-projet/<id>/…` accessibles.

## 1. Synthèse

- **14 logos** affichés sur apsud.org (page Partenaires et accueil : même liste, même ordre, **aucun texte alternatif ni lien**, aucun nom affiché — l'identification a été faite visuellement).
- **6 autres organisations** citées dans les fiches projets mais **absentes du bandeau de logos** : Union européenne, BMZ, Welthungerhilfe (WHH), Japon, LNPDD, OFAHRD.
- Total : **20 entrées** dans `partenaires.json`.
- Logos source récupérés depuis apsud.org : **14/14** (`assets/partenaires/source-apsud/`).
- Logos HD conformes (SVG, ou PNG ≥ 400 px à fond transparent) : **10** ; HD partiels (sous le seuil ou non fidèles) : **3** ; aucun HD : **7** (`assets/partenaires/hd/`).
- **Le Fonds Humanitaire RCA (FH RCA, géré par OCHA) est de loin le premier bailleur** : 10 des 13 projets publiés. Les projets en cours (2025-2027) sont financés par l'**UE** et le **BMZ** via **Welthungerhilfe**, qui n'ont pourtant aucun logo sur le site actuel.
- Pour 11 des 14 logos affichés, **aucun projet du site ne documente la relation** (UK aid, CERF, Bêkou, Gavi, MINUSCA, ONU Femmes, Oxfam, Sida, UNICEF, UNOPS, USAID). La catégorie retenue (bailleur / partenaire) repose sur le rôle habituel de l'organisation et **doit être validée par APSUD**.

## 2. Tableau récapitulatif

| # | Nom affiché | Sigle | Type | Catégorie | Projets liés | Logo source (apsud.org) | Logo HD |
|---|---|---|---|---|---|---|---|
| 1 | UK aid (logo « UKaid – from the British people ») | UK aid / FCDO | gouvernement | bailleur | — | PNG 3508x3026 | aucun |
| 2 | United Nations CERF – Central Emergency Response Fund | CERF | agence ONU | bailleur | — | PNG 320x124 | `cerf.svg` (SVG) |
| 3 | AU SECOURS – Développement et Humanitaire | Au Secours (AS) | partenaire de mise en oeuvre | partenaire | 15 | PNG 328x319 | aucun |
| 4 | Bêkou – EU Trust Fund for the Central African Republic | Fonds Bêkou | bailleur de fonds | bailleur | — | JPEG 235x90 | aucun |
| 5 | FH RCA – Fonds Humanitaire République centrafricaine | FH RCA | bailleur de fonds | bailleur | 6, 7, 8, 9, 10, 11, 13, 14, 15, 19 | PNG 559x106 | aucun |
| 6 | Gavi – L'Alliance du Vaccin | Gavi | bailleur de fonds | bailleur | — | PNG 394x158 | `gavi.png` (PNG, 360x136) ⚠ partiel |
| 7 | MINUSCA | MINUSCA | agence ONU | partenaire | — | JPEG 117x90 | `minusca-embleme-onu.svg` (SVG) ⚠ partiel |
| 8 | ONU Femmes | ONU Femmes | agence ONU | partenaire | — | PNG 50x23 | `onu-femmes-fr.png` (PNG, 293x47) ⚠ partiel |
| 9 | Oxfam | Oxfam | ONG internationale | partenaire | — | PNG 50x53 | `oxfam.svg` (SVG) |
| 10 | PNUD | PNUD (UNDP) | agence ONU | partenaire | 5 | PNG 50x52 | `pnud-undp-en.svg` (SVG) |
| 11 | Sida | Sida (Asdi en français) | gouvernement | bailleur | — | PNG 106x41 | `sida.png` (PNG, 1296x1296) |
| 12 | unicef – pour chaque enfant | UNICEF | agence ONU | partenaire | — | PNG 354x218 | `unicef.svg` (SVG) |
| 13 | UNOPS | UNOPS | agence ONU | partenaire | — | JPEG 243x243 | `unops.svg` (SVG) |
| 14 | USAID – From the American People | USAID | gouvernement | bailleur | — | JPEG 518x200 | `usaid.svg` (SVG) |
| — | Union Européenne (UE) | UE | bailleur de fonds | bailleur | 18 | absent du site | `union-europeenne.png` (PNG, 4079x919) |
| — | BMZ | BMZ | gouvernement | bailleur | 20 | absent du site | `bmz.svg` (SVG) |
| — | ONG International Deutsche Welthungerhilfe e.V. (WHH) | WHH | ONG internationale | partenaire | 18, 20 | absent du site | `welthungerhilfe.png` (PNG, 1808x858) |
| — | Japon | Japon / ODA | gouvernement | bailleur | 5 | absent du site | aucun |
| — | LNPDD | LNPDD | partenaire de mise en oeuvre | partenaire | 15 | absent du site | aucun |
| — | OFAHRD | OFAHRD | partenaire de mise en oeuvre | partenaire | 15 | absent du site | aucun |

`#` = position dans la grille de logos d'apsud.org ; « — » = organisation citée seulement dans une fiche projet.

### Projets et financements (tels que publiés)

| Id | Projet (abrégé) | Bailleur | Partenaire de mise en œuvre | Période | Budget affiché | Statut |
|---|---|---|---|---|---|---|
| [5](https://apsud.org/detail-projet/5/Appui%20%C3%A0%20la%20r%C3%A9silience%20et%20au%20redressement%20socio-%C3%A9conomique%20des%20communaut%C3%A9s%20affect%C3%A9es%20par%20la%20pand%C3%A9mie%20de%20la%20COVID-19) | Appui à la résilience et au redressement socio-économique des communautés affectées par… | Japon / ODA | APSUD, PNUD (UNDP) | 2021-07-01 → 2022-03-31 | 665 718 USD | réalisé |
| [6](https://apsud.org/detail-projet/6/Acc%C3%A8s%20urgent,%20rapide%20et%20efficace%20aux%20services%20de%20base%20en%20termes%20d%E2%80%99eau,%20assainissement%20et%20promotion%20%C3%A0%20l%E2%80%99hygi%C3%A8ne%20pour%20les%20hommes,%20femmes,%20filles%20et%20gar%C3%A7ons%20affect%C3%A9s%20par%20la%20crise%20dans%20la%20ville%20d%27Ippy) | Accès urgent, rapide et efficace aux services de base en termes d’eau, assainissement e… | FH RCA | APSUD | 2018-11-01 → 2019-03-30 | 200 000 USD | réalisé |
| [7](https://apsud.org/detail-projet/7/R%C3%A9ponse%20d%27urgence%20en%20eau,%20hygi%C3%A8ne%20et%20assainissement%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20affect%C3%A9es%20par%20les%20crises%20et%20forc%C3%A9es%20%C3%A0%20quitter%20les%20sites%20des%20d%C3%A9plac%C3%A9s%20internes%20et%20%C3%A0%20vivre%20dans%20les%20quartiers%20de%20retour%20d%27Ippy) | Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vu… | FH RCA | APSUD | 2019-05-15 → 2019-11-14 | 121 000 USD | réalisé |
| [8](https://apsud.org/detail-projet/8/R%C3%A9ponse%20aux%20besoins%20urgents%20des%20personnes%20touch%C3%A9es%20par%20les%20conflits%20%C3%A0%20Bambari%20et%20Ippy%20en%20moyens%20de%20subsistance%20%C3%A0%20travers%20la%20cr%C3%A9ation%20d%27emploi%20temporaire%20et%20renforcement%20de%20la%20coh%C3%A9sion%20sociale) | Réponse aux besoins urgents des personnes touchées par les conflits à Bambari et Ippy e… | FH RCA | APSUD | 2019-07-01 → 2019-11-30 | 250 000 USD | réalisé |
| [9](https://apsud.org/detail-projet/9/Projet%20d%27urgence%20d%27assainissement%20des%20sites%20des%20personnes%20d%C3%A9plac%C3%A9es%20internes%20de%20Bambari%20et%20Batangafo) | Projet d'urgence d'assainissement des sites des personnes déplacées internes de Bambari… | FH RCA | APSUD | 2019-12-01 → 2020-05-31 | 200 000 USD | réalisé |
| [10](https://apsud.org/detail-projet/10/R%C3%A9ponse%20urgente%20en%20Eau,%20Hygi%C3%A8ne%20et%20Assainissement%20pour%20sauver%20des%20vies%20et%20lutter%20contre%20la%20propagation%20du%20COVID%2019%20dans%20les%20sites%20des%20personnes%20d%C3%A9plac%C3%A9s%20internes%20de%20Bambari;%20de%20Batangafo%20et%20dans%20la%20ville%20de%20Bimbo) | Réponse urgente en Eau, Hygiène et Assainissement pour sauver des vies et lutter contre… | FH RCA | APSUD | 2020-06-01 → 2020-10-31 | 300 000 USD | réalisé |
| [11](https://apsud.org/detail-projet/11/Projet%20d%E2%80%99urgence%20en%20hygi%C3%A8ne%20et%20assainissement%20%C3%A0%20Bangui%20et%20Bambari%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20pour%20r%C3%A9pondre%20aux%20besoins%20humanitaires%20les%20plus%20critiques%20et%20freiner%20la%20propagation%20du%20COVID%2019.) | Projet d’urgence en hygiène et assainissement à Bangui et Bambari en faveur des personn… | FH RCA | APSUD | 2020-08-01 → 2021-01-31 | 100 000 USD | réalisé |
| [13](https://apsud.org/detail-projet/13/Acc%C3%A8s%20urgent%20%C3%A0%20des%20opportunit%C3%A9s%20%C3%A9conomiques%20et%20des%20moyens%20de%20subsistance%20aux%20%20personnes%20touch%C3%A9es%20par%20la%20crise%20pour%20la%20stabilisation%20des%20communaut%C3%A9s%20affect%C3%A9es%20par%20le%20conflit%20%C3%A0%20Maloum.) | Accès urgent à des opportunités économiques et des moyens de subsistance aux personnes … | FH RCA | APSUD | 2018-12-01 → 2019-07-31 | 250,000 USD | réalisé |
| [14](https://apsud.org/detail-projet/14/R%C3%A9ponse%20d%27urgence%20en%20eau,%20hygi%C3%A8ne%20et%20assainissement%20en%20faveur%20des%20personnes%20les%20plus%20vuln%C3%A9rables%20affect%C3%A9es%20par%20les%20crises%20%C3%A0%20Boguila%20et%20ses%20environs%20dans%20la%20pr%C3%A9fecture%20de%20l%27Ouham) | Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vu… | FH RCA | APSUD | 2021-06-01 → 2022-03-31 | 430,000 USD | réalisé |
| [15](https://apsud.org/detail-projet/15/Leadership%20Humanitaire%20local%20pour%20renforcer%20la%20localisation%20de%20l%E2%80%99aide%20et%20une%20r%C3%A9ponse%20efficace%20et%20rapide%20aux%20besoins%20critiques%20en%20WASH%20a%20RAFA%C3%8F) | Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse ef… | FH RCA | APSUD, Au Secours (AS), LNPDD, OFAHRD | 2023-11-15 → 2024-11-14 | 600 0OO USD | réalisé |
| [18](https://apsud.org/detail-projet/18/Projet%20d%E2%80%99Appui%20au%20Renforcement%20de%20la%20Soci%C3%A9t%C3%A9%20Civile%20Centrafricaine%20%28PARSOC%29) | Projet d’Appui au Renforcement de la Société Civile Centrafricaine (PARSOC) | UE | APSUD, WHH | 2025-01-01 → 2027-12-31 | 1.700.000£/360.721,61£ | en cours |
| [19](https://apsud.org/detail-projet/19/Autonomisation%20des%20organisations%20nationales%20de%20femmes%20%C3%A0%20travers%20leur%20renforcement%20et%20la%20promotion%20du%20leadership%20humanitaire%20local%20f%C3%A9minin%29) | Autonomisation des organisations nationales de femmes à travers leur renforcement et la… | FH RCA | APSUD | 2025-02-01 → 2026-03-31 | 1.000.000 USD | réalisé |
| [20](https://apsud.org/detail-projet/20/Innovation%20num%C3%A9rique%20contre%20la%20faim%20en%20RCA%20%20Upscale%20AgriApps) | Innovation numérique contre la faim en RCA Upscale AgriApps | BMZ | APSUD, WHH | 2025-03-14 → 2026-12-31 | 159214£ | en cours |

Anomalies relevées sur le site actuel (à corriger lors de la migration) : projet 14 — champ « Bailleur » rempli avec un montant (250,000 USD) et FH placé en « Partenaire » ; budget affiché 430,000 USD (incohérence 250 000 / 430 000 à clarifier) ; bénéficiaires recopiés du projet 13 ; projet 15 — budget saisi « 600 0OO USD » (lettre O) ; projets 18 et 20 — budgets affichés en « £ » alors que les bailleurs sont l'UE et le BMZ (probablement des €) ; projet 11 — code « COVID JAPON » avec bailleur FH. Les pages `/detail-projet/1` à `4`, `12`, `16`, `17`, `21`, `22` renvoient une erreur 500 — **[Contrôle qualité]** mais toute URL sans le titre exact renvoie 500 ; les archives montrent que l’id 2 était le projet Alindao 2023 (FH, partenaire ACF), retiré du site.

## 3. Fiches partenaires

### UK aid (logo « UKaid – from the British people »)

- **Nom officiel** : UK aid – aide publique au développement du Royaume-Uni (Foreign, Commonwealth & Development Office, FCDO ; ex-DFID)
- **Sigle** : UK aid / FCDO — **Type** : gouvernement — **Catégorie** : bailleur
- **Site officiel** : https://www.gov.uk/government/organisations/foreign-commonwealth-development-office
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/ukaid.png` — PNG 3508x3026 — https://apsud.org/admin/assets/img/bailleur/img/1719489299.png
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : #012169
- **Notes** : Bailleur bilatéral britannique. Aucun projet du site ne le cite nommément ; le Royaume-Uni est historiquement contributeur du Fonds humanitaire RCA (lien indirect probable, à confirmer avec APSUD). Depuis avril 2023 le FCDO utilise la marque « UK International Development » ; le logo UK aid reste réservé à certains usages (humanitaire notamment). Couleurs : bleu marine + rouge #C8102E. Le logo source APSUD est déjà en très haute définition (3508 px, PNG transparent) et peut servir de version HD de fait. Le SVG Wikimedia Commons (File:UKaid.svg) n'a pas pu être téléchargé (erreur 429 « Too many requests » persistante) ; le FCDO ne publie pas le fichier en libre téléchargement.

### United Nations CERF – Central Emergency Response Fund

- **Nom officiel** : Fonds central d'intervention pour les urgences humanitaires des Nations Unies (Central Emergency Response Fund)
- **Sigle** : CERF — **Type** : agence ONU — **Catégorie** : bailleur
- **Site officiel** : https://cerf.un.org/
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/cerf.png` — PNG 320x124 — https://apsud.org/admin/assets/img/bailleur/img/1719489325.png
- **Logo HD** : `assets/partenaires/hd/cerf.svg` — SVG vectoriel (viewBox 555.2x130.1) — site officiel cerf.un.org — source : https://cerf.un.org/themes/custom/bootstrap_subtheme_sass/logo.svg
- **Couleur principale** : #498BCA
- **Notes** : Fonds humanitaire mondial de l'ONU géré par OCHA. Aucun projet du site ne le cite ; relation à confirmer (financement possiblement reçu via une agence ONU récipiendaire).

### AU SECOURS – Développement et Humanitaire

- **Nom officiel** : Au Secours (ONG nationale centrafricaine « Développement et Humanitaire » – nom légal complet à confirmer)
- **Sigle** : Au Secours (AS) — **Type** : partenaire de mise en oeuvre — **Catégorie** : partenaire
- **Site officiel** : non identifié
- **Projets APSUD liés** :
  - n° 15 — Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse efficace et rapide aux besoins critiques en WASH a RAFAÏ (ONG nationale co-exécutante / bénéficiaire du coaching APSUD ; 2023-11-15 → 2024-11-14 ; 600 0OO USD ; réalisé)
- **Logo source** : `assets/partenaires/source-apsud/au-secours.png` — PNG 328x319 — https://apsud.org/admin/assets/img/bailleur/img/1719489365.png
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : #006400
- **Notes** : ONG nationale centrafricaine partenaire de mise en œuvre du projet Rafaï (FH RCA, 2023-2024) avec LNPDD et OFAHRD, appuyée par APSUD (leadership humanitaire local). Aucun site officiel ni logo vectoriel trouvé : demander le fichier source directement à l'ONG. Couleurs : vert + rouge #C00000.

### Bêkou – EU Trust Fund for the Central African Republic

- **Nom officiel** : Fonds fiduciaire de l'Union européenne pour la République centrafricaine « Bêkou »
- **Sigle** : Fonds Bêkou — **Type** : bailleur de fonds — **Catégorie** : bailleur
- **Site officiel** : https://international-partnerships.ec.europa.eu/policies/programming/programmes/bekou-trust-fund_en
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/fonds-bekou.jpg` — JPEG 235x90 — https://apsud.org/admin/assets/img/bailleur/img/1719489970.jpg
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : #003399
- **Notes** : Premier fonds fiduciaire multi-bailleurs de l'UE (créé en 2014 avec la France, l'Allemagne et les Pays-Bas ; « bêkou » = espoir en sango). Aucun projet du site ne le cite. Le fonds a vocation temporaire : vérifier qu'il est toujours actif avant de l'afficher comme bailleur actuel. Logo officiel HD non trouvé en téléchargement public (à demander à la Délégation UE en RCA).

### FH RCA – Fonds Humanitaire République centrafricaine

- **Nom officiel** : Fonds humanitaire pour la République centrafricaine (Central African Republic Humanitarian Fund, fonds commun pays CBPF géré par OCHA)
- **Sigle** : FH RCA — **Type** : bailleur de fonds — **Catégorie** : bailleur
- **Site officiel** : https://www.unocha.org/central-african-republic
- **Projets APSUD liés** :
  - n° 6 — Accès urgent, rapide et efficace aux services de base en termes d’eau, assainissement et promotion à l’hygiène pour les hommes, femmes, filles et garçons affectés par la crise dans la ville d'Ippy (bailleur ; 2018-11-01 → 2019-03-30 ; 200 000 USD ; réalisé)
  - n° 7 — Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vulnérables affectées par les crises et forcées à quitter les sites des déplacés internes et à vivre dans les quartiers de retour d'Ippy (bailleur ; 2019-05-15 → 2019-11-14 ; 121 000 USD ; réalisé)
  - n° 8 — Réponse aux besoins urgents des personnes touchées par les conflits à Bambari et Ippy en moyens de subsistance à travers la création d'emploi temporaire et renforcement de la cohésion sociale (bailleur ; 2019-07-01 → 2019-11-30 ; 250 000 USD ; réalisé)
  - n° 9 — Projet d'urgence d'assainissement des sites des personnes déplacées internes de Bambari et Batangafo (bailleur ; 2019-12-01 → 2020-05-31 ; 200 000 USD ; réalisé)
  - n° 10 — Réponse urgente en Eau, Hygiène et Assainissement pour sauver des vies et lutter contre la propagation du COVID 19 dans les sites des personnes déplacés internes de Bambari; de Batangafo et dans la ville de Bimbo (bailleur ; 2020-06-01 → 2020-10-31 ; 300 000 USD ; réalisé)
  - n° 11 — Projet d’urgence en hygiène et assainissement à Bangui et Bambari en faveur des personnes les plus vulnérables pour répondre aux besoins humanitaires les plus critiques et freiner la propagation du COVID 19. (bailleur ; 2020-08-01 → 2021-01-31 ; 100 000 USD ; réalisé)
  - n° 13 — Accès urgent à des opportunités économiques et des moyens de subsistance aux personnes touchées par la crise pour la stabilisation des communautés affectées par le conflit à Maloum. (bailleur ; 2018-12-01 → 2019-07-31 ; 250,000 USD ; réalisé)
  - n° 14 — Réponse d'urgence en eau, hygiène et assainissement en faveur des personnes les plus vulnérables affectées par les crises à Boguila et ses environs dans la préfecture de l'Ouham (bailleur ; 2021-06-01 → 2022-03-31 ; 430,000 USD ; réalisé)
  - n° 15 — Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse efficace et rapide aux besoins critiques en WASH a RAFAÏ (bailleur ; 2023-11-15 → 2024-11-14 ; 600 0OO USD ; réalisé)
  - n° 19 — Autonomisation des organisations nationales de femmes à travers leur renforcement et la promotion du leadership humanitaire local féminin) (bailleur ; 2025-02-01 → 2026-03-31 ; 1.000.000 USD ; réalisé)
- **Logo source** : `assets/partenaires/source-apsud/fh-rca.png` — PNG 559x106 — https://apsud.org/admin/assets/img/bailleur/img/1719490026.png
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : #4A8BC9
- **Notes** : PRINCIPAL BAILLEUR d'APSUD : 10 des 13 projets publiés (2018-2026). Fonds commun géré par OCHA sous l'autorité du Coordonnateur humanitaire ; alimenté par plusieurs États (dont Royaume-Uni, Suède, Allemagne, etc.). Projet 14 : sur le site, les champs « Bailleur » et « Partenaire » sont inversés (FH figure en partenaire) — corrigé ici. Projet 11 : code « COVID JAPON » (contribution japonaise transitant probablement par le FH, à confirmer). Pas de logo HD officiel public trouvé ; le logo source (559x106) est utilisable en bandeau. Couleur estimée visuellement.

### Gavi – L'Alliance du Vaccin

- **Nom officiel** : Gavi, l'Alliance du Vaccin (Gavi, the Vaccine Alliance)
- **Sigle** : Gavi — **Type** : bailleur de fonds — **Catégorie** : bailleur
- **Site officiel** : https://www.gavi.org/fr
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/gavi.png` — PNG 394x158 — https://apsud.org/admin/assets/img/bailleur/img/1719490060.png
- **Logo HD** : `assets/partenaires/hd/gavi.png` — PNG 360x136 — site officiel gavi.org — source : https://www.gavi.org/sites/default/files/Gavi-logo_1b.png — ⚠ ne remplit pas pleinement les critères HD
- **Couleur principale** : #0050B0
- **Notes** : Partenariat public-privé international pour la vaccination. Aucun projet du site ne le cite ; relation à documenter (appui OSC ?). Selon les guides de Gavi, l'usage de son logo par un partenaire OSC nécessite un accord préalable. Seul fichier officiel public : PNG 360 px anglais (sous le seuil de 400 px) ; version française HD à demander à media@gavi.org. Couleurs relevées sur le logo officiel : bleu ≈ #0050B0, vert ≈ #90D000, cyan ≈ #00A0D0.

### MINUSCA

- **Nom officiel** : Mission multidimensionnelle intégrée des Nations Unies pour la stabilisation en République centrafricaine
- **Sigle** : MINUSCA — **Type** : agence ONU — **Catégorie** : partenaire
- **Site officiel** : https://minusca.unmissions.org/
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/minusca.jpg` — JPEG 117x90 — https://apsud.org/admin/assets/img/bailleur/img/1719490080.jpg
- **Logo HD** : `assets/partenaires/hd/minusca-embleme-onu.svg` — SVG vectoriel (viewBox 470x400) — Wikimedia Commons (File:UN emblem blue.svg) – emblème seul — source : https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg — ⚠ ne remplit pas pleinement les critères HD
- **Couleur principale** : #009EDB
- **Notes** : Mission de maintien de la paix de l'ONU. Aucun projet du site ne la cite (projets à impact rapide / réduction de la violence communautaire possibles — à confirmer). Pas de lockup « emblème + MINUSCA » vectoriel public trouvé : fichier HD fourni = emblème ONU seul (Commons) — NE PAS l'utiliser seul pour représenter la MINUSCA ; l'emblème ONU est protégé et son usage par des tiers exige une autorisation.

### ONU Femmes

- **Nom officiel** : Entité des Nations Unies pour l'égalité des sexes et l'autonomisation des femmes (ONU Femmes / UN Women)
- **Sigle** : ONU Femmes — **Type** : agence ONU — **Catégorie** : partenaire
- **Site officiel** : https://www.unwomen.org/fr
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/onu-femmes.png` — PNG 50x23 — https://apsud.org/admin/assets/img/bailleur/img/1719490097.png
- **Logo HD** : `assets/partenaires/hd/onu-femmes-fr.png` — PNG 293x47 — site officiel unwomen.org – lockup FR 2025 (293 px, sous le seuil) — source : https://www.unwomen.org/sites/default/files/2025-07/for_all_women_and_girls-lockup-full_color-fr.png — ⚠ ne remplit pas pleinement les critères HD
- **Couleur principale** : #009EDB
- **Notes** : Aucun projet du site ne la cite ; lien thématique avec le projet 19 (organisations de femmes, financé par le FH RCA). Le logo source APSUD est minuscule (50x23) : à remplacer impérativement. Le nom et l'emblème sont propriété exclusive d'ONU Femmes (autorisation requise). Seul fichier officiel FR obtenu : lockup 2025 « Pour toutes les femmes et les filles » en 293 px (insuffisant). Le SVG Commons (File:UN WOMEN Logo.svg, anglais) n'a pas pu être téléchargé (429) ; à récupérer manuellement ou à demander à ONU Femmes.

### Oxfam

- **Nom officiel** : Oxfam International (confédération ; présente en RCA via Oxfam Intermón / affiliés)
- **Sigle** : Oxfam — **Type** : ONG internationale — **Catégorie** : partenaire
- **Site officiel** : https://www.oxfam.org/fr
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/oxfam.png` — PNG 50x53 — https://apsud.org/admin/assets/img/bailleur/img/1719490111.png
- **Logo HD** : `assets/partenaires/hd/oxfam.svg` — SVG vectoriel (viewBox 180x66) — site officiel oxfam.org — source : https://www.oxfam.org/fr (SVG inline de l'en-tête du site)
- **Couleur principale** : #44841A
- **Notes** : Aucun projet du site ne la cite (partenariat de mise en œuvre / sous-subvention probable, à confirmer). Fichier HD = SVG officiel extrait de l'en-tête oxfam.org (avec la mention « International »). Logo source APSUD minuscule (50x53).

### PNUD

- **Nom officiel** : Programme des Nations Unies pour le développement
- **Sigle** : PNUD (UNDP) — **Type** : agence ONU — **Catégorie** : partenaire
- **Site officiel** : https://www.undp.org/fr/central-african-republic
- **Projets APSUD liés** :
  - n° 5 — Appui à la résilience et au redressement socio-économique des communautés affectées par la pandémie de la COVID-19 (partenaire de mise en oeuvre (canal du financement japonais) ; 2021-07-01 → 2022-03-31 ; 665 718 USD ; réalisé)
- **Logo source** : `assets/partenaires/source-apsud/pnud.png` — PNG 50x52 — https://apsud.org/admin/assets/img/bailleur/img/1719490163.png
- **Logo HD** : `assets/partenaires/hd/pnud-undp-en.svg` — SVG vectoriel (viewBox 237.594x482.191) — Wikimedia Commons (File:UNDP logo.svg) – version anglaise — source : https://upload.wikimedia.org/wikipedia/commons/9/9f/UNDP_logo.svg
- **Couleur principale** : #0468B1
- **Notes** : Projet 5 (2021-2022, 665 718 USD) : financé par le Japon, mis en œuvre via le PNUD (APSUD partenaire d'exécution). Logo source APSUD minuscule (50x52). undp.org bloque les téléchargements automatisés (403). Le SVG français (Commons File:PNUD logo.svg) n'a pas pu être téléchargé (429) : le fichier HD retenu est la version anglaise UNDP ; récupérer manuellement la version FR : https://commons.wikimedia.org/wiki/File:PNUD_logo.svg

### Sida

- **Nom officiel** : Agence suédoise de coopération internationale au développement (Styrelsen för internationellt utvecklingssamarbete)
- **Sigle** : Sida (Asdi en français) — **Type** : gouvernement — **Catégorie** : bailleur
- **Site officiel** : https://www.sida.se/en
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/sida.png` — PNG 106x41 — https://apsud.org/admin/assets/img/bailleur/img/1719490219.png
- **Logo HD** : `assets/partenaires/hd/sida.png` — PNG 1296x1296 — site officiel sida.se (PNG carré 1296 px, marges importantes) — source : https://cdn.sida.se/app/uploads/2020/12/17144010/Sida_logo_color_neutral.png
- **Couleur principale** : #003C78
- **Notes** : Bailleur bilatéral suédois. Aucun projet du site ne le cite ; la Suède est contributrice du FH RCA (lien indirect probable). Sida publie ses logos (dont la variante « Asdi » pour le français) sur sida.se/en/about-sida/press/sidas-logotype ; leur usage par un partenaire est encadré par Sida. Couleurs : bleu foncé + jaune #F0B000 (estimées). Fichier HD retenu : PNG officiel sida.se (carré avec grandes marges : à recadrer pour un bandeau) ; le SVG Commons n'a pas pu être téléchargé (429).

### unicef – pour chaque enfant

- **Nom officiel** : Fonds des Nations Unies pour l'enfance
- **Sigle** : UNICEF — **Type** : agence ONU — **Catégorie** : partenaire
- **Site officiel** : https://www.unicef.org/car/fr
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/unicef.png` — PNG 354x218 — https://apsud.org/admin/assets/img/bailleur/img/1719490245.png
- **Logo HD** : `assets/partenaires/hd/unicef.svg` — SVG vectoriel (viewBox 130.9x31.5) — Wikimedia Commons (File:Logo of UNICEF.svg) — source : https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_UNICEF.svg
  - variante : `assets/partenaires/hd/unicef-fr-blanc.png` — PNG 1676x176 — site officiel unicef.org – version FR blanche
- **Couleur principale** : #1CABE2
- **Notes** : Aucun projet du site ne le cite ; relation probable dans le secteur WASH (chef de file du cluster WASH) — à confirmer (pourrait relever de la catégorie bailleur). Fichier HD principal : logotype anglais (Commons) ; variante officielle FR « pour chaque enfant » en blanc (1676 px) pour fonds sombres.

### UNOPS

- **Nom officiel** : Bureau des Nations Unies pour les services d'appui aux projets
- **Sigle** : UNOPS — **Type** : agence ONU — **Catégorie** : partenaire
- **Site officiel** : https://www.unops.org/fr
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/unops.jpg` — JPEG 243x243 — https://apsud.org/admin/assets/img/bailleur/img/1719490292.jpg
- **Logo HD** : `assets/partenaires/hd/unops.svg` — SVG vectoriel (viewBox 503x74) — site officiel unops.org — source : https://www.unops.org/fr (SVG inline de l'en-tête, recoloré #0092D1)
- **Couleur principale** : #0092D1
- **Notes** : Aucun projet du site ne le cite ; relation à confirmer. Fichier HD = SVG officiel extrait de l'en-tête unops.org (version blanche) recoloré en bleu UNOPS #0092D1 (couleur relevée sur le même site).

### USAID – From the American People

- **Nom officiel** : United States Agency for International Development (Agence des États-Unis pour le développement international)
- **Sigle** : USAID — **Type** : gouvernement — **Catégorie** : bailleur
- **Site officiel** : https://www.usaid.gov
- **Projets APSUD liés** : aucun publié sur le site (relation à documenter)
- **Logo source** : `assets/partenaires/source-apsud/usaid.jpg` — JPEG 518x200 — https://apsud.org/admin/assets/img/bailleur/img/1719490319.jpg
- **Logo HD** : `assets/partenaires/hd/usaid.svg` — SVG vectoriel (viewBox 239.54x71.637) — Wikimedia Commons (File:USAID-Identity.svg) — source : https://upload.wikimedia.org/wikipedia/commons/1/17/USAID-Identity.svg
- **Couleur principale** : #002F6C
- **Notes** : ATTENTION : USAID a été démantelée en 2025 (programmes transférés au Département d'État) ; à présenter comme partenaire HISTORIQUE, ou retirer selon la décision d'APSUD. Aucun projet du site ne la cite (les États-Unis ont été contributeurs du FH RCA). Couleurs : bleu #002F6C + rouge #BA0C2F.

### Union Européenne (UE)

- **Nom officiel** : Union européenne – Commission européenne (DG Partenariats internationaux / Délégation de l'UE en RCA)
- **Sigle** : UE — **Type** : bailleur de fonds — **Catégorie** : bailleur
- **Site officiel** : https://international-partnerships.ec.europa.eu/
- **Projets APSUD liés** :
  - n° 18 — Projet d’Appui au Renforcement de la Société Civile Centrafricaine (PARSOC) (bailleur ; 2025-01-01 → 2027-12-31 ; 1.700.000£/360.721,61£ ; en cours)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : `assets/partenaires/hd/union-europeenne.png` — PNG 4079x919 — site officiel ec.europa.eu – « Financé par l'Union européenne » — source : https://ec.europa.eu/regional_policy/sources/information-sources/logo-download-center/funded_fr.zip (FR_FundedbytheEU_RGB_POS.png)
  - variante : `assets/partenaires/hd/union-europeenne-monochrome.png` — PNG 4079x920 — site officiel ec.europa.eu – monochrome
- **Couleur principale** : #003399
- **Notes** : Bailleur du projet PARSOC (2025-2027), mis en œuvre par Welthungerhilfe avec APSUD. Pas de logo sur apsud.org. Règle UE : emblème + mention « Financé par l'Union européenne » en toutes lettres, sans autre logo pour souligner le soutien UE. Fichiers officiels FR (Commission, centre de téléchargement, période 2021-2027) : version couleur et version « monochrome » (tout en bleu UE, pas en gris). Le kit complet (EPS, version négative/blanche, verticale) est dans funded_fr.zip. Jaune #FFCC00.

### BMZ

- **Nom officiel** : Ministère fédéral allemand de la Coopération économique et du Développement (Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung)
- **Sigle** : BMZ — **Type** : gouvernement — **Catégorie** : bailleur
- **Site officiel** : https://www.bmz.de/en
- **Projets APSUD liés** :
  - n° 20 — Innovation numérique contre la faim en RCA Upscale AgriApps (bailleur ; 2025-03-14 → 2026-12-31 ; 159214£ ; en cours)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : `assets/partenaires/hd/bmz.svg` — SVG vectoriel (viewBox 200.8x81) — site officiel bmz.de — source : https://www.bmz.de/en (SVG inline de l'en-tête)
- **Couleur principale** : #000000
- **Notes** : Bailleur du projet Upscale AgriApps (2025-2026), mis en œuvre par Welthungerhilfe avec APSUD. Pas de logo sur apsud.org. Fichier HD = SVG officiel (version anglaise) extrait de l'en-tête bmz.de ; couleurs noir/rouge/or du drapeau allemand. L'usage du logo par des tiers est soumis aux règles de visibilité du BMZ (souvent via l'agence d'exécution).

### ONG International Deutsche Welthungerhilfe e.V. (WHH)

- **Nom officiel** : Deutsche Welthungerhilfe e.V.
- **Sigle** : WHH — **Type** : ONG internationale — **Catégorie** : partenaire
- **Site officiel** : https://www.welthungerhilfe.org/
- **Projets APSUD liés** :
  - n° 18 — Projet d’Appui au Renforcement de la Société Civile Centrafricaine (PARSOC) (partenaire de mise en oeuvre (chef de file) ; 2025-01-01 → 2027-12-31 ; 1.700.000£/360.721,61£ ; en cours)
  - n° 20 — Innovation numérique contre la faim en RCA Upscale AgriApps (partenaire de mise en oeuvre (chef de file) ; 2025-03-14 → 2026-12-31 ; 159214£ ; en cours)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : `assets/partenaires/hd/welthungerhilfe.png` — PNG 1808x858 — site officiel welthungerhilfe.org – logo international — source : https://www.welthungerhilfe.org/_assets/ed2041af020e608b722ad1400d905e46/Icons/whh_international_2_1.png
- **Couleur principale** : #20A010
- **Notes** : ONG allemande, partenaire de mise en œuvre (chef de file) des deux projets en cours financés par l'UE et le BMZ. Pas de logo sur apsud.org — à AJOUTER au bandeau (partenaire actuel majeur). Fichier HD = PNG officiel welthungerhilfe.org (logo international, 1808 px) ; le SVG Commons n'a pas pu être téléchargé (429).

### Japon

- **Nom officiel** : Gouvernement du Japon (aide publique au développement – ministère des Affaires étrangères)
- **Sigle** : Japon / ODA — **Type** : gouvernement — **Catégorie** : bailleur
- **Site officiel** : https://www.mofa.go.jp/policy/oda/
- **Projets APSUD liés** :
  - n° 5 — Appui à la résilience et au redressement socio-économique des communautés affectées par la pandémie de la COVID-19 (bailleur (via le PNUD) ; 2021-07-01 → 2022-03-31 ; 665 718 USD ; réalisé)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : #BC002D
- **Notes** : Bailleur du projet 5 (relèvement COVID-19, 3e arrondissement de Bangui) via le PNUD ; **[Contrôle qualité]** le projet 11 (« COVID JAPON ») est en fait financé par le FH (CHF) d’après le tableau publié par APSUD en 2023 ; en revanche le Japon a financé 4 autres projets via le PNUD (2017-2019). Un drapeau japonais servait de logo sur l’ancien site (`assets/partenaires/archives-apsud/japon-drapeau.jpg`). Pas de logo sur apsud.org. Le logo ODA japonais (« From the People of Japan ») n'est pas proposé en téléchargement public : à demander à l'ambassade du Japon compétente pour la RCA ou au PNUD.

### LNPDD

- **Nom officiel** : LNPDD (ONG nationale centrafricaine – nom complet non publié sur apsud.org)
- **Sigle** : LNPDD — **Type** : partenaire de mise en oeuvre — **Catégorie** : partenaire
- **Site officiel** : non identifié
- **Projets APSUD liés** :
  - n° 15 — Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse efficace et rapide aux besoins critiques en WASH a RAFAÏ (ONG nationale co-exécutante / bénéficiaire du coaching APSUD ; 2023-11-15 → 2024-11-14 ; 600 0OO USD ; réalisé)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : inconnue
- **Notes** : Citée uniquement dans le projet 15 (Rafaï). Nom développé, site et logo inconnus : à demander à APSUD.

### OFAHRD

- **Nom officiel** : OFAHRD (ONG nationale centrafricaine – nom complet non publié sur apsud.org)
- **Sigle** : OFAHRD — **Type** : partenaire de mise en oeuvre — **Catégorie** : partenaire
- **Site officiel** : non identifié
- **Projets APSUD liés** :
  - n° 15 — Leadership Humanitaire local pour renforcer la localisation de l’aide et une réponse efficace et rapide aux besoins critiques en WASH a RAFAÏ (ONG nationale co-exécutante / bénéficiaire du coaching APSUD ; 2023-11-15 → 2024-11-14 ; 600 0OO USD ; réalisé)
- **Logo source** : aucun sur apsud.org
- **Logo HD** : aucune version officielle HD fiable trouvée
- **Couleur principale** : inconnue
- **Notes** : Citée uniquement dans le projet 15 (Rafaï). Nom développé, site et logo inconnus : à demander à APSUD.

## 4. Règles d'usage des logos sur le nouveau site

### 4.1 Principes juridiques et de charte

- **Ne jamais modifier un logo** : pas de recoloration (hors version monochrome prévue ci-dessous), pas de déformation (toujours `object-fit: contain`, proportions conservées), pas d'ombre, de contour, de rotation, ni de recadrage du texte ou de l'emblème.
- **Utiliser la langue d'origine du partenaire** quand elle existe en français (PNUD plutôt qu'UNDP, ONU Femmes, « Financé par l'Union européenne », Gavi « L'Alliance du Vaccin », UNICEF « pour chaque enfant »).
- **Emblèmes protégés** : l'emblème des Nations Unies (MINUSCA, PNUD, UNOPS, UNICEF, ONU Femmes, CERF) et le nom/emblème d'ONU Femmes sont protégés ; leur affichage par un tiers suppose l'accord de l'organisation. Afficher uniquement les logos des organisations avec lesquelles APSUD a une relation contractuelle réelle et, idéalement, **obtenir une validation écrite** (courriel) de chaque partenaire avant la mise en ligne.
- **Union européenne** : emblème + mention « Financé par l'Union européenne » en toutes lettres ; pas d'autre logo pour souligner le soutien de l'UE ; l'emblème doit avoir une taille au moins équivalente au plus grand des autres logos sur les pages des projets financés par l'UE (PARSOC).
- **Gavi, Sida, BMZ, UK aid** : leurs guides imposent une autorisation préalable ou des règles de visibilité propres (UK aid : logo conservé pour l'humanitaire, marque « UK International Development » depuis 2023 ; BMZ : souvent via l'agence d'exécution, ici WHH).
- **USAID** : agence démantelée en 2025 — n'afficher qu'en tant que partenaire historique (ou retirer), jamais comme bailleur actuel.
- **Vérifier l'actualité** des relations (Fonds Bêkou, USAID, MINUSCA, etc.) avant publication ; distinguer « bailleurs actuels » et « partenaires historiques » si nécessaire.

### 4.2 Zones de protection et tailles

- **Zone de protection** : marge libre minimale autour de chaque logo égale à la hauteur de l'emblème ou, à défaut, à la hauteur des capitales du logotype (règle générique la plus courante ; UE : marge d'au moins la moitié de la hauteur de l'emblème). En CSS : chaque logo est centré dans une « tuile » au padding généreux (≈ 20-25 % de la hauteur de tuile).
- **Normalisation optique** : les logos n'ont pas tous le même rapport largeur/hauteur. Les placer dans des tuiles de même taille (p. ex. 200 × 100 px en desktop, 140 × 72 px en mobile) avec `max-width: 100%; max-height: 100%; object-fit: contain`, puis ajuster au cas par cas (`--logo-scale`) les logos très carrés (UK aid, Au Secours, UNOPS, Sida carré) pour éviter qu'ils paraissent plus lourds que les logotypes horizontaux.
- **Taille minimale** : ne jamais afficher un logo à moins de 24 px de haut (emblème ONU lisible) ; l'emblème UE ≥ 1 cm / ~38 px de haut en web.
- **Fond** : fond blanc ou très clair pour les versions couleur ; utiliser les variantes blanches officielles (UNICEF FR blanc, UE négatif disponible dans le kit) sur fond vert APSUD ou sombre.
- **Formats** : servir le SVG quand il existe ; sinon PNG transparent ≥ 2× la taille d'affichage (retina). Ne pas utiliser les fichiers `source-apsud` de moins de 200 px de large (ONU Femmes 50 px, Oxfam 50 px, PNUD 50 px, Sida 106 px, MINUSCA 117 px) : ils seront flous.

### 4.3 Bandeau de logos en niveaux de gris (couleur au survol)

Inspiré des bandeaux de partenaires sobres type Prosper Global : logos homogènes, neutres, qui reprennent leur couleur à l'interaction.

```css
.partners-strip img {
  filter: grayscale(1) contrast(.9);
  opacity: .65;
  transition: filter .25s ease, opacity .25s ease;
}
.partners-strip a:hover img,
.partners-strip a:focus-visible img {
  filter: none;
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) { .partners-strip img { transition: none; } }
@media (hover: none) { .partners-strip img { filter: none; opacity: 1; } } /* mobile : couleur d'origine */
```

- Le passage en niveaux de gris est une **désaturation uniforme appliquée à l'ensemble du bandeau**, pas une modification du logo d'un partenaire ; elle est communément admise, mais **la couleur d'origine doit apparaître au survol/focus et sur la fiche détaillée**. Pour le logo de l'UE sur les pages de projets financés par l'UE, garder la **couleur en permanence** (pas de grisé).
- Quand le partenaire fournit une **version monochrome officielle**, la préférer au filtre CSS pour les usages unicolores (impression, fond vert APSUD). Attention : la « monochrome » UE fournie (`union-europeenne-monochrome.png`) est tout en bleu UE, pas en gris ; pour le bandeau gris, le filtre CSS reste la solution la plus simple.
- Accessibilité : chaque logo est un lien vers le site officiel (ou la fiche partenaire) avec `alt` = nom officiel court (ex. « PNUD – Programme des Nations Unies pour le développement ») ; `rel="noopener"` sur les liens externes ; ordre de tabulation logique ; contraste du focus visible (anneau vert APSUD).
- Ordre recommandé : 1) bailleurs actuels (FH RCA, UE, BMZ, partenaire de mise en œuvre WHH), 2) autres bailleurs, 3) agences ONU et ONG partenaires, 4) ONG nationales partenaires. Possibilité de filtrer « Bailleurs / Partenaires » sur la page dédiée.

## 5. Manques et actions à mener avec APSUD

1. **Valider la liste** et la nature de chaque relation (bailleur direct, bailleur via FH RCA, partenaire technique, partenaire de mise en œuvre), surtout pour les 11 logos sans projet documenté.
2. **Ajouter au bandeau** les bailleurs/partenaires actuels absents : Union européenne, BMZ, Welthungerhilfe (et Japon si souhaité).
3. **Obtenir les fichiers officiels manquants** : Au Secours, LNPDD, OFAHRD (directement auprès des ONG) ; logo FH RCA / OCHA (bureau OCHA Bangui) ; Fonds Bêkou (Délégation UE) ; Gavi FR HD (media@gavi.org) ; lockup MINUSCA (division communication MINUSCA) ; logo ODA du Japon (ambassade / PNUD).
4. Recueillir l'**accord écrit** des partenaires pour l'usage de leur logo sur le nouveau site.
5. Corriger les anomalies de saisie des fiches projets (voir § 2).

## 6. Compléments du contrôle qualité (21/11/2026)

> Ajouté par le contrôle qualité à partir des **anciennes versions de apsud.org** (Wayback Machine, 2018-2024). `partenaires.json` passe de 20 à **36 entrées**. Chaque entrée concernée porte désormais `projets_historiques` (lignes du tableau de 60 projets publié en 2023) et `relation_documentee_archives`.

### 6.1 Relations désormais documentées
Sur les 11 logos « sans relation documentée », **9 sont documentés par le tableau 2023** : Oxfam (17 projets), UNOPS (9), MINUSCA (8, réduction de la violence communautaire avec UNOPS), Sida (2, via Oxfam), Fonds Bêkou (2, via Oxfam et ACTED), ONU Femmes (2), USAID/OFDA (2, via Oxfam), CERF et UNICEF (1 : eau et hygiène dans les FOSA d’Ippy). **Restent non documentés : UK aid et Gavi** (à confirmer ou retirer). PNUD : 11 projets ; FH RCA : 15 lignes (dont via NRC, ACF, Oxfam).

### 6.2 Partenaires ajoutés (absents du site actuel)
| Partenaire | Rôle (archives) | Logo récupéré |
|---|---|---|
| ACTED | 1 projet Fonds Bêkou (2017-2018) ; logo sur les sites 2021 et 2023 | `archives-apsud/acted.jpg` (351 px) |
| ACF – Action contre la Faim | partenaire du projet Alindao 2023 (FH) | `hd/action-contre-la-faim.svg` (Commons) |
| NRC | 2 projets FH 2022-2023 (Basse-Kotto) | non (Commons 429) |
| DRC | 1 projet ECHO (protection 2016-2017) ; logo sur le site 2018 | non |
| OIM | 2 projets (Bozoum, transhumance) | non |
| FAO | 3 projets (2016-2019) ; logo sur le site 2018 | `hd/fao.svg` (Commons, emblème protégé) |
| UNFPA | 2 projets UNFPA/PBF (2020-2021) | `hd/unfpa.svg` (Commons, version anglaise) |
| PBF (Fonds pour la consolidation de la paix) | bailleur des projets UNFPA | non |
| ECHO (UE, aide humanitaire) | 5 projets 2015-2017 (via Oxfam, DRC) | non (kit de visibilité ECHO) |
| PAM | 2 projets de coupons via Oxfam | `hd/pam-wfp.svg` (Commons, emblème) |
| AFD | cité parmi les bailleurs via Oxfam | `hd/afd.svg` (Commons) |
| Irish Aid, Affaires mondiales Canada (DFATD), Inditex, AECID | 1 projet chacun via Oxfam (2015-2018) | non |
| Fonds des Nations unies pour la sécurité humaine (déduit) | « PNUD / Sécurité humaine », 2 projets | non |

### 6.3 Logos de l’ancien site (`assets/partenaires/archives-apsud/`)
10 logos JPEG (environ 351 × 127 px) récupérés : ACTED, FH RCA bilingue (428 × 118, moins défini que l’actuel en 559 × 106), Japon (drapeau), MINUSCA, ONU Femmes (variante « Centre de formation » : **ne pas réutiliser**), Oxfam, Sida, UE (drapeau seul : non conforme), UNOPS, USAID (OFDA). Tous vérifiés (vrais JPEG complets). Ils servent de référence, pas de fichiers de production.

### 6.4 Actions supplémentaires avec APSUD
1. Choisir quels partenaires historiques afficher (recommandation : bandeau « Ils nous ont fait confiance depuis 2015 » avec les 12 à 15 principaux).
2. Confirmer ou retirer **UK aid** et **Gavi**.
3. Télécharger manuellement (Commons limité en 429) : NRC (`File:Norwegian_Refugee_council_english_logo.svg`), DRC (`File:Dansk_Flygtningehjælp_-_logo_(2016).png`), OIM, PBF, ECHO, Irish Aid, Affaires mondiales Canada (`File:Global_Affairs_Canada.svg`).
