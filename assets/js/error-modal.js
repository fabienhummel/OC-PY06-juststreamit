/*
 * OC-PY06 — JustStreamIt
 * Fichier : error-modal.js
 *
 * Affichage de la fenêtre de dialogue commune aux erreurs API.
 */

"use strict";

/**
 * Affiche le dialogue natif lorsque le chargement de données échoue.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function showApiError() {
    const dialog = document.querySelector("#api-error-dialog");

    // Ne tente pas d'ouvrir une fenêtre déjà affichée.
    if (dialog && !dialog.open) {
        dialog.showModal();
    }
}
