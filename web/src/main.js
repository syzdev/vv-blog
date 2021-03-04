import Vue from 'vue'
import App from './App.vue'
import router from './router'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
