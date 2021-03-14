import Vue from 'vue'
import App from './App.vue'
import router from './router'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

// mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
