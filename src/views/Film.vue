<template>
  <div :style="{backgroundColor: componentData.backgroundColor, color: componentData.textColor}" class="h-100">
    <v-img
      ref="coverImage"
      lazy-src="../../public/film-poster-placeholder.png"
      :src="film.pathDoSlike"
      position="center top"
      aspect-ratio="4"
    />
    sadadsdasads
    <v-snackbar v-model="componentData.errorSnackbarVisible">
      {{ componentData.errorMassage }}
      <v-btn color="error" text @click="componentData.errorSnackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Vibrant from 'node-vibrant'
  import vuetify from '../plugins/vuetify'
  export default {
    name: "Film",
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
        }
      };
    },
    computed: mapGetters(["getFilm", "allFilmovi"]),
    methods: {
      ...mapActions(['fetchFilmovi', 'setBackgroundColor', 'setTextColor']),
      filmLoad: async function() {
        if ((await this.allFilmovi.length) === 0) await this.fetchFilmovi();
        if (/^\d+$/.test(this.id)){
          this.film = await this.getFilm(parseInt(this.id, 10));
          await this.setColors()
        }
        else {
          this.componentData.errorMassage =
            "Id nije pravilno unet, nije moguce prikazati film";
          this.componentData.errorSnackbarVisible = true;
          
        }
      },
      setColors: async function() {
        try {
          var palette = await Vibrant.from(this.film.pathDoSlike).getPalette().then(r=>r)
          //console.log(palette)
          this.componentData.backgroundColor = palette.Vibrant.hex
          this.componentData.textColor = palette.Vibrant.bodyTextColor
          this.setBackgroundColor(this.componentData.backgroundColor)
          this.setTextColor(this.componentData.textColor)
          vuetify.framework.theme.currentTheme.primary = this.componentData.backgroundColor
          vuetify.framework.theme.currentTheme.secondary = palette.LightVibrant.hex
        } catch (error) {
          console.error(error)
        }
        
        //console.log(vuetify)
      }
    },
    watch: {
      id: async function() {
        this.filmLoad();
      }
    },
    async mounted() {
      this.filmLoad();
    }
  };
</script>

<style>
.h-100{
  height: 100%;
}
</style>