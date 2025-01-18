<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />

        </div>
        <div class="container-body d-grid-80-20">
            <!-- posts -->
            <section class="recent-posts">
                <template v-for="(post, index) in postList">
                    <PostCard :post="post" :class="{'grid-full-row': index == 0 }"/>
                </template>
                <a href="/posts">See more posts...</a>
            </section>
            <!-- sidebar -->
            <aside>
                Some sidebar content here...
            </aside>
        </div>
    </div>  
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue"; 
    import NavComponent from '../components/nav.vue'
    import PostCard from "../components/postCard.vue";

    const postList = ref(); 

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

    onMounted(async() => {
        await getAllRecentPublishedPosts(5);
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