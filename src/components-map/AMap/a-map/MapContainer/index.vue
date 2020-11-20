<template>
	<div class="map-container">
		<el-amap
			vid="overviewMap"
			ref="amap"
			class="hr-map"
			:events="{
				init: mapInit,
			}"
			v-bind="mapConfig"
		>
			<!-- 不同场景渲染不同的页面 -->
			<template v-if="mapReady && showMap && mapComponentName">
				<component @closePop="handleClosePop" :is="mapComponentName" />
			</template>
		</el-amap>
		<!-- 地图类型 -->
		<!-- <MapTypeLegend /> -->
		<portal-target name="destination"></portal-target>
	</div>
</template>

<script>
import { AMap } from '../lib';
// import MapLegend from './MapLegend/index';
// import MapTypeLegend from './MapTypeLegend/index';
//引入页面
const files = require.context('./MapPages/', true, /page\.js$/);
const modules = {};
const path = require('path');
files.keys().forEach(key => {
	let pageModule = files(key).default || files(key);
	const pageName = path.dirname(key).slice(2);
	Object.keys(pageModule).forEach(subPageName => {
		modules[pageName + subPageName] = pageModule[subPageName];
	});
});
import {
	AIRSUPPLYLEGEND_LOWPRESSURE,
	AIRSUPPLYLEGEND_HIGHPRESSURE,
	AIRSUPPLYLEGEND_UCAN,
	AIRSUPPLYLEGEND_LNG,
	SERVICELEGEND_MARKET,
	SERVICELEGEND_CUSTOMER,
	SERVICELEGENDCUSTOMERMAP,
	SERVICELEGENDMARKETMAP,
	AIRSUPPLYOVERLAYCONFIGMAP,
	SERVICELEGEND_HANGRANCODE,
	SERVICELEGENDHANGRANCODEMAP,
	SERVICELEGEND19MAP,
	SERVICELEGEND_SERVICE_19,
	SERVICELEGENDICCUSTOMERMAP,
	SERVICELEGEND_ICCUSTOMER,
} from '../config/index';
import bus from '../utils/bus';

export default {
	name: 'MainMap',
	components: {
		ElAmap: AMap,
		// AirSupplyMap,
		// serviceCustomerMap,
		// serviceMarketMap,
		// MapLegend,
		// MapTypeLegend,
		// RightPanelList,
		// serviceHangranCode,
		// service19,
		// serviceICcustomer,
		// DataStatistics,
		...modules,
	},
	data() {
		return {
			mapConfig: {
				center: [120.061259, 30.183295],
				zoomEnable: true,
				doubleClickZoom: false,
				dragEnable: true,
				zoom: 11,
				viewMode: '3D',
				pitch: 10,
				mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
			},
			mapCenter: null,
			mapLegendStyle: null,
			mapLegendStyleNormal: { left: '50%' },
			mapReady: false,
			mapComponentName: 'AirSupplyHighPressure',
			currentScene: 'AirSupplyHighPressure',
			activeItem: {},
			showMap: false,
			sence: null,
		};
	},
	watch: {
		currentScene(val) {
			this.mapComponentName = val;
		},
	},
	mounted() {
		bus.$on('currentSceneChange', val => {
			if (!val) {
				return (this.showMap = false);
			} else {
				this.showMap = true;
			}
			if (val === 'unchange' || val === this.currentScene) {
				return false;
			}
			this.currentScene = val;
			this.initPage(val);
		});
	},
	beforeDestroy() {
		bus.$off(['currentSceneChange']);
	},
	methods: {
		mapInit() {
			console.log('地图初始化完成！');
			this.mapReady = true;
			this.map = this.$refs.amap.$amap;
			this.initPage('AirSupplyHighPressure');
			// setTimeout(() => {
			// 	this.map.addControl(new window.AMap.MapType());
			// }, 2000);
		},
		initPage() {
			if (this.map) {
				let { mapCenter, mapConfig } = this;
				let { zoom, center } = mapConfig;
				this.map.setZoom(zoom, 100);
				this.map.panTo(mapCenter ? mapCenter : center, 0);
			}
		},
		handleClosePop() {
			this.activeItem = {};
		},
	},
};
</script>
 <style lang="scss" scoped>
.hr-map {
	position: fixed;
	top: 0;
	left: 0;
	width: 3560px;
	height: 1380px;
}
</style>
