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
	ICcustomer,
	RightPanelWithServiceICcustomer,
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
		ICcustomer,
		DataStatistics,
		RightPanelWithServiceICcustomer,
		MapLegend,
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
			zoom: 11,
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center);
	},
	methods: {
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
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
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
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
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