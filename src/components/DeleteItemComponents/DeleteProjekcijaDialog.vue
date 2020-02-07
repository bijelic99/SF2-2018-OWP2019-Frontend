<template>
    <v-btn color="secondary" absolute bottom right fab @click="modalDialogVisible = true">
        <v-icon>mdi-delete</v-icon>
        <ModalDialog title="Brisanje projekcije" text="Jeste li sigurni da zelite obrisati projekciju?" :visible="modalDialogVisible" @response="deleteProjekcija($event)"/>
        <InformationDialog :color="informationDialogColor" :title="informationDialogTitle" :text="informationDialogText" :visible="informationDialogVisible" @response="closeInfoDialog()"/>
    </v-btn>
</template>

<script>
import ModalDialog from '../DialogComponents/ModalDialog'
import InformationDialog from '../DialogComponents/InformationDialog'
import { mapActions } from 'vuex'
export default {
	name: 'DeleteProjekcijaDialog',
	props:{
		projekcija:{
			type: Object,
			required: true,
			default: null
		}
	},
	components:{
		ModalDialog,
		InformationDialog
	},
	data(){
		return{
			modalDialogVisible: false,
			informationDialogVisible: false,
			informationDialogText: '',
			informationDialogTitle: '',
			informationDialogColor: 'primary',
			deleted: false
		}
	},
	methods:{
		...mapActions(['deleteProjekcija']),
		async deleteProjekcija(response){
			if(response === true && !this.deleted) {
				this.modalDialogVisible = false
				var res = this.deleteProjekcija(this.projekcija)
				console.log(res)
				if(res) {
					this.informationDialogTitle='Uspeh'
					this.informationDialogText='Uspesno ste obrisali'
					this.informationDialogColor= 'success'
					this.deleted = true
                    
				}
				else{
					this.informationDialogTitle='Greska'
					this.informationDialogText='Doslo je do greske'
					this.informationDialogColor= 'error'
				}
				this.informationDialogVisible = true
			}
			else this.modalDialogVisible = false
			
		},
		closeInfoDialog(){
			this.informationDialogVisible = false
			this.informationDialogTitle=''
			this.informationDialogText=''
			this.informationDialogColor=''
        
		}
	}
}
</script>

<style>

</style>