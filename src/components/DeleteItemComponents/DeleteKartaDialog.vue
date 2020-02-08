<template>
    <v-btn color="secondary" absolute bottom right fab @click="modalDialogVisible = true">
        <v-icon>mdi-delete</v-icon>
        <ModalDialog title="Brisanje karte" text="Jeste li sigurni da zelite obrisati kartu?" :visible="modalDialogVisible" @response="deleteKarta($event)"/>
        <InformationDialog :color="informationDialogColor" :title="informationDialogTitle" :text="informationDialogText" :visible="informationDialogVisible" @response="closeInfoDialog()"/>
    </v-btn>
</template>

<script>
    import ModalDialog from '../DialogComponents/ModalDialog'
    import InformationDialog from '../DialogComponents/InformationDialog'
    import { mapActions } from 'vuex'
    export default {
        name: 'DeleteKartaDialog',
        props:{
            karta:{
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
                deleteSuccessful: false
            }
        },
        methods:{
            ...mapActions(['obrisiKartu']),
            async deleteKarta(response){
                if(response) {
                    this.modalDialogVisible = false
                    var res = await this.obrisiKartu(this.karta)
                    if(res === true) {
                        this.informationDialogTitle='Uspeh'
                        this.informationDialogText='Uspesno ste obrisali'
                        this.informationDialogColor= 'success'
                        this.deleteSuccessful = true
                    }
                    else{
                        this.informationDialogTitle='Greska'
                        this.informationDialogText='Doslo je do greske'
                        this.informationDialogColor= 'error'
                        this.deleteSuccessful = false
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
                if(this.deleteSuccessful) this.$router.push('/')
        
            }
        }
    }
</script>

<style>

</style>