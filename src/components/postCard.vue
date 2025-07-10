<template>
    <RouterLink :to="`/post/${props.post.slug}`" class="link-none">
        <div class="card">
            <div class="card-header"><h3>{{ props.post.title}}</h3></div> <!-- change back to title once working again in admin site-->
            <div class="card-body mb-4">
                <div v-html="excerpt"></div>
            </div>
            <div class="card-tags d-flex gap-1">
                <template v-for="tag in tags">
                    <RouterLink :to="`/tags/${tag.id}`" class="btn btn-secondary link-none">{{ tag.name }}</RouterLink>
                </template>
            </div>


        </div>
    </RouterLink>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from "vue";
    // Need to get tags related to post
    const tags = ref<{name: string, id: number}[]>([])
    const props = defineProps<{ post: any }>(); 

    const excerpt = computed(() => {
        
        const paragraphBlock = JSON.parse(props.post.content).find((p :any) => p.type === 'paragraph'); 
        if (!paragraphBlock || !paragraphBlock.content) {return ""; }
        const rawText = paragraphBlock.content  
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g," ")

        return rawText.split(" ").slice(0,20).join(" ") + "...";

    })

    const getTagsByPost = async (postId :number) => {
        await fetch(`https://top-blog-api-proud-thunder-6960.fly.dev/post/${postId}/tags`, {
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
                    tags.value = data.data.tags; 
                }
            }).catch( err => {
                console.error(err); 
            })
    }


    watch(
        () => props.post.id, 
        async () => {
            await getTagsByPost(props.post.id)
        }, 
        {immediate: true}
    )
    

</script>

<style scoped> 
.card { 
    padding: 1rem; 
    margin-bottom: 1rem;
    border: 1px solid var(--text-1); 
    background: var(--background-2);
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