<template>
    <v-dialog
    v-model='$_dialog'
    width="unset">
    <v-col>
      <v-card>
        <v-card-title>
          Forecast (3-hour): {{card.address.name + ', ' + card.address.country}}
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
import {mapState} from 'vuex';

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
    forecast: function() {
      let retval = [];
      let offset = this.card.forecast.city.timezone - 7200;
      let maxDate = new Date(this.selectedTimeframe);
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
    }
  }
}
</script>

<style>

</style>