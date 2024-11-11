<template>
    <div class="wrapper">
        <SignIn />
    </div>
</template>

<script>
import SignIn from '../components/SignIn.vue';

export default {
    name: 'Home',
    components: {
        SignIn,
    }
};
</script>

<style>
.wrapper{
    padding: 0.1rem;
}
</style>