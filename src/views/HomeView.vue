<template>
    <div class="home-view" v-if="loaded">
        <MovieDialog :movie="selectedMovie" @close="selectedMovie = null" />
        <div class="slider-container">
            <div class="slider-header">
                <LightningBoltIcon class="icon" />
                <h2>현재 상영중</h2>
            </div>
            <Slider class="slider-wrapper" :items="movies.nowPlaying"
                :itemsPerSlide="itemsPerSlide">
                <template v-slot="{ item }">
                    <MovieItem :movie="item" @click="openMovieDialog(item)" />
                </template>
            </Slider>
        </div>
        <div class="slider-container">
            <div class="slider-header">
                <FireIcon class="icon" />
                <h2>최고 인기</h2>
            </div>
            <Slider class="slider-wrapper" :items="movies.popular"
                :itemsPerSlide="itemsPerSlide">
                <template v-slot="{ item }">
                    <MovieItem :movie="item" @click="openMovieDialog(item)" />
                </template>
            </Slider>
        </div>
        <div class="slider-container">
            <div class="slider-header">
                <StarIcon class="icon" />
                <h2>최고 평점</h2>
            </div>
            <Slider class="slider-wrapper" :items="movies.topRated"
                :itemsPerSlide="itemsPerSlide">
                <template v-slot="{ item }">
                    <MovieItem :movie="item" @click="openMovieDialog(item)" />
                </template>
            </Slider>
        </div>
        <div class="slider-container">
            <div class="slider-header">
                <ClockIcon class="icon" />
                <h2>개봉 예정</h2>
            </div>
            <Slider class="slider-wrapper" :items="movies.upcoming"
                :itemsPerSlide="itemsPerSlide">
                <template v-slot="{ item }">
                    <MovieItem :movie="item" @click="openMovieDialog(item)" />
                </template>
            </Slider>
        </div>
    </div>
    <div v-else class="spinner-wrapper">
        <span class="spinner" />
    </div>
</template>

<script setup lang="ts">
const selectedMovie = ref()
const openMovieDialog = (movie: Movie) => {
    selectedMovie.value = movie
}
</script>

<script lang="ts">
import { getMovieList } from '@/scripts/api/get-movie-list';
import Slider from '@/components/Slider.vue';
import type { Movie } from '@/scripts/interfaces/movie';
import { MovieListQuery } from '@/scripts/enums/movie-list-query';
import MovieItem from '@/components/MovieItem.vue';
import { ref } from 'vue';
import MovieDialog from '@/components/MovieDialog.vue';
import { ClockIcon, FireIcon, LightningBoltIcon, StarIcon } from '@heroicons/vue/solid';

export default {
    name: "HomeView",
    components: {
        Slider,
        MovieItem,
        MovieDialog,
    },
    data() {
        return {
            movies: {
                nowPlaying: [] as Movie[],
                popular: [] as Movie[],
                topRated: [] as Movie[],
                upcoming: [] as Movie[],
            },
            windowWidth: window.innerWidth,
            loaded: false,
        }
    },
    computed: {
        itemsPerSlide() {
            if (this.windowWidth > 1200) {
                return 5;
            } else if (this.windowWidth > 768) {
                return 4;
            } else {
                return 3;
            }
        }
    },
    mounted() {
        this.fetchData()
        window.addEventListener("resize", this.handleResize);
    },
    methods: {
        async fetchData() {
            const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
                getMovieList(MovieListQuery.NowPlaying),
                getMovieList(MovieListQuery.Popular),
                getMovieList(MovieListQuery.TopRated),
                getMovieList(MovieListQuery.Upcoming),
            ]);

            if (nowPlaying) {
                this.movies.nowPlaying = nowPlaying.results;
            }
            if (popular) {
                this.movies.popular = popular.results;
            }
            if (topRated) {
                this.movies.topRated = topRated.results;
            }
            if (upcoming) {
                this.movies.upcoming = upcoming.results;
            }

            this.loaded = true;
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    },
};
</script>

<style scoped>
.home-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    animation: fadein 0.5s ease;
}

.slider-container {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.slider-wrapper {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.slider-header {
    display: flex;
}

.icon {
    width: 1.4rem;
    margin-right: 0.3rem;
}

.spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 83vh;
}

.spinner {
    width: 4rem;
    height: 4rem;
    border: 6px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(-5%);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
}
</style>