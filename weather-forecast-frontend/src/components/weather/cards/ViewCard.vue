<template>
  <v-card>
    <v-img
      :src='card.address.photos[0].getUrl()'
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      class="align-end">
      <v-card-title 
        v-text="title"
        class="white--text">
      </v-card-title>
      <v-card-subtitle 
        v-text="subtitle"
        class="white--text">
      </v-card-subtitle>
    </v-img>
    <v-card-text>
      <!-- ICON DEGREES MIN/MAX --> 
      <v-row align="center" no-gutters>
        <v-col class="display-1 pl-3" cols="9">
          {{currWeather.main.temp.toFixed(1)}}&deg;C
        </v-col>
        <v-col cols="3">
          <v-img
            :src="'http://openweathermap.org/img/w/' + iconcode + '.png'"
            alt="Weather image"
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
      <v-container fluid class='pt-0'>
      
      <v-row>
        <v-col cols='7' class='font-weight-medium subtitle-2 pb-0 pt-1'>
          Air pressure:</v-col>
        <v-col cols='5' class='font-weight-black subtitle-2 pb-0 pr-0 pt-1'>
          {{Math.round(currWeather.main.pressure)}} hPa
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium subtitle-2 pb-0'>
          Humidity:
        </v-col>
        <v-col cols='5' class='font-weight-black subtitle-2 pb-0'>
          {{Math.round(currWeather.main.humidity)}} %
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium subtitle-2 pb-0'>
          Visibility:
        </v-col>
        <v-col cols='5' class='font-weight-black subtitle-2 pb-0'>
          {{Math.round(currWeather.visibility)}} m
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='7' class='font-weight-medium subtitle-2 pb-0'>
          Wind:
        </v-col>
        <v-col cols='5' class='font-weight-black subtitle-2 pb-0'>
          {{Math.round(currWeather.wind.speed)}} m/s
        </v-col>
      </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
// import owm from '@/api/owm';

export default {
  name: 'ViewCard',
  props: ['card'],
  data: function() {
    return {
      min_temp: '',
      max_temp: ''
    }
  },
  computed: {
    title: function(){
      return this.card.address.name + ', ' + 
        this.card.address.country;
    },
    subtitle: function() {
      let date = new Date(this.card.weather.dt * 1000);
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let finalString = days[date.getDay()];
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = hours + ':' + minutes.substr(-2);
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
  created() {
    console.log(this.card)
  }
}
</script>

<style>
</style>