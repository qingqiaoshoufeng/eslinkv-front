<!-- 杭燃码 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				v-if="config.isShow"
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.icon"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
				:ref="config.component"
			/>
		</template>
		<!-- 统计数据 -->
		<portal to="destination">
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
				:style="mapLegendStyle"
			/>

			<DataStatistics :position="'left'" :data="dataStatisticsList" />
			<SwitchBox @switch-change="change" />
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import { CouplingHot, OperationHot, SwitchBox } from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
import {
	SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
	SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP,
} from './config';
import { DataStatistics } from '../../../../components';
export default {
	name: 'hangranCode',
	components: {
		RegionBoundary,
		CouplingHot,
		OperationHot,
		DataStatistics,
		MapLegend,
		SwitchBox,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICEHANGRANCODE_OVERLAY_MAP
			),
			dataStatisticsList: [],
			legendMap: SERVICE_SERVICEHANGRANCODE_LEGEND_MAP,
			mapLegendStyle: { left: '18%' },
			legendMultiple: false,
			showOverlayDetail: false,
			center: [120.80971, 30.102216],
			zoom: 11,
			switchData: {
				switch1: true,
				switch2: false,
			},
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	methods: {
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
		change(data) {
			let { switch1, switch2 } = data;
			this.switchData = data;
			this.legendMap.CouplingHot.isShow = this.switchData.switch1;
			this.legendMap.OperationHot.isShow = this.switchData.switch2;
			// this.switchData = data;
			// if (switch1) {
			// 	this.legendMap.OperationHot.isShow = this.switchData.switch2;
			// 	setTimeout(() => {
			// 		this.legendMap.CouplingHot.isShow = this.switchData.switch1;
			// 	}, 2000);
			// } else if (switch2) {
			// 	this.legendMap.CouplingHot.isShow = this.switchData.switch1;
			// 	setTimeout(() => {
			// 		this.legendMap.OperationHot.isShow = this.switchData.switch2;
			// 	}, 2000);
			// } else {
			// 	this.legendMap.CouplingHot.isShow = this.switchData.switch1;
			// 	this.legendMap.OperationHot.isShow = this.switchData.switch2;
			// }
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