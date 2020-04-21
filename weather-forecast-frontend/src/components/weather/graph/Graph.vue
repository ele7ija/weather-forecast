<template>
  <div>
    <line-chart :chart-data="generatedData" :options="options"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import { mapGetters, mapState } from 'vuex';

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
      }
    },
    computed: {
      ...mapState('weather', [
        'weatherAspects',
        'selectedWeatherAspect',
        'timeframes',
        'selectedTimeframe'
      ]),
      generatedData: function() {
        let retval = {
          datasets: []
        };
        var o = Math.round, r = Math.random, s = 255;
        for (let card of this.getCards()) {
          if (card.type !== 'view'){
            continue;
          }
          let measurements = [];
          for (let measurement of card.forecast.list){
            if (this.selectedWeatherAspect === 'Temperature') {
              measurements.push({
                yAxisID: 'Temperature',
                x: new Date(measurement.dt * 1000),
                y: measurement.main.temp
              })
            }
            if (this.selectedWeatherAspect === 'Air pressure') {
              measurements.push({
                yAxisID: 'Air pressure',
                x: new Date(measurement.dt * 1000),
                y: measurement.main.pressure
              })
            }
            if (this.selectedWeatherAspect === 'Windiness') {
              measurements.push({
                yAxisID: 'Windiness',
                x: new Date(measurement.dt * 1000),
                y: measurement.wind.speed
              })
            }
            if (this.selectedWeatherAspect === 'Humidity') {
              measurements.push({
                yAxisID: 'Humidity',
                x: new Date(measurement.dt * 1000),
                y: measurement.main.humidity
              })
            }
          }
          retval.datasets.push({
            label: card.address.name + ', ' + card.forecast.city.country,
            data: measurements,
            backgroundColor: 
            'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.3 + ')'
          })
        }
        return retval;
      },
      options: function() {
        let retval = {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
                type: 'time',
                time: {
                  unit: 'hour',
                  stepSize: 1
                }
            }],
            yAxes: []
          },
          legend: {
            position: 'bottom'
          }
        };
        if (this.selectedWeatherAspect === 'Temperature') {
          retval.scales.yAxes.push({
            id: 'Temperature',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: 'Celsius degrees (°C)',
              display: true
            }
          })
        }
        else if (this.selectedWeatherAspect === 'Air pressure') {
          retval.scales.yAxes.push({
            id: 'Air pressure',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: 'Hectopascals (hPa)',
              display: true
            }
          })
        }
        else if (this.selectedWeatherAspect === 'Humidity') {
          retval.scales.yAxes.push({
            id: 'Humidity',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: 'Percentage (%)',
              display: true
            }
            
         })
        }
        else if (this.selectedWeatherAspect === 'Windiness') {
          retval.scales.yAxes.push({
            id: 'Windiness',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: 'Meters-per-second (m/s)',
              display: true
            }
          })
        }
        return retval;
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      ...mapGetters({
        getCards: 'weather/getCards'
      }),
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data Two',
              backgroundColor: '#000fff',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      rainbow(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch(i % 6){
            case 0: r = 1; g = f; b = 0; break;
            case 1: r = q; g = 1; b = 0; break;
            case 2: r = 0; g = 1; b = f; break;
            case 3: r = 0; g = q; b = 1; break;
            case 4: r = f; g = 0; b = 1; break;
            case 5: r = 1; g = 0; b = q; break;
        }
        var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
        return (c);
      }
    }
  }
</script>

<style>
</style>