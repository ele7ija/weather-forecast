<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.id"
          :cols='12'
          lg='2'
          md='3'
          sm='6'
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