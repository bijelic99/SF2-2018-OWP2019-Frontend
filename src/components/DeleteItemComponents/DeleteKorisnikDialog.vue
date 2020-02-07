<template>
  <v-dialog v-model="dialog" :max-width="$vuetify.breakpoint.mdAndDown ? '80vw' : '40vw'">
      <template v-slot:activator="{on}">
          <v-btn fab absolute bottom right v-on="on" color="secondary">
              <v-icon>mdi-delete</v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Jeste li sigurni da zelite obrisati {{korisnik.username}}</v-card-title>
        <v-card-text>Postoji mogucnost da nece biti moguce povratiti obrisane podatke</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submit">Da</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Ne</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default { 
	name: 'DeleteKorisnikDialog',
	props: {
		korisnik: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			dialog: false,
		}
	},
	methods:{
		...mapActions(['deleteUser']),
		submit: function () {
			if(this.deleteUser(this.korisnik.id)) {
				this.dialog = false
				this.$router.push('/')
            
			}
		}
	}

}
</script>

<style>

</style>