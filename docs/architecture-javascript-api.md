# Architecture JavaScript et intégration API

> **OC-PY06 — JustStreamIt · État du dépôt GitHub au 22 octobre 2026, commit `8c9916c`**
>
> **S2 (analyse) et S5 (chargement initial avec JavaScript vanilla) sont terminées.** Les requêtes `fetch()` et le rendu du meilleur film, du top 6, des catégories Action et Comedy et des 25 genres ont été développés et testés dans Brave. Les interactions des boutons, la modale et le choix dynamique de la catégorie « Autres » restent à implémenter en S7/S8. Voir [analyse S2](analyse-api-ocmovies.md) et [commit S5 PY06-26](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/8c9916ca17dcb030945a57dcd319ab57230c5839).

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

| Fichier | Rôle | État vérifié sur `main` |
| --- | --- | --- |
| [`api.js`](../assets/js/api.js) | `fetchApi()`, `getTopMovies()`, `getGenres()`, `getMoviesByGenre()`, `getMovieDetails()` | **Implémenté**, accès HTTP/JSON et gestion des erreurs, testé en Brave (PY06-25) |
| [`movies.js`](../assets/js/movies.js) | `displayBestMovie()`, `displayMovieCards()`, `displayGenres()`, `setMoviePoster()` | **Implémenté**, rend les films et les genres dans le DOM ; remplacement des affiches défaillantes (PY06-26) |
| [`modal.js`](../assets/js/modal.js) | Détails du film, ouverture/fermeture de la modale | **À développer** (en-tête seulement) |
| [`main.js`](../assets/js/main.js) | `initializeApp()` et chargement des sections au `DOMContentLoaded` | **Implémenté** pour l'initialisation S5 ; événements d'interface à développer en S7/S8 |

**Trois scripts classiques** sont désormais chargés par `index.html`, dans cet ordre (avec `defer`) :

~~~html
<script src="assets/js/api.js" defer></script>
<script src="assets/js/movies.js" defer></script>
<script src="assets/js/main.js" defer></script>
~~~

L'ordre garantit que les fonctions d'accès API et d'affichage sont disponibles lorsque `main.js` démarre. **`modal.js` n'est pas encore inclus**, car il ne possède pas de logique fonctionnelle.

### HTML/CSS déjà préparés

Le fichier [`index.html`](../index.html) contient :

- `#best-movie` : meilleur film, titre, résumé, affiche et bouton Détails ;
- `#top-movies` : section des films les mieux notés ;
- `#category-1` et `#category-2` : catégories fixes ;
- `#other-category` : catégorie sélectionnable avec `#genre-select` ;
- un unique `#movie-modal` placé à la fin de `main`, avec informations du film et deux commandes de fermeture.

Chaque grille contient **six éléments de carte préécrits dans le HTML**, soit 24 emplacements. Le JavaScript renseigne désormais les cartes de `#top-movies`, `#category-1` et `#category-2`, soit **18 cartes initialisées** ; les six cartes de `#other-category` ainsi que la modale contiennent encore des données temporaires.

La feuille [`style.css`](../assets/css/style.css) fournit déjà les présentations responsive, les styles de la modale et les contrôles visuels ; **elle ne rend pas les boutons fonctionnels**.

## 3. Flux de données — partie S5 implémentée, interactions S7/S8 à venir

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

**Implémenté en S5 :** `main.js` lance `initializeApp()` lors de `DOMContentLoaded`, appelle les fonctions de `api.js` et les fonctions d'affichage de `movies.js`. **Non implémenté :** la branche `modal.js`, les clics sur les films, les boutons et le changement de genre. Le schéma indique à la fois le flux existant et cette extension cible.

La récupération des 7 premiers films alimente le meilleur film et les six suivants ; deux requêtes distinctes remplissent les catégories fixes. La liste des 25 genres peuple `#genre-select`. Le détail du meilleur film est récupéré séparément pour obtenir son résumé.

## 4. Endpoints documentés

| Besoin | Endpoint officiel | Vérification dans le projet |
| --- | --- | --- |
| Liste des films | `GET /api/v1/titles/` | Testée ; `sort_by=-imdb_score`, `page_size=7` et filtres confirmés localement le 22/10/2026 |
| Détail d'un film | `GET /api/v1/titles/{id}` | Retesté sur *Avatar* (499549) et *Hopeful Notes* (1508669) le 22/10/2026 |
| Genres disponibles | `GET /api/v1/genres/` | Testé : `count=25`, `page_size=25`, `next=null` |

