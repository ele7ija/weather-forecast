// OpenWeatherMap api
import axios from 'axios';

export default {
  async getCurrentWeather (lat, long){
    let weatherData = 
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.VUE_APP_APIKEY}`);
    return weatherData.data;
  },

  async getForecast(lat, long){
    let weatherData = 
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.VUE_APP_APIKEY}`);
    return weatherData.data;
  }
}