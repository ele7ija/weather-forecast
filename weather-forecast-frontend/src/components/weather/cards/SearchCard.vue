<template>
  <v-card 
    color='#9debb4'>
    <v-card-title v-text="card.title"></v-card-title>
    <v-card-text>
      <v-form ref='searchForm' v-model='validSearch'>
        <v-text-field
          v-model='location'
          :rules='locationRules'
          label='Location'
          required>
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn  
        @click='addCard({type: "view", location: location})' 
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

export default {
  name: 'SearchCard',
  props: ['card'],
  data: function(){
    return {
      validSearch: true,
      location: '',
      locationRules: [],
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'weather/addCard'
    })
  },
}
</script>

<style>

</style>