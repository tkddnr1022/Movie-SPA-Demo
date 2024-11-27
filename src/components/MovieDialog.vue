<template>
    <div v-if="movie" class="dialog-overlay" @click.self="closeDialog">
        <dialog ref="dialogRef" class="movie-detail-dialog" @click.self="closeDialog">
            <div class="dialog-content">
                <button @click="closeDialog" class="close-button">&times;</button>
                <div class="movie-backdrop">
                    <img :src="backdropUrlPrefix + movie.backdrop_path" :alt="movie.title">
                </div>
                <div class="movie-info">
                    <h2>{{ movie.title }}</h2>
                    <div class="movie-metadata">
                        <div class="movie-metadata-wrapper">
                            <CalendarIcon class="icon" />
                            <span>{{ movie.release_date }}</span>
                        </div>
                        <div class="movie-metadata-wrapper">
                            <TranslateIcon class="icon" />
                            {{ movie.original_language.toUpperCase() }}
                        </div>
                        <div class="movie-metadata-wrapper">
                            <StarIcon class="icon" />
                            {{ movie.vote_average.toFixed(1) }}
                        </div>
                    </div>
                    <p class="movie-overview">{{ movie.overview }}</p>
                    <div class="movie-actions">
                        <button @click="addToWish">
                            <HeartIcon class="icon" />
                            <span class="button-text">찜하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { APIBaseURLs } from '@/scripts/enums/api-base-urls';
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { CalendarIcon, HeartIcon, StarIcon, TranslateIcon } from '@heroicons/vue/solid';

const backdropUrlPrefix = APIBaseURLs.Backdrop;
const props = defineProps({
    movie: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['close'])

const dialogRef = ref(null)
const router = useRouter()

watch(() => props.movie, async (newMovie) => {
    await nextTick()
    if (newMovie && dialogRef.value) {
        dialogRef.value.showModal()
    }
})

const closeDialog = () => {
    if (dialogRef.value) {
        dialogRef.value.close()
    }
    emit('close')
}

const addToWish = () => {
    if (props.movie) {

    }
}
</script>

<script>
export default {
    watch: {
        movie(newMovie) {
            if (newMovie) {
                this.$nextTick(() => {
                    const overlay = this.$el;
                    overlay.classList.add('show');
                })
            } else {
                const overlay = this.$el;
                overlay.classList.remove('show');
            }
        }
    }
}
</script>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    z-index: 1000;
}

.dialog-overlay.show {
    opacity: 1;
    visibility: visible;
}

.movie-detail-dialog {
    width: 500px;
    max-width: 90%;
    max-height: 90vh;
    padding: 0;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    overflow: auto;
    outline: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.movie-detail-dialog[open] {
    opacity: 1;
}

.dialog-content {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    animation: fade-in 0.3s ease-in-out;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    z-index: 10;
    color: #999;
    outline: none;
    transition: color 0.1s ease;
}

.close-button:hover {
    color: #ccc
}

.movie-backdrop {
    flex: 1;
}

.movie-backdrop img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.movie-info {
    flex: 1;
    padding: 20px;
}

.movie-metadata {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    color: #666;
}

.movie-metadata-wrapper {
    display: flex;
}

.movie-overview {
    margin-bottom: 20px;
    line-height: 1.6;
}

.movie-actions {
    display: flex;
    justify-content: flex-end;
}

.movie-actions button {
    padding: 0.8rem;
    background-color: #e50914;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.movie-actions button:hover {
    background-color: #f40612;
}

.icon {
    width: 1.2rem;
    margin-right: 2px;
}

.button-text {
    line-height: 1.2rem;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>