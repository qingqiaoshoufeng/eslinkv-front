<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
		></WarnEvent>
		<!-- 特殊 中低压管网需要legend控制显隐 -->
		<AMapTile
			ref="mapTile"
			:visible="!!tilesQuery.length"
			:getTileUrl="getTileUrl"
		/>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				v-if="stationDataMap[config.dataProp]"
				:ref="legend"
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
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:width="400"
		/>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsConfigMap="dataStatisticsConfigMap"
				:data="dataStatisticsData"
			/>
			<!-- 图例 -->
			<MapLegend :data="legendMap" class="map-legend" />
			<!-- 右侧列表 -->
			<RightPanel
				class="right-panel"
				v-model="activeTab"
				@overlay-click="handleListClick"
			></RightPanel>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	InspectionCar,
	ComprehensiveServiceStation,
	LiquefiedGasStation,
	NaturalGasStation,
	DistributedEnergyResource,
	LNGStation,
	InspectionPerson,
	GasStation,
	// HighPressureLine,
	// HighPressureLine_Process,
	// PressureRegulatingStation,
	EmergencyAirSourceStation,
	PipeManageMentStation,
	UndergroundRepairStation,
	OngroundRepairStation,
	ServiceStation,
	RightPanel,
	RoutePlan, //规划路线
	ListOverlay,
	WarningList,
	WarnEvent,
} from '../Components/index.js';
import { AMapTile } from '../../../../lib';

//页面所需公共组件
import {
	OverlayDetail,
	MapLegend,
	RegionBoundary,
} from '../../../../components/index.js';
import { DataStatistics } from '../../../../components';

import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config';
import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
	AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
} from './config.js';
import GoldChart from '@/openApi';
import getHangZhouGasGISPosition from '../../../../utils/getHangZhouGasGISPosition';

export default {
	name: 'LowPressure',
	components: {
		OverlayDetail,
		ComprehensiveServiceStation,
		DistributedEnergyResource,
		EmergencyAirSourceStation,
		GasStation,
		InspectionCar,
		InspectionPerson,
		LiquefiedGasStation,
		ListOverlay,
		LNGStation,
		NaturalGasStation,
		PipeManageMentStation,
		UndergroundRepairStation,
		ServiceStation,
		RightPanel,
		RoutePlan,
		MapLegend,
		AMapTile,
		OngroundRepairStation,
		DataStatistics,
		WarningList,
		WarnEvent,
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
		return {
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP
			),
			activeOverlay: {},
			activeWarnData: {},
			center: [120.151562, 30.273297],
			zoom: 18,
			showOverlayDetail: false,
			activeTab: 'realTime',
			legendMap: AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
			overlayMap: AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
			dataStatisticsConfigMap: DATASTATISTICSLIST,
			dataStatisticsData: {
				Mediumline: 2627,
				Lowline: 4652,
				GreenServeStation: 5,
				ManageStation: 5,
				OnNumber: 12,
				UnderNumber: 12,
			},
			stationDataMap: {},
			dataReady: false,
		};
	},
	computed: {
		tilesQuery() {
			const {
				MiddlePressureLine,
				LowPressureLine,
				PressureRegulatingStation,
			} = this.legendMap;
			const {
				visible: visibleM,
				tileQuery: tileQueryM,
			} = MiddlePressureLine;
			const {
				visible: visibleL,
				tileQuery: tileQueryL,
			} = LowPressureLine;
			const {
				visible: visibleP,
				tileQuery: tileQueryP,
			} = PressureRegulatingStation;
			let queryArr = [];
			if (visibleM) {
				queryArr.push(tileQueryM);
			}
			if (visibleL) {
				queryArr.push(tileQueryL);
			}
			if (visibleP) {
				queryArr.push(tileQueryP);
			}
			//条件变化刷新地图
			if (queryArr.length && this.$refs.mapTile) {
				this.$refs.mapTile.reload();
			}
			return queryArr;
		},
	},
	methods: {
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
					'ServiceStation', // '综合服务站',
					'PipeManageMentStation', // '管网运行管理站',
					'UndergroundRepairStation', // '地下抢修点',
					'OngroundRepairStation', // '地上抢修点',
					// 'LNGStation', // 'LNG站',
					// 'LiquefiedGasStation', // '液化气站',
					// 'NaturalGasStation', // '加气站',
					// 'DistributedEnergyResource', // '分布式能源',
				].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.stationDataMap = { ...this.stationDataMap, ...res };
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsData = await this.$sysApi.map.airSupply.getHighPressureStatisticsInfo(
				{ type: 'LowPressure' }
			);
		},
		getTileUrl(x, y, zoom) {
			const tilesQuery = String(this.tilesQuery);
			const {
				leftBottomX,
				leftBottomY,
				rightTopX,
				rightTopY,
				width,
				height,
				minGD,
				maxGD,
			} = getHangZhouGasGISPosition(x, y, zoom);
			// isPointInRing
			let { lng: lngMin, lat: latMin } = minGD;
			let { lng: lngMax, lat: latMax } = maxGD;
			console.log(lngMax, latMax);
			if (lngMax < 118.344933 && latMax > 30.566516) {
				console.log('xy');
				return null;
			}
			if (lngMin > 120.721945 && latMin < 29.188757) {
				console.log('xy');
				return null;
			}
			return `${window.api.MAP_GIS_URL}/arcgis/rest/services/HZRQ/HZRQ_local/MapServer/export?dpi=96&transparent=true&format=png8&layers=show%3A${tilesQuery}&bbox=${leftBottomX}%2C${leftBottomY}%2C${rightTopX}%2C${rightTopY}&bboxSR=2385&imageSR=2385&size=${width}%2C${height}&f=image`;
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
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
		handleListClick(overlay) {
			if (this.showOverlayDetail) {
				this.showOverlayDetail = false;
				this.activeOverlay = {};
			}
			let { lng, lat } = overlay;
			this.activeWarnData = overlay;
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
	z-index: 99;
}
</style>
