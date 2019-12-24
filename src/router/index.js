import Vue from 'vue'
import VueRouter from 'vue-router'
import Filmovi from '../views/Filmovi'
import Film from '../views/Film'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Filmovi',
    component: Filmovi
  },
  {
    path:'/Film/:id',
    name: 'Film',
    component: Film,
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
