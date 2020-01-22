<template>
  <v-container fluid class="pt-1">
    <!--Pokazuje 5 najnovijih filmova-->
    <v-row><v-col cols="12" class="h-60 py-0"><MovieCarousel class="elevation-2"/></v-col></v-row>
    
    <v-row ><v-col lg="7" md="12">
      <IndexPageProjekcijeTable class="elevation-2"/>
    </v-col>
    <v-col lg="5" md="12" >
      <RandomQuote class="elevation-2"/>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import MovieCarousel from '../components/MovieCarousel'
  import IndexPageProjekcijeTable from '../components/IndexPageProjekcijeTable'
  import RandomQuote from '../components/RandomQuote'
  export default {
    name: 'Home',
    components:{
      MovieCarousel,
      IndexPageProjekcijeTable,
      RandomQuote
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
