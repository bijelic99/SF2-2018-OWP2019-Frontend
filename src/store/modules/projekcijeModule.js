import axios from 'axios'
import store from '../index'
import moment from 'moment'

const state = {
    projekcije: []
}

const getters = {
    allProjekcije: (state) => state.projekcije,
    getDanasnjeProjekcijeSortedAsPerSpecification: (state) => state.projekcije
                                                                .filter(p=>moment(p.datumVremePrikazivanja).isBetween(moment().startOf('day'), moment().endOf('day')))
                                                                .sort((p1, p2)=>p1.film.naziv.localeCompare(p2.film.naziv) === 0 
                                                                ? (moment(p1.datumVremePrikazivanja).isBefore(p2.datumVremePrikazivanja) 
                                                                    ? -1 : moment(p1.datumVremePrikazivanja).isAfter(p2.datumVremePrikazivanja) 
                                                                    ? 1 : 0) 
                                                                : p1.film.naziv.localeCompare(p2.film.naziv) )
}

const actions = {
    fetchProjekcije: async function({ commit }){
        await axios.get(`${store.getters.getFullServerAddress}/Projekcija`).then(res=> commit('SET_PROJEKCIJE', res.data.map(p=>{
            p.datumVremePrikazivanja = new Date(p.datumVremePrikazivanja)
            return p
        }))).catch(err=> console.log(err))
    }
}

const mutations = {
    SET_PROJEKCIJE: (state, projekcije) => state.projekcije = projekcije
}

export default {
    state,
    getters,
    actions,
    mutations
}