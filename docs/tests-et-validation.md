# Tests et validation — JustStreamIt

> **OC-PY06 · Bilan des contrôles et suivi Jira au 22 octobre 2026**
>
> Ce document récapitule les validations W3C et les tests manuels effectués. Il ne constitue pas une campagne automatisée ni un audit exhaustif de compatibilité sur tous les navigateurs.

## 1. Références et périmètre

Sources de contrôle :

- [Cahier des charges JustStreamIt — projet OpenClassrooms](https://openclassrooms.com/fr/paths/879/projects/835) : zones attendues, modale, données API et contraintes ;
- [Confluence — Tests et validation W3C](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621121) ;
- [Confluence — Autoévaluation OpenClassrooms](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621141) ;
- [UI et maquettes Figma](ui-et-maquettes-figma.md) et [relevés détaillés](analyse-detaillee-maquette-figma.md) ;
- [`index.html`](../index.html), [`style.css`](../assets/css/style.css) et [architecture JavaScript](architecture-javascript-api.md).

La mission demande un rendu responsive sur trois formats, une interface conforme à la maquette, des requêtes via `fetch()`, du JavaScript vanilla, du HTML sémantique, une validation HTML/CSS W3C et une absence d'erreurs JavaScript en console.


## 2. État réellement observé au 22 octobre 2026

### Contrôles fonctionnels réalisés

- **OCMovies-API :** les endpoints des films, des détails et des genres ont été vérifiés.
- **Chargement initial :** le meilleur film, les six films les mieux notés et les catégories fixes Action et Comedy sont alimentés depuis l'API.
- **Catégorie dynamique :** les genres sont récupérés depuis l'API. Biography est sélectionné automatiquement au démarrage.
- **Voir plus / Voir moins :** le nombre de films affichés s'adapte aux formats mobile, tablette et ordinateur.
- **Modale de détail :** les informations des films sont récupérées dynamiquement et affichées correctement.
- **Accessibilité :** ouverture au clavier, fermeture avec Échap, gestion du focus et attributs ARIA testés.
- **Gestion des erreurs :** une modale générique signale les échecs des requêtes API. Le retour à un fonctionnement normal a été vérifié.
- **Requêtes simultanées :** les réponses obsolètes sont ignorées lors des changements rapides de genre ou de film.

### Validations techniques

- **HTML W3C :** 0 erreur, 0 avertissement lors de la dernière validation communiquée.
- **CSS W3C :** 0 erreur, 7 avertissements informatifs.
- **JavaScript :** vérification syntaxique des fichiers avec `node --check`, sans erreur.
- **Git :** vérification avec `git diff --check`, sans anomalie.
- **Navigateurs :** fonctionnement confirmé manuellement dans Brave, Safari et Google Chrome.

### Limites des vérifications

- Les tests sont principalement manuels ; aucune suite de tests automatisés n'a été exécutée.
- Firefox n'a pas encore fait l'objet d'un test confirmé.
- Certaines affiches distantes renvoient des erreurs HTTP 404. Une image locale de remplacement est utilisée.
- Une validation HTML finale reste à refaire après les tout derniers ajustements structurels.



## 3. Formats et responsive

L'interface utilise une approche **mobile first**, avec deux points de rupture CSS : 768 px et 1024 px.

Les dimensions des maquettes Figma servent de références pour les tests visuels.

| Format | Largeur testée | Organisation | Films visibles initialement |
| --- | ---: | --- | ---: |
| Mobile | 456 px | 1 colonne | 2 |
| Tablette | 788 px | 2 colonnes | 4 |
| Ordinateur | 1054 px | 3 colonnes | 6 |

### Boutons « Voir plus / Voir moins »

- **Mobile :** « Voir plus » affiche jusqu'à 6 films au lieu de 2.
- **Tablette :** « Voir plus » affiche jusqu'à 6 films au lieu de 4.
- **Ordinateur :** les 6 films sont directement visibles et le bouton est masqué.
- **Catégorie dynamique :** le bouton est masqué lorsque le nombre de films ne permet pas d'en afficher davantage.

Les changements d'état sont gérés en JavaScript avec la classe CSS `is-expanded` et l'attribut `aria-expanded`.

### Tests réalisés

- Affichage des cartes vérifié sur les trois formats de référence.
- Fonctionnement de « Voir plus / Voir moins » confirmé.
- Changement de genre testé avec la catégorie dynamique.
- Passage de 6 à 2 puis à 6 films vérifié avec les genres Biography et Adult.
- Redimensionnement de 456 à 788 puis 1054 px sans rechargement : fonctionnement confirmé.
- Défilement vertical et fermeture de la modale sur mobile : fonctionnement confirmé.

### Limites

Les contrôles ont été réalisés manuellement. Une campagne automatisée de tests responsive n'a pas été effectuée.

Une vérification supplémentaire sur des écrans très étroits, notamment à 320 px, reste recommandée.


## 4. Résultats des tests fonctionnels

Les tests suivants ont été réalisés manuellement avec
OCMovies-API exécutée en local.

| Fonctionnalité | Résultat attendu | État |
| --- | --- | --- |
| API locale | Récupération des films, genres et détails | Validé |
| Meilleur film | Titre, affiche et résumé du film le mieux noté | Validé |
| Films les mieux notés | Six films supplémentaires classés par score IMDb | Validé |
| Catégories fixes | Chargement des films Action et Comedy | Validé |
| Catégorie dynamique | Genres récupérés depuis l'API | Validé |
| Catégorie par défaut | Biography sélectionné au démarrage | Validé |
| Changement de genre | Actualisation des films sans recharger la page | Validé |
| Résultats insuffisants | Masquage des cartes inutilisées | Validé |
| Affichage mobile | Deux films visibles initialement | Validé |
| Affichage tablette | Quatre films visibles initialement | Validé |
| Affichage ordinateur | Six films visibles, sans bouton Voir plus | Validé |
| Voir plus / Voir moins | Affichage ou masquage des films supplémentaires | Validé |
| Détails d'un film | Ouverture de la modale correspondant au film sélectionné | Validé |
| Informations de la modale | Affichage des données détaillées issues de l'API | Validé |
| Fermeture de la modale | Boutons et touche Échap fonctionnels | Validé |
| Navigation au clavier | Gestion du focus et des touches Tab / Shift + Tab | Validé |
| Images indisponibles | Affichage d'une image locale de remplacement | Validé |
| Requêtes rapprochées | Ignorance des réponses obsolètes | Test manuel réussi |
| Erreur réseau | Affichage d'une modale d'erreur générique | Validé |
| Retour à la connexion | Chargement à nouveau fonctionnel sans actualisation | Validé |
| Erreurs JavaScript | Aucune exception visible durant les contrôles Brave | Validé sur les parcours testés |

### Méthode de validation

Les résultats proviennent de tests manuels réalisés
dans le navigateur pendant le développement.

Les cas particuliers ont notamment été vérifiés avec :

- **Hopeful Notes** : affiche indisponible et recettes absentes.
- **Schindler's List** : chargement des détails depuis la catégorie dynamique.
- **Biography et Adult** : passage de six à deux films, puis retour à six.
- **Mode Offline de Brave** : simulation d'une panne réseau et vérification du rétablissement.

Ces résultats ne constituent pas une suite de tests automatisés.


## 5. Fenêtres modales : tests et accessibilité

### 5.1. Modale de détail des films

La fenêtre `#movie-modal` affiche les informations détaillées
du film sélectionné, récupérées depuis OCMovies-API.

**Informations affichées :**

- Titre et affiche du film.
- Date de sortie et genres.
- Classification, durée et pays d'origine.
- Score IMDb et recettes au box-office.
- Réalisateurs et acteurs.
- Résumé détaillé.

**Tests réalisés :**

- Ouverture depuis le meilleur film et les cartes des catégories.
- Vérification des informations de plusieurs films.
- Remplacement des affiches indisponibles par une image locale.
- Affichage « Non disponible » lorsque les recettes sont absentes.
- Défilement vertical de la modale sur mobile.
- Fermeture avec le bouton « Fermer », la croix ou la touche Échap.

### 5.2. Accessibilité de la modale

La modale utilise les attributs `role="dialog"`,
`aria-modal="true"` et `aria-labelledby`.

Les tests manuels au clavier ont confirmé :

- L'ouverture avec la touche Entrée.
- Le déplacement du focus dans la modale à son ouverture.
- Le maintien du focus dans la modale avec Tab et Shift + Tab.
- La fermeture avec la touche Échap.
- Le retour du focus sur le bouton « Détails » d'origine.
- La possibilité de rouvrir la même modale avec Entrée.

### 5.3. Modale d'erreur API

La fenêtre `#api-error-dialog` utilise l'élément HTML natif
`<dialog>` et la méthode JavaScript `showModal()`.

Elle est commune aux erreurs de chargement des catégories
et aux erreurs de récupération des détails des films.

**Tests réalisés :**

- Simulation d'une panne réseau avec le mode Offline de Brave.
- Affichage du message « Chargement impossible ».
- Fermeture avec le bouton « Fermer » et la touche Échap.
- Masquage des anciennes cartes après l'échec d'un changement de genre.
- Reprise du chargement après rétablissement de la connexion,
  sans actualisation de la page.

### 5.4. Limites

La validation de l'accessibilité repose sur des tests manuels
au clavier. Aucun audit complet avec lecteur d'écran ou outil
automatisé d'accessibilité n'a été réalisé.


## 6. Validation W3C — Résultats

Les fichiers HTML et CSS ont été contrôlés le 22 octobre 2026
à l'aide des validateurs officiels du W3C.

### 6.1. Validation HTML

**Outil :** [Nu Html Checker](https://validator.w3.org/nu/)

**Fichier contrôlé :** `index.html`

| Contrôle | Résultat |
| --- | --- |
| Erreurs | 0 |
| Avertissements | 0 |
| Validation | Réussie |

Le fichier a été revalidé après l'ajout des attributs ARIA,
de la fenêtre modale d'erreur et du composant HTML `<dialog>`.

### 6.2. Validation CSS

**Outil :** [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

**Fichier contrôlé :** `assets/css/style.css`

**Profil :** CSS niveau 3 + SVG

| Contrôle | Résultat |
| --- | --- |
| Erreurs | 0 |
| Avertissements | 7 |
| Validation | Réussie |

Les sept avertissements sont informatifs :

- Un avertissement indique que le validateur ne vérifie
  pas la feuille Google Fonts importée.
- Six avertissements concernent les variables CSS `var()`,
  dont les valeurs ne peuvent pas être entièrement
  évaluées statiquement.

### 6.3. Correction effectuée

La propriété CSS déconseillée :

`clip: rect(0, 0, 0, 0);`

a été remplacée par :

`clip-path: inset(50%);`

Cette modification a supprimé l'avertissement correspondant.

### 6.4. Limites des validations

Les contrôles ont été réalisés par téléchargement des fichiers
dans les validateurs W3C.

Ces validations vérifient la conformité du code HTML et CSS
aux règles analysées par les outils. Elles ne garantissent pas,
à elles seules, l'accessibilité complète ni le fonctionnement
de toutes les interactions JavaScript.


## 7. Vérification multi-navigateurs

Les tests de compatibilité ont été effectués manuellement
le 22 octobre 2026 sur macOS.

### 7.1. Navigateurs testés

| Navigateur | Moteur de rendu | Résultat |
| --- | --- | --- |
| Brave | Chromium (Blink) | Fonctionnel |
| Google Chrome | Chromium (Blink) | Fonctionnel |
| Safari | WebKit | Fonctionnel |
| Firefox | Gecko | Non testé |

### 7.2. Fonctionnalités vérifiées

Les parcours fonctionnels ont été confirmés dans Brave,
Safari et Google Chrome.

Ils comprennent notamment :

- Le chargement des films depuis OCMovies-API.
- L'affichage des sections et des affiches.
- La sélection d'une catégorie dynamique.
- L'ouverture et la fermeture des détails d'un film.

Des vérifications complémentaires ont été réalisées dans Brave :

- Affichage responsive sur mobile, tablette et ordinateur.
- Fonctionnement des boutons Voir plus / Voir moins.
- Navigation au clavier dans la modale.
- Simulation d'une connexion réseau lente.
- Simulation d'une panne réseau avec le mode Offline.
- Rétablissement de la connexion sans rechargement.

### 7.3. Résultats

Aucune anomalie fonctionnelle bloquante n'a été signalée
pendant les parcours réalisés sur les trois navigateurs.

Dans Brave, aucune exception JavaScript non gérée
n'a été observée lors du contrôle du chargement initial.

Certaines affiches distantes provoquent des réponses HTTP 404.
Le mécanisme de remplacement par une affiche locale fonctionne.

### 7.4. Limites

Les tests ont été réalisés manuellement et ne constituent
pas une campagne automatisée de compatibilité.

Les contrôles responsive approfondis et les simulations
de panne réseau ont été effectués dans Brave.

Firefox n'a pas encore été testé.


## 8. Qualité, contenu et livraison

### 8.1. Contrôles réalisés

- [x] Installation et fonctionnement d'OCMovies-API.
- [x] Analyse des endpoints, du tri et de la pagination.
- [x] Chargement dynamique des films et des genres.
- [x] Affichage responsive des films (2 / 4 / 6).
- [x] Fonctionnement des boutons Voir plus / Voir moins.
- [x] Catégorie dynamique avec genre sélectionnable.
- [x] Gestion des catégories contenant moins de six films.
- [x] Fenêtre modale affichant les détails des films.
- [x] Navigation au clavier et gestion du focus dans la modale.
- [x] Gestion des images indisponibles.
- [x] Gestion des erreurs API avec une modale dédiée.
- [x] Protection contre les réponses API obsolètes.
- [x] Tests manuels sous Brave, Safari et Chrome.
- [x] Validation HTML W3C sans erreur ni avertissement.
- [x] Validation CSS W3C sans erreur.
- [x] Vérification syntaxique JavaScript avec Node.js.
- [x] Vérification de la mise en forme avec Git.
- [x] Publication des fonctionnalités sur GitHub.

### 8.2. Travaux restant à terminer

- [ ] Actualiser l'ensemble des documents du dépôt GitHub.
- [ ] Finaliser le README et les instructions de lancement.
- [ ] Revalider le HTML après les derniers déplacements d'éléments.
- [ ] Compléter l'autoévaluation OpenClassrooms.
- [ ] Préparer la démonstration et les questions de soutenance.
- [ ] Effectuer le commit final de documentation.

### 8.3. Vérifications complémentaires recommandées

Ces contrôles ne sont pas considérés comme obligatoirement
réalisés pour cette livraison :

- Tester le site sous Firefox.
- Vérifier l'affichage sur un écran très étroit (320 px).
- Réaliser un audit avec un lecteur d'écran.
- Ajouter éventuellement des tests automatisés.

### 8.4. État de la livraison

Les principales fonctionnalités de JustStreamIt sont
implémentées et ont été testées manuellement.

Les contrôles de qualité réalisés n'ont pas révélé
d'anomalie bloquante.

La préparation de la livraison finale et de la soutenance
reste en cours dans le cadre du ticket PY06-34.


## 9. Avancement Jira au 22 octobre 2026

Les statuts suivants ont été vérifiés directement dans Jira.

### Épics du projet

| Ticket | Étape | Statut |
| --- | --- | --- |
| [PY06-5](https://fa8i1.atlassian.net/browse/PY06-5) | S3 — Structure HTML | Terminé |
| [PY06-6](https://fa8i1.atlassian.net/browse/PY06-6) | S4 — CSS et Figma | Terminé |
| [PY06-8](https://fa8i1.atlassian.net/browse/PY06-8) | S6 — Responsive | Terminé |
| [PY06-11](https://fa8i1.atlassian.net/browse/PY06-11) | S9 — Qualité et soutenance | En cours |

### Tickets de réalisation et de validation

| Ticket | Objet | Statut |
| --- | --- | --- |
| [PY06-22](https://fa8i1.atlassian.net/browse/PY06-22) | Structure de la modale et validation HTML | Terminé |
| [PY06-23](https://fa8i1.atlassian.net/browse/PY06-23) | Styles Figma et CSS global | Terminé |
| [PY06-24](https://fa8i1.atlassian.net/browse/PY06-24) | Cartes, sections et modale CSS | Terminé |
| [PY06-27](https://fa8i1.atlassian.net/browse/PY06-27) | Implémentation responsive mobile first | Terminé |
| [PY06-28](https://fa8i1.atlassian.net/browse/PY06-28) | Tests responsive sur trois formats | Terminé |
| [PY06-33](https://fa8i1.atlassian.net/browse/PY06-33) | Contrôles qualité finaux | Terminé |
| [PY06-34](https://fa8i1.atlassian.net/browse/PY06-34) | Documentation et soutenance | En cours |

### Points administratifs à finaliser

- PY06-22 et les épics S3 et S6 ont été clôturés dans Jira le 22 octobre 2026.
- Terminer PY06-34 après les livrables de documentation.
- Clôturer l'épic S9 après les vérifications finales.

Ces statuts reflètent l'état de Jira à la date indiquée.
Ils sont distincts de la validation technique du code.

## 10. Sources

- [Confluence — Tests et validation W3C](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621121).
- [Confluence — Autoévaluation OpenClassrooms](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621141).
- [Analyse de la maquette Figma](analyse-detaillee-maquette-figma.md).
- [Cahier des charges et étapes du projet OpenClassrooms](https://openclassrooms.com/fr/paths/879/projects/835).
