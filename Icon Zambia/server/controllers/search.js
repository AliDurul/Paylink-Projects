import { User } from "../models/user.js";
import { fetchFromTMDB } from "../services/tmdb.js";

export async function searchPerson(req, res) {
    const { query } = req.params;

    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].profile_path,
                title: response.results[0].name,
                searchType: "person",
                createdAt: new Date(),
            },
        },
    });

    res.status(200).json({ success: true, content: response.results });

}

export async function searchMovie(req, res) {
    const { query } = req.params;

    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].title,
                searchType: "movie",
                createdAt: new Date(),
            },
        },
    });
    res.status(200).json({ success: true, content: response.results });

}

export async function searchTv(req, res) {
    const { query } = req.params;

    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].name,
                searchType: "tv",
                createdAt: new Date(),
            },
        },
    });
    res.json({ success: true, content: response.results });

}

export async function getSearchHistory(req, res) {
    res.status(200).json({ success: true, content: req.user.searchHistory });

}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;

    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            searchHistory: { id: id },
        },
    });

    res.status(200).json({ success: true, message: "Item removed from search history" });

}
