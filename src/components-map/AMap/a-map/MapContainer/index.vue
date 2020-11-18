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
			<template v-if="mapReady && showMap">
				<component
					:activeItem="activeItem"
					@closePop="handleClosePop"
					:legendMap="legendMap"
					:is="mapComponentName"
                    :currentScene="currentScene"
				/>
			</template>
		</el-amap>
		<!-- 地图 legend  -->
		<MapLegend
			:data="legendMap"
			:multiple="legendMultiple"
			class="map-legend"
			:style="mapLegendStyle"
		/>
		<!-- 地图类型 -->
		<MapTypeLegend />
		<portal-target name="destination"> </portal-target>
		<DataStatistics :data="computedDataStatisticsList" v-if="showMap" />
	</div>
</template>

<script>
import { AMap } from '../lib';
import MapLegend from './MapLegend/index';
import MapTypeLegend from './MapTypeLegend/index';
import RightPanelList from './RightPaneList/';
import { DataStatistics } from '../components';
//地图覆盖物
import {
	AirSupplyMap,
	serviceCustomerMap,
	serviceMarketMap,
	serviceHangranCode,
	service19,
	serviceICcustomer,
} from './MapPages/';

import {
	AIRSUPPLYLEGEND_STATION,
	AIRSUPPLYLEGEND_PIPE,
	AIRSUPPLYLEGEND_UCAN,
	AIRSUPPLYLEGEND_LNG,
	SERVICELEGEND_MARKET,
	SERVICELEGEND_CUSTOMER,
	SERVICELEGENDCUSTOMERMAP,
	SERVICELEGENDMARKETMAP,
	HOMEOVERLAYCONFIGMAP,
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
		AirSupplyMap,
		serviceCustomerMap,
		serviceMarketMap,
		MapLegend,
		MapTypeLegend,
		// RightPanelList,
		serviceHangranCode,
		service19,
		serviceICcustomer,
		DataStatistics,
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
			mapCenter: null,
			mapLegendStyle: null,
			mapLegendStyleNormal: { left: '50%' },
			mapReady: false,
			mapComponentName: 'AirSupplyMap',
			currentScene: 'airsupply',
			legendConfig: {},
			activeItem: {},
			legendMap: {},
			legendMultiple: true,
			dataStatisticsList: [],
			showMap: false,
		};
	},
	watch: {
		currentScene(val) {
			// debugger;
			let { legendConfig, _overlayConfigMap } = this;
			let pageName = val;
			this.sence = pageName;
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
	computed: {
		computedDataStatisticsList() {
			if (this.mapComponentName !== 'AirSupplyMap') return [];
			let senceDataObj = {
				'airsupply-station': [
					'门站',
					'应急气源站',
					'高中压调压站',
					'中低压调压箱',
				],
				'airsupply-pipe': [
					'绿色能源综合服务站',
					'管网运行管理站',
					'地下抢修点',
				],
				'airsupply-lng': [
					'绿色能源综合服务站',
					'管网运行管理站',
					'地下抢修点',
				],
				'airsupply-ucan': ['常用钢瓶用户数量', '在册钢瓶数量'],
			};
			return this.dataStatisticsList.filter(item =>
				senceDataObj[this.sence].includes(item.desc)
			);
		},
	},
	created() {
		this._overlayConfigMap = {
			airsupply: HOMEOVERLAYCONFIGMAP,
			service_customer: SERVICELEGENDCUSTOMERMAP,
			service_market: SERVICELEGENDMARKETMAP,
			service_hangranCode: SERVICELEGENDHANGRANCODEMAP,
			service_19: SERVICELEGEND19MAP,
			serviceICcustomer: SERVICELEGENDICCUSTOMERMAP,
		};
		this._pageConfig = {
			'airsupply-station': {
				mapComponentName: 'AirSupplyMap',
				legendConfig: AIRSUPPLYLEGEND_STATION,
				legendMultiple: true,
			},
			'hoairsupplyme-pipe': {
				mapComponentName: 'AirSupplyMap',
				legendConfig: AIRSUPPLYLEGEND_PIPE,
				legendMultiple: true,
			},
			'airsupply-ucan': {
				mapComponentName: 'AirSupplyMap',
				legendConfig: AIRSUPPLYLEGEND_UCAN,
				legendMultiple: true,
			},
			'airsupply-lng': {
				mapComponentName: 'AirSupplyMap',
				legendConfig: AIRSUPPLYLEGEND_LNG,
				legendMultiple: true,
			},
			service_customer: {
				mapComponentName: 'serviceCustomerMap',
				legendConfig: SERVICELEGEND_CUSTOMER,
				legendMultiple: true,
			},
			service_market: {
				mapComponentName: 'serviceMarketMap',
				legendConfig: SERVICELEGEND_MARKET,
				legendMultiple: true,
			},
			service_hangranCode: {
				mapComponentName: 'serviceHangranCode',
				legendConfig: SERVICELEGEND_HANGRANCODE,
				legendMultiple: false,
				mapCenter: [120.81259, 30.273295],
				mapLegendStyle: { left: '18%' },
			},
			service_19: {
				mapComponentName: 'service19',
				legendConfig: SERVICELEGEND_SERVICE_19,
				mapCenter: [120.81259, 30.273295],
				mapLegendStyle: { left: '18%' },
				legendMultiple: true,
			},
			serviceICcustomer: {
				mapComponentName: 'serviceICcustomer',
				legendConfig: SERVICELEGEND_ICCUSTOMER,
				legendMultiple: true,
			},
		};
	},
	mounted() {
		bus.$on('currentSceneChange', val => {
			if (!val) {
				return (this.showMap = false);
			} else {
				this.showMap = true;
            }
            if(val === 'unchange' || val === this.currentScene){
                return false 
            }
			this.currentScene = val;
			this.initPage(val);
			this.getDataStatisticsList();
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
			this.initPage('airsupply-station');
			setTimeout(() => {
				this.map.addControl(new window.AMap.MapType());
			}, 2000);
		},
		initPage(val) {
			let config = this._pageConfig[val];
			if (!config) {
				return false;
			}
			this.mapCenter = null;
			this.mapLegendStyle = this.mapLegendStyleNormal;
			Object.keys(config).forEach(targetProp => {
				this[targetProp] = config[targetProp];
			});
			if (this.map) {
				let { mapCenter, mapConfig } = this;
				let { zoom, center } = mapConfig;
				this.map.setZoom(zoom);
				this.map.panTo(mapCenter ? mapCenter : center, 0);
			}
		},
		handleClosePop() {
			this.activeItem = {};
		},
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.airSupply.getAirSupplyDataStatisticsList();
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
	left: 50%;
	transform: translateX(-50%);
}
</style>
