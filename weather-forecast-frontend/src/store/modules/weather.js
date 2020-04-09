import owm from '../../api/owm';

const state = {
  count: 0,
  weather: NaN,
  cards: [{
    id: 0,
    type: 'search',  // Allowed card types: search, preview, view
    title: 'Location search'
  }]
}

const getters = {
  getCards: (state) => { 
    return state.cards 
  },
  getCard: (state, cardId) => { 
    return state.cards.filter(card => card.id === cardId) 
  },
}

// synchronous
const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--,
  setWeather(state, newWeather) {
    state.weather = newWeather
  },
  addCard(state, payload) {
    state.cards.unshift({
      type: payload.type,
      location: payload.location 
    })
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