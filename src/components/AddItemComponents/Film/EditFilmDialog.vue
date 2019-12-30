<template>
  <v-dialog v-model="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn fab dark small color="secondary" @click="openDialog">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
          <v-btn icon dark @click="visible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          
        </v-toolbar>
    
    <AddFilm :filmId="filmId" />
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
    props: {
      filmId: {
        type: Number,
        required: true
      }
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