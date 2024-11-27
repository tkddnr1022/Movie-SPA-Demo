import axios from "axios"
import { APIBaseURLs } from "../enums/api-base-urls";
import { getApiKey } from "../utils/storage";
import type { GenreResponse } from "../interfaces/genre";

const LANGUAGE = import.meta.env.VITE_LANGUAGE;

export async function getGenreList() {
    const params = {
        api_key: getApiKey(),
        language: LANGUAGE,
    }
    try {
        const genres = await axios.get<GenreResponse>(`${APIBaseURLs.GenreList}`, { params });
        return genres.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
    }
}