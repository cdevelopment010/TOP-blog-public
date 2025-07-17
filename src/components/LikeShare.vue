<template>
    <i class="fa-regular fa-heart" v-if="!hasLiked" @click="likePost"></i>
    <i class="fa-solid fa-heart" v-if="hasLiked" @click="likePost"></i>
    {{ postLikeCount }}

    <Toasts />
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted } from "vue"; 
    import Toasts from "./Toasts.vue";
    import { useToast } from "../utils/useToast";

    interface Props {
        postId : number
    }

    const { addToast } = useToast(); 
    const props = defineProps<Props>(); 

    const likedPosts = ref(JSON.parse(localStorage.getItem("csc-likedPosts")  || "[]")); 
    likedPosts.value = likedPosts.value.map((id :any) => Number(id))
    const hasLiked = computed(() => likedPosts.value.includes(props.postId)); 
    const postLikeCount = ref(0); 

    async function likePost() {
        if (!props.postId) { return }
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
                    postLikeCount.value = data.data.numberOfLikes || 0; 
                    if (type == "add") { 
                        addToast({ title: 'Woohoo!', message: 'You liked the post!', type: 'success', timeout: 1500})
                    }

                    if (type == "remove") { 
                        addToast({ title: 'Oh no!', message: 'You unliked the post! :( ', type: 'danger', timeout: 1500})

                    }
                }
            }).catch( err => {
                console.error(err); 
            })
    }

    watch(() => props.postId, async (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
            await getPostLikeCount();
        }
    });

    onMounted(async () => {
        if (props.postId) {
            await getPostLikeCount()
        }
    })

</script>