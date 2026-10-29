/*
 * OC-PY06 — JustStreamIt
 * Fichier : genre-selector.js
 *
 * Remplissage du sélecteur "Autres" et changement de catégorie.
 */

"use strict";

/**
 * Ajoute les genres de l'API dans le menu déroulant.
 *
 * @param {Array<Object>} genres - Liste des genres disponibles.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayGenres(genres) {
    const select = document.querySelector("#genre-select");

    // Conserve l'option initiale puis ajoute les genres disponibles.
    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        select.appendChild(option);
    }
}

/**
 * Initialise le changement de genre de la catégorie "Autres".
 *
 * Les films sont reconstruits par displayMovieCards(), comme pour les
 * autres sections. Les réponses des anciennes requêtes sont ignorées.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeGenreSelector() {
    const select = document.querySelector("#genre-select");
    let latestRequestId = 0;

    select.addEventListener("change", async (event) => {
        const genre = event.target.value;
        const requestId = ++latestRequestId;

        try {
            const data = await getMoviesByGenre(genre, MOVIES_PER_SECTION);

            // Seule la sélection la plus récente peut actualiser la grille.
            if (requestId !== latestRequestId) {
                return;
            }

            displayMovieCards("#other-category", data.results);
        } catch (error) {
            if (requestId !== latestRequestId) {
                return;
            }

            console.error(
                `Impossible de charger le genre ${genre} :`,
                error.message
            );

            displayMovieCards("#other-category", []);
            showApiError();
        }
    });
}
