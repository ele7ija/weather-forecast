<template>
  <v-card>
    <v-img
      :src='card.address.photos[0].getUrl()'
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
      class="align-end"
      height=150>
      <v-card-title 
        v-text="title"
        :class="classes">
      </v-card-title>
      <v-card-subtitle 
        v-text="subtitle"
        class='white--text pb-2 caption'>
      </v-card-subtitle>
    </v-img>
    <v-card-text class="pt-3 pb-1">
      <!-- ICON DEGREES MIN/MAX --> 
      <v-row align="center" no-gutters>
        <v-col class="headline pl-2" cols="8">
          {{currWeather.main.temp.toFixed(1)}}&deg;C
        </v-col>
        <v-col cols="4">
          <v-img
            :src="'http://openweathermap.org/img/w/' + iconcode + '.png'"
            alt="Weather image"
            width=40
          ></v-img>
        </v-col>
        
        <!--
        <v-col cols="2">
          <v-row no-gutters align="end" justify="end">
            <v-col class="overline" cols='6'>
            {{Math.round(currWeather.main.temp_max)}}
            </v-col>
          </v-row>
          <v-row no-gutters align='start' justify='end'>
            <v-col class="overline" cols='6'>
            {{Math.round(currWeather.main.temp_min)}}
            </v-col>
          </v-row>
        </v-col>
        -->
      </v-row>
      <!--  --> 
      <v-container fluid class='pt-0 pb-1'>
      
      <v-row>
        <v-col cols='7' class='font-weight-medium caption pa-0 pt-1'>
          Air pressure:</v-col>
        <v-col cols='5' class='font-weight-black caption pa-0 pt-1 pl-1'>
          {{Math.round(currWeather.main.pressure)}} hPa
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium caption pa-0 pt-1'>
          Humidity:
        </v-col>
        <v-col cols='5' class='font-weight-black caption pa-0 pt-1 pl-1'>
          {{Math.round(currWeather.main.humidity)}} %
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium caption pa-0 pt-1'>
          Visibility:
        </v-col>
        <v-col cols='5' class='font-weight-black caption pa-0 pt-1 pl-1'>
          {{currWeather.visibility == undefined ? 
            '--' :
            Math.round(currWeather.visibility)}} m
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium caption pa-0 pt-1'>
          Wind:
        </v-col>
        <v-col cols='5' class='font-weight-black caption pa-0 pt-1 pl-1'>
          {{Math.round(currWeather.wind.speed)}} m/s
        </v-col>
      </v-row>
      </v-container>
      
      <!-- AKCIJE -->
      <v-card-actions class="pl-0 pr-0 pt-1">
        <v-btn 
          text 
          class='overline pa-0'
          @click.stop='dialog=true'>
          Forecast table
        </v-btn>
        <ForecastDialog
          v-bind:card='card'
          v-bind:dialog='dialog'
          @update-dialog='dialog=false'>
        </ForecastDialog>
        <v-spacer></v-spacer>
        <v-btn 
          icon 
          class='pa-0'
          @click='removeCard(card.id)'><v-icon small>mdi-delete</v-icon></v-btn>
        
    </v-card-actions>

    <v-expand-transition>
    </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';
import ForecastDialog from './ForecastDialog';

export default {
  name: 'ViewCard',
  props: ['card'],
  components: { ForecastDialog },
  data: function() {
    return {
      min_temp: '',
      max_temp: '',
      dialog: false
    }
  },
  computed: {
    classes: function() {
      let retval = 'white--text font-weight-medium pb-3'
      if (this.title.length <= 18) {
        return retval += ' ' + 'subtitle-1'; 
      }
      if (this.title.length <= 22) {
        return retval += ' ' + 'subtitle-2'
      }
      return retval += ' ' + 'caption'
    },
    title: function(){
      return this.card.address.name + ', ' + 
        this.card.address.country;
    },
    subtitle: function() {
      let date = new Date(
        (this.card.weather.dt + this.card.weather.timezone - 7200)
         * 1000);
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let finalString = days[date.getDay()];
      var hours = "0" + date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
      finalString += ', ' + formattedTime;
      finalString += ' ' + this.card.weather.weather[0].main;
      return finalString
    },
    iconcode: function(){
      return this.card.weather.weather[0].icon;
    },
    currWeather: function() {
      return this.card.weather;
    }
  },
  methods: {
    ...mapMutations('weather', [
      'removeCard'
    ])
  },
  created() {
    console.log(this.card)
  }
}
</script>

<style>
</style>