import { fetchFromTMDB } from "../services/tmdb.js";

export async function getTrendingMovie(req, res) {

    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).send({
        success: true,
        content: randomMovie
    })
}


export async function getMovieTrailers(req, res) {
    const { id } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({ success: true, trailers: data.results });

}


export async function getMovieDetails(req, res) {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    res.status(200).json({ success: true, content: data });

}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.status(200).json({ success: true, similar: data.results });

}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    res.status(200).json({ success: true, content: data.results });

}
