import axios from "axios"
import type { MovieResponse } from "../interfaces/movie";
import { APIBaseURLs } from "../enums/api-base-urls";
import { getApiKey, getCachedData, setCachedData } from "../utils/storage";

const REGION = import.meta.env.VITE_REGION;
const LANGUAGE = import.meta.env.VITE_LANGUAGE;

export async function getMovieList(query: string) {
    const cache = getCachedData(`movieList-${query}`);
    if (cache) {
        return cache.data as MovieResponse;
    }
    const params = {
        api_key: getApiKey(),
        region: REGION,
        language: LANGUAGE,
    }
    try {
        const movies = await axios.get<MovieResponse>(`${APIBaseURLs.MovieList}/${query}`, { params });
        if (movies.data.total_results > 0) {
            setCachedData(`movieList-${query}`, movies.data);
        }
        return movies.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
    }
}