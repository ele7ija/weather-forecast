import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '@/components/weather/Weather'
import About from '@/components/about/About'

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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})