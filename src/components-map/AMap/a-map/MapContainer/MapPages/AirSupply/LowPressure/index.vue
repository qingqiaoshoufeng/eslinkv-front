<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				:visible="config.isShow"
				:is="config.component"
				:overlayIcon="config.icon"
				:overlayType="legend"
				:showOverlayName="
					config.showOverlayName ? config.showOverlayName : null
				"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
		/>
		<!-- 路线规划 -->
		<RoutePlan :data="activeOverlay" v-if="showRoutePlan"></RoutePlan>
		<portal to="destination">
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
	DistributedEnergyResource,
	EmergencyAirSourceStation,
	GasStation,
	HighPressureLine,
	HighPressureLine_Process,
	MiddlePressureLine,
	LowPressureLine,
	InspectionCar,
	InspectionPerson,
	LiquefiedGasStation,
	ListOverlay,
	LNGStation,
	NaturalGasStation,
	PipeManageMentStation,
	PressureRegulatingStation,
	UndergroundRepairStation,
	RightPanel,
	RoutePlan, //规划路线
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';

import {
	INDEXSCENEMAP,
	OVERLAYINFOMAP_AIRSUPPLY,
	AIRSUPPLY_WARN_SCENEINDEX,
	AIRSUPPLY_WARN_COMPONENTINDEX,
} from '../../../../config';
import {
	AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP,
	AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
} from './config.js';
import GoldChart from '@/openApi';

export default {
	name: 'AirSupplyHighPressure',
	components: {
		OverlayDetail,
		ComprehensiveServiceStation,
		DistributedEnergyResource,
		EmergencyAirSourceStation,
		GasStation,
		HighPressureLine,
		HighPressureLine_Process,
		InspectionCar,
		InspectionPerson,
		LiquefiedGasStation,
		ListOverlay,
		LNGStation,
		LowPressureLine,
		NaturalGasStation,
		PipeManageMentStation,
		PressureRegulatingStation,
		UndergroundRepairStation,
		MiddlePressureLine,
		RegionBoundary,
		RightPanel,
		RoutePlan,
		MapLegend,
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center,100);
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(AIRSUPPLY_LOWPRESSURE_OVERLAY_MAP),
			activeOverlay: {},
			center: [120.061259, 30.183295],
			zoom: 11,
			showOverlayDetail: false,
			showRoutePlan: false,
			activeTab: 'realTime',
			legendMap: AIRSUPPLY_LOWPRESSURE_LEGEND_MAP,
		};
	},
	methods: {
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
				GoldChart.scene.setSceneIndex(
					INDEXSCENEMAP['AirSupplyHighPressure']
				);
				this.showRoutePlan = false;
			}
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$amap.setZoom(11, 100);
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
						});
					});
				});
			}
		},
	},
};
</script>
<style  lang="scss"  scoped>
.map-legend {
	position: absolute;
	bottom: 50px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
