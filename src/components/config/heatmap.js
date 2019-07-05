import Base from './base'
export default class Heatmap extends Base {
  constructor (osm, data) {
    super(osm)
    this.config.sources['heatmap-data'] = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': data.map(item => {
          return { 'type': 'Feature', 'properties': item, 'geometry': { 'type': 'Point', 'coordinates': [ item.lng, item.lat ] } }
        })
      }
    }
    this.config.layers.push({
      'id': 'heat',
      'type': 'heatmap',
      'source': 'heatmap-data',
      'maxzoom': 15
    })
  }
}
