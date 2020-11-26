<!-- 工商户 -->
<template>
	<div class="ICcustomer1">
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 态势感知 -->
		<!-- <ListOverlay @overlay-click="handleOverlayClick" /> -->

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.icon"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:ref="config.component"
				:data="allTypeStationList[config.dataProp]"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			:detialBoxWidth="'350px'"
			@view-detail="viewOverlayDetail"
			ref="OverlayDetail"
		>
			<TipDetial :data="activeOverlay" />
		</OverlayDetail>
		<portal to="destination">
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
			<DataStatistics :data="dataStatisticsList" />
			<RightPanelWithServiceICcustomer
				class="right-panel"
				@list-click="handleListClick"
			/>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	// ICcustomer,
	RightPanelWithServiceICcustomer,
	BranchCompany,
	MajorClient,
	TipDetial,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
} from './config';
export default {
	name: 'serviceICcustomer',
	components: {
		RegionBoundary,
		OverlayDetail,
		// ICcustomer,
		DataStatistics,
		RightPanelWithServiceICcustomer,
		MapLegend,
		BranchCompany,
		MajorClient,
		TipDetial,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP
			),
			dataStatisticsList: [],
			legendMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			legendMultiple: true,
			showOverlayDetail: false,
			activeOverlay: {},
			center: [120.061259, 30.183295],
			zoom: 10,
			allTypeStationList: {},
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	methods: {
		closeOverlayDetail(done) {
			done();
		},
		handleOverlayClick(overlay, overlayType, isCenter = false) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
		},
		// 请求统计数据
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		// 请求用气大户、分公司数据
		async getAllTypeStationList() {
			let params = {
				type: ['MajorClient', 'BranchCompany'],
			};
			this.allTypeStationList = await this.$sysApi.map.serve.getICcustomerList(
				params
			);
			console.log(this.allTypeStationList);
		},
		handleListClick(item) {
			console.log(item);
		},
		viewOverlayDetail(overlay) {
			let { overlayType } = overlay;
			//和场景进行交互
			GoldChart.scene.setSceneIndex(
				SERVICE_SERVICEHANGRANCODE_LEGEND_MAP
			);
			//更新数据
			this.$nextTick(() => {
				AIRSUPPLY_WARN_COMPONENTINDEX.forEach(i => {
					GoldChart.instance.updateComponent(i);
				});
			});
		},
	},
	mounted() {
		this.getDataStatisticsList();
		this.getAllTypeStationList();
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