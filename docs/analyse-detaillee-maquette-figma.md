# Analyse détaillée de la maquette Figma — Design System et dimensions

Cette page centralise les informations utiles extraites de la maquette Figma **JustStreamIt** afin de limiter les futurs appels au connecteur MCP Figma.

Maquette source : <https://www.figma.com/design/6KzVM5R2pOBX637RcVWjJ7/Maquettes-JustStreamIt?node-id=0-1&p=f>

Fichier MCP actuellement analysé : `sC9T7PY5DTMtuFeyrCklF6`, page `0:1`.

> Les valeurs ci-dessous proviennent des propriétés Figma et des coordonnées des nœuds. Certaines dimensions diffèrent légèrement entre cartes d'un même groupe : la maquette n'est pas parfaitement normalisée. Les valeurs brutes sont conservées ici, puis des recommandations d'implémentation simples sont indiquées séparément.

## 1. Informations déjà extraites avant l'analyse complémentaire

Les premiers relevés réalisés via MCP avaient établi :

- police principale : **Oswald** ;
- graisses utilisées : ExtraLight 200, Light 300, Medium 500, SemiBold 600 ;
- texte principal : `#000000` ;
- header : `#61787F` ;
- bouton rouge principal : `#FA0B0B` ;
- texte blanc : `#FFFFFF` ;
- rayon de bouton : `25px` ;
- titre de section : 48 px desktop, 40 px tablette, 32 px mobile ;
- titre du meilleur film : 48 px desktop, 40 px tablette, 32 px mobile ;
- résumé du meilleur film : 28 px desktop, 24 px tablette, 16 px mobile ;
- bouton Détails du meilleur film : 24 px desktop, 20 px tablette, 14 px mobile ;
- header desktop : 837 × 122 px ;
- header tablette : \~619 × 137 px ;
- header mobile : 329 × 137 px ;
- logo desktop : 127 × 94 px ;
- logo tablette : 165 × 113 px ;
- logo mobile : 182 × 130 px ;
- le texte « Vidéos à la demande » disparaît dans la maquette mobile ;
- les cartes de film sont visuellement carrées et les images doivent être recadrées sans déformation ;
- l'image renvoyée par OCMovies-API testée sur Avatar est en 182 × 268 px ;
- les boutons Voir plus / Voir moins sont un seul composant dont le texte change selon l'état ;
- la modale desktop et la modale tablette/mobile utilisent deux dispositions différentes.

## 2. Informations qui manquaient avant cette passe

Les points suivants n'avaient pas encore été documentés précisément :

- couleur et opacité du bandeau superposé aux affiches ;
- style exact des titres dans les cartes ;
- couleur du bouton Détails à l'intérieur des cartes ;
- dimensions, marges et offsets des cartes par format ;
- dimensions et position du bouton Voir plus / Voir moins ;
- dimensions et typographie du sélecteur de catégorie ;
- dimensions du menu déroulé de catégorie ;
- style détaillé de la modale ;
- dimensions internes et espacements de la modale ;
- bordures des conteneurs principaux ;
- dimensions des artboards et marges latérales observées ;
- distinction entre valeurs réellement présentes dans Figma et choix d'implémentation CSS.

Cette passe complète ces informations.

---

# 3. Design System global

## 3.1 Typographie

Police principale : **Oswald**.

| Usage | Graisse | Desktop | Tablette | Mobile | Couleur |
| --- | --- | --- | --- | --- | --- |
| Titre header | Light 300 | 40 px | 40 px | masqué | #FFFFFF |
| Titre section | SemiBold 600 | 48 px | 40 px | 32 px | #000000 |
| Titre meilleur film | SemiBold 600 | 48 px | 40 px | 32 px | #000000 |
| Résumé meilleur film | ExtraLight 200 | 28 px | 24 px | 16 px | #000000 |
| Bouton principal | Medium 500 | 24 px | 20 px | 14 px | #FFFFFF |
| Titre carte | SemiBold 600 | 24 px | 24 px | 24 px | #FFFFFF |
| Bouton Détails carte | Medium 500 | 14 px | 14 px | 14 px | #FFFFFF |
| Voir plus / Voir moins | Medium 500 | non affiché | 20 px | 20 px | #FFFFFF |
| Select catégorie | SemiBold 600 | 36 px | 36 px | 36 px | #000000 |
| Ligne menu déroulé | SemiBold 600 | 36 px | 32 px | 32 px | #000000 |
| Modale — titre | SemiBold 600 | 48 px | 48 px | 48 px | #000000 |
| Modale — métadonnées | SemiBold 600 | 24 px | 24 px | 24 px | #000000 |
| Modale — « Réalisé par » | Regular 400 | 24 px | 24 px | 24 px | #000000 |
| Modale — réalisateur | Light 300 | 24 px | 24 px | 24 px | #000000 |
| Modale — description | Light 300 | 24 px | 24 px | 24 px | #000000 |
| Modale — « Avec » | Regular 400 | 20 px | 20 px | 20 px | #000000 |
| Modale — acteurs | Light 300 | 20 px | 20 px | 20 px | #000000 |
| Modale — croix fermeture | Medium 500 | — | 32 px | 32 px | #000000 |

