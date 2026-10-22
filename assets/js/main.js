/*
 * OC-PY06 — JustStreamIt
 * Point d'entrée JavaScript de l'application.
 */

"use strict";


/**
 * Initialise l'application JustStreamIt.
 *
 * Récupère les données nécessaires au chargement initial de la page.
 * @returns {Promise<void>} Promesse résolue à la fin de l'initialisation.
 */
async function initializeApp() {


    // Initialise les boutons "Voir plus / Voir moins".
    // Cette fonctionnalité ne dépend pas des requêtes à l'API.
    initializeMovieToggles();


    // Initialise les boutons de fermeture de la fenêtre modale.
    // Cette fonctionnalité ne dépend pas des requêtes à l'API.
    initializeModalCloseButtons();


    // Initialise les clics sur les films pour ouvrir leur modale.
    // Un seul écouteur gère les cartes et le meilleur film.
    initializeMovieModalTriggers();


    // Initialise la détection des changements de genre
    // dans le menu déroulant de la catégorie "Autres".
    initializeGenreSelector();


    // Masque les cartes temporaires de la catégorie "Autres".
    // Elles seront affichées après la sélection d'un genre.
    displayMovieCards("#other-category", []);



    try {
        // Récupère les 7 films les mieux notés depuis OCMovies-API.
        const data = await getTopMovies();

        // Sélectionne le premier film du classement IMDb.
        const bestMovie = data.results[0];

        // Récupère les informations détaillées de ce film.
        // La réponse de liste ne contient pas son résumé.
        const bestMovieDetails = await getMovieDetails(bestMovie.id);

        // Transmet les données complètes à la fonction d'affichage.
        displayBestMovie(bestMovieDetails);


        // Exclut le meilleur film et conserve les 6 suivants.
        // slice(1, 7) récupère les éléments d'indices 1 à 6.
        const topMovies = data.results.slice(1, 7);

        // Affiche les 6 films dans la section "Films les mieux notés".
        displayMovieCards("#top-movies", topMovies);


        // Récupère les 6 films les mieux notés du genre Action.
        const actionData = await getMoviesByGenre("Action");

        // Affiche les films dans la première catégorie fixe.
        displayMovieCards("#category-1", actionData.results);

        // Remplace le titre temporaire par le nom du genre.
        document.querySelector("#category-1 .section-title")
            .textContent = "Action";


        // Récupère les 6 films les mieux notés du genre Comedy.
        const comedyData = await getMoviesByGenre("Comedy");

        // Affiche les films dans la deuxième catégorie fixe.
        displayMovieCards("#category-2", comedyData.results);

        // Remplace le titre temporaire par le nom du genre.
        document.querySelector("#category-2 .section-title")
            .textContent = "Comedy";


        // Récupère la liste des genres disponibles depuis OCMovies-API.
        const genresData = await getGenres();

        // Remplit le menu déroulant avec les genres récupérés.
        displayGenres(genresData.results);


        // Sélectionne automatiquement le genre Biography au démarrage.
        const genreSelect = document.querySelector("#genre-select");
        genreSelect.value = "Biography";

        // Déclenche le chargement des films du genre sélectionné.
        // Réutilise l'écouteur "change" déjà présent dans movies.js.
        genreSelect.dispatchEvent(new Event("change"));







    } catch (error) {
        // Signale une erreur rencontrée pendant l'initialisation.
        console.error("Erreur d'initialisation :", error.message);
    }
}

// Attend que le document HTML soit analysé avant d'initialiser l'application.
document.addEventListener("DOMContentLoaded", initializeApp);
