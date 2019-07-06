import Base from './base'
export default class Heatmap extends Base {
  constructor (osm, heatmap) {
    super(osm)
    let data = this.setFeatures(heatmap.data)
    this.config.sources['heatmap-data'] = {
      'type': 'geojson',
      'data': data
    }
    this.config.layers.push({
      'id': 'heat',
      'type': 'heatmap',
      'source': 'heatmap-data',
      'maxzoom': 18,
      'paint': {
        'heatmap-radius': heatmap.radius || 10,
        'heatmap-weight': heatmap.weight || 1,
        'heatmap-intensity': heatmap.intensity || 1,
        'heatmap-opacity': heatmap.opacity || 0.8,
        'heatmap-color': heatmap.color || ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0, 0, 255, 0)', 0.1, 'royalblue', 0.3, 'cyan', 0.5, 'lime', 0.7, 'yellow', 1, 'red']
      }
    })
  }

  setFeatures (data) {
    let features = {
      'type': 'FeatureCollection',
      'features': data.map(item => {
        return { 'type': 'Feature', 'properties': item, 'geometry': { 'type': 'Point', 'coordinates': [ item.lng, item.lat ] } }
      })
    }
    return features
  }
}
