<template>
  <div>
    <v-app-bar app elevate-on-scroll dark color="primary" class="pr-12">
      <v-app-bar-nav-icon @click="navigationDrawerData.open = !navigationDrawerData.open" />
      <v-toolbar-title>Bioskop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu right>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon><span v-if="getIsLoggedIn">{{getCurrentUserUsername}}</span><span v-else>Registruj se</span>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content :class="getIsLoggedIn ? 'w-25' : ''">
                <p v-if="!getIsLoggedIn">
                  Neke funkcionalnosti aplikacije su nedostupne neulogovanim korisnicima.
                  <br />Prijavite se ili registrujte ako vec nemate nalog
                </p>
                <span v-else><v-icon>mdi-account</v-icon> {{getCurrentUserUsername}}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <LoginDialog v-if="!getIsLoggedIn" />
            <v-spacer></v-spacer>
            <LogoutDialog v-if="getIsLoggedIn" />
            <RegisterDialog v-if="!getIsLoggedIn" />
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
        <v-list-item v-for="item in visibleNavItems" :key="item.title" :to="item.link" link >
          <v-list-item-icon>
            <v-icon class="secondary--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="secondary--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import RegisterDialog from "./AccountControlComponents/RegisterDialog";
  import LoginDialog from './AccountControlComponents/LoginDialog'
  import LogoutDialog from './AccountControlComponents/LogoutDialog'
  import { mapGetters } from 'vuex'
  export default {
    name: "Toolbar",
    components: { RegisterDialog, LoginDialog, LogoutDialog },
    data() {
      return {
        navigationDrawerData: {
          open: false,
          items: [{ title: "Pocetna", icon: "mdi-home", link: "/", visibleForCurrentUser: ()=>true },
                  { title: "Filmovi", icon: "mdi-movie", link: "/Filmovi", visibleForCurrentUser: ()=>true },
                  { title: "Projekcije", icon: "mdi-movie-roll", link: "/", visibleForCurrentUser: ()=>true },
                  { title: "Rezervacija Karte", icon: "mdi-ticket", link: "/", visibleForCurrentUser: ()=>this.getCurrentUserUloga === 'Obican'},
                  { title: "Dodaj film", icon: "mdi-plus", link: "/AddFilm", visibleForCurrentUser: ()=>this.getCurrentUserUloga === 'Admin'},
                  { title: "Korisnici", icon: "mdi-account-multiple", link: "/Korisnici", visibleForCurrentUser: ()=>this.getCurrentUserUloga === 'Admin' },
          ]
        }
      };
    },
    computed:{
      ...mapGetters(['getIsLoggedIn', 'getCurrentUserUloga', 'getCurrentUserUsername']),
      visibleNavItems: function () {
        //console.log(this.navigationDrawerData.items.filter(item=> item.visibleForCurrentUser()))
        return this.navigationDrawerData.items.filter(item=> item.visibleForCurrentUser())
      }
    },
    methods: {}
  };
</script>

<style>
  .w-25{
    width: 25vw
  }
</style>
