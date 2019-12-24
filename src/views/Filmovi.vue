<template>
  <div><v-card>
    <v-card-title>
      Filmovi
      <v-spacer></v-spacer>
      <v-text-field
        v-model="tableData.search"
        append-icon="md-search"
        label="Pretraga"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="tableData.zaglavljaTabele" :items="allFilmovi" :items-per-page="20"
      :loading="tableData.doneLoading" loading-text="Loading... Please wait" :search="tableData.search" :custom-filter="customFilterFunction" >
        <template v-slot:item.zanrovi="{ item }">
          <v-chip v-for="zanr in item.zanrovi" v-bind:key="zanr.id">{{zanr.naziv}}</v-chip>
        </template>
        <template v-slot:item.trajanje="{ item }">
          {{(item.trajanje-(item.trajanje%60))/60}} min. {{item.trajanje%60}} sek.
        </template>
        <template v-slot:item.detaljnije="{item}">
          <router-link :to="`/Film/${item.id}`">Detaljnije</router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Filmovi',
    data: () => {
      return {
        tableData: {
          doneLoading: false,
          search: '',
          zaglavljaTabele: [
            {
              text: 'Naziv',
              value: 'naziv'
            },
            {
              text: 'Zanrovi',
              value: 'zanrovi'
            },
            {
              text: 'Trajanje',
              value: 'trajanje'
            },
            {
              text: 'Detaljnije',
              value: 'detaljnije',
              sortable: false,
            }
          ]

        },
        
      }
    },
    methods:{
      ...mapActions(['fetchFilmovi']),
      customFilterFunction: function(value, search, item) {
        let string = `${item.naziv} ${ item.zanrovi.reduce((zanroviStr, value)=> zanroviStr+" "+value.naziv, '') } ${item.trajanje}`.toUpperCase()
        
        return string.includes(search.toUpperCase())
      },
      /*customSortFunction: function(items, sortBy, sortDesc){
        console.log(sortBy)
        console.log(sortDesc)
        if(sortBy === 'zanrovi') {
          var compareFunction = (first, second) => {
            var s1 = `${ first.zanrovi.reduce((zanroviStr, value)=> zanroviStr+" "+value.naziv, '') }`
            var s2 = `${ second.zanrovi.reduce((zanroviStr, value)=> zanroviStr+" "+value.naziv, '') }`
            console.log(s1 > s2 ? -1 : s1 === s2 ? 0 : 1)
            return s1 > s2 ? -1 : s1 < s2 ? 1 : 0
          }
          return sortDesc === true ? items.sort(compareFunction).reverse() : items.sort(compareFunction)
        }
        return items
      }*/
    },
    computed: mapGetters(['allFilmovi']),
    async created() {
      await this.fetchFilmovi()
      this.tableData.doneLoading = false

    },
    

  }
</script>

<style>

</style>
