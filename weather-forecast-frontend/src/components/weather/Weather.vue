<template>
  <div>
    <v-container fluid class='pt-0'>
      <v-row dense>
        <!-- CARDS -->
        <v-col
          lg=6
          md=6
          sm=12>
          <v-row dense>
            <v-col
              v-for="card in cards"
              :key="card.id"
              cols='6'
              lg='3'
              md='4'
              sm='6'>
              <v-scroll-y-transition
                v-if='card.type==="search"'>
                <SearchCard
                  v-show='show'
                  v-bind:card='card'>
                </SearchCard>
              </v-scroll-y-transition>
              <v-scroll-x-transition
                v-if='card.type==="view"'>
                <ViewCard
                  v-show='show'
                  v-bind:card='card'>
                </ViewCard>
              </v-scroll-x-transition>
            </v-col>
          </v-row>
        </v-col>
        <!-- GRAPH -->
        <v-col
          lg=6
          md=6
          sm=12>
          <v-container class='pa-0'>
            <v-row dense justify='center'>
              <v-col lg=11 md=11 sm=12>
                <v-card>
                  <v-card-text>
                    <GraphSelectors>
                    </GraphSelectors>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense justify='center'>
              <v-col lg=11 md=11 sm=12>
                <v-card>
                  <v-card-text>
                    <Graph>
                    </Graph>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SearchCard from '@/components/weather/cards/SearchCard'
import ViewCard from '@/components/weather/cards/ViewCard'
import Graph from '@/components/weather/graph/Graph'
import GraphSelectors from './graph/GraphSelectors'


export default {
  name: 'Weather',
  components: {
    SearchCard,
    ViewCard,
    Graph,
    GraphSelectors
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