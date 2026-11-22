# Animations de Prosper Global — mesures réelles

> Relevées avec `tools/anim.mjs` (séquences d'images + échantillonnage du texte toutes les ~200 ms), le 2026-11-21, écran 1440 × 900.
> Les animations de Prosper sont pilotées en JavaScript (librairie Motion) : le domaine « Animation » de DevTools n'en voit aucune. Ce sont donc les **images** et les **valeurs échantillonnées** qui font foi.
> À refaire pour chaque section animée, puis comparer avec la même mesure sur APSUD.

## Section « manifeste + chiffres clés » (`.c-quick-stats`)

Images : `prosper-chiffres/frame-*.jpg` · données : `prosper-chiffres/rapport.json`

| Temps après l'arrivée du panneau | Ce qui se passe |
|---|---|
| 0 → ~1,8 s | Les chiffres restent à **0** (« 0m », « 0+ », « 0 », « 0% »). Le grand chevron aqua **monte en diagonale depuis le bas gauche** vers sa place, pendant qu'un rectangle tilleul (la « marche ») se déploie verticalement à sa droite, collé au panneau aqua. |
| ~1,8 s → ~3,6 s | **Compteurs** : montée rapide puis **forte décélération** (courbe de sortie). 37m est atteint en ~1,2 s, 3 400 en ~1,8 s. |
| Décalage entre chiffres | ~**120–200 ms** : 1er chiffre, puis 2e, 3e, 4e (« 0% » démarre en dernier). |
| Après | Tout est figé ; aucune boucle. |

Échantillons (ms → valeurs) : 2037 → 11m / 0+ / 0 / 0% · 2264 → 22m / 12+ / 393 / 0% · 2532 → 30m / 22+ / 2 050 / 41% · 2977 → 35m / 28+ / 2 944 / 75% · 3386 → 37m / 30+ / 3 314 / 90% · 3809 → 37m / 30+ / 3 400 / 95%.

**À reproduire pour APSUD** : la goutte-feuille verte joue le rôle du chevron (même trajectoire diagonale bas-gauche → place, ~1,2 s, `--ease-out`), le rectangle Pousse-pâle se déploie en hauteur, puis les 4 compteurs démarrent après ~0,6 s de plus (et non 1,8 s : l'attente de Prosper paraît longue, c'est notre amélioration), durée 1,8 s, courbe de sortie forte, décalage 150 ms, format français (« 250 000 », « 60+ »).
