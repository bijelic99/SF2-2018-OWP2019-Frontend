<template>
  <v-dialog v-model="visible" persistent :max-width="$vuetify.breakpoint.mdAndDown ? '80vw' : '40vw'">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" @click="openDialog">Logout</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Odjava</v-card-title>
        <v-card-text>Jeste li sigurni da zelite da se odjavite</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="doLogout()">Da</v-btn>
          <v-btn color="green darken-1" text @click="visible = false">Ne</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'LogoutDialog',
    data(){
      return{
        visible: false
      }
    },
    methods:{
      ...mapActions(['logout']),
      openDialog: function(e) {
        e.stopPropagation();
        this.visible = true;
      },
      doLogout: function () {
        this.logout()
        this.visible = false   
      }
      
    }
  }
</script>

<style>

</style>