# Architecture JavaScript et intégration API

> **OC-PY06 — JustStreamIt · État du code publié au 22 octobre 2026 (commit `e830237`)**
>
> **Les étapes S2 à S8 sont terminées, ainsi que les contrôles qualité PY06-33.** La documentation finale et la préparation de la soutenance se poursuivent dans PY06-34. Ce document décrit l'architecture **actuelle** ; les hypothèses formulées pendant S2 sont conservées séparément dans [l'analyse de l'API](analyse-api-ocmovies.md).

## 1. Objectif et contraintes

JustStreamIt affiche des films provenant d'**OCMovies-API**, accessible localement à `http://localhost:8000/api/v1/`.

L'interface est réalisée en HTML5, CSS3 et **JavaScript vanilla**, sans framework. Elle utilise `fetch()` pour les requêtes GET, adapte le nombre de films visibles à la largeur de l'écran et présente les détails dans une modale. Le front-end et le serveur OCMovies-API sont deux projets séparés : voir [Installation et démarrage d'OCMovies-API](installation-ocmovies-api.md).

## 2. Structure et responsabilités des fichiers

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
│       ├── movies.js
│       ├── modal.js
│       └── main.js
└── docs/
~~~

| Fichier | Rôle actuel |
| --- | --- |
| [`api.js`](../assets/js/api.js) | Fonctions `fetchApi()`, `getGenres()`, `getTopMovies()`, `getMoviesByGenre()`, `getMovieDetails()` ; décodage JSON et gestion des erreurs HTTP/réseau |
| [`movies.js`](../assets/js/movies.js) | Affiches et images de repli, cartes, liste des genres, boutons « Voir plus / Voir moins » et actualisation de la catégorie « Autres » |
| [`modal.js`](../assets/js/modal.js) | Ouverture, fermeture, chargement des détails, navigation au clavier, restauration du focus et gestion des erreurs de détail |
| [`main.js`](../assets/js/main.js) | Initialisation au `DOMContentLoaded`, orchestration du chargement initial et sélection par défaut Biography |
| [`index.html`](../index.html) | Structure des sections, cartes, menu déroulant et des deux fenêtres modales |
| [`style.css`](../assets/css/style.css) | Mise en page responsive, grilles, boutons et styles des modales |

Les **quatre scripts** sont inclus dans cet ordre avec `defer` :

~~~html
<script src="assets/js/api.js" defer></script>
<script src="assets/js/movies.js" defer></script>
<script src="assets/js/modal.js" defer></script>
<script src="assets/js/main.js" defer></script>
~~~

La page contient le film vedette (`#best-movie`), les six films suivants du classement (`#top-movies`), les catégories fixes Action et Comedy (`#category-1`, `#category-2`) et le genre sélectionnable (`#other-category`, `#genre-select`). La modale des détails (`#movie-modal`) et le dialogue d'erreur partagé (`#api-error-dialog`) sont indépendants des sections.

## 3. Chargement et interactions implémentés

~~~text
OCMovies-API locale
   │ GET /titles/ et /genres/
   ▼
api.js : fetch(), HTTP/JSON et erreurs
   ▼
main.js : initialise les événements et les sections
   ├── movies.js : meilleur film, cartes, genres, Voir plus / Voir moins
   │                 └── sélection d'un genre → nouvelle requête API
   └── modal.js : clic sur Détails → GET /titles/{id}
                     └── dialogue du film ou message d'erreur
   ▼
DOM HTML + présentation CSS
~~~

À l'initialisation, `getTopMovies()` demande sept films (le premier est mis en avant, les six suivants alimentent le classement) ; `getMovieDetails()` complète les informations de la vedette. Deux appels alimentent Action et Comedy. `getGenres()` charge les 25 genres. **Biography** est sélectionné automatiquement, et son chargement est déclenché via l'événement `change`.

Pour les clics rapprochés, les fonctions `initializeGenreSelector()` et `initializeMovieModalTriggers()` utilisent chacune un compteur `latestRequestId` : seule la dernière demande peut actualiser l'interface ou afficher une erreur. Lors d'un échec de récupération, le composant natif `<dialog id="api-error-dialog">` présente un message à l'utilisateur. Les affiches distantes défaillantes sont remplacées par `assets/images/movie_poster.png` avec `setMoviePoster()`.

## 4. Endpoints documentés

| Besoin | Endpoint officiel | Vérification dans le projet |
| --- | --- | --- |
| Liste des films | `GET /api/v1/titles/` | Testée ; `sort_by=-imdb_score`, `page_size=7` et filtres confirmés localement le 22/10/2026 |
| Détail d'un film | `GET /api/v1/titles/{id}` | Retesté sur *Avatar* (499549) et *Hopeful Notes* (1508669) le 22/10/2026 |
| Genres disponibles | `GET /api/v1/genres/` | Testé : `count=25`, `page_size=25`, `next=null` |

Le [README officiel](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md) documente les paramètres `genre=<nom>`, `sort_by=<champ>` et plusieurs filtres. **Le tri IMDb et la pagination ont été vérifiés expérimentalement le 22/10/2026** : `sort_by=-imdb_score` et `page_size=7` pour la liste générale, `page_size=6` avec `genre=Action` pour une catégorie. Voir [l'analyse S2](analyse-api-ocmovies.md). `page_size` n'est pas mentionné dans le README officiel et n'est garanti ici que pour les valeurs effectivement testées.

La page [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585) consigne un test de détail d'*Avatar* et la présence de données nécessaires à la modale. Elle confirme notamment le champ `image_url`. **Le mapping vérifié en S2** avec les réponses locales et le HTML courant est maintenant décrit dans [l'analyse S2](analyse-api-ocmovies.md).

## 5. Correspondance interface → données API

| Zone | Données et traitement |
| --- | --- |
| Meilleur film | Première entrée du classement IMDb, complétée par un appel au détail |
| Films les mieux notés | Six entrées suivantes du classement |
| Catégories fixes | Six films Action et jusqu'à six films Comedy, tri IMDb décroissant |
| « Autres » | Liste des genres, Biography par défaut et chargement des films selon le choix |
| Voir plus / Voir moins | Affichage des cartes déjà chargées sans requête réseau supplémentaire |
| Détails | `data-movie-id`, récupération des détails depuis l'API et ouverture de la modale |
| Erreur API | Dialogue générique `#api-error-dialog`, fermeture via bouton ou Échap |

La modale de détail utilise `title`, `image_url`, `date_published`, `genres`, `rated`, `duration`, `countries`, `imdb_score`, `worldwide_gross_income`, `directors`, `actors`, `long_description` (avec repli sur `description`). Les propriétés absentes reçoivent des textes de remplacement ; aucune devise n'est inventée pour les recettes.

Les données textuelles sont injectées avec `textContent` ; certaines URL d'affiches de tiers peuvent renvoyer HTTP 404 dans les outils réseau, même lorsque leur remplacement visuel fonctionne.

## 6. Responsive et états dynamiques

| Format | Largeur Figma de référence | Films visibles initialement | Grille | Bouton |
| --- | ---: | ---: | --- | --- |
| Mobile | 456 px | 2 | 1 colonne | Voir plus jusqu'à 6 films |
| Tablette | 788 px | 4 | 2 colonnes | Voir plus jusqu'à 6 films |
| Ordinateur | 1054 px | 6 | 3 colonnes | Masqué |

Les media queries utilisent les seuils CSS de **768 px** et **1024 px**. La section dynamique masque les cartes inutilisées et le bouton « Voir plus » lorsque le nombre de films ne le justifie pas (ex. genre Adult : deux films).

La modale du film utilise la classe `is-open` : fermeture par boutons ou Échap, focus confiné avec Tab / Shift+Tab et retour du focus au bouton d'origine. Le dialogue d'erreur natif `<dialog>` emploie `showModal()` et `<form method="dialog">`.

## 7. Historique des livraisons

1. **S2 — Analyse API** : [analyse des réponses et des paramètres](analyse-api-ocmovies.md).
2. **S5 — Accès API et rendu** : [commit `d45fd1d`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/d45fd1db5b0158f978c2b84f3ea2e6c022f34936), puis [commit `8c9916c`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/8c9916ca17dcb030945a57dcd319ab57230c5839).
3. **S6/S7 — Responsive et modale** : [commit `d168e8d`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/d168e8dc1830fdaa95b604de150e5c59dbb152bb), puis [commit `82288a1`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/82288a1d64c340f71bead1019c178612f4441b29).
4. **S8 — Catégorie dynamique** : [commit `041cd64`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/041cd64d9260507639115a08a40b16160cea3a39).
5. **S9 — Accessibilité et gestion des erreurs** : [commit `ad38c8d`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/ad38c8d6943f1fc18663554c053ff14b57460622) et [commit `b0ee6ca`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/b0ee6cad12150149406a2d0cc51731c1891834e0).

## 8. Statuts Jira vérifiés le 22 octobre 2026

| Ticket | Étape | Statut |
| --- | --- | --- |
| [PY06-4](https://fa8i1.atlassian.net/browse/PY06-4) | S2 — Analyse API | Terminé |
| [PY06-5](https://fa8i1.atlassian.net/browse/PY06-5) | S3 — Structure HTML | Terminé |
| [PY06-7](https://fa8i1.atlassian.net/browse/PY06-7) | S5 — JavaScript et API | Terminé |
| [PY06-8](https://fa8i1.atlassian.net/browse/PY06-8) | S6 — Responsive | Terminé |
| [PY06-9](https://fa8i1.atlassian.net/browse/PY06-9) | S7 — Interface dynamique | Terminé |
| [PY06-10](https://fa8i1.atlassian.net/browse/PY06-10) | S8 — Catégorie dynamique | Terminé |
| [PY06-22](https://fa8i1.atlassian.net/browse/PY06-22) | Modale et validation HTML | Terminé |
| [PY06-33](https://fa8i1.atlassian.net/browse/PY06-33) | Contrôles qualité | Terminé |
| [PY06-34](https://fa8i1.atlassian.net/browse/PY06-34) | Documentation et soutenance | En cours |

Le document [Tests et validation](tests-et-validation.md) indique les résultats des validations W3C (0 erreur HTML, 0 erreur CSS avec des avertissements informatifs) et les limites des essais manuels.

## Sources

- [S2 — Analyse des réponses OCMovies et mapping JSON/HTML](analyse-api-ocmovies.md) : tests réels du 22 octobre 2026.

- [Confluence — Architecture front-end](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31522857).
- [Confluence — JavaScript et intégration API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/30965762) : implémentations S5 à S9 et résultats des tests Brave.
- [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585).
- [README officiel OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md).
- [OpenClassrooms — Projet 6, étapes 2 à 8](https://openclassrooms.com/fr/paths/879/projects/835).
