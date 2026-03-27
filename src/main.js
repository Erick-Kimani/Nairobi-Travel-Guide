import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// ✅ Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// ✅ Global CSS Imports
import '@/assets/login.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// ✅ Google Analytics 4
import VueGtag from 'vue-gtag'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// ✅ GA4 Configuration
app.use(VueGtag, {
  config: { id: 'G-HQN536QLH5' } // 👈 Your actual Measurement ID
}, router)

app.mount('#app')