<template>
    <div class="container">
        <div class="container-nav">
            <NavComponent />
        </div>


        <div class="container-body w-80ch">
            <h1>Feedback</h1>

            <p>
                Use the form below for an issues or suggestions. Otherwise, you can create an issue directly on <a href="https://github.com/cdevelopment010/TOP-blog-public/issues" target="_blank">GitHub</a> if you would like to add images and follow the issues. 
                You can also use the link to see if an issue has already been registered!  
            </p>

            <p><i>Please don't add any personal information such as email / phone as issues are publicly visible on Github</i></p>


            <div v-if="successUrl">
                <p>Issue successfully created <a :href="successUrl" target="_blank">view issue here</a>.</p>
            </div>

            <div v-if="error" class="text-danger fw-bold mb-3">
                {{error}}
            </div>
            
            <form ref="formRef" class="form" @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label for="title">Title*</label>
                    <input id="title" name="title" required v-model="title" />
                </div>

                <div class="form-row">
                    <label for="issue-label">Label</label>
                    <select id="issue-label" name="issue-label" v-model="label" required>
                        <option value="">--Select--</option>
                        <option value="Bug">Bug</option>
                        <option value="Enhancement">Feature Request</option>
                        <option value="Content Idea">Content Suggestion</option>
                    </select>
                </div>

                <div class="form-row">
                    <label for="body">Description</label>
                    <textarea id="body" name="body" v-model="body"></textarea>
                </div>                

                <button class="btn" :disabled="submitting">Submit</button>
            </form>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import NavComponent from '../components/nav.vue';
    import { useHead } from '@unhead/vue';

    const formRef = ref<HTMLFormElement | null>(null);
    const title = ref<string>(); 
    const label = ref<string>(); 
    const body = ref<string>(); 
    const error = ref<string>(""); 
    const successUrl = ref<string>(""); 
    const submitting = ref<boolean>(false);

    const formValidation = () : boolean => {
        if (!title.value?.trim() || title.value?.length > 100) {
            console.error("Must provide a title and can't exceed 100 characters");
            error.value = "Must provide a title and can't exceed 100 characters";
            submitting.value = false;
            return false;
        } 
        
        // if (!body.value?.trim() || body.value?.length > 2000) {
        //     console.error("Must provide a title and can't exceed 100 characters");
        //     error.value = "Must provide a title and can't exceed 100 characters";
        //     submitting.value = false;
        //     return;
        // } 

        if (!label.value) {
            console.error("Must select a label");
            error.value = "Must select a label";
            submitting.value = false;
            return false;
        }

        error.value = ""; // clear error if all is good
        return true;
    }

    const handleSubmit = async () => {
        successUrl.value = ""; 
        submitting.value = true; 

        ; 
        if (!formValidation()) {
            submitting.value = false;
            //throw some error toast
            return;
        }

        try { 
            const response = await fetch("https://top-blog-api-proud-thunder-6960.fly.dev/feedback", {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    title: title.value, 
                    body: body.value, 
                    labels: [label.value]
                })
            })

            const data = await response.json();

            if (!response.ok) {
               throw new Error(data.message || "Failed to submit feedback.");
            }

            successUrl.value = data.issueUrl;
            if (formRef.value){
                //on success
                formRef.value.reset(); // reset all the values in the form;
            }

            //reset values
            title.value = ""; 
            body.value = ""; 
            label.value = ""; 
            
        } catch (err: any) {
            error.value = err.message || "Something went wrong.";
        } finally { 
            submitting.value = false; 
        }

        
    }

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