import axios from 'axios'
import store from '../index'

const state = {
    //samo trenutno popunjeno sa static data
    filmovi: [
        /*{
            id: 20,
            naziv: "Ant-Man and the Wasp",
            zanrovi: [{ "id": 4, "naziv": "Komedija" }],
            reziser: { "id": 1, "naziv": "Jun Erickson" },
            glumci: [{ "id": 5, "naziv": "Susan Wilkes" }, { "id": 11, "naziv": "Lennon Francis" }, { "id": 29, "naziv": "Oskar Kirby" }, { "id": 33, "naziv": "Ifan Rosas" }],
            trajanje: 7461,
            distributer: "Dejan Productions",
            zemljaPorekla: "Pakistan",
            godinaProizvodnje: 1988,
            opis: "The quiet, Cornish town of London holds a secret.\n\nCuthbert Pitt has the perfect life working as a housekeeper in the city and laughing with his sweet boyfriend, Tony Sparrow.\n\nHowever, when he finds a warped blade in his cellar, he begins to realise that things are not quite as they seem in the Pitt family.\n\nAn engagement party leaves Cuthbert with some startling questions about his past, and he sets off to sunny London to find some answers.\n\nAt first the people of London are gracious and popular. He is intrigued by the curiously helpful housekeeper, Phil Bogtrotter. However, after he introduces him to hard sugar, Cuthbert slowly finds himself drawn into a web of adultery, adultery and perhaps, even violence.\n\nCan Cuthbert resist the charms of Phil Bogtrotter and uncover the secret of the warped blade before it's too late, or will his demise become yet another London legend?",
            obrisan: false,
            pathDoSlike: "https://images-na.ssl-images-amazon.com/images/I/911Gc+MRR1L._RI_.jpg"
        },
        {
            id:4,
            naziv:"Iron Man 2",
            zanrovi:[{"id":1,"naziv":"Deciji"}],
            reziser:{"id":4,"naziv":"Letitia Dean"},
            glumci:[{"id":9,"naziv":"Kira Fox"},{"id":56,"naziv":"Kamil Ahmad"},{"id":62,"naziv":"Reece Salazar"},{"id":66,"naziv":"Saffron Pratt"}],
            trajanje:10259,
            distributer:"Dejan Productions",
            zemljaPorekla:"Greece",
            godinaProizvodnje:1945,
            opis:"The quiet, Cornish town of London holds a secret.\n\nCuthbert Pitt has the perfect life working as a housekeeper in the city and laughing with his sweet boyfriend, Tony Sparrow.\n\nHowever, when he finds a warped blade in his cellar, he begins to realise that things are not quite as they seem in the Pitt family.\n\nAn engagement party leaves Cuthbert with some startling questions about his past, and he sets off to sunny London to find some answers.\n\nAt first the people of London are gracious and popular. He is intrigued by the curiously helpful housekeeper, Phil Bogtrotter. However, after he introduces him to hard sugar, Cuthbert slowly finds himself drawn into a web of adultery, adultery and perhaps, even violence.\n\nCan Cuthbert resist the charms of Phil Bogtrotter and uncover the secret of the warped blade before it's too late, or will his demise become yet another London legend?",
            obrisan:false,
            pathDoSlike:"http://3.bp.blogspot.com/_nD_YgZuOadA/TImT2bkSbAI/AAAAAAAAAPs/CNbDBIZzGfw/s1600/robert-downey-jr-wallpapers_18919_1280x800.jpg"
        },
        {
            id:10,
            naziv:"Guardians of the Galaxy",
            zanrovi:[{"id":4,"naziv":"Komedija"}],
            reziser:{"id":8,"naziv":"Eathan Beach"},
            glumci:[{"id":26,"naziv":"Lee Doyle"},{"id":34,"naziv":"Cali Gibson"},{"id":49,"naziv":"Marisa Steadman"},{"id":55,"naziv":"Brenda Dowling"},{"id":60,"naziv":"Rumaisa Jenkins"},{"id":63,"naziv":"Nyah Peralta"},{"id":69,"naziv":"Payton Vaughan"}],
            trajanje:9221,
            distributer:"Dejan Productions",
            zemljaPorekla:"Pakistan",
            godinaProizvodnje:1945,
            opis:"The quiet, Cornish town of London holds a secret.\n\nCuthbert Pitt has the perfect life working as a housekeeper in the city and laughing with his sweet boyfriend, Tony Sparrow.\n\nHowever, when he finds a warped blade in his cellar, he begins to realise that things are not quite as they seem in the Pitt family.\n\nAn engagement party leaves Cuthbert with some startling questions about his past, and he sets off to sunny London to find some answers.\n\nAt first the people of London are gracious and popular. He is intrigued by the curiously helpful housekeeper, Phil Bogtrotter. However, after he introduces him to hard sugar, Cuthbert slowly finds himself drawn into a web of adultery, adultery and perhaps, even violence.\n\nCan Cuthbert resist the charms of Phil Bogtrotter and uncover the secret of the warped blade before it's too late, or will his demise become yet another London legend?",
            obrisan:false,
            pathDoSlike:"https://images-na.ssl-images-amazon.com/images/I/81b45f09rWL._SL1500_.jpg"
        }*/

    ]
}

const getters = {
    allFilmovi: state => state.filmovi,
    filteredFilmovi: state => filterFunction => {
        return state.filmovi.filter(filterFunction)
    },
    getFilm: state => id => state.filmovi.filter(film => film.id === id)[0],
    get5NewestFilms: state => state.filmovi.sort((f1, f2) => (f1.id < f2.id ? -1 : f1.id > f2.id ? 1 : 0)).slice(-5)
}

const actions = {
    async fetchFilmovi({ commit }) {
        await axios.get(`${store.getters.getFullServerAddress}/Filmovi`).then(res => commit('SET_FILMS', res.data)).catch(res => console.log(res))

    },
    async addFilm({ commit }, film) {
        return await axios.post(`${store.getters.getFullServerAddress}/Film`, film).then(res => {
            if (res.data.successful) {
                film.id = res.data.id
                commit('ADD_FILM', film)
                return true
            }
            else return false
        }).catch(err => {
            console.log(err)
            return false
        })

    },
    async editFilm({commit}, film){
        return await axios.put(`${store.getters.getFullServerAddress}/Film`, film).then(res=>{
            if(res.successful) {
                commit('UPDATE_FILM', film)
                
            }
            return res.successful
        }).catch(err=> {
            console.log(err)
            return false
        })
    },
    async deleteFilm({ commit }, filmId){
        if (await axios.delete(`${store.getters.getFullServerAddress}/Film?id=${filmId}`).then(res=> res.data.successful).catch((err)=>{
            console.log(err)
            return false
        })) {
            commit('DELETE_FILM', filmId)
            return true
        } else return false
    }
}

const mutations = {
    SET_FILMS: (state, filmovi) => (state.filmovi = filmovi),
    ADD_FILM: (state, film) => state.filmovi.push(film),
    DELETE_FILM: (state, filmId) => state.filmovi = state.filmovi.filter(f=>f.id !== filmId),
    UPDATE_FILM: (state, film) => {
        var index = state.filmovi.findIndex(f=> f.id === film.id)
        state.filmovi[index] = film
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}