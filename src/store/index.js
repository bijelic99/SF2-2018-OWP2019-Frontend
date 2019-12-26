import Vue from 'vue'
import Vuex from 'vuex'
import filmoviModule from './modules/filmoviModule'
import themeModule from './modules/themeModule'
import serverGlobalsModule from './modules/serverGlobalsModule'
import currentUserModule from './modules/currentUserModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    filmoviModule, themeModule, serverGlobalsModule, currentUserModule
  }
})
