<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.container {
  padding: 4rem 2rem 2rem 2rem;
  height: 100svh;
  width: 100svw;
}

header {
  position: fixed;
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: white;
}

nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>
