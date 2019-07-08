<template>
  <div id="app">
    <mapview :map-config="mapConfig" :osm-config="osmConfig"
      :map-types="mapTypes" :line="lineConfig" :point="pointConfig"
      @pointClick="callback" :heatmap="heatmap">
      <!-- <markers :data="markerData" @markerClick="callback" @markerMouseenter="callback" @markerMouseleave="callback"></markers> -->
      <!-- <control :navigation="{showCompass: true, showZoom: false, position: 'top-left'}"
        :fullscreen="{show: true, position: 'top-left'}" :scale="{show: true, position: 'top-left'}"></control> -->
    </mapview>
  </div>
</template>

<script>
import imageBase64Code from '@/../public/base64'
import heatmapData from '@/../public/heatmapData.json'

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
        backgroundStyle: 'positron'
      },
      mapTypes: ['heatmap'],
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
      ],
      heatmap: {
        radius: 5,
        weight: 1,
        intensity: 1,
        opacity: 0.8,
        color: ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0, 0, 255, 0)', 0.2, 'royalblue', 0.4, 'cyan', 0.6, 'lime', 0.8, 'yellow', 1, 'red'],
        data: heatmapData
      }
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
