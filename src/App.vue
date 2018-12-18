<template>
  <div id="app">
    <mapview
      :map-config="{center:[120.142577,30.27719], zoom:5, pitch:0, bearing:0}"
      :osm-config="{osmUrl: 'http://139.224.131.57:8700', backgroundStyle: 'custombrightstyle'}"
      :map-types="maptypes"
      :extrusion="extrusion"
      @pointClick="pointClick"
      :line="{color: 'green', width: 3, opacity: 0.5, useCurve: true, showAnimation: true, data:[[{lat: 122,lng: 40},{lat: 120,lng: 30}], [{lat: 110,lng: 36},{lat: 120,lng: 30}]]}"
      :point="{color: 'orange', textColor: 'red', showAnimation: true, opacity: 0.8, radius: 20, textOffset: 1, data: [{ lat: 122, lng: 40, value: 10, name: '地点1' }, { lat: 110, lng: 36, value: 30, name: '地点2' }, { lat: 120, lng: 30, value: 10, name: '地点3' }]}"
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
      randomPopup: '',
      maptypes: ['point'],
      extrusion: {
        shape: 'column',
        offset: 0.003,
        maxHeight: 5000,
        // minHeight: 10,
        maxValue: 2000,
        // minValue: 0,
        // height: 1000,
        opacity: 0.8,
        colorList: ['white', 'red'],
        // color: 'blue',
        data: [{ 'value': 1260, 'lat': 121.26359693417731, 'lng': 31.387155483993908, 'color': '#6AFFFF' }, { 'value': 686, 'lat': 121.47105326243206, 'lng': 30.91740893826132, 'color': '#6AFFFF' }, { 'value': 972, 'lat': 121.50041869438367, 'lng': 31.391720919972318, 'color': '#6AFFFF' }, { 'value': 1507, 'lat': 121.41073630001533, 'lng': 31.62928198698365, 'color': '#6AFFFF' }, { 'value': 2079, 'lat': 121.46695085657484, 'lng': 31.199345443366834, 'color': '#6AFFFF' }, { 'value': 3083, 'lat': 121.44772793432271, 'lng': 31.19426318646968, 'color': '#6AFFFF' }, { 'value': 2401, 'lat': 121.40208179296937, 'lng': 31.262484223577548, 'color': '#6AFFFF' }, { 'value': 2557, 'lat': 121.53504363772329, 'lng': 31.264693242864986, 'color': '#6AFFFF' }, { 'value': 1703, 'lat': 121.21141709345991, 'lng': 31.01933285377057, 'color': '#6AFFFF' }, { 'value': 6331, 'lat': 121.55263824918765, 'lng': 31.230468007220132, 'color': '#6AFFFF' }, { 'value': 1689, 'lat': 121.51754368430372, 'lng': 31.26484981135868, 'color': '#6AFFFF' }, { 'value': 584, 'lat': 121.34967977704511, 'lng': 30.738769767941154, 'color': '#6AFFFF' }, { 'value': 1293, 'lat': 121.42836824056516, 'lng': 31.229682331444526, 'color': '#6AFFFF' }, { 'value': 3205, 'lat': 121.37744003137246, 'lng': 31.113453772332598, 'color': '#6AFFFF' }, { 'value': 1051, 'lat': 121.1229872837184, 'lng': 31.149568329707254, 'color': '#6AFFFF' }, { 'value': 1929, 'lat': 121.45058726681184, 'lng': 31.294343643196132, 'color': '#6AFFFF' }, { 'value': 1892, 'lat': 121.5007087832837, 'lng': 31.214560918140307, 'color': '#6AFFFF' }] }
    }
  },
  mounted () {
    let vue = this
    let flag = true
    vue.randomPopup = setInterval(() => {
      flag = !flag
      vue.maptypes = flag ? ['point'] : ['line']
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.randomPopup)
  },
  methods: {
    pointClick (event) {
      console.log(event)
    }
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
