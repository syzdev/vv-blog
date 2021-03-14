import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue') },
      { path: '/article/:id', name: 'article', component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'), props: true},
      { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
