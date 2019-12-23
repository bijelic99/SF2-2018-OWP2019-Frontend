<template>
    <v-app-bar app dark color="primary" class="pr-12">
        <v-app-bar-nav-icon/>
        <v-toolbar-title>Bioskop</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu right>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
            Registruj se
          </v-btn>
        </template>
        <v-card>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <p>Neke funkcionalnosti aplikacije su nedostupne neulogovanim korisnicima.<br>Prijavite se ili registrujte ako vec nemate nalog</p>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn text >Login</v-btn>
            <v-btn text >Logout</v-btn>
            <v-spacer></v-spacer>
            <RegisterDialog/>
        </v-card-actions>
      </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
  import RegisterDialog from './RegisterDialog'
  export default {
    name: 'Toolbar',
    components: { RegisterDialog }
  }
</script>

<style>

</style>
