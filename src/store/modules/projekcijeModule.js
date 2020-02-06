import axios from 'axios'
import store from '../index'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

const state = {
    projekcije: [],
    zauzetost: new Map(),
    sale: [],
    tipoviProjekcije: [],
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
    getProjekcijeForFilmInFuture: (state) => (filmId) => state.projekcije.filter(p=>!p.prosla).filter(p=>p.film.id === filmId),
    getProjekcijaHasFreeSeats: (state) => (projekcijaId) => {
        var brZauzetih = state.zauzetost.get(projekcijaId).filter(s=> s.zauzeto).length
        return brZauzetih < state.zauzetost.get(projekcijaId).length
    },
    allTipoviProjekcije: (state) => state.tipoviProjekcije,
    allSale: (state) => state.sale,
    getSlobodneSaleForTipProjekcije: (state) => (datumVremePrikazivanja, film, tipProjekcije) => {
        var sale = state.sale.filter(s=>s.podrzaniTipoviProjekcija.filter(tp => tp.id === tipProjekcije.id).length > 0)
        sale = sale.filter(s=>{
            var sadrziId = state.projekcije.filter(p=>{
                
                var pocetak = p.datumVremePrikazivanja
                var kraj = moment(p.datumVremePrikazivanja).add(p.film.trajanje, 's').toDate()
                var interval = moment.range(pocetak, kraj)
                var pocetak1 = datumVremePrikazivanja
                var kraj1 = moment(datumVremePrikazivanja).add(film.trajanje, 's').toDate()
                var interval1 = moment.range(pocetak1, kraj1)
                return interval.overlaps(interval1)
            }).map(p=>p.sala.id).includes(s.id)

            return !sadrziId
        })
        return sale
    }
}

const actions = {
    fetchProjekcije: async function({ commit }){
        await axios.get(`${store.getters.getFullServerAddress}/Projekcija`).then(res=> commit('SET_PROJEKCIJE', res.data.map(p=>{
            p.datumVremePrikazivanja = new Date(p.datumVremePrikazivanja)
            p['prosla'] = () => moment(p.datumVremePrikazivanja).isBefore(new Date(Date.now()))
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

    },
    async fetchSale({commit}){
        await axios.get(`${store.getters.getFullServerAddress}/Sala`).then(res=>commit('SET_SALE', res.data)).catch(err=>console.log(err))
    },
    async fetchTipoviProjekcije({commit}){
        await axios.get(`${store.getters.getFullServerAddress}/TipProjekcije`).then(res=>commit('SET_TIP_PROJEKCIJE', res.data)).catch(err=>console.log(err))
    },
    async addProjekcija({commit}, projekcija){
        return await axios.post(`${store.getters.getFullServerAddress}/Projekcija`, projekcija).then(res=>{
            if(res.data.successful){
            projekcija.id = res.data.id
            commit('ADD_PROJEKCIJA', projekcija)
            return true
        }
            else return false
        }).catch(err=>{
            console.log(err)
            return false
        })
    }
}

const mutations = {
    SET_PROJEKCIJE: (state, projekcije) => state.projekcije = projekcije,
    SET_ZAUZETOST: (state, zauzetost) => state.zauzetost = zauzetost,
    SET_SALE: (state,sale) => state.sale = sale,
    SET_TIP_PROJEKCIJE: (state, tipoviProjekcije) => state.tipoviProjekcije = tipoviProjekcije,
    ADD_PROJEKCIJA: (state, projekcija) => state.projekcije.push(projekcija)
}

export default {
    state,
    getters,
    actions,
    mutations
}