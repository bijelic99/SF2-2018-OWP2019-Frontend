<template>
    <v-dialog v-model="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn text @click="openDialog">LOGIN</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
        <v-btn icon dark @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-list class="mx-12 mt-2">
        <v-list-item>
          <v-list-item-content>
            <v-form ref="loginForm" v-model="form.valid">
              <v-text-field
                v-model="form.username"
                :rules="formRules"
                label="Username"
              />
              <v-text-field v-model="form.password" :rules="formRules" label="Password" type="password" />
              <v-btn :disabled="!form.valid" color="secondary" class="mr-4" @click="submit">Login</v-btn>
            </v-form>
            <v-snackbar app :timeout="componentData.snackbarGeneral.timeout" color="success" dark v-model="componentData.successSnackbar.open">
                Uspesan Login
              <v-btn text @click="componentData.successSnackbar.open = false">Close</v-btn>
            </v-snackbar>
            <v-snackbar :timeout="componentData.snackbarGeneral.timeout" color="error" dark v-model="componentData.failSnackbar.open">
                Username ili password su pogresni
              <v-btn text @click="componentData.failSnackbar.open = false">Close</v-btn>
            </v-snackbar>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      </v-card>
    </v-dialog>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'LoginDialog',
    data() {
      return {
        visible: false,
        form: {
          username: "",
          password: "",
          valid: false
        },
        formRules: [
          value => value+"".trim() === "" ? "Polje ne sme biti prazno" : true
        ],
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
        
      }
    },
    methods: {
      ...mapActions(['login']),
      openDialog: function(e) {
        e.stopPropagation();
        this.visible = true;
      },
      submit: async function () {
        if(await this.login({'username': this.form.username, 'password': this.form.password})) {
          this.form.username = ''
          this.form.password = ''
          this.componentData.successSnackbar.open = true
          this.visible = false
        }
        else {
          this.form.password = ''
          this.componentData.failSnackbar.open = true}
      }
    }    
  }
</script>
<style>

</style>