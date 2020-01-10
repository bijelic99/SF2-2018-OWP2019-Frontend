<template>
    <v-container class="fill-height">
        <v-card height="100%" width="100%">
            <v-card-title>
                {{user.username}}
            </v-card-title>
            <v-card-subtitle>
                Uloga: {{user.uloga}}
            </v-card-subtitle>
                <v-list-item>

                </v-list-item>
            <v-spacer/>
            <v-card-actions>
                <v-btn text>Izmeni</v-btn>
                <v-btn text>Obrisi</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: 'Korisnik',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        user: {}
      }
    },
    methods:{
      ...mapActions(['fetchUsers'])
    },
    computed: {
      ...mapGetters(['getUser', 'getAllUsers'])
    },
    async mounted(){
      if(this.getAllUsers.length === 0) await this.fetchUsers()
      this.user = this.getUser(Number.parseInt(this.id))
    }

  }
</script>

<style>

</style>