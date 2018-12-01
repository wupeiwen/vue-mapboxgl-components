<template>
  <div :id="id" class="mapview">
    <slot></slot>
  </div>
</template>

<script>
import Mapboxgl from 'mapbox-gl'
export default {
  name: 'mapview',
  props: {
    mapTypes: {
      type: Array,
      default: function () {
        return ['base']
      }
    },
    accessToken: {
      type: String,
      default: 'pk.eyJ1Ijoid3VwZWl3ZW4iLCJhIjoiY2o1eGFvNmQ2MDE5ejMydGJnYWl5dW05ZiJ9.LZMds8C2elQe8UTPm2YAJA'
    },
    osmUrl: {
      type: String,
      default: 'http://139.224.131.57:8700'
    },
    mapStyle: {
      type: String,
      default: 'customdarkstyle'
    },
    center: {
      type: Array,
      default: function () {
        return [110, 30]
      }
    },
    zoom: {
      type: Number,
      default: 5
    },
    pitch: {
      type: Number,
      default: 0
    },
    bearing: {
      type: Number,
      default: 0
    },
    latlngData: {
      type: Array,
      default: function () {
        return [{
          lat: 120.1,
          lng: 30.1,
          value: 2.1
        }, {
          lat: 120.2,
          lng: 30.2,
          value: 2.2
        }, {
          lat: 120.3,
          lng: 30.3,
          value: 2.3
        }]
      }
    },
    regionName: {
      type: String,
      default: 'shanghai'
    }
  },
  data () {
    return {
      id: ''
    }
  },
  created () {
    const uuidv4 = require('uuid/v4')
    this.id = uuidv4()
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const vue = this
      Mapboxgl.accessToken = vue.accessToken

      const map = new Mapboxgl.Map({
        container: vue.id,
        style: vue.mergeStyle(),
        // 地图中心经纬度。经纬度用数组
        center: vue.center,
        // 地图的缩放等级
        zoom: vue.zoom,
        // 视角俯视的倾斜角度
        pitch: vue.pitch,
        // 地图的旋转角度
        bearing: vue.bearing
      })
      vue.$store.dispatch('map/setMap', map)
    },
    getStyle (mapType) {
      const vue = this
      const Style = require(`../config/${mapType}.js`).default
      return mapType === 'bsse' ? new Style(vue.osmUrl, vue.mapStyle).config
        : mapType === 'regionmap' ? new Style(vue.osmUrl, vue.mapStyle, vue.regionName).config
          : new Style(vue.osmUrl, vue.mapStyle, vue.latlngData).config
    },
    mergeStyle () {
      const vue = this
      let style = vue.getStyle('base')
      vue.mapTypes.map((item) => {
        if (item !== 'base') {
          const otherStyle = vue.getStyle(item)
          style.sources = Object.assign(style.sources, otherStyle.sources)
          otherStyle.layers.map((ite) => {
            if (ite.id !== 'background') {
              style.layers.push(ite)
            }
          })
        }
      })
      return style
    }
  }
}
</script>

<style lang="less" scoped>
  .mapview {
    height: 100%;
    width: 100%;
  }
</style>
