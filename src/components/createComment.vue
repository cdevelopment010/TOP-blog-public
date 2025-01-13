<template>
    <div class="d-flex">
        <textarea v-model="newComment.comment" placeholder="Comment..."></textarea>
        <button @click="createComment" class="btn">Add Comment</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"; 
interface Comment { 
    id?: number, 
    comment: string, 
    postId: number, 
    createdAt: Date
}

const props = defineProps<{postId : number}>(); 
const emit = defineEmits<{
    (event: 'createComment', newComment : Comment) : void
}>(); 
watch(props, () => {
    newComment.value.postId = props.postId;
})

const newComment = ref<Comment>({
    comment: '', 
    createdAt: new Date(), 
    postId: props.postId
}); 


function createComment() { 
    newComment.value.createdAt = new Date();     
    emit('createComment', {...newComment.value});
    newComment.value.comment = '';
}

</script>