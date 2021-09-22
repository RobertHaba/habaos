import { createRouter, createWebHistory } from 'vue-router';


  const routes = [
  {
    path: '/system',
    name: 'system',
    props:true,
    component: () => import('../pages/System.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Register.vue')
  }
]
const router = new createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next) => {
    if (sessionStorage.getItem('authenticated') != 'true') {
        if (to.name == 'register' || to.name == 'login') {
            next()
        } else next({name:'login'})
    }
    else if(sessionStorage.getItem('authenticated') == 'true' && to.name == 'system'){
      next()
    }
    else if(sessionStorage.getItem('authenticated') == 'true' && to.name !== 'system'){
      next({name:'system'})
    }
})
export default router;
