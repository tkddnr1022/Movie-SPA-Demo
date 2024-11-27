<template>
    <div class="home-view">
        <MovieDialog :movie="selectedMovie" @close="selectedMovie = null" />
        <div class="slider-container">
            <div class="slider-header">
                <LightningBoltIcon class="icon" />
                <h2>현재 상영중</h2>
            </div>
            <Slider class="slider-wrapper" v-if="movies.nowPlaying" :items="movies.nowPlaying"
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
            <Slider class="slider-wrapper" v-if="movies.popular" :items="movies.popular" :itemsPerSlide="itemsPerSlide">
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
            <Slider class="slider-wrapper" v-if="movies.topRated" :items="movies.topRated"
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
            <Slider class="slider-wrapper" v-if="movies.upcoming" :items="movies.upcoming"
                :itemsPerSlide="itemsPerSlide">
                <template v-slot="{ item }">
                    <MovieItem :movie="item" @click="openMovieDialog(item)" />
                </template>
            </Slider>
        </div>
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
import { TestMovies } from '@/test/test-movies';
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
                nowPlaying: TestMovies as Movie[],
                popular: TestMovies as Movie[],
                topRated: TestMovies as Movie[],
                upcoming: TestMovies as Movie[],
            },
            windowWidth: window.innerWidth,
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
        //this.fetchData()
        window.addEventListener("resize", this.handleResize);
    },
    methods: {
        async fetchData() {
            const nowPlaying = await getMovieList(MovieListQuery.NowPlaying);
            if (nowPlaying) {
                this.movies.nowPlaying = nowPlaying.results;
            }
            const popular = await getMovieList(MovieListQuery.Popular);
            if (popular) {
                this.movies.popular = popular.results;
            }
            const topRated = await getMovieList(MovieListQuery.TopRated);
            if (topRated) {
                this.movies.topRated = topRated.results;
            }
            const upcoming = await getMovieList(MovieListQuery.Upcoming);
            if (upcoming) {
                this.movies.upcoming = upcoming.results;
            }
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