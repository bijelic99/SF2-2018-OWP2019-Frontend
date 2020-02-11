import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AsyncComputed from 'vue-async-computed'
import VueCookies from 'vue-cookies'
import axios from 'axios'


axios.defaults.withCredentials = true
axios.interceptors.response.use(
  function (response) {
    try {
      if (response.headers.logoutonarrival && store.getters.getIsLoggedIn) {
        store.dispatch('logout')
        router.push('/')
      }
    }
    catch{
      //console.log(response)
    }
    return response;
  }, function (error) {

    try {
      if (error.headers.logoutonarrival) {
        store.dispatch('logout')
        router.push('/')
      }
    }
    catch{
      //console.log(error)
    }

    return Promise.reject(error);
  }
)

axios.interceptors.request.use(function (config) {
  if(config.withCredentials && store.getters.getIsLoggedIn){
    config.headers['logged-in'] = 'true'
    //isto tako sto ovde pise samo username i sifra mogu da zamenim sa hashom te dve vr i da poredim sa hashom tih vr na serveru i tako sakrijem od svih ostalih 
    var cu = store.getters.getCurrentUser
    config.headers['logged-in-user'] = `${cu.username}|${cu.password}`
  }
  else if(config.withCredentials) config.headers['logged-in'] = 'false'
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

Vue.use(AsyncComputed)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
