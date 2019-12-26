<template>
  <v-app>
    <Toolbar/>
    <v-content><router-view/></v-content>
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
      ...mapActions(['setCurrentTheme','setCurrentThemeToBase']),
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
    }
  }
</script>
<style>
</style>
