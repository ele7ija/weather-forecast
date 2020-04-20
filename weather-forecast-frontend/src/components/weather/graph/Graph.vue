<template>
  <div>
    <line-chart :chart-data="generatedData" :options="options"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import { mapGetters } from 'vuex';

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        options: {
          maintainAspectRatio: false,
          //aspectRatio: 1.77,
          scales: {
            xAxes: [{
                type: 'time',
                time: {
                  unit: 'hour',
                  stepSize: 1
                },
            }],
            yAxes: [{
              id: 'Temperature',
              type: 'linear',
              position: 'left',
              display: true
            }, {
              id: 'Air pressure',
              type: 'linear',
              position: 'left',
              display: false
            }]
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    },
    computed: {
      generatedData: function() {
        let retval = {
          datasets: []
        };
        for (let card of this.getCards()) {
          if (card.type !== 'view'){
            continue;
          }
          let measurements = [];
          for (let measurement of card.forecast.list){
            measurements.push({
              yAxisID: 'Temperature',
              x: new Date(measurement.dt * 1000),
              y: measurement.main.temp
            })
            // measurements.push({
            //   yAxisID: 'Air pressure',
            //   x: new Date(measurement.dt * 1000),
            //   y: measurement.main.pressure
            // })
          }
          retval.datasets.push({
            label: card.address.name + ', ' + card.forecast.city.country,
            data: measurements
          })
        }
        return retval;
      },
      // ...mapState({
      //   category: state => state.weather.category
      // })
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
      }
    }
  }
</script>

<style>
</style>