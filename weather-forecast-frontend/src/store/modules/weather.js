
const state = {
  cards: [{
    id: 0,
    type: 'search',  // Allowed card types: search, view
    title: 'Location search'
  }],
  idcounter: 0,
  timeframes: 5,
  selectedTimeframe: 5,
  weatherAspects: ['Temperature', 'Air pressure', 'Humidity', 'Windiness'],
  selectedWeatherAspect: 'Temperature'
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
  addCard(state, payload) {
    state.idcounter += 1;
    payload.id = state.idcounter;
    if (state.cards.length==1){
      state.cards.unshift(payload);
      return;
    }
    if (state.cards.length==0){
      console.log('Error while adding a new card');
    }
    state.cards.splice(state.cards.length-1, 0, payload);
  },
  removeCard(state, payload) {
    for (let i = 0; i < state.cards.length; i++){
      if (state.cards[i].id === payload){
        state.cards.splice(i, 1);
        return;
      }
    }

  },
  setSelectedTimeframe(state, payload) {
    state.selectedTimeframe = payload;
  },
  setSelectedWeatherAspect(state, payload) {
    state.selectedWeatherAspect = payload;
  }
}

// asynchronous
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}