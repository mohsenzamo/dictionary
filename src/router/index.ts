import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    alias: ['/home', '/index', '/hom'],
    component: () => import('../views/Home.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/list/:id',
    name: 'List',
    component: () => import('../views/List.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/index.html',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
