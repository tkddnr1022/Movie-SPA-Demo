import axios from "axios"
import type { MovieResponse } from "../interfaces/movie";
import { APIBaseURLs } from "../enums/api-base-urls";
import { getApiKey } from "../utils/storage";

const REGION = import.meta.env.VITE_REGION;

export async function getMovieList(query: string) {
    const params = {
        api_key: getApiKey(),
        region: REGION,
    }
    try {
        const movies = await axios.get<MovieResponse>(`${APIBaseURLs.MovieList}/${query}`, { params });
        return movies.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
    }
}