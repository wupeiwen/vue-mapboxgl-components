import Base from './base'
export default class Building extends Base {
  constructor (osmUrl, style) {
    super(osmUrl, style)
    this.config.sources['composite'] = { url: 'mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7', type: 'vector' }
    this.config.layers.push({
      'id': 'building_layer',
      'type': 'fill-extrusion',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
    })
  }
}
