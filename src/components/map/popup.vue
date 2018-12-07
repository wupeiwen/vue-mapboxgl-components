<template>
  <div class="propup"></div>
</template>

<script>
import { Popup } from 'mapbox-gl'
import { EventBus } from '../eventbus.js'
export default {
  name: 'propup',
  props: {
    laglng: {
      type: Array,
      default: function () {
        return [120.1, 30.1]
      }
    },
    showPopup: {
      type: Boolean,
      default: true
    },
    htmlContent: {
      type: String,
      detault: '<h1>Hello World!</h1>'
    }
  },
  watch: {
    map (newValue, oldvalue) {
      if (this.showPopup) {
        this.addPopup()
      }
    },
    showPopup (newValue, oldvalue) {
      if (newValue === false) {
        this.removePopup()
      } else {
        this.addPopup()
      }
    },
    htmlContent (newValue, oldvalue) {
      if (this.showPopup) {
        this.removePopup()
        this.addPopup()
      }
    },
    laglng (newValue, oldvalue) {
      if (this.showPopup) {
        this.removePopup()
        this.addPopup()
      }
    }
  },
  data () {
    return {
      popup: null,
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
    addPopup () {
      const vue = this
      if (vue.map) {
        vue.popup = null
        vue.popup = new Popup({ className: 'my-popup-class' })
          .setLngLat(vue.laglng)
          .setHTML(vue.htmlContent)
          .addTo(vue.map)
        console.log('%cvue-mapboxgl: Add Popup', 'color: #67C23A;')
      }
    },
    removePopup () {
      const vue = this
      if (vue.popup) {
        vue.popup.remove()
        console.log('%cvue-mapboxgl: Remove Popup', 'color: #E6A23C;')
        if (!vue.map) {
          vue.popup = null
          console.log('%cvue-mapboxgl: Set Popup Null', 'color: #F56C6C;')
        }
      }
    }
  }
}
</script>
