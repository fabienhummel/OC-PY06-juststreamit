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
│   │   └── .gitkeep
│   └── js/
│       ├── api.js
│       ├── main.js
│       ├── modal.js
│       └── movies.js
├── docs/
│   ├── .gitkeep
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
| S1 | Installation et validation de OCMovies-API | À faire |
| S2 | Analyse des réponses de l'API | En cours |
| S3 | Structure HTML5 | En cours |
| S4 | Mise en forme CSS et intégration des maquettes | En cours |
| S5 | Chargement des données avec JavaScript | À faire |
| S6 | Responsive design | En cours |
| S7 | Interface dynamique et modale | À faire |
| S8 | Catégorie dynamique | À faire |
| S9 | Validation, documentation et préparation de la soutenance | À faire |

_Statuts des épics Jira PY06 vérifiés le 12 octobre 2026._

- **S1 :** le test de l'API locale est marqué « Terminé » dans Jira (PY06-15), mais la préparation de l'environnement (PY06-14) et la documentation de son lancement (PY06-16) restent « À faire ». L'étape S1 n'est donc pas clôturée.
- **S2 :** un test de l'endpoint de détail d'un film est documenté dans Confluence ; l'analyse de la liste, des genres et le mapping JSON complet restent à achever.
- **S3 :** la structure HTML des sections et de la modale est présente dans `index.html` avec des données temporaires ; la validation HTML de base reste à effectuer.
- **S4 :** les neuf modules CSS (y compris la modale) sont implémentés et versionnés dans le commit `06a6be2`. Les vérifications visuelles ont été faites dans Brave. L'épic demeure « En cours » jusqu'aux validations W3C et aux contrôles multi-navigateurs.
- **S6 :** les règles responsive mobile first et les grilles à un, deux et trois colonnes sont implémentées. Les contrôles dans Brave sont effectués ; l'étape reste « En cours » pour les tests complémentaires.
- **S5 à S8 :** la présence de contrôles HTML et de styles CSS ne signifie pas que les interactions JavaScript sont déjà fonctionnelles.

## Environnement de développement

Le dépôt est prévu pour pouvoir être utilisé aussi bien sous **macOS** que sous **Windows**, notamment avec :

- Visual Studio Code ;
- JetBrains WebStorm.

Les fichiers de configuration propres aux IDE et aux systèmes d'exploitation sont exclus du versionnement via `.gitignore`.

## Auteur

**Fabien Hummel**

Projet réalisé dans le cadre de la formation OpenClassrooms **Développeur Python**.
