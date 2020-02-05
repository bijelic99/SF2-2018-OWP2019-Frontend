<template>
  <v-container>
    <v-row>
      <h1 class="ml-2 title">{{tipAkcije}} filma:</h1>
    </v-row>
    <v-row>
      <v-form class="col-md-12" v-model="formData.formValid" ref="filmForm">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field label="Naziv" v-model="film.naziv" :rules="formData.rules.nazivRules" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-combobox
                label="Zanrovi"
                v-model="film.zanrovi"
                multiple
                chips
                deletable-chips
                :delimiters="[',']"
                hide-selected
                :items="zanrovi"
                auto-select-first
                :search-input.sync="formData.zanroviSearchInput"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-combobox
                label="Reziser"
                v-model="film.reziser"
                chips
                deletable-chips
                :items="filmskiRadnici"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-combobox
                label="Glumci"
                v-model="film.glumci"
                multiple
                chips
                deletable-chips
                :delimiters="[',']"
                hide-selected
                :items="filmskiRadnici"
                auto-select-first
                :search-input.sync="formData.glumciSearchInput"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Trajanje"
                v-model="film.trajanje"
                :rules="formData.rules.trajanjeRules"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Distributer"
                v-model="film.distributer"
                :rules="formData.rules.distributerRules"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Zemlja porekla"
                v-model="film.zemljaPorekla"
                :rules="formData.rules.zemljaPoreklaRules"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Godina proizvodnje"
                v-model="film.godinaProizvodnje"
                :rules="formData.rules.godinaProizvodnjeRules"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Link do slike" v-model="film.pathDoSlike" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="Opis" v-model="film.opis" />
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col class="col-lg-2 col-md-12">
              <v-btn
                class="secondary"
                width="100%"
                :disabled="!formData.formValid"
                @click="formSubmit()"
              >{{tipAkcije}}</v-btn>
            </v-col>
          </v-row>
          <v-snackbar v-model="snackbars.successVisible" :timeout="snackbars.timeout">{{tipAkcije === "Izmena" ? "Uspesna Izmena" : "Uspesno Dodavanje"}} <v-btn
        color="secondary"
        text
        @click="snackbars.successVisible = false"
      >
        Close
      </v-btn></v-snackbar>
      <v-snackbar v-model="snackbars.failureVisible" :timeout="snackbars.timeout">{{tipAkcije === "Izmena" ? "Neuspesna izmena" : "Neuspesno dodavanje"}} <v-btn
        color="secondary"
        text
        @click="snackbars.failureVisible = false"
      >
        Close
      </v-btn></v-snackbar>
        </v-container>
      </v-form>
    </v-row>
    
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import axios from "axios";
  export default {
    name: "AddFilm",
    props: {
      filmId: {
        type: Number,
        required: false
      }
    },
    data: () => {
      return {
        tipAkcije: "",
        film: {
          id: 0,
          naziv: "",
          zanrovi: [],
          reziser: "",
          glumci: [],
          trajanje: 0,
          distributer: "",
          zemljaPorekla: "",
          godinaProizvodnje: 0,
          opis: "",
          obrisan: false,
          pathDoSlike: ""
        },
        zanrovi: [],
        filmskiRadnici: [],
        formData: {
          formValid: false,
          zanroviSearchInput: null,
          glumciSearchInput: null,
          rulePresets: {
            required: value => (value + "" === "" ? "Obavezno Polje" : true),
            mustBeNumber: value =>
              /^\d*$/.test(value) ? true : "Mora biti ne negativan broj",
            notZero: value =>
              parseInt(value) !== 0 ? true : "Mora biti vece od 0"
          },
          rules: {
            nazivRules: [value => (value + "" === "" ? "Obavezno Polje" : true)],
            trajanjeRules: [
              value => (value + "" === "" ? "Obavezno Polje" : true),
              value =>
                /^\d*$/.test(value) ? true : "Mora biti ne negativan broj",
              value => (parseInt(value) !== 0 ? true : "Mora biti vece od 0")
            ],
            distributerRules: [
              value => (value + "" === "" ? "Obavezno Polje" : true)
            ],
            zemljaPoreklaRules: [
              value => (value + "" === "" ? "Obavezno Polje" : true)
            ],
            godinaProizvodnjeRules: [
              value => (value + "" === "" ? "Obavezno Polje" : true),
              value =>
                /^\d*$/.test(value) ? true : "Mora biti ne negativan broj",
              value => (parseInt(value) !== 0 ? true : "Mora biti vece od 0")
            ]
          }
        },
        snackbars: {
          timeout: 4000,
          successVisible: false, 
          failureVisible: false 
        }
      };
    },
    methods: {
      ...mapActions(["addFilm", "editFilm"]),
      setFilm: function() {
        if (this.tipAkcije === "Izmena") {
          this.film = JSON.parse(JSON.stringify(this.getFilm(this.filmId)));
          this.film.zanrovi = this.film.zanrovi.map(this.itemForCb);
          this.film.reziser = this.itemForCb(this.film.reziser);
          this.film.glumci = this.film.glumci.map(this.itemForCb);
        }
      },
      itemForCb: function(i) {
        var obj = new Object();
        obj.text = i.naziv;
        obj.value = i;
        return obj;
      },
      setTipAkcije: function() {
        if (this.filmId !== undefined) {
          this.tipAkcije = "Izmena";
        } else this.tipAkcije = "Dodavanje";
      },
      getZanrovi: async function() {
        this.zanrovi = await axios
          .get(`${this.getFullServerAddress}/Zanrovi`)
          .then(res => res.data.map(this.itemForCb))
          .catch(() => []);
      //console.log(this.zanrovi)
      },
      getFilmskiRadnici: async function() {
        this.filmskiRadnici = await axios
          .get(`${this.getFullServerAddress}/FilmskiRadnici`)
          .then(res => res.data.map(this.itemForCb))
          .catch(() => []);
      },
      formSubmit: function() {
        
        var newFilm = JSON.parse(JSON.stringify(this.film))
        if (newFilm.reziser !== null) {
          if (typeof newFilm.reziser === "string"){
            var reziser = new Object()
            reziser.id = 0
            reziser.naziv = newFilm.reziser
            newFilm.reziser = reziser
          }
          else newFilm.reziser = newFilm.reziser.value;
        } else newFilm.reziser = null
        newFilm.zanrovi = newFilm.zanrovi.map(z => {
          if (typeof z === "string") {
            var zanr = new Object()
            zanr.id = 0
            zanr.naziv = z
            return zanr;
          } else return z.value;
        })
        newFilm.glumci = newFilm.glumci.map(g => {
          if (typeof g === "string") {
            var glumac = new Object()
            glumac.id = 0
            glumac.naziv = g
            return glumac;
          } else return g.value;
        })
        if(this.tipAkcije === "Izmena") {
          if(!this.editFilm(newFilm)) {
            this.snackbars.failureVisible = true
          }
          else{
            this.snackbars.successVisible = true
          }
        }
        else if(this.tipAkcije === "Dodavanje") {
          if(!this.addFilm(newFilm)) {
            this.snackbars.failureVisible = true
          }
          else {
            this.snackbars.successVisible = true
            this.$refs.filmForm.reset()} }
      }
    },
    computed: {
      ...mapGetters(["getFilm", "getFullServerAddress"])
    },
    watch: {
      filmId: function() {
        this.setTipAkcije();
        this.setFilm();
      },
      "film.zanrovi": function() {
        this.formData.zanroviSearchInput = null;
      },
      "film.glumci": function() {
        this.formData.glumciSearchInput = null;
      }
    },
    mounted: function() {
      this.setTipAkcije();
      this.getZanrovi();
      this.getFilmskiRadnici();
      this.setFilm();
    }
  };
</script>

<style>
</style>