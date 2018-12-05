import Base from './base'
export default class regionmap extends Base {
  constructor (osm, region) {
    super(osm)
    const data = require(`../geojson/region/${region.name}.json`)
    this.config.sources['regionmap-data'] = {
      'type': 'geojson',
      'data': data
    }
    this.config.layers.push({
      'id': 'maine',
      'type': 'fill',
      'source': 'regionmap-data',
      'layout': {},
      'paint': {
        'fill-color': region.color || '#000',
        'fill-opacity': region.opacity || 0.6,
        'fill-outline-color': region.outlineColor || '#323'
      }
    })
  }
}
