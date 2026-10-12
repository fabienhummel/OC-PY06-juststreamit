# Installation et démarrage d'OCMovies-API

> **OC-PY06 — JustStreamIt · État documentaire au 12 octobre 2026**
>
> Ce guide décrit la **procédure officielle à exécuter**, et non une installation qui aurait été fraîchement testée lors de sa rédaction. La validation du lancement de l'API est signalée dans Jira (`PY06-15`, *Terminé*) ; la préparation de l'environnement et sa documentation restent à confirmer (`PY06-14` et `PY06-16`, *À faire*).

## 1. Rôle et périmètre

JustStreamIt est une interface **HTML / CSS / JavaScript vanilla**. Ses données de films proviennent d'**OCMovies-API**, un serveur REST local distinct du dépôt front-end.

- Dépôt officiel de l'API : [OpenClassrooms-Student-Center/OCMovies-API-EN-FR](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR).
- README officiel, à privilégier pour les commandes : [OCMovies-API — README](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md).
- Dépôt du front-end : [OC-PY06-juststreamit](../README.md).
- Base HTTP locale documentée : `http://localhost:8000/api/v1/`.

L'API fournit des endpoints accessibles en **GET**, sans modification de données par le front-end. Elle n'est **pas** incluse dans le dépôt JustStreamIt.

## 2. Prérequis

