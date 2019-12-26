import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

let vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ffc107',
        secondary: '#ff9800',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
      }
    }
  }
})


export default vuetify
