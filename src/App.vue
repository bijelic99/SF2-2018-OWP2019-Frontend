<template>
  <v-app>
    <Toolbar/>
    <v-content><router-view/></v-content>
    <v-footer class="primary" :elevation="24" app inset height="auto">
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
            ...mapActions(['setCurrentTheme','setCurrentThemeToBase', 'fetchFilmovi', 'fetchLoggedInUser', 'fetchProjekcije', 'fetchZauzetost']),
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
            await this.fetchFilmovi()
            await this.fetchProjekcije()
            await this.fetchZauzetost()
            await this.fetchLoggedInUser()
        }
    }
</script>
<style>
</style>
