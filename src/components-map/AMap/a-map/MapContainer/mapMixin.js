import { initAMapApiLoader } from '../lib/'
import { SCENEINDEXMAP } from '../config'
import bus from '../utils/bus'
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
			mapComponentNameBefore: '',
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
            //无匹配pageName 则 不显示地图
            console.log(index)
			this.showMap = !!pageName
            let pageNameArr = pageName.split('-')
			if (pageNameArr[0] === 'unchange') {
				if (pageNameArr[1]) {
					this.mapComponentNameBefore = pageNameArr[1]
				}
				return false
            }
			this.changePageName(pageName)
		},
		changePageName(pageName) {
			if (this.mapComponentNameBefore === 'routeplan') {
                bus.$emit('clearRoutePlan');
            }
			this.mapComponentNameBefore = this.mapComponentName
            this.mapComponentName = pageName
			this._provided.parentInfo.pageName = pageName;
		},
		mapInit() {
			console.log('地图初始化完成！')
			this.mapReady = true
			window.sss = this.$refs.amap
			this.$refs.amap.$amap.addControl(new AMap.MapType())
		},
	},
	mounted() {
		document.addEventListener('SceneIndex', this.handleSceneChange)
	},
	beforeDestroy() {
		document.removeEventListener('SceneIndex', this.handleSceneChange)
	},
}
