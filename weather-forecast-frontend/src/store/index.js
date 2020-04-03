import Vue from 'vue'
import Vuex from 'vuex'
import weather from './modules/weather'

Vue.use(Vuex)

// use to set up logging
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    weather
  }    
})