import Vue from 'vue'
import App from './App.vue'
import router from '../src/router/index'
import store from '../src/store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.APP_URL

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
