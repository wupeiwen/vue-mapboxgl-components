import Base from './base'
export default class Region extends Base {
  constructor (osm, region) {
    super(osm)
    this.config.sources['regionmap-data'] = {
      'type': 'geojson',
      'data': region.geojson
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
