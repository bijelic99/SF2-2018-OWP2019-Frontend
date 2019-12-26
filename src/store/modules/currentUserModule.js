const state = {

    currentUser: { 
        id: 0,
        username: '', 
        password: '', 
        datumRegistracije: new Date(), 
        uloga: 'Gost', 
        obrisan: false }
}

const getters = {
    getCurrentUser: state => state.currentUser,
    getCurrentUserUloga: state => state.currentUser.uloga,
    
}

const actions = {
    setCurrentUser({commit}, user){
        commit('SET_CURRENT_USER', user)
    },
    async login({commit}, username, password){
        //treba implementovati
        console.log(commit, username, password)
        return true
    }
}

const mutations = {
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
}

export default {
    state,
    getters,
    actions,
    mutations
}