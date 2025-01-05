<template>
    <div class="d-flex">
        <div>
            <h2>Coffee Shop Coding</h2>
        </div>

        <div>
            <RouterLink to="/posts" class="me-2">Posts</RouterLink>
            <RouterLink to="/tags">Tags</RouterLink>
        </div>

    </div>

</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
</script>