Line-height relevé par Dev Mode : **normal** pour les textes inspectés.

Aucun letter-spacing spécifique n'a été remonté par les nœuds inspectés.

## 3.2 Couleurs

| Token proposé | Valeur | Usage Figma |
| --- | --- | --- |
| `--color-text` | `#000000` | texte principal, bordures |
| `--color-white` | `#FFFFFF` | fonds blancs, texte sur boutons |
| `--color-header` | `#61787F` | header |
| `--color-primary-button` | `#FA0B0B` | bouton meilleur film, Voir plus/moins, Fermer |
| `--color-card-button` | `#2D2C2C` | bouton Détails dans les cartes |
| `--color-card-overlay` | `rgba(0, 0, 0, 0.5)` | bandeau superposé à l'affiche |
| `--color-border` | `#000000` | bordures |

## 3.3 Rayons et bordures

- boutons : `border-radius: 25px` ;
- boutons : `padding: 2px 4px` dans la maquette Figma ;
- header : bordure noire 1 px ;
- artboards : bordure noire 1 px ;
- bloc meilleur film : bordure noire 6 px ;
- modale : bordure noire 6 px ;
- select : bordure noire 1 px ;
- cartes et bandeaux : aucun rayon spécifique relevé ;
- aucune ombre portée relevée sur les composants inspectés.

---

# 4. Dimensions générales de la maquette

## 4.1 Artboards Figma

| Format | Largeur | Hauteur |
| --- | --- | --- |
| Desktop | 1054 px | 4451 px |
| Tablette | 788 px | 4209 px |
| Mobile | 456 px | 5568 px |

Ces dimensions sont les **artboards de référence**, pas des breakpoints CSS imposés.

## 4.2 Zone de contenu observée

| Format | Largeur header | Largeur bloc meilleur film | Largeur grille principale |
| --- | --- | --- | --- |
| Desktop | 837 px | 835 px | \~842–844 px |
| Tablette | \~619 px | 618 px | \~618–619 px |
| Mobile | 329 px | 329 px | 329 px |

### Marges latérales mesurées par rapport aux artboards

| Format | Gauche | Droite |
| --- | --- | --- |
| Desktop | \~107–109 px | \~103–110 px |
| Tablette | 71 px | \~98–99 px |
| Mobile | 58 px | 69 px |

La maquette n'est donc pas parfaitement centrée au pixel près. Pour le CSS final, un conteneur centré avec `margin-inline: auto` pourra être plus simple et plus propre, tout en conservant les largeurs de référence.

---

# 5. Header

## 5.1 Dimensions

| Propriété | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Header | 837 × 122 | \~619 × 137 | 329 × 137 |
| Logo | 127 × 94 | 165 × 113 | 182 × 130 |
| Titre | 514 × 51 | \~380 × 47 | absent |

## 5.2 Position interne

### Desktop

- logo : 27 px depuis la gauche, 16 px depuis le haut ;
- logo : \~12 px depuis le bas ;
- titre : 198 px depuis la gauche ;
- titre : 36 px depuis le haut.

### Tablette

- logo : 20 px depuis la gauche, 15 px depuis le haut ;
- titre : 239 px depuis la gauche ;
- titre : 48 px depuis le haut.

### Mobile

- logo : 86 px depuis la gauche ;
- logo : 7 px depuis le haut ;
- le titre n'est pas affiché.

## 5.3 Style

- fond : `#61787F` ;
- bordure : 1 px noire ;
- titre : Oswald Light 300, 40 px, blanc.

---

# 6. Titre « Meilleur film » et bloc principal

## 6.1 Espacements externes

| Espace | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Bas header → haut titre | 31 px | 23 px | 24 px |
| Bas titre → haut bloc | 31 px | 14 px | 13 px |

## 6.2 Bloc meilleur film

| Propriété | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Bloc | 835 × 369 | 618 × 271 | 329 × 463 |
| Bordure | 6 px | 6 px | 6 px |
| Fond | blanc | blanc | blanc |
| Poster | 227 × 334 | 168 × 246 | 298 × 241 |

