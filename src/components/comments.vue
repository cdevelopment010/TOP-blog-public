<template>
    <h3>Comments</h3>
    <div v-if="comments?.length == 0">
        <strong>There are no comments. :( </strong>
    </div>
    <div v-for="c in comments" :key="c?.id">
        {{ c?.comment }}
    </div>
    <CreateComment :post-id="postId" @create-comment="createComment"/>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"; 
import CreateComment from "./createComment.vue";

interface Comment { 
    id?: number, 
    comment: string, 
    postId: number, 
    createdAt: Date
}

// const newComment = ref<Comment | null>(null); 
const comments = ref<(Comment | null)[]>([])
const props = defineProps<{postId: number }>()

watch(props, async () => {
    await getPostComments()
})

const getPostComments = async () => {
    if (typeof props.postId == 'undefined') {return}
    // await fetch(`http://localhost:3000/post/${props.postId}/Comments/`, {
    await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/${props.postId}/Comments/`, {
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
                    comments.value = data.data[0]; 
                    // content.value = JSON.parse(post.value.content); 
                    // console.log(content.value);
                }
            }).catch( err => {
                console.error(err); 
            })
}

async function createComment(newComment: Comment) { 
    console.log(newComment)
}

onMounted(async () => {
    await getPostComments(); 
})

</script>