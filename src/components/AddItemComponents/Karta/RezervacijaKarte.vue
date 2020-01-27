<template>
  <v-container class="elevation-2">
      <v-row class="elevation-2">
          <v-col>
              <h1 class="title font-weight-bold">Rezervacija Karte</h1>
          </v-col>
      </v-row>
      <v-row>
          <v-col class="col-lg-10 col-md-12">
              <v-form v-model="formData.formValid">
                  <v-stepper v-model="formData.stepperStep" vertical="">
                      
                          <v-stepper-step step="1" :complete="formData.stepperStep > 1">
                              Izaberi film
                          </v-stepper-step>

                          <v-stepper-content step="1">
                              <v-card>
                                  <v-list-item>
                                    <v-autocomplete :items="filmovi" v-model="formData.izabranFilm"/>
                                  </v-list-item>
                                  <v-card-actions>
                                      <v-spacer/>
                                      <v-btn class="secondary" @click="formData.stepperStep+=1">Dalje</v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-stepper-content>

                          <v-stepper-step step="2" :complete="formData.stepperStep > 2">
                              Izaberi projekciju
                          </v-stepper-step>

                          <v-stepper-content step="2">
                              <v-card>
                                  <v-list-item>
                                    <v-autocomplete :items="projekcije" v-model="formData.izabranaProjekcija">
                                        <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                              <v-list-item-content v-text="data.item"></v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        {{data.item.value.tipProjekcije.naziv}} {{strVreme(data.item.value.datumVremePrikazivanja)}}
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle>
                                                        Sala: {{data.item.value.sala.naziv}} Cena karte: {{data.item.value.cenaKarte}}
                                                    </v-list-item-subtitle>
                                                    <v-list-item-action-text>
                                                        Datum: {{strDatum(data.item.value.datumVremePrikazivanja)}} 
                                                    </v-list-item-action-text>
                                                    
                                                    

                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                  </v-list-item>
                                  <v-card-actions>
                                      <v-spacer/>
                                      <v-btn class="secondary" @click="formData.stepperStep+=1">Dalje</v-btn>
                                      <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-stepper-content>

                          
                          <v-stepper-step step="3" :complete="formData.stepperStep > 3">
                              Izaberi sedista
                          </v-stepper-step>

                          <v-stepper-content step="3">
                              <v-card>
                                  <v-list-item>
                                    <v-container fluid>
                                        <v-row justify="center">
                                            <v-col cols="12" class="cinemaScreen mb-4" align="center">
                                                <v-icon size="x-large" class="white--text" >mdi-projector-screen</v-icon>
                                            </v-col>
                                        </v-row>
                                    <v-row fluid v-if="formData.izabranaProjekcija"  class="rezervacijaContainer" :style="`grid-template-columns: repeat(${numberOfColumns}, 1fr); `">
                                        <div :class="`sediste font-weight-medium ${!sediste.zauzeto ? 'slobodno' : 'zauzeto'} ${sediste.izabrano ? 'izabrano' : ''} ${sediste.dostupno ? 'dostupno' : ''}`"
                                         v-for="sediste in formData.sedista" :key="sediste.redniBroj" @click="izaberiSediste(sediste.id)" @dblclick="resetujSelekciju">
                                            {{sediste.redniBroj}}
                                        </div>
                                    </v-row>
                                    
                                    </v-container>
                                  </v-list-item>
                                  <v-card-actions>
                                      <v-spacer/>
                                      <v-btn class="secondary" @click="formData.stepperStep+=1">Dalje</v-btn>
                                      <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-stepper-content>

                          
                          <v-stepper-step step="4" :complete="formData.stepperStep > 4">
                              Pregled rezervacije i kupovina karte
                          </v-stepper-step>

                          <v-stepper-content step="4">
                              <v-card>
                                  <v-list-item>
                                    <v-combobox/>
                                  </v-list-item>
                                  <v-card-actions>
                                      <v-spacer/>
                                      <v-btn class="secondary" @click="kupi()">Kupi</v-btn>
                                      <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-stepper-content>

                          
                      
                  </v-stepper>
              </v-form>
          </v-col>
          <v-col class="col-lg-2 col-md-12">
              <v-card class="elevation-2">
                  <v-card-title>
                      Podaci o rezervaciji:
                  </v-card-title>
                  <v-list-item v-if="formData.izabranFilm">
                      Film: {{formData.izabranFilm.naziv}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija">
                      Vreme projekcije: {{vremePrikazivanja}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija">
                      Datum projekcije: {{datumPrikazivanja}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija">
                      Tip projekcije: {{formData.izabranaProjekcija.tipProjekcije.naziv}}
                  </v-list-item>
                  <v-list-item  v-if="formData.izabranaProjekcija">
                      Sala: {{formData.izabranaProjekcija.sala.naziv}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija">
                      Cena jedne karte: {{formData.izabranaProjekcija.cenaKarte}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija"> 
                      Broj sedista: {{formData.izabranaSedista.length}}
                  </v-list-item>
                  <v-list-item v-if="formData.izabranaProjekcija">
                      Ukupno: {{formData.izabranaSedista.length * formData.izabranaProjekcija.cenaKarte}}
                  </v-list-item>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'RezervacijaKarte',
    props: {
      film: {
        type: Object,
        required: false,
        default: null
      },
      projekcija: {
        type: Object,
        required: false,
        default: null
      }
    },
    data(){
      return {
        karte: [],
        formData: {
          izabranFilm: null,
          izabranaProjekcija: null,
          izabranaSedista: [],
          stepperStep: 1,
          formValid: false,
          sedista: []
        }
      }
    },
    methods:{
      ...mapActions(['fetchFilmovi', 'fetchProjekcije', 'fetchZauzetost']),
      kupi(){

      },
      strVreme(vreme){
        return moment(vreme).format('H:mm')
      },
      strDatum(vreme){
        return moment(vreme).format('D-M-YYYY')
      },
      izaberiSediste(sedisteId){
        var index =this.formData.sedista.findIndex(s=>s.id === sedisteId)
        var sediste = this.formData.sedista[index]
        if(this.formData.sedista.filter(s=>s.izabrano).length === 0){
          if(!sediste.zauzeto){
            sediste.izabrano = true
            sediste.dostupno = false
            this.oznaciDostupna()
          }
          
        }
        else if(!sediste.izabrano && sediste.dostupno) {
          sediste.izabrano = true
          sediste.dostupno = false
          this.oznaciDostupna()
        }
        
      },
      oznaciDostupna(){
        var hasLessThan20 = this.formData.sedista.length < 20
        for(var i = 0; i< this.formData.sedista.length; i++){
          var endOfRow = !hasLessThan20 
          var startOfRow = !hasLessThan20 
          if(!hasLessThan20){
            if(i>0) {
              startOfRow = startOfRow && this.formData.sedista[i-1].redniBroj%20 === 0
            }
              
            if(i<this.formData.sedista.length-1) endOfRow = endOfRow && this.formData.sedista[i+1].redniBroj%20 === 1
          }
          if(this.formData.sedista[i].izabrano){
            if(i>0){
              if(!this.formData.sedista[i-1].izabrano && !this.formData.sedista[i-1].zauzeto && !startOfRow) this.formData.sedista[i-1].dostupno = true
            }
            if(i<this.formData.sedista.length-1){
              if(!this.formData.sedista[i+1].izabrano && !this.formData.sedista[i+1].zauzeto && !endOfRow) this.formData.sedista[i+1].dostupno = true
            }
          }
        }
      },
      resetujSelekciju(){
        this.formData.sedista.map(s=>{
          s.izabrano = false
          s.dostupno = false
        })
      }
      
    },
    computed:{
      ...mapGetters(['allFilmovi','allProjekcije', 'getFilmHasProjekcijaInFuture', 'getProjekcijeForFilmInFuture', 'getZauzetost', 'getZauzetostForProjekcija', 'getFilmHasFreeProjekcijeInFuture']),
      filmovi: function(){
        return this.allFilmovi.filter(f=>this.getFilmHasProjekcijaInFuture(f.id)).filter(f=>this.getFilmHasFreeProjekcijeInFuture(f.id)).map(f=>{
          var item = new Object()
          item['text'] = f.naziv
          item['value'] = f
          return item
        })
      },
      projekcije: function(){
        return this.formData.izabranFilm ? this.getProjekcijeForFilmInFuture(this.formData.izabranFilm.id)
          .filter(p=> this.getZauzetostForProjekcija(p.id).filter(z=> !z.zauzeto).length > 0).map(p=>{
            var item = new Object()
            item['text'] = `${p.tipProjekcije.naziv} ${moment(p.datumVremePrikazivanja).format('H:mm')}`
            item['value'] = p
            return item
          }) : []
      },
      vremePrikazivanja(){
        return this.formData.izabranaProjekcija !== null ? moment(this.formData.izabranaProjekcija.datumVremePrikazivanja).format('H:mm') : ''
      },
      datumPrikazivanja(){
        return this.formData.izabranaProjekcija !== null ? moment(this.formData.izabranaProjekcija.datumVremePrikazivanja).format('D-M-YYYY') : ''
      },
      numberOfColumns: function(){
        var brojSedista = 10;
        if(this.formData.izabranaProjekcija) brojSedista = this.getZauzetostForProjekcija(this.formData.izabranaProjekcija.id).length
        var br = 20
        if(brojSedista < 20) br = brojSedista

        return br
      }
    },
    async mounted(){
      if(this.allFilmovi.length === 0) await this.fetchFilmovi()
      if(this.allProjekcije.length === 0) await this.fetchProjekcije()
      if(this.film !== null) this.izabranFilm = this.film
      if(this.projekcija !== null) this.izabranaProjekcija = this.projekcija
      if(this.getZauzetost.size === 0) await this.fetchZauzetost()
      
    },
    watch:{
      'formData.izabranFilm': function(){
        this.formData.izabranaProjekcija = null
      },
      'formData.izabranaProjekcija': function(){
        if(this.formData.izabranaProjekcija !== null) this.formData.sedista =  this.getZauzetostForProjekcija(this.formData.izabranaProjekcija.id)
          .map(sediste=> {return {...sediste, izabrano: false, dostupno: false}})
        else this.formData.sedista = []
      }
    }
  }
</script>

<style>
    .rezervacijaContainer{
        display: grid;
        grid-column-gap: 0.5vw;
        grid-row-gap: 0.2vw;
        grid-template-columns: repeat(1, 1fr);
        overflow: auto;
    }
    
     .cinemaScreen{
            background-color: var(--v-primary-base);
            
     }

     
    
    .sediste{
        border-style: solid;
        border-width: 2px;
        border-radius: 10px;
        text-align: center;

    }
    .slobodno{
        background-color: var(--v-white-base);
        color: var(--v-primary-base);
    }
    .slobodno:hover, .izabrano{
        background-color: var(--v-secondary-darken2);
        color: white;
    }
    .zauzeto{
        background-color: var(--v-primary-base);
        color: white;
    }
    .dostupno{
      background-color: var(--v-secondary-lighten1);
        color: white;
    }
</style>