<template>
  <div :id="id" style="height: 100%;width: 100%;">
    <slot></slot>
  </div>
</template>

<script>
import Mapboxgl from 'mapbox-gl'
export default {
  name: 'mapview',
  props: {
    // osm配置项
    osmConfig: {
      type: Object,
      default: function () {
        return {
          osmUrl: 'http://139.224.131.57:8700',
          backgroundStyle: 'custombrightstyle'
        }
      }
    },
    // 地图配置项
    mapConfig: {
      type: Object,
      default: function () {
        return {
          center: [120, 30],
          zoom: 4,
          pitch: 0,
          bearing: 0
        }
      }
    },
    // 可视化类别
    mapTypes: {
      type: Array,
      default: function () {
        return ['base']
      }
    },
    // 热力图配置项
    heatmap: {
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
    // 3d柱图配置项
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
    // 区域配置项
    region: {
      type: Object,
      default: function () {
        return {
          name: 'shanghai',
          color: 'red',
          opacity: 0.4,
          outineColor: 'green'
        }
      }
    },
    // 线配置项
    line: {
      type: Object,
      default: function () {
        return {
          color: 'green',
          width: 6,
          opacity: 0.8,
          data: [
            { lat1: 122, lng1: 37, lat2: 120, lng2: 30 },
            { lat1: 110, lng1: 36, lat2: 120, lng2: 30 }
          ]
        }
      }
    },
    // 点配置项
    point: {
      type: Object,
      default: function () {
        return {
          color: 'orange',
          textColor: 'red',
          opacity: 0.8,
          data: [
            { lat: 122, lng: 37, name: '地点1' },
            { lat: 110, lng: 36, name: '地点2' },
            { lat: 120, lng: 30, name: '地点3' }
          ]
        }
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
  // 配置项变化重新加载地图样式
  watch: {
    osmConfig () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    mapConfig () {
      this.removeMap()
      this.initMap()
    },
    mapTypes () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    heatmap () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    extrusion () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    region () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    line () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    },
    point () {
      this.$store.state.map.map.setStyle(this.mergeStyle())
    }
  },
  methods: {
    // 初始化地图
    initMap () {
      const vue = this
      const map = new Mapboxgl.Map({
        container: vue.id,
        // 地图的样式
        style: vue.mergeStyle(),
        // 地图的中心点（经纬度用数组）
        center: vue.mapConfig.center,
        // 地图的缩放等级
        zoom: vue.mapConfig.zoom,
        // 视角俯视的倾斜角度
        pitch: vue.mapConfig.pitch,
        // 地图的旋转角度
        bearing: vue.mapConfig.bearing
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
      return mapType === 'region' ? new Style(vue.osmConfig, vue.region).config
        : mapType === 'heatmap' ? new Style(vue.osmConfig, vue.heatmap).config
          : mapType === 'bar3d' ? new Style(vue.osmConfig, vue.extrusion).config
            : mapType === 'line' ? new Style(vue.osmConfig, vue.line).config
              : mapType === 'point' ? new Style(vue.osmConfig, vue.point).config
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
