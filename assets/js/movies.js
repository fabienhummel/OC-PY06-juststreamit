/*
 * OC-PY06 — JustStreamIt
 * Fichier : movies.js
 *
 * Fonctions communes aux films et à leurs affiches.
 */

"use strict";

/**
 * Définit l'affiche d'un film avec une image de remplacement.
 *
 * Si l'image distante est absente ou inaccessible, une image
 * locale est utilisée pour garantir un affichage correct.
 *
 * @param {HTMLImageElement} poster - Élément HTML img à modifier.
 * @param {Object} film - Objet contenant les informations du film.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function setMoviePoster(poster, film) {
    // Chemin de l'image locale utilisée en cas d'échec.
    const fallbackImage = "assets/images/movie_poster.png";

    // Détecte une erreur lors du chargement de l'affiche.
    poster.onerror = () => {
        // Évite une boucle si l'image locale est également absente.
        poster.onerror = null;

        // Remplace l'image défaillante par l'image locale.
        poster.src = fallbackImage;
    };

    // Définit un texte alternatif pour l'accessibilité.
    poster.alt = `Affiche du film ${film.title}`;

    // Charge l'affiche de l'API ou utilise l'image locale.
    poster.src = film.image_url || fallbackImage;
}

