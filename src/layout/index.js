import DefaultLayout from './default.vue'
import LoginLayout from './login.vue'

export default {
  install(Vue) {
    Vue.component('default-layout', DefaultLayout)
    Vue.component('login-layout', LoginLayout)
  }
}
