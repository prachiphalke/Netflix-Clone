const api = "api_key=e3ea3e561143e17f39b8fe38730e460a";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const image_url = "https://image.tmdb.org/t/p/w500";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function createRow(title, movies, isLarge = false) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";

    const rowTitle = document.createElement("h2");
    rowTitle.className = "row_title";
    rowTitle.innerText = title;
    row.appendChild(rowTitle);

    const rowPosters = document.createElement("div");
    rowPosters.className = "row_posters";
    row.appendChild(rowPosters);

    movies.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = isLarge ? "row_posterLarge" : "row_poster";
        poster.id = movie.id;

        if (movie.poster_path) {
            poster.src = `${image_url}${isLarge ? movie.poster_path : movie.backdrop_path}`;
        }
        rowPosters.appendChild(poster);
    });

    headrow.appendChild(row);
}

function fetchAndCreateRow(url, title, isLarge = false) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            createRow(title, data.results, isLarge);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

function setBanner() {
    fetch(requests.fetchNetflixOriginals)
        .then((res) => res.json())
        .then((data) => {
            const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
            const banner = document.getElementById("banner");
            const bannerTitle = document.getElementById("banner_title");
            const bannerDesc = document.getElementById("banner_description");

            if (setMovie?.backdrop_path) {
                banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
            }
            bannerDesc.innerText = truncate(setMovie.overview, 150);
            bannerTitle.innerText = setMovie.name || setMovie.title;
        })
        .catch((error) => console.error('Error setting banner:', error));
}

setBanner();

fetchAndCreateRow(requests.fetchNetflixOriginals, "NETFLIX ORIGINALS", true);
fetchAndCreateRow(requests.fetchTrending, "Trending Now", true);
fetchAndCreateRow(requests.fetchActionMovies, "Action Movies");
fetchAndCreateRow(requests.fetchComedyMovies, "Comedy Movies");
fetchAndCreateRow(requests.fetchHorrorMovies, "Horror Movies");
fetchAndCreateRow(requests.fetchRomanceMovies, "Romance Movies");
fetchAndCreateRow(requests.fetchDocumentaries, "Documentaries");
