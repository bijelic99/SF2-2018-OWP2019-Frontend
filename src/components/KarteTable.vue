<template>
    <v-data-table
        :headers="computedZaglavlje"
        :items="karte"
        :items-per-page="10"
        :sort-by="[defaultSortBy]"
        :sort-desc="[defaultSortDesc]"
        class="elevation-1">
        <template v-slot:item.datumVremeProdaje="{ item }">
            {{formatVremeProdaje(item.datumVremeProdaje)}}
        </template>
        <template v-slot:header.korisnik="{header}">
            {{header.text}}
        </template>
        <template v-slot:item.korisnik.username="{ item }">
            <router-link :to="`/Korisnik/${item.korisnik.id}`"> {{item.korisnik.username}}</router-link>
        </template>
        <template v-slot:header.projekcija.datumVremePrikazivanja="{header}">
            {{header.text}}
        </template>
        <template v-slot:item.projekcija.datumVremePrikazivanja="{ item }">
            <router-link :to="`/Projekcija/${item.projekcija.id}`"> {{formatVremeProdaje(item.projekcija.datumVremePrikazivanja)}}</router-link>
        </template>
        <template v-slot:header.detaljnije="{header}">
            {{header.text}}
        </template>
        <template v-slot:item.detaljnije="{ item }">
            <router-link :to="`/Karta/${item.id}`">Detaljnije</router-link>
        </template>
    </v-data-table>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'KarteTable',
        props: {
            karte:{
                type: Array,
                required: true
            },
            showUser:{
                type: Boolean,
                required: false,
                default: true
            },
            showProjekcija:{
                type: Boolean,
                required: false,
                default: true
            },
            defaultSortBy:{
                type: String,
                required: false,
                default: null
            },
            defaultSortDesc:{
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed:{
            computedZaglavlje(){
                return this.zaglavlje.filter(z=>(z.value === 'korisnik.username' && this.showUser) 
                    || (z.value === 'projekcija.datumVremePrikazivanja' && this.showProjekcija ) 
                    || (z.value !== 'projekcija.datumVremePrikazivanja' && z.value !== 'korisnik.username'))
            }
        },
        data(){
            return {
                zaglavlje: [
                    {
                        text: 'Vreme prodaje',
                        sortable: true,
                        value: 'datumVremeProdaje',
                        sort: (i1, i2) => moment(new Date(i1)).isBefore(new Date(i2)) ? -1
                            : moment(new Date(i1)).isAfter(new Date(i2)) ? 1 : 0
                    },
                    {
                        text: 'Korisnik',
                        sortable: true,
                        value: 'korisnik.username',
                        sort: (i1, i2) =>{
                            return i1.localeCompare(i2)
                        }
                    },
                    {
                        text: 'Projekcija',
                        sortable: true,
                        value: 'projekcija.datumVremePrikazivanja',
                        sort: (i1, i2) => moment(new Date(i1)).isBefore(new Date(i2)) ? -1
                            : moment(new Date(i1)).isAfter(new Date(i2)) ? 1 : 0
                    },
                    {
                        text: 'Detaljnije',
                        sortable: false,
                        value: 'detaljnije',
                    }
                ]
            }
        },
        methods:{
            formatVremeProdaje(datumVremeProdaje){
                return moment(new Date(datumVremeProdaje)).format("D-M-YYYY hh:mm")
            },
            /*customSort(items, sortBy, sortDesc){
                if(sortBy === 'datumVremeProdaje') items.sort((i1, i2) => moment(new Date(i1.datumVremeProdaje)).isBefore(new Date(i2.datumVremeProdaje)) ? -1 : moment(new Date(i1.datumVremeProdaje)).isAfter(new Date(i2.datumVremeProdaje)) ? 1 : 0)
                console.log(items)

                if(sortDesc) items.reverse()
                return items
            }*/
        }
    }
</script>

<style>

</style>