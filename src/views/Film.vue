<template>
  <div>
      {{id}}
      {{film.naziv}}
  </div>
</template>

<script>
  import { mapActions ,mapGetters } from 'vuex'
  export default {
    name: 'Film',
    props:{
      id: String
    },
    data: () => {
      return {
        film: {

        }
      }
    },
    computed: mapGetters(['getFilm', 'allFilmovi']),
    methods:{
      ...mapActions(['fetchFilmovi']),
    },
    watch:{
      id: async function() {
        if(await this.allFilmovi.length === 0) await this.fetchFilmovi()
        this.film = this.getFilm(parseInt(this.id,10))
      }
    },
    async mounted(){
      if(await this.allFilmovi.length === 0) await this.fetchFilmovi()
      this.film = this.getFilm(parseInt(this.id,10))
    }
  }
</script>

<style>

</style>