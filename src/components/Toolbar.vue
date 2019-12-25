<template>
  <div>
    <v-app-bar app elevate-on-scroll dark color="primary" class="pr-12">
      <v-app-bar-nav-icon @click="navigationDrawerData.open = !navigationDrawerData.open" />
      <v-toolbar-title>Bioskop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu right>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>Registruj se
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <p>
                  Neke funkcionalnosti aplikacije su nedostupne neulogovanim korisnicima.
                  <br />Prijavite se ili registrujte ako vec nemate nalog
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text>Login</v-btn>
            <v-btn text>Logout</v-btn>
            <v-spacer></v-spacer>
            <RegisterDialog />
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="navigationDrawerData.open">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Bioskop</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in navigationDrawerData.items" :key="item.title" :href="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import RegisterDialog from "./RegisterDialog";
  export default {
    name: "Toolbar",
    components: { RegisterDialog },
    data() {
      return {
        navigationDrawerData: {
          open: false,
          items: [{ title: "Pocetna", icon: "mdi-home", link: "/" }]
        }
      };
    },
    methods: {}
  };
</script>

<style>
</style>
