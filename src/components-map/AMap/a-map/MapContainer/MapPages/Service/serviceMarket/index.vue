<!-- 销售 -->
<template>
	<div>
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
			ref="OverlayDetail"
		/>
		<portal to="destination">
			<!-- 图例 -->
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
			/>
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import { Grouphall, BranchCompany, HeatMap } from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import {
	SERVICE_SERVICEMARKET_OVERLAY_MAP,
	SERVICE_SERVICEMARKET_LEGEND_MAP,
} from './config';
export default {
	name: 'serviceMarket',
	components: {
		RegionBoundary,
		OverlayDetail,
		Grouphall,
		BranchCompany,
		HeatMap,
		MapLegend,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(SERVICE_SERVICEMARKET_OVERLAY_MAP),
			legendMap: SERVICE_SERVICEMARKET_LEGEND_MAP,
			mapLegendStyle: { left: '18%' },
			legendMultiple: true,
			showOverlayDetail: false,
			activeOverlay: {},
			center: [120.061259, 30.183295],
			zooom: 11,
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center);
	},
	methods: {
		// 暂留
		closeOverlayDetail(done) {
			let { overlayType } = this.activeOverlay;
			if (overlayType === 'WARNEVENT') {
				GoldChart.scene.setSceneIndex(INDEXSCENEMAP['ServiceMarket']);
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