<template>
    <v-container fluid class="fill-height p-reset mt-4" >
        <v-carousel class="fill-height" hide-delimiters height="100%">
            <v-carousel-item v-for="film in get5NewestFilms" :key="film.id" :src="film.pathDoSlike" :link="true" :to="`/Film/${film.id}`" contain  lazy-src="../../public/film-poster-placeholder.png" />
        </v-carousel>
    </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'MovieCarousel',
    computed: {
      ...mapGetters(['get5NewestFilms']),
    },
    methods:{

    }
  }
</script>

<style>
.carouselFilmNameGrid{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-content: flex-end;
    justify-content: flex-start;
    
}
</style>