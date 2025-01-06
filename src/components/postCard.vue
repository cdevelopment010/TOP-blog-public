<template>
    <RouterLink :to="`/post/${props.post.slug}`">
        <div class="card">
            <div class="card-header">{{ props.post.title }}</div>
            <!-- <div class="card-body">
                
            </div> -->
        </div>
    </RouterLink>
</template>

<script setup lang="ts">

    const props = defineProps<{ post: any }>(); 
    //console.log(props.post.exerpt)

</script>

<style scoped> 
.card { 
    padding: 1rem; 
    margin-bottom: 1rem;
    border: 1px solid var(--text-800); 
    border-radius: 5px;
}


.card:hover { 
    box-shadow: 4px 4px 4px 0 var(--text-600);
    border-color:var(--text-600) ;
}
.card-header { 
    color: var(--text-800)
}
</style>