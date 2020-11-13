// 初始化接口
import { initAMapApiLoader } from './services/injected-amap-api-instance'

// 组建导入
import AMap from './components/amap.vue'
import AMapMarker from './components/amap-marker.vue'
import AMapPolyline from './components/amap-polyline.vue'

// managers
import AMapManager from './managers/amap-manager'

export { AMap, AMapMarker, AMapPolyline }

export { AMapManager, initAMapApiLoader }
export { lazyAMapApiLoaderInstance } from './services/injected-amap-api-instance'
