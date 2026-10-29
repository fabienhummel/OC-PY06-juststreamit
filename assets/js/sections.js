/*
 * OC-PY06 — JustStreamIt
 * Fichier : sections.js
 *
 * Configuration et chargement des sections de films.
 */

"use strict";

// Une seule valeur à modifier pour demander davantage de films par section.
const MOVIES_PER_SECTION = 6;

// Les catégories fixes et "Autres" utilisent la même boucle de chargement.
const MOVIE_SECTIONS = [
    { id: "#top-movies", genre: null },
    { id: "#category-1", genre: "Action" },
    { id: "#category-2", genre: "Comedy" },
    { id: "#other-category", genre: "Biography" }
];

/**
 * Charge les films de chaque section et construit leurs cartes.
 *
 * Le meilleur film provient du même classement que la section Top :
 * son identifiant est exclu des cartes pour éviter un doublon.
 *
 * @returns {Promise<void>} Fin des opérations de chargement.
 */
async function loadMovieSections() {
    // Boucle extérieure : une itération par section de la page.
    for (const section of MOVIE_SECTIONS) {
        try {
            let films;

            if (section.id === "#top-movies") {
                // Récupère le meilleur film et les films destinés au classement.
                const data = await getTopMovies(MOVIES_PER_SECTION + 1);

                if (!data.results.length) {
                    throw new Error("Aucun film disponible dans le classement.");
                }

                // Le meilleur film possède sa propre présentation.
                const bestMovie = await getMovieDetails(data.results[0].id);
                displayBestMovie(bestMovie);

                // Les autres films seront créés sous forme de cartes.
                films = data.results.slice(1);
            } else {
                // Charge la catégorie indiquée dans la configuration.
                const data = await getMoviesByGenre(
                    section.genre,
                    MOVIES_PER_SECTION
                );
                films = data.results;
            }

            // Toutes les sections utilisent la même fonction de rendu.
            displayMovieCards(section.id, films);

            // Met à jour le titre des deux catégories fixes.
            if (section.id === "#category-1" || section.id === "#category-2") {
                document.querySelector(section.id + " .section-title")
                    .textContent = section.genre;
            }
        } catch (error) {
            console.error(
                `Impossible de charger la section ${section.id} :`,
                error.message
            );

            // Évite de laisser apparaître les cartes temporaires du HTML.
            displayMovieCards(section.id, []);
            showApiError();
        }
    }
}
