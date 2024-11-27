<template>
    <div class="movie-container">
        <img :src="posterUrl" class="movie-poster" alt="Movie Poster" />
    </div>
</template>

<script lang="ts">
import { APIBaseURLs } from '@/scripts/enums/api-base-urls';
import type { Movie } from '@/scripts/interfaces/movie';
import type { PropType } from 'vue';

export default {
    name: "MovieItem",
    props: {
        movie: {
            type: Object as PropType<Movie>,
            required: true,
        },
    },
    data() {
        return {
            posterUrlPrefix: APIBaseURLs.Poster,
        }
    },
    computed: {
        posterUrl(): string {
            return this.posterUrlPrefix + this.movie.poster_path;
        },
    },
};
</script>

<style scoped>
.movie-container {
    line-height: 0;
    padding: 0.8rem;
}

.movie-poster {
    width: 100%;
    border-radius: 8px;
}
</style>