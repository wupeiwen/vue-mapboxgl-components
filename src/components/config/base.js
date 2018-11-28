export default class Base {
  // 构造函数
  constructor (osmUrl, style) {
    this.config = {
      'version': 8,
      'glyphs': `${osmUrl}/fonts/{fontstack}/{range}.pbf`,
      'sources': {
        'osm-tiles': {
          'type': 'raster',
          'tiles': [
            `${osmUrl}/styles/${style}/{z}/{x}/{y}.png`
          ],
          'tileSize': 256
        }
      },
      'layers': [{
        'id': 'background',
        'type': 'raster',
        'source': 'osm-tiles',
        'minzoom': 0,
        'maxzoom': 22
      }]
    }
  }
  // get方法
  get config () {
    return this._config
  }
  // set方法
  set config (_config) {
    this._config = _config
  }
}
