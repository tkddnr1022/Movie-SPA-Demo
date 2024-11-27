import axios from "axios"
import { APIBaseURLs } from "../enums/api-base-urls";
import { getApiKey, getCachedData, setCachedData } from "../utils/storage";
import type { GenreResponse } from "../interfaces/genre";
import { useToast } from "vue-toast-notification";

const LANGUAGE = import.meta.env.VITE_LANGUAGE;

const $toast = useToast();

export async function getGenreList() {
    const cache = getCachedData('genreList');
    if (cache) {
        return cache.data as GenreResponse;
    }
    const params = {
        api_key: getApiKey(),
        language: LANGUAGE,
    }
    try {
        const genres = await axios.get<GenreResponse>(`${APIBaseURLs.GenreList}`, { params });
        if (genres.data.genres.length > 0) {
            setCachedData('genreList', genres.data);
        }
        return genres.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status == 401) {
                $toast.error('인증되지 않은 요청입니다. API KEY를 확인해주세요.');
            }
            else {
                $toast.error(error.response?.data);
            }
        }
    }
}