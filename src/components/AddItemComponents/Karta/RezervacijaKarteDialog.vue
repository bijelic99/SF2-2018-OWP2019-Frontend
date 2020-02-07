<template>
    <v-dialog v-model="dialogVisible" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-btn :disabled="!enabled" class="secondary" v-on="on">{{btnText}}</v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="zatvoriDialog()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list-item>
                <v-list-item-content>
                    <v-container fluid>
                        <RezervacijaKarte :film="film" :projekcija="projekcija"/>
                    </v-container>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-dialog>
</template>

<script>
import RezervacijaKarte from './RezervacijaKarte'
export default {
	name: 'RezervacijaKarteDialog',
	components: { RezervacijaKarte },
	props:{
		film: {
			default: null,
			type: Object,
			required: false
		},
		projekcija: {
			default: null,
			type: Object,
			required: false
		},
		btnText:{
			type: String,
			required: true,
			default: ''
		},
		enabled: {
			type: Boolean,
			requiered: false,
			default: true,
		}
	},
	data(){
		return {
			dialogVisible: false
		}
	},
	methods:{
		zatvoriDialog(){
			this.dialogVisible = false
		}
	}
}
</script>

<style>

</style>