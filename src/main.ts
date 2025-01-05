import { createApp } from 'vue'
import './colors.css';
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createHead } from '@unhead/vue'

const head = createHead(); 
createApp(App).use(head).use(router).mount('#app')
