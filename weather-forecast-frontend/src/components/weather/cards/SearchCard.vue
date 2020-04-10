<template>
  <v-card>
    <v-card-title v-text="card.title"></v-card-title>
    <v-card-text>
      <v-form
        v-on:submit.prevent="pronadjiVreme">
        <vuetify-google-autocomplete
          id='map'
          v-bind:disable='true'
          placeholder="Location"
          v-on:placechanged="getAddressData"
          types='(cities)'>
        </vuetify-google-autocomplete>
      </v-form>
      <v-text-field
        v-if='weather!==""'
        v-model='weather'
        disabled>
      </v-text-field>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn  
        @click='addCard({type: "view", location: location})' 
        class="mx-2" 
        fab 
        dark color="#1a6919">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn  
        @click='pronadjiVreme()' 
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
import axios from 'axios'

export default {
  name: 'SearchCard',
  props: ['card'],
  data: function(){
    return {
      validSearch: true,
      location: '',
      locationRules: [],
      address: '',
      weather: ''
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'weather/addCard'
    }),
    getAddressData: function (addressData) {
      this.address = addressData;
    },
    async pronadjiVreme(){
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.address.latitude}&lon=${this.address.longitude}&units=metric&APPID=${process.env.VUE_APP_APIKEY}`)
      this.weather = response.data.main.temp;
    }
  },
}
</script>

<style>

</style>