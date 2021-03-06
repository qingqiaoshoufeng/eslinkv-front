import { initAMapApiLoader } from '../lib/'
import { SCENEINDEXMAP } from '../config'
import bus from '../utils/bus'
initAMapApiLoader({
	plugin: [
		'AMap.Scale',
		'AMap.MapType',
		'AMap.DistrictSearch',
		'AMap.Driving',
		'AMap.Heatmap',
		'AMap.GeoJSON',
		'AMap.MoveAnimation',
		'AMap.Geocoder',
		'AMap.HawkEye',
		'AMap.ToolBar',
	],
	v: '1.4.15',
	key: '8081bdaac8258a8a4a6244bf16084fed',
})

export default {
	data() {
		return {
			showMap: true,
			mapReady: false,
			mapComponentName: 'AirSupplyHighPressure',
			mapComponentNameBefore: '',
			mapConfig: {
				center: [120.131259, 30.263295],
				zoomEnable: true,
				doubleClickZoom: false,
				touchZoom: false,
				dragEnable: true,
				zoom: 10,
				viewMode: '2D',
				// pitch: 10,
				// zooms:[11,19],
				mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
			},
		}
	},
	computed: {
		// 是否显示地图
		showMapPage() {
			const { mapReady, showMap, mapComponentName } = this
			return mapReady && showMap && mapComponentName
		},
	},
	methods: {
		handleSceneChange(e) {
			const sceneIndexMap = SCENEINDEXMAP
			const { index } = e.detail
			console.log(index, 'index')
			const pageName = sceneIndexMap[index] || ''
			// 无匹配pageName 则 不显示地图
			this.showMap = !!pageName
			const pageNameArr = pageName.split('-')
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
				bus.$emit('clearRoutePlan')
			}
			// if(this.map){
			//     this.map.clearMap()
			// }
			this.$nextTick(() => {
				this.mapComponentNameBefore = this.mapComponentName
				this.mapComponentName = pageName
				this._provided.parentInfo.pageName = pageName
				this.sateMapCtrPos = [
					'ServiceNineteen',
					'ServiceHangranCode',
				].includes(pageName)
					? 'left'
					: null
			})
		},
		mapInit() {
			console.log('地图初始化完成！')
			this.mapReady = true
			this.map = this.$refs.amap.$amap

			// this.$refs.amap.$amap.addControl(new AMap.MapType())
			// this.$refs.amap.$amap.addControl(
			// 	new AMap.HawkEye({
			// 		autoMove: true,
			// 		isOpen:true,
			// 		mapStyle: this.mapConfig.mapStyle,
			// 	})
			// )
			// this.$refs.amap.$amap.addControl(
			//     new AMap.ToolBar({
			//         position: {
			//             top: '110px',
			//             right: '40px'
			//         }
			//     })
			// )
			// this.$refs.amap.$amap.addControl(new AMap.ToolBar({
			//     offset:AMap.Pixel(100,100)
			// }));

			// let originInstance = new AMap.TileLayer.Satellite({
			// 	zIndex: 1,
			// 	opacity: 1,
			// });
			// sy111.getLayers().forEach(item => {
			// 	item.mapName = 'sy'
			// 	item.hide()
			// })
			// this.$refs.amap.$amap.add(originInstance);
		},
	},
	created() {
		document.addEventListener('SceneIndex', this.handleSceneChange)
	},
	beforeDestroy() {
		document.removeEventListener('SceneIndex', this.handleSceneChange)
	},
}
