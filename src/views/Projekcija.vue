<template>
  <v-container class="elevation-2 mx-auto mt-4 h-80" v-if="projekcija!== null">
      <v-row class="elevation-2">
          
            <v-col cols="lg-4 md-8">
                <h1 class="title font-weight-bold">Projekcija u {{strVremeProjekcije}}</h1>
            </v-col>
            <v-col class="col-lg-2 offset-lg-6 col-md-4" align="end">
              <RezervacijaKarteDialog :enabled="!projekcija.prosla() && getIsLoggedIn && getCurrentUserUloga === 'Obican' && getProjekcijaHasFreeSeats(projekcija.id)" :btnText="'Kupi kartu'" :projekcija="projekcija"/>
            </v-col>
      </v-row>
      <v-row>
        <v-col cols="md-2">Film:</v-col>
        <v-col cols="md-10">
        <router-link :to="`/Film/${projekcija.film.id ? projekcija.film.id : ''}`">{{projekcija.film.naziv}}</router-link> 
        </v-col>
      </v-row>
      <v-row>
          <v-col class="col-md-2">Vreme prikazivanja:</v-col>
          <v-col class="col-md-10">{{strVremeProjekcije}}</v-col>
      </v-row>
      <v-row>
          <v-col class="col-md-2">Tip projekcije:</v-col>
          <v-col class="col-md-10">{{projekcija.tipProjekcije.naziv}}</v-col>
      </v-row>
      <v-row>
          <v-col class="col-md-2">Sala:</v-col>
          <v-col class="col-md-10">{{projekcija.sala.naziv}}</v-col>
      </v-row>
      <v-row>
          <v-col class="col-md-2">Cena Karte:</v-col>
          <v-col class="col-md-10">{{projekcija.cenaKarte}}</v-col>
      </v-row>
      <v-row>
          <v-col class="col-md-2">Slobodnih mesta:</v-col>
          <v-col class="col-md-10">{{slobodnaMesta}}</v-col>
      </v-row>
      <v-row>
          <v-col class="col-12">
              <v-progress-linear active :value="zauzetaMestaPercent" height="20px"/>
          </v-col>
      </v-row>
      <v-row>
          <v-col class="col-12">
              <KarteTable v-if="projekcija !== null && getIsLoggedIn && getCurrentUserUloga === 'Admin'" :karte="getKarteForProjekcija(projekcija.id)" :showProjekcija="false"/>
          </v-col>
      </v-row>
      <DeleteProjekcijaDialog v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin'" :projekcija="projekcija"/>
  </v-container>
</template>

<script>
    import axios from 'axios'
    import { mapGetters, mapActions} from 'vuex'
    import moment from 'moment'
    import RezervacijaKarteDialog from '../components/AddItemComponents/Karta/RezervacijaKarteDialog'
    import DeleteProjekcijaDialog from '../components/DeleteItemComponents/DeleteProjekcijaDialog'
    import KarteTable from '../components/KarteTable'
    export default {
        name: 'Projekcija',
        components:{
            RezervacijaKarteDialog,
            DeleteProjekcijaDialog,
            KarteTable
        },
        props:{
            id:{
                type: String,
                required: true
            }
        },
        data(){
            return{
                projekcija: null
            }
        },
        methods:{
            ...mapActions(['fetchKarte'])
        },
        computed: {
            ...mapGetters(['getProjekcija', 'getFullServerAddress', 'getIsLoggedIn', 'getCurrentUserUloga', 'getProjekcijaHasFreeSeats', 'getKarteForProjekcija']),
            strVremeProjekcije: function(){
                return this.projekcija !== null ? moment(this.projekcija.datumVremePrikazivanja).format('hh:mm D.M.YYYY') : ''
            },
      
        },
        asyncComputed:{
            zauzetost:
                {
                    async get(){
                        if(this.projekcija !== null){return await axios.get(`${this.getFullServerAddress}/ZauzetaSedistaZaProjekciju?projekcijaId=${this.projekcija.id}`).then(res=>res.data).catch(err=>{
                            console.log(err)
                            return 'Not Available'
                        })} else return []
                    },
                    default: []
                },
            slobodnaMesta:{
                async get(){
                    var za = await this.zauzetost
                    return `${(za.filter(sediste=>!sediste.zauzeto).length)}/${za.length}`
                },
                default: 'Not Available'
            },
            zauzetaMestaPercent:{
                default: 0,
                async get(){
                    var sm = await this.zauzetost
                    return (sm.filter(sediste=>sediste.zauzeto).length)/Math.trunc(( sm.length)/100)
                }
            }
        },
        async mounted(){
            try {
                this.projekcija = await this.getProjekcija(Number.parseInt(this.id))
                await this.fetchKarte()
        
            } catch (err){
                console.log(err)
            }
      
        }
    

    }
</script>

<style>
.h-80{
    height: 80vh;
}
</style>z