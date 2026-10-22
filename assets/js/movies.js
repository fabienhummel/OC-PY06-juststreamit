/*
 * OC-PY06 — JustStreamIt
 * Affichage et manipulation des films dans l'interface.
 */


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


/**
 * Affiche les films dans une section de l'interface.
 *
 * @param {string} sectionId - Sélecteur CSS de la section HTML.
 * @param {Array<Object>} films - Tableau des films à afficher.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayMovieCards(sectionId, films) {
    // Sélectionne la section HTML concernée.
    const section = document.querySelector(sectionId);

    // Récupère les cartes HTML déjà présentes dans cette section.
    const cards = section.querySelectorAll(".movie-card");


    // Indique si la section possède des films supplémentaires
    // à afficher selon la largeur de l'écran.
    section.classList.toggle("has-extra-mobile-movies", films.length > 2);
    section.classList.toggle("has-extra-tablet-movies", films.length > 4);


    // Affiche uniquement les cartes correspondant aux films reçus.
    // Masque les cartes supplémentaires si l'API renvoie moins de six films.
    cards.forEach((card, index) => {
        card.style.display = index < films.length ? "" : "none";
    });


    // Parcourt les films et associe chacun à une carte HTML.
    films.slice(0, cards.length).forEach((film, index) => {
        // Sélectionne la carte correspondant au film.
        const card = cards[index];

        // Récupère l'élément contenant le titre.
        const title = card.querySelector(".movie-card-title");

        // Remplace le titre temporaire par celui fourni par l'API.
        title.textContent = film.title;


        // Sélectionne l'image de la carte du film.
        const poster = card.querySelector(".movie-card-poster img");


        // Affiche le poster et gère les erreurs de chargement.
        setMoviePoster(poster, film);


        // Définit un texte alternatif pour l'accessibilité.
        poster.alt = `Affiche du film ${film.title}`;


        // Mémorise l'identifiant du film pour la future modale.
        card.dataset.movieId = film.id;
    });
}


/**
 * Ajoute les genres disponibles au menu déroulant de l'interface.
 *
 * @param {Array<Object>} genres - Tableau des genres renvoyés par l'API.
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function displayGenres(genres) {
    // Sélectionne le menu déroulant de la catégorie dynamique.
    const select = document.querySelector("#genre-select");

    // Parcourt la liste des genres fournie par l'API.
    genres.forEach((genre) => {
        // Crée un nouvel élément HTML <option>.
        const option = document.createElement("option");

        // Définit la valeur utilisée lors de la sélection.
        option.value = genre.name;

        // Définit le nom du genre visible dans le menu.
        option.textContent = genre.name;

        // Ajoute l'option au menu déroulant.
        select.appendChild(option);
    });
}


/**
 * Initialise les boutons "Voir plus / Voir moins" des sections de films.
 *
 * Permet d'afficher ou de masquer les films supplémentaires
 * en ajoutant ou retirant une classe CSS sur chaque grille.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeMovieToggles() {
    // Récupère tous les boutons "Voir plus" de la page.
    const buttons = document.querySelectorAll(".toggle-movies-button");

    // Parcourt chaque bouton pour lui associer un événement.
    buttons.forEach((button) => {
        // Identifie la section et la grille associées au bouton.
        const section = button.closest("section");
        const grid = section.querySelector(".movie-grid");

        // Initialise l'état du bouton pour l'accessibilité.
        button.setAttribute("aria-expanded", "false");

        // Réagit au clic de l'utilisateur.
        button.addEventListener("click", () => {
            // Ajoute ou retire la classe CSS "is-expanded".
            const isExpanded = grid.classList.toggle("is-expanded");

            // Adapte le texte du bouton à son nouvel état.
            button.textContent = isExpanded ? "Voir moins" : "Voir plus";

            // Informe les technologies d'assistance de l'état actuel.
            button.setAttribute("aria-expanded", String(isExpanded));
        });
    });
}



/**
 * Initialise la détection des changements de genre.
 *
 * Charge les films du genre sélectionné et ignore les réponses
 * obsolètes lorsque plusieurs requêtes sont en cours.
 *
 * @returns {void} Cette fonction ne renvoie aucune valeur.
 */
function initializeGenreSelector() {
    // Sélectionne le menu déroulant de la catégorie "Autres".
    const select = document.querySelector("#genre-select");




    // Sélectionne la fenêtre de dialogue commune aux erreurs API.
    const apiErrorDialog = document.querySelector("#api-error-dialog");




    // Identifie la requête la plus récente.
    let latestRequestId = 0;

    // Réagit lorsque l'utilisateur sélectionne un autre genre.
    select.addEventListener("change", async (event) => {
        // Récupère le genre sélectionné.
        const genre = event.target.value;

        // Attribue un nouvel identifiant à cette requête.
        const requestId = ++latestRequestId;


        try {
            // Récupère les films les mieux notés de ce genre.
            const data = await getMoviesByGenre(genre);

            // Ignore une réponse devenue obsolète.
            if (requestId !== latestRequestId) {
                return;
            }

            // Actualise les cartes de la catégorie "Autres".
            displayMovieCards("#other-category", data.results);

        } catch (error) {
            // Signale uniquement l'erreur de la requête actuelle.
            if (requestId === latestRequestId) {
                console.error(
                    `Impossible de charger le genre ${genre} :`,
                    error.message
                );


                // Masque les films de la catégorie précédente.
                // Évite d'afficher des résultats qui ne correspondent
                // plus au genre sélectionné.
                displayMovieCards("#other-category", []);



                // Affiche la modale commune en cas d'échec de la requête.
                apiErrorDialog.showModal();


            }
        }
    });
}
