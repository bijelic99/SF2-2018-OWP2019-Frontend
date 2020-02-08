import axios from "axios"
import store from '../index'


const state = {
    karte: []
}

const getters = {
    getKarteForProjekcija: state => projekcijaId => state.karte.filter(k=>k.projekcija.id === projekcijaId),
    getKarteForKorisnik: state => korisnikId => state.karte.filter(k=>k.korisnik.id === korisnikId),
    getKarte: state => state.karte,
    getKartaById: state => kartaId => state.karte.filter(k=>k.id === kartaId)[0]
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
        
    },
    async fetchKarte({ commit }){
        return await axios.get(`${store.getters.getFullServerAddress}/Karta`).then(res=>{
            commit('SET_KARTE', res.data)
            return true
        }).catch(err=>{
            console.log(err)
            return false
        })
    },
}

const mutations = {
   REZERVISI_KARTU: (state, karta) => state.karte.append(karta),
   REZERVISI_KARTE: (state, karte) => state.karte = [...state.karte, ...karte],
   SET_KARTE: (state, karte) => state.karte = karte
}

export default {
    state,
    getters,
    actions,
    mutations
}