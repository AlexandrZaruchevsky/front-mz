import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import components from './components'
import layouts from './layouts'

import CardZ from './components/ui/cards/CardZ.vue'
// import CardZV2 from './components/ui/cards/CardZV2.vue'

const app = createApp(App)

components.forEach(c => app.component(c.name, c));
layouts.forEach(l=>app.component(l.name,l));

app.component("CardZ", CardZ)
// app.component("CardZV2", CardZV2)

app.use(createPinia())
app.use(router)

app.mount('#app')
