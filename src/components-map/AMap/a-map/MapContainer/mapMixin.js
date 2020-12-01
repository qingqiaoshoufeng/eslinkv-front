import { initAMapApiLoader } from '../lib/'
import { SCENEINDEXMAP } from '../config'
initAMapApiLoader({
    // 高德key
    plugin: [
        'AMap.Scale',
        'AMap.MapType',
        'AMap.DistrictSearch',
        'AMap.Driving',
        'AMap.HeatMap',
        'AMap.GeoJSON',
        'AMap.MoveAnimation',
    ],
    uiVersion: '1.1.1',
    v: '2.0',
    key: '8081bdaac8258a8a4a6244bf16084fed',
})

export default {
    data() {
        return {
            showMap: false,
            mapReady: false,
            mapComponentName: 'AirSupplyHighPressure',
        }
    },
    computed: {
        //是否显示地图
        showMapPage() {
            let { mapReady, showMap, mapComponentName } = this
            return mapReady && showMap && mapComponentName
        },
    },
    methods: {
        handleSceneChange(e) {
            let sceneIndexMap = SCENEINDEXMAP
            let { index } = e.detail
            let pageName = sceneIndexMap[index] || ''
            console.log(pageName,'eee')
            if (!pageName) {
                return (this.showMap = false)
            } else {
                this.showMap = true
            }
            if (pageName === 'unchange' || pageName === this.mapComponentName) {
                return false
            }
            this.mapComponentName = pageName
            console.log(pageName)
        },
        mapInit() {
            console.log('地图初始化完成！')
            this.mapReady = true
            // suyanMap.setFitView([ new AMap.Marker({
            //     position: [119.421306, 29.92495]
            // }), new AMap.Marker({
            //     position: [120.718659, 30.463387]
            // })],true,[273,273,500,500])
            // suyanMap.setFitView([],true,[])
        },
    },
    mounted() {
        document.addEventListener('SceneIndex', this.handleSceneChange)
    },
    beforeDestroy() {
        document.removeEventListener('SceneIndex', this.handleSceneChange)
    },
}



