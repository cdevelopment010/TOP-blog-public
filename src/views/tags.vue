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
import NavComponent from '../components/nav.vue';

const tagList = ref(); 

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