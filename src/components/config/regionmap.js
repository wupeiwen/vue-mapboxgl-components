import Base from './base'
export default class regionmap extends Base {
  constructor (osm, regionName, regionFill) {
    super(osm)
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
        'fill-color': regionFill.fillColor || '#000',
        'fill-opacity': regionFill.fillOpacity || 0.6,
        'fill-outline-color': regionFill.fillOutlineColor || '#323'
      }
    })
  }
}
