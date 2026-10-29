/*
 * OC-PY06 — JustStreamIt
 * Fichier : modal.js
 *
 * Gestion de la fenêtre modale des détails d'un film.
 */


/**
 * Mémorise le bouton ayant ouvert la fenêtre modale.
 *
 * @type {HTMLButtonElement|null}
 */
let lastMovieModalTrigger = null;


/**
 * Ouvre la fenêtre modale contenant les détails d'un film.
 *
 * Ajoute la classe CSS "is-open" pour rendre la modale visible.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function openMovieModal() {
    // Sélectionne la fenêtre modale dans le document HTML.
    const modal = document.querySelector("#movie-modal");

    // Ajoute la classe CSS permettant d'afficher la modale.
    modal.classList.add("is-open");


    // Autorise le focus programmatique sur la fenêtre modale.
    // La valeur -1 évite de l'ajouter à la navigation Tab.
    modal.setAttribute("tabindex", "-1");

    // Place le focus dans la modale dès son ouverture.
    modal.focus();

}


/**
 * Ferme la fenêtre modale des détails d'un film.
 *
 * Retire la classe CSS "is-open" afin de masquer la modale.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function closeMovieModal() {
    // Sélectionne la fenêtre modale dans le document HTML.
    const modal = document.querySelector("#movie-modal");

    // Retire la classe CSS qui rend la fenêtre visible.
    modal.classList.remove("is-open");


    // Redonne le focus au bouton qui a ouvert la modale.
    if (lastMovieModalTrigger && lastMovieModalTrigger.isConnected) {
        lastMovieModalTrigger.focus();
    }

    // Réinitialise la référence pour la prochaine ouverture.
    lastMovieModalTrigger = null;

}



/**
 * Initialise les moyens de fermeture de la fenêtre modale.
 *
 * Associe les boutons de fermeture aux événements "click".
 * Gère également la fermeture avec la touche Échap
 * et maintient le focus dans la modale avec Tab.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeModalCloseButtons() {
    // Sélectionne les deux boutons de fermeture de la modale.
    const buttons = document.querySelectorAll(
        "#movie-modal .modal-close-icon, #movie-modal .modal-close-button"
    );

    // Associe la fonction de fermeture à chaque bouton.
    buttons.forEach((button) => {
        button.addEventListener("click", closeMovieModal);
    });


    // Sélectionne la fenêtre modale.
    const modal = document.querySelector("#movie-modal");

    // Écoute les touches du clavier.
    document.addEventListener("keydown", (event) => {
        // Ferme la modale si elle est ouverte et que
        // l'utilisateur appuie sur la touche Échap.
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeMovieModal();
        }

        // Empêche la navigation Tab de sortir de la modale.
        if (event.key === "Tab" && modal.classList.contains("is-open")) {

            // Recherche le bouton de fermeture actuellement visible.
            const visibleButton = Array.from(buttons).find(
                (button) => button.getClientRects().length > 0
            );

            // Maintient le focus sur ce bouton.
            if (visibleButton) {
                event.preventDefault();
                visibleButton.focus();
            }
        }

    });

}


/**
 * Initialise l'ouverture de la modale depuis les films affichés.
 *
 * Utilise la délégation d'événements pour gérer les clics
 * sur les cartes et sur le bouton du meilleur film.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeMovieModalTriggers() {
    // Sélectionne le conteneur principal de l'application.
    const main = document.querySelector("main");
    // Identifie la dernière demande de détails d'un film.
    let latestRequestId = 0;

    // Écoute les clics sur les éléments contenus dans main.
    main.addEventListener("click", async (event) => {
        // Recherche une carte de film ou le bouton du meilleur film.
        const trigger = event.target.closest(
            ".movie-card, #best-movie .featured-movie .button"
        );

        // Ignore les clics qui ne concernent pas un film.
        if (!trigger) {
            return;
        }

        // Recherche l'élément contenant l'identifiant du film.
        const movieElement = trigger.closest("[data-movie-id]");

        // Vérifie qu'un identifiant est disponible.
        if (!movieElement) {
            return;
        }


        // Récupère l'identifiant du film sélectionné.
        const movieId = movieElement.dataset.movieId;
        // Attribue un identifiant unique à cette demande.
        const requestId = ++latestRequestId;


        try {
            // Récupère les détails du film sélectionné depuis l'API.
            const film = await getMovieDetails(movieId);

            // Ignore la réponse si un autre film a été sélectionné
            // depuis le lancement de cette requête.
            if (requestId !== latestRequestId) {
                return;
            }


            // Remplace les informations temporaires de la modale.
            displayMovieDetails(film);


            // Mémorise le bouton ayant déclenché l'ouverture.
            // Pour une carte, "trigger" désigne l'article entier :
            // nous récupérons donc son bouton "Détails".
            lastMovieModalTrigger = trigger.matches(".movie-card")
                ? trigger.querySelector(".button")
                : trigger;


            // Ouvre la modale une fois les données chargées.
            openMovieModal();

        } catch (error) {

            // Ignore l'erreur si un autre film a été sélectionné
            // depuis le lancement de cette requête.
            if (requestId !== latestRequestId) {
                return;
            }

            // Signale une erreur éventuelle de récupération des données.
            console.error(
                `Impossible de charger le film ${movieId} :`,
                error.message
            );

            // Affiche la même fenêtre d'erreur que le sélecteur de genres.
            showApiError();

        }

    });
}


/**
 * Affiche les informations d'un film dans la fenêtre modale.
 *
 * Remplace les contenus temporaires du HTML par les données
 * détaillées récupérées depuis OCMovies-API.
 *
 * @param {Object} film - Objet contenant les détails du film.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayMovieDetails(film) {
    // Sélectionne la fenêtre modale.
    const modal = document.querySelector("#movie-modal");

    // Récupère les éléments HTML à mettre à jour.
    const title = modal.querySelector(".modal-movie-title");
    const summary = modal.querySelector(".modal-movie-summary");

    // Sélectionne l'élément affichant la date et les genres.
    const genresElement = modal.querySelector(".modal-movie-genres");


    // Sélectionne l'élément contenant la classification, la durée et le pays.
    const detailsElement = modal.querySelector(".modal-movie-details");


    // Sélectionne l'élément affichant le score IMDb.
    const scoreElement = modal.querySelector(".modal-movie-score");


    // Sélectionne l'élément affichant les recettes du box-office.
    const boxOfficeElement = modal.querySelector(".modal-movie-box-office");



    // Affiche le titre du film.
    title.textContent = film.title;

    // Affiche le résumé détaillé, ou le résumé court si nécessaire.
    // Utilise un texte de remplacement si aucun résumé n'est disponible.
    summary.textContent =
        film.long_description || film.description || "Résumé indisponible.";


    // Récupère la date de sortie du film ou une valeur de remplacement.
    const releaseDate = film.date_published || "Date inconnue";

    // Transforme le tableau des genres en une chaîne de caractères.
    const genres = Array.isArray(film.genres)
        ? film.genres.join(", ")
        : "Genres indisponibles";

    // Affiche la date de sortie et les genres du film.
    genresElement.textContent = `${releaseDate} - ${genres}`;


    // Récupère la classification du film telle que fournie par l'API.
    const classification = film.rated || "Non classé";

    // Vérifie que la durée est un nombre avant de l'afficher.
    const duration = typeof film.duration === "number"
        ? `${film.duration} minutes`
        : "Durée inconnue";

    // Transforme le tableau des pays en texte.
    const countries = Array.isArray(film.countries) && film.countries.length > 0
        ? film.countries.join(" / ")
        : "Pays inconnu";


    // Affiche chaque information avec un libellé explicite.
    detailsElement.textContent =
        `Classification : ${classification} · Durée : ${duration} · Pays : ${countries}`;



    // Vérifie que le score IMDb est disponible.
    const imdbScore = film.imdb_score != null && film.imdb_score !== ""
        ? `${film.imdb_score}/10`
        : "Non disponible";

    // Remplace la note temporaire par celle fournie par l'API.
    scoreElement.textContent = `Score IMDb : ${imdbScore}`;


    // Récupère les recettes mondiales fournies par l'API.
    const income = film.worldwide_gross_income;

    // Vérifie que les recettes correspondent à un nombre valide.
    // Formate le nombre pour le rendre plus facile à lire.
    const boxOffice = Number.isFinite(income)
        ? `${new Intl.NumberFormat("fr-FR").format(income)} (devise non précisée)`
        : "Non disponible";

    // Remplace les recettes temporaires par les données du film.
    boxOfficeElement.textContent = `Recettes au box-office : ${boxOffice}`;


    // Sélectionne le paragraphe contenant le nom des réalisateurs.
    const directorElement = modal.querySelector(
        ".modal-movie-director p:last-child"
    );

    // Vérifie que l'API fournit une liste de réalisateurs non vide.
    const directors = Array.isArray(film.directors) && film.directors.length > 0
        ? film.directors.join(", ")
        : "Non disponible";

    // Remplace les noms temporaires par les réalisateurs du film.
    directorElement.textContent = directors;


    // Sélectionne le paragraphe contenant la liste des acteurs.
    const castElement = modal.querySelector(
        ".modal-movie-cast p:last-child"
    );

    // Vérifie que l'API fournit une liste d'acteurs non vide.
    const actors = Array.isArray(film.actors) && film.actors.length > 0
        ? film.actors.join(", ")
        : "Non disponible";

    // Remplace les noms temporaires par les acteurs du film.
    castElement.textContent = actors;


    // Sélectionne l'image de présentation du film dans la modale.
    const poster = modal.querySelector(".modal-movie-poster img");

    // Affiche le poster fourni par l'API.
    // Utilise l'image locale si le chargement échoue.
    setMoviePoster(poster, film);



}
