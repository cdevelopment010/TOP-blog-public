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
    import { ref, onMounted, watch } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute } from 'vue-router';
    import PostCard from "../components/postCard.vue"
    import NavComponent from '../components/nav.vue';

    const route = useRoute();
    const postList = ref(); 
    async function getAllPublishedPosts() {
        let api = 'https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/'; 
        const query = (route.query.query as string ?? "").trim();

        if (query) { 
            api += `search?query=${encodeURIComponent(query)}`
        }


        await fetch(api, {
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
    

    useHead({
        title: "Post | CSC ", //change to dynamic post name
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

    onMounted(getAllPublishedPosts); 

    watch(() => route.query.query, getAllPublishedPosts); 
</script>