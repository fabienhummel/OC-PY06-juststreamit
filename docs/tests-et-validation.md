# Tests et validation — JustStreamIt

> **OC-PY06 · État du suivi au 12 octobre 2026**
>
> Ce document distingue **vérifié**, **implémenté mais non encore validé**, **à développer** et **à tester**. Il ne constitue ni un rapport de validation W3C, ni un procès-verbal de tests multi-navigateurs.

## 1. Références et périmètre

Sources de contrôle :

- [Cahier des charges JustStreamIt — projet OpenClassrooms](https://openclassrooms.com/fr/paths/879/projects/835) : zones attendues, modale, données API et contraintes ;
- [Confluence — Tests et validation W3C](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621121) ;
- [Confluence — Autoévaluation OpenClassrooms](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621141) ;
- [UI et maquettes Figma](ui-et-maquettes-figma.md) et [relevés détaillés](analyse-detaillee-maquette-figma.md) ;
- [`index.html`](../index.html), [`style.css`](../assets/css/style.css) et [architecture JavaScript](architecture-javascript-api.md).

La mission demande un rendu responsive sur trois formats, une interface conforme à la maquette, des requêtes via `fetch()`, du JavaScript vanilla, du HTML sémantique, une validation HTML/CSS W3C et une absence d'erreurs JavaScript en console.

## 2. État réellement observé

### Contrôles déjà effectués manuellement

- **Brave** : le header, les sections, le meilleur film, les cartes, les boutons et le sélecteur de catégories ont été inspectés visuellement sur des mises en page mobile, tablette et ordinateur au cours de l'intégration CSS.
- **Modale** : son affichage a été simulé avec la classe `is-open` dans les outils de développement ; les dispositions ordinateur et tablette/mobile ont été examinées et corrigées.
- **Sélecteur « Autres »** : disposition mobile sous le titre et centrée ; tablette/desktop sur la même ligne ; texte mobile ajusté pour éviter la troncature dans l'exemple de placeholder.
- **WebStorm** : aucun avertissement ou erreur CSS restant n'a été signalé par le développeur lors de la finalisation des modules.
- **Versionnement** : la feuille CSS a été poussée sur GitHub dans le [commit `06a6be2`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/06a6be2).

**Portée de ces constats :** ce sont des validations **manuelles du rendu CSS**, fondées sur les contrôles communiqués pendant le travail. Elles ne prouvent pas la conformité W3C, la compatibilité générale, les performances, ni le fonctionnement des futures interactions.

### Éléments non encore validés

- Pas de résultat de validation **HTML W3C** ni **CSS W3C** consigné.
- Pas de campagne de test complète consignée sous **Firefox** et **Safari**.
- Pas de test de parcours JavaScript complet (les fichiers JS sont encore des squelettes).
- Pas de test intégré du front-end avec des films effectivement chargés depuis l'API.
- Pas de rapport de tests automatisés déclaré.

## 3. Formats et responsive

Les artboards Figma sont des **références visuelles**, distinctes des breakpoints CSS :

| Format | Largeur Figma à essayer | Breakpoint CSS retenu | Grille actuelle | Objectif fonctionnel final |
| --- | ---: | --- | --- | --- |
| Mobile | 456 px | styles par défaut (< 768 px) | 1 colonne | 2 films visibles au chargement, 6 après « Voir plus » |
| Tablette | 788 px | ≥ 768 px et < 1024 px | 2 colonnes | 4 films visibles au chargement, 6 après « Voir plus » |
| Ordinateur | 1054 px | ≥ 1024 px | 3 colonnes | 6 films visibles sans « Voir plus » |

**Important :** six cartes sont encore présentes dans chacune des quatre sections du HTML. La réduction de visibilité à **2/4/6** et les boutons **Voir plus / Voir moins fonctionnels** ne sont **pas encore implémentés** : les styles responsive ne suffisent pas à remplir cette exigence de l'étape S7.

Contrôles responsive à reproduire après chaque évolution structurante :

- absence de défilement horizontal indésirable ;
- dimensions du header, du meilleur film et des affiches ;
- colonnes 1 / 2 / 3, images non déformées (recadrage `object-fit: cover`) ;
- position du sélecteur « Autres » et lisibilité de ses options ;
- texte qui ne déborde pas, y compris les longs titres et résumés ;
- modale accessible au défilement et commandes de fermeture visibles suivant le format ;
- largeur étroite supplémentaire (par exemple 320 px) comme test de robustesse **recommandé**, non relevé Figma.

## 4. Plan de tests fonctionnels — à exécuter au fil des étapes

| Test | Résultat attendu | État à la rédaction |
| --- | --- | --- |
| API locale | Réponse exploitable aux GET `/titles/`, `/titles/{id}` et `/genres/` | Test antérieur du détail documenté ; campagne complète à refaire |
| Meilleur film | Meilleure note IMDb toutes catégories, vrai titre, affiche, résumé | **À développer** (S5) |
| Films les mieux notés | Autres meilleurs films selon classement, 6 cartes | HTML/CSS préparés, données **à développer** |
| Catégories 1 et 2 | Deux genres fixes distincts, six films classés chacun | HTML/CSS préparés, API **à développer** |
| Autres — menu | Genres alimentés depuis `/genres/` | Style testé ; données **à développer** (S8) |
| Autres — changement | Nouvelle requête de films et remplacement des cartes | **À développer** (S8) |
| Mobile — affichage initial | 2 films visibles dans chaque liste | **À développer** (S7) |
| Tablette — affichage initial | 4 films visibles dans chaque liste | **À développer** (S7) |
| Ordinateur — affichage initial | 6 films visibles, bouton Voir plus absent | Grille et masquage du bouton en CSS ; interaction finale **à vérifier** |
| Voir plus / Voir moins | Basculer entre 2/4 et 6 selon le format | Bouton stylisé, logique **à développer** (S7) |
| Clic sur une affiche ou Détails | Ouverture de la modale pour le film choisi | Modale HTML/CSS préparée, logique **à développer** (S7) |
| Détails de modale | Informations complètes, issues du bon film | Placeholders présents, données **à développer** |
| Fermer la modale | Fermeture par les commandes prévues | Contrôles HTML/CSS présents, événements **à développer** |
| Absence d'erreurs JS | Console sans erreurs durant les parcours réalisés | **Non évalué pour l'application dynamique** |

Ne cocher un test comme « réussi » qu'après une exécution effective, avec les données et le scénario correspondant.

## 5. Modale : scénarios dédiés

La maquette comporte deux dispositions :

- **ordinateur** : informations à gauche, affiche à droite, bouton rouge « Fermer » en bas ;
- **mobile et tablette** : éléments en colonne, croix visible ; une règle CSS volontairement commentée permet d'afficher aussi le bouton « Fermer ».

La classe `.modal.is-open` rend actuellement la fenêtre visible pour le contrôle de l'apparence. **Cette simulation DevTools ne prouve ni l'ouverture au clic ni la fermeture fonctionnelle**.

À tester ultérieurement : chargement d'un film réel ; résumé long ; métadonnées manquantes ; hauteur dépassant l'écran ; fermeture par les contrôles HTML ; stabilité du rendu lors du redimensionnement. Le comportement au clavier et la gestion du focus doivent être étudiés pour une modale accessible ; ils ne sont pas encore implémentés.

## 6. Validation W3C — à réaliser

### HTML

Validateur : [Nu HTML Checker](https://validator.w3.org/nu/).

Points de contrôle :

- structure HTML5, hiérarchie des titres, balises sémantiques ;
- identifiants uniques, associations `label` / `select` ;
- attributs d'image, boutons et modale ;
- absence d'erreurs signalées par le validateur.

**Résultat actuel : non testé / non consigné.** Ne pas écrire « HTML valide W3C » avant d'avoir obtenu un résultat.

### CSS

Validateur : [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/).

Points de contrôle :

- syntaxe et propriétés CSS ;
- media queries mobile first ;
- règles de grille, flexbox et variables personnalisées ;
- avertissements éventuels à interpréter.

**Résultat actuel : non testé / non consigné.** L'absence d'avertissements WebStorm n'est pas une validation W3C.

### Après chaque validation

Conserver la date, l'outil utilisé, l'objet testé (fichier, code collé ou URL), les erreurs/avertissements et les corrections éventuelles. Une page `file://` n'est pas forcément récupérable par un validateur en ligne : utiliser la soumission de fichier ou de code lorsqu'elle est disponible.

## 7. Vérification multi-navigateurs — à réaliser

Prévoir les mêmes parcours sur des navigateurs représentatifs :

| Navigateur | Rendu responsive | Modale et interactions | Console JS |
| --- | --- | --- | --- |
| Brave (Chromium) | Contrôles CSS manuels déjà réalisés | Modale CSS simulée ; JS non développé | À tester après S5–S8 |
| Firefox | À tester | À tester | À tester |
| Safari (macOS) | À tester | À tester | À tester |

La demande OpenClassrooms concerne les principaux navigateurs. Cette liste est un **plan de tests**, sans affirmation sur leur classement actuel en part de marché.

## 8. Qualité, contenu et livraison

Avant remise du projet :

- [ ] Résultats API de liste/détail/genres vérifiés, tri et pagination documentés ;
- [ ] Tous les éléments dynamiques alimentés par les vraies données de l'API ;
- [ ] Six films disponibles par liste, avec états 2/4/6 et Voir plus/Voir moins ;
- [ ] Modale utilisable et fermable avec les données de détail du film choisi ;
- [ ] Affichage testé sur les trois formats et sur les navigateurs retenus ;
- [ ] HTML et CSS validés avec les services W3C, erreurs corrigées ;
- [ ] Absence d'erreurs JavaScript en console pendant les parcours ;
- [ ] Code source lisible, HTML sémantique, historique Git cohérent ;
- [ ] README et documentation à jour pour la soutenance.

Ces cases sont **volontairement non cochées** : cette liste porte sur la **livraison finale**, pas seulement sur le CSS déjà réalisé.

## 9. Avancement Jira au 12 octobre 2026

| Ticket | Statut |
| --- | --- |
| [PY06-6 — S4 CSS & Figma](https://fa8i1.atlassian.net/browse/PY06-6) | En cours |
| [PY06-23 — Styles Figma/CSS global](https://fa8i1.atlassian.net/browse/PY06-23) | Terminé |
| [PY06-24 — Cartes, sections et modale](https://fa8i1.atlassian.net/browse/PY06-24) | Terminé |
| [PY06-8 — S6 Responsive](https://fa8i1.atlassian.net/browse/PY06-8) | En cours |
| [PY06-27 — Implémentation mobile first](https://fa8i1.atlassian.net/browse/PY06-27) | Terminé |
| [PY06-28 — Tests responsive](https://fa8i1.atlassian.net/browse/PY06-28) | En cours |
| [PY06-33 — Contrôles qualité finaux](https://fa8i1.atlassian.net/browse/PY06-33) | À faire |

Ce tableau est un **instantané** : après exécution des tests, mettre à jour la documentation et les tickets avec les résultats observés.

## 10. Sources

- [Confluence — Tests et validation W3C](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621121).
- [Confluence — Autoévaluation OpenClassrooms](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/31621141).
- [Analyse de la maquette Figma](analyse-detaillee-maquette-figma.md).
- [Cahier des charges et étapes du projet OpenClassrooms](https://openclassrooms.com/fr/paths/879/projects/835).
