import Vue from 'vue'
import VueRouter from 'vue-router'
import Filmovi from '../views/Filmovi'
import Film from '../views/Film'
import Home from '../views/Home'
import AddFilm from '../components/AddItemComponents/Film/AddFilm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Filmovi',
    name: 'Filmovi',
    component: Filmovi
  },
  {
    path:'/Film/:id',
    name: 'Film',
    component: Film,
    props: true
  },
  {
    path:'/AddFilm',
    name: 'AddFilm',
    component: AddFilm,
    props: true
  },
  {
    path:'*',
    name: 'Any',
    component: Home
  },
  
]

const router = new VueRouter({
  //base: '/Bioskop/',
  base: '/',
  mode: 'history',
  routes
})

export default router
