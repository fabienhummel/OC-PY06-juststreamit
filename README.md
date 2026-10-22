# OC-PY06 — JustStreamIt

Projet 6 du parcours **Développeur Python** d'OpenClassrooms : **Développez une interface utilisateur pour une application web Python**.

L'objectif est de développer l'interface front-end de **JustStreamIt**, une application web permettant de consulter des films classés à partir des données fournies par **OCMovies-API**.

## Objectifs pédagogiques

- Développer la partie front-end d'une application avec **HTML5**, **CSS3** et **JavaScript**.
- Interagir avec une **API REST**.
- Manipuler des données JSON récupérées avec `fetch()`.
- Développer une interface responsive pour mobile, tablette et ordinateur.
- Produire un code HTML sémantique et conforme aux bonnes pratiques du Web.

## Fonctionnalités attendues

L'interface doit notamment proposer :

- un film mis en avant : **Meilleur film** ;
- une section **Films les mieux notés** ;
- deux catégories de films fixes ;
- une catégorie dynamique choisie par l'utilisateur ;
- six films par section ;
- un comportement responsive avec **Voir plus / Voir moins** ;
- une fenêtre modale affichant les informations détaillées d'un film.

## Contraintes techniques

Le projet est réalisé avec :

- **HTML5** ;
- **CSS3 vanilla** ;
- **JavaScript vanilla** ;
- l'API native **Fetch** ;
- **OCMovies-API** exécutée localement.

Le projet n'utilise pas de framework JavaScript. Le code final devra notamment être responsive, ne générer aucune erreur JavaScript dans la console et respecter les standards W3C.

## API OCMovies

Les données sont fournies par le projet OCMovies-API d'OpenClassrooms :

https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR

L'API est un projet distinct : elle n'est pas incluse dans ce dépôt et doit être installée et exécutée séparément en local.

## Maquettes

Les maquettes de référence sont disponibles sur Figma :

https://www.figma.com/design/6KzVM5R2pOBX637RcVWjJ7/Maquettes-JustStreamIt?node-id=0-1&p=f

## Documentation de l'interface

- [UI et maquettes Figma](docs/ui-et-maquettes-figma.md) : principes d'intégration, responsive, Dev Mode et état du CSS.
- [Analyse détaillée de la maquette Figma — Design System et dimensions](docs/analyse-detaillee-maquette-figma.md) : transcription complète des mesures, composants et caractéristiques de la maquette (source Confluence).
- [Installation et démarrage d'OCMovies-API](docs/installation-ocmovies-api.md) : procédure issue du dépôt officiel, endpoints et vérifications à réaliser.
- [Architecture JavaScript et intégration API](docs/architecture-javascript-api.md) : découpage cible, flux de données et état réel des fichiers JavaScript.
- [Tests et validation](docs/tests-et-validation.md) : bilan des contrôles réalisés, scénarios restants, W3C et navigateurs.
- [Feuille de style actuelle](assets/css/style.css) : code CSS implémenté, voir le [commit `06a6be2`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/06a6be2).

## Structure du dépôt

```text
OC-PY06-juststreamit/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── .gitkeep
│   │   ├── logo_juststreamit.svg
│   │   └── movie_poster.png
│   └── js/
│       ├── api.js
│       ├── main.js
│       ├── modal.js
│       └── movies.js
├── docs/
│   ├── .gitkeep
│   ├── analyse-api-ocmovies.md
│   ├── analyse-detaillee-maquette-figma.md
│   ├── architecture-javascript-api.md
│   ├── installation-ocmovies-api.md
│   ├── tests-et-validation.md
│   └── ui-et-maquettes-figma.md
├── .gitignore
├── index.html
└── README.md
```

## Roadmap


| Étape | Contenu | Statut |
| --- | --- | --- |
| S0 | Initialisation GitHub, Confluence et Jira | Terminé |
| S1 | Installation et validation de OCMovies-API | Terminé |
| S2 | Analyse des réponses de l'API | Terminé |
| S3 | Structure HTML5 | En cours |
| S4 | Mise en forme CSS et intégration des maquettes | Terminé |
| S5 | Chargement des données avec JavaScript | Terminé |
| S6 | Responsive design | En cours |
| S7 | Interface dynamique et modale | Terminé |
| S8 | Catégorie dynamique | Terminé |
| S9 | Validation, documentation et préparation de la soutenance | En cours |

_Statuts Jira vérifiés le 22 octobre 2026._



## État des réalisations

- **S1 — Installation API :** OCMovies-API est installée et fonctionne en local. La procédure est documentée dans [le guide d'installation](docs/installation-ocmovies-api.md).

- **S2 — Analyse API :** les endpoints, les paramètres de tri, les filtres, la pagination et les réponses JSON ont été analysés et documentés dans [l'analyse API](docs/analyse-api-ocmovies.md).

- **S3 — Structure HTML :** les sections, les cartes de films et les fenêtres modales sont implémentées. Le fichier `index.html` a passé la validation W3C sans erreur ni avertissement. L'épic Jira reste à clôturer.

- **S4 — CSS et maquettes :** la présentation respecte les principes des maquettes Figma. La feuille CSS a passé la validation W3C sans erreur.

- **S5 — JavaScript et API :** les films et les genres sont chargés dynamiquement avec `fetch()`. Le code est organisé en plusieurs fichiers selon leurs responsabilités.

- **S6 — Responsive :** les mises en page mobile, tablette et ordinateur sont implémentées et testées. L'épic Jira reste à clôturer.

- **S7 — Interface dynamique :** les boutons « Voir plus / Voir moins » et les fenêtres modales de détail sont fonctionnels.

- **S8 — Catégorie dynamique :** l'utilisateur peut sélectionner un genre et consulter les films correspondants. Biography est sélectionné par défaut.

- **S9 — Qualité et soutenance :** les validations HTML et CSS W3C, les tests JavaScript, les tests de navigation au clavier et les contrôles sur Brave, Safari et Chrome ont été réalisés. La documentation finale et la préparation de la soutenance sont en cours.

Les résultats des contrôles et les limites des tests sont consignés dans Confluence et seront intégrés à la documentation finale du dépôt.


## Environnement de développement

Le dépôt est prévu pour pouvoir être utilisé aussi bien sous **macOS** que sous **Windows**, notamment avec :

- Visual Studio Code ;
- JetBrains WebStorm.

Les fichiers de configuration propres aux IDE et aux systèmes d'exploitation sont exclus du versionnement via `.gitignore`.

## Auteur

**Fabien Hummel**

Projet réalisé dans le cadre de la formation OpenClassrooms **Développeur Python**.
