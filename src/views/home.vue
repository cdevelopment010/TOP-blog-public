<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />

        </div>
        <div class="container-body d-grid-80-20">
            <!-- posts -->
            <section class="recent-posts">
                <h1 class="mb-2">Posts</h1>
                <template v-for="(post, index) in postList">
                    <PostCard :post="post" :class="{'grid-full-row': index == 0 }"/>
                </template>
                <a href="/posts">See more posts...</a>
                
            </section>
            <!-- sidebar -->
            <aside>
                <h3 class="m-0 mb-2">tags</h3>
                <div class="d-flex flex-column gap-1">
                    <template v-for="tag in tagList" :key="tag.id"> 
                        <a :href="`/tags/${tag.id}`" class="link-none btn btn-secondary">{{ tag.name }} ({{ tag._count.PostTag }})</a>
                    </template>
                </div>
            </aside>
        </div>
    </div>  
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue"; 
    import { useHead } from '@unhead/vue';
    import NavComponent from '../components/nav.vue'
    import PostCard from "../components/postCard.vue";

    const postList = ref(); 
    const tagList = ref(); 

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
                        tagList.value = data.data.splice(0,2); 
                    }
                }).catch( err => {
                    console.error(err); 
                })
    }

    function updateHead() {
        useHead({
            title: 'CoffeeShopCoding',
            meta: [
                {
                    name: 'description',
                    content: 'Home page of the blog Coffee Shop Coding. It contains recent posts, popular tags, and more.'
                }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    key: 'schema-org-blog-post', // Ensures this script is unique
                    children: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": "Home Page",
                        "author": "Cdev010",
                        "datePublished": '2025-01-19',
                        "dateModified":'2025-01-01',
                        "description": "Home page of the blog coffee shop coding. It contains recent posts, popular tags",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://coffeeshopcoding.dev/`
                        }
                    })
                }
            ]
        });
    }

    onMounted(async() => {
        updateHead(); 
        await getAllRecentPublishedPosts(5);
        await getAllTags()
    } )
</script>

<style scoped>

.d-grid-80-20 {
    display: grid;
    grid-template-columns: 80fr 20fr;
    gap: 3rem;
}
.recent-posts { 
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.grid-full-row { 
    /* grid-column-start: 1; 
    grid-column-end: -1; */
    grid-column: 1 / -1;
}

</style>