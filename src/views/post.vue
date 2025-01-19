<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div class="container-body w-80ch">
            <template v-for="(el) in content" :key="el.id">
                <div v-html="el.html" role="document"
                    style="white-space: pre-wrap;min-width: 1px;">
                </div>
            </template>

            <Comments :post-id="postId" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute } from 'vue-router';
    import NavComponent from '../components/nav.vue';
    import Comments from '../components/comments.vue';

    interface element {
        id: number,
        html: string,
        children: element[],
        attributes: string,
        editing: boolean,
        hover: boolean
    }

    const loading = ref<boolean>(true);
    const route = useRoute(); 
    const post = ref(); 
    const postId = ref<number>(-1); 
    const content = ref<element[]>([]); 
    const tags = ref<{id: number, name: string}[]>([])


    async function getPost() {
        loading.value = true;
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
                    postId.value = data.data[0].id;
                    content.value = JSON.parse(post.value.content); 
                    updateHead();
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    async function getPostTags() {
        loading.value = true;
        // await fetch(`http://localhost:3000/post/${postId.value}/tags`, {
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/${postId.value}/tags`, {
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
                    tags.value = data.data.tags;
                    createTagsPill(); 
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    function updateHead() {
        useHead({
            title: post.value?.title || 'Loading...',
            meta: [
                { name: 'description', content: post.value?.description || 'Default blog description' }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    key: 'schema-org-blog-post', // Ensures this script is unique
                    children: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.value?.title || 'Default Title',
                        "author": "Cdev010",
                        "datePublished": post.value?.publishedAt || '2025-01-01',
                        "dateModified": post.value?.updatedAt || '2025-01-01',
                        "description": post.value?.description || 'A summary of the blog post.',
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://coffeeshopcoding.dev/post/${route.params.slug}`
                        }
                    })
                }
            ]
        });
    }

    function createTagsPill() {
        const tagContainer = document.getElementById('tag-section'); 
        if(!tagContainer) { return }
        tagContainer.className = 'd-flex align-center gap-1 mb-2';
        tags.value.forEach(tag =>{
            const anchor = document.createElement('a');
            anchor.innerText = tag.name; 
            anchor.className = 'me-2 btn btn-sm'
            anchor.href = `/tag/${tag.id}`;
            tagContainer?.appendChild(anchor);
        })
    }

    onMounted(async () => {
        await getPost(); 
        await getPostTags(); 
    })
</script>
