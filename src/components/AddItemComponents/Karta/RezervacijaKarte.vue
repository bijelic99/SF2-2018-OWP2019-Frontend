<template>
  <v-container class="elevation-2">
    <v-row class="elevation-2">
      <v-col>
        <h1 class="title font-weight-bold">Rezervacija Karte</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="` col-lg-10 col-md-12  fill-height`">
        <v-form v-model="formData.formValid">
          <v-stepper v-model="formData.stepperStep" vertical>
            <v-stepper-step step="1" :complete="formData.stepperStep > 1">Izaberi film</v-stepper-step>

            <v-stepper-content step="1">
              <v-card>
                <v-list-item>
                  <v-autocomplete :items="filmovi" v-model="formData.izabranFilm" :rules="formData.filmAutocompleteRules"/>
                </v-list-item>
                <v-card-actions>
                  <v-spacer />
                  <v-btn class="secondary" @click="formData.stepperStep+=1" :disabled="formData.izabranFilm === null">Dalje</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step step="2" :complete="formData.stepperStep > 2">Izaberi projekciju</v-stepper-step>

            <v-stepper-content step="2">
              <v-card>
                <v-list-item>
                  <v-autocomplete :items="projekcije" v-model="formData.izabranaProjekcija" :rules="formData.projekcijaAutocompleteRules">
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-content>
                          <v-list-item-title>{{data.item.value.tipProjekcije.naziv}} {{strVreme(data.item.value.datumVremePrikazivanja)}}</v-list-item-title>
                          <v-list-item-subtitle>Sala: {{data.item.value.sala.naziv}} Cena karte: {{data.item.value.cenaKarte}}</v-list-item-subtitle>
                          <v-list-item-action-text>Datum: {{strDatum(data.item.value.datumVremePrikazivanja)}}</v-list-item-action-text>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-list-item>
                <v-card-actions>
                  <v-spacer />
                  <v-btn class="secondary" @click="formData.stepperStep+=1" :disabled="formData.izabranaProjekcija === null">Dalje</v-btn>
                  <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step step="3" :complete="formData.stepperStep > 3">Izaberi sedista</v-stepper-step>

            <v-stepper-content step="3">
              <v-card>
                <v-list-item>
                  <v-container fluid>
                    <v-row justify="center">
                      <v-col cols="12" class="cinemaScreen mb-4" align="center">
                        <v-icon size="x-large" class="white--text">mdi-projector-screen</v-icon>
                      </v-col>
                    </v-row>
                    <v-row
                      fluid
                      v-if="formData.izabranaProjekcija"
                      class="rezervacijaContainer"
                      :style="`grid-template-columns: repeat(${numberOfColumns}, 1fr); `"
                    >
                      <div
                        :class="`sediste font-weight-medium ${!sediste.zauzeto ? 'slobodno' : 'zauzeto'} ${sediste.izabrano ? 'izabrano' : ''} ${sediste.dostupno ? 'dostupno' : ''}`"
                        v-for="sediste in formData.sedista"
                        :key="sediste.redniBroj"
                        @click="izaberiSediste(sediste.id)"
                        @dblclick="resetujSelekciju"
                      >{{sediste.redniBroj}}</div>
                    </v-row>
                  </v-container>
                </v-list-item>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="secondary"
                    @click="formData.stepperStep+=1"
                    :disabled="izabranaSedista.length<1"
                  >Dalje</v-btn>
                  <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step
              step="4"
              :complete="formData.stepperStep > 4"
            >Pregled rezervacije i kupovina karte</v-stepper-step>

            <v-stepper-content step="4">
              <v-card>
                <v-list-item>
                  <v-container fluid>
                    <v-row class="elevation-2 mb-4" justify="space-between" v-if="formData.izabranFilm && formData.izabranaProjekcija">
                      <v-col class="primary--text col-lg-6 col-md-8">
                        <span class="headline font-weight-medium">
                        <router-link
                          :to="`/Film/${formData.izabranFilm.Id}`"
                        >{{formData.izabranFilm.naziv}}</router-link>,  {{formData.izabranaProjekcija.tipProjekcije.naziv}} u {{vremePrikazivanja}} </span>
                        <span class="subtitle-2 font-weight-light">{{datumPrikazivanja}}</span>
                      </v-col>
                      <v-col class="col-lg-2 col-md-4 headline font-weight-medium text-end primary--text ">
                        Sala {{formData.izabranaProjekcija.sala.naziv}}
                      </v-col>
                    </v-row>
                    <v-row v-if="formData.izabranaProjekcija">
                      <v-col class="cols-4 text-start">Cena jedne karte:</v-col>
                      <v-col class="cols-8 text-end">{{formData.izabranaProjekcija.cenaKarte}}</v-col>
                    </v-row>
                    <v-row v-if="formData.izabranaProjekcija">
                      <v-col class="cols-4 text-start">Broj sedista:</v-col>
                      <v-col class="cols-8 text-end">{{izabranaSedista.length}}</v-col>
                    </v-row>
                    <v-row v-if="formData.izabranaProjekcija" class="font-weight-bold title">
                      <v-col class="cols-4 text-start">Ukupno:</v-col>
                      <v-col class="cols-8 text-end">{{izabranaSedista.length * formData.izabranaProjekcija.cenaKarte}}</v-col>
                    </v-row>
                  </v-container>
                </v-list-item>
                <v-card-actions>
                  <v-spacer />
                  <v-btn class="secondary" @click="kupi()" :disabled="!formData.formValid && izabranaSedista.length<1">Kupi</v-btn>
                  <v-btn class="primary--text" @click="formData.stepperStep-=1">Nazad</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-col>
      <v-col :class="` col-lg-2 col-md-12 fill-height`">
        <v-card class="elevation-2">
          <v-card-title>Podaci o rezervaciji:</v-card-title>
          <v-list-item v-if="formData.izabranFilm">
            Film:
            <router-link :to="`/Film/${formData.izabranFilm.id}`">{{formData.izabranFilm.naziv}}</router-link>
          </v-list-item>
          <v-list-item v-if="formData.izabranaProjekcija">Vreme projekcije: {{vremePrikazivanja}}</v-list-item>
          <v-list-item v-if="formData.izabranaProjekcija">Datum projekcije: {{datumPrikazivanja}}</v-list-item>
          <v-list-item
            v-if="formData.izabranaProjekcija"
          >Tip projekcije: {{formData.izabranaProjekcija.tipProjekcije.naziv}}</v-list-item>
          <v-list-item
            v-if="formData.izabranaProjekcija"
          >Sala: {{formData.izabranaProjekcija.sala.naziv}}</v-list-item>
          <v-list-item
            v-if="formData.izabranaProjekcija"
          >Cena jedne karte: {{formData.izabranaProjekcija.cenaKarte}}</v-list-item>
          <v-list-item v-if="formData.izabranaProjekcija">Broj sedista: {{izabranaSedista.length}}</v-list-item>
          <v-list-item
            v-if="formData.izabranaProjekcija"
          >Ukupno: {{izabranaSedista.length * formData.izabranaProjekcija.cenaKarte}}</v-list-item>
          <v-list-item
            v-if="formData.izabranaProjekcija"
          ><router-link :to="`/Projekcija/${formData.izabranaProjekcija.id}`">Link do projekcije</router-link></v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="formData.dialogVisible" max-width="80vw" width="40%">
      <v-card>
        <v-card-title :class="`headline white--text ${formData.dialogContent.tip}`"
        primary-title>
          {{formData.dialogContent.naslov}}
        </v-card-title>
        <v-card-text class="pt-2 body-1">
          {{formData.dialogContent.text}}
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary--text"
            text
            @click="sakrijDialog()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
	name: "RezervacijaKarte",
	props: {
		film: {
			type: Object,
			required: false,
			default: null
		},
		projekcija: {
			type: Object,
			required: false,
			default: null
		}
	},
	data() {
		return {
			karte: [],
			formData: {
				izabranFilm: null,
				izabranaProjekcija: null,
				stepperStep: 1,
				formValid: false,
				sedista: [],
				filmAutocompleteRules: [
					f=> f !== null || 'Morate izabrati film'
				],
				projekcijaAutocompleteRules:[
					p=>p !== null || 'Morate izabrati projekciju'
				],
				dialogVisible: false,
				dialogContent: {
					naslov: '',
					text: '',
					tip: 'alert'
				}
			}
		};
	},
	methods: {
		...mapActions(["fetchFilmovi", "fetchProjekcije", "fetchZauzetost", "rezervisiKarte"]),
		async loadData(){
			await this.fetchFilmovi()
			await this.fetchProjekcije()
			await this.fetchZauzetost()
		},
		sakrijDialog(){
			this.formData.dialogVisible = false
			if(this.formData.dialogContent.tip === 'success')this.$router.push("/")
		},
		async kupi() {
			if(this.getIsLoggedIn){
				var karte = []
				var projekcija = JSON.parse(JSON.stringify(this.formData.izabranaProjekcija))
				delete projekcija.prosla
				this.izabranaSedista.forEach(s=>{
					var karta = {
						projekcija: projekcija, 
						sediste: {
							id: s.id,
							redniBroj: s.redniBroj,
							sala: s.sala
						},
						korisnik: this.getCurrentUser,
						datumVremeProdaje: Date.now()
					}
					karte.push(karta)
				})
				if(await this.rezervisiKarte(karte)){
					this.formData.dialogContent = {
						naslov: 'Uspeh',
						text: 'Uspesno ste rezervisali kartu.',
						tip: 'success'
					}
					this.formData.dialogVisible = true
				}
				else{
            
					this.formData.dialogContent = {
						naslov: 'Greska',
						text: 'Doslo je do greske ili je neko u medjuvremenu zauzeo sediste!',
						tip: 'error'
					}
					await this.sakrijDialog()
					this.formData.dialogVisible = true
					this.formData.stepperStep = 3
				}
			}
		},
		strVreme(vreme) {
			return moment(vreme).format("H:mm");
		},
		strDatum(vreme) {
			return moment(vreme).format("D-M-YYYY");
		},
		izaberiSediste(sedisteId) {
			var index = this.formData.sedista.findIndex(s => s.id === sedisteId);
			var sediste = this.formData.sedista[index];
			if (this.formData.sedista.filter(s => s.izabrano).length === 0) {
				if (!sediste.zauzeto) {
					sediste.izabrano = true;
					sediste.dostupno = false;
					this.oznaciDostupna();
				}
			} else if (!sediste.izabrano && sediste.dostupno) {
				sediste.izabrano = true;
				sediste.dostupno = false;
				this.oznaciDostupna();
			}
		},
		oznaciDostupna() {
			var hasLessThan20 = this.formData.sedista.length < 20;
			for (var i = 0; i < this.formData.sedista.length; i++) {
				var endOfRow = !hasLessThan20;
				var startOfRow = !hasLessThan20;
				if (!hasLessThan20) {
					if (i > 0) {
						startOfRow =
							startOfRow && this.formData.sedista[i - 1].redniBroj % 20 === 0;
					}

					if (i < this.formData.sedista.length - 1)
						endOfRow =
							endOfRow && this.formData.sedista[i + 1].redniBroj % 20 === 1;
					if (this.formData.sedista[i].izabrano) {
						if (i > 0) {
							if (
								!this.formData.sedista[i - 1].izabrano &&
								!this.formData.sedista[i - 1].zauzeto &&
								!startOfRow
							)
								this.formData.sedista[i - 1].dostupno = true;
						}
						if (i < this.formData.sedista.length - 1) {
							if (
								!this.formData.sedista[i + 1].izabrano &&
								!this.formData.sedista[i + 1].zauzeto &&
								!endOfRow
							)
								this.formData.sedista[i + 1].dostupno = true;
						}
					}
				} else {
					if (this.formData.sedista[i].izabrano) {
						if (i > 0) {
							if (
								!this.formData.sedista[i - 1].izabrano &&
								!this.formData.sedista[i - 1].zauzeto
							)
								this.formData.sedista[i - 1].dostupno = true;
						}
						if (i < this.formData.sedista.length - 1) {
							if (
								!this.formData.sedista[i + 1].izabrano &&
								!this.formData.sedista[i + 1].zauzeto
							)
								this.formData.sedista[i + 1].dostupno = true;
						}
					}
				}
			}
		},
		resetujSelekciju() {
			this.formData.sedista.map(s => {
				s.izabrano = false;
				s.dostupno = false;
			});
		}
	},
	computed: {
		...mapGetters([
			"allFilmovi",
			"allProjekcije",
			"getFilmHasProjekcijaInFuture",
			"getProjekcijeForFilmInFuture",
			"getZauzetost",
			"getZauzetostForProjekcija",
			"getFilmHasFreeProjekcijeInFuture",
			"getCurrentUser",
			"getIsLoggedIn"
		]),
		filmovi: function() {
			return this.allFilmovi
				.filter(f => this.getFilmHasProjekcijaInFuture(f.id))
				.filter(f => this.getFilmHasFreeProjekcijeInFuture(f.id))
				.map(f => {
					var item = new Object();
					item["text"] = f.naziv;
					item["value"] = f;
					return item;
				});
		},
		projekcije: function() {
			return this.formData.izabranFilm
				? this.getProjekcijeForFilmInFuture(this.formData.izabranFilm.id)
					.filter(
						p =>
							this.getZauzetostForProjekcija(p.id).filter(z => !z.zauzeto)
								.length > 0
					).sort((t1, t2)=>{
						return moment(t1.datumVremePrikazivanja).isBefore(t2.datumVremePrikazivanja) ? -1 : moment(t1.datumVremePrikazivanja).isAfter(t2.datumVremePrikazivanja) ? 1 : 0
					})
					.map(p => {
						var item = new Object();
						item["text"] = `${p.tipProjekcije.naziv} ${moment(
							p.datumVremePrikazivanja
						).format("H:mm")}`;
						item["value"] = p;
						return item;
					})
				: [];
		},
		vremePrikazivanja() {
			return this.formData.izabranaProjekcija !== null
				? moment(
					this.formData.izabranaProjekcija.datumVremePrikazivanja
				).format("H:mm")
				: "";
		},
		datumPrikazivanja() {
			return this.formData.izabranaProjekcija !== null
				? moment(
					this.formData.izabranaProjekcija.datumVremePrikazivanja
				).format("D-M-YYYY")
				: "";
		},
		numberOfColumns: function() {
			var brojSedista = 10;
			if (this.formData.izabranaProjekcija)
				brojSedista = this.getZauzetostForProjekcija(
					this.formData.izabranaProjekcija.id
				).length;
			var br = 20;
			if (brojSedista < 20) br = brojSedista;

			return br;
		},
		izabranaSedista() {
			return this.formData.sedista.filter(s => s.izabrano);
		}
	},
	async mounted() {
		if (this.allFilmovi.length === 0) await this.fetchFilmovi();
		if (this.allProjekcije.length === 0) await this.fetchProjekcije();
		if (this.film !== null) {
			this.formData.izabranFilm = this.film
			this.formData.stepperStep = 2
		}
		if (this.projekcija !== null) {
			this.formData.izabranaProjekcija = this.projekcija;
			this.formData.stepperStep = 3
		}
      
		if (this.getZauzetost.size === 0) await this.fetchZauzetost();
	},
	watch: {
		film: function(){
			if (this.film !== null) {
				this.formData.izabranFilm = this.film
				this.formData.stepperStep = 2
			}
		},
		projekcija: function(){
			if (this.projekcija !== null) {
				this.formData.izabranaProjekcija = this.projekcija;
				this.formData.stepperStep = 3
			}
		},
		"formData.izabranFilm": function() {
			this.formData.izabranaProjekcija = null;
		},
		"formData.izabranaProjekcija": function() {
			if (this.formData.izabranaProjekcija !== null)
				this.formData.sedista = this.getZauzetostForProjekcija(
					this.formData.izabranaProjekcija.id
				).map(sediste => {
					return { ...sediste, izabrano: false, dostupno: false };
				});
			else this.formData.sedista = [];
		}
	}
};
</script>

<style>
.rezervacijaContainer {
  display: grid;
  grid-column-gap: 0.5vw;
  grid-row-gap: 0.2vw;
  grid-template-columns: repeat(1, 1fr);
  overflow: auto;
}

.cinemaScreen {
  background-color: var(--v-primary-base);
}

.sediste {
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  text-align: center;
}
.slobodno {
  background-color: var(--v-white-base);
  color: var(--v-primary-base);
}
.slobodno:hover,
.izabrano {
  background-color: var(--v-secondary-darken2);
  color: white;
}
.zauzeto {
  background-color: var(--v-primary-base);
  color: white;
}
.dostupno {
  background-color: var(--v-secondary-lighten1);
  color: white;
}
</style>