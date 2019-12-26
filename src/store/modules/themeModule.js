import vuetify from '../../plugins/vuetify'

const state={
    baseTheme: {
        primary: '#ffc107',
        secondary: '#ff9800',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
      },
    currentTheme: {
        primary: '#ffc107',
        secondary: '#ff9800',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
      }
}

const getters={
    getBaseTheme: state => JSON.parse(JSON.stringify(state.baseTheme)),
    getCurrentTheme: state => JSON.parse(JSON.stringify(state.currentTheme))
}

const actions={
    setCurrentTheme({ commit }, theme){
        //console.log(vuetify)
        vuetify.framework.theme.themes.light = theme
        commit('SET_CURRENT_THEME', theme)
    },
    setCurrentThemeToBase({commit}){
        commit('SET_CURRENT_THEME', state.baseTheme)
        vuetify.framework.theme.themes.light = state.baseTheme
    }
}

const mutations={
    SET_BASE_THEME: (state,theme) => state.baseTheme = theme,
    SET_CURRENT_THEME: (state,theme) => state.currentTheme = theme,
}

export default{
    state,
    getters,
    actions,
    mutations
}