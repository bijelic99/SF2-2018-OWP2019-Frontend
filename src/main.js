import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AsyncComputed from 'vue-async-computed'
import VueCookies from 'vue-cookies'

Vue.use(AsyncComputed)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
