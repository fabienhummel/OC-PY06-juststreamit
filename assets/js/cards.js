/*
 * OC-PY06 — JustStreamIt
 * Fichier : cards.js
 *
 * Création et affichage dynamique des cartes de films.
 */

"use strict";

/**
 * Construit une carte HTML à partir des données d'un film.
 *
 * @param {Object} film - Film renvoyé par OCMovies-API.
 * @returns {HTMLElement} Carte prête à être insérée dans le DOM.
 */
function createMovieCard(film) {
    // Crée la carte en conservant les classes CSS déjà existantes.
    const card = document.createElement("article");
    card.classList.add("movie-card");
    card.dataset.movieId = film.id;

    // La structure HTML est fixe ; aucune donnée API n'est injectée en HTML.
    card.innerHTML = `
        <div class="movie-card-poster">
            <img alt="">
            <div class="movie-card-overlay">
                <h3 class="movie-card-title"></h3>
                <button class="button" type="button">Détails</button>
            </div>
        </div>
    `;

    // Insère le titre sans interpréter son contenu comme du HTML.
    card.querySelector(".movie-card-title").textContent = film.title;

    // Réutilise le chargement d'affiche et l'image locale de remplacement.
    const poster = card.querySelector(".movie-card-poster img");
    setMoviePoster(poster, film);

    return card;
}

/**
 * Reconstruit toutes les cartes d'une section.
 *
 * Chaque film produit une nouvelle carte, sans limite imposée par le HTML.
 * Le CSS existant continue de gérer les colonnes et la visibilité.
 *
 * @param {string} sectionId - Sélecteur de la section à actualiser.
 * @param {Array<Object>} films - Films à afficher dans cette section.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayMovieCards(sectionId, films) {
    const section = document.querySelector(sectionId);
    const grid = section.querySelector(".movie-grid");

    // Supprime les anciennes cartes, y compris les exemples du HTML initial.
    grid.replaceChildren();

    // Crée une carte par film et l'ajoute dans la grille.
    for (const film of films) {
        grid.appendChild(createMovieCard(film));
    }

    // Conserve la compatibilité avec les règles CSS de la catégorie "Autres".
    section.classList.toggle("has-extra-mobile-movies", films.length > 2);
    section.classList.toggle("has-extra-tablet-movies", films.length > 4);

    // Adapte le bouton Voir plus au nombre de cartes réellement créées.
    updateMovieToggleVisibility(section);
}
