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
.container{
  width: 100%;
  padding: 0rem 10rem 0rem 10rem;
}

@media (max-width: 1200px) {
  .container {
    padding: 0rem 5rem 0rem 5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0rem 2.5rem 0rem 2.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0rem 1.2rem 0rem 1.2rem;
  }
}
</style>
