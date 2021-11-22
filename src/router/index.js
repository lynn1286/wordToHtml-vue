import { createRouter, createWebHashHistory } from 'vue-router'
import wordToHtml from '../views/wordToHtml.vue'

const routes = [
    {
        path: '/',
        name: 'wordToHtml',
        component: wordToHtml
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
