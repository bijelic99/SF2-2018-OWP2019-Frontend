<template>
  <v-app>
    <Toolbar/>
    <v-content><router-view/></v-content>
    <v-footer app absolute class="primary" :elevation="24">
      <v-col
        class="text-center white--text"
        cols="12"
        
      >
        {{ new Date().getFullYear() }} — <strong>Dejan Bijelic</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import Toolbar from './components/Toolbar'
  import { mapActions, mapGetters } from "vuex"; 
  export default {
    name: 'App',
    components: { Toolbar },
    data: () => ({
      //
    }),
    methods:{
      ...mapActions(['setCurrentTheme','setCurrentThemeToBase', 'fetchFilmovi']),
    },
    computed: {
      ...mapGetters(['getCurrentTheme']),
      currentPath: function() {
        return this.$route.path
      }
    },
    watch:{
      currentPath: async function () {
        if(!this.currentPath.includes('/Film/')){
          
          await this.setCurrentThemeToBase()
        }
        
        
      }
    },
    async mounted(){
      await this.fetchFilmovi();
    }
  }
</script>
<style>
</style>