### Poster — offsets internes

| Offset | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Gauche | 25 px | 19 px | 17 px |
| Haut | 18 px | 13 px | 16 px |
| Droite | — | — | 14 px |
| Bas | 17 px | 12 px | — |

Sur mobile, le poster devient un grand visuel horizontal recadré en haut du bloc. L'image source n'est pas déformée : elle doit être affichée avec un recadrage de type `object-fit: cover`.

## 6.3 Contenu du meilleur film

### Titre

| Offset dans le bloc | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Gauche | 288 px | 213 px | 22 px |
| Haut | 28 px | 29 px | 265 px |

### Résumé

| Offset dans le bloc | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Gauche | 297 px | 213 px | 22 px |
| Haut | 114 px | 104 px | 293 px |

### Bouton Détails principal

| Propriété | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Dimensions | 166 × 68 | 123 × 49 | 91 × 40 |
| Offset gauche | 618 px | 461 px | 123 px |
| Offset haut | 254 px | 204 px | 407 px |
| Fond | #FA0B0B | #FA0B0B | #FA0B0B |
| Rayon | 25 px | 25 px | 25 px |

---

# 7. Section « Films les mieux notés » et grilles

## 7.1 Espacement avant la section

| Espace | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Bas meilleur film → titre section | 29 px | 33 px | 25 px |
| Bas titre → première carte | \~47 px | 23 px | 5 px |

## 7.2 Grille visible par défaut

Conforme au cahier des charges :

- desktop : 6 films visibles, 3 colonnes × 2 lignes ;
- tablette : 4 films visibles, 2 colonnes × 2 lignes ;
- mobile : 2 films visibles, 1 colonne × 2 lignes.

### Desktop

Dimensions relevées sur les six cartes :

- 252 × 247 px ;
- 253 × \~250 px ;
- 259 × 252 px ;
- 252 × 252 px ;
- 250 × 252 px ;
- 259 × 252 px.

Écarts horizontaux observés : **36 à 42 px**.

Écart vertical observé entre les deux rangées : **\~43 à 46 px**.

La maquette est donc volontairement proche d'une carte carrée d'environ **250–260 px**.

### Tablette

Cartes visibles :

- 295 × 286 px ;
- 289 × \~286 px ;
- 295 × 285 px ;
- 289 × 289 px.

Écart horizontal : **34 px**.

Écart vertical : **\~32 à 36 px**.

### Mobile

Cartes visibles :

- 329 × \~319 px ;
- 329 × \~325 px.

Écart vertical : **\~29 px**.

Les cartes supplémentaires affichées après « Voir plus » varient approximativement de 313 à 329 px en hauteur. Pour une implémentation simple, conserver une carte carrée avec `aspect-ratio: 1 / 1` est cohérent avec l'intention visuelle.

---

# 8. Bandeau des cartes de film

Le bandeau est superposé à l'affiche, légèrement sous le haut de la carte.

## 8.1 Style

- fond : noir ;
- opacité : **50 %** ;
- titre : Oswald SemiBold 600, **24 px**, blanc ;
- bouton Détails : fond `#2D2C2C` ;
- texte bouton : Oswald Medium 500, **14 px**, blanc ;
- bouton : rayon 25 px ;
- bouton : padding Figma 2 px vertical / 4 px horizontal.

## 8.2 Dimensions et offsets

| Propriété | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Bandeau | 252 × 102 | 295 × \~118 | 329 × \~132 |
| Offset depuis le haut de la carte | \~34 px | \~39 px | \~44 px |
| Titre — gauche | 21 px | \~25 px | \~27 px |
| Titre — haut | 17 px | \~20 px | \~22 px |
| Bouton — dimensions | 81 × 25 | \~95 × 29 | \~106 × 32 |
| Bouton — gauche | 158 px | \~185 px | \~206 px |
| Bouton — haut | 66 px | \~76 px | \~85 px |

Le bouton Détails des cartes **n'utilise pas le rouge du bouton principal**. Il est gris très foncé `#2D2C2C`.

---

# 9. Bouton « Voir plus / Voir moins »

Le même bouton est réutilisé et son texte change selon l'état.

## 9.1 Visibilité

- desktop : absent, car les 6 films sont visibles ;
- tablette : présent ;
- mobile : présent.

## 9.2 Style

- dimensions : **214 × 36 px** ;
- fond : `#FA0B0B` ;
- texte : blanc ;
- police : Oswald Medium 500 ;
- taille : **20 px** ;
- rayon : 25 px ;
- padding Figma : 2 px vertical / 4 px horizontal ;
- centrage horizontal.

