import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

import * as zh from './zh-CN'
import * as en from './en'

const message = {
  cn: {
    ...zh.zhCN,
  },
  en: {
    ...en.en,
  },
}

const lang = useStorage('local-lang', navigator.language)

const i18n = createI18n({
  locale: lang.value,
  legacy: false,
  globalInjection: true,
  messages: message,
})

export default i18n
