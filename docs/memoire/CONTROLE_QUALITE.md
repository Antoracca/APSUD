# Contrôle qualité des données APSUD

> Contrôle de complétude **adversarial** mené le 21/11/2026 sur les données extraites par les agents « contenu » et « partenaires ».
> Méthode : recrawl indépendant de https://apsud.org, comparaison automatique champ par champ avec `data/apsud/*.json`, vérification binaire de chaque fichier de `assets/`, puis fouille des **anciennes versions du site** dans la Wayback Machine (index CDX de apsud.org, 2018 → 2025).
> Fichiers bruts : `scratchpad/raw/apsud-controle/` (pages actuelles, 85 pages archivées, logos et photos d’archives, textes extraits).

**Verdict en une phrase** : les données du **site actuel** ont été extraites fidèlement et complètement, mais les deux agents sont passés à côté des **anciennes versions du site**, qui contiennent un projet supprimé, 16 partenaires absents, un tableau de 60 projets, des coordonnées bancaires et un chiffre clé publié par APSUD. Ces éléments ont été ajoutés et sont **tous marqués « à valider »**.

---

## 1. Ce qui a été vérifié

| Contrôle | Résultat |
|---|---|
| Recrawl des 7 pages (/, /home, /A_propos, /liste_projets, /Nos_partenaires, /Contactez_nous, /Faire_un_Don) | Texte identique octet pour octet aux captures des agents : aucun changement depuis l’extraction. |
| Liens internes découverts | Seuls liens internes : les 6 pages du menu, 13 fiches projet, /login, webmail. Pas de pagination (liste unique de 13 projets). |
| 13 fiches projet (ids 5-11, 13-15, 18-20), comparées ligne à ligne | **Conformes** : code, dates, zone, budget, bénéficiaires et toutes les lignes d’objectifs, de résultats et d’activités figurent dans `projets.json`. |
| Sondage des ids 0 à 50 | Le site exige le **titre exact** dans l’URL : `/detail-projet/5/x` renvoie 500 alors que le projet 5 existe. La conclusion des agents (« les ids 1-4, 12, 16, 17 n’existent plus ») n’était donc pas démontrable par ce moyen. Les archives tranchent pour 2, 3 et 4 (voir § 2.1). |
| Images du site actuel (80 URL dans le HTML) | Les 57 images de contenu sont toutes cataloguées dans `images.json` ; la seule URL non cataloguée est le slide 2 vide du projet 15 (déjà signalé). |
| Validité des fichiers (`file` + marqueur de fin JPEG `FFD9` / PNG `IEND` / balise `</svg>`) | **107 fichiers d’`assets/` : 0 HTML déguisé, 0 fichier tronqué, 0 fichier de moins de 2 Ko.** Le contrôle du marqueur de fin a été ajouté parce que la Wayback Machine livre souvent des JPEG tronqués que `file` déclare valides (10 cas écartés). |
| 14 logos partenaires du site | Identiques (mêmes 14 URL) à ceux de `partenaires.json`, et identiques à la version archivée d’août 2024. |
| JSON | Les 5 fichiers sont valides (`JSON.parse` avec node). |
| Chemins cités dans les JSON | 160 chemins `assets/…` vérifiés : **0 chemin cassé**. |
| Contact et don (site actuel) | Conformes à `organisation.json` ; les manques déjà signalés (horaires, carte, modalités de don) sont confirmés. |

## 2. Ce qui manquait et a été corrigé

### 2.1 Projet manquant
- **Projet id 2 — Assistance d’urgence en eau, assainissement et hygiène pour les populations déplacées d’Alindao** : FH, partenaire de mise en œuvre ACF, 55 769,81 USD, 01/02/2023 → 31/07/2023, 13 172 bénéficiaires. Il était publié en août 2024 puis a été retiré.
  → **Ajouté à `projets.json`** avec `publie_sur_site_actuel: false` (`nb_projets` : 14, `nb_projets_site_actuel` : 13).
- Les anciens ids 3 et 4 étaient des premières saisies des projets 5 et 7 (doublons, pas des projets perdus).

### 2.2 Historique complet : 60 projets (2015-2023)
- Le site WordPress de 2023 publiait un **tableau de 60 projets** avec budget, bailleur, durée et zone, et l’accroche « **De 2016 à février 2023, APSUD a réalisé plus de 60 projets** ».
  → **Nouveau fichier `data/apsud/projets_historiques.json`** : 60 lignes normalisées (sigles des bailleurs, devise, années, domaines déduits), liens vers les 9 projets actuels correspondants, détail des activités de 10 projets 2016-2017 (site 2018) et de 3 projets 2020 (site 2021), synthèse des contrats par partenaire.
