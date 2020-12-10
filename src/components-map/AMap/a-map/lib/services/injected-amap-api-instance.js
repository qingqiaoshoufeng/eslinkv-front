//引入地图的脚本
let lazyAMapApiLoaderInstance = null
import AMapAPILoader from './lazy-amap-api-loader'
import Vue from 'vue'
export const initAMapApiLoader = (config) => {
    if (Vue.prototype.$isServer) return
    if (lazyAMapApiLoaderInstance) return
    if (!lazyAMapApiLoaderInstance)
        lazyAMapApiLoaderInstance = new AMapAPILoader(config)
    window.lazyAMapApiLoaderInstance = lazyAMapApiLoaderInstance
    lazyAMapApiLoaderInstance.load()
}
export { lazyAMapApiLoaderInstance }
