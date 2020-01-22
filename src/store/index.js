import Vue from 'vue'
import Vuex from 'vuex'
import filmoviModule from './modules/filmoviModule'
import themeModule from './modules/themeModule'
import serverGlobalsModule from './modules/serverGlobalsModule'
import currentUserModule from './modules/currentUserModule'
import usersModule from './modules/usersModule'
import projekcijeModule from './modules/projekcijeModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    filmoviModule, themeModule, serverGlobalsModule, currentUserModule, usersModule, projekcijeModule
  }
})
