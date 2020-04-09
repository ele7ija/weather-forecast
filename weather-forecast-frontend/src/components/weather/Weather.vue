<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.id"
          :cols='3'
        >
          <v-scroll-y-transition>
            <SearchCard 
              v-if='card.type==="search"'
              v-show='show'
              v-bind:card='card'>
            </SearchCard>
          </v-scroll-y-transition>
          <v-scroll-x-transition>
            <ViewCard
              v-if='card.type==="view"'
              v-show='show'
              v-bind:card='card'>
            </ViewCard>
          </v-scroll-x-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SearchCard from '@/components/weather/cards/SearchCard'
import ViewCard from '@/components/weather/cards/ViewCard'


export default {
  name: 'Weather',
  components: {
    SearchCard,
    ViewCard
  },
  data: () => ({
    tcards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
    show: false
  }),
  computed: {
    ...mapState({
      cards: state => state.weather.cards
    })
  },
  methods: {
    ...mapGetters({
      getCards: 'weather/getCards'
    })
  },
  created() {
    // Animacije
    setTimeout(() => this.show=true, 200)
  }
}
</script>

<style>

</style>