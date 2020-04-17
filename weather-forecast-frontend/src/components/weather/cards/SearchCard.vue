<template>
  <v-card>
    <v-card-title v-text="card.title"></v-card-title>
    <v-card-text>
      <v-form
        v-on:submit.prevent="setUpPreview">
        <vuetify-google-autocomplete
          id='map'
          v-bind:disable='true'
          placeholder="Location"
          v-on:placechanged="getAddressData"
          types='(cities)'
          :options="{fields: ['geometry', 'address_components', 
            'formatted_address', 'photos']}">
        </vuetify-google-autocomplete>
      </v-form>
      <template v-if='weather!==null'>
        <v-img
          :src='formattedAddress.photos[0].getUrl()'
          :alt='formattedAddress.name'
          width="200"
          height="150"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          class="align-end">
          <v-card-title 
            class="white--text">
            {{currDescription}}&nbsp;{{currWeather}}&deg;C
          </v-card-title>
        </v-img>
      </template>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn  
        @click='addCardReset' 
        class="mx-2" 
        fab 
        dark color="#1a6919">
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
    addCardReset() {
      this.addCard({
        type: "view", 
        address: this.formattedAddress, 
        weather: this.weather
      });
      this.weather = null;
    }
  },
}
</script>

<style>

</style>