<template>
	<div>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfigMap="overlayInfoConfigMap"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
			:left="left"
			:detialBoxWidth="400"
		/>
		<!-- 路线规划 -->
		<RoutePlan :data="activeOverlay"></RoutePlan>
		<portal to="destination">
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

import { DataStatistics } from '../../../../components';
//页面所需公共组件
import pageMixin from '../../../../mixins/pageMixin';
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../../../components/index.js';

import {
	INDEXSCENEMAP,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
	AIRSUPPLY_WARN_MODEL_SCENEINDEX,
	AIRSUPPLY_WARN__MODEL_COMPONENTINDEX,
} from '../../../../config';
import GoldChart from '@/openApi';

export default {
	name: 'AirSupplyHighPressure',
	// mixins: [pageMixin],
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
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	data() {
		return {
			center: [120.061259, 30.233295],
			zoom: 10.8,
			activeOverlay: {},
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'statAawareness',
			left: 10,
			dataStatisticsInfo: {
				GasStation: 5,
				PressureRegulatingStation: 2,
				HighPressureGasStation: 24,
				HighPressureLineLength: 236,
				CarNumber: 12,
				InspectionNumber: 22,
				PreservationNumber: 35,
			},
		};
	},
	methods: {
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat, address, time, index } = overlay;
			overlay.overlayType = overlayType || overlay.overlayType;
			overlay.name = overlay.address || overlay.name;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			// 计算弹框偏移量
			this.left = this.offset(overlayType);
			console.log(overlay);
			// 警报效果后门 后期修正
			if (index === 3) {
				GoldChart.scene.createSceneInstance(
					AIRSUPPLY_WARN_MODEL_SCENEINDEX,
					'fadeIn',
					'none'
				);
				this.$nextTick(() => {
					AIRSUPPLY_WARN__MODEL_COMPONENTINDEX.forEach(item => {
						GoldChart.instance.updateComponent(item, {
							data: {
								time: time,
								title: address,
							},
						});
					});
				});
				setTimeout(() => {
					GoldChart.scene.destroyScene(
						AIRSUPPLY_WARN_MODEL_SCENEINDEX
					);
					this.$amap.setZoom(14, 100);
					if (isCenter) {
						this.$nextTick(() => {
							this.$amap.panTo([lng, lat], 100);
						});
					}
				}, 3000);
			} else {
				this.$amap.setZoom(14, 100);
				if (isCenter) {
					this.$nextTick(() => {
						this.$amap.panTo([lng, lat], 100);
					});
				}
			}
		},
		offset(overlayType) {
			let offsetObj = {
				GasStation: 15,
				EmergencyAirSourceStation: 12,
			};
			console.log(offsetObj[overlayType]);
			return offsetObj[overlayType] || 10;
		},
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(
					INDEXSCENEMAP['AirSupplyHighPressure']
				);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			// this.$amap.setZoom(11, 100);
			this.$amap.setZoom(this.zoom, 100);
			this.$amap.panTo(this.center, 100);
            done && done();
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