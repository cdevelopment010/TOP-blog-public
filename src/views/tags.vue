<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body w-80ch">
            <h2>Tags</h2>
            <template v-for="tag in tagList">
                <div class="mb-2 tag-item">
                    <a :href="`/tags/${tag.id}`" class="link-none" >
                        <div class="">
                            <strong>{{ tag.name }}</strong>
                        </div>
                        <div>Post count: {{ tag._count.PostTag }}</div>
                    </a>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue"; 
import { useHead } from '@unhead/vue';
import { useRoute } from 'vue-router';
import NavComponent from '../components/nav.vue';


const route = useRoute(); 
const tagList = ref(); 
console.log(route.params.slug);

async function getAllTags() { 
    await fetch("https://top-blog-api-proud-thunder-6960.fly.dev/tag/tagPostCount", {
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
                    tagList.value = data.data; 
                }
            }).catch( err => {
                console.error(err); 
            })
}


useHead({
        title: "Tags | CSC ", //change to dynamic post name
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
                    "@id": `https://coffeeshopcoding.dev/tags/`
                    }
      })
            }
        ]
    })


onMounted(async () => {
    await getAllTags();
})

</script>

<style scoped>
    .tag-item:hover, 
    .tag-item:active, 
    .tag-item:focus { 
        transform: translateY(-3px);
    }
</style>