>基于 [Vue](https://cn.vuejs.org/index.html) 和 [Mapbox-gl](https://www.mapbox.com/mapbox-gl-js/api/) 的地理信息可视化组件库

![](https://travis-ci.com/wupeiwen/vue-mapboxgl-components.svg?branch=master)
[![](https://img.shields.io/npm/v/vue-mapboxgl-components.svg)](https://www.npmjs.com/package/vue-mapboxgl-components)
![](https://img.shields.io/bundlephobia/min/vue-mapboxgl-components.svg)
![](https://img.shields.io/npm/dt/vue-mapboxgl-components.svg)
[![](https://img.shields.io/badge/-详细文档-green.svg)](https://wupeiwen.github.io/vue-mapboxgl-components)

## 快速开始

### 安装依赖
------
可以通过 npm 添加依赖
```
  npm i vue-mapboxgl-components --save
```
或者通过 yarn 添加依赖
```
  yarn add vue-mapboxgl-components --save
```

### 引入
------
在 Vue 项目的 main.js 中写入以下内容：
```
import Vue from 'vue'
import 'vue-mapboxgl-components'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```
以上代码便完成了 vue-mapboxgl-components 的引入。

### 开始使用
------
开发环境已经搭建完毕，在需要使用可视化图表的页面通过 html 标签的形式使用，如：
```
<template>
  <div id="app">
    <mapview :map-config="mapConfig" :osm-config="osmConfig"
      :map-types="mapTypes" :line="line" :point="point"
      @pointClick="pointClick">
    </mapview>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      mapConfig: {
        center: [120.142577, 30.27719],
        zoom: 5,
        pitch: 0,
        bearing: 0
      },
      osmConfig: {
        osmUrl: 'http://139.224.131.57:8700',
        backgroundStyle: 'custombrightstyle'
      },
      mapTypes: ['line', 'point'],
      line: {
        color: 'green',
        width: 3,
        opacity: 0.5,
        useCurve: true,
        showAnimation: true,
        data: [
          [{ lat: 122, lng: 40 }, { lat: 120, lng: 30 }],
          [{ lat: 110, lng: 36 }, { lat: 120, lng: 30 }]
        ]
      },
      point: {
        color: 'orange',
        textColor: 'red',
        showAnimation: true,
        opacity: 0.8,
        radius: 20,
        textOffset: 1,
        data: [
          { lat: 122, lng: 40, value: 10, name: '地点1' },
          { lat: 110, lng: 36, value: 30, name: '地点2' },
          { lat: 120, lng: 30, value: 10, name: '地点3' }
        ]
      }
    }
  },
  methods: {
    pointClick (pointData) {
      console.log(pointData)
    }
  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
```
![动态点和动态连线](https://raw.githubusercontent.com/wupeiwen/vue-mapboxgl-components/master/public/point_line.gif "动态点和动态连线")