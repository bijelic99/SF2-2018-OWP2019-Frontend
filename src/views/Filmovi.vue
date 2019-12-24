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
      :loading="tableData.doneLoading" loading-text="Loading... Please wait" :search="tableData.search" >
        <template v-slot:item.zanrovi="{ item }">
          <v-chip v-for="zanr in item.zanrovi" v-bind:key="zanr.id">{{zanr.naziv}}</v-chip>
        </template>
        <template v-slot:item.trajanje="{ item }">
          {{(item.trajanje-(item.trajanje%60))/60}} Minuta {{item.trajanje%60}} Sekundi
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
            }
          ]

        },
        
      }
    },
    methods:{
      ...mapActions(['fetchFilmovi'])
    },
    computed: mapGetters(['allFilmovi']),
    async created() {
      await this.fetchFilmovi()
      this.tableData.doneLoading = false

    }

  }
</script>

<style>

</style>
