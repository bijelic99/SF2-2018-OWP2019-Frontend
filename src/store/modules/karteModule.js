

const state = {
    karte: []
}

const getters = {

}

const actions = {
    rezervisiKartu: ({commit}, karta) => {
        commit('REZERVISI_KARTU', karta)
    },
    rezervisiKarte: ({commit}, karte) => {
        commit('REZERVISI_KARTE', karte)
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