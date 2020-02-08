<template>
  <v-container>
      <v-row>
        <v-col class="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <v-card>
            <v-form v-model="searchData.formValid">
              <v-card-title>
                Pretraga:
              </v-card-title>
              <v-list-item>
                <v-text-field label="Film" v-model="searchData.film"/>
              </v-list-item>
              <v-divider/>
              <v-subheader>Datum</v-subheader>
              <DateTimePicker title="Od:" @dateTimeSet="searchData.datumVremeOd = $event"/>
              <DateTimePicker title="Do:" @dateTimeSet="searchData.datumVremeDo = $event"/>
              <v-divider/>
              <v-list-item>
                <v-autocomplete label="Tip projekcije" v-model="searchData.tipProjekcije" :items="allProjekcijeFormatted" clearable/>
              </v-list-item>
              <v-list-item>
                <v-autocomplete label="Sala" v-model="searchData.sala" :items="allSaleFormatted" clearable/>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Cena:</v-list-item-title>
                <v-text-field class="mr-2" label="Od" ref="cenaOdTF" :rules="searchData.cenaRules" v-model="searchData.cenaOd"/><v-text-field label="Do" ref="cenaDoTF" :rules="searchData.cenaRules" v-model="searchData.cenaDo"/>
              </v-list-item>
              <v-divider/>
              <v-list-item>
                <v-radio-group row v-model="searchData.prosla">
                  <v-radio label="Sve" :value="0"/>
                  <v-radio label="Buducue" :value="1"/>
                  <v-radio label="Prosle" :value="2"/>
                </v-radio-group>
              </v-list-item>
            </v-form>
          </v-card>
        </v-col>
      <v-col class="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
      <v-card>
      <v-card-title>
        Projekcije
        <v-spacer></v-spacer>
        <v-btn icon @click="refresh()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="tableData.zaglavljaTabele"
        :items="allProjekcije"
        :items-per-page="20"
        :search="tableData.search"
        :custom-filter="customFilterFunction"
        :loading="tableData.loading"
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
        >{{item.prosla() ? 'Da' : 'Ne' }}</template>
        <template v-slot:item.detaljnije="{item}">
          <router-link :to="`/Projekcija/${item.id}`">Detaljnije</router-link>
        </template>
      </v-data-table>
    </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import DateTimePicker from '../components/DateTimePicker'
    import { mapGetters, mapActions } from 'vuex'
    import moment from 'moment';
    export default {
        name: 'Projekcije',
        components:{
            DateTimePicker
        },
        data: () => {
            return {
                searchData: {
                    film: null,
                    datumVremeOd: null,
                    datumVremeDo: null,
                    tipProjekcije: null,
                    sala: null,
                    cenaOd: null,
                    cenaDo: null,
                    prosla: 0,
                    cenaRules: [value => value === '' || /^\d{1,}$/.test(value) ? true : "Mora biti broj", value => value === '' || Number.parseInt(value) >= 0 ? true : 'Nije vece od 0']
                },
                tableData: {
                    search: "a",
                    loading: false,
                    zaglavljaTabele: [
                        {
                            text: "Film",
                            value: "film",
                            sortable: true,
                            sort: (i1, i2) => i1.naziv.localeCompare(i2.naziv)
                        },
                        {
                            text: "Datum i Vreme Prikazivanja",
                            value: "datumVremePrikazivanja",
                            sortable: true,
                            sort: (i1, i2) => moment(new Date(i1)).isBefore(new Date(i2)) ? -1
                                : moment(new Date(i1)).isAfter(new Date(i2)) ? 1 : 0
                        },
                        {
                            text: "Tip projekcije",
                            value: "tipProjekcije",
                            sortable: true,
                            sort: (i1, i2) => i1.naziv.localeCompare(i2.naziv)
                        },
                        {
                            text: "Sala",
                            value: "sala",
                            sortable: true,
                            sort: (i1, i2) => i1.naziv.localeCompare(i2.naziv)
                        },
                        {
                            text: "Cena Karte",
                            value: "cenaKarte",
                            sortable: true,
                            sort: (t1, t2) => t1 > t2 ? -1 : t2 > t1 ? 1 : 0
                        },
                        {
                            text: "Projekcija prosla",
                            value: "prosla",
                            sortable: true,
                            sort: (p1, p2) => p1() && p2() ? 0 : p1() ? -1 : p2() ? 1 : 0
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
            ...mapActions(['fetchProjekcije', 'fetchTipoviProjekcije', 'fetchSale']),
            customFilterFunction: function(value, search, item) {
			
                var isGood = true
                if(this.searchData.film !== null) isGood = isGood && item.film.naziv.toLowerCase().includes(this.searchData.film.toLowerCase())
                if(!isGood) return isGood
                if(this.searchData.datumVremeOd !== null ) isGood = isGood && moment(item.datumVremePrikazivanja).isSameOrAfter(this.searchData.datumVremeOd)
                if(!isGood) return isGood
                if(this.searchData.datumVremeDo !== null ) isGood = isGood && moment(item.datumVremePrikazivanja).isSameOrBefore(this.searchData.datumVremeDo)
                if(!isGood) return isGood
                if(typeof(this.searchData.tipProjekcije) !== 'undefined' && this.searchData.tipProjekcije !== null) isGood = isGood && item.tipProjekcije.id === this.searchData.tipProjekcije.id
                if(!isGood) return isGood
                if(typeof(this.searchData.sala) !== 'undefined' && this.searchData.sala !== null) isGood = isGood && item.sala.id === this.searchData.sala.id
                if(!isGood) return isGood
                if(this.$refs.cenaOdTF.valid && this.searchData.cenaOd !== null && this.searchData.cenaOd !== '') isGood = isGood && item.cenaKarte >= this.searchData.cenaOd
                if(!isGood) return isGood
                if(this.$refs.cenaDoTF.valid && this.searchData.cenaDo !== null && this.searchData.cenaDo !== '') isGood = isGood && item.cenaKarte <= this.searchData.cenaDo
                if(!isGood) return isGood
                if(this.searchData.prosla !== 0) isGood = isGood && (this.searchData.prosla === 2 ? item.prosla() : !item.prosla())
                if(!isGood) return isGood
                return isGood
            },
            async refresh(){
                this.tableData.loading = true
                await this.fetchProjekcije()
                await this.fetchTipoviProjekcije()
                await this.fetchSale()
                this.tableData.loading = false
            }
    
        },
        computed:{
            ...mapGetters(['allProjekcije', 'allTipoviProjekcije', 'allSale']),
            allProjekcijeFormatted(){
                return this.allTipoviProjekcije.map(tp=>{
                    return {text: tp.naziv, value: tp}
                })
            },
            allSaleFormatted(){
                return this.allSale.map(s=>{
                    return {
                        text: s.naziv,
                        value: s
                    }
                })
            }
        },
        async mounted(){
            this.refresh()
        }
    }
</script>

<style>

</style>