<template>
  <v-container class="mx-auto mt-4 h-80" v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin'">
      <v-row class="elevation-2">
          
            <v-col cols="lg-4 md-8">
                <h1 class="title font-weight-bold">Izvestavanje</h1>
            </v-col>
      </v-row>
      <v-row>
          <v-col sm="12" md="12" cols="12" lg="3" xl="3" class="pl-0">
              <v-card>
                  <v-card-title>
                      Izbor vremena za koje se gleda
                  </v-card-title>
                    <DateTimePicker title="Od:" @dateTimeSet="dateTimeFrom = $event"/>
                    <DateTimePicker title="Do:" @dateTimeSet="dateTimeTo = $event"/>
                    <v-card-actions>
                        <v-spacer/><v-btn color="primary" :disabled="dateTimeFrom === null || dateTimeTo === null" @click="fetchListaFilmova()">Trazi</v-btn>
                    </v-card-actions>
              </v-card>
          </v-col>
          <v-col sm="12" md="12" cols="12" lg="9" xl="9" class="pr-0">
              <v-card>
                  <v-card-title>
                      Filmovi
                  </v-card-title>
                  <v-data-table :headers="headers" :items="listaFilmova" :loading="loading">
                      <template v-slot:item.film.naziv="{item}">
                          <router-link :to="`/Film/${item.film.id}`">{{item.film.naziv}}</router-link>
                      </template>
                      <template v-slot:body.append>
                          <td>Ukupno: </td>
                          <td>{{ukupnoProjekcija}}</td>
                          <td>{{ukupnoProdatihKarata}}</td>
                          <td>{{ukupanPrihod}}</td>
                      </template>
                  </v-data-table>
              </v-card>
          </v-col>
      </v-row>
      <v-row>

      </v-row>
  </v-container>
</template>
<script>
    import DateTimePicker from '../components/DateTimePicker'
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    export default {
        name: 'Izvestavanje',
        components:{
            DateTimePicker
        },
        data(){
            return{
                loading: false,
                dateTimeFrom: null,
                dateTimeTo: null,
                listaFilmova: [],
                headers:[
                    {
                        text: 'Film',
                        value: 'film.naziv',
                        sortable: false
                    },
                    {
                        text: 'Broj projekcija',
                        value: 'brojProjekcija'
                    },
                    {
                        text: 'Broj prodatih karata',
                        value: 'brojProdatihKarata'
                    },
                    {
                        text: 'Ukupna cena prodatih karata',
                        value: 'ukupnaCenaKarata'
                    }
                ]
            }
        },
        methods: {
            async fetchListaFilmova(){
                if(this.dateTimeFrom !== null && this.dateTimeTo !== null) {
                    this.loading = true
                    this.listaFilmova = await axios.get(`${this.getFullServerAddress}/Izvestavanje?od=${this.dateTimeFrom.getTime()}&do=${this.dateTimeTo.getTime()}`).then(res=>{
                        
                        return res.data
                    }).catch(err=>{
                        console.log(err)
                        return []
                    })
                    this.loading = false
                }
            }
        },
        computed: {
            ...mapGetters(['getFullServerAddress', 'getIsLoggedIn', 'getCurrentUserUloga']),
            ukupnoProjekcija: function(){
                return this.listaFilmova.reduce((res, item)=> res+=item.brojProjekcija,0)
            },
            ukupnoProdatihKarata: function(){
                return this.listaFilmova.reduce((res, item)=> res+=item.brojProdatihKarata,0)
            },
            ukupanPrihod:  function(){
                return this.listaFilmova.reduce((res, item)=> res+=item.ukupnaCenaKarata,0)
            },
        }

    }
</script>

<style>

</style>