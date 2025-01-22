<template>
    <nav class="d-flex">
        <div>
            <RouterLink to="/" class="link-none"><h2>Coffee Shop Coding</h2></RouterLink>
        </div>

        <div class="d-flex justify-evenly align-center gap-1">
            <input type="text" placeholder="Search tags or titles" v-model="searchQuery" @keydown.enter="performSearch"/>
            <RouterLink to="/posts" class="btn">Posts</RouterLink>
            <RouterLink to="/tags" class="btn">Tags</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">About</RouterLink>
        </div>

    </nav>

</template>

<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    import { ref } from "vue"; 

    
    const router = useRouter(); 
    const searchQuery = ref('');
    const performSearch = () => {
        if (searchQuery.value.trim()) {
            router.push({ path: "/posts", query: { query: searchQuery.value.trim() } });
        }
    };
    
</script>

<style scoped>
    nav { 
        display: flex; 
        align-items: center;
        justify-content: space-between;
    }

</style>