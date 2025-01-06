<template>
    <h3>Posts</h3>
    <template v-for="post in postList">
        <PostCard :post="post" />
    </template>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute } from 'vue-router';
    import PostCard from "../components/postCard.vue"

    const postList = ref(); 
    async function getAllPublishedPosts() {
        await fetch('https://top-blog-api-production.up.railway.app/post/public/publishedPosts/', {
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
    
    const route = useRoute();

    useHead({
        title: "Post-", //change to dynamic post name
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
                    "author": "Your Name",
                    "datePublished": "2025-01-01",
                    "dateModified": "2025-01-01",
                    "description": "A summary of the blog post.",
                    "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://coffeeshopcoding.dev/post/${route.params.slug}`
                    }
      })
            }
        ]
    })

    onMounted(async () => {
        await getAllPublishedPosts(); 
    })
</script>