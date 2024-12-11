import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import LeftNav from "@/components/common/LeftNav.vue";
import SuccessAlert from "@/components/Modal/alert.vue";
import alert from "@/components/Modal/alert.vue";
import Loading from "@/components/common/Loading.vue";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('LeftNav', LeftNav)
  .component('SuccessAlert', SuccessAlert)
  .component('alert', alert)
  .component("LoadingView", Loading)

app.mount('#app')
