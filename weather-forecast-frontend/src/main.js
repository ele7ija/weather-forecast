import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'es6-promise/auto'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: `${process.env.VUE_APP_GOOGLE_APIKEY}`,
});
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify
}).$mount('#app')