## 9.3 Espacements observés

### Tablette

- bas des cartes visibles → bouton : \~21 px ;
- bas du bouton → titre de la section suivante : \~21 px.

### Mobile

- bas des cartes visibles → bouton : \~27 px ;
- bas du bouton → titre de la section suivante : \~20 px.

---

# 10. Sélecteur de catégorie « Autres »

## 10.1 Select fermé

| Propriété | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Dimensions | 404 × \~78 | 404 × \~78 | 285 × 68 |
| Fond | blanc | blanc | blanc |
| Bordure | 1 px noire | 1 px noire | 1 px noire |
| Texte | 36 px SemiBold | 36 px SemiBold | 36 px SemiBold |
| Padding gauche visuel | 19 px | 19 px | 13 px |

### Flèche

- glyph : `▼` ;
- police relevée : **Oranienbaum Regular** ;
- taille : **36 px** ;
- couleur : noire ;
- desktop/tablette : boîte \~33 × 42 px, \~30 px du bord droit ;
- mobile : boîte \~33 × 42 px, \~16 px du bord droit.

Pour l'implémentation avec un `<select>` natif, le rendu exact de la flèche peut rester dépendant du navigateur si l'on souhaite conserver un code simple.

## 10.2 Menu déroulé représenté dans la maquette

### Desktop

- ligne : 404 × \~78 px ;
- texte : 36 px SemiBold ;
- padding gauche visuel : \~18 px.

### Tablette

- ligne : \~242 × 60 px ;
- texte : 32 px SemiBold ;
- padding gauche visuel : \~11 px.

### Mobile

- ligne : \~230 × 60 px ;
- texte : 32 px SemiBold ;
- padding gauche visuel : \~11 px.

### Marqueur de sélection

- desktop : symbole ✅, 36 × 36 px ;
- tablette/mobile : symbole ✅, 24 × 24 px.

Ces dimensions correspondent à la **représentation graphique du menu ouvert dans Figma**. Un `select` HTML natif ne permet pas de garantir exactement ce rendu sur tous les navigateurs ; il s'agit donc d'une référence visuelle et non d'une obligation d'implémentation pixel-perfect.

---

# 11. Modale

La maquette contient deux dispositions : desktop et tablette/mobile.

## 11.1 Modale desktop

### Conteneur

- dimensions : **778 × 939 px** ;
- fond : blanc ;
- bordure : **6 px noire**.

### Marges / offsets internes

| Élément | Gauche | Haut | Dimensions |
| --- | --- | --- | --- |
| Bloc titre + métadonnées | 46 px | 21 px | 423 × 359 |
| Poster | 517 px | 34 px | 227 × 334 |
| Description | 46 px | 290 px | 698 × 457 |
| Acteurs | 46 px | 618 px | 692 × 248 |
| Bouton Fermer | 282 px | 858 px | 214 × 36 |

Le bouton Fermer est centré horizontalement.

Marge basse du bouton : \~45 px.

### Contenu typographique

- titre : 48 px SemiBold ;
- année / genres : 24 px SemiBold ;
- classification / durée / pays : 24 px SemiBold ;
- score IMDB : 24 px SemiBold ;
- recettes : 24 px SemiBold ;
- « Réalisé par » : 24 px Regular ;
- réalisateur : 24 px Light ;
- résumé : 24 px Light ;
- « Avec » : 20 px Regular ;
- acteurs : 20 px Light.

### Bouton Fermer

- 214 × 36 px ;
- fond `#FA0B0B` ;
- texte blanc ;
- Oswald Medium 20 px ;
- rayon 25 px.

## 11.2 Modale tablette / mobile

### Conteneur

- dimensions : **506 × 1684 px** ;
- fond : blanc ;
- bordure : **6 px noire**.

### Marges / offsets internes

| Élément | Gauche | Haut | Dimensions |
| --- | --- | --- | --- |
| Bloc titre + métadonnées | 46 px | 21 px | 423 × 359 |
| Croix fermeture | 446 px | 49 px | 32 × 32 |
| Description | 46 px | 267 px | 400 × 587 |
| Poster | 46 px | 815 px | 409 × 602 |
| Acteurs | 46 px | 1384 px | 397 × 319 |

Marges latérales du poster : \~46 px à gauche et \~51 px à droite.

La fermeture se fait par une croix `❌`, Oswald Medium 32 px, noire.

La typographie du contenu reste identique à la version desktop.

## 11.3 Backdrop

