<template>
  <v-card 
    color='#9debb4'>
    <v-card-title v-text="card.location"></v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ViewCard',
  props: ['card']
}
</script>

<style>

</style>