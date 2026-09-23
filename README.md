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
│   └── .gitkeep
├── .gitignore
├── index.html
└── README.md
```

## Roadmap

| Étape | Contenu | Statut |
| --- | --- | --- |
| S0 | Initialisation GitHub, Confluence et Jira | En cours |
| S1 | Installation et validation de OCMovies-API | À faire |
| S2 | Analyse des réponses de l'API | À faire |
| S3 | Structure HTML5 | À faire |
| S4 | Mise en forme CSS et intégration des maquettes | À faire |
| S5 | Chargement des données avec JavaScript | À faire |
| S6 | Responsive design | À faire |
| S7 | Interface dynamique et modale | À faire |
| S8 | Catégorie dynamique | À faire |
| S9 | Validation, documentation et préparation de la soutenance | À faire |

## Environnement de développement

Le dépôt est prévu pour pouvoir être utilisé aussi bien sous **macOS** que sous **Windows**, notamment avec :

- Visual Studio Code ;
- JetBrains WebStorm.

Les fichiers de configuration propres aux IDE et aux systèmes d'exploitation sont exclus du versionnement via `.gitignore`.

## Auteur

**Fabien Hummel**

Projet réalisé dans le cadre de la formation OpenClassrooms **Développeur Python**.
