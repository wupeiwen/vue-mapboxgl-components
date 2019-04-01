>基于 [Vue](https://cn.vuejs.org/index.html) 和 [Mapbox-gl](https://www.mapbox.com/mapbox-gl-js/api/) 的地理信息可视化组件库

![](https://travis-ci.com/wupeiwen/vue-mapboxgl-components.svg?branch=master)
[![](https://img.shields.io/npm/v/vue-mapboxgl-components.svg)](https://www.npmjs.com/package/vue-mapboxgl-components)
![](https://img.shields.io/bundlephobia/min/vue-mapboxgl-components.svg)
![](https://img.shields.io/npm/dt/vue-mapboxgl-components.svg)
[![](https://img.shields.io/badge/-详细文档-green.svg)](https://wupeiwen.github.io/vue-mapboxgl-components)
## 快速开始
组件库的依赖安装、引入，以及开始使用的过程请参考[基础文档](https://github.com/wupeiwen/vue-mapboxgl-components)

## 组件说明
>配置项/参数标记<span style="color:red;">*</span> 的为必选项，<span style="color:orange;">[ ]</span> 为可选项
### mapview 地图视图 <span style="color:red;">*</span>
使用`<mapview></mapview>`标签实现地图底图以及相应可视化图层的配置，共有`osmConfig`、`mapConfig`、`mapTypes`三个标签属性，以及`@event`图层响应事件。
#### `osmConfig` <span style="color:red;">*</span>
对象类型，有`osmUrl <String>`osm地址以及`backgroundStyle <String>`地图样式两个属性。
可参考：
```
<!-- mapview标签 -->
<mapview :osmConfig="osmConfig"></mapview>
<!-- osmConfig对象 -->
let osmConfig = { 
  osmUrl: 'http://ip:port',
  backgroundStyle: 'custombrightstyle'
}
```
#### `mapConfig` <span style="color:red;">*</span>
对象类型，有`center <Array>`中心点、`zoom <Number>`缩放等级、`pitch <Number>`视角俯视的倾斜角度、`bearing <Number>`地图的旋转角度四个属性。
可参考：
```
<!-- mapview标签 -->
<mapview :mapConfig="mapConfig"></mapview>
<!-- mapConfig对象 -->
let mapConfig = {
  center: [120.142577, 30.27719],
  zoom: 5,
  pitch: 0,
  bearing: 0
}
```
#### `mapTypes` <span style="color:red;">*</span>
数组类型，有`line`、`point`、`bar3d`、`region`、`heatmap`等可选项，不同类型可以搭配使用。
可参考：
```
<!-- mapview标签 -->
<mapview :mapTypes="mapTypes"></mapview>
<!-- mapTypes对象 -->
let mapTypes = ['line','point']
```
#### `@event` <span style="color:orange;">[ ]</span>
响应事件，有`point/line/extrusionClick`、`point/line/extrusion`、`point/line/extrusion`等响应事件，返回该`line/point/extrusion`的相应信息。
可参考：
```
<!-- mapview标签 -->
<mapview :pointClick="callback"></mapview>
let callback = (data) =>{
  console.log(data)
}
```
------

### control 交互控件  <span style="color:orange;">[ ]</span>
使用`<control></control>`标签实现交互控件的显示与隐藏，共有`showNavigation`、`showFullscreen`、`showScale`三个标签属性。
#### `showNavigation`  <span style="color:orange;">[ ]</span>
布尔类型，控制导航控件的显示与隐藏，默认为`false`。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- control标签 -->
  <control :showNavigation="true/false"></control>
</mapview>
```
#### `showFullscreen`  <span style="color:orange;">[ ]</span>
布尔类型，控制全屏控件的显示与隐藏，默认为`false`。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- control标签 -->
  <control :showFullscreen="true/false"></control>
</mapview>
```
#### `showScale`  <span style="color:orange;">[ ]</span>
布尔类型，控制标尺控件的显示与隐藏，默认为`false`。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- control标签 -->
  <control :showScale="true/false"></control>
</mapview>
```
------

### popup 弹框组件  <span style="color:orange;">[ ]</span>
使用`<popup></popup>`标签实现和地理坐标系结合的弹窗，共有`showPopup`、`laglng`、`htmlContent`三个标签属性。
#### `showPopup` <span style="color:red;">*</span>
布尔类型，控制弹框的显示与隐藏，默认为`false`。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- popup标签 -->
  <popup :showPopup="true/false" :laglng="laglng" :htmlContent="htmlContent"></popup>
</mapview>
```
#### `laglng` <span style="color:red;">*</span>
数组类型，经纬度坐标用来定位popup。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- popup标签 -->
  <popup :showPopup="true/false" :laglng="laglng" :htmlContent="htmlContent"></popup>
</mapview>
<!-- 对应东经121.1度，北纬30.1度 -->
let laglng = [121.1, 30.1]
```
#### `htmlContent` <span style="color:red;">*</span>
字符串类型，控制弹出框内的DOM内容，默认为`'<h1>Hello World!</h1>'`，可通过配置该配置项展现自定义内容的弹出框。
```
<!-- mapview标签 -->
<mapview>
  <!-- popup标签 -->
  <popup :showPopup="true/false" :laglng="laglng" :htmlContent="htmlContent"></popup>
</mapview>
<!-- 弹出框内的DOM内容 -->
let htmlContent = '<h1>Hello World!</h1>'
```
------

### markers 标记组件 <span style="color:orange;">[ ]</span>
使用`<markers></markers>`标签实现点标记，有`data`一个标签属性，以及`markerClick`、`markerMouseenter` 、`markerMouseleave` 三个事件
#### data <span style="color:red;">*</span>
数组类型，数组的每个元素描述了标记点的`lat`精度、`lat`维度、`lat`标记图标的高度、`lat`标记图标的宽度以及`base64`标记图标的base64编码。
```
<!-- mapview标签 -->
<mapview>
  <!-- markers标签 -->
  <markers :data="data"></markers>
</mapview>
<!-- 标记点自定义图标对应的base64编码 -->
let imageBase64Code = 'data:image/png;base64,iVBORw0KGgoA...'
<!-- 数据 -->
let data = [
  { lat: 122, lng: 40, height: 48, width: 48, base64: imageBase64Code },
  { lat: 110, lng: 36, height: 48, width: 48, base64: imageBase64Code },
  { lat: 120, lng: 30, height: 48, width: 48, base64: imageBase64Code }
]
```
#### @event <span style="color:orange;">[ ]</span>
响应事件，包含`markerClick`鼠标点击事件、`markerMouseenter`鼠标移入事件以及`markerMouseenter`鼠标移除事件，返回该标记点的信息。可参考：
```
<!-- mapview标签 -->
<mapview>
  <!-- markers标签 -->
  <markers :data="data" @markerClick="callback"></markers>
</mapview>
let callback = (data) =>{
  console.log(data)
}
<!-- 浏览器控制台输出结果 -->
{ lat: 122, lng: 40, height: 48, width: 48, base64: imageBase64Code }
```
------

## 可视化图层配置项
### line
#### color
`<String>`类型，线的颜色，默认值`'green'`

#### width
`<Int>`类型，线的宽度，默认值`6`

#### opacity
`<Float>`类型，线的透明度，默认值`0.8`

#### useCurve
`<Boolean>`类型，使用贝塞尔曲线，默认值`true`

#### showAnimation
`<Boolean>`类型，使用动态效果，默认值`true`

#### data
`<Array>`类型，线条数据，包含起点和终点经纬度。可参考：
```
<!-- 连线数据 -->
[
  <!-- 连线1数据 -->
  [{ lat: 122, lng: 40 }, { lat: 120, lng: 30 }],
  <!-- 连线2数据 -->
  [{ lat: 110, lng: 36 }, { lat: 120, lng: 30 }]
]
```
------

### point
#### color
`<String>`类型，点的颜色，默认值`'orange'`

#### showAnimation
`<Boolean>`类型，使用动态效果，默认值`true`

#### opacity
`<Float>`类型，点的透明度，默认值`0.8`

#### radius
`<String>`类型，点的半径，如果设置了最大值半径、最小值半径、半径均未设置，则默认值为`5`

#### min/maxValue, min/maxRadius
`<Float>`类型，最大值/半径和最小值/半径，如果设置了最大值/半径和最小值/半径，按照映射关系返回相应半径

#### textColor

`<String>`类型，点描述文字的颜色，默认值`'red'`

#### textOffset

`<String>`类型，点描述文字的偏移量，默认值`0`

#### data
`<Array>`类型，点数据。可参考：
```
<!-- 点数据 -->
[
  <!-- 点数据1，精度、维度、描述文字、数值(使用半径/数值映射时必须有该字段) -->
  { lat: 122, lng: 37, name: '地点1', value: 10 },
  { lat: 110, lng: 36, name: '地点2', value: 20 },
  { lat: 120, lng: 30, name: '地点3', value: 30 }
]
```
------

### bar3d
#### shape
`<String>`类型，横截面形状，默认值`'column'`正方形

#### offset
`<float>`类型，偏移量，用来控制正方形的长度，默认值`0.002`精/维度

#### height
`<float>`类型，柱子的高度，默认值`1000`

#### maxHeight/minHeight
`<Int>`类型，最大/最小高度默认值`100/10`

#### maxValue/minValue
`<Int>`类型，最大/最小高度默认值`3000/10`

#### opacity
`<Float>`类型，柱子透明度，默认值`0.8`

#### color
`<String>`类型，柱子的颜色，默认值`'orange'`

#### colorList
`<Array>`类型，柱子的颜色组，默认值`['white', 'red']`

#### data
`<Array>`类型，柱子的数据。可参考：
```
[{
    lat: 120.058617889881,
    lng: 30.3123084318025,
    value: 2.1
  }, {
    lat: 120.077143907547,
    lng: 30.31249598846499,
    value: 2.2
  }, {
    lat: 120.07800221443175,
    lng: 30.30878183662179,
    value: 2.3
}]
```
------

### region
#### geojson
`<Object>`类型，区域的geojson数据，可参考：
```
```
#### color
`<String>`类型，区域的颜色，默认值`'red'`

#### opacity
`<Float>`类型，区域的透明度，默认值`0.4`

#### outineColor
`<String>`类型，边框的颜色，默认值`'green'`

------

### heatmap
`<Array>`类型，热力图数据。可参考：
```
[
  <!-- 热力数据1，精度、维度、数值 -->
  { lat: 120.1, lng: 30.1, value: 2.1 },
  { lat: 120.2, lng: 30.2, value: 2.2 },
  { lat: 120.3, lng: 30.3, value: 2.3 }
]
```