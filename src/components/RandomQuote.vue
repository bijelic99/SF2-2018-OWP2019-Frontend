<template>
  <v-container fluid class="fill-height px-6">
    <blockquote class="blockquote">
        <span class="font-italic">"{{quote}}"</span> <span class="font-weight-bold">- {{author}}</span>
    </blockquote>      
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "RandomQuote",
    data: () => {
      return{
        quote: '',
        author: '',
        repeatFunc: null
      }
    },
    methods:{
      getQuote(){
        axios.get('https://programming-quotes-api.herokuapp.com/quotes/random', { withCredentials: false}).then(res=>{
          this.quote = res.data.en
          this.author = res.data.author
        })
      }
    },
    mounted: function(){
      this.getQuote()
      this.repeatFunc = setInterval(this.getQuote, 60*1000)
      
    },
    beforeDestroy(){
      clearInterval(this.repeatFunc)
    }
  }
</script>

<style>

</style>