<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 工艺报警和事件报警报警地图点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
		></WarnEvent>
		<!-- <WarningStations
			:data="stationDataMap.middleAndLowPressureValveList"
		></WarningStations> -->
		<!-- 行政区域覆盖物 -->
		<RegionBoundary />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				v-if="stationDataMap[config.dataProp]"
				:ref="legend"
				:activeItem="activeOverlayMap[legend] || undefined"
				:is="config.component"
				:visible="config.visible"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="config.component"
				:iconSize="config.iconSize"
				:showOverlayName="config.showOverlayName"
				:detailList="config.detailList"
				:data="stationDataMap[config.dataProp]"
				@overlay-click="handleOverlayClick"
				@close="closeOverlayDetail('', false)"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			v-bind="{
				beforeClose: closeOverlayDetail,
				position: overlayDetailPosition,
				...overlayDetailProp,
			}"
			@view-detail="viewDetail"
			ref="OverlayDetail"
			:width="400"
		>
		</OverlayDetail>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsConfigMap"
				:data="dataStatisticsData"
			/>
			<!-- 图例 -->
			<MapLegend :data="legendMap" class="map-legend" />
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				v-model="activeTab"
				@overlay-click="handleListClick"
				v-bind="{
					stationList,
					rightListActiveItemMap,
				}"
				ref="RightPanel"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
let componentPageArr = [
	//legend覆盖物
	'HighPressureLine',
	'HighPressureLine_Process',
	'GasStation',
	'PressureRegulatingStation',
	'EmergencyAirSourceStation',
	'InspectionPerson',
	'InspectionCar',
	//报警点位
	'WarnEvent',
	//右侧报警列表
	'RightPanel',
	// 'StationList',
	'WarningStations',
];
//页面所需公共组件
let componentCommonArr = [
	'DataStatistics',
	'RegionBoundary',
	'OverlayDetail',
	'MapLegend',
];
//异步加载组件函数
let componentPageMap = {};
let componentCommonMap = {};
componentPageArr.map(componentName => {
	componentPageMap[componentName] = () =>
		import('../Components/' + componentName);
});
componentCommonArr.map(componentName => {
	componentCommonMap[componentName] = () =>
		import('../../../../components/' + componentName);
});
//页面所需配置项
import {
	AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
	AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP,
	DATA_STATISTICS_MAP,
} from './config.js';

export default {
	name: 'HighPressure',
	inject: ['parentInfo'],
	components: {
		...componentPageMap,
		...componentCommonMap,
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.setZoomAndPanTo(...this.center, this.zoom);
	},
	data() {
		return {
			center: [120.131259, 30.263295],
			zoom: 10.2,
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP
			),
			legendMap: AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
			activeTab: 'processWarning',
			dataStatisticsConfigMap: DATA_STATISTICS_MAP,
			dataStatisticsData: {},
			activeOverlay: {},
			activeWarnData: {},
			activeStationData: {},
			showOverlayDetail: false,
			stationDataMap: {},
			visibleMore: false,
			overlayDetailPosition: '',
			stationList: [],
		};
	},
	computed: {
		//详情弹窗所需props
		overlayDetailProp() {
			let { activeOverlay, overlayInfoConfigMap, legendMap } = this;
			if (JSON.stringify(activeOverlay) !== '{}') {
				let { overlayType } = activeOverlay;
				//详情展示信息配置
				let overlayDetailConfig =
					overlayInfoConfigMap[overlayType] || {};
				let legendConfig = legendMap[overlayType] || {};
				//图标大小，是否显示关闭按钮，是否显示查看详情
				let {
					iconSize = 38,
					showPopCloseBtn: showCloseBtn,
					showMore,
				} = legendConfig;
				return {
					data: activeOverlay,
					iconSize,
					showCloseBtn,
					overlayDetailConfig,
					showMore,
				};
			}
		},
		//点击右侧点位列表，从overlay组件内部触发click事件
		activeOverlayMap() {
			let { activeStationData } = this;
			if (JSON.stringify(activeStationData) === '{}') {
				return {};
			} else {
				let { overlayType } = activeStationData;
				return {
					[overlayType]: activeStationData,
				};
			}
		},
		rightListActiveItemMap() {
			let { activeWarnData, activeStationData } = this;
			return {
				processWarning: activeWarnData,
				realTime: activeWarnData,
				overlayList: activeStationData,
			};
		},
	},
	methods: {
		// 1.获取所有站点数据
		async getAllTypeStationList() {
			let params = {
				types: [
					'GasStation', // '门站',
					'PressureRegulatingStation', // '调压站',
					'EmergencyAirSourceStation', // '应急气源站',
					'MiddleAndLowPressureValve', // 中低压阀门
				].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.stationDataMap = { ...this.stationDataMap, ...res };
			let {
				gasStationList,
				pressureRegulatingStationList,
				emergencyAirSourceStationList,
			} = res;
			this.stationList = [
				...gasStationList,
				...pressureRegulatingStationList,
				...emergencyAirSourceStationList,
			];
		},
		// 2.获取高压统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsData = await this.$sysApi.map.airSupply.getHighPressureStatisticsInfo(
				{ type: 'HighPressure' }
			);
		},
		// 3.获取高压管网，高压管网建设中数据
		async getHighPressurePipe() {
			let pipeData = await this.$sysApi.map.airSupply.getHighPressurePipe();
			this.stationDataMap = {
				...this.stationDataMap,
				...pipeData,
			};
		},
		setZoomAndPanTo(lng, lat, zoom = 14) {
			this.$amap.setZoom(zoom, 100);
			this.$amap.panTo([lng, lat], 100);
			this.overlayDetailPosition = zoom == 14 ? 'top' : '';
		},
		handleOverlayClick(overlay, overlayType) {
			overlay.overlayType = overlayType || overlay.overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
		},
		closeOverlayDetail(done, isZoom = true) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.activeStationData = {};
			if (isZoom) {
				this.setZoomAndPanTo(...this.center, this.zoom);
			}
			if (done) {
				done();
			}
		},
		handleListClick(overlay, listType) {
			let { lng, lat } = overlay;
			//关闭站点详情弹窗
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false;
				this.activeOverlay = {};
			}
			switch (listType) {
				case 'StationList':
					this.activeStationData = overlay;
					break;
				default:
					this.activeWarnData = overlay;
					this.overlayDetailPosition = 'top';
			}
			this.setZoomAndPanTo(lng, lat + 0.006);
		},
		closeWarnEventDetail() {
			this.activeWarnData = {};
			this.activeStationData = {};
			this.setZoomAndPanTo(...this.center, this.zoom);
		},
		closeStationListDetail() {
			this.activeStationData = {};
			this.setZoomAndPanTo(...this.center, this.zoom);
		},
		//查看详情调用组件内部的方法
		viewDetail() {
			let { overlayType } = this.activeOverlay;
			if (this.$refs[overlayType]) {
				this.$refs[overlayType][0].viewDetail(this.activeOverlay);
			}
		},
	},
	mounted() {
		this.getAllTypeStationList();
		this.getDataStatisticsInfo();
		this.getHighPressurePipe();
		// window.setCenter = this.setCenter.bind(this);
	},
};
</script>
<style lang="scss" scoped>
.map-legend {
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
