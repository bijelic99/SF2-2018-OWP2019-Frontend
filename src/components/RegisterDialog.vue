<template>
  <v-dialog v-model="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">Registruj se</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Registracija</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-form :lazy-validation="false">
              <v-text-field v-model="form.data.username" label="Username" requiered :rules="usernameRules"/>
              <v-text-field
                v-model="form.data.password"
                label="Password"
                type="password"
                requiered
              />
              <v-btn :disabled="!form.valid" color="success" class="mr-4" @click="register">Register</v-btn>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "RegisterDialog",
    data() {
      return {
        visible: false,
        form: {
          valid: false,
          data: {
            username: '',
            password: ''
          }
        },
        usernameRules: [
          value => {
            return this.checkIfUsernameAvailable(value)
          } 
        ]
      };
    },
    methods: {
      openDialog: function(e) {
        e.stopPropagation();
        this.visible = true;
      },
      register: function(){

      },
      checkIfUsernameAvailable: async function(username){
        let poruka = ''
        await axios.post('http://localhost:8081/Bioskop/UniqueUsername', {username: username}).then((res) => {
          console.log(res)
          if(res.data.available) poruka = res.data.available
          else poruka = "Username je zauzet"
        }).catch(()=>poruka = "serverski problem")
        
        return poruka
      }
    },
    
  };
</script>

<style>
</style>
