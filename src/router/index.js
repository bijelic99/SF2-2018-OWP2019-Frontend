import Vue from 'vue'
import VueRouter from 'vue-router'
import Filmovi from '../views/Filmovi'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Filmovi',
    component: Filmovi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
