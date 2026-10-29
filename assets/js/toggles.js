/*
 * OC-PY06 — JustStreamIt
 * Fichier : toggles.js
 *
 * Boutons Voir plus / Voir moins des sections de films.
 */

"use strict";

/**
 * Adapte la visibilité du bouton au nombre de cartes et à l'écran.
 *
 * @param {HTMLElement} section - Section dont les cartes ont été affichées.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function updateMovieToggleVisibility(section) {
    const button = section.querySelector(".toggle-movies-button");
    const count = section.querySelectorAll(".movie-card").length;

    // Le CSS affiche 2 films sur mobile et 4 sur tablette.
    const visibleCount = window.innerWidth >= 1024
        ? count
        : window.innerWidth >= 768 ? 4 : 2;

    // Une chaîne vide laisse le CSS gérer l'affichage normal du bouton.
    button.style.display = count <= visibleCount ? "none" : "";
}

/**
 * Initialise les boutons et adapte leur visibilité au redimensionnement.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeMovieToggles() {
    const buttons = document.querySelectorAll(".toggle-movies-button");

    for (const button of buttons) {
        const section = button.closest("section");
        const grid = section.querySelector(".movie-grid");

        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const isExpanded = grid.classList.toggle("is-expanded");

            button.textContent = isExpanded ? "Voir moins" : "Voir plus";
            button.setAttribute("aria-expanded", String(isExpanded));
        });
    }

    // Conserve le bon affichage des boutons lors d'un changement de largeur.
    window.addEventListener("resize", () => {
        for (const button of buttons) {
            updateMovieToggleVisibility(button.closest("section"));
        }
    });
}
