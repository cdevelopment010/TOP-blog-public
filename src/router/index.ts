import { createRouter, createWebHistory } from "vue-router";
import underDevelopment from "../views/underDevelopment.vue";
import home from "../views/home.vue";
import posts from "../views/posts.vue";
import post from "../views/post.vue";
// import postBySlug from "../views/postBySlug.vue";
import postsByTags from "../views/postsByTags.vue";
import tags from "../views/tags.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes: [
        {path: '/', name: 'underdevelopment', meta: {index: false}, component: underDevelopment},
        {path: '/admin', name: 'home', meta: {index: true}, component: home},
        {path: '/posts', name: 'posts', meta: {index: false}, component: posts},
        {path: '/tags', name: 'tags', meta: {index: false}, component: tags},
        {path: '/tags/:tagId', name: 'tags-posts', meta: {index: false}, component: postsByTags},
        {path: '/post/:slug', name: 'post', meta: {index: false}, component: post},
    ]
}); 


export default router; 