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
    map (oldvalue, newValue) {
      this.addPopup()
    }
  },
  methods: {
    addPopup () {
      const vue = this
      const markerHeight = 50
      const markerRadius = 10
      const linearOffset = 25
      const popupOffsets = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      }
      const popup = new Mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
        .setLngLat(vue.laglng)
        .setHTML('<h1>Hello World!</h1>')
        .addTo(vue.map)
      console.log(popup)
    }
  }
}
</script>
