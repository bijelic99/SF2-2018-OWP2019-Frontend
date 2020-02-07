<template>
  <v-container>
    <v-card>
      <v-card-title>
        Korisnici
        <v-spacer/>
            <v-text-field
              v-model="tableData.search"
              append-icon="md-search"
              label="Pretraga"
              single-line
              hide-details
            ></v-text-field>
      </v-card-title>
    <v-data-table 
    :headers="tableData.zaglavljaTabele"
    :items-per-page="20"
    :items="getAllUsers"
    loading-text="Loading... Please wait"
    :search="tableData.search"
    :custom-filter="customFilterFunction"
    >
    <template v-slot:item.datumRegistracije="{ item }">
          {{item.datumRegistracije.toLocaleString()}}
        </template>
        <template v-slot:item.detaljnije="{item}">
          <router-link :to="`/Korisnik/${item.id}`">Detaljnije</router-link>
        </template>
    </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: "Korisnici",
	data: ()=>{
		return {
			tableData: {
				search: '',
				zaglavljaTabele: [
					{
						text: "Username",
						value: "username"
					},
					{
						text: "Datum registracije",
						value: "datumRegistracije"
					},
					{
						text: "Uloga",
						value: "uloga"
					},
					{
						text: "Detaljnije",
						value: "detaljnije",
						sortable: false
					},
				]
			}
		}
	},
	computed: {
		...mapGetters(['getAllUsers'])
	},
	methods:{
		...mapActions(['fetchUsers']),
		customFilterFunction: function (value, search, item) {
			let string = `${item.username} ${item.datumRegistracije.toLocaleString()} ${item.uloga}`.toUpperCase();
			return search.split(" ").reduce((val, currVal)=> string.includes(currVal.toUpperCase()) && val, true)
		}
	},
	mounted(){
		this.fetchUsers()
	}
};
</script>

<style>
</style>