- Écarts relevés entre l’historique et le site actuel (consignés dans `controle_qualite` de chaque projet) :
  - **Projet 11** : financé par le **FH**, pas par le Japon. Le code « COVID JAPON » était trompeur. `organisation.json` (bailleurs cités) est corrigé.
  - **Projet 14** : budget confirmé à **430 000 USD** ; le « 250,000 USD » du champ Bailleur est une erreur de saisie.
  - **Projet 8** : l’objectif général, vide sur le site, est **complété** depuis la fiche 2023.
  - **Dates divergentes** à faire trancher par APSUD pour les projets 5, 6, 8 et 13.

### 2.3 Partenaires manquants (20 → 36)
- **16 partenaires ajoutés** à `partenaires.json`, tous documentés par les archives : ACTED, ACF, NRC, DRC, OIM, FAO, UNFPA, PBF, ECHO, PAM, AFD, Irish Aid, Affaires mondiales Canada (DFATD), Inditex, AECID et le Fonds des Nations unies pour la sécurité humaine (identification déduite).
- Sur les 11 logos affichés « sans relation documentée », **9 sont désormais documentés** (champ `projets_historiques`). Restent sans preuve : **UK aid** et **Gavi**.
- **Logos ajoutés** :
  - `assets/partenaires/archives-apsud/` : 10 logos de l’ancien site, dont un bandeau FH RCA bilingue (428 px, moins défini que l’actuel) et le drapeau qui servait de logo au Japon.
  - `assets/partenaires/hd/` : 5 SVG issus de Wikimedia Commons (FAO, UNFPA, PAM, ACF, AFD), tous valides.

### 2.4 Organisation, contact, don
- Ajouts dans `organisation.json` :
  - `objectifs_specifiques` : les 5 objectifs publiés en 2018 et 2021.
  - `chiffres_cles.publies_sur_anciens_sites` : « 60+ projets », premier projet en 2015, environ 4,2 M USD sur les seules lignes libellées en USD.
  - `zones_intervention.declarees_site_2023` : 10 préfectures plus Bangui.
  - `contact.historique` : ancien siège avenue David Dacko, pont Saint-Charles (2e arrondissement). La **BP 462** est confirmée par deux sources écrites. Anciens téléphones et ong.apsud@yahoo.fr.
  - `identite.equipe_archives` : un chargé de communication était publié en 2024.
  - `don.coordonnees_bancaires_archives` : deux RIB/IBAN publiés en 2022 (BPMC) et en 2023 (BGFIBank), avec un avertissement : **NE PAS PUBLIER sans confirmation écrite**.
  - `donnees_archives` : les 4 versions successives du site, la compromission de 2024 et la contrainte de routage des fiches.
- **Sécurité** : en 2024, plus de 100 pages de spam (casino, immobilier) étaient servies sous `apsud.org/apsud/`, signe d’un WordPress piraté. Vérifié le 21/11/2026 : `/apsud/` redirige et les pages testées renvoient 404. Il reste à purger l’index Google et à changer les accès d’hébergement.

### 2.5 Images de contenu non téléchargées
- 5 images ajoutées dans `assets/apsud/images/archives/` et dans `images.json` (62 images, catégorie `archives`) :
  - L’ancien slide d’accueil **ap.JPG**, toujours sur le serveur : 2568 × 1581, équipe APSUD « Stop Covid-19 », un très bon candidat pour le hero ou la page À propos.
  - 4 photos de terrain de 2020 retrouvées dans les archives : lavage des mains, formation, animation de cohésion sociale, t-shirts Oxfam/APSUD en sango.
- Écartées : 10 photos d’archives tronquées et 1 doublon (apsud10.jpg).

### 2.6 Mémoires mis à jour
- `APSUD_CONTENU.md` :
  - correction de la ligne « ids 500 », de la note « aucun chiffre » et de la ligne Japon ;
  - nouvelle section **§ 15** sur les archives.
- `PARTENAIRES.md` :
  - correction de la fiche Japon et de la note sur les erreurs 500 ;
  - nouvelle section **§ 6** sur les partenaires historiques.
- `INSTRUCTIONS.md` § 8 : ajout de `projets_historiques.json`, `images/archives/` et `partenaires/archives-apsud/` à la carte des fichiers.
- Rien n’a été supprimé. Des copies de sauvegarde des fichiers modifiés sont dans le scratchpad (`*.backup.json` et copies des `.md`).

## 3. Ce qui reste manquant : à demander au client APSUD

