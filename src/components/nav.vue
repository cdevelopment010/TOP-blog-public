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
            <button class="btn" @click="toggleDarkMode" style="font-size:1.3rem;">
                <i class="fa-solid fa-moon" v-if="darkmode == 'dark'"></i>
                <i class="fa-solid fa-sun" v-if="darkmode == 'light'"></i>
            </button>
        </div>

    </nav>

</template>

<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, onMounted } from "vue"; 

    
    const router = useRouter(); 
    const searchQuery = ref('');
    const darkmode=ref<string>(localStorage.getItem('csc-theme') ?? 'light') 

    const performSearch = () => {
        if (searchQuery.value.trim()) {
            router.push({ path: "/posts", query: { query: searchQuery.value.trim() } });
        }
    };

    function toggleDarkMode() {
        const newTheme = darkmode.value == "dark" ? "light" : "dark";
        darkmode.value = newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("csc-theme", newTheme);
    }

    onMounted(()=> {
        const savedTheme = localStorage.getItem("csc-theme") || "light";
        darkmode.value = savedTheme;
        document.documentElement.setAttribute("data-theme", savedTheme);
    })

    
</script>

<style scoped>
    nav { 
        display: flex; 
        align-items: center;
        justify-content: space-between;
    }

</style>