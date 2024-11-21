<template>
    <div class="wrapper">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <p class="description">Welcome to Our Service! Stream the best content anytime, anywhere.</p>
    </div>
</template>

<script>
export default {
    name: "Landing",
};
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.logo {
    width: 100px;
    margin-bottom: 1rem;
}

.description {
    font-size: 1.2rem;
    max-width: 300px;
}
</style>