/*
 * OC-PY06 — JustStreamIt
 * Fichier : best-movie.js
 *
 * Affichage du film mis en avant sur la page d'accueil.
 */

"use strict";

/**
 * Affiche les informations du meilleur film dans la page HTML.
 *
 * @param {Object} film - Objet contenant les détails du film.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayBestMovie(film) {
    // Sélectionne la section HTML dédiée au meilleur film.
    const section = document.querySelector("#best-movie");


    // Mémorise l'identifiant du meilleur film dans son élément HTML.
    // Il permettra d'ouvrir la modale correspondant à ce film.
    const featuredMovie = section.querySelector(".featured-movie");
    featuredMovie.dataset.movieId = film.id;


    // Récupère les éléments HTML à mettre à jour.
    const title = section.querySelector(".featured-movie-title");
    const summary = section.querySelector(".featured-movie-summary");
    const poster = section.querySelector(".featured-movie-poster img");

    // Remplace les contenus temporaires par les données de l'API.
    title.textContent = film.title;
    summary.textContent = film.description || "Résumé indisponible.";

    // Affiche le poster du film et gère automatiquement les images indisponibles.
    setMoviePoster(poster, film);

}

