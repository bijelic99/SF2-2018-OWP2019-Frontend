<template>
    <v-container class="fill-height">
        <v-card width="100%" class="fill-height">
            <v-card-title>
                {{user.username}}
            </v-card-title>
            <v-card-subtitle>
              {{user.uloga}} korisnik
            </v-card-subtitle>
              <v-list-item v-if="getIsLoggedIn && (getCurrentUserId === user.id || getCurrentUserUloga === 'Admin')">
                  <v-list-item-content>
                    <v-list-item-title>Sifra:</v-list-item-title><v-list-item-content>
                      <v-form width="100%" v-model="componentData.passwordFormValid">
                        <v-row justify="start" align="center">
                          <v-col fluid lg="10" md="8"><v-text-field @input="pwdChanged()" type="password" v-model="user.password" :rules="componentData.passwordTextFieldRules"/></v-col>
                          <v-col fluid lg="1" md="4"><v-btn @click="changeSubmit()" color="secondary--text" text :disabled="!this.componentData.passwordChanged ? true : !this.componentData.passwordFormValid">Izmeni</v-btn></v-col>
                        </v-row>
                      </v-form>
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin'">
                  <v-list-item-content>
                    <v-list-item-title>Uloga:</v-list-item-title><v-list-item-content>
                      <v-form width="100%">
                        <v-row justify="start" align="center">
                          <v-col fluid lg="10" md="8" ><v-select :items="componentData.uloge" v-model="user.uloga" @input="componentData.roleChanged = true"/></v-col>
                          <v-col fluid lg="1" md="4"><v-btn @click="changeSubmit()" color="secondary--text" text :disabled="!this.componentData.roleChanged">Izmeni</v-btn></v-col>
                        </v-row>
                      </v-form>
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                  <v-list-item-content><v-list-item-title>Vreme registracije:</v-list-item-title><v-list-item-content>{{user.datumRegistracije ? user.datumRegistracije.toLocaleString() : ""}}</v-list-item-content></v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Obrisan:</v-list-item-title><v-list-item-content>{{user.obrisan ? 'Da' : 'Ne'}}</v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Kupljene karte:</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
        </v-card>
        <DeleteKorisnikDialog v-if="getIsLoggedIn && getCurrentUserUloga === 'Admin' && getCurrentUserId !== user.id" :korisnik="user"/>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeleteKorisnikDialog from '../components/DeleteItemComponents/DeleteKorisnikDialog'
import axios from 'axios'
export default {
	name: 'Korisnik',
	components:{
		DeleteKorisnikDialog
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			user: {},
			componentData: {
				passwordFormValid: false,
				passwordChanged: false,
				roleChanged: false,
				passwordTextFieldRules: [
					value => value+"".trim() === "" ? "Polje ne sme biti prazno" : true,
					value => (value+"").trim().length<8? "Sifra mora da ima vise od 8 karaktera":true
				],
				uloge: [
					{ 
						text: 'Admin',
						value: 'Admin'
					},
					{ 
						text: 'Obican',
						value: 'Obican'
					},
				]
			}
		}
	},
	methods:{
		...mapActions(['fetchUsers', 'updateUser']),
		pwdChanged() {
			this.componentData.passwordChanged = true
		},
		changeSubmit(){
			if (this.updateUser(this.user)){
				this.componentData.passwordChanged = false
				this.componentData.roleChanged = false
			}
		}
	},
	computed: {
		...mapGetters(['getUser', 'getAllUsers', 'getIsLoggedIn', 'getCurrentUserUloga', 'getCurrentUserId', 'getIfUserIdInUsers', 'getFullServerAddress'])
	},
	async mounted(){
		if(this.getAllUsers.length === 0) await this.fetchUsers()
		if(this.getIfUserIdInUsers(Number.parseInt(this.id))){
			this.user = JSON.parse(JSON.stringify(this.getUser(Number.parseInt(this.id))))
			this.user.datumRegistracije = new Date(this.user.datumRegistracije)
		}
		else{
			axios.get(`${this.getFullServerAddress}/Korisnik?id=${this.id}`).then(res=>{
				this.user = res.data
				this.user.datumRegistracije = new Date(this.user.datumRegistracije)
			}).catch(()=>{
				this.$router.push('/')
			})
		}
	}

}
</script>

<style>
  
</style>