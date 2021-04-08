import Vue from 'vue'
import VueRouter from 'vue-router'
// nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 进度条的速度
  showSpinner: false, // 不显示右上角加载图标
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      {
        path: '/category/create',
        component: () => import(/* webpackChunkName: "categoryedit" */ '../views/CategoryEdit.vue')
      },
      {
        path: '/category/list',
        component: () => import(/* webpackChunkName: "categorylist" */ '../views/CategoryList.vue')
      },
      {
        path: '/category/edit/:id',
        component: () => import(/* webpackChunkName: "categoryedit" */ '../views/CategoryEdit.vue'),
        props: true
      },

      {
        path: '/article/create',
        component: () => import(/* webpackChunkName: "articleedit" */ '../views/ArticleEdit.vue')
      },
      {
        path: '/article/list',
        component: () => import(/* webpackChunkName: "articlelist" */ '../views/ArticleList.vue')
      },
      {
        path: '/article/edit/:id',
        component: () => import(/* webpackChunkName: "articleedit" */ '../views/ArticleEdit.vue'),
        props: true
      },

      {
        path: '/admin/create',
        component: () => import(/* webpackChunkName: "adminedit" */ '../views/AdminEdit.vue')
      },
      {
        path: '/admin/list',
        component: () => import(/* webpackChunkName: "adminlist" */ '../views/AdminList.vue')
      },
      {
        path: '/admin/edit/:id',
        component: () => import(/* webpackChunkName: "adminedit" */ '../views/AdminEdit.vue'),
        props: true
      },

      {
        path: '/avatar/create',
        component: () => import(/* webpackChunkName: "avataredit" */ '../views/AvatarEdit.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { ignoreAuth: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    // meta: {ignoreAuth: true}
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  nprogress.start()
  if (!to.meta.ignoreAuth && (!localStorage.token && !sessionStorage.token)) {
    return next('/login')
  }
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
