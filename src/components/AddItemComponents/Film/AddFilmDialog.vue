<template>
  <v-dialog v-model="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn @click="openDialog"  color="secondary" bottom right fab fixed>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
          <v-btn icon dark @click="visible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          
        </v-toolbar>
    
    <AddFilm/>
    </v-card>
  </v-dialog>
</template>

<script>
  import AddFilm from './AddFilm'
  export default {
    name: 'EditFilmDialog',
    components: {
      AddFilm
    },
    data(){
      return {
        visible: false
      }
    },
    methods:{
      openDialog: function(e) {
        e.stopPropagation();
        this.visible = true;
      },
    }
  }
</script>

<style>

</style>