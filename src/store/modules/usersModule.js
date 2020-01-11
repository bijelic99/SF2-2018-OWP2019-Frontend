import axios from 'axios'
import store from '../index'

const state = {
    users: []
}
const getters = {
    getAllUsers: state => state.users,
    getUser: state => id => state.users.filter(u=> u.id === id)[0]  
}
const actions = {
    async fetchUsers({ commit }) {
        return await axios.get(`${store.getters.getFullServerAddress}/Korisnik`).then(res => {
            commit('SET_USERS', res.data.map(k=>{
                k.datumRegistracije = new Date(k.datumRegistracije)
                return k
            }))
            return true
        }).catch(err => {
             console.log(err)
             commit('SET_USERS', [])
             return false
        })
    },
    async updateUser({commit}, user) {
        // dodati i put zahtev na backend kad se za to steknu uslovi
        commit('UPDATE_USER', user)
        return true
    }
}
const mutations = {
    SET_USERS: (state, users) => state.users = users,
    UPDATE_USER: (state, user) => {
        var index = state.users.findIndex(u => u.id === user.id)
        state.users[index] = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}