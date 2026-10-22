# UI et maquettes Figma

Maquette de référence :

<https://www.figma.com/design/6KzVM5R2pOBX637RcVWjJ7/Maquettes-JustStreamIt?node-id=0-1&p=f>

## Principes d'intégration

- Approche **mobile first**.
- Au moins deux breakpoints CSS.
- Mise en page adaptée aux formats mobile, tablette et ordinateur.
- Respect de la hiérarchie et de l'organisation visuelle de la maquette.
- Modale entièrement exploitable sur les petits écrans.

## Grille des films

- Mobile : 1 film par ligne.
- Tablette : 2 films par ligne.
- Ordinateur : 3 films par ligne.

## Dev Mode Figma

Le statut étudiant a été vérifié et l'accès au Dev Mode est actif.

Configuration retenue pour le projet :

- plateforme : **CSS** ;
- unité : **px** ;
- thème : **clair** ;
- serveur **MCP activé** ;
- aucun plugin de génération de code ajouté pour conserver un HTML/CSS/JavaScript simple et explicable en soutenance.

## Documentation détaillée

L'analyse exhaustive des propriétés de la maquette, des dimensions, marges, paddings, typographies, couleurs, cartes, boutons, sélecteur et modales est centralisée ici :

- **Référence complète dans ce dépôt :** [Analyse détaillée de la maquette Figma — Design System et dimensions](analyse-detaillee-maquette-figma.md).
- **Source Confluence :** [Analyse détaillée de la maquette Figma](https://fa8i1.atlassian.net/wiki/spaces/OCPY06/pages/35160065).
- **Implémentation CSS :** [`assets/css/style.css`](../assets/css/style.css).

Cette analyse sert de référence pour le CSS afin d'éviter des appels MCP Figma répétés.

## Implémentation et validations au 22 octobre 2026

La première intégration CSS a été versionnée dans le [commit historique `06a6be2`](https://github.com/fabienhummel/OC-PY06-juststreamit/commit/06a6be2). La feuille a ensuite été enrichie pour les interactions responsive et la nouvelle modale d'erreur.

Les contrôles manuels dans Brave couvrent les trois formats de référence. Le CSS a été validé au W3C (**0 erreur et 7 avertissements informatifs**), et des parcours fonctionnels ont été confirmés dans Safari et Chrome. Firefox et les tests automatisés ne sont pas déclarés réalisés ; voir [Tests et validation](tests-et-validation.md).

### Différences documentées entre les relevés Figma et le CSS

- **Breakpoints :** les artboards de 456, 788 et 1054 px sont des tailles de référence Figma ; les seuils CSS de 768 et 1024 px sont des choix d'implémentation.
- **Header :** le titre est centré sur l'ensemble du bandeau sur ordinateur, conformément au choix effectué pendant l'intégration, plutôt qu'au décalage horizontal exact du relevé Figma.
- **Sélecteur « Autres » :** sous le titre et centré sur mobile ; sur la même ligne que le titre sur tablette et ordinateur. La taille du texte mobile est adaptée avec `clamp(20px, 5vw, 24px)` pour que « Choisir une catégorie » ne soit pas tronqué, alors que Figma représente un libellé plus court en 36 px.
- **Meilleur film et modale :** les hauteurs peuvent s'adapter à un contenu dynamique plutôt que d'être verrouillées à la hauteur de l'artboard.
- **Modale :** le bouton « Fermer » est visible sur ordinateur. Sur mobile et tablette, la croix est affichée et une media query **commentée** permet d'activer également le bouton « Fermer » si souhaité.
- **Fonctions dynamiques :** la modale de film, « Voir plus / Voir moins » et la catégorie « Autres » sont opérationnels avec les données API. Une modale générique d'erreur `<dialog>` a également été ajoutée en S9. Les textes provisoires du HTML sont remplacés pendant le chargement.

Le document détaillé conserve les **mesures d'origine**, même lorsqu'une adaptation CSS a été retenue.
