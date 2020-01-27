<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col><h3 class="text-left">Danasnje projekcije:</h3></v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Film</th>
                        <th class="text-left">Datum i vreme prikazivanja</th>
                        <th class="text-left">Tip projekcije</th>
                        <th class="text-left">Sala</th>
                        <th class="text-left">Cena</th>
                        <th class="text-left">Detaljnije</th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto overflow-x-hidden">
                    <tr v-for="projekcija in getDanasnjeProjekcijeSortedAsPerSpecification" :key="projekcija.id">
                        <td><router-link :to="`/Film/${projekcija.film.id}`"> {{projekcija.film.naziv}} </router-link></td>
                        <td>{{projekcija.datumVremePrikazivanja.toLocaleString()}}</td>
                        <td>{{projekcija.tipProjekcije.naziv}}</td>
                        <td>{{projekcija.sala.naziv}}</td>
                        <td>{{projekcija.cenaKarte}}</td>
                        <td><router-link :to="`/Projekcija/${projekcija.id}`"> Detaljnije </router-link></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        </v-col>
        </v-row>
        
    </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'IndexPageProjekcijeTable',
    computed: {
      ...mapGetters(['getDanasnjeProjekcijeSortedAsPerSpecification', 'allProjekcije'])
    },
    methods: {
      ...mapActions(['fetchProjekcije'])
    },
    mounted: function () {
      if(this.allProjekcije.length === 0) this.fetchProjekcije()
    }
  }
</script>

<style>
</style>