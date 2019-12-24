<template>
  <v-app>
    <Toolbar/>
    <router-view class="mt-12 pt-6"/>
  </v-app>
</template>

<script>
  import Toolbar from './components/Toolbar'
  export default {
    name: 'App',
    components: { Toolbar },
    data: () => ({
      //
    })
  }
</script>
<style>
  .padding-top{
    padding-top: 6vw;
  }
</style>
