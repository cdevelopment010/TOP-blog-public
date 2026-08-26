<template>
    <div v-if="showBanner" class="cookie-banner">
        <div class="cookie-banner__content">
            <div>
                <strong>Cookies</strong>
                <p>
                    This site uses optional analytics cookies to help understand how people use the website. 
                    You can accept or reject these cookies. 
                </p>
                <RouterLink to="/cookies">Read the cookie policy</RouterLink>
            </div>
            <div class="cookie-banner__actions">
                <button type="button" class="btn" @click="rejectCookies">Reject</button>
                <button type="button" class="btn btn-danger" @click="acceptCookies">Accept</button>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"; 
import { enableAnalytics } from "../utils/analytics";

type CookieConsent = "accepted" | "rejected"; 

const showBanner = ref<boolean>(false); 
const STORAGE_KEY= 'coffeeshopcoding-cookie-consent'; 


const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted"); 
    debugger;
    enableAnalytics(); 
    showBanner.value = false; 
}

const rejectCookies = () => { 
    localStorage.setItem(STORAGE_KEY, "rejected"); 
    showBanner.value = false; 
}

onMounted(() => {
    const consent = localStorage.getItem(STORAGE_KEY) as CookieConsent | null; 

    if (consent === "accepted") { 
        enableAnalytics(); 
        return;
    }

    if (consent === "rejected") { 
        return;
    }

    showBanner.value = true;
})

</script>

<style scoped>
.cookie-banner { 
    position: fixed; 
    bottom: 0; 
    left:0; 
    width: 100%; 
    padding: 1rem; 
    z-index: 1000;
}

.cookie-banner__content { 
    max-width: 900px; 
    margin: 0 auto; 
    padding: 1rem; 
    background: white; 
    border: 1px solid #ccc; 
    border-radius: 8px; 
    display: flex; 
    gap: 1rem; 
    justify-content: space-between;
    align-items: center;
}

.cookie-banner__content p {
    margin: 0.5rem 0;
}

.cookie-banner__actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
}

@media (max-width: 600px) {
    .cookie-banner__content {
        flex-direction: column;
        align-items: stretch;
    }
}

</style>