<template>
  <div id="app">
    <mapview :map-config="mapConfig" :osm-config="osmConfig"
      :map-types="mapTypes" :line="lineConfig" :point="pointConfig"
      @pointClick="callback">
      <markers :data="markerData" @markerClick="callback" @markerMouseenter="callback" @markerMouseleave="callback"></markers>
    </mapview>
  </div>
</template>

<script>
import imageBase64Code from '@/../public/base64'
export default {
  name: 'app',
  data () {
    return {
      mapConfig: {
        center: [120.142577, 30.27719],
        zoom: 5,
        pitch: 0,
        bearing: 0
      },
      osmConfig: {
        osmUrl: 'http://192.168.22.88:8700',
        backgroundStyle: 'custombrightstyle'
      },
      mapTypes: ['line'],
      lineConfig: {
        color: 'green',
        width: 3,
        opacity: 0.5,
        useCurve: true,
        showAnimation: true,
        data: [
          [{ lng: 122, lat: 40 }, { lng: 120, lat: 30 }],
          [{ lng: 110, lat: 36 }, { lng: 120, lat: 30 }]
        ]
      },
      pointConfig: {
        color: 'orange',
        textColor: 'red',
        showAnimation: true,
        opacity: 0.8,
        radius: 20,
        textOffset: 1,
        data: [
          { lng: 122, lat: 40, value: 10, name: '地点1' },
          { lng: 110, lat: 36, value: 30, name: '地点2' },
          { lng: 120, lat: 30, value: 10, name: '地点3' }
        ]
      },
      markerData: [
        { lng: 122, lat: 40, height: 48, width: 48, base64: imageBase64Code },
        { lng: 110, lat: 36, height: 48, width: 48, base64: imageBase64Code },
        { lng: 120, lat: 30, height: 48, width: 48, base64: imageBase64Code }
      ]
    }
  },
  methods: {
    callback (data) {
      console.log(data)
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
