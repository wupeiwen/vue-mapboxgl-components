import Base from './base'
import data from '../geojson/bar3d.json'
export default class bar3d extends Base {
  constructor (osmUrl, style, shape, columnData) {
    super(osmUrl, style)
    this.config.sources['columnData'] = {
      'type': 'geojson',
      'data': data
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
}
