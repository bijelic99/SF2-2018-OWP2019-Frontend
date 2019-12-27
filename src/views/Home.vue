<template>
  <v-container fluid class="p-reset h-60">
    <!--Pokazuje 5 najnovijih filmova-->
    <MovieCarousel/>
  </v-container>
</template>

<script>
  import MovieCarousel from '../components/MovieCarousel'
  export default {
    name: 'Home',
    components:{
      MovieCarousel
    }
  }
</script>

<style>
.p-reset{
  padding: 0;
}
.h-60{
  height: 60vh;
}
</style>
