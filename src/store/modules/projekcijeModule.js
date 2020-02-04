import axios from 'axios'
import store from '../index'
import moment from 'moment'

const state = {
    projekcije: [],
    zauzetost: new Map(),
}

const getters = {
    allProjekcije: (state) => state.projekcije,
    getZauzetost: (state) => state.zauzetost,
    getZauzetostForProjekcija: (state) => (projekcijaId) => state.zauzetost.get(projekcijaId),
    
    getFilmHasFreeProjekcijeInFuture: (state) => (filmId) => store.getters.getProjekcijeForFilmInFuture(filmId).map(p=>{
        
        p = {...p, zauzetost: state.zauzetost.get(p.id) ? state.zauzetost.get(p.id) : []}
        return p
    }).filter(p=>{
        return p.zauzetost.filter(z=>!z.zauzeto).length > 0}).length > 0,

    getDanasnjeProjekcijeSortedAsPerSpecification: (state) => state.projekcije
                                                                .filter(p=>moment(p.datumVremePrikazivanja).isBetween(moment().startOf('day'), moment().endOf('day')))
                                                                .sort((p1, p2)=>p1.film.naziv.localeCompare(p2.film.naziv) === 0 
                                                                ? (moment(p1.datumVremePrikazivanja).isBefore(p2.datumVremePrikazivanja) 
                                                                    ? -1 : moment(p1.datumVremePrikazivanja).isAfter(p2.datumVremePrikazivanja) 
                                                                    ? 1 : 0) 
                                                                : p1.film.naziv.localeCompare(p2.film.naziv) ),
    getProjekcija: (state) => async (id) => {
        var filtered = state.projekcije.filter(p => p.id === id)
        if(filtered.length === 0) return await axios.get(`${store.getters.getFullServerAddress}/Projekcija?id=${id}`).then(res=> {
            var p = res.data
            p.datumVremePrikazivanja = new Date(p.datumVremePrikazivanja)
            p['prosla'] = moment(p.datumVremePrikazivanja).isBefore(Date.now())
            return p
        }).catch(res=>{
            console.log(res)
            return null
        })
        else return filtered[0]

    },
    getFilmHasProjekcijaInFuture: (state) => (filmId) => state.projekcije.filter(p=>!p.prosla).filter(p=>p.film.id === filmId).length > 0,
    getProjekcijeForFilmInFuture: (state) => (filmId) => state.projekcije.filter(p=>!p.prosla).filter(p=>p.film.id === filmId)
}

const actions = {
    fetchProjekcije: async function({ commit }){
        await axios.get(`${store.getters.getFullServerAddress}/Projekcija`).then(res=> commit('SET_PROJEKCIJE', res.data.map(p=>{
            p.datumVremePrikazivanja = new Date(p.datumVremePrikazivanja)
            p['prosla'] = moment(p.datumVremePrikazivanja).isBefore(Date.now())
            return p
        }))).catch(err=> console.log(err))
    },
    fetchZauzetost: async function({commit}){
        var zauzetostProjekcija = new Map()
        await store.getters.allProjekcije.forEach(async p=>{
            await axios.get(`${store.getters.getFullServerAddress}/ZauzetaSedistaZaProjekciju?projekcijaId=${p.id}`).then(res=>{
                zauzetostProjekcija.set(p.id, res.data)
            }).catch(err=>{
                console.log(err)
                zauzetostProjekcija.set(p.id, null)
              })
        })
        commit('SET_ZAUZETOST', zauzetostProjekcija)

    }
}

const mutations = {
    SET_PROJEKCIJE: (state, projekcije) => state.projekcije = projekcije,
    SET_ZAUZETOST: (state, zauzetost) => state.zauzetost = zauzetost,
}

export default {
    state,
    getters,
    actions,
    mutations
}