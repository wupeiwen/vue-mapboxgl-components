<template>
  <div :id="id" style="height: 100%;width: 100%;">
    <slot></slot>
  </div>
</template>

<script>
import { Map } from 'mapbox-gl'
import { EventBus } from '../eventbus.js'
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
          height: 1000,
          maxHeight: 100,
          minHeight: 10,
          maxValue: 3000,
          minValue: 0,
          opacity: 0.8,
          color: 'yellow',
          colorList: ['white', 'red'],
          data: [{
            lat: 120.058617889881,
            lng: 30.3123084318025,
            value: 2.1
          }, {
            lat: 120.077143907547,
            lng: 30.31249598846499,
            value: 2.2
          }, {
            lat: 120.07800221443175,
            lng: 30.30878183662179,
            value: 2.3
          }]
        }
      }
    },
    // 区域配置项
    region: {
      type: Object,
      default: function () {
        return {
          geojson: {},
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
          useCurve: true,
          showAnimation: true,
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
          showAnimation: true,
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
      id: '',
      map: null,
      pointAnimotion: '',
      lineAnimotion: ''
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
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    },
    mapConfig (newValue, oldValue) {
      if (this.map !== null) {
        this.map.flyTo(Object.assign({ speed: 1 }, newValue))
      }
    },
    mapTypes () {
      if (this.map !== null) {
        this.ifPointAnimation()
        this.ifLineAnimation()
        this.map.setStyle(this.mergeStyle())
      }
    },
    heatmap () {
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    },
    extrusion () {
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    },
    region () {
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    },
    line () {
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    },
    point () {
      if (this.map !== null) {
        this.map.setStyle(this.mergeStyle())
      }
    }
  },
  methods: {
    // 初始化地图
    initMap () {
      const vue = this
      vue.map = new Map({
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
      EventBus.$emit('mapLoaded', vue.map)
      console.log('%cvue-mapboxgl: Add Map', 'color: #67C23A;')
      vue.registerEvents()
      console.log('%cvue-mapboxgl: Register Events', 'color: #67C23A;')
      vue.ifPointAnimation()
      vue.ifLineAnimation()
    },
    // 销毁地图
    removeMap () {
      this.map.remove()
      console.log('%cvue-mapboxgl: Remove Map', 'color: #F56C6C;')
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
    },
    // 判断是否启用动点
    ifPointAnimation () {
      if (this.mapTypes.includes('point') && this.point.showAnimation) {
        if (!this.pointAnimotion) {
          this.addPointAnimotion()
        }
      } else {
        if (this.pointAnimotion) {
          this.removeAnimotion('point')
        }
      }
    },
    addPointAnimotion () {
      let vue = this
      let num = 0
      let flag = 'up'
      vue.pointAnimotion = setInterval(() => {
        if (num < 1 && flag === 'up') {
          num = Number(parseFloat(num + 0.1).toFixed(1))
        }
        if (num >= 1 && flag === 'up') {
          num = Number(parseFloat(num - 0.1).toFixed(1))
          flag = 'down'
        }
        if (num > 0 && flag === 'down') {
          num = Number(parseFloat(num - 0.1).toFixed(1))
        }
        if (num === 0 && flag === 'down') {
          num = 0.2
          flag = 'up'
        }
        vue.map.setPaintProperty('points', 'circle-blur', num)
      }, 200)
    },
    removeAnimotion (type) {
      clearInterval(this[`${type}Animotion`])
      this[`${type}Animotion`] = ''
    },
    // 判断是否启用线条动画
    ifLineAnimation () {
      if (this.mapTypes.includes('line') && this.line.showAnimation) {
        if (!this.lineAnimotion) {
          this.addLineAnimotion()
        }
      } else {
        if (this.lineAnimotion) {
          this.removeAnimotion('line')
        }
      }
    },
    addLineAnimotion () {
      let vue = this
      let data = ''
      let lineLength = 0
      let linePointNum = 0
      vue.lineAnimotion = setInterval(() => {
        data = vue.map.getSource('lineData')['_data']['features']
        lineLength = data[0]['geometry']['coordinates'].length
        for (let index = 0; index < data.length; index++) {
          vue.map.getSource(`fly_point${index}`).setData({
            'type': 'Point',
            'coordinates': data[index]['geometry']['coordinates'][linePointNum]
          })
        }
        if (linePointNum < lineLength - 1) {
          linePointNum = linePointNum + 1
        } else {
          linePointNum = 0
        }
      }, 200)
    },
    // 注册地图事件
    registerEvents () {
      // click mouseenter mouseleave
      let vue = this
      this.map.on('click', 'points', function (e) {
        vue.$emit('pointClick', e.features[0].properties)
      })
      this.map.on('mouseenter', 'points', function (e) {
        vue.$emit('pointMouseenter', e.features[0].properties)
      })
      this.map.on('mouseleave', 'points', function (e) {
        vue.$emit('pointMouseleave', e)
      })
      this.map.on('click', 'lines', function (e) {
        vue.$emit('lineClick', e.features[0].properties)
      })
      this.map.on('mouseenter', 'lines', function (e) {
        vue.$emit('lineMouseenter', e.features[0].properties)
      })
      this.map.on('mouseleave', 'lines', function (e) {
        vue.$emit('lineMouseleave', e)
      })
      this.map.on('click', 'extrusions', function (e) {
        vue.$emit('extrusionClick', e.features[0].properties)
      })
      this.map.on('mouseenter', 'extrusions', function (e) {
        vue.$emit('extrusionMouseenter', e.features[0].properties)
      })
      this.map.on('mouseleave', 'extrusions', function (e) {
        vue.$emit('extrusionMouseleave', e)
      })
    }
  }
}
</script>
