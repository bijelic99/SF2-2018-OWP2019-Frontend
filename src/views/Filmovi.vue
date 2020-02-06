<template>
  <v-container>
    <v-row>
      <v-col class="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
        <v-form v-model="searchData.formValid">
        <v-card>
          <v-card-title>
            Pretraga:
          </v-card-title>
          <v-list-item>
              <v-text-field label="Naziv" v-model="searchData.naziv"/>
          </v-list-item>
          <v-list-item>
              <v-text-field label="Zanr" v-model="searchData.zanr"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Trajanje" suffix="sec" v-model="searchData.trajanje"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Trajanje od" suffix="min" v-model="searchData.trajanjeOd"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Trajanje do" suffix="min" v-model="searchData.trajanjeDo"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field label="Distributer" v-model="searchData.distributer"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field label="Zemlja porekla" v-model="searchData.zemljaPorekla"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Godina proizvodnje" v-model="searchData.godinaProizvodnje"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Godina proizvodnje od" v-model="searchData.godinaProizvodnjeOd"></v-text-field>
          </v-list-item>
          <v-list-item>
              <v-text-field :rules="numericOnlyRule" label="Godina proizvodnje do" v-model="searchData.godinaProizvodnjeDo"></v-text-field>
          </v-list-item>
        </v-card>
        </v-form>
      </v-col>
    <v-col class="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
    <v-card>
      <v-card-title>
        Filmovi
        <v-spacer></v-spacer>
        <v-btn icon @click="refresh()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="tableData.zaglavljaTabele"
        :search="tableData.search"
        :items="allFilmovi"
        :items-per-page="20"
        :loading="tableData.doneLoading"
        loading-text="Loading... Please wait"
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
    </v-col>
    </v-row>
    <AddFilmDialog v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin'"/>
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
        
        searchData:{
          formValid: true,
          naziv: '',
          zanr: '',
          trajanje: '',
          trajanjeOd: '',
          trajanjeDo: '',
          distributer: '',
          zemljaPorekla: '',
          godinaProizvodnje: '',
          godinaProizvodnjeOd: '',
          godinaProizvodnjeDo: ''

        },
        numericOnlyRule: [(value) => /^\d*$/.test(value) || value === '' ? true : 'Mora biti broj'],
        tableData: {
          doneLoading: false,
          search: 'a',
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
        if(this.searchData.formValid){
          var itemIsValid = true
          var searchArguments = this.searchData
          if(searchArguments.naziv !== '') 
            itemIsValid = itemIsValid && item.naziv.toLowerCase().includes(searchArguments.naziv.toLowerCase())
          if(!itemIsValid) return itemIsValid
          if(searchArguments.zanr !== '')
            itemIsValid = itemIsValid && item.zanrovi.reduce(
              (zanroviStr, value) => zanroviStr + " " + value.naziv,
              ""
            ).toLowerCase().includes(searchArguments.zanr.toLowerCase())
          if(!itemIsValid) return itemIsValid
          if(searchArguments.trajanje !== '')
            itemIsValid = itemIsValid && item.trajanje === Number.parseInt(searchArguments.trajanje)
          if(!itemIsValid) return itemIsValid
          if(searchArguments.trajanjeOd !== '')
            itemIsValid = itemIsValid && item.trajanje >= Number.parseInt(searchArguments.trajanjeOd)*60
          if(!itemIsValid) return itemIsValid
          if(searchArguments.trajanjeDo !== '')
            itemIsValid = itemIsValid && item.trajanje <= Number.parseInt(searchArguments.trajanjeDo)*60
          if(!itemIsValid) return itemIsValid
          if(searchArguments.distributer !== '')
            itemIsValid = itemIsValid && item.distributer.toLowerCase().includes(searchArguments.distributer.toLowerCase())
          if(!itemIsValid) return itemIsValid
          if(searchArguments.zemljaPorekla !== '')
            itemIsValid = itemIsValid && item.zemljaPorekla.toLowerCase().includes(searchArguments.zemljaPorekla.toLowerCase())
          if(!itemIsValid) return itemIsValid
          if(searchArguments.godinaProizvodnje !== '')
            itemIsValid = itemIsValid && item.godinaProizvodnje === Number.parseInt(searchArguments.godinaProizvodnje)
          if(!itemIsValid) return itemIsValid
          if(searchArguments.godinaProizvodnjeOd !== '')
            itemIsValid = itemIsValid && item.godinaProizvodnje >= Number.parseInt(searchArguments.godinaProizvodnjeOd)
          if(!itemIsValid) return itemIsValid
          if(searchArguments.godinaProizvodnjeDo !== '')
            itemIsValid = itemIsValid && item.godinaProizvodnje <= Number.parseInt(searchArguments.godinaProizvodnjeDo)
          return itemIsValid  
        }
        else return false
        /*
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
        }, true);*/
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
      async refresh(){
        this.tableData.doneLoading = true
        await this.fetchFilmovi()
        this.tableData.doneLoading = false
      }
    },
    computed: mapGetters(["allFilmovi", "getIsLoggedIn", "getCurrentUserUloga"]),
    async mounted() {
      this.tableData.doneLoading = true
      await this.fetchFilmovi();
      this.tableData.doneLoading = false;
    }
  };
</script>

<style>
</style>
