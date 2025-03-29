<template> 
    <div class="d-flex m-b gap-1">
        <img src="https://res.cloudinary.com/dxcrv5gid/image/upload/v1715526765/dj8hooqrszgthdyhwpf0.jpg" alt="" class="border-50" style="background: grey;">
        <div class="d-flex flex-column"> 
            <span><strong>Craig</strong></span>
            <span>{{ createdDate }}</span>
        </div>
        <div class="ms-auto">
            <i class="fa-solid fa-share-nodes fa-2x cursor-pointer" title="Copy link to clipboard" @click="copyUrl"></i>
        </div>
    </div>

    <Toasts />

</template>

<script setup lang="ts">
import { computed } from 'vue';
import Toasts from './Toasts.vue';
import { useToast } from '../utils/useToast';

    //import { ref } from "vue"

    interface Props { 
        createdAt: string
    }

    const { addToast } = useToast(); 

    const props = defineProps<Props>();
    const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric", month: "long", day: "numeric"} 
    const createdDate = computed(() => props.createdAt ? new Intl.DateTimeFormat(navigator.language, dateOptions).format( new Date(props?.createdAt)) : null)

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        addToast({message: "Link copied to clipboard", type: "success", timeout: 2000 })
    }
</script>

<style scoped> 
    img { height: 50px; width: 50px; 
        object-fit: cover; }
    .border-50 { border-radius: 50%; }
</style>