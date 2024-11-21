<template>
    <div class="home-view">
        <div class="card">
            <Landing class="landing"/>
            <SignIn class="signin"/>
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
};
</script>

<style scoped>
.home-view {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height: 92vh;
}

.card {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 50rem;
    height: 100%;
    max-height: 25rem;
    background-color: #333;
    color: white;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.landing, .signin{
    width: 50%;
    height: 100%;
}

@media (max-width: 1024px) {
    .card {
        flex-direction: column;
        align-items: center;
        max-width: 25rem;
    }

    .landing{
        display: none;
    }

    .signin{
        width: 100%;
    }
}
</style>