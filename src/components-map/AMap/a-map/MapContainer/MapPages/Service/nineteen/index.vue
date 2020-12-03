<!-- 19厅 -->
<template>
	<div>
		<!-- 1.legend不控制显隐的覆盖物 -->
		<!-- 区域 -->
		<RegionBoundary />
		<!-- 2.销售区域 -->
		<SaleAreaBoundary v-model="activeArea" @input="saleAreaChange" />

		<!-- 2.legend控制显隐 -->
		<template v-for="(config, legend) in legendMap">
			<component
				:key="legend"
				:visible="config.isShow"
				:overlayIcon="config.legendIcon"
				:iconSize="config.iconSize"
				:overlayType="legend"
				:is="config.component"
				@overlay-click="handleOverlayClick"
			/>
		</template>
		<!-- 覆盖物详情 -->
		<OverlayDetail
			:legendMap="legendMap"
			v-model="showOverlayDetail"
			:data="activeOverlay"
			:overlayInfoConfig="overlayInfoConfig"
			:before-close="closeOverlayDetail"
			ref="OverlayDetail"
		>
			<TipDetial :data="activeOverlay" />
		</OverlayDetail>
		<!-- 统计数据 -->
		<portal to="destination">
			<MapLegend
				:data="legendMap"
				:multiple="legendMultiple"
				class="map-legend"
				:style="mapLegendStyle"
			/>
			<DataStatistics :position="'left'" :data="dataStatisticsList" />
		</portal>
	</div>
</template>
<script>
//页面覆盖物组件
import {
	BranchCompany,
	TipDetial,
	SaleAreaBoundary,
} from '../Components/index.js';
//页面所需公共组件
import {
	RegionBoundary,
	OverlayDetail,
	MapLegend,
} from '../../Components/index.js';
// 页面配置项

import { DataStatistics } from '../../../../components';
import {
	SERVICE_SERVICENINETEEN_LEGEND_MAP,
	SERVICE_SERVICENINETEEN_OVERLAY_MAP,
} from './config';
export default {
	name: 'service19',
	components: {
		RegionBoundary,
		OverlayDetail,
		BranchCompany,
		DataStatistics,
		TipDetial,
		MapLegend,
		SaleAreaBoundary,
	},
	data() {
		return {
			overlayInfoConfig: Object.freeze(
				SERVICE_SERVICENINETEEN_LEGEND_MAP
			),
			dataStatisticsList: [],
			legendMap: SERVICE_SERVICENINETEEN_LEGEND_MAP,
			legendMultiple: true,
			mapLegendStyle: { left: '18%' },
			activeOverlay: {},
			showOverlayDetail: false,
			zoom: 10,
			center: [120.80971, 30.202216],
			activeArea: '杭州钱江燃气有限公司',
			allTypeStationList: {},
		};
	},
	created() {
		this.$amap = this.$parent.$amap;
		this.$amap.setZoom(this.zoom, 100);
		this.$amap.panTo(this.center, 100);
	},
	methods: {
		// 板块图变化
		saleAreaChange(val) {
			console.log(val);
			let params = this.allTypeStationList.branchCompanyList.find(
				item => item.name === val
			);
			params = {
				...params,
				detailList:
					SERVICE_SERVICENINETEEN_LEGEND_MAP.BranchCompany.detailList,
			};
			this.handleOverlayClick(params);
		},
		handleOverlayClick(overlay, overlayType, isCenter = true) {
			this.$refs.OverlayDetail.overlayTypeInfo.isShowMore = true;
			let { lng, lat } = overlay;
			overlay.overlayType = overlayType;
			this.activeOverlay = overlay;
			this.showOverlayDetail = true;
			this.$amap.setZoom(14, 100);
			// if (isCenter) {
			// 	this.$nextTick(() => {
			// 		this.$amap.panTo([lng, lat], 100);
			// 	});
			// }
		},
		async getDataStatisticsList() {
			this.dataStatisticsList = await this.$sysApi.map.serve.getDataStatisticsList();
		},
		closeOverlayDetail(done) {
			this.showOverlayDetail = false;
			this.activeOverlay = {};
			this.$emit('close');
			this.$amap.setZoom(11, 100);
			done();
		},
	},
	mounted() {
		console.log(this.overlayInfoConfig);
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