<template>
    <footer>
        <p>&copy; {{ new Date().getFullYear()}} Coffee Shop Coding</p>
        <nav aria-label="Footer navigation">
            <RouterLink to="/privacy">Privacy Policy</RouterLink>
            <RouterLink to="/cookies">Cookie Policy</RouterLink>
        </nav>
    </footer>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<style scoped>
footer { 
    margin-top: 2rem;
    width: 100%; 
    text-align: center;
}

footer nav { 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
}
</style>