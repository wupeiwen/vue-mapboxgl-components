<template>
  <div class="control"></div>
</template>

<script>
import { mapState } from 'vuex'
import Mapboxgl from 'mapbox-gl'
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
  computed: {
    ...mapState('map', {
      map: state => state.map
    })
  },
  watch: {
    map (oldvalue, newValue) {
      this.setControl()
    }
  },
  methods: {
    setControl () {
      if (this.showNavigation) {
        // 导航
        this.map.addControl(new Mapboxgl.NavigationControl(), 'top-left')
      }
      if (this.showFullscreen) {
        // 全屏
        this.map.addControl(new Mapboxgl.FullscreenControl())
      }
      if (this.showScale) {
        // 标尺
        // 'imperial' 英里,  'metric' 公制 or  'nautical' 海里
        this.map.addControl(new Mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }))
      }
    }
  }
}
</script>
