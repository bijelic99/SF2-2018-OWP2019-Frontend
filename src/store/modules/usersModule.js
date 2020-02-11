import axios from 'axios'
import store from '../index'

const state = {
    users: []
}
const getters = {
    getAllUsers: state => state.users,
    getUser: state => id => state.users.filter(u=> u.id === id)[0],
    getIfUserIdInUsers: state=> id => state.users.filter(u=> u.id === id).length > 0  
}
const actions = {
    async fetchUsers({ commit }) {
        return await axios.get(`${store.getters.getFullServerAddress}/Korisnik`).then(res => {
            commit('SET_USERS', res.data.map(k=>{
                k.datumRegistracije = new Date(k.datumRegistracije)
                return k
            }))
            return true
        }).catch(() => {
             //console.log(err)
             commit('SET_USERS', [])
             return false
        })
    },
    async updateUser({commit}, user) {
        return await axios.put(`${store.getters.getFullServerAddress}/Korisnik`, user).then(res=>{
            if(res.data.successful){
                commit('UPDATE_USER', user)
                return true
            }
            else return false
        }).catch(() => {
            //console.log(err)
            return false
        })
    },
    async deleteUser({commit}, userId){
        return await axios.delete(`${store.getters.getFullServerAddress}/Korisnik?id=${userId}`).then(res=>{
            if(res.data.successful){
                commit('DELETE_USER', userId)
                return true
            }
            else return false
        }).catch(() => {
            //console.log(err)
            return false
        })
    }
}
const mutations = {
    SET_USERS: (state, users) => state.users = users,
    UPDATE_USER: (state, user) => {
        var index = state.users.findIndex(u => u.id === user.id)
        state.users[index] = user
    },
    DELETE_USER: (state, userId) => state.users = state.users.filter(u => u.id !== userId)
}

export default {
    state,
    getters,
    actions,
    mutations
}