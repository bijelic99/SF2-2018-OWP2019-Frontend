import Vue from 'vue'
import Vuex from 'vuex'
import filmoviModule from './modules/filmoviModule'
import colorsModule from './modules/colorsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    filmoviModule, colorsModule
  }
})
