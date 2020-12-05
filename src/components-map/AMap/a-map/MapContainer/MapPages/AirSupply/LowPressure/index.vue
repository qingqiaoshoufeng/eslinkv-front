<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 1.1 报警点位-->
		<!-- <WarningList
			:visible="true"
			type="事件"
			overlayIcon="icontulinengyuanzhan"
			:iconSize="38"
			@overlay-click="handleOverlayClick"
			:apiFun="$sysApi.map.airSupply.getEventWarningList"
		/> -->
		<!-- 特殊 中低压管网需要legend控制显隐 -->
		<AMapTile
			ref="mapTile"
			:visible="!!tilesQuery.length"
			:getTileUrl="getTileUrl"
		/>
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in overlayMap">
			<component
				v-if="config.component"
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				:overlayIcon="config.icon ? config.icon : config.legendIcon"
				:overlayType="legend"
				:iconSize="config.iconSize"
				:showOverlayName="
					config.showOverlayName === false
						? config.showOverlayName
						: undefined
				"
				:data="allTypeStationList[config.dataProp]"
				@overlay-click="handleOverlayClick"
				:detailList="config.detailList"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:iconSize="
				activeOverlay.overlayType === 'WarningList' ? 38 : undefined
			"
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:detialBoxWidth="400"
		/>
		<!-- 路线规划 -->
		<RoutePlan :data="activeOverlay" v-if="showRoutePlan"></RoutePlan>
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
				@overlay-click="handleOverlayClick"
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
} from '../Components/index.js';
import { AMapTile } from '../../../../lib';

//页面所需公共组件
import { OverlayDetail, MapLegend } from '../../../../components/index.js';
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
		// HighPressureLine,
		// HighPressureLine_Process,
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
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
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
			overlayInfoConfigMap: Object.freeze(AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP),
			activeOverlay: {},
			center: [120.151562, 30.273297],
			zoom: 18,
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'realTime',
			legendMap: AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
			overlayMap: AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				Mediumline: 2627,
				Lowline: 4652,
				GreenServeStation: 5,
				ManageStation: 5,
				OnNumber: 12,
				UnderNumber: 12,
			},
			allTypeStationList: {},
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
				isShow: isShowM,
				tileQuery: tileQueryM,
			} = MiddlePressureLine;
			const { isShow: isShowL, tileQuery: tileQueryL } = LowPressureLine;
			const {
				isShow: isShowP,
				tileQuery: tileQueryP,
			} = PressureRegulatingStation;
			let queryArr = [];
			if (isShowM) {
				queryArr.push(tileQueryM);
			}
			if (isShowL) {
				queryArr.push(tileQueryL);
			}
			if (isShowP) {
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
			console.log(this.center);
		},
		// 获取所有站点数据
		async getAllTypeStationList() {
			let params = {
				types: [
					'InspectionPerson', // '巡检人员',
					'InspectionCar', // '巡检车辆',
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
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
		},
		// 获取统计数据
		async getDataStatisticsInfo() {
			this.dataStatisticsInfo = await this.$sysApi.map.airSupply.getHighPressureStatisticsInfo(
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
			} = getHangZhouGasGISPosition(x, y, zoom);
			return `${window.api.MAP_GIS_URL}/arcgis/rest/services/HZRQ/HZRQ_local/MapServer/export?dpi=96&transparent=true&format=png8&layers=show%3A${tilesQuery}&bbox=${leftBottomX}%2C${leftBottomY}%2C${rightTopX}%2C${rightTopY}&bboxSR=2385&imageSR=2385&size=${width}%2C${height}&f=image`;
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			if (isCenter) {
				this.$amap.panTo([lng, lat], 100);
				this.$nextTick(() => {
					this.$amap.setZoom(14, 100);
				});
			}
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(
					INDEXSCENEMAP['AirSupplyLowPressure']
				);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			// this.$amap.setZoom(11, 100);
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.panTo(this.center, 100);
			done();
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			if (overlayType === 'WARNEVENT') {
				console.log('渲染路径，23');
				this.showRoutePlan = true;
				console.log(overlay);
				let { content, address } = overlay;
				//和场景进行交互
				GoldChart.scene.setSceneIndex(AIRSUPPLY_WARN_SCENEINDEX);
				//更新数据
				this.$nextTick(() => {
					AIRSUPPLY_WARN_COMPONENTINDEX.forEach(i => {
						GoldChart.instance.updateComponent(i, {
							data: {
								step: 8,
								value: {
									step1: {
										time: new Date('2020-10-30 22:20') * 1,
										des: content,
										name: '王磊',
										title: '报警人',
										address: address,
									},
									step2: {
										time: new Date('2020-10-30 22:21') * 1,
										name: '秦芳芳',
										title: '客服部',
									},
									step3: {
										time: new Date('2020-10-30 22:31') * 1,
										name: '林自原',
										title: '维修部',
									},
									step4: {
										time: new Date('2020-10-30 22:48') * 1,
									},
									step5: {
										time: new Date('2020-10-30 23:13') * 1,
									},
									step6: {
										time: new Date('2020-10-30 23:50') * 1,
									},
									step7: {
										time: new Date('2020-10-31 11:21') * 1,
									},
									step8: {
										time: new Date('2020-10-31 12:57') * 1,
										title: '维修处置内容',
										content:
											'部分管道老旧破损严重导致燃气泄漏，关闭上游阀门后更换泄漏段管道，已恢复供气。',
									},
								},
								videoInfo1: {
									imgList: [
										'/static/images/project/01.png',
										'/static/images/project/02.jpg',
									],
									videoList: ['/cdn/videos/test.mov'],
								},
								videoInfo2: {
									imgList: [
										'/static/images/project/01.png',
										'/static/images/project/02.jpg',
									],
									videoList: ['/cdn/videos/test.mov'],
								},
							},
						});
					});
				});
			}
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
