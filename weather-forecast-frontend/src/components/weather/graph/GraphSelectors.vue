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
          outlined
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
        <!-- <v-select
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
        </v-select> -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="selectedTimeframe"
              label="Time frame"
              append-icon="mdi-calendar"
              readonly
              v-on="on"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="selectedTimeframe" 
            @input="menu = false"
            :min='minDate'
            :max="maxDate"
            ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'GraphSelectors',
  data: () => ({
    menu: false,
    date: '',
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
    maxDate: function() {
      let today = new Date();
      let fiveAdvance = new Date();
      fiveAdvance.setDate(today.getDate() + 5);
      return fiveAdvance.toISOString();
    },
    minDate: function() {
      let today = new Date();
      return today.toISOString();
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
    ]),
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,

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