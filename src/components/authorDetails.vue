<template> 
    <div class="d-flex m-b gap-1">
        <img src="https://res.cloudinary.com/dxcrv5gid/image/upload/v1715526765/dj8hooqrszgthdyhwpf0.jpg" alt="" class="border-50" style="background: grey;">
        <div class="d-flex flex-column"> 
            <span><strong>Craig</strong></span>
            <span>{{ createdDate }}</span>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';

    //import { ref } from "vue"

    interface Props { 
        createdAt: string
    }

    const props = defineProps<Props>();
    const dateOptions = {year: "numeric", month: "long", day: "numeric"} 
    const createdDate = computed(() => props.createdAt ? new Intl.DateTimeFormat(navigator.language, dateOptions).format( new Date(props?.createdAt)) : null)
</script>

<style scoped> 
    img { height: 50px; width: 50px; 
        object-fit: cover; }
    .border-50 { border-radius: 50%; }
</style>