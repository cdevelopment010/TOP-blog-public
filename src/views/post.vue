<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>

        <div v-if="notFound">
            <Error404 />
        </div>

        
        <div v-else class="container-body w-80ch">
            <AuthorDetails :createdAt="post?.createdAt" class="mb-3"/>

            <template v-for="(el) in content" :key="el.id">
                <h1 
                    v-if="el.type === 'header1'" 
                    v-html="el.content">
                </h1>
                <h2 
                    v-if="el.type === 'header2'" 
                    v-html="el.content">
                </h2>
                <h3
                    v-if="el.type === 'header3'" 
                    v-html="el.content">
                </h3>
                <h4 
                    v-if="el.type === 'header4'" 
                    v-html="el.content">
                </h4>
                <div
                    v-else-if="el.type == 'tag'"
                    id="tag-section"
                > 
                </div>


                <p 
                    v-else-if="el.type === 'paragraph'"
                    v-html="el.content">
                </p>

                <ul
                    v-else-if="el.type === 'list'"
                >
                    <template v-for="(child, _) in el.children" :key="'list-'+el.id+'-'+_">
                        <li>{{ child }}</li>
                    </template>

                </ul>

                <blockquote 
                    v-else-if="el.type === 'quote'" 
                    v-html="el.content"
                    >
                </blockquote>

                <div v-else-if="el.type === 'code'">
                    <pre>
                    <code :class="`language-${el.language}`" v-html="el.content"></code>
                    </pre>

                </div>
                <a 
                    v-else-if="el.type === 'link'" 
                    v-html="el.content"
                    >
                </a>

                <div 
                    v-else-if="el.type == 'image'"
                    class="image-container spotlight"
                    :data-src="extractImgSrc(el.content)"
                    v-html="el.content"
                    > 
                </div>
            </template>

            <LikeShare :post-id="postId"/>
            <Comments :post-id="postId" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref, onMounted, nextTick } from 'vue';
    import { useHead } from '@unhead/vue';
    import { useRoute } from 'vue-router';
    import NavComponent from '../components/nav.vue';
    import Comments from '../components/comments.vue';
    import LikeShare from '../components/LikeShare.vue';
    import AuthorDetails from '../components/authorDetails.vue';
    import Error404 from '../components/404Post.vue';
    // @ts-ignore
    import Spotlight from 'spotlight.js/dist/js/spotlight.min.js'; 
    import 'spotlight.js/dist/css/spotlight.min.css';

    interface element {
        id: number,
        content: string,
        type: string,
        children?: element[],
        language?: string
    }

    const loading = ref<boolean>(true);
    const route = useRoute(); 
    const post = ref(); 
    const postId = ref<number>(-1); 
    const content = ref<element[]>([]); 
    const tags = ref<{id: number, name: string}[]>([])
    const notFound = ref<boolean | null>(null);


    async function getPost() {
        loading.value = true;
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/${route.params.slug}`, {
                mode: 'cors',
                method: 'GET', 
                headers: { 'Content-Type': 'application/json'},
            }).then(async response => {
                if (!response.ok)
                {  
                    notFound.value = true;
                    // const meta = document.createElement("meta");
                    // meta.name = "robots";
                    // meta.content = "noindex";
                    // document.head.appendChild(meta);
                    updateHead();
                    console.log("ERROR:",response)
                    throw new Error(`Error ${response}`)
                } else { 
                    let data = await response.json(); 
                    console.log("data",data)
                    post.value = data.data[0]; 
                    console.log("post", post.value);
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

        if (notFound.value) {
            useHead({
                title: '404 - post not found', 
                meta: [
                    { name: 'description', content: 'This post was deleted or never existed.' },
                    { name: 'robots', content: 'noindex' }
                    ]
                })
        } else {
            useHead({
                title: post.value?.title || 'Loading...',
                meta: [
                    { name: 'description', content: post.value?.description || 'Default blog description' },
                    { name: 'keywords', content: post.value?.keywords || 'blog, coding, web development' }
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
    }

    function createTagsPill() {
        const tagContainer = document.getElementById('tag-section'); 
        console.log("tagContainer:",tagContainer)
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

    function extractImgSrc(html: string) : string | null {
        const div = document.createElement("div"); 
        div.innerHTML = html; 
        const img = div.querySelector("img"); 
        return img?.getAttribute("src") || null; 
    }

    function initSpotlight() {
        const container = document.querySelector(".container-body"); 
        if (!container) { return }

        const images = container.querySelectorAll("img"); 
        images.forEach((img: any) => {
            img.setAttribute("data-spotlight", "");
            img.style.cursor = "zoom-in"
        });

        // Spotlight.init();
    }

    onMounted(async () => {
        await getPost(); 

        if (!notFound.value) 
        { 
            await getPostTags(); 
        }

        nextTick(() => {
            initSpotlight(); 
        }); 
    })
</script>

<style scoped>
.image-container { 
    border-radius: 5px;
}
::v-deep(.header-img) { 
  max-width: 100vw;
  width: 100%; 
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 4px 4px 16px 4px rgba(var(--text-2),0.5);
}

::v-deep(mark) { 
    color: var(--text-1);
    background: var(--primary-2);
}
</style>