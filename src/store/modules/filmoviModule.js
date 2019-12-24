import axios from 'axios'

const state={
    filmovi: [
        {
            id: 0,
            naziv: 'test',
            zanrovi: [
                {
                    id: 0,
                    naziv: 'testZanr'
                },
                {
                    id: 1,
                    naziv: 'testZanr'
                }
            ],
            reziser: {
                id: 0,
                naziv: 'testZanr'
            },
            glumci: [
                {
                    id: 0,
                    naziv: 'testZanr'
                }
            ],
            trajanje: 55,
            distributer: "TestDistributer",
            zemljaPorekla: "TestZemljaPorekla",
            godinaProizvodnje: 2019,
            opis: "opis",
            obrisan: false
        }
    ]
}

const getters={
    allFilmovi: state => state.filmovi,
    filteredFilmovi: state => filterFunction => {
        return state.filmovi.filter(filterFunction)
    }
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