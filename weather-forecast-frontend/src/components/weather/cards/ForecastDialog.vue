<template>
    <v-dialog
    v-model='$_dialog'
    width="unset"
    @keypress.esc='$_dialog=false'>
    <v-col>
      <v-card>
        <v-card-title>
          <v-row>
          <v-col align-self='end' lg=7 md=7 sm=7 xs=12 class='pl-6'>
            Forecast (3-hour): {{card.address.name + ', ' + card.address.country}}
          </v-col>
          <v-col class='pr-8' lg=5 md=5 sm=5 xs=12>
            <v-card outlined>
          <v-card-text>  
          <v-slider
          v-model="internalTimeframe"
          label="Days"
          thumb-color="accent"
          thumb-label="always"
          :thumb-size="24"
          min='1'
          :max='timeframes'
          class='pt-4'>
          </v-slider>
          </v-card-text>
          </v-card>
          </v-col>
          </v-row>
        </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="forecast"
          class="elevation-1">
        </v-data-table>
      </v-card-text>
    </v-card>
    </v-col>
    
  </v-dialog>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'ForecastDialog',
  props: ['dialog', 'card'],
  computed: {
    $_dialog: {
      get: function () {
        return this.dialog;
      },
      set: function (val) {
        this.$emit('update-dialog', val);
      }
    },
    ...mapState('weather', [
      'weatherAspects',
      'selectedWeatherAspect',
      'timeframes',
      'selectedTimeframe'
    ]),
    internalTimeframe: {
      get() {
        return this.$store.state.weather.selectedTimeframe;
      },
      set(value) {
        this.setSelectedTimeframe(value)
        // let today = new Date();
        // let advance = new Date();
        // advance.setDate(today.getDate() + value);
        // this.$store.commit('weather/setSelectedTimeframe', advance.toISOString())
        // this.intTimeframe = value;
      }
    },
    forecast: function() {
      let retval = [];
      let offset = this.card.forecast.city.timezone - 7200;
      let maxDate = new Date();
      maxDate.setDate(new Date().getDate() + this.selectedTimeframe);
      maxDate.setHours(23);
      maxDate.setMinutes(59);
      for (let measurement of this.card.forecast.list){
        let newdate = new Date((measurement.dt + offset) * 1000);
        if (newdate > maxDate) {
          continue;
        }
        retval.push({
          time: newdate.toLocaleString(),
          t: measurement.main.temp,
          a: measurement.main.pressure,
          h: measurement.main.humidity,
          w: measurement.wind.speed
        })
      }
      return retval;
    }
  },
  data: function() {
    return {
      headers: [
        {
          text: 'Time',
          value: 'time'
        },
        {
          text: 'Temperature (°C)',
          value: 't'
        },
        {
          text: 'Air pressure (hPa)',
          value: 'a'
        },
        {
          text: 'Humidity (%)',
          value: 'h'
        },
        {
          text: 'Windiness (m/s)',
          value: 'w'
        }
      ]
    }
  },
  methods: {
    activate: function (el) {
      this.$emit('update-dialog', false)
      this.filter = el
    },
    close () {
      this.$emit('update-dialog', false)
    },
    ...mapMutations('weather', [
      'setSelectedTimeframe',
      'setSelectedWeatherAspect'
    ]),
  }
}
</script>

<style>

</style>