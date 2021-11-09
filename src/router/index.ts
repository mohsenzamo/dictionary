import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    alias: ['/home', '/index', '/hom'],
    component: () => import('../views/Home.vue')
  },
  {
    path: '/list/:title/:id',
    name: 'List',
    props: true,
    component: () => import('../views/List.vue')
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    props: true,
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/homelarge',
    name: 'HomeLarge',
    component: () => import('../views/HomeLarge.vue')
  },
  {
    path: '/listlarge/:title/:id',
    name: 'ListLarge',
    props: true,
    component: () => import('../views/ListLarge.vue')
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
