<template>
  <v-container v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin'">
    <v-row>
      <h1 class="ml-2 title">Dodavanje projekcije:</h1>
    </v-row>
    <v-row>
      <v-form class="col-12" v-model="formData.formValid">
        <v-stepper v-model="stepperData.step" vertical>
          <v-stepper-step :complete="stepperData.step > 1" step="1">Izbor filma</v-stepper-step>
          <v-stepper-content step="1">
            <v-card>
              <v-list-item>
                <v-autocomplete label="Film" :items="allFilmoviFormated" v-model="projekcija.film" :rules="formData.requieredRule"/>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 2" :disabled="projekcija.film === null">Dalje</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 2" step="2">Izbor datuma</v-stepper-step>
          <v-stepper-content step="2">
            <v-card>
              <v-list-item>
                <v-menu
                  ref="dateMenu"
                  v-model="componentData.dateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="componentData.date"
                  transition="scale-transition"
                  offset-y
                  max-width="60vw"
                  min-width="40vw"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="componentData.date"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="componentData.date" no-title scrollable full-width :min="minDate">
                    <v-spacer />
                    <v-btn text color="primary" @click="componentData.dateMenu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dateMenu.save(componentData.date)">Ok</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 3" :disabled="componentData.date === null" >Dalje</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 1">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 3" step="3">Izbor vremena</v-stepper-step>
          <v-stepper-content step="3">
            <v-card>
              <v-list-item>
                <v-menu
                  v-model="componentData.timeMenu"
                  ref="timeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="componentData.time"
                  transition="scale-transition"
                  offset-y
                  max-width="80vw"
                  min-width="40vw"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="componentData.time"
                      label="Picker in menu"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="componentData.timeMenu"
                    v-model="componentData.time"
                    full-width
                    @click:minute="$refs.timeMenu.save(componentData.time)"
                    :min="minTime"
                  />
                </v-menu>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 4" :disabled="componentData.time === null">Dalje</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 2">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 4" step="4">Izbor tipa projekcije</v-stepper-step>
          <v-stepper-content step="4">
            <v-card>
              <v-list-item>
                <v-autocomplete label="Tip projekcije" :items="allTipoviProjekcijeFormated" v-model="projekcija.tipProjekcije" :rules="formData.requieredRule"/>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 5" :disabled="projekcija.tipProjekcije === null">Dalje</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 3">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 5" step="5">Izbor sale</v-stepper-step>
          <v-stepper-content step="5">
            <v-card>
              <v-list-item>
                <v-autocomplete label="Sala"
                 :items="availableSaleFormated"
                 v-model="projekcija.sala" :rules="formData.requieredRule"/>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 6" :disabled="projekcija.sala === null">Dalje</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 4">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 6" step="6">Cena karte</v-stepper-step>
          <v-stepper-content step="6">
            <v-card>
              <v-list-item>
                <v-text-field label="Cena karte" v-model="projekcija.cenaKarte" suffix="din" :rules="formData.cenaRules" ref="cenaTF"/> 
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="stepperData.step = 7" :disabled="$refs.cenaTF ? !$refs.cenaTF.valid : false">Dalje</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 5">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-step :complete="stepperData.step > 7" step="7">Pregled i dodavanje</v-stepper-step>
          <v-stepper-content step="7">
            <v-card>
              <v-card-title>
                Projekcija:
              </v-card-title>
              <v-list-item v-if="projekcija.film !== null">
                <span>Film: </span><v-spacer/>{{projekcija.film.naziv}}
              </v-list-item>
              <v-list-item v-if="projekcija.datumVremePrikazivanja !== null">
                <span>Termin projekcije: </span><v-spacer/>{{projekcija.datumVremePrikazivanja.toLocaleString()}}
              </v-list-item>
              <v-list-item v-if="projekcija.tipProjekcije !== null">
                <span>Tip projekcije: </span><v-spacer/>{{projekcija.tipProjekcije.naziv}}
              </v-list-item>
              <v-list-item v-if="projekcija.sala !== null">
                <span>Sala: </span><v-spacer/>{{projekcija.sala.naziv}}
              </v-list-item>
              <v-list-item v-if="projekcija.cena !== null">
                <span>Cena karte: </span><v-spacer/>{{projekcija.cenaKarte}}
              </v-list-item>

              

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!formData.formValid" @click="dodaj()">Dodaj</v-btn>
                <v-btn class="primary--text" text @click="stepperData.step = 6">Nazad</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-form>
    </v-row>
    <v-dialog v-model="componentData.modalOpen" width="60vw" >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          {{componentData.modalTitle}}
        </v-card-title>

        <v-card-text>
          {{componentData.modalText}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="zatvoriModal()"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import moment from 'moment';
    export default {
        name: "AddProjekcija",
        data() {
            return {
                stepperData: {
                    step: 1
                },
                formData: {
                    formValid: false,
                    cenaRules: [value=> /^\d{1,}$/.test(value) ? true : "Mora biti broj", value=>Number.parseInt(value)>0 ? true : 'Cena mora biti veca od 0'],
                    requieredRule: [value=> value !== null ? true : 'Obavezno polje']
                },
                projekcija: {
                    id: 0,
                    film: null,
                    tipProjekcije: null,
                    sala: null,
                    datumVremePrikazivanja: null,
                    cenaKarte: 0
                },
                componentData: {
                    time: null,
                    timeMenu: false,
                    date: null,
                    dateMenu: false,
                    modalOpen: false,
                    modalType: false, //ako treba da se odradi redirect staviti true
                    modalTitle: '',
                    modalText: ''
                }
            };
        },
        methods: {
            ...mapActions(['fetchFilmovi', 'fetchSale', 'fetchProjekcije', 'fetchZauzetost', 'fetchTipoviProjekcije','addProjekcija']),
            async dodaj() {
                if(await this.addProjekcija(this.projekcija)) {
                    this.componentData.modalType = true
                    this.componentData.modalTitle = 'Uspeh'
                    this.componentData.modalText = 'Uspesno ste dodali projekciju'
                }
                else{
                    this.componentData.modalType = false
                    this.componentData.modalTitle = 'Greska'
                    this.componentData.modalText = 'Doslo je do greske projekcija nije dodata'
                } 
                this.componentData.modalOpen = true
            },
            zatvoriModal(){
                this.componentData.modalOpen = false
                if(this.componentData.modalType) this.$router.push('/')
            }
        },
        computed: {
            ...mapGetters(['allFilmovi', 'allTipoviProjekcije', 'getSlobodneSaleForTipProjekcije', 'getCurrentUserUloga', 'getIsLoggedIn']),
            allFilmoviFormated(){
                return this.allFilmovi.map(f=>{return {text: f.naziv, value: f}})
            },
            allTipoviProjekcijeFormated(){
                return this.allTipoviProjekcije.map(tp=>{return {text: tp.naziv, value: tp}})
            },
            datumVremeProjekcijeComputed(){
                if(this.componentData.time !== null && this.componentData.date !== null)
                {   
                    return moment(`${this.componentData.date} ${this.componentData.time}`).toDate()
                }
                else return null
            },
            availableSaleFormated(){
                if(this.projekcija.film !== null && this.projekcija.tipProjekcije !== null && this.projekcija.datumVremePrikazivanja !== null) {
                    var a = this.getSlobodneSaleForTipProjekcije(this.projekcija.datumVremePrikazivanja, this.projekcija.film, this.projekcija.tipProjekcije)
                    return a.map(sala=>{
                        return {
                            text: sala.naziv,
                            value: sala
                        }
                    })}
                else return []
        
            },
            minDate(){
                return moment(Date.now()).format()
            },
            minTime(){
                if(this.componentData.date !== null && moment(this.componentData.date).isSameOrBefore(Date.now()))
                    return moment(new Date(Date.now())).format("HH:mm")
                else return undefined
            },
            cenaValid(){
                if(typeof this.$refs.cenaTF !== 'undefined') return this.$refs.cenaTF.valid
                else return false
            }
      
        },
        asyncComputed:{
      
        },
        watch:{
            datumVremeProjekcijeComputed: async function(){
                this.projekcija.datumVremePrikazivanja = await this.datumVremeProjekcijeComputed
            },
            'projekcija.datumVremePrikazivanja': function(){
                if(this.projekcija.datumVremePrikazivanja !== null) {
                    this.formData.formValid = this.formData.formValid && true
                }
            }
        }
        ,
        async mounted(){
            await this.fetchFilmovi()
            await this.fetchSale()
            await this.fetchProjekcije()
            await this.fetchZauzetost(),
            await this.fetchTipoviProjekcije()
      
        }
    };
</script>

<style>
</style>