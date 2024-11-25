<template>
    <div class="wrapper">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h1>환영합니다</h1>
        <p class="description">최신 영화에 대한 다양한 정보를 지금 찾아보세요.</p>
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
}

.description {
    font-size: 1.2rem;
    max-width: 300px;
}
</style>