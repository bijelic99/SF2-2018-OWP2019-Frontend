import axios from 'axios'

const state={
    filmovi: []
}

const getters={
    allFilmovi: state => state.filmovi,
    filteredFilmovi: state => filterFunction => {
        return state.filmovi.filter(filterFunction)
    },
    getFilm: state=> id => state.filmovi.filter(film => film.id === id)[0]
}

const actions={
    async fetchFilmovi({commit}){
        
        let response = await axios.get('http://localhost:8081/Bioskop/Filmovi').then(res=>res).catch(res=>console.log(res))
        //console.log(response.data)
        commit('setFilmovi', response.data)
    }
}

const mutations={
    setFilmovi: (state,filmovi) => (state.filmovi = filmovi)
}

export default{
    state,
    getters,
    actions,
    mutations
}