Aucun style précis de fond d'écran obscurci derrière la modale n'a été trouvé dans les nœuds inspectés. La maquette documente principalement le panneau de modale lui-même. Le backdrop devra donc être choisi lors de l'implémentation.

---

# 12. Données Figma non normalisées ou non directement transposables

## 12.1 Dimensions légèrement différentes entre cartes

Les cartes d'une même grille ne font pas toutes exactement la même largeur ou hauteur. Cela semble venir de la construction de la maquette et non d'un besoin fonctionnel.

Pour le code final, il est préférable de normaliser les cartes avec CSS Grid et `aspect-ratio: 1 / 1`.

## 12.2 Marges latérales asymétriques

Les artboards montrent des marges gauche/droite légèrement différentes. Il est préférable de conserver la largeur de contenu de référence mais de centrer le conteneur avec CSS.

## 12.3 États alternatifs dans la maquette

La partie « Autres » contient plusieurs états représentés l'un sous l'autre :

- menu ouvert ;
- catégorie sélectionnée ;
- affichage de la catégorie.

Ces états ne doivent pas être interprétés comme trois sections successives dans la page finale.

## 12.4 Blocs « Voir au-dessus »

Plusieurs grands rectangles gris portant « Voir au-dessus » sont des raccourcis/annotations de maquette indiquant la réutilisation d'une structure déjà montrée. Ils ne représentent pas un composant final à reproduire tel quel.

---

# 13. Base de variables CSS recommandée

Cette section traduit les valeurs Figma en variables simples, sans sur-ingénierie.

```css
:root {
    --font-main: "Oswald", sans-serif;

    --color-text: #000000;
    --color-white: #ffffff;
    --color-header: #61787f;
    --color-primary-button: #fa0b0b;
    --color-card-button: #2d2c2c;
    --color-border: #000000;
    --color-card-overlay: rgba(0, 0, 0, 0.5);

    --button-radius: 25px;
}
```

Les espacements ne sont pas transformés en une grande quantité de variables car la maquette utilise des valeurs irrégulières. Les marges et paddings doivent rester simples et lisibles dans chaque module CSS.

---

# 14. Breakpoints : distinction maquette / implémentation

La maquette fournit trois largeurs de référence :

- mobile : 456 px ;
- tablette : 788 px ;
- desktop : 1054 px.

Elle ne définit pas elle-même les seuils CSS.

Pour le projet, une convention simple peut être conservée :

```css
/* Mobile : styles par défaut */

@media (min-width: 768px) {
    /* Tablette */
}

@media (min-width: 1024px) {
    /* Desktop */
}
```

Il s'agit d'un **choix d'implémentation**, pas d'une valeur extraite de Figma.

---

# 15. Nœuds Figma de référence

Ces identifiants permettent de retrouver rapidement les composants si une vérification ponctuelle MCP est nécessaire.

| Élément | Desktop | Tablette | Mobile |
| --- | --- | --- | --- |
| Artboard | 19:79 | 21:183 | 21:305 |
| Header | 17:10 | 21:188 | 21:192 |
| Titre Meilleur film | 17:11 | 21:110 | 21:196 |
| Bloc Meilleur film | 1:38 | 21:197 | 21:198 |
| Titre film principal | 1:40 | 21:114 | 21:199 |
| Résumé film principal | 1:41 | 21:115 | 21:200 |
| Bouton film principal | 19:14 | 21:116 | 21:201 |
| Carte Titanic / exemple | 19:44 | 21:21 | 21:205 |
| Voir plus | — | 21:66 | 21:220 |
| Select fermé | 21:155 | 12015:56 | 21:298 |
| Ligne menu ouvert | 19:161 | 21:129 | 21:273 |
| Modale | 22:39 | 22:42 + enfants | 22:42 + enfants |

---

# 16. Informations qui restent volontairement hors de cette base

La maquette ne fournit pas de manière fiable ou explicite :

- les styles de hover ;
- les styles de focus clavier ;
- les transitions ou animations ;
- le backdrop exact de la modale ;
- les breakpoints CSS exacts ;
- la stratégie de scroll de la modale ;
- les comportements JavaScript ;
- les règles d'accessibilité dynamiques.

Ces éléments devront être décidés lors de l'implémentation, en restant simples et conformes aux bonnes pratiques.

Cette page doit servir de **source de référence** pour le CSS du projet afin d'éviter des appels répétés au MCP Figma.


---

*Transcription intégrale de l'analyse Confluence (consultée le 12 octobre 2026) : [source documentaire](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/35160065). Les valeurs relevées dans Figma et les recommandations d'implémentation demeurent distinctes, comme indiqué dans le document source.*
