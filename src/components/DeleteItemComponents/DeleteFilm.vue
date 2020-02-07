<template>
  <v-dialog v-model="visible" persistent :max-width="$vuetify.breakpoint.mdAndDown ? '80vw' : '40vw'">
      <template v-slot:activator="{ on }">
        <v-btn fab dark small color="secondary" @click="openDialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Brisanje filma {{film.naziv}}</v-card-title>
        <v-card-text>Jeste li sigurni da zelite da obrisete film {{film.naziv}}</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="green darken-1" text @click="submitButton()">Da</v-btn>
          <v-btn color="green darken-1" text @click="visible = false">Ne</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'DeleteFilm',
	props: {
		film: {
			type: Object,
			required: true
		}
	},
	data(){
		return{
			visible: false
		}
	},
	methods:{
		...mapActions(['deleteFilm']),
		openDialog: function(e) {
			e.stopPropagation();
			this.visible = true;
		},
		submitButton: async function () {
			if (await this.deleteFilm(this.film.id)){
				this.visible = false
				this.$router.push({name: 'Home'})
			}
		}
	}
}
</script>

<style>

</style>