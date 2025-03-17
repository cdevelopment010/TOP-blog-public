<template>
    <h3>Comments</h3>
    <div v-if="comments?.length == 0">
        <strong>There are no comments. :( </strong>
    </div>
    <div v-for="c in comments" :key="c?.id">
        <div class="comment-container" v-if="c?.id">
            <div class="comment-header d-flex justify-between">
                <span><strong>Anon</strong></span>
                <span>{{new Date(c.createdAt).toLocaleDateString()}}</span>
            </div>
            <div class="comment-comment">
                {{ c.comment }}
            </div>
        </div>
    </div>
    <CreateComment :post-id="postId" @create-comment="createComment"/>
    <Toasts /> 

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"; 
import CreateComment from "./createComment.vue";
import { useToast } from "../utils/useToast";
import Toasts from "./Toasts.vue";

interface Comment { 
    id?: number, 
    comment: string, 
    postId: number, 
    createdAt: Date
}

const { addToast } = useToast(); 

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
                    comments.value = data.data; 
                    // content.value = JSON.parse(post.value.content); 
                    // console.log("comments:",comments.value);
                }
            }).catch( err => {
                console.error(err); 
            })
}

async function createComment(newComment: Comment) { 
    if (!newComment) {
        return; 
    }
    await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/${props.postId}/Comments/`, {
                mode: 'cors',
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({newComment: newComment})
            }).then(async response => {
                if (!response.ok)
                {  
                    console.log("ERROR: Tags - ",response)
                    return new Error(`Error ${response}`)
                } else { 
                    let data = await response.json(); 
                    comments.value = data.data[0]; 
                    addToast({ title: 'Success', message: 'Comment was created!', type: 'success', timeout: 3000})
                    await getPostComments(); 
                }
            }).catch( err => {
                console.error(err); 
            })
}

onMounted(async () => {
    await getPostComments(); 
})

</script>

<style scoped>

.comment-container { 
    min-width: 200px; 
    width: 100%; 
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--text-2);
    padding-bottom: 0.5rem;
}

.comment-header { 
    margin-bottom: 0.5rem;
}
</style>