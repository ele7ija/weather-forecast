<template>
  <v-card>
    <v-card-title v-text="title"></v-card-title>
    <v-card-text>
      <v-text-field 
        disabled
        v-model="currentDescription">
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ViewCard',
  props: ['card'],
  computed: {
    title: function(){
      return this.card.address.name + ', ' + 
        this.card.address.country;
    },
    currentDescription: function() {
      return this.card.weather.weather[0].main;
    }
  },
  created() {
    console.log(this.card)
  }
}
</script>

<style>

</style>