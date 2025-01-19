<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body w-80ch">
            <h2>Posts</h2>
            <template v-for="post in postList">
                <PostCard :post="post" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import PostCard from "../components/postCard.vue"
    import NavComponent from '../components/nav.vue';
    
    const route = useRoute();
    const postList = ref();
    async function getAllPublishedPosts() {
        if (!route.params.tagId) { return }
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/tag/${route.params.tagId}`, {
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
    
    

    onMounted(async () => {
        await getAllPublishedPosts(); 
    })
</script>