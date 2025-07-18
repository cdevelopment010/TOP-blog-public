<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>


        <div class="container-body w-80ch">
            <h1>Feedback</h1>

            <p>
                Use the form below for an issues or suggestions. Otherwise, you can create an issue directly on <a href="https://github.com/cdevelopment010/TOP-blog-public/issues" target="_blank">GitHub</a> if you would like to add images and follow the issues. 
            </p>

            <p><i>Please don't add any personal information such as email / phone as issues are publicly visible on Github</i></p>


            <form class="form">
                <div class="form-row">
                    <label for="title">Title</label>
                    <input id="title" name="title" required :value="title" />
                </div>

                <div class="form-row">
                    <label for="body">Description</label>
                    <textarea id="body" name="body" required :value="body"></textarea>
                </div>                

                <button class="btn">Submit</button>
            </form>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import NavComponent from '../components/nav.vue';
    import { useHead } from '@unhead/vue';

    const title = ref<string>(); 
    const body = ref<string>(); 

    onMounted(() => {
        useHead({
            title: 'Feedback', 
            meta: [
                { name: 'description', content: 'Feedback form for coffeeshopcoding. Use to create bugs, feature requests and content suggestions.' },
                { name: 'robots', content: 'noindex' }
            ]
        })
    })

</script>

<style scoped>

.form { 
    display: grid; 
    gap: 1rem;
    border-radius: 5px; 
    border: 1px solid #123;
    background: var(--background-2);
    padding: 1rem;
}

.form-row {
    display: flex; 
    flex-direction: column;
    gap: 0.2rem;
}

textarea {
    resize: vertical;
}

</style>