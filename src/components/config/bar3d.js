import Base from './base'
export default class bar3d extends Base {
  constructor (osm, extrusion) {
    super(osm)
    this.offset = extrusion.offset || 0.02
    this.shape = extrusion.shape || 'column'
    this.config.sources['extrusionData'] = {
      'type': 'geojson',
      'data': this.setFeatures(extrusion.data)
    }
    this.config.layers.push({
      'id': 'extrusions',
      'type': 'fill-extrusion',
      'source': 'extrusionData',
      'paint': {
        // See the Mapbox Style Specification for details on data expressions.
        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

        // Get the fill-extrusion-color from the source 'color' property.
        'fill-extrusion-color': (function () {
          if (extrusion.color) {
          // 如果设置了统一颜色，返回该颜色
            return extrusion.color
          } else if ((extrusion.minValue || extrusion.maxValue) && (extrusion.colorList)) {
            // 如果设置了最大值/高度和最小值/高度，按照映射关系返回相应半径
            return {
              'property': 'value',
              'stops': [
                [extrusion.minValue, extrusion.colorList[0]],
                [extrusion.maxValue, extrusion.colorList[1]]
              ]
            }
          } else {
            // 如果最大值、最小值、颜色数组均未设置，返回默认颜色
            return 'red'
          }
        })(),
        'fill-extrusion-height': (function () {
          if (extrusion.height) {
          // 如果设置了统一高度，返回该高度
            return extrusion.height
          } else if ((extrusion.minValue || extrusion.maxValue) && (extrusion.minHeight || extrusion.maxHeight)) {
            // 如果设置了最大值/高度和最小值/高度，按照映射关系返回相应半径
            return {
              'property': 'value',
              'stops': [
                [extrusion.minValue, extrusion.minHeight],
                [extrusion.maxValue, extrusion.maxHeight]
              ]
            }
          } else {
            // 如果最大值/高度和最小值/高度、统一高度均未设置，返回默认高度
            return 1000
          }
        })(),
        'fill-extrusion-opacity': extrusion.opacity || 0.8
      }
    })
  }

  setFeatures (data) {
    let features = {
      'type': 'FeatureCollection',
      'features': data.map(item => {
        return {
          'type': 'Feature',
          'properties': item,
          'geometry': {
            'type': 'Polygon',
            'coordinates': [this.setCoordinates(item.lat, item.lng)]
          }
        }
      })
    }
    return features
  }

  setCoordinates (lat, lng) {
    let coordinates = []
    if (this.shape === 'column') {
      coordinates = [
        [lat - this.offset, lng + this.offset],
        [lat - this.offset, lng - this.offset],
        [lat + this.offset, lng - this.offset],
        [lat + this.offset, lng + this.offset],
        [lat - this.offset, lng + this.offset]
      ]
    }
    return coordinates
  }
}
