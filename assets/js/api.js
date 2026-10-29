/*
 * OC-PY06 — JustStreamIt
 * Fonctions d'accès à OCMovies-API.
 */

// Adresse de base du serveur OCMovies-API exécuté localement.
const API_BASE_URL = "http://localhost:8000/api/v1/";


/**
 * Effectue une requête HTTP GET vers l'API OCMovies.
 *
 * @param {string} endpoint - Chemin de la ressource demandée.
 * @returns {Promise<Object>} Les données JSON renvoyées par l'API.
 * @throws {Error} Si la requête ou le traitement échoue.
 */
async function fetchApi(endpoint) {
    try {
        // Envoie la requête HTTP et attend la réponse du serveur.
        const response = await fetch(API_BASE_URL + endpoint);

        // Vérifie si le serveur a répondu avec un statut HTTP valide.
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        // Convertit la réponse JSON en objet JavaScript.
        return await response.json();

    } catch (error) {
        // Ajoute le contexte de la requête à l'erreur rencontrée.
        // L'erreur d'origine est conservée grâce à "cause".
        throw new Error(
            `Échec de la requête API (${endpoint}) : ${error.message}`,
            { cause: error }
        );
    }
}


/**
 * Récupère la liste complète des genres disponibles dans OCMovies.
 *
 * @returns {Promise<Object>} La réponse JSON contenant les genres.
 */
function getGenres() {
    // Demande les 25 genres en une seule requête HTTP.
    return fetchApi("genres/?page_size=25");
}


/**
 * Récupère les films les mieux notés selon IMDb.
 *
 * Le premier film servira au bloc "Meilleur film".
 *
 * @param {number} pageSize - Nombre de films à récupérer.
 * @returns {Promise<Object>} La réponse JSON contenant les films.
 */
function getTopMovies(pageSize = 7) {
    // Trie les films par score IMDb décroissant (-imdb_score).
    // Limite les résultats au nombre demandé.
    return fetchApi(`titles/?sort_by=-imdb_score&page_size=${pageSize}`);
}


/**
 * Récupère les films les mieux notés d'un genre donné.
 *
 * @param {string} genre - Nom du genre recherché, par exemple "Action".
 * @param {number} pageSize - Nombre de films à récupérer.
 * @returns {Promise<Object>} La réponse JSON contenant les films.
 */
function getMoviesByGenre(genre, pageSize = 6) {
    // Encode le nom du genre pour l'utiliser dans une URL.
    const encodedGenre = encodeURIComponent(genre);

    // Filtre les films par genre et les trie par score IMDb décroissant.
    // Limite les résultats au nombre demandé.
    return fetchApi(
        `titles/?genre=${encodedGenre}&sort_by=-imdb_score&page_size=${pageSize}`
    );
}


/**
 * Récupère les informations détaillées d'un film.
 *
 * @param {number} id - Identifiant unique du film dans OCMovies.
 * @returns {Promise<Object>} Les informations complètes du film.
 */
function getMovieDetails(id) {
    // Construit l'endpoint du film à partir de son identifiant.
    // Réutilise la fonction générique pour effectuer la requête HTTP.
    return fetchApi(`titles/${id}`);
}
