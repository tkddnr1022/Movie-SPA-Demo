<template>
    <div class="home-view">
        <div class="card">
            <Landing v-show="isDesktop" />
            <SignIn />
        </div>
    </div>
</template>

<script>
import Landing from "@/components/Landing.vue";
import SignIn from "@/components/SignIn.vue";

export default {
    name: "HomeView",
    components: {
        Landing,
        SignIn,
    },
    computed: {
        isDesktop() {
            return window.innerWidth >= 1024;
        },
    },
};
</script>

<style scoped>
.home-view {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141414;
    height: 92vh;
}

.card {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    background-color: #333;
    color: white;
    border-radius: 8px;
    overflow: hidden;
}

@media (max-width: 1024px) {
    .card {
        flex-direction: column;
    }
}
</style>