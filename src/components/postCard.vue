<template>
    <RouterLink :to="`/post/${props.post.slugCombined}`">
        <div class="card">
            <div class="card-header"><h3>{{ props.post.title }}</h3></div>
            <!-- <div class="card-body">
                
            </div> -->
            <div class="card-tags d-flex gap-1">
                <template v-for="tag in tags">
                    <RouterLink :to="`/posts/publishedPosts/tags/${tag}`" class="pill">{{ tag }}</RouterLink>
                </template>
            </div>


        </div>
    </RouterLink>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    const tags = ref<string[]>([
        'JS', 
        'CSS'
    ])
    const props = defineProps<{ post: any }>(); 
    //console.log(props.post.exerpt)

</script>

<style scoped> 
.card { 
    padding: 1rem; 
    margin-bottom: 1rem;
    border: 1px solid var(--text-200); 
    border-radius: 12px;
}


.card:hover { 
    box-shadow: 0px 3px 20px 0 var(--text-200);
    border-color:var(--text-200) ;
    transform: translateY(-1px);
}
.card-header { 
    color: var(--text-800)
}
</style>