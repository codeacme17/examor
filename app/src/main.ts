import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import '@/assets/main.scss'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
