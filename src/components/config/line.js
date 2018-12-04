import Base from './base'
export default class line extends Base {
  constructor (osm, line) {
    super(osm)
    this.config.sources['lineData'] = {
      'type': 'geojson',
      'data': this.setFeatures(line.data)
    }
    this.config.layers.push({
      'id': 'lines',
      'type': 'line',
      'source': 'lineData',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': line.color || '#888',
        'line-width': line.width || 3,
        'line-opacity': line.opacity || 0.8
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
            'type': 'LineString',
            'coordinates': this.setCoordinates(item[0], item[1])
          }
        }
      })
    }
    return features
  }

  setCoordinates (point1, point2) {
    let coordinates = [
      [point1.lat, point1.lng],
      [point2.lat, point2.lng]
    ]
    return coordinates
  }
}
