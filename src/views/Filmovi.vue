<template>
  <v-container>
    <v-card>
      <v-card-title>
        Filmovi
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
          <span>Za pretragu trajanja po minutima u opsegu: [pocetak-kraj], za pretragu godina proizvodnje u opsegu: {pocetak-kraj}</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        :headers="tableData.zaglavljaTabele"
        :items="allFilmovi"
        :items-per-page="20"
        :loading="tableData.doneLoading"
        loading-text="Loading... Please wait"
        :search="tableData.search"
        :custom-filter="customFilterFunction"
      >
        <template v-slot:item.zanrovi="{ item }">
          <v-chip v-for="zanr in item.zanrovi" v-bind:key="zanr.id">{{zanr.naziv}}</v-chip>
        </template>
        <template
          v-slot:item.trajanje="{ item }"
        >{{(item.trajanje-(item.trajanje%60))/60}} min. {{item.trajanje%60}} sek.</template>
        <template v-slot:item.detaljnije="{item}">
          <router-link :to="`/Film/${item.id}`">Detaljnije</router-link>
        </template>
      </v-data-table>
    </v-card>
    <AddFilmDialog/>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import AddFilmDialog from '../components/AddItemComponents/Film/AddFilmDialog'
  export default {
    name: "Filmovi",
    components:{
      AddFilmDialog
    },
    data: () => {
      return {
        tableData: {
          doneLoading: false,
          search: "",
          zaglavljaTabele: [
            {
              text: "Naziv",
              value: "naziv"
            },
            {
              text: "Zanrovi",
              value: "zanrovi"
            },
            {
              text: "Trajanje",
              value: "trajanje"
            },
            {
              text: "Distributer",
              value: "distributer"
            },
            {
              text: "Zemlja Porekla",
              value: "zemljaPorekla"
            },
            {
              text: "Godina Proizvodnje",
              value: "godinaProizvodnje"
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
      ...mapActions(["fetchFilmovi"]),
      customFilterFunction: function(value, search, item) {
        let string = `${item.naziv} ${item.zanrovi.reduce(
          (zanroviStr, value) => zanroviStr + " " + value.naziv,
          ""
        )} ${item.trajanje} ${item.distributer} ${item.zemljaPorekla} ${
          item.godinaProizvodnje
        }`.toUpperCase();
        var searchArray = search.split(" ");
        return searchArray.reduce((val, currVal) => {
          if (/^{\d*-\d*}$/.test(currVal)) {
            currVal = currVal.match(/\d+/g).map(val => parseInt(val));
            if (currVal[0] < currVal[1])
              return (
                item.godinaProizvodnje >= currVal[0] &&
                item.godinaProizvodnje <= currVal[1] &&
                val
              );
            else return false;
          } else if (/^\[\d*-\d*\]$/.test(currVal)) {
            currVal = currVal.match(/\d+/g).map(val => parseInt(val));
            if (currVal[0] < currVal[1])
              return (
                item.trajanje / 60 >= currVal[0] &&
                item.trajanje / 60 <= currVal[1] &&
                val
              );
            else return false;
          } else {
            return string.includes(currVal.toUpperCase()) && val;}
        }, true);
      }
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
    computed: mapGetters(["allFilmovi"]),
    async created() {
      await this.fetchFilmovi();
      this.tableData.doneLoading = false;
    }
  };
</script>

<style>
</style>
