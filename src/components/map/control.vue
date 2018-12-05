<template>
  <div class="control"></div>
</template>

<script>
import { NavigationControl, FullscreenControl, ScaleControl } from 'mapbox-gl'
import { EventBus } from '../eventbus.js'
export default {
  name: 'control',
  props: {
    showNavigation: {
      type: Boolean,
      detault: false
    },
    showFullscreen: {
      type: Boolean,
      detault: false
    },
    showScale: {
      type: Boolean,
      detault: false
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
        if (this.showNavigation) {
        // 导航
          this.map.addControl(new NavigationControl(), 'top-left')
          console.log('%cvue-mapboxgl: Add NavigationControl', 'color: #67C23A;')
        }
        if (this.showFullscreen) {
        // 全屏
          this.map.addControl(new FullscreenControl())
          console.log('%cvue-mapboxgl: Add FullscreenControl', 'color: #67C23A;')
        }
        if (this.showScale) {
        // 标尺
        // 'imperial' 英里,  'metric' 公制 or  'nautical' 海里
          this.map.addControl(new ScaleControl({ maxWidth: 80, unit: 'metric' }))
          console.log('%cvue-mapboxgl: Add ScaleControl', 'color: #67C23A;')
        }
      }
    }
  }
}
</script>
