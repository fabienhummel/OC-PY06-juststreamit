# Architecture JavaScript et intégration API

> **OC-PY06 — JustStreamIt · Version actuelle après la refonte du 29 octobre 2026**
>
> Référence : [Pull Request #1](https://github.com/fabienhummel/OC-PY06-juststreamit/pull/1) · [Commit de refonte `5279169`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/5279169b779112fc517850597be327da1408f914) · Fusion dans `main` : `2725bc0`. Première version conservée dans la [branche de sauvegarde](https://github.com/fabienhummel/OC-PY06-juststreamit/tree/backup/main-before-dynamic-cards-2026-10-29).

## 1. Principe

JustStreamIt utilise **HTML5, CSS3 et JavaScript vanilla**, sans framework et sans modules `import/export`. Les films proviennent d'OCMovies-API, accessible localement à `http://localhost:8000/api/v1/`, au moyen de requêtes `fetch()` retournant du JSON.

La refonte conserve **`index.html` et `assets/css/style.css` inchangés**. Les 24 cartes d'exemple (six par section) restent dans le fichier HTML d'origine, mais `displayMovieCards()` les retire du DOM et crée les cartes correspondant réellement aux résultats de l'API. Le nombre de cartes n'est donc plus limité au nombre de balises `article` écrites dans le HTML.

## 2. Les dix fichiers JavaScript

| Fichier | Responsabilité |
| --- | --- |
| [`api.js`](../assets/js/api.js) | `fetchApi()`, `getTopMovies(pageSize)`, `getMoviesByGenre(genre, pageSize)`, `getGenres()` et `getMovieDetails(id)` |
| [`movies.js`](../assets/js/movies.js) | `setMoviePoster()` : affiche de l'API et image locale de remplacement |
| [`cards.js`](../assets/js/cards.js) | `createMovieCard(film)` et `displayMovieCards(sectionId, films)` : création des cartes et reconstruction d'une grille |
| [`best-movie.js`](../assets/js/best-movie.js) | `displayBestMovie()` : affiche la vedette indépendamment des cartes |
| [`sections.js`](../assets/js/sections.js) | Configuration `MOVIE_SECTIONS`, limite `MOVIES_PER_SECTION` et boucle `loadMovieSections()` |
| [`genre-selector.js`](../assets/js/genre-selector.js) | Remplissage de la liste des genres, écoute de `change`, actualisation de « Autres » |
| [`toggles.js`](../assets/js/toggles.js) | Gestion des boutons « Voir plus / Voir moins » et de leur visibilité |
| [`modal.js`](../assets/js/modal.js) | Modale de détail, délégation d'événements, clavier et restauration du focus |
| [`error-modal.js`](../assets/js/error-modal.js) | `showApiError()` : dialogue commun aux échecs des requêtes |
| [`main.js`](../assets/js/main.js) | Chargement des fichiers spécialisés, initialisation des événements et lancement du chargement initial |

Chaque fichier comporte un **en-tête**, des commentaires en français et une documentation **JSDoc** des fonctions.

### Chargement sans modifier `index.html`

Les quatre fichiers historiques restent chargés par le HTML avec l'attribut `defer` dans l'ordre `api.js`, `movies.js`, `modal.js` et `main.js`. La fonction `startApp()` de `main.js` charge ensuite **six fichiers supplémentaires**, l'un après l'autre, via `loadScript(filename)` et des balises `script` créées avec `document.createElement("script")`. L'initialisation attend la disponibilité des dépendances et du DOM. Ce sont des **scripts classiques**, non des modules ES.

## 3. Deux boucles et une seule fonction de création

```text
OCMovies-API (JSON)
        |
        v
api.js : fetchApi(), getTopMovies(), getMoviesByGenre()
        |
        v
sections.js : for (const section of MOVIE_SECTIONS)   [boucle des sections]
        |
        v
cards.js : displayMovieCards(sectionId, films)
        |
        +--> for (const film of films)                 [boucle des films]
                  |
                  +--> createMovieCard(film)           [une seule fonction]
                          |
                          +--> document.createElement("article")
                          +--> structure HTML fixe / titre via textContent
                          +--> data-movie-id / setMoviePoster()
                          +--> ajout dans .movie-grid
```

La fonction `displayMovieCards()` sélectionne la grille, supprime son ancien contenu avec `replaceChildren()` et ajoute une carte par film avec `appendChild()`. La structure HTML de la carte est créée **en JavaScript** (`createElement()` et `innerHTML` contenant seulement du balisage fixe). Le titre issu de l'API est renseigné avec `textContent`, et l'identifiant du film avec `dataset.movieId`. **Aucun `template`, `cloneNode()` ou framework n'est utilisé.**

### Sections et nombre de films

`MOVIE_SECTIONS` définit les sections `#top-movies`, `#category-1` (Action), `#category-2` (Comedy) et `#other-category` (Biography par défaut). `loadMovieSections()` parcourt ces quatre configurations.

Le paramètre `MOVIES_PER_SECTION = 6` dans `sections.js` fixe le **nombre demandé à l'API par défaut**, sans imposer de limite aux cartes que la fonction sait créer. La section « Films les mieux notés » récupère un film supplémentaire pour la vedette, puis exclut celui-ci des cartes. Les fonctions `getTopMovies(pageSize)` et `getMoviesByGenre(genre, pageSize)` acceptent une valeur configurable pour `page_size`.

### Sélecteur de la catégorie « Autres »

L'écouteur `change` dans `genre-selector.js` appelle `getMoviesByGenre(genre, MOVIES_PER_SECTION)`, puis **la même fonction `displayMovieCards()`** que les sections fixes. Le compteur `latestRequestId` empêche une réponse plus ancienne de remplacer le choix le plus récent. Lors d'une erreur, les cartes de cette section sont vidées et le dialogue d'erreur est affiché.

## 4. Responsive et interactions

Les règles CSS existantes conservent les points de rupture **768 px** et **1024 px** :

| Écran | Largeur de référence | Cartes visibles au départ | Colonnes |
| --- | ---: | ---: | ---: |
| Mobile | 456 px | 2 | 1 |
| Tablette | 788 px | 4 | 2 |
| Ordinateur | 1054 px | Toutes les cartes chargées (6 par défaut) | 3 |

`toggles.js` affiche ou masque « Voir plus / Voir moins » selon le nombre réel de cartes et la largeur de l'écran. Le clic ajoute ou retire `.is-expanded` et met à jour `aria-expanded`. Aucun appel API supplémentaire n'est nécessaire.

`modal.js` écoute les clics sur le conteneur principal avec la **délégation d'événements** : les cartes recréées gardent donc un bouton « Détails » fonctionnel. La modale de film récupère `GET /titles/{id}`, renseigne les informations, prend en charge Échap et Tab/Shift+Tab, puis restaure le focus. Les erreurs de détail et de genre utilisent `showApiError()` dans `error-modal.js` et l'élément natif `#api-error-dialog` déjà présent dans le HTML.

## 5. API et données

| Fonction | Appel |
| --- | --- |
| `getTopMovies(pageSize = 7)` | `GET /api/v1/titles/?sort_by=-imdb_score&page_size=N` |
| `getMoviesByGenre(genre, pageSize = 6)` | `GET /api/v1/titles/?genre=...&sort_by=-imdb_score&page_size=N` |
| `getGenres()` | `GET /api/v1/genres/?page_size=25` |
| `getMovieDetails(id)` | `GET /api/v1/titles/{id}` |

Les données de détail comprennent le titre, les résumés, l'affiche, la date, les genres, la classification, la durée, les pays, les recettes, les réalisateurs et les acteurs. Les valeurs absentes sont remplacées par des libellés de repli. Les affiches distantes inaccessibles sont remplacées par `assets/images/movie_poster.png`.

L'analyse détaillée des paramètres et résultats de l'API se trouve dans [Analyse OCMovies](analyse-api-ocmovies.md).

## 6. Validation de la refonte (29 octobre 2026)

Les **neuf scénarios manuels** confirmés dans Brave couvrent : affichage des quatre sections ; passage de six à neuf cartes ; catégorie « Autres » avec un genre à deux films ; modale de détail et gestion du focus ; Voir plus/Voir moins sur mobile à 456 px et tablette à 788 px avec neuf films ; erreur API lors du changement de genre ; rétablissement de la connexion sans rechargement ; et erreur API lors du chargement de détails. Le projet a ensuite été remis à **six films par section**. `node --check` sur les dix fichiers n'a signalé aucune erreur de syntaxe, et `git status --short` était vide après la synchronisation locale.

Ces observations sont des **tests manuels**, pas une suite de tests automatisés. Les tests multi-navigateurs et validations W3C antérieurs concernent la version avant cette refonte : voir [Tests et validation](tests-et-validation.md) pour distinguer les dates et les limites.

## 7. Historique Git et suivi

- **Version initiale** : [branche `backup/main-before-dynamic-cards-2026-10-29`](https://github.com/fabienhummel/OC-PY06-juststreamit/tree/backup/main-before-dynamic-cards-2026-10-29), commit `4e3ba66`.
- **Refonte** : [branche `feature/dynamic-movie-cards`](https://github.com/fabienhummel/OC-PY06-juststreamit/tree/feature/dynamic-movie-cards), commit `5279169`.
- **Fusion** : [Pull Request #1](https://github.com/fabienhummel/OC-PY06-juststreamit/pull/1), `main` au commit `2725bc0` après fusion.
- **Jira** : [PY06-34 — Finaliser le dépôt et préparer la soutenance](https://fa8i1.atlassian.net/browse/PY06-34) reste en cours tant que la préparation de la soutenance n'est pas terminée.
- **Confluence** : [JavaScript et intégration API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/30965762) · [Architecture front-end](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31522857) · [Tests et validation W3C](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621121).

**Remarque historique :** l'architecture initiale à quatre fichiers et à cartes HTML réutilisées figure dans les commits précédents et dans la branche de sauvegarde. Le présent document décrit la version **actuelle** à dix fichiers.
