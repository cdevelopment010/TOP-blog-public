<template>
    <i class="fa-regular fa-heart" v-if="!hasLiked" @click="likePost"></i>
    <i class="fa-solid fa-heart" v-if="hasLiked" @click="likePost"></i>
    {{ postLikeCount }}
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from "vue"; 

    interface Props {
        postId : number
    }

    const props = defineProps<Props>(); 

    const likedPosts = ref(JSON.parse(localStorage.getItem("cdc-likedPosts")  || "[]")); 
    const hasLiked = computed(() => likedPosts.value.includes(props.postId)); 
    const postLikeCount = ref(0); 

    async function likePost() {

        //liking post
        if (!hasLiked.value) { 
            likedPosts.value.push(props.postId); 
            postLikeCount.value = postLikeCount.value + 1; 
            await updateLikeCount("add");
        } else { 
            const indexToRemove = likedPosts.value.indexOf(props.postId); 
            if (indexToRemove > -1) { 
                likedPosts.value.splice(indexToRemove, 1); 
                postLikeCount.value = postLikeCount.value - 1; 
                await updateLikeCount("remove");
            }
        }

        localStorage.setItem("csc-likedPosts", JSON.stringify(likedPosts.value));
    }

    async function getPostLikeCount() {
        if (!props.postId) { return }
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/likeCount/${props.postId}`, {
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
                    postLikeCount.value = data.data || 0; 
                    console.log(postLikeCount.value);
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    async function updateLikeCount(type: "add" | "remove") { 
        if (!props.postId) { return }
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/public/publishedPosts/likeCount/${props.postId}`, {
                mode: 'cors',
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({postId: props.postId, type: type})
            }).then(async response => {
                if (!response.ok)
                {  
                    console.log("ERROR: Tags - ",response)
                    return new Error(`Error ${response}`)
                } else { 
                    let data = await response.json(); 
                    postLikeCount.value = data.data || 0; 
                    console.log(postLikeCount.value);
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    onMounted(async () => {
        await getPostLikeCount(); 
    })

</script>