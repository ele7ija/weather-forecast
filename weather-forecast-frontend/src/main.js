import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'es6-promise/auto'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  render: h => h(App),
  // root store injection, access by this.$store
  store,
}).$mount('#app')


