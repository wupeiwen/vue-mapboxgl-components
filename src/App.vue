<template>
  <div id="app">
    <mapview
      :center="[120.142577,30.27719]" :zoom="12" :pitch="30" :bearing="10"
      :osm-config="{osmUrl: 'http://139.224.131.57:8700', backgroundStyle: 'custombrightstyle'}"
      :map-types="['heatmap','bar3d']"
      :heat-map-data="[{lat: 120.1,lng: 30.1,value: 2.1}, {lat: 120.2,lng: 30.2,value: 2.2}]"
      :region-name="'shanghai'" :region-fill="{fillColor: 'red', fillOpacity: 0.4, fillOutlineColor: 'green'}">
      <control :show-navigation="true" :show-fullscreen="true" :show-scale="true"></control>
      <popup :laglng="laglng" :html-content="htmlContent" :show-popup="showpopup" v-if="false"></popup>
    </mapview>
  </div>
</template>

<script>
import mapview from './components/map/index.vue'
import control from './components/map/control.vue'
import popup from './components/map/popup.vue'

export default {
  name: 'app',
  components: {
    mapview, control, popup
  },
  data () {
    return {
      showpopup: true,
      laglng: [120.1, 30.1],
      htmlContent: '<h1>Hello World!</h1>',
      randomPopup: ''
    }
  },
  mounted () {
    let vue = this
    vue.randomPopup = setInterval(() => {
      vue.htmlContent = `<h1>随机数${Math.random()}</h1>`
      vue.laglng = [120 + Math.random(), 30 + Math.random()]
    }, 2000)
  },
  beforeDestroy () {
    clearInterval(this.randomPopup)
  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
