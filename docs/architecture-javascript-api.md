# Architecture JavaScript et intégration API

> **OC-PY06 — JustStreamIt · État observé le 12 octobre 2026**
>
> **Document d'architecture cible, et non documentation de fonctionnalités JavaScript terminées.** Les quatre fichiers JS existent dans GitHub, mais ne contiennent actuellement que leurs en-têtes (et `"use strict";` dans `main.js`). Les appels `fetch()` et les interactions restent à développer.

## 1. Objectif et contraintes

JustStreamIt affichera des films provenant de **OCMovies-API**, accessible localement sur `http://localhost:8000/api/v1/`.

Contraintes du cahier des charges et des étapes OpenClassrooms :

- JavaScript **vanilla**, sans React, Angular, Vue ni plugin additionnel ;
- requêtes HTTP avec **`fetch()` natif** et gestion asynchrone des réponses ;
- aucun message d'erreur JavaScript en console pendant l'utilisation ;
- récupération du meilleur film, des meilleurs films, des catégories fixes et d'une catégorie choisie ;
- ouverture d'une modale détaillée et boutons « Voir plus / Voir moins » ;
- présentation responsive et réutilisation des fonctions entre sections.

Le front-end et le serveur API sont **deux projets distincts**. Pour son installation, consulter [Installation et démarrage d'OCMovies-API](installation-ocmovies-api.md).

## 2. État constaté du dépôt

Arborescence pertinente :

~~~text
OC-PY06-juststreamit/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── images/
│   │   ├── logo_juststreamit.svg
│   │   └── movie_poster.png
│   └── js/
│       ├── api.js
│       ├── main.js
│       ├── modal.js
│       └── movies.js
└── docs/
~~~

### Fichiers JavaScript

| Fichier | Existe ? | Rôle prévu | État constaté |
| --- | --- | --- | --- |
| [`api.js`](../assets/js/api.js) | Oui | Requêtes `fetch()`, erreurs réseau et accès aux endpoints | En-tête uniquement |
| [`movies.js`](../assets/js/movies.js) | Oui | Production des cartes, sections de films et affichage | En-tête uniquement |
| [`modal.js`](../assets/js/modal.js) | Oui | Détails du film, ouverture/fermeture de la modale | En-tête uniquement |
| [`main.js`](../assets/js/main.js) | Oui | Initialisation et coordination des événements | En-tête et `"use strict";` uniquement |

**Seul `main.js` est actuellement chargé** dans `index.html` par :

~~~html
<script src="assets/js/main.js" defer></script>
~~~

La manière de relier ultérieurement ces quatre fichiers reste à décider lors de l'implémentation (ne pas considérer les autres fichiers comme automatiquement chargés).

### HTML/CSS déjà préparés

Le fichier [`index.html`](../index.html) contient :

- `#best-movie` : meilleur film, titre, résumé, affiche et bouton Détails ;
- `#top-movies` : section des films les mieux notés ;
- `#category-1` et `#category-2` : catégories fixes ;
- `#other-category` : catégorie sélectionnable avec `#genre-select` ;
- un unique `#movie-modal` placé à la fin de `main`, avec informations du film et deux commandes de fermeture.

Chaque section de liste contient **six cartes statiques**, soit **24 cartes de films temporaires** dans le HTML courant. La modale et les cartes contiennent encore des données factices.

La feuille [`style.css`](../assets/css/style.css) fournit déjà les présentations responsive, les styles de la modale et les contrôles visuels ; **elle ne rend pas les boutons fonctionnels**.

## 3. Flux de données cible (non implémenté)

~~~text
Serveur local OCMovies-API
    │ GET /api/v1/titles/ ou /api/v1/genres/
    ▼
fetch() dans api.js
    │ réponse HTTP → décodage JSON → gestion des erreurs
    ▼
Données de films / genres
    │ orchestration et événements dans main.js
    ├─────────► movies.js : mise à jour des sections et cartes
    └─────────► modal.js  : détails du film et modale
                         ▼
                  DOM dans index.html
                         ▼
               Présentation via style.css
~~~

Le schéma représente les **responsabilités envisagées**, pas des appels entre modules déjà programmés.

Le chargement initial devra être coordonné au chargement du document (`DOMContentLoaded` dans les consignes de l'étape 5). La manipulation du DOM, les événements et le traitement asynchrone doivent rester lisibles et facilement explicables en soutenance.

## 4. Endpoints documentés

| Besoin | Endpoint officiel | Vérification dans le projet |
| --- | --- | --- |
| Liste des films | `GET /api/v1/titles/` | Requête finale, tri et pagination à analyser |
| Détail d'un film | `GET /api/v1/titles/{id}` | Test antérieur documenté : `/api/v1/titles/499549` (*Avatar*) |
| Genres disponibles | `GET /api/v1/genres/` | Catalogue et structure JSON à analyser |

Le [README officiel](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md) documente les paramètres `genre=<nom>`, `sort_by=<champ>` et plusieurs filtres. **Le champ exact de tri IMDb et les règles de pagination à utiliser dans JustStreamIt restent à tester et consigner en S2**. Ne pas remplacer cette vérification par une hypothèse sur l'API.

La page [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585) consigne un test de détail d'*Avatar* et la présence de données nécessaires à la modale. Elle confirme notamment le champ `image_url`, mais **pas encore un mapping exhaustif des noms de propriétés JSON**.

## 5. Correspondance besoins UI → données

| Zone ou action | Informations à récupérer | Étape concernée |
| --- | --- | --- |
| Meilleur film | Film ayant la meilleure note IMDb, image, titre et résumé | S2/S5 |
| Films les mieux notés | Six films supplémentaires classés, sans réutiliser le film mis en avant selon l'exigence | S2/S5 |
| Catégorie 1 | Six meilleurs films d'un genre fixe choisi | S2/S5 |
| Catégorie 2 | Six meilleurs films d'un autre genre fixe | S2/S5 |
| Autres | Liste complète des genres, puis films du genre sélectionné | S5/S8 |
| Boutons Voir plus / Voir moins | État de visibilité des 6 films d'une section | S7 |
| Clic film / Détails | Identifiant puis données de détail du film | S7 |

La correspondance **fonctionnelle** est définie ; les clés JSON exactes, la stratégie de requêtes (nombre de pages, tri, exclusions) et le format des réponses devront être renseignés après inspection de l'API.

### Informations attendues dans la modale

Selon le cahier des charges : affiche, titre, genres complets, date de sortie, classification, score IMDb, réalisateur, acteurs, durée, pays d'origine, recettes au box-office et résumé. Le HTML prépare les conteneurs correspondants, mais les valeurs sont encore temporaires.

Pour les affiches, utiliser l'URL du champ `image_url` renvoyé par l'API. Le recadrage visuel est confié au CSS (par exemple `object-fit: cover`), plutôt qu'à une modification non documentée de l'URL.

## 6. Responsive et états dynamiques à implémenter

Chaque section de liste comporte **6 films**, mais l'état initial requis est :

| Format | Films initialement visibles | Organisation | Comportement à développer |
| --- | ---: | --- | --- |
| Mobile | 2 | 1 colonne | Voir plus → 6, Voir moins → 2 |
| Tablette | 4 | 2 colonnes | Voir plus → 6, Voir moins → 4 |
| Ordinateur | 6 | 3 colonnes | Tous visibles ; bouton inutile |

Les seuils CSS actuellement utilisés sont `768px` et `1024px` ; les artboards Figma mesurent respectivement **456, 788 et 1054 px** dans les trois formats de référence. Les seuils sont des **choix d'implémentation**.

Le CSS prépare une classe `.modal.is-open` pour afficher la modale. Il reste à programmer le déclenchement à partir du clic sur une carte ou sur Détails, le chargement des données et les fermetures. L'ouverture a été **simulée manuellement dans DevTools** pour vérifier le rendu, et ne constitue pas une interaction JavaScript terminée.

## 7. Étapes de réalisation suggérées

1. **S2 — Analyse API** : confirmer les réponses JSON, filtres, tri et pagination ; rédiger la table des propriétés exactes.
2. **S5 — Accès API** : définir les fonctions de `api.js`, leur gestion d'erreurs et le chargement initial.
3. **S5 — Affichage des films** : réutiliser les structures HTML existantes et remplacer les placeholders.
4. **S6/S7 — Responsive et interactions** : adapter l'affichage par défaut (2 / 4 / 6 films), gérer Voir plus / Voir moins et la modale.
5. **S8 — Catégorie dynamique** : charger les genres depuis l'API, actualiser les six films de la catégorie sélectionnée et conserver le fonctionnement des interactions.
6. **S9 — Contrôle final** : vérification des fonctions, de la console, de l'accessibilité de base et des validateurs W3C.

Les fonctions, signatures et schémas de données **ne sont volontairement pas inventés** ici : ils seront documentés lors de leur implémentation effective.

## 8. Jira au 12 octobre 2026

| Epic / ticket | Statut |
| --- | --- |
| [PY06-4 — S2 API Analysis](https://fa8i1.atlassian.net/browse/PY06-4) | En cours |
| [PY06-7 — S5 JavaScript & API](https://fa8i1.atlassian.net/browse/PY06-7) | À faire |
| [PY06-25 — Accès API avec fetch](https://fa8i1.atlassian.net/browse/PY06-25) | À faire |
| [PY06-26 — Chargement des données](https://fa8i1.atlassian.net/browse/PY06-26) | À faire |
| [PY06-8 — S6 Responsive](https://fa8i1.atlassian.net/browse/PY06-8) | En cours (CSS réalisé, tests restants) |
| [PY06-9 — S7 Dynamic UI](https://fa8i1.atlassian.net/browse/PY06-9) | À faire |
| [PY06-10 — S8 Dynamic Category](https://fa8i1.atlassian.net/browse/PY06-10) | À faire |

## Sources

- [Confluence — Architecture front-end](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31522857).
- [Confluence — JavaScript et intégration API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/30965762).
- [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585).
- [README officiel OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md).
- [OpenClassrooms — Projet 6, étapes 2 à 8](https://openclassrooms.com/fr/paths/879/projects/835).
