<template>
  <div class="control"></div>
</template>

<script>
import { NavigationControl, FullscreenControl, ScaleControl } from 'mapbox-gl'
import { EventBus } from '../eventbus.js'
export default {
  name: 'control',
  props: {
    navigation: {
      type: Object,
      detault: function () {
        return {
          showCompass: true,
          showZoom: true,
          position: 'top-left'
        }
      }
    },
    fullscreen: {
      type: Object,
      detault: function () {
        return {
          show: true,
          position: 'top-left'
        }
      }
    },
    scale: {
      type: Object,
      detault: function () {
        return {
          show: true,
          maxWidth: 80,
          unit: 'metric',
          position: 'top-left'
        }
      }
    }
  },
  watch: {
    map (oldvalue, newValue) {
      this.setControl()
    }
  },
  data () {
    return {
      map: null
    }
  },
  mounted () {
    EventBus.$on('mapLoaded', (map) => {
      this.map = map
    })
  },
  beforeDestroy () {
    EventBus.$off('mapLoaded')
  },
  methods: {
    setControl () {
      if (this.map) {
        if (this.navigation && (this.navigation.showCompass || this.navigation.showZoom)) {
        // 导航
          const option = { showCompass: this.navigation.showCompass || false, showZoom: this.navigation.showZoom || false }
          this.map.addControl(new NavigationControl(option), this.navigation.position || 'top-left')
          console.log('%cvue-mapboxgl: Add NavigationControl', 'color: #67C23A;')
        }
        if (this.fullscreen && this.fullscreen.show) {
        // 全屏 位置右上
          this.map.addControl(new FullscreenControl(), this.fullscreen.position || 'top-left')
          console.log('%cvue-mapboxgl: Add FullscreenControl', 'color: #67C23A;')
        }
        if (this.scale && this.scale.show) {
        // 标尺 位置左下
        // 'imperial' 英里,  'metric' 公制 or  'nautical' 海里
          this.map.addControl(new ScaleControl({ maxWidth: this.scale.maxWidth || 80, unit: this.scale.unit || 'metric' }), this.scale.position || 'top-left')
          console.log('%cvue-mapboxgl: Add ScaleControl', 'color: #67C23A;')
        }
      }
    }
  }
}
</script>
