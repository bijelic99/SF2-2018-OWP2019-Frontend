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
            <v-form ref="registerForm" v-model="form.valid">
              <v-text-field
                ref="registerUsername"
                v-model="form.data.username"
                :rules="rules.usernameRules"
                label="Username"
              />
              <v-text-field v-model="form.data.password" :rules="rules.passwordRules" label="Password" type="password" />
              <v-btn :disabled="!form.valid" color="secondary" class="mr-4" @click="submit">Register</v-btn>
            </v-form>
            <v-snackbar :timeout="componentData.snackbarGeneral.timeout" color="error" dark v-model="form.usernameTaken">
                Username je zauzet pokusajte sa nekim drugim
              <v-btn text @click="form.usernameTaken = false">Close</v-btn>
            </v-snackbar>
            <v-snackbar app :timeout="componentData.snackbarGeneral.timeout" color="success" dark v-model="componentData.successSnackbar.open">
                Uspesna Registracija
              <v-btn text @click="componentData.successSnackbar.open = false">Close</v-btn>
            </v-snackbar>
            <v-snackbar :timeout="componentData.snackbarGeneral.timeout" color="error" dark v-model="componentData.failSnackbar.open">
                Doslo je do greske
              <v-btn text @click="componentData.failSnackbar.open = false">Close</v-btn>
            </v-snackbar>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from "axios";
  import { mapGetters } from 'vuex'
  export default {
    name: "RegisterDialog",
    data() {
      return {
        visible: false,
        form: {
          valid: true,
          usernameTaken: false,
          data: {
            username: "",
            password: ""
          }
        },
        rules: {
          usernameRules: [
            value => value+"".trim() === "" ? "Polje ne sme biti prazno" : true
          ],
          passwordRules: [
            value => value+"".trim() === "" ? "Polje ne sme biti prazno" : true,
            value => (value+"").trim().length<8? "Sifra mora da ima vise od 8 karaktera":true
          ]
        },
        componentData:{
          snackbarGeneral: {
            timeout: 2000
          },
          successSnackbar: {
            open: false
          },
          failSnackbar: {
            open: false
          }
        }
      };
    },
    methods: {
      openDialog: function(e) {
        e.stopPropagation();
        this.visible = true;
      },
      submit: async function() {
        var error = await this.checkIfUsernameAvailable(this.form.data.username);
        if (error != true) {
          this.form.usernameTaken = true
        }
        else{
          //trebalo bi dodati dialog koji potvrdjuje registraciju
          if(this.$refs.registerForm.validate())
          {
            if(await this.register() === true) {
              this.componentData.successSnackbar.open = true
              this.visible = false
              this.$refs.registerForm.reset()
            }
            else{
              this.componentData.failSnackbar.open = true
            }
          }
        }
      },
      register: async function(){
        let user = this.form.data
        let success = false
        await axios.post(`${this.getFullServerAddress}/Bioskop/Register`, user).then(res => success = res.data.successfull ).catch(()=> success = false)
        return success
      },
      checkIfUsernameAvailable: async function(username) {
        let poruka = "";
        await axios
          .post(`${this.getFullServerAddress}/Bioskop/UniqueUsername`, { username: username })
          .then(res => {
            //console.log(res.data)
            if (res.data.available) poruka = res.data.available;
            else poruka = "Username je zauzet";
          })
          .catch(() => (poruka = "serverski problem"));
        //console.log(poruka)
        return poruka;
      }
    },
    computed:{
      ...mapGetters(['getFullServerAddress'])
    },
    watch:{
      visible: function(){
        if(!this.visible){
          this.$refs.registerForm.reset()
          this.form.valid = false
        }
      }
    }
  };
</script>

<style>
</style>
