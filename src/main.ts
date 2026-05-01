import './styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useMasterDataStore } from '@/store/modules/masterData'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

const masterDataStore = useMasterDataStore()
masterDataStore.fetchMasterData()
