<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
		></WarnEvent>
		<StationList
			:data="stationListData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeStationListDetail"
		></StationList>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.visible && stationDataMap[config.dataProp]"
				:key="legend"
				:visible="config.visible"
				:is="config.component"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="legend"
				:iconSize="config.iconSize"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:data="stationDataMap[config.dataProp]"
				@close="closeOverlayDetail('', false)"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="overlayMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		/>
		<!-- 路线规划 -->
		<RoutePlan :data="activeOverlay" v-if="showRoutePlan"></RoutePlan>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsConfigMap"
				:data="dataStatisticsInfo"
			/>
			<!-- 图例 -->
			<MapLegend :data="legendMap" class="map-legend" />
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				v-model="activeTab"
				@overlay-click="handleListClick"
				:stationList="stationList"
				ref="RightPanel"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	ComprehensiveServiceStation,
	LiquefiedGasStation,
	NaturalGasStation,
	DistributedEnergyResource,
	InspectionPerson,
	InspectionCar,
	RightPanel,
	RoutePlan, //规划路线
	LNGStation,
	HighPressureLine,
	HighPressureLine_Process,
	LowPressureLine,
	GasStation,
	PressureRegulatingStation,
	EmergencyAirSourceStation,
	ServiceStation,
	PipeManageMentStation,
	UndergroundRepairStation,
	OngroundRepairStation,
	WarningList,
	WarnEvent,
	StationList,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components/index.js';
import { DataStatistics } from '../../../../components';
import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
	AIRSUPPLYOVERLAYCONFIGMAP,
	AIRSUPPLYLEGEND_UCAN,
} from '../../../../config';
import {
	AIRSUPPLY_UCAN_LEGEND_MAP,
	AIRSUPPLY_UCAN_OVERLAY_MAP,
	DATASTATISTICSLIST,
} from './config.js';
import GoldChart from '@/openApi';

export default {
	name: 'AirSupplyHighPressure',
	components: {
		OverlayDetail,
		MapLegend,
		RegionBoundary,
		ComprehensiveServiceStation,
		LiquefiedGasStation,
		NaturalGasStation,
		DistributedEnergyResource,
		InspectionPerson,
		InspectionCar,
		RightPanel,
		RoutePlan, //规划路线
		LNGStation,
		HighPressureLine,
		HighPressureLine_Process,
		LowPressureLine,
		GasStation,
		PressureRegulatingStation,
		EmergencyAirSourceStation,
		ServiceStation,
		PipeManageMentStation,
		UndergroundRepairStation,
		OngroundRepairStation,
		WarningList,
		DataStatistics,
		WarnEvent,
		StationList,
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.setCenter(this.center, 100);
	},
	mounted() {
		this.getAllTypeStationList();
		this.getDataStatisticsInfo();
		window.setCenter = this.setCenter.bind(this);
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100);
		},
	},
	data() {
		let {
			LiquefiedGasStation,
			NaturalGasStation,
			DistributedEnergyResource,
		} = AIRSUPPLY_UCAN_LEGEND_MAP;
		return {
			overlayInfoConfigMap: Object.freeze(AIRSUPPLY_UCAN_OVERLAY_MAP),
			activeOverlay: {},
			activeWarnData: {},
			center: [120.131259, 30.263295],
			zoom: 10.7,
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'realTime',
			legendMap: {
				LiquefiedGasStation,
				NaturalGasStation,
				DistributedEnergyResource,
			},
			overlayMap: AIRSUPPLY_UCAN_LEGEND_MAP,
			dataStatisticsConfigMap: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				commonUseNumber: 21742,
				registerNumber: 44579,
			},
			stationDataMap: {},
			stationList: [],
			stationListData: {},
		};
	},
	methods: {
		closeStationListDetail() {
			this.StationListData = {};
			this.$refs.RightPanel.$refs.processWarning.activeIndex = -1;
			this.$refs.RightPanel.$refs.realTime.activeIndex = -1;
			this.$refs.RightPanel.$refs.overlayList.activeIndex = -1;
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
		},
		setCenter(center) {
			this.center = center || this.center;
			console.log(this.center);
		},
		// 获取所有站点数据
		async getAllTypeStationList() {
			let params = {
				types: [
					// 'InspectionPerson', // '巡检人员',
					// 'InspectionCar', // '巡检车辆',
					// 'GasStation', // '门站',
					// 'PressureRegulatingStation', // '调压站',
					// 'EmergencyAirSourceStation', // '应急气源站',
					// 'ServiceStation', // '综合服务站',
					// 'PipeManageMentStation', // '管网运行管理站',
					// 'UndergroundRepairStation', // '地下抢修点',
					// 'OngroundRepairStation', // '地上抢修点',
					// 'LNGStation', // 'LNG站',
					'LiquefiedGasStation', // '液化气站',
					'NaturalGasStation', // '加气站',
					'DistributedEnergyResource', // '分布式能源',
				].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.stationDataMap = { ...this.stationDataMap, ...res };
			let {
				liquefiedGasStationList,
				naturalGasStationList,
				distributedEnergyResourceList,
			} = res;
			this.stationList = [
				...liquefiedGasStationList,
				...naturalGasStationList,
				...distributedEnergyResourceList,
			];
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsInfo = await this.$sysApi.map.airSupply.getHighPressureStatisticsInfo(
				{ type: 'UCAN' }
			);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			// this.$amap.setZoom(14, 100);
			// if (isCenter) {
			// 	this.setZoomAndPanTo(lng, lat + 0.005);
			// }
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			// this.$amap.setZoom(11, 100);
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
			done && done();
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
		},
		setZoomAndPanTo(lng, lat) {
			this.$amap.setZoom(14, 100);
			this.$nextTick(() => {
				this.$amap.panTo([lng, lat], 100);
			});
		},
		handleListClick(overlay, eventType) {
			console.log(overlay);
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false;
				this.activeOverlay = {};
			}
			let { lng, lat } = overlay;
			if (eventType) {
				this.stationListData = overlay;
			} else {
				this.activeWarnData = overlay;
			}
			this.setZoomAndPanTo(lng, lat);
		},
		closeWarnEventDetail() {
			this.activeWarnData = {};
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
		},
	},
};
</script>
<style lang="scss" scoped>
.map-legend {
	position: absolute;
	bottom: 50px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
