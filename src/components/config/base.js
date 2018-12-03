export default class Base {
  // 构造函数
  constructor (osm) {
    this.osmConfig = {
      'version': 8,
      'glyphs': `${osm.osmUrl}/fonts/{fontstack}/{range}.pbf`,
      'sources': {
        'osm-tiles': {
          'type': 'raster',
          'tiles': [
            `${osm.osmUrl}/styles/${osm.backgroundStyle}/{z}/{x}/{y}.png`
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
    this._config = this.osmConfig
  }
  // get方法
  get config () {
    return this._config
  }
}
