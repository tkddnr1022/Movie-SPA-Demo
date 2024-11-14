<template>
  <!--Todo: 로그인 페이지에서 Navbar 숨김-->
  <Navbar />
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
  background-color: black;
}
</style>
