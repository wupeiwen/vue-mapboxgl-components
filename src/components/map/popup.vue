<template>
  <div class="propup"></div>
</template>

<script>
import { mapState } from 'vuex'
import Mapboxgl from 'mapbox-gl'
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
  computed: {
    ...mapState('map', {
      map: state => state.map
    })
  },
  watch: {
    map (newValue, oldvalue) {
      this.addPopup()
    },
    showPopup (newValue, oldvalue) {
      if (newValue === false) {
        this.removePopup()
      } else {
        this.addPopup()
      }
    },
    htmlContent (newValue, oldvalue) {
      this.removePopup()
      this.addPopup()
    },
    laglng (newValue, oldvalue) {
      this.removePopup()
      this.addPopup()
    }
  },
  data () {
    return {
      popup: null
    }
  },
  methods: {
    addPopup () {
      const vue = this
      if (vue.map) {
        vue.popup = null
        vue.popup = new Mapboxgl.Popup({ className: 'my-popup-class' })
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
