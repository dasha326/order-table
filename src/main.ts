import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles'
import { vMaska } from "maska"

createApp(App)
    .use(store)
    .directive("maska", vMaska)
    .mount('#app')
