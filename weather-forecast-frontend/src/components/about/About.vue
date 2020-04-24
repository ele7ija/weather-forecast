<template>
  <v-container fluid>
    <v-row align='center' justify='center'>
      <v-col lg=3 md=3 sm=6>
        <v-card>
          <v-card-title>
            About
          </v-card-title>
          <v-card-text>
            <v-container class='pt-0'>
            <v-row>
            <v-col align-self="end" cols=2 class='pr-0'>
              <v-icon>
                mdi-account 
              </v-icon>
            </v-col>
            <v-col class='pl-0'>
            <v-text-field 
              disabled
              v-model='name_surname'>
            </v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols=2 align-self='center' class='pr-0'>
              <v-icon>
                mdi-github
              </v-icon>
            </v-col>
            <v-col class='pl-0'>
            <v-btn outlined text href="https://github.com/ele7ija" target="_blank">ele7ija</v-btn>
            </v-col>
            </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data: function(){
    return {
      name_surname: 'Bojan Popržen'
    }
  }
}
</script>

<style>

</style>