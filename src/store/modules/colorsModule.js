
const state={
    backgroundColor: 'primary',
    textColor: '#ffffff'
}

const getters={
    getBackgroundColor: state => state.backgroundColor,
    getTextColor: state => state.textColor
}

const actions={
    setBackgroundColor({commit}, color){
        commit('SET_BACKGROUND_COLOR', color)
    },
    setTextColor({commit}, color){
        commit('SET_TEXT_COLOR', color)
    }
}

const mutations={
    SET_BACKGROUND_COLOR: (state,color) => state.backgroundColor = color,
    SET_TEXT_COLOR: (state,color) => state.textColor = color
}

export default{
    state,
    getters,
    actions,
    mutations
}