// OpenWeatherMap api
import axios from 'axios';

export default {
  getCurrentWeather (cityId, cb, errorCb){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&APPID=${process.env.VUE_APP_APIKEY}`)
      .then(function(response){
        cb(response['data']['main']['temp']);
      })
      .catch(function(error){
        errorCb(error);
      })
  }
}