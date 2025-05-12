<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div v-if="loading" class="container-body w-80ch">
            <Loading />
        </div>

        <div v-else class="container-body w-80ch">
            <div class="d-flex align-center justify-between mb-5">
                <h2 class="m-0">Posts</h2>
                <div class="pagination d-flex align-center justify-center">
                    <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>       
                    <span>Page {{ currentPage }} of {{ totalPages }}</span> 
                    <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>        
                </div>
            </div>
            <template v-for="post in postList">
                <PostCard :post="post" />
            </template>
        </div>

        
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute, useRouter } from 'vue-router';
    import PostCard from "../components/postCard.vue"
    import NavComponent from '../components/nav.vue';
    import Loading from '../components/loading.vue';

    const route = useRoute();
    const router = useRouter();
    const postList = ref(); 
    const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
    const totalPages = ref(1);
    const postsPerPage = ref(3);
    const loading = ref<boolean>(true);

    async function getAllPublishedPosts() {
        let api = `https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts?page=${currentPage.value}&limit=${postsPerPage.value}`; 
        const query = (route.query.query as string ?? "").trim();

        if (query) { 
            api += `&search?query=${encodeURIComponent(query)}`
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
                    postList.value = data.data.data; 
                    totalPages.value = data.data.totalPages || 1;
                    console.log("posts", postList.value); 
                    loading.value = false;
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            console.log(currentPage.value)
            router.push({ query: { ...route.query, page: currentPage.value } });
        }
    }

    function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
            console.log(currentPage.value)
            router.push({ query: { ...route.query, page: currentPage.value } });
        }
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

    watch(() => route.query.page, (newPage) => {
        loading.value = true;
        currentPage.value = newPage ? parseInt(newPage as string) : 1;
        getAllPublishedPosts()
    });
</script>