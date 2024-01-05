import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import axios from 'axios'
import { createPinia } from "pinia"
import ClickOutside from './utils/ClickOutsideDirective'
import vue3GoogleLogin from 'vue3-google-login'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// import "@/plugins/myComponents";
import globalComponents from './plugins/myComponents'

// fontawesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

const vuetify = createVuetify({
  components,
  directives,
})

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/scss/index.scss'

const pinia = createPinia()
window.Kakao.init("0bbc5d89494326867c3ccbffa49e7428");

const app = createApp(App)
app.provide('$axios', axios)
// app.config.globalProperties.$axios = axios; 
app.use(vue3GoogleLogin, 
  { 
    clientId: '31662281107-vifc3im7p4vqm4gr1giabglve55egere.apps.googleusercontent.com', 
    scope: 'email', 
    prompt: 'consent', 
    fetch_basic_profile: false 
  }
)
app.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).use(ElementPlus).use(vuetify).use(pinia).use(router).use(globalComponents).mount('#app')
app.directive('click-outside', ClickOutside)
