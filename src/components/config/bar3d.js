import Base from './base'
export default class bar3d extends Base {
  constructor (osm, extrusion) {
    super(osm)
    this.shape = extrusion.shape
    this.config.sources['columnData'] = {
      'type': 'geojson',
      'data': this.setFeatures(extrusion.data)
    }
    this.config.layers.push({
      'id': 'column',
      'type': 'fill-extrusion',
      'source': 'columnData',
      'paint': {
        // See the Mapbox Style Specification for details on data expressions.
        // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

        // Get the fill-extrusion-color from the source 'color' property.
        'fill-extrusion-color': ['get', 'color'],

        // Get fill-extrusion-height from the source 'height' property.
        // 'fill-extrusion-base': ['get', 'base_height'],

        // Get fill-extrusion-height from the source 'height' property.
        'fill-extrusion-height': ['get', 'height'],

        // Make extrusions slightly opaque for see through indoor walls.
        'fill-extrusion-opacity': 0.8
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
    const offset = 0.002
    if (this.shape === 'column') {
      coordinates = [
        [lat - offset, lng + offset],
        [lat - offset, lng - offset],
        [lat + offset, lng - offset],
        [lat + offset, lng + offset],
        [lat - offset, lng + offset]
      ]
    }
    return coordinates
  }
}
