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
          :src='formattedAddress.photos[0].getUrl()'>
        </v-img>
        <v-text-field
        v-model='weatherText'
        disabled>
      </v-text-field>
      </template>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn  
        @click='addCard(
          {type: "view", 
          address: formattedAddress, 
          weather: weather})' 
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
    weatherText: function() {
      if (this.weather === null){
        return '';
      }
      return this.weather.main.temp;
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
    }
  },
}
</script>

<style>

</style>