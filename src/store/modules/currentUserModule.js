import axios from 'axios'
import store from '../index'
import VueCookies from 'vue-cookies'

const state = {

    currentUser: { 
        id: 0,
        username: '', 
        password: '', 
        datumRegistracije: new Date(), 
        uloga: 'Gost', 
        obrisan: false },
    isLoggedIn: false
}

const getters = {
    getCurrentUser: state => state.currentUser,
    getCurrentUserUloga: state => state.currentUser.uloga,
    getCurrentUserUsername: state => state.currentUser.username,
    getIsLoggedIn: state => state.isLoggedIn,
    getCurrentUserId: state=> state.currentUser.id
    
}

const actions = {
    setCurrentUser({commit}, user){
        commit('SET_CURRENT_USER', user)
    },
    async login({commit}, data){
        var korisnik = await axios.post(`${store.getters.getFullServerAddress}/Login`, data, {withCredentials: true}).then(res => res.data.successful?res.data.user : false).catch(() => false)
        if(korisnik !== false){
            VueCookies.set('korisnik', korisnik, '2d', [store.getters.getFrontendFullAdress, `${store.getters.getServerAddress}:${store.getters.serverPort}`])
            commit('SET_CURRENT_USER', korisnik)
            commit('SET_LOGGEDIN', true)
            return true
        }
        else return false
    },
    logout({commit}){
        VueCookies.remove('korisnik')
        axios.get(`${store.getters.getFullServerAddress}/Logout`)
        commit('SET_CURRENT_USER', {uloga:'Neprijavljen'})
        commit('SET_LOGGEDIN', false)
    },
    fetchLoggedInUser({commit}){
        if(VueCookies.isKey('korisnik')){
            var korisnik = VueCookies.get('korisnik')
            commit('SET_CURRENT_USER', korisnik)
            commit('SET_LOGGEDIN', true)
        }
    }
}

const mutations = {
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_LOGGEDIN: (state, logged) => state.isLoggedIn = logged
}

export default {
    state,
    getters,
    actions,
    mutations
}