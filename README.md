# Weather forecast

## About 
[Human Computer Interaction class](http://www.ftn.uns.ac.rs/n419733901/human-computer-interaction) project 1 (6th semester).

> Short description: Project focuses on UI/UX of a weather forecast API. 

> Long description (Serbian): [PDF](project_description_serbian.pdf)

## Technologies

- Frontend: Vue.js + Vuex + Vuetify
- Backend: [Weather forecast API](openweathermap.org)

## How to run the project

1. Get a weather [API key](openweathermap.org) and put it in a .env.local file in the form:
> VUE_APP_APIKEY=\<yourkey>

1. Get a places [API key](https://developers.google.com/places/web-service/intro?hl=en) and put it in a .env.local file in the form:
> VUE_APP_GOOGLE_APIKEY=\<yourkey>

3. Run `npm run serve` (Node.js is required) in the [frontend root folder](./weather-forecast-frontend)