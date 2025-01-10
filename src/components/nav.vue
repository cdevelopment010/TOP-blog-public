<template>
    <nav class="d-flex">
        <div>
            <RouterLink to="/" class="link-none"><h2>Coffee Shop Coding</h2></RouterLink>
        </div>

        <div class="d-flex justify-evenly align-center gap-1">
            <RouterLink to="/posts" class="btn">Posts</RouterLink>
            <RouterLink to="/tags" class="btn">Tags</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">About</RouterLink>
        </div>

    </nav>

</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
    nav { 
        display: flex; 
        align-items: center;
        justify-content: space-between;
    }

</style>