<template>
  <v-list-item>
      <v-list-item-title>
          {{title}}
      </v-list-item-title>
    <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field
                dense
                class="mr-2"
                v-model="date"
                label="Datum"
                readonly
                v-on="on"/>
        </template>
        <v-date-picker v-model="date" @input="dateMenu = false"/>
    </v-menu>
    <v-menu
        v-model="timeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field
                dense
                v-model="time"
                label="Vreme"
                readonly
                v-on="on"/>
        </template>
        <v-time-picker v-model="time" @input="timeMenu = false"/>
    </v-menu>
    <v-list-item-action>
        <v-btn icon @click="clear()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import moment from 'moment'
export default {
	name: 'DateTimePicker',
	props: {
		title: {
			type: String,
			required: false,
			default: ''
		}
	},
	data(){
		return {
			date: null,
			time: null,
			dateMenu: false,
			timeMenu: false
		}
	},
	methods:{
		clear(){
			this.date = null
			this.time = null
		}
	},
	computed:{
		dateTime(){
			if(this.date !== null && this.time !== null){
				return moment(`${this.date} ${this.time}`).toDate()
			}
			else return null
		}
	},
	watch:{
		dateTime(){
			this.$emit('dateTimeSet', this.dateTime)
		}
	}
}
</script>

<style>

</style>