<template>
    <header>
        <nav class="navbar">
            <div class="logo">Movie-SPA-Demo</div>
            <ul class="nav-links">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/features">Features</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact">Contact</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "Navbar",
    components: {
        RouterLink,
    },
};
</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    background-color: #141414;
    color: white;
    font-size: 1rem;
    font-weight: bold;
}

.logo {
    font-size: 1.5rem;
    color: #e50914;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.2s;
}

.nav-links a:hover {
    color: #e50914;
}
</style>
