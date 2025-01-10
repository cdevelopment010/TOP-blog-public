<template>
    <RouterLink :to="`/post/${props.post.slugCombined}`" class="link-none">
        <div class="card">
            <div class="card-header"><h3>{{ props.post.title }}</h3></div>
            <!-- <div class="card-body">
                
            </div> -->
            <div class="card-tags d-flex gap-1">
                <template v-for="tag in tags">
                    <RouterLink :to="`/tags/${tag}`" class="btn btn-secondary link-none">{{ tag }}</RouterLink>
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
    border: 1px solid var(--text-1); 
    background: var(--background-1);
    border-radius: 12px;
}


.card:hover { 
    box-shadow: 0px 3px 20px 0 var(--text-1);
    border-color:var(--text-1) ;
    transform: translateY(-1px);
}
.card-header { 
    color: var(--text-1)
}
</style>