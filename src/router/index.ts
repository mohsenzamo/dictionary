import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    alias:['/home','/index','/hom'],
    component: () => import('../views/Home.vue')
  },
  {
    path: '/list',
    name: 'List',
    alias:['/ist','/lst','/lis'],
    component: () => import('../views/List.vue')
  },
  {
    path:'/index',
    redirect:'/'
  },
  {
    path:'/index.html',
    redirect:'/'
  },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
