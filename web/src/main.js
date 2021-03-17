import Vue from 'vue'
import App from './App.vue'
import router from './router'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import './plugins/element.js'

// 时间格式过滤
import dayjs from 'dayjs'
Vue.filter('timeFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