- Python 3 avec `venv` et `pip` ;
- Git (ou téléchargement de l'archive officielle) ;
- un terminal et un navigateur ;
- un dossier **séparé** pour les sources de l'API et celles du front-end.

Ces outils sont des prérequis de la procédure, pas une preuve de leur présence sur une machine précise.

## 3. Installation initiale — macOS / Linux

Exécuter les commandes dans l'ordre, depuis le répertoire dans lequel on souhaite installer l'API :

~~~bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
~~~

~~~bash
cd OCMovies-API-EN-FR
~~~

~~~bash
python3 -m venv env
~~~

~~~bash
source env/bin/activate
~~~

~~~bash
pip install -r requirements.txt
~~~

~~~bash
python manage.py create_db
~~~

~~~bash
python manage.py runserver
~~~

**Remarque sur le dossier :** les versions française et anglaise du README officiel donnent des exemples de noms de répertoire différents. `OCMovies-API-EN-FR` est ici le nom normalement créé par la commande `git clone` ci-dessus, tant que l'on ne le renomme pas.

**Remarque sur Python :** la procédure officielle emploie `python3` pour la création de l'environnement virtuel sur macOS/Linux, puis `python` après son activation. Vérifier que ces commandes désignent bien l'interpréteur attendu.

## 4. Installation initiale — Windows

Depuis un terminal **Invite de commandes (cmd)**, suivre la procédure officielle :

~~~bat
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
~~~

~~~bat
cd OCMovies-API-EN-FR
~~~

~~~bat
python -m venv env
~~~

~~~bat
env\Scripts\activate
~~~

~~~bat
pip install -r requirements.txt
~~~

~~~bat
python manage.py create_db
~~~

~~~bat
python manage.py runserver
~~~

L'activation ci-dessus correspond à **cmd** ; PowerShell et les autres shells peuvent utiliser une autre syntaxe.

## 5. Lancements suivants et arrêt

Après l'installation initiale, se placer dans le dossier de l'API, activer l'environnement puis lancer :

~~~bash
source env/bin/activate
python manage.py runserver
~~~

Sous Windows, utiliser l'activation `env\Scripts\activate` adaptée au terminal.

Le serveur occupe le terminal tant qu'il fonctionne. Pour l'arrêter, utiliser généralement **Ctrl+C** dans ce terminal. Les commandes d'installation des dépendances et de création de la base ne sont pas à répéter à chaque lancement.

## 6. Vérifier les endpoints

Lorsque le serveur est démarré, vérifier chaque URL dans un navigateur ou avec `curl` :

| Objectif | Méthode | URL |
| --- | --- | --- |
| Liste et filtres des films | GET | `http://localhost:8000/api/v1/titles/` |
| Détail du film exemple (*Avatar*) | GET | `http://localhost:8000/api/v1/titles/499549` |
| Liste des genres | GET | `http://localhost:8000/api/v1/genres/` |

Exemples pour un terminal :

~~~bash
curl -i http://localhost:8000/api/v1/titles/
~~~

~~~bash
curl -i http://localhost:8000/api/v1/titles/499549
~~~

~~~bash
curl -i http://localhost:8000/api/v1/genres/
~~~

À contrôler : réponse HTTP exploitable, corps JSON, structure des listes et du détail, présence éventuelle de pagination. **Ces requêtes sont des tests à effectuer : elles n'ont pas été exécutées pour rédiger cette page.**

### Filtres disponibles selon le README officiel

Sur `/api/v1/titles/`, le README décrit notamment :

- `genre=<nom>` / `genre_contains=<texte>` : filtrage par genre ;
- `sort_by=<champ>` : tri, avec possibilité d'inverser le sens par le préfixe `-` ;
- `title=<titre>` / `title_contains=<texte>` : recherche par titre ;
- `imdb_score_min=<score>` : filtrage sur la note IMDb.

Sur `/api/v1/genres/` : `name_contains=<texte>` et `movie_title_contains=<texte>`.

**À confirmer en S2 :** le champ de tri exact à utiliser pour le classement IMDb, l'ordre et la pagination réels, ainsi que le mapping des réponses JSON. Le README illustre la syntaxe de `sort_by`, mais la requête finale de JustStreamIt doit encore être vérifiée.

### Images

La page Confluence [OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585) documente un test du détail d'*Avatar* : `GET /api/v1/titles/499549`. Le champ `image_url` renvoyait une image de **182 × 268 px** lors de ce test antérieur.

Le front-end doit utiliser l'URL fournie par l'API et gérer le recadrage en CSS (`object-fit: cover`), sans supposer que la manipulation manuelle d'URLs externes fait partie du contrat de l'API.

## 7. Vérifications et dépannage à consigner

Si une commande échoue, identifier d'abord la phase :

1. `git clone` : dépôt accessible et dossier de destination correct ;
2. `venv` et `pip` : environnement activé et dépendances installées ;
3. `create_db` : présence des fichiers de l'API, base initialisée ;
4. `runserver` : démarrage et port local disponibles ;
5. requêtes GET : serveur effectivement démarré et URL exacte.

Ne pas présenter un résultat comme réussi avant de l'avoir observé. Conserver, si utile, les commandes effectivement utilisées et le retour obtenu pour la soutenance.

## 8. État d'avancement Jira au 12 octobre 2026

| Ticket | Suivi |
| --- | --- |
| [PY06-3 — S1 OCMovies API](https://fa8i1.atlassian.net/browse/PY06-3) | À faire |
| [PY06-14 — Préparer l'environnement](https://fa8i1.atlassian.net/browse/PY06-14) | À faire |
| [PY06-15 — Lancer et vérifier l'API](https://fa8i1.atlassian.net/browse/PY06-15) | Terminé (déclaré dans Jira) |
| [PY06-16 — Documenter l'installation](https://fa8i1.atlassian.net/browse/PY06-16) | À faire lors du relevé ; ce guide constitue une **première version documentaire**, pas une validation pratique |
| [PY06-4 — S2 Analyse API](https://fa8i1.atlassian.net/browse/PY06-4) | En cours |

## Sources

- [README officiel OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/blob/master/README.md) : procédure et endpoints.
- [Confluence — OCMovies API](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31555585) : essai documenté et travaux restants.
- [Consignes OpenClassrooms, étapes 1 et 2](https://openclassrooms.com/fr/paths/879/projects/835) : exécuter l'API localement et analyser ses réponses.
