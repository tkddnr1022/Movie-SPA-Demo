<template>
    <header>
        <nav class="navbar">
            <div class="menu-toggle" @click="toggleMobileMenu">
                <MenuIcon class="menu-icon" />
            </div>
            <div class="user-toggle" @click="toggleMobileProfile">
                <UserCircleIcon class="user-icon-mobile" />
            </div>
            <div class="logo" @click="goToHome">Movie-SPA-Demo</div>
            <ul class="nav-links">
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
                <li v-if="userEmail">
                    <div class="user-wrapper">
                        <UserCircleIcon class="user-icon" />{{ userEmail }}
                    </div>
                </li>
            </ul>
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
            </transition>
            <transition name="fade">
                <ul v-if="isMobileProfileOpen" class="nav-links mobile-user">
                    <li @click="closeMobileProfile">
                        {{ userEmail }}
                    </li>
                </ul>
            </transition>
        </nav>
    </header>
</template>

<script setup>
import router from '@/router';
import { getSession } from '@/scripts/utils/storage';
import { MenuIcon, UserCircleIcon } from '@heroicons/vue/solid';
</script>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "Navbar",
    components: {
        RouterLink,
    },
    data() {
        return {
            isMobileMenuOpen: false,
            isMobileProfileOpen: false,
            userEmail: '',
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        closeMobileMenu() {
            this.isMobileMenuOpen = false;
        },
        toggleMobileProfile() {
            this.isMobileProfileOpen = !this.isMobileProfileOpen;
        },
        closeMobileProfile() {
            this.isMobileProfileOpen = false;
        },
        goToHome() {
            router.push('/');
        },
        fetchUserEmail() {
            const user = getSession();
            if (user) {
                this.userEmail = user.email;
            }
        }
    },
    mounted() {
        this.fetchUserEmail();
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

.user-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user-icon {
    width: 1.2rem;
    margin-right: 0.3rem;
}

.user-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.user-icon-mobile {
    color: #b8b8b8;
    width: 2rem;
    transition: color 0.2s;
}

.user-icon-mobile:active {
    color: #fff;
}

.nav-links {
    display: flex;
    align-items: center;
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

.menu-icon {
    color: #b8b8b8;
    width: 2rem;
    transition: color 0.2s;
}

.menu-icon:active {
    color: #fff;
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
        position: absolute;
    }

    .user-toggle {
        display: flex;
        position: absolute;
        right: 0;
    }

    .logo:hover {
        pointer-events: none;
    }

    .logo:active {
        color: #c5030d;
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

    .mobile-user {
        display: flex;
        flex-direction: column;
        width: 10rem;
        position: absolute;
        top: 100%;
        right: 0;
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