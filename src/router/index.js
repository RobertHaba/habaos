import { createRouter, createWebHistory } from 'vue-router';


  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/System.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  }
]

const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router;
