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
                author: 'Ron Swanson',
                repeatFunc: null
            }
        },
        methods:{
            getQuote(){
                // potencionalno sam potrosio resurse kreatoru api-ja, to mi nije bila namera
                axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes', { withCredentials: false}).then(res=>{
                    this.quote = res.data[0]
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