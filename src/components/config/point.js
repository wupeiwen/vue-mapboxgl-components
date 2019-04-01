import Base from './base'
export default class Point extends Base {
  constructor (osm, point) {
    super(osm)
    this.config.sources['pointData'] = {
      'type': 'geojson',
      'data': this.setFeatures(point.data)
    }
    this.config.layers.push({
      'id': 'points',
      'type': 'circle',
      'source': 'pointData',
      'paint': {
        'circle-blur': 0,
        'circle-radius': (function () {
          if (point.radius) {
            // 如果设置了半径，返回该半径
            return point.radius
          } else if ((point.minValue || point.maxValue) && (point.minRadius || point.maxRadius)) {
            // 如果设置了最大值半径和最小值半径，按照映射关系返回相应半径
            return {
              'property': 'value',
              'stops': [
                [point.minValue, point.minRadius],
                [point.maxValue, point.maxRadius]
              ]
            }
          } else {
            // 如果设置了最大值半径、最小值半径、半径均未设置，返回默认半径 5
            return 5
          }
        })(),
        'circle-color': point.color || '#888'
      }
    })
    this.config.layers.push({
      'id': 'points_name',
      'type': 'symbol',
      'source': 'pointData',
      'paint': {
        'text-color': point.textColor || '#888',
        'text-opacity': point.opacity || 0.8
      },
      'layout': {
        'text-field': '{name}',
        'text-size': 18,
        'text-offset': [0, point.textOffset || 2]
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
            'type': 'Point',
            'coordinates': this.setCoordinates(item.lat, item.lng)
          }
        }
      })
    }
    return features
  }

  setCoordinates (lat, lng) {
    let coordinates = [lat, lng]
    return coordinates
  }
}
