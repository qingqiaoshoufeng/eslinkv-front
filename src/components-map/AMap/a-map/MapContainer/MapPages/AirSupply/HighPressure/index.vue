<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.1 报警点位-->
		<!-- <WarningList
			:visible="true"
			type="工艺"
			overlayIcon="icontulinengyuanzhan"
			:apiFun="$sysApi.map.airSupply.getProcessWarningList"
			:iconSize="38"
			@overlay-click="handleOverlayClick"
		/> -->
		<!-- 报警点位 -->
		<WarnEvent
			:data="activeWarnData"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			@close="closeWarnEventDetail"
		></WarnEvent>
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="config.component"
				:iconSize="config.iconSize"
				:showOverlayName="
					config.showOverlayName === false
						? config.showOverlayName
						: undefined
				"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				@close="closeOverlayDetail('', false)"
			/>
		</template>
		<!-- 2.legend不控制显隐 -->
		<template v-for="(config, legend) in withoutLegendOverlay">
			<component
				v-if="allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="config.component"
				:iconSize="config.iconSize"
				:showOverlayName="
					config.showOverlayName === false
						? config.showOverlayName
						: undefined
				"
				:detailList="config.detailList"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				@close="closeOverlayDetail"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:legendMap="legendMap"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:detialBoxWidth="400"
		>
			<div class="overlay-detail" v-if="activeOverlay.detail">
				<div class="detail-name">{{ activeOverlay.name }}</div>
				<div
					class="fn-flex"
					v-for="(item, prop) in activeOverlay.detail"
					:key="prop"
				>
					<div class="detail-label">{{ item.name }}：</div>
					<div class="detail-value">
						{{ item.value }}{{ item.dw }}
					</div>
				</div>
				<div class="btn" v-show="isShowMore">更多详情</div>
			</div>
		</OverlayDetail>
		<portal to="destination">
			<!-- 统计数据 -->
			<DataStatistics
				:position="'right'"
				:dataStatisticsList="dataStatisticsList"
				:data="dataStatisticsInfo"
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
} from '../Components/index.js';

//页面所需公共组件
import {
	DataStatistics,
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components';

import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX,
	AIRSUPPLY_ARTWORK_MODEL_SCENEINDEX,
	AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX,
} from '../../../../config/scene';

import {
	AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
	AIRSUPPLY_HIGHPRESSURE_NO_LEGEND_MAP,
	AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP,
	DATASTATISTICSLIST,
} from './config.js';
import GoldChart from '@/openApi';

export default {
	name: 'AirSupplyHighPressure',
	inject: ['parentInfo'],
	components: {
		RegionBoundary,
		OverlayDetail,
		MapLegend,
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
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.setCenter(this.center, 100);
	},
	watch: {
		center(val) {
			this.$amap.panTo(val, 100);
		},
	},
	data() {
		return {
			overlayInfoConfigMap: Object.freeze(
				AIRSUPPLY_HIGHPRESSURE_OVERLAY_MAP
			),
			legendMap: AIRSUPPLY_HIGHPRESSURE_LEGEND_MAP,
			center: [120.061259, 30.233295],
			zoom: 10.7,
			activeOverlay: {},
			activeWarnData: {},
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'realTimeWithLevel',
			withoutLegendOverlay: AIRSUPPLY_HIGHPRESSURE_NO_LEGEND_MAP,
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				GasStation: 5,
				PressureRegulatingStation: 2,
				HighPressureGasStation: 24,
				HighPressureLineLength: 236,
				CarNumber: 12,
				InspectionNumber: 22,
				PreservationNumber: 35,
			},
			allTypeStationList: {},
			isShowMore: false,
		};
	},
	methods: {
		setCenter(center) {
			this.center = center || this.center;
			console.log(this.center);
		},
		setZoomAndPanTo(lng, lat) {
			this.$amap.setZoom(14, 100);
			this.$nextTick(() => {
				this.$amap.panTo([lng, lat], 100);
			});
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat, address, time, index } = overlay;
			// if (isCenter) {
			// 	this.setZoomAndPanTo(lng, lat + 0.005);
			// }
			setTimeout(() => {
				overlay.overlayType = overlayType || overlay.overlayType;
				this.activeOverlay = overlay;
				this.showOverlayDetail = true;
				this.isShowMore = ['GasStation'].includes(overlayType);
			}, 300);
		},
		closeOverlayDetail(done, isZoom = true) {
			let { overlayType } = this.activeOverlay;
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			if (isZoom) {
				this.$amap.setZoom(this.zoom, 100);
				this.$amap.setCenter(this.center, 100);
			}
			if (done) {
				done();
			}
		},
		viewOverlayDetail(overlay) {},
		// 获取所有站点数据
		async getAllTypeStationList() {
			let params = {
				types: [
					// 'InspectionPerson', // '巡检人员',
					// 'InspectionCar', // '巡检车辆',
					'GasStation', // '门站',
					'PressureRegulatingStation', // '调压站',
					'EmergencyAirSourceStation', // '应急气源站',
					// 'ServiceStation', // '综合服务站',
					// 'PipeManageMentStation', // '管网运行管理站',
					// 'UndergroundRepairStation', // '地下抢修点',
					// 'LNGStation', // 'LNG站',
					// 'LiquefiedGasStation', // '液化气站',
					// 'NaturalGasStation', // '加气站',
					// 'DistributedEnergyResource', // '分布式能源',
				].toString(),
			};
			let res = await this.$sysApi.map.airSupply.getAllTypeStationList(
				params
			);
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 获取高压统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsInfo = await this.$sysApi.map.airSupply.getHighPressureStatisticsInfo(
				{ type: 'HighPressure' }
			);
		},
		// 获取高压管网数据
		async getHighPressurePipe() {
			let pipeData = await this.$sysApi.map.airSupply.getHighPressurePipe();
			this.allTypeStationList = {
				...this.allTypeStationList,
				...pipeData,
			};
		},
		handleListClick(overlay, overlayType) {
			let { lng, lat, address, time, index } = overlay;
			overlay.overlayType = overlayType || overlay.overlayType;
			this.activeWarnData = overlay;
			this.setZoomAndPanTo(lng, lat);
			cosnole.log(overlay, '1qww');
		},

		closeWarnEventDetail() {
			this.activeWarnData = {};
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.setCenter(this.center, 100);
		},
	},
	mounted() {
		this.getAllTypeStationList();
		this.getDataStatisticsInfo();
		this.getHighPressurePipe();
		window.setCenter = this.setCenter.bind(this);
		console.log(this.$root);
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
.overlay-detail {
	.detail-name {
		font-weight: 600;
		font-size: 32px;
		color: #ffdc45;
	}
	.detail-label {
		font-size: 24px;
		color: #fff;
	}
	.detail-value {
		font-size: 24px;
		color: #ffdc45;
	}
	.btn {
		padding: 0px 8px;
		line-height: 32px;
		width: 80px;
		height: 32px;
		background: #0057a9;
		border-radius: 4px;
		display: inline-block;
		cursor: pointer;
		margin-top: 16px;
		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
