<template>
  <v-container>
      <v-card>
      <v-card-title>
        Projekcije
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="tableData.search"
              append-icon="md-search"
              label="Pretraga"
              single-line
              hide-details
              v-on="on"
            ></v-text-field>
          </template>
          <span>Placeholder tooltip</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        :headers="tableData.zaglavljaTabele"
        :items="allProjekcije"
        :items-per-page="20"
        :search="tableData.search"
        :custom-filter="customFilterFunction"
      >
        <template
          v-slot:item.film="{ item }"
        >
            <router-link :to="`/Film/${item.film.id}`">{{item.film.naziv}}</router-link> 
        </template>
        <template
          v-slot:item.datumVremePrikazivanja="{ item }"
        >{{item.datumVremePrikazivanja.toLocaleString()}}</template>
        <template
          v-slot:item.tipProjekcije="{ item }"
        >{{item.tipProjekcije.naziv}}</template>
        <template
          v-slot:item.sala="{ item }"
        >{{item.sala.naziv}}</template>
        <template
          v-slot:item.cenaKarte="{ item }"
        >{{item.cenaKarte}}</template>
        <template
          v-slot:item.prosla="{ item }"
        >{{item.prosla ? 'Da' : 'Ne' }}</template>
        <template v-slot:item.detaljnije="{item}">
          <router-link :to="`/Projekcija/${item.id}`">Detaljnije</router-link>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Projekcije',
    data: () => {
      return {
        tableData: {
          search: "",
          zaglavljaTabele: [
            {
              text: "Film",
              value: "film"
            },
            {
              text: "Datum i Vreme Prikazivanja",
              value: "datumVremePrikazivanja"
            },
            {
              text: "Tip projekcije",
              value: "tipProjekcije"
            },
            {
              text: "Sala",
              value: "sala"
            },
            {
              text: "Cena Karte",
              value: "cenaKarte"
            },
            {
              text: "Projekcija prosla",
              value: "prosla"
            },
            {
              text: "Detaljnije",
              value: "detaljnije",
              sortable: false
            }
          ]
        }
      };
    },
    methods: {
      ...mapActions(['fetchProjekcije']),
      customFilterFunction: function(value, search, item) {
        console.log(value, search, item)
        return true
      }
    
    },
    computed:{
      ...mapGetters(['allProjekcije'])
    },
    mounted(){
      if(this.allProjekcije.length === 0 ) this.fetchProjekcije()
    }
  }
</script>

<style>

</style>