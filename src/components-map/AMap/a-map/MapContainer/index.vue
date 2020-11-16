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
			<!-- 不同场景渲染不同的组件 -->
			<template v-if="mapReady">
				<component
					:activeItem="activeItem"
					@closePop="handleClosePop"
					:legendMap="legendMap"
					:is="mapComponentName"
				/>
			</template>
		</el-amap>
		<!-- 右侧列表 -->
		<right-panel-list
			class="right-panel"
			@list-click="handleListClick"
		></right-panel-list>
		<!-- 地图 legend  -->
		<MapLegend
			:data="legendMap"
			@legend-click="handleLegendClick"
			class="map-legend"
		/>
		<!-- 地图类型 -->
		<MapTypeLegend />
	</div>
</template>

<script>
import { AMap } from '../lib';
import MapLegend from './MapLegend/index';
import MapTypeLegend from './MapTypeLegend/index';
import RightPanelList from './RightPaneList/';
import { HomeMap, serviceCustomerMap, serviceMarketMap } from './MapPages/';
// import { HomeMap } from './MapPages/';
import {
	HOMELEGEND_STATION,
	HOMELEGEND_PIPE,
	HOMELEGEND_UCAN,
	PROJECTLEGEND,
	SERVICELEGEND,
	SERVICELEGEND_MARKET,
	SERVICELEGEND_CUSTOMER,
	SERVICELEGENDCUSTOMERMAP,
	SERVICELEGENDMARKETMAP,
	HOMEOVERLAYCONFIGMAP,
} from '../config/index';
import bus from '../utils/bus';

export default {
	name: 'MainMap',
	components: {
		ElAmap: AMap,
		HomeMap,
		serviceCustomerMap,
		serviceMarketMap,
		// ProjectMap,
		MapLegend,
		MapTypeLegend,
		RightPanelList,
	},
	data() {
		return {
			mapConfig: {
				center: [120.061259, 30.273295],
				zoomEnable: true,
				doubleClickZoom: false,
				dragEnable: true,
				zoom: 11,
				viewMode: '3D',
				pitch: 10,
				mapStyle: 'amap://styles/e0e1899c1695e012c70d0731a5cda43c',
			},
			mapReady: false,
			mapComponentName: 'homeMap',
			currentScene: 'home',
			legendConfig: {},
			activeItem: {},
			legendMap: {},
		};
	},
	watch: {
		currentScene(val) {
			let { legendConfig, _overlayConfigMap } = this;
			let pageName = val;
			console.log(val);
			//多个场景共用一个地图
			if (val.indexOf('-') > -1) {
				pageName = pageName.split('-')[0];
			}
			let pageOverlayConfig = _overlayConfigMap[pageName];
			let obj = {};
			Object.keys(legendConfig).map(legend => {
				let isShow = legendConfig[legend];
				obj[legend] = {
					...pageOverlayConfig[legend],
					isShow,
				};
			});
			this.legendMap = obj;
		},
	},
	created() {
		this._overlayConfigMap = {
			home: HOMEOVERLAYCONFIGMAP,
			service: HOMEOVERLAYCONFIGMAP,
			service_customer: SERVICELEGENDCUSTOMERMAP,
			project: HOMEOVERLAYCONFIGMAP,
			service_market: SERVICELEGENDMARKETMAP,
		};
		this._pageConfig = {
			'home-station': {
				mapComponentName: 'homeMap',
				rightPanelComponentName: 'homeMap',
				legendConfig: HOMELEGEND_STATION,
			},
			'home-pipe': {
				mapComponentName: 'homeMap',
				legendConfig: HOMELEGEND_PIPE,
			},
			'home-ucan': {
				mapComponentName: 'homeMap',
				legendConfig: HOMELEGEND_UCAN,
			},
			service_customer: {
				mapComponentName: 'serviceCustomerMap',
				legendConfig: SERVICELEGEND_CUSTOMER,
			},
			service_market: {
				mapComponentName: 'serviceMarketMap',
				legendConfig: SERVICELEGEND_MARKET,
			},
			project: {
				mapComponentName: 'projectMap',
				legendConfig: PROJECTLEGEND,
			},
		};
		bus.$on('currentSceneChange', val => {
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
			this.initPage('home');
			setTimeout(() => {
				this.map.addControl(new window.AMap.MapType());
			}, 2000);
		},
		initPage(val) {
			let config = this._pageConfig[val];
			if (!config) return false;
			Object.keys(config).forEach(targetProp => {
				this[targetProp] = config[targetProp];
			});
			if (this.map) {
				let { zoom, center } = this.mapConfig;
				this.map.setZoom(zoom);
				this.map.panTo(center);
			}
		},
		handleLegendClick(prop) {
			let changedItem = this.legendMap[prop];
			changedItem.isShow = !changedItem.isShow;
		},
		handleListClick(item) {
			this.activeItem = item;
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
.map-legend {
	position: absolute;
	bottom: 50px;
	right: 50%;
	transform: translateX(50%);
	max-width: 1414px;
}
</style>
