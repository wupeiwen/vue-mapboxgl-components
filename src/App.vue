<template>
  <div id="app">
    <mapview
      :map-config="{center:[120.142577,30.27719], zoom:5, pitch:0, bearing:0}"
      :osm-config="{osmUrl: 'http://139.224.131.57:8700', backgroundStyle: 'custombrightstyle'}"
      :map-types="['line','point']"
      :line="{color: 'green', width: 3, opacity: 0.5, data:[[{lat: 122,lng: 40},{lat: 120,lng: 30}], [{lat: 110,lng: 36},{lat: 120,lng: 30}]]}"
      :point="{color: 'orange', textColor: 'red', opacity: 0.8, maxRadius: 30, minRadius: 5, textOffset: 1, data: [{ lat: 122, lng: 40, value: 10, name: '地点1' }, { lat: 110, lng: 36, value: 30, name: '地点2' }, { lat: 120, lng: 30, value: 10, name: '地点3' }]}"
      :heatmap="[{lat: 120.1,lng: 30.1,value: 2.1}, {lat: 120.2,lng: 30.2,value: 2.2}]"
      :region="{ geojson: {}, color: 'red', opacity: 0.4, outlineColor: 'green'}">
      <control :show-navigation="true" :show-fullscreen="true" :show-scale="true"></control>
      <popup :laglng="laglng" :html-content="htmlContent" :show-popup="showpopup" v-if="false"></popup>
    </mapview>
  </div>
</template>

<script>
export default {
  name: 'app',
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
