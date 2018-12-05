import Vue from 'vue'
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import './components/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
