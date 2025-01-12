<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body">
            <h3>Posts</h3>
            <template v-for="(el) in content" :key="el.id">
                <div v-html="el.html" role="document"
                    style="white-space: pre-wrap;min-width: 1px;">
                </div>
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute } from 'vue-router';
    import NavComponent from '../components/nav.vue';

    interface element {
        id: number,
        html: string,
        children: element[],
        attributes: string,
        editing: boolean,
        hover: boolean
    }

    const route = useRoute(); 
    const post = ref(); 
    const title = computed(() => post.value?.title || '');
    console.log("title", title.value);
    const content = ref<element[]>([]); 


    async function getPost() {
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/${route.params.slug}`, {
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
                    post.value = data.data[0]; 
                    console.log(post.value);
                    content.value = JSON.parse(post.value.content); 
                    console.log(content.value);
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    useHead({
        title: `${title.value}`, //change to dynamic post name
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
        await getPost(); 
    })
</script>