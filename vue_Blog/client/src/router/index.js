import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
let user = JSON.parse(localStorage.getItem("user")) || null
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home1',
    component: Home
  },
  {
    path: '/post/:postId',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: import(/* webpackChunkName: "about" */ '../views/Single.vue')
  },
  {
    path: '/write',
    name: 'write',
    component: () => import('../views/Write.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  user = JSON.parse(localStorage.getItem("user"))
  if (!user && (to.name === 'settings' || to.name === 'write')) {
    next({ name: 'login' })
  }
  next()
})

export default router
