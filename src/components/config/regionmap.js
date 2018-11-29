import Base from './base'
export default class regionmap extends Base {
  constructor (osmUrl, style, regionName) {
    super(osmUrl, style)
    const data = require(`../geojson/region/${regionName}.json`)
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
        'fill-color': '#000',
        'fill-opacity': 0.4,
        'fill-outline-color': '#323'
      }
    })
  }
}
