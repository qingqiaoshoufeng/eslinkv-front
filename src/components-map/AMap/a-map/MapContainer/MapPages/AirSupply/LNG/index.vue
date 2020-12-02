<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.isShow && allTypeStationList[config.dataProp]"
				:key="legend"
				:visible="config.isShow"
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
				:data="allTypeStationList[config.dataProp]"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:legendMap="overlayMap"
			:overlayInfoConfig="overlayInfoConfig"
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
	MiddlePressureLine,
	LowPressureLine,
	GasStation,
	PressureRegulatingStation,
	EmergencyAirSourceStation,
	ServiceStation,
	PipeManageMentStation,
	UndergroundRepairStation,
	OngroundRepairStation,
	WarningList,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import { DataStatistics } from '../../../../components';

import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config';
import {
	DATASTATISTICSLIST,
	AIRSUPPLY_LNG_OVERLAY_MAP,
	AIRSUPPLY_LNG_LEGEND_MAP,
} from './config.js';
import GoldChart from '@/openApi';

export default {
	name: 'AirSupplyHighPressure',
	components: {
		LNGStation,
		RightPanel,
		RoutePlan,
		RegionBoundary,
		OverlayDetail,
		MapLegend,
		HighPressureLine,
		HighPressureLine_Process,
		MiddlePressureLine,
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
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	mounted() {
		this.getAllTypeStationList();
	},
	data() {
		let { LNGStation } = AIRSUPPLY_LNG_LEGEND_MAP;
		return {
			overlayInfoConfig: Object.freeze(AIRSUPPLY_LNG_OVERLAY_MAP),
			center: [120.061259, 30.183295],
			zoom: 10,
			activeOverlay: {},
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'statAawareness',
			legendMap: { LNGStation },
			overlayMap: AIRSUPPLY_LNG_LEGEND_MAP,
			dataStatisticsList: DATASTATISTICSLIST,
			dataStatisticsInfo: {
				stationNumber: 8,
			},
			allTypeStationList: {},
		};
	},
	methods: {
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
			this.allTypeStationList = { ...this.allTypeStationList, ...res };
			console.log(this.allTypeStationList);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			this.$amap.setZoom(14, 100);
			if (isCenter) {
				this.$nextTick(() => {
					this.$amap.panTo([lng, lat], 100);
				});
			}
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
			this.$amap.panTo(this.center, 100);
			done();
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			console.log(overlay, 'overlay');
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
										'/static/images/project/qiangxiu01.png',
										'/static/images/project/qiangxiu02.png',
										'/static/images/project/qiangxiu03.png',
									],
									videoList: ['/cdn/videos/test.mov'],
								},
								videoInfo2: {
									imgList: [
										'/static/images/project/qiangxiu01.png',
										'/static/images/project/qiangxiu02.png',
										'/static/images/project/qiangxiu03.png',
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
}
</style>
