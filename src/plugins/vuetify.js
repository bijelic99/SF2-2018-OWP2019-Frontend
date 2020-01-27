import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

let vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6a2109',
        secondary: '#6c80a1',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
      }
    },
    options: {
      customProperties: true,
    },
  }
})


export default vuetify
