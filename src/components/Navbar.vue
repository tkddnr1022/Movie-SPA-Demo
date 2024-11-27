<template>
    <header>
        <nav class="navbar">
            <div class="menu-toggle" @click="toggleMobileMenu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <div class="logo">Movie-SPA-Demo</div>
            <transition name="fade">
                <ul v-if="isMobileMenuOpen" class="nav-links mobile-menu">
                    <li @click="closeMobileMenu">
                        <RouterLink to="/">홈</RouterLink>
                    </li>
                    <li @click="closeMobileMenu">
                        <RouterLink to="/popular">인기</RouterLink>
                    </li>
                    <li @click="closeMobileMenu">
                        <RouterLink to="/search">검색</RouterLink>
                    </li>
                    <li @click="closeMobileMenu">
                        <RouterLink to="/wishlist">찜 목록</RouterLink>
                    </li>
                </ul>
                <ul v-else class="nav-links">
                    <li>
                        <RouterLink to="/">홈</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/popular">인기</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/search">검색</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/wishlist">찜 목록</RouterLink>
                    </li>
                </ul>
            </transition>
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
    data() {
        return {
            isMobileMenuOpen: false
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        closeMobileMenu() {
            this.isMobileMenuOpen = false;
        }
    }
};
</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: black;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    position: relative;
}

.logo {
    font-size: 1.5rem;
    color: #e50914;
    transition: color 0.2s;
    cursor: pointer;
}

.logo:hover {
    color: #c5030d;
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

.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 3px 0;
    transition: 0.4s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media screen and (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .nav-links {
        display: none;
    }

    .mobile-menu {
        display: flex;
        flex-direction: column;
        width: 10rem;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #353535;
        border-radius: 14px;
        padding: 0;
    }

    .nav-links li {
        margin: 1rem 0;
        text-align: center;
    }

    .logo {
        position: static;
        transform: none;
        margin: 0 auto;
    }

    .navbar {
        justify-content: flex-start;
    }
}
</style>