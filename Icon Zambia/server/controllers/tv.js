import { fetchFromTMDB } from "../services/tmdb.js";

export async function getTrendingTv(req, res) {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });

}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    res.json({ success: true, trailers: data.results });

}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    res.status(200).json({ success: true, content: data });

}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    res.status(200).json({ success: true, similar: data.results });
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    res.status(200).json({ success: true, content: data.results });
}
