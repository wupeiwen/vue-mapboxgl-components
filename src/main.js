import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import 'mapbox-gl/dist/mapbox-gl.css'
import './components/index'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
