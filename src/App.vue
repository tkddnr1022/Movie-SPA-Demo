<template>
  <Navbar v-if="!$route.meta.hideNavbar" />
  <div class="container">
    <RouterView />
  </div>
  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
.container {
  padding: 0rem 2rem 0rem 2rem;
  width: 100%;
}
</style>
