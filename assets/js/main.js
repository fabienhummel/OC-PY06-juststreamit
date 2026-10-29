/*
 * OC-PY06 — JustStreamIt
 * Fichier : main.js
 *
 * Chargement des scripts spécialisés et initialisation de l'application.
 */

"use strict";

/**
 * Charge un fichier JavaScript classique avant de passer au suivant.
 *
 * Cette méthode évite de modifier index.html et respecte les dépendances
 * entre les fonctions des différents fichiers.
 *
 * @param {string} filename - Nom du fichier présent dans assets/js/.
 * @returns {Promise<void>} Promesse résolue une fois le script chargé.
 */
function loadScript(filename) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "assets/js/" + filename;

        script.onload = () => resolve();
        script.onerror = () => reject(
            new Error("Impossible de charger " + filename)
        );

        document.head.appendChild(script);
    });
}

/**
 * Initialise les événements puis charge les films et les genres.
 *
 * @returns {Promise<void>} Fin de l'initialisation.
 */
async function initializeApp() {
    initializeMovieToggles();
    initializeModalCloseButtons();
    initializeMovieModalTriggers();
    initializeGenreSelector();

    // Supprime les 24 cartes temporaires du DOM avant les appels API.
    for (const section of MOVIE_SECTIONS) {
        displayMovieCards(section.id, []);
    }

    // Boucle sur les sections, puis création d'une carte par film.
    await loadMovieSections();

    try {
        // Charge les options puis sélectionne Biography, déjà affiché.
        const data = await getGenres();
        displayGenres(data.results);
        document.querySelector("#genre-select").value = "Biography";
    } catch (error) {
        console.error("Impossible de charger les genres :", error.message);
        showApiError();
    }
}

/**
 * Charge les fichiers de l'application dans l'ordre de leurs dépendances.
 *
 * @returns {Promise<void>} Fin du chargement et de l'initialisation.
 */
async function startApp() {
    const scripts = [
        "error-modal.js",
        "cards.js",
        "best-movie.js",
        "sections.js",
        "genre-selector.js",
        "toggles.js"
    ];

    try {
        // Charge un script après l'autre pour éviter les dépendances manquantes.
        for (const filename of scripts) {
            await loadScript(filename);
        }

        // Les scripts asynchrones peuvent finir après DOMContentLoaded.
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initializeApp, {
                once: true
            });
        } else {
            await initializeApp();
        }
    } catch (error) {
        console.error("Impossible de démarrer JustStreamIt :", error.message);

        // En cas de script manquant, certaines fonctions peuvent être absentes.
        const dialog = document.querySelector("#api-error-dialog");
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }
}

// Le HTML charge déjà main.js avec defer.
startApp();
