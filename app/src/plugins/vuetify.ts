import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#7d09f1',
          secondary: '#03DAC6',
          'primary-darken-1': '#474787',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          gray: '#3f3f46',
        },
      },

      dark: {
        colors: {
          background: '#1e1e1e',
          surface: '#1e1e1e',
          primary: '#a858f9',
          secondary: '#03DAC6',
          'primary-darken-1': '#474787',
          'secondary-darken-1': '#018786',
          gray: '#71717a',
        },
      },
    },
  },
})
