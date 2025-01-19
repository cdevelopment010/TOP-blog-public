<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body w-80ch">
            <div class="profile-picture">
                <img src="https://res.cloudinary.com/dxcrv5gid/image/upload/v1715526765/dj8hooqrszgthdyhwpf0.jpg" alt="Profile image" />
            </div>

            <p>
                Hi! I'm Craig - Software developer
            </p>

            <p>
                This blog started off as a project from <a href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api" target="_blank">TOP</a>, but I wanted to learn more about domain management and analytics.
            </p>
            <p>
                I thought why not write about code and tech to learn even more? Keep snippets that I have found useful, and maybe others might find useful!
            </p>

        </div>
    </div>
</template>

<script setup lang="ts">
import NavComponent from '../components/nav.vue';


</script>

<style scoped>
.profile-picture {
    margin-inline: auto; 
    width: 250px; 
    height: 250px; 
    border-radius: 50%; 
    overflow: hidden; 
    border: 5px solid var(--primary-1);
}

.profile-picture:hover { 
    border-color: var(--primary-2)
}

.profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

</style>