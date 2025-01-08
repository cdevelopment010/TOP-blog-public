<template>
    <NavComponent />
    
    <div class="container">
        Top 5 posts here in a grid fashion  
        <p>Post 1 will span full width</p>
        <p>-- P1 P1 --</p>
        <p>-- P2 P3 --</p>
        <p>-- P4 P5 --</p>
    </div>

    <template v-for="post in postList">
        <div>{{ post.title }}</div>
    </template>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue"; 
    import NavComponent from '../components/nav.vue'

    const postList = ref(); 

    async function getAllRecentPublishedPosts(numberOfPosts : number) {
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/recent/${numberOfPosts}`, {
                mode: 'cors',
                method: 'GET', 
                headers: { 'Content-Type': 'application/json'},
            }).then(async response => {
                if (!response.ok)
                {  
                    console.log("ERROR: Tags - ",response)
                    return new Error(`Error ${response}`)
                } else { 
                    let data = await response.json(); 
                    postList.value = data.data; 
                    console.log(postList.value);
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    onMounted(async() => {
        await getAllRecentPublishedPosts(5);
    } )
</script>