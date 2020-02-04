import axios from "axios"
import store from '../index'


const state = {
    karte: []
}

const getters = {

}

const actions = {
    rezervisiKartu: ({commit}, karta) => {
        commit('REZERVISI_KARTU', karta)
    },
    rezervisiKarte: async ({commit}, karte) => {
        return await axios.post(`${store.getters.getFullServerAddress}/Karta`, karte).then(res=>{
            commit('REZERVISI_KARTE', res.data.karte)
            return true
        }).catch(err=> {
            console.log(err)
            return false    
        })
        
    }
}

const mutations = {
   REZERVISI_KARTU: (state, karta) => state.karte.append(karta),
   REZERVISI_KARTE: (state, karte) => state.karte = [...state.karte, ...karte]
}

export default {
    state,
    getters,
    actions,
    mutations
}