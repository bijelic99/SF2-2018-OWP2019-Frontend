<template>
    <v-container class="elevation-2 mx-auto mt-4" v-if="karta !== null && getIsLoggedIn && (getCurrentUserUloga === 'Admin' || getCurrentUserId === karta.korisnik.id)">
        <v-row class="elevation-2">
            <v-col cols="12"><h1 class="title font-weight-bold">Karta za <router-link :to="`/Film/${karta.projekcija.film.id}`">{{karta.projekcija.film.naziv}}</router-link>
             u <router-link :to="`/Projekcija/${karta.projekcija.id}`">{{projekcijaTime}}</router-link></h1></v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Datum:</v-col>
            <v-col cols="2">{{projekcijaDate}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Tip projekcije:</v-col>
            <v-col cols="2">{{karta.projekcija.tipProjekcije.naziv}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Sala:</v-col>
            <v-col cols="2">{{karta.projekcija.sala.naziv}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Sediste:</v-col>
            <v-col cols="2">{{karta.sediste.redniBroj}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Cena:</v-col>
            <v-col cols="2">{{karta.projekcija.cenaKarte}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">Korisnik:</v-col>
            <v-col cols="2">{{karta.korisnik.username}}</v-col>
        </v-row>
        <DeleteKartaDialog v-if="karta !== null && deleteBtnVisible" :karta="karta"/>
    </v-container>
    <v-container v-else>
        Ovu kartu moze pregledati samo admin ili onaj ko je rezervisao
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import moment from 'moment'
    import DeleteKartaDialog from '../components/DeleteItemComponents/DeleteKartaDialog'
    export default {
        name: 'Karta',
        components:{
            DeleteKartaDialog
        },
        props:{
            kartaId:{
                type: String,
                required: true,
                default: null
            }
        },
        data(){
            return{
                karta: null,
            }
        },
        methods:{
            ...mapActions(['fetchKarte']),
            setKarta(){
                if(this.kartaId !== null && /^\d{1,}$/.test(this.kartaId)) this.karta = this.getKartaById(Number.parseInt(this.kartaId))
            },

        },
        computed:{
            ...mapGetters(['getKartaById', 'getIsLoggedIn', 'getCurrentUserUloga', 'getCurrentUserId']),
            projekcijaTime(){
                if(this.karta !== null) return moment(this.karta.projekcija.datumVremePrikazivanja).format("hh:mm")
                else return ''
            },
            projekcijaDate(){
                if(this.karta !== null) return moment(this.karta.projekcija.datumVremePrikazivanja).format("DD-MM-YYYY")
                else return ''
            },
            projekcijaHasPassed(){
                if(this.karta !== null){
                    return moment(new Date(this.karta.projekcija.datumVremePrikazivanja)).isBefore(new Date(Date.now()))
                }
                else return true
            },
            deleteBtnVisible(){
                return this.karta !== null && this.getIsLoggedIn && this.getCurrentUserUloga === 'Admin' && !this.projekcijaHasPassed
            }

        },
        watch:{
            kartaId: function(){
                this.setKarta()
            }
        },
        async mounted(){
            await this.fetchKarte()
            this.setKarta()
        }
    }
</script>

<style>

</style>