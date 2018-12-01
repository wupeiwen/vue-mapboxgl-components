<template>
  <div id="app">
    <mapview :osm-url="'http://139.224.131.57:8700'" :map-style="'custompositronstyle'" :center=" [120.142577,30.27719]" :zoom="12" :pitch="30"
     :access-token="'pk.eyJ1Ijoid3VwZWl3ZW4iLCJhIjoiY2o1eGFvNmQ2MDE5ejMydGJnYWl5dW05ZiJ9.LZMds8C2elQe8UTPm2YAJA'"
     :map-types="['bar3d','building','regionmap','heatmap']" :region-name="'shanghai'">
      <control :show-navigation="true" :show-fullscreen="true" :show-scale="true"></control>
      <popup :laglng="[120.1, 30.1]" :html-content="'<h1>Hello World!</h1>'"></popup>
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
