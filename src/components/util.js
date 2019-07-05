export class CreateBezierPoints {
  // anchorpoints：贝塞尔基点
  // pointsAmount：生成的点数
  // return 路径点的Array
  constructor (anchorpoints, pointsAmount) {
    var points = []
    for (var i = 0; i < pointsAmount; i++) {
      var point = this.multiPointBezier(anchorpoints, i / pointsAmount)
      points.push(point)
    }
    return points
  }
  multiPointBezier (points, t) {
    var len = points.length
    var lng = 0; var lat = 0

    for (var i = 0; i < len; i++) {
      var point = points[i]
      lng += point.lng * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.binomial(len - 1, i))
      lat += point.lat * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.binomial(len - 1, i))
    }
    return [lng, lat]
  }
  binomial (start, end) {
    var cs = 1; var bcs = 1
    while (end > 0) {
      cs *= start
      bcs *= end
      start--
      end--
    }
    return (cs / bcs)
  }
}
