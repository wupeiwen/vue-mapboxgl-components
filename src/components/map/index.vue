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
    // osm配置
    osmConfig: {
      type: Object,
      default: function () {
        return {
          osmUrl: 'http://139.224.131.57:8700',
          backgroundStyle: 'custombrightstyle'
        }
      }
    },
    // 地图中心经纬度。经纬度用数组
    center: {
      type: Array,
      default: function () {
        return [110, 30]
      }
    },
    // 地图的缩放等级
    zoom: {
      type: Number,
      default: 5
    },
    // 视角俯视的倾斜角度
    pitch: {
      type: Number,
      default: 0
    },
    // 地图的旋转角度
    bearing: {
      type: Number,
      default: 0
    },
    // 可视化类别
    mapTypes: {
      type: Array,
      default: function () {
        return ['base']
      }
    },
    // 热力图数据
    heatMapData: {
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
    // 3d柱图数据
    extrusion: {
      type: Object,
      default: function () {
        return {
          shape: 'column',
          offset: 0.002,
          maxHeight: 100,
          minHeight: 10,
          data: [{
            lat: 120.058617889881,
            lng: 30.3123084318025,
            color: 'red',
            height: 2.1
          }, {
            lat: 120.077143907547,
            lng: 30.31249598846499,
            color: 'red',
            height: 2.2
          }, {
            lat: 120.07800221443175,
            lng: 30.30878183662179,
            color: 'red',
            height: 2.3
          }]
        }
      }
    },
    // 区域名称
    regionName: {
      type: String,
      default: 'shanghai'
    },
    regionFill: {
      type: Object,
      default: function () {
        return { fillColor: 'red', fillOpacity: 0.4, fillOutineColor: 'green' }
      }
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
  beforeDestroy () {
    this.removeMap()
  },
  methods: {
    // 初始化地图
    initMap () {
      const vue = this
      const map = new Mapboxgl.Map({
        container: vue.id,
        style: vue.mergeStyle(),
        center: vue.center,
        zoom: vue.zoom,
        pitch: vue.pitch,
        bearing: vue.bearing
      })
      vue.$store.dispatch('map/setMap', map)
      console.log('%cvue-mapboxgl: Add Map', 'color: #67C23A;')
    },
    // 销毁地图
    removeMap () {
      this.$store.state.map.map.remove()
      console.log('%cvue-mapboxgl: Remove Map', 'color: #F56C6C;')
      this.$store.dispatch('map/setMap', null)
      console.log('%cvue-mapboxgl: Set Map Null', 'color: #F56C6C;')
    },
    // 获取单个样式
    getStyle (mapType) {
      const vue = this
      const Style = require(`../config/${mapType}.js`).default
      return mapType === 'regionmap' ? new Style(vue.osmConfig, vue.regionName, vue.regionFill).config
        : mapType === 'heatmap' ? new Style(vue.osmConfig, vue.heatMapData).config
          : mapType === 'bar3d' ? new Style(vue.osmConfig, vue.extrusion).config
            : new Style(vue.osmConfig).config
    },
    // 合并样式
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