### 3.1 Identité et institution
- [ ] **Date de création**, **numéro d’agrément / d’enregistrement** (ministère du Plan, ONG nationale), statuts.
- [ ] **Organigramme et équipe** : noms, fonctions et photos du bureau de coordination, du conseil d’administration et des chefs d’antenne, avec l’accord des personnes.
- [ ] **Logo en vectoriel** (SVG, AI ou PDF) et charte. Le seul logo disponible fait 85 × 102 px.
- [ ] Validation des **objectifs spécifiques** (2021) et ajout éventuel d’un 4e domaine « Renforcement de la société civile et localisation ».
- [ ] Validation du **slogan** du panneau du siège.

### 3.2 Chiffres clés (à fournir ou à valider)
- [ ] Nombre total de projets depuis 2015 : « plus de 60 » en février 2023, plus les projets 2023-2026.
- [ ] Bénéficiaires cumulés, budget cumulé, nombre de préfectures, nombre d’employés, nombre d’antennes.
- [ ] **Résultats atteints** (et non seulement attendus) des projets récents.

### 3.3 Projets
- [ ] Projet **Alindao 2023** : retrait volontaire ? photos ? À republier ?
- [ ] Choix des projets historiques à mettre en avant, parmi les 60 (photos, résumés).
- [ ] Dates exactes des projets **5, 6, 8 et 13** ; bénéficiaires réels du **projet 13** (copiés du 14) ; devise réelle des projets **18 et 20** (£ ou €) ; budget du projet **15** (« 600 0OO ») ; objectifs généraux manquants (10, 11, 13, 14).
- [ ] Image manquante du slide 2 du projet 15.
- [ ] **Photos récentes HD** (20 à 30 et plus, avec autorisation des personnes photographiées, en particulier les enfants) et une **vidéo** pour le hero.

### 3.4 Partenaires
- [ ] Valider la liste des 36 partenaires, la nature de chaque relation et ceux à afficher.
- [ ] Confirmer ou retirer **UK aid** et **Gavi** (aucune trace de relation).
- [ ] Logos officiels manquants :
  - organisations nationales : FH RCA (OCHA), Au Secours, LNPDD, OFAHRD ;
  - bailleurs : Fonds Bêkou, Japon (logo ODA), ECHO, PBF ;
  - organisations internationales : NRC, DRC, OIM, Irish Aid, Affaires mondiales Canada ;
  - versions françaises HD : PNUD, ONU Femmes, Gavi ;
  - lockup complet MINUSCA.
- [ ] Noms complets et sites de **LNPDD** et **OFAHRD** ; accord écrit des partenaires pour l’usage de leur logo.

### 3.5 Contact
- [ ] Adresse exacte du siège actuel (Micheline, Bimbo ?), **coordonnées GPS** ou lien Google Maps, horaires.
- [ ] **Une adresse e-mail principale** : infos@, info@, cm@, a.cm@, communication@ et raf@ coexistent.
- [ ] Téléphones à publier : 74 18 62 01/03/14, 72 32 56 26 (panneau) ; les anciens numéros sont-ils hors service ?
- [ ] Profils officiels Facebook, X (@apsud25 ?), LinkedIn et Instagram.

### 3.6 Dons
- [ ] **RIB / IBAN actuel** (BGFIBank ? BPMC ?), confirmé par écrit et signé.
- [ ] Numéros **Mobile Money** (Orange Money, Moov, Telecel) avec le nom du titulaire.
- [ ] Possibilité de don en ligne ; politique de reçus ; explication de l’usage des fonds.

### 3.7 Juridique et technique
- [ ] Mentions légales, politique de confidentialité et de cookies : responsable de publication, hébergeur.
- [ ] Accès hébergement LWS, DNS et messagerie ; changer les mots de passe après la compromission de 2024 ; nettoyer Google Search Console.

## 4. Limites de ce contrôle
- Le formulaire de contact n’a pas été soumis : aucun message envoyé.
- Wikimedia Commons a renvoyé des erreurs 429 (trop de requêtes) : les logos NRC et DRC n’ont pas pu être téléchargés. Edge headless ne produit aucune capture dans cet environnement : les nouveaux SVG ont été validés techniquement (balise `<svg>` présente, aucun script), mais pas visuellement.
- Les fiches projet 2023 du WordPress n’ont été archivées que pour 4 projets, et les photos 2023 (`wp-content/uploads`) ne sont pas archivées.
- Les données issues des archives reflètent ce qu’APSUD publiait à l’époque : elles peuvent être obsolètes. C’est pourquoi elles sont isolées (`projets_historiques.json`, clés `*_archives`) et marquées « à valider ».
