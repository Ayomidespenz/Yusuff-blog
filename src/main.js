import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Toast, {POSITION, TYPE} from "vue-toastification"
import "vue-toastification/dist/index.css"

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// AOS animations
import AOS from 'aos'
import 'aos/dist/aos.css'

const options = {
  position: POSITION.TOP_RIGHT,
  type: TYPE.SUCCESS  || TYPE.ERROR || TYPE.WARNING || TYPE.INFO
}

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast,options)

app.mount('#app') 