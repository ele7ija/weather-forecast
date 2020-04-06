import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'es6-promise/auto'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify
}).$mount('#app')


