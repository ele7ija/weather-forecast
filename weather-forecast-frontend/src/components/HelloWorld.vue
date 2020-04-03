<template>
  <div>  
    <button v-on:click='getCurrentWeather("3194360")'>currweather</button>
    {{weather}}
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  props: {
  },
  computed: {
    ...mapState({
      weather: state => state.weather.weather
    })
  },
  methods: {
    ...mapActions('weather', [
      'getCurrentWeather'
    ])
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
