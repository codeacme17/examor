import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import i18n from './i18n'
import pinia from '@/store'
import router from '@/router'

import type { App } from 'vue'

export function registerPlugins(app: App) {
  loadFonts()
  app.use(i18n).use(vuetify).use(router).use(pinia)
}
