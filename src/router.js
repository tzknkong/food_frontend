import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
    path: '/',
    name: 'home',
    meta: {
      title: 'Recipes | Home'
    },
    component: () => import('./pages/home/Index')
  }, {
    path: '/sign',
    name: 'sign',
    meta: {
      title: 'Recipes | Sign'
    },
    component: () => import('./pages/sign/Index')
  },  {
    path: '/list',
    name: 'list',
    meta: {
      title: 'Recipes | List'
    },
    component: () => import('./pages/list/Index')
  },  {
    path: '/create',
    name: 'create',
    meta: {
      title: 'Recipes | Create'
    },
    component: () => import('./pages/create/Index')
  },{
    path: '/user',
    name: 'user',
    meta: {
      title: 'Recipes | User'
    },
    component: () => import('./pages/user/Index')
  },{
    path: '/collection',
    name: 'collection',
    meta: {
      title: 'Recipes | Collection'
    },
    component: () => import('./pages/collection/Index')
  },{
    path: '/comment',
    name: 'comment',
    meta: {
      title: 'Recipes | Comment'
    },
    component: () => import('./pages/comment/Index')
  },{
    path: '/myfood',
    name: 'myfood',
    meta: {
      title: 'Recipes | My food'
    },
    component: () => import('./pages/myfood/Index')
  }, {
    path: '/details',
    name: 'details',
    meta: {
      title: 'Recipes | Details'
    },
    component: () => import('./pages/details/Index')
  }]
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})




export default router