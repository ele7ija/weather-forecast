<template>
  <v-card>
    <v-card-title class="subtitle-1 font-weight-medium" v-text="card.title"></v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form
        v-on:submit.prevent="setUpPreview">
        <vuetify-google-autocomplete
          id='map'
          ref='map'
          v-bind:disable='true'
          placeholder="Location"
          v-on:placechanged="getAddressData"
          types='(cities)'
          :options="{fields: ['geometry', 'address_components', 
            'formatted_address', 'photos']}">
        </vuetify-google-autocomplete>
      </v-form>
       </v-card-text>
        <v-img v-if='weather!==null'
          :src='formattedAddress.photos[0].getUrl()'
          :alt='formattedAddress.name'
          height="120"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
          class="align-end justify-end">
          <div 
            class="white--text subtitle-1 font-weight-medium pa-2">
            {{currDescription}},&nbsp;{{currWeather}}&deg;C
          </div>
        </v-img>
   
    <v-card-actions class="justify-center">
      <v-btn  
        @click='addCardReset' 
        class="mx-2" 
        fab 
        color="primary"
        dark>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import {mapMutations} from 'vuex';
import owm from '@/api/owm';

export default {
  name: 'SearchCard',
  props: ['card'],
  data: function(){
    return {
      formattedAddress: {latitude: '', longitude: ''},
      weather: null
    }
  },
  computed: {
    currWeather: function() {
      if (this.weather === null){
        return '';
      }
      return this.weather.main.temp.toFixed(1);
    },
    currDescription: function() {
      if (this.weather === null){
        return '';
      }
      return this.weather.weather[0].main;
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'weather/addCard'
    }),
    getAddressData: function (formattedData) {
      this.formattedAddress = formattedData;
      this.setUpPreview();
    },
    setUpPreview() {
      this.pronadjiVreme()

    },
    async pronadjiVreme(){
      let latitude = this.formattedAddress.latitude;
      let longitude = this.formattedAddress.longitude;
      if (latitude == '' || longitude == ''){
        return;
      }
      const data = await owm.getCurrentWeather(latitude, longitude);
      this.weather = data;
    },
    async addCardReset() {
      let latitude = this.formattedAddress.latitude;
      let longitude = this.formattedAddress.longitude;
      if (latitude == '' || longitude == ''){
        return;
      }
      const data = await owm.getForecast(latitude, longitude);
      console.log(data);
      this.addCard({
        type: "view", 
        address: this.formattedAddress, 
        weather: this.weather,
        forecast: data
      });
      this.weather = null;
      this.$refs.map.clear()
    }
  },
}
</script>

<style>

</style>