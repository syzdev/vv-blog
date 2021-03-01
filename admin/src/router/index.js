import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "categoryedit" */ '../views/CategoryEdit.vue')
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "categorylist" */ '../views/CategoryList.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "categoryedit" */ '../views/CategoryEdit.vue'),
        props: true
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
