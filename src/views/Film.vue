<template>
  <v-container fluid
    :style="{backgroundColor: componentData.backgroundColor, color: componentData.textColor}"
    class="fill-height px-0 pt-0"
  ><v-row class="mx-0">
    <v-img
      ref="coverImage"
      lazy-src="../../public/film-poster-placeholder.png"
      :src="film.pathDoSlike"
      position="center center"
      :aspect-ratio="$vuetify.breakpoint.mdAndUp ? '3.2' : '1'"
      :contain="true"
      
    />
    </v-row>
    <v-row class="mx-1">
    <v-container>
      <v-row>
        <v-col cols="md-8">
          <h1 class="filmTitle">{{film.naziv}}</h1>
        </v-col>
        <v-col cols="md-4" align-self="end" align="end">
          <RezervacijaKarteDialog :enabled="getIsLoggedIn && getCurrentUserUloga === 'Obican' && getFilmHasFreeProjekcijeInFuture(film.id)" :btnText="'Kupi kartu'" :film="film"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-15">
          <p>{{film.opis}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Zanrovi:</v-col>
        <v-col cols="md-10">
          <v-chip color="secondary" v-for="zanr in film.zanrovi" :key="zanr.id">{{zanr.naziv}}</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Reziser:</v-col>
        <v-col cols="md-10">
          <p>{{film.reziser != null ? film.reziser.naziv : ''}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Glumci:</v-col>
        <v-col cols="md-10">
          <p>
            <span
              v-for="glumac in film.glumci"
              :key="glumac.id"
            >{{`${glumac.id !== film.glumci[0].id ? ', ' : ''}${glumac.naziv}`}}</span>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Trajanje:</v-col>
        <v-col cols="md-10">
          <p>{{(film.trajanje-(film.trajanje%60))/60}} min. {{film.trajanje%60}} sek.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Distributer:</v-col>
        <v-col cols="md-10">
          <p>{{film.distributer}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Zemlja porekla:</v-col>
        <v-col cols="md-10">
          <p>{{film.zemljaPorekla}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Godina proizvodnje:</v-col>
        <v-col cols="md-10">
          <p>{{film.godinaProizvodnje}}</p>
        </v-col>
      </v-row>
    </v-container>
    </v-row>
    <v-snackbar v-model="componentData.errorSnackbarVisible">
      {{ componentData.errorMassage }}
      <v-btn color="error" text @click="componentData.errorSnackbarVisible = false">Close</v-btn>
    </v-snackbar>
    <v-speed-dial v-model="speedDialData.speedDialOpen" direction="top" :right="true" :bottom="true" :open-on-hover="false" :left="false" :top="false" fixed>
      <template v-slot:activator>
        <v-btn v-model="speedDialData.speedDialOpen" color="secondary" bottom right fab>
          <v-icon v-if="speedDialData.speedDialOpen">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <EditFilmDialog :filmId="film.id"/>
      <DeleteFilm :film="film"/>
    </v-speed-dial>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Vibrant from "node-vibrant";
  import EditFilmDialog from '../components/AddItemComponents/Film/EditFilmDialog'
  import DeleteFilm from '../components/DeleteItemComponents/DeleteFilm'
  import axios from 'axios'
  import RezervacijaKarteDialog from '../components/AddItemComponents/Karta/RezervacijaKarteDialog'
  export default {
    name: "Film",
    components:{
      EditFilmDialog,
      DeleteFilm,
      RezervacijaKarteDialog
    },
    props: {
      id: String
    },
    data: () => {
      return {
        film: {},
        componentData: {
          errorMassage: "",
          errorSnackbarVisible: false,
          backgroundColor: "#ffffff",
          textColor: "#000000"
        },
        speedDialData: {
          speedDialOpen: false
        }
      };
    },
    computed: mapGetters([
      "getFilm",
      "allFilmovi",
      "getCurrentTheme",
      "getBaseTheme", 'getFilmIdAvailableInFilmovi', 'getFullServerAddress',
      'getIsLoggedIn', 'getCurrentUserUloga', 'getFilmHasFreeProjekcijeInFuture'
    ]),
    methods: {
      ...mapActions(["fetchFilmovi", "setCurrentTheme", "setCurrentThemeToBase"]),
      filmLoad: async function() {
        if ((await this.allFilmovi.length) === 0) await this.fetchFilmovi();
        if (/^\d+$/.test(this.id)) {
          if(this.getFilmIdAvailableInFilmovi(Number.parseInt(this.id)))
          {
            this.film = await this.getFilm(parseInt(this.id, 10));
            await this.setColors();
          }
          else{
            console.log(`${this.getFullServerAddress}/Film?id=${this.id}`)
            axios.get(`${this.getFullServerAddress}/Film?id=${this.id}`).then(res => this.film = res.data).catch((err)=>{
              console.log(err)
              this.componentData.errorMassage =
                "Id nije pravilno unet, ili film ne postoji";
              this.componentData.errorSnackbarVisible = true;
            })
          }
        } else {
          this.componentData.errorMassage =
            "Id nije pravilno unet, nije moguce prikazati film";
          this.componentData.errorSnackbarVisible = true;
        }
      },
      setColors: async function() {
        try {
          var palette = await Vibrant.from(this.film.pathDoSlike)
            .getPalette()
            .then(r => r);
          //console.log(palette)
          this.componentData.backgroundColor = palette.DarkVibrant.hex;
          this.componentData.textColor = palette.DarkVibrant.bodyTextColor;
          //console.log(palette)
          var theme = this.getCurrentTheme;
          theme.primary = palette.DarkVibrant.hex;
          theme.secondary = palette.Muted.hex;
          //console.log(theme.primary + " " + theme.secondary)
          this.setCurrentTheme(theme);
        } catch {
          this.setCurrentThemeToBase();
          this.componentData.backgroundColor = "#fff";
          this.componentData.textColor = "#000";
        }
      }
    },
    watch: {
      id: async function() {
        await this.filmLoad();
        
      }
    },
    async mounted() {
      await this.filmLoad();
      //console.log(JSON.stringify(this.film))
    }
  };
</script>

<style>
.filmTitle {
  font-size: 1.6em;
}


</style>