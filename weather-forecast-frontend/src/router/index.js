import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '@/components/weather/Weather'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/weather'
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    }
  ]
})