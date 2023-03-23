import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import components from './components'

import CardZ from './components/ui/cards/CardZ.vue'

const app = createApp(App)

components.forEach(c => app.component(c.name, c));

app.component("CardZ", CardZ)

app.use(createPinia())
app.use(router)

app.mount('#app')
