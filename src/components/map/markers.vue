<template>
 <div class="markers"></div>
</template>

<script>
import { Marker } from 'mapbox-gl'
import { EventBus } from '../eventbus.js'
export default {
  name: 'markers',
  props: {
    data: {
      type: Array,
      default: function () {
        return [{ lng: 120.1, lat: 30.1 }]
      }
    },
    showMarker: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    map (newValue, oldvalue) {
      if (this.showMarker) {
        this.addMarker()
      }
    },
    showMarker (newValue, oldvalue) {
      if (newValue === false) {
        this.removeMarker()
      } else {
        this.addMarker()
      }
    },
    data (newValue, oldvalue) {
      if (this.showMarker) {
        this.removeMarker()
        this.addMarker()
      }
    }
  },
  data () {
    return {
      markers: [],
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
    addMarker () {
      const vue = this
      if (vue.map) {
        vue.markers = []
        vue.data.map(item => {
          let marker
          const el = document.createElement('div')
          el.className = 'marker'
          if (item.base64) {
            el.style.backgroundImage = `url(${item.base64})`
            if (item.width) {
              el.style.width = `${item.width}px`
            } else {
              console.log('%cvue-mapboxgl: error Marker data (width is require)', 'color: #E6A23C;')
              return
            }
            if (item.height) {
              el.style.height = `${item.height}px`
            } else {
              console.log('%cvue-mapboxgl: error Marker data (height is require)', 'color: #E6A23C;')
              return
            }
            marker = new Marker(el)
          } else {
            marker = new Marker()
          }
          vue.markers.push(
            marker.setLngLat([item.lng, item.lat])
              .addTo(vue.map)
          )
          vue.registerEvents(el, item)
        })
        console.log('%cvue-mapboxgl: Add Marker', 'color: #67C23A;')
      }
    },
    removeMarker () {
      const vue = this
      if (vue.markers) {
        vue.markers.map(item => {
          item.remove()
        })
        console.log('%cvue-mapboxgl: Remove Marker', 'color: #E6A23C;')
        if (!vue.map) {
          vue.markers = []
          console.log('%cvue-mapboxgl: Set Marker Null', 'color: #F56C6C;')
        }
      }
    },
    registerEvents (el, item) {
      const vue = this
      el.addEventListener('click', function () {
        vue.$emit('markerClick', item)
      })
      el.addEventListener('mouseenter', function () {
        vue.$emit('markerMouseenter', item)
      })
      el.addEventListener('mouseleave', function () {
        vue.$emit('markerMouseleave', item)
      })
    }
  }
}
</script>
