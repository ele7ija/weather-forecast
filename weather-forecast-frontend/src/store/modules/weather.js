import owm from '../../api/owm';

const state = {
  count: 0,
  weather: NaN
}

const getters = {
  
}

// synchronous
const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--,
  setWeather(state, newWeather) {
    state.weather = newWeather
  } 
}

// asynchronous
const actions = {
  getCurrentWeather ({commit}, cityId){
    owm.getCurrentWeather(
      cityId,
      (newWeather) => commit('setWeather', newWeather),
      (error) => console.log(error)
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}