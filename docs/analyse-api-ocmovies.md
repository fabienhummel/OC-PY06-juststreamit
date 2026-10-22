# S2 — Analyse des réponses de l'API OCMovies

> OC-PY06 — JustStreamIt · Tests réalisés **sur l'API locale par le développeur le 22 octobre 2026**, puis mapping confronté au `index.html` du dépôt GitHub.
>
> Périmètre : [PY06-17](https://fa8i1.atlassian.net/browse/PY06-17), [PY06-18](https://fa8i1.atlassian.net/browse/PY06-18), [PY06-19](https://fa8i1.atlassian.net/browse/PY06-19).
> Il s'agit d'une **analyse et d'un plan d'intégration** : aucune fonctionnalité JavaScript n'a été développée lors de S2.

## 1. Environnement et méthode

- API REST OCMovies exécutée localement, séparément du front-end : `http://localhost:8000/api/v1/`.
- Tests avec `curl -i --max-time 5 'URL'` dans le Terminal macOS ; réponses communiquées par le développeur.
- Observation initiale : `HTTP/1.1 200 OK`, `Content-Type: application/json`, `Allow: GET`, serveur `WSGIServer/0.2 CPython/3.13.9`.
- Les endpoints sont **en lecture seule** (`GET`). Le front-end utilisera `fetch()` en JavaScript vanilla, conformément au cahier des charges.
- Le paramètre `page_size` n'est **pas explicitement décrit dans le README officiel**, mais son comportement a été **vérifié sur cette installation locale** avec les valeurs 6, 7 et 25 (sur les ressources ci-dessous). Il n'est pas établi qu'il accepte toutes les valeurs ni qu'il possède une limite maximale particulière.

## 2. PY06-17 — Liste des films, classement, filtre et pagination

### Réponse de liste

```http
GET /api/v1/titles/
```

Réponse constatée : `count: 85851`, `next: "http://localhost:8000/api/v1/titles/?page=2"`, `previous: null`, `results` contenant **5 films** par défaut.

`count` = nombre total correspondant à la requête ; `next` / `previous` = liens de pagination ou `null` ; `results` = tableau d'objets films de la page actuelle.

Propriétés constatées d'un objet de **liste** : `id` (nombre), `url` (chaîne), `imdb_url` (chaîne), `title` (chaîne), `year` (nombre), `imdb_score` (**chaîne**, ex. `"9.6"`), `votes` (nombre), `image_url` (chaîne), `directors`, `actors`, `writers`, `genres` (tableaux de chaînes). Le résumé, la durée, la classification, les recettes et la date de sortie complète ne figurent **pas** dans cette réponse de liste observée.

### Requêtes et résultats observés

| Requête (relative à `/api/v1/`) | Résultat effectivement observé |
| --- | --- |
| `titles/` | 85 851 films, 5 sur la première page, lien vers `page=2`. |
| `titles/?sort_by=-imdb_score` | Notes de la première page : 9.6, 9.6, 9.6, 9.6, 9.4 ; le lien `next` préserve le tri. |
| `titles/?page=2&sort_by=-imdb_score` | Notes de la deuxième page : 9.4, 9.4, 9.3, 9.3, 9.3 ; `next` et `previous` opérationnels. |
| `titles/?genre=Action&sort_by=-imdb_score` | `count: 12948` ; cinq films du genre Action, notes 9.6, 9.3, 9.0, 9.0, 8.9. |
| `titles/?genre=Action&page=2&sort_by=-imdb_score` | Le sixième film du genre est **Kireedam**, note 8.9 ; filtres préservés dans les liens. |
| `titles/?sort_by=-imdb_score&page_size=7` | **7 films** en première page, tri et `page_size=7` conservés dans `next`. |
| `titles/?genre=Action&sort_by=-imdb_score&page_size=6` | **6 films Action** en une réponse, identiques aux six premiers trouvés par pagination. |

**Top général observé (premiers sept)** : Hopeful Notes (ID 1508669, 9.6), Suvarna Sundari (9.6), Vaarthakal Ithuvare (9.6), Notuku Potu (9.6), Lejos de Casa pelicula Venezolana (9.4), Isha (9.4), Love in Kilnerry (9.4).

**Top Action observé (six premiers)** : Suvarna Sundari (9.6), Ek (9.3), Ramayana: The Legend of Prince Rama (9.0), Il cavaliere oscuro (9.0), Il Signore degli Anelli - Il ritorno del re (8.9), Kireedam (8.9).

Le tri décroissant est **confirmé sur les pages et jeux de résultats testés** ; le critère de départage entre notes égales n'a pas été établi. Le « meilleur film » sera le **premier objet renvoyé** par le classement demandé, sans prétendre qu'il est seul à détenir la meilleure note.

Les filtres `year`, `title_contains`, `imdb_score_min` et autres sont décrits dans le README officiel mais **n'ont pas été testés pendant cette séance** ; ils ne sont pas nécessaires au périmètre de l'interface.

## 3. PY06-18 — Genres et fiches détaillées

### Liste des genres

- `GET /api/v1/genres/` : `HTTP 200`, `count: 25`, première page de **5** entrées, `next: ...?page=2`.
- `GET /api/v1/genres/?page_size=25` : `HTTP 200`, **25** objets de forme `{"id": 14, "name": "Action"}` dans `results`, `next: null`, `previous: null`.
- Les noms sont dans l'ordre alphabétique dans cette réponse. Le champ `name` sert de libellé du menu et de valeur du paramètre `genre` ; `id` est l'identifiant numérique du genre.

### Détail d'un film

```http
GET /api/v1/titles/499549
GET /api/v1/titles/1508669
```

Ces deux requêtes ont renvoyé un **objet JSON unique**, sans enveloppe de pagination.

| Champ constaté en détail | Type JSON | Rôle |
| --- | --- | --- |
| `id` | nombre | Identité du film, requête de détail |
| `title`, `original_title` | chaînes | Titres |
| `year`, `date_published` | nombre, chaîne | Année / date telle que livrée par l'API |
| `image_url` | chaîne | Affiche, sans modification de l'URL |
| `description`, `long_description` | chaînes | Résumé court / texte détaillé |
| `imdb_score`, `avg_vote` | chaînes | Valeurs distinctes ; le classement utilise `imdb_score` |
| `genres`, `actors`, `directors`, `countries` | tableaux de chaînes | Informations multiples (jointure à l'affichage) |
| `rated` | chaîne | Classification telle que livrée |
| `duration` | nombre | Durée en minutes |
| `worldwide_gross_income` | nombre ou `null` | Recettes mondiales éventuellement absentes |

**Avatar, ID 499549** : `imdb_score: "7.8"`, `date_published: "2010-01-15"`, `duration: 162`, `rated: "12"`, `worldwide_gross_income: 2790439092`, `genres: ["Action","Adventure","Fantasy"]`. Descriptions disponibles.

**Hopeful Notes, ID 1508669** : `imdb_score: "9.6"`, `avg_vote: "9.7"`, `date_published: "2010-12-15"`, `duration: 94`, `rated: "Not rated or unkown rating"`, `worldwide_gross_income: null`, `metascore: null` ; `description` et `long_description` présents et identiques.

**Précautions d'affichage** : ne pas fabriquer `12+` depuis `rated: "12"` ; afficher « Non disponible » lorsqu'une donnée est `null` ; ne pas supposer la devise des recettes mondiales (le champ `budget_currency` concerne le budget). `imdb_score` est une chaîne ; convertir uniquement si un calcul ou formatage numérique le nécessite. `year` et `date_published` peuvent être différents.

## 4. PY06-19 — Mapping JSON → composants existants

Le mapping suivant repose sur les réponses locales ci-dessus **et** sur la lecture de `index.html` du dépôt. Il est **prévu, pas implémenté**.

| Zone / sélecteur HTML | Requête et source | Champs à exploiter |
| --- | --- | --- |
| `#best-movie .featured-movie-title` | Premier film du classement + fiche détaillée | `title` |
| `#best-movie .featured-movie-summary` | Détail du premier film | `description` |
| `#best-movie .featured-movie-poster img` | Classement ou détail | `image_url`, `title` pour `alt` |
| `#best-movie .button` | Détail à l'ouverture | `id` |
| `#top-movies .movie-card` (6 cartes) | Films n° 2 à 7 de `results` | `title`, `image_url`, `id` |
| `#category-1 .movie-card` (6 cartes) | `titles/?genre=<genre1>&sort_by=-imdb_score&page_size=6` | `title`, `image_url`, `id` |
| `#category-2 .movie-card` (6 cartes) | Même requête pour `<genre2>` distinct | Idem |
| `#other-category #genre-select` | `genres/?page_size=25` | Chaque `results[].name` |
| `#other-category .movie-card` (6 cartes) | Films du genre choisi | `title`, `image_url`, `id` |
| `#movie-modal` | `titles/{id}` au clic | Détails ci-dessous |

Correspondance des données de la modale :

| Sélecteur | Champs JSON |
| --- | --- |
| `.modal-movie-title` | `title` |
| `.modal-movie-genres` | `date_published` (ou année selon présentation) et `genres` |
| `.modal-movie-details` | `rated`, `duration`, `countries` |
| `.modal-movie-score` | `imdb_score` |
| `.modal-movie-box-office` | `worldwide_gross_income` |
| `.modal-movie-director` | `directors` dans son paragraphe de valeur |
| `.modal-movie-summary` | `long_description` (éventuellement repli sur `description`) |
| `.modal-movie-poster img` | `image_url` et `title` pour `alt` |
| `.modal-movie-cast` | `actors` dans son paragraphe de valeur |

Une mise en forme HTML reste à décider pour afficher la **date de sortie complète** demandée dans le cahier des charges ; la structure actuelle affiche l'année dans `.modal-movie-genres`. Ce choix d'implémentation ne bloque pas l'analyse des propriétés.

### Chargement et responsabilités envisagés

1. À l'initialisation : `GET titles/?sort_by=-imdb_score&page_size=7` ; `results[0]` pour la vedette, `results.slice(1, 7)` pour les six cartes. Puis `GET titles/{id du premier}` pour le résumé et les informations de la vedette.
2. Deux requêtes de six films chacune, avec deux genres fixes **différents**, encore à choisir : `genre=<...>&sort_by=-imdb_score&page_size=6`.
3. `GET genres/?page_size=25` pour alimenter le sélecteur `#genre-select`. Au changement de genre, charger les six films correspondants et actualiser la grille ; définir ultérieurement l'état de départ de cette catégorie.
4. Au clic sur un film : `GET titles/{id}`, renseigner la modale commune, permettre sa fermeture.
5. « Voir plus / Voir moins » agit sur les **six cartes déjà chargées**, sans nouvel appel HTTP. Mobile : 2 visibles ; tablette : 4 ; ordinateur : 6 (selon cahier des charges).

**Volume initial prévu** : cinq requêtes lorsque les deux genres fixes sont distincts : classement général, détail du premier film, deux catégories fixes, liste des genres. S'y ajoutera une requête de catégorie dynamique si une sélection initiale est chargée et les requêtes de détail aux clics. Ce n'est pas un comptage réseau mesuré dans un navigateur.

Responsabilités cibles des fichiers existants : `assets/js/api.js` (accès `fetch`, statut et erreurs), `movies.js` (mise à jour des cartes), `modal.js` (détail et ouverture/fermeture), `main.js` (initialisation/événements). Lors de cette analyse, ils ne contiennent encore **aucune logique fonctionnelle**.

## 5. Limites et prochaines étapes

- Tests **réellement effectués** : les requêtes listées aux sections 2 et 3 ci-dessus et le détail des deux films ; HTML consulté sur GitHub et confirmé identique en local par le développeur.
- À ne pas présenter comme testé : limite maximale de `page_size`, départage des ex æquo, autres filtres, erreurs sur identifiants invalides, comportement réseau du futur front-end, chargement dynamique des composants.
- À réaliser en S5/S7/S8 : implémentation `fetch`, mise à jour du DOM, gestion de `null`, erreurs réseau, liens avec les boutons, sélection dynamique et contrôles de compatibilité.
- Référence de la maquette et des règles responsive : cahier des charges JustStreamIt.
- Conserver les URLs `image_url` de l'API, gérer le recadrage avec le CSS existant.

## Références

- [Installation et démarrage d'OCMovies-API](installation-ocmovies-api.md)
- [Architecture JavaScript et intégration API](architecture-javascript-api.md)
- [API officielle — README](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md)
- [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585)
- [Jira — Epic S2 PY06-4](https://fa8i1.atlassian.net/browse/PY06-4)