Le [README officiel](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md) documente les paramètres `genre=<nom>`, `sort_by=<champ>` et plusieurs filtres. **Le tri IMDb et la pagination ont été vérifiés expérimentalement le 22/10/2026** : `sort_by=-imdb_score` et `page_size=7` pour la liste générale, `page_size=6` avec `genre=Action` pour une catégorie. Voir [l'analyse S2](analyse-api-ocmovies.md). `page_size` n'est pas mentionné dans le README officiel et n'est garanti ici que pour les valeurs effectivement testées.

La page [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585) consigne un test de détail d'*Avatar* et la présence de données nécessaires à la modale. Elle confirme notamment le champ `image_url`. **Le mapping vérifié en S2** avec les réponses locales et le HTML courant est maintenant décrit dans [l'analyse S2](analyse-api-ocmovies.md).

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

La correspondance **fonctionnelle** est définie et les clés JSON et requêtes validées sont détaillées dans [l'analyse S2](analyse-api-ocmovies.md). **Les zones S5** (vedette, top, deux catégories fixes, menu des genres) sont effectivement alimentées depuis l'API ; **les interactions S7/S8** restent des comportements cibles.

### Informations attendues dans la modale

Selon le cahier des charges : affiche, titre, genres complets, date de sortie, classification, score IMDb, réalisateur, acteurs, durée, pays d'origine, recettes au box-office et résumé. Le HTML prépare les conteneurs correspondants, mais les valeurs sont encore temporaires.

Les affiches utilisent `image_url` renvoyé par l'API ; `setMoviePoster()` bascule vers `assets/images/movie_poster.png` en cas d'échec de chargement ou d'URL absente. Le CSS conserve le recadrage (`object-fit: cover`) ; les erreurs HTTP 404 des ressources externes peuvent rester visibles dans les outils réseau de Brave, sans exception JavaScript non gérée.

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

1. **S2 — Analyse API (réalisée le 22/10/2026)** : réponses, filtres, tri, pagination, genres et mapping consignés dans [l'analyse S2](analyse-api-ocmovies.md).
2. **S5 — Accès API (réalisé, PY06-25)** : fonctions de `api.js`, gestion HTTP/JSON et erreurs testées dans Brave, [commit `d45fd1d`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/d45fd1db5b0158f978c2b84f3ea2e6c022f34936).
3. **S5 — Affichage des films et genres (réalisé, PY06-26)** : initialisation automatique et affichage des zones fixes et des genres, [commit `8c9916c`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/8c9916ca17dcb030945a57dcd319ab57230c5839).
4. **S6/S7 — Responsive et interactions** : adapter l'affichage par défaut (2 / 4 / 6 films), gérer Voir plus / Voir moins et la modale.
5. **S8 — Catégorie dynamique** : charger les genres depuis l'API, actualiser les six films de la catégorie sélectionnée et conserver le fonctionnement des interactions.
6. **S9 — Contrôle final** : vérification des fonctions, de la console, de l'accessibilité de base et des validateurs W3C.

Les fonctions S5 présentées correspondent au **code réel présent sur la branche `main`**. Les fonctions S7/S8 et leurs signatures seront précisées lors de leur développement ; aucune intégration dynamique non testée n'est présentée comme achevée.

## 8. État Jira vérifié le 22 octobre 2026

| Epic / ticket | Statut |
| --- | --- |
| [PY06-4 — S2 API Analysis](https://fa8i1.atlassian.net/browse/PY06-4) | Terminé |
| [PY06-7 — S5 JavaScript & API](https://fa8i1.atlassian.net/browse/PY06-7) | Terminé |
| [PY06-25 — Accès API avec fetch](https://fa8i1.atlassian.net/browse/PY06-25) | Terminé |
| [PY06-26 — Chargement des données](https://fa8i1.atlassian.net/browse/PY06-26) | Terminé |
| [PY06-8 — S6 Responsive](https://fa8i1.atlassian.net/browse/PY06-8) | En cours |
| [PY06-9 — S7 Dynamic UI](https://fa8i1.atlassian.net/browse/PY06-9) | À faire |
| [PY06-10 — S8 Dynamic Category](https://fa8i1.atlassian.net/browse/PY06-10) | À faire |

## Sources

- [S2 — Analyse des réponses OCMovies et mapping JSON/HTML](analyse-api-ocmovies.md) : tests réels du 22 octobre 2026.

- [Confluence — Architecture front-end](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31522857).
- [Confluence — JavaScript et intégration API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/30965762) : implémentation S5 et résultats des tests Brave.
- [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585).
- [README officiel OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md).
- [OpenClassrooms — Projet 6, étapes 2 à 8](https://openclassrooms.com/fr/paths/879/projects/835).
