<template>
  <v-container class='pa-0 pl-2 pr-2 pt-2'>
    <v-row>
      <v-col
        lg=6
        md=6
        sm=12
        class='pa-0 pl-3 pr-6'>
        <v-select
          v-model="selectedWeatherAspect"
          :items="weatherAspects"
          label="Weather data"
        >
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-col>
      <v-col
        lg=6
        md=6
        sm=12
        class='pa-0 pr-3 pl-6'>
        <v-select
          v-model="selectedTimeframe"
          :items="timeframes"
          label="Time frame"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ model.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GraphSelectors',
  data: () => ({
  }),
  computed: {
    selectedWeatherAspect: {
      get() {
        return this.$store.state.weather.selectedWeatherAspect;
      },
      set(value) {
        this.$store.commit('weather/setSelectedWeatherAspect', value)
      }
    },
    selectedTimeframe: {
      get() {
        return this.$store.state.weather.selectedTimeframe;
      },
      set(value) {
        this.$store.commit('weather/setSelectedTimeframe', value)
      }
    },
    ...mapState('weather', [
      'weatherAspects',
      'timeframes',
    ]),
  },
  methods: {
    ...mapMutations('weather', [
      'setSelectedTimeframe',
      'setSelectedWeatherAspect'
    ])
  }
}
</script>

<style>
  .v-text-field__details {
  display: none;
}
   .v-text-field {
     padding: 0
   }
</style>