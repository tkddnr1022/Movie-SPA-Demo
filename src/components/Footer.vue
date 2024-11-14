<template>
    <footer class="footer">
        <p>&copy; 2024 tkddnr1022. All Rights Reserved.</p>
        <RouterLink to="/features">Features</RouterLink>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: black;
    color: white;
    font-size: 0.9rem;
    opacity: 0.8;
}
</style>