<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body w-80ch">
            <div v-if="loading">
                <LoadingIndicator />
            </div>
            <div v-else>
                <h2>Posts</h2>
                <template v-for="post in postList">
                    <PostCard :post="post" />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useHead } from '@unhead/vue';
    import PostCard from "../components/postCard.vue"
    import NavComponent from '../components/nav.vue';
    import LoadingIndicator from '../components/loading.vue';
    
    const route = useRoute();
    const postList = ref();
    const loading = ref<boolean>(true);
    async function getAllPublishedPosts() {
        if (!route.params.tagId) { return }
        loading.value = true;
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
            }).finally(() => {
                loading.value = false;
            })
    }

    watch(() => route.params.tagId, async () => {
        await getAllPublishedPosts();
    })

    
    useHead({
        title: "Posts by tags", 
        meta: [
            {}
        ], 
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": "Blog Post Title",
                    "author": "Cdev010",
                    "datePublished": "2025-01-01",
                    "dateModified": "2025-01-01",
                    "description": "A summary of the blog post.",
                    "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://coffeeshopcoding.dev/tags/`
                    }
      })
            }
        ]
    })
    
    

    onMounted(async () => {
        await getAllPublishedPosts(); 
    })
</script>