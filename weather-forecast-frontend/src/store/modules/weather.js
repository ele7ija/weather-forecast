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
    let newCard = {
      type: payload.type,
      location: payload.location 
    };
    if (state.cards.length==1){
      state.cards.unshift(newCard);
      return;
    }
    if (state.cards.length==0){
      console.log('Error while adding a new card');
    }
    state.cards.splice(state.cards.length-1, 0, newCard);
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