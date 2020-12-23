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
				:showOverlayName="
					config.showOverlayName === false
						? config.showOverlayName
						: undefined
				"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
				:data="stationDataMap[config.dataProp]"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:legendMap="overlayMap"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		/>
		<!-- 路线规划 -->
		<!-- <RoutePlan :data="activeOverlay" v-if="showRoutePlan"></RoutePlan> -->
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
	DataStatistics,
} from '../../../../components/index.js';

//场景相关配置
import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config/scene';
//页面配置
import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LNG_OVERLAY_MAP,
	AIRSUPPLY_LNG_LEGEND_MAP,
} from './config.js';
//系统公共api
import GoldChart from '@/openApi';

export default {
	name: 'LNG',
	components: {
		LNGStation,
		RightPanel,
		RoutePlan,
		RegionBoundary,
		OverlayDetail,
		MapLegend,
		HighPressureLine,
		HighPressureLine_Process,
		LowPressureLine,
		InspectionPerson,
		GasStation,
		PressureRegulatingStation,
		EmergencyAirSourceStation,
		NaturalGasStation,
		DistributedEnergyResource,
		LiquefiedGasStation,
		ServiceStation,
		InspectionCar,
		DataStatistics,
		WarningList,
		WarnEvent,
		StationList,
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100);
		},
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
	data() {
		let { LNGStation } = AIRSUPPLY_LNG_LEGEND_MAP;
		return {
			overlayInfoConfigMap: Object.freeze(AIRSUPPLY_LNG_OVERLAY_MAP),
			center: [120.131259, 30.263295],
			zoom: 10.7,
			activeOverlay: {},
			activeWarnData: {},
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'realTime',
			legendMap: { LNGStation },
			overlayMap: AIRSUPPLY_LNG_LEGEND_MAP,
			dataStatisticsConfigMap: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				stationNumber: 8,
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
					// // 'PipeManageMentStation', // '管网运行管理站',
					// // 'UndergroundRepairStation', // '地下抢修点',
					'LNGStation', // 'LNG站',
					// 'LiquefiedGasStation', // '液化气站',
					// 'NaturalGasStation', // '加气站',
					// 'DistributedEnergyResource', // '分布式能源',
				].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.stationDataMap = { ...this.stationDataMap, ...res };
			let { lNGStationList } = res;
			this.stationList = [...lNGStationList];
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsInfo = await this.$sysApi.map.airSupply.getStatisticsInfo(
				{ type: 'LNG' }
			);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			// if (isCenter) {
			// 	this.setZoomAndPanTo(lng, lat + 0.005);
			// }
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(INDEXSCENEMAP['AirSupplyLNG']);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			// this.$amap.setZoom(11, 100);
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
			done && done();
		},
		viewOverlayDetail(overlay) {},
		setZoomAndPanTo(lng, lat) {
			this.$amap.setZoom(14, 100);
			this.$nextTick(() => {
				this.$amap.panTo([lng, lat], 100);
			});
		},
		handleListClick(overlay, eventType) {
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
